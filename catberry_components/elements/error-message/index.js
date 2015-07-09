'use strict';

module.exports = ErrorMessage;

var lh = require('../../../lib/helpers/l10nHelper'),
  isCosed = '.message--close',
  selMessage = '.message--el',
  setLabel = '.header',
  selText = 'p';
/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "error-message" component.
 * @constructor
 */
function ErrorMessage() {

}

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 * <cat-error-message id="cat-error-message-login" is-active="true" label-key="ERROR_MESSAGE" el-class="ui bottom attached error message" icon="icon help" button-close="close icon"></cat-error-message>
 */
ErrorMessage.prototype.render = function () {
  var a = this.$context.attributes,
    labelKey = a['label-key'],
    mess = a['text-key']||'ERROR_MESSAGE',
    elClass = a['el-class'],
    butClose = a['button-close'],
    lp = lh.getLocalizationProvider(this.$context),
    curLocale = lh.getCurrentLocale(this.$context);
  var e = {
    label: labelKey?lp.get(curLocale, mess):false,
    message: lp.get(curLocale, mess),
    isActive:"true"===a['is-active'],
    locale: curLocale,
    elClass: elClass,
    butClose: butClose,
    icon: a.icon,
    id: a.id+'-element'
  };
  // console.log('----> ErrorMessage / render');
  // console.log(e);
  return e;
};

ErrorMessage.prototype.setText = function(mess){
    var text=this.$context.element.querySelector(selText);
    text.innerHTML=mess;
};

ErrorMessage.prototype.setLabel = function(mess){
    var text=this.$context.element.querySelector(setLabel);
    text.innerHTML=mess;
};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
ErrorMessage.prototype.bind = function () {
  return{
    click:{
      ".message--close":this._handleMessageClose
    }
  }
};

/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
// ErrorMessage.prototype.unbind = function () {
// };

ErrorMessage.prototype._handleMessageClose = function(event){
  event.preventDefault(),
  event.stopPropagation();
  // var el=this.$context.element.querySelector(elSelClass);
  var el=this.$context;
  console.log('------------------- _handleMessageClose -------------------');
  console.log(el);
  this.hide();
};

/**
 * Hides error message in template.
 */
ErrorMessage.prototype.hide = function () {
  var el = this.$context.element.querySelector(selMessage);
  el.style.display = 'none';
};

/**
 * Shows error message in template.
 */
ErrorMessage.prototype.show = function () {
  var el = this.$context.element.querySelector(selMessage);
  el.style.display = '';
};