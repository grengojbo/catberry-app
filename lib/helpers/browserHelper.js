'use strict';

var l10n = null;

module.exports = {
  isOld:function(w){
    return !("querySelector" in w.document && "localStorage" in w && "addEventListener" in w);
  },
  getStroreToken:function(key){
  var token = localStorage.getItem(key);
  if (token) {
    return true;
  }
  return false;
  },
  containsClass:function(el,name){
    if(el.classList) {
      return el.classList.contains(name);
    }
    if(!el.className) {
      return false;
    }
    var c=new RegExp("(^|\\s)"+name+"(\\s|$)");
    return c.test(el.className)
  },
  addClass:function(a,b){
    return a.classList?void a.classList.add(b):void(module.exports.containsClass(a,b)||(a.className+=(a.className?" ":"")+b));
  },
  removeClass:function(a,b){
    if(a.classList) {
      return void a.classList.remove(b);
    }
    if(module.exports.containsClass(a,b)){
      var c=new RegExp("(^|\\s)"+b+"(\\s|$)","g");
      a.className=a.className.replace(c,"$2")
    }
  },
  show:function(a){
    a&&(a.style.display="")
  },
  hide:function(a){
    a&&(a.style.display="none")
  }
};