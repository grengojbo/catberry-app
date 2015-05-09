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

module.exports = Documents;

var util = require('util');
var l10nHelper = require('../lib/helpers/l10nHelper');
var STATIC_FILE = '/html/%s_%s.html';
	// StaticStoreBase = require('../lib/StaticStoreBase'),
  // ComponentBase = require('../lib/ComponentBase');

// util.inherits(Documents, StaticStoreBase, ComponentBase);

/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "static/Documentation" store.
 * @constructor
 */
function Documents($uhr, $config) {
  this._uhr = $uhr;
  this._config = $config;
  this.locale = l10nHelper.getCurrentLocale(this.$context).split('-')[0];
  // ComponentBase.call(this);
	// StaticStoreBase.call(this);
}

Documents.prototype.filename = 'test';

Documents.prototype.locale = 'en';

/**
 * Current application config.
 * @type {Object}
 * @private
 */
Documents.prototype._config = null;

/**
 * Current universal HTTP request to do it in isomorphic way.
 * @type {UHR}
 * @private
 */
Documents.prototype._uhr = null;

/**
 * Current lifetime of data (in milliseconds) that is returned by this store.
 * @type {number} Lifetime in milliseconds.
 */
Documents.prototype.$lifetime = 3660000;

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
Documents.prototype.load = function () {
  console.log('---> Documents / load');
  console.log(this.$context);
  var uri = this.$context.location.clone(),
    data = {
      contentPage: {}
    };

  if (!uri.scheme) {
    uri.scheme = 'http';
  }
  uri.query = null;
  uri.fragment = null;
  uri.path = util.format(STATIC_FILE, this.filename, this.locale);

  return this._uhr.get(uri.toString())
    .then(function (result) {
      if (result.status.code < 200 || result.status.code >= 400) {
        throw new Error(result.status.text);
      }
      data.contentPage.main = result.content || '';
      return data;
    });
};

Documents.prototype.handleSlug = function (slug) {
  this.filename = slug;
  // console.log('---> handleSlug <---', slug);
  this.$context.changed();
};
