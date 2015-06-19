'use strict';

module.exports = Account;

var util = require('util'),
  ComponentBase = require('../../lib/ComponentBase');

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
  // console.log('-> Account');
  this._logger = $serviceLocator.resolve('logger');
  this._logger.info('-> Account');
  ComponentBase.call(this);
  if (this.isGuest) {
    // this.$context.location
    // this.$context.redirect('http://localhost:3000/login');
    this.$context.redirect('/login');
  } else {
    if (this.$context.isBrowser) {
      this._window = $serviceLocator.resolve('window');
    }
    // this._logger.info('this.$context.cookie:' + this.isGuest);
    // this._logger.info(this.$context.cookie);
    this._logger.info(this.$context.location);
  }
}

Account.prototype.isGuest = false;

Account.prototype._window = null;

/**
 * Current application logger.
 * @type {Object}
 * @private
 */
Account.prototype._logger = null;

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
Account.prototype.render = function () {
  console.log('--> Account / render');
  return this.$context.getStoreData()
    .then(function (result) {
      return {result: result};
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
// Account.prototype.unbind = function () {

// };
