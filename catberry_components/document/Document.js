'use strict';
module.exports = Document;
var util = require('util'), ComponentBase = require('../../lib/ComponentBase');
util.inherits(Document, ComponentBase);
/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */
/**
 * Creates new instance of "document" component.
 * @constructor
 */
function Document() {
  ComponentBase.call(this);
}