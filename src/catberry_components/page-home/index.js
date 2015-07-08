'use strict';

module.exports = PageHome;

var util = require('util'),
	ComponentBase = require('../../lib/ComponentBase');

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
	ComponentBase.call(this);
  return this.$context.getStoreData();
}