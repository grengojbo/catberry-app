'use strict';
module.exports = Account;
var util = require('util'), bh = require('../../lib/helpers/browserHelper'), ComponentBase = require('../../lib/ComponentBase');
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
function Account($serviceLocator, $config) {
  // console.log('-> Account');
  this._config = $config;
  this._logger = $serviceLocator.resolve('logger');
  this._logger.info('-> Account');
  ComponentBase.call(this);
  if (this.$context.isBrowser) {
    this._window = $serviceLocator.resolve('window');
    // var token = this._window.localStorage.getItem('token');
    // if (token) {
    //   this.isGuest = false;
    // }
    this.isAuthorized();
  }  // if (this.isGuest) {
     // if (!bh.getStroreToken('token')) {
     //   // this.$context.location
     //   // this.$context.redirect('http://localhost:3000/login');
     // this.$context.redirect('/login?referrer=' + this.$context.location.path);
     // } else {
     //   // this._logger.info('this.$context.cookie:' + this.isGuest);
     //   // this._logger.info(this.$context.cookie);
     //   this._logger.info(this.$context.location);
     // }
}
/**
 * Current application config.
 * @type {Object}
 * @private
 */
Account.prototype._config = null;
Account.prototype.isAuthorized = function () {
  var key = this._config.authorization.resourceServers.siteApiAsUser.endpoint.accessTokenName;
  this._logger.info('----- TOKEN key: ' + key);
  // this._logger.info(this._config.authorization);
  if (!bh.getStroreToken(key)) {
    this.$context.redirect('/login?referrer=' + this.$context.location.path);
  }
};
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
  // this.isAuthorized();
  this._logger.info('--> Account | render');
  var self = this;
  return this.$context.getStoreData().then(function (result) {
    return self.localizeContext(result);
  });
};
/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
Account.prototype.bind = function () {
};  /**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
    // Account.prototype.unbind = function () {
    // };
