'use strict';

module.exports = Account;

var util = require('util'),
  ComponentBase = require('../../../lib/ComponentBase');

util.inherits(Account, ComponentBase);

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "account" component.
 * @constructor
 */
function Account($serviceLocator) {
  ComponentBase.call(this);
  if (this.$context.isBrowser) {
    this._window = $serviceLocator.resolve('window');
  }
}

Account.prototype._window = null;
/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
Account.prototype.render = function () {
  return this.$context.getStoreData()
    .then(function (result) {
      return {data: result};
    });
};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
Account.prototype.bind = function () {

};

/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
Account.prototype.unbind = function () {

};
