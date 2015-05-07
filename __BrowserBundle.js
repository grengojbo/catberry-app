/*
 * catberry
 *
 * Copyright (c) 2014 Denis Rechkunov and project contributors.
 *
 * catberry's license follows:
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * This license applies to all parts of catberry that are not externally
 * maintained libraries.
 */

/**
 * This module is a template and it is used only with some string replaces
 * by BrowserBundleBuilder module. It does not work by itself.
 */

'use strict';

var stores = [

{name: 'Main', constructor: require('./catberry_stores/Main.js')}
];

var components = [

{name: 'document', constructor: require('./catberry_components/document/Document.js'), properties: {"name":"document","template":"./document.hbs","logic":"./Document.js"}, templateSource: '{"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {\n  return "<!DOCTYPE html>\\n<html>\\n<head></head>\\n<body>\\n\t<cat-hello-world id=\\"unique\\" cat-store=\\"Main\\"></cat-hello-world>\\n</body>\\n</html>\\n";\n  },"useData":true}', errorTemplateSource: null},
{name: 'head', constructor: require('./catberry_components/head/Head.js'), properties: {"name":"head","template":"./head.hbs","logic":"./Head.js"}, templateSource: '{"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {\n  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;\n  return "<meta charset=\\"UTF-8\\">\\n<title>"\n    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))\n    + "</title>\\n<script src=\\"bundle.js\\"></script>\\n\\n";\n},"useData":true}', errorTemplateSource: null},
{name: 'hello-world', constructor: require('./catberry_components/hello-world/HelloWorld.js'), properties: {"name":"hello-world","template":"./hello.hbs","errorTemplate":"./error.hbs","logic":"./HelloWorld.js"}, templateSource: '{"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {\n  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;\n  return "<h1>Hello, "\n    + escapeExpression(((helper = (helper = helpers.who || (depth0 != null ? depth0.who : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"who","hash":{},"data":data}) : helper)))\n    + "!</h1>\\n";\n},"useData":true}', errorTemplateSource: '{"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {\n  return "\\n";\n  },"useData":true}'}
];

var util = require('util'),
	routeDefinitions = require('./routes.js') || [],
	moduleHelper = require('./node_modules/catberry/lib/helpers/moduleHelper.js'),
	Catberry = require('./node_modules/catberry/browser/Catberry.js'),
	Logger = require('./node_modules/catberry/browser/Logger.js'),
	BootstrapperBase =
		require('./node_modules/catberry/lib/base/BootstrapperBase.js'),
	StoreDispatcher = require('./node_modules/catberry/lib/StoreDispatcher'),
	ModuleApiProvider =
		require('./node_modules/catberry/browser/providers/ModuleApiProvider'),
	CookieWrapper = require('./node_modules/catberry/browser/CookieWrapper');

var INFO_DOCUMENT_UPDATED = 'Document updated (%d store(s) changed)',
	INFO_COMPONENT_BOUND = 'Component "%s" is bound',
	INFO_COMPONENT_UNBOUND = 'Component "%s" is unbound';

util.inherits(Bootstrapper, BootstrapperBase);

/**
 * Creates new instance of the browser Catberry's bootstrapper.
 * @constructor
 * @extends BootstrapperBase
 */
function Bootstrapper() {
	BootstrapperBase.call(this, Catberry);
}

/**
 * Configures Catberry's service locator.
 * @param {Object} configObject Application config object.
 * @param {ServiceLocator} locator Service locator to configure.
 */
Bootstrapper.prototype.configure = function (configObject, locator) {
	BootstrapperBase.prototype.configure.call(this, configObject, locator);

	// if browser still does not have promises then add it.
	if (!('Promise' in window)) {
		window.Promise = locator.resolve('promise');
	}

	locator.register('storeDispatcher', StoreDispatcher, configObject, true);
	locator.register(
		'moduleApiProvider', ModuleApiProvider, configObject, true
	);
	locator.register('cookieWrapper', CookieWrapper, configObject, true);

	locator.registerInstance('window', window);

	var loggerConfig = configObject.logger || {},
		logger = new Logger(loggerConfig.levels);
	locator.registerInstance('logger', logger);
	window.onerror = function errorHandler(msg, uri, line) {
		logger.fatal(uri + ':' + line + ' ' + msg);
		return true;
	};
	var eventBus = locator.resolve('eventBus');
	this._wrapEventsWithLogger(eventBus, logger);

	routeDefinitions.forEach(function (routeDefinition) {
		locator.registerInstance('routeDefinition', routeDefinition);
	});

	stores.forEach(function (store) {
		locator.registerInstance('store', store);
	});

	components.forEach(function (component) {
		locator.registerInstance('component', component);
	});
};

/**
 * Wraps event bus with log messages.
 * @param {EventEmitter} eventBus Event emitter that implements event bus.
 * @param {Logger} logger Logger to write messages.
 * @protected
 */
Bootstrapper.prototype._wrapEventsWithLogger = function (eventBus, logger) {
	BootstrapperBase.prototype._wrapEventsWithLogger
		.call(this, eventBus, logger);
	eventBus
		.on('documentUpdated', function (args) {
			logger.info(util.format(INFO_DOCUMENT_UPDATED, args.length));
		})
		.on('componentBound', function (args) {
			logger.info(util.format(
				INFO_COMPONENT_BOUND,
				args.element.tagName + (args.id ? '#' + args.id : '')
			));
		})
		.on('componentUnbound', function (args) {
			logger.info(util.format(
				INFO_COMPONENT_UNBOUND,
				args.element.tagName + (args.id ? '#' + args.id : '')
			));
		});
};

module.exports = new Bootstrapper();