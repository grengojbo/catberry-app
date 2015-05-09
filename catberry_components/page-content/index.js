'use strict';

module.exports = PageContent;

var util = require('util'),
  ComponentBase = require('../../lib/ComponentBase');

util.inherits(PageContent, ComponentBase);

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "page-content" component.
 * @constructor
 */
function PageContent() {
  ComponentBase.call(this);
}

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
PageContent.prototype.render = function () {
  return this.$context.getStoreData();
};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
// PageContent.prototype.bind = function () {
//
// };

/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
// PageContent.prototype.unbind = function () {

// };
