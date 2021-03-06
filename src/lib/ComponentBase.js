/*
 * catberry-homepage
 *
 * Copyright (c) 2015 Denis Rechkunov and project contributors.
 *
 * catberry-homepage's license follows:
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * This license applies to all parts of catberry-homepage that are not
 * externally maintained libraries.
 */

'use strict';

module.exports = ComponentBase;

var l10nHelper = require('./helpers/l10nHelper');

/**
 * Creates new instance of basic component.
 * @constructor
 */
function ComponentBase() {
  this.mobileDetect();
    // if (this.$context.isBrowser) {
    //   this._window = $serviceLocator.resolve('window');
    // }
    // console.log('-------------------------- ComponentBase ------------------');
    // console.log(localStorage.getItem('token'));
}

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
ComponentBase.prototype.render = function () {
	return this.localizeContext();
};

ComponentBase.prototype._window = null;

ComponentBase.prototype.isGuest = true;

ComponentBase.prototype.guest = true;

ComponentBase.prototype.table = false;

ComponentBase.prototype.mobile = false;

ComponentBase.prototype.android = false;

ComponentBase.prototype.iphone = false;

ComponentBase.prototype.oldPhone = false;

ComponentBase.prototype.winPhone = false;

ComponentBase.prototype.mobileDetect = function () {
  var ua = this.$context.userAgent.toLowerCase();
  this.iphone = /iphone|ipod|ipad/i.test(ua);
  this.android = ua.indexOf("android") > -1;

  if (this.iphone) {
    this.mobile = true;
  } else if (this.android){
    this.mobile = true;
  } else if (this.oldPhone){
    this.mobile = true;
  }
};

/**
 * Adds locale to any data object.
 * @param {Object?} data Optional data object.
 * @returns {Object} Data object with locale.
 */
ComponentBase.prototype.localizeContext = function (data) {
	data = data || {};
  // data.isGuest = this.isGuest;
  data.isMobile = this.mobile;
  data.isAndroid = this.android;
  data.isIphone = this.iphone;
  data.isTable = this.table;
  data.isOldPhone = this.oldPhone;
  data.isWinPhone = this.winPhone;
  data.locale = l10nHelper.getCurrentLocale(this.$context).split('-')[0];
  data.lang = l10nHelper.getCurrentLocale(this.$context);
	return data;
};

/**
 * Binds events.
 */
ComponentBase.prototype.bind = function () {
	var loaders = this.$context.element.querySelectorAll('div.loader');

	for (var i = 0; i < loaders.length; i++) {
		loaders[i].style.display = 'none';
	}
};