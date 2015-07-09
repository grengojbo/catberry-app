'use strict';
module.exports = Tooltip;
var bh = require('../../../lib/helpers/browserHelper'), lh = require('../../../lib/helpers/l10nHelper'), elActive = 'is-active', elTooltip = '.js-tooltip', elTitle = '.js-title', elLabel = '.js-label';
/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */
/**
 * Creates new instance of the "tooltip" component.
 * @constructor
 */
function Tooltip() {
}
/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
Tooltip.prototype.render = function () {
  var a = this.$context.attributes, label = a['label-key'], title = a['title-key'], item = a['item-keys'], items = item ? item.split(',') : [], lp = lh.getLocalizationProvider(this.$context), curLocale = lh.getCurrentLocale(this.$context);
  return {
    type: a.type,
    size: a.size,
    position: a.position,
    isActive: 'true' === a['is-active'],
    locale: curLocale,
    label: label ? lp.get(curLocale, label) : '',
    title: title ? lp.get(curLocale, title) : '',
    items: items.map(function (a) {
      return lp.get(curLocale, a);
    })
  };
};
Tooltip.prototype.setTitle = function (text) {
  var el = this.$context.element.querySelector(elTitle);
  return el && (el.innerHTML = text), this;
};
Tooltip.prototype.setLabel = function (text) {
  var el = this.$context.element.querySelector(elLabel);
  return el && (el.innerHTML = text), this;
};
Tooltip.prototype.show = function () {
  return bh.addClass(this.$context.element.querySelector(elTitle), elActive), this;
};
Tooltip.prototype.hide = function () {
  return bh.removeClass(this.$context.element.querySelector(elTitle), elActive), this;
};
/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
Tooltip.prototype.bind = function () {
};
/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
Tooltip.prototype.unbind = function () {
};