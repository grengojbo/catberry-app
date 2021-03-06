'use strict';

module.exports = Pages;

var bh = require('../lib/helpers/browserHelper');
/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

var DEFAULT_PAGE = 'home';

var PRIVATE_PAGES = {
  account: true
};

var ALLOWED_PAGES = {
  home: true,
  about: true,
  news: true,
  gallery: false,
  contact: true,
  account: true,
  login: false,
  logout: false
};

var TEMPLATE_PAGES = {
  home: 'page-home',
  about: 'page-content',
  news: 'articles-list',
  gallery: 'page-content',
  contact: 'page-content',
  account: 'account',
  login: 'auth-login',
  logout: 'auth-logout'
};

var STORE_PAGES = {
  home: 'Main',
  about: 'Contents',
  news: 'articles/List',
  gallery: 'Contents',
  contact: 'Documents',
  account: 'Account',
  login: 'auth/Login',
  logout: 'auth/Logout'
};

var PAGES = {
  home: 'Home Page',
  about: 'About',
  news: 'News',
  gallery: 'Photo Gallery',
  contact: 'Contats',
  commits: 'Commits to Catberry Framework repository',
  search: 'Search in Catberry\'s code',
  account: 'Account',
  login: 'Log In',
  logout: 'Log Out'
};

/**
 * Creates new instance of the 'Pages' store.
 * @param {Object} $config Application config.
 * @constructor
 */
function Pages($serviceLocator, $config) {
  this._config = $config;
  this._logger = $serviceLocator.resolve('logger');
  if (this.$context.isBrowser) {
    this._logger.info('----> Pages | isBrowser --------');
    this.isAuthorized();
  }
}

/**
 * Current application config.
 * @type {Object}
 * @private
 */
Pages.prototype._config = null;

/**
 * Current application logger.
 * @type {Object}
 * @private
 */
Pages.prototype._logger = null;

Pages.prototype.isGuest = true;

Pages.prototype.isUser = false;
/**
 * Current lifetime of data (in milliseconds) that is returned by this store.
 * @type {number} Lifetime in milliseconds.
 */
Pages.prototype.$lifetime = 3600000;
// Pages.prototype.$lifetime = 60000;

Pages.prototype.isAuthorized = function () {
  var key = this._config.authorization.resourceServers.siteApiAsUser.endpoint.accessTokenName;
  if (bh.getStroreToken(key)) {
    this.isGuest = false;
    this.isUser = true;
    this._logger.info('----> Pages | isAuthorized ---- TRUE');
  } else {
    this.isGuest = true;
    this.isUser = false;
    this._logger.info('----> Pages | isAuthorized ---- FALSE');
  }
  this.$context.changed();
};

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
Pages.prototype.load = function () {
  var currentPage = this.$context.state.page;
  var isPrivate = false;
  // console.log(this.$context.state);
  if (!currentPage) {
    currentPage = DEFAULT_PAGE;
    // return this.$context.redirect('/about');
  }
  currentPage = currentPage.toLowerCase();
  console.log('-> currentPage: ' + currentPage);
  // trace, info, warn, error, fatal
  // this._logger.info('----------------------- LOGGER ------');
  if (!ALLOWED_PAGES.hasOwnProperty(currentPage)) {
    currentPage = DEFAULT_PAGE;
  }
  if (PRIVATE_PAGES.hasOwnProperty(currentPage)) {
    isPrivate = true;
  }
  if (this.$context.isBrowser) {
    this._logger.info('----> Pages | load | isBrowser --------');
    this.isAuthorized();
  }

  var result = {
    title: this._config.title,
    subtitle: PAGES[currentPage],
    currentPage: currentPage,
    templatePage: TEMPLATE_PAGES[currentPage],
    storePage: STORE_PAGES[currentPage],
    activePages: {},
    isMenu: {},
    isPrivate: isPrivate,
    isGuest: this.isGuest,
    isUser: this.isUser,
    names: PAGES
  };
  Object.keys(ALLOWED_PAGES)
    .forEach(function (page) {
      result.activePages[page] = (currentPage === page);
      if (ALLOWED_PAGES[page]) {
        result.isMenu[page] = true;
        // console.log(page);
      }
    });
  // console.log(result);
  return result;
};
