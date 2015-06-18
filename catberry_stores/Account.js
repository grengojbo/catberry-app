'use strict';

module.exports = Account;

/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "account" store.
 * @param {UHR} $uhr Universal HTTP request.
 * @constructor
 */
function Account($uhr) {
	this._uhr = $uhr;
}

/**
 * Current universal HTTP request to do it in isomorphic way.
 * @type {UHR}
 * @private
 */
Account.prototype._uhr = null;

/**
 * Current lifetime of data (in milliseconds) that is returned by this store.
 * @type {number} Lifetime in milliseconds.
 */
Account.prototype.$lifetime = 60000;

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
Account.prototype.load = function () {
	// Here you can do any HTTP requests using this._uhr.
	// Please read details here https://github.com/catberry/catberry-uhr.
};

/**
 * Handles action named "some-action" from any component.
 * @returns {Promise<Object>|Object|null|undefined} Response to component.
 */
Account.prototype.handleSomeAction = function () {
	// Here you can call this.$context.changed() if you know
	// that remote data source has been changed.
	// Also you can have many handle methods for other actions.
};