'use strict';
module.exports = PageContent;
var util = require('util'), ComponentBase = require('../../lib/ComponentBase');
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
  void 0;
  // console.log(this.$context.attributes);
  if (this.$context.attributes.slug) {
    this.slug = this.$context.attributes.slug;
    this.$context.sendAction('slug', this.slug);
  }
  ComponentBase.call(this);
}
PageContent.prototype.slug = null;
/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
PageContent.prototype.render = function () {
  // console.log('---> PageContent / render');
  // console.log(this.$context.attributes);
  // console.log('attribute.slug: ' + this.$context.attributes.slug);
  // console.log('---> slug: ' + this.slug);
  return this.$context.getStoreData();
};  /**
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
