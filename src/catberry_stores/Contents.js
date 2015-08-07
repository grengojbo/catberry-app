'use strict';

module.exports = Contents;

/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

var TEST_URL = 'https://api.github.com/repos/grengojbo/catberry-app/readme';
/**
 * Creates new instance of the "Contents" store.
 * @param {UHR} $uhr Universal HTTP request.
 * @constructor
 */
function Contents($uhr, $config) {
	this._uhr = $uhr;
  this._config = $config;
}

Contents.prototype.slug = null;

/**
 * Current application config.
 * @type {Object}
 * @private
 */
Contents.prototype._config = null;

/**
 * Current universal HTTP request to do it in isomorphic way.
 * @type {UHR}
 * @private
 */
Contents.prototype._uhr = null;

/**
 * Current lifetime of data (in milliseconds) that is returned by this store.
 * @type {number} Lifetime in milliseconds.
 */
Contents.prototype.$lifetime = 3600000;

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
Contents.prototype.load = function () {
	// Here you can do any HTTP requests using this._uhr.
	// Please read details here https://github.com/catberry/catberry-uhr.
  var data = {
    contentPage: {}
  };
  // console.log('-> Contents / load');
  // console.log('--> this.$context.state: ' + this.$context.state);
  // console.log(this);
  // console.log('------');
  return this._uhr.get(TEST_URL, {
    headers: {
      Accept: 'application/vnd.github.VERSION.html+json'
    }
  })
    .then(function (result) {
      if (result.status.code >= 400 && result.status.code < 600) {
        throw new Error(result.status.text);
      }
      // console.log('-> Contents / load');
      // console.log(result.content);
      data.contentPage.main = result.content;
      // console.log('------');
      // console.log(data);
      return data;
    });
};

Contents.prototype.handleSlug = function (slug) {
  // this.slug
  // console.log('---> handleSlug <---', slug);
  this.$context.changed();
};

/**
 * Handles action named "some-action" from any component.
 * @returns {Promise<Object>|Object|null|undefined} Response to component.
 */
Contents.prototype.handleSomeAction = function () {
	// Here you can call this.$context.changed() if you know
	// that remote data source has been changed.
	// Also you can have many handle methods for other actions.
};
