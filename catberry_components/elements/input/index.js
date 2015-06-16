'use strict';

module.exports = Input;

var bh = require("../../../lib/helpers/browserHelper"),
    lh = require("../../../lib/helpers/l10nHelper"),
    elSelClass = ".js-input",
    isClosed = "is-closed",
    errorClass = "error",
    typeList = {
      text: "text",
      email: "email",
      url: "url",
      tel: "tel",
      password: "password",
      checkbox: "checkbox"
    };

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "Input" component.
 * @constructor
 */
function Input() {

}

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 * <cat-input id="js-cat-input-login-password" type="password" placeholder-key="FORM_SIGN_IN_PLACEHOLDER_PASSWORD"><div class="input input--password">
  <input type="password" class="input__element js-input" id="js-cat-input-login-password-element" placeholder="Пароль">
    <div class="input__eye is-closed js-password-eye"></div>
</div></cat-input>
 */
Input.prototype.render = function () {
  var a = this.$context.attributes,
    typeKey = a.type||typeList.text,
    placeholderKey = a["placeholder-key"],
    labelKey = a["label-key"],
    errorClass = a["error-class"],
    lp = lh.getLocalizationProvider(this.$context),
    curLocale = lh.getCurrentLocale(this.$context);
  return{
    name: a.name,
    type: typeKey,
    placeholder: placeholderKey?lp.get(curLocale,placeholderKey):null,
    tabIndex: a.tabindex,
    autofocus: "autofocus" in a,
    label: labelKey?lp.get(curLocale,labelKey):null,
    icon: a.icon,
    locale: curLocale,
    isPassword: typeKey===typeList.password,
    isCheckbox: typeKey===typeList.checkbox,
    isError: false,
    required: "required" in a,
    id: a.id+"-element"
  }
};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
Input.prototype.bind = function () {
  return{
    click:{
      ".js-password-eye":this._handleTogglePassword
    }
  }
};

/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
// Input.prototype.unbind = function () {
// };

Input.prototype.getValue=function(){
  return this.$context.element.querySelector("input").value
};

Input.prototype.setValue=function(val){
  this.$context.element.querySelector("input").value=val
};

Input.prototype.clear=function(){
  this.$context.element.querySelector("input").value=""
};

Input.prototype.focus=function(){
  this.$context.element.querySelector("input").focus()
};

Input.prototype._handleTogglePassword=function(event){
  event.preventDefault(),
  event.stopPropagation();
  var el=this.$context.element.querySelector(elSelClass);
    bh.containsClass(el.currentTarget,isClosed)?(el.setAttribute("type",typeList.text),
    bh.removeClass(el.currentTarget,isClosed)):(el.setAttribute("type",typeList.password),
    bh.addClass(el.currentTarget,isClosed))
  };
