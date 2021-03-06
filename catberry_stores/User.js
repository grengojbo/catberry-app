'use strict';

module.exports = User;

var util = require("util");

/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "User" store.
 * @param {UHR} $uhr Universal HTTP request.
 * @constructor
 */
function User($serviceLocator, $config, $uhr) {
	this._uhr = $uhr;
  this._config = $config;
  this._logger = $serviceLocator.resolve("logger");
  // if (this.$context.isBrowser) {
  // }
}

/**
 * Current application config.
 * @type {Object}
 * @private
 */
User.prototype._config = null;

/**
 * Current application logger.
 * @type {Object}
 * @private
 */
User.prototype._logger = null;

/**
 * Current universal HTTP request to do it in isomorphic way.
 * @type {UHR}
 * @private
 */
User.prototype._uhr = null;

User.prototype._lastAccessToken = '';
/**
 * Current lifetime of data (in milliseconds) that is returned by this store.
 * @type {number} Lifetime in milliseconds.
 */
User.prototype.$lifetime = 60000;

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
User.prototype.load = function () {
	// Here you can do any HTTP requests using this._uhr.
	// Please read details here https://github.com/catberry/catberry-uhr.
  var self = this,
    data = {
      id: 1,
      username: 'demo',
      email: 'demo@example.com',
      isAdmin: false,
      organization: {
        id: 1,
        name: 'Название организации'
      }
    };
  return data;
};

/**
 * Handles action named "some-action" from any component.
 * @returns {Promise<Object>|Object|null|undefined} Response to component.
 */
// User.prototype.handleSomeAction = function () {
// 	// Here you can call this.$context.changed() if you know
// 	// that remote data source has been changed.
// 	// Also you can have many handle methods for other actions.
// };
