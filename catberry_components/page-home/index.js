'use strict';
module.exports = PageHome;
var util = require('util'), ComponentBase = require('../../lib/ComponentBase');
util.inherits(PageHome, ComponentBase);
/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */
/**
 * Creates new instance of the "cat-page-home" component.
 * @extends ComponentBase
 * @constructor
 */
function PageHome() {
  void 0;
  ComponentBase.call(this);
}

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
PageHome.prototype.render = function () {
  void 0;
  return this.$context.getStoreData();
};
