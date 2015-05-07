'use strict';

var isRelease = process.argv.length === 3 ?
		process.argv[2] === 'release' : undefined,
	catberry = require('catberry'),
	templateEngine = require('catberry-handlebars'),
	assets = require('catberry-assets'),
	cat = catberry.create({isRelease: isRelease});

templateEngine.register(cat.locator);
assets.register(cat.locator);
cat.build();

