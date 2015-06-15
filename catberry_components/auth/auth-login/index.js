'use strict';

module.exports = AuthLogin;

var util = require('util'),
  ComponentBase = require('../../../lib/ComponentBase');

util.inherits(AuthLogin, ComponentBase);

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "auth-login" component.
 * @constructor
 */
function AuthLogin($serviceLocator) {
  ComponentBase.call(this);
  if (this.$context.isBrowser) {
    this._window = $serviceLocator.resolve('window');
  }
}

AuthLogin.prototype._window = null;
/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
AuthLogin.prototype.render = function () {
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
AuthLogin.prototype.bind = function () {
  this.hideLoader();
  return {
    submit: {
      form: this._handleFormSubmit
    }
  };
};

/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
// AuthLogin.prototype.unbind = function () {

// };

AuthLogin.prototype._handleFormSubmit = function (event) {
  event.preventDefault();
  event.stopPropagation();
  this.showLoader();
  // setTimeout(console.log('sleep'),10000);
  // this.hideLoader();
  // this.$context.redirect('/search?query=' + this.getQuery());
};



/**
 * Hides loader in template.
 */
AuthLogin.prototype.hideLoader = function () {
  var loaders = this.$context.element.getElementsByTagName('cat-loader');
  for(var i = 0; i < loaders.length; i++) {
    loaders[i].style.display = 'none';
  }
};

/**
 * Shows loader in template.
 */
AuthLogin.prototype.showLoader = function () {
  var loaders = this.$context.element.getElementsByTagName('cat-loader');
  for(var i = 0; i < loaders.length; i++) {
    loaders[i].style.display = '';
  }
};