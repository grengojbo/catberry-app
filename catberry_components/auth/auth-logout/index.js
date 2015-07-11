'use strict';
module.exports = AuthLogout;
/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */
/**
 * Creates new instance of the "auth-logout" component.
 * @constructor
 */
function AuthLogout($serviceLocator, $config) {
  // ComponentBase.call(this);
  this._config = $config;
  if (this.$context.isBrowser) {
    this._window = $serviceLocator.resolve('window');
  }
}
AuthLogout.prototype._window = null;
/**
 * Current application config.
 * @type {Object}
 * @private
 */
AuthLogout.prototype._config = null;
/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
AuthLogout.prototype.render = function () {
  this._window.localStorage.clear();
  this.$context.redirect(this._config.logOutRedirect);
};  /**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
    // AuthLogout.prototype.bind = function () {
    // return {
    //   click: {
    //     'a.#cat-logout': this._clickHandlerLogOut
    //   }
    //   };
    // };
    // AuthLogout.prototype._clickHandlerLogOut = function (event) {
    //   event.preventDefault();
    //   event.stopPropagation();
    //   this._window.localStorage.clear();
    //   this.$context.redirect(this._config.logOutRedirect);
    // };
