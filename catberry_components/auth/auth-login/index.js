'use strict';

module.exports = AuthLogin;

var util = require('util'),
  lh = require("../../../lib/helpers/l10nHelper"),
  ComponentBase = require('../../../lib/ComponentBase'),
  loginId = {
    username: 'cat-input-login-username',
    password: 'cat-input-login-password'
  },
  submitId = 'cat-button-submit-login';

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
function AuthLogin($serviceLocator, $config) {
  ComponentBase.call(this);
  this._logger = $serviceLocator.resolve("logger");
  if (this.$context.isBrowser) {
    this._window = $serviceLocator.resolve('window');
  }
}

AuthLogin.prototype._window = null;

/**
 * Current application config.
 * @type {Object}
 * @private
 */
AuthLogin.prototype._config = null;

/**
 * Current application logger.
 * @type {Object}
 * @private
 */
AuthLogin.prototype._logger = null;

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
  // this._hideAllTooltips();
  var self = this;
  var bindLogin = {
      submit: {
        form: this._handleSubmitLogin
      },
      change:{},
      input:{}
    };
  // return bindLogin;
  return Object.keys(loginId).forEach(function(c){
      var d="#"+loginId[c]+" input";
      bindLogin.input[d]=bindLogin.change[d]=self._handleValidateLogin;
    }),bindLogin;
};

/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
// AuthLogin.prototype.unbind = function () {

// };

AuthLogin.prototype._handleValidateLogin = function () {
  this._logger.info('----------------- _handleValidateLogin -----------------');
  var submit = this.$context.getComponentById(submitId),
    username = this.$context.getComponentById(loginId.username).getValue(),
    password = this.$context.getComponentById(loginId.password).getValue();
  if (password.length > 4 && username.length > 4) {
    submit.enable();
  } else {
    submit.disable();
  }
};

AuthLogin.prototype._handleSubmitLogin = function (event) {
  event.preventDefault();
  event.stopPropagation();
  this.showLoader();
  this._logger.info('----------------- _handleSubmitLogin ----------------- ' + loginId.username);
  this._logger.info(this.$context);
  var self = this,
    lp = lh.getLocalizationProvider(this.$context),
    curLocale = lh.getCurrentLocale(this.$context),
    username = this.$context.getComponentById(loginId.username),
    password = this.$context.getComponentById(loginId.password),
    submit = this.$context.getComponentById(submitId);
  this._logger.info('---> SubmitLogin --- username: '+username.getValue()+ ' password: ' + password.getValue());
  // this._logger.info('---> SubmitLogin --- password: ' + password.getValue());
  submit.disable();
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