FABuild.internal.login = {};
FABuild.internal.login.loginStates = {};
FABuild.internal.login.loginStates.isLoggedIn = 'isLoggedIn';
FABuild.internal.login.loginStates.isNotLoggedIn = 'isNotLoggedIn';
FABuild.internal.login.loginStates.unknown = 'unknown';
FABuild.internal.login.loginStates.loginError = 'loginError';
FABuild.internal.login.interfaceVersion = 4;

FABuild.internal.login.params = {};
FABuild.internal.login.params.documentReadyStates = ["complete", "interactive"];

// logs
FABuild.internal.login.params.verbose = false;

// Cookie hints to detect isLoggedIn
FABuild.internal.login.params.isLoggedInCookieNameHints = []

// DOM hints to detect isLoggedIn
FABuild.internal.login.params.isLoggedInSelectorHints = [
    'a[href$="account/login-logout"]',
    'a[href*="/account/logout"]',
    '.account-dashboard',
    'a[href$="/Login-Logout"]',
    'form[action$="/logout"]',
    'a[href$="/logout"]'
];

// JS hints to detect isLoggedIn or isNotLoggedIn
FABuild.internal.login.params.loginStateInJavascriptContextHints = [
    'window.heap.identity.lenght > 0',
    'CoreSettings.customerIsLogged == 1',
    'isCustomerAuthenticated == true',
    'window.CQuotient.getCQHashedEmail().length > 0',
    'customerInfoObject.loginStatus == "logged-in"',
    'tc_vars.user_identified == "authentified"'
];

// DOM hints to detect isNotLoggedIn
FABuild.internal.login.params.isNotLoggedInHints = [
    'a[href$="account/login"]',
    'a[href$="account/login?action=register"]',
    'a[url^="/auth/facebook"]',
    'a[url^="/auth/google"]',
    'a[href*="account/login/"]',
    'a[href$="/login"]',
    'a[href*="/signin"]',
    'a[href$="/create-account"]',
    'a[href="#signup"]',
    'form[action$="/login"]'
];

// DOM hints to detect loginError
// Form login + error Message
// Find submit button detected by the SDK using fa-listener-added class (to get the form)
FABuild.internal.login.params.loginErrorHints = [
    '.alert',
    '.alert-danger',
    '[role="alert"]',
    '.input--error__label',
    '.input-material--error__label',
    '[class*=errorMessage]',
    '.error-form',
    '.alert-warning',
    '.message-error',
    '.error-text'
];

// urls to ignore
FABuild.internal.login.params.ignored_paths = [];

FABuild.internal.login.logIfVerbose = function(s){
    if (FABuild.internal.login.params.verbose) {
        console.log(s);
    }
}

FABuild.internal.login.genericLoginState_isLoginError = function() {
    const params = FABuild.internal.login.params;
    
    // loginError state detection using loginErrorHints
    var formSubmitButton = document.querySelector('.fa-listener-added');
    if (formSubmitButton && params.loginErrorHints.length) {
        FABuild.internal.login.logIfVerbose('FABuild.internal.login.genericLoginState_isLoginError formSubmitButton+loginErrorHints');

        var joinedSelectors = params.loginErrorHints.join(', ');
        var loginForm = formSubmitButton.closest('form');
        if (loginForm != null) {
            FABuild.internal.login.logIfVerbose('FABuild.internal.login.genericLoginState_isLoginError loginForm detected');

            // Check is an error is visible in the form
            var errorNodes = loginForm.querySelectorAll(joinedSelectors);
            for (let i = 0; i < errorNodes.length; i++) {
                var n = errorNodes[i];
                if (FABuild.internal.isVisible(n)) {
                    return true;
                } else {
                    FABuild.internal.login.logIfVerbose('FABuild.internal.login.genericLoginState_isLoginError n:'+n+' not visible');
                }
            }
        }
        
        FABuild.internal.login.logIfVerbose('FABuild.internal.login.genericLoginState_isLoginError document tests');

        // Check is an error is visible in the page
        var errorNodes = document.querySelectorAll(joinedSelectors);
        FABuild.internal.login.logIfVerbose('FABuild.internal.login.genericLoginState_isLoginError errorNodes:'+errorNodes);

        for (let i = 0; i < errorNodes.length; i++) {
            var n = errorNodes[i];
            FABuild.internal.login.logIfVerbose('FABuild.internal.login.genericLoginState_isLoginError i:'+i);
            FABuild.internal.login.logIfVerbose('FABuild.internal.login.genericLoginState_isLoginError n:'+n);

            if (FABuild.internal.isVisible(n)) {
                return true;
            } else {
                FABuild.internal.login.logIfVerbose('FABuild.internal.login.genericLoginState_isLoginError n:'+n+' not visible');
            }
        }
    }
    
    return false;
}

