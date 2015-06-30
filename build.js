'use strict';

var isRelease = process.argv.length >= 3 ? process.argv[2] === 'release' : undefined,
	catberry = require('catberry'),
	templateEngine = require('catberry-handlebars'),
  config = require('./config/environment.json'),
	assets = require('catberry-assets');

config.isRelease = isRelease === undefined ? config.isRelease : isRelease;
// var cat = catberry.create({isRelease: isRelease});
var cat = catberry.create(config);

templateEngine.register(cat.locator);
assets.register(cat.locator);
cat.build();
