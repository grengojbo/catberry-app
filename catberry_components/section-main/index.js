'use strict';

module.exports = SectionMain;

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of "section-main" component.
 * @constructor
 */
function SectionMain() {

}

/**
 * Gets data for template.
 * @returns {Promise<Object>} Promise for data.
 */
SectionMain.prototype.render = function () {
	return this.$context.getStoreData();
};
