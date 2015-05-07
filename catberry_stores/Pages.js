'use strict';

module.exports = Pages;

/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

var ALLOWED_PAGES = {
		home: true,
		overview: true,
		documentation: true
	},
	DEFAULT_PAGE = 'home';

var PAGES = {
	home: 'Home Page',
	about: 'About Catberry Framework',
	commits: 'Commits to Catberry Framework repository',
	search: 'Search in Catberry\'s code'
};

/**
 * Creates new instance of the "Pages" store.
 * @param {Object} $config Application config.
 * @constructor
 */
function Pages($config) {
	this._config = $config;
}

/**
 * Current application config.
 * @type {Object}
 * @private
 */
Pages.prototype._config = null;

/**
 * Current lifetime of data (in milliseconds) that is returned by this store.
 * @type {number} Lifetime in milliseconds.
 */
Pages.prototype.$lifetime = 60000;
// Pages.prototype.$lifetime = 3600000;

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
Pages.prototype.load = function () {
	var currentPage = this.$context.state.page;
	if (!currentPage) {
		currentPage = DEFAULT_PAGE;
		// return this.$context.redirect('/about');
	}
	currentPage = currentPage.toLowerCase();
	if (!ALLOWED_PAGES.hasOwnProperty(currentPage)) {
		currentPage = DEFAULT_PAGE;
	}
	if (!PAGES.hasOwnProperty(currentPage)) {
		currentPage = DEFAULT_PAGE;
		// throw new Error(currentPage + ' page not found');
	}
	var result = {
		title: this._config.title,
		subtitle: PAGES[currentPage],
		current: currentPage,
		isActive: {}
	};
	Object.keys(PAGES)
		.forEach(function (page) {
			result.isActive[page] = (currentPage === page);
		});

	return result;
};
