'use strict';
module.exports = AuthLogin;
var util = require('util'), lh = require('../../../lib/helpers/l10nHelper'), ComponentBase = require('../../../lib/ComponentBase'), loginId = {
    username: 'cat-input-login-username',
    password: 'cat-input-login-password'
  }, messageId = 'cat-error-message-login', submitId = 'cat-button-submit-login';
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
  this._config = $config;
  this._logger = $serviceLocator.resolve('logger');
  if (this.$context.isBrowser) {
    this._window = $serviceLocator.resolve('window');
  }
}
AuthLogin.prototype.referrer = '/account';
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
AuthLogin.prototype.setStore = function (key, val) {
  this._window.localStorage.setItem(key, val);
};
/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
AuthLogin.prototype.render = function () {
  // this.referrer = this.$context.referrer.path;
  // if (this.$context.state.referrer) {
  // this.referrer = this.$context.state.referrer;
  // }
  var self = this;
  this._logger.info('isGuest: ' + this.isGuest);
  this._logger.info('referrer: ' + this.referrer);
  this._logger.info(this.$context);
  return this.$context.getStoreData().then(function (result) {
    // return {data: result};
    return self.localizeContext(result);
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
    submit: { form: this._handleSubmitLogin },
    change: {},
    input: {}
  };
  // return bindLogin;
  return Object.keys(loginId).forEach(function (c) {
    var d = '#' + loginId[c] + ' input';
    bindLogin.input[d] = bindLogin.change[d] = self._handleValidateLogin;
  }), bindLogin;
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
  var submit = this.$context.getComponentById(submitId), username = this.$context.getComponentById(loginId.username), password = this.$context.getComponentById(loginId.password);
  if (password.isValid() && username.isValid()) {
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
  var self = this, key = this._config.authorization.resourceServers.siteApiAsUser.endpoint.accessTokenName, lp = lh.getLocalizationProvider(this.$context), curLocale = lh.getCurrentLocale(this.$context), username = this.$context.getComponentById(loginId.username), password = this.$context.getComponentById(loginId.password), message = this.$context.getComponentById(messageId), submit = this.$context.getComponentById(submitId);
  this._logger.info('---> SubmitLogin --- username: ' + username.getValue() + ' password: ' + password.getValue());
  // this._logger.info('---> SubmitLogin --- password: ' + password.getValue());
  submit.disable();
  this.$context.sendAction('sign-in', {
    username: username.getValue(),
    password: password.getValue()
  }).then(function (result) {
    if (result.status === 'success') {
      self._logger.info('---> User ' + username.getValue() + ' is login!');
      // self._logger.info(result);
      self.isGuest = false;
      self.setStore('token', result.data.token);
      // return void self.$context.redirect('/about');
      self.$context.redirect(result.referrer);
    } else {
      self.hideLoader();
      username.clear();
      password.clear();
      message.setText(lp.get(curLocale, 'ERROR_LOGIN'));
      // message.setLabel(lp.get(curLocale, 'ERROR_LOGIN'));
      message.show();
      username.focus();
    }
  });  // .catch(function(data){
       //   self.hideLoader();
       //   username.clear();
       //   password.clear();
       //   message.setText(lp.get(curLocale, 'ERROR_LOGIN'));
       //   // message.setLabel(lp.get(curLocale, 'ERROR_LOGIN'));
       //   message.show();
       //   username.focus();
       // });
};
/**
 * Hides loader in template.
 */
AuthLogin.prototype.hideLoader = function () {
  var loaders = this.$context.element.getElementsByTagName('cat-loader');
  for (var i = 0; i < loaders.length; i++) {
    loaders[i].style.display = 'none';
  }
};
/**
 * Shows loader in template.
 */
AuthLogin.prototype.showLoader = function () {
  var loaders = this.$context.element.getElementsByTagName('cat-loader');
  for (var i = 0; i < loaders.length; i++) {
    loaders[i].style.display = '';
  }
};