'use strict';

// require('newrelic');

var catberry = require('catberry'),
	isRelease = process.argv.length >= 3 ?
		process.argv[2] === 'release' : undefined,
	port = process.argv.length >= 4 ?
		Number(process.argv[3]) : undefined;

var http = require('http'),
	util = require('util'),
	path = require('path'),
	publicPath = path.join(__dirname, 'public'),
	// connect = require('connect'),
	connect = require('express'),
	config = require('./config/environment.json'),
	templateEngine = require('catberry-handlebars'),
	l10n = require('catberry-l10n'),
	localizationHelper = require('catberry-l10n-handlebars-helper'),
	// GitHubClient = require('./lib/GitHubClient'),
	cat = catberry.create(config),
	app = connect();

var READY_MESSAGE = 'START App >>> Ready to handle incoming requests on port: %d publicPath: ' + publicPath;

config.publicPath = publicPath;
config.server.port = port || config.server.port || 3000;
config.isRelease = isRelease === undefined ? config.isRelease : isRelease;

templateEngine.register(cat.locator);
l10n.register(cat.locator);
localizationHelper.register(cat.locator);

var serveStatic = require('serve-static');
app.use(serveStatic(publicPath));
// app.use('/public', serveStatic(publicPath));
app.use('/robots.txt', serveStatic(path.join(publicPath, 'robots.txt')));
app.use('/favicon.ico', serveStatic(path.join(publicPath, 'favicon.ico')));

// var gitHubClient = cat.locator.resolveInstance(GitHubClient, config);
// app.use('/public/html/github', gitHubClient.getMiddleware());

var localizationLoader = cat.locator.resolve('localizationLoader');
app.use(localizationLoader.getMiddleware());

app.use(cat.getMiddleware());

var errorhandler = require('errorhandler');
app.use(errorhandler());

cat.events.on('ready', function () {
	var logger = cat.locator.resolve('logger');
	logger.info(util.format(READY_MESSAGE, config.server.port));
});

http
	.createServer(app)
	.listen(config.server.port);
