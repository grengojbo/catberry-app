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

module.exports = Pages;

var util = require('util'),
	ComponentBase = require('../../lib/ComponentBase');

util.inherits(Pages, ComponentBase);

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "pages" component.
 * @extends ComponentBase
 * @constructor
 */
function Pages($serviceLocator, $config) {
	ComponentBase.call(this);
  this._config = $config;
  this._logger = $serviceLocator.resolve("logger");
  if (this.$context.isBrowser) {
    this._window = $serviceLocator.resolve('window');
  }
  this._logger.info('------------- Pages ----------');
}

Pages.prototype._window = null;

/**
 * Current application config.
 * @type {Object}
 * @private
 */
Pages.prototype._config = null;

/**
 * Current application logger.
 * @type {Object}
 * @private
 */
Pages.prototype._logger = null;

Pages.prototype.data = null;

Pages.prototype.isAuthorized = function (key) {
  var token = this._window.localStorage.getItem(key);
  if (token) {
    return true;
  }
  return false;
};

Pages.prototype.getItem = function () {
  var self = this;
  return this.$context.getStoreData()
    .then(function (pages) {
      // console.log('--> Pages / render');
      // console.log(pages);
      return self.localizeContext(pages);
    });
};
/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
Pages.prototype.render = function () {
  this._logger.info('------------- Pages / render ----------');
  var self = this;
  return this.$context.getStoreData()
    .then(function (pages) {
      // console.log('--> Pages / render');
      // console.log(pages);

      var page = self.localizeContext(pages);
      self._logger.info('------------- Pages / render [start]');
      self._logger.trace(page);
      self._logger.info('------------- Pages / render [end]');
      return page;
    });
  // this.data = this.getItem();
  // this._logger.info(this.data);
  // if (!this.isAuthorized('token')) {
  //   this.data.isGuest = true;
  //   this.data.isUser = false;
  //   if (this.data.isPrivate) {
  //     this.$context.redirect('/login?referrer=' + this.data.currentPage);
  //   } else {
  //     return this.data;
  //   }
  // } else {
  //     this.data.isGuest = false;
  //     this.data.isUser = true;
  //     return this.data;
  // }
};
