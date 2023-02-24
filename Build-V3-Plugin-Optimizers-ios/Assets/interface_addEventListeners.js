
Window.prototype._addEventListener = Window.prototype.addEventListener;

Window.prototype.addEventListener = function(a, b, c) {
    if (a){
        if (a == "touchmove") {
            console.log('Window addEventListener touchmove detected and cancelled');
            return;
        } else {
            console.log('Window addEventListener : '+a);
        }
    }
    
   if (c==undefined) c=false;
   this._addEventListener(a,b,c);
   if (! this.eventListenerList) this.eventListenerList = {};
   if (! this.eventListenerList[a]) this.eventListenerList[a] = [];
   this.eventListenerList[a].push({listener:b,options:c});
};

Document.prototype._addEventListener = Document.prototype.addEventListener;

Document.prototype.addEventListener = function(a, b, c) {
    if (a){
        if (a == "touchmove") {
            console.log('Document addEventListener touchmove detected and cancelled');
            return;
        } else {
            console.log('Document addEventListener : '+a);
        }
    }
    
   if (c==undefined) c=false;
   this._addEventListener(a,b,c);
   if (! this.eventListenerList) this.eventListenerList = {};
   if (! this.eventListenerList[a]) this.eventListenerList[a] = [];
   this.eventListenerList[a].push({listener:b,options:c});
};

