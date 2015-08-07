'use strict';

module.exports = Login;

/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "auth/Login" store.
 * @param {UHR} $uhr Universal HTTP request.
 * @constructor
 */
function Login($serviceLocator, $uhr, $config) {
	this._uhr = $uhr;
  this._config = $config;
  this._logger = $serviceLocator.resolve("logger");
}

/**
 * Current application config.
 * @type {Object}
 * @private
 */
Login.prototype._config = null;

/**
 * Current application logger.
 * @type {Object}
 * @private
 */
Login.prototype._logger = null;

/**
 * Current universal HTTP request to do it in isomorphic way.
 * @type {UHR}
 * @private
 */
Login.prototype._uhr = null;

Login.prototype.referrer = '/';

/**
 * Current lifetime of data (in milliseconds) that is returned by this store.
 * @type {number} Lifetime in milliseconds.
 */
Login.prototype.$lifetime = 60000;

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
Login.prototype.load = function () {
	// Here you can do any HTTP requests using this._uhr.
	// Please read details here https://github.com/catberry/catberry-uhr.
  var referrer = this.$context.state.referrer;
  if (referrer) {
    this.referrer = referrer;
  }
};

/**
 * Handles action named "some-action" from any component.
 * @returns {Promise<Object>|Object|null|undefined} Response to component.
 */
Login.prototype.handleSignIn = function (event) {
	// Here you can call this.$context.changed() if you know
	// that remote data source has been changed.
	// Also you can have many handle methods for other actions.
  this._logger.info('------------- handleSignIn -----------');
  this._logger.info(event);
  var self = this;
  if (event.username === 'demo' && event.password === 'demo') {
    self._logger.info('auth Ok!');
    // self.context.changed();
    var data = {};
    data.token = 'sadfsdgdfgd4gfg4tgr44f3';
    return {data: data, status: "success", referrer: self.referrer};
  } else {
    self._logger.error('auth Error!');
    // self.context.changed();
    return {code: 403, message: "Forbidden", status: "error"};
  }
};
