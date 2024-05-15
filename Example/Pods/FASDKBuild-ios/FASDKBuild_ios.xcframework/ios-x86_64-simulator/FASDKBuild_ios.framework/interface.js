window.FABuild = window.FABuild || {}
FABuild.platform = navigator.vendor.toLowerCase().includes('google') ? 'android' : 'ios'
FABuild.interfaceVersion = 2
FABuild.internal = FABuild.internal || {}
FABuild.internal.isVisible = function(elem) { return !!elem && !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length) }

// lazy parameters allows to have only one of username || password
FABuild.internal.checkLastFormElements = function(lazy = false) {
    // check validity of any last form found, remove if we had something but not visible in page anymore
    var lfe = FABuild.internal.lastFormElements;
    if (lfe && (
                (!lazy && FABuild.internal.isVisible(lfe.login) && FABuild.internal.isVisible(lfe.password))
                ||
                (lazy && (FABuild.internal.isVisible(lfe.login) || FABuild.internal.isVisible(lfe.password)))
                )) {
        return lfe;
    } else if (lfe) {
        FABuild.internal.lastFormElements = undefined;
    }
}

FABuild.internal.getAllElements = function(selector) {
    var a = document.querySelectorAll(selector);
    // Covers salesforce's aura framework and its web components
    if (window.aura && aura.root && aura.root.elements && aura.root.elements.length > 0) {
        return new Set([...a, ...window.aura.root.elements[0].querySelectorAll(selector)]);
    } else {
        return a;
    }
}

FABuild.internal.getElement = function(selector) {
    if (window.aura && aura.root && aura.root.elements && aura.root.elements.length > 0) {
        var e = window.aura.root.elements[0].querySelector(selector);
        if (e) {
            return e;
        }
    }
    return document.querySelector(selector);
}

FABuild.internal.findLoginElements = function() {
    var lfe = FABuild.internal.checkLastFormElements();
    if (lfe) {
        return lfe;
    }
    // start from password fields, stop on first full visible form
    var isVisible = FABuild.internal.isVisible;
    var form;
    var un;
    var pw;
    var sub;
    var pws = FABuild.internal.getAllElements('input[type=password]');
    for (let p of pws) {
        if (isVisible(p)) {
            pw = p;
            un = null;
            sub = null;
            form = p.closest('form');

            if (form) {
                // Username field
                var uns = form.querySelectorAll('input[type="text"i], input[type="email"i], input[name="username"], input[autocomplete="email"] ');
                for (let u of uns) {
                    if (isVisible(u)) {
                        un = u;
                    }
                }

                // Submit button
                sub = form.querySelector('[type="submit"i], input[type="button"i], button[class*="login"i], [type="button"i][id*="login"i], button[id*="login"i], [type="button"i][name*="login"i], button[name*="login"i]');

                // if we have all fields, stop here (submit doesnt have to be visible yet)
                if (isVisible(un) && isVisible(pw) && !!sub) {
                    FABuild.internal.lastFormElements = { login: un, password: pw, submit: sub };
                    return FABuild.internal.lastFormElements;
                }
            }
        }
    }
}

FABuild.internal.findLoginElementsFromSelectors = function(form_s, login_s, password_s, submit_s) {
    var form = FABuild.internal.getElement(form_s);
    if (form) {
        elements = {
        login: form.querySelector(login_s),
        password: form.querySelector(password_s),
        submit: form.querySelector(submit_s)
        }
        if (elements.submit && (FABuild.internal.isVisible(elements.login) || FABuild.internal.isVisible(elements.password))) {
            // we have at least a username or password field and a button
            FABuild.internal.lastFormElements = elements;
            return elements;
        }
    }
}

FABuild.internal.fillInputElementWithValue = function(input, value) {
    var lastValue = input.value;
    input.value = value;
    var tracker  = input._valueTracker;
    if (tracker) {
        tracker.setValue(lastValue);
    }
    var evt = document.createEvent('HTMLEvents');
    evt.initEvent('change', true, true);
    input.dispatchEvent(evt);
    var evt = document.createEvent('HTMLEvents');
    evt.initEvent('input', true, true);
    input.dispatchEvent(evt);
    var evt = document.createEvent('HTMLEvents');
    evt.initEvent('blur', true, true);
    input.dispatchEvent(evt);
}

FABuild.internal.addLoginSubmitListener = function() {
    var lfe = FABuild.internal.checkLastFormElements(true);
    if (!lfe || !lfe.submit || lfe.submit.classList.contains('fa-listener-added')) {
        return;
    }
    lfe.submit.addEventListener('click', function() {
        var message = {};
        var lfe = FABuild.internal.checkLastFormElements(true);
        if (FABuild.internal.isVisible(lfe.login)) { message.username = lfe.login.value; }
        if (FABuild.internal.isVisible(lfe.password)) { message.password = lfe.password.value; }
        if (FABuild.platform == 'ios') {
            if (message.password) {
                window.webkit.messageHandlers.loginAction.postMessage(message);
            } else {
                window.webkit.messageHandlers.usernameSubmitted.postMessage(message);
            }
        } else { // android
            window.auth.save_login(message.username || '', message.password || '');
        }
    });
    lfe.submit.classList.add('fa-listener-added');
}

FABuild.internal.fillUsernameInLoginForm = function(username) {
    var lfe = FABuild.internal.checkLastFormElements(true);
    if (!lfe || !lfe.login || !FABuild.internal.isVisible(lfe.login)) {
        // no login field to fill
        return;
    }
    
    FABuild.internal.fillInputElementWithValue(lfe.login, username);
}

FABuild.internal.fillPasswordInLoginForm = function(password) {
    var lfe = FABuild.internal.checkLastFormElements(true);
    if (!lfe || !lfe.password || !FABuild.internal.isVisible(lfe.password)) {
        // no password field to fill
        return;
    }
    
    FABuild.internal.fillInputElementWithValue(lfe.password, password);
}

FABuild.internal.submitLoginForm = function() {
    var lfe = FABuild.internal.checkLastFormElements(true);
    if (!lfe || !lfe.submit) {
        // no submit btn
        return;
    }
    
    lfe.submit.click();
}

FABuild.internal.replaceViewport = function(vp) {
    console.log('FABuild.internal.replaceViewport');
    var elements = document.getElementsByTagName('head');
    if (elements.length){
        var head = elements[0];
        var metas = head.querySelectorAll('meta[name="viewport"]');
        if (metas.length){
            metas.forEach(function(elem) {
                elem.remove();
            });
            
            var meta = document.createElement('meta');
            meta.name = 'viewport';
            meta.id = 'FollowAnalytics-replaced-viewport'
            meta.content = vp;
            head.appendChild(meta);
            return;
        }
    }
    
    setTimeout(() => {
        FABuild.internal.replaceViewport(vp);
        
    }, 50);
}