FABuild.internal.login.genericLoginState_isLoggedIn = function() {
    const params = FABuild.internal.login.params;

    // Using Cookies
    if (params.isLoggedInCookieNameHints.length && document.cookie) {
        for (let i = 0; i < params.isLoggedInCookieNameHints.length; i++) {
            var cookieName = params.isLoggedInCookieNameHints[i];
            if (document.cookie.includes(cookieName)){
                return true;
            }
        }
    }
    
    // isLoggedIn state detection using isLoggedInSelectorHints
    if (params.isLoggedInSelectorHints.length) {
        var selectors = params.isLoggedInSelectorHints.join(', ');
        var loggedInNode = document.querySelector(selectors);
        if (loggedInNode) {
            return true;
        }
    }
    
    // isLoggedIn Or isNotLoggedIn state detection using loginStateInJavascriptContextHints
    for (let i = 0; i < params.loginStateInJavascriptContextHints.length; i++) {
        const js = params.loginStateInJavascriptContextHints[i];
        try {
            FABuild.internal.login.logIfVerbose('eval:'+js);
            var F = new Function ('return '+js);
            var result = F();
            FABuild.internal.login.logIfVerbose('result:'+result);
            if (result == true) {
                FABuild.internal.login.logIfVerbose('result:'+result+ ' -> isLoggedIn');
                return true;
            }
        
        } catch (error) {
            FABuild.internal.login.logIfVerbose('error:'+error);
        }
    }
    
    return false;
}

FABuild.internal.login.genericLoginState_isNotLoggedIn = function() {
    const params = FABuild.internal.login.params;

    // isNotLoggedIn state detection using isNotLoggedInHints
    if (params.isNotLoggedInHints.length) {
        selectors = params.isNotLoggedInHints.join(', ');
        var notLoggedInNode = document.querySelector(selectors)
        if (notLoggedInNode) {
            return true;
        }
    }
    
    // isLoggedIn Or isNotLoggedIn state detection using loginStateInJavascriptContextHints
    for (let i = 0; i < params.loginStateInJavascriptContextHints.length; i++) {
        const js = params.loginStateInJavascriptContextHints[i];
        try {
            FABuild.internal.login.logIfVerbose('eval:'+js);
            var F = new Function ('return '+js);
            var result = F();
            FABuild.internal.login.logIfVerbose('result:'+result);
            if (result == false) {
                FABuild.internal.login.logIfVerbose('result:'+result+ ' -> isNotLoggedIn');
                return true;
            }
        
        } catch (error) {
            FABuild.internal.login.logIfVerbose('error:'+error);
        }
    }
    
    if (document.querySelector('.fa-listener-added')){
        return true;
    }
    
    return false;
}


FABuild.internal.login.genericLoginState = function() {
    const loginStates = FABuild.internal.login.loginStates;
    const params = FABuild.internal.login.params;
    
    if (params.documentReadyStates.includes(document.readyState)) {
        if (params.ignored_paths.length) {
            if (params.ignored_paths.includes(document.location.pathname)) {
                FABuild.internal.login.logIfVerbose('unknown');
                return loginStates.unknown;
            }
        }
        
        if (FABuild.internal.login.genericLoginState_isNotLoggedIn()) {
            FABuild.internal.login.logIfVerbose('isNotLoggedIn');
            return loginStates.isNotLoggedIn;
        }

        if (FABuild.internal.login.genericLoginState_isLoginError()) {
            FABuild.internal.login.logIfVerbose('loginError');
            return loginStates.loginError;
        }
        
        if (FABuild.internal.login.genericLoginState_isLoggedIn()) {
            FABuild.internal.login.logIfVerbose('isLoggedIn');
            return loginStates.isLoggedIn;
        }
    }
    
    FABuild.internal.login.logIfVerbose('unknown');
    return loginStates.unknown;
}

FABuild.internal.login.setSalesforceRecommendedParameters = function() {
    FABuild.internal.login.params.isLoggedInCookieNameHints = ['sid_Client'];
    FABuild.internal.login.params.documentReadyStates = ["complete"];
}

