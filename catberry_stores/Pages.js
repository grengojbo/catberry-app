'use strict';

module.exports = Pages;

/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

var ALLOWED_PAGES = {
		home: true,
		about: true,
		news: true,
		contact: false
	},
	DEFAULT_PAGE = 'home';

var PAGES = {
	home: 'Home Page',
	about: 'About',
	news: 'News',
	contact: 'Contats',
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
	// console.log(this.$context.state);
	if (!currentPage) {
		currentPage = DEFAULT_PAGE;
		// return this.$context.redirect('/about');
	}
	currentPage = currentPage.toLowerCase();
	console.log('-> currentPage: ' + currentPage);
	if (!ALLOWED_PAGES.hasOwnProperty(currentPage)) {
		currentPage = DEFAULT_PAGE;
	}
	var result = {
		title: this._config.title,
		subtitle: PAGES[currentPage],
		currentPage: currentPage,
		activePages: {},
		isMenu: {},
		names: PAGES
	};
	Object.keys(ALLOWED_PAGES)
		.forEach(function (page) {
			result.activePages[page] = (currentPage === page);
			if(ALLOWED_PAGES[page]) {
				result.isMenu[page] = true;
				// console.log(page);
			}
		});
	// console.log(result);
	return result;
};
