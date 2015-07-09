'use strict';
module.exports = Photoswipe;
var util = require('util'), bh = require('../../../lib/helpers/browserHelper'), lh = require('../../../lib/helpers/l10nHelper'), pswpSel = '.pswp', captionSel = '.pswp__caption__center';
/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */
/**
 * Creates new instance of the 'photoswipe' component.
 * @constructor
 */
function Photoswipe($serviceLocator) {
  this._logger = $serviceLocator.resolve('logger');
  if (this.$context.isBrowser) {
    this._window = $serviceLocator.resolve('window');
  }
}
/**
 * Current window object.
 * @type {Window}
 * @private
 */
Photoswipe.prototype._window = null;
/**
 * Current application logger.
 * @type {Object}
 * @private
 */
Photoswipe.prototype._logger = null;
Photoswipe.prototype.isShow = false;
Photoswipe.prototype.svg = true;
Photoswipe.prototype.touch = false;
Photoswipe.prototype.mouse = true;
Photoswipe.prototype.items = [];
Photoswipe.prototype.options = {
  index: 3,
  escKey: false,
  animation: true,
  controlEl: true,
  closeEl: true,
  captionEl: true,
  fullscreenEl: false,
  zoomEl: false,
  shareEl: true,
  counterEl: true,
  arrowEl: false,
  preloaderEl: false,
  timeToIdle: 4000
};
Photoswipe.prototype.setOptions = function (option) {
};
Photoswipe.prototype.addClass = function (el) {
  if (!this.touch) {
    bh.addClass(el, 'pswp--notouch');
  }
  if (this.svg) {
    bh.addClass(el, 'pswp--svg');
  }
  if (this.mouse) {
    bh.addClass(el, 'pswp--has_mouse');
  }
  if (this.options.animation) {
    bh.addClass(el, 'pswp--css_animation');
    bh.addClass(el, 'pswp--animated-in');
  }
};
Photoswipe.prototype.removeClass = function (el) {
  if (!this.touch) {
    bh.removeClass(el, 'pswp--notouch');
  }
  if (this.svg) {
    bh.removeClass(el, 'pswp--svg');
  }
  if (this.mouse) {
    bh.removeClass(el, 'pswp--has_mouse');
  }
  if (this.options.animation) {
    bh.removeClass(el, 'pswp--css_animation');
    bh.removeClass(el, 'pswp--animated-in');
  }
};
Photoswipe.prototype.setCaption = function (mess) {
  if (this.options.captionEl) {
    var text = this.$context.element.querySelector(captionSel);
    text.innerHTML = mess;
  }
};
/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
Photoswipe.prototype.render = function () {
  var a = this.$context.attributes, lp = lh.getLocalizationProvider(this.$context), curLocale = lh.getCurrentLocale(this.$context);
  // this.isShow = true;
  var result = {
    id: 'gal',
    isShow: this.isShow,
    options: this.options,
    items: this.items,
    transClose: lp.get(curLocale, 'PSWP_CLOSE'),
    transShare: lp.get(curLocale, 'PSWP_SHARE'),
    transToggle: lp.get(curLocale, 'PSWP_TOGGLE'),
    transZoom: lp.get(curLocale, 'PSWP_ZOOM'),
    transPrevious: lp.get(curLocale, 'PSWP_PREVIOUS'),
    transNext: lp.get(curLocale, 'PSWP_NEXT'),
    locale: curLocale
  };
  this._logger.info('---- [Photoswipe] render --->');
  this._logger.info(result);
  return result;
};
/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
Photoswipe.prototype.bind = function () {
};
/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
Photoswipe.prototype.unbind = function () {
};
/**
 * Hides in template.
 */
Photoswipe.prototype.hide = function () {
  var el = this.$context.element.querySelector(pswpSel);
  this.removeClass(el);
  bh.removeClass(el, 'pswp--open');
  bh.removeClass(el, 'pswp--visible');  // el.style.display = 'none';
};
/**
 * Shows in template.
 */
Photoswipe.prototype.show = function () {
  var el = this.$context.element.querySelector(pswpSel);
  bh.addClass(el, 'pswp--open');
  bh.addClass(el, 'pswp--visible');
  this.addClass(el);
  // el.style.display = '';
  this.setCaption('\u043A\u0430\u043A\u043E\u0439\u0442\u043E \u0442\u0435\u043A\u0441\u0442');
};