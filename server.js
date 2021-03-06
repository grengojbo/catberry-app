'use strict';

// require('newrelic');

var OAuth2Client = require('catberry-oauth2-client'),
	catberry = require('catberry'),
	isRelease = process.argv.length >= 3 ? process.argv[2] === 'release' : undefined,
	port = process.argv.length >= 4 ? Number(process.argv[3]) : undefined;

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
	sm = require('sitemap'),
	cat = catberry.create(config),
	app = connect();

config.publicPath = publicPath;
config.server.port = port || config.server.port || 3000;
config.isRelease = isRelease === undefined ? config.isRelease : isRelease;

var READY_MESSAGE = 'START App >>> Ready to handle incoming requests on port: %d | isRelease: ' + config.isRelease;

templateEngine.register(cat.locator);
l10n.register(cat.locator);
localizationHelper.register(cat.locator);

var sitemap = sm.createSitemap ({
      hostname:  config.siteUrl || 'http://localhost',
      cacheTime: 60000000,        // 600 sec - cache purge period
      urls: [
        { url: '/', changefreq: 'weekly', priority: 1.0 },
        { url: '/about', changefreq: 'weekly', priority: 0.5 },
        { url: '/news',  changefreq: 'weekly', priority: 0.9 }
      ]
});

app.get('/sitemap.xml', function(req, res) {
	sitemap.toXML(function(xml) {
		res.header('Content-Type', 'application/xml');
		res.send(xml);
	});
});

var serveStatic = require('serve-static');
app.use(serveStatic(publicPath));
// app.use('/public', serveStatic(publicPath));
app.use('/robots.txt', serveStatic(path.join(publicPath, 'robots.txt')));
app.use('/favicon.ico', serveStatic(path.join(publicPath, 'favicon.ico')));
// app.use('/favicon.png', serveStatic(path.join(publicPath, 'favicon.png')));

// var gitHubClient = cat.locator.resolveInstance(GitHubClient, config);
// app.use('/public/html/github', gitHubClient.getMiddleware());

var localizationLoader = cat.locator.resolve('localizationLoader');
app.use(localizationLoader.getMiddleware());

// register all types of OAuth 2.0 client plugin
OAuth2Client.register(cat.locator);
// create factory instance with current configuration
var OAuth2FlowFactory = cat.locator.resolve('oauth2FlowFactory');
// add all endpoints required for OAuth 2.0 authorization to connect application
OAuth2FlowFactory.addEndpoints(app);

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
