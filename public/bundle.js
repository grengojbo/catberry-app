/*
 * catberry-app: 0.0.2
 * Build Date: Thu May 07 2015 18:53:23 GMT+0300 (EEST)
 */

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var catberry = require('catberry'),
	// this config will be replaced by `./config/browser.json` when building
	// because of `browser` field in `package.json`
	config = require('./config/environment.json'),
	templateEngine = require('catberry-handlebars'),
	l10n = require('catberry-l10n'),
	localizationHelper = require('catberry-l10n-handlebars-helper'),
	cat = catberry.create(config);

// register template provider to Catberry Service Locator
templateEngine.register(cat.locator);
l10n.register(cat.locator);
localizationHelper.register(cat.locator);
cat.startWhenReady();


},{"./config/environment.json":7,"catberry":26,"catberry-handlebars":12,"catberry-l10n":16,"catberry-l10n-handlebars-helper":13}],2:[function(require,module,exports){
'use strict';

module.exports = Document;

var util = require('util'),
  ComponentBase = require('../../lib/ComponentBase');

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

},{"../../lib/ComponentBase":8,"util":46}],3:[function(require,module,exports){
'use strict';

module.exports = Head;

var util = require('util'),
  ComponentBase = require('../../lib/ComponentBase');

util.inherits(Head, ComponentBase);

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of "head" component.
 * @param {Object} $config Catberry application config.
 * @constructor
 */
function Head($config) {
	this._config = $config;
  ComponentBase.call(this);
}

/**
 * Current config.
 * @type {Object}
 * @private
 */
Head.prototype._config = null;

/**
 * Gets data for template.
 * @returns {Object} Data object.
 */
Head.prototype.render = function () {
  var self = this,
    location = this.$context.location.clone(),
    socialLogo = this.$context.location.clone();
  location.scheme = 'http';
  socialLogo.scheme = location.scheme;
  socialLogo.path = '/assets/head/images/social-logo.png';
  return this.$context.getStoreData()
    .then(function (pages) {
      console.log('------------> ' + pages.currentPage);
      return self.localizeContext({
        socialLogo: socialLogo,
        location: location,
        pageTitleKey: pages.currentPage !== 'home' ?
          'PAGE_TITLE_' + pages.currentPage : null
        // pageTitleKey: pages.currentPage !== 'home' ?
          // 'PAGE_TITLE_' + pages.currentPage.toUpperCase() : null
      });
    });
};

},{"../../lib/ComponentBase":8,"util":46}],4:[function(require,module,exports){
'use strict';

module.exports = HelloWorld;

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of "hello-world" component.
 * @constructor
 */
function HelloWorld() {

}

/**
 * Gets data for template.
 * @returns {Promise<Object>} Promise for data.
 */
HelloWorld.prototype.render = function () {
	return this.$context.getStoreData();
};

},{}],5:[function(require,module,exports){
'use strict';

module.exports = Main;

/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of "Main" store.
 * @constructor
 */
function Main() {

}

/**
 * Loads data from somewhere.
 * @returns {Object} Data object.
 */
Main.prototype.load = function () {
	return {who: 'World'};
};

},{}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
module.exports={
	"title": "Catberry Project",
  "gitHubClient": {
    "host": "https://api.github.com",
    "accessToken": "your secret token here"
  },
  "l10n": {
    "defaultLocale": "ru",
    "cookie": {
      "path": "/"
    }
  },
  "googleAnalytics": {
    "id": "UA-XXXXXXXX-X"
  },
  "server": {
    "port": 3000
  },
  "assets": {
    "watchInterval": 0
  },
  "componentsGlob": "catberry_components/**/cat-component.json",
  "isRelease": true
}

},{}],8:[function(require,module,exports){
/*
 * catberry-homepage
 *
 * Copyright (c) 2015 Denis Rechkunov and project contributors.
 *
 * catberry-homepage's license follows:
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
 * This license applies to all parts of catberry-homepage that are not
 * externally maintained libraries.
 */

'use strict';

module.exports = ComponentBase;

var l10nHelper = require('./helpers/l10nHelper');

/**
 * Creates new instance of basic component.
 * @constructor
 */
function ComponentBase() {

}

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
ComponentBase.prototype.render = function () {
	return this.localizeContext();
};

/**
 * Adds locale to any data object.
 * @param {Object?} data Optional data object.
 * @returns {Object} Data object with locale.
 */
ComponentBase.prototype.localizeContext = function (data) {
	data = data || {};
  data.isMobile = false;
  data.isAndroid = false;
  data.isIphone = false;
	data.locale = l10nHelper.getCurrentLocale(this.$context);
	return data;
};

/**
 * Binds events.
 */
ComponentBase.prototype.bind = function () {
	var loaders = this.$context.element.querySelectorAll('div.loader');

	for (var i = 0; i < loaders.length; i++) {
		loaders[i].style.display = 'none';
	}
};
},{"./helpers/l10nHelper":9}],9:[function(require,module,exports){
/*
 * catberry-homepage
 *
 * Copyright (c) 2015 Denis Rechkunov and project contributors.
 *
 * catberry-homepage's license follows:
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
 * This license applies to all parts of catberry-homepage that are not
 * externally maintained libraries.
 */

'use strict';

var l10n = null;

module.exports = {

	/**
	 * Gets localization provider.
	 * @param {Object} context
	 * @returns {LocalizationProvider}
	 */
	getLocalizationProvider: function (context) {
		l10n = l10n || context.locator.resolve('localizationProvider');
		return l10n;
	},

	/**
	 * Gets current locale.
	 * @param {Object} context
	 * @returns {string}
	 */
	getCurrentLocale: function (context) {
		return this.getLocalizationProvider(context)
			.getCurrentLocale(context);
	}
};
},{}],10:[function(require,module,exports){
/*
 * catberry-handlebars
 *
 * Copyright (c) 2015 Denis Rechkunov and project contributors.
 *
 * catberry-handlebars's license follows:
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
 * This license applies to all parts of catberry-handlebars that are not externally
 * maintained libraries.
 */

'use strict';

module.exports = TemplateProvider;

/**
 * Creates new instance of Handlebars template provider.
 * @param {Handlebars} $handlebars Handlebars factory.
 * @constructor
 */
function TemplateProvider($handlebars) {
	this._handlebars = $handlebars;
	this._templates = {};
}

/**
 * Current Handlebars factory.
 * @type {Handlebars}
 * @private
 */
TemplateProvider.prototype._handlebars = null;

/**
 * Current set of registered templates.
 * @type {Object}
 * @private
 */
TemplateProvider.prototype._templates = null;

/**
 * Registers compiled (precompiled) Handlebars template.
 * http://handlebarsjs.com/reference.html
 * @param {String} name Template name.
 * @param {String} compiled Compiled template source.
 */
TemplateProvider.prototype.registerCompiled = function (name, compiled) {
	// jshint evil:true
	var specs = new Function('return ' + compiled + ';');
	this._templates[name] = this._handlebars.template(specs());
};

/**
 * Renders template with specified data.
 * @param {String} name Name of template.
 * @param {Object} data Data context for template.
 * @returns {*}
 */
TemplateProvider.prototype.render = function (name, data) {
	if (!this._templates.hasOwnProperty(name)) {
		return Promise.reject(new Error('No such template'));
	}

	var promise;
	try {
		promise = Promise.resolve(this._templates[name](data));
	} catch(e) {
		promise = Promise.reject(e);
	}
	return promise;
};
},{}],11:[function(require,module,exports){
/*!

 handlebars v2.0.0

Copyright (C) 2011-2014 by Yehuda Katz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

@license
*/
/* exported Handlebars */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Handlebars = root.Handlebars || factory();
  }
}(this, function () {
// handlebars/safe-string.js
var __module3__ = (function() {
  "use strict";
  var __exports__;
  // Build out our basic SafeString type
  function SafeString(string) {
    this.string = string;
  }

  SafeString.prototype.toString = function() {
    return "" + this.string;
  };

  __exports__ = SafeString;
  return __exports__;
})();

// handlebars/utils.js
var __module2__ = (function(__dependency1__) {
  "use strict";
  var __exports__ = {};
  /*jshint -W004 */
  var SafeString = __dependency1__;

  var escape = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "`": "&#x60;"
  };

  var badChars = /[&<>"'`]/g;
  var possible = /[&<>"'`]/;

  function escapeChar(chr) {
    return escape[chr];
  }

  function extend(obj /* , ...source */) {
    for (var i = 1; i < arguments.length; i++) {
      for (var key in arguments[i]) {
        if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
          obj[key] = arguments[i][key];
        }
      }
    }

    return obj;
  }

  __exports__.extend = extend;var toString = Object.prototype.toString;
  __exports__.toString = toString;
  // Sourced from lodash
  // https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
  var isFunction = function(value) {
    return typeof value === 'function';
  };
  // fallback for older versions of Chrome and Safari
  /* istanbul ignore next */
  if (isFunction(/x/)) {
    isFunction = function(value) {
      return typeof value === 'function' && toString.call(value) === '[object Function]';
    };
  }
  var isFunction;
  __exports__.isFunction = isFunction;
  /* istanbul ignore next */
  var isArray = Array.isArray || function(value) {
    return (value && typeof value === 'object') ? toString.call(value) === '[object Array]' : false;
  };
  __exports__.isArray = isArray;

  function escapeExpression(string) {
    // don't escape SafeStrings, since they're already safe
    if (string instanceof SafeString) {
      return string.toString();
    } else if (string == null) {
      return "";
    } else if (!string) {
      return string + '';
    }

    // Force a string conversion as this will be done by the append regardless and
    // the regex test will do this transparently behind the scenes, causing issues if
    // an object's to string has escaped characters in it.
    string = "" + string;

    if(!possible.test(string)) { return string; }
    return string.replace(badChars, escapeChar);
  }

  __exports__.escapeExpression = escapeExpression;function isEmpty(value) {
    if (!value && value !== 0) {
      return true;
    } else if (isArray(value) && value.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  __exports__.isEmpty = isEmpty;function appendContextPath(contextPath, id) {
    return (contextPath ? contextPath + '.' : '') + id;
  }

  __exports__.appendContextPath = appendContextPath;
  return __exports__;
})(__module3__);

// handlebars/exception.js
var __module4__ = (function() {
  "use strict";
  var __exports__;

  var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

  function Exception(message, node) {
    var line;
    if (node && node.firstLine) {
      line = node.firstLine;

      message += ' - ' + line + ':' + node.firstColumn;
    }

    var tmp = Error.prototype.constructor.call(this, message);

    // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
    for (var idx = 0; idx < errorProps.length; idx++) {
      this[errorProps[idx]] = tmp[errorProps[idx]];
    }

    if (line) {
      this.lineNumber = line;
      this.column = node.firstColumn;
    }
  }

  Exception.prototype = new Error();

  __exports__ = Exception;
  return __exports__;
})();

// handlebars/base.js
var __module1__ = (function(__dependency1__, __dependency2__) {
  "use strict";
  var __exports__ = {};
  var Utils = __dependency1__;
  var Exception = __dependency2__;

  var VERSION = "2.0.0";
  __exports__.VERSION = VERSION;var COMPILER_REVISION = 6;
  __exports__.COMPILER_REVISION = COMPILER_REVISION;
  var REVISION_CHANGES = {
    1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
    2: '== 1.0.0-rc.3',
    3: '== 1.0.0-rc.4',
    4: '== 1.x.x',
    5: '== 2.0.0-alpha.x',
    6: '>= 2.0.0-beta.1'
  };
  __exports__.REVISION_CHANGES = REVISION_CHANGES;
  var isArray = Utils.isArray,
      isFunction = Utils.isFunction,
      toString = Utils.toString,
      objectType = '[object Object]';

  function HandlebarsEnvironment(helpers, partials) {
    this.helpers = helpers || {};
    this.partials = partials || {};

    registerDefaultHelpers(this);
  }

  __exports__.HandlebarsEnvironment = HandlebarsEnvironment;HandlebarsEnvironment.prototype = {
    constructor: HandlebarsEnvironment,

    logger: logger,
    log: log,

    registerHelper: function(name, fn) {
      if (toString.call(name) === objectType) {
        if (fn) { throw new Exception('Arg not supported with multiple helpers'); }
        Utils.extend(this.helpers, name);
      } else {
        this.helpers[name] = fn;
      }
    },
    unregisterHelper: function(name) {
      delete this.helpers[name];
    },

    registerPartial: function(name, partial) {
      if (toString.call(name) === objectType) {
        Utils.extend(this.partials,  name);
      } else {
        this.partials[name] = partial;
      }
    },
    unregisterPartial: function(name) {
      delete this.partials[name];
    }
  };

  function registerDefaultHelpers(instance) {
    instance.registerHelper('helperMissing', function(/* [args, ]options */) {
      if(arguments.length === 1) {
        // A missing field in a {{foo}} constuct.
        return undefined;
      } else {
        // Someone is actually trying to call something, blow up.
        throw new Exception("Missing helper: '" + arguments[arguments.length-1].name + "'");
      }
    });

    instance.registerHelper('blockHelperMissing', function(context, options) {
      var inverse = options.inverse,
          fn = options.fn;

      if(context === true) {
        return fn(this);
      } else if(context === false || context == null) {
        return inverse(this);
      } else if (isArray(context)) {
        if(context.length > 0) {
          if (options.ids) {
            options.ids = [options.name];
          }

          return instance.helpers.each(context, options);
        } else {
          return inverse(this);
        }
      } else {
        if (options.data && options.ids) {
          var data = createFrame(options.data);
          data.contextPath = Utils.appendContextPath(options.data.contextPath, options.name);
          options = {data: data};
        }

        return fn(context, options);
      }
    });

    instance.registerHelper('each', function(context, options) {
      if (!options) {
        throw new Exception('Must pass iterator to #each');
      }

      var fn = options.fn, inverse = options.inverse;
      var i = 0, ret = "", data;

      var contextPath;
      if (options.data && options.ids) {
        contextPath = Utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
      }

      if (isFunction(context)) { context = context.call(this); }

      if (options.data) {
        data = createFrame(options.data);
      }

      if(context && typeof context === 'object') {
        if (isArray(context)) {
          for(var j = context.length; i<j; i++) {
            if (data) {
              data.index = i;
              data.first = (i === 0);
              data.last  = (i === (context.length-1));

              if (contextPath) {
                data.contextPath = contextPath + i;
              }
            }
            ret = ret + fn(context[i], { data: data });
          }
        } else {
          for(var key in context) {
            if(context.hasOwnProperty(key)) {
              if(data) {
                data.key = key;
                data.index = i;
                data.first = (i === 0);

                if (contextPath) {
                  data.contextPath = contextPath + key;
                }
              }
              ret = ret + fn(context[key], {data: data});
              i++;
            }
          }
        }
      }

      if(i === 0){
        ret = inverse(this);
      }

      return ret;
    });

    instance.registerHelper('if', function(conditional, options) {
      if (isFunction(conditional)) { conditional = conditional.call(this); }

      // Default behavior is to render the positive path if the value is truthy and not empty.
      // The `includeZero` option may be set to treat the condtional as purely not empty based on the
      // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
      if ((!options.hash.includeZero && !conditional) || Utils.isEmpty(conditional)) {
        return options.inverse(this);
      } else {
        return options.fn(this);
      }
    });

    instance.registerHelper('unless', function(conditional, options) {
      return instance.helpers['if'].call(this, conditional, {fn: options.inverse, inverse: options.fn, hash: options.hash});
    });

    instance.registerHelper('with', function(context, options) {
      if (isFunction(context)) { context = context.call(this); }

      var fn = options.fn;

      if (!Utils.isEmpty(context)) {
        if (options.data && options.ids) {
          var data = createFrame(options.data);
          data.contextPath = Utils.appendContextPath(options.data.contextPath, options.ids[0]);
          options = {data:data};
        }

        return fn(context, options);
      } else {
        return options.inverse(this);
      }
    });

    instance.registerHelper('log', function(message, options) {
      var level = options.data && options.data.level != null ? parseInt(options.data.level, 10) : 1;
      instance.log(level, message);
    });

    instance.registerHelper('lookup', function(obj, field) {
      return obj && obj[field];
    });
  }

  var logger = {
    methodMap: { 0: 'debug', 1: 'info', 2: 'warn', 3: 'error' },

    // State enum
    DEBUG: 0,
    INFO: 1,
    WARN: 2,
    ERROR: 3,
    level: 3,

    // can be overridden in the host environment
    log: function(level, message) {
      if (logger.level <= level) {
        var method = logger.methodMap[level];
        if (typeof console !== 'undefined' && console[method]) {
          console[method].call(console, message);
        }
      }
    }
  };
  __exports__.logger = logger;
  var log = logger.log;
  __exports__.log = log;
  var createFrame = function(object) {
    var frame = Utils.extend({}, object);
    frame._parent = object;
    return frame;
  };
  __exports__.createFrame = createFrame;
  return __exports__;
})(__module2__, __module4__);

// handlebars/runtime.js
var __module5__ = (function(__dependency1__, __dependency2__, __dependency3__) {
  "use strict";
  var __exports__ = {};
  var Utils = __dependency1__;
  var Exception = __dependency2__;
  var COMPILER_REVISION = __dependency3__.COMPILER_REVISION;
  var REVISION_CHANGES = __dependency3__.REVISION_CHANGES;
  var createFrame = __dependency3__.createFrame;

  function checkRevision(compilerInfo) {
    var compilerRevision = compilerInfo && compilerInfo[0] || 1,
        currentRevision = COMPILER_REVISION;

    if (compilerRevision !== currentRevision) {
      if (compilerRevision < currentRevision) {
        var runtimeVersions = REVISION_CHANGES[currentRevision],
            compilerVersions = REVISION_CHANGES[compilerRevision];
        throw new Exception("Template was precompiled with an older version of Handlebars than the current runtime. "+
              "Please update your precompiler to a newer version ("+runtimeVersions+") or downgrade your runtime to an older version ("+compilerVersions+").");
      } else {
        // Use the embedded version info since the runtime doesn't know about this revision yet
        throw new Exception("Template was precompiled with a newer version of Handlebars than the current runtime. "+
              "Please update your runtime to a newer version ("+compilerInfo[1]+").");
      }
    }
  }

  __exports__.checkRevision = checkRevision;// TODO: Remove this line and break up compilePartial

  function template(templateSpec, env) {
    /* istanbul ignore next */
    if (!env) {
      throw new Exception("No environment passed to template");
    }
    if (!templateSpec || !templateSpec.main) {
      throw new Exception('Unknown template object: ' + typeof templateSpec);
    }

    // Note: Using env.VM references rather than local var references throughout this section to allow
    // for external users to override these as psuedo-supported APIs.
    env.VM.checkRevision(templateSpec.compiler);

    var invokePartialWrapper = function(partial, indent, name, context, hash, helpers, partials, data, depths) {
      if (hash) {
        context = Utils.extend({}, context, hash);
      }

      var result = env.VM.invokePartial.call(this, partial, name, context, helpers, partials, data, depths);

      if (result == null && env.compile) {
        var options = { helpers: helpers, partials: partials, data: data, depths: depths };
        partials[name] = env.compile(partial, { data: data !== undefined, compat: templateSpec.compat }, env);
        result = partials[name](context, options);
      }
      if (result != null) {
        if (indent) {
          var lines = result.split('\n');
          for (var i = 0, l = lines.length; i < l; i++) {
            if (!lines[i] && i + 1 === l) {
              break;
            }

            lines[i] = indent + lines[i];
          }
          result = lines.join('\n');
        }
        return result;
      } else {
        throw new Exception("The partial " + name + " could not be compiled when running in runtime-only mode");
      }
    };

    // Just add water
    var container = {
      lookup: function(depths, name) {
        var len = depths.length;
        for (var i = 0; i < len; i++) {
          if (depths[i] && depths[i][name] != null) {
            return depths[i][name];
          }
        }
      },
      lambda: function(current, context) {
        return typeof current === 'function' ? current.call(context) : current;
      },

      escapeExpression: Utils.escapeExpression,
      invokePartial: invokePartialWrapper,

      fn: function(i) {
        return templateSpec[i];
      },

      programs: [],
      program: function(i, data, depths) {
        var programWrapper = this.programs[i],
            fn = this.fn(i);
        if (data || depths) {
          programWrapper = program(this, i, fn, data, depths);
        } else if (!programWrapper) {
          programWrapper = this.programs[i] = program(this, i, fn);
        }
        return programWrapper;
      },

      data: function(data, depth) {
        while (data && depth--) {
          data = data._parent;
        }
        return data;
      },
      merge: function(param, common) {
        var ret = param || common;

        if (param && common && (param !== common)) {
          ret = Utils.extend({}, common, param);
        }

        return ret;
      },

      noop: env.VM.noop,
      compilerInfo: templateSpec.compiler
    };

    var ret = function(context, options) {
      options = options || {};
      var data = options.data;

      ret._setup(options);
      if (!options.partial && templateSpec.useData) {
        data = initData(context, data);
      }
      var depths;
      if (templateSpec.useDepths) {
        depths = options.depths ? [context].concat(options.depths) : [context];
      }

      return templateSpec.main.call(container, context, container.helpers, container.partials, data, depths);
    };
    ret.isTop = true;

    ret._setup = function(options) {
      if (!options.partial) {
        container.helpers = container.merge(options.helpers, env.helpers);

        if (templateSpec.usePartial) {
          container.partials = container.merge(options.partials, env.partials);
        }
      } else {
        container.helpers = options.helpers;
        container.partials = options.partials;
      }
    };

    ret._child = function(i, data, depths) {
      if (templateSpec.useDepths && !depths) {
        throw new Exception('must pass parent depths');
      }

      return program(container, i, templateSpec[i], data, depths);
    };
    return ret;
  }

  __exports__.template = template;function program(container, i, fn, data, depths) {
    var prog = function(context, options) {
      options = options || {};

      return fn.call(container, context, container.helpers, container.partials, options.data || data, depths && [context].concat(depths));
    };
    prog.program = i;
    prog.depth = depths ? depths.length : 0;
    return prog;
  }

  __exports__.program = program;function invokePartial(partial, name, context, helpers, partials, data, depths) {
    var options = { partial: true, helpers: helpers, partials: partials, data: data, depths: depths };

    if(partial === undefined) {
      throw new Exception("The partial " + name + " could not be found");
    } else if(partial instanceof Function) {
      return partial(context, options);
    }
  }

  __exports__.invokePartial = invokePartial;function noop() { return ""; }

  __exports__.noop = noop;function initData(context, data) {
    if (!data || !('root' in data)) {
      data = data ? createFrame(data) : {};
      data.root = context;
    }
    return data;
  }
  return __exports__;
})(__module2__, __module4__, __module1__);

// handlebars.runtime.js
var __module0__ = (function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__) {
  "use strict";
  var __exports__;
  /*globals Handlebars: true */
  var base = __dependency1__;

  // Each of these augment the Handlebars object. No need to setup here.
  // (This is done to easily share code between commonjs and browse envs)
  var SafeString = __dependency2__;
  var Exception = __dependency3__;
  var Utils = __dependency4__;
  var runtime = __dependency5__;

  // For compatibility and usage outside of module systems, make the Handlebars object a namespace
  var create = function() {
    var hb = new base.HandlebarsEnvironment();

    Utils.extend(hb, base);
    hb.SafeString = SafeString;
    hb.Exception = Exception;
    hb.Utils = Utils;
    hb.escapeExpression = Utils.escapeExpression;

    hb.VM = runtime;
    hb.template = function(spec) {
      return runtime.template(spec, hb);
    };

    return hb;
  };

  var Handlebars = create();
  Handlebars.create = create;

  Handlebars['default'] = Handlebars;

  __exports__ = Handlebars;
  return __exports__;
})(__module1__, __module3__, __module4__, __module2__, __module5__);

  return __module0__;
}));

},{}],12:[function(require,module,exports){
/*
 * catberry-handlebars
 *
 * Copyright (c) 2014 Denis Rechkunov and project contributors.
 *
 * catberry-handlebars's license follows:
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
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * This license applies to all parts of catberry-handlebars that are not externally
 * maintained libraries.
 */

'use strict';

var Handlebars = require('./lib/vendors/handlebars'),
	TemplateProvider = require('./lib/TemplateProvider');

module.exports = {
	register: function (locator, config) {
		config = config || {};
		locator.registerInstance('handlebars', Handlebars);
		locator.register('templateProvider', TemplateProvider, config, true);
	},
	Handlebars: Handlebars,
	TemplateProvider: TemplateProvider
};
},{"./lib/TemplateProvider":10,"./lib/vendors/handlebars":11}],13:[function(require,module,exports){
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
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * This license applies to all parts of catberry that are not externally
 * maintained libraries.
 */

'use strict';

var LocalizationHelper = require('./lib/LocalizationHelper');

module.exports = {
	/**
	 * Registers all localization components in service locator.
	 * @param {ServiceLocator} locator Catberry's service locator.
	 */
	register: function (locator) {
		var config = locator.resolve('config');
		try {
			var handlebars = locator.resolve('handlebars'),
				helper = locator.resolveInstance(LocalizationHelper, config);
			handlebars.registerHelper('l10n', helper.getHandlebarsHelper());
		} catch (e) {
			//nothing to do.
		}
	}
};
},{"./lib/LocalizationHelper":14}],14:[function(require,module,exports){
/*
 * catberry-l10n-handlebars-helper
 *
 * Copyright (c) 2015 Denis Rechkunov and project contributors.
 *
 * catberry-l10n-handlebars-helper's license follows:
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
 * This license applies to all parts of catberry-l10n-handlebars-helper that
 * are not externally maintained libraries.
 */

'use strict';

module.exports = LocalizationHelper;

/**
 * Creates new instance of localization helper.
 * @param {LocalizationProvider} $localizationProvider Localization provider.
 * @constructor
 */
function LocalizationHelper($localizationProvider) {
	this._localizationProvider = $localizationProvider;
}

/**
 * Current localization provider.
 * @type {LocalizationProvider}
 * @private
 */
LocalizationHelper.prototype._localizationProvider = null;

/**
 * Gets handlebars helper for localization.
 * @returns {Function} Handlebars helper function.
 */
LocalizationHelper.prototype.getHandlebarsHelper = function () {
	return function () {
		var key = null,
			locale = null,
			count = null,
			options = arguments[arguments.length - 1];

		Array.prototype.every.call(arguments, function (arg) {
			if (!key && typeof(arg) === 'string') {
				key = arg;
				return true;
			}
			if (!locale && typeof(arg) === 'string') {
				locale = arg;
				return true;
			}
			if (!count && typeof(arg) === 'number') {
				count = arg;
				return true;
			}
			return false;
		});

		if (!key) {
			return '';
		}

		if (!locale) {
			locale = options.data.root.locale;
		}

		var value = '';
		try {
			value = !isNaN(count) ?
				this._localizationProvider.pluralize(locale, key, count) :
				this._localizationProvider.get(locale, key);
		} catch (e) {
			// nothing to do
		}

		return value;
	}.bind(this);
};
},{}],15:[function(require,module,exports){
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
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * This license applies to all parts of catberry that are not externally
 * maintained libraries.
 */

'use strict';

module.exports = LocalizationLoader;

/**
 * Creates new instance of localization loader.
 * @param {Window} $window browser window.
 * @constructor
 */
function LocalizationLoader($window) {
	this._localization = $window.localization &&
		typeof($window.localization) === 'object' ? $window.localization : {};
}

/**
 * Current localization.
 * @type {Object}
 * @private
 */
LocalizationLoader.prototype._localization = null;

/**
 * Loads localization by locale.
 * @returns {Object} Object with localization.
 */
LocalizationLoader.prototype.load = function () {
	return this._localization;
};
},{}],16:[function(require,module,exports){
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
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * This license applies to all parts of catberry that are not externally
 * maintained libraries.
 */

'use strict';

var LocalizationProvider = require('./lib/LocalizationProvider'),
	LocalizationLoader = require('./lib/LocalizationLoader');

module.exports = {
	/**
	 * Registers all localization components in service locator.
	 * @param {ServiceLocator} locator Catberry's service locator.
	 */
	register: function (locator) {
		var config = locator.resolve('config');
		locator.register('localizationProvider',
			LocalizationProvider, config, true);
		locator.register('localizationLoader',
			LocalizationLoader, config, true);
	},
	LocalizationProvider: LocalizationProvider,
	LocalizationLoader: LocalizationLoader
};
},{"./lib/LocalizationLoader":15,"./lib/LocalizationProvider":17}],17:[function(require,module,exports){
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
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * This license applies to all parts of catberry that are not externally
 * maintained libraries.
 */

'use strict';

module.exports = LocalizationProvider;

var util = require('util');

var DEFAULT_LOCALE_COOKIE_KEY = 'locale',
	DEFAULT_LOCALE_COOKIE_MAX_AGE = 3155692600, // 100 years
	LOCALE_COOKIE_PATH = '/',
	LOCALE_REGEXP = /^[a-z]{2}(-[a-z]{2})?$/,
	ERROR_LOCALE_NAME = 'Wrong locale name %s (' +
		LOCALE_REGEXP.toString() + ')',
	ERROR_LOCALIZATION_CONFIG = '"l10n" config section is required';

/**
 * Creates new instance of localization provider.
 * @param {LocalizationLoader} $localizationLoader Localization loader
 * to load locales.
 * @param {Object} l10n Localization config.
 * @constructor
 */
function LocalizationProvider($localizationLoader, l10n) {
	if (!l10n) {
		throw new Error(ERROR_LOCALIZATION_CONFIG);
	}
	this._defaultLocale = l10n.defaultLocale ?
		String(l10n.defaultLocale) : '';
	if (!LOCALE_REGEXP.test(this._defaultLocale)) {
		throw new Error(util.format(ERROR_LOCALE_NAME, this._defaultLocale));
	}

	if (l10n.cookie && typeof(l10n.cookie) === 'object') {
		this._cookieConfig = Object.create(l10n.cookie);
	} else {
		this._cookieConfig = {};
	}

	if (typeof(this._cookieConfig.name) !== 'string' ||
		this._cookieConfig.name.length === 0) {
		this._cookieConfig.name = DEFAULT_LOCALE_COOKIE_KEY;
	}

	if (typeof(this._cookieConfig.maxAge) !== 'number') {
		this._cookieConfig.maxAge = DEFAULT_LOCALE_COOKIE_MAX_AGE;
	}

	if (typeof(this._cookieConfig.path) !== 'string' ||
		this._cookieConfig.path.length === 0) {
		this._cookieConfig.path = LOCALE_COOKIE_PATH;
	}

	this._loader = $localizationLoader;
	this._pluralizationRulesCache = {};
}

/**
 * Current cookie configuration.
 * @type {Object}
 * @private
 */
LocalizationProvider.prototype._cookieConfig = null;

/**
 * Current localization loader.
 * @type {LocalizationLoader}
 * @private
 */
LocalizationProvider.prototype._loader = null;

/**
 * Current cache of pluralization functions.
 * @type {Object}
 * @private
 */
LocalizationProvider.prototype._pluralizationRulesCache = null;

/**
 * Gets current locale value from context.
 * @param {Object} context Component context.
 */
LocalizationProvider.prototype.getCurrentLocale = function (context) {
	return context.cookie.get(this._cookieConfig.name) || this._defaultLocale;
};

/**
 * Changes current locale value.
 * @param {string} locale Locale name (i.e. en, en-us, ru etc).
 * @param {Object} context Component context.
 */
LocalizationProvider.prototype.changeLocale = function (locale, context) {
	var expireDate = new Date((new Date()).getTime() +
			this._cookieConfig.maxAge * 1000);

	this._cookieConfig.key = this._cookieConfig.name;
	this._cookieConfig.value = locale;
	this._cookieConfig.expires = expireDate;
	context.cookie.set(this._cookieConfig);

	if(context.isBrowser) {
		var window = context.locator.resolve('window');
		window.document.location.reload();
	} else {
		context.redirect(context.location.toString());
	}
};

/**
 * Gets localized value for specified locale and key name.
 * @param {string} locale Locale name (i.e. EN, RU etc).
 * @param {string} key Localization key.
 * @returns {string} Localized value.
 */
LocalizationProvider.prototype.get = function (locale, key) {
	var value = this._loader.load(locale)[key];
	if (value instanceof Array) {
		value = value[0];
	}

	return String(value || '');
};

/**
 * Gets JavaScript function for pluralization rule.
 * @param {string} rule Pluralization rule.
 * @returns {Function} Pluralization rule as JavaScript function.
 * @private
 */
LocalizationProvider.prototype._getPluralizationRuleFunction = function (rule) {
	if (!(rule in  this._pluralizationRulesCache)) {
		/*jshint evil:true */
		this._pluralizationRulesCache[rule] = new Function('n', 'pluralForms',
			'var index = Number(' + rule +
			'); return String(pluralForms[index] || \'\');');
	}
	return this._pluralizationRulesCache[rule];
};

/**
 * Pluralizes localization constant forms by specified key.
 * @param {string} locale Locale name.
 * @param {string} key Localization key.
 * @param {number} n Number to determine plural form.
 * @returns {string} Correct plural form.
 */
LocalizationProvider.prototype.pluralize = function (locale, key, n) {
	var localeObject = this._loader.load(locale),
		forms = localeObject[key];

	if (!(forms instanceof Array)) {
		return String(forms || '');
	}

	var rule = typeof(localeObject.$pluralization.fromDefaultLocale) ===
		'object' &&
		(key in localeObject.$pluralization.fromDefaultLocale) ?
			localeObject.$pluralization.defaultRule :
			localeObject.$pluralization.rule,
		ruleFunction = this._getPluralizationRuleFunction(rule || '');
	return ruleFunction(n, forms);
};
},{"util":46}],18:[function(require,module,exports){
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

'use strict';

module.exports = Catberry;

var util = require('util'),
	CatberryBase = require('../lib/base/CatberryBase');

util.inherits(Catberry, CatberryBase);

/**
 * Creates new instance of the browser version of Catberry.
 * @constructor
 * @extends CatberryBase
 */
function Catberry() {
	CatberryBase.call(this);
}

/**
 * Current request router.
 * @type {RequestRouter}
 * @private
 */
Catberry.prototype._router = null;

/**
 * Wraps current HTML document with Catberry event handlers.
 */
Catberry.prototype.wrapDocument = function () {
	this._router = this.locator.resolve('requestRouter');
};

/**
 * Starts Catberry application when DOM is ready.
 * @returns {Promise} Promise for nothing.
 */
Catberry.prototype.startWhenReady = function () {
	if (window.catberry) {
		return Promise.resolve();
	}
	var self = this;

	return new Promise(function (fulfill) {
		window.document.addEventListener('DOMContentLoaded', function () {
			self.wrapDocument();
			window.catberry = self;
			fulfill();
		});
	});
};
},{"../lib/base/CatberryBase":31,"util":46}],19:[function(require,module,exports){
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

'use strict';
module.exports = CookieWrapper;

var util = require('util'),
	CookieWrapperBase = require('../lib/base/CookieWrapperBase');

util.inherits(CookieWrapper, CookieWrapperBase);

/**
 * Creates new instance of the browser cookie wrapper.
 * @constructor
 */
function CookieWrapper($window) {
	CookieWrapperBase.call(this);
	this._window = $window;
}

/**
 * Current browser window.
 * @type {Window}
 * @private
 */
CookieWrapper.prototype._window = null;

/**
 * Gets current cookie string.
 * @returns {string} Cookie string.
 */
CookieWrapper.prototype.getCookieString = function () {
	return this._window.document.cookie ?
		this._window.document.cookie.toString() :
		'';
};

/**
 * Sets cookie to this wrapper.
 * @param {Object} cookieSetup Cookie setup object.
 * @param {string} cookieSetup.key Cookie key.
 * @param {string} cookieSetup.value Cookie value.
 * @param {number?} cookieSetup.maxAge Max cookie age in seconds.
 * @param {Date?} cookieSetup.expires Expire date.
 * @param {string?} cookieSetup.path URI path for cookie.
 * @param {string?} cookieSetup.domain Cookie domain.
 * @param {boolean?} cookieSetup.secure Is cookie secured.
 * @param {boolean?} cookieSetup.httpOnly Is cookie HTTP only.
 * @returns {string} Cookie setup string.
 */
CookieWrapper.prototype.set = function (cookieSetup) {
	var cookie = this._convertToCookieSetup(cookieSetup);
	this._window.document.cookie = cookie;
	return cookie;
};
},{"../lib/base/CookieWrapperBase":32,"util":46}],20:[function(require,module,exports){
/*
 * catberry
 *
 * Copyright (c) 2015 Denis Rechkunov and project contributors.
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

'use strict';

module.exports = DocumentRenderer;

var util = require('util'),
	errorHelper = require('../lib/helpers/errorHelper'),
	moduleHelper = require('../lib/helpers/moduleHelper'),
	DocumentRendererBase = require('../lib/base/DocumentRendererBase');

util.inherits(DocumentRenderer, DocumentRendererBase);

var SPECIAL_IDS = {
		$$head: '$$head',
		$$document: '$$document'
	},
	ERROR_CREATE_WRONG_ARGUMENTS = 'Tag name should be a string ' +
		'and attributes should be an object',
	ERROR_CREATE_WRONG_NAME = 'Component for tag "%s" not found',
	ERROR_CREATE_WRONG_ID = 'The ID is not specified or already used',
	TAG_NAMES = {
		TITLE: 'TITLE',
		HTML: 'HTML',
		HEAD: 'HEAD',
		BASE: 'BASE',
		STYLE: 'STYLE',
		SCRIPT: 'SCRIPT',
		NOSCRIPT: 'NOSCRIPT',
		META: 'META',
		LINK: 'LINK'
	},
	NODE_TYPES = {
		ELEMENT_NODE: 1,
		TEXT_NODE: 3,
		PROCESSING_INSTRUCTION_NODE: 7,
		COMMENT_NODE: 8
	},
	// http://www.w3.org/TR/2015/WD-uievents-20150319/#event-types-list
	NON_BUBBLING_EVENTS = {
		abort: true,
		blur: true,
		error: true,
		focus: true,
		load: true,
		mouseenter: true,
		mouseleave: true,
		resize: true,
		unload: true
	};

/**
 * Creates new instance of the document renderer.
 * @param {ServiceLocator} $serviceLocator Locator to resolve dependencies.
 * @constructor
 * @extends DocumentRendererBase
 */
function DocumentRenderer($serviceLocator) {
	DocumentRendererBase.call(this, $serviceLocator);
	this._componentInstances = {};
	this._componentElements = {};
	this._componentBindings = {};
	this._currentChangedStores = {};
	this._window = $serviceLocator.resolve('window');
	this._config = $serviceLocator.resolve('config');
	this._storeDispatcher = $serviceLocator.resolve('storeDispatcher');

	var self = this;

	this._eventBus.on('storeChanged', function (storeName) {
		self._currentChangedStores[storeName] = true;
		if (self._isStateChanging) {
			return;
		}
		self._updateStoreComponents();
	});
}

/**
 * Current application config.
 * @type {Object}
 * @private
 */
DocumentRenderer.prototype._config = null;

/**
 * Current store dispatcher.
 * @type {StoreDispatcher}
 * @protected
 */
DocumentRenderer.prototype._storeDispatcher = null;

/**
 * Current set of component instances by unique keys.
 * @type {Object}
 * @private
 */
DocumentRenderer.prototype._componentInstances = null;

/**
 * Current set of component elements by unique keys.
 * @type {Object}
 * @private
 */
DocumentRenderer.prototype._componentElements = null;

/**
 * Current set of component bindings by unique keys.
 * @type {Object}
 * @private
 */
DocumentRenderer.prototype._componentBindings = null;

/**
 * Current routing context.
 * @type {Object}
 * @private
 */
DocumentRenderer.prototype._currentRoutingContext = null;

/**
 * Current set of changed stores.
 * @type {Object}
 * @private
 */
DocumentRenderer.prototype._currentChangedStores = null;

/**
 * Current promise for rendered page.
 * @type {Promise}
 * @private
 */
DocumentRenderer.prototype._renderedPromise = null;

/**
 * Current state of updating components.
 * @type {boolean}
 * @private
 */
DocumentRenderer.prototype._isUpdating = false;

/**
 * Current awaiting routing.
 * @type {{state: Object, routingContext: Object}}
 * @private
 */
DocumentRenderer.prototype._awaitingRouting = null;

/**
 * Sets the initial state of the application.
 * @param {Object} state New state of application.
 * @param {Object} routingContext Routing context.
 * @returns {Promise} Promise for nothing.
 */
DocumentRenderer.prototype.initWithState = function (state, routingContext) {
	var self = this;
	return self._getPromiseForReadyState()
		.then(function () {
			self._currentRoutingContext = routingContext;
			return self._storeDispatcher.setState(state, routingContext);
		})
		.then(function () {
			return self._initialWrap();
		});
};

/**
 * Renders new state of application.
 * @param {Object} state New state of application.
 * @param {Object} routingContext Routing context.
 * @returns {Promise} Promise for nothing.
 */
DocumentRenderer.prototype.render = function (state, routingContext) {
	this._awaitingRouting = {
		state: state,
		routingContext: routingContext
	};
	if (this._isStateChanging) {
		return this._renderedPromise;
	}

	// we should set this flag to avoid "storeChanged"
	// event handling for now
	this._isStateChanging = true;

	var self = this;
	self._renderedPromise = this._getPromiseForReadyState()
		.then(function () {
			// and then we update all components of these stores in a batch.
			return self._updateStoreComponents();
		})
		.catch(function (reason) {
			self._eventBus.emit('error', reason);
		})
		.then(function () {
			self._isStateChanging = false;
		});

	return this._renderedPromise;
};

/**
 * Renders component into HTML element.
 * @param {Element} element HTML element of component
 * @param {Object?} renderingContext Rendering context for group rendering.
 */
DocumentRenderer.prototype.renderComponent =
	function (element, renderingContext) {
		var self = this;
		return this._getPromiseForReadyState()
			.then(function () {
				renderingContext = renderingContext ||
					self._createRenderingContext([]);

				var componentName = moduleHelper.getOriginalComponentName(
						element.tagName
					),
					hadChildren = element.hasChildNodes(),
					component = renderingContext.components[componentName],
					id = self._getId(element),
					instance = self._componentInstances[id];

				if (!component || !id ||
					renderingContext.renderedIds.hasOwnProperty(id)) {
					return;
				}

				renderingContext.renderedIds[id] = true;

				if (!instance) {
					component.constructor.prototype.$context =
						self._getComponentContext(component, element);
					instance = self._serviceLocator.resolveInstance(
						component.constructor, renderingContext.config
					);
					instance.$context = component.constructor.prototype.$context;
					self._componentInstances[id] = instance;
				}

				var eventArgs = {
					name: componentName,
					context: instance.$context
				};

				self._componentElements[id] = element;

				var startTime = Date.now();
				self._eventBus.emit('componentRender', eventArgs);

				return self._unbindAll(element, renderingContext)
					.catch(function (reason) {
						self._eventBus.emit('error', reason);
					})
					.then(function () {
						if (instance.$context.element !== element) {
							instance.$context = self._getComponentContext(
								component, element
							);
						}
						var renderMethod = moduleHelper.getMethodToInvoke(
							instance, 'render'
						);
						return moduleHelper.getSafePromise(renderMethod);
					})
					.then(function (dataContext) {
						return component.template.render(dataContext);
					})
					.catch(function (reason) {
						return self._handleRenderError(
							element, component, reason
						);
					})
					.then(function (html) {
						if (element.tagName === TAG_NAMES.HEAD) {
							self._mergeHead(element, html);
						} else {
							element.innerHTML = html;
						}
						var promises = self._findComponents(
							element, renderingContext
						)
							.map(function (innerComponent) {
								return self.renderComponent(
									innerComponent, renderingContext
								);
							});
						return Promise.all(promises);
					})
					.then(function () {
						eventArgs.time = Date.now() - startTime;
						self._eventBus.emit('componentRendered', eventArgs);
						return self._bindComponent(element);
					})
					.then(function () {
						if (!hadChildren) {
							return;
						}
						self._collectRenderingGarbage(renderingContext);
					})
					.catch(function (reason) {
						self._eventBus.emit('error', reason);
					});
			});
	};

/**
 * Gets component instance by ID.
 * @param {String} id Component ID.
 * @returns {Object} Component instance.
 */
DocumentRenderer.prototype.getComponentById = function (id) {
	return this._componentInstances[id] || null;
};

/**
 * Checks that every instance of component has element on the page and
 * removes all references to components removed from DOM.
 * @returns {Promise} Promise for nothing.
 */
DocumentRenderer.prototype.collectGarbage = function () {
	var self = this;
	return this._getPromiseForReadyState().
		then(function () {
			var promises = [];
			Object.keys(self._componentElements)
				.forEach(function (id) {
					if (SPECIAL_IDS.hasOwnProperty(id)) {
						return;
					}
					var element = self._window.document.getElementById(id);
					if (element) {
						return;
					}

					var promise = self._unbindComponent(self._componentElements[id])
						.then(function () {
							delete self._componentElements[id];
							delete self._componentInstances[id];
							delete self._componentBindings[id];
						});
					promises.push(promise);
				});
			return Promise.all(promises);
		});
};

/**
 * Creates and renders component element.
 * @param {String} tagName Name of HTML tag.
 * @param {Object} attributes Element attributes.
 * @returns {Promise<Element>} Promise for HTML element with rendered component.
 */
DocumentRenderer.prototype.createComponent = function (tagName, attributes) {
	if (typeof(tagName) !== 'string' || !attributes ||
		typeof(attributes) !== 'object') {
		return Promise.reject(
			new Error(ERROR_CREATE_WRONG_ARGUMENTS)
		);
	}

	var self = this;
	return this._getPromiseForReadyState()
		.then(function () {
			var components = self._componentLoader.getComponentsByNames(),
				componentName = moduleHelper.getOriginalComponentName(tagName);

			if (moduleHelper.isHeadComponent(componentName) ||
				moduleHelper.isDocumentComponent(componentName) ||
				!components.hasOwnProperty(componentName)) {
				return Promise.reject(
					new Error(util.format(ERROR_CREATE_WRONG_NAME, tagName))
				);
			}

			var safeTagName = moduleHelper.getTagNameForComponentName(componentName);

			var id = attributes[moduleHelper.ATTRIBUTE_ID];
			if (!id || self._componentInstances.hasOwnProperty(id)) {
				return Promise.reject(new Error(ERROR_CREATE_WRONG_ID));
			}

			var element = self._window.document.createElement(safeTagName);
			Object.keys(attributes)
				.forEach(function (attributeName) {
					element.setAttribute(attributeName, attributes[attributeName]);
				});

			return self.renderComponent(element)
				.then(function () {
					return element;
				});
		});
};

/**
 * Clears all references to removed components during rendering process.
 * @param {Object} renderingContext Context of rendering.
 * @private
 */
DocumentRenderer.prototype._collectRenderingGarbage =
	function (renderingContext) {
		var self = this;
		Object.keys(renderingContext.unboundIds)
			.forEach(function (id) {
				// this component has been rendered again and we do not need to
				// remove it.
				if (renderingContext.renderedIds.hasOwnProperty(id)) {
					return;
				}

				delete self._componentElements[id];
				delete self._componentInstances[id];
				delete self._componentBindings[id];
			});
	};

/**
 * Unbinds all event handlers from specified component and all it's descendants.
 * @param {Element} element Component HTML element.
 * @param {Object} renderingContext Context of rendering.
 * @returns {Promise} Promise for nothing.
 * @private
 */
DocumentRenderer.prototype._unbindAll = function (element, renderingContext) {
	var self = this,
		id = this._getId(element),
		promises = [];

	if (element.hasChildNodes()) {
		self._findComponents(element, renderingContext)
			.forEach(function (innerElement) {
				var id = self._getId(innerElement);
				if (renderingContext.unboundIds.hasOwnProperty(id)) {
					return;
				}
				renderingContext.unboundIds[id] = true;
				promises.push(self._unbindComponent(innerElement));
			});
	}

	if (!renderingContext.unboundIds.hasOwnProperty(id)) {
		promises.push(this._unbindComponent(element));
		renderingContext.unboundIds[id] = true;
	}

	return Promise.all(promises);
};

/**
 * Unbinds all event handlers from specified component.
 * @param {Element} element Component HTML element.
 * @returns {Promise} Promise for nothing.
 * @private
 */
DocumentRenderer.prototype._unbindComponent = function (element) {
	var id = this._getId(element),
		self = this,
		instance = this._componentInstances[id];
	if (!instance) {
		return Promise.resolve();
	}
	if (this._componentBindings.hasOwnProperty(id)) {
		Object.keys(this._componentBindings[id])
			.forEach(function (eventName) {
				element.removeEventListener(
					eventName,
					self._componentBindings[id][eventName].handler,
					NON_BUBBLING_EVENTS.hasOwnProperty(eventName)
				);
			});
		delete this._componentBindings[id];
	}
	var unbindMethod = moduleHelper.getMethodToInvoke(instance, 'unbind');
	return moduleHelper.getSafePromise(unbindMethod)
		.then(function () {
			self._eventBus.emit('componentUnbound', {
				element: element,
				id: !SPECIAL_IDS.hasOwnProperty(id) ? id : null
			});
		})
		.catch(function (reason) {
			self._eventBus.emit('error', reason);
		});
};

/**
 * Binds all required event handlers to component.
 * @param {Element} element Component HTML element.
 * @returns {Promise} Promise for nothing.
 * @private
 */
DocumentRenderer.prototype._bindComponent = function (element) {
	var id = this._getId(element),
		self = this,
		instance = this._componentInstances[id];
	if (!instance) {
		return Promise.resolve();
	}

	var bindMethod = moduleHelper.getMethodToInvoke(instance, 'bind');
	return moduleHelper.getSafePromise(bindMethod)
		.then(function (bindings) {
			if (!bindings || typeof(bindings) !== 'object') {
				self._eventBus.emit('componentBound', {
					element: element,
					id: !SPECIAL_IDS.hasOwnProperty(id) ? id : null
				});
				return;
			}
			self._componentBindings[id] = {};
			Object.keys(bindings)
				.forEach(function (eventName) {
					eventName = eventName.toLowerCase();
					if (self._componentBindings[id].hasOwnProperty(eventName)) {
						return;
					}
					var selectorHandlers = {};
					Object.keys(bindings[eventName])
						.forEach(function (selector) {
							var handler = bindings[eventName][selector];
							if (typeof(handler) !== 'function') {
								return;
							}
							selectorHandlers[selector] = handler.bind(instance);
						});
					self._componentBindings[id][eventName] = {
						handler: self._createBindingHandler(
							element, selectorHandlers
						),
						selectorHandlers: selectorHandlers
					};
					element.addEventListener(
						eventName,
						self._componentBindings[id][eventName].handler,
						NON_BUBBLING_EVENTS.hasOwnProperty(eventName)
					);
				});
			self._eventBus.emit('componentBound', {
				element: element,
				id: id
			});
		});
};

/**
 * Creates universal event handler for delegated events.
 * @param {Element} componentRoot Root element of component.
 * @param {Object} selectorHandlers Map of event handlers by CSS selectors.
 * @returns {Function} Universal event handler for delegated events.
 * @private
 */
DocumentRenderer.prototype._createBindingHandler =
	function (componentRoot, selectorHandlers) {
		var selectors = Object.keys(selectorHandlers);
		return function (event) {
			var dispatchedEvent = createCustomEvent(event, function () {
					return element;
				}),
				element = event.target,
				targetMatches = getMatchesMethod(element),
				isHandled = selectors.some(function (selector) {
					if (targetMatches(selector)) {
						selectorHandlers[selector](dispatchedEvent);
						return true;
					}
					return false;
				});
			if (isHandled || !event.bubbles) {
				return;
			}

			while(element.parentElement && element !== componentRoot) {
				element = element.parentElement;
				targetMatches = getMatchesMethod(element);
				for (var i = 0; i < selectors.length; i++) {
					if (!targetMatches(selectors[i])) {
						continue;
					}
					isHandled = true;
					selectorHandlers[selectors[i]](dispatchedEvent);
					break;
				}

				if (isHandled) {
					break;
				}
			}
		};
	};

/**
 * Finds all descendant components of specified component element.
 * @param {Element} element Root component HTML element to begin search with.
 * @param {Object} renderingContext Context of rendering.
 * @private
 */
DocumentRenderer.prototype._findComponents =
	function (element, renderingContext) {
		var components = [];
		renderingContext.componentTags
			.forEach(function (tag) {
				var nodes = element.getElementsByTagName(tag);
				for(var i = 0; i < nodes.length; i++) {
					components.push(nodes[i]);
				}
			});
		return components;
	};

/**
 * Handles error while rendering.
 * @param {Element} element Component HTML element.
 * @param {Object} component Component instance.
 * @param {Error} error Error to handle.
 * @returns {Promise<String>} Promise for HTML string.
 * @private
 */
DocumentRenderer.prototype._handleRenderError =
	function (element, component, error) {
		this._eventBus.emit('error', error);

		// do not corrupt existed HEAD when error occurs
		if (element.tagName === TAG_NAMES.HEAD) {
			return Promise.resolve('');
		}

		if (!this._config.isRelease && error instanceof Error) {
			return Promise.resolve(errorHelper.prettyPrint(
				error, this._window.navigator.userAgent
			));
		} else if (component.errorTemplate) {
			return component.errorTemplate.render(error);
		}

		return Promise.resolve('');
	};

/**
 * Updates all components that depend on current set of changed stores.
 * @returns {Promise} Promise for nothing.
 * @private
 */
DocumentRenderer.prototype._updateStoreComponents = function () {
	if (this._isUpdating) {
		return Promise.resolve();
	}

	var self = this;

	// if document component is changed we should reload the page
	var documentStore = this._window.document.documentElement.getAttribute(
		moduleHelper.ATTRIBUTE_STORE
	);
	if (this._currentChangedStores.hasOwnProperty(documentStore)) {
		var newLocation = this._currentRoutingContext.location.toString();
		if (newLocation === this._window.location.toString()) {
			this._window.location.reload();
			return Promise.resolve();
		}
		this._window.location.assign(newLocation);
		return Promise.resolve();
	}

	// if we have awaiting routing we should apply state to the stores
	if (this._awaitingRouting) {
		var components = this._componentLoader.getComponentsByNames(),
			changedByState = this._storeDispatcher.setState(
				this._awaitingRouting.state,
				this._awaitingRouting.routingContext
			);

		changedByState.forEach(function (name) {
			self._currentChangedStores[name] = true;
		});

		// we should update contexts of the stores with the new routing context
		this._currentRoutingContext = this._awaitingRouting.routingContext;
		Object.keys(this._componentInstances)
			.forEach(function (id) {
				var instance = self._componentInstances[id];
				instance.$context = self._getComponentContext(
					components[instance.$context.name],
					instance.$context.element
				);
			});
		this._awaitingRouting = null;
	}

	var changedStores = Object.keys(this._currentChangedStores);
	if (changedStores.length === 0) {
		return Promise.resolve();
	}
	this._currentChangedStores = {};

	var renderingContext = this._createRenderingContext(changedStores),
		promises = renderingContext.roots.map(function (root) {
			return self.renderComponent(root, renderingContext);
		});

	this._isUpdating = true;
	return Promise.all(promises)
		.catch(function (reason) {
			self._eventBus.emit('error', reason);
		})
		.then(function () {
			self._isUpdating = false;
			self._eventBus.emit('documentUpdated', changedStores);
			return self._updateStoreComponents();
		});
};

/**
 * Merges new and existed head elements and change only difference.
 * @param {Element} head HEAD DOM element.
 * @param {string} htmlText HTML of new HEAD element content.
 * @private
 */
/*jshint maxcomplexity:false */
DocumentRenderer.prototype._mergeHead = function (head, htmlText) {
	if (!htmlText) {
		return;
	}
	var self = this,
		newHead = this._window.document.createElement('head');
	newHead.innerHTML = htmlText;

	var map = this._getHeadMap(head.childNodes),
		current, i, key, oldKey, oldItem,
		sameMetaElements = {};

	for (i = 0; i < newHead.childNodes.length; i++) {
		current = newHead.childNodes[i];

		if (!map.hasOwnProperty(current.nodeName)) {
			map[current.nodeName] = {};
		}

		switch (current.nodeName) {
			// these elements can be only replaced
			case TAG_NAMES.TITLE:
			case TAG_NAMES.BASE:
			case TAG_NAMES.NOSCRIPT:
				key = this._getNodeKey(current);
				oldItem = head.getElementsByTagName(current.nodeName)[0];
				if (oldItem) {
					oldKey = this._getNodeKey(oldItem);
					head.replaceChild(current, oldItem);
				} else {
					head.appendChild(current);
				}
				// when we do replace or append current is removed from newHead
				// therefore we need to decrement index
				i--;
				break;

			// these elements can not be deleted from head
			// therefore we just add new elements that differs from existed
			case TAG_NAMES.STYLE:
			case TAG_NAMES.LINK:
			case TAG_NAMES.SCRIPT:
				key = self._getNodeKey(current);
				if (!map[current.nodeName].hasOwnProperty(key)) {
					head.appendChild(current);
					i--;
				}
				break;
			// meta and other elements can be deleted
			// but we should not delete and append same elements
			default:
				key = self._getNodeKey(current);
				if (map[current.nodeName].hasOwnProperty(key)) {
					sameMetaElements[key] = true;
				} else {
					head.appendChild(current);
					i--;
				}
				break;
		}
	}

	if (map.hasOwnProperty(TAG_NAMES.META)) {
		// remove meta tags which a not in a new head state
		Object.keys(map[TAG_NAMES.META])
			.forEach(function (metaKey) {
				if (sameMetaElements.hasOwnProperty(metaKey)) {
					return;
				}

				head.removeChild(map[TAG_NAMES.META][metaKey]);
			});
	}
};

/**
 * Gets map of all HEAD's elements.
 * @param {NodeList} headChildren Head children DOM nodes.
 * @returns {Object} Map of HEAD elements.
 * @private
 */
DocumentRenderer.prototype._getHeadMap = function (headChildren) {
	// Create map of <meta>, <link>, <style> and <script> tags
	// by unique keys that contain attributes and content
	var map = {},
		i, current,
		self = this;

	for (i = 0; i < headChildren.length; i++) {
		current = headChildren[i];
		if (!map.hasOwnProperty(current.nodeName)) {
			map[current.nodeName] = {};
		}
		map[current.nodeName][self._getNodeKey(current)] = current;
	}
	return map;
};

/**
 * Gets unique element key using element's attributes and its content.
 * @param {Node} node HTML element.
 * @returns {string} Unique key for element.
 * @private
 */
DocumentRenderer.prototype._getNodeKey = function (node) {
	var current, i,
		attributes = [];

	if (node.nodeType !== NODE_TYPES.ELEMENT_NODE) {
		return node.nodeValue || '';
	}

	if (node.hasAttributes()) {
		for (i = 0; i < node.attributes.length; i++) {
			current = node.attributes[i];
			attributes.push(current.name + '=' + current.value);
		}
	}

	return attributes
			.sort()
			.join('|') + '>' + node.textContent;
};

/**
 * Does initial wrapping for every component on the page.
 * @private
 */
DocumentRenderer.prototype._initialWrap = function () {
	var self = this,
		current, i, id, instance,
		components = this._componentLoader.getComponentsByNames(),
		bindPromises = [];

	Object.keys(components)
		.forEach(function (componentName) {
			var tagName = moduleHelper
					.getTagNameForComponentName(componentName),
				elements,
				constructor = components[componentName].constructor;

			if (moduleHelper.isDocumentComponent(componentName)) {
				elements = [self._window.document.documentElement];
			} else if (moduleHelper.isHeadComponent(componentName)) {
				elements = [self._window.document.head];
			} else {
				elements = self._window.document.getElementsByTagName(tagName);
			}

			for (i = 0; i < elements.length; i++) {
				current = elements[i];
				id = self._getId(current);
				if (!id) {
					continue;
				}

				constructor.prototype.$context = self._getComponentContext(
					components[componentName], current
				);
				instance = self._serviceLocator.resolveInstance(
					constructor, self._config
				);
				instance.$context = constructor.prototype.$context;
				self._componentElements[id] = current;
				self._componentInstances[id] = instance;
				// initialize the store of the component
				self._storeDispatcher.getStore(
					current.getAttribute(moduleHelper.ATTRIBUTE_STORE)
				);
				self._eventBus.emit('componentRendered', {
					name: componentName,
					attributes: instance.$context.attributes,
					context: instance.$context
				});
				bindPromises.push(self._bindComponent(current));
			}
		});

	return Promise.all(bindPromises)
		.then(function () {
			self._eventBus.emit('documentRendered', self._currentRoutingContext);
		});
};

/**
 * Gets component context using basic context.
 * @param {Object} component Component details.
 * @param {Element} element DOM element of component.
 * @returns {Object} Component context.
 * @private
 */
DocumentRenderer.prototype._getComponentContext =
	function (component, element) {
		var self = this,
			storeName = element.getAttribute(moduleHelper.ATTRIBUTE_STORE),
			componentContext = Object.create(this._currentRoutingContext);

		// initialize the store of the component
		this._storeDispatcher.getStore(storeName);

		Object.defineProperties(componentContext, {
			element: {
				value: element,
				enumerable: true
			},
			name: {
				get: function () {
					return component.name;
				},
				enumerable: true
			},
			attributes: {
				get: function () {
					return attributesToObject(element.attributes);
				},
				enumerable: true
			},
			getComponentById: {
				value: function (id) {
					return self.getComponentById(id);
				}
			},
			createComponent: {
				value: function (tagName, attributes) {
					return self.createComponent(tagName, attributes);
				}
			},
			collectGarbage: {
				value: function () {
					return self.collectGarbage();
				}
			},
			getStoreData: {
				value: function () {
					var currentStoreName = componentContext.element
						.getAttribute(moduleHelper.ATTRIBUTE_STORE);
					return self._storeDispatcher
						.getStoreData(currentStoreName);
				}
			},
			sendAction: {
				value: function (name, args) {
					var currentStoreName = componentContext.element
						.getAttribute(moduleHelper.ATTRIBUTE_STORE);
					return self._storeDispatcher
						.sendAction(currentStoreName, name, args);
				}
			},
			sendBroadcastAction: {
				value: function (name, args) {
					return self._storeDispatcher
						.sendBroadcastAction(name, args);
				}
			}
		});

		return componentContext;
	};

/**
 * Finds all rendering roots on page for all changed stores.
 * @param {Array} changedStoreNames List of store names which has been changed.
 * @returns {Array<Element>} HTML elements that are rendering roots.
 * @private
 */
DocumentRenderer.prototype._findRenderingRoots = function (changedStoreNames) {
	var self = this,
		headStore = this._window.document.head.getAttribute(
			moduleHelper.ATTRIBUTE_STORE
		),
		components = this._componentLoader.getComponentsByNames(),
		componentsElements = {},
		storeNamesSet = {},
		rootsSet = {},
		roots = [];

	// we should find all components and then looking for roots
	changedStoreNames
		.forEach(function (storeName) {
			storeNamesSet[storeName] = true;
			componentsElements[storeName] = self._window.document
				.querySelectorAll(
					'[' +
					moduleHelper.ATTRIBUTE_ID +
					']' +
					'[' +
					moduleHelper.ATTRIBUTE_STORE +
					'="' +
					storeName +
					'"]'
				);
		});

	if (components.hasOwnProperty(moduleHelper.HEAD_COMPONENT_NAME) &&
		storeNamesSet.hasOwnProperty(headStore)) {
		rootsSet[this._getId(this._window.document.head)] = true;
		roots.push(this._window.document.head);
	}

	changedStoreNames
		.forEach(function (storeName) {
			var current, currentId,
				lastRoot, lastRootId,
				currentStore, currentComponentName;

			for (var i = 0; i < componentsElements[storeName].length; i++) {
				current = componentsElements[storeName][i];
				currentId = componentsElements[storeName][i]
					.getAttribute(moduleHelper.ATTRIBUTE_ID);
				lastRoot = current;
				lastRootId = currentId;
				currentComponentName = moduleHelper.getOriginalComponentName(
					current.tagName
				);

				while (current.parentElement) {
					current = current.parentElement;
					currentId = self._getId(current);
					currentStore = current.getAttribute(
						moduleHelper.ATTRIBUTE_STORE
					);

					// store did not change state
					if (!currentStore ||
						!storeNamesSet.hasOwnProperty(currentStore)) {
						continue;
					}

					//// is not an active component
					if (!components.hasOwnProperty(currentComponentName)) {
						continue;
					}

					lastRoot = current;
					lastRootId = currentId;
				}
				if (rootsSet.hasOwnProperty(lastRootId)) {
					continue;
				}
				rootsSet[lastRootId] = true;
				roots.push(lastRoot);
			}
		});

	return roots;
};

/**
 * Creates rendering context.
 * @param {Array?} changedStores Names of changed stores.
 * @returns {{
 *   config: Object,
 *   renderedIds: {},
 *   unboundIds: {},
 *   isHeadRendered: Boolean,
 *   bindMethods: Array,
 *   routingContext: Object,
 *   components: Object,
 *   componentTags: Array,
 *   roots: Array.<Element>
 * }}
 * @private
 */
DocumentRenderer.prototype._createRenderingContext = function (changedStores) {
	var components = this._componentLoader.getComponentsByNames(),
		componentTags = Object.keys(components)
			.map(function (name) {
				return moduleHelper.getTagNameForComponentName(name);
			});
	return {
		config: this._config,
		renderedIds: {},
		unboundIds: {},
		isHeadRendered: false,
		bindMethods: [],
		routingContext: this._currentRoutingContext,
		components: components,
		componentTags: componentTags,
		roots: changedStores ? this._findRenderingRoots(changedStores) : []
	};
};

/**
 * Gets ID of the element.
 * @param {Element} element HTML element of component.
 * @returns {string} ID.
 */
DocumentRenderer.prototype._getId = function (element) {
	if (element === this._window.document.documentElement) {
		return SPECIAL_IDS.$$document;
	}
	if (element === this._window.document.head) {
		return SPECIAL_IDS.$$head;
	}
	return element.getAttribute(moduleHelper.ATTRIBUTE_ID);
};

/**
 * Converts NamedNodeMap of Attr items to key-value object map.
 * @param {NamedNodeMap} attributes List of Element attributes.
 * @returns {Object} Map of attribute values by names.
 */
function attributesToObject(attributes) {
	var result = {};
	for (var i = 0; i < attributes.length; i++) {
		result[attributes[i].name] = attributes[i].value;
	}
	return result;
}

/**
 * Gets cross-browser "matches" method for the element.
 * @param {Element} element HTML element.
 * @returns {Function} "matches" method.
 */
function getMatchesMethod(element) {
	var method =  (element.matches ||
		element.webkitMatchesSelector ||
		element.mozMatchesSelector ||
		element.oMatchesSelector ||
		element.msMatchesSelector);

	return method.bind(element);
}

/**
 * Creates imitation of original Event object but with specified currentTarget.
 * @param {Event} event Original event object.
 * @param {Function} currentTargetGetter Getter for currentTarget.
 * @returns {Event} Wrapped event.
 */
function createCustomEvent(event, currentTargetGetter) {
	var catEvent = Object.create(event),
		keys = [],
		properties = {};
	for(var key in event) {
		keys.push(key);
	}
	keys.forEach(function (key) {
		if (typeof(event[key]) === 'function') {
			properties[key] = {
				get: function () {
					return event[key].bind(event);
				}
			};
			return;
		}

		properties[key] = {
			get: function () {
				return event[key];
			},
			set: function (value) {
				event[key] = value;
			}
		};
	});

	properties.currentTarget = {
		get: currentTargetGetter
	};
	Object.defineProperties(catEvent, properties);
	Object.seal(catEvent);
	Object.freeze(catEvent);
	return catEvent;
}
},{"../lib/base/DocumentRendererBase":33,"../lib/helpers/errorHelper":36,"../lib/helpers/moduleHelper":37,"util":46}],21:[function(require,module,exports){
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

'use strict';

module.exports = Logger;

var LEVELS = {
	TRACE: 'trace',
	INFO: 'info',
	WARN: 'warn',
	ERROR: 'error',
	FATAL: 'fatal'
};

/**
 * Creates browser logger.
 * @param {Object|string} levels Levels to log.
 * @supported Chrome, Firefox>=2.0, Internet Explorer>=8, Opera, Safari.
 * @constructor
 */
function Logger(levels) {
	if (typeof (levels) === 'object') {
		this._levels = levels;
	}

	if (typeof(levels) === 'string') {
		this._levels = {};
		Object.keys(LEVELS)
			.forEach(function (level) {
				this._levels[LEVELS[level]] =
					(levels.search(LEVELS[level]) !== -1);
			}, this);
	}

	this.trace = this.trace.bind(this);
	this.info = this.info.bind(this);
	this.warn = this.warn.bind(this);
	this.error = this.error.bind(this);
	this.fatal = this.fatal.bind(this);
}

/**
 * Current levels of logging.
 * @type {Object}
 * @private
 */
Logger.prototype._levels = {
	trace: true,
	info: true,
	warn: true,
	error: true,
	fatal: true
};

/**
 * Logs trace message.
 * @param {string} message Trace message.
 */
Logger.prototype.trace = function (message) {
	if (!this._levels.trace) {
		return;
	}

	if (console.log) {
		console.log(message);
	}
};

/**
 * Logs info message.
 * @param {string} message Information message.
 */
Logger.prototype.info = function (message) {
	if (!this._levels.info) {
		return;
	}

	if (console.info) {
		console.info(message);
	}
};

/**
 * Logs warn message.
 * @param {string} message Warning message.
 */
Logger.prototype.warn = function (message) {
	if (!this._levels.warn) {
		return;
	}

	if (console.warn) {
		console.warn(message);
	}
};
/**
 * Logs error message.
 * @param {string|Error} error Error object or message.
 */
Logger.prototype.error = function (error) {
	if (!this._levels.error) {
		return;
	}

	writeError(error);
};

/**
 * Logs error message.
 * @param {string|Error} error Error object or message.
 */
Logger.prototype.fatal = function (error) {
	if (!this._levels.fatal) {
		return;
	}
	writeError(error);
};

/**
 * Writes error to console.
 * @param {Error|string} error Error to write.
 */
function writeError(error) {
	try {
		if (!(error instanceof Error)) {
			error = typeof(error) === 'string' ? new Error(error) : new Error();
		}
		if (console.error) {
			console.error(error);
		}
	} catch (e) {
		writeError(e);
	}
}
},{}],22:[function(require,module,exports){
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

'use strict';

module.exports = RequestRouter;

var util = require('util'),
	URI = require('catberry-uri').URI;

var MOUSE_KEYS = {
		LEFT: 0,
		MIDDLE: 1
	},

	HREF_ATTRIBUTE_NAME = 'href',
	TARGET_ATTRIBUTE_NAME = 'target',
	A_TAG_NAME = 'A',
	BODY_TAG_NAME = 'BODY';

/**
 * Creates new instance of the browser request router.
 * @param {ServiceLocator} $serviceLocator Service locator to resolve services.
 * @constructor
 */
function RequestRouter($serviceLocator) {
	this._eventBus = $serviceLocator.resolve('eventBus');
	this._window = $serviceLocator.resolve('window');
	this._documentRenderer = $serviceLocator.resolve('documentRenderer');
	this._stateProvider = $serviceLocator.resolve('stateProvider');
	this._contextFactory = $serviceLocator.resolve('contextFactory');

	this._isHistorySupported = this._window.history &&
		this._window.history.pushState instanceof Function;
	var self = this;

	// add event handlers
	self._wrapDocument();

	// set initial state from current URI
	this._changeState(new URI(this._window.location.toString()))
		.catch(function (reason) {
			self._handleError(reason);
		});
}

/**
 * Current initialization flag.
 * @type {boolean}
 * @private
 */
RequestRouter.prototype._isStateInitialized = false;

/**
 * Current referrer.
 * @type {URI}
 * @private
 */
RequestRouter.prototype._referrer = '';

/**
 * Current location.
 * @type {URI}
 * @private
 */
RequestRouter.prototype._location = null;

/**
 * Current event bus.
 * @type {EventEmitter}
 * @private
 */
RequestRouter.prototype._eventBus = null;

/**
 * Current context factory.
 * @type {ContextFactory}
 * @private
 */
RequestRouter.prototype._contextFactory = null;

/**
 * Current state provider.
 * @type {StateProvider}
 * @private
 */
RequestRouter.prototype._stateProvider = null;

/**
 * Current document renderer.
 * @type {DocumentRenderer}
 * @private
 */
RequestRouter.prototype._documentRenderer = null;

/**
 * Current browser window.
 * @type {Window}
 * @private
 */
RequestRouter.prototype._window = null;

/**
 * True if current browser supports history API.
 * @type {boolean}
 * @private
 */
RequestRouter.prototype._isHistorySupported = false;

/**
 * Routes browser render request.
 * @returns {Promise} Promise for nothing.
 */
RequestRouter.prototype.route = function () {
	var self = this;
	// because now location was not change yet and
	// different browsers handle `popstate` differently
	// we need to do route in next iteration of event loop
	return Promise.resolve()
		.then(function () {
			var newLocation = new URI(self._window.location.toString()),
				newAuthority = newLocation.authority ?
					newLocation.authority.toString() : null,
				currentAuthority = self._location.authority ?
					self._location.authority.toString() : null;

			if (newLocation.scheme !== self._location.scheme ||
				newAuthority !== currentAuthority) {
				return;
			}

			// if only URI fragment is changed
			var newQuery = newLocation.query ?
					newLocation.query.toString() : null,
				currentQuery = self._location.query ?
					self._location.query.toString() : null;
			if (newLocation.path === self._location.path &&
				newQuery === currentQuery) {
				self._location = newLocation;
				return;
			}
			return self._changeState(newLocation);
		});
};

/**
 * Sets application state to specified URI.
 * @param {string} locationString URI to go.
 * @returns {Promise} Promise for nothing.
 */
RequestRouter.prototype.go = function (locationString) {
	var self = this;
	return Promise.resolve()
		.then(function () {
			var location = new URI(locationString);
			location = location.resolveRelative(self._location);
			locationString = location.toString();

			var currentAuthority = self._location.authority ?
					self._location.authority.toString() : null,
				newAuthority = location.authority ?
					location.authority.toString() : null;

			// we must check if this is an external link before map URI
			// to internal application state
			if (!self._isHistorySupported ||
				location.scheme !== self._location.scheme ||
				newAuthority !== currentAuthority) {
				self._window.location.assign(locationString);
				return;
			}

			var state = self._stateProvider.getStateByUri(location);
			if (!state) {
				self._window.location.assign(locationString);
				return;
			}

			self._window.history.pushState(state, '', locationString);
			return self.route();
		});
};

/**
 * Changes current application state with new location.
 * @param {URI} newLocation New location.
 * @returns {Promise} Promise for nothing.
 * @private
 */
RequestRouter.prototype._changeState = function (newLocation) {
	var self = this;
	return Promise.resolve()
		.then(function () {
			self._location = newLocation;
			var state = self._stateProvider.getStateByUri(newLocation),
				routingContext = self._contextFactory.create({
					referrer: self._referrer || self._window.document.referrer,
					location: self._location,
					userAgent: self._window.navigator.userAgent
				});

			if (!self._isStateInitialized) {
				self._isStateInitialized = true;
				return self._documentRenderer.initWithState(
					state, routingContext
				);
			}

			if (state === null) {
				window.location.reload();
				return;
			}

			return self._documentRenderer
				.render(state, routingContext);
		})
		.then(function () {
			self._referrer = self._location;
		});
};

/**
 * Wraps document with required events to route requests.
 * @private
 */
RequestRouter.prototype._wrapDocument = function () {
	var self = this;

	if (!this._isHistorySupported) {
		return;
	}

	this._window.addEventListener('popstate', function () {
		self.route().catch(self._handleError.bind(self));
	});

	this._window.document.body.addEventListener('click', function (event) {
		if (event.defaultPrevented) {
			return;
		}
		if (event.target.tagName === A_TAG_NAME) {
			self._linkClickHandler(event, event.target)
				.catch(self._handleError.bind(self));
		} else {
			var link = closestLink(event.target);
			if (!link) {
				return;
			}
			self._linkClickHandler(event, link);
		}
	});
};

/**
 * Handles link click on the page.
 * @param {Event} event Event-related object.
 * @param {Element} element Link element.
 * @returns {Promise} Promise for nothing.
 * @private
 */
RequestRouter.prototype._linkClickHandler = function (event, element) {
	var self = this;
	return Promise.resolve()
		.then(function () {
			var targetAttribute = element.getAttribute(TARGET_ATTRIBUTE_NAME);
			if (targetAttribute) {
				return;
			}

			// if middle mouse button was clicked
			if (event.button === MOUSE_KEYS.MIDDLE) {
				return;
			}

			var locationString = element.getAttribute(HREF_ATTRIBUTE_NAME);
			if (!locationString) {
				return;
			}
			if (locationString[0] === '#') {
				return;
			}

			event.preventDefault();
			return self.go(locationString);
		})
		.catch(function (reason) {
			self._handleError(reason);
		});
};

/**
 * Handles all errors.
 * @param {Error} error Error to handle.
 * @private
 */
RequestRouter.prototype._handleError = function (error) {
	this._eventBus.emit('error', error);
};

/**
 * Finds the closest ascending "A" element node.
 * @param {Node} element DOM element.
 * @returns {Node|null} The closest "A" element or null.
 */
function closestLink(element) {
	while(element && element.nodeName !== A_TAG_NAME &&
		element.nodeName !== BODY_TAG_NAME) {
		element = element.parentNode;
	}
	return element && element.nodeName === A_TAG_NAME ? element : null;
}
},{"catberry-uri":52,"util":46}],23:[function(require,module,exports){
/*
 * catberry
 *
 * Copyright (c) 2015 Denis Rechkunov and project contributors.
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

'use strict';

module.exports = ComponentLoader;

var moduleHelper = require('../../lib/helpers/moduleHelper'),
	util = require('util'),
	LoaderBase = require('../../lib/base/LoaderBase');

util.inherits(ComponentLoader, LoaderBase);

/**
 * Creates new instance of the component loader.
 * @param {ServiceLocator} $serviceLocator Locator to resolve dependencies.
 * @constructor
 * @extends LoaderBase
 */
function ComponentLoader($serviceLocator) {
	this._serviceLocator = $serviceLocator;
	this._eventBus = $serviceLocator.resolve('eventBus');
	this._templateProvider = $serviceLocator.resolve('templateProvider');
	LoaderBase.call(this, $serviceLocator.resolveAll('componentTransform'));
}

/**
 * Current event bus.
 * @type {EventEmitter}
 * @private
 */
ComponentLoader.prototype._eventBus = null;

/**
 * Current service locator.
 * @type {ServiceLocator}
 * @private
 */
ComponentLoader.prototype._serviceLocator = null;

/**
 * Current template provider.
 * @type {TemplateProvider}
 * @private
 */
ComponentLoader.prototype._templateProvider = null;

/**
 * Current map of loaded components by names.
 * @type {Object} Map of components by names.
 * @private
 */
ComponentLoader.prototype._loadedComponents = null;

/**
 * Loads components when it is in a browser.
 * @returns {Promise} Promise for nothing.
 */
ComponentLoader.prototype.load = function () {
	if (this._loadedComponents) {
		return Promise.resolve(this._loadedComponents);
	}

	this._loadedComponents = {};

	var self = this;
	return Promise.resolve()
		.then(function () {
			var components = self._serviceLocator.resolveAll('component'),
				componentPromises = [];

			// the list is a stack, we should reverse it
			components.forEach(function (component) {
				componentPromises.unshift(
					self._processComponent(component)
				);
			});
			return Promise.all(componentPromises);
		})
		.then(function (components) {
			components.forEach(function (component) {
				if (!component || typeof(component) !== 'object') {
					return;
				}
				self._loadedComponents[component.name] = component;
			});
			self._eventBus.emit('allComponentsLoaded', components);
			return self._loadedComponents;
		});
};

/**
 * Processes component and apply required operations.
 * @param {Object} componentDetails Loaded component details.
 * @returns {Object} Component object.
 * @private
 */
ComponentLoader.prototype._processComponent = function (componentDetails) {
	var self = this,
		component = Object.create(componentDetails);

	return this._applyTransforms(component)
		.then(function (transformed) {
			component = transformed;
			self._templateProvider.registerCompiled(
				component.name, component.templateSource
			);
			component.template = {
				render: function (dataContext) {
					return self._templateProvider.render(
						component.name, dataContext
					);
				}
			};
			if (typeof(component.errorTemplateSource) === 'string') {
				var errorTemplateName = moduleHelper.getNameForErrorTemplate(
					component.name
				);
				self._templateProvider.registerCompiled(
					errorTemplateName, component.errorTemplateSource
				);
				component.errorTemplate = {
					render: function (dataContext) {
						return self._templateProvider.render(
							errorTemplateName, dataContext
						);
					}
				};
			}
			self._eventBus.emit('componentLoaded', component);
			return component;
		})
		.catch(function (reason) {
			self._eventBus.emit('error', reason);
			return null;
		});
};

/**
 * Gets map of components by names.
 * @returns {Object} Map of components by names.
 */
ComponentLoader.prototype.getComponentsByNames = function () {
	return this._loadedComponents || {};
};
},{"../../lib/base/LoaderBase":34,"../../lib/helpers/moduleHelper":37,"util":46}],24:[function(require,module,exports){
/*
 * catberry
 *
 * Copyright (c) 2015 Denis Rechkunov and project contributors.
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

'use strict';

module.exports = StoreLoader;

var moduleHelper = require('../../lib/helpers/moduleHelper'),
	util = require('util'),
	LoaderBase = require('../../lib/base/LoaderBase');

util.inherits(StoreLoader, LoaderBase);

/**
 * Creates instance of the store loader.
 * @param {ServiceLocator} $serviceLocator Locator to resolve stores.
 * @constructor
 * @extends LoaderBase
 */
function StoreLoader($serviceLocator) {
	this._serviceLocator = $serviceLocator;
	this._eventBus = $serviceLocator.resolve('eventBus');
	LoaderBase.call(this, $serviceLocator.resolveAll('storeTransform'));
}

/**
 * Current event bus.
 * @type {EventEmitter}
 * @private
 */
StoreLoader.prototype._eventBus = null;

/**
 * Current service locator.
 * @type {ServiceLocator}
 * @private
 */
StoreLoader.prototype._serviceLocator = null;

/**
 * Current set of loaded stores.
 * @type {Object}
 * @private
 */
StoreLoader.prototype._loadedStores = null;

/**
 * Loads all stores when it is in a browser.
 * @returns {Promise} Promise for nothing.
 */
StoreLoader.prototype.load = function () {
	if (this._loadedStores) {
		return Promise.resolve(this._loadedStores);
	}

	this._loadedStores = {};
	var self = this;

	return Promise.resolve()
		.then(function () {
			var stores = self._serviceLocator.resolveAll('store'),
				storePromises = [];

			// the list is a stack, we should reverse it
			stores.forEach(function (store) {
				storePromises.unshift(
					self._getStore(store)
				);
			});

			return Promise.all(storePromises);
		})
		.then(function (stores) {
			stores.forEach(function (store) {
				if (!store || typeof(store) !== 'object') {
					return;
				}
				self._loadedStores[store.name] = store;
			});
			self._eventBus.emit('allStoresLoaded', self._loadedStores);
			return Promise.resolve(self._loadedStores);
		});
};

/**
 * Gets the store from store details.
 * @param {Object} storeDetails Store details.
 * @returns {Promise<Object>} Promise for store.
 * @private
 */
StoreLoader.prototype._getStore = function (storeDetails) {
	var self = this;
	return this._applyTransforms(storeDetails)
		.then(function (transformed) {
			self._eventBus.emit('storeLoaded', transformed);
			return transformed;
		})
		.catch(function (reason) {
			self._eventBus.emit('error', reason);
			return null;
		});
};

/**
 * Gets stores map by names.
 * @returns {Object} Map of stores by names.
 */
StoreLoader.prototype.getStoresByNames = function () {
	return this._loadedStores || {};
};
},{"../../lib/base/LoaderBase":34,"../../lib/helpers/moduleHelper":37,"util":46}],25:[function(require,module,exports){
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

'use strict';

module.exports = ModuleApiProvider;

var util = require('util'),
	propertyHelper = require('../../lib/helpers/propertyHelper'),
	ModuleApiProviderBase = require('../../lib/base/ModuleApiProviderBase'),
	moduleHelper = require('../../lib/helpers/moduleHelper');

util.inherits(ModuleApiProvider, ModuleApiProviderBase);

/**
 * Creates new instance of the module API provider.
 * @param {ServiceLocator} $serviceLocator Service locator
 * to resolve dependencies.
 * @constructor
 * @extends ModuleApiProviderBase
 */
function ModuleApiProvider($serviceLocator) {
	ModuleApiProviderBase.call(this, $serviceLocator);
	propertyHelper.defineReadOnly(this, 'isBrowser', true);
	propertyHelper.defineReadOnly(this, 'isServer', false);
}

/**
 * Redirects current page to specified URI.
 * @param {string} uriString URI to redirect.
 * @returns {Promise} Promise for nothing.
 */
ModuleApiProvider.prototype.redirect = function (uriString) {
	var requestRouter = this.locator.resolve('requestRouter');
	return requestRouter.go(uriString);
};

/**
 * Clears current location URI's fragment.
 * @returns {Promise} Promise for nothing.
 */
ModuleApiProvider.prototype.clearFragment = function () {
	var window = this.locator.resolve('window'),
		position = window.document.body.scrollTop;
	window.location.hash = '';
	window.document.body.scrollTop = position;
	return Promise.resolve();
};
},{"../../lib/base/ModuleApiProviderBase":35,"../../lib/helpers/moduleHelper":37,"../../lib/helpers/propertyHelper":38,"util":46}],26:[function(require,module,exports){
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

'use strict';

module.exports = require('./lib/Bootstrapper');

},{"./lib/Bootstrapper":69}],27:[function(require,module,exports){
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

'use strict';

module.exports = ContextFactory;

var URI = require('catberry-uri').URI,
	propertyHelper = require('./helpers/propertyHelper');

/**
 * Creates new instance of the context factory.
 * @param {ServiceLocator} $serviceLocator Locator to resolve dependencies.
 * @constructor
 */
function ContextFactory($serviceLocator) {
	this._serviceLocator = $serviceLocator;
}

/**
 * Current service locator.
 * @type {ServiceLocator}
 * @private
 */
ContextFactory.prototype._serviceLocator = null;

/**
 * Creates new context for modules.
 * @param {Object} additional Additional parameters.
 * @param {URI} additional.referrer Current referrer.
 * @param {URI} additional.location Current location.
 * @param {String} additional.userAgent Current user agent.
 */
ContextFactory.prototype.create = function (additional) {
	var apiProvider = this._serviceLocator.resolve('moduleApiProvider'),
		context = Object.create(apiProvider);
	Object.keys(additional)
		.forEach(function (key) {
			propertyHelper.defineReadOnly(context, key, additional[key]);
		});
	return context;
};
},{"./helpers/propertyHelper":38,"catberry-uri":52}],28:[function(require,module,exports){
/*
 * catberry
 *
 * Copyright (c) 2015 Denis Rechkunov and project contributors.
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

'use strict';

module.exports = SerialWrapper;

var events = require('events');

var ERROR_NO_SUCH_METHOD = 'There is no such registered method';

/**
 * Creates new instance of the serial wrapper for promises.
 * @constructor
 */
function SerialWrapper() {
	this._emitter = new events.EventEmitter();
	this._emitter.setMaxListeners(0);
	this._toInvoke = {};
	this._inProgress = {};
}

/**
 * Current event emitter.
 * @type {EventEmitter}
 * @private
 */
SerialWrapper.prototype._emitter = null;

/**
 * Current set of named methods to invoke.
 * @type {Object}
 * @private
 */
SerialWrapper.prototype._toInvoke = null;

/**
 * Current set of flags if the method is in progress.
 * @type {Object}
 * @private
 */
SerialWrapper.prototype._inProgress = null;

/**
 * Adds method to the set.
 * @param {String} name Method name.
 * @param {Function} toInvoke Function that returns promise.
 */
SerialWrapper.prototype.add = function (name, toInvoke) {
	this._toInvoke[name] = toInvoke;
};

/**
 * Returns true if method with such name was registered to the set.
 * @param {String} name Name of method.
 * @returns {boolean} True if method name is registered.
 */
SerialWrapper.prototype.isRegistered = function (name) {
	return typeof(this._toInvoke[name]) === 'function';
};

/**
 * Invokes method without concurrency.
 * @param {String} name Method name.
 * @returns {Promise<Object>} Promise for result.
 */
SerialWrapper.prototype.invoke = function (name) {
	var self = this;

	if (!this.isRegistered(name)) {
		return Promise.reject(new Error(ERROR_NO_SUCH_METHOD));
	}

	if (this._inProgress[name]) {
		return new Promise (function (fulfill, reject) {
			self._emitter.once(name, fulfill);
			self._emitter.once(name + '--error', reject);
		});
	}

	this._inProgress[name] = true;
	this._toInvoke[name]()
		.then(function (result) {
			self._emitter.emit(name, result);
			self._inProgress[name] = null;
		})
		.catch(function (reason) {
			self._emitter.emit(name + '--error', reason);
			self._inProgress[name] = null;
		});

	return this.invoke(name);
};
},{"events":42}],29:[function(require,module,exports){
/*
 * catberry
 *
 * Copyright (c) 2015 Denis Rechkunov and project contributors.
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

'use strict';

module.exports = StoreDispatcher;

var util = require('util'),
	SerialWrapper = require('./SerialWrapper'),
	moduleHelper = require('./helpers/moduleHelper');

var ERROR_STORE_NOT_FOUND = 'Store "%s" not found',
	ERROR_STATE = 'State should be set before any request',
	DEFAULT_LIFETIME = 60000;

/**
 * Creates new instance of store dispatcher.
 * @param {ServiceLocator} $serviceLocator Locator to resolve dependencies.
 * @param {StoreLoader} $storeLoader Store loader to load stores.
 * @param {EventEmitter} $eventBus Event bus to emit events.
 * @constructor
 */
function StoreDispatcher($serviceLocator, $storeLoader, $eventBus) {
	this._serviceLocator = $serviceLocator;
	this._storeLoader = $storeLoader;
	this._eventBus = $eventBus;
	this._storeInstances = {};
	this._lastData = {};
	this._dependencies = {};
	this._serialWrapper = new SerialWrapper();
}

/**
 * Current service locator.
 * @type {ServiceLocator}
 * @private
 */
StoreDispatcher.prototype._serviceLocator = null;

/**
 * Current event bus.
 * @type {EventEmitter}
 * @private
 */
StoreDispatcher.prototype._eventBus = null;

/**
 * Current store loader.
 * @type {StoreLoader}
 * @private
 */
StoreDispatcher.prototype._storeLoader = null;

/**
 * Current map of all store instances.
 * @type {null}
 * @private
 */
StoreDispatcher.prototype._storeInstances = null;

/**
 * Current map of last data for each store.
 * @type {Object}
 * @private
 */
StoreDispatcher.prototype._lastData = null;

/**
 * Current map of last state of store dispatcher.
 * @type {Object}
 * @private
 */
StoreDispatcher.prototype._lastState = null;

/**
 * Current serial wrapper.
 * @type {SerialWrapper}
 * @private
 */
StoreDispatcher.prototype._serialWrapper = null;

/**
 * Current basic context for all store contexts.
 * @type {Object}
 * @private
 */
StoreDispatcher.prototype._currentBasicContext = null;

/**
 * Current set of store dependency graph.
 * @type {Object}
 * @private
 */
StoreDispatcher.prototype._dependencies = null;

/**
 * Gets store data and creates store instance if required.
 * @param {String} storeName Name of store.
 * @returns {Object} Store's data.
 */
StoreDispatcher.prototype.getStoreData = function (storeName) {
	if (!this._lastState) {
		return Promise.reject(new Error(ERROR_STATE));
	}
	if (typeof(storeName) !== 'string') {
		return Promise.resolve(null);
	}
	if (this._lastData.hasOwnProperty(storeName)) {
		var existTime = Date.now() - this._lastData[storeName].createdAt;
		if (existTime <= this._lastData[storeName].lifetime) {
			return Promise.resolve(this._lastData[storeName].data);
		}
		delete this._lastData[storeName];
	}
	var self = this,
		lifetime = DEFAULT_LIFETIME;
	self._eventBus.emit('storeDataLoad', {name: storeName});
	var store = this.getStore(storeName);
	if (!store) {
		return Promise.reject(new Error(
				util.format(ERROR_STORE_NOT_FOUND, storeName))
		);
	}
	if (typeof(store.$lifetime) === 'number') {
		lifetime = store.$lifetime;
	}
	return self._serialWrapper.invoke(storeName)
		.then(function (data) {
			self._lastData[storeName] = {
				data: data,
				lifetime: lifetime,
				createdAt: Date.now()
			};
			self._eventBus.emit('storeDataLoaded', {
				name: storeName,
				data: data,
				lifetime: lifetime
			});
			return data;
		});
};

/**
 * Sends action to specified store and resolves promises in serial mode.
 * @param {String} storeName Name of the store.
 * @param {String} actionName Name of the action.
 * @param {Object} args Action arguments.
 * @returns {Promise<*>} Promise for action handling result.
 */
StoreDispatcher.prototype.sendAction = function (storeName, actionName, args) {
	if (!this._lastState) {
		return Promise.reject(new Error(ERROR_STATE));
	}
	var self = this,
		actionDetails = {
			storeName: storeName,
			actionName: actionName,
			args: args
		};
	this._eventBus.emit('actionSend', actionDetails);
	var store = this.getStore(storeName);
	if (!store) {
		return Promise.reject(new Error(
			util.format(ERROR_STORE_NOT_FOUND, storeName))
		);
	}
	var handleMethod = moduleHelper.getMethodToInvoke(
		store, 'handle', actionName
	);
	return moduleHelper.getSafePromise(function () {
		return handleMethod(args);
	})
		.then(function (result) {
			self._eventBus.emit('actionSent', actionDetails);
			return result;
		});
};

/**
 * Sends action to every store that has handle method for such action.
 * @param {String} actionName Name of the action.
 * @param {Object} arg Action arguments.
 * @returns {Promise<Array<*>>} Promise for the action handling result.
 */
StoreDispatcher.prototype.sendBroadcastAction = function (actionName, arg) {
	var promises = [],
		self = this,
		storesByNames = this._storeLoader.getStoresByNames(),
		methodName = moduleHelper.getCamelCaseName('handle', actionName);
	Object.keys(storesByNames)
		.forEach(function (storeName) {
			var store = storesByNames[storeName],
				protoMethod = store.constructor.prototype[methodName];
			if (typeof(protoMethod) !== 'function') {
				return;
			}
			var sendActionPromise = self.sendAction(
				store.name, actionName,  arg
			);
			promises.push(sendActionPromise);
		});
	return Promise.all(promises);
};

/**
 * Sets new state to store dispatcher and invokes "changed" method for all
 * stores which state have been changed.
 * @param {Object} parameters Map of new parameters.
 * @param {Object} basicContext Basic context for all stores.
 * @returns {Array<String>} Names of stores that have been changed.
 */
StoreDispatcher.prototype.setState = function (parameters, basicContext) {
	parameters = parameters || {};
	if (!this._lastState) {
		this._currentBasicContext = basicContext;
		this._lastState = parameters;
		return [];
	}

	// some store's parameters can be removed since last time
	var self = this,
		changed = {};

	Object.keys(this._lastState)
		.filter(function (storeName) {
			return !parameters.hasOwnProperty(storeName);
		})
		.forEach(function (name) {
			changed[name] = true;
		});

	Object.keys(parameters)
		.forEach(function (storeName) {
			// new parameters were set for store
			if (!self._lastState.hasOwnProperty(storeName)) {
				changed[storeName] = true;
				return;
			}

			// new and last parameters has different values
			var lastParameterNames =
					Object.keys(self._lastState[storeName]),
				currentParameterNames =
					Object.keys(parameters[storeName]);

			if (currentParameterNames.length !==
				lastParameterNames.length) {
				changed[storeName] = true;
				return;
			}

			currentParameterNames.every(function (parameterName) {
				if (parameters[storeName][parameterName] !==
					self._lastState[storeName][parameterName]) {
					changed[storeName] = true;
					return false;
				}
				return true;
			});
		});

	this._lastState = parameters;
	if (this._currentBasicContext !== basicContext) {
		this._currentBasicContext = basicContext;
		Object.keys(this._storeInstances)
			.forEach(function (storeName) {
				self._storeInstances[storeName].$context =
					self._getStoreContext(storeName);
			});
	}

	var changedStoreNames = {};
	Object.keys(changed)
		.forEach(function (storeName) {
			var store = self.getStore(storeName);
			if (!store) {
				return;
			}
			store.$context.changed()
				.forEach(function (name) {
					changedStoreNames[name] = true;
				});
		});

	this._eventBus.emit('stateChanged', {
		oldState: this._lastState,
		newState: parameters
	});
	return Object.keys(changedStoreNames);
};

/**
 * Gets context for store using component's context as a prototype.
 * @param {String} storeName Name of store.
 * @returns {Object} Store context.
 * @private
 */
StoreDispatcher.prototype._getStoreContext = function (storeName) {
	var self = this,
		storeContext = Object.create(this._currentBasicContext);
	storeContext.name = storeName;
	storeContext.state = this._lastState[storeName] || {};
	storeContext.changed = function () {
		var walked = {},
			current,
			toChange = [storeName];

		while (toChange.length > 0) {
			current = toChange.shift();
			if (walked.hasOwnProperty(current)) {
				continue;
			}
			walked[current] = true;
			if (self._dependencies.hasOwnProperty(current)) {
				toChange = toChange.concat(
					Object.keys(self._dependencies[current])
				);
			}
			delete self._lastData[current];
			self._eventBus.emit('storeChanged', current);
		}
		return Object.keys(walked);
	};
	storeContext.getStoreData = function (sourceStoreName) {
		if (sourceStoreName === storeName) {
			return Promise.resolve(null);
		}
		return self.getStoreData(sourceStoreName);
	};
	storeContext.setDependency = function (name) {
		if (!self._dependencies.hasOwnProperty(name)) {
			self._dependencies[name] = {};
		}
		self._dependencies[name][storeName] = true;
	};
	storeContext.unsetDependency = function (name) {
		if (!self._dependencies.hasOwnProperty(name)) {
			return;
		}
		delete self._dependencies[name][storeName];
	};
	storeContext.sendAction = function (storeName, name, args) {
		return self.sendAction(storeName, name, args);
	};
	storeContext.sendBroadcastAction = function (name, args) {
		return self.sendBroadcastAction(name, args);
	};

	return storeContext;
};

/**
 * Gets store instance and creates it if required.
 * @param {String} storeName Name of store.
 * @returns {Promise<Object>} Promise for store.
 */
StoreDispatcher.prototype.getStore = function (storeName) {
	if (!storeName) {
		return null;
	}
	var store = this._storeInstances[storeName];
	if (store) {
		return store;
	}
	var self = this;

	var stores = self._storeLoader.getStoresByNames(),
		config = self._serviceLocator.resolve('config');
	if (!stores.hasOwnProperty(storeName)) {
		return null;
	}

	var constructor = stores[storeName].constructor;
	constructor.prototype.$context = self._getStoreContext(storeName);
	self._storeInstances[storeName] = self._serviceLocator
		.resolveInstance(constructor, config);
	self._storeInstances[storeName].$context = constructor.prototype.$context;

	self._serialWrapper.add(storeName, function () {
		var loadMethod = moduleHelper.getMethodToInvoke(
			self._storeInstances[storeName], 'load'
		);
		return moduleHelper.getSafePromise(loadMethod);
	});
	return self._storeInstances[storeName];
};
},{"./SerialWrapper":28,"./helpers/moduleHelper":37,"util":46}],30:[function(require,module,exports){
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

'use strict';

module.exports = BootstrapperBase;

var util = require('util'),
	moduleHelper = require('../helpers/moduleHelper'),
	uhr = require('catberry-uhr'),
	Promise = require('promise'),
	StateProvider = require('../providers/StateProvider'),
	StoreLoader = require('../loaders/StoreLoader'),
	ComponentLoader = require('../loaders/ComponentLoader'),
	DocumentRenderer = require('../DocumentRenderer'),
	RequestRouter = require('../RequestRouter'),
	ModuleApiProviderBase = require('../base/ModuleApiProviderBase'),
	ContextFactory = require('../ContextFactory'),
	EventEmitter = require('events').EventEmitter;

var INFO_COMPONENT_LOADED = 'Component "%s" loaded',
	INFO_STORE_LOADED = 'Store "%s" loaded',
	INFO_ALL_STORES_LOADED = 'All stores loaded',
	INFO_ALL_COMPONENTS_LOADED = 'All components loaded',
	INFO_DOCUMENT_RENDERED = 'Document rendered for URI %s',
	TRACE_RENDER_COMPONENT = 'Component "%s%s" is being rendered...',
	TIMESTAMP_FORMAT = ' (%d ms)',
	TRACE_COMPONENT_RENDERED = 'Component "%s%s" rendered%s';

/**
 * Creates new instance of base Catberry bootstrapper.
 * @param {Function} catberryConstructor Constructor
 * of the Catberry's main module.
 * @constructor
 */
function BootstrapperBase(catberryConstructor) {
	this._catberryConstructor = catberryConstructor;
}

/**
 * Current constructor of the Catberry's main module.
 * @type {Function}
 * @private
 */
BootstrapperBase.prototype._catberryConstructor = null;

/**
 * Creates new full-configured instance of the Catberry application.
 * @param {Object?} configObject Configuration object.
 * @returns {Catberry} Catberry application instance.
 */
BootstrapperBase.prototype.create = function (configObject) {
	var currentConfig = configObject || {},
		catberry = new this._catberryConstructor();

	this.configure(currentConfig, catberry.locator);
	catberry.events = catberry.locator.resolveInstance(ModuleApiProviderBase);
	return catberry;
};

/**
 * Configures locator with all required type registrations.
 * @param {Object} configObject Configuration object.
 * @param {ServiceLocator} locator Service locator to configure.
 */
BootstrapperBase.prototype.configure = function (configObject, locator) {
	var eventBus = new EventEmitter();
	eventBus.setMaxListeners(0);
	locator.registerInstance('promise', Promise);
	locator.registerInstance('eventBus', eventBus);
	locator.registerInstance('config', configObject);
	locator.register('stateProvider', StateProvider, configObject, true);
	locator.register('contextFactory', ContextFactory, configObject, true);
	locator.register('storeLoader', StoreLoader, configObject, true);
	locator.register('componentLoader', ComponentLoader, configObject, true);
	locator.register('documentRenderer', DocumentRenderer, configObject, true);
	locator.register('requestRouter', RequestRouter, configObject, true);

	uhr.register(locator);
};

/**
 * Wraps event bus with log messages.
 * @param {EventEmitter} eventBus Event emitter that implements event bus.
 * @param {Logger} logger Logger to write messages.
 * @protected
 */
BootstrapperBase.prototype._wrapEventsWithLogger = function (eventBus, logger) {
	eventBus
		.on('componentLoaded', function (args) {
			logger.info(util.format(INFO_COMPONENT_LOADED, args.name));
		})
		.on('storeLoaded', function (args) {
			logger.info(util.format(INFO_STORE_LOADED, args.name));
		})
		.on('allStoresLoaded', function () {
			logger.info(INFO_ALL_STORES_LOADED);
		})
		.on('allComponentsLoaded', function () {
			logger.info(INFO_ALL_COMPONENTS_LOADED);
		})
		.on('componentRender', function (args) {
			var id = args.context.
					attributes[moduleHelper.ATTRIBUTE_ID];
			logger.trace(util.format(TRACE_RENDER_COMPONENT,
				moduleHelper.getTagNameForComponentName(args.name),
				id ? '#' + id : ''
			));
		})
		.on('componentRendered', function (args) {
			var id = args.context.
					attributes[moduleHelper.ATTRIBUTE_ID];
			logger.trace(util.format(
				TRACE_COMPONENT_RENDERED,
				moduleHelper.getTagNameForComponentName(args.name),
				id ? '#' + id : '',
				typeof(args.time) === 'number' ?
					util.format(TIMESTAMP_FORMAT, args.time) : ''
			));
		})
		.on('documentRendered', function (args) {
			logger.info(util.format(
				INFO_DOCUMENT_RENDERED, args.location.toString()
			));
		})
		.on('error', function (error) {
			logger.error(error);
		});
};
},{"../ContextFactory":27,"../DocumentRenderer":20,"../RequestRouter":22,"../base/ModuleApiProviderBase":35,"../helpers/moduleHelper":37,"../loaders/ComponentLoader":23,"../loaders/StoreLoader":24,"../providers/StateProvider":40,"catberry-uhr":50,"events":42,"promise":58,"util":46}],31:[function(require,module,exports){
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

'use strict';

module.exports = CatberryBase;

var ServiceLocator = require('catberry-locator');

/**
 * Creates new instance of the basic Catberry application module.
 * @constructor
 */
function CatberryBase() {
	this.locator = new ServiceLocator();
	this.locator.registerInstance('serviceLocator', this.locator);
	this.locator.registerInstance('catberry', this);
}

/**
 * Current version of catberry.
 */
CatberryBase.prototype.version = '5.0.5';

/**
 * Current object with events.
 * @type {ModuleApiProvider}
 */
CatberryBase.prototype.events = null;

/**
 * Current service locator.
 * @type {ServiceLocator}
 */
CatberryBase.prototype.locator = null;
},{"catberry-locator":48}],32:[function(require,module,exports){
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

'use strict';

module.exports = CookieWrapperBase;

var util = require('util');

/**
 * Creates new instance of the basic cookie wrapper.
 * @constructor
 */
function CookieWrapperBase() {
}

/**
 * Gets map of cookie values by name.
 * @returns {Object} Cookies map by names.
 */
CookieWrapperBase.prototype.getAll = function () {
	var string = this.getCookieString();
	return this._parseCookieString(string);
};

/**
 * Gets cookie value by name.
 * @param {string} name Cookie name.
 * @returns {string} Cookie value.
 */
CookieWrapperBase.prototype.get = function (name) {
	if (typeof(name) !== 'string') {
		return '';
	}

	return this.getAll()[name] || '';
};

/**
 * Parses cookie string into map of cookie key/value pairs.
 * @param {string} string Cookie string.
 * @returns {Object} Object with cookie values by keys.
 * @protected
 */
CookieWrapperBase.prototype._parseCookieString = function (string) {
	var cookie = {};

	if (typeof (string) !== 'string') {
		return cookie;
	}
	string
		.split(/; */)
		.forEach(function (cookiePair) {
			var equalsIndex = cookiePair.indexOf('=');
			if (equalsIndex < 0) {
				return;
			}

			var key = cookiePair.substr(0, equalsIndex).trim(),
				value = cookiePair.substr(
					equalsIndex + 1, cookiePair.length
				).trim();

			value = value.replace(/^"|"$/g, '');
			cookie[key] = value;
		});

	return cookie;
};

/**
 * Converts cookie setup object to cookie string.
 * @param {Object} cookieSetup Cookie setup object.
 * @param {string} cookieSetup.key Cookie key.
 * @param {string} cookieSetup.value Cookie value.
 * @param {number?} cookieSetup.maxAge Max cookie age in seconds.
 * @param {Date?} cookieSetup.expires Expire date.
 * @param {string?} cookieSetup.path URI path for cookie.
 * @param {string?} cookieSetup.domain Cookie domain.
 * @param {boolean?} cookieSetup.secure Is cookie secured.
 * @param {boolean?} cookieSetup.httpOnly Is cookie HTTP only.
 * @returns {string} Cookie string.
 * @protected
 */
CookieWrapperBase.prototype._convertToCookieSetup = function (cookieSetup) {
	if (typeof(cookieSetup.key) !== 'string' ||
		typeof(cookieSetup.value) !== 'string') {
		throw new Error('Wrong key or value');
	}

	var cookie = cookieSetup.key + '=' + cookieSetup.value;

	// http://tools.ietf.org/html/rfc6265#section-4.1.1
	if (typeof(cookieSetup.maxAge) === 'number') {
		cookie += '; Max-Age=' + cookieSetup.maxAge.toFixed();
		if (!cookieSetup.expires) {
			// by default expire date = current date + max-age in seconds
			cookieSetup.expires = new Date(Date.now() +
				cookieSetup.maxAge * 1000);
		}
	}
	if (cookieSetup.expires instanceof Date) {
		cookie += '; Expires=' + cookieSetup.expires.toUTCString();
	}
	if (typeof(cookieSetup.path) === 'string') {
		cookie += '; Path=' + cookieSetup.path;
	}
	if (typeof(cookieSetup.domain) === 'string') {
		cookie += '; Domain=' + cookieSetup.domain;
	}
	if (typeof(cookieSetup.secure) === 'boolean' &&
		cookieSetup.secure) {
		cookie += '; Secure';
	}
	if (typeof(cookieSetup.httpOnly) === 'boolean' &&
		cookieSetup.httpOnly) {
		cookie += '; HttpOnly';
	}

	return cookie;
};
},{"util":46}],33:[function(require,module,exports){
/*
 * catberry
 *
 * Copyright (c) 2015 Denis Rechkunov and project contributors.
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

'use strict';

module.exports = DocumentRendererBase;

/**
 * Creates new instance of the basic document renderer.
 * @param {ServiceLocator} $serviceLocator Locator to resolve dependencies.
 * @constructor
 */
function DocumentRendererBase($serviceLocator) {
	var self = this;
	this._serviceLocator = $serviceLocator;
	this._contextFactory = $serviceLocator.resolve('contextFactory');
	this._componentLoader = $serviceLocator.resolve('componentLoader');
	this._eventBus = $serviceLocator.resolve('eventBus');

	var storeLoader = $serviceLocator.resolve('storeLoader');
	this._loading = Promise.all([
		this._componentLoader.load(),
		storeLoader.load()
	])
		.then(function () {
			self._loading = null;
			self._eventBus.emit('ready');
		})
		.catch(function (reason) {
			self._eventBus.emit('error', reason);
		});
}

/**
 * Current service locator.
 * @type {ServiceLocator}
 * @protected
 */
DocumentRendererBase.prototype._serviceLocator = null;

/**
 * Current component loader.
 * @type {ComponentLoader}
 * @protected
 */
DocumentRendererBase.prototype._componentLoader = null;

/**
 * Current module loading promise.
 * @type {Promise}
 * @protected
 */
DocumentRendererBase.prototype._loading = null;

/**
 * Current context factory.
 * @type {ContextFactory}
 * @protected
 */
DocumentRendererBase.prototype._contextFactory = null;

/**
 * Gets promise for ready state when it will be able handle requests.
 * @returns {Promise} Promise for nothing.
 * @protected
 */
DocumentRendererBase.prototype._getPromiseForReadyState = function () {
	return this._loading ?
		this._loading :
		Promise.resolve();
};
},{}],34:[function(require,module,exports){
/*
 * catberry
 *
 * Copyright (c) 2015 Denis Rechkunov and project contributors.
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

'use strict';

module.exports = LoaderBase;

var moduleHelper = require('../helpers/moduleHelper');

/**
 * Create basic implementation of a module loader.
 * @param {Array} transforms Array of module transformations.
 * @constructor
 */
function LoaderBase(transforms) {
	this._transforms = transforms;
}

/**
 * Current list of component transforms.
 * @type {Array}
 * @private
 */
LoaderBase.prototype._transforms = null;

/**
 * Applies all transformations registered in Service Locator.
 * @param {Object} module Loaded module.
 * @param {number?} index Transformation index in a list.
 * @returns {Promise<Object>} Transformed module.
 * @protected
 */
LoaderBase.prototype._applyTransforms = function (module, index) {
	if (index === undefined) {
		// the list is a stack, we should reverse it
		index = this._transforms.length - 1;
	}

	if (index < 0) {
		return Promise.resolve(module);
	}

	var self = this,
		transformation = this._transforms[index];

	return Promise.resolve()
		.then(function () {
			return transformation.transform(module);
		})
		.then(function (transformedModule) {
			return self._applyTransforms(transformedModule, index - 1);
		});
};
},{"../helpers/moduleHelper":37}],35:[function(require,module,exports){
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

'use strict';

module.exports = ModuleApiProviderBase;

var ERROR_EVENT_NAME = 'Event name should be a string',
	ERROR_EVENT_HANDLER = 'Event handler should be a function';

/**
 * Creates new instance of the basic API provider.
 * @param {ServiceLocator} $serviceLocator Service locator
 * to resolve dependencies.
 * @constructor
 */
function ModuleApiProviderBase($serviceLocator) {
	this.locator = $serviceLocator;
	this.cookie = $serviceLocator.resolve('cookieWrapper');
	this._eventBus = $serviceLocator.resolve('eventBus');
}

/**
 * Current cookie provider.
 * @type {CookieWrapper}
 */
ModuleApiProviderBase.prototype.cookie = null;

/**
 * Current service locator.
 * @type {ServiceLocator}
 * @protected
 */
ModuleApiProviderBase.prototype.locator = null;

/**
 * Current event bus.
 * @type {EventEmitter}
 * @private
 */
ModuleApiProviderBase.prototype._eventBus = null;

/**
 * Subscribes on the specified event in Catberry.
 * @param {string} eventName Name of the event.
 * @param {Function} handler Event handler.
 * @returns {ModuleApiProviderBase} This object for chaining.
 */
ModuleApiProviderBase.prototype.on = function (eventName, handler) {
	checkEventNameAndHandler(eventName, handler);
	this._eventBus.on(eventName, handler);
	return this;
};

/**
 * Subscribes on the specified event in Catberry to handle once.
 * @param {string} eventName Name of the event.
 * @param {Function} handler Event handler.
 * @returns {ModuleApiProviderBase} This object for chaining.
 */
ModuleApiProviderBase.prototype.once = function (eventName, handler) {
	checkEventNameAndHandler(eventName, handler);
	this._eventBus.once(eventName, handler);
	return this;
};

/**
 * Removes the specified handler from the specified event.
 * @param {string} eventName Name of the event.
 * @param {Function} handler Event handler.
 * @returns {ModuleApiProviderBase} This object for chaining.
 */
ModuleApiProviderBase.prototype.removeListener = function (eventName, handler) {
	checkEventNameAndHandler(eventName, handler);
	this._eventBus.removeListener(eventName, handler);
	return this;
};

/**
 * Removes all handlers from the specified event in Catberry.
 * @param {string} eventName Name of the event.
 * @returns {ModuleApiProviderBase} This object for chaining.
 */
ModuleApiProviderBase.prototype.removeAllListeners = function (eventName) {
	checkEventNameAndHandler(eventName, dummy);
	this._eventBus.removeAllListeners(eventName);
	return this;
};

/**
 * Checks if event name is a string and handler is a function.
 * @param {*} eventName Name of the event to check.
 * @param {*} handler The event handler to check.
 */
function checkEventNameAndHandler(eventName, handler) {
	if (typeof (eventName) !== 'string') {
		throw new Error(ERROR_EVENT_NAME);
	}

	if (typeof (handler) !== 'function') {
		throw new Error(ERROR_EVENT_HANDLER);
	}
}

/**
 * Does nothing. It is used as a default callback.
 */
function dummy() {}

},{}],36:[function(require,module,exports){
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

'use strict';

var util = require('util');

var TITLE = 'Catberry@5.0.5 (' +
		'<a href="https://github.com/catberry/catberry/issues" ' +
		'target="_blank">' +
		'report an issue' +
		'</a>' +
		')',
	AMP = /&/g,
	LT = /</g,
	GT = />/g,
	QUOT = /\"/g,
	SINGLE_QUOT = /\'/g,
	ERROR_MESSAGE_REGEXP = /^(?:[\w$]+): (?:.+)\r?\n/i,
	ERROR_MESSAGE_FORMAT = '<span ' +
		'style="color: red; font-size: 16pt; font-weight: bold;">' +
		'%s%s' +
		'</span>',
	NEW_LINE = /\r?\n/g;

module.exports = {
	/**
	 * Prints error with pretty formatting.
	 * @param {Error} error Error to print.
	 * @param {string} userAgent User agent information.
	 * @returns {string} HTML with all information about error.
	 */
	prettyPrint: function (error, userAgent) {
		if (!error || typeof(error) !== 'object') {
			return '';
		}
		var dateString = (new Date()).toUTCString() + ';<br/>',
			userAgentString = (userAgent ? (userAgent + ';<br/>') : ''),
			name = (typeof(error.name) === 'string' ? error.name + ': ' : ''),
			message = String(error.message || ''),
			stack = String(error.stack || '').replace(ERROR_MESSAGE_REGEXP, ''),
			fullMessage = util.format(
				ERROR_MESSAGE_FORMAT, escape(name), escape(message)
			);

		return '<div style="background-color: white; font-size: 12pt;">' +
			dateString +
			userAgentString +
			TITLE + '<br/><br/>' +
			fullMessage + '<br/><br/>' +
			escape(stack) +
			'</div>';
	}
};

/**
 * Escapes error text.
 * @param {string} value Error text.
 * @returns {string} escaped and formatted string.
 */
function escape(value) {
	return value
		.replace(AMP, '&amp;')
		.replace(LT, '&lt;')
		.replace(GT, '&gt;')
		.replace(QUOT, '&quot;')
		.replace(SINGLE_QUOT, '&#39;')
		.replace(NEW_LINE, '<br/>');
}
},{"util":46}],37:[function(require,module,exports){
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

'use strict';

var helper = {
	COMPONENT_PREFIX: 'cat-',
	COMPONENT_PREFIX_REGEXP: /^cat-/,
	COMPONENT_ERROR_TEMPLATE_POSTFIX: '--error',
	DOCUMENT_COMPONENT_NAME: 'document',
	HEAD_COMPONENT_NAME: 'head',
	ATTRIBUTE_ID: 'id',
	ATTRIBUTE_STORE: 'cat-store',
	DEFAULT_LOGIC_FILENAME: 'index.js',

	/**
	 * Creates name for error template of component.
	 * @param {String} componentName name of component.
	 * @returns {string} Name of error template of the component.
	 */
	getNameForErrorTemplate: function (componentName) {
		if (typeof(componentName) !== 'string') {
			return '';
		}
		return componentName + helper.COMPONENT_ERROR_TEMPLATE_POSTFIX;
	},

	/**
	 * Determines if specified component name is the "document" component name.
	 * @param {string} componentName Name of the component.
	 * @returns {boolean} True if specified component is the "document" component.
	 */
	isDocumentComponent: function (componentName) {
		return componentName.toLowerCase() === helper.DOCUMENT_COMPONENT_NAME;
	},
	/**
	 * Determines if specified component name is the "head" component name.
	 * @param {string} componentName Name of the component.
	 * @returns {boolean} True if specified component is the "head" component.
	 */
	isHeadComponent: function (componentName) {
		return componentName.toLowerCase() === helper.HEAD_COMPONENT_NAME;
	},

	/**
	 * Gets the original component name without prefix.
	 * @param {String} fullComponentName Full component name (tag name).
	 * @returns {String} The original component name without prefix.
	 */
	getOriginalComponentName: function (fullComponentName) {
		if (typeof (fullComponentName) !== 'string') {
			return '';
		}
		fullComponentName = fullComponentName.toLowerCase();
		if (fullComponentName === helper.HEAD_COMPONENT_NAME) {
			return fullComponentName;
		}
		if (fullComponentName === helper.DOCUMENT_COMPONENT_NAME) {
			return fullComponentName;
		}
		return fullComponentName.replace(helper.COMPONENT_PREFIX_REGEXP, '');
	},

	/**
	 * Gets valid tag name for component.
	 * @param {String} componentName Name of the component.
	 * @returns {string} Name of the tag.
	 */
	getTagNameForComponentName: function (componentName) {
		if (typeof(componentName) !== 'string') {
			return '';
		}
		var upperComponentName = componentName.toUpperCase();
		if (componentName === helper.HEAD_COMPONENT_NAME) {
			return upperComponentName;
		}
		if (componentName === helper.DOCUMENT_COMPONENT_NAME) {
			return upperComponentName;
		}
		return helper.COMPONENT_PREFIX.toUpperCase() + upperComponentName;
	},

	/**
	 * Gets method of the module that can be invoked.
	 * @param {Object} module Module implementation.
	 * @param {string} prefix Method prefix (i.e. handle).
	 * @param {string?} name Name of the entity to invoke method for
	 * (will be converted to camel casing).
	 * @returns {Function} Method to invoke.
	 */
	getMethodToInvoke: function (module, prefix, name) {
		if (!module || typeof(module) !== 'object') {
			return defaultPromiseMethod;
		}
		var methodName = helper.getCamelCaseName(prefix, name);
		if (typeof(module[methodName]) === 'function') {
			return module[methodName].bind(module);
		}
		if (typeof(module[prefix]) === 'function') {
			return module[prefix].bind(module, name);
		}

		return defaultPromiseMethod;
	},

	/**
	 * Gets name in camel casing for everything.
	 * @param {string} prefix Prefix for the name.
	 * @param {string} name Name to convert.
	 */
	getCamelCaseName: function (prefix, name) {
		if (!name) {
			return '';
		}
		var parts = name.split(/[^a-z0-9]/i),
			camelCaseName = String(prefix || '');

		parts.forEach(function (part) {
			if (!part) {
				return;
			}

			// first character in method name must be in lowercase
			camelCaseName += camelCaseName ?
				part[0].toUpperCase() :
				part[0].toLowerCase();
			camelCaseName += part.substring(1);
		});

		return camelCaseName;
	},

	/**
	 * Gets safe promise resolved from action.
	 * @param {Function} action Action to wrap with safe promise.
	 * @returns {Promise}
	 */
	getSafePromise: function (action) {
		var promise;
		try {
			promise = Promise.resolve(action());
		} catch (e) {
			promise = Promise.reject(e);
		}

		return promise;
	}
};

module.exports = helper;

/**
 * Just returns resolved promise.
 * @returns {Promise} Promise for nothing.
 */
function defaultPromiseMethod() {
	return Promise.resolve();
}
},{}],38:[function(require,module,exports){
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

'use strict';

module.exports = {
	/**
	 * Defines read-only property.
	 * @param {Object} object Object to define property in.
	 * @param {string} name Name of the property.
	 * @param {*} value Property value.
	 */
	defineReadOnly: function (object, name, value) {
		Object.defineProperty(object, name, {
			enumerable: false,
			configurable: false,
			writable: false,
			value: value
		});
	}
};
},{}],39:[function(require,module,exports){
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

'use strict';
var util = require('util'),
	URI = require('catberry-uri').URI;

var URI_PATH_REPLACEMENT_REG_EXP_SOURCE = '([^\\/\\\\]*)',
	URI_QUERY_REPLACEMENT_REG_EXP_SOURCE = '([^&?=]*)';

var PATH_END_SLASH_REG_EXP = /(.+)\/($|\?|#)/,
	EXPRESSION_ESCAPE_REG_EXP = /[\-\[\]\{\}\(\)\*\+\?\.\\\^\$\|]/g,
	IDENTIFIER_REG_EXP_SOURCE = '[$A-Z_][\\dA-Z_$]*',
	STORE_LIST_REG_EXP_SOURCE = '(?:(?:\\\\[[ ]*' +
		'[^\\[\\],]+' +
		'([ ]*,[ ]*' +
		'[^\\[\\],]+' +
		')*[ ]*\\\\])|(?:\\\\[[ ]*\\\\]))?',
	PARAMETER_REG_EXP = new RegExp(
			':' +
			IDENTIFIER_REG_EXP_SOURCE +
			STORE_LIST_REG_EXP_SOURCE, 'gi'),
	SLASHED_BRACKETS_REG_EXP = /\\\[|\\\]/,
	STORE_LIST_SEPARATOR = ',';

module.exports = {
	/**
	 * Removes slash from the end of URI path.
	 * @param {string} uriPath URI path to process.
	 * @returns {string}
	 */
	removeEndSlash: function (uriPath) {
		if (!uriPath || typeof(uriPath) !== 'string') {
			return '';
		}
		if (uriPath === '/') {
			return uriPath;
		}
		return uriPath.replace(PATH_END_SLASH_REG_EXP, '$1$2');
	},
	/**
	 * Gets URI mapper from the route expression like
	 * /some/:id[store1, store2, store3]/details?filter=:filter[store3]
	 * @param {URI} routeUri Expression that defines route.
	 * @returns {{expression: RegExp, map: Function}}
	 * URI mapper object.
	 */
	compileRoute: function (routeUri) {
		if (!routeUri) {
			return null;
		}

		// escape regular expression characters
		var escaped = routeUri.path.replace(
			EXPRESSION_ESCAPE_REG_EXP, '\\$&'
		);

		// get all occurrences of routing parameters in URI path
		var regExpSource = '^' + escaped.replace(
					PARAMETER_REG_EXP,
					URI_PATH_REPLACEMENT_REG_EXP_SOURCE) + '$',
			expression = new RegExp(regExpSource, 'i'),
			queryMapper,
			pathMapper,
			pathParameterMatches = escaped.match(
				PARAMETER_REG_EXP
			),
			pathParameters = pathParameterMatches ?
				pathParameterMatches.map(getParameterDescriptor) : null;

		if (pathParameters) {
			pathMapper = createUriPathMapper(expression, pathParameters);
		}

		if (routeUri.query) {
			var queryParameters = {};
			Object.keys(routeUri.query.values)
				.forEach(function (name) {
					// arrays in routing definitions are not supported
					if (util.isArray(routeUri.query.values[name])) {
						return;
					}

					// escape regular expression characters
					var escaped = routeUri.query.values[name].replace(
						EXPRESSION_ESCAPE_REG_EXP, '\\$&'
					);

					// get all occurrences of routing parameters in URI path
					var regExpSource = '^' + escaped.replace(
							PARAMETER_REG_EXP,
							URI_QUERY_REPLACEMENT_REG_EXP_SOURCE) + '$';
					var queryParameterMatches = escaped.match(
							PARAMETER_REG_EXP
						);
					if (!queryParameterMatches ||
						queryParameterMatches.length === 0) {
						return;
					}

					var parameter = getParameterDescriptor(
						queryParameterMatches[queryParameterMatches.length - 1]
					);
					var expression = new RegExp(regExpSource, 'i');
					parameter.map = createUriQueryValueMapper(expression);
					queryParameters[name] = parameter;
				});
			queryMapper = createUriQueryMapper(queryParameters);
		}

		return {
			expression: expression,
			map: function (uri) {
				var state = {};
				if (pathMapper) {
					pathMapper(uri.path, state);
				}

				if (queryMapper && uri.query) {
					queryMapper(uri.query.values, state);
				}

				return state;
			}
		};
	}
};

/**
 * Creates new URI path-to-state object mapper.
 * @param {RegExp} expression Regular expression to match URI path.
 * @param {Array} parameters List of parameter descriptors.
 * @returns {Function} URI mapper function.
 */
function createUriPathMapper(expression, parameters) {
	return function (uriPath, state) {
		var matches = uriPath.match(expression);
		if (!matches || matches.length < 2) {
			return state;
		}

		// start with second match because first match is always
		// the whole URI path
		matches = matches.splice(1);

		parameters.forEach(function (parameter, index) {
			var value = matches[index];
			try {
				value = decodeURIComponent(value);
			} catch (e) {
				// nothing to do
			}
			parameter.storeNames.forEach(function (storeName) {
				if (!state[storeName]) {
					state[storeName] = {};
				}
				state[storeName][parameter.name] = value;
			});
		});
	};
}

/**
 * Creates new URI query-to-state object mapper.
 * @param {Object} parameters List of possible query parameter descriptors by
 * query parameter names.
 * @returns {Function} URI mapper function.
 */
function createUriQueryMapper(parameters) {
	return function (queryValues, state) {
		queryValues = queryValues || {};

		Object.keys(queryValues)
			.forEach(function (queryKey) {
				var parameter = parameters[queryKey];
				if (!parameter) {
					return;
				}

				var value = util.isArray(queryValues[queryKey]) ?
						queryValues[queryKey]
							.map(parameter.map)
							.filter(function (value) {
								return value !== null;
							}) :
						parameter.map(queryValues[queryKey]);

				if (value === null) {
					return;
				}
				parameter.storeNames.forEach(function (storeName) {
					if (!state[storeName]) {
						state[storeName] = {};
					}
					state[storeName][parameter.name] = value;
				});
			});
	};
}

/**
 * Maps query parameter value using the parameters expression.
 * @param {RegExp} expression Regular expression to get parameter value.
 * @returns {Function} URI query string parameter value mapper function.
 */
function createUriQueryValueMapper(expression) {
	return function (value) {
		value = value.toString();
		var matches = value.match(expression);
		if (!matches || matches.length === 0) {
			return null;
		}

		// the value is the second item, the first is a whole string
		var mappedValue = matches[matches.length - 1];
		try {
			mappedValue = decodeURIComponent(mappedValue);
		} catch (e) {
			// nothing to do
		}

		return mappedValue;
	};
}

/**
 * Gets description of parameters from its expression.
 * @param {string} parameter Parameter expression.
 * @returns {{name: string, storeNames: Array}} Parameter descriptor.
 */
function getParameterDescriptor(parameter) {
	var parts = parameter.split(SLASHED_BRACKETS_REG_EXP);

	return {
		name: parts[0]
			.trim()
			.substring(1),
		storeNames: (parts[1] ? parts[1] : '')
			.split(STORE_LIST_SEPARATOR)
			.map(function (storeName) {
				return storeName.trim();
			})
			.filter(function (storeName) {
				return storeName.length > 0;
			})
	};
}
},{"catberry-uri":52,"util":46}],40:[function(require,module,exports){
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

'use strict';

module.exports = StateProvider;

var routeHelper = require('./../helpers/routeHelper'),
	catberryUri = require('catberry-uri'),
	URI = catberryUri.URI;

/**
 * Create new instance of the state provider.
 * @param {ServiceLocator} $serviceLocator Service locator
 * to resolve URI mappers.
 * @constructor
 */
function StateProvider($serviceLocator) {
	this._uriMappers = getUriMappers($serviceLocator);
}

/**
 * Current list of URI mappers.
 * @type {Array}
 * @private
 */
StateProvider.prototype._uriMappers = null;

/**
 * Gets state by specified location URI.
 * @param {URI} location URI location.
 * @returns {Object} State object.
 */
StateProvider.prototype.getStateByUri = function (location) {
	if (this._uriMappers.length === 0) {
		return null;
	}

	location = location.clone();

	location.path = routeHelper.removeEndSlash(location.path);
	var state = getState(this._uriMappers, location);

	if (!state) {
		return null;
	}

	// make state object immutable
	Object.keys(state)
		.forEach(function (storeName) {
			Object.freeze(state[storeName]);
		});
	Object.freeze(state);

	return state;
};

/**
 * Gets list of URI mappers.
 * @param {ServiceLocator} serviceLocator Service locator to get route
 * definitions.
 * @returns {Array} List of URI mappers.
 */
function getUriMappers(serviceLocator) {
	var uriMappers = [];

	serviceLocator.resolveAll('routeDefinition')
		.forEach(function (route) {
			// just colon-parametrized string
			if (typeof(route) === 'string') {
				var routeUri = new URI(route);
				routeUri.path = routeHelper.removeEndSlash(routeUri.path);
				uriMappers.push(routeHelper.compileRoute(routeUri));
				return;
			}

			// extended colon-parametrized mapper
			if (typeof(route) === 'object' &&
				(typeof(route.expression) === 'string') &&
				(route.map instanceof Function)) {
				var mapperUri = new URI(route.expression);
				mapperUri.path = routeHelper.removeEndSlash(mapperUri.path);
				var mapper = routeHelper.compileRoute(mapperUri);
				uriMappers.push({
					expression: mapper.expression,
					map: function (uri) {
						var state = mapper.map(uri);
						return route.map(state);
					}
				});
				return;
			}

			// regular expression mapper
			if (typeof(route) === 'object' &&
				(route.expression instanceof RegExp) &&
				(route.map instanceof Function)) {
				uriMappers.push(route);
			}
		});
	return uriMappers;
}

/**
 * Gets state.
 * @param {Array} uriMappers.
 * @param {URI} location.
 * @returns {Object|null}
 */
function getState (uriMappers, location) {
	var state = null;

	uriMappers.some(function (mapper) {
		if (mapper.expression.test(location.path)) {
			state = mapper.map(location) || {};
			return true;
		}
		return false;
	});

	return state;
}
},{"./../helpers/routeHelper":39,"catberry-uri":52}],41:[function(require,module,exports){
/*global define:false require:false */
module.exports = (function(){
	// Import Events
	var events = require('events')

	// Export Domain
	var domain = {}
	domain.createDomain = domain.create = function(){
		var d = new events.EventEmitter()

		function emitError(e) {
			d.emit('error', e)
		}

		d.add = function(emitter){
			emitter.on('error', emitError)
		}
		d.remove = function(emitter){
			emitter.removeListener('error', emitError)
		}
		d.bind = function(fn){
			return function(){
				var args = Array.prototype.slice.call(arguments)
				try {
					fn.apply(null, args)
				}
				catch (err){
					emitError(err)
				}
			}
		}
		d.intercept = function(fn){
			return function(err){
				if ( err ) {
					emitError(err)
				}
				else {
					var args = Array.prototype.slice.call(arguments, 1)
					try {
						fn.apply(null, args)
					}
					catch (err){
						emitError(err)
					}
				}
			}
		}
		d.run = function(fn){
			try {
				fn()
			}
			catch (err) {
				emitError(err)
			}
			return this
		};
		d.dispose = function(){
			this.removeAllListeners()
			return this
		};
		d.enter = d.exit = function(){
			return this
		}
		return d
	};
	return domain
}).call(this)
},{"events":42}],42:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      }
      throw TypeError('Uncaught, unspecified "error" event.');
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        len = arguments.length;
        args = new Array(len - 1);
        for (i = 1; i < len; i++)
          args[i - 1] = arguments[i];
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    len = arguments.length;
    args = new Array(len - 1);
    for (i = 1; i < len; i++)
      args[i - 1] = arguments[i];

    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    var m;
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  var ret;
  if (!emitter._events || !emitter._events[type])
    ret = 0;
  else if (isFunction(emitter._events[type]))
    ret = 1;
  else
    ret = emitter._events[type].length;
  return ret;
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],43:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],44:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            currentQueue[queueIndex].run();
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (!draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],45:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],46:[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./support/isBuffer":45,"_process":44,"inherits":43}],47:[function(require,module,exports){
/*
 * catberry-locator
 *
 * Copyright (c) 2014 Denis Rechkunov and project contributors.
 *
 * catberry-locator's license follows:
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
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * This license applies to all parts of catberry-locator that are not externally
 * maintained libraries.
 */

'use strict';

module.exports = ConstructorTokenizer;

var STATES = {
	ILLEGAL: -1,
	NO: 0,
	IDENTIFIER: 1,
	FUNCTION: 2,
	PARENTHESES_OPEN: 3,
	PARENTHESES_CLOSE: 4,
	COMMA: 5,
	END: 6
};
ConstructorTokenizer.STATES = STATES;

var KEYWORDS = {
	FUNCTION: 'function'
};

var WHITESPACE_TEST = /^\s$/,
	IDENTIFIER_TEST = /^[\$\w]$/;

function ConstructorTokenizer(constructorSource) {
	this._source = String(constructorSource || '');
}

/**
 * Current source code of constructor.
 * @type {string}
 * @private
 */
ConstructorTokenizer.prototype._source = '';

/**
 * Current index in source code.
 * @type {number}
 * @private
 */
ConstructorTokenizer.prototype._currentIndex = 0;

/**
 * Current index in source code.
 * @type {number}
 * @private
 */
ConstructorTokenizer.prototype._currentEnd = 0;

/**
 * Current state.
 * @type {number}
 * @private
 */
ConstructorTokenizer.prototype._currentState = STATES.NO;

/**
 * Gets next token in source.
 * @returns {{state: (number), start: number, end: number}}
 */
ConstructorTokenizer.prototype.next = function () {
	if (this._currentState === STATES.ILLEGAL ||
		this._currentState === STATES.END) {
		return {
			state: this._currentState,
			start: this._currentIndex,
			end: this._currentIndex + 1
		};
	}

	var start = this._currentIndex,
		state = this._currentState;

	switch (this._currentState) {
		case STATES.PARENTHESES_OPEN:
			this.parenthesesOpenState();
			break;
		case STATES.PARENTHESES_CLOSE:
			this.parenthesesCloseState();
			break;
		case STATES.IDENTIFIER:
			this.identifierState();
			break;
		case STATES.COMMA:
			this.commaState();
			break;
		case STATES.FUNCTION:
			this.functionState();
			break;
		default:
			this.skipWhitespace();
			var expected = this._source.substr(
				this._currentIndex, KEYWORDS.FUNCTION.length
			);
			if (expected === KEYWORDS.FUNCTION) {
				this._currentState = STATES.FUNCTION;
				return this.next();
			}

			state = STATES.ILLEGAL;
	}

	return {
		state: state,
		start: start,
		end: this._currentEnd
	};
};

/**
 * Skips all whitespace characters.
 */
ConstructorTokenizer.prototype.skipWhitespace = function () {
	while (
		this._currentIndex < this._source.length &&
		WHITESPACE_TEST.test(this._source[this._currentIndex])) {
		this._currentIndex++;
	}
};

/**
 * Describes PARENTHESES_OPEN state of machine.
 */
ConstructorTokenizer.prototype.parenthesesOpenState = function () {
	this._currentIndex++;
	this._currentEnd = this._currentIndex;

	this.skipWhitespace();
	if (IDENTIFIER_TEST.test(this._source[this._currentIndex])) {
		this._currentState = STATES.IDENTIFIER;
	} else if (this._source[this._currentIndex] === ')') {
		this._currentState = STATES.PARENTHESES_CLOSE;
	} else {
		this._currentState = STATES.ILLEGAL;
	}
};

/**
 * Describes PARENTHESES_CLOSE state of machine.
 */
ConstructorTokenizer.prototype.parenthesesCloseState = function () {
	this._currentIndex++;
	this._currentEnd = this._currentIndex;
	this._currentState = STATES.END;
};

/**
 * Describes FUNCTION state of machine.
 */
ConstructorTokenizer.prototype.functionState = function () {
	this._currentIndex += KEYWORDS.FUNCTION.length;
	this._currentEnd = this._currentIndex;

	this.skipWhitespace();

	if (this._source[this._currentIndex] === '(') {
		this._currentState = STATES.PARENTHESES_OPEN;
	} else if (IDENTIFIER_TEST.test(this._source[this._currentIndex])) {
		this._currentState = STATES.IDENTIFIER;
	} else {
		this._currentState = STATES.ILLEGAL;
	}
};

/**
 * Describes IDENTIFIER state of machine.
 */
ConstructorTokenizer.prototype.identifierState = function () {
	while (
		this._currentIndex < this._source.length &&
		IDENTIFIER_TEST.test(this._source[this._currentIndex])) {
		this._currentIndex++;
	}

	this._currentEnd = this._currentIndex;

	this.skipWhitespace();
	if (this._source[this._currentIndex] === '(') {
		this._currentState = STATES.PARENTHESES_OPEN;
	} else if (this._source[this._currentIndex] === ')') {
		this._currentState = STATES.PARENTHESES_CLOSE;
	} else if (this._source[this._currentIndex] === ',') {
		this._currentState = STATES.COMMA;
	} else {
		this._currentState = STATES.ILLEGAL;
	}
};

/**
 * Describes COMMA state of machine.
 */
ConstructorTokenizer.prototype.commaState = function () {
	this._currentIndex++;
	this._currentEnd = this._currentIndex;

	this.skipWhitespace();
	if (IDENTIFIER_TEST.test(this._source[this._currentIndex])) {
		this._currentState = STATES.IDENTIFIER;
		return;
	}
	this._currentState = STATES.ILLEGAL;
};
},{}],48:[function(require,module,exports){
/*
 * catberry-locator
 *
 * Copyright (c) 2014 Denis Rechkunov and project contributors.
 *
 * catberry-locator's license follows:
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
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * This license applies to all parts of catberry-locator that are not externally
 * maintained libraries.
 */

'use strict';

module.exports = ServiceLocator;

var util = require('util'),
	ConstructorTokenizer = require('./ConstructorTokenizer');

var DEPENDENCY_REGEXP = /^\$\w+/,
	ERROR_CONSTRUCTOR_SHOULD_BE_FUNCTION = 'Constructor should be a function',
	ERROR_TYPE_NOT_REGISTERED = 'Type "%s" not registered',
	ERROR_TYPE_SHOULD_BE_STRING = 'Type name "%s" should be a string';

/**
 * Creates new instance of service locator.
 * @constructor
 */
function ServiceLocator() {
	this._registrations = {};
}

/**
 * Current type registrations.
 * @type {Object}
 * @protected
 */
ServiceLocator.prototype._registrations = null;

/**
 * Registers new type in service locator.
 * @param {string} type Type name, which will be alias in other constructors.
 * @param {Function} constructor Constructor which
 * initializes instance of specified type.
 * @param {Object?} parameters Set of named parameters
 * which will be also injected.
 * @param {boolean?} isSingleton If true every resolve will return
 * the same instance.
 */
ServiceLocator.prototype.register =
	function (type, constructor, parameters, isSingleton) {
		throwIfNotFunction(constructor);
		throwIfNotString(type);

		initializeRegistration(type, this);
		var parameterNames = getParameterNames(constructor);

		this._registrations[type].unshift({
			constructor: constructor,
			parameters: parameters || {},
			parameterNames: parameterNames,
			isSingleton: Boolean(isSingleton),
			singleInstance: null
		});
	};

/**
 * Registers single instance for specified type.
 * @param {string} type Type name.
 * @param {Object} instance Instance to register.
 */
ServiceLocator.prototype.registerInstance = function (type, instance) {
	throwIfNotString(type);
	initializeRegistration(type, this);

	this._registrations[type].unshift({
		constructor: instance.constructor,
		parameters: {},
		parameterNames: [],
		isSingleton: true,
		singleInstance: instance
	});
};

/**
 * Resolves last registered implementation by type name
 * including all its dependencies recursively.
 * @param {string} type Type name.
 * @returns {Object} Instance of specified type.
 */
ServiceLocator.prototype.resolve = function (type) {
	throwIfNotString(type);
	throwIfNoType(this._registrations, type);
	var firstRegistration = this._registrations[type][0];
	return createInstance(firstRegistration, this);
};

/**
 * Resolves all registered implementations by type name
 * including all dependencies recursively.
 * @param {string} type Type name.
 * @returns {Array} Array of instances specified type.
 */
ServiceLocator.prototype.resolveAll = function (type) {
	throwIfNotString(type);
	try {
		throwIfNoType(this._registrations, type);
	} catch (e) {
		return [];
	}
	return this._registrations[type].map(function (registration) {
		return createInstance(registration, this);
	}, this);
};

/**
 * Resolves instance of specified constructor including dependencies.
 * @param {Function} constructor Constructor for instance creation.
 * @param {Object?} parameters Set of its parameters values.
 * @returns {Object} Instance of specified constructor.
 */
ServiceLocator.prototype.resolveInstance = function (constructor, parameters) {
	return createInstance({
		constructor: constructor,
		parameters: parameters || {},
		parameterNames: getParameterNames(constructor),
		isSingleton: false,
		singleInstance: null
	}, this);
};

/**
 * Unregisters all registrations of specified type.
 * @param {string} type Type name.
 */
ServiceLocator.prototype.unregister = function (type) {
	throwIfNotString(type);
	delete this._registrations[type];
};

/**
 * Initializes registration array for specified type.
 * @param {string} type Type name.
 * @param {ServiceLocator} context Context of execution.
 */
function initializeRegistration(type, context) {
	if (!context._registrations.hasOwnProperty(type)) {
		context._registrations[type] = [];
	}
}

/**
 * Throws error if specified registration is not found.
 * @param {Object} registrations Current registrations set.
 * @param {string} type Type to check.
 */
function throwIfNoType(registrations, type) {
	if (!registrations.hasOwnProperty(type) ||
		registrations[type].length === 0) {
		throw new Error(util.format(ERROR_TYPE_NOT_REGISTERED, type));
	}
}

/**
 * Throws error if specified constructor is not a function.
 * @param {Function} constructor Constructor to check.
 */
function throwIfNotFunction(constructor) {
	if (constructor instanceof Function) {
		return;
	}

	throw new Error(ERROR_CONSTRUCTOR_SHOULD_BE_FUNCTION);
}

/**
 * Throws error if specified type name is not a string.
 * @param {String} type Type name to check.
 */
function throwIfNotString(type) {
	if (typeof(type) === 'string') {
		return;
	}

	throw new Error(util.format(ERROR_TYPE_SHOULD_BE_STRING, type));
}

/**
 * Creates instance of type specified and parameters in registration.
 * @param {Object} registration Specified registration of type.
 * @param {ServiceLocator} context Context of execution.
 * @returns {Object} Instance of type specified in registration.
 */
function createInstance(registration, context) {
	if (registration.isSingleton && registration.singleInstance !== null) {
		return registration.singleInstance;
	}

	var instanceParameters = getParameters(registration, context),
		instance = Object.create(registration.constructor.prototype);
	registration.constructor.apply(instance, instanceParameters);

	if (registration.isSingleton) {
		registration.singleInstance = instance;
	}

	return instance;
}

/**
 * Gets constructor parameters specified in type constructor.
 * @param {Object} registration Type registration.
 * @param {ServiceLocator} context Context of execution.
 * @returns {Array} Array of resolved dependencies to inject.
 */
function getParameters(registration, context) {
	return registration.parameterNames.map(function (parameterName) {
		var dependencyName = getDependencyName(parameterName);
		return dependencyName === null ?
			registration.parameters[parameterName] :
			this.resolve(dependencyName);
	}, context);
}

/**
 * Gets name of dependency type.
 * @param {string} parameterName Name of constructor parameter.
 * @returns {string|null} Name of dependency type.
 */
function getDependencyName(parameterName) {
	if (!DEPENDENCY_REGEXP.test(parameterName)) {
		return null;
	}

	return parameterName.substr(1, parameterName.length - 1);
}

/**
 * Gets all parameter names used in constructor function.
 * @param {Function} constructor Constructor function.
 * @returns {Array<string>} Array of parameter names.
 */
function getParameterNames(constructor) {
	var source = constructor.toString(),
		tokenizer = new ConstructorTokenizer(source),
		result = [],
		token = {
			state: ConstructorTokenizer.STATES.NO,
			start: 0,
			end: 0
		},
		areParametersStarted = false;

	while (
		token.state !== ConstructorTokenizer.STATES.END &&
		token.state !== ConstructorTokenizer.STATES.ILLEGAL) {
		token = tokenizer.next();
		if (token.state === ConstructorTokenizer.STATES.PARENTHESES_OPEN) {
			areParametersStarted = true;
		}

		if (areParametersStarted &&
			token.state === ConstructorTokenizer.STATES.IDENTIFIER) {
			result.push(source.substring(token.start, token.end));
		}
	}
	return result;

}
},{"./ConstructorTokenizer":47,"util":46}],49:[function(require,module,exports){
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
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * This license applies to all parts of catberry that are not externally
 * maintained libraries.
 */

'use strict';

module.exports = UHR;

var UHRBase = require('../lib/UHRBase'),
	Promise = require('promise'),
	URI = require('catberry-uri').URI,
	util = require('util');

// if browser still does not have promises then add it.
if (!('Promise' in window)) {
	window.Promise = Promise;
}

util.inherits(UHR, UHRBase);

var NON_SAFE_HEADERS = {
	cookie: true,
	'accept-charset': true
};

var ERROR_CONNECTION = 'Connection error',
	ERROR_TIMEOUT = 'Request timeout',
	ERROR_ABORTED = 'Request aborted';

/**
 * Creates new instance of client-side HTTP(S) request implementation.
 * @param {Window} $window Current window object.
 * @constructor
 */
function UHR($window) {
	UHRBase.call(this);
	this.window = $window;
}

/**
 * Current instance of window.
 * @type {Window}
 */
UHR.prototype.window = null;

/**
 * Does request with specified parameters using protocol implementation.
 * @param {Object} parameters Request parameters.
 * @param {String} parameters.method HTTP method.
 * @param {String} parameters.url URL for request.
 * @param {URI} parameters.uri URI object.
 * @param {Object} parameters.headers HTTP headers to send.
 * @param {String|Object} parameters.data Data to send.
 * @param {Number} parameters.timeout Request timeout.
 * @param {Boolean} parameters.unsafeHTTPS If true then requests to servers with
 * invalid HTTPS certificates are allowed.
 * @returns {Promise<Object>} Promise for result with status object and content.
 * @protected
 */
UHR.prototype._doRequest = function (parameters) {
	var self = this;

	Object.keys(parameters.headers)
		.forEach(function (name) {
			if (NON_SAFE_HEADERS.hasOwnProperty(name.toLowerCase())) {
				delete parameters.headers[name];
			}
		});

	return new Promise(function (fulfill, reject) {
		var requestError = null,
			xhr = new self.window.XMLHttpRequest();

		xhr.onabort = function () {
			requestError = new Error(ERROR_ABORTED);
			reject(requestError);
		};
		xhr.ontimeout = function () {
			requestError = new Error(ERROR_TIMEOUT);
			reject(requestError);
		};
		xhr.onerror = function () {
			requestError = new Error(xhr.statusText || ERROR_CONNECTION);
			reject(requestError);
		};
		xhr.onloadend = function () {
			if (requestError) {
				return;
			}
			var statusObject = getStatusObject(xhr),
				content = self.convertResponse(
					statusObject.headers,
					xhr.responseText
				);
			fulfill({status: statusObject, content: content});
		};

		var user = parameters.uri.authority.userInfo ?
				parameters.uri.authority.userInfo.user : null,
			password = parameters.uri.authority.userInfo ?
				parameters.uri.authority.userInfo.password : null;
		xhr.open(
			parameters.method, parameters.uri.toString(), true,
			user || undefined, password || undefined
		);
		xhr.timeout = parameters.timeout;

		Object.keys(parameters.headers)
			.forEach(function (headerName) {
				xhr.setRequestHeader(
					headerName, parameters.headers[headerName]
				);
			});

		xhr.send(parameters.data);
	});
};

/**
 * Gets state object for specified jQuery XHR object.
 * @param {Object?} xhr XHR object.
 * @returns {{code: number, text: string, headers: Object}} Status object.
 */
function getStatusObject(xhr) {
	var headers = {};

	if (!xhr) {
		return {
			code: 0,
			text: '',
			headers: headers
		};
	}

	xhr
		.getAllResponseHeaders()
		.split('\n')
		.forEach(function (header) {
			var delimiterIndex = header.indexOf(':');
			if (delimiterIndex <= 0) {
				return;
			}
			var headerName = header
				.substring(0, delimiterIndex)
				.trim()
				.toLowerCase();
			headers[headerName] = header
				.substring(delimiterIndex + 1)
				.trim();
		});

	return {
		code: xhr.status,
		text: xhr.statusText,
		headers: headers
	};
}
},{"../lib/UHRBase":51,"catberry-uri":52,"promise":58,"util":46}],50:[function(require,module,exports){
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
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * This license applies to all parts of catberry that are not externally
 * maintained libraries.
 */

'use strict';

var UHR = require('./lib/UHR');

module.exports = {
	/**
	 * Registers UHR in server-side service locator.
	 * @param {ServiceLocator} locator Catberry's service locator.
	 */
	register: function (locator) {
		var config = locator.resolve('config');
		locator.register('uhr', UHR, config, true);
	},
	UHR: UHR
};
},{"./lib/UHR":49}],51:[function(require,module,exports){
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
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * This license applies to all parts of catberry that are not externally
 * maintained libraries.
 */

'use strict';

module.exports = UHRBase;

var catberryUri = require('catberry-uri'),
	Query = catberryUri.Query,
	URI = catberryUri.URI;

var ERROR_UNSUPPORTED_PROTOCOL = 'Protocol is unsupported',
	ERROR_PARAMETERS_SHOULD_BE_OBJECT = 'Request parameters should be object',
	ERROR_URL_IS_REQUIRED = 'URL is required parameter',
	ERROR_METHOD_IS_REQUIRED = 'Request method is required parameter',
	ERROR_HOST_IS_REQUIRED = 'Host in URL is required',
	ERROR_SCHEME_IS_REQUIRED = 'Scheme in URL is required',
	ERROR_TIMEOUT_SHOULD_BE_NUMBER = 'Timeout should be a number',
	DEFAULT_TIMEOUT = 30000,
	HTTP_PROTOCOL_REGEXP = /^(http)s?$/i;

var METHODS = {
	GET: 'GET',
	HEAD: 'HEAD',
	POST: 'POST',
	PUT: 'PUT',
	PATCH: 'PATCH',
	DELETE: 'DELETE',
	OPTIONS: 'OPTIONS',
	TRACE: 'TRACE',
	CONNECT: 'CONNECT'
};

UHRBase.TYPES = {
	URL_ENCODED: 'application/x-www-form-urlencoded',
	JSON: 'application/json',
	PLAIN_TEXT: 'text/plain',
	HTML: 'text/html'
};

UHRBase.CHARSET = 'UTF-8';

UHRBase.DEFAULT_GENERAL_HEADERS = {
	Accept: UHRBase.TYPES.JSON + '; q=0.7, ' +
		UHRBase.TYPES.HTML + '; q=0.2, ' +
		UHRBase.TYPES.PLAIN_TEXT + '; q=0.1',
	'Accept-Charset': UHRBase.CHARSET + '; q=1'
};

UHRBase.CHARSET_PARAMETER = '; charset=' + UHRBase.CHARSET;
UHRBase.URL_ENCODED_ENTITY_CONTENT_TYPE = UHRBase.TYPES.URL_ENCODED +
	UHRBase.CHARSET_PARAMETER;

UHRBase.JSON_ENTITY_CONTENT_TYPE = UHRBase.TYPES.JSON +
	UHRBase.CHARSET_PARAMETER;

UHRBase.PLAIN_TEXT_ENTITY_CONTENT_TYPE = UHRBase.TYPES.PLAIN_TEXT +
	UHRBase.CHARSET_PARAMETER;

// This module were developed using HTTP/1.1v2 RFC 2616
// (http://www.w3.org/Protocols/rfc2616/)
/**
 * Creates new instance of Basic Universal HTTP(S) Request implementation.
 * @constructor
 */
function UHRBase() {

}

/**
 * Does GET request to HTTP server.
 * @param {string} url URL to request.
 * @param {Object?} options Request parameters.
 * @param {Object?} options.headers HTTP headers to send.
 * @param {String|Object?} options.data Data to send.
 * @param {Number?} options.timeout Request timeout.
 * @param {Boolean?} options.unsafeHTTPS If true then requests to servers with
 * invalid HTTPS certificates are allowed.
 * @returns {Promise<Object>} Promise for result with status object and content.
 */
UHRBase.prototype.get = function (url, options) {
	options = options || {};
	var parameters = Object.create(options);
	parameters.method = METHODS.GET;
	parameters.url = url;
	return this.request(parameters);
};

/**
 * Does POST request to HTTP server.
 * @param {string} url URL to request.
 * @param {Object?} options Request parameters.
 * @param {Object?} options.headers HTTP headers to send.
 * @param {String|Object?} options.data Data to send.
 * @param {Number?} options.timeout Request timeout.
 * @param {Boolean?} options.unsafeHTTPS If true then requests to servers with
 * invalid HTTPS certificates are allowed.
 * @returns {Promise<Object>} Promise for result with status object and content.
 */
UHRBase.prototype.post = function (url, options) {
	options = options || {};
	var parameters = Object.create(options);
	parameters.method = METHODS.POST;
	parameters.url = url;
	return this.request(parameters);
};

/**
 * Does PUT request to HTTP server.
 * @param {string} url URL to request.
 * @param {Object?} options Request parameters.
 * @param {Object?} options.headers HTTP headers to send.
 * @param {String|Object?} options.data Data to send.
 * @param {Number?} options.timeout Request timeout.
 * @param {Boolean?} options.unsafeHTTPS If true then requests to servers with
 * invalid HTTPS certificates are allowed.
 * @returns {Promise<Object>} Promise for result with status object and content.
 */
UHRBase.prototype.put = function (url, options) {
	options = options || {};
	var parameters = Object.create(options);
	parameters.method = METHODS.PUT;
	parameters.url = url;
	return this.request(parameters);
};

/**
 * Does PATCH request to HTTP server.
 * @param {string} url URL to request.
 * @param {Object?} options Request parameters.
 * @param {Object?} options.headers HTTP headers to send.
 * @param {String|Object?} options.data Data to send.
 * @param {Number?} options.timeout Request timeout.
 * @param {Boolean?} options.unsafeHTTPS If true then requests to servers with
 * invalid HTTPS certificates are allowed.
 * @returns {Promise<Object>} Promise for result with status object and content.
 */
UHRBase.prototype.patch = function (url, options) {
	options = options || {};
	var parameters = Object.create(options);
	parameters.method = METHODS.PATCH;
	parameters.url = url;
	return this.request(parameters);
};

/**
 * Does DELETE request to HTTP server.
 * @param {string} url URL to request.
 * @param {Object?} options Request parameters.
 * @param {Object?} options.headers HTTP headers to send.
 * @param {String|Object?} options.data Data to send.
 * @param {Number?} options.timeout Request timeout.
 * @param {Boolean?} options.unsafeHTTPS If true then requests to servers with
 * invalid HTTPS certificates are allowed.
 * @returns {Promise<Object>} Promise for result with status object and content.
 */
UHRBase.prototype.delete = function (url, options) {
	var parameters = Object.create(options);
	parameters.method = METHODS.DELETE;
	parameters.url = url;
	return this.request(parameters);
};

/**
 * Does request with specified parameters.
 * @param {Object} parameters Request parameters.
 * @param {String} parameters.method HTTP method.
 * @param {String} parameters.url URL for request.
 * @param {Object?} parameters.headers HTTP headers to send.
 * @param {String|Object?} parameters.data Data to send.
 * @param {Number?} parameters.timeout Request timeout.
 * @param {Boolean?} parameters.unsafeHTTPS If true then requests
 * to servers with invalid HTTPS certificates are allowed.
 * @returns {Promise<Object>} Promise for result with status object and content.
 */
UHRBase.prototype.request = function (parameters) {
	var self = this;
	return this._validateRequest(parameters)
		.then(function (validated) {
			return self._doRequest(validated);
		});
};

/**
 * Validates UHR parameters.
 * @param {Object} parameters Request parameters.
 * @param {String} parameters.method HTTP method.
 * @param {String} parameters.url URL for request.
 * @param {Object?} parameters.headers HTTP headers to send.
 * @param {String|Object?} parameters.data Data to send.
 * @param {Number?} parameters.timeout Request timeout.
 * @param {Boolean?} parameters.unsafeHTTPS If true then requests
 * to servers with invalid HTTPS certificates are allowed.
 * @returns {Promise} Promise for nothing.
 * @private
 */
/*jshint maxcomplexity:false */
UHRBase.prototype._validateRequest = function (parameters) {
	if (!parameters || typeof(parameters) !== 'object') {
		return Promise.reject(new Error(ERROR_PARAMETERS_SHOULD_BE_OBJECT));
	}

	var validated = Object.create(parameters);

	if (typeof(parameters.url) !== 'string') {
		return Promise.reject(new Error(ERROR_URL_IS_REQUIRED));
	}
	validated.uri = new URI(validated.url);
	if (!validated.uri.scheme) {
		return Promise.reject(new Error(ERROR_SCHEME_IS_REQUIRED));
	}
	if (!HTTP_PROTOCOL_REGEXP.test(validated.uri.scheme)) {
		return Promise.reject(new Error(ERROR_UNSUPPORTED_PROTOCOL));
	}
	if (!validated.uri.authority || !validated.uri.authority.host) {
		return Promise.reject(new Error(ERROR_HOST_IS_REQUIRED));
	}
	if (typeof(validated.method) !== 'string' ||
		!(validated.method in METHODS)) {
		return Promise.reject(new Error(ERROR_METHOD_IS_REQUIRED));
	}

	validated.timeout = validated.timeout || DEFAULT_TIMEOUT;
	if (typeof(validated.timeout) !== 'number') {
		return Promise.reject(new Error(ERROR_TIMEOUT_SHOULD_BE_NUMBER));
	}

	validated.headers = this._createHeaders(validated.headers);

	if (!this._isUpstreamRequest(parameters.method) &&
		validated.data && typeof(validated.data) === 'object') {

		var dataKeys = Object.keys(validated.data);

		if (dataKeys.length > 0 && !validated.uri.query) {
			validated.uri.query = new Query('');
		}

		dataKeys.forEach(function (key) {
			validated.uri.query.values[key] = validated.data[key];
		});
		validated.data = null;
	} else {
		var dataAndHeaders = this._getDataToSend(
			validated.headers, validated.data
		);
		validated.headers = dataAndHeaders.headers;
		validated.data = dataAndHeaders.data;
	}

	return Promise.resolve(validated);
};

/**
 * Gets data for sending via HTTP request using Content Type HTTP header.
 * @param {Object} headers HTTP headers.
 * @param {Object|string} data Data to send.
 * @returns {{headers: Object, data: Object|String}} Data and headers to send.
 * @private
 */
UHRBase.prototype._getDataToSend = function (headers, data) {
	var found = findContentType(headers),
		contentTypeHeader = found.name,
		contentType = found.type;

	if (!data || typeof(data) !== 'object') {
		data = data ? String(data) : '';
		if (!contentType) {
			headers[contentTypeHeader] = UHRBase.PLAIN_TEXT_ENTITY_CONTENT_TYPE;
		}
		return {
			headers: headers,
			data: data
		};
	}

	if (contentType === UHRBase.TYPES.JSON) {
		return {
			headers: headers,
			data: JSON.stringify(data)
		};
	}

	// otherwise object will be sent with
	// application/x-www-form-urlencoded
	headers[contentTypeHeader] = UHRBase.URL_ENCODED_ENTITY_CONTENT_TYPE;

	var query = new Query();
	query.values = data;
	return {
		headers: headers,
		data: query.toString()
			.replace('+', '%2B')
			.replace('%20', '+')
	};
};

/**
 * Creates HTTP headers for request using defaults and current parameters.
 * @param {Object} parameterHeaders HTTP headers of UHR.
 * @protected
 */
UHRBase.prototype._createHeaders = function (parameterHeaders) {
	if (!parameterHeaders || typeof(parameterHeaders) !== 'object') {
		parameterHeaders = {};
	}
	var headers = {};

	Object.keys(UHRBase.DEFAULT_GENERAL_HEADERS)
		.forEach(function (headerName) {
			headers[headerName] = UHRBase.DEFAULT_GENERAL_HEADERS[headerName];
		});

	Object.keys(parameterHeaders)
		.forEach(function (headerName) {
			if (parameterHeaders[headerName] === null ||
				parameterHeaders[headerName] === undefined) {
				delete headers[headerName];
				return;
			}
			headers[headerName] = parameterHeaders[headerName];
		});

	return headers;
};

/**
 * Does request with specified parameters using protocol implementation.
 * @param {Object} parameters Request parameters.
 * @param {String} parameters.method HTTP method.
 * @param {String} parameters.url URL for request.
 * @param {URI} parameters.uri URI object.
 * @param {Object} parameters.headers HTTP headers to send.
 * @param {String|Object} parameters.data Data to send.
 * @param {Number} parameters.timeout Request timeout.
 * @param {Boolean} parameters.unsafeHTTPS If true then requests to servers with
 * invalid HTTPS certificates are allowed.
 * @returns {Promise<Object>} Promise for result with status object and content.
 * @protected
 * @abstract
 */
UHRBase.prototype._doRequest = function (parameters) {
};

/**
 * Converts response data according content type.
 * @param {Object} headers HTTP headers.
 * @param {string} responseData Data from response.
 * @returns {string|Object} Converted data.
 */
UHRBase.prototype.convertResponse = function (headers, responseData) {
	if (typeof(responseData) !== 'string') {
		responseData = '';
	}
	var found = findContentType(headers),
		contentType = found.type || UHRBase.TYPES.PLAIN_TEXT;

	switch (contentType) {
		case UHRBase.TYPES.JSON:
			var json;
			try {
				json = JSON.parse(responseData);
			} catch (e) {
				// nothing to do
			}
			return json || {};
		case UHRBase.TYPES.URL_ENCODED:
			var object;
			try {
				var query = new Query(responseData.replace('+', '%20'));
				object = query.values;
			} catch (e) {
				// nothing to do
			}
			return object || {};
		default:
			return responseData;
	}
};

/**
 * Determines is current query needs to use upstream.
 * @param {String} method HTTP method.
 * @returns {Boolean} Is current HTTP method means upstream usage.
 * @protected
 */
UHRBase.prototype._isUpstreamRequest = function (method) {
	return (
		method === METHODS.POST ||
		method === METHODS.PUT ||
		method === METHODS.PATCH
		);
};

/**
 * Finds content type header in headers object.
 * @param {Object} headers HTTP headers.
 * @returns {{name: String, type: String}} Name of header and content type.
 */
function findContentType(headers) {
	var contentTypeString = '',
		contentTypeHeader = 'Content-Type';

	Object.keys(headers)
		.forEach(function (key) {
			if (key.toLowerCase() !== 'content-type') {
				return;
			}
			contentTypeHeader = key;
			contentTypeString = headers[key];
		});

	var typeAndParameters = contentTypeString.split(';'),
		contentType = typeAndParameters[0].toLowerCase();
	return {
		name: contentTypeHeader,
		type: contentType
	};
}
},{"catberry-uri":52}],52:[function(require,module,exports){
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
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * This license applies to all parts of catberry that are not externally
 * maintained libraries.
 */

'use strict';

module.exports = {
	URI: require('./lib/URI'),
	Authority: require('./lib/Authority'),
	UserInfo: require('./lib/UserInfo'),
	Query: require('./lib/Query')
};
},{"./lib/Authority":53,"./lib/Query":54,"./lib/URI":55,"./lib/UserInfo":56}],53:[function(require,module,exports){
/*
 * catberry-uri
 *
 * Copyright (c) 2014 Denis Rechkunov and project contributors.
 *
 * catberry-uri's license follows:
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
 * This license applies to all parts of catberry-uri that are not externally
 * maintained libraries.
 */

'use strict';

module.exports = Authority;

var UserInfo = require('./UserInfo'),
	percentEncodingHelper = require('./percentEncodingHelper');

var PORT_REGEXP = /^\d+$/,
	ERROR_PORT = 'URI authority port must satisfy expression ' +
		PORT_REGEXP.toString();

/**
 * Creates new instance of URI authority component parser.
 * https://tools.ietf.org/html/rfc3986#section-3.2
 * @param {String?} authorityString URI authority component string.
 * @constructor
 */
function Authority(authorityString) {
	if (typeof(authorityString) === 'string' && authorityString.length > 0) {
		var firstAtIndex = authorityString.indexOf('@');
		if (firstAtIndex !== -1) {
			var userInfoString = authorityString.substring(0, firstAtIndex);
			this.userInfo = new UserInfo(userInfoString);
			authorityString = authorityString.substring(firstAtIndex + 1);
		}

		var lastColonIndex = authorityString.lastIndexOf(':');
		if (lastColonIndex !== -1) {
			var portString = authorityString.substring(lastColonIndex + 1);
			if (lastColonIndex === authorityString.length - 1) {
				this.port = '';
				authorityString = authorityString.substring(0, lastColonIndex);
			}else if (PORT_REGEXP.test(portString)) {
				this.port = portString;
				authorityString = authorityString.substring(0, lastColonIndex);
			}
		}

		this.host = percentEncodingHelper.decode(authorityString);
	}
}

/**
 * Current user information.
 * https://tools.ietf.org/html/rfc3986#section-3.2.1
 * @type {UserInfo}
 */
Authority.prototype.userInfo = null;

/**
 * Current host.
 * https://tools.ietf.org/html/rfc3986#section-3.2.2
 * @type {String}
 */
Authority.prototype.host = null;

/**
 * Current port.
 * https://tools.ietf.org/html/rfc3986#section-3.2.3
 * @type {String}
 */
Authority.prototype.port = null;

/**
 * Clones current authority.
 * @returns {Authority} New clone of current object.
 */
Authority.prototype.clone = function () {
	var authority = new Authority();
	if (this.userInfo) {
		authority.userInfo = this.userInfo.clone();
	}
	if (typeof(this.host) === 'string') {
		authority.host = this.host;
	}
	if (typeof(this.port) === 'string') {
		authority.port = this.port;
	}
	return authority;
};

/**
 * Recombine all authority components into authority string.
 * @returns {string} Authority component string.
 */
Authority.prototype.toString = function () {
	var result = '';
	if (this.userInfo) {
		result += this.userInfo.toString() + '@';
	}
	if (this.host !== undefined && this.host !== null) {
		var host = String(this.host);
		result += percentEncodingHelper.encodeHost(host);
	}
	if (this.port !== undefined && this.port !== null) {
		var port = String(this.port);
		if (port.length > 0 && !PORT_REGEXP.test(port)) {
			throw new Error(ERROR_PORT);
		}
		result += ':' + port;
	}
	return result;
};
},{"./UserInfo":56,"./percentEncodingHelper":57}],54:[function(require,module,exports){
/*
 * catberry-uri
 *
 * Copyright (c) 2014 Denis Rechkunov and project contributors.
 *
 * catberry-uri's license follows:
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
 * This license applies to all parts of catberry-uri that are not externally
 * maintained libraries.
 */

'use strict';

module.exports = Query;

var percentEncodingHelper = require('./percentEncodingHelper');

/**
 * Creates new instance of URI query component parser.
 * https://tools.ietf.org/html/rfc3986#section-3.4
 * @param {String?} queryString URI query component string.
 * @constructor
 */
function Query(queryString) {
	if (typeof(queryString) === 'string') {
		this.values = {};

		queryString
			.split('&')
			.forEach(function (pair) {
				var parts = pair.split('='),
					key = percentEncodingHelper.decode(parts[0]);
				if (!key) {
					return;
				}
				if (key in this.values &&
					!(this.values[key] instanceof Array)) {
					this.values[key] = [this.values[key]];
				}

				var value = typeof(parts[1]) === 'string' ?
					percentEncodingHelper.decode(parts[1]) : null;

				if (this.values[key] instanceof Array) {
					this.values[key].push(value);
				}else{
					this.values[key] = value;
				}
			}, this);
	}
}

/**
 * Current set of values of query.
 * @type {Object}
 */
Query.prototype.values = null;

/**
 * Clones current query to a new object.
 * @returns {Query} New clone of current object.
 */
Query.prototype.clone = function () {
	var query = new Query();
	if (this.values) {
		query.values = {};
		Object.keys(this.values)
			.forEach(function (key) {
				query.values[key] = this.values[key];
			}, this);
	}
	return query;
};

/**
 * Converts current set of query values to string.
 * @returns {string} Query component string.
 */
Query.prototype.toString = function () {
	if (!this.values) {
		return '';
	}

	var queryString = '';
	Object.keys(this.values)
		.forEach(function (key) {
			var values = this.values[key] instanceof Array ?
				this.values[key] : [this.values[key]];

			values.forEach(function (value) {
				queryString += '&' + percentEncodingHelper
					.encodeQuerySubComponent(key);
				if (value === undefined || value === null) {
					return;
				}
				value = String(value);
				queryString += '=' +
					percentEncodingHelper.encodeQuerySubComponent(value);
			});
		}, this);

	return queryString.replace(/^&/, '');
};
},{"./percentEncodingHelper":57}],55:[function(require,module,exports){
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

'use strict';

module.exports = URI;

var Authority = require('./Authority'),
	percentEncodingHelper = require('./percentEncodingHelper'),
	Query = require('./Query');

	// https://tools.ietf.org/html/rfc3986#appendix-B
var URI_PARSE_REGEXP = new RegExp(
		'^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?'
	),
	// https://tools.ietf.org/html/rfc3986#section-3.1
	SCHEME_REGEXP = /^[a-z]+[a-z\d\+\.-]*$/i,
	ERROR_SCHEME = 'URI scheme must satisfy expression ' +
		SCHEME_REGEXP.toString(),
	ERROR_BASE_SCHEME = 'Scheme component is required to be present ' +
		'in a base URI';

/**
 * Creates new instance of URI according to RFC 3986.
 * @param {String?} uriString URI string to parse components.
 * @constructor
 */
function URI(uriString) {
	if (typeof(uriString) !== 'string') {
		uriString = '';
	}

	// https://tools.ietf.org/html/rfc3986#appendix-B
	var matches = uriString.match(URI_PARSE_REGEXP);

	if (matches) {
		if (typeof(matches[2]) === 'string') {
			this.scheme = percentEncodingHelper.decode(matches[2]);
		}
		if (typeof(matches[4]) === 'string') {
			this.authority = new Authority(matches[4]);
		}
		if (typeof(matches[5]) === 'string') {
			this.path = percentEncodingHelper.decode(matches[5]);
		}
		if (typeof(matches[7]) === 'string') {
			this.query = new Query(matches[7]);
		}
		if (typeof(matches[9]) === 'string') {
			this.fragment = percentEncodingHelper.decode(matches[9]);
		}
	}
}

/**
 * Current URI scheme.
 * https://tools.ietf.org/html/rfc3986#section-3.1
 * @type {String}
 */
URI.prototype.scheme = null;

/**
 * Current URI authority.
 * https://tools.ietf.org/html/rfc3986#section-3.2
 * @type {Authority}
 */
URI.prototype.authority = null;

/**
 * Current URI path.
 * https://tools.ietf.org/html/rfc3986#section-3.3
 * @type {String}
 */
URI.prototype.path = null;

/**
 * Current URI query.
 * https://tools.ietf.org/html/rfc3986#section-3.4
 * @type {Query}
 */
URI.prototype.query = null;

/**
 * Current URI fragment.
 * https://tools.ietf.org/html/rfc3986#section-3.5
 * @type {String}
 */
URI.prototype.fragment = null;

/**
 * Converts a URI reference that might be relative to a given base URI
 * into the reference's target URI.
 * https://tools.ietf.org/html/rfc3986#section-5.2
 * @param {URI} baseUri Base URI.
 * @returns {URI} Resolved URI.
 */
URI.prototype.resolveRelative = function (baseUri) {
	if (!baseUri.scheme) {
		throw new Error(ERROR_BASE_SCHEME);
	}

	return transformReference(baseUri, this);
};

/**
 * Clones current URI to a new object.
 * @returns {URI} New clone of current object.
 */
URI.prototype.clone = function () {
	var uri = new URI();

	if (typeof(this.scheme) === 'string') {
		uri.scheme = this.scheme;
	}

	if (this.authority) {
		uri.authority = this.authority.clone();
	}

	if (typeof(this.path) === 'string') {
		uri.path = this.path;
	}

	if (this.query) {
		uri.query = this.query.clone();
	}

	if (typeof(this.fragment) === 'string') {
		uri.fragment = this.fragment;
	}

	return uri;
};

/**
 * Recomposes URI components to URI string,
 * https://tools.ietf.org/html/rfc3986#section-5.3
 * @returns {string} URI string.
 */
URI.prototype.toString = function () {
	var result = '';

	if (this.scheme !== undefined && this.scheme !== null) {
		var scheme = String(this.scheme);
		if (!SCHEME_REGEXP.test(scheme)) {
			throw new Error(ERROR_SCHEME);
		}
		result += scheme + ':';
	}

	if (this.authority) {
		result += '//' + this.authority.toString();
	}

	var path = this.path === undefined || this.path === null ?
		'' : String(this.path);
	result += percentEncodingHelper.encodePath(path);

	if (this.query) {
		result += '?' + this.query.toString();
	}

	if (this.fragment !== undefined && this.fragment !== null) {
		var fragment = String(this.fragment);
		result += '#' + percentEncodingHelper.encodeFragment(fragment);
	}

	return result;
};

/**
 * Transforms reference for relative resolution.
 * Whole algorithm has been taken from
 * https://tools.ietf.org/html/rfc3986#section-5.2.2
 * @param {URI} baseUri Base URI for resolution.
 * @param {URI} referenceUri Reference URI to resolve.
 * @returns {URI} Components of target URI.
 */
/*jshint maxdepth:false */
/*jshint maxcomplexity:false */
function transformReference(baseUri, referenceUri) {
	var targetUri = new URI('');

	if (referenceUri.scheme) {
		targetUri.scheme = referenceUri.scheme;
		targetUri.authority = referenceUri.authority ?
			referenceUri.authority.clone() : referenceUri.authority;
		targetUri.path = removeDotSegments(referenceUri.path);
		targetUri.query = referenceUri.query ?
			referenceUri.query.clone() : referenceUri.query;
	} else {
		if (referenceUri.authority) {
			targetUri.authority = referenceUri.authority ?
				referenceUri.authority.clone() : referenceUri.authority;
			targetUri.path = removeDotSegments(referenceUri.path);
			targetUri.query = referenceUri.query ?
				referenceUri.query.clone() : referenceUri.query;
		} else {
			if (referenceUri.path === '') {
				targetUri.path = baseUri.path;
				if (referenceUri.query) {
					targetUri.query = referenceUri.query.clone();
				} else {
					targetUri.query = baseUri.query ?
						baseUri.query.clone() : baseUri.query;
				}
			} else {
				if (referenceUri.path[0] === '/') {
					targetUri.path =
						removeDotSegments(referenceUri.path);
				} else {
					targetUri.path =
						merge(baseUri, referenceUri);
					targetUri.path =
						removeDotSegments(targetUri.path);
				}
				targetUri.query = referenceUri.query ?
					referenceUri.query.clone() : referenceUri.query;
			}
			targetUri.authority = baseUri.authority ?
				baseUri.authority.clone() : baseUri.authority;
		}
		targetUri.scheme = baseUri.scheme;
	}

	targetUri.fragment = referenceUri.fragment;
	return targetUri;
}

/**
 * Merges a relative-path reference with the path of the base URI.
 * https://tools.ietf.org/html/rfc3986#section-5.2.3
 * @param {URI} baseUri Components of base URI.
 * @param {URI} referenceUri Components of reference URI.
 * @returns {String} Merged path.
 */
function merge(baseUri, referenceUri) {
	if (baseUri.authority && baseUri.path === '') {
		return '/' + referenceUri.path;
	}

	var segmentsString = baseUri.path.indexOf('/') !== -1 ?
		baseUri.path.replace(/\/[^\/]+$/, '/') : '';

	return segmentsString + referenceUri.path;
}

/**
 * Removes dots segments from URI path.
 * https://tools.ietf.org/html/rfc3986#section-5.2.4
 * @param {String} uriPath URI path with possible dot segments.
 * @returns {String} URI path without dot segments.
 */
function removeDotSegments(uriPath) {
	if (!uriPath) {
		return '';
	}

	var inputBuffer = uriPath,
		newBuffer = '',
		nextSegment = '',
		outputBuffer = '';

	while (inputBuffer.length !== 0) {

		// If the input buffer begins with a prefix of "../" or "./",
		// then remove that prefix from the input buffer
		newBuffer = inputBuffer.replace(/^\.?\.\//, '');
		if (newBuffer !== inputBuffer) {
			inputBuffer = newBuffer;
			continue;
		}

		// if the input buffer begins with a prefix of "/./" or "/.",
		// where "." is a complete path segment, then replace that
		// prefix with "/" in the input buffer
		newBuffer = inputBuffer.replace(/^((\/\.\/)|(\/\.$))/, '/');
		if (newBuffer !== inputBuffer) {
			inputBuffer = newBuffer;
			continue;
		}

		// if the input buffer begins with a prefix of "/../" or "/..",
		// where ".." is a complete path segment, then replace that
		// prefix with "/" in the input buffer and remove the last
		// segment and its preceding "/" (if any) from the output
		// buffer
		newBuffer = inputBuffer.replace(/^((\/\.\.\/)|(\/\.\.$))/, '/');
		if (newBuffer !== inputBuffer) {
			outputBuffer = outputBuffer.replace(/\/[^\/]+$/, '');
			inputBuffer = newBuffer;
			continue;
		}

		// if the input buffer consists only of "." or "..", then remove
		// that from the input buffer
		if (inputBuffer === '.' || inputBuffer === '..') {
			break;
		}

		// move the first path segment in the input buffer to the end of
		// the output buffer, including the initial "/" character (if
		// any) and any subsequent characters up to, but not including,
		// the next "/" character or the end of the input buffer
		nextSegment = /^\/?[^\/]*(\/|$)/.exec(inputBuffer)[0];
		nextSegment = nextSegment.replace(/([^\/])(\/$)/, '$1');
		inputBuffer = inputBuffer.substring(nextSegment.length);
		outputBuffer += nextSegment;
	}

	return outputBuffer;
}
},{"./Authority":53,"./Query":54,"./percentEncodingHelper":57}],56:[function(require,module,exports){
/*
 * catberry-uri
 *
 * Copyright (c) 2014 Denis Rechkunov and project contributors.
 *
 * catberry-uri's license follows:
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
 * This license applies to all parts of catberry-uri that are not externally
 * maintained libraries.
 */

'use strict';

module.exports = UserInfo;

var percentEncodingHelper = require('./percentEncodingHelper');

/**
 * Creates new instance of user information component parser.
 * https://tools.ietf.org/html/rfc3986#section-3.2.1
 * @param {String?} userInfoString User information component string.
 * @constructor
 */
function UserInfo(userInfoString) {
	if (typeof(userInfoString) === 'string' && userInfoString.length > 0) {
		var parts = userInfoString.split(':');
		if (typeof(parts[0]) === 'string') {
			this.user = percentEncodingHelper.decode(parts[0]);
		}
		if (typeof(parts[1]) === 'string') {
			this.password = percentEncodingHelper.decode(parts[1]);
		}
	}
}

/**
 * Current user component.
 * @type {String}
 */
UserInfo.prototype.user = null;

/**
 * Current password.
 * @type {String}
 */
UserInfo.prototype.password = null;

/**
 * Clones current user information.
 * @returns {UserInfo} New clone of current object.
 */
UserInfo.prototype.clone = function () {
	var userInfo = new UserInfo();
	if (typeof(this.user) === 'string') {
		userInfo.user = this.user;
	}
	if (typeof(this.password) === 'string') {
		userInfo.password = this.password;
	}
	return userInfo;
};

/**
 * Recombines user information components to userInfo string.
 * @returns {String} User information component string.
 */
UserInfo.prototype.toString = function () {
	var result = '';
	if (this.user !== undefined && this.user !== null) {
		var user = String(this.user);
		result += percentEncodingHelper
			.encodeUserInfoSubComponent(user);
	}
	if (this.password !== undefined && this.password !== null) {
		var password = String(this.password);
		result += ':' + percentEncodingHelper
			.encodeUserInfoSubComponent(password);
	}

	return result;
};
},{"./percentEncodingHelper":57}],57:[function(require,module,exports){
/*
 * catberry-uri
 *
 * Copyright (c) 2014 Denis Rechkunov and project contributors.
 *
 * catberry-uri's license follows:
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
 * This license applies to all parts of catberry-uri that are not externally
 * maintained libraries.
 */

'use strict';

// https://tools.ietf.org/html/rfc3986#section-2.1

module.exports = {
	/**
	 * Encodes authority user information sub-component according to RFC 3986.
	 * @param {String} string Component to encode.
	 * @returns {String} Encoded component.
	 */
	encodeUserInfoSubComponent: function (string) {
		return string.replace(
			// https://tools.ietf.org/html/rfc3986#section-3.2.1
			/[^\w\.~\-!\$&'\(\)\*\+,;=]/g, encodeURIComponent
		);
	},
	/**
	 * Encodes authority host component according to RFC 3986.
	 * @param {String} string Component to encode.
	 * @returns {String} Encoded component.
	 */
	encodeHost: function (string) {
		return string.replace(
			// https://tools.ietf.org/html/rfc3986#section-3.2.2
			/[^\w\.~\-!\$&'\(\)\*\+,;=:\[\]]/g, encodeURIComponent
		);

	},
	/**
	 * Encodes URI path component according to RFC 3986.
	 * @param {String} string Component to encode.
	 * @returns {String} Encoded component.
	 */
	encodePath: function (string) {
		return string.replace(
			// https://tools.ietf.org/html/rfc3986#section-3.3
			/[^\w\.~\-!\$&'\(\)\*\+,;=:@\/]/g, encodeURIComponent
		);
	},
	/**
	 * Encodes query sub-component according to RFC 3986.
	 * @param {String} string Component to encode.
	 * @returns {String} Encoded component.
	 */
	encodeQuerySubComponent: function (string) {
		return string.replace(
			// https://tools.ietf.org/html/rfc3986#section-3.4
			/[^\w\.~\-!\$'\(\)\*\+,;:@\/\?]/g, encodeURIComponent
		);
	},

	/**
	 * Encodes URI fragment component according to RFC 3986.
	 * @param {String} string Component to encode.
	 * @returns {String} Encoded component.
	 */
	encodeFragment: function (string) {
		return string.replace(
			// https://tools.ietf.org/html/rfc3986#section-3.5
			/[^\w\.~\-!\$&'\(\)\*\+,;=:@\/\?]/g, encodeURIComponent
		);
	},

	/**
	 * Decodes percent encoded component.
	 * @param {String} string Component to decode.
	 * @returns {String} Decoded component.
	 */
	decode: function (string) {
		return decodeURIComponent(string);
	}
};
},{}],58:[function(require,module,exports){
'use strict';

module.exports = require('./lib')

},{"./lib":63}],59:[function(require,module,exports){
'use strict';

var asap = require('asap/raw');

function noop() {}

// States:
//
// 0 - pending
// 1 - fulfilled with _value
// 2 - rejected with _value
// 3 - adopted the state of another promise, _value
//
// once the state is no longer pending (0) it is immutable

// All `_` prefixed properties will be reduced to `_{random number}`
// at build time to obfuscate them and discourage their use.
// We don't use symbols or Object.defineProperty to fully hide them
// because the performance isn't good enough.


// to avoid using try/catch inside critical functions, we
// extract them to here.
var LAST_ERROR = null;
var IS_ERROR = {};
function getThen(obj) {
  try {
    return obj.then;
  } catch (ex) {
    LAST_ERROR = ex;
    return IS_ERROR;
  }
}

function tryCallOne(fn, a) {
  try {
    return fn(a);
  } catch (ex) {
    LAST_ERROR = ex;
    return IS_ERROR;
  }
}
function tryCallTwo(fn, a, b) {
  try {
    fn(a, b);
  } catch (ex) {
    LAST_ERROR = ex;
    return IS_ERROR;
  }
}

module.exports = Promise;

function Promise(fn) {
  if (typeof this !== 'object') {
    throw new TypeError('Promises must be constructed via new');
  }
  if (typeof fn !== 'function') {
    throw new TypeError('not a function');
  }
  this._32 = 0;
  this._8 = null;
  this._89 = [];
  if (fn === noop) return;
  doResolve(fn, this);
}
Promise._83 = noop;

Promise.prototype.then = function(onFulfilled, onRejected) {
  if (this.constructor !== Promise) {
    return safeThen(this, onFulfilled, onRejected);
  }
  var res = new Promise(noop);
  handle(this, new Handler(onFulfilled, onRejected, res));
  return res;
};

function safeThen(self, onFulfilled, onRejected) {
  return new self.constructor(function (resolve, reject) {
    var res = new Promise(noop);
    res.then(resolve, reject);
    handle(self, new Handler(onFulfilled, onRejected, res));
  });
};
function handle(self, deferred) {
  while (self._32 === 3) {
    self = self._8;
  }
  if (self._32 === 0) {
    self._89.push(deferred);
    return;
  }
  asap(function() {
    var cb = self._32 === 1 ? deferred.onFulfilled : deferred.onRejected;
    if (cb === null) {
      if (self._32 === 1) {
        resolve(deferred.promise, self._8);
      } else {
        reject(deferred.promise, self._8);
      }
      return;
    }
    var ret = tryCallOne(cb, self._8);
    if (ret === IS_ERROR) {
      reject(deferred.promise, LAST_ERROR);
    } else {
      resolve(deferred.promise, ret);
    }
  });
}
function resolve(self, newValue) {
  // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
  if (newValue === self) {
    return reject(
      self,
      new TypeError('A promise cannot be resolved with itself.')
    );
  }
  if (
    newValue &&
    (typeof newValue === 'object' || typeof newValue === 'function')
  ) {
    var then = getThen(newValue);
    if (then === IS_ERROR) {
      return reject(self, LAST_ERROR);
    }
    if (
      then === self.then &&
      newValue instanceof Promise
    ) {
      self._32 = 3;
      self._8 = newValue;
      finale(self);
      return;
    } else if (typeof then === 'function') {
      doResolve(then.bind(newValue), self);
      return;
    }
  }
  self._32 = 1;
  self._8 = newValue;
  finale(self);
}

function reject(self, newValue) {
  self._32 = 2;
  self._8 = newValue;
  finale(self);
}
function finale(self) {
  for (var i = 0; i < self._89.length; i++) {
    handle(self, self._89[i]);
  }
  self._89 = null;
}

function Handler(onFulfilled, onRejected, promise){
  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
  this.onRejected = typeof onRejected === 'function' ? onRejected : null;
  this.promise = promise;
}

/**
 * Take a potentially misbehaving resolver function and make sure
 * onFulfilled and onRejected are only called once.
 *
 * Makes no guarantees about asynchrony.
 */
function doResolve(fn, promise) {
  var done = false;
  var res = tryCallTwo(fn, function (value) {
    if (done) return;
    done = true;
    resolve(promise, value);
  }, function (reason) {
    if (done) return;
    done = true;
    reject(promise, reason);
  })
  if (!done && res === IS_ERROR) {
    done = true;
    reject(promise, LAST_ERROR);
  }
}

},{"asap/raw":67}],60:[function(require,module,exports){
'use strict';

var Promise = require('./core.js');

module.exports = Promise;
Promise.prototype.done = function (onFulfilled, onRejected) {
  var self = arguments.length ? this.then.apply(this, arguments) : this;
  self.then(null, function (err) {
    setTimeout(function () {
      throw err;
    }, 0);
  });
};

},{"./core.js":59}],61:[function(require,module,exports){
'use strict';

//This file contains the ES6 extensions to the core Promises/A+ API

var Promise = require('./core.js');
var asap = require('asap/raw');

module.exports = Promise;

/* Static Functions */

var TRUE = valuePromise(true);
var FALSE = valuePromise(false);
var NULL = valuePromise(null);
var UNDEFINED = valuePromise(undefined);
var ZERO = valuePromise(0);
var EMPTYSTRING = valuePromise('');

function valuePromise(value) {
  var p = new Promise(Promise._83);
  p._32 = 1;
  p._8 = value;
  return p;
}
Promise.resolve = function (value) {
  if (value instanceof Promise) return value;

  if (value === null) return NULL;
  if (value === undefined) return UNDEFINED;
  if (value === true) return TRUE;
  if (value === false) return FALSE;
  if (value === 0) return ZERO;
  if (value === '') return EMPTYSTRING;

  if (typeof value === 'object' || typeof value === 'function') {
    try {
      var then = value.then;
      if (typeof then === 'function') {
        return new Promise(then.bind(value));
      }
    } catch (ex) {
      return new Promise(function (resolve, reject) {
        reject(ex);
      });
    }
  }
  return valuePromise(value);
};

Promise.all = function (arr) {
  var args = Array.prototype.slice.call(arr);

  return new Promise(function (resolve, reject) {
    if (args.length === 0) return resolve([]);
    var remaining = args.length;
    function res(i, val) {
      if (val && (typeof val === 'object' || typeof val === 'function')) {
        if (val instanceof Promise && val.then === Promise.prototype.then) {
          while (val._32 === 3) {
            val = val._8;
          }
          if (val._32 === 1) return res(i, val._8);
          if (val._32 === 2) reject(val._8);
          val.then(function (val) {
            res(i, val);
          }, reject);
          return;
        } else {
          var then = val.then;
          if (typeof then === 'function') {
            var p = new Promise(then.bind(val));
            p.then(function (val) {
              res(i, val);
            }, reject);
            return;
          }
        }
      }
      args[i] = val;
      if (--remaining === 0) {
        resolve(args);
      }
    }
    for (var i = 0; i < args.length; i++) {
      res(i, args[i]);
    }
  });
};

Promise.reject = function (value) {
  return new Promise(function (resolve, reject) {
    reject(value);
  });
};

Promise.race = function (values) {
  return new Promise(function (resolve, reject) {
    values.forEach(function(value){
      Promise.resolve(value).then(resolve, reject);
    });
  });
};

/* Prototype Methods */

Promise.prototype['catch'] = function (onRejected) {
  return this.then(null, onRejected);
};

},{"./core.js":59,"asap/raw":67}],62:[function(require,module,exports){
'use strict';

var Promise = require('./core.js');

module.exports = Promise;
Promise.prototype['finally'] = function (f) {
  return this.then(function (value) {
    return Promise.resolve(f()).then(function () {
      return value;
    });
  }, function (err) {
    return Promise.resolve(f()).then(function () {
      throw err;
    });
  });
};

},{"./core.js":59}],63:[function(require,module,exports){
'use strict';

module.exports = require('./core.js');
require('./done.js');
require('./finally.js');
require('./es6-extensions.js');
require('./node-extensions.js');

},{"./core.js":59,"./done.js":60,"./es6-extensions.js":61,"./finally.js":62,"./node-extensions.js":64}],64:[function(require,module,exports){
'use strict';

// This file contains then/promise specific extensions that are only useful
// for node.js interop

var Promise = require('./core.js');
var asap = require('asap');

module.exports = Promise;

/* Static Functions */

Promise.denodeify = function (fn, argumentCount) {
  argumentCount = argumentCount || Infinity;
  return function () {
    var self = this;
    var args = Array.prototype.slice.call(arguments);
    return new Promise(function (resolve, reject) {
      while (args.length && args.length > argumentCount) {
        args.pop();
      }
      args.push(function (err, res) {
        if (err) reject(err);
        else resolve(res);
      })
      var res = fn.apply(self, args);
      if (res &&
        (
          typeof res === 'object' ||
          typeof res === 'function'
        ) &&
        typeof res.then === 'function'
      ) {
        resolve(res);
      }
    })
  }
}
Promise.nodeify = function (fn) {
  return function () {
    var args = Array.prototype.slice.call(arguments);
    var callback =
      typeof args[args.length - 1] === 'function' ? args.pop() : null;
    var ctx = this;
    try {
      return fn.apply(this, arguments).nodeify(callback, ctx);
    } catch (ex) {
      if (callback === null || typeof callback == 'undefined') {
        return new Promise(function (resolve, reject) {
          reject(ex);
        });
      } else {
        asap(function () {
          callback.call(ctx, ex);
        })
      }
    }
  }
}

Promise.prototype.nodeify = function (callback, ctx) {
  if (typeof callback != 'function') return this;

  this.then(function (value) {
    asap(function () {
      callback.call(ctx, null, value);
    });
  }, function (err) {
    asap(function () {
      callback.call(ctx, err);
    });
  });
}

},{"./core.js":59,"asap":65}],65:[function(require,module,exports){
"use strict";

// rawAsap provides everything we need except exception management.
var rawAsap = require("./raw");
// RawTasks are recycled to reduce GC churn.
var freeTasks = [];
// We queue errors to ensure they are thrown in right order (FIFO).
// Array-as-queue is good enough here, since we are just dealing with exceptions.
var pendingErrors = [];
var requestErrorThrow = rawAsap.makeRequestCallFromTimer(throwFirstError);

function throwFirstError() {
    if (pendingErrors.length) {
        throw pendingErrors.shift();
    }
}

/**
 * Calls a task as soon as possible after returning, in its own event, with priority
 * over other events like animation, reflow, and repaint. An error thrown from an
 * event will not interrupt, nor even substantially slow down the processing of
 * other events, but will be rather postponed to a lower priority event.
 * @param {{call}} task A callable object, typically a function that takes no
 * arguments.
 */
module.exports = asap;
function asap(task) {
    var rawTask;
    if (freeTasks.length) {
        rawTask = freeTasks.pop();
    } else {
        rawTask = new RawTask();
    }
    rawTask.task = task;
    rawAsap(rawTask);
}

// We wrap tasks with recyclable task objects.  A task object implements
// `call`, just like a function.
function RawTask() {
    this.task = null;
}

// The sole purpose of wrapping the task is to catch the exception and recycle
// the task object after its single use.
RawTask.prototype.call = function () {
    try {
        this.task.call();
    } catch (error) {
        if (asap.onerror) {
            // This hook exists purely for testing purposes.
            // Its name will be periodically randomized to break any code that
            // depends on its existence.
            asap.onerror(error);
        } else {
            // In a web browser, exceptions are not fatal. However, to avoid
            // slowing down the queue of pending tasks, we rethrow the error in a
            // lower priority turn.
            pendingErrors.push(error);
            requestErrorThrow();
        }
    } finally {
        this.task = null;
        freeTasks[freeTasks.length] = this;
    }
};

},{"./raw":66}],66:[function(require,module,exports){
(function (global){
"use strict";

// Use the fastest means possible to execute a task in its own turn, with
// priority over other events including IO, animation, reflow, and redraw
// events in browsers.
//
// An exception thrown by a task will permanently interrupt the processing of
// subsequent tasks. The higher level `asap` function ensures that if an
// exception is thrown by a task, that the task queue will continue flushing as
// soon as possible, but if you use `rawAsap` directly, you are responsible to
// either ensure that no exceptions are thrown from your task, or to manually
// call `rawAsap.requestFlush` if an exception is thrown.
module.exports = rawAsap;
function rawAsap(task) {
    if (!queue.length) {
        requestFlush();
        flushing = true;
    }
    // Equivalent to push, but avoids a function call.
    queue[queue.length] = task;
}

var queue = [];
// Once a flush has been requested, no further calls to `requestFlush` are
// necessary until the next `flush` completes.
var flushing = false;
// `requestFlush` is an implementation-specific method that attempts to kick
// off a `flush` event as quickly as possible. `flush` will attempt to exhaust
// the event queue before yielding to the browser's own event loop.
var requestFlush;
// The position of the next task to execute in the task queue. This is
// preserved between calls to `flush` so that it can be resumed if
// a task throws an exception.
var index = 0;
// If a task schedules additional tasks recursively, the task queue can grow
// unbounded. To prevent memory exhaustion, the task queue will periodically
// truncate already-completed tasks.
var capacity = 1024;

// The flush function processes all tasks that have been scheduled with
// `rawAsap` unless and until one of those tasks throws an exception.
// If a task throws an exception, `flush` ensures that its state will remain
// consistent and will resume where it left off when called again.
// However, `flush` does not make any arrangements to be called again if an
// exception is thrown.
function flush() {
    while (index < queue.length) {
        var currentIndex = index;
        // Advance the index before calling the task. This ensures that we will
        // begin flushing on the next task the task throws an error.
        index = index + 1;
        queue[currentIndex].call();
        // Prevent leaking memory for long chains of recursive calls to `asap`.
        // If we call `asap` within tasks scheduled by `asap`, the queue will
        // grow, but to avoid an O(n) walk for every task we execute, we don't
        // shift tasks off the queue after they have been executed.
        // Instead, we periodically shift 1024 tasks off the queue.
        if (index > capacity) {
            // Manually shift all values starting at the index back to the
            // beginning of the queue.
            for (var scan = 0, newLength = queue.length - index; scan < newLength; scan++) {
                queue[scan] = queue[scan + index];
            }
            queue.length -= index;
            index = 0;
        }
    }
    queue.length = 0;
    index = 0;
    flushing = false;
}

// `requestFlush` is implemented using a strategy based on data collected from
// every available SauceLabs Selenium web driver worker at time of writing.
// https://docs.google.com/spreadsheets/d/1mG-5UYGup5qxGdEMWkhP6BWCz053NUb2E1QoUTU16uA/edit#gid=783724593

// Safari 6 and 6.1 for desktop, iPad, and iPhone are the only browsers that
// have WebKitMutationObserver but not un-prefixed MutationObserver.
// Must use `global` instead of `window` to work in both frames and web
// workers. `global` is a provision of Browserify, Mr, Mrs, or Mop.
var BrowserMutationObserver = global.MutationObserver || global.WebKitMutationObserver;

// MutationObservers are desirable because they have high priority and work
// reliably everywhere they are implemented.
// They are implemented in all modern browsers.
//
// - Android 4-4.3
// - Chrome 26-34
// - Firefox 14-29
// - Internet Explorer 11
// - iPad Safari 6-7.1
// - iPhone Safari 7-7.1
// - Safari 6-7
if (typeof BrowserMutationObserver === "function") {
    requestFlush = makeRequestCallFromMutationObserver(flush);

// MessageChannels are desirable because they give direct access to the HTML
// task queue, are implemented in Internet Explorer 10, Safari 5.0-1, and Opera
// 11-12, and in web workers in many engines.
// Although message channels yield to any queued rendering and IO tasks, they
// would be better than imposing the 4ms delay of timers.
// However, they do not work reliably in Internet Explorer or Safari.

// Internet Explorer 10 is the only browser that has setImmediate but does
// not have MutationObservers.
// Although setImmediate yields to the browser's renderer, it would be
// preferrable to falling back to setTimeout since it does not have
// the minimum 4ms penalty.
// Unfortunately there appears to be a bug in Internet Explorer 10 Mobile (and
// Desktop to a lesser extent) that renders both setImmediate and
// MessageChannel useless for the purposes of ASAP.
// https://github.com/kriskowal/q/issues/396

// Timers are implemented universally.
// We fall back to timers in workers in most engines, and in foreground
// contexts in the following browsers.
// However, note that even this simple case requires nuances to operate in a
// broad spectrum of browsers.
//
// - Firefox 3-13
// - Internet Explorer 6-9
// - iPad Safari 4.3
// - Lynx 2.8.7
} else {
    requestFlush = makeRequestCallFromTimer(flush);
}

// `requestFlush` requests that the high priority event queue be flushed as
// soon as possible.
// This is useful to prevent an error thrown in a task from stalling the event
// queue if the exception handled by Node.js’s
// `process.on("uncaughtException")` or by a domain.
rawAsap.requestFlush = requestFlush;

// To request a high priority event, we induce a mutation observer by toggling
// the text of a text node between "1" and "-1".
function makeRequestCallFromMutationObserver(callback) {
    var toggle = 1;
    var observer = new BrowserMutationObserver(callback);
    var node = document.createTextNode("");
    observer.observe(node, {characterData: true});
    return function requestCall() {
        toggle = -toggle;
        node.data = toggle;
    };
}

// The message channel technique was discovered by Malte Ubl and was the
// original foundation for this library.
// http://www.nonblocking.io/2011/06/windownexttick.html

// Safari 6.0.5 (at least) intermittently fails to create message ports on a
// page's first load. Thankfully, this version of Safari supports
// MutationObservers, so we don't need to fall back in that case.

// function makeRequestCallFromMessageChannel(callback) {
//     var channel = new MessageChannel();
//     channel.port1.onmessage = callback;
//     return function requestCall() {
//         channel.port2.postMessage(0);
//     };
// }

// For reasons explained above, we are also unable to use `setImmediate`
// under any circumstances.
// Even if we were, there is another bug in Internet Explorer 10.
// It is not sufficient to assign `setImmediate` to `requestFlush` because
// `setImmediate` must be called *by name* and therefore must be wrapped in a
// closure.
// Never forget.

// function makeRequestCallFromSetImmediate(callback) {
//     return function requestCall() {
//         setImmediate(callback);
//     };
// }

// Safari 6.0 has a problem where timers will get lost while the user is
// scrolling. This problem does not impact ASAP because Safari 6.0 supports
// mutation observers, so that implementation is used instead.
// However, if we ever elect to use timers in Safari, the prevalent work-around
// is to add a scroll event listener that calls for a flush.

// `setTimeout` does not call the passed callback if the delay is less than
// approximately 7 in web workers in Firefox 8 through 18, and sometimes not
// even then.

function makeRequestCallFromTimer(callback) {
    return function requestCall() {
        // We dispatch a timeout with a specified delay of 0 for engines that
        // can reliably accommodate that request. This will usually be snapped
        // to a 4 milisecond delay, but once we're flushing, there's no delay
        // between events.
        var timeoutHandle = setTimeout(handleTimer, 0);
        // However, since this timer gets frequently dropped in Firefox
        // workers, we enlist an interval handle that will try to fire
        // an event 20 times per second until it succeeds.
        var intervalHandle = setInterval(handleTimer, 50);

        function handleTimer() {
            // Whichever timer succeeds will cancel both timers and
            // execute the callback.
            clearTimeout(timeoutHandle);
            clearInterval(intervalHandle);
            callback();
        }
    };
}

// This is for `asap.js` only.
// Its name will be periodically randomized to break any code that depends on
// its existence.
rawAsap.makeRequestCallFromTimer = makeRequestCallFromTimer;

// ASAP was originally a nextTick shim included in Q. This was factored out
// into this ASAP package. It was later adapted to RSVP which made further
// amendments. These decisions, particularly to marginalize MessageChannel and
// to capture the MutationObserver implementation in a closure, were integrated
// back into ASAP proper.
// https://github.com/tildeio/rsvp.js/blob/cddf7232546a9cf858524b75cde6f9edf72620a7/lib/rsvp/asap.js

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],67:[function(require,module,exports){
(function (process){
"use strict";

var domain; // The domain module is executed on demand
var hasSetImmediate = typeof setImmediate === "function";

// Use the fastest means possible to execute a task in its own turn, with
// priority over other events including network IO events in Node.js.
//
// An exception thrown by a task will permanently interrupt the processing of
// subsequent tasks. The higher level `asap` function ensures that if an
// exception is thrown by a task, that the task queue will continue flushing as
// soon as possible, but if you use `rawAsap` directly, you are responsible to
// either ensure that no exceptions are thrown from your task, or to manually
// call `rawAsap.requestFlush` if an exception is thrown.
module.exports = rawAsap;
function rawAsap(task) {
    if (!queue.length) {
        requestFlush();
        flushing = true;
    }
    // Avoids a function call
    queue[queue.length] = task;
}

var queue = [];
// Once a flush has been requested, no further calls to `requestFlush` are
// necessary until the next `flush` completes.
var flushing = false;
// The position of the next task to execute in the task queue. This is
// preserved between calls to `flush` so that it can be resumed if
// a task throws an exception.
var index = 0;
// If a task schedules additional tasks recursively, the task queue can grow
// unbounded. To prevent memory excaustion, the task queue will periodically
// truncate already-completed tasks.
var capacity = 1024;

// The flush function processes all tasks that have been scheduled with
// `rawAsap` unless and until one of those tasks throws an exception.
// If a task throws an exception, `flush` ensures that its state will remain
// consistent and will resume where it left off when called again.
// However, `flush` does not make any arrangements to be called again if an
// exception is thrown.
function flush() {
    while (index < queue.length) {
        var currentIndex = index;
        // Advance the index before calling the task. This ensures that we will
        // begin flushing on the next task the task throws an error.
        index = index + 1;
        queue[currentIndex].call();
        // Prevent leaking memory for long chains of recursive calls to `asap`.
        // If we call `asap` within tasks scheduled by `asap`, the queue will
        // grow, but to avoid an O(n) walk for every task we execute, we don't
        // shift tasks off the queue after they have been executed.
        // Instead, we periodically shift 1024 tasks off the queue.
        if (index > capacity) {
            // Manually shift all values starting at the index back to the
            // beginning of the queue.
            for (var scan = 0, newLength = queue.length - index; scan < newLength; scan++) {
                queue[scan] = queue[scan + index];
            }
            queue.length -= index;
            index = 0;
        }
    }
    queue.length = 0;
    index = 0;
    flushing = false;
}

rawAsap.requestFlush = requestFlush;
function requestFlush() {
    // Ensure flushing is not bound to any domain.
    // It is not sufficient to exit the domain, because domains exist on a stack.
    // To execute code outside of any domain, the following dance is necessary.
    var parentDomain = process.domain;
    if (parentDomain) {
        if (!domain) {
            // Lazy execute the domain module.
            // Only employed if the user elects to use domains.
            domain = require("domain");
        }
        domain.active = process.domain = null;
    }

    // `setImmediate` is slower that `process.nextTick`, but `process.nextTick`
    // cannot handle recursion.
    // `requestFlush` will only be called recursively from `asap.js`, to resume
    // flushing after an error is thrown into a domain.
    // Conveniently, `setImmediate` was introduced in the same version
    // `process.nextTick` started throwing recursion errors.
    if (flushing && hasSetImmediate) {
        setImmediate(flush);
    } else {
        process.nextTick(flush);
    }

    if (parentDomain) {
        domain.active = process.domain = parentDomain;
    }
}

}).call(this,require('_process'))

},{"_process":44,"domain":41}],68:[function(require,module,exports){
'use strict';

// This file contains definitions of rules how location URLs are translated
// to parameters for stores in Catberry application.
//
// Format:
// /some/:parameter[store1,store2,store3]
//
// More details here:
// https://github.com/catberry/catberry/blob/master/docs/index.md#routing

module.exports = [
  // '/:filter[TodoList,Filters]'
  '/:page[Pages]'
  // '/:page[Pages]?query=:query[commits/Search]'
	// '/'
];

},{}],69:[function(require,module,exports){
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

{name: 'Main', constructor: require('./catberry_stores/Main.js')},
{name: 'Pages', constructor: require('./catberry_stores/Pages.js')}
];

var components = [

{name: 'document', constructor: require('./catberry_components/document/Document.js'), properties: {"name":"document","template":"./document.hbs","logic":"./Document.js"}, templateSource: '{"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {\n  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;\n  return "<!DOCTYPE html>\\n<html lang=\\""\n    + escapeExpression(((helper = (helper = helpers.locale || (depth0 != null ? depth0.locale : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"locale","hash":{},"data":data}) : helper)))\n    + "\\">\\n<head cat-store=\\"Pages\\" prefix=\\"og: http://ogp.me/ns# fb: http://ogp.me/ns/fb#\\">\\n</head>\\n<body>\\n  <cat-header id=\\"document-header\\"></cat-header>\\n  <cat-hello-world id=\\"unique\\" cat-store=\\"Main\\"></cat-hello-world>\\n  <cat-pages id=\\"document-pages\\" cat-store=\\"Pages\\"></cat-pages>\\n  <cat-footer id=\\"document-footer\\"></cat-footer>\\n  <cat-bottom-scripts id=\\"document-bottom-scripts\\"></cat-bottom-scripts>\\n</body>\\n</html>\\n";\n},"useData":true}', errorTemplateSource: null},
{name: 'head', constructor: require('./catberry_components/head/Head.js'), properties: {"name":"head","template":"./head.hbs","logic":"./Head.js"}, templateSource: '{"1":function(depth0,helpers,partials,data) {\n  return "<!-- Mobile head -->\\n";\n  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {\n  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<meta charset=\\"UTF-8\\">\\n<meta http-equiv=\\"X-UA-Compatible\\" content=\\"IE=edge\\">\\n<meta name=\\"viewport\\" content=\\"width=device-width, initial-scale=1\\">\\n<title>"\n    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))\n    + " ::: "\n    + escapeExpression(((helper = (helper = helpers.subtitle || (depth0 != null ? depth0.subtitle : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"subtitle","hash":{},"data":data}) : helper)))\n    + "</title>\\n<meta name=\\"description\\" content=\\""\n    + escapeExpression(((helpers.l10n || (depth0 && depth0.l10n) || helperMissing).call(depth0, "DESCRIPTION", {"name":"l10n","hash":{},"data":data})))\n    + "\\">\\n<meta name=\\"keywords\\" content=\\""\n    + escapeExpression(((helpers.l10n || (depth0 && depth0.l10n) || helperMissing).call(depth0, "KEYWORDS", {"name":"l10n","hash":{},"data":data})))\n    + "\\">\\n<link href=\\"/static/css/loader.css\\" rel=\\"stylesheet\\">\\n\\n<!-- Begin Twitter summary card -->\\n<meta name=\\"twitter:card\\" content=\\"summary\\" />\\n<meta name=\\"twitter:site\\" content=\\"@jbokiev\\" />\\n<meta name=\\"twitter:title\\" content=\\""\n    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))\n    + "\\" />\\n<meta name=\\"twitter:description\\" content=\\""\n    + escapeExpression(((helpers.l10n || (depth0 && depth0.l10n) || helperMissing).call(depth0, "DESCRIPTION", {"name":"l10n","hash":{},"data":data})))\n    + "\\" />\\n<meta name=\\"twitter:image\\" content=\\""\n    + escapeExpression(((helper = (helper = helpers.socialLogo || (depth0 != null ? depth0.socialLogo : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"socialLogo","hash":{},"data":data}) : helper)))\n    + "\\" />\\n<meta name=\\"twitter:url\\" content=\\""\n    + escapeExpression(((helper = (helper = helpers.location || (depth0 != null ? depth0.location : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"location","hash":{},"data":data}) : helper)))\n    + "\\" />\\n<!-- End Twitter summary card-->\\n\\n<!-- Begin Open Graph markup -->\\n<meta property=\\"og:title\\" content=\\""\n    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))\n    + "\\" />\\n<meta property=\\"og:description\\" content=\\""\n    + escapeExpression(((helpers.l10n || (depth0 && depth0.l10n) || helperMissing).call(depth0, "DESCRIPTION", {"name":"l10n","hash":{},"data":data})))\n    + "\\" />\\n<meta property=\\"og:type\\" content=\\"website\\" />\\n<meta property=\\"og:url\\" content=\\""\n    + escapeExpression(((helper = (helper = helpers.location || (depth0 != null ? depth0.location : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"location","hash":{},"data":data}) : helper)))\n    + "\\" />\\n<meta property=\\"og:image\\" content=\\""\n    + escapeExpression(((helper = (helper = helpers.socialLogo || (depth0 != null ? depth0.socialLogo : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"socialLogo","hash":{},"data":data}) : helper)))\n    + "\\" />\\n<!-- End Open Graph markup -->\\n";\n  stack1 = helpers[\'if\'].call(depth0, (depth0 != null ? depth0.isMobile : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});\n  if (stack1 != null) { buffer += stack1; }\n  return buffer + "<script src=\\"/bundle.js\\"></script>\\n\\n<link rel=\\"shortcut icon\\" href=\\"/favicon.ico\\">\\n\\n\\n";\n},"useData":true}', errorTemplateSource: null},
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
},{"./catberry_components/document/Document.js":2,"./catberry_components/head/Head.js":3,"./catberry_components/hello-world/HelloWorld.js":4,"./catberry_stores/Main.js":5,"./catberry_stores/Pages.js":6,"./node_modules/catberry/browser/Catberry.js":18,"./node_modules/catberry/browser/CookieWrapper":19,"./node_modules/catberry/browser/Logger.js":21,"./node_modules/catberry/browser/providers/ModuleApiProvider":25,"./node_modules/catberry/lib/StoreDispatcher":29,"./node_modules/catberry/lib/base/BootstrapperBase.js":30,"./node_modules/catberry/lib/helpers/moduleHelper.js":37,"./routes.js":68,"util":46}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiYnJvd3Nlci5qcyIsImNhdGJlcnJ5X2NvbXBvbmVudHMvZG9jdW1lbnQvRG9jdW1lbnQuanMiLCJjYXRiZXJyeV9jb21wb25lbnRzL2hlYWQvSGVhZC5qcyIsImNhdGJlcnJ5X2NvbXBvbmVudHMvaGVsbG8td29ybGQvSGVsbG9Xb3JsZC5qcyIsImNhdGJlcnJ5X3N0b3Jlcy9NYWluLmpzIiwiY2F0YmVycnlfc3RvcmVzL1BhZ2VzLmpzIiwiY29uZmlnL2Vudmlyb25tZW50Lmpzb24iLCJsaWIvQ29tcG9uZW50QmFzZS5qcyIsImxpYi9oZWxwZXJzL2wxMG5IZWxwZXIuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnktaGFuZGxlYmFycy9icm93c2VyL1RlbXBsYXRlUHJvdmlkZXIuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnktaGFuZGxlYmFycy9icm93c2VyL3ZlbmRvcnMvaGFuZGxlYmFycy5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS1oYW5kbGViYXJzL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2NhdGJlcnJ5LWwxMG4taGFuZGxlYmFycy1oZWxwZXIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnktbDEwbi1oYW5kbGViYXJzLWhlbHBlci9saWIvTG9jYWxpemF0aW9uSGVscGVyLmpzIiwibm9kZV9tb2R1bGVzL2NhdGJlcnJ5LWwxMG4vYnJvd3Nlci9Mb2NhbGl6YXRpb25Mb2FkZXIuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnktbDEwbi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS1sMTBuL2xpYi9Mb2NhbGl6YXRpb25Qcm92aWRlci5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS9icm93c2VyL0NhdGJlcnJ5LmpzIiwibm9kZV9tb2R1bGVzL2NhdGJlcnJ5L2Jyb3dzZXIvQ29va2llV3JhcHBlci5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS9icm93c2VyL0RvY3VtZW50UmVuZGVyZXIuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvYnJvd3Nlci9Mb2dnZXIuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvYnJvd3Nlci9SZXF1ZXN0Um91dGVyLmpzIiwibm9kZV9tb2R1bGVzL2NhdGJlcnJ5L2Jyb3dzZXIvbG9hZGVycy9Db21wb25lbnRMb2FkZXIuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvYnJvd3Nlci9sb2FkZXJzL1N0b3JlTG9hZGVyLmpzIiwibm9kZV9tb2R1bGVzL2NhdGJlcnJ5L2Jyb3dzZXIvcHJvdmlkZXJzL01vZHVsZUFwaVByb3ZpZGVyLmpzIiwibm9kZV9tb2R1bGVzL2NhdGJlcnJ5L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2NhdGJlcnJ5L2xpYi9Db250ZXh0RmFjdG9yeS5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS9saWIvU2VyaWFsV3JhcHBlci5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS9saWIvU3RvcmVEaXNwYXRjaGVyLmpzIiwibm9kZV9tb2R1bGVzL2NhdGJlcnJ5L2xpYi9iYXNlL0Jvb3RzdHJhcHBlckJhc2UuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvbGliL2Jhc2UvQ2F0YmVycnlCYXNlLmpzIiwibm9kZV9tb2R1bGVzL2NhdGJlcnJ5L2xpYi9iYXNlL0Nvb2tpZVdyYXBwZXJCYXNlLmpzIiwibm9kZV9tb2R1bGVzL2NhdGJlcnJ5L2xpYi9iYXNlL0RvY3VtZW50UmVuZGVyZXJCYXNlLmpzIiwibm9kZV9tb2R1bGVzL2NhdGJlcnJ5L2xpYi9iYXNlL0xvYWRlckJhc2UuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvbGliL2Jhc2UvTW9kdWxlQXBpUHJvdmlkZXJCYXNlLmpzIiwibm9kZV9tb2R1bGVzL2NhdGJlcnJ5L2xpYi9oZWxwZXJzL2Vycm9ySGVscGVyLmpzIiwibm9kZV9tb2R1bGVzL2NhdGJlcnJ5L2xpYi9oZWxwZXJzL21vZHVsZUhlbHBlci5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS9saWIvaGVscGVycy9wcm9wZXJ0eUhlbHBlci5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS9saWIvaGVscGVycy9yb3V0ZUhlbHBlci5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS9saWIvcHJvdmlkZXJzL1N0YXRlUHJvdmlkZXIuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2RvbWFpbi1icm93c2VyL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2NhdGJlcnJ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9ldmVudHMvZXZlbnRzLmpzIiwibm9kZV9tb2R1bGVzL2NhdGJlcnJ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9pbmhlcml0cy9pbmhlcml0c19icm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL2NhdGJlcnJ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3V0aWwvc3VwcG9ydC9pc0J1ZmZlckJyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3V0aWwvdXRpbC5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS9ub2RlX21vZHVsZXMvY2F0YmVycnktbG9jYXRvci9saWIvQ29uc3RydWN0b3JUb2tlbml6ZXIuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvbm9kZV9tb2R1bGVzL2NhdGJlcnJ5LWxvY2F0b3IvbGliL1NlcnZpY2VMb2NhdG9yLmpzIiwibm9kZV9tb2R1bGVzL2NhdGJlcnJ5L25vZGVfbW9kdWxlcy9jYXRiZXJyeS11aHIvYnJvd3Nlci9VSFIuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvbm9kZV9tb2R1bGVzL2NhdGJlcnJ5LXVoci9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS9ub2RlX21vZHVsZXMvY2F0YmVycnktdWhyL2xpYi9VSFJCYXNlLmpzIiwibm9kZV9tb2R1bGVzL2NhdGJlcnJ5L25vZGVfbW9kdWxlcy9jYXRiZXJyeS11cmkvaW5kZXguanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvbm9kZV9tb2R1bGVzL2NhdGJlcnJ5LXVyaS9saWIvQXV0aG9yaXR5LmpzIiwibm9kZV9tb2R1bGVzL2NhdGJlcnJ5L25vZGVfbW9kdWxlcy9jYXRiZXJyeS11cmkvbGliL1F1ZXJ5LmpzIiwibm9kZV9tb2R1bGVzL2NhdGJlcnJ5L25vZGVfbW9kdWxlcy9jYXRiZXJyeS11cmkvbGliL1VSSS5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS9ub2RlX21vZHVsZXMvY2F0YmVycnktdXJpL2xpYi9Vc2VySW5mby5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS9ub2RlX21vZHVsZXMvY2F0YmVycnktdXJpL2xpYi9wZXJjZW50RW5jb2RpbmdIZWxwZXIuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvbm9kZV9tb2R1bGVzL3Byb21pc2UvaW5kZXguanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvbm9kZV9tb2R1bGVzL3Byb21pc2UvbGliL2NvcmUuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvbm9kZV9tb2R1bGVzL3Byb21pc2UvbGliL2RvbmUuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvbm9kZV9tb2R1bGVzL3Byb21pc2UvbGliL2VzNi1leHRlbnNpb25zLmpzIiwibm9kZV9tb2R1bGVzL2NhdGJlcnJ5L25vZGVfbW9kdWxlcy9wcm9taXNlL2xpYi9maW5hbGx5LmpzIiwibm9kZV9tb2R1bGVzL2NhdGJlcnJ5L25vZGVfbW9kdWxlcy9wcm9taXNlL2xpYi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS9ub2RlX21vZHVsZXMvcHJvbWlzZS9saWIvbm9kZS1leHRlbnNpb25zLmpzIiwibm9kZV9tb2R1bGVzL2NhdGJlcnJ5L25vZGVfbW9kdWxlcy9wcm9taXNlL25vZGVfbW9kdWxlcy9hc2FwL2Jyb3dzZXItYXNhcC5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS9ub2RlX21vZHVsZXMvcHJvbWlzZS9ub2RlX21vZHVsZXMvYXNhcC9icm93c2VyLXJhdy5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS9ub2RlX21vZHVsZXMvcHJvbWlzZS9ub2RlX21vZHVsZXMvYXNhcC9yYXcuanMiLCJyb3V0ZXMuanMiLCJfX0Jyb3dzZXJCdW5kbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0tBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25KQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9GQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3U0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDMWtCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdE9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOVJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JHQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNsRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUM1TkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDckdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbnZhciBjYXRiZXJyeSA9IHJlcXVpcmUoJ2NhdGJlcnJ5JyksXG5cdC8vIHRoaXMgY29uZmlnIHdpbGwgYmUgcmVwbGFjZWQgYnkgYC4vY29uZmlnL2Jyb3dzZXIuanNvbmAgd2hlbiBidWlsZGluZ1xuXHQvLyBiZWNhdXNlIG9mIGBicm93c2VyYCBmaWVsZCBpbiBgcGFja2FnZS5qc29uYFxuXHRjb25maWcgPSByZXF1aXJlKCcuL2NvbmZpZy9lbnZpcm9ubWVudC5qc29uJyksXG5cdHRlbXBsYXRlRW5naW5lID0gcmVxdWlyZSgnY2F0YmVycnktaGFuZGxlYmFycycpLFxuXHRsMTBuID0gcmVxdWlyZSgnY2F0YmVycnktbDEwbicpLFxuXHRsb2NhbGl6YXRpb25IZWxwZXIgPSByZXF1aXJlKCdjYXRiZXJyeS1sMTBuLWhhbmRsZWJhcnMtaGVscGVyJyksXG5cdGNhdCA9IGNhdGJlcnJ5LmNyZWF0ZShjb25maWcpO1xuXG4vLyByZWdpc3RlciB0ZW1wbGF0ZSBwcm92aWRlciB0byBDYXRiZXJyeSBTZXJ2aWNlIExvY2F0b3JcbnRlbXBsYXRlRW5naW5lLnJlZ2lzdGVyKGNhdC5sb2NhdG9yKTtcbmwxMG4ucmVnaXN0ZXIoY2F0LmxvY2F0b3IpO1xubG9jYWxpemF0aW9uSGVscGVyLnJlZ2lzdGVyKGNhdC5sb2NhdG9yKTtcbmNhdC5zdGFydFdoZW5SZWFkeSgpO1xuXG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gRG9jdW1lbnQ7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgndXRpbCcpLFxuICBDb21wb25lbnRCYXNlID0gcmVxdWlyZSgnLi4vLi4vbGliL0NvbXBvbmVudEJhc2UnKTtcblxudXRpbC5pbmhlcml0cyhEb2N1bWVudCwgQ29tcG9uZW50QmFzZSk7XG5cbi8qXG4gKiBUaGlzIGlzIGEgQ2F0YmVycnkgQ2F0LWNvbXBvbmVudCBmaWxlLlxuICogTW9yZSBkZXRhaWxzIGNhbiBiZSBmb3VuZCBoZXJlXG4gKiBodHRwczovL2dpdGh1Yi5jb20vY2F0YmVycnkvY2F0YmVycnkvYmxvYi9tYXN0ZXIvZG9jcy9pbmRleC5tZCNjYXQtY29tcG9uZW50c1xuICovXG5cbi8qKlxuICogQ3JlYXRlcyBuZXcgaW5zdGFuY2Ugb2YgXCJkb2N1bWVudFwiIGNvbXBvbmVudC5cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBEb2N1bWVudCgpIHtcbiAgQ29tcG9uZW50QmFzZS5jYWxsKHRoaXMpO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEhlYWQ7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgndXRpbCcpLFxuICBDb21wb25lbnRCYXNlID0gcmVxdWlyZSgnLi4vLi4vbGliL0NvbXBvbmVudEJhc2UnKTtcblxudXRpbC5pbmhlcml0cyhIZWFkLCBDb21wb25lbnRCYXNlKTtcblxuLypcbiAqIFRoaXMgaXMgYSBDYXRiZXJyeSBDYXQtY29tcG9uZW50IGZpbGUuXG4gKiBNb3JlIGRldGFpbHMgY2FuIGJlIGZvdW5kIGhlcmVcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9jYXRiZXJyeS9jYXRiZXJyeS9ibG9iL21hc3Rlci9kb2NzL2luZGV4Lm1kI2NhdC1jb21wb25lbnRzXG4gKi9cblxuLyoqXG4gKiBDcmVhdGVzIG5ldyBpbnN0YW5jZSBvZiBcImhlYWRcIiBjb21wb25lbnQuXG4gKiBAcGFyYW0ge09iamVjdH0gJGNvbmZpZyBDYXRiZXJyeSBhcHBsaWNhdGlvbiBjb25maWcuXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gSGVhZCgkY29uZmlnKSB7XG5cdHRoaXMuX2NvbmZpZyA9ICRjb25maWc7XG4gIENvbXBvbmVudEJhc2UuY2FsbCh0aGlzKTtcbn1cblxuLyoqXG4gKiBDdXJyZW50IGNvbmZpZy5cbiAqIEB0eXBlIHtPYmplY3R9XG4gKiBAcHJpdmF0ZVxuICovXG5IZWFkLnByb3RvdHlwZS5fY29uZmlnID0gbnVsbDtcblxuLyoqXG4gKiBHZXRzIGRhdGEgZm9yIHRlbXBsYXRlLlxuICogQHJldHVybnMge09iamVjdH0gRGF0YSBvYmplY3QuXG4gKi9cbkhlYWQucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHNlbGYgPSB0aGlzLFxuICAgIGxvY2F0aW9uID0gdGhpcy4kY29udGV4dC5sb2NhdGlvbi5jbG9uZSgpLFxuICAgIHNvY2lhbExvZ28gPSB0aGlzLiRjb250ZXh0LmxvY2F0aW9uLmNsb25lKCk7XG4gIGxvY2F0aW9uLnNjaGVtZSA9ICdodHRwJztcbiAgc29jaWFsTG9nby5zY2hlbWUgPSBsb2NhdGlvbi5zY2hlbWU7XG4gIHNvY2lhbExvZ28ucGF0aCA9ICcvYXNzZXRzL2hlYWQvaW1hZ2VzL3NvY2lhbC1sb2dvLnBuZyc7XG4gIHJldHVybiB0aGlzLiRjb250ZXh0LmdldFN0b3JlRGF0YSgpXG4gICAgLnRoZW4oZnVuY3Rpb24gKHBhZ2VzKSB7XG4gICAgICBjb25zb2xlLmxvZygnLS0tLS0tLS0tLS0tPiAnICsgcGFnZXMuY3VycmVudFBhZ2UpO1xuICAgICAgcmV0dXJuIHNlbGYubG9jYWxpemVDb250ZXh0KHtcbiAgICAgICAgc29jaWFsTG9nbzogc29jaWFsTG9nbyxcbiAgICAgICAgbG9jYXRpb246IGxvY2F0aW9uLFxuICAgICAgICBwYWdlVGl0bGVLZXk6IHBhZ2VzLmN1cnJlbnRQYWdlICE9PSAnaG9tZScgP1xuICAgICAgICAgICdQQUdFX1RJVExFXycgKyBwYWdlcy5jdXJyZW50UGFnZSA6IG51bGxcbiAgICAgICAgLy8gcGFnZVRpdGxlS2V5OiBwYWdlcy5jdXJyZW50UGFnZSAhPT0gJ2hvbWUnID9cbiAgICAgICAgICAvLyAnUEFHRV9USVRMRV8nICsgcGFnZXMuY3VycmVudFBhZ2UudG9VcHBlckNhc2UoKSA6IG51bGxcbiAgICAgIH0pO1xuICAgIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBIZWxsb1dvcmxkO1xuXG4vKlxuICogVGhpcyBpcyBhIENhdGJlcnJ5IENhdC1jb21wb25lbnQgZmlsZS5cbiAqIE1vcmUgZGV0YWlscyBjYW4gYmUgZm91bmQgaGVyZVxuICogaHR0cHM6Ly9naXRodWIuY29tL2NhdGJlcnJ5L2NhdGJlcnJ5L2Jsb2IvbWFzdGVyL2RvY3MvaW5kZXgubWQjY2F0LWNvbXBvbmVudHNcbiAqL1xuXG4vKipcbiAqIENyZWF0ZXMgbmV3IGluc3RhbmNlIG9mIFwiaGVsbG8td29ybGRcIiBjb21wb25lbnQuXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gSGVsbG9Xb3JsZCgpIHtcblxufVxuXG4vKipcbiAqIEdldHMgZGF0YSBmb3IgdGVtcGxhdGUuXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxPYmplY3Q+fSBQcm9taXNlIGZvciBkYXRhLlxuICovXG5IZWxsb1dvcmxkLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG5cdHJldHVybiB0aGlzLiRjb250ZXh0LmdldFN0b3JlRGF0YSgpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBNYWluO1xuXG4vKlxuICogVGhpcyBpcyBhIENhdGJlcnJ5IFN0b3JlIGZpbGUuXG4gKiBNb3JlIGRldGFpbHMgY2FuIGJlIGZvdW5kIGhlcmVcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9jYXRiZXJyeS9jYXRiZXJyeS9ibG9iL21hc3Rlci9kb2NzL2luZGV4Lm1kI3N0b3Jlc1xuICovXG5cbi8qKlxuICogQ3JlYXRlcyBuZXcgaW5zdGFuY2Ugb2YgXCJNYWluXCIgc3RvcmUuXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gTWFpbigpIHtcblxufVxuXG4vKipcbiAqIExvYWRzIGRhdGEgZnJvbSBzb21ld2hlcmUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBEYXRhIG9iamVjdC5cbiAqL1xuTWFpbi5wcm90b3R5cGUubG9hZCA9IGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuIHt3aG86ICdXb3JsZCd9O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBQYWdlcztcblxuLypcbiAqIFRoaXMgaXMgYSBDYXRiZXJyeSBTdG9yZSBmaWxlLlxuICogTW9yZSBkZXRhaWxzIGNhbiBiZSBmb3VuZCBoZXJlXG4gKiBodHRwczovL2dpdGh1Yi5jb20vY2F0YmVycnkvY2F0YmVycnkvYmxvYi9tYXN0ZXIvZG9jcy9pbmRleC5tZCNzdG9yZXNcbiAqL1xuXG52YXIgQUxMT1dFRF9QQUdFUyA9IHtcblx0XHRob21lOiB0cnVlLFxuXHRcdG92ZXJ2aWV3OiB0cnVlLFxuXHRcdGRvY3VtZW50YXRpb246IHRydWVcblx0fSxcblx0REVGQVVMVF9QQUdFID0gJ2hvbWUnO1xuXG52YXIgUEFHRVMgPSB7XG5cdGhvbWU6ICdIb21lIFBhZ2UnLFxuXHRhYm91dDogJ0Fib3V0IENhdGJlcnJ5IEZyYW1ld29yaycsXG5cdGNvbW1pdHM6ICdDb21taXRzIHRvIENhdGJlcnJ5IEZyYW1ld29yayByZXBvc2l0b3J5Jyxcblx0c2VhcmNoOiAnU2VhcmNoIGluIENhdGJlcnJ5XFwncyBjb2RlJ1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIG5ldyBpbnN0YW5jZSBvZiB0aGUgXCJQYWdlc1wiIHN0b3JlLlxuICogQHBhcmFtIHtPYmplY3R9ICRjb25maWcgQXBwbGljYXRpb24gY29uZmlnLlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIFBhZ2VzKCRjb25maWcpIHtcblx0dGhpcy5fY29uZmlnID0gJGNvbmZpZztcbn1cblxuLyoqXG4gKiBDdXJyZW50IGFwcGxpY2F0aW9uIGNvbmZpZy5cbiAqIEB0eXBlIHtPYmplY3R9XG4gKiBAcHJpdmF0ZVxuICovXG5QYWdlcy5wcm90b3R5cGUuX2NvbmZpZyA9IG51bGw7XG5cbi8qKlxuICogQ3VycmVudCBsaWZldGltZSBvZiBkYXRhIChpbiBtaWxsaXNlY29uZHMpIHRoYXQgaXMgcmV0dXJuZWQgYnkgdGhpcyBzdG9yZS5cbiAqIEB0eXBlIHtudW1iZXJ9IExpZmV0aW1lIGluIG1pbGxpc2Vjb25kcy5cbiAqL1xuUGFnZXMucHJvdG90eXBlLiRsaWZldGltZSA9IDYwMDAwO1xuLy8gUGFnZXMucHJvdG90eXBlLiRsaWZldGltZSA9IDM2MDAwMDA7XG5cbi8qKlxuICogTG9hZHMgZGF0YSBmcm9tIHJlbW90ZSBzb3VyY2UuXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxPYmplY3Q+fE9iamVjdHxudWxsfHVuZGVmaW5lZH0gTG9hZGVkIGRhdGEuXG4gKi9cblBhZ2VzLnByb3RvdHlwZS5sb2FkID0gZnVuY3Rpb24gKCkge1xuXHR2YXIgY3VycmVudFBhZ2UgPSB0aGlzLiRjb250ZXh0LnN0YXRlLnBhZ2U7XG5cdGlmICghY3VycmVudFBhZ2UpIHtcblx0XHRjdXJyZW50UGFnZSA9IERFRkFVTFRfUEFHRTtcblx0XHQvLyByZXR1cm4gdGhpcy4kY29udGV4dC5yZWRpcmVjdCgnL2Fib3V0Jyk7XG5cdH1cblx0Y3VycmVudFBhZ2UgPSBjdXJyZW50UGFnZS50b0xvd2VyQ2FzZSgpO1xuXHRpZiAoIUFMTE9XRURfUEFHRVMuaGFzT3duUHJvcGVydHkoY3VycmVudFBhZ2UpKSB7XG5cdFx0Y3VycmVudFBhZ2UgPSBERUZBVUxUX1BBR0U7XG5cdH1cblx0aWYgKCFQQUdFUy5oYXNPd25Qcm9wZXJ0eShjdXJyZW50UGFnZSkpIHtcblx0XHRjdXJyZW50UGFnZSA9IERFRkFVTFRfUEFHRTtcblx0XHQvLyB0aHJvdyBuZXcgRXJyb3IoY3VycmVudFBhZ2UgKyAnIHBhZ2Ugbm90IGZvdW5kJyk7XG5cdH1cblx0dmFyIHJlc3VsdCA9IHtcblx0XHR0aXRsZTogdGhpcy5fY29uZmlnLnRpdGxlLFxuXHRcdHN1YnRpdGxlOiBQQUdFU1tjdXJyZW50UGFnZV0sXG5cdFx0Y3VycmVudDogY3VycmVudFBhZ2UsXG5cdFx0aXNBY3RpdmU6IHt9XG5cdH07XG5cdE9iamVjdC5rZXlzKFBBR0VTKVxuXHRcdC5mb3JFYWNoKGZ1bmN0aW9uIChwYWdlKSB7XG5cdFx0XHRyZXN1bHQuaXNBY3RpdmVbcGFnZV0gPSAoY3VycmVudFBhZ2UgPT09IHBhZ2UpO1xuXHRcdH0pO1xuXG5cdHJldHVybiByZXN1bHQ7XG59O1xuIiwibW9kdWxlLmV4cG9ydHM9e1xuXHRcInRpdGxlXCI6IFwiQ2F0YmVycnkgUHJvamVjdFwiLFxuICBcImdpdEh1YkNsaWVudFwiOiB7XG4gICAgXCJob3N0XCI6IFwiaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbVwiLFxuICAgIFwiYWNjZXNzVG9rZW5cIjogXCJ5b3VyIHNlY3JldCB0b2tlbiBoZXJlXCJcbiAgfSxcbiAgXCJsMTBuXCI6IHtcbiAgICBcImRlZmF1bHRMb2NhbGVcIjogXCJydVwiLFxuICAgIFwiY29va2llXCI6IHtcbiAgICAgIFwicGF0aFwiOiBcIi9cIlxuICAgIH1cbiAgfSxcbiAgXCJnb29nbGVBbmFseXRpY3NcIjoge1xuICAgIFwiaWRcIjogXCJVQS1YWFhYWFhYWC1YXCJcbiAgfSxcbiAgXCJzZXJ2ZXJcIjoge1xuICAgIFwicG9ydFwiOiAzMDAwXG4gIH0sXG4gIFwiYXNzZXRzXCI6IHtcbiAgICBcIndhdGNoSW50ZXJ2YWxcIjogMFxuICB9LFxuICBcImNvbXBvbmVudHNHbG9iXCI6IFwiY2F0YmVycnlfY29tcG9uZW50cy8qKi9jYXQtY29tcG9uZW50Lmpzb25cIixcbiAgXCJpc1JlbGVhc2VcIjogdHJ1ZVxufVxuIiwiLypcbiAqIGNhdGJlcnJ5LWhvbWVwYWdlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE1IERlbmlzIFJlY2hrdW5vdiBhbmQgcHJvamVjdCBjb250cmlidXRvcnMuXG4gKlxuICogY2F0YmVycnktaG9tZXBhZ2UncyBsaWNlbnNlIGZvbGxvd3M6XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb25cbiAqIG9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uXG4gKiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sXG4gKiBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLFxuICogcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSxcbiAqIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4gKiBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuICogaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuICogT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKlxuICogVGhpcyBsaWNlbnNlIGFwcGxpZXMgdG8gYWxsIHBhcnRzIG9mIGNhdGJlcnJ5LWhvbWVwYWdlIHRoYXQgYXJlIG5vdFxuICogZXh0ZXJuYWxseSBtYWludGFpbmVkIGxpYnJhcmllcy5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50QmFzZTtcblxudmFyIGwxMG5IZWxwZXIgPSByZXF1aXJlKCcuL2hlbHBlcnMvbDEwbkhlbHBlcicpO1xuXG4vKipcbiAqIENyZWF0ZXMgbmV3IGluc3RhbmNlIG9mIGJhc2ljIGNvbXBvbmVudC5cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBDb21wb25lbnRCYXNlKCkge1xuXG59XG5cbi8qKlxuICogR2V0cyBkYXRhIGNvbnRleHQgZm9yIHRlbXBsYXRlIGVuZ2luZS5cbiAqIFRoaXMgbWV0aG9kIGlzIG9wdGlvbmFsLlxuICogQHJldHVybnMge1Byb21pc2U8T2JqZWN0PnxPYmplY3R8bnVsbHx1bmRlZmluZWR9IERhdGEgY29udGV4dFxuICogZm9yIHRlbXBsYXRlIGVuZ2luZS5cbiAqL1xuQ29tcG9uZW50QmFzZS5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuXHRyZXR1cm4gdGhpcy5sb2NhbGl6ZUNvbnRleHQoKTtcbn07XG5cbi8qKlxuICogQWRkcyBsb2NhbGUgdG8gYW55IGRhdGEgb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3Q/fSBkYXRhIE9wdGlvbmFsIGRhdGEgb2JqZWN0LlxuICogQHJldHVybnMge09iamVjdH0gRGF0YSBvYmplY3Qgd2l0aCBsb2NhbGUuXG4gKi9cbkNvbXBvbmVudEJhc2UucHJvdG90eXBlLmxvY2FsaXplQ29udGV4dCA9IGZ1bmN0aW9uIChkYXRhKSB7XG5cdGRhdGEgPSBkYXRhIHx8IHt9O1xuICBkYXRhLmlzTW9iaWxlID0gZmFsc2U7XG4gIGRhdGEuaXNBbmRyb2lkID0gZmFsc2U7XG4gIGRhdGEuaXNJcGhvbmUgPSBmYWxzZTtcblx0ZGF0YS5sb2NhbGUgPSBsMTBuSGVscGVyLmdldEN1cnJlbnRMb2NhbGUodGhpcy4kY29udGV4dCk7XG5cdHJldHVybiBkYXRhO1xufTtcblxuLyoqXG4gKiBCaW5kcyBldmVudHMuXG4gKi9cbkNvbXBvbmVudEJhc2UucHJvdG90eXBlLmJpbmQgPSBmdW5jdGlvbiAoKSB7XG5cdHZhciBsb2FkZXJzID0gdGhpcy4kY29udGV4dC5lbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2Rpdi5sb2FkZXInKTtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGxvYWRlcnMubGVuZ3RoOyBpKyspIHtcblx0XHRsb2FkZXJzW2ldLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cdH1cbn07IiwiLypcbiAqIGNhdGJlcnJ5LWhvbWVwYWdlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE1IERlbmlzIFJlY2hrdW5vdiBhbmQgcHJvamVjdCBjb250cmlidXRvcnMuXG4gKlxuICogY2F0YmVycnktaG9tZXBhZ2UncyBsaWNlbnNlIGZvbGxvd3M6XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb25cbiAqIG9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uXG4gKiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sXG4gKiBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLFxuICogcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSxcbiAqIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4gKiBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuICogaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuICogT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKlxuICogVGhpcyBsaWNlbnNlIGFwcGxpZXMgdG8gYWxsIHBhcnRzIG9mIGNhdGJlcnJ5LWhvbWVwYWdlIHRoYXQgYXJlIG5vdFxuICogZXh0ZXJuYWxseSBtYWludGFpbmVkIGxpYnJhcmllcy5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBsMTBuID0gbnVsbDtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cblx0LyoqXG5cdCAqIEdldHMgbG9jYWxpemF0aW9uIHByb3ZpZGVyLlxuXHQgKiBAcGFyYW0ge09iamVjdH0gY29udGV4dFxuXHQgKiBAcmV0dXJucyB7TG9jYWxpemF0aW9uUHJvdmlkZXJ9XG5cdCAqL1xuXHRnZXRMb2NhbGl6YXRpb25Qcm92aWRlcjogZnVuY3Rpb24gKGNvbnRleHQpIHtcblx0XHRsMTBuID0gbDEwbiB8fCBjb250ZXh0LmxvY2F0b3IucmVzb2x2ZSgnbG9jYWxpemF0aW9uUHJvdmlkZXInKTtcblx0XHRyZXR1cm4gbDEwbjtcblx0fSxcblxuXHQvKipcblx0ICogR2V0cyBjdXJyZW50IGxvY2FsZS5cblx0ICogQHBhcmFtIHtPYmplY3R9IGNvbnRleHRcblx0ICogQHJldHVybnMge3N0cmluZ31cblx0ICovXG5cdGdldEN1cnJlbnRMb2NhbGU6IGZ1bmN0aW9uIChjb250ZXh0KSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0TG9jYWxpemF0aW9uUHJvdmlkZXIoY29udGV4dClcblx0XHRcdC5nZXRDdXJyZW50TG9jYWxlKGNvbnRleHQpO1xuXHR9XG59OyIsIi8qXG4gKiBjYXRiZXJyeS1oYW5kbGViYXJzXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE1IERlbmlzIFJlY2hrdW5vdiBhbmQgcHJvamVjdCBjb250cmlidXRvcnMuXG4gKlxuICogY2F0YmVycnktaGFuZGxlYmFycydzIGxpY2Vuc2UgZm9sbG93czpcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvblxuICogb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb25cbiAqIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbixcbiAqIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsXG4gKiBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLFxuICogYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbiAqIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4gKiBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4gKiBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqXG4gKiBUaGlzIGxpY2Vuc2UgYXBwbGllcyB0byBhbGwgcGFydHMgb2YgY2F0YmVycnktaGFuZGxlYmFycyB0aGF0IGFyZSBub3QgZXh0ZXJuYWxseVxuICogbWFpbnRhaW5lZCBsaWJyYXJpZXMuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRlbXBsYXRlUHJvdmlkZXI7XG5cbi8qKlxuICogQ3JlYXRlcyBuZXcgaW5zdGFuY2Ugb2YgSGFuZGxlYmFycyB0ZW1wbGF0ZSBwcm92aWRlci5cbiAqIEBwYXJhbSB7SGFuZGxlYmFyc30gJGhhbmRsZWJhcnMgSGFuZGxlYmFycyBmYWN0b3J5LlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIFRlbXBsYXRlUHJvdmlkZXIoJGhhbmRsZWJhcnMpIHtcblx0dGhpcy5faGFuZGxlYmFycyA9ICRoYW5kbGViYXJzO1xuXHR0aGlzLl90ZW1wbGF0ZXMgPSB7fTtcbn1cblxuLyoqXG4gKiBDdXJyZW50IEhhbmRsZWJhcnMgZmFjdG9yeS5cbiAqIEB0eXBlIHtIYW5kbGViYXJzfVxuICogQHByaXZhdGVcbiAqL1xuVGVtcGxhdGVQcm92aWRlci5wcm90b3R5cGUuX2hhbmRsZWJhcnMgPSBudWxsO1xuXG4vKipcbiAqIEN1cnJlbnQgc2V0IG9mIHJlZ2lzdGVyZWQgdGVtcGxhdGVzLlxuICogQHR5cGUge09iamVjdH1cbiAqIEBwcml2YXRlXG4gKi9cblRlbXBsYXRlUHJvdmlkZXIucHJvdG90eXBlLl90ZW1wbGF0ZXMgPSBudWxsO1xuXG4vKipcbiAqIFJlZ2lzdGVycyBjb21waWxlZCAocHJlY29tcGlsZWQpIEhhbmRsZWJhcnMgdGVtcGxhdGUuXG4gKiBodHRwOi8vaGFuZGxlYmFyc2pzLmNvbS9yZWZlcmVuY2UuaHRtbFxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgVGVtcGxhdGUgbmFtZS5cbiAqIEBwYXJhbSB7U3RyaW5nfSBjb21waWxlZCBDb21waWxlZCB0ZW1wbGF0ZSBzb3VyY2UuXG4gKi9cblRlbXBsYXRlUHJvdmlkZXIucHJvdG90eXBlLnJlZ2lzdGVyQ29tcGlsZWQgPSBmdW5jdGlvbiAobmFtZSwgY29tcGlsZWQpIHtcblx0Ly8ganNoaW50IGV2aWw6dHJ1ZVxuXHR2YXIgc3BlY3MgPSBuZXcgRnVuY3Rpb24oJ3JldHVybiAnICsgY29tcGlsZWQgKyAnOycpO1xuXHR0aGlzLl90ZW1wbGF0ZXNbbmFtZV0gPSB0aGlzLl9oYW5kbGViYXJzLnRlbXBsYXRlKHNwZWNzKCkpO1xufTtcblxuLyoqXG4gKiBSZW5kZXJzIHRlbXBsYXRlIHdpdGggc3BlY2lmaWVkIGRhdGEuXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBOYW1lIG9mIHRlbXBsYXRlLlxuICogQHBhcmFtIHtPYmplY3R9IGRhdGEgRGF0YSBjb250ZXh0IGZvciB0ZW1wbGF0ZS5cbiAqIEByZXR1cm5zIHsqfVxuICovXG5UZW1wbGF0ZVByb3ZpZGVyLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAobmFtZSwgZGF0YSkge1xuXHRpZiAoIXRoaXMuX3RlbXBsYXRlcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuXHRcdHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoJ05vIHN1Y2ggdGVtcGxhdGUnKSk7XG5cdH1cblxuXHR2YXIgcHJvbWlzZTtcblx0dHJ5IHtcblx0XHRwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKHRoaXMuX3RlbXBsYXRlc1tuYW1lXShkYXRhKSk7XG5cdH0gY2F0Y2goZSkge1xuXHRcdHByb21pc2UgPSBQcm9taXNlLnJlamVjdChlKTtcblx0fVxuXHRyZXR1cm4gcHJvbWlzZTtcbn07IiwiLyohXG5cbiBoYW5kbGViYXJzIHYyLjAuMFxuXG5Db3B5cmlnaHQgKEMpIDIwMTEtMjAxNCBieSBZZWh1ZGEgS2F0elxuXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG5vZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG5pbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG50byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG5jb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbmZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG5hbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG5GSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG5PVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG5USEUgU09GVFdBUkUuXG5cbkBsaWNlbnNlXG4qL1xuLyogZXhwb3J0ZWQgSGFuZGxlYmFycyAqL1xuKGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG4gIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICBkZWZpbmUoW10sIGZhY3RvcnkpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuICB9IGVsc2Uge1xuICAgIHJvb3QuSGFuZGxlYmFycyA9IHJvb3QuSGFuZGxlYmFycyB8fCBmYWN0b3J5KCk7XG4gIH1cbn0odGhpcywgZnVuY3Rpb24gKCkge1xuLy8gaGFuZGxlYmFycy9zYWZlLXN0cmluZy5qc1xudmFyIF9fbW9kdWxlM19fID0gKGZ1bmN0aW9uKCkge1xuICBcInVzZSBzdHJpY3RcIjtcbiAgdmFyIF9fZXhwb3J0c19fO1xuICAvLyBCdWlsZCBvdXQgb3VyIGJhc2ljIFNhZmVTdHJpbmcgdHlwZVxuICBmdW5jdGlvbiBTYWZlU3RyaW5nKHN0cmluZykge1xuICAgIHRoaXMuc3RyaW5nID0gc3RyaW5nO1xuICB9XG5cbiAgU2FmZVN0cmluZy5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gXCJcIiArIHRoaXMuc3RyaW5nO1xuICB9O1xuXG4gIF9fZXhwb3J0c19fID0gU2FmZVN0cmluZztcbiAgcmV0dXJuIF9fZXhwb3J0c19fO1xufSkoKTtcblxuLy8gaGFuZGxlYmFycy91dGlscy5qc1xudmFyIF9fbW9kdWxlMl9fID0gKGZ1bmN0aW9uKF9fZGVwZW5kZW5jeTFfXykge1xuICBcInVzZSBzdHJpY3RcIjtcbiAgdmFyIF9fZXhwb3J0c19fID0ge307XG4gIC8qanNoaW50IC1XMDA0ICovXG4gIHZhciBTYWZlU3RyaW5nID0gX19kZXBlbmRlbmN5MV9fO1xuXG4gIHZhciBlc2NhcGUgPSB7XG4gICAgXCImXCI6IFwiJmFtcDtcIixcbiAgICBcIjxcIjogXCImbHQ7XCIsXG4gICAgXCI+XCI6IFwiJmd0O1wiLFxuICAgICdcIic6IFwiJnF1b3Q7XCIsXG4gICAgXCInXCI6IFwiJiN4Mjc7XCIsXG4gICAgXCJgXCI6IFwiJiN4NjA7XCJcbiAgfTtcblxuICB2YXIgYmFkQ2hhcnMgPSAvWyY8PlwiJ2BdL2c7XG4gIHZhciBwb3NzaWJsZSA9IC9bJjw+XCInYF0vO1xuXG4gIGZ1bmN0aW9uIGVzY2FwZUNoYXIoY2hyKSB7XG4gICAgcmV0dXJuIGVzY2FwZVtjaHJdO1xuICB9XG5cbiAgZnVuY3Rpb24gZXh0ZW5kKG9iaiAvKiAsIC4uLnNvdXJjZSAqLykge1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gYXJndW1lbnRzW2ldKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXJndW1lbnRzW2ldLCBrZXkpKSB7XG4gICAgICAgICAgb2JqW2tleV0gPSBhcmd1bWVudHNbaV1ba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICBfX2V4cG9ydHNfXy5leHRlbmQgPSBleHRlbmQ7dmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbiAgX19leHBvcnRzX18udG9TdHJpbmcgPSB0b1N0cmluZztcbiAgLy8gU291cmNlZCBmcm9tIGxvZGFzaFxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vYmVzdGllanMvbG9kYXNoL2Jsb2IvbWFzdGVyL0xJQ0VOU0UudHh0XG4gIHZhciBpc0Z1bmN0aW9uID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nO1xuICB9O1xuICAvLyBmYWxsYmFjayBmb3Igb2xkZXIgdmVyc2lvbnMgb2YgQ2hyb21lIGFuZCBTYWZhcmlcbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgaWYgKGlzRnVuY3Rpb24oL3gvKSkge1xuICAgIGlzRnVuY3Rpb24gPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbiAgICB9O1xuICB9XG4gIHZhciBpc0Z1bmN0aW9uO1xuICBfX2V4cG9ydHNfXy5pc0Z1bmN0aW9uID0gaXNGdW5jdGlvbjtcbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgdmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSA/IHRvU3RyaW5nLmNhbGwodmFsdWUpID09PSAnW29iamVjdCBBcnJheV0nIDogZmFsc2U7XG4gIH07XG4gIF9fZXhwb3J0c19fLmlzQXJyYXkgPSBpc0FycmF5O1xuXG4gIGZ1bmN0aW9uIGVzY2FwZUV4cHJlc3Npb24oc3RyaW5nKSB7XG4gICAgLy8gZG9uJ3QgZXNjYXBlIFNhZmVTdHJpbmdzLCBzaW5jZSB0aGV5J3JlIGFscmVhZHkgc2FmZVxuICAgIGlmIChzdHJpbmcgaW5zdGFuY2VvZiBTYWZlU3RyaW5nKSB7XG4gICAgICByZXR1cm4gc3RyaW5nLnRvU3RyaW5nKCk7XG4gICAgfSBlbHNlIGlmIChzdHJpbmcgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfSBlbHNlIGlmICghc3RyaW5nKSB7XG4gICAgICByZXR1cm4gc3RyaW5nICsgJyc7XG4gICAgfVxuXG4gICAgLy8gRm9yY2UgYSBzdHJpbmcgY29udmVyc2lvbiBhcyB0aGlzIHdpbGwgYmUgZG9uZSBieSB0aGUgYXBwZW5kIHJlZ2FyZGxlc3MgYW5kXG4gICAgLy8gdGhlIHJlZ2V4IHRlc3Qgd2lsbCBkbyB0aGlzIHRyYW5zcGFyZW50bHkgYmVoaW5kIHRoZSBzY2VuZXMsIGNhdXNpbmcgaXNzdWVzIGlmXG4gICAgLy8gYW4gb2JqZWN0J3MgdG8gc3RyaW5nIGhhcyBlc2NhcGVkIGNoYXJhY3RlcnMgaW4gaXQuXG4gICAgc3RyaW5nID0gXCJcIiArIHN0cmluZztcblxuICAgIGlmKCFwb3NzaWJsZS50ZXN0KHN0cmluZykpIHsgcmV0dXJuIHN0cmluZzsgfVxuICAgIHJldHVybiBzdHJpbmcucmVwbGFjZShiYWRDaGFycywgZXNjYXBlQ2hhcik7XG4gIH1cblxuICBfX2V4cG9ydHNfXy5lc2NhcGVFeHByZXNzaW9uID0gZXNjYXBlRXhwcmVzc2lvbjtmdW5jdGlvbiBpc0VtcHR5KHZhbHVlKSB7XG4gICAgaWYgKCF2YWx1ZSAmJiB2YWx1ZSAhPT0gMCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIGlmIChpc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgX19leHBvcnRzX18uaXNFbXB0eSA9IGlzRW1wdHk7ZnVuY3Rpb24gYXBwZW5kQ29udGV4dFBhdGgoY29udGV4dFBhdGgsIGlkKSB7XG4gICAgcmV0dXJuIChjb250ZXh0UGF0aCA/IGNvbnRleHRQYXRoICsgJy4nIDogJycpICsgaWQ7XG4gIH1cblxuICBfX2V4cG9ydHNfXy5hcHBlbmRDb250ZXh0UGF0aCA9IGFwcGVuZENvbnRleHRQYXRoO1xuICByZXR1cm4gX19leHBvcnRzX187XG59KShfX21vZHVsZTNfXyk7XG5cbi8vIGhhbmRsZWJhcnMvZXhjZXB0aW9uLmpzXG52YXIgX19tb2R1bGU0X18gPSAoZnVuY3Rpb24oKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuICB2YXIgX19leHBvcnRzX187XG5cbiAgdmFyIGVycm9yUHJvcHMgPSBbJ2Rlc2NyaXB0aW9uJywgJ2ZpbGVOYW1lJywgJ2xpbmVOdW1iZXInLCAnbWVzc2FnZScsICduYW1lJywgJ251bWJlcicsICdzdGFjayddO1xuXG4gIGZ1bmN0aW9uIEV4Y2VwdGlvbihtZXNzYWdlLCBub2RlKSB7XG4gICAgdmFyIGxpbmU7XG4gICAgaWYgKG5vZGUgJiYgbm9kZS5maXJzdExpbmUpIHtcbiAgICAgIGxpbmUgPSBub2RlLmZpcnN0TGluZTtcblxuICAgICAgbWVzc2FnZSArPSAnIC0gJyArIGxpbmUgKyAnOicgKyBub2RlLmZpcnN0Q29sdW1uO1xuICAgIH1cblxuICAgIHZhciB0bXAgPSBFcnJvci5wcm90b3R5cGUuY29uc3RydWN0b3IuY2FsbCh0aGlzLCBtZXNzYWdlKTtcblxuICAgIC8vIFVuZm9ydHVuYXRlbHkgZXJyb3JzIGFyZSBub3QgZW51bWVyYWJsZSBpbiBDaHJvbWUgKGF0IGxlYXN0KSwgc28gYGZvciBwcm9wIGluIHRtcGAgZG9lc24ndCB3b3JrLlxuICAgIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IGVycm9yUHJvcHMubGVuZ3RoOyBpZHgrKykge1xuICAgICAgdGhpc1tlcnJvclByb3BzW2lkeF1dID0gdG1wW2Vycm9yUHJvcHNbaWR4XV07XG4gICAgfVxuXG4gICAgaWYgKGxpbmUpIHtcbiAgICAgIHRoaXMubGluZU51bWJlciA9IGxpbmU7XG4gICAgICB0aGlzLmNvbHVtbiA9IG5vZGUuZmlyc3RDb2x1bW47XG4gICAgfVxuICB9XG5cbiAgRXhjZXB0aW9uLnByb3RvdHlwZSA9IG5ldyBFcnJvcigpO1xuXG4gIF9fZXhwb3J0c19fID0gRXhjZXB0aW9uO1xuICByZXR1cm4gX19leHBvcnRzX187XG59KSgpO1xuXG4vLyBoYW5kbGViYXJzL2Jhc2UuanNcbnZhciBfX21vZHVsZTFfXyA9IChmdW5jdGlvbihfX2RlcGVuZGVuY3kxX18sIF9fZGVwZW5kZW5jeTJfXykge1xuICBcInVzZSBzdHJpY3RcIjtcbiAgdmFyIF9fZXhwb3J0c19fID0ge307XG4gIHZhciBVdGlscyA9IF9fZGVwZW5kZW5jeTFfXztcbiAgdmFyIEV4Y2VwdGlvbiA9IF9fZGVwZW5kZW5jeTJfXztcblxuICB2YXIgVkVSU0lPTiA9IFwiMi4wLjBcIjtcbiAgX19leHBvcnRzX18uVkVSU0lPTiA9IFZFUlNJT047dmFyIENPTVBJTEVSX1JFVklTSU9OID0gNjtcbiAgX19leHBvcnRzX18uQ09NUElMRVJfUkVWSVNJT04gPSBDT01QSUxFUl9SRVZJU0lPTjtcbiAgdmFyIFJFVklTSU9OX0NIQU5HRVMgPSB7XG4gICAgMTogJzw9IDEuMC5yYy4yJywgLy8gMS4wLnJjLjIgaXMgYWN0dWFsbHkgcmV2MiBidXQgZG9lc24ndCByZXBvcnQgaXRcbiAgICAyOiAnPT0gMS4wLjAtcmMuMycsXG4gICAgMzogJz09IDEuMC4wLXJjLjQnLFxuICAgIDQ6ICc9PSAxLngueCcsXG4gICAgNTogJz09IDIuMC4wLWFscGhhLngnLFxuICAgIDY6ICc+PSAyLjAuMC1iZXRhLjEnXG4gIH07XG4gIF9fZXhwb3J0c19fLlJFVklTSU9OX0NIQU5HRVMgPSBSRVZJU0lPTl9DSEFOR0VTO1xuICB2YXIgaXNBcnJheSA9IFV0aWxzLmlzQXJyYXksXG4gICAgICBpc0Z1bmN0aW9uID0gVXRpbHMuaXNGdW5jdGlvbixcbiAgICAgIHRvU3RyaW5nID0gVXRpbHMudG9TdHJpbmcsXG4gICAgICBvYmplY3RUeXBlID0gJ1tvYmplY3QgT2JqZWN0XSc7XG5cbiAgZnVuY3Rpb24gSGFuZGxlYmFyc0Vudmlyb25tZW50KGhlbHBlcnMsIHBhcnRpYWxzKSB7XG4gICAgdGhpcy5oZWxwZXJzID0gaGVscGVycyB8fCB7fTtcbiAgICB0aGlzLnBhcnRpYWxzID0gcGFydGlhbHMgfHwge307XG5cbiAgICByZWdpc3RlckRlZmF1bHRIZWxwZXJzKHRoaXMpO1xuICB9XG5cbiAgX19leHBvcnRzX18uSGFuZGxlYmFyc0Vudmlyb25tZW50ID0gSGFuZGxlYmFyc0Vudmlyb25tZW50O0hhbmRsZWJhcnNFbnZpcm9ubWVudC5wcm90b3R5cGUgPSB7XG4gICAgY29uc3RydWN0b3I6IEhhbmRsZWJhcnNFbnZpcm9ubWVudCxcblxuICAgIGxvZ2dlcjogbG9nZ2VyLFxuICAgIGxvZzogbG9nLFxuXG4gICAgcmVnaXN0ZXJIZWxwZXI6IGZ1bmN0aW9uKG5hbWUsIGZuKSB7XG4gICAgICBpZiAodG9TdHJpbmcuY2FsbChuYW1lKSA9PT0gb2JqZWN0VHlwZSkge1xuICAgICAgICBpZiAoZm4pIHsgdGhyb3cgbmV3IEV4Y2VwdGlvbignQXJnIG5vdCBzdXBwb3J0ZWQgd2l0aCBtdWx0aXBsZSBoZWxwZXJzJyk7IH1cbiAgICAgICAgVXRpbHMuZXh0ZW5kKHRoaXMuaGVscGVycywgbmFtZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmhlbHBlcnNbbmFtZV0gPSBmbjtcbiAgICAgIH1cbiAgICB9LFxuICAgIHVucmVnaXN0ZXJIZWxwZXI6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIGRlbGV0ZSB0aGlzLmhlbHBlcnNbbmFtZV07XG4gICAgfSxcblxuICAgIHJlZ2lzdGVyUGFydGlhbDogZnVuY3Rpb24obmFtZSwgcGFydGlhbCkge1xuICAgICAgaWYgKHRvU3RyaW5nLmNhbGwobmFtZSkgPT09IG9iamVjdFR5cGUpIHtcbiAgICAgICAgVXRpbHMuZXh0ZW5kKHRoaXMucGFydGlhbHMsICBuYW1lKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucGFydGlhbHNbbmFtZV0gPSBwYXJ0aWFsO1xuICAgICAgfVxuICAgIH0sXG4gICAgdW5yZWdpc3RlclBhcnRpYWw6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIGRlbGV0ZSB0aGlzLnBhcnRpYWxzW25hbWVdO1xuICAgIH1cbiAgfTtcblxuICBmdW5jdGlvbiByZWdpc3RlckRlZmF1bHRIZWxwZXJzKGluc3RhbmNlKSB7XG4gICAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ2hlbHBlck1pc3NpbmcnLCBmdW5jdGlvbigvKiBbYXJncywgXW9wdGlvbnMgKi8pIHtcbiAgICAgIGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgLy8gQSBtaXNzaW5nIGZpZWxkIGluIGEge3tmb299fSBjb25zdHVjdC5cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFNvbWVvbmUgaXMgYWN0dWFsbHkgdHJ5aW5nIHRvIGNhbGwgc29tZXRoaW5nLCBibG93IHVwLlxuICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKFwiTWlzc2luZyBoZWxwZXI6ICdcIiArIGFyZ3VtZW50c1thcmd1bWVudHMubGVuZ3RoLTFdLm5hbWUgKyBcIidcIik7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignYmxvY2tIZWxwZXJNaXNzaW5nJywgZnVuY3Rpb24oY29udGV4dCwgb3B0aW9ucykge1xuICAgICAgdmFyIGludmVyc2UgPSBvcHRpb25zLmludmVyc2UsXG4gICAgICAgICAgZm4gPSBvcHRpb25zLmZuO1xuXG4gICAgICBpZihjb250ZXh0ID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiBmbih0aGlzKTtcbiAgICAgIH0gZWxzZSBpZihjb250ZXh0ID09PSBmYWxzZSB8fCBjb250ZXh0ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGludmVyc2UodGhpcyk7XG4gICAgICB9IGVsc2UgaWYgKGlzQXJyYXkoY29udGV4dCkpIHtcbiAgICAgICAgaWYoY29udGV4dC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgaWYgKG9wdGlvbnMuaWRzKSB7XG4gICAgICAgICAgICBvcHRpb25zLmlkcyA9IFtvcHRpb25zLm5hbWVdO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBpbnN0YW5jZS5oZWxwZXJzLmVhY2goY29udGV4dCwgb3B0aW9ucyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGludmVyc2UodGhpcyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChvcHRpb25zLmRhdGEgJiYgb3B0aW9ucy5pZHMpIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IGNyZWF0ZUZyYW1lKG9wdGlvbnMuZGF0YSk7XG4gICAgICAgICAgZGF0YS5jb250ZXh0UGF0aCA9IFV0aWxzLmFwcGVuZENvbnRleHRQYXRoKG9wdGlvbnMuZGF0YS5jb250ZXh0UGF0aCwgb3B0aW9ucy5uYW1lKTtcbiAgICAgICAgICBvcHRpb25zID0ge2RhdGE6IGRhdGF9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZuKGNvbnRleHQsIG9wdGlvbnMpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ2VhY2gnLCBmdW5jdGlvbihjb250ZXh0LCBvcHRpb25zKSB7XG4gICAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignTXVzdCBwYXNzIGl0ZXJhdG9yIHRvICNlYWNoJyk7XG4gICAgICB9XG5cbiAgICAgIHZhciBmbiA9IG9wdGlvbnMuZm4sIGludmVyc2UgPSBvcHRpb25zLmludmVyc2U7XG4gICAgICB2YXIgaSA9IDAsIHJldCA9IFwiXCIsIGRhdGE7XG5cbiAgICAgIHZhciBjb250ZXh0UGF0aDtcbiAgICAgIGlmIChvcHRpb25zLmRhdGEgJiYgb3B0aW9ucy5pZHMpIHtcbiAgICAgICAgY29udGV4dFBhdGggPSBVdGlscy5hcHBlbmRDb250ZXh0UGF0aChvcHRpb25zLmRhdGEuY29udGV4dFBhdGgsIG9wdGlvbnMuaWRzWzBdKSArICcuJztcbiAgICAgIH1cblxuICAgICAgaWYgKGlzRnVuY3Rpb24oY29udGV4dCkpIHsgY29udGV4dCA9IGNvbnRleHQuY2FsbCh0aGlzKTsgfVxuXG4gICAgICBpZiAob3B0aW9ucy5kYXRhKSB7XG4gICAgICAgIGRhdGEgPSBjcmVhdGVGcmFtZShvcHRpb25zLmRhdGEpO1xuICAgICAgfVxuXG4gICAgICBpZihjb250ZXh0ICYmIHR5cGVvZiBjb250ZXh0ID09PSAnb2JqZWN0Jykge1xuICAgICAgICBpZiAoaXNBcnJheShjb250ZXh0KSkge1xuICAgICAgICAgIGZvcih2YXIgaiA9IGNvbnRleHQubGVuZ3RoOyBpPGo7IGkrKykge1xuICAgICAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgICAgZGF0YS5pbmRleCA9IGk7XG4gICAgICAgICAgICAgIGRhdGEuZmlyc3QgPSAoaSA9PT0gMCk7XG4gICAgICAgICAgICAgIGRhdGEubGFzdCAgPSAoaSA9PT0gKGNvbnRleHQubGVuZ3RoLTEpKTtcblxuICAgICAgICAgICAgICBpZiAoY29udGV4dFBhdGgpIHtcbiAgICAgICAgICAgICAgICBkYXRhLmNvbnRleHRQYXRoID0gY29udGV4dFBhdGggKyBpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXQgPSByZXQgKyBmbihjb250ZXh0W2ldLCB7IGRhdGE6IGRhdGEgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGZvcih2YXIga2V5IGluIGNvbnRleHQpIHtcbiAgICAgICAgICAgIGlmKGNvbnRleHQuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICBpZihkYXRhKSB7XG4gICAgICAgICAgICAgICAgZGF0YS5rZXkgPSBrZXk7XG4gICAgICAgICAgICAgICAgZGF0YS5pbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgZGF0YS5maXJzdCA9IChpID09PSAwKTtcblxuICAgICAgICAgICAgICAgIGlmIChjb250ZXh0UGF0aCkge1xuICAgICAgICAgICAgICAgICAgZGF0YS5jb250ZXh0UGF0aCA9IGNvbnRleHRQYXRoICsga2V5O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXQgPSByZXQgKyBmbihjb250ZXh0W2tleV0sIHtkYXRhOiBkYXRhfSk7XG4gICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYoaSA9PT0gMCl7XG4gICAgICAgIHJldCA9IGludmVyc2UodGhpcyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXQ7XG4gICAgfSk7XG5cbiAgICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignaWYnLCBmdW5jdGlvbihjb25kaXRpb25hbCwgb3B0aW9ucykge1xuICAgICAgaWYgKGlzRnVuY3Rpb24oY29uZGl0aW9uYWwpKSB7IGNvbmRpdGlvbmFsID0gY29uZGl0aW9uYWwuY2FsbCh0aGlzKTsgfVxuXG4gICAgICAvLyBEZWZhdWx0IGJlaGF2aW9yIGlzIHRvIHJlbmRlciB0aGUgcG9zaXRpdmUgcGF0aCBpZiB0aGUgdmFsdWUgaXMgdHJ1dGh5IGFuZCBub3QgZW1wdHkuXG4gICAgICAvLyBUaGUgYGluY2x1ZGVaZXJvYCBvcHRpb24gbWF5IGJlIHNldCB0byB0cmVhdCB0aGUgY29uZHRpb25hbCBhcyBwdXJlbHkgbm90IGVtcHR5IGJhc2VkIG9uIHRoZVxuICAgICAgLy8gYmVoYXZpb3Igb2YgaXNFbXB0eS4gRWZmZWN0aXZlbHkgdGhpcyBkZXRlcm1pbmVzIGlmIDAgaXMgaGFuZGxlZCBieSB0aGUgcG9zaXRpdmUgcGF0aCBvciBuZWdhdGl2ZS5cbiAgICAgIGlmICgoIW9wdGlvbnMuaGFzaC5pbmNsdWRlWmVybyAmJiAhY29uZGl0aW9uYWwpIHx8IFV0aWxzLmlzRW1wdHkoY29uZGl0aW9uYWwpKSB7XG4gICAgICAgIHJldHVybiBvcHRpb25zLmludmVyc2UodGhpcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gb3B0aW9ucy5mbih0aGlzKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCd1bmxlc3MnLCBmdW5jdGlvbihjb25kaXRpb25hbCwgb3B0aW9ucykge1xuICAgICAgcmV0dXJuIGluc3RhbmNlLmhlbHBlcnNbJ2lmJ10uY2FsbCh0aGlzLCBjb25kaXRpb25hbCwge2ZuOiBvcHRpb25zLmludmVyc2UsIGludmVyc2U6IG9wdGlvbnMuZm4sIGhhc2g6IG9wdGlvbnMuaGFzaH0pO1xuICAgIH0pO1xuXG4gICAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ3dpdGgnLCBmdW5jdGlvbihjb250ZXh0LCBvcHRpb25zKSB7XG4gICAgICBpZiAoaXNGdW5jdGlvbihjb250ZXh0KSkgeyBjb250ZXh0ID0gY29udGV4dC5jYWxsKHRoaXMpOyB9XG5cbiAgICAgIHZhciBmbiA9IG9wdGlvbnMuZm47XG5cbiAgICAgIGlmICghVXRpbHMuaXNFbXB0eShjb250ZXh0KSkge1xuICAgICAgICBpZiAob3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuaWRzKSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSBjcmVhdGVGcmFtZShvcHRpb25zLmRhdGEpO1xuICAgICAgICAgIGRhdGEuY29udGV4dFBhdGggPSBVdGlscy5hcHBlbmRDb250ZXh0UGF0aChvcHRpb25zLmRhdGEuY29udGV4dFBhdGgsIG9wdGlvbnMuaWRzWzBdKTtcbiAgICAgICAgICBvcHRpb25zID0ge2RhdGE6ZGF0YX07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZm4oY29udGV4dCwgb3B0aW9ucyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gb3B0aW9ucy5pbnZlcnNlKHRoaXMpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ2xvZycsIGZ1bmN0aW9uKG1lc3NhZ2UsIG9wdGlvbnMpIHtcbiAgICAgIHZhciBsZXZlbCA9IG9wdGlvbnMuZGF0YSAmJiBvcHRpb25zLmRhdGEubGV2ZWwgIT0gbnVsbCA/IHBhcnNlSW50KG9wdGlvbnMuZGF0YS5sZXZlbCwgMTApIDogMTtcbiAgICAgIGluc3RhbmNlLmxvZyhsZXZlbCwgbWVzc2FnZSk7XG4gICAgfSk7XG5cbiAgICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignbG9va3VwJywgZnVuY3Rpb24ob2JqLCBmaWVsZCkge1xuICAgICAgcmV0dXJuIG9iaiAmJiBvYmpbZmllbGRdO1xuICAgIH0pO1xuICB9XG5cbiAgdmFyIGxvZ2dlciA9IHtcbiAgICBtZXRob2RNYXA6IHsgMDogJ2RlYnVnJywgMTogJ2luZm8nLCAyOiAnd2FybicsIDM6ICdlcnJvcicgfSxcblxuICAgIC8vIFN0YXRlIGVudW1cbiAgICBERUJVRzogMCxcbiAgICBJTkZPOiAxLFxuICAgIFdBUk46IDIsXG4gICAgRVJST1I6IDMsXG4gICAgbGV2ZWw6IDMsXG5cbiAgICAvLyBjYW4gYmUgb3ZlcnJpZGRlbiBpbiB0aGUgaG9zdCBlbnZpcm9ubWVudFxuICAgIGxvZzogZnVuY3Rpb24obGV2ZWwsIG1lc3NhZ2UpIHtcbiAgICAgIGlmIChsb2dnZXIubGV2ZWwgPD0gbGV2ZWwpIHtcbiAgICAgICAgdmFyIG1ldGhvZCA9IGxvZ2dlci5tZXRob2RNYXBbbGV2ZWxdO1xuICAgICAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnICYmIGNvbnNvbGVbbWV0aG9kXSkge1xuICAgICAgICAgIGNvbnNvbGVbbWV0aG9kXS5jYWxsKGNvbnNvbGUsIG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuICBfX2V4cG9ydHNfXy5sb2dnZXIgPSBsb2dnZXI7XG4gIHZhciBsb2cgPSBsb2dnZXIubG9nO1xuICBfX2V4cG9ydHNfXy5sb2cgPSBsb2c7XG4gIHZhciBjcmVhdGVGcmFtZSA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHZhciBmcmFtZSA9IFV0aWxzLmV4dGVuZCh7fSwgb2JqZWN0KTtcbiAgICBmcmFtZS5fcGFyZW50ID0gb2JqZWN0O1xuICAgIHJldHVybiBmcmFtZTtcbiAgfTtcbiAgX19leHBvcnRzX18uY3JlYXRlRnJhbWUgPSBjcmVhdGVGcmFtZTtcbiAgcmV0dXJuIF9fZXhwb3J0c19fO1xufSkoX19tb2R1bGUyX18sIF9fbW9kdWxlNF9fKTtcblxuLy8gaGFuZGxlYmFycy9ydW50aW1lLmpzXG52YXIgX19tb2R1bGU1X18gPSAoZnVuY3Rpb24oX19kZXBlbmRlbmN5MV9fLCBfX2RlcGVuZGVuY3kyX18sIF9fZGVwZW5kZW5jeTNfXykge1xuICBcInVzZSBzdHJpY3RcIjtcbiAgdmFyIF9fZXhwb3J0c19fID0ge307XG4gIHZhciBVdGlscyA9IF9fZGVwZW5kZW5jeTFfXztcbiAgdmFyIEV4Y2VwdGlvbiA9IF9fZGVwZW5kZW5jeTJfXztcbiAgdmFyIENPTVBJTEVSX1JFVklTSU9OID0gX19kZXBlbmRlbmN5M19fLkNPTVBJTEVSX1JFVklTSU9OO1xuICB2YXIgUkVWSVNJT05fQ0hBTkdFUyA9IF9fZGVwZW5kZW5jeTNfXy5SRVZJU0lPTl9DSEFOR0VTO1xuICB2YXIgY3JlYXRlRnJhbWUgPSBfX2RlcGVuZGVuY3kzX18uY3JlYXRlRnJhbWU7XG5cbiAgZnVuY3Rpb24gY2hlY2tSZXZpc2lvbihjb21waWxlckluZm8pIHtcbiAgICB2YXIgY29tcGlsZXJSZXZpc2lvbiA9IGNvbXBpbGVySW5mbyAmJiBjb21waWxlckluZm9bMF0gfHwgMSxcbiAgICAgICAgY3VycmVudFJldmlzaW9uID0gQ09NUElMRVJfUkVWSVNJT047XG5cbiAgICBpZiAoY29tcGlsZXJSZXZpc2lvbiAhPT0gY3VycmVudFJldmlzaW9uKSB7XG4gICAgICBpZiAoY29tcGlsZXJSZXZpc2lvbiA8IGN1cnJlbnRSZXZpc2lvbikge1xuICAgICAgICB2YXIgcnVudGltZVZlcnNpb25zID0gUkVWSVNJT05fQ0hBTkdFU1tjdXJyZW50UmV2aXNpb25dLFxuICAgICAgICAgICAgY29tcGlsZXJWZXJzaW9ucyA9IFJFVklTSU9OX0NIQU5HRVNbY29tcGlsZXJSZXZpc2lvbl07XG4gICAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oXCJUZW1wbGF0ZSB3YXMgcHJlY29tcGlsZWQgd2l0aCBhbiBvbGRlciB2ZXJzaW9uIG9mIEhhbmRsZWJhcnMgdGhhbiB0aGUgY3VycmVudCBydW50aW1lLiBcIitcbiAgICAgICAgICAgICAgXCJQbGVhc2UgdXBkYXRlIHlvdXIgcHJlY29tcGlsZXIgdG8gYSBuZXdlciB2ZXJzaW9uIChcIitydW50aW1lVmVyc2lvbnMrXCIpIG9yIGRvd25ncmFkZSB5b3VyIHJ1bnRpbWUgdG8gYW4gb2xkZXIgdmVyc2lvbiAoXCIrY29tcGlsZXJWZXJzaW9ucytcIikuXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gVXNlIHRoZSBlbWJlZGRlZCB2ZXJzaW9uIGluZm8gc2luY2UgdGhlIHJ1bnRpbWUgZG9lc24ndCBrbm93IGFib3V0IHRoaXMgcmV2aXNpb24geWV0XG4gICAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oXCJUZW1wbGF0ZSB3YXMgcHJlY29tcGlsZWQgd2l0aCBhIG5ld2VyIHZlcnNpb24gb2YgSGFuZGxlYmFycyB0aGFuIHRoZSBjdXJyZW50IHJ1bnRpbWUuIFwiK1xuICAgICAgICAgICAgICBcIlBsZWFzZSB1cGRhdGUgeW91ciBydW50aW1lIHRvIGEgbmV3ZXIgdmVyc2lvbiAoXCIrY29tcGlsZXJJbmZvWzFdK1wiKS5cIik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgX19leHBvcnRzX18uY2hlY2tSZXZpc2lvbiA9IGNoZWNrUmV2aXNpb247Ly8gVE9ETzogUmVtb3ZlIHRoaXMgbGluZSBhbmQgYnJlYWsgdXAgY29tcGlsZVBhcnRpYWxcblxuICBmdW5jdGlvbiB0ZW1wbGF0ZSh0ZW1wbGF0ZVNwZWMsIGVudikge1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgaWYgKCFlbnYpIHtcbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oXCJObyBlbnZpcm9ubWVudCBwYXNzZWQgdG8gdGVtcGxhdGVcIik7XG4gICAgfVxuICAgIGlmICghdGVtcGxhdGVTcGVjIHx8ICF0ZW1wbGF0ZVNwZWMubWFpbikge1xuICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignVW5rbm93biB0ZW1wbGF0ZSBvYmplY3Q6ICcgKyB0eXBlb2YgdGVtcGxhdGVTcGVjKTtcbiAgICB9XG5cbiAgICAvLyBOb3RlOiBVc2luZyBlbnYuVk0gcmVmZXJlbmNlcyByYXRoZXIgdGhhbiBsb2NhbCB2YXIgcmVmZXJlbmNlcyB0aHJvdWdob3V0IHRoaXMgc2VjdGlvbiB0byBhbGxvd1xuICAgIC8vIGZvciBleHRlcm5hbCB1c2VycyB0byBvdmVycmlkZSB0aGVzZSBhcyBwc3VlZG8tc3VwcG9ydGVkIEFQSXMuXG4gICAgZW52LlZNLmNoZWNrUmV2aXNpb24odGVtcGxhdGVTcGVjLmNvbXBpbGVyKTtcblxuICAgIHZhciBpbnZva2VQYXJ0aWFsV3JhcHBlciA9IGZ1bmN0aW9uKHBhcnRpYWwsIGluZGVudCwgbmFtZSwgY29udGV4dCwgaGFzaCwgaGVscGVycywgcGFydGlhbHMsIGRhdGEsIGRlcHRocykge1xuICAgICAgaWYgKGhhc2gpIHtcbiAgICAgICAgY29udGV4dCA9IFV0aWxzLmV4dGVuZCh7fSwgY29udGV4dCwgaGFzaCk7XG4gICAgICB9XG5cbiAgICAgIHZhciByZXN1bHQgPSBlbnYuVk0uaW52b2tlUGFydGlhbC5jYWxsKHRoaXMsIHBhcnRpYWwsIG5hbWUsIGNvbnRleHQsIGhlbHBlcnMsIHBhcnRpYWxzLCBkYXRhLCBkZXB0aHMpO1xuXG4gICAgICBpZiAocmVzdWx0ID09IG51bGwgJiYgZW52LmNvbXBpbGUpIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7IGhlbHBlcnM6IGhlbHBlcnMsIHBhcnRpYWxzOiBwYXJ0aWFscywgZGF0YTogZGF0YSwgZGVwdGhzOiBkZXB0aHMgfTtcbiAgICAgICAgcGFydGlhbHNbbmFtZV0gPSBlbnYuY29tcGlsZShwYXJ0aWFsLCB7IGRhdGE6IGRhdGEgIT09IHVuZGVmaW5lZCwgY29tcGF0OiB0ZW1wbGF0ZVNwZWMuY29tcGF0IH0sIGVudik7XG4gICAgICAgIHJlc3VsdCA9IHBhcnRpYWxzW25hbWVdKGNvbnRleHQsIG9wdGlvbnMpO1xuICAgICAgfVxuICAgICAgaWYgKHJlc3VsdCAhPSBudWxsKSB7XG4gICAgICAgIGlmIChpbmRlbnQpIHtcbiAgICAgICAgICB2YXIgbGluZXMgPSByZXN1bHQuc3BsaXQoJ1xcbicpO1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gbGluZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoIWxpbmVzW2ldICYmIGkgKyAxID09PSBsKSB7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsaW5lc1tpXSA9IGluZGVudCArIGxpbmVzW2ldO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXN1bHQgPSBsaW5lcy5qb2luKCdcXG4nKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbihcIlRoZSBwYXJ0aWFsIFwiICsgbmFtZSArIFwiIGNvdWxkIG5vdCBiZSBjb21waWxlZCB3aGVuIHJ1bm5pbmcgaW4gcnVudGltZS1vbmx5IG1vZGVcIik7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIEp1c3QgYWRkIHdhdGVyXG4gICAgdmFyIGNvbnRhaW5lciA9IHtcbiAgICAgIGxvb2t1cDogZnVuY3Rpb24oZGVwdGhzLCBuYW1lKSB7XG4gICAgICAgIHZhciBsZW4gPSBkZXB0aHMubGVuZ3RoO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgaWYgKGRlcHRoc1tpXSAmJiBkZXB0aHNbaV1bbmFtZV0gIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGRlcHRoc1tpXVtuYW1lXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBsYW1iZGE6IGZ1bmN0aW9uKGN1cnJlbnQsIGNvbnRleHQpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBjdXJyZW50ID09PSAnZnVuY3Rpb24nID8gY3VycmVudC5jYWxsKGNvbnRleHQpIDogY3VycmVudDtcbiAgICAgIH0sXG5cbiAgICAgIGVzY2FwZUV4cHJlc3Npb246IFV0aWxzLmVzY2FwZUV4cHJlc3Npb24sXG4gICAgICBpbnZva2VQYXJ0aWFsOiBpbnZva2VQYXJ0aWFsV3JhcHBlcixcblxuICAgICAgZm46IGZ1bmN0aW9uKGkpIHtcbiAgICAgICAgcmV0dXJuIHRlbXBsYXRlU3BlY1tpXTtcbiAgICAgIH0sXG5cbiAgICAgIHByb2dyYW1zOiBbXSxcbiAgICAgIHByb2dyYW06IGZ1bmN0aW9uKGksIGRhdGEsIGRlcHRocykge1xuICAgICAgICB2YXIgcHJvZ3JhbVdyYXBwZXIgPSB0aGlzLnByb2dyYW1zW2ldLFxuICAgICAgICAgICAgZm4gPSB0aGlzLmZuKGkpO1xuICAgICAgICBpZiAoZGF0YSB8fCBkZXB0aHMpIHtcbiAgICAgICAgICBwcm9ncmFtV3JhcHBlciA9IHByb2dyYW0odGhpcywgaSwgZm4sIGRhdGEsIGRlcHRocyk7XG4gICAgICAgIH0gZWxzZSBpZiAoIXByb2dyYW1XcmFwcGVyKSB7XG4gICAgICAgICAgcHJvZ3JhbVdyYXBwZXIgPSB0aGlzLnByb2dyYW1zW2ldID0gcHJvZ3JhbSh0aGlzLCBpLCBmbik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHByb2dyYW1XcmFwcGVyO1xuICAgICAgfSxcblxuICAgICAgZGF0YTogZnVuY3Rpb24oZGF0YSwgZGVwdGgpIHtcbiAgICAgICAgd2hpbGUgKGRhdGEgJiYgZGVwdGgtLSkge1xuICAgICAgICAgIGRhdGEgPSBkYXRhLl9wYXJlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICB9LFxuICAgICAgbWVyZ2U6IGZ1bmN0aW9uKHBhcmFtLCBjb21tb24pIHtcbiAgICAgICAgdmFyIHJldCA9IHBhcmFtIHx8IGNvbW1vbjtcblxuICAgICAgICBpZiAocGFyYW0gJiYgY29tbW9uICYmIChwYXJhbSAhPT0gY29tbW9uKSkge1xuICAgICAgICAgIHJldCA9IFV0aWxzLmV4dGVuZCh7fSwgY29tbW9uLCBwYXJhbSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgfSxcblxuICAgICAgbm9vcDogZW52LlZNLm5vb3AsXG4gICAgICBjb21waWxlckluZm86IHRlbXBsYXRlU3BlYy5jb21waWxlclxuICAgIH07XG5cbiAgICB2YXIgcmV0ID0gZnVuY3Rpb24oY29udGV4dCwgb3B0aW9ucykge1xuICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICB2YXIgZGF0YSA9IG9wdGlvbnMuZGF0YTtcblxuICAgICAgcmV0Ll9zZXR1cChvcHRpb25zKTtcbiAgICAgIGlmICghb3B0aW9ucy5wYXJ0aWFsICYmIHRlbXBsYXRlU3BlYy51c2VEYXRhKSB7XG4gICAgICAgIGRhdGEgPSBpbml0RGF0YShjb250ZXh0LCBkYXRhKTtcbiAgICAgIH1cbiAgICAgIHZhciBkZXB0aHM7XG4gICAgICBpZiAodGVtcGxhdGVTcGVjLnVzZURlcHRocykge1xuICAgICAgICBkZXB0aHMgPSBvcHRpb25zLmRlcHRocyA/IFtjb250ZXh0XS5jb25jYXQob3B0aW9ucy5kZXB0aHMpIDogW2NvbnRleHRdO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGVtcGxhdGVTcGVjLm1haW4uY2FsbChjb250YWluZXIsIGNvbnRleHQsIGNvbnRhaW5lci5oZWxwZXJzLCBjb250YWluZXIucGFydGlhbHMsIGRhdGEsIGRlcHRocyk7XG4gICAgfTtcbiAgICByZXQuaXNUb3AgPSB0cnVlO1xuXG4gICAgcmV0Ll9zZXR1cCA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgIGlmICghb3B0aW9ucy5wYXJ0aWFsKSB7XG4gICAgICAgIGNvbnRhaW5lci5oZWxwZXJzID0gY29udGFpbmVyLm1lcmdlKG9wdGlvbnMuaGVscGVycywgZW52LmhlbHBlcnMpO1xuXG4gICAgICAgIGlmICh0ZW1wbGF0ZVNwZWMudXNlUGFydGlhbCkge1xuICAgICAgICAgIGNvbnRhaW5lci5wYXJ0aWFscyA9IGNvbnRhaW5lci5tZXJnZShvcHRpb25zLnBhcnRpYWxzLCBlbnYucGFydGlhbHMpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb250YWluZXIuaGVscGVycyA9IG9wdGlvbnMuaGVscGVycztcbiAgICAgICAgY29udGFpbmVyLnBhcnRpYWxzID0gb3B0aW9ucy5wYXJ0aWFscztcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0Ll9jaGlsZCA9IGZ1bmN0aW9uKGksIGRhdGEsIGRlcHRocykge1xuICAgICAgaWYgKHRlbXBsYXRlU3BlYy51c2VEZXB0aHMgJiYgIWRlcHRocykge1xuICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdtdXN0IHBhc3MgcGFyZW50IGRlcHRocycpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJvZ3JhbShjb250YWluZXIsIGksIHRlbXBsYXRlU3BlY1tpXSwgZGF0YSwgZGVwdGhzKTtcbiAgICB9O1xuICAgIHJldHVybiByZXQ7XG4gIH1cblxuICBfX2V4cG9ydHNfXy50ZW1wbGF0ZSA9IHRlbXBsYXRlO2Z1bmN0aW9uIHByb2dyYW0oY29udGFpbmVyLCBpLCBmbiwgZGF0YSwgZGVwdGhzKSB7XG4gICAgdmFyIHByb2cgPSBmdW5jdGlvbihjb250ZXh0LCBvcHRpb25zKSB7XG4gICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgICAgcmV0dXJuIGZuLmNhbGwoY29udGFpbmVyLCBjb250ZXh0LCBjb250YWluZXIuaGVscGVycywgY29udGFpbmVyLnBhcnRpYWxzLCBvcHRpb25zLmRhdGEgfHwgZGF0YSwgZGVwdGhzICYmIFtjb250ZXh0XS5jb25jYXQoZGVwdGhzKSk7XG4gICAgfTtcbiAgICBwcm9nLnByb2dyYW0gPSBpO1xuICAgIHByb2cuZGVwdGggPSBkZXB0aHMgPyBkZXB0aHMubGVuZ3RoIDogMDtcbiAgICByZXR1cm4gcHJvZztcbiAgfVxuXG4gIF9fZXhwb3J0c19fLnByb2dyYW0gPSBwcm9ncmFtO2Z1bmN0aW9uIGludm9rZVBhcnRpYWwocGFydGlhbCwgbmFtZSwgY29udGV4dCwgaGVscGVycywgcGFydGlhbHMsIGRhdGEsIGRlcHRocykge1xuICAgIHZhciBvcHRpb25zID0geyBwYXJ0aWFsOiB0cnVlLCBoZWxwZXJzOiBoZWxwZXJzLCBwYXJ0aWFsczogcGFydGlhbHMsIGRhdGE6IGRhdGEsIGRlcHRoczogZGVwdGhzIH07XG5cbiAgICBpZihwYXJ0aWFsID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oXCJUaGUgcGFydGlhbCBcIiArIG5hbWUgKyBcIiBjb3VsZCBub3QgYmUgZm91bmRcIik7XG4gICAgfSBlbHNlIGlmKHBhcnRpYWwgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgcmV0dXJuIHBhcnRpYWwoY29udGV4dCwgb3B0aW9ucyk7XG4gICAgfVxuICB9XG5cbiAgX19leHBvcnRzX18uaW52b2tlUGFydGlhbCA9IGludm9rZVBhcnRpYWw7ZnVuY3Rpb24gbm9vcCgpIHsgcmV0dXJuIFwiXCI7IH1cblxuICBfX2V4cG9ydHNfXy5ub29wID0gbm9vcDtmdW5jdGlvbiBpbml0RGF0YShjb250ZXh0LCBkYXRhKSB7XG4gICAgaWYgKCFkYXRhIHx8ICEoJ3Jvb3QnIGluIGRhdGEpKSB7XG4gICAgICBkYXRhID0gZGF0YSA/IGNyZWF0ZUZyYW1lKGRhdGEpIDoge307XG4gICAgICBkYXRhLnJvb3QgPSBjb250ZXh0O1xuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuICByZXR1cm4gX19leHBvcnRzX187XG59KShfX21vZHVsZTJfXywgX19tb2R1bGU0X18sIF9fbW9kdWxlMV9fKTtcblxuLy8gaGFuZGxlYmFycy5ydW50aW1lLmpzXG52YXIgX19tb2R1bGUwX18gPSAoZnVuY3Rpb24oX19kZXBlbmRlbmN5MV9fLCBfX2RlcGVuZGVuY3kyX18sIF9fZGVwZW5kZW5jeTNfXywgX19kZXBlbmRlbmN5NF9fLCBfX2RlcGVuZGVuY3k1X18pIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG4gIHZhciBfX2V4cG9ydHNfXztcbiAgLypnbG9iYWxzIEhhbmRsZWJhcnM6IHRydWUgKi9cbiAgdmFyIGJhc2UgPSBfX2RlcGVuZGVuY3kxX187XG5cbiAgLy8gRWFjaCBvZiB0aGVzZSBhdWdtZW50IHRoZSBIYW5kbGViYXJzIG9iamVjdC4gTm8gbmVlZCB0byBzZXR1cCBoZXJlLlxuICAvLyAoVGhpcyBpcyBkb25lIHRvIGVhc2lseSBzaGFyZSBjb2RlIGJldHdlZW4gY29tbW9uanMgYW5kIGJyb3dzZSBlbnZzKVxuICB2YXIgU2FmZVN0cmluZyA9IF9fZGVwZW5kZW5jeTJfXztcbiAgdmFyIEV4Y2VwdGlvbiA9IF9fZGVwZW5kZW5jeTNfXztcbiAgdmFyIFV0aWxzID0gX19kZXBlbmRlbmN5NF9fO1xuICB2YXIgcnVudGltZSA9IF9fZGVwZW5kZW5jeTVfXztcblxuICAvLyBGb3IgY29tcGF0aWJpbGl0eSBhbmQgdXNhZ2Ugb3V0c2lkZSBvZiBtb2R1bGUgc3lzdGVtcywgbWFrZSB0aGUgSGFuZGxlYmFycyBvYmplY3QgYSBuYW1lc3BhY2VcbiAgdmFyIGNyZWF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBoYiA9IG5ldyBiYXNlLkhhbmRsZWJhcnNFbnZpcm9ubWVudCgpO1xuXG4gICAgVXRpbHMuZXh0ZW5kKGhiLCBiYXNlKTtcbiAgICBoYi5TYWZlU3RyaW5nID0gU2FmZVN0cmluZztcbiAgICBoYi5FeGNlcHRpb24gPSBFeGNlcHRpb247XG4gICAgaGIuVXRpbHMgPSBVdGlscztcbiAgICBoYi5lc2NhcGVFeHByZXNzaW9uID0gVXRpbHMuZXNjYXBlRXhwcmVzc2lvbjtcblxuICAgIGhiLlZNID0gcnVudGltZTtcbiAgICBoYi50ZW1wbGF0ZSA9IGZ1bmN0aW9uKHNwZWMpIHtcbiAgICAgIHJldHVybiBydW50aW1lLnRlbXBsYXRlKHNwZWMsIGhiKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIGhiO1xuICB9O1xuXG4gIHZhciBIYW5kbGViYXJzID0gY3JlYXRlKCk7XG4gIEhhbmRsZWJhcnMuY3JlYXRlID0gY3JlYXRlO1xuXG4gIEhhbmRsZWJhcnNbJ2RlZmF1bHQnXSA9IEhhbmRsZWJhcnM7XG5cbiAgX19leHBvcnRzX18gPSBIYW5kbGViYXJzO1xuICByZXR1cm4gX19leHBvcnRzX187XG59KShfX21vZHVsZTFfXywgX19tb2R1bGUzX18sIF9fbW9kdWxlNF9fLCBfX21vZHVsZTJfXywgX19tb2R1bGU1X18pO1xuXG4gIHJldHVybiBfX21vZHVsZTBfXztcbn0pKTtcbiIsIi8qXG4gKiBjYXRiZXJyeS1oYW5kbGViYXJzXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0IERlbmlzIFJlY2hrdW5vdiBhbmQgcHJvamVjdCBjb250cmlidXRvcnMuXG4gKlxuICogY2F0YmVycnktaGFuZGxlYmFycydzIGxpY2Vuc2UgZm9sbG93czpcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvblxuICogb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb25cbiAqIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbixcbiAqIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsXG4gKiBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLFxuICogYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbiAqIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4gKiBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4gKiBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG4gKiBTT0ZUV0FSRS5cbiAqXG4gKiBUaGlzIGxpY2Vuc2UgYXBwbGllcyB0byBhbGwgcGFydHMgb2YgY2F0YmVycnktaGFuZGxlYmFycyB0aGF0IGFyZSBub3QgZXh0ZXJuYWxseVxuICogbWFpbnRhaW5lZCBsaWJyYXJpZXMuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgSGFuZGxlYmFycyA9IHJlcXVpcmUoJy4vbGliL3ZlbmRvcnMvaGFuZGxlYmFycycpLFxuXHRUZW1wbGF0ZVByb3ZpZGVyID0gcmVxdWlyZSgnLi9saWIvVGVtcGxhdGVQcm92aWRlcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0cmVnaXN0ZXI6IGZ1bmN0aW9uIChsb2NhdG9yLCBjb25maWcpIHtcblx0XHRjb25maWcgPSBjb25maWcgfHwge307XG5cdFx0bG9jYXRvci5yZWdpc3Rlckluc3RhbmNlKCdoYW5kbGViYXJzJywgSGFuZGxlYmFycyk7XG5cdFx0bG9jYXRvci5yZWdpc3RlcigndGVtcGxhdGVQcm92aWRlcicsIFRlbXBsYXRlUHJvdmlkZXIsIGNvbmZpZywgdHJ1ZSk7XG5cdH0sXG5cdEhhbmRsZWJhcnM6IEhhbmRsZWJhcnMsXG5cdFRlbXBsYXRlUHJvdmlkZXI6IFRlbXBsYXRlUHJvdmlkZXJcbn07IiwiLypcbiAqIGNhdGJlcnJ5XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0IERlbmlzIFJlY2hrdW5vdiBhbmQgcHJvamVjdCBjb250cmlidXRvcnMuXG4gKlxuICogY2F0YmVycnkncyBsaWNlbnNlIGZvbGxvd3M6XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb25cbiAqIG9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uXG4gKiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sXG4gKiBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLFxuICogcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSxcbiAqIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4gKiBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuICogaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuICogT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuICogU09GVFdBUkUuXG4gKlxuICogVGhpcyBsaWNlbnNlIGFwcGxpZXMgdG8gYWxsIHBhcnRzIG9mIGNhdGJlcnJ5IHRoYXQgYXJlIG5vdCBleHRlcm5hbGx5XG4gKiBtYWludGFpbmVkIGxpYnJhcmllcy5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBMb2NhbGl6YXRpb25IZWxwZXIgPSByZXF1aXJlKCcuL2xpYi9Mb2NhbGl6YXRpb25IZWxwZXInKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdC8qKlxuXHQgKiBSZWdpc3RlcnMgYWxsIGxvY2FsaXphdGlvbiBjb21wb25lbnRzIGluIHNlcnZpY2UgbG9jYXRvci5cblx0ICogQHBhcmFtIHtTZXJ2aWNlTG9jYXRvcn0gbG9jYXRvciBDYXRiZXJyeSdzIHNlcnZpY2UgbG9jYXRvci5cblx0ICovXG5cdHJlZ2lzdGVyOiBmdW5jdGlvbiAobG9jYXRvcikge1xuXHRcdHZhciBjb25maWcgPSBsb2NhdG9yLnJlc29sdmUoJ2NvbmZpZycpO1xuXHRcdHRyeSB7XG5cdFx0XHR2YXIgaGFuZGxlYmFycyA9IGxvY2F0b3IucmVzb2x2ZSgnaGFuZGxlYmFycycpLFxuXHRcdFx0XHRoZWxwZXIgPSBsb2NhdG9yLnJlc29sdmVJbnN0YW5jZShMb2NhbGl6YXRpb25IZWxwZXIsIGNvbmZpZyk7XG5cdFx0XHRoYW5kbGViYXJzLnJlZ2lzdGVySGVscGVyKCdsMTBuJywgaGVscGVyLmdldEhhbmRsZWJhcnNIZWxwZXIoKSk7XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0Ly9ub3RoaW5nIHRvIGRvLlxuXHRcdH1cblx0fVxufTsiLCIvKlxuICogY2F0YmVycnktbDEwbi1oYW5kbGViYXJzLWhlbHBlclxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNSBEZW5pcyBSZWNoa3Vub3YgYW5kIHByb2plY3QgY29udHJpYnV0b3JzLlxuICpcbiAqIGNhdGJlcnJ5LWwxMG4taGFuZGxlYmFycy1oZWxwZXIncyBsaWNlbnNlIGZvbGxvd3M6XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb25cbiAqIG9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uXG4gKiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sXG4gKiBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLFxuICogcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSxcbiAqIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4gKiBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuICogaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuICogT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKlxuICogVGhpcyBsaWNlbnNlIGFwcGxpZXMgdG8gYWxsIHBhcnRzIG9mIGNhdGJlcnJ5LWwxMG4taGFuZGxlYmFycy1oZWxwZXIgdGhhdFxuICogYXJlIG5vdCBleHRlcm5hbGx5IG1haW50YWluZWQgbGlicmFyaWVzLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBMb2NhbGl6YXRpb25IZWxwZXI7XG5cbi8qKlxuICogQ3JlYXRlcyBuZXcgaW5zdGFuY2Ugb2YgbG9jYWxpemF0aW9uIGhlbHBlci5cbiAqIEBwYXJhbSB7TG9jYWxpemF0aW9uUHJvdmlkZXJ9ICRsb2NhbGl6YXRpb25Qcm92aWRlciBMb2NhbGl6YXRpb24gcHJvdmlkZXIuXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gTG9jYWxpemF0aW9uSGVscGVyKCRsb2NhbGl6YXRpb25Qcm92aWRlcikge1xuXHR0aGlzLl9sb2NhbGl6YXRpb25Qcm92aWRlciA9ICRsb2NhbGl6YXRpb25Qcm92aWRlcjtcbn1cblxuLyoqXG4gKiBDdXJyZW50IGxvY2FsaXphdGlvbiBwcm92aWRlci5cbiAqIEB0eXBlIHtMb2NhbGl6YXRpb25Qcm92aWRlcn1cbiAqIEBwcml2YXRlXG4gKi9cbkxvY2FsaXphdGlvbkhlbHBlci5wcm90b3R5cGUuX2xvY2FsaXphdGlvblByb3ZpZGVyID0gbnVsbDtcblxuLyoqXG4gKiBHZXRzIGhhbmRsZWJhcnMgaGVscGVyIGZvciBsb2NhbGl6YXRpb24uXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IEhhbmRsZWJhcnMgaGVscGVyIGZ1bmN0aW9uLlxuICovXG5Mb2NhbGl6YXRpb25IZWxwZXIucHJvdG90eXBlLmdldEhhbmRsZWJhcnNIZWxwZXIgPSBmdW5jdGlvbiAoKSB7XG5cdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIGtleSA9IG51bGwsXG5cdFx0XHRsb2NhbGUgPSBudWxsLFxuXHRcdFx0Y291bnQgPSBudWxsLFxuXHRcdFx0b3B0aW9ucyA9IGFyZ3VtZW50c1thcmd1bWVudHMubGVuZ3RoIC0gMV07XG5cblx0XHRBcnJheS5wcm90b3R5cGUuZXZlcnkuY2FsbChhcmd1bWVudHMsIGZ1bmN0aW9uIChhcmcpIHtcblx0XHRcdGlmICgha2V5ICYmIHR5cGVvZihhcmcpID09PSAnc3RyaW5nJykge1xuXHRcdFx0XHRrZXkgPSBhcmc7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCFsb2NhbGUgJiYgdHlwZW9mKGFyZykgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdGxvY2FsZSA9IGFyZztcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIWNvdW50ICYmIHR5cGVvZihhcmcpID09PSAnbnVtYmVyJykge1xuXHRcdFx0XHRjb3VudCA9IGFyZztcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fSk7XG5cblx0XHRpZiAoIWtleSkge1xuXHRcdFx0cmV0dXJuICcnO1xuXHRcdH1cblxuXHRcdGlmICghbG9jYWxlKSB7XG5cdFx0XHRsb2NhbGUgPSBvcHRpb25zLmRhdGEucm9vdC5sb2NhbGU7XG5cdFx0fVxuXG5cdFx0dmFyIHZhbHVlID0gJyc7XG5cdFx0dHJ5IHtcblx0XHRcdHZhbHVlID0gIWlzTmFOKGNvdW50KSA/XG5cdFx0XHRcdHRoaXMuX2xvY2FsaXphdGlvblByb3ZpZGVyLnBsdXJhbGl6ZShsb2NhbGUsIGtleSwgY291bnQpIDpcblx0XHRcdFx0dGhpcy5fbG9jYWxpemF0aW9uUHJvdmlkZXIuZ2V0KGxvY2FsZSwga2V5KTtcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHQvLyBub3RoaW5nIHRvIGRvXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHZhbHVlO1xuXHR9LmJpbmQodGhpcyk7XG59OyIsIi8qXG4gKiBjYXRiZXJyeVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNCBEZW5pcyBSZWNoa3Vub3YgYW5kIHByb2plY3QgY29udHJpYnV0b3JzLlxuICpcbiAqIGNhdGJlcnJ5J3MgbGljZW5zZSBmb2xsb3dzOlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXG4gKiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvblxuICogZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLFxuICogaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSxcbiAqIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsXG4gKiBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuICogc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbiAqIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1NcbiAqIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiAqIFNPRlRXQVJFLlxuICpcbiAqIFRoaXMgbGljZW5zZSBhcHBsaWVzIHRvIGFsbCBwYXJ0cyBvZiBjYXRiZXJyeSB0aGF0IGFyZSBub3QgZXh0ZXJuYWxseVxuICogbWFpbnRhaW5lZCBsaWJyYXJpZXMuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IExvY2FsaXphdGlvbkxvYWRlcjtcblxuLyoqXG4gKiBDcmVhdGVzIG5ldyBpbnN0YW5jZSBvZiBsb2NhbGl6YXRpb24gbG9hZGVyLlxuICogQHBhcmFtIHtXaW5kb3d9ICR3aW5kb3cgYnJvd3NlciB3aW5kb3cuXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gTG9jYWxpemF0aW9uTG9hZGVyKCR3aW5kb3cpIHtcblx0dGhpcy5fbG9jYWxpemF0aW9uID0gJHdpbmRvdy5sb2NhbGl6YXRpb24gJiZcblx0XHR0eXBlb2YoJHdpbmRvdy5sb2NhbGl6YXRpb24pID09PSAnb2JqZWN0JyA/ICR3aW5kb3cubG9jYWxpemF0aW9uIDoge307XG59XG5cbi8qKlxuICogQ3VycmVudCBsb2NhbGl6YXRpb24uXG4gKiBAdHlwZSB7T2JqZWN0fVxuICogQHByaXZhdGVcbiAqL1xuTG9jYWxpemF0aW9uTG9hZGVyLnByb3RvdHlwZS5fbG9jYWxpemF0aW9uID0gbnVsbDtcblxuLyoqXG4gKiBMb2FkcyBsb2NhbGl6YXRpb24gYnkgbG9jYWxlLlxuICogQHJldHVybnMge09iamVjdH0gT2JqZWN0IHdpdGggbG9jYWxpemF0aW9uLlxuICovXG5Mb2NhbGl6YXRpb25Mb2FkZXIucHJvdG90eXBlLmxvYWQgPSBmdW5jdGlvbiAoKSB7XG5cdHJldHVybiB0aGlzLl9sb2NhbGl6YXRpb247XG59OyIsIi8qXG4gKiBjYXRiZXJyeVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNCBEZW5pcyBSZWNoa3Vub3YgYW5kIHByb2plY3QgY29udHJpYnV0b3JzLlxuICpcbiAqIGNhdGJlcnJ5J3MgbGljZW5zZSBmb2xsb3dzOlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXG4gKiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvblxuICogZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLFxuICogaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSxcbiAqIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsXG4gKiBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuICogc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbiAqIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1NcbiAqIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiAqIFNPRlRXQVJFLlxuICpcbiAqIFRoaXMgbGljZW5zZSBhcHBsaWVzIHRvIGFsbCBwYXJ0cyBvZiBjYXRiZXJyeSB0aGF0IGFyZSBub3QgZXh0ZXJuYWxseVxuICogbWFpbnRhaW5lZCBsaWJyYXJpZXMuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgTG9jYWxpemF0aW9uUHJvdmlkZXIgPSByZXF1aXJlKCcuL2xpYi9Mb2NhbGl6YXRpb25Qcm92aWRlcicpLFxuXHRMb2NhbGl6YXRpb25Mb2FkZXIgPSByZXF1aXJlKCcuL2xpYi9Mb2NhbGl6YXRpb25Mb2FkZXInKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdC8qKlxuXHQgKiBSZWdpc3RlcnMgYWxsIGxvY2FsaXphdGlvbiBjb21wb25lbnRzIGluIHNlcnZpY2UgbG9jYXRvci5cblx0ICogQHBhcmFtIHtTZXJ2aWNlTG9jYXRvcn0gbG9jYXRvciBDYXRiZXJyeSdzIHNlcnZpY2UgbG9jYXRvci5cblx0ICovXG5cdHJlZ2lzdGVyOiBmdW5jdGlvbiAobG9jYXRvcikge1xuXHRcdHZhciBjb25maWcgPSBsb2NhdG9yLnJlc29sdmUoJ2NvbmZpZycpO1xuXHRcdGxvY2F0b3IucmVnaXN0ZXIoJ2xvY2FsaXphdGlvblByb3ZpZGVyJyxcblx0XHRcdExvY2FsaXphdGlvblByb3ZpZGVyLCBjb25maWcsIHRydWUpO1xuXHRcdGxvY2F0b3IucmVnaXN0ZXIoJ2xvY2FsaXphdGlvbkxvYWRlcicsXG5cdFx0XHRMb2NhbGl6YXRpb25Mb2FkZXIsIGNvbmZpZywgdHJ1ZSk7XG5cdH0sXG5cdExvY2FsaXphdGlvblByb3ZpZGVyOiBMb2NhbGl6YXRpb25Qcm92aWRlcixcblx0TG9jYWxpemF0aW9uTG9hZGVyOiBMb2NhbGl6YXRpb25Mb2FkZXJcbn07IiwiLypcbiAqIGNhdGJlcnJ5XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0IERlbmlzIFJlY2hrdW5vdiBhbmQgcHJvamVjdCBjb250cmlidXRvcnMuXG4gKlxuICogY2F0YmVycnkncyBsaWNlbnNlIGZvbGxvd3M6XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb25cbiAqIG9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uXG4gKiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sXG4gKiBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLFxuICogcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSxcbiAqIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4gKiBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuICogaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuICogT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuICogU09GVFdBUkUuXG4gKlxuICogVGhpcyBsaWNlbnNlIGFwcGxpZXMgdG8gYWxsIHBhcnRzIG9mIGNhdGJlcnJ5IHRoYXQgYXJlIG5vdCBleHRlcm5hbGx5XG4gKiBtYWludGFpbmVkIGxpYnJhcmllcy5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gTG9jYWxpemF0aW9uUHJvdmlkZXI7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgndXRpbCcpO1xuXG52YXIgREVGQVVMVF9MT0NBTEVfQ09PS0lFX0tFWSA9ICdsb2NhbGUnLFxuXHRERUZBVUxUX0xPQ0FMRV9DT09LSUVfTUFYX0FHRSA9IDMxNTU2OTI2MDAsIC8vIDEwMCB5ZWFyc1xuXHRMT0NBTEVfQ09PS0lFX1BBVEggPSAnLycsXG5cdExPQ0FMRV9SRUdFWFAgPSAvXlthLXpdezJ9KC1bYS16XXsyfSk/JC8sXG5cdEVSUk9SX0xPQ0FMRV9OQU1FID0gJ1dyb25nIGxvY2FsZSBuYW1lICVzICgnICtcblx0XHRMT0NBTEVfUkVHRVhQLnRvU3RyaW5nKCkgKyAnKScsXG5cdEVSUk9SX0xPQ0FMSVpBVElPTl9DT05GSUcgPSAnXCJsMTBuXCIgY29uZmlnIHNlY3Rpb24gaXMgcmVxdWlyZWQnO1xuXG4vKipcbiAqIENyZWF0ZXMgbmV3IGluc3RhbmNlIG9mIGxvY2FsaXphdGlvbiBwcm92aWRlci5cbiAqIEBwYXJhbSB7TG9jYWxpemF0aW9uTG9hZGVyfSAkbG9jYWxpemF0aW9uTG9hZGVyIExvY2FsaXphdGlvbiBsb2FkZXJcbiAqIHRvIGxvYWQgbG9jYWxlcy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBsMTBuIExvY2FsaXphdGlvbiBjb25maWcuXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gTG9jYWxpemF0aW9uUHJvdmlkZXIoJGxvY2FsaXphdGlvbkxvYWRlciwgbDEwbikge1xuXHRpZiAoIWwxMG4pIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoRVJST1JfTE9DQUxJWkFUSU9OX0NPTkZJRyk7XG5cdH1cblx0dGhpcy5fZGVmYXVsdExvY2FsZSA9IGwxMG4uZGVmYXVsdExvY2FsZSA/XG5cdFx0U3RyaW5nKGwxMG4uZGVmYXVsdExvY2FsZSkgOiAnJztcblx0aWYgKCFMT0NBTEVfUkVHRVhQLnRlc3QodGhpcy5fZGVmYXVsdExvY2FsZSkpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IodXRpbC5mb3JtYXQoRVJST1JfTE9DQUxFX05BTUUsIHRoaXMuX2RlZmF1bHRMb2NhbGUpKTtcblx0fVxuXG5cdGlmIChsMTBuLmNvb2tpZSAmJiB0eXBlb2YobDEwbi5jb29raWUpID09PSAnb2JqZWN0Jykge1xuXHRcdHRoaXMuX2Nvb2tpZUNvbmZpZyA9IE9iamVjdC5jcmVhdGUobDEwbi5jb29raWUpO1xuXHR9IGVsc2Uge1xuXHRcdHRoaXMuX2Nvb2tpZUNvbmZpZyA9IHt9O1xuXHR9XG5cblx0aWYgKHR5cGVvZih0aGlzLl9jb29raWVDb25maWcubmFtZSkgIT09ICdzdHJpbmcnIHx8XG5cdFx0dGhpcy5fY29va2llQ29uZmlnLm5hbWUubGVuZ3RoID09PSAwKSB7XG5cdFx0dGhpcy5fY29va2llQ29uZmlnLm5hbWUgPSBERUZBVUxUX0xPQ0FMRV9DT09LSUVfS0VZO1xuXHR9XG5cblx0aWYgKHR5cGVvZih0aGlzLl9jb29raWVDb25maWcubWF4QWdlKSAhPT0gJ251bWJlcicpIHtcblx0XHR0aGlzLl9jb29raWVDb25maWcubWF4QWdlID0gREVGQVVMVF9MT0NBTEVfQ09PS0lFX01BWF9BR0U7XG5cdH1cblxuXHRpZiAodHlwZW9mKHRoaXMuX2Nvb2tpZUNvbmZpZy5wYXRoKSAhPT0gJ3N0cmluZycgfHxcblx0XHR0aGlzLl9jb29raWVDb25maWcucGF0aC5sZW5ndGggPT09IDApIHtcblx0XHR0aGlzLl9jb29raWVDb25maWcucGF0aCA9IExPQ0FMRV9DT09LSUVfUEFUSDtcblx0fVxuXG5cdHRoaXMuX2xvYWRlciA9ICRsb2NhbGl6YXRpb25Mb2FkZXI7XG5cdHRoaXMuX3BsdXJhbGl6YXRpb25SdWxlc0NhY2hlID0ge307XG59XG5cbi8qKlxuICogQ3VycmVudCBjb29raWUgY29uZmlndXJhdGlvbi5cbiAqIEB0eXBlIHtPYmplY3R9XG4gKiBAcHJpdmF0ZVxuICovXG5Mb2NhbGl6YXRpb25Qcm92aWRlci5wcm90b3R5cGUuX2Nvb2tpZUNvbmZpZyA9IG51bGw7XG5cbi8qKlxuICogQ3VycmVudCBsb2NhbGl6YXRpb24gbG9hZGVyLlxuICogQHR5cGUge0xvY2FsaXphdGlvbkxvYWRlcn1cbiAqIEBwcml2YXRlXG4gKi9cbkxvY2FsaXphdGlvblByb3ZpZGVyLnByb3RvdHlwZS5fbG9hZGVyID0gbnVsbDtcblxuLyoqXG4gKiBDdXJyZW50IGNhY2hlIG9mIHBsdXJhbGl6YXRpb24gZnVuY3Rpb25zLlxuICogQHR5cGUge09iamVjdH1cbiAqIEBwcml2YXRlXG4gKi9cbkxvY2FsaXphdGlvblByb3ZpZGVyLnByb3RvdHlwZS5fcGx1cmFsaXphdGlvblJ1bGVzQ2FjaGUgPSBudWxsO1xuXG4vKipcbiAqIEdldHMgY3VycmVudCBsb2NhbGUgdmFsdWUgZnJvbSBjb250ZXh0LlxuICogQHBhcmFtIHtPYmplY3R9IGNvbnRleHQgQ29tcG9uZW50IGNvbnRleHQuXG4gKi9cbkxvY2FsaXphdGlvblByb3ZpZGVyLnByb3RvdHlwZS5nZXRDdXJyZW50TG9jYWxlID0gZnVuY3Rpb24gKGNvbnRleHQpIHtcblx0cmV0dXJuIGNvbnRleHQuY29va2llLmdldCh0aGlzLl9jb29raWVDb25maWcubmFtZSkgfHwgdGhpcy5fZGVmYXVsdExvY2FsZTtcbn07XG5cbi8qKlxuICogQ2hhbmdlcyBjdXJyZW50IGxvY2FsZSB2YWx1ZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbGUgTG9jYWxlIG5hbWUgKGkuZS4gZW4sIGVuLXVzLCBydSBldGMpLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbnRleHQgQ29tcG9uZW50IGNvbnRleHQuXG4gKi9cbkxvY2FsaXphdGlvblByb3ZpZGVyLnByb3RvdHlwZS5jaGFuZ2VMb2NhbGUgPSBmdW5jdGlvbiAobG9jYWxlLCBjb250ZXh0KSB7XG5cdHZhciBleHBpcmVEYXRlID0gbmV3IERhdGUoKG5ldyBEYXRlKCkpLmdldFRpbWUoKSArXG5cdFx0XHR0aGlzLl9jb29raWVDb25maWcubWF4QWdlICogMTAwMCk7XG5cblx0dGhpcy5fY29va2llQ29uZmlnLmtleSA9IHRoaXMuX2Nvb2tpZUNvbmZpZy5uYW1lO1xuXHR0aGlzLl9jb29raWVDb25maWcudmFsdWUgPSBsb2NhbGU7XG5cdHRoaXMuX2Nvb2tpZUNvbmZpZy5leHBpcmVzID0gZXhwaXJlRGF0ZTtcblx0Y29udGV4dC5jb29raWUuc2V0KHRoaXMuX2Nvb2tpZUNvbmZpZyk7XG5cblx0aWYoY29udGV4dC5pc0Jyb3dzZXIpIHtcblx0XHR2YXIgd2luZG93ID0gY29udGV4dC5sb2NhdG9yLnJlc29sdmUoJ3dpbmRvdycpO1xuXHRcdHdpbmRvdy5kb2N1bWVudC5sb2NhdGlvbi5yZWxvYWQoKTtcblx0fSBlbHNlIHtcblx0XHRjb250ZXh0LnJlZGlyZWN0KGNvbnRleHQubG9jYXRpb24udG9TdHJpbmcoKSk7XG5cdH1cbn07XG5cbi8qKlxuICogR2V0cyBsb2NhbGl6ZWQgdmFsdWUgZm9yIHNwZWNpZmllZCBsb2NhbGUgYW5kIGtleSBuYW1lLlxuICogQHBhcmFtIHtzdHJpbmd9IGxvY2FsZSBMb2NhbGUgbmFtZSAoaS5lLiBFTiwgUlUgZXRjKS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgTG9jYWxpemF0aW9uIGtleS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IExvY2FsaXplZCB2YWx1ZS5cbiAqL1xuTG9jYWxpemF0aW9uUHJvdmlkZXIucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChsb2NhbGUsIGtleSkge1xuXHR2YXIgdmFsdWUgPSB0aGlzLl9sb2FkZXIubG9hZChsb2NhbGUpW2tleV07XG5cdGlmICh2YWx1ZSBpbnN0YW5jZW9mIEFycmF5KSB7XG5cdFx0dmFsdWUgPSB2YWx1ZVswXTtcblx0fVxuXG5cdHJldHVybiBTdHJpbmcodmFsdWUgfHwgJycpO1xufTtcblxuLyoqXG4gKiBHZXRzIEphdmFTY3JpcHQgZnVuY3Rpb24gZm9yIHBsdXJhbGl6YXRpb24gcnVsZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBydWxlIFBsdXJhbGl6YXRpb24gcnVsZS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUGx1cmFsaXphdGlvbiBydWxlIGFzIEphdmFTY3JpcHQgZnVuY3Rpb24uXG4gKiBAcHJpdmF0ZVxuICovXG5Mb2NhbGl6YXRpb25Qcm92aWRlci5wcm90b3R5cGUuX2dldFBsdXJhbGl6YXRpb25SdWxlRnVuY3Rpb24gPSBmdW5jdGlvbiAocnVsZSkge1xuXHRpZiAoIShydWxlIGluICB0aGlzLl9wbHVyYWxpemF0aW9uUnVsZXNDYWNoZSkpIHtcblx0XHQvKmpzaGludCBldmlsOnRydWUgKi9cblx0XHR0aGlzLl9wbHVyYWxpemF0aW9uUnVsZXNDYWNoZVtydWxlXSA9IG5ldyBGdW5jdGlvbignbicsICdwbHVyYWxGb3JtcycsXG5cdFx0XHQndmFyIGluZGV4ID0gTnVtYmVyKCcgKyBydWxlICtcblx0XHRcdCcpOyByZXR1cm4gU3RyaW5nKHBsdXJhbEZvcm1zW2luZGV4XSB8fCBcXCdcXCcpOycpO1xuXHR9XG5cdHJldHVybiB0aGlzLl9wbHVyYWxpemF0aW9uUnVsZXNDYWNoZVtydWxlXTtcbn07XG5cbi8qKlxuICogUGx1cmFsaXplcyBsb2NhbGl6YXRpb24gY29uc3RhbnQgZm9ybXMgYnkgc3BlY2lmaWVkIGtleS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbGUgTG9jYWxlIG5hbWUuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IExvY2FsaXphdGlvbiBrZXkuXG4gKiBAcGFyYW0ge251bWJlcn0gbiBOdW1iZXIgdG8gZGV0ZXJtaW5lIHBsdXJhbCBmb3JtLlxuICogQHJldHVybnMge3N0cmluZ30gQ29ycmVjdCBwbHVyYWwgZm9ybS5cbiAqL1xuTG9jYWxpemF0aW9uUHJvdmlkZXIucHJvdG90eXBlLnBsdXJhbGl6ZSA9IGZ1bmN0aW9uIChsb2NhbGUsIGtleSwgbikge1xuXHR2YXIgbG9jYWxlT2JqZWN0ID0gdGhpcy5fbG9hZGVyLmxvYWQobG9jYWxlKSxcblx0XHRmb3JtcyA9IGxvY2FsZU9iamVjdFtrZXldO1xuXG5cdGlmICghKGZvcm1zIGluc3RhbmNlb2YgQXJyYXkpKSB7XG5cdFx0cmV0dXJuIFN0cmluZyhmb3JtcyB8fCAnJyk7XG5cdH1cblxuXHR2YXIgcnVsZSA9IHR5cGVvZihsb2NhbGVPYmplY3QuJHBsdXJhbGl6YXRpb24uZnJvbURlZmF1bHRMb2NhbGUpID09PVxuXHRcdCdvYmplY3QnICYmXG5cdFx0KGtleSBpbiBsb2NhbGVPYmplY3QuJHBsdXJhbGl6YXRpb24uZnJvbURlZmF1bHRMb2NhbGUpID9cblx0XHRcdGxvY2FsZU9iamVjdC4kcGx1cmFsaXphdGlvbi5kZWZhdWx0UnVsZSA6XG5cdFx0XHRsb2NhbGVPYmplY3QuJHBsdXJhbGl6YXRpb24ucnVsZSxcblx0XHRydWxlRnVuY3Rpb24gPSB0aGlzLl9nZXRQbHVyYWxpemF0aW9uUnVsZUZ1bmN0aW9uKHJ1bGUgfHwgJycpO1xuXHRyZXR1cm4gcnVsZUZ1bmN0aW9uKG4sIGZvcm1zKTtcbn07IiwiLypcbiAqIGNhdGJlcnJ5XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0IERlbmlzIFJlY2hrdW5vdiBhbmQgcHJvamVjdCBjb250cmlidXRvcnMuXG4gKlxuICogY2F0YmVycnkncyBsaWNlbnNlIGZvbGxvd3M6XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb25cbiAqIG9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uXG4gKiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sXG4gKiBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLFxuICogcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSxcbiAqIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4gKiBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuICogaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuICogT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKlxuICogVGhpcyBsaWNlbnNlIGFwcGxpZXMgdG8gYWxsIHBhcnRzIG9mIGNhdGJlcnJ5IHRoYXQgYXJlIG5vdCBleHRlcm5hbGx5XG4gKiBtYWludGFpbmVkIGxpYnJhcmllcy5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gQ2F0YmVycnk7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgndXRpbCcpLFxuXHRDYXRiZXJyeUJhc2UgPSByZXF1aXJlKCcuLi9saWIvYmFzZS9DYXRiZXJyeUJhc2UnKTtcblxudXRpbC5pbmhlcml0cyhDYXRiZXJyeSwgQ2F0YmVycnlCYXNlKTtcblxuLyoqXG4gKiBDcmVhdGVzIG5ldyBpbnN0YW5jZSBvZiB0aGUgYnJvd3NlciB2ZXJzaW9uIG9mIENhdGJlcnJ5LlxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBDYXRiZXJyeUJhc2VcbiAqL1xuZnVuY3Rpb24gQ2F0YmVycnkoKSB7XG5cdENhdGJlcnJ5QmFzZS5jYWxsKHRoaXMpO1xufVxuXG4vKipcbiAqIEN1cnJlbnQgcmVxdWVzdCByb3V0ZXIuXG4gKiBAdHlwZSB7UmVxdWVzdFJvdXRlcn1cbiAqIEBwcml2YXRlXG4gKi9cbkNhdGJlcnJ5LnByb3RvdHlwZS5fcm91dGVyID0gbnVsbDtcblxuLyoqXG4gKiBXcmFwcyBjdXJyZW50IEhUTUwgZG9jdW1lbnQgd2l0aCBDYXRiZXJyeSBldmVudCBoYW5kbGVycy5cbiAqL1xuQ2F0YmVycnkucHJvdG90eXBlLndyYXBEb2N1bWVudCA9IGZ1bmN0aW9uICgpIHtcblx0dGhpcy5fcm91dGVyID0gdGhpcy5sb2NhdG9yLnJlc29sdmUoJ3JlcXVlc3RSb3V0ZXInKTtcbn07XG5cbi8qKlxuICogU3RhcnRzIENhdGJlcnJ5IGFwcGxpY2F0aW9uIHdoZW4gRE9NIGlzIHJlYWR5LlxuICogQHJldHVybnMge1Byb21pc2V9IFByb21pc2UgZm9yIG5vdGhpbmcuXG4gKi9cbkNhdGJlcnJ5LnByb3RvdHlwZS5zdGFydFdoZW5SZWFkeSA9IGZ1bmN0aW9uICgpIHtcblx0aWYgKHdpbmRvdy5jYXRiZXJyeSkge1xuXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcblx0fVxuXHR2YXIgc2VsZiA9IHRoaXM7XG5cblx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChmdWxmaWxsKSB7XG5cdFx0d2luZG93LmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRzZWxmLndyYXBEb2N1bWVudCgpO1xuXHRcdFx0d2luZG93LmNhdGJlcnJ5ID0gc2VsZjtcblx0XHRcdGZ1bGZpbGwoKTtcblx0XHR9KTtcblx0fSk7XG59OyIsIi8qXG4gKiBjYXRiZXJyeVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNCBEZW5pcyBSZWNoa3Vub3YgYW5kIHByb2plY3QgY29udHJpYnV0b3JzLlxuICpcbiAqIGNhdGJlcnJ5J3MgbGljZW5zZSBmb2xsb3dzOlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXG4gKiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvblxuICogZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLFxuICogaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSxcbiAqIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsXG4gKiBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuICogc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbiAqIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1NcbiAqIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICpcbiAqIFRoaXMgbGljZW5zZSBhcHBsaWVzIHRvIGFsbCBwYXJ0cyBvZiBjYXRiZXJyeSB0aGF0IGFyZSBub3QgZXh0ZXJuYWxseVxuICogbWFpbnRhaW5lZCBsaWJyYXJpZXMuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSBDb29raWVXcmFwcGVyO1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWwnKSxcblx0Q29va2llV3JhcHBlckJhc2UgPSByZXF1aXJlKCcuLi9saWIvYmFzZS9Db29raWVXcmFwcGVyQmFzZScpO1xuXG51dGlsLmluaGVyaXRzKENvb2tpZVdyYXBwZXIsIENvb2tpZVdyYXBwZXJCYXNlKTtcblxuLyoqXG4gKiBDcmVhdGVzIG5ldyBpbnN0YW5jZSBvZiB0aGUgYnJvd3NlciBjb29raWUgd3JhcHBlci5cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBDb29raWVXcmFwcGVyKCR3aW5kb3cpIHtcblx0Q29va2llV3JhcHBlckJhc2UuY2FsbCh0aGlzKTtcblx0dGhpcy5fd2luZG93ID0gJHdpbmRvdztcbn1cblxuLyoqXG4gKiBDdXJyZW50IGJyb3dzZXIgd2luZG93LlxuICogQHR5cGUge1dpbmRvd31cbiAqIEBwcml2YXRlXG4gKi9cbkNvb2tpZVdyYXBwZXIucHJvdG90eXBlLl93aW5kb3cgPSBudWxsO1xuXG4vKipcbiAqIEdldHMgY3VycmVudCBjb29raWUgc3RyaW5nLlxuICogQHJldHVybnMge3N0cmluZ30gQ29va2llIHN0cmluZy5cbiAqL1xuQ29va2llV3JhcHBlci5wcm90b3R5cGUuZ2V0Q29va2llU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuXHRyZXR1cm4gdGhpcy5fd2luZG93LmRvY3VtZW50LmNvb2tpZSA/XG5cdFx0dGhpcy5fd2luZG93LmRvY3VtZW50LmNvb2tpZS50b1N0cmluZygpIDpcblx0XHQnJztcbn07XG5cbi8qKlxuICogU2V0cyBjb29raWUgdG8gdGhpcyB3cmFwcGVyLlxuICogQHBhcmFtIHtPYmplY3R9IGNvb2tpZVNldHVwIENvb2tpZSBzZXR1cCBvYmplY3QuXG4gKiBAcGFyYW0ge3N0cmluZ30gY29va2llU2V0dXAua2V5IENvb2tpZSBrZXkuXG4gKiBAcGFyYW0ge3N0cmluZ30gY29va2llU2V0dXAudmFsdWUgQ29va2llIHZhbHVlLlxuICogQHBhcmFtIHtudW1iZXI/fSBjb29raWVTZXR1cC5tYXhBZ2UgTWF4IGNvb2tpZSBhZ2UgaW4gc2Vjb25kcy5cbiAqIEBwYXJhbSB7RGF0ZT99IGNvb2tpZVNldHVwLmV4cGlyZXMgRXhwaXJlIGRhdGUuXG4gKiBAcGFyYW0ge3N0cmluZz99IGNvb2tpZVNldHVwLnBhdGggVVJJIHBhdGggZm9yIGNvb2tpZS5cbiAqIEBwYXJhbSB7c3RyaW5nP30gY29va2llU2V0dXAuZG9tYWluIENvb2tpZSBkb21haW4uXG4gKiBAcGFyYW0ge2Jvb2xlYW4/fSBjb29raWVTZXR1cC5zZWN1cmUgSXMgY29va2llIHNlY3VyZWQuXG4gKiBAcGFyYW0ge2Jvb2xlYW4/fSBjb29raWVTZXR1cC5odHRwT25seSBJcyBjb29raWUgSFRUUCBvbmx5LlxuICogQHJldHVybnMge3N0cmluZ30gQ29va2llIHNldHVwIHN0cmluZy5cbiAqL1xuQ29va2llV3JhcHBlci5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gKGNvb2tpZVNldHVwKSB7XG5cdHZhciBjb29raWUgPSB0aGlzLl9jb252ZXJ0VG9Db29raWVTZXR1cChjb29raWVTZXR1cCk7XG5cdHRoaXMuX3dpbmRvdy5kb2N1bWVudC5jb29raWUgPSBjb29raWU7XG5cdHJldHVybiBjb29raWU7XG59OyIsIi8qXG4gKiBjYXRiZXJyeVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNSBEZW5pcyBSZWNoa3Vub3YgYW5kIHByb2plY3QgY29udHJpYnV0b3JzLlxuICpcbiAqIGNhdGJlcnJ5J3MgbGljZW5zZSBmb2xsb3dzOlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXG4gKiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvblxuICogZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLFxuICogaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSxcbiAqIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsXG4gKiBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuICogc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbiAqIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1NcbiAqIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICpcbiAqIFRoaXMgbGljZW5zZSBhcHBsaWVzIHRvIGFsbCBwYXJ0cyBvZiBjYXRiZXJyeSB0aGF0IGFyZSBub3QgZXh0ZXJuYWxseVxuICogbWFpbnRhaW5lZCBsaWJyYXJpZXMuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERvY3VtZW50UmVuZGVyZXI7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgndXRpbCcpLFxuXHRlcnJvckhlbHBlciA9IHJlcXVpcmUoJy4uL2xpYi9oZWxwZXJzL2Vycm9ySGVscGVyJyksXG5cdG1vZHVsZUhlbHBlciA9IHJlcXVpcmUoJy4uL2xpYi9oZWxwZXJzL21vZHVsZUhlbHBlcicpLFxuXHREb2N1bWVudFJlbmRlcmVyQmFzZSA9IHJlcXVpcmUoJy4uL2xpYi9iYXNlL0RvY3VtZW50UmVuZGVyZXJCYXNlJyk7XG5cbnV0aWwuaW5oZXJpdHMoRG9jdW1lbnRSZW5kZXJlciwgRG9jdW1lbnRSZW5kZXJlckJhc2UpO1xuXG52YXIgU1BFQ0lBTF9JRFMgPSB7XG5cdFx0JCRoZWFkOiAnJCRoZWFkJyxcblx0XHQkJGRvY3VtZW50OiAnJCRkb2N1bWVudCdcblx0fSxcblx0RVJST1JfQ1JFQVRFX1dST05HX0FSR1VNRU5UUyA9ICdUYWcgbmFtZSBzaG91bGQgYmUgYSBzdHJpbmcgJyArXG5cdFx0J2FuZCBhdHRyaWJ1dGVzIHNob3VsZCBiZSBhbiBvYmplY3QnLFxuXHRFUlJPUl9DUkVBVEVfV1JPTkdfTkFNRSA9ICdDb21wb25lbnQgZm9yIHRhZyBcIiVzXCIgbm90IGZvdW5kJyxcblx0RVJST1JfQ1JFQVRFX1dST05HX0lEID0gJ1RoZSBJRCBpcyBub3Qgc3BlY2lmaWVkIG9yIGFscmVhZHkgdXNlZCcsXG5cdFRBR19OQU1FUyA9IHtcblx0XHRUSVRMRTogJ1RJVExFJyxcblx0XHRIVE1MOiAnSFRNTCcsXG5cdFx0SEVBRDogJ0hFQUQnLFxuXHRcdEJBU0U6ICdCQVNFJyxcblx0XHRTVFlMRTogJ1NUWUxFJyxcblx0XHRTQ1JJUFQ6ICdTQ1JJUFQnLFxuXHRcdE5PU0NSSVBUOiAnTk9TQ1JJUFQnLFxuXHRcdE1FVEE6ICdNRVRBJyxcblx0XHRMSU5LOiAnTElOSydcblx0fSxcblx0Tk9ERV9UWVBFUyA9IHtcblx0XHRFTEVNRU5UX05PREU6IDEsXG5cdFx0VEVYVF9OT0RFOiAzLFxuXHRcdFBST0NFU1NJTkdfSU5TVFJVQ1RJT05fTk9ERTogNyxcblx0XHRDT01NRU5UX05PREU6IDhcblx0fSxcblx0Ly8gaHR0cDovL3d3dy53My5vcmcvVFIvMjAxNS9XRC11aWV2ZW50cy0yMDE1MDMxOS8jZXZlbnQtdHlwZXMtbGlzdFxuXHROT05fQlVCQkxJTkdfRVZFTlRTID0ge1xuXHRcdGFib3J0OiB0cnVlLFxuXHRcdGJsdXI6IHRydWUsXG5cdFx0ZXJyb3I6IHRydWUsXG5cdFx0Zm9jdXM6IHRydWUsXG5cdFx0bG9hZDogdHJ1ZSxcblx0XHRtb3VzZWVudGVyOiB0cnVlLFxuXHRcdG1vdXNlbGVhdmU6IHRydWUsXG5cdFx0cmVzaXplOiB0cnVlLFxuXHRcdHVubG9hZDogdHJ1ZVxuXHR9O1xuXG4vKipcbiAqIENyZWF0ZXMgbmV3IGluc3RhbmNlIG9mIHRoZSBkb2N1bWVudCByZW5kZXJlci5cbiAqIEBwYXJhbSB7U2VydmljZUxvY2F0b3J9ICRzZXJ2aWNlTG9jYXRvciBMb2NhdG9yIHRvIHJlc29sdmUgZGVwZW5kZW5jaWVzLlxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBEb2N1bWVudFJlbmRlcmVyQmFzZVxuICovXG5mdW5jdGlvbiBEb2N1bWVudFJlbmRlcmVyKCRzZXJ2aWNlTG9jYXRvcikge1xuXHREb2N1bWVudFJlbmRlcmVyQmFzZS5jYWxsKHRoaXMsICRzZXJ2aWNlTG9jYXRvcik7XG5cdHRoaXMuX2NvbXBvbmVudEluc3RhbmNlcyA9IHt9O1xuXHR0aGlzLl9jb21wb25lbnRFbGVtZW50cyA9IHt9O1xuXHR0aGlzLl9jb21wb25lbnRCaW5kaW5ncyA9IHt9O1xuXHR0aGlzLl9jdXJyZW50Q2hhbmdlZFN0b3JlcyA9IHt9O1xuXHR0aGlzLl93aW5kb3cgPSAkc2VydmljZUxvY2F0b3IucmVzb2x2ZSgnd2luZG93Jyk7XG5cdHRoaXMuX2NvbmZpZyA9ICRzZXJ2aWNlTG9jYXRvci5yZXNvbHZlKCdjb25maWcnKTtcblx0dGhpcy5fc3RvcmVEaXNwYXRjaGVyID0gJHNlcnZpY2VMb2NhdG9yLnJlc29sdmUoJ3N0b3JlRGlzcGF0Y2hlcicpO1xuXG5cdHZhciBzZWxmID0gdGhpcztcblxuXHR0aGlzLl9ldmVudEJ1cy5vbignc3RvcmVDaGFuZ2VkJywgZnVuY3Rpb24gKHN0b3JlTmFtZSkge1xuXHRcdHNlbGYuX2N1cnJlbnRDaGFuZ2VkU3RvcmVzW3N0b3JlTmFtZV0gPSB0cnVlO1xuXHRcdGlmIChzZWxmLl9pc1N0YXRlQ2hhbmdpbmcpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0c2VsZi5fdXBkYXRlU3RvcmVDb21wb25lbnRzKCk7XG5cdH0pO1xufVxuXG4vKipcbiAqIEN1cnJlbnQgYXBwbGljYXRpb24gY29uZmlnLlxuICogQHR5cGUge09iamVjdH1cbiAqIEBwcml2YXRlXG4gKi9cbkRvY3VtZW50UmVuZGVyZXIucHJvdG90eXBlLl9jb25maWcgPSBudWxsO1xuXG4vKipcbiAqIEN1cnJlbnQgc3RvcmUgZGlzcGF0Y2hlci5cbiAqIEB0eXBlIHtTdG9yZURpc3BhdGNoZXJ9XG4gKiBAcHJvdGVjdGVkXG4gKi9cbkRvY3VtZW50UmVuZGVyZXIucHJvdG90eXBlLl9zdG9yZURpc3BhdGNoZXIgPSBudWxsO1xuXG4vKipcbiAqIEN1cnJlbnQgc2V0IG9mIGNvbXBvbmVudCBpbnN0YW5jZXMgYnkgdW5pcXVlIGtleXMuXG4gKiBAdHlwZSB7T2JqZWN0fVxuICogQHByaXZhdGVcbiAqL1xuRG9jdW1lbnRSZW5kZXJlci5wcm90b3R5cGUuX2NvbXBvbmVudEluc3RhbmNlcyA9IG51bGw7XG5cbi8qKlxuICogQ3VycmVudCBzZXQgb2YgY29tcG9uZW50IGVsZW1lbnRzIGJ5IHVuaXF1ZSBrZXlzLlxuICogQHR5cGUge09iamVjdH1cbiAqIEBwcml2YXRlXG4gKi9cbkRvY3VtZW50UmVuZGVyZXIucHJvdG90eXBlLl9jb21wb25lbnRFbGVtZW50cyA9IG51bGw7XG5cbi8qKlxuICogQ3VycmVudCBzZXQgb2YgY29tcG9uZW50IGJpbmRpbmdzIGJ5IHVuaXF1ZSBrZXlzLlxuICogQHR5cGUge09iamVjdH1cbiAqIEBwcml2YXRlXG4gKi9cbkRvY3VtZW50UmVuZGVyZXIucHJvdG90eXBlLl9jb21wb25lbnRCaW5kaW5ncyA9IG51bGw7XG5cbi8qKlxuICogQ3VycmVudCByb3V0aW5nIGNvbnRleHQuXG4gKiBAdHlwZSB7T2JqZWN0fVxuICogQHByaXZhdGVcbiAqL1xuRG9jdW1lbnRSZW5kZXJlci5wcm90b3R5cGUuX2N1cnJlbnRSb3V0aW5nQ29udGV4dCA9IG51bGw7XG5cbi8qKlxuICogQ3VycmVudCBzZXQgb2YgY2hhbmdlZCBzdG9yZXMuXG4gKiBAdHlwZSB7T2JqZWN0fVxuICogQHByaXZhdGVcbiAqL1xuRG9jdW1lbnRSZW5kZXJlci5wcm90b3R5cGUuX2N1cnJlbnRDaGFuZ2VkU3RvcmVzID0gbnVsbDtcblxuLyoqXG4gKiBDdXJyZW50IHByb21pc2UgZm9yIHJlbmRlcmVkIHBhZ2UuXG4gKiBAdHlwZSB7UHJvbWlzZX1cbiAqIEBwcml2YXRlXG4gKi9cbkRvY3VtZW50UmVuZGVyZXIucHJvdG90eXBlLl9yZW5kZXJlZFByb21pc2UgPSBudWxsO1xuXG4vKipcbiAqIEN1cnJlbnQgc3RhdGUgb2YgdXBkYXRpbmcgY29tcG9uZW50cy5cbiAqIEB0eXBlIHtib29sZWFufVxuICogQHByaXZhdGVcbiAqL1xuRG9jdW1lbnRSZW5kZXJlci5wcm90b3R5cGUuX2lzVXBkYXRpbmcgPSBmYWxzZTtcblxuLyoqXG4gKiBDdXJyZW50IGF3YWl0aW5nIHJvdXRpbmcuXG4gKiBAdHlwZSB7e3N0YXRlOiBPYmplY3QsIHJvdXRpbmdDb250ZXh0OiBPYmplY3R9fVxuICogQHByaXZhdGVcbiAqL1xuRG9jdW1lbnRSZW5kZXJlci5wcm90b3R5cGUuX2F3YWl0aW5nUm91dGluZyA9IG51bGw7XG5cbi8qKlxuICogU2V0cyB0aGUgaW5pdGlhbCBzdGF0ZSBvZiB0aGUgYXBwbGljYXRpb24uXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhdGUgTmV3IHN0YXRlIG9mIGFwcGxpY2F0aW9uLlxuICogQHBhcmFtIHtPYmplY3R9IHJvdXRpbmdDb250ZXh0IFJvdXRpbmcgY29udGV4dC5cbiAqIEByZXR1cm5zIHtQcm9taXNlfSBQcm9taXNlIGZvciBub3RoaW5nLlxuICovXG5Eb2N1bWVudFJlbmRlcmVyLnByb3RvdHlwZS5pbml0V2l0aFN0YXRlID0gZnVuY3Rpb24gKHN0YXRlLCByb3V0aW5nQ29udGV4dCkge1xuXHR2YXIgc2VsZiA9IHRoaXM7XG5cdHJldHVybiBzZWxmLl9nZXRQcm9taXNlRm9yUmVhZHlTdGF0ZSgpXG5cdFx0LnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0c2VsZi5fY3VycmVudFJvdXRpbmdDb250ZXh0ID0gcm91dGluZ0NvbnRleHQ7XG5cdFx0XHRyZXR1cm4gc2VsZi5fc3RvcmVEaXNwYXRjaGVyLnNldFN0YXRlKHN0YXRlLCByb3V0aW5nQ29udGV4dCk7XG5cdFx0fSlcblx0XHQudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gc2VsZi5faW5pdGlhbFdyYXAoKTtcblx0XHR9KTtcbn07XG5cbi8qKlxuICogUmVuZGVycyBuZXcgc3RhdGUgb2YgYXBwbGljYXRpb24uXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhdGUgTmV3IHN0YXRlIG9mIGFwcGxpY2F0aW9uLlxuICogQHBhcmFtIHtPYmplY3R9IHJvdXRpbmdDb250ZXh0IFJvdXRpbmcgY29udGV4dC5cbiAqIEByZXR1cm5zIHtQcm9taXNlfSBQcm9taXNlIGZvciBub3RoaW5nLlxuICovXG5Eb2N1bWVudFJlbmRlcmVyLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoc3RhdGUsIHJvdXRpbmdDb250ZXh0KSB7XG5cdHRoaXMuX2F3YWl0aW5nUm91dGluZyA9IHtcblx0XHRzdGF0ZTogc3RhdGUsXG5cdFx0cm91dGluZ0NvbnRleHQ6IHJvdXRpbmdDb250ZXh0XG5cdH07XG5cdGlmICh0aGlzLl9pc1N0YXRlQ2hhbmdpbmcpIHtcblx0XHRyZXR1cm4gdGhpcy5fcmVuZGVyZWRQcm9taXNlO1xuXHR9XG5cblx0Ly8gd2Ugc2hvdWxkIHNldCB0aGlzIGZsYWcgdG8gYXZvaWQgXCJzdG9yZUNoYW5nZWRcIlxuXHQvLyBldmVudCBoYW5kbGluZyBmb3Igbm93XG5cdHRoaXMuX2lzU3RhdGVDaGFuZ2luZyA9IHRydWU7XG5cblx0dmFyIHNlbGYgPSB0aGlzO1xuXHRzZWxmLl9yZW5kZXJlZFByb21pc2UgPSB0aGlzLl9nZXRQcm9taXNlRm9yUmVhZHlTdGF0ZSgpXG5cdFx0LnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0Ly8gYW5kIHRoZW4gd2UgdXBkYXRlIGFsbCBjb21wb25lbnRzIG9mIHRoZXNlIHN0b3JlcyBpbiBhIGJhdGNoLlxuXHRcdFx0cmV0dXJuIHNlbGYuX3VwZGF0ZVN0b3JlQ29tcG9uZW50cygpO1xuXHRcdH0pXG5cdFx0LmNhdGNoKGZ1bmN0aW9uIChyZWFzb24pIHtcblx0XHRcdHNlbGYuX2V2ZW50QnVzLmVtaXQoJ2Vycm9yJywgcmVhc29uKTtcblx0XHR9KVxuXHRcdC50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdHNlbGYuX2lzU3RhdGVDaGFuZ2luZyA9IGZhbHNlO1xuXHRcdH0pO1xuXG5cdHJldHVybiB0aGlzLl9yZW5kZXJlZFByb21pc2U7XG59O1xuXG4vKipcbiAqIFJlbmRlcnMgY29tcG9uZW50IGludG8gSFRNTCBlbGVtZW50LlxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50IEhUTUwgZWxlbWVudCBvZiBjb21wb25lbnRcbiAqIEBwYXJhbSB7T2JqZWN0P30gcmVuZGVyaW5nQ29udGV4dCBSZW5kZXJpbmcgY29udGV4dCBmb3IgZ3JvdXAgcmVuZGVyaW5nLlxuICovXG5Eb2N1bWVudFJlbmRlcmVyLnByb3RvdHlwZS5yZW5kZXJDb21wb25lbnQgPVxuXHRmdW5jdGlvbiAoZWxlbWVudCwgcmVuZGVyaW5nQ29udGV4dCkge1xuXHRcdHZhciBzZWxmID0gdGhpcztcblx0XHRyZXR1cm4gdGhpcy5fZ2V0UHJvbWlzZUZvclJlYWR5U3RhdGUoKVxuXHRcdFx0LnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRyZW5kZXJpbmdDb250ZXh0ID0gcmVuZGVyaW5nQ29udGV4dCB8fFxuXHRcdFx0XHRcdHNlbGYuX2NyZWF0ZVJlbmRlcmluZ0NvbnRleHQoW10pO1xuXG5cdFx0XHRcdHZhciBjb21wb25lbnROYW1lID0gbW9kdWxlSGVscGVyLmdldE9yaWdpbmFsQ29tcG9uZW50TmFtZShcblx0XHRcdFx0XHRcdGVsZW1lbnQudGFnTmFtZVxuXHRcdFx0XHRcdCksXG5cdFx0XHRcdFx0aGFkQ2hpbGRyZW4gPSBlbGVtZW50Lmhhc0NoaWxkTm9kZXMoKSxcblx0XHRcdFx0XHRjb21wb25lbnQgPSByZW5kZXJpbmdDb250ZXh0LmNvbXBvbmVudHNbY29tcG9uZW50TmFtZV0sXG5cdFx0XHRcdFx0aWQgPSBzZWxmLl9nZXRJZChlbGVtZW50KSxcblx0XHRcdFx0XHRpbnN0YW5jZSA9IHNlbGYuX2NvbXBvbmVudEluc3RhbmNlc1tpZF07XG5cblx0XHRcdFx0aWYgKCFjb21wb25lbnQgfHwgIWlkIHx8XG5cdFx0XHRcdFx0cmVuZGVyaW5nQ29udGV4dC5yZW5kZXJlZElkcy5oYXNPd25Qcm9wZXJ0eShpZCkpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZW5kZXJpbmdDb250ZXh0LnJlbmRlcmVkSWRzW2lkXSA9IHRydWU7XG5cblx0XHRcdFx0aWYgKCFpbnN0YW5jZSkge1xuXHRcdFx0XHRcdGNvbXBvbmVudC5jb25zdHJ1Y3Rvci5wcm90b3R5cGUuJGNvbnRleHQgPVxuXHRcdFx0XHRcdFx0c2VsZi5fZ2V0Q29tcG9uZW50Q29udGV4dChjb21wb25lbnQsIGVsZW1lbnQpO1xuXHRcdFx0XHRcdGluc3RhbmNlID0gc2VsZi5fc2VydmljZUxvY2F0b3IucmVzb2x2ZUluc3RhbmNlKFxuXHRcdFx0XHRcdFx0Y29tcG9uZW50LmNvbnN0cnVjdG9yLCByZW5kZXJpbmdDb250ZXh0LmNvbmZpZ1xuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0aW5zdGFuY2UuJGNvbnRleHQgPSBjb21wb25lbnQuY29uc3RydWN0b3IucHJvdG90eXBlLiRjb250ZXh0O1xuXHRcdFx0XHRcdHNlbGYuX2NvbXBvbmVudEluc3RhbmNlc1tpZF0gPSBpbnN0YW5jZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhciBldmVudEFyZ3MgPSB7XG5cdFx0XHRcdFx0bmFtZTogY29tcG9uZW50TmFtZSxcblx0XHRcdFx0XHRjb250ZXh0OiBpbnN0YW5jZS4kY29udGV4dFxuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdHNlbGYuX2NvbXBvbmVudEVsZW1lbnRzW2lkXSA9IGVsZW1lbnQ7XG5cblx0XHRcdFx0dmFyIHN0YXJ0VGltZSA9IERhdGUubm93KCk7XG5cdFx0XHRcdHNlbGYuX2V2ZW50QnVzLmVtaXQoJ2NvbXBvbmVudFJlbmRlcicsIGV2ZW50QXJncyk7XG5cblx0XHRcdFx0cmV0dXJuIHNlbGYuX3VuYmluZEFsbChlbGVtZW50LCByZW5kZXJpbmdDb250ZXh0KVxuXHRcdFx0XHRcdC5jYXRjaChmdW5jdGlvbiAocmVhc29uKSB7XG5cdFx0XHRcdFx0XHRzZWxmLl9ldmVudEJ1cy5lbWl0KCdlcnJvcicsIHJlYXNvbik7XG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0XHQudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRpZiAoaW5zdGFuY2UuJGNvbnRleHQuZWxlbWVudCAhPT0gZWxlbWVudCkge1xuXHRcdFx0XHRcdFx0XHRpbnN0YW5jZS4kY29udGV4dCA9IHNlbGYuX2dldENvbXBvbmVudENvbnRleHQoXG5cdFx0XHRcdFx0XHRcdFx0Y29tcG9uZW50LCBlbGVtZW50XG5cdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR2YXIgcmVuZGVyTWV0aG9kID0gbW9kdWxlSGVscGVyLmdldE1ldGhvZFRvSW52b2tlKFxuXHRcdFx0XHRcdFx0XHRpbnN0YW5jZSwgJ3JlbmRlcidcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gbW9kdWxlSGVscGVyLmdldFNhZmVQcm9taXNlKHJlbmRlck1ldGhvZCk7XG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0XHQudGhlbihmdW5jdGlvbiAoZGF0YUNvbnRleHQpIHtcblx0XHRcdFx0XHRcdHJldHVybiBjb21wb25lbnQudGVtcGxhdGUucmVuZGVyKGRhdGFDb250ZXh0KTtcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdC5jYXRjaChmdW5jdGlvbiAocmVhc29uKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gc2VsZi5faGFuZGxlUmVuZGVyRXJyb3IoXG5cdFx0XHRcdFx0XHRcdGVsZW1lbnQsIGNvbXBvbmVudCwgcmVhc29uXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0LnRoZW4oZnVuY3Rpb24gKGh0bWwpIHtcblx0XHRcdFx0XHRcdGlmIChlbGVtZW50LnRhZ05hbWUgPT09IFRBR19OQU1FUy5IRUFEKSB7XG5cdFx0XHRcdFx0XHRcdHNlbGYuX21lcmdlSGVhZChlbGVtZW50LCBodG1sKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdGVsZW1lbnQuaW5uZXJIVE1MID0gaHRtbDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHZhciBwcm9taXNlcyA9IHNlbGYuX2ZpbmRDb21wb25lbnRzKFxuXHRcdFx0XHRcdFx0XHRlbGVtZW50LCByZW5kZXJpbmdDb250ZXh0XG5cdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0XHRcdC5tYXAoZnVuY3Rpb24gKGlubmVyQ29tcG9uZW50KSB7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHNlbGYucmVuZGVyQ29tcG9uZW50KFxuXHRcdFx0XHRcdFx0XHRcdFx0aW5uZXJDb21wb25lbnQsIHJlbmRlcmluZ0NvbnRleHRcblx0XHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0XHQudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRldmVudEFyZ3MudGltZSA9IERhdGUubm93KCkgLSBzdGFydFRpbWU7XG5cdFx0XHRcdFx0XHRzZWxmLl9ldmVudEJ1cy5lbWl0KCdjb21wb25lbnRSZW5kZXJlZCcsIGV2ZW50QXJncyk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gc2VsZi5fYmluZENvbXBvbmVudChlbGVtZW50KTtcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdC50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdGlmICghaGFkQ2hpbGRyZW4pIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0c2VsZi5fY29sbGVjdFJlbmRlcmluZ0dhcmJhZ2UocmVuZGVyaW5nQ29udGV4dCk7XG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0XHQuY2F0Y2goZnVuY3Rpb24gKHJlYXNvbikge1xuXHRcdFx0XHRcdFx0c2VsZi5fZXZlbnRCdXMuZW1pdCgnZXJyb3InLCByZWFzb24pO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdH07XG5cbi8qKlxuICogR2V0cyBjb21wb25lbnQgaW5zdGFuY2UgYnkgSUQuXG4gKiBAcGFyYW0ge1N0cmluZ30gaWQgQ29tcG9uZW50IElELlxuICogQHJldHVybnMge09iamVjdH0gQ29tcG9uZW50IGluc3RhbmNlLlxuICovXG5Eb2N1bWVudFJlbmRlcmVyLnByb3RvdHlwZS5nZXRDb21wb25lbnRCeUlkID0gZnVuY3Rpb24gKGlkKSB7XG5cdHJldHVybiB0aGlzLl9jb21wb25lbnRJbnN0YW5jZXNbaWRdIHx8IG51bGw7XG59O1xuXG4vKipcbiAqIENoZWNrcyB0aGF0IGV2ZXJ5IGluc3RhbmNlIG9mIGNvbXBvbmVudCBoYXMgZWxlbWVudCBvbiB0aGUgcGFnZSBhbmRcbiAqIHJlbW92ZXMgYWxsIHJlZmVyZW5jZXMgdG8gY29tcG9uZW50cyByZW1vdmVkIGZyb20gRE9NLlxuICogQHJldHVybnMge1Byb21pc2V9IFByb21pc2UgZm9yIG5vdGhpbmcuXG4gKi9cbkRvY3VtZW50UmVuZGVyZXIucHJvdG90eXBlLmNvbGxlY3RHYXJiYWdlID0gZnVuY3Rpb24gKCkge1xuXHR2YXIgc2VsZiA9IHRoaXM7XG5cdHJldHVybiB0aGlzLl9nZXRQcm9taXNlRm9yUmVhZHlTdGF0ZSgpLlxuXHRcdHRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIHByb21pc2VzID0gW107XG5cdFx0XHRPYmplY3Qua2V5cyhzZWxmLl9jb21wb25lbnRFbGVtZW50cylcblx0XHRcdFx0LmZvckVhY2goZnVuY3Rpb24gKGlkKSB7XG5cdFx0XHRcdFx0aWYgKFNQRUNJQUxfSURTLmhhc093blByb3BlcnR5KGlkKSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR2YXIgZWxlbWVudCA9IHNlbGYuX3dpbmRvdy5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG5cdFx0XHRcdFx0aWYgKGVsZW1lbnQpIHtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR2YXIgcHJvbWlzZSA9IHNlbGYuX3VuYmluZENvbXBvbmVudChzZWxmLl9jb21wb25lbnRFbGVtZW50c1tpZF0pXG5cdFx0XHRcdFx0XHQudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRcdGRlbGV0ZSBzZWxmLl9jb21wb25lbnRFbGVtZW50c1tpZF07XG5cdFx0XHRcdFx0XHRcdGRlbGV0ZSBzZWxmLl9jb21wb25lbnRJbnN0YW5jZXNbaWRdO1xuXHRcdFx0XHRcdFx0XHRkZWxldGUgc2VsZi5fY29tcG9uZW50QmluZGluZ3NbaWRdO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0cHJvbWlzZXMucHVzaChwcm9taXNlKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuXHRcdH0pO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuZCByZW5kZXJzIGNvbXBvbmVudCBlbGVtZW50LlxuICogQHBhcmFtIHtTdHJpbmd9IHRhZ05hbWUgTmFtZSBvZiBIVE1MIHRhZy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBhdHRyaWJ1dGVzIEVsZW1lbnQgYXR0cmlidXRlcy5cbiAqIEByZXR1cm5zIHtQcm9taXNlPEVsZW1lbnQ+fSBQcm9taXNlIGZvciBIVE1MIGVsZW1lbnQgd2l0aCByZW5kZXJlZCBjb21wb25lbnQuXG4gKi9cbkRvY3VtZW50UmVuZGVyZXIucHJvdG90eXBlLmNyZWF0ZUNvbXBvbmVudCA9IGZ1bmN0aW9uICh0YWdOYW1lLCBhdHRyaWJ1dGVzKSB7XG5cdGlmICh0eXBlb2YodGFnTmFtZSkgIT09ICdzdHJpbmcnIHx8ICFhdHRyaWJ1dGVzIHx8XG5cdFx0dHlwZW9mKGF0dHJpYnV0ZXMpICE9PSAnb2JqZWN0Jykge1xuXHRcdHJldHVybiBQcm9taXNlLnJlamVjdChcblx0XHRcdG5ldyBFcnJvcihFUlJPUl9DUkVBVEVfV1JPTkdfQVJHVU1FTlRTKVxuXHRcdCk7XG5cdH1cblxuXHR2YXIgc2VsZiA9IHRoaXM7XG5cdHJldHVybiB0aGlzLl9nZXRQcm9taXNlRm9yUmVhZHlTdGF0ZSgpXG5cdFx0LnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIGNvbXBvbmVudHMgPSBzZWxmLl9jb21wb25lbnRMb2FkZXIuZ2V0Q29tcG9uZW50c0J5TmFtZXMoKSxcblx0XHRcdFx0Y29tcG9uZW50TmFtZSA9IG1vZHVsZUhlbHBlci5nZXRPcmlnaW5hbENvbXBvbmVudE5hbWUodGFnTmFtZSk7XG5cblx0XHRcdGlmIChtb2R1bGVIZWxwZXIuaXNIZWFkQ29tcG9uZW50KGNvbXBvbmVudE5hbWUpIHx8XG5cdFx0XHRcdG1vZHVsZUhlbHBlci5pc0RvY3VtZW50Q29tcG9uZW50KGNvbXBvbmVudE5hbWUpIHx8XG5cdFx0XHRcdCFjb21wb25lbnRzLmhhc093blByb3BlcnR5KGNvbXBvbmVudE5hbWUpKSB7XG5cdFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChcblx0XHRcdFx0XHRuZXcgRXJyb3IodXRpbC5mb3JtYXQoRVJST1JfQ1JFQVRFX1dST05HX05BTUUsIHRhZ05hbWUpKVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgc2FmZVRhZ05hbWUgPSBtb2R1bGVIZWxwZXIuZ2V0VGFnTmFtZUZvckNvbXBvbmVudE5hbWUoY29tcG9uZW50TmFtZSk7XG5cblx0XHRcdHZhciBpZCA9IGF0dHJpYnV0ZXNbbW9kdWxlSGVscGVyLkFUVFJJQlVURV9JRF07XG5cdFx0XHRpZiAoIWlkIHx8IHNlbGYuX2NvbXBvbmVudEluc3RhbmNlcy5oYXNPd25Qcm9wZXJ0eShpZCkpIHtcblx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihFUlJPUl9DUkVBVEVfV1JPTkdfSUQpKTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIGVsZW1lbnQgPSBzZWxmLl93aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudChzYWZlVGFnTmFtZSk7XG5cdFx0XHRPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKVxuXHRcdFx0XHQuZm9yRWFjaChmdW5jdGlvbiAoYXR0cmlidXRlTmFtZSkge1xuXHRcdFx0XHRcdGVsZW1lbnQuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUsIGF0dHJpYnV0ZXNbYXR0cmlidXRlTmFtZV0pO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0cmV0dXJuIHNlbGYucmVuZGVyQ29tcG9uZW50KGVsZW1lbnQpXG5cdFx0XHRcdC50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRyZXR1cm4gZWxlbWVudDtcblx0XHRcdFx0fSk7XG5cdFx0fSk7XG59O1xuXG4vKipcbiAqIENsZWFycyBhbGwgcmVmZXJlbmNlcyB0byByZW1vdmVkIGNvbXBvbmVudHMgZHVyaW5nIHJlbmRlcmluZyBwcm9jZXNzLlxuICogQHBhcmFtIHtPYmplY3R9IHJlbmRlcmluZ0NvbnRleHQgQ29udGV4dCBvZiByZW5kZXJpbmcuXG4gKiBAcHJpdmF0ZVxuICovXG5Eb2N1bWVudFJlbmRlcmVyLnByb3RvdHlwZS5fY29sbGVjdFJlbmRlcmluZ0dhcmJhZ2UgPVxuXHRmdW5jdGlvbiAocmVuZGVyaW5nQ29udGV4dCkge1xuXHRcdHZhciBzZWxmID0gdGhpcztcblx0XHRPYmplY3Qua2V5cyhyZW5kZXJpbmdDb250ZXh0LnVuYm91bmRJZHMpXG5cdFx0XHQuZm9yRWFjaChmdW5jdGlvbiAoaWQpIHtcblx0XHRcdFx0Ly8gdGhpcyBjb21wb25lbnQgaGFzIGJlZW4gcmVuZGVyZWQgYWdhaW4gYW5kIHdlIGRvIG5vdCBuZWVkIHRvXG5cdFx0XHRcdC8vIHJlbW92ZSBpdC5cblx0XHRcdFx0aWYgKHJlbmRlcmluZ0NvbnRleHQucmVuZGVyZWRJZHMuaGFzT3duUHJvcGVydHkoaWQpKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZGVsZXRlIHNlbGYuX2NvbXBvbmVudEVsZW1lbnRzW2lkXTtcblx0XHRcdFx0ZGVsZXRlIHNlbGYuX2NvbXBvbmVudEluc3RhbmNlc1tpZF07XG5cdFx0XHRcdGRlbGV0ZSBzZWxmLl9jb21wb25lbnRCaW5kaW5nc1tpZF07XG5cdFx0XHR9KTtcblx0fTtcblxuLyoqXG4gKiBVbmJpbmRzIGFsbCBldmVudCBoYW5kbGVycyBmcm9tIHNwZWNpZmllZCBjb21wb25lbnQgYW5kIGFsbCBpdCdzIGRlc2NlbmRhbnRzLlxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50IENvbXBvbmVudCBIVE1MIGVsZW1lbnQuXG4gKiBAcGFyYW0ge09iamVjdH0gcmVuZGVyaW5nQ29udGV4dCBDb250ZXh0IG9mIHJlbmRlcmluZy5cbiAqIEByZXR1cm5zIHtQcm9taXNlfSBQcm9taXNlIGZvciBub3RoaW5nLlxuICogQHByaXZhdGVcbiAqL1xuRG9jdW1lbnRSZW5kZXJlci5wcm90b3R5cGUuX3VuYmluZEFsbCA9IGZ1bmN0aW9uIChlbGVtZW50LCByZW5kZXJpbmdDb250ZXh0KSB7XG5cdHZhciBzZWxmID0gdGhpcyxcblx0XHRpZCA9IHRoaXMuX2dldElkKGVsZW1lbnQpLFxuXHRcdHByb21pc2VzID0gW107XG5cblx0aWYgKGVsZW1lbnQuaGFzQ2hpbGROb2RlcygpKSB7XG5cdFx0c2VsZi5fZmluZENvbXBvbmVudHMoZWxlbWVudCwgcmVuZGVyaW5nQ29udGV4dClcblx0XHRcdC5mb3JFYWNoKGZ1bmN0aW9uIChpbm5lckVsZW1lbnQpIHtcblx0XHRcdFx0dmFyIGlkID0gc2VsZi5fZ2V0SWQoaW5uZXJFbGVtZW50KTtcblx0XHRcdFx0aWYgKHJlbmRlcmluZ0NvbnRleHQudW5ib3VuZElkcy5oYXNPd25Qcm9wZXJ0eShpZCkpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdFx0cmVuZGVyaW5nQ29udGV4dC51bmJvdW5kSWRzW2lkXSA9IHRydWU7XG5cdFx0XHRcdHByb21pc2VzLnB1c2goc2VsZi5fdW5iaW5kQ29tcG9uZW50KGlubmVyRWxlbWVudCkpO1xuXHRcdFx0fSk7XG5cdH1cblxuXHRpZiAoIXJlbmRlcmluZ0NvbnRleHQudW5ib3VuZElkcy5oYXNPd25Qcm9wZXJ0eShpZCkpIHtcblx0XHRwcm9taXNlcy5wdXNoKHRoaXMuX3VuYmluZENvbXBvbmVudChlbGVtZW50KSk7XG5cdFx0cmVuZGVyaW5nQ29udGV4dC51bmJvdW5kSWRzW2lkXSA9IHRydWU7XG5cdH1cblxuXHRyZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xufTtcblxuLyoqXG4gKiBVbmJpbmRzIGFsbCBldmVudCBoYW5kbGVycyBmcm9tIHNwZWNpZmllZCBjb21wb25lbnQuXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgQ29tcG9uZW50IEhUTUwgZWxlbWVudC5cbiAqIEByZXR1cm5zIHtQcm9taXNlfSBQcm9taXNlIGZvciBub3RoaW5nLlxuICogQHByaXZhdGVcbiAqL1xuRG9jdW1lbnRSZW5kZXJlci5wcm90b3R5cGUuX3VuYmluZENvbXBvbmVudCA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG5cdHZhciBpZCA9IHRoaXMuX2dldElkKGVsZW1lbnQpLFxuXHRcdHNlbGYgPSB0aGlzLFxuXHRcdGluc3RhbmNlID0gdGhpcy5fY29tcG9uZW50SW5zdGFuY2VzW2lkXTtcblx0aWYgKCFpbnN0YW5jZSkge1xuXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcblx0fVxuXHRpZiAodGhpcy5fY29tcG9uZW50QmluZGluZ3MuaGFzT3duUHJvcGVydHkoaWQpKSB7XG5cdFx0T2JqZWN0LmtleXModGhpcy5fY29tcG9uZW50QmluZGluZ3NbaWRdKVxuXHRcdFx0LmZvckVhY2goZnVuY3Rpb24gKGV2ZW50TmFtZSkge1xuXHRcdFx0XHRlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXG5cdFx0XHRcdFx0ZXZlbnROYW1lLFxuXHRcdFx0XHRcdHNlbGYuX2NvbXBvbmVudEJpbmRpbmdzW2lkXVtldmVudE5hbWVdLmhhbmRsZXIsXG5cdFx0XHRcdFx0Tk9OX0JVQkJMSU5HX0VWRU5UUy5oYXNPd25Qcm9wZXJ0eShldmVudE5hbWUpXG5cdFx0XHRcdCk7XG5cdFx0XHR9KTtcblx0XHRkZWxldGUgdGhpcy5fY29tcG9uZW50QmluZGluZ3NbaWRdO1xuXHR9XG5cdHZhciB1bmJpbmRNZXRob2QgPSBtb2R1bGVIZWxwZXIuZ2V0TWV0aG9kVG9JbnZva2UoaW5zdGFuY2UsICd1bmJpbmQnKTtcblx0cmV0dXJuIG1vZHVsZUhlbHBlci5nZXRTYWZlUHJvbWlzZSh1bmJpbmRNZXRob2QpXG5cdFx0LnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0c2VsZi5fZXZlbnRCdXMuZW1pdCgnY29tcG9uZW50VW5ib3VuZCcsIHtcblx0XHRcdFx0ZWxlbWVudDogZWxlbWVudCxcblx0XHRcdFx0aWQ6ICFTUEVDSUFMX0lEUy5oYXNPd25Qcm9wZXJ0eShpZCkgPyBpZCA6IG51bGxcblx0XHRcdH0pO1xuXHRcdH0pXG5cdFx0LmNhdGNoKGZ1bmN0aW9uIChyZWFzb24pIHtcblx0XHRcdHNlbGYuX2V2ZW50QnVzLmVtaXQoJ2Vycm9yJywgcmVhc29uKTtcblx0XHR9KTtcbn07XG5cbi8qKlxuICogQmluZHMgYWxsIHJlcXVpcmVkIGV2ZW50IGhhbmRsZXJzIHRvIGNvbXBvbmVudC5cbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCBDb21wb25lbnQgSFRNTCBlbGVtZW50LlxuICogQHJldHVybnMge1Byb21pc2V9IFByb21pc2UgZm9yIG5vdGhpbmcuXG4gKiBAcHJpdmF0ZVxuICovXG5Eb2N1bWVudFJlbmRlcmVyLnByb3RvdHlwZS5fYmluZENvbXBvbmVudCA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG5cdHZhciBpZCA9IHRoaXMuX2dldElkKGVsZW1lbnQpLFxuXHRcdHNlbGYgPSB0aGlzLFxuXHRcdGluc3RhbmNlID0gdGhpcy5fY29tcG9uZW50SW5zdGFuY2VzW2lkXTtcblx0aWYgKCFpbnN0YW5jZSkge1xuXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcblx0fVxuXG5cdHZhciBiaW5kTWV0aG9kID0gbW9kdWxlSGVscGVyLmdldE1ldGhvZFRvSW52b2tlKGluc3RhbmNlLCAnYmluZCcpO1xuXHRyZXR1cm4gbW9kdWxlSGVscGVyLmdldFNhZmVQcm9taXNlKGJpbmRNZXRob2QpXG5cdFx0LnRoZW4oZnVuY3Rpb24gKGJpbmRpbmdzKSB7XG5cdFx0XHRpZiAoIWJpbmRpbmdzIHx8IHR5cGVvZihiaW5kaW5ncykgIT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdHNlbGYuX2V2ZW50QnVzLmVtaXQoJ2NvbXBvbmVudEJvdW5kJywge1xuXHRcdFx0XHRcdGVsZW1lbnQ6IGVsZW1lbnQsXG5cdFx0XHRcdFx0aWQ6ICFTUEVDSUFMX0lEUy5oYXNPd25Qcm9wZXJ0eShpZCkgPyBpZCA6IG51bGxcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdHNlbGYuX2NvbXBvbmVudEJpbmRpbmdzW2lkXSA9IHt9O1xuXHRcdFx0T2JqZWN0LmtleXMoYmluZGluZ3MpXG5cdFx0XHRcdC5mb3JFYWNoKGZ1bmN0aW9uIChldmVudE5hbWUpIHtcblx0XHRcdFx0XHRldmVudE5hbWUgPSBldmVudE5hbWUudG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0XHRpZiAoc2VsZi5fY29tcG9uZW50QmluZGluZ3NbaWRdLmhhc093blByb3BlcnR5KGV2ZW50TmFtZSkpIHtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dmFyIHNlbGVjdG9ySGFuZGxlcnMgPSB7fTtcblx0XHRcdFx0XHRPYmplY3Qua2V5cyhiaW5kaW5nc1tldmVudE5hbWVdKVxuXHRcdFx0XHRcdFx0LmZvckVhY2goZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG5cdFx0XHRcdFx0XHRcdHZhciBoYW5kbGVyID0gYmluZGluZ3NbZXZlbnROYW1lXVtzZWxlY3Rvcl07XG5cdFx0XHRcdFx0XHRcdGlmICh0eXBlb2YoaGFuZGxlcikgIT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0c2VsZWN0b3JIYW5kbGVyc1tzZWxlY3Rvcl0gPSBoYW5kbGVyLmJpbmQoaW5zdGFuY2UpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0c2VsZi5fY29tcG9uZW50QmluZGluZ3NbaWRdW2V2ZW50TmFtZV0gPSB7XG5cdFx0XHRcdFx0XHRoYW5kbGVyOiBzZWxmLl9jcmVhdGVCaW5kaW5nSGFuZGxlcihcblx0XHRcdFx0XHRcdFx0ZWxlbWVudCwgc2VsZWN0b3JIYW5kbGVyc1xuXHRcdFx0XHRcdFx0KSxcblx0XHRcdFx0XHRcdHNlbGVjdG9ySGFuZGxlcnM6IHNlbGVjdG9ySGFuZGxlcnNcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcblx0XHRcdFx0XHRcdGV2ZW50TmFtZSxcblx0XHRcdFx0XHRcdHNlbGYuX2NvbXBvbmVudEJpbmRpbmdzW2lkXVtldmVudE5hbWVdLmhhbmRsZXIsXG5cdFx0XHRcdFx0XHROT05fQlVCQkxJTkdfRVZFTlRTLmhhc093blByb3BlcnR5KGV2ZW50TmFtZSlcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9KTtcblx0XHRcdHNlbGYuX2V2ZW50QnVzLmVtaXQoJ2NvbXBvbmVudEJvdW5kJywge1xuXHRcdFx0XHRlbGVtZW50OiBlbGVtZW50LFxuXHRcdFx0XHRpZDogaWRcblx0XHRcdH0pO1xuXHRcdH0pO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIHVuaXZlcnNhbCBldmVudCBoYW5kbGVyIGZvciBkZWxlZ2F0ZWQgZXZlbnRzLlxuICogQHBhcmFtIHtFbGVtZW50fSBjb21wb25lbnRSb290IFJvb3QgZWxlbWVudCBvZiBjb21wb25lbnQuXG4gKiBAcGFyYW0ge09iamVjdH0gc2VsZWN0b3JIYW5kbGVycyBNYXAgb2YgZXZlbnQgaGFuZGxlcnMgYnkgQ1NTIHNlbGVjdG9ycy5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gVW5pdmVyc2FsIGV2ZW50IGhhbmRsZXIgZm9yIGRlbGVnYXRlZCBldmVudHMuXG4gKiBAcHJpdmF0ZVxuICovXG5Eb2N1bWVudFJlbmRlcmVyLnByb3RvdHlwZS5fY3JlYXRlQmluZGluZ0hhbmRsZXIgPVxuXHRmdW5jdGlvbiAoY29tcG9uZW50Um9vdCwgc2VsZWN0b3JIYW5kbGVycykge1xuXHRcdHZhciBzZWxlY3RvcnMgPSBPYmplY3Qua2V5cyhzZWxlY3RvckhhbmRsZXJzKTtcblx0XHRyZXR1cm4gZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHR2YXIgZGlzcGF0Y2hlZEV2ZW50ID0gY3JlYXRlQ3VzdG9tRXZlbnQoZXZlbnQsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRyZXR1cm4gZWxlbWVudDtcblx0XHRcdFx0fSksXG5cdFx0XHRcdGVsZW1lbnQgPSBldmVudC50YXJnZXQsXG5cdFx0XHRcdHRhcmdldE1hdGNoZXMgPSBnZXRNYXRjaGVzTWV0aG9kKGVsZW1lbnQpLFxuXHRcdFx0XHRpc0hhbmRsZWQgPSBzZWxlY3RvcnMuc29tZShmdW5jdGlvbiAoc2VsZWN0b3IpIHtcblx0XHRcdFx0XHRpZiAodGFyZ2V0TWF0Y2hlcyhzZWxlY3RvcikpIHtcblx0XHRcdFx0XHRcdHNlbGVjdG9ySGFuZGxlcnNbc2VsZWN0b3JdKGRpc3BhdGNoZWRFdmVudCk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9KTtcblx0XHRcdGlmIChpc0hhbmRsZWQgfHwgIWV2ZW50LmJ1YmJsZXMpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR3aGlsZShlbGVtZW50LnBhcmVudEVsZW1lbnQgJiYgZWxlbWVudCAhPT0gY29tcG9uZW50Um9vdCkge1xuXHRcdFx0XHRlbGVtZW50ID0gZWxlbWVudC5wYXJlbnRFbGVtZW50O1xuXHRcdFx0XHR0YXJnZXRNYXRjaGVzID0gZ2V0TWF0Y2hlc01ldGhvZChlbGVtZW50KTtcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzZWxlY3RvcnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRpZiAoIXRhcmdldE1hdGNoZXMoc2VsZWN0b3JzW2ldKSkge1xuXHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlzSGFuZGxlZCA9IHRydWU7XG5cdFx0XHRcdFx0c2VsZWN0b3JIYW5kbGVyc1tzZWxlY3RvcnNbaV1dKGRpc3BhdGNoZWRFdmVudCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoaXNIYW5kbGVkKSB7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXHR9O1xuXG4vKipcbiAqIEZpbmRzIGFsbCBkZXNjZW5kYW50IGNvbXBvbmVudHMgb2Ygc3BlY2lmaWVkIGNvbXBvbmVudCBlbGVtZW50LlxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50IFJvb3QgY29tcG9uZW50IEhUTUwgZWxlbWVudCB0byBiZWdpbiBzZWFyY2ggd2l0aC5cbiAqIEBwYXJhbSB7T2JqZWN0fSByZW5kZXJpbmdDb250ZXh0IENvbnRleHQgb2YgcmVuZGVyaW5nLlxuICogQHByaXZhdGVcbiAqL1xuRG9jdW1lbnRSZW5kZXJlci5wcm90b3R5cGUuX2ZpbmRDb21wb25lbnRzID1cblx0ZnVuY3Rpb24gKGVsZW1lbnQsIHJlbmRlcmluZ0NvbnRleHQpIHtcblx0XHR2YXIgY29tcG9uZW50cyA9IFtdO1xuXHRcdHJlbmRlcmluZ0NvbnRleHQuY29tcG9uZW50VGFnc1xuXHRcdFx0LmZvckVhY2goZnVuY3Rpb24gKHRhZykge1xuXHRcdFx0XHR2YXIgbm9kZXMgPSBlbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKHRhZyk7XG5cdFx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdGNvbXBvbmVudHMucHVzaChub2Rlc1tpXSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdHJldHVybiBjb21wb25lbnRzO1xuXHR9O1xuXG4vKipcbiAqIEhhbmRsZXMgZXJyb3Igd2hpbGUgcmVuZGVyaW5nLlxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50IENvbXBvbmVudCBIVE1MIGVsZW1lbnQuXG4gKiBAcGFyYW0ge09iamVjdH0gY29tcG9uZW50IENvbXBvbmVudCBpbnN0YW5jZS5cbiAqIEBwYXJhbSB7RXJyb3J9IGVycm9yIEVycm9yIHRvIGhhbmRsZS5cbiAqIEByZXR1cm5zIHtQcm9taXNlPFN0cmluZz59IFByb21pc2UgZm9yIEhUTUwgc3RyaW5nLlxuICogQHByaXZhdGVcbiAqL1xuRG9jdW1lbnRSZW5kZXJlci5wcm90b3R5cGUuX2hhbmRsZVJlbmRlckVycm9yID1cblx0ZnVuY3Rpb24gKGVsZW1lbnQsIGNvbXBvbmVudCwgZXJyb3IpIHtcblx0XHR0aGlzLl9ldmVudEJ1cy5lbWl0KCdlcnJvcicsIGVycm9yKTtcblxuXHRcdC8vIGRvIG5vdCBjb3JydXB0IGV4aXN0ZWQgSEVBRCB3aGVuIGVycm9yIG9jY3Vyc1xuXHRcdGlmIChlbGVtZW50LnRhZ05hbWUgPT09IFRBR19OQU1FUy5IRUFEKSB7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCcnKTtcblx0XHR9XG5cblx0XHRpZiAoIXRoaXMuX2NvbmZpZy5pc1JlbGVhc2UgJiYgZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShlcnJvckhlbHBlci5wcmV0dHlQcmludChcblx0XHRcdFx0ZXJyb3IsIHRoaXMuX3dpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50XG5cdFx0XHQpKTtcblx0XHR9IGVsc2UgaWYgKGNvbXBvbmVudC5lcnJvclRlbXBsYXRlKSB7XG5cdFx0XHRyZXR1cm4gY29tcG9uZW50LmVycm9yVGVtcGxhdGUucmVuZGVyKGVycm9yKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCcnKTtcblx0fTtcblxuLyoqXG4gKiBVcGRhdGVzIGFsbCBjb21wb25lbnRzIHRoYXQgZGVwZW5kIG9uIGN1cnJlbnQgc2V0IG9mIGNoYW5nZWQgc3RvcmVzLlxuICogQHJldHVybnMge1Byb21pc2V9IFByb21pc2UgZm9yIG5vdGhpbmcuXG4gKiBAcHJpdmF0ZVxuICovXG5Eb2N1bWVudFJlbmRlcmVyLnByb3RvdHlwZS5fdXBkYXRlU3RvcmVDb21wb25lbnRzID0gZnVuY3Rpb24gKCkge1xuXHRpZiAodGhpcy5faXNVcGRhdGluZykge1xuXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcblx0fVxuXG5cdHZhciBzZWxmID0gdGhpcztcblxuXHQvLyBpZiBkb2N1bWVudCBjb21wb25lbnQgaXMgY2hhbmdlZCB3ZSBzaG91bGQgcmVsb2FkIHRoZSBwYWdlXG5cdHZhciBkb2N1bWVudFN0b3JlID0gdGhpcy5fd2luZG93LmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoXG5cdFx0bW9kdWxlSGVscGVyLkFUVFJJQlVURV9TVE9SRVxuXHQpO1xuXHRpZiAodGhpcy5fY3VycmVudENoYW5nZWRTdG9yZXMuaGFzT3duUHJvcGVydHkoZG9jdW1lbnRTdG9yZSkpIHtcblx0XHR2YXIgbmV3TG9jYXRpb24gPSB0aGlzLl9jdXJyZW50Um91dGluZ0NvbnRleHQubG9jYXRpb24udG9TdHJpbmcoKTtcblx0XHRpZiAobmV3TG9jYXRpb24gPT09IHRoaXMuX3dpbmRvdy5sb2NhdGlvbi50b1N0cmluZygpKSB7XG5cdFx0XHR0aGlzLl93aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG5cdFx0fVxuXHRcdHRoaXMuX3dpbmRvdy5sb2NhdGlvbi5hc3NpZ24obmV3TG9jYXRpb24pO1xuXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcblx0fVxuXG5cdC8vIGlmIHdlIGhhdmUgYXdhaXRpbmcgcm91dGluZyB3ZSBzaG91bGQgYXBwbHkgc3RhdGUgdG8gdGhlIHN0b3Jlc1xuXHRpZiAodGhpcy5fYXdhaXRpbmdSb3V0aW5nKSB7XG5cdFx0dmFyIGNvbXBvbmVudHMgPSB0aGlzLl9jb21wb25lbnRMb2FkZXIuZ2V0Q29tcG9uZW50c0J5TmFtZXMoKSxcblx0XHRcdGNoYW5nZWRCeVN0YXRlID0gdGhpcy5fc3RvcmVEaXNwYXRjaGVyLnNldFN0YXRlKFxuXHRcdFx0XHR0aGlzLl9hd2FpdGluZ1JvdXRpbmcuc3RhdGUsXG5cdFx0XHRcdHRoaXMuX2F3YWl0aW5nUm91dGluZy5yb3V0aW5nQ29udGV4dFxuXHRcdFx0KTtcblxuXHRcdGNoYW5nZWRCeVN0YXRlLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcblx0XHRcdHNlbGYuX2N1cnJlbnRDaGFuZ2VkU3RvcmVzW25hbWVdID0gdHJ1ZTtcblx0XHR9KTtcblxuXHRcdC8vIHdlIHNob3VsZCB1cGRhdGUgY29udGV4dHMgb2YgdGhlIHN0b3JlcyB3aXRoIHRoZSBuZXcgcm91dGluZyBjb250ZXh0XG5cdFx0dGhpcy5fY3VycmVudFJvdXRpbmdDb250ZXh0ID0gdGhpcy5fYXdhaXRpbmdSb3V0aW5nLnJvdXRpbmdDb250ZXh0O1xuXHRcdE9iamVjdC5rZXlzKHRoaXMuX2NvbXBvbmVudEluc3RhbmNlcylcblx0XHRcdC5mb3JFYWNoKGZ1bmN0aW9uIChpZCkge1xuXHRcdFx0XHR2YXIgaW5zdGFuY2UgPSBzZWxmLl9jb21wb25lbnRJbnN0YW5jZXNbaWRdO1xuXHRcdFx0XHRpbnN0YW5jZS4kY29udGV4dCA9IHNlbGYuX2dldENvbXBvbmVudENvbnRleHQoXG5cdFx0XHRcdFx0Y29tcG9uZW50c1tpbnN0YW5jZS4kY29udGV4dC5uYW1lXSxcblx0XHRcdFx0XHRpbnN0YW5jZS4kY29udGV4dC5lbGVtZW50XG5cdFx0XHRcdCk7XG5cdFx0XHR9KTtcblx0XHR0aGlzLl9hd2FpdGluZ1JvdXRpbmcgPSBudWxsO1xuXHR9XG5cblx0dmFyIGNoYW5nZWRTdG9yZXMgPSBPYmplY3Qua2V5cyh0aGlzLl9jdXJyZW50Q2hhbmdlZFN0b3Jlcyk7XG5cdGlmIChjaGFuZ2VkU3RvcmVzLmxlbmd0aCA9PT0gMCkge1xuXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcblx0fVxuXHR0aGlzLl9jdXJyZW50Q2hhbmdlZFN0b3JlcyA9IHt9O1xuXG5cdHZhciByZW5kZXJpbmdDb250ZXh0ID0gdGhpcy5fY3JlYXRlUmVuZGVyaW5nQ29udGV4dChjaGFuZ2VkU3RvcmVzKSxcblx0XHRwcm9taXNlcyA9IHJlbmRlcmluZ0NvbnRleHQucm9vdHMubWFwKGZ1bmN0aW9uIChyb290KSB7XG5cdFx0XHRyZXR1cm4gc2VsZi5yZW5kZXJDb21wb25lbnQocm9vdCwgcmVuZGVyaW5nQ29udGV4dCk7XG5cdFx0fSk7XG5cblx0dGhpcy5faXNVcGRhdGluZyA9IHRydWU7XG5cdHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcylcblx0XHQuY2F0Y2goZnVuY3Rpb24gKHJlYXNvbikge1xuXHRcdFx0c2VsZi5fZXZlbnRCdXMuZW1pdCgnZXJyb3InLCByZWFzb24pO1xuXHRcdH0pXG5cdFx0LnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0c2VsZi5faXNVcGRhdGluZyA9IGZhbHNlO1xuXHRcdFx0c2VsZi5fZXZlbnRCdXMuZW1pdCgnZG9jdW1lbnRVcGRhdGVkJywgY2hhbmdlZFN0b3Jlcyk7XG5cdFx0XHRyZXR1cm4gc2VsZi5fdXBkYXRlU3RvcmVDb21wb25lbnRzKCk7XG5cdFx0fSk7XG59O1xuXG4vKipcbiAqIE1lcmdlcyBuZXcgYW5kIGV4aXN0ZWQgaGVhZCBlbGVtZW50cyBhbmQgY2hhbmdlIG9ubHkgZGlmZmVyZW5jZS5cbiAqIEBwYXJhbSB7RWxlbWVudH0gaGVhZCBIRUFEIERPTSBlbGVtZW50LlxuICogQHBhcmFtIHtzdHJpbmd9IGh0bWxUZXh0IEhUTUwgb2YgbmV3IEhFQUQgZWxlbWVudCBjb250ZW50LlxuICogQHByaXZhdGVcbiAqL1xuLypqc2hpbnQgbWF4Y29tcGxleGl0eTpmYWxzZSAqL1xuRG9jdW1lbnRSZW5kZXJlci5wcm90b3R5cGUuX21lcmdlSGVhZCA9IGZ1bmN0aW9uIChoZWFkLCBodG1sVGV4dCkge1xuXHRpZiAoIWh0bWxUZXh0KSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBzZWxmID0gdGhpcyxcblx0XHRuZXdIZWFkID0gdGhpcy5fd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2hlYWQnKTtcblx0bmV3SGVhZC5pbm5lckhUTUwgPSBodG1sVGV4dDtcblxuXHR2YXIgbWFwID0gdGhpcy5fZ2V0SGVhZE1hcChoZWFkLmNoaWxkTm9kZXMpLFxuXHRcdGN1cnJlbnQsIGksIGtleSwgb2xkS2V5LCBvbGRJdGVtLFxuXHRcdHNhbWVNZXRhRWxlbWVudHMgPSB7fTtcblxuXHRmb3IgKGkgPSAwOyBpIDwgbmV3SGVhZC5jaGlsZE5vZGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y3VycmVudCA9IG5ld0hlYWQuY2hpbGROb2Rlc1tpXTtcblxuXHRcdGlmICghbWFwLmhhc093blByb3BlcnR5KGN1cnJlbnQubm9kZU5hbWUpKSB7XG5cdFx0XHRtYXBbY3VycmVudC5ub2RlTmFtZV0gPSB7fTtcblx0XHR9XG5cblx0XHRzd2l0Y2ggKGN1cnJlbnQubm9kZU5hbWUpIHtcblx0XHRcdC8vIHRoZXNlIGVsZW1lbnRzIGNhbiBiZSBvbmx5IHJlcGxhY2VkXG5cdFx0XHRjYXNlIFRBR19OQU1FUy5USVRMRTpcblx0XHRcdGNhc2UgVEFHX05BTUVTLkJBU0U6XG5cdFx0XHRjYXNlIFRBR19OQU1FUy5OT1NDUklQVDpcblx0XHRcdFx0a2V5ID0gdGhpcy5fZ2V0Tm9kZUtleShjdXJyZW50KTtcblx0XHRcdFx0b2xkSXRlbSA9IGhlYWQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoY3VycmVudC5ub2RlTmFtZSlbMF07XG5cdFx0XHRcdGlmIChvbGRJdGVtKSB7XG5cdFx0XHRcdFx0b2xkS2V5ID0gdGhpcy5fZ2V0Tm9kZUtleShvbGRJdGVtKTtcblx0XHRcdFx0XHRoZWFkLnJlcGxhY2VDaGlsZChjdXJyZW50LCBvbGRJdGVtKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRoZWFkLmFwcGVuZENoaWxkKGN1cnJlbnQpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdC8vIHdoZW4gd2UgZG8gcmVwbGFjZSBvciBhcHBlbmQgY3VycmVudCBpcyByZW1vdmVkIGZyb20gbmV3SGVhZFxuXHRcdFx0XHQvLyB0aGVyZWZvcmUgd2UgbmVlZCB0byBkZWNyZW1lbnQgaW5kZXhcblx0XHRcdFx0aS0tO1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Ly8gdGhlc2UgZWxlbWVudHMgY2FuIG5vdCBiZSBkZWxldGVkIGZyb20gaGVhZFxuXHRcdFx0Ly8gdGhlcmVmb3JlIHdlIGp1c3QgYWRkIG5ldyBlbGVtZW50cyB0aGF0IGRpZmZlcnMgZnJvbSBleGlzdGVkXG5cdFx0XHRjYXNlIFRBR19OQU1FUy5TVFlMRTpcblx0XHRcdGNhc2UgVEFHX05BTUVTLkxJTks6XG5cdFx0XHRjYXNlIFRBR19OQU1FUy5TQ1JJUFQ6XG5cdFx0XHRcdGtleSA9IHNlbGYuX2dldE5vZGVLZXkoY3VycmVudCk7XG5cdFx0XHRcdGlmICghbWFwW2N1cnJlbnQubm9kZU5hbWVdLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0XHRoZWFkLmFwcGVuZENoaWxkKGN1cnJlbnQpO1xuXHRcdFx0XHRcdGktLTtcblx0XHRcdFx0fVxuXHRcdFx0XHRicmVhaztcblx0XHRcdC8vIG1ldGEgYW5kIG90aGVyIGVsZW1lbnRzIGNhbiBiZSBkZWxldGVkXG5cdFx0XHQvLyBidXQgd2Ugc2hvdWxkIG5vdCBkZWxldGUgYW5kIGFwcGVuZCBzYW1lIGVsZW1lbnRzXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRrZXkgPSBzZWxmLl9nZXROb2RlS2V5KGN1cnJlbnQpO1xuXHRcdFx0XHRpZiAobWFwW2N1cnJlbnQubm9kZU5hbWVdLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0XHRzYW1lTWV0YUVsZW1lbnRzW2tleV0gPSB0cnVlO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGhlYWQuYXBwZW5kQ2hpbGQoY3VycmVudCk7XG5cdFx0XHRcdFx0aS0tO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH1cblx0fVxuXG5cdGlmIChtYXAuaGFzT3duUHJvcGVydHkoVEFHX05BTUVTLk1FVEEpKSB7XG5cdFx0Ly8gcmVtb3ZlIG1ldGEgdGFncyB3aGljaCBhIG5vdCBpbiBhIG5ldyBoZWFkIHN0YXRlXG5cdFx0T2JqZWN0LmtleXMobWFwW1RBR19OQU1FUy5NRVRBXSlcblx0XHRcdC5mb3JFYWNoKGZ1bmN0aW9uIChtZXRhS2V5KSB7XG5cdFx0XHRcdGlmIChzYW1lTWV0YUVsZW1lbnRzLmhhc093blByb3BlcnR5KG1ldGFLZXkpKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aGVhZC5yZW1vdmVDaGlsZChtYXBbVEFHX05BTUVTLk1FVEFdW21ldGFLZXldKTtcblx0XHRcdH0pO1xuXHR9XG59O1xuXG4vKipcbiAqIEdldHMgbWFwIG9mIGFsbCBIRUFEJ3MgZWxlbWVudHMuXG4gKiBAcGFyYW0ge05vZGVMaXN0fSBoZWFkQ2hpbGRyZW4gSGVhZCBjaGlsZHJlbiBET00gbm9kZXMuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBNYXAgb2YgSEVBRCBlbGVtZW50cy5cbiAqIEBwcml2YXRlXG4gKi9cbkRvY3VtZW50UmVuZGVyZXIucHJvdG90eXBlLl9nZXRIZWFkTWFwID0gZnVuY3Rpb24gKGhlYWRDaGlsZHJlbikge1xuXHQvLyBDcmVhdGUgbWFwIG9mIDxtZXRhPiwgPGxpbms+LCA8c3R5bGU+IGFuZCA8c2NyaXB0PiB0YWdzXG5cdC8vIGJ5IHVuaXF1ZSBrZXlzIHRoYXQgY29udGFpbiBhdHRyaWJ1dGVzIGFuZCBjb250ZW50XG5cdHZhciBtYXAgPSB7fSxcblx0XHRpLCBjdXJyZW50LFxuXHRcdHNlbGYgPSB0aGlzO1xuXG5cdGZvciAoaSA9IDA7IGkgPCBoZWFkQ2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcblx0XHRjdXJyZW50ID0gaGVhZENoaWxkcmVuW2ldO1xuXHRcdGlmICghbWFwLmhhc093blByb3BlcnR5KGN1cnJlbnQubm9kZU5hbWUpKSB7XG5cdFx0XHRtYXBbY3VycmVudC5ub2RlTmFtZV0gPSB7fTtcblx0XHR9XG5cdFx0bWFwW2N1cnJlbnQubm9kZU5hbWVdW3NlbGYuX2dldE5vZGVLZXkoY3VycmVudCldID0gY3VycmVudDtcblx0fVxuXHRyZXR1cm4gbWFwO1xufTtcblxuLyoqXG4gKiBHZXRzIHVuaXF1ZSBlbGVtZW50IGtleSB1c2luZyBlbGVtZW50J3MgYXR0cmlidXRlcyBhbmQgaXRzIGNvbnRlbnQuXG4gKiBAcGFyYW0ge05vZGV9IG5vZGUgSFRNTCBlbGVtZW50LlxuICogQHJldHVybnMge3N0cmluZ30gVW5pcXVlIGtleSBmb3IgZWxlbWVudC5cbiAqIEBwcml2YXRlXG4gKi9cbkRvY3VtZW50UmVuZGVyZXIucHJvdG90eXBlLl9nZXROb2RlS2V5ID0gZnVuY3Rpb24gKG5vZGUpIHtcblx0dmFyIGN1cnJlbnQsIGksXG5cdFx0YXR0cmlidXRlcyA9IFtdO1xuXG5cdGlmIChub2RlLm5vZGVUeXBlICE9PSBOT0RFX1RZUEVTLkVMRU1FTlRfTk9ERSkge1xuXHRcdHJldHVybiBub2RlLm5vZGVWYWx1ZSB8fCAnJztcblx0fVxuXG5cdGlmIChub2RlLmhhc0F0dHJpYnV0ZXMoKSkge1xuXHRcdGZvciAoaSA9IDA7IGkgPCBub2RlLmF0dHJpYnV0ZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGN1cnJlbnQgPSBub2RlLmF0dHJpYnV0ZXNbaV07XG5cdFx0XHRhdHRyaWJ1dGVzLnB1c2goY3VycmVudC5uYW1lICsgJz0nICsgY3VycmVudC52YWx1ZSk7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGF0dHJpYnV0ZXNcblx0XHRcdC5zb3J0KClcblx0XHRcdC5qb2luKCd8JykgKyAnPicgKyBub2RlLnRleHRDb250ZW50O1xufTtcblxuLyoqXG4gKiBEb2VzIGluaXRpYWwgd3JhcHBpbmcgZm9yIGV2ZXJ5IGNvbXBvbmVudCBvbiB0aGUgcGFnZS5cbiAqIEBwcml2YXRlXG4gKi9cbkRvY3VtZW50UmVuZGVyZXIucHJvdG90eXBlLl9pbml0aWFsV3JhcCA9IGZ1bmN0aW9uICgpIHtcblx0dmFyIHNlbGYgPSB0aGlzLFxuXHRcdGN1cnJlbnQsIGksIGlkLCBpbnN0YW5jZSxcblx0XHRjb21wb25lbnRzID0gdGhpcy5fY29tcG9uZW50TG9hZGVyLmdldENvbXBvbmVudHNCeU5hbWVzKCksXG5cdFx0YmluZFByb21pc2VzID0gW107XG5cblx0T2JqZWN0LmtleXMoY29tcG9uZW50cylcblx0XHQuZm9yRWFjaChmdW5jdGlvbiAoY29tcG9uZW50TmFtZSkge1xuXHRcdFx0dmFyIHRhZ05hbWUgPSBtb2R1bGVIZWxwZXJcblx0XHRcdFx0XHQuZ2V0VGFnTmFtZUZvckNvbXBvbmVudE5hbWUoY29tcG9uZW50TmFtZSksXG5cdFx0XHRcdGVsZW1lbnRzLFxuXHRcdFx0XHRjb25zdHJ1Y3RvciA9IGNvbXBvbmVudHNbY29tcG9uZW50TmFtZV0uY29uc3RydWN0b3I7XG5cblx0XHRcdGlmIChtb2R1bGVIZWxwZXIuaXNEb2N1bWVudENvbXBvbmVudChjb21wb25lbnROYW1lKSkge1xuXHRcdFx0XHRlbGVtZW50cyA9IFtzZWxmLl93aW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50XTtcblx0XHRcdH0gZWxzZSBpZiAobW9kdWxlSGVscGVyLmlzSGVhZENvbXBvbmVudChjb21wb25lbnROYW1lKSkge1xuXHRcdFx0XHRlbGVtZW50cyA9IFtzZWxmLl93aW5kb3cuZG9jdW1lbnQuaGVhZF07XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRlbGVtZW50cyA9IHNlbGYuX3dpbmRvdy5kb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSh0YWdOYW1lKTtcblx0XHRcdH1cblxuXHRcdFx0Zm9yIChpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGN1cnJlbnQgPSBlbGVtZW50c1tpXTtcblx0XHRcdFx0aWQgPSBzZWxmLl9nZXRJZChjdXJyZW50KTtcblx0XHRcdFx0aWYgKCFpZCkge1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y29uc3RydWN0b3IucHJvdG90eXBlLiRjb250ZXh0ID0gc2VsZi5fZ2V0Q29tcG9uZW50Q29udGV4dChcblx0XHRcdFx0XHRjb21wb25lbnRzW2NvbXBvbmVudE5hbWVdLCBjdXJyZW50XG5cdFx0XHRcdCk7XG5cdFx0XHRcdGluc3RhbmNlID0gc2VsZi5fc2VydmljZUxvY2F0b3IucmVzb2x2ZUluc3RhbmNlKFxuXHRcdFx0XHRcdGNvbnN0cnVjdG9yLCBzZWxmLl9jb25maWdcblx0XHRcdFx0KTtcblx0XHRcdFx0aW5zdGFuY2UuJGNvbnRleHQgPSBjb25zdHJ1Y3Rvci5wcm90b3R5cGUuJGNvbnRleHQ7XG5cdFx0XHRcdHNlbGYuX2NvbXBvbmVudEVsZW1lbnRzW2lkXSA9IGN1cnJlbnQ7XG5cdFx0XHRcdHNlbGYuX2NvbXBvbmVudEluc3RhbmNlc1tpZF0gPSBpbnN0YW5jZTtcblx0XHRcdFx0Ly8gaW5pdGlhbGl6ZSB0aGUgc3RvcmUgb2YgdGhlIGNvbXBvbmVudFxuXHRcdFx0XHRzZWxmLl9zdG9yZURpc3BhdGNoZXIuZ2V0U3RvcmUoXG5cdFx0XHRcdFx0Y3VycmVudC5nZXRBdHRyaWJ1dGUobW9kdWxlSGVscGVyLkFUVFJJQlVURV9TVE9SRSlcblx0XHRcdFx0KTtcblx0XHRcdFx0c2VsZi5fZXZlbnRCdXMuZW1pdCgnY29tcG9uZW50UmVuZGVyZWQnLCB7XG5cdFx0XHRcdFx0bmFtZTogY29tcG9uZW50TmFtZSxcblx0XHRcdFx0XHRhdHRyaWJ1dGVzOiBpbnN0YW5jZS4kY29udGV4dC5hdHRyaWJ1dGVzLFxuXHRcdFx0XHRcdGNvbnRleHQ6IGluc3RhbmNlLiRjb250ZXh0XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRiaW5kUHJvbWlzZXMucHVzaChzZWxmLl9iaW5kQ29tcG9uZW50KGN1cnJlbnQpKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRyZXR1cm4gUHJvbWlzZS5hbGwoYmluZFByb21pc2VzKVxuXHRcdC50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdHNlbGYuX2V2ZW50QnVzLmVtaXQoJ2RvY3VtZW50UmVuZGVyZWQnLCBzZWxmLl9jdXJyZW50Um91dGluZ0NvbnRleHQpO1xuXHRcdH0pO1xufTtcblxuLyoqXG4gKiBHZXRzIGNvbXBvbmVudCBjb250ZXh0IHVzaW5nIGJhc2ljIGNvbnRleHQuXG4gKiBAcGFyYW0ge09iamVjdH0gY29tcG9uZW50IENvbXBvbmVudCBkZXRhaWxzLlxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50IERPTSBlbGVtZW50IG9mIGNvbXBvbmVudC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IENvbXBvbmVudCBjb250ZXh0LlxuICogQHByaXZhdGVcbiAqL1xuRG9jdW1lbnRSZW5kZXJlci5wcm90b3R5cGUuX2dldENvbXBvbmVudENvbnRleHQgPVxuXHRmdW5jdGlvbiAoY29tcG9uZW50LCBlbGVtZW50KSB7XG5cdFx0dmFyIHNlbGYgPSB0aGlzLFxuXHRcdFx0c3RvcmVOYW1lID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUobW9kdWxlSGVscGVyLkFUVFJJQlVURV9TVE9SRSksXG5cdFx0XHRjb21wb25lbnRDb250ZXh0ID0gT2JqZWN0LmNyZWF0ZSh0aGlzLl9jdXJyZW50Um91dGluZ0NvbnRleHQpO1xuXG5cdFx0Ly8gaW5pdGlhbGl6ZSB0aGUgc3RvcmUgb2YgdGhlIGNvbXBvbmVudFxuXHRcdHRoaXMuX3N0b3JlRGlzcGF0Y2hlci5nZXRTdG9yZShzdG9yZU5hbWUpO1xuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnRpZXMoY29tcG9uZW50Q29udGV4dCwge1xuXHRcdFx0ZWxlbWVudDoge1xuXHRcdFx0XHR2YWx1ZTogZWxlbWVudCxcblx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdG5hbWU6IHtcblx0XHRcdFx0Z2V0OiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGNvbXBvbmVudC5uYW1lO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0YXR0cmlidXRlczoge1xuXHRcdFx0XHRnZXQ6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRyZXR1cm4gYXR0cmlidXRlc1RvT2JqZWN0KGVsZW1lbnQuYXR0cmlidXRlcyk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGVudW1lcmFibGU6IHRydWVcblx0XHRcdH0sXG5cdFx0XHRnZXRDb21wb25lbnRCeUlkOiB7XG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiAoaWQpIHtcblx0XHRcdFx0XHRyZXR1cm4gc2VsZi5nZXRDb21wb25lbnRCeUlkKGlkKTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGNyZWF0ZUNvbXBvbmVudDoge1xuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gKHRhZ05hbWUsIGF0dHJpYnV0ZXMpIHtcblx0XHRcdFx0XHRyZXR1cm4gc2VsZi5jcmVhdGVDb21wb25lbnQodGFnTmFtZSwgYXR0cmlidXRlcyk7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRjb2xsZWN0R2FyYmFnZToge1xuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHJldHVybiBzZWxmLmNvbGxlY3RHYXJiYWdlKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRnZXRTdG9yZURhdGE6IHtcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHR2YXIgY3VycmVudFN0b3JlTmFtZSA9IGNvbXBvbmVudENvbnRleHQuZWxlbWVudFxuXHRcdFx0XHRcdFx0LmdldEF0dHJpYnV0ZShtb2R1bGVIZWxwZXIuQVRUUklCVVRFX1NUT1JFKTtcblx0XHRcdFx0XHRyZXR1cm4gc2VsZi5fc3RvcmVEaXNwYXRjaGVyXG5cdFx0XHRcdFx0XHQuZ2V0U3RvcmVEYXRhKGN1cnJlbnRTdG9yZU5hbWUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0c2VuZEFjdGlvbjoge1xuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gKG5hbWUsIGFyZ3MpIHtcblx0XHRcdFx0XHR2YXIgY3VycmVudFN0b3JlTmFtZSA9IGNvbXBvbmVudENvbnRleHQuZWxlbWVudFxuXHRcdFx0XHRcdFx0LmdldEF0dHJpYnV0ZShtb2R1bGVIZWxwZXIuQVRUUklCVVRFX1NUT1JFKTtcblx0XHRcdFx0XHRyZXR1cm4gc2VsZi5fc3RvcmVEaXNwYXRjaGVyXG5cdFx0XHRcdFx0XHQuc2VuZEFjdGlvbihjdXJyZW50U3RvcmVOYW1lLCBuYW1lLCBhcmdzKTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdHNlbmRCcm9hZGNhc3RBY3Rpb246IHtcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIChuYW1lLCBhcmdzKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHNlbGYuX3N0b3JlRGlzcGF0Y2hlclxuXHRcdFx0XHRcdFx0LnNlbmRCcm9hZGNhc3RBY3Rpb24obmFtZSwgYXJncyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdHJldHVybiBjb21wb25lbnRDb250ZXh0O1xuXHR9O1xuXG4vKipcbiAqIEZpbmRzIGFsbCByZW5kZXJpbmcgcm9vdHMgb24gcGFnZSBmb3IgYWxsIGNoYW5nZWQgc3RvcmVzLlxuICogQHBhcmFtIHtBcnJheX0gY2hhbmdlZFN0b3JlTmFtZXMgTGlzdCBvZiBzdG9yZSBuYW1lcyB3aGljaCBoYXMgYmVlbiBjaGFuZ2VkLlxuICogQHJldHVybnMge0FycmF5PEVsZW1lbnQ+fSBIVE1MIGVsZW1lbnRzIHRoYXQgYXJlIHJlbmRlcmluZyByb290cy5cbiAqIEBwcml2YXRlXG4gKi9cbkRvY3VtZW50UmVuZGVyZXIucHJvdG90eXBlLl9maW5kUmVuZGVyaW5nUm9vdHMgPSBmdW5jdGlvbiAoY2hhbmdlZFN0b3JlTmFtZXMpIHtcblx0dmFyIHNlbGYgPSB0aGlzLFxuXHRcdGhlYWRTdG9yZSA9IHRoaXMuX3dpbmRvdy5kb2N1bWVudC5oZWFkLmdldEF0dHJpYnV0ZShcblx0XHRcdG1vZHVsZUhlbHBlci5BVFRSSUJVVEVfU1RPUkVcblx0XHQpLFxuXHRcdGNvbXBvbmVudHMgPSB0aGlzLl9jb21wb25lbnRMb2FkZXIuZ2V0Q29tcG9uZW50c0J5TmFtZXMoKSxcblx0XHRjb21wb25lbnRzRWxlbWVudHMgPSB7fSxcblx0XHRzdG9yZU5hbWVzU2V0ID0ge30sXG5cdFx0cm9vdHNTZXQgPSB7fSxcblx0XHRyb290cyA9IFtdO1xuXG5cdC8vIHdlIHNob3VsZCBmaW5kIGFsbCBjb21wb25lbnRzIGFuZCB0aGVuIGxvb2tpbmcgZm9yIHJvb3RzXG5cdGNoYW5nZWRTdG9yZU5hbWVzXG5cdFx0LmZvckVhY2goZnVuY3Rpb24gKHN0b3JlTmFtZSkge1xuXHRcdFx0c3RvcmVOYW1lc1NldFtzdG9yZU5hbWVdID0gdHJ1ZTtcblx0XHRcdGNvbXBvbmVudHNFbGVtZW50c1tzdG9yZU5hbWVdID0gc2VsZi5fd2luZG93LmRvY3VtZW50XG5cdFx0XHRcdC5xdWVyeVNlbGVjdG9yQWxsKFxuXHRcdFx0XHRcdCdbJyArXG5cdFx0XHRcdFx0bW9kdWxlSGVscGVyLkFUVFJJQlVURV9JRCArXG5cdFx0XHRcdFx0J10nICtcblx0XHRcdFx0XHQnWycgK1xuXHRcdFx0XHRcdG1vZHVsZUhlbHBlci5BVFRSSUJVVEVfU1RPUkUgK1xuXHRcdFx0XHRcdCc9XCInICtcblx0XHRcdFx0XHRzdG9yZU5hbWUgK1xuXHRcdFx0XHRcdCdcIl0nXG5cdFx0XHRcdCk7XG5cdFx0fSk7XG5cblx0aWYgKGNvbXBvbmVudHMuaGFzT3duUHJvcGVydHkobW9kdWxlSGVscGVyLkhFQURfQ09NUE9ORU5UX05BTUUpICYmXG5cdFx0c3RvcmVOYW1lc1NldC5oYXNPd25Qcm9wZXJ0eShoZWFkU3RvcmUpKSB7XG5cdFx0cm9vdHNTZXRbdGhpcy5fZ2V0SWQodGhpcy5fd2luZG93LmRvY3VtZW50LmhlYWQpXSA9IHRydWU7XG5cdFx0cm9vdHMucHVzaCh0aGlzLl93aW5kb3cuZG9jdW1lbnQuaGVhZCk7XG5cdH1cblxuXHRjaGFuZ2VkU3RvcmVOYW1lc1xuXHRcdC5mb3JFYWNoKGZ1bmN0aW9uIChzdG9yZU5hbWUpIHtcblx0XHRcdHZhciBjdXJyZW50LCBjdXJyZW50SWQsXG5cdFx0XHRcdGxhc3RSb290LCBsYXN0Um9vdElkLFxuXHRcdFx0XHRjdXJyZW50U3RvcmUsIGN1cnJlbnRDb21wb25lbnROYW1lO1xuXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGNvbXBvbmVudHNFbGVtZW50c1tzdG9yZU5hbWVdLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGN1cnJlbnQgPSBjb21wb25lbnRzRWxlbWVudHNbc3RvcmVOYW1lXVtpXTtcblx0XHRcdFx0Y3VycmVudElkID0gY29tcG9uZW50c0VsZW1lbnRzW3N0b3JlTmFtZV1baV1cblx0XHRcdFx0XHQuZ2V0QXR0cmlidXRlKG1vZHVsZUhlbHBlci5BVFRSSUJVVEVfSUQpO1xuXHRcdFx0XHRsYXN0Um9vdCA9IGN1cnJlbnQ7XG5cdFx0XHRcdGxhc3RSb290SWQgPSBjdXJyZW50SWQ7XG5cdFx0XHRcdGN1cnJlbnRDb21wb25lbnROYW1lID0gbW9kdWxlSGVscGVyLmdldE9yaWdpbmFsQ29tcG9uZW50TmFtZShcblx0XHRcdFx0XHRjdXJyZW50LnRhZ05hbWVcblx0XHRcdFx0KTtcblxuXHRcdFx0XHR3aGlsZSAoY3VycmVudC5wYXJlbnRFbGVtZW50KSB7XG5cdFx0XHRcdFx0Y3VycmVudCA9IGN1cnJlbnQucGFyZW50RWxlbWVudDtcblx0XHRcdFx0XHRjdXJyZW50SWQgPSBzZWxmLl9nZXRJZChjdXJyZW50KTtcblx0XHRcdFx0XHRjdXJyZW50U3RvcmUgPSBjdXJyZW50LmdldEF0dHJpYnV0ZShcblx0XHRcdFx0XHRcdG1vZHVsZUhlbHBlci5BVFRSSUJVVEVfU1RPUkVcblx0XHRcdFx0XHQpO1xuXG5cdFx0XHRcdFx0Ly8gc3RvcmUgZGlkIG5vdCBjaGFuZ2Ugc3RhdGVcblx0XHRcdFx0XHRpZiAoIWN1cnJlbnRTdG9yZSB8fFxuXHRcdFx0XHRcdFx0IXN0b3JlTmFtZXNTZXQuaGFzT3duUHJvcGVydHkoY3VycmVudFN0b3JlKSkge1xuXHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8vLyBpcyBub3QgYW4gYWN0aXZlIGNvbXBvbmVudFxuXHRcdFx0XHRcdGlmICghY29tcG9uZW50cy5oYXNPd25Qcm9wZXJ0eShjdXJyZW50Q29tcG9uZW50TmFtZSkpIHtcblx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGxhc3RSb290ID0gY3VycmVudDtcblx0XHRcdFx0XHRsYXN0Um9vdElkID0gY3VycmVudElkO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChyb290c1NldC5oYXNPd25Qcm9wZXJ0eShsYXN0Um9vdElkKSkge1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJvb3RzU2V0W2xhc3RSb290SWRdID0gdHJ1ZTtcblx0XHRcdFx0cm9vdHMucHVzaChsYXN0Um9vdCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0cmV0dXJuIHJvb3RzO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIHJlbmRlcmluZyBjb250ZXh0LlxuICogQHBhcmFtIHtBcnJheT99IGNoYW5nZWRTdG9yZXMgTmFtZXMgb2YgY2hhbmdlZCBzdG9yZXMuXG4gKiBAcmV0dXJucyB7e1xuICogICBjb25maWc6IE9iamVjdCxcbiAqICAgcmVuZGVyZWRJZHM6IHt9LFxuICogICB1bmJvdW5kSWRzOiB7fSxcbiAqICAgaXNIZWFkUmVuZGVyZWQ6IEJvb2xlYW4sXG4gKiAgIGJpbmRNZXRob2RzOiBBcnJheSxcbiAqICAgcm91dGluZ0NvbnRleHQ6IE9iamVjdCxcbiAqICAgY29tcG9uZW50czogT2JqZWN0LFxuICogICBjb21wb25lbnRUYWdzOiBBcnJheSxcbiAqICAgcm9vdHM6IEFycmF5LjxFbGVtZW50PlxuICogfX1cbiAqIEBwcml2YXRlXG4gKi9cbkRvY3VtZW50UmVuZGVyZXIucHJvdG90eXBlLl9jcmVhdGVSZW5kZXJpbmdDb250ZXh0ID0gZnVuY3Rpb24gKGNoYW5nZWRTdG9yZXMpIHtcblx0dmFyIGNvbXBvbmVudHMgPSB0aGlzLl9jb21wb25lbnRMb2FkZXIuZ2V0Q29tcG9uZW50c0J5TmFtZXMoKSxcblx0XHRjb21wb25lbnRUYWdzID0gT2JqZWN0LmtleXMoY29tcG9uZW50cylcblx0XHRcdC5tYXAoZnVuY3Rpb24gKG5hbWUpIHtcblx0XHRcdFx0cmV0dXJuIG1vZHVsZUhlbHBlci5nZXRUYWdOYW1lRm9yQ29tcG9uZW50TmFtZShuYW1lKTtcblx0XHRcdH0pO1xuXHRyZXR1cm4ge1xuXHRcdGNvbmZpZzogdGhpcy5fY29uZmlnLFxuXHRcdHJlbmRlcmVkSWRzOiB7fSxcblx0XHR1bmJvdW5kSWRzOiB7fSxcblx0XHRpc0hlYWRSZW5kZXJlZDogZmFsc2UsXG5cdFx0YmluZE1ldGhvZHM6IFtdLFxuXHRcdHJvdXRpbmdDb250ZXh0OiB0aGlzLl9jdXJyZW50Um91dGluZ0NvbnRleHQsXG5cdFx0Y29tcG9uZW50czogY29tcG9uZW50cyxcblx0XHRjb21wb25lbnRUYWdzOiBjb21wb25lbnRUYWdzLFxuXHRcdHJvb3RzOiBjaGFuZ2VkU3RvcmVzID8gdGhpcy5fZmluZFJlbmRlcmluZ1Jvb3RzKGNoYW5nZWRTdG9yZXMpIDogW11cblx0fTtcbn07XG5cbi8qKlxuICogR2V0cyBJRCBvZiB0aGUgZWxlbWVudC5cbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCBIVE1MIGVsZW1lbnQgb2YgY29tcG9uZW50LlxuICogQHJldHVybnMge3N0cmluZ30gSUQuXG4gKi9cbkRvY3VtZW50UmVuZGVyZXIucHJvdG90eXBlLl9nZXRJZCA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG5cdGlmIChlbGVtZW50ID09PSB0aGlzLl93aW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSB7XG5cdFx0cmV0dXJuIFNQRUNJQUxfSURTLiQkZG9jdW1lbnQ7XG5cdH1cblx0aWYgKGVsZW1lbnQgPT09IHRoaXMuX3dpbmRvdy5kb2N1bWVudC5oZWFkKSB7XG5cdFx0cmV0dXJuIFNQRUNJQUxfSURTLiQkaGVhZDtcblx0fVxuXHRyZXR1cm4gZWxlbWVudC5nZXRBdHRyaWJ1dGUobW9kdWxlSGVscGVyLkFUVFJJQlVURV9JRCk7XG59O1xuXG4vKipcbiAqIENvbnZlcnRzIE5hbWVkTm9kZU1hcCBvZiBBdHRyIGl0ZW1zIHRvIGtleS12YWx1ZSBvYmplY3QgbWFwLlxuICogQHBhcmFtIHtOYW1lZE5vZGVNYXB9IGF0dHJpYnV0ZXMgTGlzdCBvZiBFbGVtZW50IGF0dHJpYnV0ZXMuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBNYXAgb2YgYXR0cmlidXRlIHZhbHVlcyBieSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gYXR0cmlidXRlc1RvT2JqZWN0KGF0dHJpYnV0ZXMpIHtcblx0dmFyIHJlc3VsdCA9IHt9O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGF0dHJpYnV0ZXMubGVuZ3RoOyBpKyspIHtcblx0XHRyZXN1bHRbYXR0cmlidXRlc1tpXS5uYW1lXSA9IGF0dHJpYnV0ZXNbaV0udmFsdWU7XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBHZXRzIGNyb3NzLWJyb3dzZXIgXCJtYXRjaGVzXCIgbWV0aG9kIGZvciB0aGUgZWxlbWVudC5cbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCBIVE1MIGVsZW1lbnQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFwibWF0Y2hlc1wiIG1ldGhvZC5cbiAqL1xuZnVuY3Rpb24gZ2V0TWF0Y2hlc01ldGhvZChlbGVtZW50KSB7XG5cdHZhciBtZXRob2QgPSAgKGVsZW1lbnQubWF0Y2hlcyB8fFxuXHRcdGVsZW1lbnQud2Via2l0TWF0Y2hlc1NlbGVjdG9yIHx8XG5cdFx0ZWxlbWVudC5tb3pNYXRjaGVzU2VsZWN0b3IgfHxcblx0XHRlbGVtZW50Lm9NYXRjaGVzU2VsZWN0b3IgfHxcblx0XHRlbGVtZW50Lm1zTWF0Y2hlc1NlbGVjdG9yKTtcblxuXHRyZXR1cm4gbWV0aG9kLmJpbmQoZWxlbWVudCk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBpbWl0YXRpb24gb2Ygb3JpZ2luYWwgRXZlbnQgb2JqZWN0IGJ1dCB3aXRoIHNwZWNpZmllZCBjdXJyZW50VGFyZ2V0LlxuICogQHBhcmFtIHtFdmVudH0gZXZlbnQgT3JpZ2luYWwgZXZlbnQgb2JqZWN0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY3VycmVudFRhcmdldEdldHRlciBHZXR0ZXIgZm9yIGN1cnJlbnRUYXJnZXQuXG4gKiBAcmV0dXJucyB7RXZlbnR9IFdyYXBwZWQgZXZlbnQuXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUN1c3RvbUV2ZW50KGV2ZW50LCBjdXJyZW50VGFyZ2V0R2V0dGVyKSB7XG5cdHZhciBjYXRFdmVudCA9IE9iamVjdC5jcmVhdGUoZXZlbnQpLFxuXHRcdGtleXMgPSBbXSxcblx0XHRwcm9wZXJ0aWVzID0ge307XG5cdGZvcih2YXIga2V5IGluIGV2ZW50KSB7XG5cdFx0a2V5cy5wdXNoKGtleSk7XG5cdH1cblx0a2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRpZiAodHlwZW9mKGV2ZW50W2tleV0pID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRwcm9wZXJ0aWVzW2tleV0gPSB7XG5cdFx0XHRcdGdldDogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHJldHVybiBldmVudFtrZXldLmJpbmQoZXZlbnQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHByb3BlcnRpZXNba2V5XSA9IHtcblx0XHRcdGdldDogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRyZXR1cm4gZXZlbnRba2V5XTtcblx0XHRcdH0sXG5cdFx0XHRzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuXHRcdFx0XHRldmVudFtrZXldID0gdmFsdWU7XG5cdFx0XHR9XG5cdFx0fTtcblx0fSk7XG5cblx0cHJvcGVydGllcy5jdXJyZW50VGFyZ2V0ID0ge1xuXHRcdGdldDogY3VycmVudFRhcmdldEdldHRlclxuXHR9O1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydGllcyhjYXRFdmVudCwgcHJvcGVydGllcyk7XG5cdE9iamVjdC5zZWFsKGNhdEV2ZW50KTtcblx0T2JqZWN0LmZyZWV6ZShjYXRFdmVudCk7XG5cdHJldHVybiBjYXRFdmVudDtcbn0iLCIvKlxuICogY2F0YmVycnlcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgRGVuaXMgUmVjaGt1bm92IGFuZCBwcm9qZWN0IGNvbnRyaWJ1dG9ycy5cbiAqXG4gKiBjYXRiZXJyeSdzIGxpY2Vuc2UgZm9sbG93czpcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvblxuICogb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb25cbiAqIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbixcbiAqIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsXG4gKiBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLFxuICogYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbiAqIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4gKiBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4gKiBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqXG4gKiBUaGlzIGxpY2Vuc2UgYXBwbGllcyB0byBhbGwgcGFydHMgb2YgY2F0YmVycnkgdGhhdCBhcmUgbm90IGV4dGVybmFsbHlcbiAqIG1haW50YWluZWQgbGlicmFyaWVzLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBMb2dnZXI7XG5cbnZhciBMRVZFTFMgPSB7XG5cdFRSQUNFOiAndHJhY2UnLFxuXHRJTkZPOiAnaW5mbycsXG5cdFdBUk46ICd3YXJuJyxcblx0RVJST1I6ICdlcnJvcicsXG5cdEZBVEFMOiAnZmF0YWwnXG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYnJvd3NlciBsb2dnZXIuXG4gKiBAcGFyYW0ge09iamVjdHxzdHJpbmd9IGxldmVscyBMZXZlbHMgdG8gbG9nLlxuICogQHN1cHBvcnRlZCBDaHJvbWUsIEZpcmVmb3g+PTIuMCwgSW50ZXJuZXQgRXhwbG9yZXI+PTgsIE9wZXJhLCBTYWZhcmkuXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gTG9nZ2VyKGxldmVscykge1xuXHRpZiAodHlwZW9mIChsZXZlbHMpID09PSAnb2JqZWN0Jykge1xuXHRcdHRoaXMuX2xldmVscyA9IGxldmVscztcblx0fVxuXG5cdGlmICh0eXBlb2YobGV2ZWxzKSA9PT0gJ3N0cmluZycpIHtcblx0XHR0aGlzLl9sZXZlbHMgPSB7fTtcblx0XHRPYmplY3Qua2V5cyhMRVZFTFMpXG5cdFx0XHQuZm9yRWFjaChmdW5jdGlvbiAobGV2ZWwpIHtcblx0XHRcdFx0dGhpcy5fbGV2ZWxzW0xFVkVMU1tsZXZlbF1dID1cblx0XHRcdFx0XHQobGV2ZWxzLnNlYXJjaChMRVZFTFNbbGV2ZWxdKSAhPT0gLTEpO1xuXHRcdFx0fSwgdGhpcyk7XG5cdH1cblxuXHR0aGlzLnRyYWNlID0gdGhpcy50cmFjZS5iaW5kKHRoaXMpO1xuXHR0aGlzLmluZm8gPSB0aGlzLmluZm8uYmluZCh0aGlzKTtcblx0dGhpcy53YXJuID0gdGhpcy53YXJuLmJpbmQodGhpcyk7XG5cdHRoaXMuZXJyb3IgPSB0aGlzLmVycm9yLmJpbmQodGhpcyk7XG5cdHRoaXMuZmF0YWwgPSB0aGlzLmZhdGFsLmJpbmQodGhpcyk7XG59XG5cbi8qKlxuICogQ3VycmVudCBsZXZlbHMgb2YgbG9nZ2luZy5cbiAqIEB0eXBlIHtPYmplY3R9XG4gKiBAcHJpdmF0ZVxuICovXG5Mb2dnZXIucHJvdG90eXBlLl9sZXZlbHMgPSB7XG5cdHRyYWNlOiB0cnVlLFxuXHRpbmZvOiB0cnVlLFxuXHR3YXJuOiB0cnVlLFxuXHRlcnJvcjogdHJ1ZSxcblx0ZmF0YWw6IHRydWVcbn07XG5cbi8qKlxuICogTG9ncyB0cmFjZSBtZXNzYWdlLlxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgVHJhY2UgbWVzc2FnZS5cbiAqL1xuTG9nZ2VyLnByb3RvdHlwZS50cmFjZSA9IGZ1bmN0aW9uIChtZXNzYWdlKSB7XG5cdGlmICghdGhpcy5fbGV2ZWxzLnRyYWNlKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0aWYgKGNvbnNvbGUubG9nKSB7XG5cdFx0Y29uc29sZS5sb2cobWVzc2FnZSk7XG5cdH1cbn07XG5cbi8qKlxuICogTG9ncyBpbmZvIG1lc3NhZ2UuXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSBJbmZvcm1hdGlvbiBtZXNzYWdlLlxuICovXG5Mb2dnZXIucHJvdG90eXBlLmluZm8gPSBmdW5jdGlvbiAobWVzc2FnZSkge1xuXHRpZiAoIXRoaXMuX2xldmVscy5pbmZvKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0aWYgKGNvbnNvbGUuaW5mbykge1xuXHRcdGNvbnNvbGUuaW5mbyhtZXNzYWdlKTtcblx0fVxufTtcblxuLyoqXG4gKiBMb2dzIHdhcm4gbWVzc2FnZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIFdhcm5pbmcgbWVzc2FnZS5cbiAqL1xuTG9nZ2VyLnByb3RvdHlwZS53YXJuID0gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcblx0aWYgKCF0aGlzLl9sZXZlbHMud2Fybikge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGlmIChjb25zb2xlLndhcm4pIHtcblx0XHRjb25zb2xlLndhcm4obWVzc2FnZSk7XG5cdH1cbn07XG4vKipcbiAqIExvZ3MgZXJyb3IgbWVzc2FnZS5cbiAqIEBwYXJhbSB7c3RyaW5nfEVycm9yfSBlcnJvciBFcnJvciBvYmplY3Qgb3IgbWVzc2FnZS5cbiAqL1xuTG9nZ2VyLnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uIChlcnJvcikge1xuXHRpZiAoIXRoaXMuX2xldmVscy5lcnJvcikge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdHdyaXRlRXJyb3IoZXJyb3IpO1xufTtcblxuLyoqXG4gKiBMb2dzIGVycm9yIG1lc3NhZ2UuXG4gKiBAcGFyYW0ge3N0cmluZ3xFcnJvcn0gZXJyb3IgRXJyb3Igb2JqZWN0IG9yIG1lc3NhZ2UuXG4gKi9cbkxvZ2dlci5wcm90b3R5cGUuZmF0YWwgPSBmdW5jdGlvbiAoZXJyb3IpIHtcblx0aWYgKCF0aGlzLl9sZXZlbHMuZmF0YWwpIHtcblx0XHRyZXR1cm47XG5cdH1cblx0d3JpdGVFcnJvcihlcnJvcik7XG59O1xuXG4vKipcbiAqIFdyaXRlcyBlcnJvciB0byBjb25zb2xlLlxuICogQHBhcmFtIHtFcnJvcnxzdHJpbmd9IGVycm9yIEVycm9yIHRvIHdyaXRlLlxuICovXG5mdW5jdGlvbiB3cml0ZUVycm9yKGVycm9yKSB7XG5cdHRyeSB7XG5cdFx0aWYgKCEoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikpIHtcblx0XHRcdGVycm9yID0gdHlwZW9mKGVycm9yKSA9PT0gJ3N0cmluZycgPyBuZXcgRXJyb3IoZXJyb3IpIDogbmV3IEVycm9yKCk7XG5cdFx0fVxuXHRcdGlmIChjb25zb2xlLmVycm9yKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcblx0XHR9XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHR3cml0ZUVycm9yKGUpO1xuXHR9XG59IiwiLypcbiAqIGNhdGJlcnJ5XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0IERlbmlzIFJlY2hrdW5vdiBhbmQgcHJvamVjdCBjb250cmlidXRvcnMuXG4gKlxuICogY2F0YmVycnkncyBsaWNlbnNlIGZvbGxvd3M6XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb25cbiAqIG9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uXG4gKiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sXG4gKiBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLFxuICogcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSxcbiAqIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4gKiBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuICogaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuICogT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKlxuICogVGhpcyBsaWNlbnNlIGFwcGxpZXMgdG8gYWxsIHBhcnRzIG9mIGNhdGJlcnJ5IHRoYXQgYXJlIG5vdCBleHRlcm5hbGx5XG4gKiBtYWludGFpbmVkIGxpYnJhcmllcy5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVxdWVzdFJvdXRlcjtcblxudmFyIHV0aWwgPSByZXF1aXJlKCd1dGlsJyksXG5cdFVSSSA9IHJlcXVpcmUoJ2NhdGJlcnJ5LXVyaScpLlVSSTtcblxudmFyIE1PVVNFX0tFWVMgPSB7XG5cdFx0TEVGVDogMCxcblx0XHRNSURETEU6IDFcblx0fSxcblxuXHRIUkVGX0FUVFJJQlVURV9OQU1FID0gJ2hyZWYnLFxuXHRUQVJHRVRfQVRUUklCVVRFX05BTUUgPSAndGFyZ2V0Jyxcblx0QV9UQUdfTkFNRSA9ICdBJyxcblx0Qk9EWV9UQUdfTkFNRSA9ICdCT0RZJztcblxuLyoqXG4gKiBDcmVhdGVzIG5ldyBpbnN0YW5jZSBvZiB0aGUgYnJvd3NlciByZXF1ZXN0IHJvdXRlci5cbiAqIEBwYXJhbSB7U2VydmljZUxvY2F0b3J9ICRzZXJ2aWNlTG9jYXRvciBTZXJ2aWNlIGxvY2F0b3IgdG8gcmVzb2x2ZSBzZXJ2aWNlcy5cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBSZXF1ZXN0Um91dGVyKCRzZXJ2aWNlTG9jYXRvcikge1xuXHR0aGlzLl9ldmVudEJ1cyA9ICRzZXJ2aWNlTG9jYXRvci5yZXNvbHZlKCdldmVudEJ1cycpO1xuXHR0aGlzLl93aW5kb3cgPSAkc2VydmljZUxvY2F0b3IucmVzb2x2ZSgnd2luZG93Jyk7XG5cdHRoaXMuX2RvY3VtZW50UmVuZGVyZXIgPSAkc2VydmljZUxvY2F0b3IucmVzb2x2ZSgnZG9jdW1lbnRSZW5kZXJlcicpO1xuXHR0aGlzLl9zdGF0ZVByb3ZpZGVyID0gJHNlcnZpY2VMb2NhdG9yLnJlc29sdmUoJ3N0YXRlUHJvdmlkZXInKTtcblx0dGhpcy5fY29udGV4dEZhY3RvcnkgPSAkc2VydmljZUxvY2F0b3IucmVzb2x2ZSgnY29udGV4dEZhY3RvcnknKTtcblxuXHR0aGlzLl9pc0hpc3RvcnlTdXBwb3J0ZWQgPSB0aGlzLl93aW5kb3cuaGlzdG9yeSAmJlxuXHRcdHRoaXMuX3dpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSBpbnN0YW5jZW9mIEZ1bmN0aW9uO1xuXHR2YXIgc2VsZiA9IHRoaXM7XG5cblx0Ly8gYWRkIGV2ZW50IGhhbmRsZXJzXG5cdHNlbGYuX3dyYXBEb2N1bWVudCgpO1xuXG5cdC8vIHNldCBpbml0aWFsIHN0YXRlIGZyb20gY3VycmVudCBVUklcblx0dGhpcy5fY2hhbmdlU3RhdGUobmV3IFVSSSh0aGlzLl93aW5kb3cubG9jYXRpb24udG9TdHJpbmcoKSkpXG5cdFx0LmNhdGNoKGZ1bmN0aW9uIChyZWFzb24pIHtcblx0XHRcdHNlbGYuX2hhbmRsZUVycm9yKHJlYXNvbik7XG5cdFx0fSk7XG59XG5cbi8qKlxuICogQ3VycmVudCBpbml0aWFsaXphdGlvbiBmbGFnLlxuICogQHR5cGUge2Jvb2xlYW59XG4gKiBAcHJpdmF0ZVxuICovXG5SZXF1ZXN0Um91dGVyLnByb3RvdHlwZS5faXNTdGF0ZUluaXRpYWxpemVkID0gZmFsc2U7XG5cbi8qKlxuICogQ3VycmVudCByZWZlcnJlci5cbiAqIEB0eXBlIHtVUkl9XG4gKiBAcHJpdmF0ZVxuICovXG5SZXF1ZXN0Um91dGVyLnByb3RvdHlwZS5fcmVmZXJyZXIgPSAnJztcblxuLyoqXG4gKiBDdXJyZW50IGxvY2F0aW9uLlxuICogQHR5cGUge1VSSX1cbiAqIEBwcml2YXRlXG4gKi9cblJlcXVlc3RSb3V0ZXIucHJvdG90eXBlLl9sb2NhdGlvbiA9IG51bGw7XG5cbi8qKlxuICogQ3VycmVudCBldmVudCBidXMuXG4gKiBAdHlwZSB7RXZlbnRFbWl0dGVyfVxuICogQHByaXZhdGVcbiAqL1xuUmVxdWVzdFJvdXRlci5wcm90b3R5cGUuX2V2ZW50QnVzID0gbnVsbDtcblxuLyoqXG4gKiBDdXJyZW50IGNvbnRleHQgZmFjdG9yeS5cbiAqIEB0eXBlIHtDb250ZXh0RmFjdG9yeX1cbiAqIEBwcml2YXRlXG4gKi9cblJlcXVlc3RSb3V0ZXIucHJvdG90eXBlLl9jb250ZXh0RmFjdG9yeSA9IG51bGw7XG5cbi8qKlxuICogQ3VycmVudCBzdGF0ZSBwcm92aWRlci5cbiAqIEB0eXBlIHtTdGF0ZVByb3ZpZGVyfVxuICogQHByaXZhdGVcbiAqL1xuUmVxdWVzdFJvdXRlci5wcm90b3R5cGUuX3N0YXRlUHJvdmlkZXIgPSBudWxsO1xuXG4vKipcbiAqIEN1cnJlbnQgZG9jdW1lbnQgcmVuZGVyZXIuXG4gKiBAdHlwZSB7RG9jdW1lbnRSZW5kZXJlcn1cbiAqIEBwcml2YXRlXG4gKi9cblJlcXVlc3RSb3V0ZXIucHJvdG90eXBlLl9kb2N1bWVudFJlbmRlcmVyID0gbnVsbDtcblxuLyoqXG4gKiBDdXJyZW50IGJyb3dzZXIgd2luZG93LlxuICogQHR5cGUge1dpbmRvd31cbiAqIEBwcml2YXRlXG4gKi9cblJlcXVlc3RSb3V0ZXIucHJvdG90eXBlLl93aW5kb3cgPSBudWxsO1xuXG4vKipcbiAqIFRydWUgaWYgY3VycmVudCBicm93c2VyIHN1cHBvcnRzIGhpc3RvcnkgQVBJLlxuICogQHR5cGUge2Jvb2xlYW59XG4gKiBAcHJpdmF0ZVxuICovXG5SZXF1ZXN0Um91dGVyLnByb3RvdHlwZS5faXNIaXN0b3J5U3VwcG9ydGVkID0gZmFsc2U7XG5cbi8qKlxuICogUm91dGVzIGJyb3dzZXIgcmVuZGVyIHJlcXVlc3QuXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gUHJvbWlzZSBmb3Igbm90aGluZy5cbiAqL1xuUmVxdWVzdFJvdXRlci5wcm90b3R5cGUucm91dGUgPSBmdW5jdGlvbiAoKSB7XG5cdHZhciBzZWxmID0gdGhpcztcblx0Ly8gYmVjYXVzZSBub3cgbG9jYXRpb24gd2FzIG5vdCBjaGFuZ2UgeWV0IGFuZFxuXHQvLyBkaWZmZXJlbnQgYnJvd3NlcnMgaGFuZGxlIGBwb3BzdGF0ZWAgZGlmZmVyZW50bHlcblx0Ly8gd2UgbmVlZCB0byBkbyByb3V0ZSBpbiBuZXh0IGl0ZXJhdGlvbiBvZiBldmVudCBsb29wXG5cdHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuXHRcdC50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciBuZXdMb2NhdGlvbiA9IG5ldyBVUkkoc2VsZi5fd2luZG93LmxvY2F0aW9uLnRvU3RyaW5nKCkpLFxuXHRcdFx0XHRuZXdBdXRob3JpdHkgPSBuZXdMb2NhdGlvbi5hdXRob3JpdHkgP1xuXHRcdFx0XHRcdG5ld0xvY2F0aW9uLmF1dGhvcml0eS50b1N0cmluZygpIDogbnVsbCxcblx0XHRcdFx0Y3VycmVudEF1dGhvcml0eSA9IHNlbGYuX2xvY2F0aW9uLmF1dGhvcml0eSA/XG5cdFx0XHRcdFx0c2VsZi5fbG9jYXRpb24uYXV0aG9yaXR5LnRvU3RyaW5nKCkgOiBudWxsO1xuXG5cdFx0XHRpZiAobmV3TG9jYXRpb24uc2NoZW1lICE9PSBzZWxmLl9sb2NhdGlvbi5zY2hlbWUgfHxcblx0XHRcdFx0bmV3QXV0aG9yaXR5ICE9PSBjdXJyZW50QXV0aG9yaXR5KSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gaWYgb25seSBVUkkgZnJhZ21lbnQgaXMgY2hhbmdlZFxuXHRcdFx0dmFyIG5ld1F1ZXJ5ID0gbmV3TG9jYXRpb24ucXVlcnkgP1xuXHRcdFx0XHRcdG5ld0xvY2F0aW9uLnF1ZXJ5LnRvU3RyaW5nKCkgOiBudWxsLFxuXHRcdFx0XHRjdXJyZW50UXVlcnkgPSBzZWxmLl9sb2NhdGlvbi5xdWVyeSA/XG5cdFx0XHRcdFx0c2VsZi5fbG9jYXRpb24ucXVlcnkudG9TdHJpbmcoKSA6IG51bGw7XG5cdFx0XHRpZiAobmV3TG9jYXRpb24ucGF0aCA9PT0gc2VsZi5fbG9jYXRpb24ucGF0aCAmJlxuXHRcdFx0XHRuZXdRdWVyeSA9PT0gY3VycmVudFF1ZXJ5KSB7XG5cdFx0XHRcdHNlbGYuX2xvY2F0aW9uID0gbmV3TG9jYXRpb247XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdHJldHVybiBzZWxmLl9jaGFuZ2VTdGF0ZShuZXdMb2NhdGlvbik7XG5cdFx0fSk7XG59O1xuXG4vKipcbiAqIFNldHMgYXBwbGljYXRpb24gc3RhdGUgdG8gc3BlY2lmaWVkIFVSSS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhdGlvblN0cmluZyBVUkkgdG8gZ28uXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gUHJvbWlzZSBmb3Igbm90aGluZy5cbiAqL1xuUmVxdWVzdFJvdXRlci5wcm90b3R5cGUuZ28gPSBmdW5jdGlvbiAobG9jYXRpb25TdHJpbmcpIHtcblx0dmFyIHNlbGYgPSB0aGlzO1xuXHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcblx0XHQudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgbG9jYXRpb24gPSBuZXcgVVJJKGxvY2F0aW9uU3RyaW5nKTtcblx0XHRcdGxvY2F0aW9uID0gbG9jYXRpb24ucmVzb2x2ZVJlbGF0aXZlKHNlbGYuX2xvY2F0aW9uKTtcblx0XHRcdGxvY2F0aW9uU3RyaW5nID0gbG9jYXRpb24udG9TdHJpbmcoKTtcblxuXHRcdFx0dmFyIGN1cnJlbnRBdXRob3JpdHkgPSBzZWxmLl9sb2NhdGlvbi5hdXRob3JpdHkgP1xuXHRcdFx0XHRcdHNlbGYuX2xvY2F0aW9uLmF1dGhvcml0eS50b1N0cmluZygpIDogbnVsbCxcblx0XHRcdFx0bmV3QXV0aG9yaXR5ID0gbG9jYXRpb24uYXV0aG9yaXR5ID9cblx0XHRcdFx0XHRsb2NhdGlvbi5hdXRob3JpdHkudG9TdHJpbmcoKSA6IG51bGw7XG5cblx0XHRcdC8vIHdlIG11c3QgY2hlY2sgaWYgdGhpcyBpcyBhbiBleHRlcm5hbCBsaW5rIGJlZm9yZSBtYXAgVVJJXG5cdFx0XHQvLyB0byBpbnRlcm5hbCBhcHBsaWNhdGlvbiBzdGF0ZVxuXHRcdFx0aWYgKCFzZWxmLl9pc0hpc3RvcnlTdXBwb3J0ZWQgfHxcblx0XHRcdFx0bG9jYXRpb24uc2NoZW1lICE9PSBzZWxmLl9sb2NhdGlvbi5zY2hlbWUgfHxcblx0XHRcdFx0bmV3QXV0aG9yaXR5ICE9PSBjdXJyZW50QXV0aG9yaXR5KSB7XG5cdFx0XHRcdHNlbGYuX3dpbmRvdy5sb2NhdGlvbi5hc3NpZ24obG9jYXRpb25TdHJpbmcpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHZhciBzdGF0ZSA9IHNlbGYuX3N0YXRlUHJvdmlkZXIuZ2V0U3RhdGVCeVVyaShsb2NhdGlvbik7XG5cdFx0XHRpZiAoIXN0YXRlKSB7XG5cdFx0XHRcdHNlbGYuX3dpbmRvdy5sb2NhdGlvbi5hc3NpZ24obG9jYXRpb25TdHJpbmcpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHNlbGYuX3dpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZShzdGF0ZSwgJycsIGxvY2F0aW9uU3RyaW5nKTtcblx0XHRcdHJldHVybiBzZWxmLnJvdXRlKCk7XG5cdFx0fSk7XG59O1xuXG4vKipcbiAqIENoYW5nZXMgY3VycmVudCBhcHBsaWNhdGlvbiBzdGF0ZSB3aXRoIG5ldyBsb2NhdGlvbi5cbiAqIEBwYXJhbSB7VVJJfSBuZXdMb2NhdGlvbiBOZXcgbG9jYXRpb24uXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gUHJvbWlzZSBmb3Igbm90aGluZy5cbiAqIEBwcml2YXRlXG4gKi9cblJlcXVlc3RSb3V0ZXIucHJvdG90eXBlLl9jaGFuZ2VTdGF0ZSA9IGZ1bmN0aW9uIChuZXdMb2NhdGlvbikge1xuXHR2YXIgc2VsZiA9IHRoaXM7XG5cdHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuXHRcdC50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdHNlbGYuX2xvY2F0aW9uID0gbmV3TG9jYXRpb247XG5cdFx0XHR2YXIgc3RhdGUgPSBzZWxmLl9zdGF0ZVByb3ZpZGVyLmdldFN0YXRlQnlVcmkobmV3TG9jYXRpb24pLFxuXHRcdFx0XHRyb3V0aW5nQ29udGV4dCA9IHNlbGYuX2NvbnRleHRGYWN0b3J5LmNyZWF0ZSh7XG5cdFx0XHRcdFx0cmVmZXJyZXI6IHNlbGYuX3JlZmVycmVyIHx8IHNlbGYuX3dpbmRvdy5kb2N1bWVudC5yZWZlcnJlcixcblx0XHRcdFx0XHRsb2NhdGlvbjogc2VsZi5fbG9jYXRpb24sXG5cdFx0XHRcdFx0dXNlckFnZW50OiBzZWxmLl93aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudFxuXHRcdFx0XHR9KTtcblxuXHRcdFx0aWYgKCFzZWxmLl9pc1N0YXRlSW5pdGlhbGl6ZWQpIHtcblx0XHRcdFx0c2VsZi5faXNTdGF0ZUluaXRpYWxpemVkID0gdHJ1ZTtcblx0XHRcdFx0cmV0dXJuIHNlbGYuX2RvY3VtZW50UmVuZGVyZXIuaW5pdFdpdGhTdGF0ZShcblx0XHRcdFx0XHRzdGF0ZSwgcm91dGluZ0NvbnRleHRcblx0XHRcdFx0KTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHN0YXRlID09PSBudWxsKSB7XG5cdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gc2VsZi5fZG9jdW1lbnRSZW5kZXJlclxuXHRcdFx0XHQucmVuZGVyKHN0YXRlLCByb3V0aW5nQ29udGV4dCk7XG5cdFx0fSlcblx0XHQudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRzZWxmLl9yZWZlcnJlciA9IHNlbGYuX2xvY2F0aW9uO1xuXHRcdH0pO1xufTtcblxuLyoqXG4gKiBXcmFwcyBkb2N1bWVudCB3aXRoIHJlcXVpcmVkIGV2ZW50cyB0byByb3V0ZSByZXF1ZXN0cy5cbiAqIEBwcml2YXRlXG4gKi9cblJlcXVlc3RSb3V0ZXIucHJvdG90eXBlLl93cmFwRG9jdW1lbnQgPSBmdW5jdGlvbiAoKSB7XG5cdHZhciBzZWxmID0gdGhpcztcblxuXHRpZiAoIXRoaXMuX2lzSGlzdG9yeVN1cHBvcnRlZCkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdHRoaXMuX3dpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb3BzdGF0ZScsIGZ1bmN0aW9uICgpIHtcblx0XHRzZWxmLnJvdXRlKCkuY2F0Y2goc2VsZi5faGFuZGxlRXJyb3IuYmluZChzZWxmKSk7XG5cdH0pO1xuXG5cdHRoaXMuX3dpbmRvdy5kb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0aWYgKGV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0aWYgKGV2ZW50LnRhcmdldC50YWdOYW1lID09PSBBX1RBR19OQU1FKSB7XG5cdFx0XHRzZWxmLl9saW5rQ2xpY2tIYW5kbGVyKGV2ZW50LCBldmVudC50YXJnZXQpXG5cdFx0XHRcdC5jYXRjaChzZWxmLl9oYW5kbGVFcnJvci5iaW5kKHNlbGYpKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFyIGxpbmsgPSBjbG9zZXN0TGluayhldmVudC50YXJnZXQpO1xuXHRcdFx0aWYgKCFsaW5rKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdHNlbGYuX2xpbmtDbGlja0hhbmRsZXIoZXZlbnQsIGxpbmspO1xuXHRcdH1cblx0fSk7XG59O1xuXG4vKipcbiAqIEhhbmRsZXMgbGluayBjbGljayBvbiB0aGUgcGFnZS5cbiAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IEV2ZW50LXJlbGF0ZWQgb2JqZWN0LlxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50IExpbmsgZWxlbWVudC5cbiAqIEByZXR1cm5zIHtQcm9taXNlfSBQcm9taXNlIGZvciBub3RoaW5nLlxuICogQHByaXZhdGVcbiAqL1xuUmVxdWVzdFJvdXRlci5wcm90b3R5cGUuX2xpbmtDbGlja0hhbmRsZXIgPSBmdW5jdGlvbiAoZXZlbnQsIGVsZW1lbnQpIHtcblx0dmFyIHNlbGYgPSB0aGlzO1xuXHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcblx0XHQudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgdGFyZ2V0QXR0cmlidXRlID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoVEFSR0VUX0FUVFJJQlVURV9OQU1FKTtcblx0XHRcdGlmICh0YXJnZXRBdHRyaWJ1dGUpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBpZiBtaWRkbGUgbW91c2UgYnV0dG9uIHdhcyBjbGlja2VkXG5cdFx0XHRpZiAoZXZlbnQuYnV0dG9uID09PSBNT1VTRV9LRVlTLk1JRERMRSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHZhciBsb2NhdGlvblN0cmluZyA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKEhSRUZfQVRUUklCVVRFX05BTUUpO1xuXHRcdFx0aWYgKCFsb2NhdGlvblN0cmluZykge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRpZiAobG9jYXRpb25TdHJpbmdbMF0gPT09ICcjJykge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRyZXR1cm4gc2VsZi5nbyhsb2NhdGlvblN0cmluZyk7XG5cdFx0fSlcblx0XHQuY2F0Y2goZnVuY3Rpb24gKHJlYXNvbikge1xuXHRcdFx0c2VsZi5faGFuZGxlRXJyb3IocmVhc29uKTtcblx0XHR9KTtcbn07XG5cbi8qKlxuICogSGFuZGxlcyBhbGwgZXJyb3JzLlxuICogQHBhcmFtIHtFcnJvcn0gZXJyb3IgRXJyb3IgdG8gaGFuZGxlLlxuICogQHByaXZhdGVcbiAqL1xuUmVxdWVzdFJvdXRlci5wcm90b3R5cGUuX2hhbmRsZUVycm9yID0gZnVuY3Rpb24gKGVycm9yKSB7XG5cdHRoaXMuX2V2ZW50QnVzLmVtaXQoJ2Vycm9yJywgZXJyb3IpO1xufTtcblxuLyoqXG4gKiBGaW5kcyB0aGUgY2xvc2VzdCBhc2NlbmRpbmcgXCJBXCIgZWxlbWVudCBub2RlLlxuICogQHBhcmFtIHtOb2RlfSBlbGVtZW50IERPTSBlbGVtZW50LlxuICogQHJldHVybnMge05vZGV8bnVsbH0gVGhlIGNsb3Nlc3QgXCJBXCIgZWxlbWVudCBvciBudWxsLlxuICovXG5mdW5jdGlvbiBjbG9zZXN0TGluayhlbGVtZW50KSB7XG5cdHdoaWxlKGVsZW1lbnQgJiYgZWxlbWVudC5ub2RlTmFtZSAhPT0gQV9UQUdfTkFNRSAmJlxuXHRcdGVsZW1lbnQubm9kZU5hbWUgIT09IEJPRFlfVEFHX05BTUUpIHtcblx0XHRlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlO1xuXHR9XG5cdHJldHVybiBlbGVtZW50ICYmIGVsZW1lbnQubm9kZU5hbWUgPT09IEFfVEFHX05BTUUgPyBlbGVtZW50IDogbnVsbDtcbn0iLCIvKlxuICogY2F0YmVycnlcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUgRGVuaXMgUmVjaGt1bm92IGFuZCBwcm9qZWN0IGNvbnRyaWJ1dG9ycy5cbiAqXG4gKiBjYXRiZXJyeSdzIGxpY2Vuc2UgZm9sbG93czpcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvblxuICogb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb25cbiAqIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbixcbiAqIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsXG4gKiBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLFxuICogYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbiAqIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4gKiBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4gKiBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqXG4gKiBUaGlzIGxpY2Vuc2UgYXBwbGllcyB0byBhbGwgcGFydHMgb2YgY2F0YmVycnkgdGhhdCBhcmUgbm90IGV4dGVybmFsbHlcbiAqIG1haW50YWluZWQgbGlicmFyaWVzLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnRMb2FkZXI7XG5cbnZhciBtb2R1bGVIZWxwZXIgPSByZXF1aXJlKCcuLi8uLi9saWIvaGVscGVycy9tb2R1bGVIZWxwZXInKSxcblx0dXRpbCA9IHJlcXVpcmUoJ3V0aWwnKSxcblx0TG9hZGVyQmFzZSA9IHJlcXVpcmUoJy4uLy4uL2xpYi9iYXNlL0xvYWRlckJhc2UnKTtcblxudXRpbC5pbmhlcml0cyhDb21wb25lbnRMb2FkZXIsIExvYWRlckJhc2UpO1xuXG4vKipcbiAqIENyZWF0ZXMgbmV3IGluc3RhbmNlIG9mIHRoZSBjb21wb25lbnQgbG9hZGVyLlxuICogQHBhcmFtIHtTZXJ2aWNlTG9jYXRvcn0gJHNlcnZpY2VMb2NhdG9yIExvY2F0b3IgdG8gcmVzb2x2ZSBkZXBlbmRlbmNpZXMuXG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIExvYWRlckJhc2VcbiAqL1xuZnVuY3Rpb24gQ29tcG9uZW50TG9hZGVyKCRzZXJ2aWNlTG9jYXRvcikge1xuXHR0aGlzLl9zZXJ2aWNlTG9jYXRvciA9ICRzZXJ2aWNlTG9jYXRvcjtcblx0dGhpcy5fZXZlbnRCdXMgPSAkc2VydmljZUxvY2F0b3IucmVzb2x2ZSgnZXZlbnRCdXMnKTtcblx0dGhpcy5fdGVtcGxhdGVQcm92aWRlciA9ICRzZXJ2aWNlTG9jYXRvci5yZXNvbHZlKCd0ZW1wbGF0ZVByb3ZpZGVyJyk7XG5cdExvYWRlckJhc2UuY2FsbCh0aGlzLCAkc2VydmljZUxvY2F0b3IucmVzb2x2ZUFsbCgnY29tcG9uZW50VHJhbnNmb3JtJykpO1xufVxuXG4vKipcbiAqIEN1cnJlbnQgZXZlbnQgYnVzLlxuICogQHR5cGUge0V2ZW50RW1pdHRlcn1cbiAqIEBwcml2YXRlXG4gKi9cbkNvbXBvbmVudExvYWRlci5wcm90b3R5cGUuX2V2ZW50QnVzID0gbnVsbDtcblxuLyoqXG4gKiBDdXJyZW50IHNlcnZpY2UgbG9jYXRvci5cbiAqIEB0eXBlIHtTZXJ2aWNlTG9jYXRvcn1cbiAqIEBwcml2YXRlXG4gKi9cbkNvbXBvbmVudExvYWRlci5wcm90b3R5cGUuX3NlcnZpY2VMb2NhdG9yID0gbnVsbDtcblxuLyoqXG4gKiBDdXJyZW50IHRlbXBsYXRlIHByb3ZpZGVyLlxuICogQHR5cGUge1RlbXBsYXRlUHJvdmlkZXJ9XG4gKiBAcHJpdmF0ZVxuICovXG5Db21wb25lbnRMb2FkZXIucHJvdG90eXBlLl90ZW1wbGF0ZVByb3ZpZGVyID0gbnVsbDtcblxuLyoqXG4gKiBDdXJyZW50IG1hcCBvZiBsb2FkZWQgY29tcG9uZW50cyBieSBuYW1lcy5cbiAqIEB0eXBlIHtPYmplY3R9IE1hcCBvZiBjb21wb25lbnRzIGJ5IG5hbWVzLlxuICogQHByaXZhdGVcbiAqL1xuQ29tcG9uZW50TG9hZGVyLnByb3RvdHlwZS5fbG9hZGVkQ29tcG9uZW50cyA9IG51bGw7XG5cbi8qKlxuICogTG9hZHMgY29tcG9uZW50cyB3aGVuIGl0IGlzIGluIGEgYnJvd3Nlci5cbiAqIEByZXR1cm5zIHtQcm9taXNlfSBQcm9taXNlIGZvciBub3RoaW5nLlxuICovXG5Db21wb25lbnRMb2FkZXIucHJvdG90eXBlLmxvYWQgPSBmdW5jdGlvbiAoKSB7XG5cdGlmICh0aGlzLl9sb2FkZWRDb21wb25lbnRzKSB7XG5cdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9sb2FkZWRDb21wb25lbnRzKTtcblx0fVxuXG5cdHRoaXMuX2xvYWRlZENvbXBvbmVudHMgPSB7fTtcblxuXHR2YXIgc2VsZiA9IHRoaXM7XG5cdHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuXHRcdC50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciBjb21wb25lbnRzID0gc2VsZi5fc2VydmljZUxvY2F0b3IucmVzb2x2ZUFsbCgnY29tcG9uZW50JyksXG5cdFx0XHRcdGNvbXBvbmVudFByb21pc2VzID0gW107XG5cblx0XHRcdC8vIHRoZSBsaXN0IGlzIGEgc3RhY2ssIHdlIHNob3VsZCByZXZlcnNlIGl0XG5cdFx0XHRjb21wb25lbnRzLmZvckVhY2goZnVuY3Rpb24gKGNvbXBvbmVudCkge1xuXHRcdFx0XHRjb21wb25lbnRQcm9taXNlcy51bnNoaWZ0KFxuXHRcdFx0XHRcdHNlbGYuX3Byb2Nlc3NDb21wb25lbnQoY29tcG9uZW50KVxuXHRcdFx0XHQpO1xuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5hbGwoY29tcG9uZW50UHJvbWlzZXMpO1xuXHRcdH0pXG5cdFx0LnRoZW4oZnVuY3Rpb24gKGNvbXBvbmVudHMpIHtcblx0XHRcdGNvbXBvbmVudHMuZm9yRWFjaChmdW5jdGlvbiAoY29tcG9uZW50KSB7XG5cdFx0XHRcdGlmICghY29tcG9uZW50IHx8IHR5cGVvZihjb21wb25lbnQpICE9PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHRzZWxmLl9sb2FkZWRDb21wb25lbnRzW2NvbXBvbmVudC5uYW1lXSA9IGNvbXBvbmVudDtcblx0XHRcdH0pO1xuXHRcdFx0c2VsZi5fZXZlbnRCdXMuZW1pdCgnYWxsQ29tcG9uZW50c0xvYWRlZCcsIGNvbXBvbmVudHMpO1xuXHRcdFx0cmV0dXJuIHNlbGYuX2xvYWRlZENvbXBvbmVudHM7XG5cdFx0fSk7XG59O1xuXG4vKipcbiAqIFByb2Nlc3NlcyBjb21wb25lbnQgYW5kIGFwcGx5IHJlcXVpcmVkIG9wZXJhdGlvbnMuXG4gKiBAcGFyYW0ge09iamVjdH0gY29tcG9uZW50RGV0YWlscyBMb2FkZWQgY29tcG9uZW50IGRldGFpbHMuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBDb21wb25lbnQgb2JqZWN0LlxuICogQHByaXZhdGVcbiAqL1xuQ29tcG9uZW50TG9hZGVyLnByb3RvdHlwZS5fcHJvY2Vzc0NvbXBvbmVudCA9IGZ1bmN0aW9uIChjb21wb25lbnREZXRhaWxzKSB7XG5cdHZhciBzZWxmID0gdGhpcyxcblx0XHRjb21wb25lbnQgPSBPYmplY3QuY3JlYXRlKGNvbXBvbmVudERldGFpbHMpO1xuXG5cdHJldHVybiB0aGlzLl9hcHBseVRyYW5zZm9ybXMoY29tcG9uZW50KVxuXHRcdC50aGVuKGZ1bmN0aW9uICh0cmFuc2Zvcm1lZCkge1xuXHRcdFx0Y29tcG9uZW50ID0gdHJhbnNmb3JtZWQ7XG5cdFx0XHRzZWxmLl90ZW1wbGF0ZVByb3ZpZGVyLnJlZ2lzdGVyQ29tcGlsZWQoXG5cdFx0XHRcdGNvbXBvbmVudC5uYW1lLCBjb21wb25lbnQudGVtcGxhdGVTb3VyY2Vcblx0XHRcdCk7XG5cdFx0XHRjb21wb25lbnQudGVtcGxhdGUgPSB7XG5cdFx0XHRcdHJlbmRlcjogZnVuY3Rpb24gKGRhdGFDb250ZXh0KSB7XG5cdFx0XHRcdFx0cmV0dXJuIHNlbGYuX3RlbXBsYXRlUHJvdmlkZXIucmVuZGVyKFxuXHRcdFx0XHRcdFx0Y29tcG9uZW50Lm5hbWUsIGRhdGFDb250ZXh0XG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGlmICh0eXBlb2YoY29tcG9uZW50LmVycm9yVGVtcGxhdGVTb3VyY2UpID09PSAnc3RyaW5nJykge1xuXHRcdFx0XHR2YXIgZXJyb3JUZW1wbGF0ZU5hbWUgPSBtb2R1bGVIZWxwZXIuZ2V0TmFtZUZvckVycm9yVGVtcGxhdGUoXG5cdFx0XHRcdFx0Y29tcG9uZW50Lm5hbWVcblx0XHRcdFx0KTtcblx0XHRcdFx0c2VsZi5fdGVtcGxhdGVQcm92aWRlci5yZWdpc3RlckNvbXBpbGVkKFxuXHRcdFx0XHRcdGVycm9yVGVtcGxhdGVOYW1lLCBjb21wb25lbnQuZXJyb3JUZW1wbGF0ZVNvdXJjZVxuXHRcdFx0XHQpO1xuXHRcdFx0XHRjb21wb25lbnQuZXJyb3JUZW1wbGF0ZSA9IHtcblx0XHRcdFx0XHRyZW5kZXI6IGZ1bmN0aW9uIChkYXRhQ29udGV4dCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHNlbGYuX3RlbXBsYXRlUHJvdmlkZXIucmVuZGVyKFxuXHRcdFx0XHRcdFx0XHRlcnJvclRlbXBsYXRlTmFtZSwgZGF0YUNvbnRleHRcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdFx0c2VsZi5fZXZlbnRCdXMuZW1pdCgnY29tcG9uZW50TG9hZGVkJywgY29tcG9uZW50KTtcblx0XHRcdHJldHVybiBjb21wb25lbnQ7XG5cdFx0fSlcblx0XHQuY2F0Y2goZnVuY3Rpb24gKHJlYXNvbikge1xuXHRcdFx0c2VsZi5fZXZlbnRCdXMuZW1pdCgnZXJyb3InLCByZWFzb24pO1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fSk7XG59O1xuXG4vKipcbiAqIEdldHMgbWFwIG9mIGNvbXBvbmVudHMgYnkgbmFtZXMuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBNYXAgb2YgY29tcG9uZW50cyBieSBuYW1lcy5cbiAqL1xuQ29tcG9uZW50TG9hZGVyLnByb3RvdHlwZS5nZXRDb21wb25lbnRzQnlOYW1lcyA9IGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuIHRoaXMuX2xvYWRlZENvbXBvbmVudHMgfHwge307XG59OyIsIi8qXG4gKiBjYXRiZXJyeVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNSBEZW5pcyBSZWNoa3Vub3YgYW5kIHByb2plY3QgY29udHJpYnV0b3JzLlxuICpcbiAqIGNhdGJlcnJ5J3MgbGljZW5zZSBmb2xsb3dzOlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXG4gKiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvblxuICogZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLFxuICogaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSxcbiAqIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsXG4gKiBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuICogc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbiAqIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1NcbiAqIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICpcbiAqIFRoaXMgbGljZW5zZSBhcHBsaWVzIHRvIGFsbCBwYXJ0cyBvZiBjYXRiZXJyeSB0aGF0IGFyZSBub3QgZXh0ZXJuYWxseVxuICogbWFpbnRhaW5lZCBsaWJyYXJpZXMuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN0b3JlTG9hZGVyO1xuXG52YXIgbW9kdWxlSGVscGVyID0gcmVxdWlyZSgnLi4vLi4vbGliL2hlbHBlcnMvbW9kdWxlSGVscGVyJyksXG5cdHV0aWwgPSByZXF1aXJlKCd1dGlsJyksXG5cdExvYWRlckJhc2UgPSByZXF1aXJlKCcuLi8uLi9saWIvYmFzZS9Mb2FkZXJCYXNlJyk7XG5cbnV0aWwuaW5oZXJpdHMoU3RvcmVMb2FkZXIsIExvYWRlckJhc2UpO1xuXG4vKipcbiAqIENyZWF0ZXMgaW5zdGFuY2Ugb2YgdGhlIHN0b3JlIGxvYWRlci5cbiAqIEBwYXJhbSB7U2VydmljZUxvY2F0b3J9ICRzZXJ2aWNlTG9jYXRvciBMb2NhdG9yIHRvIHJlc29sdmUgc3RvcmVzLlxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBMb2FkZXJCYXNlXG4gKi9cbmZ1bmN0aW9uIFN0b3JlTG9hZGVyKCRzZXJ2aWNlTG9jYXRvcikge1xuXHR0aGlzLl9zZXJ2aWNlTG9jYXRvciA9ICRzZXJ2aWNlTG9jYXRvcjtcblx0dGhpcy5fZXZlbnRCdXMgPSAkc2VydmljZUxvY2F0b3IucmVzb2x2ZSgnZXZlbnRCdXMnKTtcblx0TG9hZGVyQmFzZS5jYWxsKHRoaXMsICRzZXJ2aWNlTG9jYXRvci5yZXNvbHZlQWxsKCdzdG9yZVRyYW5zZm9ybScpKTtcbn1cblxuLyoqXG4gKiBDdXJyZW50IGV2ZW50IGJ1cy5cbiAqIEB0eXBlIHtFdmVudEVtaXR0ZXJ9XG4gKiBAcHJpdmF0ZVxuICovXG5TdG9yZUxvYWRlci5wcm90b3R5cGUuX2V2ZW50QnVzID0gbnVsbDtcblxuLyoqXG4gKiBDdXJyZW50IHNlcnZpY2UgbG9jYXRvci5cbiAqIEB0eXBlIHtTZXJ2aWNlTG9jYXRvcn1cbiAqIEBwcml2YXRlXG4gKi9cblN0b3JlTG9hZGVyLnByb3RvdHlwZS5fc2VydmljZUxvY2F0b3IgPSBudWxsO1xuXG4vKipcbiAqIEN1cnJlbnQgc2V0IG9mIGxvYWRlZCBzdG9yZXMuXG4gKiBAdHlwZSB7T2JqZWN0fVxuICogQHByaXZhdGVcbiAqL1xuU3RvcmVMb2FkZXIucHJvdG90eXBlLl9sb2FkZWRTdG9yZXMgPSBudWxsO1xuXG4vKipcbiAqIExvYWRzIGFsbCBzdG9yZXMgd2hlbiBpdCBpcyBpbiBhIGJyb3dzZXIuXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gUHJvbWlzZSBmb3Igbm90aGluZy5cbiAqL1xuU3RvcmVMb2FkZXIucHJvdG90eXBlLmxvYWQgPSBmdW5jdGlvbiAoKSB7XG5cdGlmICh0aGlzLl9sb2FkZWRTdG9yZXMpIHtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuX2xvYWRlZFN0b3Jlcyk7XG5cdH1cblxuXHR0aGlzLl9sb2FkZWRTdG9yZXMgPSB7fTtcblx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuXHRcdC50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciBzdG9yZXMgPSBzZWxmLl9zZXJ2aWNlTG9jYXRvci5yZXNvbHZlQWxsKCdzdG9yZScpLFxuXHRcdFx0XHRzdG9yZVByb21pc2VzID0gW107XG5cblx0XHRcdC8vIHRoZSBsaXN0IGlzIGEgc3RhY2ssIHdlIHNob3VsZCByZXZlcnNlIGl0XG5cdFx0XHRzdG9yZXMuZm9yRWFjaChmdW5jdGlvbiAoc3RvcmUpIHtcblx0XHRcdFx0c3RvcmVQcm9taXNlcy51bnNoaWZ0KFxuXHRcdFx0XHRcdHNlbGYuX2dldFN0b3JlKHN0b3JlKVxuXHRcdFx0XHQpO1xuXHRcdFx0fSk7XG5cblx0XHRcdHJldHVybiBQcm9taXNlLmFsbChzdG9yZVByb21pc2VzKTtcblx0XHR9KVxuXHRcdC50aGVuKGZ1bmN0aW9uIChzdG9yZXMpIHtcblx0XHRcdHN0b3Jlcy5mb3JFYWNoKGZ1bmN0aW9uIChzdG9yZSkge1xuXHRcdFx0XHRpZiAoIXN0b3JlIHx8IHR5cGVvZihzdG9yZSkgIT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHNlbGYuX2xvYWRlZFN0b3Jlc1tzdG9yZS5uYW1lXSA9IHN0b3JlO1xuXHRcdFx0fSk7XG5cdFx0XHRzZWxmLl9ldmVudEJ1cy5lbWl0KCdhbGxTdG9yZXNMb2FkZWQnLCBzZWxmLl9sb2FkZWRTdG9yZXMpO1xuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShzZWxmLl9sb2FkZWRTdG9yZXMpO1xuXHRcdH0pO1xufTtcblxuLyoqXG4gKiBHZXRzIHRoZSBzdG9yZSBmcm9tIHN0b3JlIGRldGFpbHMuXG4gKiBAcGFyYW0ge09iamVjdH0gc3RvcmVEZXRhaWxzIFN0b3JlIGRldGFpbHMuXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxPYmplY3Q+fSBQcm9taXNlIGZvciBzdG9yZS5cbiAqIEBwcml2YXRlXG4gKi9cblN0b3JlTG9hZGVyLnByb3RvdHlwZS5fZ2V0U3RvcmUgPSBmdW5jdGlvbiAoc3RvcmVEZXRhaWxzKSB7XG5cdHZhciBzZWxmID0gdGhpcztcblx0cmV0dXJuIHRoaXMuX2FwcGx5VHJhbnNmb3JtcyhzdG9yZURldGFpbHMpXG5cdFx0LnRoZW4oZnVuY3Rpb24gKHRyYW5zZm9ybWVkKSB7XG5cdFx0XHRzZWxmLl9ldmVudEJ1cy5lbWl0KCdzdG9yZUxvYWRlZCcsIHRyYW5zZm9ybWVkKTtcblx0XHRcdHJldHVybiB0cmFuc2Zvcm1lZDtcblx0XHR9KVxuXHRcdC5jYXRjaChmdW5jdGlvbiAocmVhc29uKSB7XG5cdFx0XHRzZWxmLl9ldmVudEJ1cy5lbWl0KCdlcnJvcicsIHJlYXNvbik7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9KTtcbn07XG5cbi8qKlxuICogR2V0cyBzdG9yZXMgbWFwIGJ5IG5hbWVzLlxuICogQHJldHVybnMge09iamVjdH0gTWFwIG9mIHN0b3JlcyBieSBuYW1lcy5cbiAqL1xuU3RvcmVMb2FkZXIucHJvdG90eXBlLmdldFN0b3Jlc0J5TmFtZXMgPSBmdW5jdGlvbiAoKSB7XG5cdHJldHVybiB0aGlzLl9sb2FkZWRTdG9yZXMgfHwge307XG59OyIsIi8qXG4gKiBjYXRiZXJyeVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNCBEZW5pcyBSZWNoa3Vub3YgYW5kIHByb2plY3QgY29udHJpYnV0b3JzLlxuICpcbiAqIGNhdGJlcnJ5J3MgbGljZW5zZSBmb2xsb3dzOlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXG4gKiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvblxuICogZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLFxuICogaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSxcbiAqIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsXG4gKiBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuICogc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbiAqIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1NcbiAqIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICpcbiAqIFRoaXMgbGljZW5zZSBhcHBsaWVzIHRvIGFsbCBwYXJ0cyBvZiBjYXRiZXJyeSB0aGF0IGFyZSBub3QgZXh0ZXJuYWxseVxuICogbWFpbnRhaW5lZCBsaWJyYXJpZXMuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1vZHVsZUFwaVByb3ZpZGVyO1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWwnKSxcblx0cHJvcGVydHlIZWxwZXIgPSByZXF1aXJlKCcuLi8uLi9saWIvaGVscGVycy9wcm9wZXJ0eUhlbHBlcicpLFxuXHRNb2R1bGVBcGlQcm92aWRlckJhc2UgPSByZXF1aXJlKCcuLi8uLi9saWIvYmFzZS9Nb2R1bGVBcGlQcm92aWRlckJhc2UnKSxcblx0bW9kdWxlSGVscGVyID0gcmVxdWlyZSgnLi4vLi4vbGliL2hlbHBlcnMvbW9kdWxlSGVscGVyJyk7XG5cbnV0aWwuaW5oZXJpdHMoTW9kdWxlQXBpUHJvdmlkZXIsIE1vZHVsZUFwaVByb3ZpZGVyQmFzZSk7XG5cbi8qKlxuICogQ3JlYXRlcyBuZXcgaW5zdGFuY2Ugb2YgdGhlIG1vZHVsZSBBUEkgcHJvdmlkZXIuXG4gKiBAcGFyYW0ge1NlcnZpY2VMb2NhdG9yfSAkc2VydmljZUxvY2F0b3IgU2VydmljZSBsb2NhdG9yXG4gKiB0byByZXNvbHZlIGRlcGVuZGVuY2llcy5cbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgTW9kdWxlQXBpUHJvdmlkZXJCYXNlXG4gKi9cbmZ1bmN0aW9uIE1vZHVsZUFwaVByb3ZpZGVyKCRzZXJ2aWNlTG9jYXRvcikge1xuXHRNb2R1bGVBcGlQcm92aWRlckJhc2UuY2FsbCh0aGlzLCAkc2VydmljZUxvY2F0b3IpO1xuXHRwcm9wZXJ0eUhlbHBlci5kZWZpbmVSZWFkT25seSh0aGlzLCAnaXNCcm93c2VyJywgdHJ1ZSk7XG5cdHByb3BlcnR5SGVscGVyLmRlZmluZVJlYWRPbmx5KHRoaXMsICdpc1NlcnZlcicsIGZhbHNlKTtcbn1cblxuLyoqXG4gKiBSZWRpcmVjdHMgY3VycmVudCBwYWdlIHRvIHNwZWNpZmllZCBVUkkuXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJpU3RyaW5nIFVSSSB0byByZWRpcmVjdC5cbiAqIEByZXR1cm5zIHtQcm9taXNlfSBQcm9taXNlIGZvciBub3RoaW5nLlxuICovXG5Nb2R1bGVBcGlQcm92aWRlci5wcm90b3R5cGUucmVkaXJlY3QgPSBmdW5jdGlvbiAodXJpU3RyaW5nKSB7XG5cdHZhciByZXF1ZXN0Um91dGVyID0gdGhpcy5sb2NhdG9yLnJlc29sdmUoJ3JlcXVlc3RSb3V0ZXInKTtcblx0cmV0dXJuIHJlcXVlc3RSb3V0ZXIuZ28odXJpU3RyaW5nKTtcbn07XG5cbi8qKlxuICogQ2xlYXJzIGN1cnJlbnQgbG9jYXRpb24gVVJJJ3MgZnJhZ21lbnQuXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gUHJvbWlzZSBmb3Igbm90aGluZy5cbiAqL1xuTW9kdWxlQXBpUHJvdmlkZXIucHJvdG90eXBlLmNsZWFyRnJhZ21lbnQgPSBmdW5jdGlvbiAoKSB7XG5cdHZhciB3aW5kb3cgPSB0aGlzLmxvY2F0b3IucmVzb2x2ZSgnd2luZG93JyksXG5cdFx0cG9zaXRpb24gPSB3aW5kb3cuZG9jdW1lbnQuYm9keS5zY3JvbGxUb3A7XG5cdHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gJyc7XG5cdHdpbmRvdy5kb2N1bWVudC5ib2R5LnNjcm9sbFRvcCA9IHBvc2l0aW9uO1xuXHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG59OyIsIi8qXG4gKiBjYXRiZXJyeVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNCBEZW5pcyBSZWNoa3Vub3YgYW5kIHByb2plY3QgY29udHJpYnV0b3JzLlxuICpcbiAqIGNhdGJlcnJ5J3MgbGljZW5zZSBmb2xsb3dzOlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXG4gKiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvblxuICogZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLFxuICogaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSxcbiAqIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsXG4gKiBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuICogc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbiAqIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1NcbiAqIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICpcbiAqIFRoaXMgbGljZW5zZSBhcHBsaWVzIHRvIGFsbCBwYXJ0cyBvZiBjYXRiZXJyeSB0aGF0IGFyZSBub3QgZXh0ZXJuYWxseVxuICogbWFpbnRhaW5lZCBsaWJyYXJpZXMuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL0Jvb3RzdHJhcHBlcicpO1xuIiwiLypcbiAqIGNhdGJlcnJ5XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0IERlbmlzIFJlY2hrdW5vdiBhbmQgcHJvamVjdCBjb250cmlidXRvcnMuXG4gKlxuICogY2F0YmVycnkncyBsaWNlbnNlIGZvbGxvd3M6XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb25cbiAqIG9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uXG4gKiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sXG4gKiBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLFxuICogcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSxcbiAqIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4gKiBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuICogaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuICogT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKlxuICogVGhpcyBsaWNlbnNlIGFwcGxpZXMgdG8gYWxsIHBhcnRzIG9mIGNhdGJlcnJ5IHRoYXQgYXJlIG5vdCBleHRlcm5hbGx5XG4gKiBtYWludGFpbmVkIGxpYnJhcmllcy5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gQ29udGV4dEZhY3Rvcnk7XG5cbnZhciBVUkkgPSByZXF1aXJlKCdjYXRiZXJyeS11cmknKS5VUkksXG5cdHByb3BlcnR5SGVscGVyID0gcmVxdWlyZSgnLi9oZWxwZXJzL3Byb3BlcnR5SGVscGVyJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBuZXcgaW5zdGFuY2Ugb2YgdGhlIGNvbnRleHQgZmFjdG9yeS5cbiAqIEBwYXJhbSB7U2VydmljZUxvY2F0b3J9ICRzZXJ2aWNlTG9jYXRvciBMb2NhdG9yIHRvIHJlc29sdmUgZGVwZW5kZW5jaWVzLlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIENvbnRleHRGYWN0b3J5KCRzZXJ2aWNlTG9jYXRvcikge1xuXHR0aGlzLl9zZXJ2aWNlTG9jYXRvciA9ICRzZXJ2aWNlTG9jYXRvcjtcbn1cblxuLyoqXG4gKiBDdXJyZW50IHNlcnZpY2UgbG9jYXRvci5cbiAqIEB0eXBlIHtTZXJ2aWNlTG9jYXRvcn1cbiAqIEBwcml2YXRlXG4gKi9cbkNvbnRleHRGYWN0b3J5LnByb3RvdHlwZS5fc2VydmljZUxvY2F0b3IgPSBudWxsO1xuXG4vKipcbiAqIENyZWF0ZXMgbmV3IGNvbnRleHQgZm9yIG1vZHVsZXMuXG4gKiBAcGFyYW0ge09iamVjdH0gYWRkaXRpb25hbCBBZGRpdGlvbmFsIHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0ge1VSSX0gYWRkaXRpb25hbC5yZWZlcnJlciBDdXJyZW50IHJlZmVycmVyLlxuICogQHBhcmFtIHtVUkl9IGFkZGl0aW9uYWwubG9jYXRpb24gQ3VycmVudCBsb2NhdGlvbi5cbiAqIEBwYXJhbSB7U3RyaW5nfSBhZGRpdGlvbmFsLnVzZXJBZ2VudCBDdXJyZW50IHVzZXIgYWdlbnQuXG4gKi9cbkNvbnRleHRGYWN0b3J5LnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiAoYWRkaXRpb25hbCkge1xuXHR2YXIgYXBpUHJvdmlkZXIgPSB0aGlzLl9zZXJ2aWNlTG9jYXRvci5yZXNvbHZlKCdtb2R1bGVBcGlQcm92aWRlcicpLFxuXHRcdGNvbnRleHQgPSBPYmplY3QuY3JlYXRlKGFwaVByb3ZpZGVyKTtcblx0T2JqZWN0LmtleXMoYWRkaXRpb25hbClcblx0XHQuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0XHRwcm9wZXJ0eUhlbHBlci5kZWZpbmVSZWFkT25seShjb250ZXh0LCBrZXksIGFkZGl0aW9uYWxba2V5XSk7XG5cdFx0fSk7XG5cdHJldHVybiBjb250ZXh0O1xufTsiLCIvKlxuICogY2F0YmVycnlcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUgRGVuaXMgUmVjaGt1bm92IGFuZCBwcm9qZWN0IGNvbnRyaWJ1dG9ycy5cbiAqXG4gKiBjYXRiZXJyeSdzIGxpY2Vuc2UgZm9sbG93czpcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvblxuICogb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb25cbiAqIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbixcbiAqIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsXG4gKiBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLFxuICogYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbiAqIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4gKiBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4gKiBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqXG4gKiBUaGlzIGxpY2Vuc2UgYXBwbGllcyB0byBhbGwgcGFydHMgb2YgY2F0YmVycnkgdGhhdCBhcmUgbm90IGV4dGVybmFsbHlcbiAqIG1haW50YWluZWQgbGlicmFyaWVzLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBTZXJpYWxXcmFwcGVyO1xuXG52YXIgZXZlbnRzID0gcmVxdWlyZSgnZXZlbnRzJyk7XG5cbnZhciBFUlJPUl9OT19TVUNIX01FVEhPRCA9ICdUaGVyZSBpcyBubyBzdWNoIHJlZ2lzdGVyZWQgbWV0aG9kJztcblxuLyoqXG4gKiBDcmVhdGVzIG5ldyBpbnN0YW5jZSBvZiB0aGUgc2VyaWFsIHdyYXBwZXIgZm9yIHByb21pc2VzLlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIFNlcmlhbFdyYXBwZXIoKSB7XG5cdHRoaXMuX2VtaXR0ZXIgPSBuZXcgZXZlbnRzLkV2ZW50RW1pdHRlcigpO1xuXHR0aGlzLl9lbWl0dGVyLnNldE1heExpc3RlbmVycygwKTtcblx0dGhpcy5fdG9JbnZva2UgPSB7fTtcblx0dGhpcy5faW5Qcm9ncmVzcyA9IHt9O1xufVxuXG4vKipcbiAqIEN1cnJlbnQgZXZlbnQgZW1pdHRlci5cbiAqIEB0eXBlIHtFdmVudEVtaXR0ZXJ9XG4gKiBAcHJpdmF0ZVxuICovXG5TZXJpYWxXcmFwcGVyLnByb3RvdHlwZS5fZW1pdHRlciA9IG51bGw7XG5cbi8qKlxuICogQ3VycmVudCBzZXQgb2YgbmFtZWQgbWV0aG9kcyB0byBpbnZva2UuXG4gKiBAdHlwZSB7T2JqZWN0fVxuICogQHByaXZhdGVcbiAqL1xuU2VyaWFsV3JhcHBlci5wcm90b3R5cGUuX3RvSW52b2tlID0gbnVsbDtcblxuLyoqXG4gKiBDdXJyZW50IHNldCBvZiBmbGFncyBpZiB0aGUgbWV0aG9kIGlzIGluIHByb2dyZXNzLlxuICogQHR5cGUge09iamVjdH1cbiAqIEBwcml2YXRlXG4gKi9cblNlcmlhbFdyYXBwZXIucHJvdG90eXBlLl9pblByb2dyZXNzID0gbnVsbDtcblxuLyoqXG4gKiBBZGRzIG1ldGhvZCB0byB0aGUgc2V0LlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgTWV0aG9kIG5hbWUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB0b0ludm9rZSBGdW5jdGlvbiB0aGF0IHJldHVybnMgcHJvbWlzZS5cbiAqL1xuU2VyaWFsV3JhcHBlci5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKG5hbWUsIHRvSW52b2tlKSB7XG5cdHRoaXMuX3RvSW52b2tlW25hbWVdID0gdG9JbnZva2U7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiBtZXRob2Qgd2l0aCBzdWNoIG5hbWUgd2FzIHJlZ2lzdGVyZWQgdG8gdGhlIHNldC5cbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIE5hbWUgb2YgbWV0aG9kLlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgbWV0aG9kIG5hbWUgaXMgcmVnaXN0ZXJlZC5cbiAqL1xuU2VyaWFsV3JhcHBlci5wcm90b3R5cGUuaXNSZWdpc3RlcmVkID0gZnVuY3Rpb24gKG5hbWUpIHtcblx0cmV0dXJuIHR5cGVvZih0aGlzLl90b0ludm9rZVtuYW1lXSkgPT09ICdmdW5jdGlvbic7XG59O1xuXG4vKipcbiAqIEludm9rZXMgbWV0aG9kIHdpdGhvdXQgY29uY3VycmVuY3kuXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBNZXRob2QgbmFtZS5cbiAqIEByZXR1cm5zIHtQcm9taXNlPE9iamVjdD59IFByb21pc2UgZm9yIHJlc3VsdC5cbiAqL1xuU2VyaWFsV3JhcHBlci5wcm90b3R5cGUuaW52b2tlID0gZnVuY3Rpb24gKG5hbWUpIHtcblx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdGlmICghdGhpcy5pc1JlZ2lzdGVyZWQobmFtZSkpIHtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKEVSUk9SX05PX1NVQ0hfTUVUSE9EKSk7XG5cdH1cblxuXHRpZiAodGhpcy5faW5Qcm9ncmVzc1tuYW1lXSkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSAoZnVuY3Rpb24gKGZ1bGZpbGwsIHJlamVjdCkge1xuXHRcdFx0c2VsZi5fZW1pdHRlci5vbmNlKG5hbWUsIGZ1bGZpbGwpO1xuXHRcdFx0c2VsZi5fZW1pdHRlci5vbmNlKG5hbWUgKyAnLS1lcnJvcicsIHJlamVjdCk7XG5cdFx0fSk7XG5cdH1cblxuXHR0aGlzLl9pblByb2dyZXNzW25hbWVdID0gdHJ1ZTtcblx0dGhpcy5fdG9JbnZva2VbbmFtZV0oKVxuXHRcdC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcblx0XHRcdHNlbGYuX2VtaXR0ZXIuZW1pdChuYW1lLCByZXN1bHQpO1xuXHRcdFx0c2VsZi5faW5Qcm9ncmVzc1tuYW1lXSA9IG51bGw7XG5cdFx0fSlcblx0XHQuY2F0Y2goZnVuY3Rpb24gKHJlYXNvbikge1xuXHRcdFx0c2VsZi5fZW1pdHRlci5lbWl0KG5hbWUgKyAnLS1lcnJvcicsIHJlYXNvbik7XG5cdFx0XHRzZWxmLl9pblByb2dyZXNzW25hbWVdID0gbnVsbDtcblx0XHR9KTtcblxuXHRyZXR1cm4gdGhpcy5pbnZva2UobmFtZSk7XG59OyIsIi8qXG4gKiBjYXRiZXJyeVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNSBEZW5pcyBSZWNoa3Vub3YgYW5kIHByb2plY3QgY29udHJpYnV0b3JzLlxuICpcbiAqIGNhdGJlcnJ5J3MgbGljZW5zZSBmb2xsb3dzOlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXG4gKiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvblxuICogZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLFxuICogaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSxcbiAqIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsXG4gKiBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuICogc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbiAqIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1NcbiAqIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICpcbiAqIFRoaXMgbGljZW5zZSBhcHBsaWVzIHRvIGFsbCBwYXJ0cyBvZiBjYXRiZXJyeSB0aGF0IGFyZSBub3QgZXh0ZXJuYWxseVxuICogbWFpbnRhaW5lZCBsaWJyYXJpZXMuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN0b3JlRGlzcGF0Y2hlcjtcblxudmFyIHV0aWwgPSByZXF1aXJlKCd1dGlsJyksXG5cdFNlcmlhbFdyYXBwZXIgPSByZXF1aXJlKCcuL1NlcmlhbFdyYXBwZXInKSxcblx0bW9kdWxlSGVscGVyID0gcmVxdWlyZSgnLi9oZWxwZXJzL21vZHVsZUhlbHBlcicpO1xuXG52YXIgRVJST1JfU1RPUkVfTk9UX0ZPVU5EID0gJ1N0b3JlIFwiJXNcIiBub3QgZm91bmQnLFxuXHRFUlJPUl9TVEFURSA9ICdTdGF0ZSBzaG91bGQgYmUgc2V0IGJlZm9yZSBhbnkgcmVxdWVzdCcsXG5cdERFRkFVTFRfTElGRVRJTUUgPSA2MDAwMDtcblxuLyoqXG4gKiBDcmVhdGVzIG5ldyBpbnN0YW5jZSBvZiBzdG9yZSBkaXNwYXRjaGVyLlxuICogQHBhcmFtIHtTZXJ2aWNlTG9jYXRvcn0gJHNlcnZpY2VMb2NhdG9yIExvY2F0b3IgdG8gcmVzb2x2ZSBkZXBlbmRlbmNpZXMuXG4gKiBAcGFyYW0ge1N0b3JlTG9hZGVyfSAkc3RvcmVMb2FkZXIgU3RvcmUgbG9hZGVyIHRvIGxvYWQgc3RvcmVzLlxuICogQHBhcmFtIHtFdmVudEVtaXR0ZXJ9ICRldmVudEJ1cyBFdmVudCBidXMgdG8gZW1pdCBldmVudHMuXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gU3RvcmVEaXNwYXRjaGVyKCRzZXJ2aWNlTG9jYXRvciwgJHN0b3JlTG9hZGVyLCAkZXZlbnRCdXMpIHtcblx0dGhpcy5fc2VydmljZUxvY2F0b3IgPSAkc2VydmljZUxvY2F0b3I7XG5cdHRoaXMuX3N0b3JlTG9hZGVyID0gJHN0b3JlTG9hZGVyO1xuXHR0aGlzLl9ldmVudEJ1cyA9ICRldmVudEJ1cztcblx0dGhpcy5fc3RvcmVJbnN0YW5jZXMgPSB7fTtcblx0dGhpcy5fbGFzdERhdGEgPSB7fTtcblx0dGhpcy5fZGVwZW5kZW5jaWVzID0ge307XG5cdHRoaXMuX3NlcmlhbFdyYXBwZXIgPSBuZXcgU2VyaWFsV3JhcHBlcigpO1xufVxuXG4vKipcbiAqIEN1cnJlbnQgc2VydmljZSBsb2NhdG9yLlxuICogQHR5cGUge1NlcnZpY2VMb2NhdG9yfVxuICogQHByaXZhdGVcbiAqL1xuU3RvcmVEaXNwYXRjaGVyLnByb3RvdHlwZS5fc2VydmljZUxvY2F0b3IgPSBudWxsO1xuXG4vKipcbiAqIEN1cnJlbnQgZXZlbnQgYnVzLlxuICogQHR5cGUge0V2ZW50RW1pdHRlcn1cbiAqIEBwcml2YXRlXG4gKi9cblN0b3JlRGlzcGF0Y2hlci5wcm90b3R5cGUuX2V2ZW50QnVzID0gbnVsbDtcblxuLyoqXG4gKiBDdXJyZW50IHN0b3JlIGxvYWRlci5cbiAqIEB0eXBlIHtTdG9yZUxvYWRlcn1cbiAqIEBwcml2YXRlXG4gKi9cblN0b3JlRGlzcGF0Y2hlci5wcm90b3R5cGUuX3N0b3JlTG9hZGVyID0gbnVsbDtcblxuLyoqXG4gKiBDdXJyZW50IG1hcCBvZiBhbGwgc3RvcmUgaW5zdGFuY2VzLlxuICogQHR5cGUge251bGx9XG4gKiBAcHJpdmF0ZVxuICovXG5TdG9yZURpc3BhdGNoZXIucHJvdG90eXBlLl9zdG9yZUluc3RhbmNlcyA9IG51bGw7XG5cbi8qKlxuICogQ3VycmVudCBtYXAgb2YgbGFzdCBkYXRhIGZvciBlYWNoIHN0b3JlLlxuICogQHR5cGUge09iamVjdH1cbiAqIEBwcml2YXRlXG4gKi9cblN0b3JlRGlzcGF0Y2hlci5wcm90b3R5cGUuX2xhc3REYXRhID0gbnVsbDtcblxuLyoqXG4gKiBDdXJyZW50IG1hcCBvZiBsYXN0IHN0YXRlIG9mIHN0b3JlIGRpc3BhdGNoZXIuXG4gKiBAdHlwZSB7T2JqZWN0fVxuICogQHByaXZhdGVcbiAqL1xuU3RvcmVEaXNwYXRjaGVyLnByb3RvdHlwZS5fbGFzdFN0YXRlID0gbnVsbDtcblxuLyoqXG4gKiBDdXJyZW50IHNlcmlhbCB3cmFwcGVyLlxuICogQHR5cGUge1NlcmlhbFdyYXBwZXJ9XG4gKiBAcHJpdmF0ZVxuICovXG5TdG9yZURpc3BhdGNoZXIucHJvdG90eXBlLl9zZXJpYWxXcmFwcGVyID0gbnVsbDtcblxuLyoqXG4gKiBDdXJyZW50IGJhc2ljIGNvbnRleHQgZm9yIGFsbCBzdG9yZSBjb250ZXh0cy5cbiAqIEB0eXBlIHtPYmplY3R9XG4gKiBAcHJpdmF0ZVxuICovXG5TdG9yZURpc3BhdGNoZXIucHJvdG90eXBlLl9jdXJyZW50QmFzaWNDb250ZXh0ID0gbnVsbDtcblxuLyoqXG4gKiBDdXJyZW50IHNldCBvZiBzdG9yZSBkZXBlbmRlbmN5IGdyYXBoLlxuICogQHR5cGUge09iamVjdH1cbiAqIEBwcml2YXRlXG4gKi9cblN0b3JlRGlzcGF0Y2hlci5wcm90b3R5cGUuX2RlcGVuZGVuY2llcyA9IG51bGw7XG5cbi8qKlxuICogR2V0cyBzdG9yZSBkYXRhIGFuZCBjcmVhdGVzIHN0b3JlIGluc3RhbmNlIGlmIHJlcXVpcmVkLlxuICogQHBhcmFtIHtTdHJpbmd9IHN0b3JlTmFtZSBOYW1lIG9mIHN0b3JlLlxuICogQHJldHVybnMge09iamVjdH0gU3RvcmUncyBkYXRhLlxuICovXG5TdG9yZURpc3BhdGNoZXIucHJvdG90eXBlLmdldFN0b3JlRGF0YSA9IGZ1bmN0aW9uIChzdG9yZU5hbWUpIHtcblx0aWYgKCF0aGlzLl9sYXN0U3RhdGUpIHtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKEVSUk9SX1NUQVRFKSk7XG5cdH1cblx0aWYgKHR5cGVvZihzdG9yZU5hbWUpICE9PSAnc3RyaW5nJykge1xuXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XG5cdH1cblx0aWYgKHRoaXMuX2xhc3REYXRhLmhhc093blByb3BlcnR5KHN0b3JlTmFtZSkpIHtcblx0XHR2YXIgZXhpc3RUaW1lID0gRGF0ZS5ub3coKSAtIHRoaXMuX2xhc3REYXRhW3N0b3JlTmFtZV0uY3JlYXRlZEF0O1xuXHRcdGlmIChleGlzdFRpbWUgPD0gdGhpcy5fbGFzdERhdGFbc3RvcmVOYW1lXS5saWZldGltZSkge1xuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9sYXN0RGF0YVtzdG9yZU5hbWVdLmRhdGEpO1xuXHRcdH1cblx0XHRkZWxldGUgdGhpcy5fbGFzdERhdGFbc3RvcmVOYW1lXTtcblx0fVxuXHR2YXIgc2VsZiA9IHRoaXMsXG5cdFx0bGlmZXRpbWUgPSBERUZBVUxUX0xJRkVUSU1FO1xuXHRzZWxmLl9ldmVudEJ1cy5lbWl0KCdzdG9yZURhdGFMb2FkJywge25hbWU6IHN0b3JlTmFtZX0pO1xuXHR2YXIgc3RvcmUgPSB0aGlzLmdldFN0b3JlKHN0b3JlTmFtZSk7XG5cdGlmICghc3RvcmUpIHtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFxuXHRcdFx0XHR1dGlsLmZvcm1hdChFUlJPUl9TVE9SRV9OT1RfRk9VTkQsIHN0b3JlTmFtZSkpXG5cdFx0KTtcblx0fVxuXHRpZiAodHlwZW9mKHN0b3JlLiRsaWZldGltZSkgPT09ICdudW1iZXInKSB7XG5cdFx0bGlmZXRpbWUgPSBzdG9yZS4kbGlmZXRpbWU7XG5cdH1cblx0cmV0dXJuIHNlbGYuX3NlcmlhbFdyYXBwZXIuaW52b2tlKHN0b3JlTmFtZSlcblx0XHQudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuXHRcdFx0c2VsZi5fbGFzdERhdGFbc3RvcmVOYW1lXSA9IHtcblx0XHRcdFx0ZGF0YTogZGF0YSxcblx0XHRcdFx0bGlmZXRpbWU6IGxpZmV0aW1lLFxuXHRcdFx0XHRjcmVhdGVkQXQ6IERhdGUubm93KClcblx0XHRcdH07XG5cdFx0XHRzZWxmLl9ldmVudEJ1cy5lbWl0KCdzdG9yZURhdGFMb2FkZWQnLCB7XG5cdFx0XHRcdG5hbWU6IHN0b3JlTmFtZSxcblx0XHRcdFx0ZGF0YTogZGF0YSxcblx0XHRcdFx0bGlmZXRpbWU6IGxpZmV0aW1lXG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiBkYXRhO1xuXHRcdH0pO1xufTtcblxuLyoqXG4gKiBTZW5kcyBhY3Rpb24gdG8gc3BlY2lmaWVkIHN0b3JlIGFuZCByZXNvbHZlcyBwcm9taXNlcyBpbiBzZXJpYWwgbW9kZS5cbiAqIEBwYXJhbSB7U3RyaW5nfSBzdG9yZU5hbWUgTmFtZSBvZiB0aGUgc3RvcmUuXG4gKiBAcGFyYW0ge1N0cmluZ30gYWN0aW9uTmFtZSBOYW1lIG9mIHRoZSBhY3Rpb24uXG4gKiBAcGFyYW0ge09iamVjdH0gYXJncyBBY3Rpb24gYXJndW1lbnRzLlxuICogQHJldHVybnMge1Byb21pc2U8Kj59IFByb21pc2UgZm9yIGFjdGlvbiBoYW5kbGluZyByZXN1bHQuXG4gKi9cblN0b3JlRGlzcGF0Y2hlci5wcm90b3R5cGUuc2VuZEFjdGlvbiA9IGZ1bmN0aW9uIChzdG9yZU5hbWUsIGFjdGlvbk5hbWUsIGFyZ3MpIHtcblx0aWYgKCF0aGlzLl9sYXN0U3RhdGUpIHtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKEVSUk9SX1NUQVRFKSk7XG5cdH1cblx0dmFyIHNlbGYgPSB0aGlzLFxuXHRcdGFjdGlvbkRldGFpbHMgPSB7XG5cdFx0XHRzdG9yZU5hbWU6IHN0b3JlTmFtZSxcblx0XHRcdGFjdGlvbk5hbWU6IGFjdGlvbk5hbWUsXG5cdFx0XHRhcmdzOiBhcmdzXG5cdFx0fTtcblx0dGhpcy5fZXZlbnRCdXMuZW1pdCgnYWN0aW9uU2VuZCcsIGFjdGlvbkRldGFpbHMpO1xuXHR2YXIgc3RvcmUgPSB0aGlzLmdldFN0b3JlKHN0b3JlTmFtZSk7XG5cdGlmICghc3RvcmUpIHtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFxuXHRcdFx0dXRpbC5mb3JtYXQoRVJST1JfU1RPUkVfTk9UX0ZPVU5ELCBzdG9yZU5hbWUpKVxuXHRcdCk7XG5cdH1cblx0dmFyIGhhbmRsZU1ldGhvZCA9IG1vZHVsZUhlbHBlci5nZXRNZXRob2RUb0ludm9rZShcblx0XHRzdG9yZSwgJ2hhbmRsZScsIGFjdGlvbk5hbWVcblx0KTtcblx0cmV0dXJuIG1vZHVsZUhlbHBlci5nZXRTYWZlUHJvbWlzZShmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIGhhbmRsZU1ldGhvZChhcmdzKTtcblx0fSlcblx0XHQudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG5cdFx0XHRzZWxmLl9ldmVudEJ1cy5lbWl0KCdhY3Rpb25TZW50JywgYWN0aW9uRGV0YWlscyk7XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH0pO1xufTtcblxuLyoqXG4gKiBTZW5kcyBhY3Rpb24gdG8gZXZlcnkgc3RvcmUgdGhhdCBoYXMgaGFuZGxlIG1ldGhvZCBmb3Igc3VjaCBhY3Rpb24uXG4gKiBAcGFyYW0ge1N0cmluZ30gYWN0aW9uTmFtZSBOYW1lIG9mIHRoZSBhY3Rpb24uXG4gKiBAcGFyYW0ge09iamVjdH0gYXJnIEFjdGlvbiBhcmd1bWVudHMuXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxBcnJheTwqPj59IFByb21pc2UgZm9yIHRoZSBhY3Rpb24gaGFuZGxpbmcgcmVzdWx0LlxuICovXG5TdG9yZURpc3BhdGNoZXIucHJvdG90eXBlLnNlbmRCcm9hZGNhc3RBY3Rpb24gPSBmdW5jdGlvbiAoYWN0aW9uTmFtZSwgYXJnKSB7XG5cdHZhciBwcm9taXNlcyA9IFtdLFxuXHRcdHNlbGYgPSB0aGlzLFxuXHRcdHN0b3Jlc0J5TmFtZXMgPSB0aGlzLl9zdG9yZUxvYWRlci5nZXRTdG9yZXNCeU5hbWVzKCksXG5cdFx0bWV0aG9kTmFtZSA9IG1vZHVsZUhlbHBlci5nZXRDYW1lbENhc2VOYW1lKCdoYW5kbGUnLCBhY3Rpb25OYW1lKTtcblx0T2JqZWN0LmtleXMoc3RvcmVzQnlOYW1lcylcblx0XHQuZm9yRWFjaChmdW5jdGlvbiAoc3RvcmVOYW1lKSB7XG5cdFx0XHR2YXIgc3RvcmUgPSBzdG9yZXNCeU5hbWVzW3N0b3JlTmFtZV0sXG5cdFx0XHRcdHByb3RvTWV0aG9kID0gc3RvcmUuY29uc3RydWN0b3IucHJvdG90eXBlW21ldGhvZE5hbWVdO1xuXHRcdFx0aWYgKHR5cGVvZihwcm90b01ldGhvZCkgIT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0dmFyIHNlbmRBY3Rpb25Qcm9taXNlID0gc2VsZi5zZW5kQWN0aW9uKFxuXHRcdFx0XHRzdG9yZS5uYW1lLCBhY3Rpb25OYW1lLCAgYXJnXG5cdFx0XHQpO1xuXHRcdFx0cHJvbWlzZXMucHVzaChzZW5kQWN0aW9uUHJvbWlzZSk7XG5cdFx0fSk7XG5cdHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG59O1xuXG4vKipcbiAqIFNldHMgbmV3IHN0YXRlIHRvIHN0b3JlIGRpc3BhdGNoZXIgYW5kIGludm9rZXMgXCJjaGFuZ2VkXCIgbWV0aG9kIGZvciBhbGxcbiAqIHN0b3JlcyB3aGljaCBzdGF0ZSBoYXZlIGJlZW4gY2hhbmdlZC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbWV0ZXJzIE1hcCBvZiBuZXcgcGFyYW1ldGVycy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBiYXNpY0NvbnRleHQgQmFzaWMgY29udGV4dCBmb3IgYWxsIHN0b3Jlcy5cbiAqIEByZXR1cm5zIHtBcnJheTxTdHJpbmc+fSBOYW1lcyBvZiBzdG9yZXMgdGhhdCBoYXZlIGJlZW4gY2hhbmdlZC5cbiAqL1xuU3RvcmVEaXNwYXRjaGVyLnByb3RvdHlwZS5zZXRTdGF0ZSA9IGZ1bmN0aW9uIChwYXJhbWV0ZXJzLCBiYXNpY0NvbnRleHQpIHtcblx0cGFyYW1ldGVycyA9IHBhcmFtZXRlcnMgfHwge307XG5cdGlmICghdGhpcy5fbGFzdFN0YXRlKSB7XG5cdFx0dGhpcy5fY3VycmVudEJhc2ljQ29udGV4dCA9IGJhc2ljQ29udGV4dDtcblx0XHR0aGlzLl9sYXN0U3RhdGUgPSBwYXJhbWV0ZXJzO1xuXHRcdHJldHVybiBbXTtcblx0fVxuXG5cdC8vIHNvbWUgc3RvcmUncyBwYXJhbWV0ZXJzIGNhbiBiZSByZW1vdmVkIHNpbmNlIGxhc3QgdGltZVxuXHR2YXIgc2VsZiA9IHRoaXMsXG5cdFx0Y2hhbmdlZCA9IHt9O1xuXG5cdE9iamVjdC5rZXlzKHRoaXMuX2xhc3RTdGF0ZSlcblx0XHQuZmlsdGVyKGZ1bmN0aW9uIChzdG9yZU5hbWUpIHtcblx0XHRcdHJldHVybiAhcGFyYW1ldGVycy5oYXNPd25Qcm9wZXJ0eShzdG9yZU5hbWUpO1xuXHRcdH0pXG5cdFx0LmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcblx0XHRcdGNoYW5nZWRbbmFtZV0gPSB0cnVlO1xuXHRcdH0pO1xuXG5cdE9iamVjdC5rZXlzKHBhcmFtZXRlcnMpXG5cdFx0LmZvckVhY2goZnVuY3Rpb24gKHN0b3JlTmFtZSkge1xuXHRcdFx0Ly8gbmV3IHBhcmFtZXRlcnMgd2VyZSBzZXQgZm9yIHN0b3JlXG5cdFx0XHRpZiAoIXNlbGYuX2xhc3RTdGF0ZS5oYXNPd25Qcm9wZXJ0eShzdG9yZU5hbWUpKSB7XG5cdFx0XHRcdGNoYW5nZWRbc3RvcmVOYW1lXSA9IHRydWU7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gbmV3IGFuZCBsYXN0IHBhcmFtZXRlcnMgaGFzIGRpZmZlcmVudCB2YWx1ZXNcblx0XHRcdHZhciBsYXN0UGFyYW1ldGVyTmFtZXMgPVxuXHRcdFx0XHRcdE9iamVjdC5rZXlzKHNlbGYuX2xhc3RTdGF0ZVtzdG9yZU5hbWVdKSxcblx0XHRcdFx0Y3VycmVudFBhcmFtZXRlck5hbWVzID1cblx0XHRcdFx0XHRPYmplY3Qua2V5cyhwYXJhbWV0ZXJzW3N0b3JlTmFtZV0pO1xuXG5cdFx0XHRpZiAoY3VycmVudFBhcmFtZXRlck5hbWVzLmxlbmd0aCAhPT1cblx0XHRcdFx0bGFzdFBhcmFtZXRlck5hbWVzLmxlbmd0aCkge1xuXHRcdFx0XHRjaGFuZ2VkW3N0b3JlTmFtZV0gPSB0cnVlO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGN1cnJlbnRQYXJhbWV0ZXJOYW1lcy5ldmVyeShmdW5jdGlvbiAocGFyYW1ldGVyTmFtZSkge1xuXHRcdFx0XHRpZiAocGFyYW1ldGVyc1tzdG9yZU5hbWVdW3BhcmFtZXRlck5hbWVdICE9PVxuXHRcdFx0XHRcdHNlbGYuX2xhc3RTdGF0ZVtzdG9yZU5hbWVdW3BhcmFtZXRlck5hbWVdKSB7XG5cdFx0XHRcdFx0Y2hhbmdlZFtzdG9yZU5hbWVdID0gdHJ1ZTtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9KTtcblx0XHR9KTtcblxuXHR0aGlzLl9sYXN0U3RhdGUgPSBwYXJhbWV0ZXJzO1xuXHRpZiAodGhpcy5fY3VycmVudEJhc2ljQ29udGV4dCAhPT0gYmFzaWNDb250ZXh0KSB7XG5cdFx0dGhpcy5fY3VycmVudEJhc2ljQ29udGV4dCA9IGJhc2ljQ29udGV4dDtcblx0XHRPYmplY3Qua2V5cyh0aGlzLl9zdG9yZUluc3RhbmNlcylcblx0XHRcdC5mb3JFYWNoKGZ1bmN0aW9uIChzdG9yZU5hbWUpIHtcblx0XHRcdFx0c2VsZi5fc3RvcmVJbnN0YW5jZXNbc3RvcmVOYW1lXS4kY29udGV4dCA9XG5cdFx0XHRcdFx0c2VsZi5fZ2V0U3RvcmVDb250ZXh0KHN0b3JlTmFtZSk7XG5cdFx0XHR9KTtcblx0fVxuXG5cdHZhciBjaGFuZ2VkU3RvcmVOYW1lcyA9IHt9O1xuXHRPYmplY3Qua2V5cyhjaGFuZ2VkKVxuXHRcdC5mb3JFYWNoKGZ1bmN0aW9uIChzdG9yZU5hbWUpIHtcblx0XHRcdHZhciBzdG9yZSA9IHNlbGYuZ2V0U3RvcmUoc3RvcmVOYW1lKTtcblx0XHRcdGlmICghc3RvcmUpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0c3RvcmUuJGNvbnRleHQuY2hhbmdlZCgpXG5cdFx0XHRcdC5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG5cdFx0XHRcdFx0Y2hhbmdlZFN0b3JlTmFtZXNbbmFtZV0gPSB0cnVlO1xuXHRcdFx0XHR9KTtcblx0XHR9KTtcblxuXHR0aGlzLl9ldmVudEJ1cy5lbWl0KCdzdGF0ZUNoYW5nZWQnLCB7XG5cdFx0b2xkU3RhdGU6IHRoaXMuX2xhc3RTdGF0ZSxcblx0XHRuZXdTdGF0ZTogcGFyYW1ldGVyc1xuXHR9KTtcblx0cmV0dXJuIE9iamVjdC5rZXlzKGNoYW5nZWRTdG9yZU5hbWVzKTtcbn07XG5cbi8qKlxuICogR2V0cyBjb250ZXh0IGZvciBzdG9yZSB1c2luZyBjb21wb25lbnQncyBjb250ZXh0IGFzIGEgcHJvdG90eXBlLlxuICogQHBhcmFtIHtTdHJpbmd9IHN0b3JlTmFtZSBOYW1lIG9mIHN0b3JlLlxuICogQHJldHVybnMge09iamVjdH0gU3RvcmUgY29udGV4dC5cbiAqIEBwcml2YXRlXG4gKi9cblN0b3JlRGlzcGF0Y2hlci5wcm90b3R5cGUuX2dldFN0b3JlQ29udGV4dCA9IGZ1bmN0aW9uIChzdG9yZU5hbWUpIHtcblx0dmFyIHNlbGYgPSB0aGlzLFxuXHRcdHN0b3JlQ29udGV4dCA9IE9iamVjdC5jcmVhdGUodGhpcy5fY3VycmVudEJhc2ljQ29udGV4dCk7XG5cdHN0b3JlQ29udGV4dC5uYW1lID0gc3RvcmVOYW1lO1xuXHRzdG9yZUNvbnRleHQuc3RhdGUgPSB0aGlzLl9sYXN0U3RhdGVbc3RvcmVOYW1lXSB8fCB7fTtcblx0c3RvcmVDb250ZXh0LmNoYW5nZWQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIHdhbGtlZCA9IHt9LFxuXHRcdFx0Y3VycmVudCxcblx0XHRcdHRvQ2hhbmdlID0gW3N0b3JlTmFtZV07XG5cblx0XHR3aGlsZSAodG9DaGFuZ2UubGVuZ3RoID4gMCkge1xuXHRcdFx0Y3VycmVudCA9IHRvQ2hhbmdlLnNoaWZ0KCk7XG5cdFx0XHRpZiAod2Fsa2VkLmhhc093blByb3BlcnR5KGN1cnJlbnQpKSB7XG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0fVxuXHRcdFx0d2Fsa2VkW2N1cnJlbnRdID0gdHJ1ZTtcblx0XHRcdGlmIChzZWxmLl9kZXBlbmRlbmNpZXMuaGFzT3duUHJvcGVydHkoY3VycmVudCkpIHtcblx0XHRcdFx0dG9DaGFuZ2UgPSB0b0NoYW5nZS5jb25jYXQoXG5cdFx0XHRcdFx0T2JqZWN0LmtleXMoc2VsZi5fZGVwZW5kZW5jaWVzW2N1cnJlbnRdKVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdFx0ZGVsZXRlIHNlbGYuX2xhc3REYXRhW2N1cnJlbnRdO1xuXHRcdFx0c2VsZi5fZXZlbnRCdXMuZW1pdCgnc3RvcmVDaGFuZ2VkJywgY3VycmVudCk7XG5cdFx0fVxuXHRcdHJldHVybiBPYmplY3Qua2V5cyh3YWxrZWQpO1xuXHR9O1xuXHRzdG9yZUNvbnRleHQuZ2V0U3RvcmVEYXRhID0gZnVuY3Rpb24gKHNvdXJjZVN0b3JlTmFtZSkge1xuXHRcdGlmIChzb3VyY2VTdG9yZU5hbWUgPT09IHN0b3JlTmFtZSkge1xuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcblx0XHR9XG5cdFx0cmV0dXJuIHNlbGYuZ2V0U3RvcmVEYXRhKHNvdXJjZVN0b3JlTmFtZSk7XG5cdH07XG5cdHN0b3JlQ29udGV4dC5zZXREZXBlbmRlbmN5ID0gZnVuY3Rpb24gKG5hbWUpIHtcblx0XHRpZiAoIXNlbGYuX2RlcGVuZGVuY2llcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuXHRcdFx0c2VsZi5fZGVwZW5kZW5jaWVzW25hbWVdID0ge307XG5cdFx0fVxuXHRcdHNlbGYuX2RlcGVuZGVuY2llc1tuYW1lXVtzdG9yZU5hbWVdID0gdHJ1ZTtcblx0fTtcblx0c3RvcmVDb250ZXh0LnVuc2V0RGVwZW5kZW5jeSA9IGZ1bmN0aW9uIChuYW1lKSB7XG5cdFx0aWYgKCFzZWxmLl9kZXBlbmRlbmNpZXMuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0ZGVsZXRlIHNlbGYuX2RlcGVuZGVuY2llc1tuYW1lXVtzdG9yZU5hbWVdO1xuXHR9O1xuXHRzdG9yZUNvbnRleHQuc2VuZEFjdGlvbiA9IGZ1bmN0aW9uIChzdG9yZU5hbWUsIG5hbWUsIGFyZ3MpIHtcblx0XHRyZXR1cm4gc2VsZi5zZW5kQWN0aW9uKHN0b3JlTmFtZSwgbmFtZSwgYXJncyk7XG5cdH07XG5cdHN0b3JlQ29udGV4dC5zZW5kQnJvYWRjYXN0QWN0aW9uID0gZnVuY3Rpb24gKG5hbWUsIGFyZ3MpIHtcblx0XHRyZXR1cm4gc2VsZi5zZW5kQnJvYWRjYXN0QWN0aW9uKG5hbWUsIGFyZ3MpO1xuXHR9O1xuXG5cdHJldHVybiBzdG9yZUNvbnRleHQ7XG59O1xuXG4vKipcbiAqIEdldHMgc3RvcmUgaW5zdGFuY2UgYW5kIGNyZWF0ZXMgaXQgaWYgcmVxdWlyZWQuXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RvcmVOYW1lIE5hbWUgb2Ygc3RvcmUuXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxPYmplY3Q+fSBQcm9taXNlIGZvciBzdG9yZS5cbiAqL1xuU3RvcmVEaXNwYXRjaGVyLnByb3RvdHlwZS5nZXRTdG9yZSA9IGZ1bmN0aW9uIChzdG9yZU5hbWUpIHtcblx0aWYgKCFzdG9yZU5hbWUpIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXHR2YXIgc3RvcmUgPSB0aGlzLl9zdG9yZUluc3RhbmNlc1tzdG9yZU5hbWVdO1xuXHRpZiAoc3RvcmUpIHtcblx0XHRyZXR1cm4gc3RvcmU7XG5cdH1cblx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdHZhciBzdG9yZXMgPSBzZWxmLl9zdG9yZUxvYWRlci5nZXRTdG9yZXNCeU5hbWVzKCksXG5cdFx0Y29uZmlnID0gc2VsZi5fc2VydmljZUxvY2F0b3IucmVzb2x2ZSgnY29uZmlnJyk7XG5cdGlmICghc3RvcmVzLmhhc093blByb3BlcnR5KHN0b3JlTmFtZSkpIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdHZhciBjb25zdHJ1Y3RvciA9IHN0b3Jlc1tzdG9yZU5hbWVdLmNvbnN0cnVjdG9yO1xuXHRjb25zdHJ1Y3Rvci5wcm90b3R5cGUuJGNvbnRleHQgPSBzZWxmLl9nZXRTdG9yZUNvbnRleHQoc3RvcmVOYW1lKTtcblx0c2VsZi5fc3RvcmVJbnN0YW5jZXNbc3RvcmVOYW1lXSA9IHNlbGYuX3NlcnZpY2VMb2NhdG9yXG5cdFx0LnJlc29sdmVJbnN0YW5jZShjb25zdHJ1Y3RvciwgY29uZmlnKTtcblx0c2VsZi5fc3RvcmVJbnN0YW5jZXNbc3RvcmVOYW1lXS4kY29udGV4dCA9IGNvbnN0cnVjdG9yLnByb3RvdHlwZS4kY29udGV4dDtcblxuXHRzZWxmLl9zZXJpYWxXcmFwcGVyLmFkZChzdG9yZU5hbWUsIGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgbG9hZE1ldGhvZCA9IG1vZHVsZUhlbHBlci5nZXRNZXRob2RUb0ludm9rZShcblx0XHRcdHNlbGYuX3N0b3JlSW5zdGFuY2VzW3N0b3JlTmFtZV0sICdsb2FkJ1xuXHRcdCk7XG5cdFx0cmV0dXJuIG1vZHVsZUhlbHBlci5nZXRTYWZlUHJvbWlzZShsb2FkTWV0aG9kKTtcblx0fSk7XG5cdHJldHVybiBzZWxmLl9zdG9yZUluc3RhbmNlc1tzdG9yZU5hbWVdO1xufTsiLCIvKlxuICogY2F0YmVycnlcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgRGVuaXMgUmVjaGt1bm92IGFuZCBwcm9qZWN0IGNvbnRyaWJ1dG9ycy5cbiAqXG4gKiBjYXRiZXJyeSdzIGxpY2Vuc2UgZm9sbG93czpcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvblxuICogb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb25cbiAqIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbixcbiAqIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsXG4gKiBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLFxuICogYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbiAqIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4gKiBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4gKiBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqXG4gKiBUaGlzIGxpY2Vuc2UgYXBwbGllcyB0byBhbGwgcGFydHMgb2YgY2F0YmVycnkgdGhhdCBhcmUgbm90IGV4dGVybmFsbHlcbiAqIG1haW50YWluZWQgbGlicmFyaWVzLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBCb290c3RyYXBwZXJCYXNlO1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWwnKSxcblx0bW9kdWxlSGVscGVyID0gcmVxdWlyZSgnLi4vaGVscGVycy9tb2R1bGVIZWxwZXInKSxcblx0dWhyID0gcmVxdWlyZSgnY2F0YmVycnktdWhyJyksXG5cdFByb21pc2UgPSByZXF1aXJlKCdwcm9taXNlJyksXG5cdFN0YXRlUHJvdmlkZXIgPSByZXF1aXJlKCcuLi9wcm92aWRlcnMvU3RhdGVQcm92aWRlcicpLFxuXHRTdG9yZUxvYWRlciA9IHJlcXVpcmUoJy4uL2xvYWRlcnMvU3RvcmVMb2FkZXInKSxcblx0Q29tcG9uZW50TG9hZGVyID0gcmVxdWlyZSgnLi4vbG9hZGVycy9Db21wb25lbnRMb2FkZXInKSxcblx0RG9jdW1lbnRSZW5kZXJlciA9IHJlcXVpcmUoJy4uL0RvY3VtZW50UmVuZGVyZXInKSxcblx0UmVxdWVzdFJvdXRlciA9IHJlcXVpcmUoJy4uL1JlcXVlc3RSb3V0ZXInKSxcblx0TW9kdWxlQXBpUHJvdmlkZXJCYXNlID0gcmVxdWlyZSgnLi4vYmFzZS9Nb2R1bGVBcGlQcm92aWRlckJhc2UnKSxcblx0Q29udGV4dEZhY3RvcnkgPSByZXF1aXJlKCcuLi9Db250ZXh0RmFjdG9yeScpLFxuXHRFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCdldmVudHMnKS5FdmVudEVtaXR0ZXI7XG5cbnZhciBJTkZPX0NPTVBPTkVOVF9MT0FERUQgPSAnQ29tcG9uZW50IFwiJXNcIiBsb2FkZWQnLFxuXHRJTkZPX1NUT1JFX0xPQURFRCA9ICdTdG9yZSBcIiVzXCIgbG9hZGVkJyxcblx0SU5GT19BTExfU1RPUkVTX0xPQURFRCA9ICdBbGwgc3RvcmVzIGxvYWRlZCcsXG5cdElORk9fQUxMX0NPTVBPTkVOVFNfTE9BREVEID0gJ0FsbCBjb21wb25lbnRzIGxvYWRlZCcsXG5cdElORk9fRE9DVU1FTlRfUkVOREVSRUQgPSAnRG9jdW1lbnQgcmVuZGVyZWQgZm9yIFVSSSAlcycsXG5cdFRSQUNFX1JFTkRFUl9DT01QT05FTlQgPSAnQ29tcG9uZW50IFwiJXMlc1wiIGlzIGJlaW5nIHJlbmRlcmVkLi4uJyxcblx0VElNRVNUQU1QX0ZPUk1BVCA9ICcgKCVkIG1zKScsXG5cdFRSQUNFX0NPTVBPTkVOVF9SRU5ERVJFRCA9ICdDb21wb25lbnQgXCIlcyVzXCIgcmVuZGVyZWQlcyc7XG5cbi8qKlxuICogQ3JlYXRlcyBuZXcgaW5zdGFuY2Ugb2YgYmFzZSBDYXRiZXJyeSBib290c3RyYXBwZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYXRiZXJyeUNvbnN0cnVjdG9yIENvbnN0cnVjdG9yXG4gKiBvZiB0aGUgQ2F0YmVycnkncyBtYWluIG1vZHVsZS5cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBCb290c3RyYXBwZXJCYXNlKGNhdGJlcnJ5Q29uc3RydWN0b3IpIHtcblx0dGhpcy5fY2F0YmVycnlDb25zdHJ1Y3RvciA9IGNhdGJlcnJ5Q29uc3RydWN0b3I7XG59XG5cbi8qKlxuICogQ3VycmVudCBjb25zdHJ1Y3RvciBvZiB0aGUgQ2F0YmVycnkncyBtYWluIG1vZHVsZS5cbiAqIEB0eXBlIHtGdW5jdGlvbn1cbiAqIEBwcml2YXRlXG4gKi9cbkJvb3RzdHJhcHBlckJhc2UucHJvdG90eXBlLl9jYXRiZXJyeUNvbnN0cnVjdG9yID0gbnVsbDtcblxuLyoqXG4gKiBDcmVhdGVzIG5ldyBmdWxsLWNvbmZpZ3VyZWQgaW5zdGFuY2Ugb2YgdGhlIENhdGJlcnJ5IGFwcGxpY2F0aW9uLlxuICogQHBhcmFtIHtPYmplY3Q/fSBjb25maWdPYmplY3QgQ29uZmlndXJhdGlvbiBvYmplY3QuXG4gKiBAcmV0dXJucyB7Q2F0YmVycnl9IENhdGJlcnJ5IGFwcGxpY2F0aW9uIGluc3RhbmNlLlxuICovXG5Cb290c3RyYXBwZXJCYXNlLnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiAoY29uZmlnT2JqZWN0KSB7XG5cdHZhciBjdXJyZW50Q29uZmlnID0gY29uZmlnT2JqZWN0IHx8IHt9LFxuXHRcdGNhdGJlcnJ5ID0gbmV3IHRoaXMuX2NhdGJlcnJ5Q29uc3RydWN0b3IoKTtcblxuXHR0aGlzLmNvbmZpZ3VyZShjdXJyZW50Q29uZmlnLCBjYXRiZXJyeS5sb2NhdG9yKTtcblx0Y2F0YmVycnkuZXZlbnRzID0gY2F0YmVycnkubG9jYXRvci5yZXNvbHZlSW5zdGFuY2UoTW9kdWxlQXBpUHJvdmlkZXJCYXNlKTtcblx0cmV0dXJuIGNhdGJlcnJ5O1xufTtcblxuLyoqXG4gKiBDb25maWd1cmVzIGxvY2F0b3Igd2l0aCBhbGwgcmVxdWlyZWQgdHlwZSByZWdpc3RyYXRpb25zLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZ09iamVjdCBDb25maWd1cmF0aW9uIG9iamVjdC5cbiAqIEBwYXJhbSB7U2VydmljZUxvY2F0b3J9IGxvY2F0b3IgU2VydmljZSBsb2NhdG9yIHRvIGNvbmZpZ3VyZS5cbiAqL1xuQm9vdHN0cmFwcGVyQmFzZS5wcm90b3R5cGUuY29uZmlndXJlID0gZnVuY3Rpb24gKGNvbmZpZ09iamVjdCwgbG9jYXRvcikge1xuXHR2YXIgZXZlbnRCdXMgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cdGV2ZW50QnVzLnNldE1heExpc3RlbmVycygwKTtcblx0bG9jYXRvci5yZWdpc3Rlckluc3RhbmNlKCdwcm9taXNlJywgUHJvbWlzZSk7XG5cdGxvY2F0b3IucmVnaXN0ZXJJbnN0YW5jZSgnZXZlbnRCdXMnLCBldmVudEJ1cyk7XG5cdGxvY2F0b3IucmVnaXN0ZXJJbnN0YW5jZSgnY29uZmlnJywgY29uZmlnT2JqZWN0KTtcblx0bG9jYXRvci5yZWdpc3Rlcignc3RhdGVQcm92aWRlcicsIFN0YXRlUHJvdmlkZXIsIGNvbmZpZ09iamVjdCwgdHJ1ZSk7XG5cdGxvY2F0b3IucmVnaXN0ZXIoJ2NvbnRleHRGYWN0b3J5JywgQ29udGV4dEZhY3RvcnksIGNvbmZpZ09iamVjdCwgdHJ1ZSk7XG5cdGxvY2F0b3IucmVnaXN0ZXIoJ3N0b3JlTG9hZGVyJywgU3RvcmVMb2FkZXIsIGNvbmZpZ09iamVjdCwgdHJ1ZSk7XG5cdGxvY2F0b3IucmVnaXN0ZXIoJ2NvbXBvbmVudExvYWRlcicsIENvbXBvbmVudExvYWRlciwgY29uZmlnT2JqZWN0LCB0cnVlKTtcblx0bG9jYXRvci5yZWdpc3RlcignZG9jdW1lbnRSZW5kZXJlcicsIERvY3VtZW50UmVuZGVyZXIsIGNvbmZpZ09iamVjdCwgdHJ1ZSk7XG5cdGxvY2F0b3IucmVnaXN0ZXIoJ3JlcXVlc3RSb3V0ZXInLCBSZXF1ZXN0Um91dGVyLCBjb25maWdPYmplY3QsIHRydWUpO1xuXG5cdHVoci5yZWdpc3Rlcihsb2NhdG9yKTtcbn07XG5cbi8qKlxuICogV3JhcHMgZXZlbnQgYnVzIHdpdGggbG9nIG1lc3NhZ2VzLlxuICogQHBhcmFtIHtFdmVudEVtaXR0ZXJ9IGV2ZW50QnVzIEV2ZW50IGVtaXR0ZXIgdGhhdCBpbXBsZW1lbnRzIGV2ZW50IGJ1cy5cbiAqIEBwYXJhbSB7TG9nZ2VyfSBsb2dnZXIgTG9nZ2VyIHRvIHdyaXRlIG1lc3NhZ2VzLlxuICogQHByb3RlY3RlZFxuICovXG5Cb290c3RyYXBwZXJCYXNlLnByb3RvdHlwZS5fd3JhcEV2ZW50c1dpdGhMb2dnZXIgPSBmdW5jdGlvbiAoZXZlbnRCdXMsIGxvZ2dlcikge1xuXHRldmVudEJ1c1xuXHRcdC5vbignY29tcG9uZW50TG9hZGVkJywgZnVuY3Rpb24gKGFyZ3MpIHtcblx0XHRcdGxvZ2dlci5pbmZvKHV0aWwuZm9ybWF0KElORk9fQ09NUE9ORU5UX0xPQURFRCwgYXJncy5uYW1lKSk7XG5cdFx0fSlcblx0XHQub24oJ3N0b3JlTG9hZGVkJywgZnVuY3Rpb24gKGFyZ3MpIHtcblx0XHRcdGxvZ2dlci5pbmZvKHV0aWwuZm9ybWF0KElORk9fU1RPUkVfTE9BREVELCBhcmdzLm5hbWUpKTtcblx0XHR9KVxuXHRcdC5vbignYWxsU3RvcmVzTG9hZGVkJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0bG9nZ2VyLmluZm8oSU5GT19BTExfU1RPUkVTX0xPQURFRCk7XG5cdFx0fSlcblx0XHQub24oJ2FsbENvbXBvbmVudHNMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRsb2dnZXIuaW5mbyhJTkZPX0FMTF9DT01QT05FTlRTX0xPQURFRCk7XG5cdFx0fSlcblx0XHQub24oJ2NvbXBvbmVudFJlbmRlcicsIGZ1bmN0aW9uIChhcmdzKSB7XG5cdFx0XHR2YXIgaWQgPSBhcmdzLmNvbnRleHQuXG5cdFx0XHRcdFx0YXR0cmlidXRlc1ttb2R1bGVIZWxwZXIuQVRUUklCVVRFX0lEXTtcblx0XHRcdGxvZ2dlci50cmFjZSh1dGlsLmZvcm1hdChUUkFDRV9SRU5ERVJfQ09NUE9ORU5ULFxuXHRcdFx0XHRtb2R1bGVIZWxwZXIuZ2V0VGFnTmFtZUZvckNvbXBvbmVudE5hbWUoYXJncy5uYW1lKSxcblx0XHRcdFx0aWQgPyAnIycgKyBpZCA6ICcnXG5cdFx0XHQpKTtcblx0XHR9KVxuXHRcdC5vbignY29tcG9uZW50UmVuZGVyZWQnLCBmdW5jdGlvbiAoYXJncykge1xuXHRcdFx0dmFyIGlkID0gYXJncy5jb250ZXh0LlxuXHRcdFx0XHRcdGF0dHJpYnV0ZXNbbW9kdWxlSGVscGVyLkFUVFJJQlVURV9JRF07XG5cdFx0XHRsb2dnZXIudHJhY2UodXRpbC5mb3JtYXQoXG5cdFx0XHRcdFRSQUNFX0NPTVBPTkVOVF9SRU5ERVJFRCxcblx0XHRcdFx0bW9kdWxlSGVscGVyLmdldFRhZ05hbWVGb3JDb21wb25lbnROYW1lKGFyZ3MubmFtZSksXG5cdFx0XHRcdGlkID8gJyMnICsgaWQgOiAnJyxcblx0XHRcdFx0dHlwZW9mKGFyZ3MudGltZSkgPT09ICdudW1iZXInID9cblx0XHRcdFx0XHR1dGlsLmZvcm1hdChUSU1FU1RBTVBfRk9STUFULCBhcmdzLnRpbWUpIDogJydcblx0XHRcdCkpO1xuXHRcdH0pXG5cdFx0Lm9uKCdkb2N1bWVudFJlbmRlcmVkJywgZnVuY3Rpb24gKGFyZ3MpIHtcblx0XHRcdGxvZ2dlci5pbmZvKHV0aWwuZm9ybWF0KFxuXHRcdFx0XHRJTkZPX0RPQ1VNRU5UX1JFTkRFUkVELCBhcmdzLmxvY2F0aW9uLnRvU3RyaW5nKClcblx0XHRcdCkpO1xuXHRcdH0pXG5cdFx0Lm9uKCdlcnJvcicsIGZ1bmN0aW9uIChlcnJvcikge1xuXHRcdFx0bG9nZ2VyLmVycm9yKGVycm9yKTtcblx0XHR9KTtcbn07IiwiLypcbiAqIGNhdGJlcnJ5XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0IERlbmlzIFJlY2hrdW5vdiBhbmQgcHJvamVjdCBjb250cmlidXRvcnMuXG4gKlxuICogY2F0YmVycnkncyBsaWNlbnNlIGZvbGxvd3M6XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb25cbiAqIG9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uXG4gKiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sXG4gKiBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLFxuICogcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSxcbiAqIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4gKiBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuICogaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuICogT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKlxuICogVGhpcyBsaWNlbnNlIGFwcGxpZXMgdG8gYWxsIHBhcnRzIG9mIGNhdGJlcnJ5IHRoYXQgYXJlIG5vdCBleHRlcm5hbGx5XG4gKiBtYWludGFpbmVkIGxpYnJhcmllcy5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gQ2F0YmVycnlCYXNlO1xuXG52YXIgU2VydmljZUxvY2F0b3IgPSByZXF1aXJlKCdjYXRiZXJyeS1sb2NhdG9yJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBuZXcgaW5zdGFuY2Ugb2YgdGhlIGJhc2ljIENhdGJlcnJ5IGFwcGxpY2F0aW9uIG1vZHVsZS5cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBDYXRiZXJyeUJhc2UoKSB7XG5cdHRoaXMubG9jYXRvciA9IG5ldyBTZXJ2aWNlTG9jYXRvcigpO1xuXHR0aGlzLmxvY2F0b3IucmVnaXN0ZXJJbnN0YW5jZSgnc2VydmljZUxvY2F0b3InLCB0aGlzLmxvY2F0b3IpO1xuXHR0aGlzLmxvY2F0b3IucmVnaXN0ZXJJbnN0YW5jZSgnY2F0YmVycnknLCB0aGlzKTtcbn1cblxuLyoqXG4gKiBDdXJyZW50IHZlcnNpb24gb2YgY2F0YmVycnkuXG4gKi9cbkNhdGJlcnJ5QmFzZS5wcm90b3R5cGUudmVyc2lvbiA9ICc1LjAuNSc7XG5cbi8qKlxuICogQ3VycmVudCBvYmplY3Qgd2l0aCBldmVudHMuXG4gKiBAdHlwZSB7TW9kdWxlQXBpUHJvdmlkZXJ9XG4gKi9cbkNhdGJlcnJ5QmFzZS5wcm90b3R5cGUuZXZlbnRzID0gbnVsbDtcblxuLyoqXG4gKiBDdXJyZW50IHNlcnZpY2UgbG9jYXRvci5cbiAqIEB0eXBlIHtTZXJ2aWNlTG9jYXRvcn1cbiAqL1xuQ2F0YmVycnlCYXNlLnByb3RvdHlwZS5sb2NhdG9yID0gbnVsbDsiLCIvKlxuICogY2F0YmVycnlcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgRGVuaXMgUmVjaGt1bm92IGFuZCBwcm9qZWN0IGNvbnRyaWJ1dG9ycy5cbiAqXG4gKiBjYXRiZXJyeSdzIGxpY2Vuc2UgZm9sbG93czpcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvblxuICogb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb25cbiAqIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbixcbiAqIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsXG4gKiBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLFxuICogYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbiAqIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4gKiBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4gKiBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqXG4gKiBUaGlzIGxpY2Vuc2UgYXBwbGllcyB0byBhbGwgcGFydHMgb2YgY2F0YmVycnkgdGhhdCBhcmUgbm90IGV4dGVybmFsbHlcbiAqIG1haW50YWluZWQgbGlicmFyaWVzLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBDb29raWVXcmFwcGVyQmFzZTtcblxudmFyIHV0aWwgPSByZXF1aXJlKCd1dGlsJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBuZXcgaW5zdGFuY2Ugb2YgdGhlIGJhc2ljIGNvb2tpZSB3cmFwcGVyLlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIENvb2tpZVdyYXBwZXJCYXNlKCkge1xufVxuXG4vKipcbiAqIEdldHMgbWFwIG9mIGNvb2tpZSB2YWx1ZXMgYnkgbmFtZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IENvb2tpZXMgbWFwIGJ5IG5hbWVzLlxuICovXG5Db29raWVXcmFwcGVyQmFzZS5wcm90b3R5cGUuZ2V0QWxsID0gZnVuY3Rpb24gKCkge1xuXHR2YXIgc3RyaW5nID0gdGhpcy5nZXRDb29raWVTdHJpbmcoKTtcblx0cmV0dXJuIHRoaXMuX3BhcnNlQ29va2llU3RyaW5nKHN0cmluZyk7XG59O1xuXG4vKipcbiAqIEdldHMgY29va2llIHZhbHVlIGJ5IG5hbWUuXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBDb29raWUgbmFtZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IENvb2tpZSB2YWx1ZS5cbiAqL1xuQ29va2llV3JhcHBlckJhc2UucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChuYW1lKSB7XG5cdGlmICh0eXBlb2YobmFtZSkgIT09ICdzdHJpbmcnKSB7XG5cdFx0cmV0dXJuICcnO1xuXHR9XG5cblx0cmV0dXJuIHRoaXMuZ2V0QWxsKClbbmFtZV0gfHwgJyc7XG59O1xuXG4vKipcbiAqIFBhcnNlcyBjb29raWUgc3RyaW5nIGludG8gbWFwIG9mIGNvb2tpZSBrZXkvdmFsdWUgcGFpcnMuXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIENvb2tpZSBzdHJpbmcuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBPYmplY3Qgd2l0aCBjb29raWUgdmFsdWVzIGJ5IGtleXMuXG4gKiBAcHJvdGVjdGVkXG4gKi9cbkNvb2tpZVdyYXBwZXJCYXNlLnByb3RvdHlwZS5fcGFyc2VDb29raWVTdHJpbmcgPSBmdW5jdGlvbiAoc3RyaW5nKSB7XG5cdHZhciBjb29raWUgPSB7fTtcblxuXHRpZiAodHlwZW9mIChzdHJpbmcpICE9PSAnc3RyaW5nJykge1xuXHRcdHJldHVybiBjb29raWU7XG5cdH1cblx0c3RyaW5nXG5cdFx0LnNwbGl0KC87ICovKVxuXHRcdC5mb3JFYWNoKGZ1bmN0aW9uIChjb29raWVQYWlyKSB7XG5cdFx0XHR2YXIgZXF1YWxzSW5kZXggPSBjb29raWVQYWlyLmluZGV4T2YoJz0nKTtcblx0XHRcdGlmIChlcXVhbHNJbmRleCA8IDApIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIga2V5ID0gY29va2llUGFpci5zdWJzdHIoMCwgZXF1YWxzSW5kZXgpLnRyaW0oKSxcblx0XHRcdFx0dmFsdWUgPSBjb29raWVQYWlyLnN1YnN0cihcblx0XHRcdFx0XHRlcXVhbHNJbmRleCArIDEsIGNvb2tpZVBhaXIubGVuZ3RoXG5cdFx0XHRcdCkudHJpbSgpO1xuXG5cdFx0XHR2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL15cInxcIiQvZywgJycpO1xuXHRcdFx0Y29va2llW2tleV0gPSB2YWx1ZTtcblx0XHR9KTtcblxuXHRyZXR1cm4gY29va2llO1xufTtcblxuLyoqXG4gKiBDb252ZXJ0cyBjb29raWUgc2V0dXAgb2JqZWN0IHRvIGNvb2tpZSBzdHJpbmcuXG4gKiBAcGFyYW0ge09iamVjdH0gY29va2llU2V0dXAgQ29va2llIHNldHVwIG9iamVjdC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBjb29raWVTZXR1cC5rZXkgQ29va2llIGtleS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBjb29raWVTZXR1cC52YWx1ZSBDb29raWUgdmFsdWUuXG4gKiBAcGFyYW0ge251bWJlcj99IGNvb2tpZVNldHVwLm1heEFnZSBNYXggY29va2llIGFnZSBpbiBzZWNvbmRzLlxuICogQHBhcmFtIHtEYXRlP30gY29va2llU2V0dXAuZXhwaXJlcyBFeHBpcmUgZGF0ZS5cbiAqIEBwYXJhbSB7c3RyaW5nP30gY29va2llU2V0dXAucGF0aCBVUkkgcGF0aCBmb3IgY29va2llLlxuICogQHBhcmFtIHtzdHJpbmc/fSBjb29raWVTZXR1cC5kb21haW4gQ29va2llIGRvbWFpbi5cbiAqIEBwYXJhbSB7Ym9vbGVhbj99IGNvb2tpZVNldHVwLnNlY3VyZSBJcyBjb29raWUgc2VjdXJlZC5cbiAqIEBwYXJhbSB7Ym9vbGVhbj99IGNvb2tpZVNldHVwLmh0dHBPbmx5IElzIGNvb2tpZSBIVFRQIG9ubHkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBDb29raWUgc3RyaW5nLlxuICogQHByb3RlY3RlZFxuICovXG5Db29raWVXcmFwcGVyQmFzZS5wcm90b3R5cGUuX2NvbnZlcnRUb0Nvb2tpZVNldHVwID0gZnVuY3Rpb24gKGNvb2tpZVNldHVwKSB7XG5cdGlmICh0eXBlb2YoY29va2llU2V0dXAua2V5KSAhPT0gJ3N0cmluZycgfHxcblx0XHR0eXBlb2YoY29va2llU2V0dXAudmFsdWUpICE9PSAnc3RyaW5nJykge1xuXHRcdHRocm93IG5ldyBFcnJvcignV3Jvbmcga2V5IG9yIHZhbHVlJyk7XG5cdH1cblxuXHR2YXIgY29va2llID0gY29va2llU2V0dXAua2V5ICsgJz0nICsgY29va2llU2V0dXAudmFsdWU7XG5cblx0Ly8gaHR0cDovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNjI2NSNzZWN0aW9uLTQuMS4xXG5cdGlmICh0eXBlb2YoY29va2llU2V0dXAubWF4QWdlKSA9PT0gJ251bWJlcicpIHtcblx0XHRjb29raWUgKz0gJzsgTWF4LUFnZT0nICsgY29va2llU2V0dXAubWF4QWdlLnRvRml4ZWQoKTtcblx0XHRpZiAoIWNvb2tpZVNldHVwLmV4cGlyZXMpIHtcblx0XHRcdC8vIGJ5IGRlZmF1bHQgZXhwaXJlIGRhdGUgPSBjdXJyZW50IGRhdGUgKyBtYXgtYWdlIGluIHNlY29uZHNcblx0XHRcdGNvb2tpZVNldHVwLmV4cGlyZXMgPSBuZXcgRGF0ZShEYXRlLm5vdygpICtcblx0XHRcdFx0Y29va2llU2V0dXAubWF4QWdlICogMTAwMCk7XG5cdFx0fVxuXHR9XG5cdGlmIChjb29raWVTZXR1cC5leHBpcmVzIGluc3RhbmNlb2YgRGF0ZSkge1xuXHRcdGNvb2tpZSArPSAnOyBFeHBpcmVzPScgKyBjb29raWVTZXR1cC5leHBpcmVzLnRvVVRDU3RyaW5nKCk7XG5cdH1cblx0aWYgKHR5cGVvZihjb29raWVTZXR1cC5wYXRoKSA9PT0gJ3N0cmluZycpIHtcblx0XHRjb29raWUgKz0gJzsgUGF0aD0nICsgY29va2llU2V0dXAucGF0aDtcblx0fVxuXHRpZiAodHlwZW9mKGNvb2tpZVNldHVwLmRvbWFpbikgPT09ICdzdHJpbmcnKSB7XG5cdFx0Y29va2llICs9ICc7IERvbWFpbj0nICsgY29va2llU2V0dXAuZG9tYWluO1xuXHR9XG5cdGlmICh0eXBlb2YoY29va2llU2V0dXAuc2VjdXJlKSA9PT0gJ2Jvb2xlYW4nICYmXG5cdFx0Y29va2llU2V0dXAuc2VjdXJlKSB7XG5cdFx0Y29va2llICs9ICc7IFNlY3VyZSc7XG5cdH1cblx0aWYgKHR5cGVvZihjb29raWVTZXR1cC5odHRwT25seSkgPT09ICdib29sZWFuJyAmJlxuXHRcdGNvb2tpZVNldHVwLmh0dHBPbmx5KSB7XG5cdFx0Y29va2llICs9ICc7IEh0dHBPbmx5Jztcblx0fVxuXG5cdHJldHVybiBjb29raWU7XG59OyIsIi8qXG4gKiBjYXRiZXJyeVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNSBEZW5pcyBSZWNoa3Vub3YgYW5kIHByb2plY3QgY29udHJpYnV0b3JzLlxuICpcbiAqIGNhdGJlcnJ5J3MgbGljZW5zZSBmb2xsb3dzOlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXG4gKiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvblxuICogZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLFxuICogaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSxcbiAqIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsXG4gKiBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuICogc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbiAqIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1NcbiAqIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICpcbiAqIFRoaXMgbGljZW5zZSBhcHBsaWVzIHRvIGFsbCBwYXJ0cyBvZiBjYXRiZXJyeSB0aGF0IGFyZSBub3QgZXh0ZXJuYWxseVxuICogbWFpbnRhaW5lZCBsaWJyYXJpZXMuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERvY3VtZW50UmVuZGVyZXJCYXNlO1xuXG4vKipcbiAqIENyZWF0ZXMgbmV3IGluc3RhbmNlIG9mIHRoZSBiYXNpYyBkb2N1bWVudCByZW5kZXJlci5cbiAqIEBwYXJhbSB7U2VydmljZUxvY2F0b3J9ICRzZXJ2aWNlTG9jYXRvciBMb2NhdG9yIHRvIHJlc29sdmUgZGVwZW5kZW5jaWVzLlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIERvY3VtZW50UmVuZGVyZXJCYXNlKCRzZXJ2aWNlTG9jYXRvcikge1xuXHR2YXIgc2VsZiA9IHRoaXM7XG5cdHRoaXMuX3NlcnZpY2VMb2NhdG9yID0gJHNlcnZpY2VMb2NhdG9yO1xuXHR0aGlzLl9jb250ZXh0RmFjdG9yeSA9ICRzZXJ2aWNlTG9jYXRvci5yZXNvbHZlKCdjb250ZXh0RmFjdG9yeScpO1xuXHR0aGlzLl9jb21wb25lbnRMb2FkZXIgPSAkc2VydmljZUxvY2F0b3IucmVzb2x2ZSgnY29tcG9uZW50TG9hZGVyJyk7XG5cdHRoaXMuX2V2ZW50QnVzID0gJHNlcnZpY2VMb2NhdG9yLnJlc29sdmUoJ2V2ZW50QnVzJyk7XG5cblx0dmFyIHN0b3JlTG9hZGVyID0gJHNlcnZpY2VMb2NhdG9yLnJlc29sdmUoJ3N0b3JlTG9hZGVyJyk7XG5cdHRoaXMuX2xvYWRpbmcgPSBQcm9taXNlLmFsbChbXG5cdFx0dGhpcy5fY29tcG9uZW50TG9hZGVyLmxvYWQoKSxcblx0XHRzdG9yZUxvYWRlci5sb2FkKClcblx0XSlcblx0XHQudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRzZWxmLl9sb2FkaW5nID0gbnVsbDtcblx0XHRcdHNlbGYuX2V2ZW50QnVzLmVtaXQoJ3JlYWR5Jyk7XG5cdFx0fSlcblx0XHQuY2F0Y2goZnVuY3Rpb24gKHJlYXNvbikge1xuXHRcdFx0c2VsZi5fZXZlbnRCdXMuZW1pdCgnZXJyb3InLCByZWFzb24pO1xuXHRcdH0pO1xufVxuXG4vKipcbiAqIEN1cnJlbnQgc2VydmljZSBsb2NhdG9yLlxuICogQHR5cGUge1NlcnZpY2VMb2NhdG9yfVxuICogQHByb3RlY3RlZFxuICovXG5Eb2N1bWVudFJlbmRlcmVyQmFzZS5wcm90b3R5cGUuX3NlcnZpY2VMb2NhdG9yID0gbnVsbDtcblxuLyoqXG4gKiBDdXJyZW50IGNvbXBvbmVudCBsb2FkZXIuXG4gKiBAdHlwZSB7Q29tcG9uZW50TG9hZGVyfVxuICogQHByb3RlY3RlZFxuICovXG5Eb2N1bWVudFJlbmRlcmVyQmFzZS5wcm90b3R5cGUuX2NvbXBvbmVudExvYWRlciA9IG51bGw7XG5cbi8qKlxuICogQ3VycmVudCBtb2R1bGUgbG9hZGluZyBwcm9taXNlLlxuICogQHR5cGUge1Byb21pc2V9XG4gKiBAcHJvdGVjdGVkXG4gKi9cbkRvY3VtZW50UmVuZGVyZXJCYXNlLnByb3RvdHlwZS5fbG9hZGluZyA9IG51bGw7XG5cbi8qKlxuICogQ3VycmVudCBjb250ZXh0IGZhY3RvcnkuXG4gKiBAdHlwZSB7Q29udGV4dEZhY3Rvcnl9XG4gKiBAcHJvdGVjdGVkXG4gKi9cbkRvY3VtZW50UmVuZGVyZXJCYXNlLnByb3RvdHlwZS5fY29udGV4dEZhY3RvcnkgPSBudWxsO1xuXG4vKipcbiAqIEdldHMgcHJvbWlzZSBmb3IgcmVhZHkgc3RhdGUgd2hlbiBpdCB3aWxsIGJlIGFibGUgaGFuZGxlIHJlcXVlc3RzLlxuICogQHJldHVybnMge1Byb21pc2V9IFByb21pc2UgZm9yIG5vdGhpbmcuXG4gKiBAcHJvdGVjdGVkXG4gKi9cbkRvY3VtZW50UmVuZGVyZXJCYXNlLnByb3RvdHlwZS5fZ2V0UHJvbWlzZUZvclJlYWR5U3RhdGUgPSBmdW5jdGlvbiAoKSB7XG5cdHJldHVybiB0aGlzLl9sb2FkaW5nID9cblx0XHR0aGlzLl9sb2FkaW5nIDpcblx0XHRQcm9taXNlLnJlc29sdmUoKTtcbn07IiwiLypcbiAqIGNhdGJlcnJ5XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE1IERlbmlzIFJlY2hrdW5vdiBhbmQgcHJvamVjdCBjb250cmlidXRvcnMuXG4gKlxuICogY2F0YmVycnkncyBsaWNlbnNlIGZvbGxvd3M6XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb25cbiAqIG9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uXG4gKiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sXG4gKiBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLFxuICogcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSxcbiAqIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4gKiBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuICogaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuICogT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKlxuICogVGhpcyBsaWNlbnNlIGFwcGxpZXMgdG8gYWxsIHBhcnRzIG9mIGNhdGJlcnJ5IHRoYXQgYXJlIG5vdCBleHRlcm5hbGx5XG4gKiBtYWludGFpbmVkIGxpYnJhcmllcy5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gTG9hZGVyQmFzZTtcblxudmFyIG1vZHVsZUhlbHBlciA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvbW9kdWxlSGVscGVyJyk7XG5cbi8qKlxuICogQ3JlYXRlIGJhc2ljIGltcGxlbWVudGF0aW9uIG9mIGEgbW9kdWxlIGxvYWRlci5cbiAqIEBwYXJhbSB7QXJyYXl9IHRyYW5zZm9ybXMgQXJyYXkgb2YgbW9kdWxlIHRyYW5zZm9ybWF0aW9ucy5cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBMb2FkZXJCYXNlKHRyYW5zZm9ybXMpIHtcblx0dGhpcy5fdHJhbnNmb3JtcyA9IHRyYW5zZm9ybXM7XG59XG5cbi8qKlxuICogQ3VycmVudCBsaXN0IG9mIGNvbXBvbmVudCB0cmFuc2Zvcm1zLlxuICogQHR5cGUge0FycmF5fVxuICogQHByaXZhdGVcbiAqL1xuTG9hZGVyQmFzZS5wcm90b3R5cGUuX3RyYW5zZm9ybXMgPSBudWxsO1xuXG4vKipcbiAqIEFwcGxpZXMgYWxsIHRyYW5zZm9ybWF0aW9ucyByZWdpc3RlcmVkIGluIFNlcnZpY2UgTG9jYXRvci5cbiAqIEBwYXJhbSB7T2JqZWN0fSBtb2R1bGUgTG9hZGVkIG1vZHVsZS5cbiAqIEBwYXJhbSB7bnVtYmVyP30gaW5kZXggVHJhbnNmb3JtYXRpb24gaW5kZXggaW4gYSBsaXN0LlxuICogQHJldHVybnMge1Byb21pc2U8T2JqZWN0Pn0gVHJhbnNmb3JtZWQgbW9kdWxlLlxuICogQHByb3RlY3RlZFxuICovXG5Mb2FkZXJCYXNlLnByb3RvdHlwZS5fYXBwbHlUcmFuc2Zvcm1zID0gZnVuY3Rpb24gKG1vZHVsZSwgaW5kZXgpIHtcblx0aWYgKGluZGV4ID09PSB1bmRlZmluZWQpIHtcblx0XHQvLyB0aGUgbGlzdCBpcyBhIHN0YWNrLCB3ZSBzaG91bGQgcmV2ZXJzZSBpdFxuXHRcdGluZGV4ID0gdGhpcy5fdHJhbnNmb3Jtcy5sZW5ndGggLSAxO1xuXHR9XG5cblx0aWYgKGluZGV4IDwgMCkge1xuXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUobW9kdWxlKTtcblx0fVxuXG5cdHZhciBzZWxmID0gdGhpcyxcblx0XHR0cmFuc2Zvcm1hdGlvbiA9IHRoaXMuX3RyYW5zZm9ybXNbaW5kZXhdO1xuXG5cdHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuXHRcdC50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiB0cmFuc2Zvcm1hdGlvbi50cmFuc2Zvcm0obW9kdWxlKTtcblx0XHR9KVxuXHRcdC50aGVuKGZ1bmN0aW9uICh0cmFuc2Zvcm1lZE1vZHVsZSkge1xuXHRcdFx0cmV0dXJuIHNlbGYuX2FwcGx5VHJhbnNmb3Jtcyh0cmFuc2Zvcm1lZE1vZHVsZSwgaW5kZXggLSAxKTtcblx0XHR9KTtcbn07IiwiLypcbiAqIGNhdGJlcnJ5XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0IERlbmlzIFJlY2hrdW5vdiBhbmQgcHJvamVjdCBjb250cmlidXRvcnMuXG4gKlxuICogY2F0YmVycnkncyBsaWNlbnNlIGZvbGxvd3M6XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb25cbiAqIG9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uXG4gKiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sXG4gKiBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLFxuICogcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSxcbiAqIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4gKiBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuICogaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuICogT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKlxuICogVGhpcyBsaWNlbnNlIGFwcGxpZXMgdG8gYWxsIHBhcnRzIG9mIGNhdGJlcnJ5IHRoYXQgYXJlIG5vdCBleHRlcm5hbGx5XG4gKiBtYWludGFpbmVkIGxpYnJhcmllcy5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gTW9kdWxlQXBpUHJvdmlkZXJCYXNlO1xuXG52YXIgRVJST1JfRVZFTlRfTkFNRSA9ICdFdmVudCBuYW1lIHNob3VsZCBiZSBhIHN0cmluZycsXG5cdEVSUk9SX0VWRU5UX0hBTkRMRVIgPSAnRXZlbnQgaGFuZGxlciBzaG91bGQgYmUgYSBmdW5jdGlvbic7XG5cbi8qKlxuICogQ3JlYXRlcyBuZXcgaW5zdGFuY2Ugb2YgdGhlIGJhc2ljIEFQSSBwcm92aWRlci5cbiAqIEBwYXJhbSB7U2VydmljZUxvY2F0b3J9ICRzZXJ2aWNlTG9jYXRvciBTZXJ2aWNlIGxvY2F0b3JcbiAqIHRvIHJlc29sdmUgZGVwZW5kZW5jaWVzLlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIE1vZHVsZUFwaVByb3ZpZGVyQmFzZSgkc2VydmljZUxvY2F0b3IpIHtcblx0dGhpcy5sb2NhdG9yID0gJHNlcnZpY2VMb2NhdG9yO1xuXHR0aGlzLmNvb2tpZSA9ICRzZXJ2aWNlTG9jYXRvci5yZXNvbHZlKCdjb29raWVXcmFwcGVyJyk7XG5cdHRoaXMuX2V2ZW50QnVzID0gJHNlcnZpY2VMb2NhdG9yLnJlc29sdmUoJ2V2ZW50QnVzJyk7XG59XG5cbi8qKlxuICogQ3VycmVudCBjb29raWUgcHJvdmlkZXIuXG4gKiBAdHlwZSB7Q29va2llV3JhcHBlcn1cbiAqL1xuTW9kdWxlQXBpUHJvdmlkZXJCYXNlLnByb3RvdHlwZS5jb29raWUgPSBudWxsO1xuXG4vKipcbiAqIEN1cnJlbnQgc2VydmljZSBsb2NhdG9yLlxuICogQHR5cGUge1NlcnZpY2VMb2NhdG9yfVxuICogQHByb3RlY3RlZFxuICovXG5Nb2R1bGVBcGlQcm92aWRlckJhc2UucHJvdG90eXBlLmxvY2F0b3IgPSBudWxsO1xuXG4vKipcbiAqIEN1cnJlbnQgZXZlbnQgYnVzLlxuICogQHR5cGUge0V2ZW50RW1pdHRlcn1cbiAqIEBwcml2YXRlXG4gKi9cbk1vZHVsZUFwaVByb3ZpZGVyQmFzZS5wcm90b3R5cGUuX2V2ZW50QnVzID0gbnVsbDtcblxuLyoqXG4gKiBTdWJzY3JpYmVzIG9uIHRoZSBzcGVjaWZpZWQgZXZlbnQgaW4gQ2F0YmVycnkuXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lIE5hbWUgb2YgdGhlIGV2ZW50LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaGFuZGxlciBFdmVudCBoYW5kbGVyLlxuICogQHJldHVybnMge01vZHVsZUFwaVByb3ZpZGVyQmFzZX0gVGhpcyBvYmplY3QgZm9yIGNoYWluaW5nLlxuICovXG5Nb2R1bGVBcGlQcm92aWRlckJhc2UucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgaGFuZGxlcikge1xuXHRjaGVja0V2ZW50TmFtZUFuZEhhbmRsZXIoZXZlbnROYW1lLCBoYW5kbGVyKTtcblx0dGhpcy5fZXZlbnRCdXMub24oZXZlbnROYW1lLCBoYW5kbGVyKTtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFN1YnNjcmliZXMgb24gdGhlIHNwZWNpZmllZCBldmVudCBpbiBDYXRiZXJyeSB0byBoYW5kbGUgb25jZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWUgTmFtZSBvZiB0aGUgZXZlbnQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBoYW5kbGVyIEV2ZW50IGhhbmRsZXIuXG4gKiBAcmV0dXJucyB7TW9kdWxlQXBpUHJvdmlkZXJCYXNlfSBUaGlzIG9iamVjdCBmb3IgY2hhaW5pbmcuXG4gKi9cbk1vZHVsZUFwaVByb3ZpZGVyQmFzZS5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGhhbmRsZXIpIHtcblx0Y2hlY2tFdmVudE5hbWVBbmRIYW5kbGVyKGV2ZW50TmFtZSwgaGFuZGxlcik7XG5cdHRoaXMuX2V2ZW50QnVzLm9uY2UoZXZlbnROYW1lLCBoYW5kbGVyKTtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJlbW92ZXMgdGhlIHNwZWNpZmllZCBoYW5kbGVyIGZyb20gdGhlIHNwZWNpZmllZCBldmVudC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWUgTmFtZSBvZiB0aGUgZXZlbnQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBoYW5kbGVyIEV2ZW50IGhhbmRsZXIuXG4gKiBAcmV0dXJucyB7TW9kdWxlQXBpUHJvdmlkZXJCYXNlfSBUaGlzIG9iamVjdCBmb3IgY2hhaW5pbmcuXG4gKi9cbk1vZHVsZUFwaVByb3ZpZGVyQmFzZS5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBoYW5kbGVyKSB7XG5cdGNoZWNrRXZlbnROYW1lQW5kSGFuZGxlcihldmVudE5hbWUsIGhhbmRsZXIpO1xuXHR0aGlzLl9ldmVudEJ1cy5yZW1vdmVMaXN0ZW5lcihldmVudE5hbWUsIGhhbmRsZXIpO1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwgaGFuZGxlcnMgZnJvbSB0aGUgc3BlY2lmaWVkIGV2ZW50IGluIENhdGJlcnJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZSBOYW1lIG9mIHRoZSBldmVudC5cbiAqIEByZXR1cm5zIHtNb2R1bGVBcGlQcm92aWRlckJhc2V9IFRoaXMgb2JqZWN0IGZvciBjaGFpbmluZy5cbiAqL1xuTW9kdWxlQXBpUHJvdmlkZXJCYXNlLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoZXZlbnROYW1lKSB7XG5cdGNoZWNrRXZlbnROYW1lQW5kSGFuZGxlcihldmVudE5hbWUsIGR1bW15KTtcblx0dGhpcy5fZXZlbnRCdXMucmVtb3ZlQWxsTGlzdGVuZXJzKGV2ZW50TmFtZSk7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBDaGVja3MgaWYgZXZlbnQgbmFtZSBpcyBhIHN0cmluZyBhbmQgaGFuZGxlciBpcyBhIGZ1bmN0aW9uLlxuICogQHBhcmFtIHsqfSBldmVudE5hbWUgTmFtZSBvZiB0aGUgZXZlbnQgdG8gY2hlY2suXG4gKiBAcGFyYW0geyp9IGhhbmRsZXIgVGhlIGV2ZW50IGhhbmRsZXIgdG8gY2hlY2suXG4gKi9cbmZ1bmN0aW9uIGNoZWNrRXZlbnROYW1lQW5kSGFuZGxlcihldmVudE5hbWUsIGhhbmRsZXIpIHtcblx0aWYgKHR5cGVvZiAoZXZlbnROYW1lKSAhPT0gJ3N0cmluZycpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoRVJST1JfRVZFTlRfTkFNRSk7XG5cdH1cblxuXHRpZiAodHlwZW9mIChoYW5kbGVyKSAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdHRocm93IG5ldyBFcnJvcihFUlJPUl9FVkVOVF9IQU5ETEVSKTtcblx0fVxufVxuXG4vKipcbiAqIERvZXMgbm90aGluZy4gSXQgaXMgdXNlZCBhcyBhIGRlZmF1bHQgY2FsbGJhY2suXG4gKi9cbmZ1bmN0aW9uIGR1bW15KCkge31cbiIsIi8qXG4gKiBjYXRiZXJyeVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNCBEZW5pcyBSZWNoa3Vub3YgYW5kIHByb2plY3QgY29udHJpYnV0b3JzLlxuICpcbiAqIGNhdGJlcnJ5J3MgbGljZW5zZSBmb2xsb3dzOlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXG4gKiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvblxuICogZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLFxuICogaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSxcbiAqIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsXG4gKiBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuICogc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbiAqIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1NcbiAqIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICpcbiAqIFRoaXMgbGljZW5zZSBhcHBsaWVzIHRvIGFsbCBwYXJ0cyBvZiBjYXRiZXJyeSB0aGF0IGFyZSBub3QgZXh0ZXJuYWxseVxuICogbWFpbnRhaW5lZCBsaWJyYXJpZXMuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWwnKTtcblxudmFyIFRJVExFID0gJ0NhdGJlcnJ5QDUuMC41ICgnICtcblx0XHQnPGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9jYXRiZXJyeS9jYXRiZXJyeS9pc3N1ZXNcIiAnICtcblx0XHQndGFyZ2V0PVwiX2JsYW5rXCI+JyArXG5cdFx0J3JlcG9ydCBhbiBpc3N1ZScgK1xuXHRcdCc8L2E+JyArXG5cdFx0JyknLFxuXHRBTVAgPSAvJi9nLFxuXHRMVCA9IC88L2csXG5cdEdUID0gLz4vZyxcblx0UVVPVCA9IC9cXFwiL2csXG5cdFNJTkdMRV9RVU9UID0gL1xcJy9nLFxuXHRFUlJPUl9NRVNTQUdFX1JFR0VYUCA9IC9eKD86W1xcdyRdKyk6ICg/Oi4rKVxccj9cXG4vaSxcblx0RVJST1JfTUVTU0FHRV9GT1JNQVQgPSAnPHNwYW4gJyArXG5cdFx0J3N0eWxlPVwiY29sb3I6IHJlZDsgZm9udC1zaXplOiAxNnB0OyBmb250LXdlaWdodDogYm9sZDtcIj4nICtcblx0XHQnJXMlcycgK1xuXHRcdCc8L3NwYW4+Jyxcblx0TkVXX0xJTkUgPSAvXFxyP1xcbi9nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0LyoqXG5cdCAqIFByaW50cyBlcnJvciB3aXRoIHByZXR0eSBmb3JtYXR0aW5nLlxuXHQgKiBAcGFyYW0ge0Vycm9yfSBlcnJvciBFcnJvciB0byBwcmludC5cblx0ICogQHBhcmFtIHtzdHJpbmd9IHVzZXJBZ2VudCBVc2VyIGFnZW50IGluZm9ybWF0aW9uLlxuXHQgKiBAcmV0dXJucyB7c3RyaW5nfSBIVE1MIHdpdGggYWxsIGluZm9ybWF0aW9uIGFib3V0IGVycm9yLlxuXHQgKi9cblx0cHJldHR5UHJpbnQ6IGZ1bmN0aW9uIChlcnJvciwgdXNlckFnZW50KSB7XG5cdFx0aWYgKCFlcnJvciB8fCB0eXBlb2YoZXJyb3IpICE9PSAnb2JqZWN0Jykge1xuXHRcdFx0cmV0dXJuICcnO1xuXHRcdH1cblx0XHR2YXIgZGF0ZVN0cmluZyA9IChuZXcgRGF0ZSgpKS50b1VUQ1N0cmluZygpICsgJzs8YnIvPicsXG5cdFx0XHR1c2VyQWdlbnRTdHJpbmcgPSAodXNlckFnZW50ID8gKHVzZXJBZ2VudCArICc7PGJyLz4nKSA6ICcnKSxcblx0XHRcdG5hbWUgPSAodHlwZW9mKGVycm9yLm5hbWUpID09PSAnc3RyaW5nJyA/IGVycm9yLm5hbWUgKyAnOiAnIDogJycpLFxuXHRcdFx0bWVzc2FnZSA9IFN0cmluZyhlcnJvci5tZXNzYWdlIHx8ICcnKSxcblx0XHRcdHN0YWNrID0gU3RyaW5nKGVycm9yLnN0YWNrIHx8ICcnKS5yZXBsYWNlKEVSUk9SX01FU1NBR0VfUkVHRVhQLCAnJyksXG5cdFx0XHRmdWxsTWVzc2FnZSA9IHV0aWwuZm9ybWF0KFxuXHRcdFx0XHRFUlJPUl9NRVNTQUdFX0ZPUk1BVCwgZXNjYXBlKG5hbWUpLCBlc2NhcGUobWVzc2FnZSlcblx0XHRcdCk7XG5cblx0XHRyZXR1cm4gJzxkaXYgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTsgZm9udC1zaXplOiAxMnB0O1wiPicgK1xuXHRcdFx0ZGF0ZVN0cmluZyArXG5cdFx0XHR1c2VyQWdlbnRTdHJpbmcgK1xuXHRcdFx0VElUTEUgKyAnPGJyLz48YnIvPicgK1xuXHRcdFx0ZnVsbE1lc3NhZ2UgKyAnPGJyLz48YnIvPicgK1xuXHRcdFx0ZXNjYXBlKHN0YWNrKSArXG5cdFx0XHQnPC9kaXY+Jztcblx0fVxufTtcblxuLyoqXG4gKiBFc2NhcGVzIGVycm9yIHRleHQuXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgRXJyb3IgdGV4dC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IGVzY2FwZWQgYW5kIGZvcm1hdHRlZCBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGVzY2FwZSh2YWx1ZSkge1xuXHRyZXR1cm4gdmFsdWVcblx0XHQucmVwbGFjZShBTVAsICcmYW1wOycpXG5cdFx0LnJlcGxhY2UoTFQsICcmbHQ7Jylcblx0XHQucmVwbGFjZShHVCwgJyZndDsnKVxuXHRcdC5yZXBsYWNlKFFVT1QsICcmcXVvdDsnKVxuXHRcdC5yZXBsYWNlKFNJTkdMRV9RVU9ULCAnJiMzOTsnKVxuXHRcdC5yZXBsYWNlKE5FV19MSU5FLCAnPGJyLz4nKTtcbn0iLCIvKlxuICogY2F0YmVycnlcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgRGVuaXMgUmVjaGt1bm92IGFuZCBwcm9qZWN0IGNvbnRyaWJ1dG9ycy5cbiAqXG4gKiBjYXRiZXJyeSdzIGxpY2Vuc2UgZm9sbG93czpcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvblxuICogb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb25cbiAqIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbixcbiAqIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsXG4gKiBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLFxuICogYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbiAqIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4gKiBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4gKiBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqXG4gKiBUaGlzIGxpY2Vuc2UgYXBwbGllcyB0byBhbGwgcGFydHMgb2YgY2F0YmVycnkgdGhhdCBhcmUgbm90IGV4dGVybmFsbHlcbiAqIG1haW50YWluZWQgbGlicmFyaWVzLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGhlbHBlciA9IHtcblx0Q09NUE9ORU5UX1BSRUZJWDogJ2NhdC0nLFxuXHRDT01QT05FTlRfUFJFRklYX1JFR0VYUDogL15jYXQtLyxcblx0Q09NUE9ORU5UX0VSUk9SX1RFTVBMQVRFX1BPU1RGSVg6ICctLWVycm9yJyxcblx0RE9DVU1FTlRfQ09NUE9ORU5UX05BTUU6ICdkb2N1bWVudCcsXG5cdEhFQURfQ09NUE9ORU5UX05BTUU6ICdoZWFkJyxcblx0QVRUUklCVVRFX0lEOiAnaWQnLFxuXHRBVFRSSUJVVEVfU1RPUkU6ICdjYXQtc3RvcmUnLFxuXHRERUZBVUxUX0xPR0lDX0ZJTEVOQU1FOiAnaW5kZXguanMnLFxuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIG5hbWUgZm9yIGVycm9yIHRlbXBsYXRlIG9mIGNvbXBvbmVudC5cblx0ICogQHBhcmFtIHtTdHJpbmd9IGNvbXBvbmVudE5hbWUgbmFtZSBvZiBjb21wb25lbnQuXG5cdCAqIEByZXR1cm5zIHtzdHJpbmd9IE5hbWUgb2YgZXJyb3IgdGVtcGxhdGUgb2YgdGhlIGNvbXBvbmVudC5cblx0ICovXG5cdGdldE5hbWVGb3JFcnJvclRlbXBsYXRlOiBmdW5jdGlvbiAoY29tcG9uZW50TmFtZSkge1xuXHRcdGlmICh0eXBlb2YoY29tcG9uZW50TmFtZSkgIT09ICdzdHJpbmcnKSB7XG5cdFx0XHRyZXR1cm4gJyc7XG5cdFx0fVxuXHRcdHJldHVybiBjb21wb25lbnROYW1lICsgaGVscGVyLkNPTVBPTkVOVF9FUlJPUl9URU1QTEFURV9QT1NURklYO1xuXHR9LFxuXG5cdC8qKlxuXHQgKiBEZXRlcm1pbmVzIGlmIHNwZWNpZmllZCBjb21wb25lbnQgbmFtZSBpcyB0aGUgXCJkb2N1bWVudFwiIGNvbXBvbmVudCBuYW1lLlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gY29tcG9uZW50TmFtZSBOYW1lIG9mIHRoZSBjb21wb25lbnQuXG5cdCAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHNwZWNpZmllZCBjb21wb25lbnQgaXMgdGhlIFwiZG9jdW1lbnRcIiBjb21wb25lbnQuXG5cdCAqL1xuXHRpc0RvY3VtZW50Q29tcG9uZW50OiBmdW5jdGlvbiAoY29tcG9uZW50TmFtZSkge1xuXHRcdHJldHVybiBjb21wb25lbnROYW1lLnRvTG93ZXJDYXNlKCkgPT09IGhlbHBlci5ET0NVTUVOVF9DT01QT05FTlRfTkFNRTtcblx0fSxcblx0LyoqXG5cdCAqIERldGVybWluZXMgaWYgc3BlY2lmaWVkIGNvbXBvbmVudCBuYW1lIGlzIHRoZSBcImhlYWRcIiBjb21wb25lbnQgbmFtZS5cblx0ICogQHBhcmFtIHtzdHJpbmd9IGNvbXBvbmVudE5hbWUgTmFtZSBvZiB0aGUgY29tcG9uZW50LlxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiBzcGVjaWZpZWQgY29tcG9uZW50IGlzIHRoZSBcImhlYWRcIiBjb21wb25lbnQuXG5cdCAqL1xuXHRpc0hlYWRDb21wb25lbnQ6IGZ1bmN0aW9uIChjb21wb25lbnROYW1lKSB7XG5cdFx0cmV0dXJuIGNvbXBvbmVudE5hbWUudG9Mb3dlckNhc2UoKSA9PT0gaGVscGVyLkhFQURfQ09NUE9ORU5UX05BTUU7XG5cdH0sXG5cblx0LyoqXG5cdCAqIEdldHMgdGhlIG9yaWdpbmFsIGNvbXBvbmVudCBuYW1lIHdpdGhvdXQgcHJlZml4LlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gZnVsbENvbXBvbmVudE5hbWUgRnVsbCBjb21wb25lbnQgbmFtZSAodGFnIG5hbWUpLlxuXHQgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgb3JpZ2luYWwgY29tcG9uZW50IG5hbWUgd2l0aG91dCBwcmVmaXguXG5cdCAqL1xuXHRnZXRPcmlnaW5hbENvbXBvbmVudE5hbWU6IGZ1bmN0aW9uIChmdWxsQ29tcG9uZW50TmFtZSkge1xuXHRcdGlmICh0eXBlb2YgKGZ1bGxDb21wb25lbnROYW1lKSAhPT0gJ3N0cmluZycpIHtcblx0XHRcdHJldHVybiAnJztcblx0XHR9XG5cdFx0ZnVsbENvbXBvbmVudE5hbWUgPSBmdWxsQ29tcG9uZW50TmFtZS50b0xvd2VyQ2FzZSgpO1xuXHRcdGlmIChmdWxsQ29tcG9uZW50TmFtZSA9PT0gaGVscGVyLkhFQURfQ09NUE9ORU5UX05BTUUpIHtcblx0XHRcdHJldHVybiBmdWxsQ29tcG9uZW50TmFtZTtcblx0XHR9XG5cdFx0aWYgKGZ1bGxDb21wb25lbnROYW1lID09PSBoZWxwZXIuRE9DVU1FTlRfQ09NUE9ORU5UX05BTUUpIHtcblx0XHRcdHJldHVybiBmdWxsQ29tcG9uZW50TmFtZTtcblx0XHR9XG5cdFx0cmV0dXJuIGZ1bGxDb21wb25lbnROYW1lLnJlcGxhY2UoaGVscGVyLkNPTVBPTkVOVF9QUkVGSVhfUkVHRVhQLCAnJyk7XG5cdH0sXG5cblx0LyoqXG5cdCAqIEdldHMgdmFsaWQgdGFnIG5hbWUgZm9yIGNvbXBvbmVudC5cblx0ICogQHBhcmFtIHtTdHJpbmd9IGNvbXBvbmVudE5hbWUgTmFtZSBvZiB0aGUgY29tcG9uZW50LlxuXHQgKiBAcmV0dXJucyB7c3RyaW5nfSBOYW1lIG9mIHRoZSB0YWcuXG5cdCAqL1xuXHRnZXRUYWdOYW1lRm9yQ29tcG9uZW50TmFtZTogZnVuY3Rpb24gKGNvbXBvbmVudE5hbWUpIHtcblx0XHRpZiAodHlwZW9mKGNvbXBvbmVudE5hbWUpICE9PSAnc3RyaW5nJykge1xuXHRcdFx0cmV0dXJuICcnO1xuXHRcdH1cblx0XHR2YXIgdXBwZXJDb21wb25lbnROYW1lID0gY29tcG9uZW50TmFtZS50b1VwcGVyQ2FzZSgpO1xuXHRcdGlmIChjb21wb25lbnROYW1lID09PSBoZWxwZXIuSEVBRF9DT01QT05FTlRfTkFNRSkge1xuXHRcdFx0cmV0dXJuIHVwcGVyQ29tcG9uZW50TmFtZTtcblx0XHR9XG5cdFx0aWYgKGNvbXBvbmVudE5hbWUgPT09IGhlbHBlci5ET0NVTUVOVF9DT01QT05FTlRfTkFNRSkge1xuXHRcdFx0cmV0dXJuIHVwcGVyQ29tcG9uZW50TmFtZTtcblx0XHR9XG5cdFx0cmV0dXJuIGhlbHBlci5DT01QT05FTlRfUFJFRklYLnRvVXBwZXJDYXNlKCkgKyB1cHBlckNvbXBvbmVudE5hbWU7XG5cdH0sXG5cblx0LyoqXG5cdCAqIEdldHMgbWV0aG9kIG9mIHRoZSBtb2R1bGUgdGhhdCBjYW4gYmUgaW52b2tlZC5cblx0ICogQHBhcmFtIHtPYmplY3R9IG1vZHVsZSBNb2R1bGUgaW1wbGVtZW50YXRpb24uXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBwcmVmaXggTWV0aG9kIHByZWZpeCAoaS5lLiBoYW5kbGUpLlxuXHQgKiBAcGFyYW0ge3N0cmluZz99IG5hbWUgTmFtZSBvZiB0aGUgZW50aXR5IHRvIGludm9rZSBtZXRob2QgZm9yXG5cdCAqICh3aWxsIGJlIGNvbnZlcnRlZCB0byBjYW1lbCBjYXNpbmcpLlxuXHQgKiBAcmV0dXJucyB7RnVuY3Rpb259IE1ldGhvZCB0byBpbnZva2UuXG5cdCAqL1xuXHRnZXRNZXRob2RUb0ludm9rZTogZnVuY3Rpb24gKG1vZHVsZSwgcHJlZml4LCBuYW1lKSB7XG5cdFx0aWYgKCFtb2R1bGUgfHwgdHlwZW9mKG1vZHVsZSkgIT09ICdvYmplY3QnKSB7XG5cdFx0XHRyZXR1cm4gZGVmYXVsdFByb21pc2VNZXRob2Q7XG5cdFx0fVxuXHRcdHZhciBtZXRob2ROYW1lID0gaGVscGVyLmdldENhbWVsQ2FzZU5hbWUocHJlZml4LCBuYW1lKTtcblx0XHRpZiAodHlwZW9mKG1vZHVsZVttZXRob2ROYW1lXSkgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdHJldHVybiBtb2R1bGVbbWV0aG9kTmFtZV0uYmluZChtb2R1bGUpO1xuXHRcdH1cblx0XHRpZiAodHlwZW9mKG1vZHVsZVtwcmVmaXhdKSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0cmV0dXJuIG1vZHVsZVtwcmVmaXhdLmJpbmQobW9kdWxlLCBuYW1lKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZGVmYXVsdFByb21pc2VNZXRob2Q7XG5cdH0sXG5cblx0LyoqXG5cdCAqIEdldHMgbmFtZSBpbiBjYW1lbCBjYXNpbmcgZm9yIGV2ZXJ5dGhpbmcuXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBwcmVmaXggUHJlZml4IGZvciB0aGUgbmFtZS5cblx0ICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgTmFtZSB0byBjb252ZXJ0LlxuXHQgKi9cblx0Z2V0Q2FtZWxDYXNlTmFtZTogZnVuY3Rpb24gKHByZWZpeCwgbmFtZSkge1xuXHRcdGlmICghbmFtZSkge1xuXHRcdFx0cmV0dXJuICcnO1xuXHRcdH1cblx0XHR2YXIgcGFydHMgPSBuYW1lLnNwbGl0KC9bXmEtejAtOV0vaSksXG5cdFx0XHRjYW1lbENhc2VOYW1lID0gU3RyaW5nKHByZWZpeCB8fCAnJyk7XG5cblx0XHRwYXJ0cy5mb3JFYWNoKGZ1bmN0aW9uIChwYXJ0KSB7XG5cdFx0XHRpZiAoIXBhcnQpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBmaXJzdCBjaGFyYWN0ZXIgaW4gbWV0aG9kIG5hbWUgbXVzdCBiZSBpbiBsb3dlcmNhc2Vcblx0XHRcdGNhbWVsQ2FzZU5hbWUgKz0gY2FtZWxDYXNlTmFtZSA/XG5cdFx0XHRcdHBhcnRbMF0udG9VcHBlckNhc2UoKSA6XG5cdFx0XHRcdHBhcnRbMF0udG9Mb3dlckNhc2UoKTtcblx0XHRcdGNhbWVsQ2FzZU5hbWUgKz0gcGFydC5zdWJzdHJpbmcoMSk7XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gY2FtZWxDYXNlTmFtZTtcblx0fSxcblxuXHQvKipcblx0ICogR2V0cyBzYWZlIHByb21pc2UgcmVzb2x2ZWQgZnJvbSBhY3Rpb24uXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IGFjdGlvbiBBY3Rpb24gdG8gd3JhcCB3aXRoIHNhZmUgcHJvbWlzZS5cblx0ICogQHJldHVybnMge1Byb21pc2V9XG5cdCAqL1xuXHRnZXRTYWZlUHJvbWlzZTogZnVuY3Rpb24gKGFjdGlvbikge1xuXHRcdHZhciBwcm9taXNlO1xuXHRcdHRyeSB7XG5cdFx0XHRwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKGFjdGlvbigpKTtcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRwcm9taXNlID0gUHJvbWlzZS5yZWplY3QoZSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHByb21pc2U7XG5cdH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gaGVscGVyO1xuXG4vKipcbiAqIEp1c3QgcmV0dXJucyByZXNvbHZlZCBwcm9taXNlLlxuICogQHJldHVybnMge1Byb21pc2V9IFByb21pc2UgZm9yIG5vdGhpbmcuXG4gKi9cbmZ1bmN0aW9uIGRlZmF1bHRQcm9taXNlTWV0aG9kKCkge1xuXHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG59IiwiLypcbiAqIGNhdGJlcnJ5XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0IERlbmlzIFJlY2hrdW5vdiBhbmQgcHJvamVjdCBjb250cmlidXRvcnMuXG4gKlxuICogY2F0YmVycnkncyBsaWNlbnNlIGZvbGxvd3M6XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb25cbiAqIG9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uXG4gKiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sXG4gKiBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLFxuICogcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSxcbiAqIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4gKiBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuICogaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuICogT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKlxuICogVGhpcyBsaWNlbnNlIGFwcGxpZXMgdG8gYWxsIHBhcnRzIG9mIGNhdGJlcnJ5IHRoYXQgYXJlIG5vdCBleHRlcm5hbGx5XG4gKiBtYWludGFpbmVkIGxpYnJhcmllcy5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHQvKipcblx0ICogRGVmaW5lcyByZWFkLW9ubHkgcHJvcGVydHkuXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgT2JqZWN0IHRvIGRlZmluZSBwcm9wZXJ0eSBpbi5cblx0ICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgTmFtZSBvZiB0aGUgcHJvcGVydHkuXG5cdCAqIEBwYXJhbSB7Kn0gdmFsdWUgUHJvcGVydHkgdmFsdWUuXG5cdCAqL1xuXHRkZWZpbmVSZWFkT25seTogZnVuY3Rpb24gKG9iamVjdCwgbmFtZSwgdmFsdWUpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqZWN0LCBuYW1lLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG5cdFx0XHR3cml0YWJsZTogZmFsc2UsXG5cdFx0XHR2YWx1ZTogdmFsdWVcblx0XHR9KTtcblx0fVxufTsiLCIvKlxuICogY2F0YmVycnlcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgRGVuaXMgUmVjaGt1bm92IGFuZCBwcm9qZWN0IGNvbnRyaWJ1dG9ycy5cbiAqXG4gKiBjYXRiZXJyeSdzIGxpY2Vuc2UgZm9sbG93czpcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvblxuICogb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb25cbiAqIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbixcbiAqIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsXG4gKiBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLFxuICogYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbiAqIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4gKiBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4gKiBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqXG4gKiBUaGlzIGxpY2Vuc2UgYXBwbGllcyB0byBhbGwgcGFydHMgb2YgY2F0YmVycnkgdGhhdCBhcmUgbm90IGV4dGVybmFsbHlcbiAqIG1haW50YWluZWQgbGlicmFyaWVzLlxuICovXG5cbid1c2Ugc3RyaWN0JztcbnZhciB1dGlsID0gcmVxdWlyZSgndXRpbCcpLFxuXHRVUkkgPSByZXF1aXJlKCdjYXRiZXJyeS11cmknKS5VUkk7XG5cbnZhciBVUklfUEFUSF9SRVBMQUNFTUVOVF9SRUdfRVhQX1NPVVJDRSA9ICcoW15cXFxcL1xcXFxcXFxcXSopJyxcblx0VVJJX1FVRVJZX1JFUExBQ0VNRU5UX1JFR19FWFBfU09VUkNFID0gJyhbXiY/PV0qKSc7XG5cbnZhciBQQVRIX0VORF9TTEFTSF9SRUdfRVhQID0gLyguKylcXC8oJHxcXD98IykvLFxuXHRFWFBSRVNTSU9OX0VTQ0FQRV9SRUdfRVhQID0gL1tcXC1cXFtcXF1cXHtcXH1cXChcXClcXCpcXCtcXD9cXC5cXFxcXFxeXFwkXFx8XS9nLFxuXHRJREVOVElGSUVSX1JFR19FWFBfU09VUkNFID0gJ1skQS1aX11bXFxcXGRBLVpfJF0qJyxcblx0U1RPUkVfTElTVF9SRUdfRVhQX1NPVVJDRSA9ICcoPzooPzpcXFxcXFxcXFtbIF0qJyArXG5cdFx0J1teXFxcXFtcXFxcXSxdKycgK1xuXHRcdCcoWyBdKixbIF0qJyArXG5cdFx0J1teXFxcXFtcXFxcXSxdKycgK1xuXHRcdCcpKlsgXSpcXFxcXFxcXF0pfCg/OlxcXFxcXFxcW1sgXSpcXFxcXFxcXF0pKT8nLFxuXHRQQVJBTUVURVJfUkVHX0VYUCA9IG5ldyBSZWdFeHAoXG5cdFx0XHQnOicgK1xuXHRcdFx0SURFTlRJRklFUl9SRUdfRVhQX1NPVVJDRSArXG5cdFx0XHRTVE9SRV9MSVNUX1JFR19FWFBfU09VUkNFLCAnZ2knKSxcblx0U0xBU0hFRF9CUkFDS0VUU19SRUdfRVhQID0gL1xcXFxcXFt8XFxcXFxcXS8sXG5cdFNUT1JFX0xJU1RfU0VQQVJBVE9SID0gJywnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0LyoqXG5cdCAqIFJlbW92ZXMgc2xhc2ggZnJvbSB0aGUgZW5kIG9mIFVSSSBwYXRoLlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdXJpUGF0aCBVUkkgcGF0aCB0byBwcm9jZXNzLlxuXHQgKiBAcmV0dXJucyB7c3RyaW5nfVxuXHQgKi9cblx0cmVtb3ZlRW5kU2xhc2g6IGZ1bmN0aW9uICh1cmlQYXRoKSB7XG5cdFx0aWYgKCF1cmlQYXRoIHx8IHR5cGVvZih1cmlQYXRoKSAhPT0gJ3N0cmluZycpIHtcblx0XHRcdHJldHVybiAnJztcblx0XHR9XG5cdFx0aWYgKHVyaVBhdGggPT09ICcvJykge1xuXHRcdFx0cmV0dXJuIHVyaVBhdGg7XG5cdFx0fVxuXHRcdHJldHVybiB1cmlQYXRoLnJlcGxhY2UoUEFUSF9FTkRfU0xBU0hfUkVHX0VYUCwgJyQxJDInKTtcblx0fSxcblx0LyoqXG5cdCAqIEdldHMgVVJJIG1hcHBlciBmcm9tIHRoZSByb3V0ZSBleHByZXNzaW9uIGxpa2Vcblx0ICogL3NvbWUvOmlkW3N0b3JlMSwgc3RvcmUyLCBzdG9yZTNdL2RldGFpbHM/ZmlsdGVyPTpmaWx0ZXJbc3RvcmUzXVxuXHQgKiBAcGFyYW0ge1VSSX0gcm91dGVVcmkgRXhwcmVzc2lvbiB0aGF0IGRlZmluZXMgcm91dGUuXG5cdCAqIEByZXR1cm5zIHt7ZXhwcmVzc2lvbjogUmVnRXhwLCBtYXA6IEZ1bmN0aW9ufX1cblx0ICogVVJJIG1hcHBlciBvYmplY3QuXG5cdCAqL1xuXHRjb21waWxlUm91dGU6IGZ1bmN0aW9uIChyb3V0ZVVyaSkge1xuXHRcdGlmICghcm91dGVVcmkpIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblxuXHRcdC8vIGVzY2FwZSByZWd1bGFyIGV4cHJlc3Npb24gY2hhcmFjdGVyc1xuXHRcdHZhciBlc2NhcGVkID0gcm91dGVVcmkucGF0aC5yZXBsYWNlKFxuXHRcdFx0RVhQUkVTU0lPTl9FU0NBUEVfUkVHX0VYUCwgJ1xcXFwkJidcblx0XHQpO1xuXG5cdFx0Ly8gZ2V0IGFsbCBvY2N1cnJlbmNlcyBvZiByb3V0aW5nIHBhcmFtZXRlcnMgaW4gVVJJIHBhdGhcblx0XHR2YXIgcmVnRXhwU291cmNlID0gJ14nICsgZXNjYXBlZC5yZXBsYWNlKFxuXHRcdFx0XHRcdFBBUkFNRVRFUl9SRUdfRVhQLFxuXHRcdFx0XHRcdFVSSV9QQVRIX1JFUExBQ0VNRU5UX1JFR19FWFBfU09VUkNFKSArICckJyxcblx0XHRcdGV4cHJlc3Npb24gPSBuZXcgUmVnRXhwKHJlZ0V4cFNvdXJjZSwgJ2knKSxcblx0XHRcdHF1ZXJ5TWFwcGVyLFxuXHRcdFx0cGF0aE1hcHBlcixcblx0XHRcdHBhdGhQYXJhbWV0ZXJNYXRjaGVzID0gZXNjYXBlZC5tYXRjaChcblx0XHRcdFx0UEFSQU1FVEVSX1JFR19FWFBcblx0XHRcdCksXG5cdFx0XHRwYXRoUGFyYW1ldGVycyA9IHBhdGhQYXJhbWV0ZXJNYXRjaGVzID9cblx0XHRcdFx0cGF0aFBhcmFtZXRlck1hdGNoZXMubWFwKGdldFBhcmFtZXRlckRlc2NyaXB0b3IpIDogbnVsbDtcblxuXHRcdGlmIChwYXRoUGFyYW1ldGVycykge1xuXHRcdFx0cGF0aE1hcHBlciA9IGNyZWF0ZVVyaVBhdGhNYXBwZXIoZXhwcmVzc2lvbiwgcGF0aFBhcmFtZXRlcnMpO1xuXHRcdH1cblxuXHRcdGlmIChyb3V0ZVVyaS5xdWVyeSkge1xuXHRcdFx0dmFyIHF1ZXJ5UGFyYW1ldGVycyA9IHt9O1xuXHRcdFx0T2JqZWN0LmtleXMocm91dGVVcmkucXVlcnkudmFsdWVzKVxuXHRcdFx0XHQuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuXHRcdFx0XHRcdC8vIGFycmF5cyBpbiByb3V0aW5nIGRlZmluaXRpb25zIGFyZSBub3Qgc3VwcG9ydGVkXG5cdFx0XHRcdFx0aWYgKHV0aWwuaXNBcnJheShyb3V0ZVVyaS5xdWVyeS52YWx1ZXNbbmFtZV0pKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gZXNjYXBlIHJlZ3VsYXIgZXhwcmVzc2lvbiBjaGFyYWN0ZXJzXG5cdFx0XHRcdFx0dmFyIGVzY2FwZWQgPSByb3V0ZVVyaS5xdWVyeS52YWx1ZXNbbmFtZV0ucmVwbGFjZShcblx0XHRcdFx0XHRcdEVYUFJFU1NJT05fRVNDQVBFX1JFR19FWFAsICdcXFxcJCYnXG5cdFx0XHRcdFx0KTtcblxuXHRcdFx0XHRcdC8vIGdldCBhbGwgb2NjdXJyZW5jZXMgb2Ygcm91dGluZyBwYXJhbWV0ZXJzIGluIFVSSSBwYXRoXG5cdFx0XHRcdFx0dmFyIHJlZ0V4cFNvdXJjZSA9ICdeJyArIGVzY2FwZWQucmVwbGFjZShcblx0XHRcdFx0XHRcdFx0UEFSQU1FVEVSX1JFR19FWFAsXG5cdFx0XHRcdFx0XHRcdFVSSV9RVUVSWV9SRVBMQUNFTUVOVF9SRUdfRVhQX1NPVVJDRSkgKyAnJCc7XG5cdFx0XHRcdFx0dmFyIHF1ZXJ5UGFyYW1ldGVyTWF0Y2hlcyA9IGVzY2FwZWQubWF0Y2goXG5cdFx0XHRcdFx0XHRcdFBBUkFNRVRFUl9SRUdfRVhQXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdGlmICghcXVlcnlQYXJhbWV0ZXJNYXRjaGVzIHx8XG5cdFx0XHRcdFx0XHRxdWVyeVBhcmFtZXRlck1hdGNoZXMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0dmFyIHBhcmFtZXRlciA9IGdldFBhcmFtZXRlckRlc2NyaXB0b3IoXG5cdFx0XHRcdFx0XHRxdWVyeVBhcmFtZXRlck1hdGNoZXNbcXVlcnlQYXJhbWV0ZXJNYXRjaGVzLmxlbmd0aCAtIDFdXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHR2YXIgZXhwcmVzc2lvbiA9IG5ldyBSZWdFeHAocmVnRXhwU291cmNlLCAnaScpO1xuXHRcdFx0XHRcdHBhcmFtZXRlci5tYXAgPSBjcmVhdGVVcmlRdWVyeVZhbHVlTWFwcGVyKGV4cHJlc3Npb24pO1xuXHRcdFx0XHRcdHF1ZXJ5UGFyYW1ldGVyc1tuYW1lXSA9IHBhcmFtZXRlcjtcblx0XHRcdFx0fSk7XG5cdFx0XHRxdWVyeU1hcHBlciA9IGNyZWF0ZVVyaVF1ZXJ5TWFwcGVyKHF1ZXJ5UGFyYW1ldGVycyk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHtcblx0XHRcdGV4cHJlc3Npb246IGV4cHJlc3Npb24sXG5cdFx0XHRtYXA6IGZ1bmN0aW9uICh1cmkpIHtcblx0XHRcdFx0dmFyIHN0YXRlID0ge307XG5cdFx0XHRcdGlmIChwYXRoTWFwcGVyKSB7XG5cdFx0XHRcdFx0cGF0aE1hcHBlcih1cmkucGF0aCwgc3RhdGUpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHF1ZXJ5TWFwcGVyICYmIHVyaS5xdWVyeSkge1xuXHRcdFx0XHRcdHF1ZXJ5TWFwcGVyKHVyaS5xdWVyeS52YWx1ZXMsIHN0YXRlKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBzdGF0ZTtcblx0XHRcdH1cblx0XHR9O1xuXHR9XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgbmV3IFVSSSBwYXRoLXRvLXN0YXRlIG9iamVjdCBtYXBwZXIuXG4gKiBAcGFyYW0ge1JlZ0V4cH0gZXhwcmVzc2lvbiBSZWd1bGFyIGV4cHJlc3Npb24gdG8gbWF0Y2ggVVJJIHBhdGguXG4gKiBAcGFyYW0ge0FycmF5fSBwYXJhbWV0ZXJzIExpc3Qgb2YgcGFyYW1ldGVyIGRlc2NyaXB0b3JzLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBVUkkgbWFwcGVyIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBjcmVhdGVVcmlQYXRoTWFwcGVyKGV4cHJlc3Npb24sIHBhcmFtZXRlcnMpIHtcblx0cmV0dXJuIGZ1bmN0aW9uICh1cmlQYXRoLCBzdGF0ZSkge1xuXHRcdHZhciBtYXRjaGVzID0gdXJpUGF0aC5tYXRjaChleHByZXNzaW9uKTtcblx0XHRpZiAoIW1hdGNoZXMgfHwgbWF0Y2hlcy5sZW5ndGggPCAyKSB7XG5cdFx0XHRyZXR1cm4gc3RhdGU7XG5cdFx0fVxuXG5cdFx0Ly8gc3RhcnQgd2l0aCBzZWNvbmQgbWF0Y2ggYmVjYXVzZSBmaXJzdCBtYXRjaCBpcyBhbHdheXNcblx0XHQvLyB0aGUgd2hvbGUgVVJJIHBhdGhcblx0XHRtYXRjaGVzID0gbWF0Y2hlcy5zcGxpY2UoMSk7XG5cblx0XHRwYXJhbWV0ZXJzLmZvckVhY2goZnVuY3Rpb24gKHBhcmFtZXRlciwgaW5kZXgpIHtcblx0XHRcdHZhciB2YWx1ZSA9IG1hdGNoZXNbaW5kZXhdO1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0dmFsdWUgPSBkZWNvZGVVUklDb21wb25lbnQodmFsdWUpO1xuXHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHQvLyBub3RoaW5nIHRvIGRvXG5cdFx0XHR9XG5cdFx0XHRwYXJhbWV0ZXIuc3RvcmVOYW1lcy5mb3JFYWNoKGZ1bmN0aW9uIChzdG9yZU5hbWUpIHtcblx0XHRcdFx0aWYgKCFzdGF0ZVtzdG9yZU5hbWVdKSB7XG5cdFx0XHRcdFx0c3RhdGVbc3RvcmVOYW1lXSA9IHt9O1xuXHRcdFx0XHR9XG5cdFx0XHRcdHN0YXRlW3N0b3JlTmFtZV1bcGFyYW1ldGVyLm5hbWVdID0gdmFsdWU7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIG5ldyBVUkkgcXVlcnktdG8tc3RhdGUgb2JqZWN0IG1hcHBlci5cbiAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbWV0ZXJzIExpc3Qgb2YgcG9zc2libGUgcXVlcnkgcGFyYW1ldGVyIGRlc2NyaXB0b3JzIGJ5XG4gKiBxdWVyeSBwYXJhbWV0ZXIgbmFtZXMuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFVSSSBtYXBwZXIgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZVVyaVF1ZXJ5TWFwcGVyKHBhcmFtZXRlcnMpIHtcblx0cmV0dXJuIGZ1bmN0aW9uIChxdWVyeVZhbHVlcywgc3RhdGUpIHtcblx0XHRxdWVyeVZhbHVlcyA9IHF1ZXJ5VmFsdWVzIHx8IHt9O1xuXG5cdFx0T2JqZWN0LmtleXMocXVlcnlWYWx1ZXMpXG5cdFx0XHQuZm9yRWFjaChmdW5jdGlvbiAocXVlcnlLZXkpIHtcblx0XHRcdFx0dmFyIHBhcmFtZXRlciA9IHBhcmFtZXRlcnNbcXVlcnlLZXldO1xuXHRcdFx0XHRpZiAoIXBhcmFtZXRlcikge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhciB2YWx1ZSA9IHV0aWwuaXNBcnJheShxdWVyeVZhbHVlc1txdWVyeUtleV0pID9cblx0XHRcdFx0XHRcdHF1ZXJ5VmFsdWVzW3F1ZXJ5S2V5XVxuXHRcdFx0XHRcdFx0XHQubWFwKHBhcmFtZXRlci5tYXApXG5cdFx0XHRcdFx0XHRcdC5maWx0ZXIoZnVuY3Rpb24gKHZhbHVlKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHZhbHVlICE9PSBudWxsO1xuXHRcdFx0XHRcdFx0XHR9KSA6XG5cdFx0XHRcdFx0XHRwYXJhbWV0ZXIubWFwKHF1ZXJ5VmFsdWVzW3F1ZXJ5S2V5XSk7XG5cblx0XHRcdFx0aWYgKHZhbHVlID09PSBudWxsKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHBhcmFtZXRlci5zdG9yZU5hbWVzLmZvckVhY2goZnVuY3Rpb24gKHN0b3JlTmFtZSkge1xuXHRcdFx0XHRcdGlmICghc3RhdGVbc3RvcmVOYW1lXSkge1xuXHRcdFx0XHRcdFx0c3RhdGVbc3RvcmVOYW1lXSA9IHt9O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRzdGF0ZVtzdG9yZU5hbWVdW3BhcmFtZXRlci5uYW1lXSA9IHZhbHVlO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHR9O1xufVxuXG4vKipcbiAqIE1hcHMgcXVlcnkgcGFyYW1ldGVyIHZhbHVlIHVzaW5nIHRoZSBwYXJhbWV0ZXJzIGV4cHJlc3Npb24uXG4gKiBAcGFyYW0ge1JlZ0V4cH0gZXhwcmVzc2lvbiBSZWd1bGFyIGV4cHJlc3Npb24gdG8gZ2V0IHBhcmFtZXRlciB2YWx1ZS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gVVJJIHF1ZXJ5IHN0cmluZyBwYXJhbWV0ZXIgdmFsdWUgbWFwcGVyIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBjcmVhdGVVcmlRdWVyeVZhbHVlTWFwcGVyKGV4cHJlc3Npb24pIHtcblx0cmV0dXJuIGZ1bmN0aW9uICh2YWx1ZSkge1xuXHRcdHZhbHVlID0gdmFsdWUudG9TdHJpbmcoKTtcblx0XHR2YXIgbWF0Y2hlcyA9IHZhbHVlLm1hdGNoKGV4cHJlc3Npb24pO1xuXHRcdGlmICghbWF0Y2hlcyB8fCBtYXRjaGVzLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXG5cdFx0Ly8gdGhlIHZhbHVlIGlzIHRoZSBzZWNvbmQgaXRlbSwgdGhlIGZpcnN0IGlzIGEgd2hvbGUgc3RyaW5nXG5cdFx0dmFyIG1hcHBlZFZhbHVlID0gbWF0Y2hlc1ttYXRjaGVzLmxlbmd0aCAtIDFdO1xuXHRcdHRyeSB7XG5cdFx0XHRtYXBwZWRWYWx1ZSA9IGRlY29kZVVSSUNvbXBvbmVudChtYXBwZWRWYWx1ZSk7XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0Ly8gbm90aGluZyB0byBkb1xuXHRcdH1cblxuXHRcdHJldHVybiBtYXBwZWRWYWx1ZTtcblx0fTtcbn1cblxuLyoqXG4gKiBHZXRzIGRlc2NyaXB0aW9uIG9mIHBhcmFtZXRlcnMgZnJvbSBpdHMgZXhwcmVzc2lvbi5cbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXJhbWV0ZXIgUGFyYW1ldGVyIGV4cHJlc3Npb24uXG4gKiBAcmV0dXJucyB7e25hbWU6IHN0cmluZywgc3RvcmVOYW1lczogQXJyYXl9fSBQYXJhbWV0ZXIgZGVzY3JpcHRvci5cbiAqL1xuZnVuY3Rpb24gZ2V0UGFyYW1ldGVyRGVzY3JpcHRvcihwYXJhbWV0ZXIpIHtcblx0dmFyIHBhcnRzID0gcGFyYW1ldGVyLnNwbGl0KFNMQVNIRURfQlJBQ0tFVFNfUkVHX0VYUCk7XG5cblx0cmV0dXJuIHtcblx0XHRuYW1lOiBwYXJ0c1swXVxuXHRcdFx0LnRyaW0oKVxuXHRcdFx0LnN1YnN0cmluZygxKSxcblx0XHRzdG9yZU5hbWVzOiAocGFydHNbMV0gPyBwYXJ0c1sxXSA6ICcnKVxuXHRcdFx0LnNwbGl0KFNUT1JFX0xJU1RfU0VQQVJBVE9SKVxuXHRcdFx0Lm1hcChmdW5jdGlvbiAoc3RvcmVOYW1lKSB7XG5cdFx0XHRcdHJldHVybiBzdG9yZU5hbWUudHJpbSgpO1xuXHRcdFx0fSlcblx0XHRcdC5maWx0ZXIoZnVuY3Rpb24gKHN0b3JlTmFtZSkge1xuXHRcdFx0XHRyZXR1cm4gc3RvcmVOYW1lLmxlbmd0aCA+IDA7XG5cdFx0XHR9KVxuXHR9O1xufSIsIi8qXG4gKiBjYXRiZXJyeVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNCBEZW5pcyBSZWNoa3Vub3YgYW5kIHByb2plY3QgY29udHJpYnV0b3JzLlxuICpcbiAqIGNhdGJlcnJ5J3MgbGljZW5zZSBmb2xsb3dzOlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXG4gKiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvblxuICogZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLFxuICogaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSxcbiAqIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsXG4gKiBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuICogc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbiAqIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1NcbiAqIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICpcbiAqIFRoaXMgbGljZW5zZSBhcHBsaWVzIHRvIGFsbCBwYXJ0cyBvZiBjYXRiZXJyeSB0aGF0IGFyZSBub3QgZXh0ZXJuYWxseVxuICogbWFpbnRhaW5lZCBsaWJyYXJpZXMuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN0YXRlUHJvdmlkZXI7XG5cbnZhciByb3V0ZUhlbHBlciA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9yb3V0ZUhlbHBlcicpLFxuXHRjYXRiZXJyeVVyaSA9IHJlcXVpcmUoJ2NhdGJlcnJ5LXVyaScpLFxuXHRVUkkgPSBjYXRiZXJyeVVyaS5VUkk7XG5cbi8qKlxuICogQ3JlYXRlIG5ldyBpbnN0YW5jZSBvZiB0aGUgc3RhdGUgcHJvdmlkZXIuXG4gKiBAcGFyYW0ge1NlcnZpY2VMb2NhdG9yfSAkc2VydmljZUxvY2F0b3IgU2VydmljZSBsb2NhdG9yXG4gKiB0byByZXNvbHZlIFVSSSBtYXBwZXJzLlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIFN0YXRlUHJvdmlkZXIoJHNlcnZpY2VMb2NhdG9yKSB7XG5cdHRoaXMuX3VyaU1hcHBlcnMgPSBnZXRVcmlNYXBwZXJzKCRzZXJ2aWNlTG9jYXRvcik7XG59XG5cbi8qKlxuICogQ3VycmVudCBsaXN0IG9mIFVSSSBtYXBwZXJzLlxuICogQHR5cGUge0FycmF5fVxuICogQHByaXZhdGVcbiAqL1xuU3RhdGVQcm92aWRlci5wcm90b3R5cGUuX3VyaU1hcHBlcnMgPSBudWxsO1xuXG4vKipcbiAqIEdldHMgc3RhdGUgYnkgc3BlY2lmaWVkIGxvY2F0aW9uIFVSSS5cbiAqIEBwYXJhbSB7VVJJfSBsb2NhdGlvbiBVUkkgbG9jYXRpb24uXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBTdGF0ZSBvYmplY3QuXG4gKi9cblN0YXRlUHJvdmlkZXIucHJvdG90eXBlLmdldFN0YXRlQnlVcmkgPSBmdW5jdGlvbiAobG9jYXRpb24pIHtcblx0aWYgKHRoaXMuX3VyaU1hcHBlcnMubGVuZ3RoID09PSAwKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHRsb2NhdGlvbiA9IGxvY2F0aW9uLmNsb25lKCk7XG5cblx0bG9jYXRpb24ucGF0aCA9IHJvdXRlSGVscGVyLnJlbW92ZUVuZFNsYXNoKGxvY2F0aW9uLnBhdGgpO1xuXHR2YXIgc3RhdGUgPSBnZXRTdGF0ZSh0aGlzLl91cmlNYXBwZXJzLCBsb2NhdGlvbik7XG5cblx0aWYgKCFzdGF0ZSkge1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0Ly8gbWFrZSBzdGF0ZSBvYmplY3QgaW1tdXRhYmxlXG5cdE9iamVjdC5rZXlzKHN0YXRlKVxuXHRcdC5mb3JFYWNoKGZ1bmN0aW9uIChzdG9yZU5hbWUpIHtcblx0XHRcdE9iamVjdC5mcmVlemUoc3RhdGVbc3RvcmVOYW1lXSk7XG5cdFx0fSk7XG5cdE9iamVjdC5mcmVlemUoc3RhdGUpO1xuXG5cdHJldHVybiBzdGF0ZTtcbn07XG5cbi8qKlxuICogR2V0cyBsaXN0IG9mIFVSSSBtYXBwZXJzLlxuICogQHBhcmFtIHtTZXJ2aWNlTG9jYXRvcn0gc2VydmljZUxvY2F0b3IgU2VydmljZSBsb2NhdG9yIHRvIGdldCByb3V0ZVxuICogZGVmaW5pdGlvbnMuXG4gKiBAcmV0dXJucyB7QXJyYXl9IExpc3Qgb2YgVVJJIG1hcHBlcnMuXG4gKi9cbmZ1bmN0aW9uIGdldFVyaU1hcHBlcnMoc2VydmljZUxvY2F0b3IpIHtcblx0dmFyIHVyaU1hcHBlcnMgPSBbXTtcblxuXHRzZXJ2aWNlTG9jYXRvci5yZXNvbHZlQWxsKCdyb3V0ZURlZmluaXRpb24nKVxuXHRcdC5mb3JFYWNoKGZ1bmN0aW9uIChyb3V0ZSkge1xuXHRcdFx0Ly8ganVzdCBjb2xvbi1wYXJhbWV0cml6ZWQgc3RyaW5nXG5cdFx0XHRpZiAodHlwZW9mKHJvdXRlKSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdFx0dmFyIHJvdXRlVXJpID0gbmV3IFVSSShyb3V0ZSk7XG5cdFx0XHRcdHJvdXRlVXJpLnBhdGggPSByb3V0ZUhlbHBlci5yZW1vdmVFbmRTbGFzaChyb3V0ZVVyaS5wYXRoKTtcblx0XHRcdFx0dXJpTWFwcGVycy5wdXNoKHJvdXRlSGVscGVyLmNvbXBpbGVSb3V0ZShyb3V0ZVVyaSkpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIGV4dGVuZGVkIGNvbG9uLXBhcmFtZXRyaXplZCBtYXBwZXJcblx0XHRcdGlmICh0eXBlb2Yocm91dGUpID09PSAnb2JqZWN0JyAmJlxuXHRcdFx0XHQodHlwZW9mKHJvdXRlLmV4cHJlc3Npb24pID09PSAnc3RyaW5nJykgJiZcblx0XHRcdFx0KHJvdXRlLm1hcCBpbnN0YW5jZW9mIEZ1bmN0aW9uKSkge1xuXHRcdFx0XHR2YXIgbWFwcGVyVXJpID0gbmV3IFVSSShyb3V0ZS5leHByZXNzaW9uKTtcblx0XHRcdFx0bWFwcGVyVXJpLnBhdGggPSByb3V0ZUhlbHBlci5yZW1vdmVFbmRTbGFzaChtYXBwZXJVcmkucGF0aCk7XG5cdFx0XHRcdHZhciBtYXBwZXIgPSByb3V0ZUhlbHBlci5jb21waWxlUm91dGUobWFwcGVyVXJpKTtcblx0XHRcdFx0dXJpTWFwcGVycy5wdXNoKHtcblx0XHRcdFx0XHRleHByZXNzaW9uOiBtYXBwZXIuZXhwcmVzc2lvbixcblx0XHRcdFx0XHRtYXA6IGZ1bmN0aW9uICh1cmkpIHtcblx0XHRcdFx0XHRcdHZhciBzdGF0ZSA9IG1hcHBlci5tYXAodXJpKTtcblx0XHRcdFx0XHRcdHJldHVybiByb3V0ZS5tYXAoc3RhdGUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gcmVndWxhciBleHByZXNzaW9uIG1hcHBlclxuXHRcdFx0aWYgKHR5cGVvZihyb3V0ZSkgPT09ICdvYmplY3QnICYmXG5cdFx0XHRcdChyb3V0ZS5leHByZXNzaW9uIGluc3RhbmNlb2YgUmVnRXhwKSAmJlxuXHRcdFx0XHQocm91dGUubWFwIGluc3RhbmNlb2YgRnVuY3Rpb24pKSB7XG5cdFx0XHRcdHVyaU1hcHBlcnMucHVzaChyb3V0ZSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdHJldHVybiB1cmlNYXBwZXJzO1xufVxuXG4vKipcbiAqIEdldHMgc3RhdGUuXG4gKiBAcGFyYW0ge0FycmF5fSB1cmlNYXBwZXJzLlxuICogQHBhcmFtIHtVUkl9IGxvY2F0aW9uLlxuICogQHJldHVybnMge09iamVjdHxudWxsfVxuICovXG5mdW5jdGlvbiBnZXRTdGF0ZSAodXJpTWFwcGVycywgbG9jYXRpb24pIHtcblx0dmFyIHN0YXRlID0gbnVsbDtcblxuXHR1cmlNYXBwZXJzLnNvbWUoZnVuY3Rpb24gKG1hcHBlcikge1xuXHRcdGlmIChtYXBwZXIuZXhwcmVzc2lvbi50ZXN0KGxvY2F0aW9uLnBhdGgpKSB7XG5cdFx0XHRzdGF0ZSA9IG1hcHBlci5tYXAobG9jYXRpb24pIHx8IHt9O1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fSk7XG5cblx0cmV0dXJuIHN0YXRlO1xufSIsIi8qZ2xvYmFsIGRlZmluZTpmYWxzZSByZXF1aXJlOmZhbHNlICovXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpe1xuXHQvLyBJbXBvcnQgRXZlbnRzXG5cdHZhciBldmVudHMgPSByZXF1aXJlKCdldmVudHMnKVxuXG5cdC8vIEV4cG9ydCBEb21haW5cblx0dmFyIGRvbWFpbiA9IHt9XG5cdGRvbWFpbi5jcmVhdGVEb21haW4gPSBkb21haW4uY3JlYXRlID0gZnVuY3Rpb24oKXtcblx0XHR2YXIgZCA9IG5ldyBldmVudHMuRXZlbnRFbWl0dGVyKClcblxuXHRcdGZ1bmN0aW9uIGVtaXRFcnJvcihlKSB7XG5cdFx0XHRkLmVtaXQoJ2Vycm9yJywgZSlcblx0XHR9XG5cblx0XHRkLmFkZCA9IGZ1bmN0aW9uKGVtaXR0ZXIpe1xuXHRcdFx0ZW1pdHRlci5vbignZXJyb3InLCBlbWl0RXJyb3IpXG5cdFx0fVxuXHRcdGQucmVtb3ZlID0gZnVuY3Rpb24oZW1pdHRlcil7XG5cdFx0XHRlbWl0dGVyLnJlbW92ZUxpc3RlbmVyKCdlcnJvcicsIGVtaXRFcnJvcilcblx0XHR9XG5cdFx0ZC5iaW5kID0gZnVuY3Rpb24oZm4pe1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uKCl7XG5cdFx0XHRcdHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKVxuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdGZuLmFwcGx5KG51bGwsIGFyZ3MpXG5cdFx0XHRcdH1cblx0XHRcdFx0Y2F0Y2ggKGVycil7XG5cdFx0XHRcdFx0ZW1pdEVycm9yKGVycilcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRkLmludGVyY2VwdCA9IGZ1bmN0aW9uKGZuKXtcblx0XHRcdHJldHVybiBmdW5jdGlvbihlcnIpe1xuXHRcdFx0XHRpZiAoIGVyciApIHtcblx0XHRcdFx0XHRlbWl0RXJyb3IoZXJyKVxuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKVxuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRmbi5hcHBseShudWxsLCBhcmdzKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRjYXRjaCAoZXJyKXtcblx0XHRcdFx0XHRcdGVtaXRFcnJvcihlcnIpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGQucnVuID0gZnVuY3Rpb24oZm4pe1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0Zm4oKVxuXHRcdFx0fVxuXHRcdFx0Y2F0Y2ggKGVycikge1xuXHRcdFx0XHRlbWl0RXJyb3IoZXJyKVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9O1xuXHRcdGQuZGlzcG9zZSA9IGZ1bmN0aW9uKCl7XG5cdFx0XHR0aGlzLnJlbW92ZUFsbExpc3RlbmVycygpXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH07XG5cdFx0ZC5lbnRlciA9IGQuZXhpdCA9IGZ1bmN0aW9uKCl7XG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH1cblx0XHRyZXR1cm4gZFxuXHR9O1xuXHRyZXR1cm4gZG9tYWluXG59KS5jYWxsKHRoaXMpIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgdGhpcy5fZXZlbnRzID0gdGhpcy5fZXZlbnRzIHx8IHt9O1xuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSB0aGlzLl9tYXhMaXN0ZW5lcnMgfHwgdW5kZWZpbmVkO1xufVxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG5cbi8vIEJhY2t3YXJkcy1jb21wYXQgd2l0aCBub2RlIDAuMTAueFxuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fbWF4TGlzdGVuZXJzID0gdW5kZWZpbmVkO1xuXG4vLyBCeSBkZWZhdWx0IEV2ZW50RW1pdHRlcnMgd2lsbCBwcmludCBhIHdhcm5pbmcgaWYgbW9yZSB0aGFuIDEwIGxpc3RlbmVycyBhcmVcbi8vIGFkZGVkIHRvIGl0LiBUaGlzIGlzIGEgdXNlZnVsIGRlZmF1bHQgd2hpY2ggaGVscHMgZmluZGluZyBtZW1vcnkgbGVha3MuXG5FdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycyA9IDEwO1xuXG4vLyBPYnZpb3VzbHkgbm90IGFsbCBFbWl0dGVycyBzaG91bGQgYmUgbGltaXRlZCB0byAxMC4gVGhpcyBmdW5jdGlvbiBhbGxvd3Ncbi8vIHRoYXQgdG8gYmUgaW5jcmVhc2VkLiBTZXQgdG8gemVybyBmb3IgdW5saW1pdGVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbihuKSB7XG4gIGlmICghaXNOdW1iZXIobikgfHwgbiA8IDAgfHwgaXNOYU4obikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCduIG11c3QgYmUgYSBwb3NpdGl2ZSBudW1iZXInKTtcbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciBlciwgaGFuZGxlciwgbGVuLCBhcmdzLCBpLCBsaXN0ZW5lcnM7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgdGhpcy5fZXZlbnRzID0ge307XG5cbiAgLy8gSWYgdGhlcmUgaXMgbm8gJ2Vycm9yJyBldmVudCBsaXN0ZW5lciB0aGVuIHRocm93LlxuICBpZiAodHlwZSA9PT0gJ2Vycm9yJykge1xuICAgIGlmICghdGhpcy5fZXZlbnRzLmVycm9yIHx8XG4gICAgICAgIChpc09iamVjdCh0aGlzLl9ldmVudHMuZXJyb3IpICYmICF0aGlzLl9ldmVudHMuZXJyb3IubGVuZ3RoKSkge1xuICAgICAgZXIgPSBhcmd1bWVudHNbMV07XG4gICAgICBpZiAoZXIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICB0aHJvdyBlcjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgICAgIH1cbiAgICAgIHRocm93IFR5cGVFcnJvcignVW5jYXVnaHQsIHVuc3BlY2lmaWVkIFwiZXJyb3JcIiBldmVudC4nKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVyID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChpc1VuZGVmaW5lZChoYW5kbGVyKSlcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKGlzRnVuY3Rpb24oaGFuZGxlcikpIHtcbiAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIC8vIGZhc3QgY2FzZXNcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0pO1xuICAgICAgICBicmVhaztcbiAgICAgIC8vIHNsb3dlclxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgICAgYXJncyA9IG5ldyBBcnJheShsZW4gLSAxKTtcbiAgICAgICAgZm9yIChpID0gMTsgaSA8IGxlbjsgaSsrKVxuICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICBoYW5kbGVyLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc09iamVjdChoYW5kbGVyKSkge1xuICAgIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgYXJncyA9IG5ldyBBcnJheShsZW4gLSAxKTtcbiAgICBmb3IgKGkgPSAxOyBpIDwgbGVuOyBpKyspXG4gICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcblxuICAgIGxpc3RlbmVycyA9IGhhbmRsZXIuc2xpY2UoKTtcbiAgICBsZW4gPSBsaXN0ZW5lcnMubGVuZ3RoO1xuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKylcbiAgICAgIGxpc3RlbmVyc1tpXS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBtO1xuXG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcblxuICAvLyBUbyBhdm9pZCByZWN1cnNpb24gaW4gdGhlIGNhc2UgdGhhdCB0eXBlID09PSBcIm5ld0xpc3RlbmVyXCIhIEJlZm9yZVxuICAvLyBhZGRpbmcgaXQgdG8gdGhlIGxpc3RlbmVycywgZmlyc3QgZW1pdCBcIm5ld0xpc3RlbmVyXCIuXG4gIGlmICh0aGlzLl9ldmVudHMubmV3TGlzdGVuZXIpXG4gICAgdGhpcy5lbWl0KCduZXdMaXN0ZW5lcicsIHR5cGUsXG4gICAgICAgICAgICAgIGlzRnVuY3Rpb24obGlzdGVuZXIubGlzdGVuZXIpID9cbiAgICAgICAgICAgICAgbGlzdGVuZXIubGlzdGVuZXIgOiBsaXN0ZW5lcik7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgLy8gT3B0aW1pemUgdGhlIGNhc2Ugb2Ygb25lIGxpc3RlbmVyLiBEb24ndCBuZWVkIHRoZSBleHRyYSBhcnJheSBvYmplY3QuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gbGlzdGVuZXI7XG4gIGVsc2UgaWYgKGlzT2JqZWN0KHRoaXMuX2V2ZW50c1t0eXBlXSkpXG4gICAgLy8gSWYgd2UndmUgYWxyZWFkeSBnb3QgYW4gYXJyYXksIGp1c3QgYXBwZW5kLlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXS5wdXNoKGxpc3RlbmVyKTtcbiAgZWxzZVxuICAgIC8vIEFkZGluZyB0aGUgc2Vjb25kIGVsZW1lbnQsIG5lZWQgdG8gY2hhbmdlIHRvIGFycmF5LlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IFt0aGlzLl9ldmVudHNbdHlwZV0sIGxpc3RlbmVyXTtcblxuICAvLyBDaGVjayBmb3IgbGlzdGVuZXIgbGVha1xuICBpZiAoaXNPYmplY3QodGhpcy5fZXZlbnRzW3R5cGVdKSAmJiAhdGhpcy5fZXZlbnRzW3R5cGVdLndhcm5lZCkge1xuICAgIHZhciBtO1xuICAgIGlmICghaXNVbmRlZmluZWQodGhpcy5fbWF4TGlzdGVuZXJzKSkge1xuICAgICAgbSA9IHRoaXMuX21heExpc3RlbmVycztcbiAgICB9IGVsc2Uge1xuICAgICAgbSA9IEV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzO1xuICAgIH1cblxuICAgIGlmIChtICYmIG0gPiAwICYmIHRoaXMuX2V2ZW50c1t0eXBlXS5sZW5ndGggPiBtKSB7XG4gICAgICB0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkID0gdHJ1ZTtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJyhub2RlKSB3YXJuaW5nOiBwb3NzaWJsZSBFdmVudEVtaXR0ZXIgbWVtb3J5ICcgK1xuICAgICAgICAgICAgICAgICAgICAnbGVhayBkZXRlY3RlZC4gJWQgbGlzdGVuZXJzIGFkZGVkLiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1VzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvIGluY3JlYXNlIGxpbWl0LicsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS5sZW5ndGgpO1xuICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLnRyYWNlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIC8vIG5vdCBzdXBwb3J0ZWQgaW4gSUUgMTBcbiAgICAgICAgY29uc29sZS50cmFjZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICB2YXIgZmlyZWQgPSBmYWxzZTtcblxuICBmdW5jdGlvbiBnKCkge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgZyk7XG5cbiAgICBpZiAoIWZpcmVkKSB7XG4gICAgICBmaXJlZCA9IHRydWU7XG4gICAgICBsaXN0ZW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgfVxuXG4gIGcubGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgdGhpcy5vbih0eXBlLCBnKTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8vIGVtaXRzIGEgJ3JlbW92ZUxpc3RlbmVyJyBldmVudCBpZmYgdGhlIGxpc3RlbmVyIHdhcyByZW1vdmVkXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIGxpc3QsIHBvc2l0aW9uLCBsZW5ndGgsIGk7XG5cbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzIHx8ICF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgbGlzdCA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgbGVuZ3RoID0gbGlzdC5sZW5ndGg7XG4gIHBvc2l0aW9uID0gLTE7XG5cbiAgaWYgKGxpc3QgPT09IGxpc3RlbmVyIHx8XG4gICAgICAoaXNGdW5jdGlvbihsaXN0Lmxpc3RlbmVyKSAmJiBsaXN0Lmxpc3RlbmVyID09PSBsaXN0ZW5lcikpIHtcbiAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIGlmICh0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdGVuZXIpO1xuXG4gIH0gZWxzZSBpZiAoaXNPYmplY3QobGlzdCkpIHtcbiAgICBmb3IgKGkgPSBsZW5ndGg7IGktLSA+IDA7KSB7XG4gICAgICBpZiAobGlzdFtpXSA9PT0gbGlzdGVuZXIgfHxcbiAgICAgICAgICAobGlzdFtpXS5saXN0ZW5lciAmJiBsaXN0W2ldLmxpc3RlbmVyID09PSBsaXN0ZW5lcikpIHtcbiAgICAgICAgcG9zaXRpb24gPSBpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocG9zaXRpb24gPCAwKVxuICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICBpZiAobGlzdC5sZW5ndGggPT09IDEpIHtcbiAgICAgIGxpc3QubGVuZ3RoID0gMDtcbiAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpc3Quc3BsaWNlKHBvc2l0aW9uLCAxKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3RlbmVyKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciBrZXksIGxpc3RlbmVycztcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICByZXR1cm4gdGhpcztcblxuICAvLyBub3QgbGlzdGVuaW5nIGZvciByZW1vdmVMaXN0ZW5lciwgbm8gbmVlZCB0byBlbWl0XG4gIGlmICghdGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApXG4gICAgICB0aGlzLl9ldmVudHMgPSB7fTtcbiAgICBlbHNlIGlmICh0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gZW1pdCByZW1vdmVMaXN0ZW5lciBmb3IgYWxsIGxpc3RlbmVycyBvbiBhbGwgZXZlbnRzXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgZm9yIChrZXkgaW4gdGhpcy5fZXZlbnRzKSB7XG4gICAgICBpZiAoa2V5ID09PSAncmVtb3ZlTGlzdGVuZXInKSBjb250aW51ZTtcbiAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKGtleSk7XG4gICAgfVxuICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCdyZW1vdmVMaXN0ZW5lcicpO1xuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChpc0Z1bmN0aW9uKGxpc3RlbmVycykpIHtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVycyk7XG4gIH0gZWxzZSB7XG4gICAgLy8gTElGTyBvcmRlclxuICAgIHdoaWxlIChsaXN0ZW5lcnMubGVuZ3RoKVxuICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnNbbGlzdGVuZXJzLmxlbmd0aCAtIDFdKTtcbiAgfVxuICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciByZXQ7XG4gIGlmICghdGhpcy5fZXZlbnRzIHx8ICF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgcmV0ID0gW107XG4gIGVsc2UgaWYgKGlzRnVuY3Rpb24odGhpcy5fZXZlbnRzW3R5cGVdKSlcbiAgICByZXQgPSBbdGhpcy5fZXZlbnRzW3R5cGVdXTtcbiAgZWxzZVxuICAgIHJldCA9IHRoaXMuX2V2ZW50c1t0eXBlXS5zbGljZSgpO1xuICByZXR1cm4gcmV0O1xufTtcblxuRXZlbnRFbWl0dGVyLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbihlbWl0dGVyLCB0eXBlKSB7XG4gIHZhciByZXQ7XG4gIGlmICghZW1pdHRlci5fZXZlbnRzIHx8ICFlbWl0dGVyLl9ldmVudHNbdHlwZV0pXG4gICAgcmV0ID0gMDtcbiAgZWxzZSBpZiAoaXNGdW5jdGlvbihlbWl0dGVyLl9ldmVudHNbdHlwZV0pKVxuICAgIHJldCA9IDE7XG4gIGVsc2VcbiAgICByZXQgPSBlbWl0dGVyLl9ldmVudHNbdHlwZV0ubGVuZ3RoO1xuICByZXR1cm4gcmV0O1xufTtcblxuZnVuY3Rpb24gaXNGdW5jdGlvbihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdmdW5jdGlvbic7XG59XG5cbmZ1bmN0aW9uIGlzTnVtYmVyKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ251bWJlcic7XG59XG5cbmZ1bmN0aW9uIGlzT2JqZWN0KGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ29iamVjdCcgJiYgYXJnICE9PSBudWxsO1xufVxuXG5mdW5jdGlvbiBpc1VuZGVmaW5lZChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gdm9pZCAwO1xufVxuIiwiaWYgKHR5cGVvZiBPYmplY3QuY3JlYXRlID09PSAnZnVuY3Rpb24nKSB7XG4gIC8vIGltcGxlbWVudGF0aW9uIGZyb20gc3RhbmRhcmQgbm9kZS5qcyAndXRpbCcgbW9kdWxlXG4gIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaW5oZXJpdHMoY3Rvciwgc3VwZXJDdG9yKSB7XG4gICAgY3Rvci5zdXBlcl8gPSBzdXBlckN0b3JcbiAgICBjdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDdG9yLnByb3RvdHlwZSwge1xuICAgICAgY29uc3RydWN0b3I6IHtcbiAgICAgICAgdmFsdWU6IGN0b3IsXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICB9XG4gICAgfSk7XG4gIH07XG59IGVsc2Uge1xuICAvLyBvbGQgc2Nob29sIHNoaW0gZm9yIG9sZCBicm93c2Vyc1xuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGluaGVyaXRzKGN0b3IsIHN1cGVyQ3Rvcikge1xuICAgIGN0b3Iuc3VwZXJfID0gc3VwZXJDdG9yXG4gICAgdmFyIFRlbXBDdG9yID0gZnVuY3Rpb24gKCkge31cbiAgICBUZW1wQ3Rvci5wcm90b3R5cGUgPSBzdXBlckN0b3IucHJvdG90eXBlXG4gICAgY3Rvci5wcm90b3R5cGUgPSBuZXcgVGVtcEN0b3IoKVxuICAgIGN0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY3RvclxuICB9XG59XG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcblxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAoIWRyYWluaW5nKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZHJhaW5RdWV1ZSwgMCk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG4vLyBUT0RPKHNodHlsbWFuKVxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0J1ZmZlcihhcmcpIHtcbiAgcmV0dXJuIGFyZyAmJiB0eXBlb2YgYXJnID09PSAnb2JqZWN0J1xuICAgICYmIHR5cGVvZiBhcmcuY29weSA9PT0gJ2Z1bmN0aW9uJ1xuICAgICYmIHR5cGVvZiBhcmcuZmlsbCA9PT0gJ2Z1bmN0aW9uJ1xuICAgICYmIHR5cGVvZiBhcmcucmVhZFVJbnQ4ID09PSAnZnVuY3Rpb24nO1xufSIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG52YXIgZm9ybWF0UmVnRXhwID0gLyVbc2RqJV0vZztcbmV4cG9ydHMuZm9ybWF0ID0gZnVuY3Rpb24oZikge1xuICBpZiAoIWlzU3RyaW5nKGYpKSB7XG4gICAgdmFyIG9iamVjdHMgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgb2JqZWN0cy5wdXNoKGluc3BlY3QoYXJndW1lbnRzW2ldKSk7XG4gICAgfVxuICAgIHJldHVybiBvYmplY3RzLmpvaW4oJyAnKTtcbiAgfVxuXG4gIHZhciBpID0gMTtcbiAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gIHZhciBsZW4gPSBhcmdzLmxlbmd0aDtcbiAgdmFyIHN0ciA9IFN0cmluZyhmKS5yZXBsYWNlKGZvcm1hdFJlZ0V4cCwgZnVuY3Rpb24oeCkge1xuICAgIGlmICh4ID09PSAnJSUnKSByZXR1cm4gJyUnO1xuICAgIGlmIChpID49IGxlbikgcmV0dXJuIHg7XG4gICAgc3dpdGNoICh4KSB7XG4gICAgICBjYXNlICclcyc6IHJldHVybiBTdHJpbmcoYXJnc1tpKytdKTtcbiAgICAgIGNhc2UgJyVkJzogcmV0dXJuIE51bWJlcihhcmdzW2krK10pO1xuICAgICAgY2FzZSAnJWonOlxuICAgICAgICB0cnkge1xuICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShhcmdzW2krK10pO1xuICAgICAgICB9IGNhdGNoIChfKSB7XG4gICAgICAgICAgcmV0dXJuICdbQ2lyY3VsYXJdJztcbiAgICAgICAgfVxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHg7XG4gICAgfVxuICB9KTtcbiAgZm9yICh2YXIgeCA9IGFyZ3NbaV07IGkgPCBsZW47IHggPSBhcmdzWysraV0pIHtcbiAgICBpZiAoaXNOdWxsKHgpIHx8ICFpc09iamVjdCh4KSkge1xuICAgICAgc3RyICs9ICcgJyArIHg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0ciArPSAnICcgKyBpbnNwZWN0KHgpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gc3RyO1xufTtcblxuXG4vLyBNYXJrIHRoYXQgYSBtZXRob2Qgc2hvdWxkIG5vdCBiZSB1c2VkLlxuLy8gUmV0dXJucyBhIG1vZGlmaWVkIGZ1bmN0aW9uIHdoaWNoIHdhcm5zIG9uY2UgYnkgZGVmYXVsdC5cbi8vIElmIC0tbm8tZGVwcmVjYXRpb24gaXMgc2V0LCB0aGVuIGl0IGlzIGEgbm8tb3AuXG5leHBvcnRzLmRlcHJlY2F0ZSA9IGZ1bmN0aW9uKGZuLCBtc2cpIHtcbiAgLy8gQWxsb3cgZm9yIGRlcHJlY2F0aW5nIHRoaW5ncyBpbiB0aGUgcHJvY2VzcyBvZiBzdGFydGluZyB1cC5cbiAgaWYgKGlzVW5kZWZpbmVkKGdsb2JhbC5wcm9jZXNzKSkge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBleHBvcnRzLmRlcHJlY2F0ZShmbiwgbXNnKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH1cblxuICBpZiAocHJvY2Vzcy5ub0RlcHJlY2F0aW9uID09PSB0cnVlKSB7XG4gICAgcmV0dXJuIGZuO1xuICB9XG5cbiAgdmFyIHdhcm5lZCA9IGZhbHNlO1xuICBmdW5jdGlvbiBkZXByZWNhdGVkKCkge1xuICAgIGlmICghd2FybmVkKSB7XG4gICAgICBpZiAocHJvY2Vzcy50aHJvd0RlcHJlY2F0aW9uKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICAgICAgfSBlbHNlIGlmIChwcm9jZXNzLnRyYWNlRGVwcmVjYXRpb24pIHtcbiAgICAgICAgY29uc29sZS50cmFjZShtc2cpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihtc2cpO1xuICAgICAgfVxuICAgICAgd2FybmVkID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICByZXR1cm4gZGVwcmVjYXRlZDtcbn07XG5cblxudmFyIGRlYnVncyA9IHt9O1xudmFyIGRlYnVnRW52aXJvbjtcbmV4cG9ydHMuZGVidWdsb2cgPSBmdW5jdGlvbihzZXQpIHtcbiAgaWYgKGlzVW5kZWZpbmVkKGRlYnVnRW52aXJvbikpXG4gICAgZGVidWdFbnZpcm9uID0gcHJvY2Vzcy5lbnYuTk9ERV9ERUJVRyB8fCAnJztcbiAgc2V0ID0gc2V0LnRvVXBwZXJDYXNlKCk7XG4gIGlmICghZGVidWdzW3NldF0pIHtcbiAgICBpZiAobmV3IFJlZ0V4cCgnXFxcXGInICsgc2V0ICsgJ1xcXFxiJywgJ2knKS50ZXN0KGRlYnVnRW52aXJvbikpIHtcbiAgICAgIHZhciBwaWQgPSBwcm9jZXNzLnBpZDtcbiAgICAgIGRlYnVnc1tzZXRdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBtc2cgPSBleHBvcnRzLmZvcm1hdC5hcHBseShleHBvcnRzLCBhcmd1bWVudHMpO1xuICAgICAgICBjb25zb2xlLmVycm9yKCclcyAlZDogJXMnLCBzZXQsIHBpZCwgbXNnKTtcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlYnVnc1tzZXRdID0gZnVuY3Rpb24oKSB7fTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGRlYnVnc1tzZXRdO1xufTtcblxuXG4vKipcbiAqIEVjaG9zIHRoZSB2YWx1ZSBvZiBhIHZhbHVlLiBUcnlzIHRvIHByaW50IHRoZSB2YWx1ZSBvdXRcbiAqIGluIHRoZSBiZXN0IHdheSBwb3NzaWJsZSBnaXZlbiB0aGUgZGlmZmVyZW50IHR5cGVzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogVGhlIG9iamVjdCB0byBwcmludCBvdXQuXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0cyBPcHRpb25hbCBvcHRpb25zIG9iamVjdCB0aGF0IGFsdGVycyB0aGUgb3V0cHV0LlxuICovXG4vKiBsZWdhY3k6IG9iaiwgc2hvd0hpZGRlbiwgZGVwdGgsIGNvbG9ycyovXG5mdW5jdGlvbiBpbnNwZWN0KG9iaiwgb3B0cykge1xuICAvLyBkZWZhdWx0IG9wdGlvbnNcbiAgdmFyIGN0eCA9IHtcbiAgICBzZWVuOiBbXSxcbiAgICBzdHlsaXplOiBzdHlsaXplTm9Db2xvclxuICB9O1xuICAvLyBsZWdhY3kuLi5cbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPj0gMykgY3R4LmRlcHRoID0gYXJndW1lbnRzWzJdO1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+PSA0KSBjdHguY29sb3JzID0gYXJndW1lbnRzWzNdO1xuICBpZiAoaXNCb29sZWFuKG9wdHMpKSB7XG4gICAgLy8gbGVnYWN5Li4uXG4gICAgY3R4LnNob3dIaWRkZW4gPSBvcHRzO1xuICB9IGVsc2UgaWYgKG9wdHMpIHtcbiAgICAvLyBnb3QgYW4gXCJvcHRpb25zXCIgb2JqZWN0XG4gICAgZXhwb3J0cy5fZXh0ZW5kKGN0eCwgb3B0cyk7XG4gIH1cbiAgLy8gc2V0IGRlZmF1bHQgb3B0aW9uc1xuICBpZiAoaXNVbmRlZmluZWQoY3R4LnNob3dIaWRkZW4pKSBjdHguc2hvd0hpZGRlbiA9IGZhbHNlO1xuICBpZiAoaXNVbmRlZmluZWQoY3R4LmRlcHRoKSkgY3R4LmRlcHRoID0gMjtcbiAgaWYgKGlzVW5kZWZpbmVkKGN0eC5jb2xvcnMpKSBjdHguY29sb3JzID0gZmFsc2U7XG4gIGlmIChpc1VuZGVmaW5lZChjdHguY3VzdG9tSW5zcGVjdCkpIGN0eC5jdXN0b21JbnNwZWN0ID0gdHJ1ZTtcbiAgaWYgKGN0eC5jb2xvcnMpIGN0eC5zdHlsaXplID0gc3R5bGl6ZVdpdGhDb2xvcjtcbiAgcmV0dXJuIGZvcm1hdFZhbHVlKGN0eCwgb2JqLCBjdHguZGVwdGgpO1xufVxuZXhwb3J0cy5pbnNwZWN0ID0gaW5zcGVjdDtcblxuXG4vLyBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0FOU0lfZXNjYXBlX2NvZGUjZ3JhcGhpY3Ncbmluc3BlY3QuY29sb3JzID0ge1xuICAnYm9sZCcgOiBbMSwgMjJdLFxuICAnaXRhbGljJyA6IFszLCAyM10sXG4gICd1bmRlcmxpbmUnIDogWzQsIDI0XSxcbiAgJ2ludmVyc2UnIDogWzcsIDI3XSxcbiAgJ3doaXRlJyA6IFszNywgMzldLFxuICAnZ3JleScgOiBbOTAsIDM5XSxcbiAgJ2JsYWNrJyA6IFszMCwgMzldLFxuICAnYmx1ZScgOiBbMzQsIDM5XSxcbiAgJ2N5YW4nIDogWzM2LCAzOV0sXG4gICdncmVlbicgOiBbMzIsIDM5XSxcbiAgJ21hZ2VudGEnIDogWzM1LCAzOV0sXG4gICdyZWQnIDogWzMxLCAzOV0sXG4gICd5ZWxsb3cnIDogWzMzLCAzOV1cbn07XG5cbi8vIERvbid0IHVzZSAnYmx1ZScgbm90IHZpc2libGUgb24gY21kLmV4ZVxuaW5zcGVjdC5zdHlsZXMgPSB7XG4gICdzcGVjaWFsJzogJ2N5YW4nLFxuICAnbnVtYmVyJzogJ3llbGxvdycsXG4gICdib29sZWFuJzogJ3llbGxvdycsXG4gICd1bmRlZmluZWQnOiAnZ3JleScsXG4gICdudWxsJzogJ2JvbGQnLFxuICAnc3RyaW5nJzogJ2dyZWVuJyxcbiAgJ2RhdGUnOiAnbWFnZW50YScsXG4gIC8vIFwibmFtZVwiOiBpbnRlbnRpb25hbGx5IG5vdCBzdHlsaW5nXG4gICdyZWdleHAnOiAncmVkJ1xufTtcblxuXG5mdW5jdGlvbiBzdHlsaXplV2l0aENvbG9yKHN0ciwgc3R5bGVUeXBlKSB7XG4gIHZhciBzdHlsZSA9IGluc3BlY3Quc3R5bGVzW3N0eWxlVHlwZV07XG5cbiAgaWYgKHN0eWxlKSB7XG4gICAgcmV0dXJuICdcXHUwMDFiWycgKyBpbnNwZWN0LmNvbG9yc1tzdHlsZV1bMF0gKyAnbScgKyBzdHIgK1xuICAgICAgICAgICAnXFx1MDAxYlsnICsgaW5zcGVjdC5jb2xvcnNbc3R5bGVdWzFdICsgJ20nO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBzdHI7XG4gIH1cbn1cblxuXG5mdW5jdGlvbiBzdHlsaXplTm9Db2xvcihzdHIsIHN0eWxlVHlwZSkge1xuICByZXR1cm4gc3RyO1xufVxuXG5cbmZ1bmN0aW9uIGFycmF5VG9IYXNoKGFycmF5KSB7XG4gIHZhciBoYXNoID0ge307XG5cbiAgYXJyYXkuZm9yRWFjaChmdW5jdGlvbih2YWwsIGlkeCkge1xuICAgIGhhc2hbdmFsXSA9IHRydWU7XG4gIH0pO1xuXG4gIHJldHVybiBoYXNoO1xufVxuXG5cbmZ1bmN0aW9uIGZvcm1hdFZhbHVlKGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcykge1xuICAvLyBQcm92aWRlIGEgaG9vayBmb3IgdXNlci1zcGVjaWZpZWQgaW5zcGVjdCBmdW5jdGlvbnMuXG4gIC8vIENoZWNrIHRoYXQgdmFsdWUgaXMgYW4gb2JqZWN0IHdpdGggYW4gaW5zcGVjdCBmdW5jdGlvbiBvbiBpdFxuICBpZiAoY3R4LmN1c3RvbUluc3BlY3QgJiZcbiAgICAgIHZhbHVlICYmXG4gICAgICBpc0Z1bmN0aW9uKHZhbHVlLmluc3BlY3QpICYmXG4gICAgICAvLyBGaWx0ZXIgb3V0IHRoZSB1dGlsIG1vZHVsZSwgaXQncyBpbnNwZWN0IGZ1bmN0aW9uIGlzIHNwZWNpYWxcbiAgICAgIHZhbHVlLmluc3BlY3QgIT09IGV4cG9ydHMuaW5zcGVjdCAmJlxuICAgICAgLy8gQWxzbyBmaWx0ZXIgb3V0IGFueSBwcm90b3R5cGUgb2JqZWN0cyB1c2luZyB0aGUgY2lyY3VsYXIgY2hlY2suXG4gICAgICAhKHZhbHVlLmNvbnN0cnVjdG9yICYmIHZhbHVlLmNvbnN0cnVjdG9yLnByb3RvdHlwZSA9PT0gdmFsdWUpKSB7XG4gICAgdmFyIHJldCA9IHZhbHVlLmluc3BlY3QocmVjdXJzZVRpbWVzLCBjdHgpO1xuICAgIGlmICghaXNTdHJpbmcocmV0KSkge1xuICAgICAgcmV0ID0gZm9ybWF0VmFsdWUoY3R4LCByZXQsIHJlY3Vyc2VUaW1lcyk7XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG4gIH1cblxuICAvLyBQcmltaXRpdmUgdHlwZXMgY2Fubm90IGhhdmUgcHJvcGVydGllc1xuICB2YXIgcHJpbWl0aXZlID0gZm9ybWF0UHJpbWl0aXZlKGN0eCwgdmFsdWUpO1xuICBpZiAocHJpbWl0aXZlKSB7XG4gICAgcmV0dXJuIHByaW1pdGl2ZTtcbiAgfVxuXG4gIC8vIExvb2sgdXAgdGhlIGtleXMgb2YgdGhlIG9iamVjdC5cbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyh2YWx1ZSk7XG4gIHZhciB2aXNpYmxlS2V5cyA9IGFycmF5VG9IYXNoKGtleXMpO1xuXG4gIGlmIChjdHguc2hvd0hpZGRlbikge1xuICAgIGtleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh2YWx1ZSk7XG4gIH1cblxuICAvLyBJRSBkb2Vzbid0IG1ha2UgZXJyb3IgZmllbGRzIG5vbi1lbnVtZXJhYmxlXG4gIC8vIGh0dHA6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9pZS9kd3c1MnNidCh2PXZzLjk0KS5hc3B4XG4gIGlmIChpc0Vycm9yKHZhbHVlKVxuICAgICAgJiYgKGtleXMuaW5kZXhPZignbWVzc2FnZScpID49IDAgfHwga2V5cy5pbmRleE9mKCdkZXNjcmlwdGlvbicpID49IDApKSB7XG4gICAgcmV0dXJuIGZvcm1hdEVycm9yKHZhbHVlKTtcbiAgfVxuXG4gIC8vIFNvbWUgdHlwZSBvZiBvYmplY3Qgd2l0aG91dCBwcm9wZXJ0aWVzIGNhbiBiZSBzaG9ydGN1dHRlZC5cbiAgaWYgKGtleXMubGVuZ3RoID09PSAwKSB7XG4gICAgaWYgKGlzRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgICB2YXIgbmFtZSA9IHZhbHVlLm5hbWUgPyAnOiAnICsgdmFsdWUubmFtZSA6ICcnO1xuICAgICAgcmV0dXJuIGN0eC5zdHlsaXplKCdbRnVuY3Rpb24nICsgbmFtZSArICddJywgJ3NwZWNpYWwnKTtcbiAgICB9XG4gICAgaWYgKGlzUmVnRXhwKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGN0eC5zdHlsaXplKFJlZ0V4cC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSksICdyZWdleHAnKTtcbiAgICB9XG4gICAgaWYgKGlzRGF0ZSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZShEYXRlLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSwgJ2RhdGUnKTtcbiAgICB9XG4gICAgaWYgKGlzRXJyb3IodmFsdWUpKSB7XG4gICAgICByZXR1cm4gZm9ybWF0RXJyb3IodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBiYXNlID0gJycsIGFycmF5ID0gZmFsc2UsIGJyYWNlcyA9IFsneycsICd9J107XG5cbiAgLy8gTWFrZSBBcnJheSBzYXkgdGhhdCB0aGV5IGFyZSBBcnJheVxuICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICBhcnJheSA9IHRydWU7XG4gICAgYnJhY2VzID0gWydbJywgJ10nXTtcbiAgfVxuXG4gIC8vIE1ha2UgZnVuY3Rpb25zIHNheSB0aGF0IHRoZXkgYXJlIGZ1bmN0aW9uc1xuICBpZiAoaXNGdW5jdGlvbih2YWx1ZSkpIHtcbiAgICB2YXIgbiA9IHZhbHVlLm5hbWUgPyAnOiAnICsgdmFsdWUubmFtZSA6ICcnO1xuICAgIGJhc2UgPSAnIFtGdW5jdGlvbicgKyBuICsgJ10nO1xuICB9XG5cbiAgLy8gTWFrZSBSZWdFeHBzIHNheSB0aGF0IHRoZXkgYXJlIFJlZ0V4cHNcbiAgaWYgKGlzUmVnRXhwKHZhbHVlKSkge1xuICAgIGJhc2UgPSAnICcgKyBSZWdFeHAucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpO1xuICB9XG5cbiAgLy8gTWFrZSBkYXRlcyB3aXRoIHByb3BlcnRpZXMgZmlyc3Qgc2F5IHRoZSBkYXRlXG4gIGlmIChpc0RhdGUodmFsdWUpKSB7XG4gICAgYmFzZSA9ICcgJyArIERhdGUucHJvdG90eXBlLnRvVVRDU3RyaW5nLmNhbGwodmFsdWUpO1xuICB9XG5cbiAgLy8gTWFrZSBlcnJvciB3aXRoIG1lc3NhZ2UgZmlyc3Qgc2F5IHRoZSBlcnJvclxuICBpZiAoaXNFcnJvcih2YWx1ZSkpIHtcbiAgICBiYXNlID0gJyAnICsgZm9ybWF0RXJyb3IodmFsdWUpO1xuICB9XG5cbiAgaWYgKGtleXMubGVuZ3RoID09PSAwICYmICghYXJyYXkgfHwgdmFsdWUubGVuZ3RoID09IDApKSB7XG4gICAgcmV0dXJuIGJyYWNlc1swXSArIGJhc2UgKyBicmFjZXNbMV07XG4gIH1cblxuICBpZiAocmVjdXJzZVRpbWVzIDwgMCkge1xuICAgIGlmIChpc1JlZ0V4cCh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZShSZWdFeHAucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpLCAncmVnZXhwJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZSgnW09iamVjdF0nLCAnc3BlY2lhbCcpO1xuICAgIH1cbiAgfVxuXG4gIGN0eC5zZWVuLnB1c2godmFsdWUpO1xuXG4gIHZhciBvdXRwdXQ7XG4gIGlmIChhcnJheSkge1xuICAgIG91dHB1dCA9IGZvcm1hdEFycmF5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsIGtleXMpO1xuICB9IGVsc2Uge1xuICAgIG91dHB1dCA9IGtleXMubWFwKGZ1bmN0aW9uKGtleSkge1xuICAgICAgcmV0dXJuIGZvcm1hdFByb3BlcnR5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsIGtleSwgYXJyYXkpO1xuICAgIH0pO1xuICB9XG5cbiAgY3R4LnNlZW4ucG9wKCk7XG5cbiAgcmV0dXJuIHJlZHVjZVRvU2luZ2xlU3RyaW5nKG91dHB1dCwgYmFzZSwgYnJhY2VzKTtcbn1cblxuXG5mdW5jdGlvbiBmb3JtYXRQcmltaXRpdmUoY3R4LCB2YWx1ZSkge1xuICBpZiAoaXNVbmRlZmluZWQodmFsdWUpKVxuICAgIHJldHVybiBjdHguc3R5bGl6ZSgndW5kZWZpbmVkJywgJ3VuZGVmaW5lZCcpO1xuICBpZiAoaXNTdHJpbmcodmFsdWUpKSB7XG4gICAgdmFyIHNpbXBsZSA9ICdcXCcnICsgSlNPTi5zdHJpbmdpZnkodmFsdWUpLnJlcGxhY2UoL15cInxcIiQvZywgJycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvJy9nLCBcIlxcXFwnXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFxcXFwiL2csICdcIicpICsgJ1xcJyc7XG4gICAgcmV0dXJuIGN0eC5zdHlsaXplKHNpbXBsZSwgJ3N0cmluZycpO1xuICB9XG4gIGlmIChpc051bWJlcih2YWx1ZSkpXG4gICAgcmV0dXJuIGN0eC5zdHlsaXplKCcnICsgdmFsdWUsICdudW1iZXInKTtcbiAgaWYgKGlzQm9vbGVhbih2YWx1ZSkpXG4gICAgcmV0dXJuIGN0eC5zdHlsaXplKCcnICsgdmFsdWUsICdib29sZWFuJyk7XG4gIC8vIEZvciBzb21lIHJlYXNvbiB0eXBlb2YgbnVsbCBpcyBcIm9iamVjdFwiLCBzbyBzcGVjaWFsIGNhc2UgaGVyZS5cbiAgaWYgKGlzTnVsbCh2YWx1ZSkpXG4gICAgcmV0dXJuIGN0eC5zdHlsaXplKCdudWxsJywgJ251bGwnKTtcbn1cblxuXG5mdW5jdGlvbiBmb3JtYXRFcnJvcih2YWx1ZSkge1xuICByZXR1cm4gJ1snICsgRXJyb3IucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpICsgJ10nO1xufVxuXG5cbmZ1bmN0aW9uIGZvcm1hdEFycmF5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsIGtleXMpIHtcbiAgdmFyIG91dHB1dCA9IFtdO1xuICBmb3IgKHZhciBpID0gMCwgbCA9IHZhbHVlLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgIGlmIChoYXNPd25Qcm9wZXJ0eSh2YWx1ZSwgU3RyaW5nKGkpKSkge1xuICAgICAgb3V0cHV0LnB1c2goZm9ybWF0UHJvcGVydHkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cyxcbiAgICAgICAgICBTdHJpbmcoaSksIHRydWUpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3V0cHV0LnB1c2goJycpO1xuICAgIH1cbiAgfVxuICBrZXlzLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG4gICAgaWYgKCFrZXkubWF0Y2goL15cXGQrJC8pKSB7XG4gICAgICBvdXRwdXQucHVzaChmb3JtYXRQcm9wZXJ0eShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLFxuICAgICAgICAgIGtleSwgdHJ1ZSkpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBvdXRwdXQ7XG59XG5cblxuZnVuY3Rpb24gZm9ybWF0UHJvcGVydHkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cywga2V5LCBhcnJheSkge1xuICB2YXIgbmFtZSwgc3RyLCBkZXNjO1xuICBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih2YWx1ZSwga2V5KSB8fCB7IHZhbHVlOiB2YWx1ZVtrZXldIH07XG4gIGlmIChkZXNjLmdldCkge1xuICAgIGlmIChkZXNjLnNldCkge1xuICAgICAgc3RyID0gY3R4LnN0eWxpemUoJ1tHZXR0ZXIvU2V0dGVyXScsICdzcGVjaWFsJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0ciA9IGN0eC5zdHlsaXplKCdbR2V0dGVyXScsICdzcGVjaWFsJyk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmIChkZXNjLnNldCkge1xuICAgICAgc3RyID0gY3R4LnN0eWxpemUoJ1tTZXR0ZXJdJywgJ3NwZWNpYWwnKTtcbiAgICB9XG4gIH1cbiAgaWYgKCFoYXNPd25Qcm9wZXJ0eSh2aXNpYmxlS2V5cywga2V5KSkge1xuICAgIG5hbWUgPSAnWycgKyBrZXkgKyAnXSc7XG4gIH1cbiAgaWYgKCFzdHIpIHtcbiAgICBpZiAoY3R4LnNlZW4uaW5kZXhPZihkZXNjLnZhbHVlKSA8IDApIHtcbiAgICAgIGlmIChpc051bGwocmVjdXJzZVRpbWVzKSkge1xuICAgICAgICBzdHIgPSBmb3JtYXRWYWx1ZShjdHgsIGRlc2MudmFsdWUsIG51bGwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RyID0gZm9ybWF0VmFsdWUoY3R4LCBkZXNjLnZhbHVlLCByZWN1cnNlVGltZXMgLSAxKTtcbiAgICAgIH1cbiAgICAgIGlmIChzdHIuaW5kZXhPZignXFxuJykgPiAtMSkge1xuICAgICAgICBpZiAoYXJyYXkpIHtcbiAgICAgICAgICBzdHIgPSBzdHIuc3BsaXQoJ1xcbicpLm1hcChmdW5jdGlvbihsaW5lKSB7XG4gICAgICAgICAgICByZXR1cm4gJyAgJyArIGxpbmU7XG4gICAgICAgICAgfSkuam9pbignXFxuJykuc3Vic3RyKDIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN0ciA9ICdcXG4nICsgc3RyLnNwbGl0KCdcXG4nKS5tYXAoZnVuY3Rpb24obGluZSkge1xuICAgICAgICAgICAgcmV0dXJuICcgICAnICsgbGluZTtcbiAgICAgICAgICB9KS5qb2luKCdcXG4nKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzdHIgPSBjdHguc3R5bGl6ZSgnW0NpcmN1bGFyXScsICdzcGVjaWFsJyk7XG4gICAgfVxuICB9XG4gIGlmIChpc1VuZGVmaW5lZChuYW1lKSkge1xuICAgIGlmIChhcnJheSAmJiBrZXkubWF0Y2goL15cXGQrJC8pKSB7XG4gICAgICByZXR1cm4gc3RyO1xuICAgIH1cbiAgICBuYW1lID0gSlNPTi5zdHJpbmdpZnkoJycgKyBrZXkpO1xuICAgIGlmIChuYW1lLm1hdGNoKC9eXCIoW2EtekEtWl9dW2EtekEtWl8wLTldKilcIiQvKSkge1xuICAgICAgbmFtZSA9IG5hbWUuc3Vic3RyKDEsIG5hbWUubGVuZ3RoIC0gMik7XG4gICAgICBuYW1lID0gY3R4LnN0eWxpemUobmFtZSwgJ25hbWUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmFtZSA9IG5hbWUucmVwbGFjZSgvJy9nLCBcIlxcXFwnXCIpXG4gICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXFxcXCIvZywgJ1wiJylcbiAgICAgICAgICAgICAgICAgLnJlcGxhY2UoLyheXCJ8XCIkKS9nLCBcIidcIik7XG4gICAgICBuYW1lID0gY3R4LnN0eWxpemUobmFtZSwgJ3N0cmluZycpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuYW1lICsgJzogJyArIHN0cjtcbn1cblxuXG5mdW5jdGlvbiByZWR1Y2VUb1NpbmdsZVN0cmluZyhvdXRwdXQsIGJhc2UsIGJyYWNlcykge1xuICB2YXIgbnVtTGluZXNFc3QgPSAwO1xuICB2YXIgbGVuZ3RoID0gb3V0cHV0LnJlZHVjZShmdW5jdGlvbihwcmV2LCBjdXIpIHtcbiAgICBudW1MaW5lc0VzdCsrO1xuICAgIGlmIChjdXIuaW5kZXhPZignXFxuJykgPj0gMCkgbnVtTGluZXNFc3QrKztcbiAgICByZXR1cm4gcHJldiArIGN1ci5yZXBsYWNlKC9cXHUwMDFiXFxbXFxkXFxkP20vZywgJycpLmxlbmd0aCArIDE7XG4gIH0sIDApO1xuXG4gIGlmIChsZW5ndGggPiA2MCkge1xuICAgIHJldHVybiBicmFjZXNbMF0gK1xuICAgICAgICAgICAoYmFzZSA9PT0gJycgPyAnJyA6IGJhc2UgKyAnXFxuICcpICtcbiAgICAgICAgICAgJyAnICtcbiAgICAgICAgICAgb3V0cHV0LmpvaW4oJyxcXG4gICcpICtcbiAgICAgICAgICAgJyAnICtcbiAgICAgICAgICAgYnJhY2VzWzFdO1xuICB9XG5cbiAgcmV0dXJuIGJyYWNlc1swXSArIGJhc2UgKyAnICcgKyBvdXRwdXQuam9pbignLCAnKSArICcgJyArIGJyYWNlc1sxXTtcbn1cblxuXG4vLyBOT1RFOiBUaGVzZSB0eXBlIGNoZWNraW5nIGZ1bmN0aW9ucyBpbnRlbnRpb25hbGx5IGRvbid0IHVzZSBgaW5zdGFuY2VvZmBcbi8vIGJlY2F1c2UgaXQgaXMgZnJhZ2lsZSBhbmQgY2FuIGJlIGVhc2lseSBmYWtlZCB3aXRoIGBPYmplY3QuY3JlYXRlKClgLlxuZnVuY3Rpb24gaXNBcnJheShhcikge1xuICByZXR1cm4gQXJyYXkuaXNBcnJheShhcik7XG59XG5leHBvcnRzLmlzQXJyYXkgPSBpc0FycmF5O1xuXG5mdW5jdGlvbiBpc0Jvb2xlYW4oYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnYm9vbGVhbic7XG59XG5leHBvcnRzLmlzQm9vbGVhbiA9IGlzQm9vbGVhbjtcblxuZnVuY3Rpb24gaXNOdWxsKGFyZykge1xuICByZXR1cm4gYXJnID09PSBudWxsO1xufVxuZXhwb3J0cy5pc051bGwgPSBpc051bGw7XG5cbmZ1bmN0aW9uIGlzTnVsbE9yVW5kZWZpbmVkKGFyZykge1xuICByZXR1cm4gYXJnID09IG51bGw7XG59XG5leHBvcnRzLmlzTnVsbE9yVW5kZWZpbmVkID0gaXNOdWxsT3JVbmRlZmluZWQ7XG5cbmZ1bmN0aW9uIGlzTnVtYmVyKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ251bWJlcic7XG59XG5leHBvcnRzLmlzTnVtYmVyID0gaXNOdW1iZXI7XG5cbmZ1bmN0aW9uIGlzU3RyaW5nKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ3N0cmluZyc7XG59XG5leHBvcnRzLmlzU3RyaW5nID0gaXNTdHJpbmc7XG5cbmZ1bmN0aW9uIGlzU3ltYm9sKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ3N5bWJvbCc7XG59XG5leHBvcnRzLmlzU3ltYm9sID0gaXNTeW1ib2w7XG5cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKGFyZykge1xuICByZXR1cm4gYXJnID09PSB2b2lkIDA7XG59XG5leHBvcnRzLmlzVW5kZWZpbmVkID0gaXNVbmRlZmluZWQ7XG5cbmZ1bmN0aW9uIGlzUmVnRXhwKHJlKSB7XG4gIHJldHVybiBpc09iamVjdChyZSkgJiYgb2JqZWN0VG9TdHJpbmcocmUpID09PSAnW29iamVjdCBSZWdFeHBdJztcbn1cbmV4cG9ydHMuaXNSZWdFeHAgPSBpc1JlZ0V4cDtcblxuZnVuY3Rpb24gaXNPYmplY3QoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnb2JqZWN0JyAmJiBhcmcgIT09IG51bGw7XG59XG5leHBvcnRzLmlzT2JqZWN0ID0gaXNPYmplY3Q7XG5cbmZ1bmN0aW9uIGlzRGF0ZShkKSB7XG4gIHJldHVybiBpc09iamVjdChkKSAmJiBvYmplY3RUb1N0cmluZyhkKSA9PT0gJ1tvYmplY3QgRGF0ZV0nO1xufVxuZXhwb3J0cy5pc0RhdGUgPSBpc0RhdGU7XG5cbmZ1bmN0aW9uIGlzRXJyb3IoZSkge1xuICByZXR1cm4gaXNPYmplY3QoZSkgJiZcbiAgICAgIChvYmplY3RUb1N0cmluZyhlKSA9PT0gJ1tvYmplY3QgRXJyb3JdJyB8fCBlIGluc3RhbmNlb2YgRXJyb3IpO1xufVxuZXhwb3J0cy5pc0Vycm9yID0gaXNFcnJvcjtcblxuZnVuY3Rpb24gaXNGdW5jdGlvbihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdmdW5jdGlvbic7XG59XG5leHBvcnRzLmlzRnVuY3Rpb24gPSBpc0Z1bmN0aW9uO1xuXG5mdW5jdGlvbiBpc1ByaW1pdGl2ZShhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gbnVsbCB8fFxuICAgICAgICAgdHlwZW9mIGFyZyA9PT0gJ2Jvb2xlYW4nIHx8XG4gICAgICAgICB0eXBlb2YgYXJnID09PSAnbnVtYmVyJyB8fFxuICAgICAgICAgdHlwZW9mIGFyZyA9PT0gJ3N0cmluZycgfHxcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICdzeW1ib2wnIHx8ICAvLyBFUzYgc3ltYm9sXG4gICAgICAgICB0eXBlb2YgYXJnID09PSAndW5kZWZpbmVkJztcbn1cbmV4cG9ydHMuaXNQcmltaXRpdmUgPSBpc1ByaW1pdGl2ZTtcblxuZXhwb3J0cy5pc0J1ZmZlciA9IHJlcXVpcmUoJy4vc3VwcG9ydC9pc0J1ZmZlcicpO1xuXG5mdW5jdGlvbiBvYmplY3RUb1N0cmluZyhvKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobyk7XG59XG5cblxuZnVuY3Rpb24gcGFkKG4pIHtcbiAgcmV0dXJuIG4gPCAxMCA/ICcwJyArIG4udG9TdHJpbmcoMTApIDogbi50b1N0cmluZygxMCk7XG59XG5cblxudmFyIG1vbnRocyA9IFsnSmFuJywgJ0ZlYicsICdNYXInLCAnQXByJywgJ01heScsICdKdW4nLCAnSnVsJywgJ0F1ZycsICdTZXAnLFxuICAgICAgICAgICAgICAnT2N0JywgJ05vdicsICdEZWMnXTtcblxuLy8gMjYgRmViIDE2OjE5OjM0XG5mdW5jdGlvbiB0aW1lc3RhbXAoKSB7XG4gIHZhciBkID0gbmV3IERhdGUoKTtcbiAgdmFyIHRpbWUgPSBbcGFkKGQuZ2V0SG91cnMoKSksXG4gICAgICAgICAgICAgIHBhZChkLmdldE1pbnV0ZXMoKSksXG4gICAgICAgICAgICAgIHBhZChkLmdldFNlY29uZHMoKSldLmpvaW4oJzonKTtcbiAgcmV0dXJuIFtkLmdldERhdGUoKSwgbW9udGhzW2QuZ2V0TW9udGgoKV0sIHRpbWVdLmpvaW4oJyAnKTtcbn1cblxuXG4vLyBsb2cgaXMganVzdCBhIHRoaW4gd3JhcHBlciB0byBjb25zb2xlLmxvZyB0aGF0IHByZXBlbmRzIGEgdGltZXN0YW1wXG5leHBvcnRzLmxvZyA9IGZ1bmN0aW9uKCkge1xuICBjb25zb2xlLmxvZygnJXMgLSAlcycsIHRpbWVzdGFtcCgpLCBleHBvcnRzLmZvcm1hdC5hcHBseShleHBvcnRzLCBhcmd1bWVudHMpKTtcbn07XG5cblxuLyoqXG4gKiBJbmhlcml0IHRoZSBwcm90b3R5cGUgbWV0aG9kcyBmcm9tIG9uZSBjb25zdHJ1Y3RvciBpbnRvIGFub3RoZXIuXG4gKlxuICogVGhlIEZ1bmN0aW9uLnByb3RvdHlwZS5pbmhlcml0cyBmcm9tIGxhbmcuanMgcmV3cml0dGVuIGFzIGEgc3RhbmRhbG9uZVxuICogZnVuY3Rpb24gKG5vdCBvbiBGdW5jdGlvbi5wcm90b3R5cGUpLiBOT1RFOiBJZiB0aGlzIGZpbGUgaXMgdG8gYmUgbG9hZGVkXG4gKiBkdXJpbmcgYm9vdHN0cmFwcGluZyB0aGlzIGZ1bmN0aW9uIG5lZWRzIHRvIGJlIHJld3JpdHRlbiB1c2luZyBzb21lIG5hdGl2ZVxuICogZnVuY3Rpb25zIGFzIHByb3RvdHlwZSBzZXR1cCB1c2luZyBub3JtYWwgSmF2YVNjcmlwdCBkb2VzIG5vdCB3b3JrIGFzXG4gKiBleHBlY3RlZCBkdXJpbmcgYm9vdHN0cmFwcGluZyAoc2VlIG1pcnJvci5qcyBpbiByMTE0OTAzKS5cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjdG9yIENvbnN0cnVjdG9yIGZ1bmN0aW9uIHdoaWNoIG5lZWRzIHRvIGluaGVyaXQgdGhlXG4gKiAgICAgcHJvdG90eXBlLlxuICogQHBhcmFtIHtmdW5jdGlvbn0gc3VwZXJDdG9yIENvbnN0cnVjdG9yIGZ1bmN0aW9uIHRvIGluaGVyaXQgcHJvdG90eXBlIGZyb20uXG4gKi9cbmV4cG9ydHMuaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpO1xuXG5leHBvcnRzLl9leHRlbmQgPSBmdW5jdGlvbihvcmlnaW4sIGFkZCkge1xuICAvLyBEb24ndCBkbyBhbnl0aGluZyBpZiBhZGQgaXNuJ3QgYW4gb2JqZWN0XG4gIGlmICghYWRkIHx8ICFpc09iamVjdChhZGQpKSByZXR1cm4gb3JpZ2luO1xuXG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMoYWRkKTtcbiAgdmFyIGkgPSBrZXlzLmxlbmd0aDtcbiAgd2hpbGUgKGktLSkge1xuICAgIG9yaWdpbltrZXlzW2ldXSA9IGFkZFtrZXlzW2ldXTtcbiAgfVxuICByZXR1cm4gb3JpZ2luO1xufTtcblxuZnVuY3Rpb24gaGFzT3duUHJvcGVydHkob2JqLCBwcm9wKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTtcbn1cbiIsIi8qXG4gKiBjYXRiZXJyeS1sb2NhdG9yXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0IERlbmlzIFJlY2hrdW5vdiBhbmQgcHJvamVjdCBjb250cmlidXRvcnMuXG4gKlxuICogY2F0YmVycnktbG9jYXRvcidzIGxpY2Vuc2UgZm9sbG93czpcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvblxuICogb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb25cbiAqIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbixcbiAqIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsXG4gKiBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLFxuICogYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbiAqIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4gKiBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4gKiBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG4gKiBTT0ZUV0FSRS5cbiAqXG4gKiBUaGlzIGxpY2Vuc2UgYXBwbGllcyB0byBhbGwgcGFydHMgb2YgY2F0YmVycnktbG9jYXRvciB0aGF0IGFyZSBub3QgZXh0ZXJuYWxseVxuICogbWFpbnRhaW5lZCBsaWJyYXJpZXMuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENvbnN0cnVjdG9yVG9rZW5pemVyO1xuXG52YXIgU1RBVEVTID0ge1xuXHRJTExFR0FMOiAtMSxcblx0Tk86IDAsXG5cdElERU5USUZJRVI6IDEsXG5cdEZVTkNUSU9OOiAyLFxuXHRQQVJFTlRIRVNFU19PUEVOOiAzLFxuXHRQQVJFTlRIRVNFU19DTE9TRTogNCxcblx0Q09NTUE6IDUsXG5cdEVORDogNlxufTtcbkNvbnN0cnVjdG9yVG9rZW5pemVyLlNUQVRFUyA9IFNUQVRFUztcblxudmFyIEtFWVdPUkRTID0ge1xuXHRGVU5DVElPTjogJ2Z1bmN0aW9uJ1xufTtcblxudmFyIFdISVRFU1BBQ0VfVEVTVCA9IC9eXFxzJC8sXG5cdElERU5USUZJRVJfVEVTVCA9IC9eW1xcJFxcd10kLztcblxuZnVuY3Rpb24gQ29uc3RydWN0b3JUb2tlbml6ZXIoY29uc3RydWN0b3JTb3VyY2UpIHtcblx0dGhpcy5fc291cmNlID0gU3RyaW5nKGNvbnN0cnVjdG9yU291cmNlIHx8ICcnKTtcbn1cblxuLyoqXG4gKiBDdXJyZW50IHNvdXJjZSBjb2RlIG9mIGNvbnN0cnVjdG9yLlxuICogQHR5cGUge3N0cmluZ31cbiAqIEBwcml2YXRlXG4gKi9cbkNvbnN0cnVjdG9yVG9rZW5pemVyLnByb3RvdHlwZS5fc291cmNlID0gJyc7XG5cbi8qKlxuICogQ3VycmVudCBpbmRleCBpbiBzb3VyY2UgY29kZS5cbiAqIEB0eXBlIHtudW1iZXJ9XG4gKiBAcHJpdmF0ZVxuICovXG5Db25zdHJ1Y3RvclRva2VuaXplci5wcm90b3R5cGUuX2N1cnJlbnRJbmRleCA9IDA7XG5cbi8qKlxuICogQ3VycmVudCBpbmRleCBpbiBzb3VyY2UgY29kZS5cbiAqIEB0eXBlIHtudW1iZXJ9XG4gKiBAcHJpdmF0ZVxuICovXG5Db25zdHJ1Y3RvclRva2VuaXplci5wcm90b3R5cGUuX2N1cnJlbnRFbmQgPSAwO1xuXG4vKipcbiAqIEN1cnJlbnQgc3RhdGUuXG4gKiBAdHlwZSB7bnVtYmVyfVxuICogQHByaXZhdGVcbiAqL1xuQ29uc3RydWN0b3JUb2tlbml6ZXIucHJvdG90eXBlLl9jdXJyZW50U3RhdGUgPSBTVEFURVMuTk87XG5cbi8qKlxuICogR2V0cyBuZXh0IHRva2VuIGluIHNvdXJjZS5cbiAqIEByZXR1cm5zIHt7c3RhdGU6IChudW1iZXIpLCBzdGFydDogbnVtYmVyLCBlbmQ6IG51bWJlcn19XG4gKi9cbkNvbnN0cnVjdG9yVG9rZW5pemVyLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gKCkge1xuXHRpZiAodGhpcy5fY3VycmVudFN0YXRlID09PSBTVEFURVMuSUxMRUdBTCB8fFxuXHRcdHRoaXMuX2N1cnJlbnRTdGF0ZSA9PT0gU1RBVEVTLkVORCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRzdGF0ZTogdGhpcy5fY3VycmVudFN0YXRlLFxuXHRcdFx0c3RhcnQ6IHRoaXMuX2N1cnJlbnRJbmRleCxcblx0XHRcdGVuZDogdGhpcy5fY3VycmVudEluZGV4ICsgMVxuXHRcdH07XG5cdH1cblxuXHR2YXIgc3RhcnQgPSB0aGlzLl9jdXJyZW50SW5kZXgsXG5cdFx0c3RhdGUgPSB0aGlzLl9jdXJyZW50U3RhdGU7XG5cblx0c3dpdGNoICh0aGlzLl9jdXJyZW50U3RhdGUpIHtcblx0XHRjYXNlIFNUQVRFUy5QQVJFTlRIRVNFU19PUEVOOlxuXHRcdFx0dGhpcy5wYXJlbnRoZXNlc09wZW5TdGF0ZSgpO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBTVEFURVMuUEFSRU5USEVTRVNfQ0xPU0U6XG5cdFx0XHR0aGlzLnBhcmVudGhlc2VzQ2xvc2VTdGF0ZSgpO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBTVEFURVMuSURFTlRJRklFUjpcblx0XHRcdHRoaXMuaWRlbnRpZmllclN0YXRlKCk7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIFNUQVRFUy5DT01NQTpcblx0XHRcdHRoaXMuY29tbWFTdGF0ZSgpO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBTVEFURVMuRlVOQ1RJT046XG5cdFx0XHR0aGlzLmZ1bmN0aW9uU3RhdGUoKTtcblx0XHRcdGJyZWFrO1xuXHRcdGRlZmF1bHQ6XG5cdFx0XHR0aGlzLnNraXBXaGl0ZXNwYWNlKCk7XG5cdFx0XHR2YXIgZXhwZWN0ZWQgPSB0aGlzLl9zb3VyY2Uuc3Vic3RyKFxuXHRcdFx0XHR0aGlzLl9jdXJyZW50SW5kZXgsIEtFWVdPUkRTLkZVTkNUSU9OLmxlbmd0aFxuXHRcdFx0KTtcblx0XHRcdGlmIChleHBlY3RlZCA9PT0gS0VZV09SRFMuRlVOQ1RJT04pIHtcblx0XHRcdFx0dGhpcy5fY3VycmVudFN0YXRlID0gU1RBVEVTLkZVTkNUSU9OO1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5uZXh0KCk7XG5cdFx0XHR9XG5cblx0XHRcdHN0YXRlID0gU1RBVEVTLklMTEVHQUw7XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdHN0YXRlOiBzdGF0ZSxcblx0XHRzdGFydDogc3RhcnQsXG5cdFx0ZW5kOiB0aGlzLl9jdXJyZW50RW5kXG5cdH07XG59O1xuXG4vKipcbiAqIFNraXBzIGFsbCB3aGl0ZXNwYWNlIGNoYXJhY3RlcnMuXG4gKi9cbkNvbnN0cnVjdG9yVG9rZW5pemVyLnByb3RvdHlwZS5za2lwV2hpdGVzcGFjZSA9IGZ1bmN0aW9uICgpIHtcblx0d2hpbGUgKFxuXHRcdHRoaXMuX2N1cnJlbnRJbmRleCA8IHRoaXMuX3NvdXJjZS5sZW5ndGggJiZcblx0XHRXSElURVNQQUNFX1RFU1QudGVzdCh0aGlzLl9zb3VyY2VbdGhpcy5fY3VycmVudEluZGV4XSkpIHtcblx0XHR0aGlzLl9jdXJyZW50SW5kZXgrKztcblx0fVxufTtcblxuLyoqXG4gKiBEZXNjcmliZXMgUEFSRU5USEVTRVNfT1BFTiBzdGF0ZSBvZiBtYWNoaW5lLlxuICovXG5Db25zdHJ1Y3RvclRva2VuaXplci5wcm90b3R5cGUucGFyZW50aGVzZXNPcGVuU3RhdGUgPSBmdW5jdGlvbiAoKSB7XG5cdHRoaXMuX2N1cnJlbnRJbmRleCsrO1xuXHR0aGlzLl9jdXJyZW50RW5kID0gdGhpcy5fY3VycmVudEluZGV4O1xuXG5cdHRoaXMuc2tpcFdoaXRlc3BhY2UoKTtcblx0aWYgKElERU5USUZJRVJfVEVTVC50ZXN0KHRoaXMuX3NvdXJjZVt0aGlzLl9jdXJyZW50SW5kZXhdKSkge1xuXHRcdHRoaXMuX2N1cnJlbnRTdGF0ZSA9IFNUQVRFUy5JREVOVElGSUVSO1xuXHR9IGVsc2UgaWYgKHRoaXMuX3NvdXJjZVt0aGlzLl9jdXJyZW50SW5kZXhdID09PSAnKScpIHtcblx0XHR0aGlzLl9jdXJyZW50U3RhdGUgPSBTVEFURVMuUEFSRU5USEVTRVNfQ0xPU0U7XG5cdH0gZWxzZSB7XG5cdFx0dGhpcy5fY3VycmVudFN0YXRlID0gU1RBVEVTLklMTEVHQUw7XG5cdH1cbn07XG5cbi8qKlxuICogRGVzY3JpYmVzIFBBUkVOVEhFU0VTX0NMT1NFIHN0YXRlIG9mIG1hY2hpbmUuXG4gKi9cbkNvbnN0cnVjdG9yVG9rZW5pemVyLnByb3RvdHlwZS5wYXJlbnRoZXNlc0Nsb3NlU3RhdGUgPSBmdW5jdGlvbiAoKSB7XG5cdHRoaXMuX2N1cnJlbnRJbmRleCsrO1xuXHR0aGlzLl9jdXJyZW50RW5kID0gdGhpcy5fY3VycmVudEluZGV4O1xuXHR0aGlzLl9jdXJyZW50U3RhdGUgPSBTVEFURVMuRU5EO1xufTtcblxuLyoqXG4gKiBEZXNjcmliZXMgRlVOQ1RJT04gc3RhdGUgb2YgbWFjaGluZS5cbiAqL1xuQ29uc3RydWN0b3JUb2tlbml6ZXIucHJvdG90eXBlLmZ1bmN0aW9uU3RhdGUgPSBmdW5jdGlvbiAoKSB7XG5cdHRoaXMuX2N1cnJlbnRJbmRleCArPSBLRVlXT1JEUy5GVU5DVElPTi5sZW5ndGg7XG5cdHRoaXMuX2N1cnJlbnRFbmQgPSB0aGlzLl9jdXJyZW50SW5kZXg7XG5cblx0dGhpcy5za2lwV2hpdGVzcGFjZSgpO1xuXG5cdGlmICh0aGlzLl9zb3VyY2VbdGhpcy5fY3VycmVudEluZGV4XSA9PT0gJygnKSB7XG5cdFx0dGhpcy5fY3VycmVudFN0YXRlID0gU1RBVEVTLlBBUkVOVEhFU0VTX09QRU47XG5cdH0gZWxzZSBpZiAoSURFTlRJRklFUl9URVNULnRlc3QodGhpcy5fc291cmNlW3RoaXMuX2N1cnJlbnRJbmRleF0pKSB7XG5cdFx0dGhpcy5fY3VycmVudFN0YXRlID0gU1RBVEVTLklERU5USUZJRVI7XG5cdH0gZWxzZSB7XG5cdFx0dGhpcy5fY3VycmVudFN0YXRlID0gU1RBVEVTLklMTEVHQUw7XG5cdH1cbn07XG5cbi8qKlxuICogRGVzY3JpYmVzIElERU5USUZJRVIgc3RhdGUgb2YgbWFjaGluZS5cbiAqL1xuQ29uc3RydWN0b3JUb2tlbml6ZXIucHJvdG90eXBlLmlkZW50aWZpZXJTdGF0ZSA9IGZ1bmN0aW9uICgpIHtcblx0d2hpbGUgKFxuXHRcdHRoaXMuX2N1cnJlbnRJbmRleCA8IHRoaXMuX3NvdXJjZS5sZW5ndGggJiZcblx0XHRJREVOVElGSUVSX1RFU1QudGVzdCh0aGlzLl9zb3VyY2VbdGhpcy5fY3VycmVudEluZGV4XSkpIHtcblx0XHR0aGlzLl9jdXJyZW50SW5kZXgrKztcblx0fVxuXG5cdHRoaXMuX2N1cnJlbnRFbmQgPSB0aGlzLl9jdXJyZW50SW5kZXg7XG5cblx0dGhpcy5za2lwV2hpdGVzcGFjZSgpO1xuXHRpZiAodGhpcy5fc291cmNlW3RoaXMuX2N1cnJlbnRJbmRleF0gPT09ICcoJykge1xuXHRcdHRoaXMuX2N1cnJlbnRTdGF0ZSA9IFNUQVRFUy5QQVJFTlRIRVNFU19PUEVOO1xuXHR9IGVsc2UgaWYgKHRoaXMuX3NvdXJjZVt0aGlzLl9jdXJyZW50SW5kZXhdID09PSAnKScpIHtcblx0XHR0aGlzLl9jdXJyZW50U3RhdGUgPSBTVEFURVMuUEFSRU5USEVTRVNfQ0xPU0U7XG5cdH0gZWxzZSBpZiAodGhpcy5fc291cmNlW3RoaXMuX2N1cnJlbnRJbmRleF0gPT09ICcsJykge1xuXHRcdHRoaXMuX2N1cnJlbnRTdGF0ZSA9IFNUQVRFUy5DT01NQTtcblx0fSBlbHNlIHtcblx0XHR0aGlzLl9jdXJyZW50U3RhdGUgPSBTVEFURVMuSUxMRUdBTDtcblx0fVxufTtcblxuLyoqXG4gKiBEZXNjcmliZXMgQ09NTUEgc3RhdGUgb2YgbWFjaGluZS5cbiAqL1xuQ29uc3RydWN0b3JUb2tlbml6ZXIucHJvdG90eXBlLmNvbW1hU3RhdGUgPSBmdW5jdGlvbiAoKSB7XG5cdHRoaXMuX2N1cnJlbnRJbmRleCsrO1xuXHR0aGlzLl9jdXJyZW50RW5kID0gdGhpcy5fY3VycmVudEluZGV4O1xuXG5cdHRoaXMuc2tpcFdoaXRlc3BhY2UoKTtcblx0aWYgKElERU5USUZJRVJfVEVTVC50ZXN0KHRoaXMuX3NvdXJjZVt0aGlzLl9jdXJyZW50SW5kZXhdKSkge1xuXHRcdHRoaXMuX2N1cnJlbnRTdGF0ZSA9IFNUQVRFUy5JREVOVElGSUVSO1xuXHRcdHJldHVybjtcblx0fVxuXHR0aGlzLl9jdXJyZW50U3RhdGUgPSBTVEFURVMuSUxMRUdBTDtcbn07IiwiLypcbiAqIGNhdGJlcnJ5LWxvY2F0b3JcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgRGVuaXMgUmVjaGt1bm92IGFuZCBwcm9qZWN0IGNvbnRyaWJ1dG9ycy5cbiAqXG4gKiBjYXRiZXJyeS1sb2NhdG9yJ3MgbGljZW5zZSBmb2xsb3dzOlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXG4gKiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvblxuICogZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLFxuICogaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSxcbiAqIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsXG4gKiBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuICogc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbiAqIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1NcbiAqIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiAqIFNPRlRXQVJFLlxuICpcbiAqIFRoaXMgbGljZW5zZSBhcHBsaWVzIHRvIGFsbCBwYXJ0cyBvZiBjYXRiZXJyeS1sb2NhdG9yIHRoYXQgYXJlIG5vdCBleHRlcm5hbGx5XG4gKiBtYWludGFpbmVkIGxpYnJhcmllcy5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gU2VydmljZUxvY2F0b3I7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgndXRpbCcpLFxuXHRDb25zdHJ1Y3RvclRva2VuaXplciA9IHJlcXVpcmUoJy4vQ29uc3RydWN0b3JUb2tlbml6ZXInKTtcblxudmFyIERFUEVOREVOQ1lfUkVHRVhQID0gL15cXCRcXHcrLyxcblx0RVJST1JfQ09OU1RSVUNUT1JfU0hPVUxEX0JFX0ZVTkNUSU9OID0gJ0NvbnN0cnVjdG9yIHNob3VsZCBiZSBhIGZ1bmN0aW9uJyxcblx0RVJST1JfVFlQRV9OT1RfUkVHSVNURVJFRCA9ICdUeXBlIFwiJXNcIiBub3QgcmVnaXN0ZXJlZCcsXG5cdEVSUk9SX1RZUEVfU0hPVUxEX0JFX1NUUklORyA9ICdUeXBlIG5hbWUgXCIlc1wiIHNob3VsZCBiZSBhIHN0cmluZyc7XG5cbi8qKlxuICogQ3JlYXRlcyBuZXcgaW5zdGFuY2Ugb2Ygc2VydmljZSBsb2NhdG9yLlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIFNlcnZpY2VMb2NhdG9yKCkge1xuXHR0aGlzLl9yZWdpc3RyYXRpb25zID0ge307XG59XG5cbi8qKlxuICogQ3VycmVudCB0eXBlIHJlZ2lzdHJhdGlvbnMuXG4gKiBAdHlwZSB7T2JqZWN0fVxuICogQHByb3RlY3RlZFxuICovXG5TZXJ2aWNlTG9jYXRvci5wcm90b3R5cGUuX3JlZ2lzdHJhdGlvbnMgPSBudWxsO1xuXG4vKipcbiAqIFJlZ2lzdGVycyBuZXcgdHlwZSBpbiBzZXJ2aWNlIGxvY2F0b3IuXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZSBUeXBlIG5hbWUsIHdoaWNoIHdpbGwgYmUgYWxpYXMgaW4gb3RoZXIgY29uc3RydWN0b3JzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY29uc3RydWN0b3IgQ29uc3RydWN0b3Igd2hpY2hcbiAqIGluaXRpYWxpemVzIGluc3RhbmNlIG9mIHNwZWNpZmllZCB0eXBlLlxuICogQHBhcmFtIHtPYmplY3Q/fSBwYXJhbWV0ZXJzIFNldCBvZiBuYW1lZCBwYXJhbWV0ZXJzXG4gKiB3aGljaCB3aWxsIGJlIGFsc28gaW5qZWN0ZWQuXG4gKiBAcGFyYW0ge2Jvb2xlYW4/fSBpc1NpbmdsZXRvbiBJZiB0cnVlIGV2ZXJ5IHJlc29sdmUgd2lsbCByZXR1cm5cbiAqIHRoZSBzYW1lIGluc3RhbmNlLlxuICovXG5TZXJ2aWNlTG9jYXRvci5wcm90b3R5cGUucmVnaXN0ZXIgPVxuXHRmdW5jdGlvbiAodHlwZSwgY29uc3RydWN0b3IsIHBhcmFtZXRlcnMsIGlzU2luZ2xldG9uKSB7XG5cdFx0dGhyb3dJZk5vdEZ1bmN0aW9uKGNvbnN0cnVjdG9yKTtcblx0XHR0aHJvd0lmTm90U3RyaW5nKHR5cGUpO1xuXG5cdFx0aW5pdGlhbGl6ZVJlZ2lzdHJhdGlvbih0eXBlLCB0aGlzKTtcblx0XHR2YXIgcGFyYW1ldGVyTmFtZXMgPSBnZXRQYXJhbWV0ZXJOYW1lcyhjb25zdHJ1Y3Rvcik7XG5cblx0XHR0aGlzLl9yZWdpc3RyYXRpb25zW3R5cGVdLnVuc2hpZnQoe1xuXHRcdFx0Y29uc3RydWN0b3I6IGNvbnN0cnVjdG9yLFxuXHRcdFx0cGFyYW1ldGVyczogcGFyYW1ldGVycyB8fCB7fSxcblx0XHRcdHBhcmFtZXRlck5hbWVzOiBwYXJhbWV0ZXJOYW1lcyxcblx0XHRcdGlzU2luZ2xldG9uOiBCb29sZWFuKGlzU2luZ2xldG9uKSxcblx0XHRcdHNpbmdsZUluc3RhbmNlOiBudWxsXG5cdFx0fSk7XG5cdH07XG5cbi8qKlxuICogUmVnaXN0ZXJzIHNpbmdsZSBpbnN0YW5jZSBmb3Igc3BlY2lmaWVkIHR5cGUuXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZSBUeXBlIG5hbWUuXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2UgSW5zdGFuY2UgdG8gcmVnaXN0ZXIuXG4gKi9cblNlcnZpY2VMb2NhdG9yLnByb3RvdHlwZS5yZWdpc3Rlckluc3RhbmNlID0gZnVuY3Rpb24gKHR5cGUsIGluc3RhbmNlKSB7XG5cdHRocm93SWZOb3RTdHJpbmcodHlwZSk7XG5cdGluaXRpYWxpemVSZWdpc3RyYXRpb24odHlwZSwgdGhpcyk7XG5cblx0dGhpcy5fcmVnaXN0cmF0aW9uc1t0eXBlXS51bnNoaWZ0KHtcblx0XHRjb25zdHJ1Y3RvcjogaW5zdGFuY2UuY29uc3RydWN0b3IsXG5cdFx0cGFyYW1ldGVyczoge30sXG5cdFx0cGFyYW1ldGVyTmFtZXM6IFtdLFxuXHRcdGlzU2luZ2xldG9uOiB0cnVlLFxuXHRcdHNpbmdsZUluc3RhbmNlOiBpbnN0YW5jZVxuXHR9KTtcbn07XG5cbi8qKlxuICogUmVzb2x2ZXMgbGFzdCByZWdpc3RlcmVkIGltcGxlbWVudGF0aW9uIGJ5IHR5cGUgbmFtZVxuICogaW5jbHVkaW5nIGFsbCBpdHMgZGVwZW5kZW5jaWVzIHJlY3Vyc2l2ZWx5LlxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgVHlwZSBuYW1lLlxuICogQHJldHVybnMge09iamVjdH0gSW5zdGFuY2Ugb2Ygc3BlY2lmaWVkIHR5cGUuXG4gKi9cblNlcnZpY2VMb2NhdG9yLnByb3RvdHlwZS5yZXNvbHZlID0gZnVuY3Rpb24gKHR5cGUpIHtcblx0dGhyb3dJZk5vdFN0cmluZyh0eXBlKTtcblx0dGhyb3dJZk5vVHlwZSh0aGlzLl9yZWdpc3RyYXRpb25zLCB0eXBlKTtcblx0dmFyIGZpcnN0UmVnaXN0cmF0aW9uID0gdGhpcy5fcmVnaXN0cmF0aW9uc1t0eXBlXVswXTtcblx0cmV0dXJuIGNyZWF0ZUluc3RhbmNlKGZpcnN0UmVnaXN0cmF0aW9uLCB0aGlzKTtcbn07XG5cbi8qKlxuICogUmVzb2x2ZXMgYWxsIHJlZ2lzdGVyZWQgaW1wbGVtZW50YXRpb25zIGJ5IHR5cGUgbmFtZVxuICogaW5jbHVkaW5nIGFsbCBkZXBlbmRlbmNpZXMgcmVjdXJzaXZlbHkuXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZSBUeXBlIG5hbWUuXG4gKiBAcmV0dXJucyB7QXJyYXl9IEFycmF5IG9mIGluc3RhbmNlcyBzcGVjaWZpZWQgdHlwZS5cbiAqL1xuU2VydmljZUxvY2F0b3IucHJvdG90eXBlLnJlc29sdmVBbGwgPSBmdW5jdGlvbiAodHlwZSkge1xuXHR0aHJvd0lmTm90U3RyaW5nKHR5cGUpO1xuXHR0cnkge1xuXHRcdHRocm93SWZOb1R5cGUodGhpcy5fcmVnaXN0cmF0aW9ucywgdHlwZSk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRyZXR1cm4gW107XG5cdH1cblx0cmV0dXJuIHRoaXMuX3JlZ2lzdHJhdGlvbnNbdHlwZV0ubWFwKGZ1bmN0aW9uIChyZWdpc3RyYXRpb24pIHtcblx0XHRyZXR1cm4gY3JlYXRlSW5zdGFuY2UocmVnaXN0cmF0aW9uLCB0aGlzKTtcblx0fSwgdGhpcyk7XG59O1xuXG4vKipcbiAqIFJlc29sdmVzIGluc3RhbmNlIG9mIHNwZWNpZmllZCBjb25zdHJ1Y3RvciBpbmNsdWRpbmcgZGVwZW5kZW5jaWVzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY29uc3RydWN0b3IgQ29uc3RydWN0b3IgZm9yIGluc3RhbmNlIGNyZWF0aW9uLlxuICogQHBhcmFtIHtPYmplY3Q/fSBwYXJhbWV0ZXJzIFNldCBvZiBpdHMgcGFyYW1ldGVycyB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBJbnN0YW5jZSBvZiBzcGVjaWZpZWQgY29uc3RydWN0b3IuXG4gKi9cblNlcnZpY2VMb2NhdG9yLnByb3RvdHlwZS5yZXNvbHZlSW5zdGFuY2UgPSBmdW5jdGlvbiAoY29uc3RydWN0b3IsIHBhcmFtZXRlcnMpIHtcblx0cmV0dXJuIGNyZWF0ZUluc3RhbmNlKHtcblx0XHRjb25zdHJ1Y3RvcjogY29uc3RydWN0b3IsXG5cdFx0cGFyYW1ldGVyczogcGFyYW1ldGVycyB8fCB7fSxcblx0XHRwYXJhbWV0ZXJOYW1lczogZ2V0UGFyYW1ldGVyTmFtZXMoY29uc3RydWN0b3IpLFxuXHRcdGlzU2luZ2xldG9uOiBmYWxzZSxcblx0XHRzaW5nbGVJbnN0YW5jZTogbnVsbFxuXHR9LCB0aGlzKTtcbn07XG5cbi8qKlxuICogVW5yZWdpc3RlcnMgYWxsIHJlZ2lzdHJhdGlvbnMgb2Ygc3BlY2lmaWVkIHR5cGUuXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZSBUeXBlIG5hbWUuXG4gKi9cblNlcnZpY2VMb2NhdG9yLnByb3RvdHlwZS51bnJlZ2lzdGVyID0gZnVuY3Rpb24gKHR5cGUpIHtcblx0dGhyb3dJZk5vdFN0cmluZyh0eXBlKTtcblx0ZGVsZXRlIHRoaXMuX3JlZ2lzdHJhdGlvbnNbdHlwZV07XG59O1xuXG4vKipcbiAqIEluaXRpYWxpemVzIHJlZ2lzdHJhdGlvbiBhcnJheSBmb3Igc3BlY2lmaWVkIHR5cGUuXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZSBUeXBlIG5hbWUuXG4gKiBAcGFyYW0ge1NlcnZpY2VMb2NhdG9yfSBjb250ZXh0IENvbnRleHQgb2YgZXhlY3V0aW9uLlxuICovXG5mdW5jdGlvbiBpbml0aWFsaXplUmVnaXN0cmF0aW9uKHR5cGUsIGNvbnRleHQpIHtcblx0aWYgKCFjb250ZXh0Ll9yZWdpc3RyYXRpb25zLmhhc093blByb3BlcnR5KHR5cGUpKSB7XG5cdFx0Y29udGV4dC5fcmVnaXN0cmF0aW9uc1t0eXBlXSA9IFtdO1xuXHR9XG59XG5cbi8qKlxuICogVGhyb3dzIGVycm9yIGlmIHNwZWNpZmllZCByZWdpc3RyYXRpb24gaXMgbm90IGZvdW5kLlxuICogQHBhcmFtIHtPYmplY3R9IHJlZ2lzdHJhdGlvbnMgQ3VycmVudCByZWdpc3RyYXRpb25zIHNldC5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIFR5cGUgdG8gY2hlY2suXG4gKi9cbmZ1bmN0aW9uIHRocm93SWZOb1R5cGUocmVnaXN0cmF0aW9ucywgdHlwZSkge1xuXHRpZiAoIXJlZ2lzdHJhdGlvbnMuaGFzT3duUHJvcGVydHkodHlwZSkgfHxcblx0XHRyZWdpc3RyYXRpb25zW3R5cGVdLmxlbmd0aCA9PT0gMCkge1xuXHRcdHRocm93IG5ldyBFcnJvcih1dGlsLmZvcm1hdChFUlJPUl9UWVBFX05PVF9SRUdJU1RFUkVELCB0eXBlKSk7XG5cdH1cbn1cblxuLyoqXG4gKiBUaHJvd3MgZXJyb3IgaWYgc3BlY2lmaWVkIGNvbnN0cnVjdG9yIGlzIG5vdCBhIGZ1bmN0aW9uLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY29uc3RydWN0b3IgQ29uc3RydWN0b3IgdG8gY2hlY2suXG4gKi9cbmZ1bmN0aW9uIHRocm93SWZOb3RGdW5jdGlvbihjb25zdHJ1Y3Rvcikge1xuXHRpZiAoY29uc3RydWN0b3IgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdHRocm93IG5ldyBFcnJvcihFUlJPUl9DT05TVFJVQ1RPUl9TSE9VTERfQkVfRlVOQ1RJT04pO1xufVxuXG4vKipcbiAqIFRocm93cyBlcnJvciBpZiBzcGVjaWZpZWQgdHlwZSBuYW1lIGlzIG5vdCBhIHN0cmluZy5cbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIFR5cGUgbmFtZSB0byBjaGVjay5cbiAqL1xuZnVuY3Rpb24gdGhyb3dJZk5vdFN0cmluZyh0eXBlKSB7XG5cdGlmICh0eXBlb2YodHlwZSkgPT09ICdzdHJpbmcnKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0dGhyb3cgbmV3IEVycm9yKHV0aWwuZm9ybWF0KEVSUk9SX1RZUEVfU0hPVUxEX0JFX1NUUklORywgdHlwZSkpO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgaW5zdGFuY2Ugb2YgdHlwZSBzcGVjaWZpZWQgYW5kIHBhcmFtZXRlcnMgaW4gcmVnaXN0cmF0aW9uLlxuICogQHBhcmFtIHtPYmplY3R9IHJlZ2lzdHJhdGlvbiBTcGVjaWZpZWQgcmVnaXN0cmF0aW9uIG9mIHR5cGUuXG4gKiBAcGFyYW0ge1NlcnZpY2VMb2NhdG9yfSBjb250ZXh0IENvbnRleHQgb2YgZXhlY3V0aW9uLlxuICogQHJldHVybnMge09iamVjdH0gSW5zdGFuY2Ugb2YgdHlwZSBzcGVjaWZpZWQgaW4gcmVnaXN0cmF0aW9uLlxuICovXG5mdW5jdGlvbiBjcmVhdGVJbnN0YW5jZShyZWdpc3RyYXRpb24sIGNvbnRleHQpIHtcblx0aWYgKHJlZ2lzdHJhdGlvbi5pc1NpbmdsZXRvbiAmJiByZWdpc3RyYXRpb24uc2luZ2xlSW5zdGFuY2UgIT09IG51bGwpIHtcblx0XHRyZXR1cm4gcmVnaXN0cmF0aW9uLnNpbmdsZUluc3RhbmNlO1xuXHR9XG5cblx0dmFyIGluc3RhbmNlUGFyYW1ldGVycyA9IGdldFBhcmFtZXRlcnMocmVnaXN0cmF0aW9uLCBjb250ZXh0KSxcblx0XHRpbnN0YW5jZSA9IE9iamVjdC5jcmVhdGUocmVnaXN0cmF0aW9uLmNvbnN0cnVjdG9yLnByb3RvdHlwZSk7XG5cdHJlZ2lzdHJhdGlvbi5jb25zdHJ1Y3Rvci5hcHBseShpbnN0YW5jZSwgaW5zdGFuY2VQYXJhbWV0ZXJzKTtcblxuXHRpZiAocmVnaXN0cmF0aW9uLmlzU2luZ2xldG9uKSB7XG5cdFx0cmVnaXN0cmF0aW9uLnNpbmdsZUluc3RhbmNlID0gaW5zdGFuY2U7XG5cdH1cblxuXHRyZXR1cm4gaW5zdGFuY2U7XG59XG5cbi8qKlxuICogR2V0cyBjb25zdHJ1Y3RvciBwYXJhbWV0ZXJzIHNwZWNpZmllZCBpbiB0eXBlIGNvbnN0cnVjdG9yLlxuICogQHBhcmFtIHtPYmplY3R9IHJlZ2lzdHJhdGlvbiBUeXBlIHJlZ2lzdHJhdGlvbi5cbiAqIEBwYXJhbSB7U2VydmljZUxvY2F0b3J9IGNvbnRleHQgQ29udGV4dCBvZiBleGVjdXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IEFycmF5IG9mIHJlc29sdmVkIGRlcGVuZGVuY2llcyB0byBpbmplY3QuXG4gKi9cbmZ1bmN0aW9uIGdldFBhcmFtZXRlcnMocmVnaXN0cmF0aW9uLCBjb250ZXh0KSB7XG5cdHJldHVybiByZWdpc3RyYXRpb24ucGFyYW1ldGVyTmFtZXMubWFwKGZ1bmN0aW9uIChwYXJhbWV0ZXJOYW1lKSB7XG5cdFx0dmFyIGRlcGVuZGVuY3lOYW1lID0gZ2V0RGVwZW5kZW5jeU5hbWUocGFyYW1ldGVyTmFtZSk7XG5cdFx0cmV0dXJuIGRlcGVuZGVuY3lOYW1lID09PSBudWxsID9cblx0XHRcdHJlZ2lzdHJhdGlvbi5wYXJhbWV0ZXJzW3BhcmFtZXRlck5hbWVdIDpcblx0XHRcdHRoaXMucmVzb2x2ZShkZXBlbmRlbmN5TmFtZSk7XG5cdH0sIGNvbnRleHQpO1xufVxuXG4vKipcbiAqIEdldHMgbmFtZSBvZiBkZXBlbmRlbmN5IHR5cGUuXG4gKiBAcGFyYW0ge3N0cmluZ30gcGFyYW1ldGVyTmFtZSBOYW1lIG9mIGNvbnN0cnVjdG9yIHBhcmFtZXRlci5cbiAqIEByZXR1cm5zIHtzdHJpbmd8bnVsbH0gTmFtZSBvZiBkZXBlbmRlbmN5IHR5cGUuXG4gKi9cbmZ1bmN0aW9uIGdldERlcGVuZGVuY3lOYW1lKHBhcmFtZXRlck5hbWUpIHtcblx0aWYgKCFERVBFTkRFTkNZX1JFR0VYUC50ZXN0KHBhcmFtZXRlck5hbWUpKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHRyZXR1cm4gcGFyYW1ldGVyTmFtZS5zdWJzdHIoMSwgcGFyYW1ldGVyTmFtZS5sZW5ndGggLSAxKTtcbn1cblxuLyoqXG4gKiBHZXRzIGFsbCBwYXJhbWV0ZXIgbmFtZXMgdXNlZCBpbiBjb25zdHJ1Y3RvciBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNvbnN0cnVjdG9yIENvbnN0cnVjdG9yIGZ1bmN0aW9uLlxuICogQHJldHVybnMge0FycmF5PHN0cmluZz59IEFycmF5IG9mIHBhcmFtZXRlciBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gZ2V0UGFyYW1ldGVyTmFtZXMoY29uc3RydWN0b3IpIHtcblx0dmFyIHNvdXJjZSA9IGNvbnN0cnVjdG9yLnRvU3RyaW5nKCksXG5cdFx0dG9rZW5pemVyID0gbmV3IENvbnN0cnVjdG9yVG9rZW5pemVyKHNvdXJjZSksXG5cdFx0cmVzdWx0ID0gW10sXG5cdFx0dG9rZW4gPSB7XG5cdFx0XHRzdGF0ZTogQ29uc3RydWN0b3JUb2tlbml6ZXIuU1RBVEVTLk5PLFxuXHRcdFx0c3RhcnQ6IDAsXG5cdFx0XHRlbmQ6IDBcblx0XHR9LFxuXHRcdGFyZVBhcmFtZXRlcnNTdGFydGVkID0gZmFsc2U7XG5cblx0d2hpbGUgKFxuXHRcdHRva2VuLnN0YXRlICE9PSBDb25zdHJ1Y3RvclRva2VuaXplci5TVEFURVMuRU5EICYmXG5cdFx0dG9rZW4uc3RhdGUgIT09IENvbnN0cnVjdG9yVG9rZW5pemVyLlNUQVRFUy5JTExFR0FMKSB7XG5cdFx0dG9rZW4gPSB0b2tlbml6ZXIubmV4dCgpO1xuXHRcdGlmICh0b2tlbi5zdGF0ZSA9PT0gQ29uc3RydWN0b3JUb2tlbml6ZXIuU1RBVEVTLlBBUkVOVEhFU0VTX09QRU4pIHtcblx0XHRcdGFyZVBhcmFtZXRlcnNTdGFydGVkID0gdHJ1ZTtcblx0XHR9XG5cblx0XHRpZiAoYXJlUGFyYW1ldGVyc1N0YXJ0ZWQgJiZcblx0XHRcdHRva2VuLnN0YXRlID09PSBDb25zdHJ1Y3RvclRva2VuaXplci5TVEFURVMuSURFTlRJRklFUikge1xuXHRcdFx0cmVzdWx0LnB1c2goc291cmNlLnN1YnN0cmluZyh0b2tlbi5zdGFydCwgdG9rZW4uZW5kKSk7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG5cbn0iLCIvKlxuICogY2F0YmVycnlcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgRGVuaXMgUmVjaGt1bm92IGFuZCBwcm9qZWN0IGNvbnRyaWJ1dG9ycy5cbiAqXG4gKiBjYXRiZXJyeSdzIGxpY2Vuc2UgZm9sbG93czpcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvblxuICogb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb25cbiAqIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbixcbiAqIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsXG4gKiBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLFxuICogYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbiAqIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4gKiBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4gKiBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG4gKiBTT0ZUV0FSRS5cbiAqXG4gKiBUaGlzIGxpY2Vuc2UgYXBwbGllcyB0byBhbGwgcGFydHMgb2YgY2F0YmVycnkgdGhhdCBhcmUgbm90IGV4dGVybmFsbHlcbiAqIG1haW50YWluZWQgbGlicmFyaWVzLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBVSFI7XG5cbnZhciBVSFJCYXNlID0gcmVxdWlyZSgnLi4vbGliL1VIUkJhc2UnKSxcblx0UHJvbWlzZSA9IHJlcXVpcmUoJ3Byb21pc2UnKSxcblx0VVJJID0gcmVxdWlyZSgnY2F0YmVycnktdXJpJykuVVJJLFxuXHR1dGlsID0gcmVxdWlyZSgndXRpbCcpO1xuXG4vLyBpZiBicm93c2VyIHN0aWxsIGRvZXMgbm90IGhhdmUgcHJvbWlzZXMgdGhlbiBhZGQgaXQuXG5pZiAoISgnUHJvbWlzZScgaW4gd2luZG93KSkge1xuXHR3aW5kb3cuUHJvbWlzZSA9IFByb21pc2U7XG59XG5cbnV0aWwuaW5oZXJpdHMoVUhSLCBVSFJCYXNlKTtcblxudmFyIE5PTl9TQUZFX0hFQURFUlMgPSB7XG5cdGNvb2tpZTogdHJ1ZSxcblx0J2FjY2VwdC1jaGFyc2V0JzogdHJ1ZVxufTtcblxudmFyIEVSUk9SX0NPTk5FQ1RJT04gPSAnQ29ubmVjdGlvbiBlcnJvcicsXG5cdEVSUk9SX1RJTUVPVVQgPSAnUmVxdWVzdCB0aW1lb3V0Jyxcblx0RVJST1JfQUJPUlRFRCA9ICdSZXF1ZXN0IGFib3J0ZWQnO1xuXG4vKipcbiAqIENyZWF0ZXMgbmV3IGluc3RhbmNlIG9mIGNsaWVudC1zaWRlIEhUVFAoUykgcmVxdWVzdCBpbXBsZW1lbnRhdGlvbi5cbiAqIEBwYXJhbSB7V2luZG93fSAkd2luZG93IEN1cnJlbnQgd2luZG93IG9iamVjdC5cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBVSFIoJHdpbmRvdykge1xuXHRVSFJCYXNlLmNhbGwodGhpcyk7XG5cdHRoaXMud2luZG93ID0gJHdpbmRvdztcbn1cblxuLyoqXG4gKiBDdXJyZW50IGluc3RhbmNlIG9mIHdpbmRvdy5cbiAqIEB0eXBlIHtXaW5kb3d9XG4gKi9cblVIUi5wcm90b3R5cGUud2luZG93ID0gbnVsbDtcblxuLyoqXG4gKiBEb2VzIHJlcXVlc3Qgd2l0aCBzcGVjaWZpZWQgcGFyYW1ldGVycyB1c2luZyBwcm90b2NvbCBpbXBsZW1lbnRhdGlvbi5cbiAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbWV0ZXJzIFJlcXVlc3QgcGFyYW1ldGVycy5cbiAqIEBwYXJhbSB7U3RyaW5nfSBwYXJhbWV0ZXJzLm1ldGhvZCBIVFRQIG1ldGhvZC5cbiAqIEBwYXJhbSB7U3RyaW5nfSBwYXJhbWV0ZXJzLnVybCBVUkwgZm9yIHJlcXVlc3QuXG4gKiBAcGFyYW0ge1VSSX0gcGFyYW1ldGVycy51cmkgVVJJIG9iamVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbWV0ZXJzLmhlYWRlcnMgSFRUUCBoZWFkZXJzIHRvIHNlbmQuXG4gKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IHBhcmFtZXRlcnMuZGF0YSBEYXRhIHRvIHNlbmQuXG4gKiBAcGFyYW0ge051bWJlcn0gcGFyYW1ldGVycy50aW1lb3V0IFJlcXVlc3QgdGltZW91dC5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gcGFyYW1ldGVycy51bnNhZmVIVFRQUyBJZiB0cnVlIHRoZW4gcmVxdWVzdHMgdG8gc2VydmVycyB3aXRoXG4gKiBpbnZhbGlkIEhUVFBTIGNlcnRpZmljYXRlcyBhcmUgYWxsb3dlZC5cbiAqIEByZXR1cm5zIHtQcm9taXNlPE9iamVjdD59IFByb21pc2UgZm9yIHJlc3VsdCB3aXRoIHN0YXR1cyBvYmplY3QgYW5kIGNvbnRlbnQuXG4gKiBAcHJvdGVjdGVkXG4gKi9cblVIUi5wcm90b3R5cGUuX2RvUmVxdWVzdCA9IGZ1bmN0aW9uIChwYXJhbWV0ZXJzKSB7XG5cdHZhciBzZWxmID0gdGhpcztcblxuXHRPYmplY3Qua2V5cyhwYXJhbWV0ZXJzLmhlYWRlcnMpXG5cdFx0LmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcblx0XHRcdGlmIChOT05fU0FGRV9IRUFERVJTLmhhc093blByb3BlcnR5KG5hbWUudG9Mb3dlckNhc2UoKSkpIHtcblx0XHRcdFx0ZGVsZXRlIHBhcmFtZXRlcnMuaGVhZGVyc1tuYW1lXTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGZ1bGZpbGwsIHJlamVjdCkge1xuXHRcdHZhciByZXF1ZXN0RXJyb3IgPSBudWxsLFxuXHRcdFx0eGhyID0gbmV3IHNlbGYud2luZG93LlhNTEh0dHBSZXF1ZXN0KCk7XG5cblx0XHR4aHIub25hYm9ydCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlcXVlc3RFcnJvciA9IG5ldyBFcnJvcihFUlJPUl9BQk9SVEVEKTtcblx0XHRcdHJlamVjdChyZXF1ZXN0RXJyb3IpO1xuXHRcdH07XG5cdFx0eGhyLm9udGltZW91dCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlcXVlc3RFcnJvciA9IG5ldyBFcnJvcihFUlJPUl9USU1FT1VUKTtcblx0XHRcdHJlamVjdChyZXF1ZXN0RXJyb3IpO1xuXHRcdH07XG5cdFx0eGhyLm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXF1ZXN0RXJyb3IgPSBuZXcgRXJyb3IoeGhyLnN0YXR1c1RleHQgfHwgRVJST1JfQ09OTkVDVElPTik7XG5cdFx0XHRyZWplY3QocmVxdWVzdEVycm9yKTtcblx0XHR9O1xuXHRcdHhoci5vbmxvYWRlbmQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRpZiAocmVxdWVzdEVycm9yKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdHZhciBzdGF0dXNPYmplY3QgPSBnZXRTdGF0dXNPYmplY3QoeGhyKSxcblx0XHRcdFx0Y29udGVudCA9IHNlbGYuY29udmVydFJlc3BvbnNlKFxuXHRcdFx0XHRcdHN0YXR1c09iamVjdC5oZWFkZXJzLFxuXHRcdFx0XHRcdHhoci5yZXNwb25zZVRleHRcblx0XHRcdFx0KTtcblx0XHRcdGZ1bGZpbGwoe3N0YXR1czogc3RhdHVzT2JqZWN0LCBjb250ZW50OiBjb250ZW50fSk7XG5cdFx0fTtcblxuXHRcdHZhciB1c2VyID0gcGFyYW1ldGVycy51cmkuYXV0aG9yaXR5LnVzZXJJbmZvID9cblx0XHRcdFx0cGFyYW1ldGVycy51cmkuYXV0aG9yaXR5LnVzZXJJbmZvLnVzZXIgOiBudWxsLFxuXHRcdFx0cGFzc3dvcmQgPSBwYXJhbWV0ZXJzLnVyaS5hdXRob3JpdHkudXNlckluZm8gP1xuXHRcdFx0XHRwYXJhbWV0ZXJzLnVyaS5hdXRob3JpdHkudXNlckluZm8ucGFzc3dvcmQgOiBudWxsO1xuXHRcdHhoci5vcGVuKFxuXHRcdFx0cGFyYW1ldGVycy5tZXRob2QsIHBhcmFtZXRlcnMudXJpLnRvU3RyaW5nKCksIHRydWUsXG5cdFx0XHR1c2VyIHx8IHVuZGVmaW5lZCwgcGFzc3dvcmQgfHwgdW5kZWZpbmVkXG5cdFx0KTtcblx0XHR4aHIudGltZW91dCA9IHBhcmFtZXRlcnMudGltZW91dDtcblxuXHRcdE9iamVjdC5rZXlzKHBhcmFtZXRlcnMuaGVhZGVycylcblx0XHRcdC5mb3JFYWNoKGZ1bmN0aW9uIChoZWFkZXJOYW1lKSB7XG5cdFx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKFxuXHRcdFx0XHRcdGhlYWRlck5hbWUsIHBhcmFtZXRlcnMuaGVhZGVyc1toZWFkZXJOYW1lXVxuXHRcdFx0XHQpO1xuXHRcdFx0fSk7XG5cblx0XHR4aHIuc2VuZChwYXJhbWV0ZXJzLmRhdGEpO1xuXHR9KTtcbn07XG5cbi8qKlxuICogR2V0cyBzdGF0ZSBvYmplY3QgZm9yIHNwZWNpZmllZCBqUXVlcnkgWEhSIG9iamVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0P30geGhyIFhIUiBvYmplY3QuXG4gKiBAcmV0dXJucyB7e2NvZGU6IG51bWJlciwgdGV4dDogc3RyaW5nLCBoZWFkZXJzOiBPYmplY3R9fSBTdGF0dXMgb2JqZWN0LlxuICovXG5mdW5jdGlvbiBnZXRTdGF0dXNPYmplY3QoeGhyKSB7XG5cdHZhciBoZWFkZXJzID0ge307XG5cblx0aWYgKCF4aHIpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0Y29kZTogMCxcblx0XHRcdHRleHQ6ICcnLFxuXHRcdFx0aGVhZGVyczogaGVhZGVyc1xuXHRcdH07XG5cdH1cblxuXHR4aHJcblx0XHQuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKClcblx0XHQuc3BsaXQoJ1xcbicpXG5cdFx0LmZvckVhY2goZnVuY3Rpb24gKGhlYWRlcikge1xuXHRcdFx0dmFyIGRlbGltaXRlckluZGV4ID0gaGVhZGVyLmluZGV4T2YoJzonKTtcblx0XHRcdGlmIChkZWxpbWl0ZXJJbmRleCA8PSAwKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdHZhciBoZWFkZXJOYW1lID0gaGVhZGVyXG5cdFx0XHRcdC5zdWJzdHJpbmcoMCwgZGVsaW1pdGVySW5kZXgpXG5cdFx0XHRcdC50cmltKClcblx0XHRcdFx0LnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRoZWFkZXJzW2hlYWRlck5hbWVdID0gaGVhZGVyXG5cdFx0XHRcdC5zdWJzdHJpbmcoZGVsaW1pdGVySW5kZXggKyAxKVxuXHRcdFx0XHQudHJpbSgpO1xuXHRcdH0pO1xuXG5cdHJldHVybiB7XG5cdFx0Y29kZTogeGhyLnN0YXR1cyxcblx0XHR0ZXh0OiB4aHIuc3RhdHVzVGV4dCxcblx0XHRoZWFkZXJzOiBoZWFkZXJzXG5cdH07XG59IiwiLypcbiAqIGNhdGJlcnJ5XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0IERlbmlzIFJlY2hrdW5vdiBhbmQgcHJvamVjdCBjb250cmlidXRvcnMuXG4gKlxuICogY2F0YmVycnkncyBsaWNlbnNlIGZvbGxvd3M6XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb25cbiAqIG9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uXG4gKiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sXG4gKiBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLFxuICogcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSxcbiAqIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4gKiBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuICogaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuICogT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuICogU09GVFdBUkUuXG4gKlxuICogVGhpcyBsaWNlbnNlIGFwcGxpZXMgdG8gYWxsIHBhcnRzIG9mIGNhdGJlcnJ5IHRoYXQgYXJlIG5vdCBleHRlcm5hbGx5XG4gKiBtYWludGFpbmVkIGxpYnJhcmllcy5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBVSFIgPSByZXF1aXJlKCcuL2xpYi9VSFInKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdC8qKlxuXHQgKiBSZWdpc3RlcnMgVUhSIGluIHNlcnZlci1zaWRlIHNlcnZpY2UgbG9jYXRvci5cblx0ICogQHBhcmFtIHtTZXJ2aWNlTG9jYXRvcn0gbG9jYXRvciBDYXRiZXJyeSdzIHNlcnZpY2UgbG9jYXRvci5cblx0ICovXG5cdHJlZ2lzdGVyOiBmdW5jdGlvbiAobG9jYXRvcikge1xuXHRcdHZhciBjb25maWcgPSBsb2NhdG9yLnJlc29sdmUoJ2NvbmZpZycpO1xuXHRcdGxvY2F0b3IucmVnaXN0ZXIoJ3VocicsIFVIUiwgY29uZmlnLCB0cnVlKTtcblx0fSxcblx0VUhSOiBVSFJcbn07IiwiLypcbiAqIGNhdGJlcnJ5XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0IERlbmlzIFJlY2hrdW5vdiBhbmQgcHJvamVjdCBjb250cmlidXRvcnMuXG4gKlxuICogY2F0YmVycnkncyBsaWNlbnNlIGZvbGxvd3M6XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb25cbiAqIG9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uXG4gKiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sXG4gKiBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLFxuICogcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSxcbiAqIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4gKiBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuICogaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuICogT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuICogU09GVFdBUkUuXG4gKlxuICogVGhpcyBsaWNlbnNlIGFwcGxpZXMgdG8gYWxsIHBhcnRzIG9mIGNhdGJlcnJ5IHRoYXQgYXJlIG5vdCBleHRlcm5hbGx5XG4gKiBtYWludGFpbmVkIGxpYnJhcmllcy5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gVUhSQmFzZTtcblxudmFyIGNhdGJlcnJ5VXJpID0gcmVxdWlyZSgnY2F0YmVycnktdXJpJyksXG5cdFF1ZXJ5ID0gY2F0YmVycnlVcmkuUXVlcnksXG5cdFVSSSA9IGNhdGJlcnJ5VXJpLlVSSTtcblxudmFyIEVSUk9SX1VOU1VQUE9SVEVEX1BST1RPQ09MID0gJ1Byb3RvY29sIGlzIHVuc3VwcG9ydGVkJyxcblx0RVJST1JfUEFSQU1FVEVSU19TSE9VTERfQkVfT0JKRUNUID0gJ1JlcXVlc3QgcGFyYW1ldGVycyBzaG91bGQgYmUgb2JqZWN0Jyxcblx0RVJST1JfVVJMX0lTX1JFUVVJUkVEID0gJ1VSTCBpcyByZXF1aXJlZCBwYXJhbWV0ZXInLFxuXHRFUlJPUl9NRVRIT0RfSVNfUkVRVUlSRUQgPSAnUmVxdWVzdCBtZXRob2QgaXMgcmVxdWlyZWQgcGFyYW1ldGVyJyxcblx0RVJST1JfSE9TVF9JU19SRVFVSVJFRCA9ICdIb3N0IGluIFVSTCBpcyByZXF1aXJlZCcsXG5cdEVSUk9SX1NDSEVNRV9JU19SRVFVSVJFRCA9ICdTY2hlbWUgaW4gVVJMIGlzIHJlcXVpcmVkJyxcblx0RVJST1JfVElNRU9VVF9TSE9VTERfQkVfTlVNQkVSID0gJ1RpbWVvdXQgc2hvdWxkIGJlIGEgbnVtYmVyJyxcblx0REVGQVVMVF9USU1FT1VUID0gMzAwMDAsXG5cdEhUVFBfUFJPVE9DT0xfUkVHRVhQID0gL14oaHR0cClzPyQvaTtcblxudmFyIE1FVEhPRFMgPSB7XG5cdEdFVDogJ0dFVCcsXG5cdEhFQUQ6ICdIRUFEJyxcblx0UE9TVDogJ1BPU1QnLFxuXHRQVVQ6ICdQVVQnLFxuXHRQQVRDSDogJ1BBVENIJyxcblx0REVMRVRFOiAnREVMRVRFJyxcblx0T1BUSU9OUzogJ09QVElPTlMnLFxuXHRUUkFDRTogJ1RSQUNFJyxcblx0Q09OTkVDVDogJ0NPTk5FQ1QnXG59O1xuXG5VSFJCYXNlLlRZUEVTID0ge1xuXHRVUkxfRU5DT0RFRDogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcsXG5cdEpTT046ICdhcHBsaWNhdGlvbi9qc29uJyxcblx0UExBSU5fVEVYVDogJ3RleHQvcGxhaW4nLFxuXHRIVE1MOiAndGV4dC9odG1sJ1xufTtcblxuVUhSQmFzZS5DSEFSU0VUID0gJ1VURi04JztcblxuVUhSQmFzZS5ERUZBVUxUX0dFTkVSQUxfSEVBREVSUyA9IHtcblx0QWNjZXB0OiBVSFJCYXNlLlRZUEVTLkpTT04gKyAnOyBxPTAuNywgJyArXG5cdFx0VUhSQmFzZS5UWVBFUy5IVE1MICsgJzsgcT0wLjIsICcgK1xuXHRcdFVIUkJhc2UuVFlQRVMuUExBSU5fVEVYVCArICc7IHE9MC4xJyxcblx0J0FjY2VwdC1DaGFyc2V0JzogVUhSQmFzZS5DSEFSU0VUICsgJzsgcT0xJ1xufTtcblxuVUhSQmFzZS5DSEFSU0VUX1BBUkFNRVRFUiA9ICc7IGNoYXJzZXQ9JyArIFVIUkJhc2UuQ0hBUlNFVDtcblVIUkJhc2UuVVJMX0VOQ09ERURfRU5USVRZX0NPTlRFTlRfVFlQRSA9IFVIUkJhc2UuVFlQRVMuVVJMX0VOQ09ERUQgK1xuXHRVSFJCYXNlLkNIQVJTRVRfUEFSQU1FVEVSO1xuXG5VSFJCYXNlLkpTT05fRU5USVRZX0NPTlRFTlRfVFlQRSA9IFVIUkJhc2UuVFlQRVMuSlNPTiArXG5cdFVIUkJhc2UuQ0hBUlNFVF9QQVJBTUVURVI7XG5cblVIUkJhc2UuUExBSU5fVEVYVF9FTlRJVFlfQ09OVEVOVF9UWVBFID0gVUhSQmFzZS5UWVBFUy5QTEFJTl9URVhUICtcblx0VUhSQmFzZS5DSEFSU0VUX1BBUkFNRVRFUjtcblxuLy8gVGhpcyBtb2R1bGUgd2VyZSBkZXZlbG9wZWQgdXNpbmcgSFRUUC8xLjF2MiBSRkMgMjYxNlxuLy8gKGh0dHA6Ly93d3cudzMub3JnL1Byb3RvY29scy9yZmMyNjE2Lylcbi8qKlxuICogQ3JlYXRlcyBuZXcgaW5zdGFuY2Ugb2YgQmFzaWMgVW5pdmVyc2FsIEhUVFAoUykgUmVxdWVzdCBpbXBsZW1lbnRhdGlvbi5cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBVSFJCYXNlKCkge1xuXG59XG5cbi8qKlxuICogRG9lcyBHRVQgcmVxdWVzdCB0byBIVFRQIHNlcnZlci5cbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVVJMIHRvIHJlcXVlc3QuXG4gKiBAcGFyYW0ge09iamVjdD99IG9wdGlvbnMgUmVxdWVzdCBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtPYmplY3Q/fSBvcHRpb25zLmhlYWRlcnMgSFRUUCBoZWFkZXJzIHRvIHNlbmQuXG4gKiBAcGFyYW0ge1N0cmluZ3xPYmplY3Q/fSBvcHRpb25zLmRhdGEgRGF0YSB0byBzZW5kLlxuICogQHBhcmFtIHtOdW1iZXI/fSBvcHRpb25zLnRpbWVvdXQgUmVxdWVzdCB0aW1lb3V0LlxuICogQHBhcmFtIHtCb29sZWFuP30gb3B0aW9ucy51bnNhZmVIVFRQUyBJZiB0cnVlIHRoZW4gcmVxdWVzdHMgdG8gc2VydmVycyB3aXRoXG4gKiBpbnZhbGlkIEhUVFBTIGNlcnRpZmljYXRlcyBhcmUgYWxsb3dlZC5cbiAqIEByZXR1cm5zIHtQcm9taXNlPE9iamVjdD59IFByb21pc2UgZm9yIHJlc3VsdCB3aXRoIHN0YXR1cyBvYmplY3QgYW5kIGNvbnRlbnQuXG4gKi9cblVIUkJhc2UucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cdHZhciBwYXJhbWV0ZXJzID0gT2JqZWN0LmNyZWF0ZShvcHRpb25zKTtcblx0cGFyYW1ldGVycy5tZXRob2QgPSBNRVRIT0RTLkdFVDtcblx0cGFyYW1ldGVycy51cmwgPSB1cmw7XG5cdHJldHVybiB0aGlzLnJlcXVlc3QocGFyYW1ldGVycyk7XG59O1xuXG4vKipcbiAqIERvZXMgUE9TVCByZXF1ZXN0IHRvIEhUVFAgc2VydmVyLlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBVUkwgdG8gcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0P30gb3B0aW9ucyBSZXF1ZXN0IHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0ge09iamVjdD99IG9wdGlvbnMuaGVhZGVycyBIVFRQIGhlYWRlcnMgdG8gc2VuZC5cbiAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdD99IG9wdGlvbnMuZGF0YSBEYXRhIHRvIHNlbmQuXG4gKiBAcGFyYW0ge051bWJlcj99IG9wdGlvbnMudGltZW91dCBSZXF1ZXN0IHRpbWVvdXQuXG4gKiBAcGFyYW0ge0Jvb2xlYW4/fSBvcHRpb25zLnVuc2FmZUhUVFBTIElmIHRydWUgdGhlbiByZXF1ZXN0cyB0byBzZXJ2ZXJzIHdpdGhcbiAqIGludmFsaWQgSFRUUFMgY2VydGlmaWNhdGVzIGFyZSBhbGxvd2VkLlxuICogQHJldHVybnMge1Byb21pc2U8T2JqZWN0Pn0gUHJvbWlzZSBmb3IgcmVzdWx0IHdpdGggc3RhdHVzIG9iamVjdCBhbmQgY29udGVudC5cbiAqL1xuVUhSQmFzZS5wcm90b3R5cGUucG9zdCA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cdHZhciBwYXJhbWV0ZXJzID0gT2JqZWN0LmNyZWF0ZShvcHRpb25zKTtcblx0cGFyYW1ldGVycy5tZXRob2QgPSBNRVRIT0RTLlBPU1Q7XG5cdHBhcmFtZXRlcnMudXJsID0gdXJsO1xuXHRyZXR1cm4gdGhpcy5yZXF1ZXN0KHBhcmFtZXRlcnMpO1xufTtcblxuLyoqXG4gKiBEb2VzIFBVVCByZXF1ZXN0IHRvIEhUVFAgc2VydmVyLlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBVUkwgdG8gcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0P30gb3B0aW9ucyBSZXF1ZXN0IHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0ge09iamVjdD99IG9wdGlvbnMuaGVhZGVycyBIVFRQIGhlYWRlcnMgdG8gc2VuZC5cbiAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdD99IG9wdGlvbnMuZGF0YSBEYXRhIHRvIHNlbmQuXG4gKiBAcGFyYW0ge051bWJlcj99IG9wdGlvbnMudGltZW91dCBSZXF1ZXN0IHRpbWVvdXQuXG4gKiBAcGFyYW0ge0Jvb2xlYW4/fSBvcHRpb25zLnVuc2FmZUhUVFBTIElmIHRydWUgdGhlbiByZXF1ZXN0cyB0byBzZXJ2ZXJzIHdpdGhcbiAqIGludmFsaWQgSFRUUFMgY2VydGlmaWNhdGVzIGFyZSBhbGxvd2VkLlxuICogQHJldHVybnMge1Byb21pc2U8T2JqZWN0Pn0gUHJvbWlzZSBmb3IgcmVzdWx0IHdpdGggc3RhdHVzIG9iamVjdCBhbmQgY29udGVudC5cbiAqL1xuVUhSQmFzZS5wcm90b3R5cGUucHV0ID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblx0dmFyIHBhcmFtZXRlcnMgPSBPYmplY3QuY3JlYXRlKG9wdGlvbnMpO1xuXHRwYXJhbWV0ZXJzLm1ldGhvZCA9IE1FVEhPRFMuUFVUO1xuXHRwYXJhbWV0ZXJzLnVybCA9IHVybDtcblx0cmV0dXJuIHRoaXMucmVxdWVzdChwYXJhbWV0ZXJzKTtcbn07XG5cbi8qKlxuICogRG9lcyBQQVRDSCByZXF1ZXN0IHRvIEhUVFAgc2VydmVyLlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBVUkwgdG8gcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0P30gb3B0aW9ucyBSZXF1ZXN0IHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0ge09iamVjdD99IG9wdGlvbnMuaGVhZGVycyBIVFRQIGhlYWRlcnMgdG8gc2VuZC5cbiAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdD99IG9wdGlvbnMuZGF0YSBEYXRhIHRvIHNlbmQuXG4gKiBAcGFyYW0ge051bWJlcj99IG9wdGlvbnMudGltZW91dCBSZXF1ZXN0IHRpbWVvdXQuXG4gKiBAcGFyYW0ge0Jvb2xlYW4/fSBvcHRpb25zLnVuc2FmZUhUVFBTIElmIHRydWUgdGhlbiByZXF1ZXN0cyB0byBzZXJ2ZXJzIHdpdGhcbiAqIGludmFsaWQgSFRUUFMgY2VydGlmaWNhdGVzIGFyZSBhbGxvd2VkLlxuICogQHJldHVybnMge1Byb21pc2U8T2JqZWN0Pn0gUHJvbWlzZSBmb3IgcmVzdWx0IHdpdGggc3RhdHVzIG9iamVjdCBhbmQgY29udGVudC5cbiAqL1xuVUhSQmFzZS5wcm90b3R5cGUucGF0Y2ggPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXHR2YXIgcGFyYW1ldGVycyA9IE9iamVjdC5jcmVhdGUob3B0aW9ucyk7XG5cdHBhcmFtZXRlcnMubWV0aG9kID0gTUVUSE9EUy5QQVRDSDtcblx0cGFyYW1ldGVycy51cmwgPSB1cmw7XG5cdHJldHVybiB0aGlzLnJlcXVlc3QocGFyYW1ldGVycyk7XG59O1xuXG4vKipcbiAqIERvZXMgREVMRVRFIHJlcXVlc3QgdG8gSFRUUCBzZXJ2ZXIuXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFVSTCB0byByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3Q/fSBvcHRpb25zIFJlcXVlc3QgcGFyYW1ldGVycy5cbiAqIEBwYXJhbSB7T2JqZWN0P30gb3B0aW9ucy5oZWFkZXJzIEhUVFAgaGVhZGVycyB0byBzZW5kLlxuICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0P30gb3B0aW9ucy5kYXRhIERhdGEgdG8gc2VuZC5cbiAqIEBwYXJhbSB7TnVtYmVyP30gb3B0aW9ucy50aW1lb3V0IFJlcXVlc3QgdGltZW91dC5cbiAqIEBwYXJhbSB7Qm9vbGVhbj99IG9wdGlvbnMudW5zYWZlSFRUUFMgSWYgdHJ1ZSB0aGVuIHJlcXVlc3RzIHRvIHNlcnZlcnMgd2l0aFxuICogaW52YWxpZCBIVFRQUyBjZXJ0aWZpY2F0ZXMgYXJlIGFsbG93ZWQuXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxPYmplY3Q+fSBQcm9taXNlIGZvciByZXN1bHQgd2l0aCBzdGF0dXMgb2JqZWN0IGFuZCBjb250ZW50LlxuICovXG5VSFJCYXNlLnByb3RvdHlwZS5kZWxldGUgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XG5cdHZhciBwYXJhbWV0ZXJzID0gT2JqZWN0LmNyZWF0ZShvcHRpb25zKTtcblx0cGFyYW1ldGVycy5tZXRob2QgPSBNRVRIT0RTLkRFTEVURTtcblx0cGFyYW1ldGVycy51cmwgPSB1cmw7XG5cdHJldHVybiB0aGlzLnJlcXVlc3QocGFyYW1ldGVycyk7XG59O1xuXG4vKipcbiAqIERvZXMgcmVxdWVzdCB3aXRoIHNwZWNpZmllZCBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtPYmplY3R9IHBhcmFtZXRlcnMgUmVxdWVzdCBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtTdHJpbmd9IHBhcmFtZXRlcnMubWV0aG9kIEhUVFAgbWV0aG9kLlxuICogQHBhcmFtIHtTdHJpbmd9IHBhcmFtZXRlcnMudXJsIFVSTCBmb3IgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0P30gcGFyYW1ldGVycy5oZWFkZXJzIEhUVFAgaGVhZGVycyB0byBzZW5kLlxuICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0P30gcGFyYW1ldGVycy5kYXRhIERhdGEgdG8gc2VuZC5cbiAqIEBwYXJhbSB7TnVtYmVyP30gcGFyYW1ldGVycy50aW1lb3V0IFJlcXVlc3QgdGltZW91dC5cbiAqIEBwYXJhbSB7Qm9vbGVhbj99IHBhcmFtZXRlcnMudW5zYWZlSFRUUFMgSWYgdHJ1ZSB0aGVuIHJlcXVlc3RzXG4gKiB0byBzZXJ2ZXJzIHdpdGggaW52YWxpZCBIVFRQUyBjZXJ0aWZpY2F0ZXMgYXJlIGFsbG93ZWQuXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxPYmplY3Q+fSBQcm9taXNlIGZvciByZXN1bHQgd2l0aCBzdGF0dXMgb2JqZWN0IGFuZCBjb250ZW50LlxuICovXG5VSFJCYXNlLnByb3RvdHlwZS5yZXF1ZXN0ID0gZnVuY3Rpb24gKHBhcmFtZXRlcnMpIHtcblx0dmFyIHNlbGYgPSB0aGlzO1xuXHRyZXR1cm4gdGhpcy5fdmFsaWRhdGVSZXF1ZXN0KHBhcmFtZXRlcnMpXG5cdFx0LnRoZW4oZnVuY3Rpb24gKHZhbGlkYXRlZCkge1xuXHRcdFx0cmV0dXJuIHNlbGYuX2RvUmVxdWVzdCh2YWxpZGF0ZWQpO1xuXHRcdH0pO1xufTtcblxuLyoqXG4gKiBWYWxpZGF0ZXMgVUhSIHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0ge09iamVjdH0gcGFyYW1ldGVycyBSZXF1ZXN0IHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0ge1N0cmluZ30gcGFyYW1ldGVycy5tZXRob2QgSFRUUCBtZXRob2QuXG4gKiBAcGFyYW0ge1N0cmluZ30gcGFyYW1ldGVycy51cmwgVVJMIGZvciByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3Q/fSBwYXJhbWV0ZXJzLmhlYWRlcnMgSFRUUCBoZWFkZXJzIHRvIHNlbmQuXG4gKiBAcGFyYW0ge1N0cmluZ3xPYmplY3Q/fSBwYXJhbWV0ZXJzLmRhdGEgRGF0YSB0byBzZW5kLlxuICogQHBhcmFtIHtOdW1iZXI/fSBwYXJhbWV0ZXJzLnRpbWVvdXQgUmVxdWVzdCB0aW1lb3V0LlxuICogQHBhcmFtIHtCb29sZWFuP30gcGFyYW1ldGVycy51bnNhZmVIVFRQUyBJZiB0cnVlIHRoZW4gcmVxdWVzdHNcbiAqIHRvIHNlcnZlcnMgd2l0aCBpbnZhbGlkIEhUVFBTIGNlcnRpZmljYXRlcyBhcmUgYWxsb3dlZC5cbiAqIEByZXR1cm5zIHtQcm9taXNlfSBQcm9taXNlIGZvciBub3RoaW5nLlxuICogQHByaXZhdGVcbiAqL1xuLypqc2hpbnQgbWF4Y29tcGxleGl0eTpmYWxzZSAqL1xuVUhSQmFzZS5wcm90b3R5cGUuX3ZhbGlkYXRlUmVxdWVzdCA9IGZ1bmN0aW9uIChwYXJhbWV0ZXJzKSB7XG5cdGlmICghcGFyYW1ldGVycyB8fCB0eXBlb2YocGFyYW1ldGVycykgIT09ICdvYmplY3QnKSB7XG5cdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihFUlJPUl9QQVJBTUVURVJTX1NIT1VMRF9CRV9PQkpFQ1QpKTtcblx0fVxuXG5cdHZhciB2YWxpZGF0ZWQgPSBPYmplY3QuY3JlYXRlKHBhcmFtZXRlcnMpO1xuXG5cdGlmICh0eXBlb2YocGFyYW1ldGVycy51cmwpICE9PSAnc3RyaW5nJykge1xuXHRcdHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoRVJST1JfVVJMX0lTX1JFUVVJUkVEKSk7XG5cdH1cblx0dmFsaWRhdGVkLnVyaSA9IG5ldyBVUkkodmFsaWRhdGVkLnVybCk7XG5cdGlmICghdmFsaWRhdGVkLnVyaS5zY2hlbWUpIHtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKEVSUk9SX1NDSEVNRV9JU19SRVFVSVJFRCkpO1xuXHR9XG5cdGlmICghSFRUUF9QUk9UT0NPTF9SRUdFWFAudGVzdCh2YWxpZGF0ZWQudXJpLnNjaGVtZSkpIHtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKEVSUk9SX1VOU1VQUE9SVEVEX1BST1RPQ09MKSk7XG5cdH1cblx0aWYgKCF2YWxpZGF0ZWQudXJpLmF1dGhvcml0eSB8fCAhdmFsaWRhdGVkLnVyaS5hdXRob3JpdHkuaG9zdCkge1xuXHRcdHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoRVJST1JfSE9TVF9JU19SRVFVSVJFRCkpO1xuXHR9XG5cdGlmICh0eXBlb2YodmFsaWRhdGVkLm1ldGhvZCkgIT09ICdzdHJpbmcnIHx8XG5cdFx0ISh2YWxpZGF0ZWQubWV0aG9kIGluIE1FVEhPRFMpKSB7XG5cdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihFUlJPUl9NRVRIT0RfSVNfUkVRVUlSRUQpKTtcblx0fVxuXG5cdHZhbGlkYXRlZC50aW1lb3V0ID0gdmFsaWRhdGVkLnRpbWVvdXQgfHwgREVGQVVMVF9USU1FT1VUO1xuXHRpZiAodHlwZW9mKHZhbGlkYXRlZC50aW1lb3V0KSAhPT0gJ251bWJlcicpIHtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKEVSUk9SX1RJTUVPVVRfU0hPVUxEX0JFX05VTUJFUikpO1xuXHR9XG5cblx0dmFsaWRhdGVkLmhlYWRlcnMgPSB0aGlzLl9jcmVhdGVIZWFkZXJzKHZhbGlkYXRlZC5oZWFkZXJzKTtcblxuXHRpZiAoIXRoaXMuX2lzVXBzdHJlYW1SZXF1ZXN0KHBhcmFtZXRlcnMubWV0aG9kKSAmJlxuXHRcdHZhbGlkYXRlZC5kYXRhICYmIHR5cGVvZih2YWxpZGF0ZWQuZGF0YSkgPT09ICdvYmplY3QnKSB7XG5cblx0XHR2YXIgZGF0YUtleXMgPSBPYmplY3Qua2V5cyh2YWxpZGF0ZWQuZGF0YSk7XG5cblx0XHRpZiAoZGF0YUtleXMubGVuZ3RoID4gMCAmJiAhdmFsaWRhdGVkLnVyaS5xdWVyeSkge1xuXHRcdFx0dmFsaWRhdGVkLnVyaS5xdWVyeSA9IG5ldyBRdWVyeSgnJyk7XG5cdFx0fVxuXG5cdFx0ZGF0YUtleXMuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0XHR2YWxpZGF0ZWQudXJpLnF1ZXJ5LnZhbHVlc1trZXldID0gdmFsaWRhdGVkLmRhdGFba2V5XTtcblx0XHR9KTtcblx0XHR2YWxpZGF0ZWQuZGF0YSA9IG51bGw7XG5cdH0gZWxzZSB7XG5cdFx0dmFyIGRhdGFBbmRIZWFkZXJzID0gdGhpcy5fZ2V0RGF0YVRvU2VuZChcblx0XHRcdHZhbGlkYXRlZC5oZWFkZXJzLCB2YWxpZGF0ZWQuZGF0YVxuXHRcdCk7XG5cdFx0dmFsaWRhdGVkLmhlYWRlcnMgPSBkYXRhQW5kSGVhZGVycy5oZWFkZXJzO1xuXHRcdHZhbGlkYXRlZC5kYXRhID0gZGF0YUFuZEhlYWRlcnMuZGF0YTtcblx0fVxuXG5cdHJldHVybiBQcm9taXNlLnJlc29sdmUodmFsaWRhdGVkKTtcbn07XG5cbi8qKlxuICogR2V0cyBkYXRhIGZvciBzZW5kaW5nIHZpYSBIVFRQIHJlcXVlc3QgdXNpbmcgQ29udGVudCBUeXBlIEhUVFAgaGVhZGVyLlxuICogQHBhcmFtIHtPYmplY3R9IGhlYWRlcnMgSFRUUCBoZWFkZXJzLlxuICogQHBhcmFtIHtPYmplY3R8c3RyaW5nfSBkYXRhIERhdGEgdG8gc2VuZC5cbiAqIEByZXR1cm5zIHt7aGVhZGVyczogT2JqZWN0LCBkYXRhOiBPYmplY3R8U3RyaW5nfX0gRGF0YSBhbmQgaGVhZGVycyB0byBzZW5kLlxuICogQHByaXZhdGVcbiAqL1xuVUhSQmFzZS5wcm90b3R5cGUuX2dldERhdGFUb1NlbmQgPSBmdW5jdGlvbiAoaGVhZGVycywgZGF0YSkge1xuXHR2YXIgZm91bmQgPSBmaW5kQ29udGVudFR5cGUoaGVhZGVycyksXG5cdFx0Y29udGVudFR5cGVIZWFkZXIgPSBmb3VuZC5uYW1lLFxuXHRcdGNvbnRlbnRUeXBlID0gZm91bmQudHlwZTtcblxuXHRpZiAoIWRhdGEgfHwgdHlwZW9mKGRhdGEpICE9PSAnb2JqZWN0Jykge1xuXHRcdGRhdGEgPSBkYXRhID8gU3RyaW5nKGRhdGEpIDogJyc7XG5cdFx0aWYgKCFjb250ZW50VHlwZSkge1xuXHRcdFx0aGVhZGVyc1tjb250ZW50VHlwZUhlYWRlcl0gPSBVSFJCYXNlLlBMQUlOX1RFWFRfRU5USVRZX0NPTlRFTlRfVFlQRTtcblx0XHR9XG5cdFx0cmV0dXJuIHtcblx0XHRcdGhlYWRlcnM6IGhlYWRlcnMsXG5cdFx0XHRkYXRhOiBkYXRhXG5cdFx0fTtcblx0fVxuXG5cdGlmIChjb250ZW50VHlwZSA9PT0gVUhSQmFzZS5UWVBFUy5KU09OKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGhlYWRlcnM6IGhlYWRlcnMsXG5cdFx0XHRkYXRhOiBKU09OLnN0cmluZ2lmeShkYXRhKVxuXHRcdH07XG5cdH1cblxuXHQvLyBvdGhlcndpc2Ugb2JqZWN0IHdpbGwgYmUgc2VudCB3aXRoXG5cdC8vIGFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFxuXHRoZWFkZXJzW2NvbnRlbnRUeXBlSGVhZGVyXSA9IFVIUkJhc2UuVVJMX0VOQ09ERURfRU5USVRZX0NPTlRFTlRfVFlQRTtcblxuXHR2YXIgcXVlcnkgPSBuZXcgUXVlcnkoKTtcblx0cXVlcnkudmFsdWVzID0gZGF0YTtcblx0cmV0dXJuIHtcblx0XHRoZWFkZXJzOiBoZWFkZXJzLFxuXHRcdGRhdGE6IHF1ZXJ5LnRvU3RyaW5nKClcblx0XHRcdC5yZXBsYWNlKCcrJywgJyUyQicpXG5cdFx0XHQucmVwbGFjZSgnJTIwJywgJysnKVxuXHR9O1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIEhUVFAgaGVhZGVycyBmb3IgcmVxdWVzdCB1c2luZyBkZWZhdWx0cyBhbmQgY3VycmVudCBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtPYmplY3R9IHBhcmFtZXRlckhlYWRlcnMgSFRUUCBoZWFkZXJzIG9mIFVIUi5cbiAqIEBwcm90ZWN0ZWRcbiAqL1xuVUhSQmFzZS5wcm90b3R5cGUuX2NyZWF0ZUhlYWRlcnMgPSBmdW5jdGlvbiAocGFyYW1ldGVySGVhZGVycykge1xuXHRpZiAoIXBhcmFtZXRlckhlYWRlcnMgfHwgdHlwZW9mKHBhcmFtZXRlckhlYWRlcnMpICE9PSAnb2JqZWN0Jykge1xuXHRcdHBhcmFtZXRlckhlYWRlcnMgPSB7fTtcblx0fVxuXHR2YXIgaGVhZGVycyA9IHt9O1xuXG5cdE9iamVjdC5rZXlzKFVIUkJhc2UuREVGQVVMVF9HRU5FUkFMX0hFQURFUlMpXG5cdFx0LmZvckVhY2goZnVuY3Rpb24gKGhlYWRlck5hbWUpIHtcblx0XHRcdGhlYWRlcnNbaGVhZGVyTmFtZV0gPSBVSFJCYXNlLkRFRkFVTFRfR0VORVJBTF9IRUFERVJTW2hlYWRlck5hbWVdO1xuXHRcdH0pO1xuXG5cdE9iamVjdC5rZXlzKHBhcmFtZXRlckhlYWRlcnMpXG5cdFx0LmZvckVhY2goZnVuY3Rpb24gKGhlYWRlck5hbWUpIHtcblx0XHRcdGlmIChwYXJhbWV0ZXJIZWFkZXJzW2hlYWRlck5hbWVdID09PSBudWxsIHx8XG5cdFx0XHRcdHBhcmFtZXRlckhlYWRlcnNbaGVhZGVyTmFtZV0gPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRkZWxldGUgaGVhZGVyc1toZWFkZXJOYW1lXTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0aGVhZGVyc1toZWFkZXJOYW1lXSA9IHBhcmFtZXRlckhlYWRlcnNbaGVhZGVyTmFtZV07XG5cdFx0fSk7XG5cblx0cmV0dXJuIGhlYWRlcnM7XG59O1xuXG4vKipcbiAqIERvZXMgcmVxdWVzdCB3aXRoIHNwZWNpZmllZCBwYXJhbWV0ZXJzIHVzaW5nIHByb3RvY29sIGltcGxlbWVudGF0aW9uLlxuICogQHBhcmFtIHtPYmplY3R9IHBhcmFtZXRlcnMgUmVxdWVzdCBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtTdHJpbmd9IHBhcmFtZXRlcnMubWV0aG9kIEhUVFAgbWV0aG9kLlxuICogQHBhcmFtIHtTdHJpbmd9IHBhcmFtZXRlcnMudXJsIFVSTCBmb3IgcmVxdWVzdC5cbiAqIEBwYXJhbSB7VVJJfSBwYXJhbWV0ZXJzLnVyaSBVUkkgb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IHBhcmFtZXRlcnMuaGVhZGVycyBIVFRQIGhlYWRlcnMgdG8gc2VuZC5cbiAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdH0gcGFyYW1ldGVycy5kYXRhIERhdGEgdG8gc2VuZC5cbiAqIEBwYXJhbSB7TnVtYmVyfSBwYXJhbWV0ZXJzLnRpbWVvdXQgUmVxdWVzdCB0aW1lb3V0LlxuICogQHBhcmFtIHtCb29sZWFufSBwYXJhbWV0ZXJzLnVuc2FmZUhUVFBTIElmIHRydWUgdGhlbiByZXF1ZXN0cyB0byBzZXJ2ZXJzIHdpdGhcbiAqIGludmFsaWQgSFRUUFMgY2VydGlmaWNhdGVzIGFyZSBhbGxvd2VkLlxuICogQHJldHVybnMge1Byb21pc2U8T2JqZWN0Pn0gUHJvbWlzZSBmb3IgcmVzdWx0IHdpdGggc3RhdHVzIG9iamVjdCBhbmQgY29udGVudC5cbiAqIEBwcm90ZWN0ZWRcbiAqIEBhYnN0cmFjdFxuICovXG5VSFJCYXNlLnByb3RvdHlwZS5fZG9SZXF1ZXN0ID0gZnVuY3Rpb24gKHBhcmFtZXRlcnMpIHtcbn07XG5cbi8qKlxuICogQ29udmVydHMgcmVzcG9uc2UgZGF0YSBhY2NvcmRpbmcgY29udGVudCB0eXBlLlxuICogQHBhcmFtIHtPYmplY3R9IGhlYWRlcnMgSFRUUCBoZWFkZXJzLlxuICogQHBhcmFtIHtzdHJpbmd9IHJlc3BvbnNlRGF0YSBEYXRhIGZyb20gcmVzcG9uc2UuXG4gKiBAcmV0dXJucyB7c3RyaW5nfE9iamVjdH0gQ29udmVydGVkIGRhdGEuXG4gKi9cblVIUkJhc2UucHJvdG90eXBlLmNvbnZlcnRSZXNwb25zZSA9IGZ1bmN0aW9uIChoZWFkZXJzLCByZXNwb25zZURhdGEpIHtcblx0aWYgKHR5cGVvZihyZXNwb25zZURhdGEpICE9PSAnc3RyaW5nJykge1xuXHRcdHJlc3BvbnNlRGF0YSA9ICcnO1xuXHR9XG5cdHZhciBmb3VuZCA9IGZpbmRDb250ZW50VHlwZShoZWFkZXJzKSxcblx0XHRjb250ZW50VHlwZSA9IGZvdW5kLnR5cGUgfHwgVUhSQmFzZS5UWVBFUy5QTEFJTl9URVhUO1xuXG5cdHN3aXRjaCAoY29udGVudFR5cGUpIHtcblx0XHRjYXNlIFVIUkJhc2UuVFlQRVMuSlNPTjpcblx0XHRcdHZhciBqc29uO1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0anNvbiA9IEpTT04ucGFyc2UocmVzcG9uc2VEYXRhKTtcblx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0Ly8gbm90aGluZyB0byBkb1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGpzb24gfHwge307XG5cdFx0Y2FzZSBVSFJCYXNlLlRZUEVTLlVSTF9FTkNPREVEOlxuXHRcdFx0dmFyIG9iamVjdDtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdHZhciBxdWVyeSA9IG5ldyBRdWVyeShyZXNwb25zZURhdGEucmVwbGFjZSgnKycsICclMjAnKSk7XG5cdFx0XHRcdG9iamVjdCA9IHF1ZXJ5LnZhbHVlcztcblx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0Ly8gbm90aGluZyB0byBkb1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG9iamVjdCB8fCB7fTtcblx0XHRkZWZhdWx0OlxuXHRcdFx0cmV0dXJuIHJlc3BvbnNlRGF0YTtcblx0fVxufTtcblxuLyoqXG4gKiBEZXRlcm1pbmVzIGlzIGN1cnJlbnQgcXVlcnkgbmVlZHMgdG8gdXNlIHVwc3RyZWFtLlxuICogQHBhcmFtIHtTdHJpbmd9IG1ldGhvZCBIVFRQIG1ldGhvZC5cbiAqIEByZXR1cm5zIHtCb29sZWFufSBJcyBjdXJyZW50IEhUVFAgbWV0aG9kIG1lYW5zIHVwc3RyZWFtIHVzYWdlLlxuICogQHByb3RlY3RlZFxuICovXG5VSFJCYXNlLnByb3RvdHlwZS5faXNVcHN0cmVhbVJlcXVlc3QgPSBmdW5jdGlvbiAobWV0aG9kKSB7XG5cdHJldHVybiAoXG5cdFx0bWV0aG9kID09PSBNRVRIT0RTLlBPU1QgfHxcblx0XHRtZXRob2QgPT09IE1FVEhPRFMuUFVUIHx8XG5cdFx0bWV0aG9kID09PSBNRVRIT0RTLlBBVENIXG5cdFx0KTtcbn07XG5cbi8qKlxuICogRmluZHMgY29udGVudCB0eXBlIGhlYWRlciBpbiBoZWFkZXJzIG9iamVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBoZWFkZXJzIEhUVFAgaGVhZGVycy5cbiAqIEByZXR1cm5zIHt7bmFtZTogU3RyaW5nLCB0eXBlOiBTdHJpbmd9fSBOYW1lIG9mIGhlYWRlciBhbmQgY29udGVudCB0eXBlLlxuICovXG5mdW5jdGlvbiBmaW5kQ29udGVudFR5cGUoaGVhZGVycykge1xuXHR2YXIgY29udGVudFR5cGVTdHJpbmcgPSAnJyxcblx0XHRjb250ZW50VHlwZUhlYWRlciA9ICdDb250ZW50LVR5cGUnO1xuXG5cdE9iamVjdC5rZXlzKGhlYWRlcnMpXG5cdFx0LmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdFx0aWYgKGtleS50b0xvd2VyQ2FzZSgpICE9PSAnY29udGVudC10eXBlJykge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRjb250ZW50VHlwZUhlYWRlciA9IGtleTtcblx0XHRcdGNvbnRlbnRUeXBlU3RyaW5nID0gaGVhZGVyc1trZXldO1xuXHRcdH0pO1xuXG5cdHZhciB0eXBlQW5kUGFyYW1ldGVycyA9IGNvbnRlbnRUeXBlU3RyaW5nLnNwbGl0KCc7JyksXG5cdFx0Y29udGVudFR5cGUgPSB0eXBlQW5kUGFyYW1ldGVyc1swXS50b0xvd2VyQ2FzZSgpO1xuXHRyZXR1cm4ge1xuXHRcdG5hbWU6IGNvbnRlbnRUeXBlSGVhZGVyLFxuXHRcdHR5cGU6IGNvbnRlbnRUeXBlXG5cdH07XG59IiwiLypcbiAqIGNhdGJlcnJ5XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0IERlbmlzIFJlY2hrdW5vdiBhbmQgcHJvamVjdCBjb250cmlidXRvcnMuXG4gKlxuICogY2F0YmVycnkncyBsaWNlbnNlIGZvbGxvd3M6XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb25cbiAqIG9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uXG4gKiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sXG4gKiBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLFxuICogcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSxcbiAqIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4gKiBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuICogaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuICogT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuICogU09GVFdBUkUuXG4gKlxuICogVGhpcyBsaWNlbnNlIGFwcGxpZXMgdG8gYWxsIHBhcnRzIG9mIGNhdGJlcnJ5IHRoYXQgYXJlIG5vdCBleHRlcm5hbGx5XG4gKiBtYWludGFpbmVkIGxpYnJhcmllcy5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHRVUkk6IHJlcXVpcmUoJy4vbGliL1VSSScpLFxuXHRBdXRob3JpdHk6IHJlcXVpcmUoJy4vbGliL0F1dGhvcml0eScpLFxuXHRVc2VySW5mbzogcmVxdWlyZSgnLi9saWIvVXNlckluZm8nKSxcblx0UXVlcnk6IHJlcXVpcmUoJy4vbGliL1F1ZXJ5Jylcbn07IiwiLypcbiAqIGNhdGJlcnJ5LXVyaVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNCBEZW5pcyBSZWNoa3Vub3YgYW5kIHByb2plY3QgY29udHJpYnV0b3JzLlxuICpcbiAqIGNhdGJlcnJ5LXVyaSdzIGxpY2Vuc2UgZm9sbG93czpcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvblxuICogb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb25cbiAqIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbixcbiAqIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsXG4gKiBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLFxuICogYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbiAqIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4gKiBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4gKiBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqXG4gKiBUaGlzIGxpY2Vuc2UgYXBwbGllcyB0byBhbGwgcGFydHMgb2YgY2F0YmVycnktdXJpIHRoYXQgYXJlIG5vdCBleHRlcm5hbGx5XG4gKiBtYWludGFpbmVkIGxpYnJhcmllcy5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gQXV0aG9yaXR5O1xuXG52YXIgVXNlckluZm8gPSByZXF1aXJlKCcuL1VzZXJJbmZvJyksXG5cdHBlcmNlbnRFbmNvZGluZ0hlbHBlciA9IHJlcXVpcmUoJy4vcGVyY2VudEVuY29kaW5nSGVscGVyJyk7XG5cbnZhciBQT1JUX1JFR0VYUCA9IC9eXFxkKyQvLFxuXHRFUlJPUl9QT1JUID0gJ1VSSSBhdXRob3JpdHkgcG9ydCBtdXN0IHNhdGlzZnkgZXhwcmVzc2lvbiAnICtcblx0XHRQT1JUX1JFR0VYUC50b1N0cmluZygpO1xuXG4vKipcbiAqIENyZWF0ZXMgbmV3IGluc3RhbmNlIG9mIFVSSSBhdXRob3JpdHkgY29tcG9uZW50IHBhcnNlci5cbiAqIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzOTg2I3NlY3Rpb24tMy4yXG4gKiBAcGFyYW0ge1N0cmluZz99IGF1dGhvcml0eVN0cmluZyBVUkkgYXV0aG9yaXR5IGNvbXBvbmVudCBzdHJpbmcuXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gQXV0aG9yaXR5KGF1dGhvcml0eVN0cmluZykge1xuXHRpZiAodHlwZW9mKGF1dGhvcml0eVN0cmluZykgPT09ICdzdHJpbmcnICYmIGF1dGhvcml0eVN0cmluZy5sZW5ndGggPiAwKSB7XG5cdFx0dmFyIGZpcnN0QXRJbmRleCA9IGF1dGhvcml0eVN0cmluZy5pbmRleE9mKCdAJyk7XG5cdFx0aWYgKGZpcnN0QXRJbmRleCAhPT0gLTEpIHtcblx0XHRcdHZhciB1c2VySW5mb1N0cmluZyA9IGF1dGhvcml0eVN0cmluZy5zdWJzdHJpbmcoMCwgZmlyc3RBdEluZGV4KTtcblx0XHRcdHRoaXMudXNlckluZm8gPSBuZXcgVXNlckluZm8odXNlckluZm9TdHJpbmcpO1xuXHRcdFx0YXV0aG9yaXR5U3RyaW5nID0gYXV0aG9yaXR5U3RyaW5nLnN1YnN0cmluZyhmaXJzdEF0SW5kZXggKyAxKTtcblx0XHR9XG5cblx0XHR2YXIgbGFzdENvbG9uSW5kZXggPSBhdXRob3JpdHlTdHJpbmcubGFzdEluZGV4T2YoJzonKTtcblx0XHRpZiAobGFzdENvbG9uSW5kZXggIT09IC0xKSB7XG5cdFx0XHR2YXIgcG9ydFN0cmluZyA9IGF1dGhvcml0eVN0cmluZy5zdWJzdHJpbmcobGFzdENvbG9uSW5kZXggKyAxKTtcblx0XHRcdGlmIChsYXN0Q29sb25JbmRleCA9PT0gYXV0aG9yaXR5U3RyaW5nLmxlbmd0aCAtIDEpIHtcblx0XHRcdFx0dGhpcy5wb3J0ID0gJyc7XG5cdFx0XHRcdGF1dGhvcml0eVN0cmluZyA9IGF1dGhvcml0eVN0cmluZy5zdWJzdHJpbmcoMCwgbGFzdENvbG9uSW5kZXgpO1xuXHRcdFx0fWVsc2UgaWYgKFBPUlRfUkVHRVhQLnRlc3QocG9ydFN0cmluZykpIHtcblx0XHRcdFx0dGhpcy5wb3J0ID0gcG9ydFN0cmluZztcblx0XHRcdFx0YXV0aG9yaXR5U3RyaW5nID0gYXV0aG9yaXR5U3RyaW5nLnN1YnN0cmluZygwLCBsYXN0Q29sb25JbmRleCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dGhpcy5ob3N0ID0gcGVyY2VudEVuY29kaW5nSGVscGVyLmRlY29kZShhdXRob3JpdHlTdHJpbmcpO1xuXHR9XG59XG5cbi8qKlxuICogQ3VycmVudCB1c2VyIGluZm9ybWF0aW9uLlxuICogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzM5ODYjc2VjdGlvbi0zLjIuMVxuICogQHR5cGUge1VzZXJJbmZvfVxuICovXG5BdXRob3JpdHkucHJvdG90eXBlLnVzZXJJbmZvID0gbnVsbDtcblxuLyoqXG4gKiBDdXJyZW50IGhvc3QuXG4gKiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzk4NiNzZWN0aW9uLTMuMi4yXG4gKiBAdHlwZSB7U3RyaW5nfVxuICovXG5BdXRob3JpdHkucHJvdG90eXBlLmhvc3QgPSBudWxsO1xuXG4vKipcbiAqIEN1cnJlbnQgcG9ydC5cbiAqIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzOTg2I3NlY3Rpb24tMy4yLjNcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKi9cbkF1dGhvcml0eS5wcm90b3R5cGUucG9ydCA9IG51bGw7XG5cbi8qKlxuICogQ2xvbmVzIGN1cnJlbnQgYXV0aG9yaXR5LlxuICogQHJldHVybnMge0F1dGhvcml0eX0gTmV3IGNsb25lIG9mIGN1cnJlbnQgb2JqZWN0LlxuICovXG5BdXRob3JpdHkucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24gKCkge1xuXHR2YXIgYXV0aG9yaXR5ID0gbmV3IEF1dGhvcml0eSgpO1xuXHRpZiAodGhpcy51c2VySW5mbykge1xuXHRcdGF1dGhvcml0eS51c2VySW5mbyA9IHRoaXMudXNlckluZm8uY2xvbmUoKTtcblx0fVxuXHRpZiAodHlwZW9mKHRoaXMuaG9zdCkgPT09ICdzdHJpbmcnKSB7XG5cdFx0YXV0aG9yaXR5Lmhvc3QgPSB0aGlzLmhvc3Q7XG5cdH1cblx0aWYgKHR5cGVvZih0aGlzLnBvcnQpID09PSAnc3RyaW5nJykge1xuXHRcdGF1dGhvcml0eS5wb3J0ID0gdGhpcy5wb3J0O1xuXHR9XG5cdHJldHVybiBhdXRob3JpdHk7XG59O1xuXG4vKipcbiAqIFJlY29tYmluZSBhbGwgYXV0aG9yaXR5IGNvbXBvbmVudHMgaW50byBhdXRob3JpdHkgc3RyaW5nLlxuICogQHJldHVybnMge3N0cmluZ30gQXV0aG9yaXR5IGNvbXBvbmVudCBzdHJpbmcuXG4gKi9cbkF1dGhvcml0eS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG5cdHZhciByZXN1bHQgPSAnJztcblx0aWYgKHRoaXMudXNlckluZm8pIHtcblx0XHRyZXN1bHQgKz0gdGhpcy51c2VySW5mby50b1N0cmluZygpICsgJ0AnO1xuXHR9XG5cdGlmICh0aGlzLmhvc3QgIT09IHVuZGVmaW5lZCAmJiB0aGlzLmhvc3QgIT09IG51bGwpIHtcblx0XHR2YXIgaG9zdCA9IFN0cmluZyh0aGlzLmhvc3QpO1xuXHRcdHJlc3VsdCArPSBwZXJjZW50RW5jb2RpbmdIZWxwZXIuZW5jb2RlSG9zdChob3N0KTtcblx0fVxuXHRpZiAodGhpcy5wb3J0ICE9PSB1bmRlZmluZWQgJiYgdGhpcy5wb3J0ICE9PSBudWxsKSB7XG5cdFx0dmFyIHBvcnQgPSBTdHJpbmcodGhpcy5wb3J0KTtcblx0XHRpZiAocG9ydC5sZW5ndGggPiAwICYmICFQT1JUX1JFR0VYUC50ZXN0KHBvcnQpKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoRVJST1JfUE9SVCk7XG5cdFx0fVxuXHRcdHJlc3VsdCArPSAnOicgKyBwb3J0O1xuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8qXG4gKiBjYXRiZXJyeS11cmlcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgRGVuaXMgUmVjaGt1bm92IGFuZCBwcm9qZWN0IGNvbnRyaWJ1dG9ycy5cbiAqXG4gKiBjYXRiZXJyeS11cmkncyBsaWNlbnNlIGZvbGxvd3M6XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb25cbiAqIG9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uXG4gKiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sXG4gKiBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLFxuICogcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSxcbiAqIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4gKiBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuICogaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuICogT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKlxuICogVGhpcyBsaWNlbnNlIGFwcGxpZXMgdG8gYWxsIHBhcnRzIG9mIGNhdGJlcnJ5LXVyaSB0aGF0IGFyZSBub3QgZXh0ZXJuYWxseVxuICogbWFpbnRhaW5lZCBsaWJyYXJpZXMuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFF1ZXJ5O1xuXG52YXIgcGVyY2VudEVuY29kaW5nSGVscGVyID0gcmVxdWlyZSgnLi9wZXJjZW50RW5jb2RpbmdIZWxwZXInKTtcblxuLyoqXG4gKiBDcmVhdGVzIG5ldyBpbnN0YW5jZSBvZiBVUkkgcXVlcnkgY29tcG9uZW50IHBhcnNlci5cbiAqIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzOTg2I3NlY3Rpb24tMy40XG4gKiBAcGFyYW0ge1N0cmluZz99IHF1ZXJ5U3RyaW5nIFVSSSBxdWVyeSBjb21wb25lbnQgc3RyaW5nLlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIFF1ZXJ5KHF1ZXJ5U3RyaW5nKSB7XG5cdGlmICh0eXBlb2YocXVlcnlTdHJpbmcpID09PSAnc3RyaW5nJykge1xuXHRcdHRoaXMudmFsdWVzID0ge307XG5cblx0XHRxdWVyeVN0cmluZ1xuXHRcdFx0LnNwbGl0KCcmJylcblx0XHRcdC5mb3JFYWNoKGZ1bmN0aW9uIChwYWlyKSB7XG5cdFx0XHRcdHZhciBwYXJ0cyA9IHBhaXIuc3BsaXQoJz0nKSxcblx0XHRcdFx0XHRrZXkgPSBwZXJjZW50RW5jb2RpbmdIZWxwZXIuZGVjb2RlKHBhcnRzWzBdKTtcblx0XHRcdFx0aWYgKCFrZXkpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKGtleSBpbiB0aGlzLnZhbHVlcyAmJlxuXHRcdFx0XHRcdCEodGhpcy52YWx1ZXNba2V5XSBpbnN0YW5jZW9mIEFycmF5KSkge1xuXHRcdFx0XHRcdHRoaXMudmFsdWVzW2tleV0gPSBbdGhpcy52YWx1ZXNba2V5XV07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgdmFsdWUgPSB0eXBlb2YocGFydHNbMV0pID09PSAnc3RyaW5nJyA/XG5cdFx0XHRcdFx0cGVyY2VudEVuY29kaW5nSGVscGVyLmRlY29kZShwYXJ0c1sxXSkgOiBudWxsO1xuXG5cdFx0XHRcdGlmICh0aGlzLnZhbHVlc1trZXldIGluc3RhbmNlb2YgQXJyYXkpIHtcblx0XHRcdFx0XHR0aGlzLnZhbHVlc1trZXldLnB1c2godmFsdWUpO1xuXHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHR0aGlzLnZhbHVlc1trZXldID0gdmFsdWU7XG5cdFx0XHRcdH1cblx0XHRcdH0sIHRoaXMpO1xuXHR9XG59XG5cbi8qKlxuICogQ3VycmVudCBzZXQgb2YgdmFsdWVzIG9mIHF1ZXJ5LlxuICogQHR5cGUge09iamVjdH1cbiAqL1xuUXVlcnkucHJvdG90eXBlLnZhbHVlcyA9IG51bGw7XG5cbi8qKlxuICogQ2xvbmVzIGN1cnJlbnQgcXVlcnkgdG8gYSBuZXcgb2JqZWN0LlxuICogQHJldHVybnMge1F1ZXJ5fSBOZXcgY2xvbmUgb2YgY3VycmVudCBvYmplY3QuXG4gKi9cblF1ZXJ5LnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uICgpIHtcblx0dmFyIHF1ZXJ5ID0gbmV3IFF1ZXJ5KCk7XG5cdGlmICh0aGlzLnZhbHVlcykge1xuXHRcdHF1ZXJ5LnZhbHVlcyA9IHt9O1xuXHRcdE9iamVjdC5rZXlzKHRoaXMudmFsdWVzKVxuXHRcdFx0LmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdFx0XHRxdWVyeS52YWx1ZXNba2V5XSA9IHRoaXMudmFsdWVzW2tleV07XG5cdFx0XHR9LCB0aGlzKTtcblx0fVxuXHRyZXR1cm4gcXVlcnk7XG59O1xuXG4vKipcbiAqIENvbnZlcnRzIGN1cnJlbnQgc2V0IG9mIHF1ZXJ5IHZhbHVlcyB0byBzdHJpbmcuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBRdWVyeSBjb21wb25lbnQgc3RyaW5nLlxuICovXG5RdWVyeS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG5cdGlmICghdGhpcy52YWx1ZXMpIHtcblx0XHRyZXR1cm4gJyc7XG5cdH1cblxuXHR2YXIgcXVlcnlTdHJpbmcgPSAnJztcblx0T2JqZWN0LmtleXModGhpcy52YWx1ZXMpXG5cdFx0LmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdFx0dmFyIHZhbHVlcyA9IHRoaXMudmFsdWVzW2tleV0gaW5zdGFuY2VvZiBBcnJheSA/XG5cdFx0XHRcdHRoaXMudmFsdWVzW2tleV0gOiBbdGhpcy52YWx1ZXNba2V5XV07XG5cblx0XHRcdHZhbHVlcy5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSkge1xuXHRcdFx0XHRxdWVyeVN0cmluZyArPSAnJicgKyBwZXJjZW50RW5jb2RpbmdIZWxwZXJcblx0XHRcdFx0XHQuZW5jb2RlUXVlcnlTdWJDb21wb25lbnQoa2V5KTtcblx0XHRcdFx0aWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGwpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdFx0dmFsdWUgPSBTdHJpbmcodmFsdWUpO1xuXHRcdFx0XHRxdWVyeVN0cmluZyArPSAnPScgK1xuXHRcdFx0XHRcdHBlcmNlbnRFbmNvZGluZ0hlbHBlci5lbmNvZGVRdWVyeVN1YkNvbXBvbmVudCh2YWx1ZSk7XG5cdFx0XHR9KTtcblx0XHR9LCB0aGlzKTtcblxuXHRyZXR1cm4gcXVlcnlTdHJpbmcucmVwbGFjZSgvXiYvLCAnJyk7XG59OyIsIi8qXG4gKiBjYXRiZXJyeVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNCBEZW5pcyBSZWNoa3Vub3YgYW5kIHByb2plY3QgY29udHJpYnV0b3JzLlxuICpcbiAqIGNhdGJlcnJ5J3MgbGljZW5zZSBmb2xsb3dzOlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXG4gKiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvblxuICogZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLFxuICogaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSxcbiAqIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsXG4gKiBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuICogc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbiAqIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1NcbiAqIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICpcbiAqIFRoaXMgbGljZW5zZSBhcHBsaWVzIHRvIGFsbCBwYXJ0cyBvZiBjYXRiZXJyeSB0aGF0IGFyZSBub3QgZXh0ZXJuYWxseVxuICogbWFpbnRhaW5lZCBsaWJyYXJpZXMuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFVSSTtcblxudmFyIEF1dGhvcml0eSA9IHJlcXVpcmUoJy4vQXV0aG9yaXR5JyksXG5cdHBlcmNlbnRFbmNvZGluZ0hlbHBlciA9IHJlcXVpcmUoJy4vcGVyY2VudEVuY29kaW5nSGVscGVyJyksXG5cdFF1ZXJ5ID0gcmVxdWlyZSgnLi9RdWVyeScpO1xuXG5cdC8vIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzOTg2I2FwcGVuZGl4LUJcbnZhciBVUklfUEFSU0VfUkVHRVhQID0gbmV3IFJlZ0V4cChcblx0XHQnXigoW146Lz8jXSspOik/KC8vKFteLz8jXSopKT8oW14/I10qKShcXFxcPyhbXiNdKikpPygjKC4qKSk/J1xuXHQpLFxuXHQvLyBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzk4NiNzZWN0aW9uLTMuMVxuXHRTQ0hFTUVfUkVHRVhQID0gL15bYS16XStbYS16XFxkXFwrXFwuLV0qJC9pLFxuXHRFUlJPUl9TQ0hFTUUgPSAnVVJJIHNjaGVtZSBtdXN0IHNhdGlzZnkgZXhwcmVzc2lvbiAnICtcblx0XHRTQ0hFTUVfUkVHRVhQLnRvU3RyaW5nKCksXG5cdEVSUk9SX0JBU0VfU0NIRU1FID0gJ1NjaGVtZSBjb21wb25lbnQgaXMgcmVxdWlyZWQgdG8gYmUgcHJlc2VudCAnICtcblx0XHQnaW4gYSBiYXNlIFVSSSc7XG5cbi8qKlxuICogQ3JlYXRlcyBuZXcgaW5zdGFuY2Ugb2YgVVJJIGFjY29yZGluZyB0byBSRkMgMzk4Ni5cbiAqIEBwYXJhbSB7U3RyaW5nP30gdXJpU3RyaW5nIFVSSSBzdHJpbmcgdG8gcGFyc2UgY29tcG9uZW50cy5cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBVUkkodXJpU3RyaW5nKSB7XG5cdGlmICh0eXBlb2YodXJpU3RyaW5nKSAhPT0gJ3N0cmluZycpIHtcblx0XHR1cmlTdHJpbmcgPSAnJztcblx0fVxuXG5cdC8vIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzOTg2I2FwcGVuZGl4LUJcblx0dmFyIG1hdGNoZXMgPSB1cmlTdHJpbmcubWF0Y2goVVJJX1BBUlNFX1JFR0VYUCk7XG5cblx0aWYgKG1hdGNoZXMpIHtcblx0XHRpZiAodHlwZW9mKG1hdGNoZXNbMl0pID09PSAnc3RyaW5nJykge1xuXHRcdFx0dGhpcy5zY2hlbWUgPSBwZXJjZW50RW5jb2RpbmdIZWxwZXIuZGVjb2RlKG1hdGNoZXNbMl0pO1xuXHRcdH1cblx0XHRpZiAodHlwZW9mKG1hdGNoZXNbNF0pID09PSAnc3RyaW5nJykge1xuXHRcdFx0dGhpcy5hdXRob3JpdHkgPSBuZXcgQXV0aG9yaXR5KG1hdGNoZXNbNF0pO1xuXHRcdH1cblx0XHRpZiAodHlwZW9mKG1hdGNoZXNbNV0pID09PSAnc3RyaW5nJykge1xuXHRcdFx0dGhpcy5wYXRoID0gcGVyY2VudEVuY29kaW5nSGVscGVyLmRlY29kZShtYXRjaGVzWzVdKTtcblx0XHR9XG5cdFx0aWYgKHR5cGVvZihtYXRjaGVzWzddKSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdHRoaXMucXVlcnkgPSBuZXcgUXVlcnkobWF0Y2hlc1s3XSk7XG5cdFx0fVxuXHRcdGlmICh0eXBlb2YobWF0Y2hlc1s5XSkgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHR0aGlzLmZyYWdtZW50ID0gcGVyY2VudEVuY29kaW5nSGVscGVyLmRlY29kZShtYXRjaGVzWzldKTtcblx0XHR9XG5cdH1cbn1cblxuLyoqXG4gKiBDdXJyZW50IFVSSSBzY2hlbWUuXG4gKiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzk4NiNzZWN0aW9uLTMuMVxuICogQHR5cGUge1N0cmluZ31cbiAqL1xuVVJJLnByb3RvdHlwZS5zY2hlbWUgPSBudWxsO1xuXG4vKipcbiAqIEN1cnJlbnQgVVJJIGF1dGhvcml0eS5cbiAqIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzOTg2I3NlY3Rpb24tMy4yXG4gKiBAdHlwZSB7QXV0aG9yaXR5fVxuICovXG5VUkkucHJvdG90eXBlLmF1dGhvcml0eSA9IG51bGw7XG5cbi8qKlxuICogQ3VycmVudCBVUkkgcGF0aC5cbiAqIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzOTg2I3NlY3Rpb24tMy4zXG4gKiBAdHlwZSB7U3RyaW5nfVxuICovXG5VUkkucHJvdG90eXBlLnBhdGggPSBudWxsO1xuXG4vKipcbiAqIEN1cnJlbnQgVVJJIHF1ZXJ5LlxuICogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzM5ODYjc2VjdGlvbi0zLjRcbiAqIEB0eXBlIHtRdWVyeX1cbiAqL1xuVVJJLnByb3RvdHlwZS5xdWVyeSA9IG51bGw7XG5cbi8qKlxuICogQ3VycmVudCBVUkkgZnJhZ21lbnQuXG4gKiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzk4NiNzZWN0aW9uLTMuNVxuICogQHR5cGUge1N0cmluZ31cbiAqL1xuVVJJLnByb3RvdHlwZS5mcmFnbWVudCA9IG51bGw7XG5cbi8qKlxuICogQ29udmVydHMgYSBVUkkgcmVmZXJlbmNlIHRoYXQgbWlnaHQgYmUgcmVsYXRpdmUgdG8gYSBnaXZlbiBiYXNlIFVSSVxuICogaW50byB0aGUgcmVmZXJlbmNlJ3MgdGFyZ2V0IFVSSS5cbiAqIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzOTg2I3NlY3Rpb24tNS4yXG4gKiBAcGFyYW0ge1VSSX0gYmFzZVVyaSBCYXNlIFVSSS5cbiAqIEByZXR1cm5zIHtVUkl9IFJlc29sdmVkIFVSSS5cbiAqL1xuVVJJLnByb3RvdHlwZS5yZXNvbHZlUmVsYXRpdmUgPSBmdW5jdGlvbiAoYmFzZVVyaSkge1xuXHRpZiAoIWJhc2VVcmkuc2NoZW1lKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKEVSUk9SX0JBU0VfU0NIRU1FKTtcblx0fVxuXG5cdHJldHVybiB0cmFuc2Zvcm1SZWZlcmVuY2UoYmFzZVVyaSwgdGhpcyk7XG59O1xuXG4vKipcbiAqIENsb25lcyBjdXJyZW50IFVSSSB0byBhIG5ldyBvYmplY3QuXG4gKiBAcmV0dXJucyB7VVJJfSBOZXcgY2xvbmUgb2YgY3VycmVudCBvYmplY3QuXG4gKi9cblVSSS5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbiAoKSB7XG5cdHZhciB1cmkgPSBuZXcgVVJJKCk7XG5cblx0aWYgKHR5cGVvZih0aGlzLnNjaGVtZSkgPT09ICdzdHJpbmcnKSB7XG5cdFx0dXJpLnNjaGVtZSA9IHRoaXMuc2NoZW1lO1xuXHR9XG5cblx0aWYgKHRoaXMuYXV0aG9yaXR5KSB7XG5cdFx0dXJpLmF1dGhvcml0eSA9IHRoaXMuYXV0aG9yaXR5LmNsb25lKCk7XG5cdH1cblxuXHRpZiAodHlwZW9mKHRoaXMucGF0aCkgPT09ICdzdHJpbmcnKSB7XG5cdFx0dXJpLnBhdGggPSB0aGlzLnBhdGg7XG5cdH1cblxuXHRpZiAodGhpcy5xdWVyeSkge1xuXHRcdHVyaS5xdWVyeSA9IHRoaXMucXVlcnkuY2xvbmUoKTtcblx0fVxuXG5cdGlmICh0eXBlb2YodGhpcy5mcmFnbWVudCkgPT09ICdzdHJpbmcnKSB7XG5cdFx0dXJpLmZyYWdtZW50ID0gdGhpcy5mcmFnbWVudDtcblx0fVxuXG5cdHJldHVybiB1cmk7XG59O1xuXG4vKipcbiAqIFJlY29tcG9zZXMgVVJJIGNvbXBvbmVudHMgdG8gVVJJIHN0cmluZyxcbiAqIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzOTg2I3NlY3Rpb24tNS4zXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBVUkkgc3RyaW5nLlxuICovXG5VUkkucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuXHR2YXIgcmVzdWx0ID0gJyc7XG5cblx0aWYgKHRoaXMuc2NoZW1lICE9PSB1bmRlZmluZWQgJiYgdGhpcy5zY2hlbWUgIT09IG51bGwpIHtcblx0XHR2YXIgc2NoZW1lID0gU3RyaW5nKHRoaXMuc2NoZW1lKTtcblx0XHRpZiAoIVNDSEVNRV9SRUdFWFAudGVzdChzY2hlbWUpKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoRVJST1JfU0NIRU1FKTtcblx0XHR9XG5cdFx0cmVzdWx0ICs9IHNjaGVtZSArICc6Jztcblx0fVxuXG5cdGlmICh0aGlzLmF1dGhvcml0eSkge1xuXHRcdHJlc3VsdCArPSAnLy8nICsgdGhpcy5hdXRob3JpdHkudG9TdHJpbmcoKTtcblx0fVxuXG5cdHZhciBwYXRoID0gdGhpcy5wYXRoID09PSB1bmRlZmluZWQgfHwgdGhpcy5wYXRoID09PSBudWxsID9cblx0XHQnJyA6IFN0cmluZyh0aGlzLnBhdGgpO1xuXHRyZXN1bHQgKz0gcGVyY2VudEVuY29kaW5nSGVscGVyLmVuY29kZVBhdGgocGF0aCk7XG5cblx0aWYgKHRoaXMucXVlcnkpIHtcblx0XHRyZXN1bHQgKz0gJz8nICsgdGhpcy5xdWVyeS50b1N0cmluZygpO1xuXHR9XG5cblx0aWYgKHRoaXMuZnJhZ21lbnQgIT09IHVuZGVmaW5lZCAmJiB0aGlzLmZyYWdtZW50ICE9PSBudWxsKSB7XG5cdFx0dmFyIGZyYWdtZW50ID0gU3RyaW5nKHRoaXMuZnJhZ21lbnQpO1xuXHRcdHJlc3VsdCArPSAnIycgKyBwZXJjZW50RW5jb2RpbmdIZWxwZXIuZW5jb2RlRnJhZ21lbnQoZnJhZ21lbnQpO1xuXHR9XG5cblx0cmV0dXJuIHJlc3VsdDtcbn07XG5cbi8qKlxuICogVHJhbnNmb3JtcyByZWZlcmVuY2UgZm9yIHJlbGF0aXZlIHJlc29sdXRpb24uXG4gKiBXaG9sZSBhbGdvcml0aG0gaGFzIGJlZW4gdGFrZW4gZnJvbVxuICogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzM5ODYjc2VjdGlvbi01LjIuMlxuICogQHBhcmFtIHtVUkl9IGJhc2VVcmkgQmFzZSBVUkkgZm9yIHJlc29sdXRpb24uXG4gKiBAcGFyYW0ge1VSSX0gcmVmZXJlbmNlVXJpIFJlZmVyZW5jZSBVUkkgdG8gcmVzb2x2ZS5cbiAqIEByZXR1cm5zIHtVUkl9IENvbXBvbmVudHMgb2YgdGFyZ2V0IFVSSS5cbiAqL1xuLypqc2hpbnQgbWF4ZGVwdGg6ZmFsc2UgKi9cbi8qanNoaW50IG1heGNvbXBsZXhpdHk6ZmFsc2UgKi9cbmZ1bmN0aW9uIHRyYW5zZm9ybVJlZmVyZW5jZShiYXNlVXJpLCByZWZlcmVuY2VVcmkpIHtcblx0dmFyIHRhcmdldFVyaSA9IG5ldyBVUkkoJycpO1xuXG5cdGlmIChyZWZlcmVuY2VVcmkuc2NoZW1lKSB7XG5cdFx0dGFyZ2V0VXJpLnNjaGVtZSA9IHJlZmVyZW5jZVVyaS5zY2hlbWU7XG5cdFx0dGFyZ2V0VXJpLmF1dGhvcml0eSA9IHJlZmVyZW5jZVVyaS5hdXRob3JpdHkgP1xuXHRcdFx0cmVmZXJlbmNlVXJpLmF1dGhvcml0eS5jbG9uZSgpIDogcmVmZXJlbmNlVXJpLmF1dGhvcml0eTtcblx0XHR0YXJnZXRVcmkucGF0aCA9IHJlbW92ZURvdFNlZ21lbnRzKHJlZmVyZW5jZVVyaS5wYXRoKTtcblx0XHR0YXJnZXRVcmkucXVlcnkgPSByZWZlcmVuY2VVcmkucXVlcnkgP1xuXHRcdFx0cmVmZXJlbmNlVXJpLnF1ZXJ5LmNsb25lKCkgOiByZWZlcmVuY2VVcmkucXVlcnk7XG5cdH0gZWxzZSB7XG5cdFx0aWYgKHJlZmVyZW5jZVVyaS5hdXRob3JpdHkpIHtcblx0XHRcdHRhcmdldFVyaS5hdXRob3JpdHkgPSByZWZlcmVuY2VVcmkuYXV0aG9yaXR5ID9cblx0XHRcdFx0cmVmZXJlbmNlVXJpLmF1dGhvcml0eS5jbG9uZSgpIDogcmVmZXJlbmNlVXJpLmF1dGhvcml0eTtcblx0XHRcdHRhcmdldFVyaS5wYXRoID0gcmVtb3ZlRG90U2VnbWVudHMocmVmZXJlbmNlVXJpLnBhdGgpO1xuXHRcdFx0dGFyZ2V0VXJpLnF1ZXJ5ID0gcmVmZXJlbmNlVXJpLnF1ZXJ5ID9cblx0XHRcdFx0cmVmZXJlbmNlVXJpLnF1ZXJ5LmNsb25lKCkgOiByZWZlcmVuY2VVcmkucXVlcnk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmIChyZWZlcmVuY2VVcmkucGF0aCA9PT0gJycpIHtcblx0XHRcdFx0dGFyZ2V0VXJpLnBhdGggPSBiYXNlVXJpLnBhdGg7XG5cdFx0XHRcdGlmIChyZWZlcmVuY2VVcmkucXVlcnkpIHtcblx0XHRcdFx0XHR0YXJnZXRVcmkucXVlcnkgPSByZWZlcmVuY2VVcmkucXVlcnkuY2xvbmUoKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0YXJnZXRVcmkucXVlcnkgPSBiYXNlVXJpLnF1ZXJ5ID9cblx0XHRcdFx0XHRcdGJhc2VVcmkucXVlcnkuY2xvbmUoKSA6IGJhc2VVcmkucXVlcnk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmIChyZWZlcmVuY2VVcmkucGF0aFswXSA9PT0gJy8nKSB7XG5cdFx0XHRcdFx0dGFyZ2V0VXJpLnBhdGggPVxuXHRcdFx0XHRcdFx0cmVtb3ZlRG90U2VnbWVudHMocmVmZXJlbmNlVXJpLnBhdGgpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRhcmdldFVyaS5wYXRoID1cblx0XHRcdFx0XHRcdG1lcmdlKGJhc2VVcmksIHJlZmVyZW5jZVVyaSk7XG5cdFx0XHRcdFx0dGFyZ2V0VXJpLnBhdGggPVxuXHRcdFx0XHRcdFx0cmVtb3ZlRG90U2VnbWVudHModGFyZ2V0VXJpLnBhdGgpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRhcmdldFVyaS5xdWVyeSA9IHJlZmVyZW5jZVVyaS5xdWVyeSA/XG5cdFx0XHRcdFx0cmVmZXJlbmNlVXJpLnF1ZXJ5LmNsb25lKCkgOiByZWZlcmVuY2VVcmkucXVlcnk7XG5cdFx0XHR9XG5cdFx0XHR0YXJnZXRVcmkuYXV0aG9yaXR5ID0gYmFzZVVyaS5hdXRob3JpdHkgP1xuXHRcdFx0XHRiYXNlVXJpLmF1dGhvcml0eS5jbG9uZSgpIDogYmFzZVVyaS5hdXRob3JpdHk7XG5cdFx0fVxuXHRcdHRhcmdldFVyaS5zY2hlbWUgPSBiYXNlVXJpLnNjaGVtZTtcblx0fVxuXG5cdHRhcmdldFVyaS5mcmFnbWVudCA9IHJlZmVyZW5jZVVyaS5mcmFnbWVudDtcblx0cmV0dXJuIHRhcmdldFVyaTtcbn1cblxuLyoqXG4gKiBNZXJnZXMgYSByZWxhdGl2ZS1wYXRoIHJlZmVyZW5jZSB3aXRoIHRoZSBwYXRoIG9mIHRoZSBiYXNlIFVSSS5cbiAqIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzOTg2I3NlY3Rpb24tNS4yLjNcbiAqIEBwYXJhbSB7VVJJfSBiYXNlVXJpIENvbXBvbmVudHMgb2YgYmFzZSBVUkkuXG4gKiBAcGFyYW0ge1VSSX0gcmVmZXJlbmNlVXJpIENvbXBvbmVudHMgb2YgcmVmZXJlbmNlIFVSSS5cbiAqIEByZXR1cm5zIHtTdHJpbmd9IE1lcmdlZCBwYXRoLlxuICovXG5mdW5jdGlvbiBtZXJnZShiYXNlVXJpLCByZWZlcmVuY2VVcmkpIHtcblx0aWYgKGJhc2VVcmkuYXV0aG9yaXR5ICYmIGJhc2VVcmkucGF0aCA9PT0gJycpIHtcblx0XHRyZXR1cm4gJy8nICsgcmVmZXJlbmNlVXJpLnBhdGg7XG5cdH1cblxuXHR2YXIgc2VnbWVudHNTdHJpbmcgPSBiYXNlVXJpLnBhdGguaW5kZXhPZignLycpICE9PSAtMSA/XG5cdFx0YmFzZVVyaS5wYXRoLnJlcGxhY2UoL1xcL1teXFwvXSskLywgJy8nKSA6ICcnO1xuXG5cdHJldHVybiBzZWdtZW50c1N0cmluZyArIHJlZmVyZW5jZVVyaS5wYXRoO1xufVxuXG4vKipcbiAqIFJlbW92ZXMgZG90cyBzZWdtZW50cyBmcm9tIFVSSSBwYXRoLlxuICogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzM5ODYjc2VjdGlvbi01LjIuNFxuICogQHBhcmFtIHtTdHJpbmd9IHVyaVBhdGggVVJJIHBhdGggd2l0aCBwb3NzaWJsZSBkb3Qgc2VnbWVudHMuXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBVUkkgcGF0aCB3aXRob3V0IGRvdCBzZWdtZW50cy5cbiAqL1xuZnVuY3Rpb24gcmVtb3ZlRG90U2VnbWVudHModXJpUGF0aCkge1xuXHRpZiAoIXVyaVBhdGgpIHtcblx0XHRyZXR1cm4gJyc7XG5cdH1cblxuXHR2YXIgaW5wdXRCdWZmZXIgPSB1cmlQYXRoLFxuXHRcdG5ld0J1ZmZlciA9ICcnLFxuXHRcdG5leHRTZWdtZW50ID0gJycsXG5cdFx0b3V0cHV0QnVmZmVyID0gJyc7XG5cblx0d2hpbGUgKGlucHV0QnVmZmVyLmxlbmd0aCAhPT0gMCkge1xuXG5cdFx0Ly8gSWYgdGhlIGlucHV0IGJ1ZmZlciBiZWdpbnMgd2l0aCBhIHByZWZpeCBvZiBcIi4uL1wiIG9yIFwiLi9cIixcblx0XHQvLyB0aGVuIHJlbW92ZSB0aGF0IHByZWZpeCBmcm9tIHRoZSBpbnB1dCBidWZmZXJcblx0XHRuZXdCdWZmZXIgPSBpbnB1dEJ1ZmZlci5yZXBsYWNlKC9eXFwuP1xcLlxcLy8sICcnKTtcblx0XHRpZiAobmV3QnVmZmVyICE9PSBpbnB1dEJ1ZmZlcikge1xuXHRcdFx0aW5wdXRCdWZmZXIgPSBuZXdCdWZmZXI7XG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cblx0XHQvLyBpZiB0aGUgaW5wdXQgYnVmZmVyIGJlZ2lucyB3aXRoIGEgcHJlZml4IG9mIFwiLy4vXCIgb3IgXCIvLlwiLFxuXHRcdC8vIHdoZXJlIFwiLlwiIGlzIGEgY29tcGxldGUgcGF0aCBzZWdtZW50LCB0aGVuIHJlcGxhY2UgdGhhdFxuXHRcdC8vIHByZWZpeCB3aXRoIFwiL1wiIGluIHRoZSBpbnB1dCBidWZmZXJcblx0XHRuZXdCdWZmZXIgPSBpbnB1dEJ1ZmZlci5yZXBsYWNlKC9eKChcXC9cXC5cXC8pfChcXC9cXC4kKSkvLCAnLycpO1xuXHRcdGlmIChuZXdCdWZmZXIgIT09IGlucHV0QnVmZmVyKSB7XG5cdFx0XHRpbnB1dEJ1ZmZlciA9IG5ld0J1ZmZlcjtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblxuXHRcdC8vIGlmIHRoZSBpbnB1dCBidWZmZXIgYmVnaW5zIHdpdGggYSBwcmVmaXggb2YgXCIvLi4vXCIgb3IgXCIvLi5cIixcblx0XHQvLyB3aGVyZSBcIi4uXCIgaXMgYSBjb21wbGV0ZSBwYXRoIHNlZ21lbnQsIHRoZW4gcmVwbGFjZSB0aGF0XG5cdFx0Ly8gcHJlZml4IHdpdGggXCIvXCIgaW4gdGhlIGlucHV0IGJ1ZmZlciBhbmQgcmVtb3ZlIHRoZSBsYXN0XG5cdFx0Ly8gc2VnbWVudCBhbmQgaXRzIHByZWNlZGluZyBcIi9cIiAoaWYgYW55KSBmcm9tIHRoZSBvdXRwdXRcblx0XHQvLyBidWZmZXJcblx0XHRuZXdCdWZmZXIgPSBpbnB1dEJ1ZmZlci5yZXBsYWNlKC9eKChcXC9cXC5cXC5cXC8pfChcXC9cXC5cXC4kKSkvLCAnLycpO1xuXHRcdGlmIChuZXdCdWZmZXIgIT09IGlucHV0QnVmZmVyKSB7XG5cdFx0XHRvdXRwdXRCdWZmZXIgPSBvdXRwdXRCdWZmZXIucmVwbGFjZSgvXFwvW15cXC9dKyQvLCAnJyk7XG5cdFx0XHRpbnB1dEJ1ZmZlciA9IG5ld0J1ZmZlcjtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblxuXHRcdC8vIGlmIHRoZSBpbnB1dCBidWZmZXIgY29uc2lzdHMgb25seSBvZiBcIi5cIiBvciBcIi4uXCIsIHRoZW4gcmVtb3ZlXG5cdFx0Ly8gdGhhdCBmcm9tIHRoZSBpbnB1dCBidWZmZXJcblx0XHRpZiAoaW5wdXRCdWZmZXIgPT09ICcuJyB8fCBpbnB1dEJ1ZmZlciA9PT0gJy4uJykge1xuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXG5cdFx0Ly8gbW92ZSB0aGUgZmlyc3QgcGF0aCBzZWdtZW50IGluIHRoZSBpbnB1dCBidWZmZXIgdG8gdGhlIGVuZCBvZlxuXHRcdC8vIHRoZSBvdXRwdXQgYnVmZmVyLCBpbmNsdWRpbmcgdGhlIGluaXRpYWwgXCIvXCIgY2hhcmFjdGVyIChpZlxuXHRcdC8vIGFueSkgYW5kIGFueSBzdWJzZXF1ZW50IGNoYXJhY3RlcnMgdXAgdG8sIGJ1dCBub3QgaW5jbHVkaW5nLFxuXHRcdC8vIHRoZSBuZXh0IFwiL1wiIGNoYXJhY3RlciBvciB0aGUgZW5kIG9mIHRoZSBpbnB1dCBidWZmZXJcblx0XHRuZXh0U2VnbWVudCA9IC9eXFwvP1teXFwvXSooXFwvfCQpLy5leGVjKGlucHV0QnVmZmVyKVswXTtcblx0XHRuZXh0U2VnbWVudCA9IG5leHRTZWdtZW50LnJlcGxhY2UoLyhbXlxcL10pKFxcLyQpLywgJyQxJyk7XG5cdFx0aW5wdXRCdWZmZXIgPSBpbnB1dEJ1ZmZlci5zdWJzdHJpbmcobmV4dFNlZ21lbnQubGVuZ3RoKTtcblx0XHRvdXRwdXRCdWZmZXIgKz0gbmV4dFNlZ21lbnQ7XG5cdH1cblxuXHRyZXR1cm4gb3V0cHV0QnVmZmVyO1xufSIsIi8qXG4gKiBjYXRiZXJyeS11cmlcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgRGVuaXMgUmVjaGt1bm92IGFuZCBwcm9qZWN0IGNvbnRyaWJ1dG9ycy5cbiAqXG4gKiBjYXRiZXJyeS11cmkncyBsaWNlbnNlIGZvbGxvd3M6XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb25cbiAqIG9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uXG4gKiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sXG4gKiBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLFxuICogcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSxcbiAqIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4gKiBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuICogaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuICogT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKlxuICogVGhpcyBsaWNlbnNlIGFwcGxpZXMgdG8gYWxsIHBhcnRzIG9mIGNhdGJlcnJ5LXVyaSB0aGF0IGFyZSBub3QgZXh0ZXJuYWxseVxuICogbWFpbnRhaW5lZCBsaWJyYXJpZXMuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFVzZXJJbmZvO1xuXG52YXIgcGVyY2VudEVuY29kaW5nSGVscGVyID0gcmVxdWlyZSgnLi9wZXJjZW50RW5jb2RpbmdIZWxwZXInKTtcblxuLyoqXG4gKiBDcmVhdGVzIG5ldyBpbnN0YW5jZSBvZiB1c2VyIGluZm9ybWF0aW9uIGNvbXBvbmVudCBwYXJzZXIuXG4gKiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzk4NiNzZWN0aW9uLTMuMi4xXG4gKiBAcGFyYW0ge1N0cmluZz99IHVzZXJJbmZvU3RyaW5nIFVzZXIgaW5mb3JtYXRpb24gY29tcG9uZW50IHN0cmluZy5cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBVc2VySW5mbyh1c2VySW5mb1N0cmluZykge1xuXHRpZiAodHlwZW9mKHVzZXJJbmZvU3RyaW5nKSA9PT0gJ3N0cmluZycgJiYgdXNlckluZm9TdHJpbmcubGVuZ3RoID4gMCkge1xuXHRcdHZhciBwYXJ0cyA9IHVzZXJJbmZvU3RyaW5nLnNwbGl0KCc6Jyk7XG5cdFx0aWYgKHR5cGVvZihwYXJ0c1swXSkgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHR0aGlzLnVzZXIgPSBwZXJjZW50RW5jb2RpbmdIZWxwZXIuZGVjb2RlKHBhcnRzWzBdKTtcblx0XHR9XG5cdFx0aWYgKHR5cGVvZihwYXJ0c1sxXSkgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHR0aGlzLnBhc3N3b3JkID0gcGVyY2VudEVuY29kaW5nSGVscGVyLmRlY29kZShwYXJ0c1sxXSk7XG5cdFx0fVxuXHR9XG59XG5cbi8qKlxuICogQ3VycmVudCB1c2VyIGNvbXBvbmVudC5cbiAqIEB0eXBlIHtTdHJpbmd9XG4gKi9cblVzZXJJbmZvLnByb3RvdHlwZS51c2VyID0gbnVsbDtcblxuLyoqXG4gKiBDdXJyZW50IHBhc3N3b3JkLlxuICogQHR5cGUge1N0cmluZ31cbiAqL1xuVXNlckluZm8ucHJvdG90eXBlLnBhc3N3b3JkID0gbnVsbDtcblxuLyoqXG4gKiBDbG9uZXMgY3VycmVudCB1c2VyIGluZm9ybWF0aW9uLlxuICogQHJldHVybnMge1VzZXJJbmZvfSBOZXcgY2xvbmUgb2YgY3VycmVudCBvYmplY3QuXG4gKi9cblVzZXJJbmZvLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uICgpIHtcblx0dmFyIHVzZXJJbmZvID0gbmV3IFVzZXJJbmZvKCk7XG5cdGlmICh0eXBlb2YodGhpcy51c2VyKSA9PT0gJ3N0cmluZycpIHtcblx0XHR1c2VySW5mby51c2VyID0gdGhpcy51c2VyO1xuXHR9XG5cdGlmICh0eXBlb2YodGhpcy5wYXNzd29yZCkgPT09ICdzdHJpbmcnKSB7XG5cdFx0dXNlckluZm8ucGFzc3dvcmQgPSB0aGlzLnBhc3N3b3JkO1xuXHR9XG5cdHJldHVybiB1c2VySW5mbztcbn07XG5cbi8qKlxuICogUmVjb21iaW5lcyB1c2VyIGluZm9ybWF0aW9uIGNvbXBvbmVudHMgdG8gdXNlckluZm8gc3RyaW5nLlxuICogQHJldHVybnMge1N0cmluZ30gVXNlciBpbmZvcm1hdGlvbiBjb21wb25lbnQgc3RyaW5nLlxuICovXG5Vc2VySW5mby5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG5cdHZhciByZXN1bHQgPSAnJztcblx0aWYgKHRoaXMudXNlciAhPT0gdW5kZWZpbmVkICYmIHRoaXMudXNlciAhPT0gbnVsbCkge1xuXHRcdHZhciB1c2VyID0gU3RyaW5nKHRoaXMudXNlcik7XG5cdFx0cmVzdWx0ICs9IHBlcmNlbnRFbmNvZGluZ0hlbHBlclxuXHRcdFx0LmVuY29kZVVzZXJJbmZvU3ViQ29tcG9uZW50KHVzZXIpO1xuXHR9XG5cdGlmICh0aGlzLnBhc3N3b3JkICE9PSB1bmRlZmluZWQgJiYgdGhpcy5wYXNzd29yZCAhPT0gbnVsbCkge1xuXHRcdHZhciBwYXNzd29yZCA9IFN0cmluZyh0aGlzLnBhc3N3b3JkKTtcblx0XHRyZXN1bHQgKz0gJzonICsgcGVyY2VudEVuY29kaW5nSGVscGVyXG5cdFx0XHQuZW5jb2RlVXNlckluZm9TdWJDb21wb25lbnQocGFzc3dvcmQpO1xuXHR9XG5cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLypcbiAqIGNhdGJlcnJ5LXVyaVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNCBEZW5pcyBSZWNoa3Vub3YgYW5kIHByb2plY3QgY29udHJpYnV0b3JzLlxuICpcbiAqIGNhdGJlcnJ5LXVyaSdzIGxpY2Vuc2UgZm9sbG93czpcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvblxuICogb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb25cbiAqIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbixcbiAqIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsXG4gKiBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLFxuICogYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbiAqIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4gKiBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4gKiBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqXG4gKiBUaGlzIGxpY2Vuc2UgYXBwbGllcyB0byBhbGwgcGFydHMgb2YgY2F0YmVycnktdXJpIHRoYXQgYXJlIG5vdCBleHRlcm5hbGx5XG4gKiBtYWludGFpbmVkIGxpYnJhcmllcy5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8vIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzOTg2I3NlY3Rpb24tMi4xXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHQvKipcblx0ICogRW5jb2RlcyBhdXRob3JpdHkgdXNlciBpbmZvcm1hdGlvbiBzdWItY29tcG9uZW50IGFjY29yZGluZyB0byBSRkMgMzk4Ni5cblx0ICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZyBDb21wb25lbnQgdG8gZW5jb2RlLlxuXHQgKiBAcmV0dXJucyB7U3RyaW5nfSBFbmNvZGVkIGNvbXBvbmVudC5cblx0ICovXG5cdGVuY29kZVVzZXJJbmZvU3ViQ29tcG9uZW50OiBmdW5jdGlvbiAoc3RyaW5nKSB7XG5cdFx0cmV0dXJuIHN0cmluZy5yZXBsYWNlKFxuXHRcdFx0Ly8gaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzM5ODYjc2VjdGlvbi0zLjIuMVxuXHRcdFx0L1teXFx3XFwuflxcLSFcXCQmJ1xcKFxcKVxcKlxcKyw7PV0vZywgZW5jb2RlVVJJQ29tcG9uZW50XG5cdFx0KTtcblx0fSxcblx0LyoqXG5cdCAqIEVuY29kZXMgYXV0aG9yaXR5IGhvc3QgY29tcG9uZW50IGFjY29yZGluZyB0byBSRkMgMzk4Ni5cblx0ICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZyBDb21wb25lbnQgdG8gZW5jb2RlLlxuXHQgKiBAcmV0dXJucyB7U3RyaW5nfSBFbmNvZGVkIGNvbXBvbmVudC5cblx0ICovXG5cdGVuY29kZUhvc3Q6IGZ1bmN0aW9uIChzdHJpbmcpIHtcblx0XHRyZXR1cm4gc3RyaW5nLnJlcGxhY2UoXG5cdFx0XHQvLyBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzk4NiNzZWN0aW9uLTMuMi4yXG5cdFx0XHQvW15cXHdcXC5+XFwtIVxcJCYnXFwoXFwpXFwqXFwrLDs9OlxcW1xcXV0vZywgZW5jb2RlVVJJQ29tcG9uZW50XG5cdFx0KTtcblxuXHR9LFxuXHQvKipcblx0ICogRW5jb2RlcyBVUkkgcGF0aCBjb21wb25lbnQgYWNjb3JkaW5nIHRvIFJGQyAzOTg2LlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIENvbXBvbmVudCB0byBlbmNvZGUuXG5cdCAqIEByZXR1cm5zIHtTdHJpbmd9IEVuY29kZWQgY29tcG9uZW50LlxuXHQgKi9cblx0ZW5jb2RlUGF0aDogZnVuY3Rpb24gKHN0cmluZykge1xuXHRcdHJldHVybiBzdHJpbmcucmVwbGFjZShcblx0XHRcdC8vIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzOTg2I3NlY3Rpb24tMy4zXG5cdFx0XHQvW15cXHdcXC5+XFwtIVxcJCYnXFwoXFwpXFwqXFwrLDs9OkBcXC9dL2csIGVuY29kZVVSSUNvbXBvbmVudFxuXHRcdCk7XG5cdH0sXG5cdC8qKlxuXHQgKiBFbmNvZGVzIHF1ZXJ5IHN1Yi1jb21wb25lbnQgYWNjb3JkaW5nIHRvIFJGQyAzOTg2LlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIENvbXBvbmVudCB0byBlbmNvZGUuXG5cdCAqIEByZXR1cm5zIHtTdHJpbmd9IEVuY29kZWQgY29tcG9uZW50LlxuXHQgKi9cblx0ZW5jb2RlUXVlcnlTdWJDb21wb25lbnQ6IGZ1bmN0aW9uIChzdHJpbmcpIHtcblx0XHRyZXR1cm4gc3RyaW5nLnJlcGxhY2UoXG5cdFx0XHQvLyBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzk4NiNzZWN0aW9uLTMuNFxuXHRcdFx0L1teXFx3XFwuflxcLSFcXCQnXFwoXFwpXFwqXFwrLDs6QFxcL1xcP10vZywgZW5jb2RlVVJJQ29tcG9uZW50XG5cdFx0KTtcblx0fSxcblxuXHQvKipcblx0ICogRW5jb2RlcyBVUkkgZnJhZ21lbnQgY29tcG9uZW50IGFjY29yZGluZyB0byBSRkMgMzk4Ni5cblx0ICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZyBDb21wb25lbnQgdG8gZW5jb2RlLlxuXHQgKiBAcmV0dXJucyB7U3RyaW5nfSBFbmNvZGVkIGNvbXBvbmVudC5cblx0ICovXG5cdGVuY29kZUZyYWdtZW50OiBmdW5jdGlvbiAoc3RyaW5nKSB7XG5cdFx0cmV0dXJuIHN0cmluZy5yZXBsYWNlKFxuXHRcdFx0Ly8gaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzM5ODYjc2VjdGlvbi0zLjVcblx0XHRcdC9bXlxcd1xcLn5cXC0hXFwkJidcXChcXClcXCpcXCssOz06QFxcL1xcP10vZywgZW5jb2RlVVJJQ29tcG9uZW50XG5cdFx0KTtcblx0fSxcblxuXHQvKipcblx0ICogRGVjb2RlcyBwZXJjZW50IGVuY29kZWQgY29tcG9uZW50LlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIENvbXBvbmVudCB0byBkZWNvZGUuXG5cdCAqIEByZXR1cm5zIHtTdHJpbmd9IERlY29kZWQgY29tcG9uZW50LlxuXHQgKi9cblx0ZGVjb2RlOiBmdW5jdGlvbiAoc3RyaW5nKSB7XG5cdFx0cmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChzdHJpbmcpO1xuXHR9XG59OyIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYicpXG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBhc2FwID0gcmVxdWlyZSgnYXNhcC9yYXcnKTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbi8vIFN0YXRlczpcbi8vXG4vLyAwIC0gcGVuZGluZ1xuLy8gMSAtIGZ1bGZpbGxlZCB3aXRoIF92YWx1ZVxuLy8gMiAtIHJlamVjdGVkIHdpdGggX3ZhbHVlXG4vLyAzIC0gYWRvcHRlZCB0aGUgc3RhdGUgb2YgYW5vdGhlciBwcm9taXNlLCBfdmFsdWVcbi8vXG4vLyBvbmNlIHRoZSBzdGF0ZSBpcyBubyBsb25nZXIgcGVuZGluZyAoMCkgaXQgaXMgaW1tdXRhYmxlXG5cbi8vIEFsbCBgX2AgcHJlZml4ZWQgcHJvcGVydGllcyB3aWxsIGJlIHJlZHVjZWQgdG8gYF97cmFuZG9tIG51bWJlcn1gXG4vLyBhdCBidWlsZCB0aW1lIHRvIG9iZnVzY2F0ZSB0aGVtIGFuZCBkaXNjb3VyYWdlIHRoZWlyIHVzZS5cbi8vIFdlIGRvbid0IHVzZSBzeW1ib2xzIG9yIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSB0byBmdWxseSBoaWRlIHRoZW1cbi8vIGJlY2F1c2UgdGhlIHBlcmZvcm1hbmNlIGlzbid0IGdvb2QgZW5vdWdoLlxuXG5cbi8vIHRvIGF2b2lkIHVzaW5nIHRyeS9jYXRjaCBpbnNpZGUgY3JpdGljYWwgZnVuY3Rpb25zLCB3ZVxuLy8gZXh0cmFjdCB0aGVtIHRvIGhlcmUuXG52YXIgTEFTVF9FUlJPUiA9IG51bGw7XG52YXIgSVNfRVJST1IgPSB7fTtcbmZ1bmN0aW9uIGdldFRoZW4ob2JqKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIG9iai50aGVuO1xuICB9IGNhdGNoIChleCkge1xuICAgIExBU1RfRVJST1IgPSBleDtcbiAgICByZXR1cm4gSVNfRVJST1I7XG4gIH1cbn1cblxuZnVuY3Rpb24gdHJ5Q2FsbE9uZShmbiwgYSkge1xuICB0cnkge1xuICAgIHJldHVybiBmbihhKTtcbiAgfSBjYXRjaCAoZXgpIHtcbiAgICBMQVNUX0VSUk9SID0gZXg7XG4gICAgcmV0dXJuIElTX0VSUk9SO1xuICB9XG59XG5mdW5jdGlvbiB0cnlDYWxsVHdvKGZuLCBhLCBiKSB7XG4gIHRyeSB7XG4gICAgZm4oYSwgYik7XG4gIH0gY2F0Y2ggKGV4KSB7XG4gICAgTEFTVF9FUlJPUiA9IGV4O1xuICAgIHJldHVybiBJU19FUlJPUjtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFByb21pc2U7XG5cbmZ1bmN0aW9uIFByb21pc2UoZm4pIHtcbiAgaWYgKHR5cGVvZiB0aGlzICE9PSAnb2JqZWN0Jykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Byb21pc2VzIG11c3QgYmUgY29uc3RydWN0ZWQgdmlhIG5ldycpO1xuICB9XG4gIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdub3QgYSBmdW5jdGlvbicpO1xuICB9XG4gIHRoaXMuXzMyID0gMDtcbiAgdGhpcy5fOCA9IG51bGw7XG4gIHRoaXMuXzg5ID0gW107XG4gIGlmIChmbiA9PT0gbm9vcCkgcmV0dXJuO1xuICBkb1Jlc29sdmUoZm4sIHRoaXMpO1xufVxuUHJvbWlzZS5fODMgPSBub29wO1xuXG5Qcm9taXNlLnByb3RvdHlwZS50aGVuID0gZnVuY3Rpb24ob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpIHtcbiAgaWYgKHRoaXMuY29uc3RydWN0b3IgIT09IFByb21pc2UpIHtcbiAgICByZXR1cm4gc2FmZVRoZW4odGhpcywgb25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpO1xuICB9XG4gIHZhciByZXMgPSBuZXcgUHJvbWlzZShub29wKTtcbiAgaGFuZGxlKHRoaXMsIG5ldyBIYW5kbGVyKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkLCByZXMpKTtcbiAgcmV0dXJuIHJlcztcbn07XG5cbmZ1bmN0aW9uIHNhZmVUaGVuKHNlbGYsIG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKSB7XG4gIHJldHVybiBuZXcgc2VsZi5jb25zdHJ1Y3RvcihmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgdmFyIHJlcyA9IG5ldyBQcm9taXNlKG5vb3ApO1xuICAgIHJlcy50aGVuKHJlc29sdmUsIHJlamVjdCk7XG4gICAgaGFuZGxlKHNlbGYsIG5ldyBIYW5kbGVyKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkLCByZXMpKTtcbiAgfSk7XG59O1xuZnVuY3Rpb24gaGFuZGxlKHNlbGYsIGRlZmVycmVkKSB7XG4gIHdoaWxlIChzZWxmLl8zMiA9PT0gMykge1xuICAgIHNlbGYgPSBzZWxmLl84O1xuICB9XG4gIGlmIChzZWxmLl8zMiA9PT0gMCkge1xuICAgIHNlbGYuXzg5LnB1c2goZGVmZXJyZWQpO1xuICAgIHJldHVybjtcbiAgfVxuICBhc2FwKGZ1bmN0aW9uKCkge1xuICAgIHZhciBjYiA9IHNlbGYuXzMyID09PSAxID8gZGVmZXJyZWQub25GdWxmaWxsZWQgOiBkZWZlcnJlZC5vblJlamVjdGVkO1xuICAgIGlmIChjYiA9PT0gbnVsbCkge1xuICAgICAgaWYgKHNlbGYuXzMyID09PSAxKSB7XG4gICAgICAgIHJlc29sdmUoZGVmZXJyZWQucHJvbWlzZSwgc2VsZi5fOCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZWplY3QoZGVmZXJyZWQucHJvbWlzZSwgc2VsZi5fOCk7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciByZXQgPSB0cnlDYWxsT25lKGNiLCBzZWxmLl84KTtcbiAgICBpZiAocmV0ID09PSBJU19FUlJPUikge1xuICAgICAgcmVqZWN0KGRlZmVycmVkLnByb21pc2UsIExBU1RfRVJST1IpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXNvbHZlKGRlZmVycmVkLnByb21pc2UsIHJldCk7XG4gICAgfVxuICB9KTtcbn1cbmZ1bmN0aW9uIHJlc29sdmUoc2VsZiwgbmV3VmFsdWUpIHtcbiAgLy8gUHJvbWlzZSBSZXNvbHV0aW9uIFByb2NlZHVyZTogaHR0cHM6Ly9naXRodWIuY29tL3Byb21pc2VzLWFwbHVzL3Byb21pc2VzLXNwZWMjdGhlLXByb21pc2UtcmVzb2x1dGlvbi1wcm9jZWR1cmVcbiAgaWYgKG5ld1ZhbHVlID09PSBzZWxmKSB7XG4gICAgcmV0dXJuIHJlamVjdChcbiAgICAgIHNlbGYsXG4gICAgICBuZXcgVHlwZUVycm9yKCdBIHByb21pc2UgY2Fubm90IGJlIHJlc29sdmVkIHdpdGggaXRzZWxmLicpXG4gICAgKTtcbiAgfVxuICBpZiAoXG4gICAgbmV3VmFsdWUgJiZcbiAgICAodHlwZW9mIG5ld1ZhbHVlID09PSAnb2JqZWN0JyB8fCB0eXBlb2YgbmV3VmFsdWUgPT09ICdmdW5jdGlvbicpXG4gICkge1xuICAgIHZhciB0aGVuID0gZ2V0VGhlbihuZXdWYWx1ZSk7XG4gICAgaWYgKHRoZW4gPT09IElTX0VSUk9SKSB7XG4gICAgICByZXR1cm4gcmVqZWN0KHNlbGYsIExBU1RfRVJST1IpO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICB0aGVuID09PSBzZWxmLnRoZW4gJiZcbiAgICAgIG5ld1ZhbHVlIGluc3RhbmNlb2YgUHJvbWlzZVxuICAgICkge1xuICAgICAgc2VsZi5fMzIgPSAzO1xuICAgICAgc2VsZi5fOCA9IG5ld1ZhbHVlO1xuICAgICAgZmluYWxlKHNlbGYpO1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoZW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGRvUmVzb2x2ZSh0aGVuLmJpbmQobmV3VmFsdWUpLCBzZWxmKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cbiAgc2VsZi5fMzIgPSAxO1xuICBzZWxmLl84ID0gbmV3VmFsdWU7XG4gIGZpbmFsZShzZWxmKTtcbn1cblxuZnVuY3Rpb24gcmVqZWN0KHNlbGYsIG5ld1ZhbHVlKSB7XG4gIHNlbGYuXzMyID0gMjtcbiAgc2VsZi5fOCA9IG5ld1ZhbHVlO1xuICBmaW5hbGUoc2VsZik7XG59XG5mdW5jdGlvbiBmaW5hbGUoc2VsZikge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHNlbGYuXzg5Lmxlbmd0aDsgaSsrKSB7XG4gICAgaGFuZGxlKHNlbGYsIHNlbGYuXzg5W2ldKTtcbiAgfVxuICBzZWxmLl84OSA9IG51bGw7XG59XG5cbmZ1bmN0aW9uIEhhbmRsZXIob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQsIHByb21pc2Upe1xuICB0aGlzLm9uRnVsZmlsbGVkID0gdHlwZW9mIG9uRnVsZmlsbGVkID09PSAnZnVuY3Rpb24nID8gb25GdWxmaWxsZWQgOiBudWxsO1xuICB0aGlzLm9uUmVqZWN0ZWQgPSB0eXBlb2Ygb25SZWplY3RlZCA9PT0gJ2Z1bmN0aW9uJyA/IG9uUmVqZWN0ZWQgOiBudWxsO1xuICB0aGlzLnByb21pc2UgPSBwcm9taXNlO1xufVxuXG4vKipcbiAqIFRha2UgYSBwb3RlbnRpYWxseSBtaXNiZWhhdmluZyByZXNvbHZlciBmdW5jdGlvbiBhbmQgbWFrZSBzdXJlXG4gKiBvbkZ1bGZpbGxlZCBhbmQgb25SZWplY3RlZCBhcmUgb25seSBjYWxsZWQgb25jZS5cbiAqXG4gKiBNYWtlcyBubyBndWFyYW50ZWVzIGFib3V0IGFzeW5jaHJvbnkuXG4gKi9cbmZ1bmN0aW9uIGRvUmVzb2x2ZShmbiwgcHJvbWlzZSkge1xuICB2YXIgZG9uZSA9IGZhbHNlO1xuICB2YXIgcmVzID0gdHJ5Q2FsbFR3byhmbiwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgaWYgKGRvbmUpIHJldHVybjtcbiAgICBkb25lID0gdHJ1ZTtcbiAgICByZXNvbHZlKHByb21pc2UsIHZhbHVlKTtcbiAgfSwgZnVuY3Rpb24gKHJlYXNvbikge1xuICAgIGlmIChkb25lKSByZXR1cm47XG4gICAgZG9uZSA9IHRydWU7XG4gICAgcmVqZWN0KHByb21pc2UsIHJlYXNvbik7XG4gIH0pXG4gIGlmICghZG9uZSAmJiByZXMgPT09IElTX0VSUk9SKSB7XG4gICAgZG9uZSA9IHRydWU7XG4gICAgcmVqZWN0KHByb21pc2UsIExBU1RfRVJST1IpO1xuICB9XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBQcm9taXNlID0gcmVxdWlyZSgnLi9jb3JlLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gUHJvbWlzZTtcblByb21pc2UucHJvdG90eXBlLmRvbmUgPSBmdW5jdGlvbiAob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpIHtcbiAgdmFyIHNlbGYgPSBhcmd1bWVudHMubGVuZ3RoID8gdGhpcy50aGVuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgOiB0aGlzO1xuICBzZWxmLnRoZW4obnVsbCwgZnVuY3Rpb24gKGVycikge1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH0sIDApO1xuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vVGhpcyBmaWxlIGNvbnRhaW5zIHRoZSBFUzYgZXh0ZW5zaW9ucyB0byB0aGUgY29yZSBQcm9taXNlcy9BKyBBUElcblxudmFyIFByb21pc2UgPSByZXF1aXJlKCcuL2NvcmUuanMnKTtcbnZhciBhc2FwID0gcmVxdWlyZSgnYXNhcC9yYXcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBQcm9taXNlO1xuXG4vKiBTdGF0aWMgRnVuY3Rpb25zICovXG5cbnZhciBUUlVFID0gdmFsdWVQcm9taXNlKHRydWUpO1xudmFyIEZBTFNFID0gdmFsdWVQcm9taXNlKGZhbHNlKTtcbnZhciBOVUxMID0gdmFsdWVQcm9taXNlKG51bGwpO1xudmFyIFVOREVGSU5FRCA9IHZhbHVlUHJvbWlzZSh1bmRlZmluZWQpO1xudmFyIFpFUk8gPSB2YWx1ZVByb21pc2UoMCk7XG52YXIgRU1QVFlTVFJJTkcgPSB2YWx1ZVByb21pc2UoJycpO1xuXG5mdW5jdGlvbiB2YWx1ZVByb21pc2UodmFsdWUpIHtcbiAgdmFyIHAgPSBuZXcgUHJvbWlzZShQcm9taXNlLl84Myk7XG4gIHAuXzMyID0gMTtcbiAgcC5fOCA9IHZhbHVlO1xuICByZXR1cm4gcDtcbn1cblByb21pc2UucmVzb2x2ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICBpZiAodmFsdWUgaW5zdGFuY2VvZiBQcm9taXNlKSByZXR1cm4gdmFsdWU7XG5cbiAgaWYgKHZhbHVlID09PSBudWxsKSByZXR1cm4gTlVMTDtcbiAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiBVTkRFRklORUQ7XG4gIGlmICh2YWx1ZSA9PT0gdHJ1ZSkgcmV0dXJuIFRSVUU7XG4gIGlmICh2YWx1ZSA9PT0gZmFsc2UpIHJldHVybiBGQUxTRTtcbiAgaWYgKHZhbHVlID09PSAwKSByZXR1cm4gWkVSTztcbiAgaWYgKHZhbHVlID09PSAnJykgcmV0dXJuIEVNUFRZU1RSSU5HO1xuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHRyeSB7XG4gICAgICB2YXIgdGhlbiA9IHZhbHVlLnRoZW47XG4gICAgICBpZiAodHlwZW9mIHRoZW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHRoZW4uYmluZCh2YWx1ZSkpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICByZWplY3QoZXgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG4gIHJldHVybiB2YWx1ZVByb21pc2UodmFsdWUpO1xufTtcblxuUHJvbWlzZS5hbGwgPSBmdW5jdGlvbiAoYXJyKSB7XG4gIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJyKTtcblxuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgIGlmIChhcmdzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHJlc29sdmUoW10pO1xuICAgIHZhciByZW1haW5pbmcgPSBhcmdzLmxlbmd0aDtcbiAgICBmdW5jdGlvbiByZXMoaSwgdmFsKSB7XG4gICAgICBpZiAodmFsICYmICh0eXBlb2YgdmFsID09PSAnb2JqZWN0JyB8fCB0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nKSkge1xuICAgICAgICBpZiAodmFsIGluc3RhbmNlb2YgUHJvbWlzZSAmJiB2YWwudGhlbiA9PT0gUHJvbWlzZS5wcm90b3R5cGUudGhlbikge1xuICAgICAgICAgIHdoaWxlICh2YWwuXzMyID09PSAzKSB7XG4gICAgICAgICAgICB2YWwgPSB2YWwuXzg7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh2YWwuXzMyID09PSAxKSByZXR1cm4gcmVzKGksIHZhbC5fOCk7XG4gICAgICAgICAgaWYgKHZhbC5fMzIgPT09IDIpIHJlamVjdCh2YWwuXzgpO1xuICAgICAgICAgIHZhbC50aGVuKGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICAgIHJlcyhpLCB2YWwpO1xuICAgICAgICAgIH0sIHJlamVjdCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciB0aGVuID0gdmFsLnRoZW47XG4gICAgICAgICAgaWYgKHR5cGVvZiB0aGVuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB2YXIgcCA9IG5ldyBQcm9taXNlKHRoZW4uYmluZCh2YWwpKTtcbiAgICAgICAgICAgIHAudGhlbihmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgICAgIHJlcyhpLCB2YWwpO1xuICAgICAgICAgICAgfSwgcmVqZWN0KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGFyZ3NbaV0gPSB2YWw7XG4gICAgICBpZiAoLS1yZW1haW5pbmcgPT09IDApIHtcbiAgICAgICAgcmVzb2x2ZShhcmdzKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICByZXMoaSwgYXJnc1tpXSk7XG4gICAgfVxuICB9KTtcbn07XG5cblByb21pc2UucmVqZWN0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgcmVqZWN0KHZhbHVlKTtcbiAgfSk7XG59O1xuXG5Qcm9taXNlLnJhY2UgPSBmdW5jdGlvbiAodmFsdWVzKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgdmFsdWVzLmZvckVhY2goZnVuY3Rpb24odmFsdWUpe1xuICAgICAgUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKHJlc29sdmUsIHJlamVjdCk7XG4gICAgfSk7XG4gIH0pO1xufTtcblxuLyogUHJvdG90eXBlIE1ldGhvZHMgKi9cblxuUHJvbWlzZS5wcm90b3R5cGVbJ2NhdGNoJ10gPSBmdW5jdGlvbiAob25SZWplY3RlZCkge1xuICByZXR1cm4gdGhpcy50aGVuKG51bGwsIG9uUmVqZWN0ZWQpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIFByb21pc2UgPSByZXF1aXJlKCcuL2NvcmUuanMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBQcm9taXNlO1xuUHJvbWlzZS5wcm90b3R5cGVbJ2ZpbmFsbHknXSA9IGZ1bmN0aW9uIChmKSB7XG4gIHJldHVybiB0aGlzLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShmKCkpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0pO1xuICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShmKCkpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH0pO1xuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9jb3JlLmpzJyk7XG5yZXF1aXJlKCcuL2RvbmUuanMnKTtcbnJlcXVpcmUoJy4vZmluYWxseS5qcycpO1xucmVxdWlyZSgnLi9lczYtZXh0ZW5zaW9ucy5qcycpO1xucmVxdWlyZSgnLi9ub2RlLWV4dGVuc2lvbnMuanMnKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gVGhpcyBmaWxlIGNvbnRhaW5zIHRoZW4vcHJvbWlzZSBzcGVjaWZpYyBleHRlbnNpb25zIHRoYXQgYXJlIG9ubHkgdXNlZnVsXG4vLyBmb3Igbm9kZS5qcyBpbnRlcm9wXG5cbnZhciBQcm9taXNlID0gcmVxdWlyZSgnLi9jb3JlLmpzJyk7XG52YXIgYXNhcCA9IHJlcXVpcmUoJ2FzYXAnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBQcm9taXNlO1xuXG4vKiBTdGF0aWMgRnVuY3Rpb25zICovXG5cblByb21pc2UuZGVub2RlaWZ5ID0gZnVuY3Rpb24gKGZuLCBhcmd1bWVudENvdW50KSB7XG4gIGFyZ3VtZW50Q291bnQgPSBhcmd1bWVudENvdW50IHx8IEluZmluaXR5O1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHdoaWxlIChhcmdzLmxlbmd0aCAmJiBhcmdzLmxlbmd0aCA+IGFyZ3VtZW50Q291bnQpIHtcbiAgICAgICAgYXJncy5wb3AoKTtcbiAgICAgIH1cbiAgICAgIGFyZ3MucHVzaChmdW5jdGlvbiAoZXJyLCByZXMpIHtcbiAgICAgICAgaWYgKGVycikgcmVqZWN0KGVycik7XG4gICAgICAgIGVsc2UgcmVzb2x2ZShyZXMpO1xuICAgICAgfSlcbiAgICAgIHZhciByZXMgPSBmbi5hcHBseShzZWxmLCBhcmdzKTtcbiAgICAgIGlmIChyZXMgJiZcbiAgICAgICAgKFxuICAgICAgICAgIHR5cGVvZiByZXMgPT09ICdvYmplY3QnIHx8XG4gICAgICAgICAgdHlwZW9mIHJlcyA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICApICYmXG4gICAgICAgIHR5cGVvZiByZXMudGhlbiA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgKSB7XG4gICAgICAgIHJlc29sdmUocmVzKTtcbiAgICAgIH1cbiAgICB9KVxuICB9XG59XG5Qcm9taXNlLm5vZGVpZnkgPSBmdW5jdGlvbiAoZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgdmFyIGNhbGxiYWNrID1cbiAgICAgIHR5cGVvZiBhcmdzW2FyZ3MubGVuZ3RoIC0gMV0gPT09ICdmdW5jdGlvbicgPyBhcmdzLnBvcCgpIDogbnVsbDtcbiAgICB2YXIgY3R4ID0gdGhpcztcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykubm9kZWlmeShjYWxsYmFjaywgY3R4KTtcbiAgICB9IGNhdGNoIChleCkge1xuICAgICAgaWYgKGNhbGxiYWNrID09PSBudWxsIHx8IHR5cGVvZiBjYWxsYmFjayA9PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIHJlamVjdChleCk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXNhcChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgY2FsbGJhY2suY2FsbChjdHgsIGV4KTtcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuUHJvbWlzZS5wcm90b3R5cGUubm9kZWlmeSA9IGZ1bmN0aW9uIChjYWxsYmFjaywgY3R4KSB7XG4gIGlmICh0eXBlb2YgY2FsbGJhY2sgIT0gJ2Z1bmN0aW9uJykgcmV0dXJuIHRoaXM7XG5cbiAgdGhpcy50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIGFzYXAoZnVuY3Rpb24gKCkge1xuICAgICAgY2FsbGJhY2suY2FsbChjdHgsIG51bGwsIHZhbHVlKTtcbiAgICB9KTtcbiAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgIGFzYXAoZnVuY3Rpb24gKCkge1xuICAgICAgY2FsbGJhY2suY2FsbChjdHgsIGVycik7XG4gICAgfSk7XG4gIH0pO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8vIHJhd0FzYXAgcHJvdmlkZXMgZXZlcnl0aGluZyB3ZSBuZWVkIGV4Y2VwdCBleGNlcHRpb24gbWFuYWdlbWVudC5cbnZhciByYXdBc2FwID0gcmVxdWlyZShcIi4vcmF3XCIpO1xuLy8gUmF3VGFza3MgYXJlIHJlY3ljbGVkIHRvIHJlZHVjZSBHQyBjaHVybi5cbnZhciBmcmVlVGFza3MgPSBbXTtcbi8vIFdlIHF1ZXVlIGVycm9ycyB0byBlbnN1cmUgdGhleSBhcmUgdGhyb3duIGluIHJpZ2h0IG9yZGVyIChGSUZPKS5cbi8vIEFycmF5LWFzLXF1ZXVlIGlzIGdvb2QgZW5vdWdoIGhlcmUsIHNpbmNlIHdlIGFyZSBqdXN0IGRlYWxpbmcgd2l0aCBleGNlcHRpb25zLlxudmFyIHBlbmRpbmdFcnJvcnMgPSBbXTtcbnZhciByZXF1ZXN0RXJyb3JUaHJvdyA9IHJhd0FzYXAubWFrZVJlcXVlc3RDYWxsRnJvbVRpbWVyKHRocm93Rmlyc3RFcnJvcik7XG5cbmZ1bmN0aW9uIHRocm93Rmlyc3RFcnJvcigpIHtcbiAgICBpZiAocGVuZGluZ0Vycm9ycy5sZW5ndGgpIHtcbiAgICAgICAgdGhyb3cgcGVuZGluZ0Vycm9ycy5zaGlmdCgpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBDYWxscyBhIHRhc2sgYXMgc29vbiBhcyBwb3NzaWJsZSBhZnRlciByZXR1cm5pbmcsIGluIGl0cyBvd24gZXZlbnQsIHdpdGggcHJpb3JpdHlcbiAqIG92ZXIgb3RoZXIgZXZlbnRzIGxpa2UgYW5pbWF0aW9uLCByZWZsb3csIGFuZCByZXBhaW50LiBBbiBlcnJvciB0aHJvd24gZnJvbSBhblxuICogZXZlbnQgd2lsbCBub3QgaW50ZXJydXB0LCBub3IgZXZlbiBzdWJzdGFudGlhbGx5IHNsb3cgZG93biB0aGUgcHJvY2Vzc2luZyBvZlxuICogb3RoZXIgZXZlbnRzLCBidXQgd2lsbCBiZSByYXRoZXIgcG9zdHBvbmVkIHRvIGEgbG93ZXIgcHJpb3JpdHkgZXZlbnQuXG4gKiBAcGFyYW0ge3tjYWxsfX0gdGFzayBBIGNhbGxhYmxlIG9iamVjdCwgdHlwaWNhbGx5IGEgZnVuY3Rpb24gdGhhdCB0YWtlcyBub1xuICogYXJndW1lbnRzLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGFzYXA7XG5mdW5jdGlvbiBhc2FwKHRhc2spIHtcbiAgICB2YXIgcmF3VGFzaztcbiAgICBpZiAoZnJlZVRhc2tzLmxlbmd0aCkge1xuICAgICAgICByYXdUYXNrID0gZnJlZVRhc2tzLnBvcCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJhd1Rhc2sgPSBuZXcgUmF3VGFzaygpO1xuICAgIH1cbiAgICByYXdUYXNrLnRhc2sgPSB0YXNrO1xuICAgIHJhd0FzYXAocmF3VGFzayk7XG59XG5cbi8vIFdlIHdyYXAgdGFza3Mgd2l0aCByZWN5Y2xhYmxlIHRhc2sgb2JqZWN0cy4gIEEgdGFzayBvYmplY3QgaW1wbGVtZW50c1xuLy8gYGNhbGxgLCBqdXN0IGxpa2UgYSBmdW5jdGlvbi5cbmZ1bmN0aW9uIFJhd1Rhc2soKSB7XG4gICAgdGhpcy50YXNrID0gbnVsbDtcbn1cblxuLy8gVGhlIHNvbGUgcHVycG9zZSBvZiB3cmFwcGluZyB0aGUgdGFzayBpcyB0byBjYXRjaCB0aGUgZXhjZXB0aW9uIGFuZCByZWN5Y2xlXG4vLyB0aGUgdGFzayBvYmplY3QgYWZ0ZXIgaXRzIHNpbmdsZSB1c2UuXG5SYXdUYXNrLnByb3RvdHlwZS5jYWxsID0gZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIHRoaXMudGFzay5jYWxsKCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgaWYgKGFzYXAub25lcnJvcikge1xuICAgICAgICAgICAgLy8gVGhpcyBob29rIGV4aXN0cyBwdXJlbHkgZm9yIHRlc3RpbmcgcHVycG9zZXMuXG4gICAgICAgICAgICAvLyBJdHMgbmFtZSB3aWxsIGJlIHBlcmlvZGljYWxseSByYW5kb21pemVkIHRvIGJyZWFrIGFueSBjb2RlIHRoYXRcbiAgICAgICAgICAgIC8vIGRlcGVuZHMgb24gaXRzIGV4aXN0ZW5jZS5cbiAgICAgICAgICAgIGFzYXAub25lcnJvcihlcnJvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBJbiBhIHdlYiBicm93c2VyLCBleGNlcHRpb25zIGFyZSBub3QgZmF0YWwuIEhvd2V2ZXIsIHRvIGF2b2lkXG4gICAgICAgICAgICAvLyBzbG93aW5nIGRvd24gdGhlIHF1ZXVlIG9mIHBlbmRpbmcgdGFza3MsIHdlIHJldGhyb3cgdGhlIGVycm9yIGluIGFcbiAgICAgICAgICAgIC8vIGxvd2VyIHByaW9yaXR5IHR1cm4uXG4gICAgICAgICAgICBwZW5kaW5nRXJyb3JzLnB1c2goZXJyb3IpO1xuICAgICAgICAgICAgcmVxdWVzdEVycm9yVGhyb3coKTtcbiAgICAgICAgfVxuICAgIH0gZmluYWxseSB7XG4gICAgICAgIHRoaXMudGFzayA9IG51bGw7XG4gICAgICAgIGZyZWVUYXNrc1tmcmVlVGFza3MubGVuZ3RoXSA9IHRoaXM7XG4gICAgfVxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vLyBVc2UgdGhlIGZhc3Rlc3QgbWVhbnMgcG9zc2libGUgdG8gZXhlY3V0ZSBhIHRhc2sgaW4gaXRzIG93biB0dXJuLCB3aXRoXG4vLyBwcmlvcml0eSBvdmVyIG90aGVyIGV2ZW50cyBpbmNsdWRpbmcgSU8sIGFuaW1hdGlvbiwgcmVmbG93LCBhbmQgcmVkcmF3XG4vLyBldmVudHMgaW4gYnJvd3NlcnMuXG4vL1xuLy8gQW4gZXhjZXB0aW9uIHRocm93biBieSBhIHRhc2sgd2lsbCBwZXJtYW5lbnRseSBpbnRlcnJ1cHQgdGhlIHByb2Nlc3Npbmcgb2Zcbi8vIHN1YnNlcXVlbnQgdGFza3MuIFRoZSBoaWdoZXIgbGV2ZWwgYGFzYXBgIGZ1bmN0aW9uIGVuc3VyZXMgdGhhdCBpZiBhblxuLy8gZXhjZXB0aW9uIGlzIHRocm93biBieSBhIHRhc2ssIHRoYXQgdGhlIHRhc2sgcXVldWUgd2lsbCBjb250aW51ZSBmbHVzaGluZyBhc1xuLy8gc29vbiBhcyBwb3NzaWJsZSwgYnV0IGlmIHlvdSB1c2UgYHJhd0FzYXBgIGRpcmVjdGx5LCB5b3UgYXJlIHJlc3BvbnNpYmxlIHRvXG4vLyBlaXRoZXIgZW5zdXJlIHRoYXQgbm8gZXhjZXB0aW9ucyBhcmUgdGhyb3duIGZyb20geW91ciB0YXNrLCBvciB0byBtYW51YWxseVxuLy8gY2FsbCBgcmF3QXNhcC5yZXF1ZXN0Rmx1c2hgIGlmIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd24uXG5tb2R1bGUuZXhwb3J0cyA9IHJhd0FzYXA7XG5mdW5jdGlvbiByYXdBc2FwKHRhc2spIHtcbiAgICBpZiAoIXF1ZXVlLmxlbmd0aCkge1xuICAgICAgICByZXF1ZXN0Rmx1c2goKTtcbiAgICAgICAgZmx1c2hpbmcgPSB0cnVlO1xuICAgIH1cbiAgICAvLyBFcXVpdmFsZW50IHRvIHB1c2gsIGJ1dCBhdm9pZHMgYSBmdW5jdGlvbiBjYWxsLlxuICAgIHF1ZXVlW3F1ZXVlLmxlbmd0aF0gPSB0YXNrO1xufVxuXG52YXIgcXVldWUgPSBbXTtcbi8vIE9uY2UgYSBmbHVzaCBoYXMgYmVlbiByZXF1ZXN0ZWQsIG5vIGZ1cnRoZXIgY2FsbHMgdG8gYHJlcXVlc3RGbHVzaGAgYXJlXG4vLyBuZWNlc3NhcnkgdW50aWwgdGhlIG5leHQgYGZsdXNoYCBjb21wbGV0ZXMuXG52YXIgZmx1c2hpbmcgPSBmYWxzZTtcbi8vIGByZXF1ZXN0Rmx1c2hgIGlzIGFuIGltcGxlbWVudGF0aW9uLXNwZWNpZmljIG1ldGhvZCB0aGF0IGF0dGVtcHRzIHRvIGtpY2tcbi8vIG9mZiBhIGBmbHVzaGAgZXZlbnQgYXMgcXVpY2tseSBhcyBwb3NzaWJsZS4gYGZsdXNoYCB3aWxsIGF0dGVtcHQgdG8gZXhoYXVzdFxuLy8gdGhlIGV2ZW50IHF1ZXVlIGJlZm9yZSB5aWVsZGluZyB0byB0aGUgYnJvd3NlcidzIG93biBldmVudCBsb29wLlxudmFyIHJlcXVlc3RGbHVzaDtcbi8vIFRoZSBwb3NpdGlvbiBvZiB0aGUgbmV4dCB0YXNrIHRvIGV4ZWN1dGUgaW4gdGhlIHRhc2sgcXVldWUuIFRoaXMgaXNcbi8vIHByZXNlcnZlZCBiZXR3ZWVuIGNhbGxzIHRvIGBmbHVzaGAgc28gdGhhdCBpdCBjYW4gYmUgcmVzdW1lZCBpZlxuLy8gYSB0YXNrIHRocm93cyBhbiBleGNlcHRpb24uXG52YXIgaW5kZXggPSAwO1xuLy8gSWYgYSB0YXNrIHNjaGVkdWxlcyBhZGRpdGlvbmFsIHRhc2tzIHJlY3Vyc2l2ZWx5LCB0aGUgdGFzayBxdWV1ZSBjYW4gZ3Jvd1xuLy8gdW5ib3VuZGVkLiBUbyBwcmV2ZW50IG1lbW9yeSBleGhhdXN0aW9uLCB0aGUgdGFzayBxdWV1ZSB3aWxsIHBlcmlvZGljYWxseVxuLy8gdHJ1bmNhdGUgYWxyZWFkeS1jb21wbGV0ZWQgdGFza3MuXG52YXIgY2FwYWNpdHkgPSAxMDI0O1xuXG4vLyBUaGUgZmx1c2ggZnVuY3Rpb24gcHJvY2Vzc2VzIGFsbCB0YXNrcyB0aGF0IGhhdmUgYmVlbiBzY2hlZHVsZWQgd2l0aFxuLy8gYHJhd0FzYXBgIHVubGVzcyBhbmQgdW50aWwgb25lIG9mIHRob3NlIHRhc2tzIHRocm93cyBhbiBleGNlcHRpb24uXG4vLyBJZiBhIHRhc2sgdGhyb3dzIGFuIGV4Y2VwdGlvbiwgYGZsdXNoYCBlbnN1cmVzIHRoYXQgaXRzIHN0YXRlIHdpbGwgcmVtYWluXG4vLyBjb25zaXN0ZW50IGFuZCB3aWxsIHJlc3VtZSB3aGVyZSBpdCBsZWZ0IG9mZiB3aGVuIGNhbGxlZCBhZ2Fpbi5cbi8vIEhvd2V2ZXIsIGBmbHVzaGAgZG9lcyBub3QgbWFrZSBhbnkgYXJyYW5nZW1lbnRzIHRvIGJlIGNhbGxlZCBhZ2FpbiBpZiBhblxuLy8gZXhjZXB0aW9uIGlzIHRocm93bi5cbmZ1bmN0aW9uIGZsdXNoKCkge1xuICAgIHdoaWxlIChpbmRleCA8IHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICB2YXIgY3VycmVudEluZGV4ID0gaW5kZXg7XG4gICAgICAgIC8vIEFkdmFuY2UgdGhlIGluZGV4IGJlZm9yZSBjYWxsaW5nIHRoZSB0YXNrLiBUaGlzIGVuc3VyZXMgdGhhdCB3ZSB3aWxsXG4gICAgICAgIC8vIGJlZ2luIGZsdXNoaW5nIG9uIHRoZSBuZXh0IHRhc2sgdGhlIHRhc2sgdGhyb3dzIGFuIGVycm9yLlxuICAgICAgICBpbmRleCA9IGluZGV4ICsgMTtcbiAgICAgICAgcXVldWVbY3VycmVudEluZGV4XS5jYWxsKCk7XG4gICAgICAgIC8vIFByZXZlbnQgbGVha2luZyBtZW1vcnkgZm9yIGxvbmcgY2hhaW5zIG9mIHJlY3Vyc2l2ZSBjYWxscyB0byBgYXNhcGAuXG4gICAgICAgIC8vIElmIHdlIGNhbGwgYGFzYXBgIHdpdGhpbiB0YXNrcyBzY2hlZHVsZWQgYnkgYGFzYXBgLCB0aGUgcXVldWUgd2lsbFxuICAgICAgICAvLyBncm93LCBidXQgdG8gYXZvaWQgYW4gTyhuKSB3YWxrIGZvciBldmVyeSB0YXNrIHdlIGV4ZWN1dGUsIHdlIGRvbid0XG4gICAgICAgIC8vIHNoaWZ0IHRhc2tzIG9mZiB0aGUgcXVldWUgYWZ0ZXIgdGhleSBoYXZlIGJlZW4gZXhlY3V0ZWQuXG4gICAgICAgIC8vIEluc3RlYWQsIHdlIHBlcmlvZGljYWxseSBzaGlmdCAxMDI0IHRhc2tzIG9mZiB0aGUgcXVldWUuXG4gICAgICAgIGlmIChpbmRleCA+IGNhcGFjaXR5KSB7XG4gICAgICAgICAgICAvLyBNYW51YWxseSBzaGlmdCBhbGwgdmFsdWVzIHN0YXJ0aW5nIGF0IHRoZSBpbmRleCBiYWNrIHRvIHRoZVxuICAgICAgICAgICAgLy8gYmVnaW5uaW5nIG9mIHRoZSBxdWV1ZS5cbiAgICAgICAgICAgIGZvciAodmFyIHNjYW4gPSAwLCBuZXdMZW5ndGggPSBxdWV1ZS5sZW5ndGggLSBpbmRleDsgc2NhbiA8IG5ld0xlbmd0aDsgc2NhbisrKSB7XG4gICAgICAgICAgICAgICAgcXVldWVbc2Nhbl0gPSBxdWV1ZVtzY2FuICsgaW5kZXhdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcXVldWUubGVuZ3RoIC09IGluZGV4O1xuICAgICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLmxlbmd0aCA9IDA7XG4gICAgaW5kZXggPSAwO1xuICAgIGZsdXNoaW5nID0gZmFsc2U7XG59XG5cbi8vIGByZXF1ZXN0Rmx1c2hgIGlzIGltcGxlbWVudGVkIHVzaW5nIGEgc3RyYXRlZ3kgYmFzZWQgb24gZGF0YSBjb2xsZWN0ZWQgZnJvbVxuLy8gZXZlcnkgYXZhaWxhYmxlIFNhdWNlTGFicyBTZWxlbml1bSB3ZWIgZHJpdmVyIHdvcmtlciBhdCB0aW1lIG9mIHdyaXRpbmcuXG4vLyBodHRwczovL2RvY3MuZ29vZ2xlLmNvbS9zcHJlYWRzaGVldHMvZC8xbUctNVVZR3VwNXF4R2RFTVdraFA2QldDejA1M05VYjJFMVFvVVRVMTZ1QS9lZGl0I2dpZD03ODM3MjQ1OTNcblxuLy8gU2FmYXJpIDYgYW5kIDYuMSBmb3IgZGVza3RvcCwgaVBhZCwgYW5kIGlQaG9uZSBhcmUgdGhlIG9ubHkgYnJvd3NlcnMgdGhhdFxuLy8gaGF2ZSBXZWJLaXRNdXRhdGlvbk9ic2VydmVyIGJ1dCBub3QgdW4tcHJlZml4ZWQgTXV0YXRpb25PYnNlcnZlci5cbi8vIE11c3QgdXNlIGBnbG9iYWxgIGluc3RlYWQgb2YgYHdpbmRvd2AgdG8gd29yayBpbiBib3RoIGZyYW1lcyBhbmQgd2ViXG4vLyB3b3JrZXJzLiBgZ2xvYmFsYCBpcyBhIHByb3Zpc2lvbiBvZiBCcm93c2VyaWZ5LCBNciwgTXJzLCBvciBNb3AuXG52YXIgQnJvd3Nlck11dGF0aW9uT2JzZXJ2ZXIgPSBnbG9iYWwuTXV0YXRpb25PYnNlcnZlciB8fCBnbG9iYWwuV2ViS2l0TXV0YXRpb25PYnNlcnZlcjtcblxuLy8gTXV0YXRpb25PYnNlcnZlcnMgYXJlIGRlc2lyYWJsZSBiZWNhdXNlIHRoZXkgaGF2ZSBoaWdoIHByaW9yaXR5IGFuZCB3b3JrXG4vLyByZWxpYWJseSBldmVyeXdoZXJlIHRoZXkgYXJlIGltcGxlbWVudGVkLlxuLy8gVGhleSBhcmUgaW1wbGVtZW50ZWQgaW4gYWxsIG1vZGVybiBicm93c2Vycy5cbi8vXG4vLyAtIEFuZHJvaWQgNC00LjNcbi8vIC0gQ2hyb21lIDI2LTM0XG4vLyAtIEZpcmVmb3ggMTQtMjlcbi8vIC0gSW50ZXJuZXQgRXhwbG9yZXIgMTFcbi8vIC0gaVBhZCBTYWZhcmkgNi03LjFcbi8vIC0gaVBob25lIFNhZmFyaSA3LTcuMVxuLy8gLSBTYWZhcmkgNi03XG5pZiAodHlwZW9mIEJyb3dzZXJNdXRhdGlvbk9ic2VydmVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICByZXF1ZXN0Rmx1c2ggPSBtYWtlUmVxdWVzdENhbGxGcm9tTXV0YXRpb25PYnNlcnZlcihmbHVzaCk7XG5cbi8vIE1lc3NhZ2VDaGFubmVscyBhcmUgZGVzaXJhYmxlIGJlY2F1c2UgdGhleSBnaXZlIGRpcmVjdCBhY2Nlc3MgdG8gdGhlIEhUTUxcbi8vIHRhc2sgcXVldWUsIGFyZSBpbXBsZW1lbnRlZCBpbiBJbnRlcm5ldCBFeHBsb3JlciAxMCwgU2FmYXJpIDUuMC0xLCBhbmQgT3BlcmFcbi8vIDExLTEyLCBhbmQgaW4gd2ViIHdvcmtlcnMgaW4gbWFueSBlbmdpbmVzLlxuLy8gQWx0aG91Z2ggbWVzc2FnZSBjaGFubmVscyB5aWVsZCB0byBhbnkgcXVldWVkIHJlbmRlcmluZyBhbmQgSU8gdGFza3MsIHRoZXlcbi8vIHdvdWxkIGJlIGJldHRlciB0aGFuIGltcG9zaW5nIHRoZSA0bXMgZGVsYXkgb2YgdGltZXJzLlxuLy8gSG93ZXZlciwgdGhleSBkbyBub3Qgd29yayByZWxpYWJseSBpbiBJbnRlcm5ldCBFeHBsb3JlciBvciBTYWZhcmkuXG5cbi8vIEludGVybmV0IEV4cGxvcmVyIDEwIGlzIHRoZSBvbmx5IGJyb3dzZXIgdGhhdCBoYXMgc2V0SW1tZWRpYXRlIGJ1dCBkb2VzXG4vLyBub3QgaGF2ZSBNdXRhdGlvbk9ic2VydmVycy5cbi8vIEFsdGhvdWdoIHNldEltbWVkaWF0ZSB5aWVsZHMgdG8gdGhlIGJyb3dzZXIncyByZW5kZXJlciwgaXQgd291bGQgYmVcbi8vIHByZWZlcnJhYmxlIHRvIGZhbGxpbmcgYmFjayB0byBzZXRUaW1lb3V0IHNpbmNlIGl0IGRvZXMgbm90IGhhdmVcbi8vIHRoZSBtaW5pbXVtIDRtcyBwZW5hbHR5LlxuLy8gVW5mb3J0dW5hdGVseSB0aGVyZSBhcHBlYXJzIHRvIGJlIGEgYnVnIGluIEludGVybmV0IEV4cGxvcmVyIDEwIE1vYmlsZSAoYW5kXG4vLyBEZXNrdG9wIHRvIGEgbGVzc2VyIGV4dGVudCkgdGhhdCByZW5kZXJzIGJvdGggc2V0SW1tZWRpYXRlIGFuZFxuLy8gTWVzc2FnZUNoYW5uZWwgdXNlbGVzcyBmb3IgdGhlIHB1cnBvc2VzIG9mIEFTQVAuXG4vLyBodHRwczovL2dpdGh1Yi5jb20va3Jpc2tvd2FsL3EvaXNzdWVzLzM5NlxuXG4vLyBUaW1lcnMgYXJlIGltcGxlbWVudGVkIHVuaXZlcnNhbGx5LlxuLy8gV2UgZmFsbCBiYWNrIHRvIHRpbWVycyBpbiB3b3JrZXJzIGluIG1vc3QgZW5naW5lcywgYW5kIGluIGZvcmVncm91bmRcbi8vIGNvbnRleHRzIGluIHRoZSBmb2xsb3dpbmcgYnJvd3NlcnMuXG4vLyBIb3dldmVyLCBub3RlIHRoYXQgZXZlbiB0aGlzIHNpbXBsZSBjYXNlIHJlcXVpcmVzIG51YW5jZXMgdG8gb3BlcmF0ZSBpbiBhXG4vLyBicm9hZCBzcGVjdHJ1bSBvZiBicm93c2Vycy5cbi8vXG4vLyAtIEZpcmVmb3ggMy0xM1xuLy8gLSBJbnRlcm5ldCBFeHBsb3JlciA2LTlcbi8vIC0gaVBhZCBTYWZhcmkgNC4zXG4vLyAtIEx5bnggMi44Ljdcbn0gZWxzZSB7XG4gICAgcmVxdWVzdEZsdXNoID0gbWFrZVJlcXVlc3RDYWxsRnJvbVRpbWVyKGZsdXNoKTtcbn1cblxuLy8gYHJlcXVlc3RGbHVzaGAgcmVxdWVzdHMgdGhhdCB0aGUgaGlnaCBwcmlvcml0eSBldmVudCBxdWV1ZSBiZSBmbHVzaGVkIGFzXG4vLyBzb29uIGFzIHBvc3NpYmxlLlxuLy8gVGhpcyBpcyB1c2VmdWwgdG8gcHJldmVudCBhbiBlcnJvciB0aHJvd24gaW4gYSB0YXNrIGZyb20gc3RhbGxpbmcgdGhlIGV2ZW50XG4vLyBxdWV1ZSBpZiB0aGUgZXhjZXB0aW9uIGhhbmRsZWQgYnkgTm9kZS5qc+KAmXNcbi8vIGBwcm9jZXNzLm9uKFwidW5jYXVnaHRFeGNlcHRpb25cIilgIG9yIGJ5IGEgZG9tYWluLlxucmF3QXNhcC5yZXF1ZXN0Rmx1c2ggPSByZXF1ZXN0Rmx1c2g7XG5cbi8vIFRvIHJlcXVlc3QgYSBoaWdoIHByaW9yaXR5IGV2ZW50LCB3ZSBpbmR1Y2UgYSBtdXRhdGlvbiBvYnNlcnZlciBieSB0b2dnbGluZ1xuLy8gdGhlIHRleHQgb2YgYSB0ZXh0IG5vZGUgYmV0d2VlbiBcIjFcIiBhbmQgXCItMVwiLlxuZnVuY3Rpb24gbWFrZVJlcXVlc3RDYWxsRnJvbU11dGF0aW9uT2JzZXJ2ZXIoY2FsbGJhY2spIHtcbiAgICB2YXIgdG9nZ2xlID0gMTtcbiAgICB2YXIgb2JzZXJ2ZXIgPSBuZXcgQnJvd3Nlck11dGF0aW9uT2JzZXJ2ZXIoY2FsbGJhY2spO1xuICAgIHZhciBub2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJcIik7XG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZShub2RlLCB7Y2hhcmFjdGVyRGF0YTogdHJ1ZX0pO1xuICAgIHJldHVybiBmdW5jdGlvbiByZXF1ZXN0Q2FsbCgpIHtcbiAgICAgICAgdG9nZ2xlID0gLXRvZ2dsZTtcbiAgICAgICAgbm9kZS5kYXRhID0gdG9nZ2xlO1xuICAgIH07XG59XG5cbi8vIFRoZSBtZXNzYWdlIGNoYW5uZWwgdGVjaG5pcXVlIHdhcyBkaXNjb3ZlcmVkIGJ5IE1hbHRlIFVibCBhbmQgd2FzIHRoZVxuLy8gb3JpZ2luYWwgZm91bmRhdGlvbiBmb3IgdGhpcyBsaWJyYXJ5LlxuLy8gaHR0cDovL3d3dy5ub25ibG9ja2luZy5pby8yMDExLzA2L3dpbmRvd25leHR0aWNrLmh0bWxcblxuLy8gU2FmYXJpIDYuMC41IChhdCBsZWFzdCkgaW50ZXJtaXR0ZW50bHkgZmFpbHMgdG8gY3JlYXRlIG1lc3NhZ2UgcG9ydHMgb24gYVxuLy8gcGFnZSdzIGZpcnN0IGxvYWQuIFRoYW5rZnVsbHksIHRoaXMgdmVyc2lvbiBvZiBTYWZhcmkgc3VwcG9ydHNcbi8vIE11dGF0aW9uT2JzZXJ2ZXJzLCBzbyB3ZSBkb24ndCBuZWVkIHRvIGZhbGwgYmFjayBpbiB0aGF0IGNhc2UuXG5cbi8vIGZ1bmN0aW9uIG1ha2VSZXF1ZXN0Q2FsbEZyb21NZXNzYWdlQ2hhbm5lbChjYWxsYmFjaykge1xuLy8gICAgIHZhciBjaGFubmVsID0gbmV3IE1lc3NhZ2VDaGFubmVsKCk7XG4vLyAgICAgY2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2UgPSBjYWxsYmFjaztcbi8vICAgICByZXR1cm4gZnVuY3Rpb24gcmVxdWVzdENhbGwoKSB7XG4vLyAgICAgICAgIGNoYW5uZWwucG9ydDIucG9zdE1lc3NhZ2UoMCk7XG4vLyAgICAgfTtcbi8vIH1cblxuLy8gRm9yIHJlYXNvbnMgZXhwbGFpbmVkIGFib3ZlLCB3ZSBhcmUgYWxzbyB1bmFibGUgdG8gdXNlIGBzZXRJbW1lZGlhdGVgXG4vLyB1bmRlciBhbnkgY2lyY3Vtc3RhbmNlcy5cbi8vIEV2ZW4gaWYgd2Ugd2VyZSwgdGhlcmUgaXMgYW5vdGhlciBidWcgaW4gSW50ZXJuZXQgRXhwbG9yZXIgMTAuXG4vLyBJdCBpcyBub3Qgc3VmZmljaWVudCB0byBhc3NpZ24gYHNldEltbWVkaWF0ZWAgdG8gYHJlcXVlc3RGbHVzaGAgYmVjYXVzZVxuLy8gYHNldEltbWVkaWF0ZWAgbXVzdCBiZSBjYWxsZWQgKmJ5IG5hbWUqIGFuZCB0aGVyZWZvcmUgbXVzdCBiZSB3cmFwcGVkIGluIGFcbi8vIGNsb3N1cmUuXG4vLyBOZXZlciBmb3JnZXQuXG5cbi8vIGZ1bmN0aW9uIG1ha2VSZXF1ZXN0Q2FsbEZyb21TZXRJbW1lZGlhdGUoY2FsbGJhY2spIHtcbi8vICAgICByZXR1cm4gZnVuY3Rpb24gcmVxdWVzdENhbGwoKSB7XG4vLyAgICAgICAgIHNldEltbWVkaWF0ZShjYWxsYmFjayk7XG4vLyAgICAgfTtcbi8vIH1cblxuLy8gU2FmYXJpIDYuMCBoYXMgYSBwcm9ibGVtIHdoZXJlIHRpbWVycyB3aWxsIGdldCBsb3N0IHdoaWxlIHRoZSB1c2VyIGlzXG4vLyBzY3JvbGxpbmcuIFRoaXMgcHJvYmxlbSBkb2VzIG5vdCBpbXBhY3QgQVNBUCBiZWNhdXNlIFNhZmFyaSA2LjAgc3VwcG9ydHNcbi8vIG11dGF0aW9uIG9ic2VydmVycywgc28gdGhhdCBpbXBsZW1lbnRhdGlvbiBpcyB1c2VkIGluc3RlYWQuXG4vLyBIb3dldmVyLCBpZiB3ZSBldmVyIGVsZWN0IHRvIHVzZSB0aW1lcnMgaW4gU2FmYXJpLCB0aGUgcHJldmFsZW50IHdvcmstYXJvdW5kXG4vLyBpcyB0byBhZGQgYSBzY3JvbGwgZXZlbnQgbGlzdGVuZXIgdGhhdCBjYWxscyBmb3IgYSBmbHVzaC5cblxuLy8gYHNldFRpbWVvdXRgIGRvZXMgbm90IGNhbGwgdGhlIHBhc3NlZCBjYWxsYmFjayBpZiB0aGUgZGVsYXkgaXMgbGVzcyB0aGFuXG4vLyBhcHByb3hpbWF0ZWx5IDcgaW4gd2ViIHdvcmtlcnMgaW4gRmlyZWZveCA4IHRocm91Z2ggMTgsIGFuZCBzb21ldGltZXMgbm90XG4vLyBldmVuIHRoZW4uXG5cbmZ1bmN0aW9uIG1ha2VSZXF1ZXN0Q2FsbEZyb21UaW1lcihjYWxsYmFjaykge1xuICAgIHJldHVybiBmdW5jdGlvbiByZXF1ZXN0Q2FsbCgpIHtcbiAgICAgICAgLy8gV2UgZGlzcGF0Y2ggYSB0aW1lb3V0IHdpdGggYSBzcGVjaWZpZWQgZGVsYXkgb2YgMCBmb3IgZW5naW5lcyB0aGF0XG4gICAgICAgIC8vIGNhbiByZWxpYWJseSBhY2NvbW1vZGF0ZSB0aGF0IHJlcXVlc3QuIFRoaXMgd2lsbCB1c3VhbGx5IGJlIHNuYXBwZWRcbiAgICAgICAgLy8gdG8gYSA0IG1pbGlzZWNvbmQgZGVsYXksIGJ1dCBvbmNlIHdlJ3JlIGZsdXNoaW5nLCB0aGVyZSdzIG5vIGRlbGF5XG4gICAgICAgIC8vIGJldHdlZW4gZXZlbnRzLlxuICAgICAgICB2YXIgdGltZW91dEhhbmRsZSA9IHNldFRpbWVvdXQoaGFuZGxlVGltZXIsIDApO1xuICAgICAgICAvLyBIb3dldmVyLCBzaW5jZSB0aGlzIHRpbWVyIGdldHMgZnJlcXVlbnRseSBkcm9wcGVkIGluIEZpcmVmb3hcbiAgICAgICAgLy8gd29ya2Vycywgd2UgZW5saXN0IGFuIGludGVydmFsIGhhbmRsZSB0aGF0IHdpbGwgdHJ5IHRvIGZpcmVcbiAgICAgICAgLy8gYW4gZXZlbnQgMjAgdGltZXMgcGVyIHNlY29uZCB1bnRpbCBpdCBzdWNjZWVkcy5cbiAgICAgICAgdmFyIGludGVydmFsSGFuZGxlID0gc2V0SW50ZXJ2YWwoaGFuZGxlVGltZXIsIDUwKTtcblxuICAgICAgICBmdW5jdGlvbiBoYW5kbGVUaW1lcigpIHtcbiAgICAgICAgICAgIC8vIFdoaWNoZXZlciB0aW1lciBzdWNjZWVkcyB3aWxsIGNhbmNlbCBib3RoIHRpbWVycyBhbmRcbiAgICAgICAgICAgIC8vIGV4ZWN1dGUgdGhlIGNhbGxiYWNrLlxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRIYW5kbGUpO1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbEhhbmRsZSk7XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuLy8gVGhpcyBpcyBmb3IgYGFzYXAuanNgIG9ubHkuXG4vLyBJdHMgbmFtZSB3aWxsIGJlIHBlcmlvZGljYWxseSByYW5kb21pemVkIHRvIGJyZWFrIGFueSBjb2RlIHRoYXQgZGVwZW5kcyBvblxuLy8gaXRzIGV4aXN0ZW5jZS5cbnJhd0FzYXAubWFrZVJlcXVlc3RDYWxsRnJvbVRpbWVyID0gbWFrZVJlcXVlc3RDYWxsRnJvbVRpbWVyO1xuXG4vLyBBU0FQIHdhcyBvcmlnaW5hbGx5IGEgbmV4dFRpY2sgc2hpbSBpbmNsdWRlZCBpbiBRLiBUaGlzIHdhcyBmYWN0b3JlZCBvdXRcbi8vIGludG8gdGhpcyBBU0FQIHBhY2thZ2UuIEl0IHdhcyBsYXRlciBhZGFwdGVkIHRvIFJTVlAgd2hpY2ggbWFkZSBmdXJ0aGVyXG4vLyBhbWVuZG1lbnRzLiBUaGVzZSBkZWNpc2lvbnMsIHBhcnRpY3VsYXJseSB0byBtYXJnaW5hbGl6ZSBNZXNzYWdlQ2hhbm5lbCBhbmRcbi8vIHRvIGNhcHR1cmUgdGhlIE11dGF0aW9uT2JzZXJ2ZXIgaW1wbGVtZW50YXRpb24gaW4gYSBjbG9zdXJlLCB3ZXJlIGludGVncmF0ZWRcbi8vIGJhY2sgaW50byBBU0FQIHByb3Blci5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS90aWxkZWlvL3JzdnAuanMvYmxvYi9jZGRmNzIzMjU0NmE5Y2Y4NTg1MjRiNzVjZGU2ZjllZGY3MjYyMGE3L2xpYi9yc3ZwL2FzYXAuanNcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgZG9tYWluOyAvLyBUaGUgZG9tYWluIG1vZHVsZSBpcyBleGVjdXRlZCBvbiBkZW1hbmRcbnZhciBoYXNTZXRJbW1lZGlhdGUgPSB0eXBlb2Ygc2V0SW1tZWRpYXRlID09PSBcImZ1bmN0aW9uXCI7XG5cbi8vIFVzZSB0aGUgZmFzdGVzdCBtZWFucyBwb3NzaWJsZSB0byBleGVjdXRlIGEgdGFzayBpbiBpdHMgb3duIHR1cm4sIHdpdGhcbi8vIHByaW9yaXR5IG92ZXIgb3RoZXIgZXZlbnRzIGluY2x1ZGluZyBuZXR3b3JrIElPIGV2ZW50cyBpbiBOb2RlLmpzLlxuLy9cbi8vIEFuIGV4Y2VwdGlvbiB0aHJvd24gYnkgYSB0YXNrIHdpbGwgcGVybWFuZW50bHkgaW50ZXJydXB0IHRoZSBwcm9jZXNzaW5nIG9mXG4vLyBzdWJzZXF1ZW50IHRhc2tzLiBUaGUgaGlnaGVyIGxldmVsIGBhc2FwYCBmdW5jdGlvbiBlbnN1cmVzIHRoYXQgaWYgYW5cbi8vIGV4Y2VwdGlvbiBpcyB0aHJvd24gYnkgYSB0YXNrLCB0aGF0IHRoZSB0YXNrIHF1ZXVlIHdpbGwgY29udGludWUgZmx1c2hpbmcgYXNcbi8vIHNvb24gYXMgcG9zc2libGUsIGJ1dCBpZiB5b3UgdXNlIGByYXdBc2FwYCBkaXJlY3RseSwgeW91IGFyZSByZXNwb25zaWJsZSB0b1xuLy8gZWl0aGVyIGVuc3VyZSB0aGF0IG5vIGV4Y2VwdGlvbnMgYXJlIHRocm93biBmcm9tIHlvdXIgdGFzaywgb3IgdG8gbWFudWFsbHlcbi8vIGNhbGwgYHJhd0FzYXAucmVxdWVzdEZsdXNoYCBpZiBhbiBleGNlcHRpb24gaXMgdGhyb3duLlxubW9kdWxlLmV4cG9ydHMgPSByYXdBc2FwO1xuZnVuY3Rpb24gcmF3QXNhcCh0YXNrKSB7XG4gICAgaWYgKCFxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcmVxdWVzdEZsdXNoKCk7XG4gICAgICAgIGZsdXNoaW5nID0gdHJ1ZTtcbiAgICB9XG4gICAgLy8gQXZvaWRzIGEgZnVuY3Rpb24gY2FsbFxuICAgIHF1ZXVlW3F1ZXVlLmxlbmd0aF0gPSB0YXNrO1xufVxuXG52YXIgcXVldWUgPSBbXTtcbi8vIE9uY2UgYSBmbHVzaCBoYXMgYmVlbiByZXF1ZXN0ZWQsIG5vIGZ1cnRoZXIgY2FsbHMgdG8gYHJlcXVlc3RGbHVzaGAgYXJlXG4vLyBuZWNlc3NhcnkgdW50aWwgdGhlIG5leHQgYGZsdXNoYCBjb21wbGV0ZXMuXG52YXIgZmx1c2hpbmcgPSBmYWxzZTtcbi8vIFRoZSBwb3NpdGlvbiBvZiB0aGUgbmV4dCB0YXNrIHRvIGV4ZWN1dGUgaW4gdGhlIHRhc2sgcXVldWUuIFRoaXMgaXNcbi8vIHByZXNlcnZlZCBiZXR3ZWVuIGNhbGxzIHRvIGBmbHVzaGAgc28gdGhhdCBpdCBjYW4gYmUgcmVzdW1lZCBpZlxuLy8gYSB0YXNrIHRocm93cyBhbiBleGNlcHRpb24uXG52YXIgaW5kZXggPSAwO1xuLy8gSWYgYSB0YXNrIHNjaGVkdWxlcyBhZGRpdGlvbmFsIHRhc2tzIHJlY3Vyc2l2ZWx5LCB0aGUgdGFzayBxdWV1ZSBjYW4gZ3Jvd1xuLy8gdW5ib3VuZGVkLiBUbyBwcmV2ZW50IG1lbW9yeSBleGNhdXN0aW9uLCB0aGUgdGFzayBxdWV1ZSB3aWxsIHBlcmlvZGljYWxseVxuLy8gdHJ1bmNhdGUgYWxyZWFkeS1jb21wbGV0ZWQgdGFza3MuXG52YXIgY2FwYWNpdHkgPSAxMDI0O1xuXG4vLyBUaGUgZmx1c2ggZnVuY3Rpb24gcHJvY2Vzc2VzIGFsbCB0YXNrcyB0aGF0IGhhdmUgYmVlbiBzY2hlZHVsZWQgd2l0aFxuLy8gYHJhd0FzYXBgIHVubGVzcyBhbmQgdW50aWwgb25lIG9mIHRob3NlIHRhc2tzIHRocm93cyBhbiBleGNlcHRpb24uXG4vLyBJZiBhIHRhc2sgdGhyb3dzIGFuIGV4Y2VwdGlvbiwgYGZsdXNoYCBlbnN1cmVzIHRoYXQgaXRzIHN0YXRlIHdpbGwgcmVtYWluXG4vLyBjb25zaXN0ZW50IGFuZCB3aWxsIHJlc3VtZSB3aGVyZSBpdCBsZWZ0IG9mZiB3aGVuIGNhbGxlZCBhZ2Fpbi5cbi8vIEhvd2V2ZXIsIGBmbHVzaGAgZG9lcyBub3QgbWFrZSBhbnkgYXJyYW5nZW1lbnRzIHRvIGJlIGNhbGxlZCBhZ2FpbiBpZiBhblxuLy8gZXhjZXB0aW9uIGlzIHRocm93bi5cbmZ1bmN0aW9uIGZsdXNoKCkge1xuICAgIHdoaWxlIChpbmRleCA8IHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICB2YXIgY3VycmVudEluZGV4ID0gaW5kZXg7XG4gICAgICAgIC8vIEFkdmFuY2UgdGhlIGluZGV4IGJlZm9yZSBjYWxsaW5nIHRoZSB0YXNrLiBUaGlzIGVuc3VyZXMgdGhhdCB3ZSB3aWxsXG4gICAgICAgIC8vIGJlZ2luIGZsdXNoaW5nIG9uIHRoZSBuZXh0IHRhc2sgdGhlIHRhc2sgdGhyb3dzIGFuIGVycm9yLlxuICAgICAgICBpbmRleCA9IGluZGV4ICsgMTtcbiAgICAgICAgcXVldWVbY3VycmVudEluZGV4XS5jYWxsKCk7XG4gICAgICAgIC8vIFByZXZlbnQgbGVha2luZyBtZW1vcnkgZm9yIGxvbmcgY2hhaW5zIG9mIHJlY3Vyc2l2ZSBjYWxscyB0byBgYXNhcGAuXG4gICAgICAgIC8vIElmIHdlIGNhbGwgYGFzYXBgIHdpdGhpbiB0YXNrcyBzY2hlZHVsZWQgYnkgYGFzYXBgLCB0aGUgcXVldWUgd2lsbFxuICAgICAgICAvLyBncm93LCBidXQgdG8gYXZvaWQgYW4gTyhuKSB3YWxrIGZvciBldmVyeSB0YXNrIHdlIGV4ZWN1dGUsIHdlIGRvbid0XG4gICAgICAgIC8vIHNoaWZ0IHRhc2tzIG9mZiB0aGUgcXVldWUgYWZ0ZXIgdGhleSBoYXZlIGJlZW4gZXhlY3V0ZWQuXG4gICAgICAgIC8vIEluc3RlYWQsIHdlIHBlcmlvZGljYWxseSBzaGlmdCAxMDI0IHRhc2tzIG9mZiB0aGUgcXVldWUuXG4gICAgICAgIGlmIChpbmRleCA+IGNhcGFjaXR5KSB7XG4gICAgICAgICAgICAvLyBNYW51YWxseSBzaGlmdCBhbGwgdmFsdWVzIHN0YXJ0aW5nIGF0IHRoZSBpbmRleCBiYWNrIHRvIHRoZVxuICAgICAgICAgICAgLy8gYmVnaW5uaW5nIG9mIHRoZSBxdWV1ZS5cbiAgICAgICAgICAgIGZvciAodmFyIHNjYW4gPSAwLCBuZXdMZW5ndGggPSBxdWV1ZS5sZW5ndGggLSBpbmRleDsgc2NhbiA8IG5ld0xlbmd0aDsgc2NhbisrKSB7XG4gICAgICAgICAgICAgICAgcXVldWVbc2Nhbl0gPSBxdWV1ZVtzY2FuICsgaW5kZXhdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcXVldWUubGVuZ3RoIC09IGluZGV4O1xuICAgICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLmxlbmd0aCA9IDA7XG4gICAgaW5kZXggPSAwO1xuICAgIGZsdXNoaW5nID0gZmFsc2U7XG59XG5cbnJhd0FzYXAucmVxdWVzdEZsdXNoID0gcmVxdWVzdEZsdXNoO1xuZnVuY3Rpb24gcmVxdWVzdEZsdXNoKCkge1xuICAgIC8vIEVuc3VyZSBmbHVzaGluZyBpcyBub3QgYm91bmQgdG8gYW55IGRvbWFpbi5cbiAgICAvLyBJdCBpcyBub3Qgc3VmZmljaWVudCB0byBleGl0IHRoZSBkb21haW4sIGJlY2F1c2UgZG9tYWlucyBleGlzdCBvbiBhIHN0YWNrLlxuICAgIC8vIFRvIGV4ZWN1dGUgY29kZSBvdXRzaWRlIG9mIGFueSBkb21haW4sIHRoZSBmb2xsb3dpbmcgZGFuY2UgaXMgbmVjZXNzYXJ5LlxuICAgIHZhciBwYXJlbnREb21haW4gPSBwcm9jZXNzLmRvbWFpbjtcbiAgICBpZiAocGFyZW50RG9tYWluKSB7XG4gICAgICAgIGlmICghZG9tYWluKSB7XG4gICAgICAgICAgICAvLyBMYXp5IGV4ZWN1dGUgdGhlIGRvbWFpbiBtb2R1bGUuXG4gICAgICAgICAgICAvLyBPbmx5IGVtcGxveWVkIGlmIHRoZSB1c2VyIGVsZWN0cyB0byB1c2UgZG9tYWlucy5cbiAgICAgICAgICAgIGRvbWFpbiA9IHJlcXVpcmUoXCJkb21haW5cIik7XG4gICAgICAgIH1cbiAgICAgICAgZG9tYWluLmFjdGl2ZSA9IHByb2Nlc3MuZG9tYWluID0gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBgc2V0SW1tZWRpYXRlYCBpcyBzbG93ZXIgdGhhdCBgcHJvY2Vzcy5uZXh0VGlja2AsIGJ1dCBgcHJvY2Vzcy5uZXh0VGlja2BcbiAgICAvLyBjYW5ub3QgaGFuZGxlIHJlY3Vyc2lvbi5cbiAgICAvLyBgcmVxdWVzdEZsdXNoYCB3aWxsIG9ubHkgYmUgY2FsbGVkIHJlY3Vyc2l2ZWx5IGZyb20gYGFzYXAuanNgLCB0byByZXN1bWVcbiAgICAvLyBmbHVzaGluZyBhZnRlciBhbiBlcnJvciBpcyB0aHJvd24gaW50byBhIGRvbWFpbi5cbiAgICAvLyBDb252ZW5pZW50bHksIGBzZXRJbW1lZGlhdGVgIHdhcyBpbnRyb2R1Y2VkIGluIHRoZSBzYW1lIHZlcnNpb25cbiAgICAvLyBgcHJvY2Vzcy5uZXh0VGlja2Agc3RhcnRlZCB0aHJvd2luZyByZWN1cnNpb24gZXJyb3JzLlxuICAgIGlmIChmbHVzaGluZyAmJiBoYXNTZXRJbW1lZGlhdGUpIHtcbiAgICAgICAgc2V0SW1tZWRpYXRlKGZsdXNoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBwcm9jZXNzLm5leHRUaWNrKGZsdXNoKTtcbiAgICB9XG5cbiAgICBpZiAocGFyZW50RG9tYWluKSB7XG4gICAgICAgIGRvbWFpbi5hY3RpdmUgPSBwcm9jZXNzLmRvbWFpbiA9IHBhcmVudERvbWFpbjtcbiAgICB9XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIFRoaXMgZmlsZSBjb250YWlucyBkZWZpbml0aW9ucyBvZiBydWxlcyBob3cgbG9jYXRpb24gVVJMcyBhcmUgdHJhbnNsYXRlZFxuLy8gdG8gcGFyYW1ldGVycyBmb3Igc3RvcmVzIGluIENhdGJlcnJ5IGFwcGxpY2F0aW9uLlxuLy9cbi8vIEZvcm1hdDpcbi8vIC9zb21lLzpwYXJhbWV0ZXJbc3RvcmUxLHN0b3JlMixzdG9yZTNdXG4vL1xuLy8gTW9yZSBkZXRhaWxzIGhlcmU6XG4vLyBodHRwczovL2dpdGh1Yi5jb20vY2F0YmVycnkvY2F0YmVycnkvYmxvYi9tYXN0ZXIvZG9jcy9pbmRleC5tZCNyb3V0aW5nXG5cbm1vZHVsZS5leHBvcnRzID0gW1xuICAvLyAnLzpmaWx0ZXJbVG9kb0xpc3QsRmlsdGVyc10nXG4gICcvOnBhZ2VbUGFnZXNdJ1xuICAvLyAnLzpwYWdlW1BhZ2VzXT9xdWVyeT06cXVlcnlbY29tbWl0cy9TZWFyY2hdJ1xuXHQvLyAnLydcbl07XG4iLCIvKlxuICogY2F0YmVycnlcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgRGVuaXMgUmVjaGt1bm92IGFuZCBwcm9qZWN0IGNvbnRyaWJ1dG9ycy5cbiAqXG4gKiBjYXRiZXJyeSdzIGxpY2Vuc2UgZm9sbG93czpcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvblxuICogb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb25cbiAqIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbixcbiAqIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsXG4gKiBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLFxuICogYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbiAqIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4gKiBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4gKiBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqXG4gKiBUaGlzIGxpY2Vuc2UgYXBwbGllcyB0byBhbGwgcGFydHMgb2YgY2F0YmVycnkgdGhhdCBhcmUgbm90IGV4dGVybmFsbHlcbiAqIG1haW50YWluZWQgbGlicmFyaWVzLlxuICovXG5cbi8qKlxuICogVGhpcyBtb2R1bGUgaXMgYSB0ZW1wbGF0ZSBhbmQgaXQgaXMgdXNlZCBvbmx5IHdpdGggc29tZSBzdHJpbmcgcmVwbGFjZXNcbiAqIGJ5IEJyb3dzZXJCdW5kbGVCdWlsZGVyIG1vZHVsZS4gSXQgZG9lcyBub3Qgd29yayBieSBpdHNlbGYuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgc3RvcmVzID0gW1xuXG57bmFtZTogJ01haW4nLCBjb25zdHJ1Y3RvcjogcmVxdWlyZSgnLi9jYXRiZXJyeV9zdG9yZXMvTWFpbi5qcycpfSxcbntuYW1lOiAnUGFnZXMnLCBjb25zdHJ1Y3RvcjogcmVxdWlyZSgnLi9jYXRiZXJyeV9zdG9yZXMvUGFnZXMuanMnKX1cbl07XG5cbnZhciBjb21wb25lbnRzID0gW1xuXG57bmFtZTogJ2RvY3VtZW50JywgY29uc3RydWN0b3I6IHJlcXVpcmUoJy4vY2F0YmVycnlfY29tcG9uZW50cy9kb2N1bWVudC9Eb2N1bWVudC5qcycpLCBwcm9wZXJ0aWVzOiB7XCJuYW1lXCI6XCJkb2N1bWVudFwiLFwidGVtcGxhdGVcIjpcIi4vZG9jdW1lbnQuaGJzXCIsXCJsb2dpY1wiOlwiLi9Eb2N1bWVudC5qc1wifSwgdGVtcGxhdGVTb3VyY2U6ICd7XCJjb21waWxlclwiOls2LFwiPj0gMi4wLjAtYmV0YS4xXCJdLFwibWFpblwiOmZ1bmN0aW9uKGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcXG4gIHZhciBoZWxwZXIsIGZ1bmN0aW9uVHlwZT1cImZ1bmN0aW9uXCIsIGhlbHBlck1pc3Npbmc9aGVscGVycy5oZWxwZXJNaXNzaW5nLCBlc2NhcGVFeHByZXNzaW9uPXRoaXMuZXNjYXBlRXhwcmVzc2lvbjtcXG4gIHJldHVybiBcIjwhRE9DVFlQRSBodG1sPlxcXFxuPGh0bWwgbGFuZz1cXFxcXCJcIlxcbiAgICArIGVzY2FwZUV4cHJlc3Npb24oKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5sb2NhbGUgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmxvY2FsZSA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBoZWxwZXJNaXNzaW5nKSwodHlwZW9mIGhlbHBlciA9PT0gZnVuY3Rpb25UeXBlID8gaGVscGVyLmNhbGwoZGVwdGgwLCB7XCJuYW1lXCI6XCJsb2NhbGVcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcXG4gICAgKyBcIlxcXFxcIj5cXFxcbjxoZWFkIGNhdC1zdG9yZT1cXFxcXCJQYWdlc1xcXFxcIiBwcmVmaXg9XFxcXFwib2c6IGh0dHA6Ly9vZ3AubWUvbnMjIGZiOiBodHRwOi8vb2dwLm1lL25zL2ZiI1xcXFxcIj5cXFxcbjwvaGVhZD5cXFxcbjxib2R5PlxcXFxuICA8Y2F0LWhlYWRlciBpZD1cXFxcXCJkb2N1bWVudC1oZWFkZXJcXFxcXCI+PC9jYXQtaGVhZGVyPlxcXFxuICA8Y2F0LWhlbGxvLXdvcmxkIGlkPVxcXFxcInVuaXF1ZVxcXFxcIiBjYXQtc3RvcmU9XFxcXFwiTWFpblxcXFxcIj48L2NhdC1oZWxsby13b3JsZD5cXFxcbiAgPGNhdC1wYWdlcyBpZD1cXFxcXCJkb2N1bWVudC1wYWdlc1xcXFxcIiBjYXQtc3RvcmU9XFxcXFwiUGFnZXNcXFxcXCI+PC9jYXQtcGFnZXM+XFxcXG4gIDxjYXQtZm9vdGVyIGlkPVxcXFxcImRvY3VtZW50LWZvb3RlclxcXFxcIj48L2NhdC1mb290ZXI+XFxcXG4gIDxjYXQtYm90dG9tLXNjcmlwdHMgaWQ9XFxcXFwiZG9jdW1lbnQtYm90dG9tLXNjcmlwdHNcXFxcXCI+PC9jYXQtYm90dG9tLXNjcmlwdHM+XFxcXG48L2JvZHk+XFxcXG48L2h0bWw+XFxcXG5cIjtcXG59LFwidXNlRGF0YVwiOnRydWV9JywgZXJyb3JUZW1wbGF0ZVNvdXJjZTogbnVsbH0sXG57bmFtZTogJ2hlYWQnLCBjb25zdHJ1Y3RvcjogcmVxdWlyZSgnLi9jYXRiZXJyeV9jb21wb25lbnRzL2hlYWQvSGVhZC5qcycpLCBwcm9wZXJ0aWVzOiB7XCJuYW1lXCI6XCJoZWFkXCIsXCJ0ZW1wbGF0ZVwiOlwiLi9oZWFkLmhic1wiLFwibG9naWNcIjpcIi4vSGVhZC5qc1wifSwgdGVtcGxhdGVTb3VyY2U6ICd7XCIxXCI6ZnVuY3Rpb24oZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xcbiAgcmV0dXJuIFwiPCEtLSBNb2JpbGUgaGVhZCAtLT5cXFxcblwiO1xcbiAgfSxcImNvbXBpbGVyXCI6WzYsXCI+PSAyLjAuMC1iZXRhLjFcIl0sXCJtYWluXCI6ZnVuY3Rpb24oZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xcbiAgdmFyIHN0YWNrMSwgaGVscGVyLCBmdW5jdGlvblR5cGU9XCJmdW5jdGlvblwiLCBoZWxwZXJNaXNzaW5nPWhlbHBlcnMuaGVscGVyTWlzc2luZywgZXNjYXBlRXhwcmVzc2lvbj10aGlzLmVzY2FwZUV4cHJlc3Npb24sIGJ1ZmZlciA9IFwiPG1ldGEgY2hhcnNldD1cXFxcXCJVVEYtOFxcXFxcIj5cXFxcbjxtZXRhIGh0dHAtZXF1aXY9XFxcXFwiWC1VQS1Db21wYXRpYmxlXFxcXFwiIGNvbnRlbnQ9XFxcXFwiSUU9ZWRnZVxcXFxcIj5cXFxcbjxtZXRhIG5hbWU9XFxcXFwidmlld3BvcnRcXFxcXCIgY29udGVudD1cXFxcXCJ3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGU9MVxcXFxcIj5cXFxcbjx0aXRsZT5cIlxcbiAgICArIGVzY2FwZUV4cHJlc3Npb24oKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy50aXRsZSB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAudGl0bGUgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogaGVscGVyTWlzc2luZyksKHR5cGVvZiBoZWxwZXIgPT09IGZ1bmN0aW9uVHlwZSA/IGhlbHBlci5jYWxsKGRlcHRoMCwge1wibmFtZVwiOlwidGl0bGVcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcXG4gICAgKyBcIiA6OjogXCJcXG4gICAgKyBlc2NhcGVFeHByZXNzaW9uKCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMuc3VidGl0bGUgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLnN1YnRpdGxlIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGhlbHBlck1pc3NpbmcpLCh0eXBlb2YgaGVscGVyID09PSBmdW5jdGlvblR5cGUgPyBoZWxwZXIuY2FsbChkZXB0aDAsIHtcIm5hbWVcIjpcInN1YnRpdGxlXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXFxuICAgICsgXCI8L3RpdGxlPlxcXFxuPG1ldGEgbmFtZT1cXFxcXCJkZXNjcmlwdGlvblxcXFxcIiBjb250ZW50PVxcXFxcIlwiXFxuICAgICsgZXNjYXBlRXhwcmVzc2lvbigoKGhlbHBlcnMubDEwbiB8fCAoZGVwdGgwICYmIGRlcHRoMC5sMTBuKSB8fCBoZWxwZXJNaXNzaW5nKS5jYWxsKGRlcHRoMCwgXCJERVNDUklQVElPTlwiLCB7XCJuYW1lXCI6XCJsMTBuXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pKSlcXG4gICAgKyBcIlxcXFxcIj5cXFxcbjxtZXRhIG5hbWU9XFxcXFwia2V5d29yZHNcXFxcXCIgY29udGVudD1cXFxcXCJcIlxcbiAgICArIGVzY2FwZUV4cHJlc3Npb24oKChoZWxwZXJzLmwxMG4gfHwgKGRlcHRoMCAmJiBkZXB0aDAubDEwbikgfHwgaGVscGVyTWlzc2luZykuY2FsbChkZXB0aDAsIFwiS0VZV09SRFNcIiwge1wibmFtZVwiOlwibDEwblwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSkpXFxuICAgICsgXCJcXFxcXCI+XFxcXG48bGluayBocmVmPVxcXFxcIi9zdGF0aWMvY3NzL2xvYWRlci5jc3NcXFxcXCIgcmVsPVxcXFxcInN0eWxlc2hlZXRcXFxcXCI+XFxcXG5cXFxcbjwhLS0gQmVnaW4gVHdpdHRlciBzdW1tYXJ5IGNhcmQgLS0+XFxcXG48bWV0YSBuYW1lPVxcXFxcInR3aXR0ZXI6Y2FyZFxcXFxcIiBjb250ZW50PVxcXFxcInN1bW1hcnlcXFxcXCIgLz5cXFxcbjxtZXRhIG5hbWU9XFxcXFwidHdpdHRlcjpzaXRlXFxcXFwiIGNvbnRlbnQ9XFxcXFwiQGpib2tpZXZcXFxcXCIgLz5cXFxcbjxtZXRhIG5hbWU9XFxcXFwidHdpdHRlcjp0aXRsZVxcXFxcIiBjb250ZW50PVxcXFxcIlwiXFxuICAgICsgZXNjYXBlRXhwcmVzc2lvbigoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLnRpdGxlIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC50aXRsZSA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBoZWxwZXJNaXNzaW5nKSwodHlwZW9mIGhlbHBlciA9PT0gZnVuY3Rpb25UeXBlID8gaGVscGVyLmNhbGwoZGVwdGgwLCB7XCJuYW1lXCI6XCJ0aXRsZVwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxcbiAgICArIFwiXFxcXFwiIC8+XFxcXG48bWV0YSBuYW1lPVxcXFxcInR3aXR0ZXI6ZGVzY3JpcHRpb25cXFxcXCIgY29udGVudD1cXFxcXCJcIlxcbiAgICArIGVzY2FwZUV4cHJlc3Npb24oKChoZWxwZXJzLmwxMG4gfHwgKGRlcHRoMCAmJiBkZXB0aDAubDEwbikgfHwgaGVscGVyTWlzc2luZykuY2FsbChkZXB0aDAsIFwiREVTQ1JJUFRJT05cIiwge1wibmFtZVwiOlwibDEwblwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSkpXFxuICAgICsgXCJcXFxcXCIgLz5cXFxcbjxtZXRhIG5hbWU9XFxcXFwidHdpdHRlcjppbWFnZVxcXFxcIiBjb250ZW50PVxcXFxcIlwiXFxuICAgICsgZXNjYXBlRXhwcmVzc2lvbigoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLnNvY2lhbExvZ28gfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLnNvY2lhbExvZ28gOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogaGVscGVyTWlzc2luZyksKHR5cGVvZiBoZWxwZXIgPT09IGZ1bmN0aW9uVHlwZSA/IGhlbHBlci5jYWxsKGRlcHRoMCwge1wibmFtZVwiOlwic29jaWFsTG9nb1wiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxcbiAgICArIFwiXFxcXFwiIC8+XFxcXG48bWV0YSBuYW1lPVxcXFxcInR3aXR0ZXI6dXJsXFxcXFwiIGNvbnRlbnQ9XFxcXFwiXCJcXG4gICAgKyBlc2NhcGVFeHByZXNzaW9uKCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMubG9jYXRpb24gfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmxvY2F0aW9uIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGhlbHBlck1pc3NpbmcpLCh0eXBlb2YgaGVscGVyID09PSBmdW5jdGlvblR5cGUgPyBoZWxwZXIuY2FsbChkZXB0aDAsIHtcIm5hbWVcIjpcImxvY2F0aW9uXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXFxuICAgICsgXCJcXFxcXCIgLz5cXFxcbjwhLS0gRW5kIFR3aXR0ZXIgc3VtbWFyeSBjYXJkLS0+XFxcXG5cXFxcbjwhLS0gQmVnaW4gT3BlbiBHcmFwaCBtYXJrdXAgLS0+XFxcXG48bWV0YSBwcm9wZXJ0eT1cXFxcXCJvZzp0aXRsZVxcXFxcIiBjb250ZW50PVxcXFxcIlwiXFxuICAgICsgZXNjYXBlRXhwcmVzc2lvbigoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLnRpdGxlIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC50aXRsZSA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBoZWxwZXJNaXNzaW5nKSwodHlwZW9mIGhlbHBlciA9PT0gZnVuY3Rpb25UeXBlID8gaGVscGVyLmNhbGwoZGVwdGgwLCB7XCJuYW1lXCI6XCJ0aXRsZVwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxcbiAgICArIFwiXFxcXFwiIC8+XFxcXG48bWV0YSBwcm9wZXJ0eT1cXFxcXCJvZzpkZXNjcmlwdGlvblxcXFxcIiBjb250ZW50PVxcXFxcIlwiXFxuICAgICsgZXNjYXBlRXhwcmVzc2lvbigoKGhlbHBlcnMubDEwbiB8fCAoZGVwdGgwICYmIGRlcHRoMC5sMTBuKSB8fCBoZWxwZXJNaXNzaW5nKS5jYWxsKGRlcHRoMCwgXCJERVNDUklQVElPTlwiLCB7XCJuYW1lXCI6XCJsMTBuXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pKSlcXG4gICAgKyBcIlxcXFxcIiAvPlxcXFxuPG1ldGEgcHJvcGVydHk9XFxcXFwib2c6dHlwZVxcXFxcIiBjb250ZW50PVxcXFxcIndlYnNpdGVcXFxcXCIgLz5cXFxcbjxtZXRhIHByb3BlcnR5PVxcXFxcIm9nOnVybFxcXFxcIiBjb250ZW50PVxcXFxcIlwiXFxuICAgICsgZXNjYXBlRXhwcmVzc2lvbigoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLmxvY2F0aW9uIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5sb2NhdGlvbiA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBoZWxwZXJNaXNzaW5nKSwodHlwZW9mIGhlbHBlciA9PT0gZnVuY3Rpb25UeXBlID8gaGVscGVyLmNhbGwoZGVwdGgwLCB7XCJuYW1lXCI6XCJsb2NhdGlvblwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxcbiAgICArIFwiXFxcXFwiIC8+XFxcXG48bWV0YSBwcm9wZXJ0eT1cXFxcXCJvZzppbWFnZVxcXFxcIiBjb250ZW50PVxcXFxcIlwiXFxuICAgICsgZXNjYXBlRXhwcmVzc2lvbigoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLnNvY2lhbExvZ28gfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLnNvY2lhbExvZ28gOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogaGVscGVyTWlzc2luZyksKHR5cGVvZiBoZWxwZXIgPT09IGZ1bmN0aW9uVHlwZSA/IGhlbHBlci5jYWxsKGRlcHRoMCwge1wibmFtZVwiOlwic29jaWFsTG9nb1wiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxcbiAgICArIFwiXFxcXFwiIC8+XFxcXG48IS0tIEVuZCBPcGVuIEdyYXBoIG1hcmt1cCAtLT5cXFxcblwiO1xcbiAgc3RhY2sxID0gaGVscGVyc1tcXCdpZlxcJ10uY2FsbChkZXB0aDAsIChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5pc01vYmlsZSA6IGRlcHRoMCksIHtcIm5hbWVcIjpcImlmXCIsXCJoYXNoXCI6e30sXCJmblwiOnRoaXMucHJvZ3JhbSgxLCBkYXRhKSxcImludmVyc2VcIjp0aGlzLm5vb3AsXCJkYXRhXCI6ZGF0YX0pO1xcbiAgaWYgKHN0YWNrMSAhPSBudWxsKSB7IGJ1ZmZlciArPSBzdGFjazE7IH1cXG4gIHJldHVybiBidWZmZXIgKyBcIjxzY3JpcHQgc3JjPVxcXFxcIi9idW5kbGUuanNcXFxcXCI+PC9zY3JpcHQ+XFxcXG5cXFxcbjxsaW5rIHJlbD1cXFxcXCJzaG9ydGN1dCBpY29uXFxcXFwiIGhyZWY9XFxcXFwiL2Zhdmljb24uaWNvXFxcXFwiPlxcXFxuXFxcXG5cXFxcblwiO1xcbn0sXCJ1c2VEYXRhXCI6dHJ1ZX0nLCBlcnJvclRlbXBsYXRlU291cmNlOiBudWxsfSxcbntuYW1lOiAnaGVsbG8td29ybGQnLCBjb25zdHJ1Y3RvcjogcmVxdWlyZSgnLi9jYXRiZXJyeV9jb21wb25lbnRzL2hlbGxvLXdvcmxkL0hlbGxvV29ybGQuanMnKSwgcHJvcGVydGllczoge1wibmFtZVwiOlwiaGVsbG8td29ybGRcIixcInRlbXBsYXRlXCI6XCIuL2hlbGxvLmhic1wiLFwiZXJyb3JUZW1wbGF0ZVwiOlwiLi9lcnJvci5oYnNcIixcImxvZ2ljXCI6XCIuL0hlbGxvV29ybGQuanNcIn0sIHRlbXBsYXRlU291cmNlOiAne1wiY29tcGlsZXJcIjpbNixcIj49IDIuMC4wLWJldGEuMVwiXSxcIm1haW5cIjpmdW5jdGlvbihkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XFxuICB2YXIgaGVscGVyLCBmdW5jdGlvblR5cGU9XCJmdW5jdGlvblwiLCBoZWxwZXJNaXNzaW5nPWhlbHBlcnMuaGVscGVyTWlzc2luZywgZXNjYXBlRXhwcmVzc2lvbj10aGlzLmVzY2FwZUV4cHJlc3Npb247XFxuICByZXR1cm4gXCI8aDE+SGVsbG8sIFwiXFxuICAgICsgZXNjYXBlRXhwcmVzc2lvbigoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLndobyB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAud2hvIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGhlbHBlck1pc3NpbmcpLCh0eXBlb2YgaGVscGVyID09PSBmdW5jdGlvblR5cGUgPyBoZWxwZXIuY2FsbChkZXB0aDAsIHtcIm5hbWVcIjpcIndob1wiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxcbiAgICArIFwiITwvaDE+XFxcXG5cIjtcXG59LFwidXNlRGF0YVwiOnRydWV9JywgZXJyb3JUZW1wbGF0ZVNvdXJjZTogJ3tcImNvbXBpbGVyXCI6WzYsXCI+PSAyLjAuMC1iZXRhLjFcIl0sXCJtYWluXCI6ZnVuY3Rpb24oZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xcbiAgcmV0dXJuIFwiXFxcXG5cIjtcXG4gIH0sXCJ1c2VEYXRhXCI6dHJ1ZX0nfVxuXTtcblxudmFyIHV0aWwgPSByZXF1aXJlKCd1dGlsJyksXG5cdHJvdXRlRGVmaW5pdGlvbnMgPSByZXF1aXJlKCcuL3JvdXRlcy5qcycpIHx8IFtdLFxuXHRtb2R1bGVIZWxwZXIgPSByZXF1aXJlKCcuL25vZGVfbW9kdWxlcy9jYXRiZXJyeS9saWIvaGVscGVycy9tb2R1bGVIZWxwZXIuanMnKSxcblx0Q2F0YmVycnkgPSByZXF1aXJlKCcuL25vZGVfbW9kdWxlcy9jYXRiZXJyeS9icm93c2VyL0NhdGJlcnJ5LmpzJyksXG5cdExvZ2dlciA9IHJlcXVpcmUoJy4vbm9kZV9tb2R1bGVzL2NhdGJlcnJ5L2Jyb3dzZXIvTG9nZ2VyLmpzJyksXG5cdEJvb3RzdHJhcHBlckJhc2UgPVxuXHRcdHJlcXVpcmUoJy4vbm9kZV9tb2R1bGVzL2NhdGJlcnJ5L2xpYi9iYXNlL0Jvb3RzdHJhcHBlckJhc2UuanMnKSxcblx0U3RvcmVEaXNwYXRjaGVyID0gcmVxdWlyZSgnLi9ub2RlX21vZHVsZXMvY2F0YmVycnkvbGliL1N0b3JlRGlzcGF0Y2hlcicpLFxuXHRNb2R1bGVBcGlQcm92aWRlciA9XG5cdFx0cmVxdWlyZSgnLi9ub2RlX21vZHVsZXMvY2F0YmVycnkvYnJvd3Nlci9wcm92aWRlcnMvTW9kdWxlQXBpUHJvdmlkZXInKSxcblx0Q29va2llV3JhcHBlciA9IHJlcXVpcmUoJy4vbm9kZV9tb2R1bGVzL2NhdGJlcnJ5L2Jyb3dzZXIvQ29va2llV3JhcHBlcicpO1xuXG52YXIgSU5GT19ET0NVTUVOVF9VUERBVEVEID0gJ0RvY3VtZW50IHVwZGF0ZWQgKCVkIHN0b3JlKHMpIGNoYW5nZWQpJyxcblx0SU5GT19DT01QT05FTlRfQk9VTkQgPSAnQ29tcG9uZW50IFwiJXNcIiBpcyBib3VuZCcsXG5cdElORk9fQ09NUE9ORU5UX1VOQk9VTkQgPSAnQ29tcG9uZW50IFwiJXNcIiBpcyB1bmJvdW5kJztcblxudXRpbC5pbmhlcml0cyhCb290c3RyYXBwZXIsIEJvb3RzdHJhcHBlckJhc2UpO1xuXG4vKipcbiAqIENyZWF0ZXMgbmV3IGluc3RhbmNlIG9mIHRoZSBicm93c2VyIENhdGJlcnJ5J3MgYm9vdHN0cmFwcGVyLlxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBCb290c3RyYXBwZXJCYXNlXG4gKi9cbmZ1bmN0aW9uIEJvb3RzdHJhcHBlcigpIHtcblx0Qm9vdHN0cmFwcGVyQmFzZS5jYWxsKHRoaXMsIENhdGJlcnJ5KTtcbn1cblxuLyoqXG4gKiBDb25maWd1cmVzIENhdGJlcnJ5J3Mgc2VydmljZSBsb2NhdG9yLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZ09iamVjdCBBcHBsaWNhdGlvbiBjb25maWcgb2JqZWN0LlxuICogQHBhcmFtIHtTZXJ2aWNlTG9jYXRvcn0gbG9jYXRvciBTZXJ2aWNlIGxvY2F0b3IgdG8gY29uZmlndXJlLlxuICovXG5Cb290c3RyYXBwZXIucHJvdG90eXBlLmNvbmZpZ3VyZSA9IGZ1bmN0aW9uIChjb25maWdPYmplY3QsIGxvY2F0b3IpIHtcblx0Qm9vdHN0cmFwcGVyQmFzZS5wcm90b3R5cGUuY29uZmlndXJlLmNhbGwodGhpcywgY29uZmlnT2JqZWN0LCBsb2NhdG9yKTtcblxuXHQvLyBpZiBicm93c2VyIHN0aWxsIGRvZXMgbm90IGhhdmUgcHJvbWlzZXMgdGhlbiBhZGQgaXQuXG5cdGlmICghKCdQcm9taXNlJyBpbiB3aW5kb3cpKSB7XG5cdFx0d2luZG93LlByb21pc2UgPSBsb2NhdG9yLnJlc29sdmUoJ3Byb21pc2UnKTtcblx0fVxuXG5cdGxvY2F0b3IucmVnaXN0ZXIoJ3N0b3JlRGlzcGF0Y2hlcicsIFN0b3JlRGlzcGF0Y2hlciwgY29uZmlnT2JqZWN0LCB0cnVlKTtcblx0bG9jYXRvci5yZWdpc3Rlcihcblx0XHQnbW9kdWxlQXBpUHJvdmlkZXInLCBNb2R1bGVBcGlQcm92aWRlciwgY29uZmlnT2JqZWN0LCB0cnVlXG5cdCk7XG5cdGxvY2F0b3IucmVnaXN0ZXIoJ2Nvb2tpZVdyYXBwZXInLCBDb29raWVXcmFwcGVyLCBjb25maWdPYmplY3QsIHRydWUpO1xuXG5cdGxvY2F0b3IucmVnaXN0ZXJJbnN0YW5jZSgnd2luZG93Jywgd2luZG93KTtcblxuXHR2YXIgbG9nZ2VyQ29uZmlnID0gY29uZmlnT2JqZWN0LmxvZ2dlciB8fCB7fSxcblx0XHRsb2dnZXIgPSBuZXcgTG9nZ2VyKGxvZ2dlckNvbmZpZy5sZXZlbHMpO1xuXHRsb2NhdG9yLnJlZ2lzdGVySW5zdGFuY2UoJ2xvZ2dlcicsIGxvZ2dlcik7XG5cdHdpbmRvdy5vbmVycm9yID0gZnVuY3Rpb24gZXJyb3JIYW5kbGVyKG1zZywgdXJpLCBsaW5lKSB7XG5cdFx0bG9nZ2VyLmZhdGFsKHVyaSArICc6JyArIGxpbmUgKyAnICcgKyBtc2cpO1xuXHRcdHJldHVybiB0cnVlO1xuXHR9O1xuXHR2YXIgZXZlbnRCdXMgPSBsb2NhdG9yLnJlc29sdmUoJ2V2ZW50QnVzJyk7XG5cdHRoaXMuX3dyYXBFdmVudHNXaXRoTG9nZ2VyKGV2ZW50QnVzLCBsb2dnZXIpO1xuXG5cdHJvdXRlRGVmaW5pdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAocm91dGVEZWZpbml0aW9uKSB7XG5cdFx0bG9jYXRvci5yZWdpc3Rlckluc3RhbmNlKCdyb3V0ZURlZmluaXRpb24nLCByb3V0ZURlZmluaXRpb24pO1xuXHR9KTtcblxuXHRzdG9yZXMuZm9yRWFjaChmdW5jdGlvbiAoc3RvcmUpIHtcblx0XHRsb2NhdG9yLnJlZ2lzdGVySW5zdGFuY2UoJ3N0b3JlJywgc3RvcmUpO1xuXHR9KTtcblxuXHRjb21wb25lbnRzLmZvckVhY2goZnVuY3Rpb24gKGNvbXBvbmVudCkge1xuXHRcdGxvY2F0b3IucmVnaXN0ZXJJbnN0YW5jZSgnY29tcG9uZW50JywgY29tcG9uZW50KTtcblx0fSk7XG59O1xuXG4vKipcbiAqIFdyYXBzIGV2ZW50IGJ1cyB3aXRoIGxvZyBtZXNzYWdlcy5cbiAqIEBwYXJhbSB7RXZlbnRFbWl0dGVyfSBldmVudEJ1cyBFdmVudCBlbWl0dGVyIHRoYXQgaW1wbGVtZW50cyBldmVudCBidXMuXG4gKiBAcGFyYW0ge0xvZ2dlcn0gbG9nZ2VyIExvZ2dlciB0byB3cml0ZSBtZXNzYWdlcy5cbiAqIEBwcm90ZWN0ZWRcbiAqL1xuQm9vdHN0cmFwcGVyLnByb3RvdHlwZS5fd3JhcEV2ZW50c1dpdGhMb2dnZXIgPSBmdW5jdGlvbiAoZXZlbnRCdXMsIGxvZ2dlcikge1xuXHRCb290c3RyYXBwZXJCYXNlLnByb3RvdHlwZS5fd3JhcEV2ZW50c1dpdGhMb2dnZXJcblx0XHQuY2FsbCh0aGlzLCBldmVudEJ1cywgbG9nZ2VyKTtcblx0ZXZlbnRCdXNcblx0XHQub24oJ2RvY3VtZW50VXBkYXRlZCcsIGZ1bmN0aW9uIChhcmdzKSB7XG5cdFx0XHRsb2dnZXIuaW5mbyh1dGlsLmZvcm1hdChJTkZPX0RPQ1VNRU5UX1VQREFURUQsIGFyZ3MubGVuZ3RoKSk7XG5cdFx0fSlcblx0XHQub24oJ2NvbXBvbmVudEJvdW5kJywgZnVuY3Rpb24gKGFyZ3MpIHtcblx0XHRcdGxvZ2dlci5pbmZvKHV0aWwuZm9ybWF0KFxuXHRcdFx0XHRJTkZPX0NPTVBPTkVOVF9CT1VORCxcblx0XHRcdFx0YXJncy5lbGVtZW50LnRhZ05hbWUgKyAoYXJncy5pZCA/ICcjJyArIGFyZ3MuaWQgOiAnJylcblx0XHRcdCkpO1xuXHRcdH0pXG5cdFx0Lm9uKCdjb21wb25lbnRVbmJvdW5kJywgZnVuY3Rpb24gKGFyZ3MpIHtcblx0XHRcdGxvZ2dlci5pbmZvKHV0aWwuZm9ybWF0KFxuXHRcdFx0XHRJTkZPX0NPTVBPTkVOVF9VTkJPVU5ELFxuXHRcdFx0XHRhcmdzLmVsZW1lbnQudGFnTmFtZSArIChhcmdzLmlkID8gJyMnICsgYXJncy5pZCA6ICcnKVxuXHRcdFx0KSk7XG5cdFx0fSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBCb290c3RyYXBwZXIoKTsiXX0=
