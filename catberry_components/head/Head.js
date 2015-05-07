'use strict';

module.exports = Head;

var util = require('util'),
  ComponentBase = require('../../lib/ComponentBase');

util.inherits(Head, ComponentBase);

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of "head" component.
 * @param {Object} $config Catberry application config.
 * @constructor
 */
function Head($config) {
	this._config = $config;
  ComponentBase.call(this);
}

/**
 * Current config.
 * @type {Object}
 * @private
 */
Head.prototype._config = null;

/**
 * Gets data for template.
 * @returns {Object} Data object.
 */
Head.prototype.render = function () {
  var self = this,
    location = this.$context.location.clone(),
    socialLogo = this.$context.location.clone();
  location.scheme = 'http';
  socialLogo.scheme = location.scheme;
  socialLogo.path = '/assets/head/images/social-logo.png';
  return this.$context.getStoreData()
    .then(function (pages) {
      console.log('------------> Head / pages.currentPage: ' + pages.currentPage);
      console.log(pages);
      return self.localizeContext({
        socialLogo: socialLogo,
        location: location,
        page: pages,
        pageTitleKey: pages.currentPage !== 'home' ? 'PAGE_TITLE_' + pages.currentPage.toUpperCase() : null
      });
    });
};
