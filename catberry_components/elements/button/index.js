'use strict';

module.exports = Button;

var lh = require("../../../lib/helpers/l10nHelper"),
    bh = require("../../../lib/helpers/browserHelper");

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "button" component.
 * @constructor
 */
function Button() {

}

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 * <cat-button id="cat-button-name" name="submit" type="submit" tabindex="2" placeholder-key="TXT" button-class="ui inverted blue button" icon="lock icon"></cat-input>
 */
Button.prototype.render=function(){
  var a = this.$context.attributes,
    label = a.label,
    href = a.href,
    butClass = a['button-class'],
    butStyle = a['button-input'], // input/button
    placeholderKey = a["placeholder-key"],
    typeBut = a.type,
    lp = lh.getLocalizationProvider(this.$context),
    curLocale = lh.getCurrentLocale(this.$context);
  var b = {
    name: a.name,
    label: label,
    placeholder: placeholderKey?lp.get(curLocale,placeholderKey):null,
    tabIndex: a.tabindex,
    icon: a.icon,
    button: butStyle?true:false,
    href: href,
    butClass: butClass,
    disabled: "disabled" in a,
    isSubmitButton: "submit"===typeBut,
    type: typeBut,
    id: a.id+"-element"
  };
  console.log(b);
  return b;
};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
Button.prototype.bind = function () {

};

/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
Button.prototype.unbind = function () {

};

Button.prototype.enable=function(){
  var el = this.$context.element.querySelector("input");
  el.disabled = false;
  bh.removeClass(el, 'disabled');
};

Button.prototype.disable=function(){
  var el = this.$context.element.querySelector("input");
  el.disabled = true;
  bh.addClass(el, 'disabled');
  // console.log('------------------- submit disable ------------');
  // console.log(el);
  // this.$context.element.querySelector("input").disabled=true;
};
