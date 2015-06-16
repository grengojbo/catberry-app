'use strict';

var catberry = require('catberry'),
	// this config will be replaced by `./config/browser.json` when building
	// because of `browser` field in `package.json`
	config = require('./config/environment.json'),
	templateEngine = require('catberry-handlebars'),
	l10n = require('catberry-l10n'),
	localizationHelper = require('catberry-l10n-handlebars-helper'),
	cat = catberry.create(config);

// var jQuery = require('jquery');

// register template provider to Catberry Service Locator
templateEngine.register(cat.locator);
l10n.register(cat.locator);
localizationHelper.register(cat.locator);
// cat.locator.registerInstance('jquery', jQuery);

// catberry_components/<name>/index.js
// var $ = this.$context.locator.resolve('jquery');
// $('.class').html('<div>Hello, World!</div>');

cat.startWhenReady();
