/*
 * catberry-app: 0.0.2
 * Build Date: Thu May 07 2015 19:39:45 GMT+0300 (EEST)
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


},{"./config/environment.json":10,"catberry":29,"catberry-handlebars":15,"catberry-l10n":19,"catberry-l10n-handlebars-helper":16}],2:[function(require,module,exports){
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

},{"../../lib/ComponentBase":11,"util":49}],3:[function(require,module,exports){
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

module.exports = Footer;

var util = require('util'),
	ComponentBase = require('../../lib/ComponentBase');
util.inherits(Footer, ComponentBase);

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "footer" component.
 * @extends ComponentBase
 * @constructor
 */
function Footer() {
	ComponentBase.call(this);
}

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
Footer.prototype.render = function () {
	var l10n = this.$context.locator.resolve('localizationProvider'),
		context = this.localizeContext();
	context.copyrightText = util.format(
		l10n.get(context.locale, 'COPYRIGHTS'),
		(new Date()).getFullYear()
	);
	return context;
};
},{"../../lib/ComponentBase":11,"util":49}],4:[function(require,module,exports){
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

module.exports = Ga;

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "ga" component.
 * @param {Object} $config Current application config.
 * @constructor
 */
function Ga($config) {
	this._config = $config.googleAnalytics || {};
	if (this.$context.isBrowser) {
		this._window = this.$context.locator.resolve('window');
	}
}

/**
 * Google Analytics config.
 * @type {Object}
 * @private
 */
Ga.prototype._config = null;

/**
 * Object "window".
 * @type {Object}
 * @private
 */
Ga.prototype._window = null;

/**
 * Determines if analytics is initialized.
 * @type {boolean}
 * @private
 */
Ga.prototype._isInitialized = false;

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
Ga.prototype.bind = function () {
	if (!this._config.id || typeof(this._window.ga) !== 'function') {
		return;
	}
	if (this._isInitialized) {
		return;
	}
	this._isInitialized = true;
	this._window = this.$context.locator.resolve('window');
	this._window.ga('create', this._config.id || null, 'auto');
	this._window.ga('send', 'pageview', getLocation(this.$context));
	this.trackPages();
	this.trackErrors();
};

/**
 * Tracks pages.
 */
Ga.prototype.trackPages = function () {
	if (typeof(this._window.ga) !== 'function') {
		return;
	}

	var self = this;
	// track pages
	this.$context.on('componentRendered', function (event) {
		if (event.name !== 'head') {
			return;
		}
		self._window.ga('send', 'pageview', getLocation(event.context));
	});
};

/**
 * Tracks errors.
 */
Ga.prototype.trackErrors = function () {
	var self = this;
	// track errors
	this.$context.on('error', function (error) {
		self._window.ga('send', 'event', 'error', error ? error.stack : '');
	});
};

/**
 * Gets location for analytics.
 * @param {Object} context Component context.
 * @returns {string} URL.
 */
function getLocation(context) {
	var location = context.location.clone();
	location.scheme = null;
	location.authority = null;

	return location.toString();
}
},{}],5:[function(require,module,exports){
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
      // TODO: неработает Pages
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

},{"../../lib/ComponentBase":11,"util":49}],6:[function(require,module,exports){
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

module.exports = Header;

var util = require('util'),
	ComponentBase = require('../../lib/ComponentBase');

util.inherits(Header, ComponentBase);

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "header" component.
 * @extends ComponentBase
 * @constructor
 */
function Header() {
	ComponentBase.call(this);
}
},{"../../lib/ComponentBase":11,"util":49}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
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
},{"./helpers/l10nHelper":12}],12:[function(require,module,exports){
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
},{}],13:[function(require,module,exports){
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
},{}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
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
},{"./lib/TemplateProvider":13,"./lib/vendors/handlebars":14}],16:[function(require,module,exports){
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
},{"./lib/LocalizationHelper":17}],17:[function(require,module,exports){
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
},{}],18:[function(require,module,exports){
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
},{}],19:[function(require,module,exports){
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
},{"./lib/LocalizationLoader":18,"./lib/LocalizationProvider":20}],20:[function(require,module,exports){
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
},{"util":49}],21:[function(require,module,exports){
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
},{"../lib/base/CatberryBase":34,"util":49}],22:[function(require,module,exports){
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
},{"../lib/base/CookieWrapperBase":35,"util":49}],23:[function(require,module,exports){
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
},{"../lib/base/DocumentRendererBase":36,"../lib/helpers/errorHelper":39,"../lib/helpers/moduleHelper":40,"util":49}],24:[function(require,module,exports){
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
},{}],25:[function(require,module,exports){
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
},{"catberry-uri":55,"util":49}],26:[function(require,module,exports){
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
},{"../../lib/base/LoaderBase":37,"../../lib/helpers/moduleHelper":40,"util":49}],27:[function(require,module,exports){
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
},{"../../lib/base/LoaderBase":37,"../../lib/helpers/moduleHelper":40,"util":49}],28:[function(require,module,exports){
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
},{"../../lib/base/ModuleApiProviderBase":38,"../../lib/helpers/moduleHelper":40,"../../lib/helpers/propertyHelper":41,"util":49}],29:[function(require,module,exports){
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

},{"./lib/Bootstrapper":72}],30:[function(require,module,exports){
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
},{"./helpers/propertyHelper":41,"catberry-uri":55}],31:[function(require,module,exports){
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
},{"events":45}],32:[function(require,module,exports){
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
},{"./SerialWrapper":31,"./helpers/moduleHelper":40,"util":49}],33:[function(require,module,exports){
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
},{"../ContextFactory":30,"../DocumentRenderer":23,"../RequestRouter":25,"../base/ModuleApiProviderBase":38,"../helpers/moduleHelper":40,"../loaders/ComponentLoader":26,"../loaders/StoreLoader":27,"../providers/StateProvider":43,"catberry-uhr":53,"events":45,"promise":61,"util":49}],34:[function(require,module,exports){
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
},{"catberry-locator":51}],35:[function(require,module,exports){
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
},{"util":49}],36:[function(require,module,exports){
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
},{}],37:[function(require,module,exports){
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
},{"../helpers/moduleHelper":40}],38:[function(require,module,exports){
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
},{"util":49}],40:[function(require,module,exports){
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
},{}],41:[function(require,module,exports){
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
},{}],42:[function(require,module,exports){
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
},{"catberry-uri":55,"util":49}],43:[function(require,module,exports){
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
},{"./../helpers/routeHelper":42,"catberry-uri":55}],44:[function(require,module,exports){
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
},{"events":45}],45:[function(require,module,exports){
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

},{}],46:[function(require,module,exports){
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

},{}],47:[function(require,module,exports){
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

},{}],48:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],49:[function(require,module,exports){
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

},{"./support/isBuffer":48,"_process":47,"inherits":46}],50:[function(require,module,exports){
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
},{}],51:[function(require,module,exports){
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
},{"./ConstructorTokenizer":50,"util":49}],52:[function(require,module,exports){
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
},{"../lib/UHRBase":54,"catberry-uri":55,"promise":61,"util":49}],53:[function(require,module,exports){
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
},{"./lib/UHR":52}],54:[function(require,module,exports){
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
},{"catberry-uri":55}],55:[function(require,module,exports){
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
},{"./lib/Authority":56,"./lib/Query":57,"./lib/URI":58,"./lib/UserInfo":59}],56:[function(require,module,exports){
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
},{"./UserInfo":59,"./percentEncodingHelper":60}],57:[function(require,module,exports){
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
},{"./percentEncodingHelper":60}],58:[function(require,module,exports){
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
},{"./Authority":56,"./Query":57,"./percentEncodingHelper":60}],59:[function(require,module,exports){
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
},{"./percentEncodingHelper":60}],60:[function(require,module,exports){
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
},{}],61:[function(require,module,exports){
'use strict';

module.exports = require('./lib')

},{"./lib":66}],62:[function(require,module,exports){
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

},{"asap/raw":70}],63:[function(require,module,exports){
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

},{"./core.js":62}],64:[function(require,module,exports){
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

},{"./core.js":62,"asap/raw":70}],65:[function(require,module,exports){
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

},{"./core.js":62}],66:[function(require,module,exports){
'use strict';

module.exports = require('./core.js');
require('./done.js');
require('./finally.js');
require('./es6-extensions.js');
require('./node-extensions.js');

},{"./core.js":62,"./done.js":63,"./es6-extensions.js":64,"./finally.js":65,"./node-extensions.js":67}],67:[function(require,module,exports){
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

},{"./core.js":62,"asap":68}],68:[function(require,module,exports){
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

},{"./raw":69}],69:[function(require,module,exports){
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

},{}],70:[function(require,module,exports){
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

},{"_process":47,"domain":44}],71:[function(require,module,exports){
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

},{}],72:[function(require,module,exports){
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

{name: 'document', constructor: require('./catberry_components/document/Document.js'), properties: {"name":"document","template":"./document.hbs","logic":"./Document.js"}, templateSource: '{"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {\n  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;\n  return "<!DOCTYPE html>\\n<html lang=\\""\n    + escapeExpression(((helper = (helper = helpers.locale || (depth0 != null ? depth0.locale : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"locale","hash":{},"data":data}) : helper)))\n    + "\\">\\n<head cat-store=\\"Pages\\" prefix=\\"og: http://ogp.me/ns# fb: http://ogp.me/ns/fb#\\">\\n</head>\\n<body>\\n  <cat-header id=\\"document-header\\"></cat-header>\\n  <cat-hello-world id=\\"unique\\" cat-store=\\"Main\\"></cat-hello-world>\\n  <cat-pages id=\\"document-pages\\" cat-store=\\"Pages\\"></cat-pages>\\n  <cat-footer id=\\"document-footer\\"></cat-footer>\\n  <cat-ga id=\\"analytics-tracking-code\\"></cat-ga>\\n</body>\\n</html>\\n";\n},"useData":true}', errorTemplateSource: null},
{name: 'footer', constructor: require('./catberry_components/footer/index.js'), properties: {"name":"footer","template":"./template.hbs","logic":"index.js"}, templateSource: '{"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {\n  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, buffer = "<footer>\\n\t<div class=\\"ui vertical inverted orange footer segment\\">\\n\t\t<div class=\\"ui stackable grid\\">\\n\t\t\t<div class=\\"one wide column\\"></div>\\n\t\t\t<div class=\\"three wide column fork-phrase\\">\\n\t\t\t\t<span>this website</span>\\n\t\t\t</div>\\n\t\t\t<div class=\\"seven wide column\\"></div>\\n\t\t\t<div class=\\"three wide right aligned column\\">\\n\t\t\t\t<div class=\\"borderless title item\\">\\n\t\t\t\t\t";\n  stack1 = ((helper = (helper = helpers.copyrightText || (depth0 != null ? depth0.copyrightText : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"copyrightText","hash":{},"data":data}) : helper));\n  if (stack1 != null) { buffer += stack1; }\n  return buffer + "\\n\t\t\t\t</div>\\n\t\t\t</div>\\n\t\t</div>\\n\t</div>\\n</footer>\\n";\n},"useData":true}', errorTemplateSource: null},
{name: 'ga', constructor: require('./catberry_components/ga/index.js'), properties: {"name":"ga","template":"./template.hbs","logic":"index.js"}, templateSource: '{"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {\n  return "<script>\\n\t(function(i,s,o,g,r,a,m){i[\'GoogleAnalyticsObject\']=r;i[r]=i[r]||function(){\\n\t\t(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),\\n\t\tm=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)\\n\t})(window,document,\'script\',\'//www.google-analytics.com/analytics.js\',\'ga\');\\n</script>";\n  },"useData":true}', errorTemplateSource: null},
{name: 'head', constructor: require('./catberry_components/head/Head.js'), properties: {"name":"head","template":"./head.hbs","logic":"./Head.js"}, templateSource: '{"1":function(depth0,helpers,partials,data) {\n  return "<!-- Mobile head -->\\n";\n  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {\n  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<meta charset=\\"UTF-8\\">\\n<meta http-equiv=\\"X-UA-Compatible\\" content=\\"IE=edge\\">\\n<meta name=\\"viewport\\" content=\\"width=device-width, initial-scale=1\\">\\n<title>"\n    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))\n    + " ::: "\n    + escapeExpression(((helper = (helper = helpers.subtitle || (depth0 != null ? depth0.subtitle : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"subtitle","hash":{},"data":data}) : helper)))\n    + "</title>\\n<meta name=\\"description\\" content=\\""\n    + escapeExpression(((helpers.l10n || (depth0 && depth0.l10n) || helperMissing).call(depth0, "DESCRIPTION", {"name":"l10n","hash":{},"data":data})))\n    + "\\">\\n<meta name=\\"keywords\\" content=\\""\n    + escapeExpression(((helpers.l10n || (depth0 && depth0.l10n) || helperMissing).call(depth0, "KEYWORDS", {"name":"l10n","hash":{},"data":data})))\n    + "\\">\\n<link href=\\"/static/css/loader.css\\" rel=\\"stylesheet\\">\\n\\n<!-- Begin Twitter summary card -->\\n<meta name=\\"twitter:card\\" content=\\"summary\\" />\\n<meta name=\\"twitter:site\\" content=\\"@jbokiev\\" />\\n<meta name=\\"twitter:title\\" content=\\""\n    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))\n    + "\\" />\\n<meta name=\\"twitter:description\\" content=\\""\n    + escapeExpression(((helpers.l10n || (depth0 && depth0.l10n) || helperMissing).call(depth0, "DESCRIPTION", {"name":"l10n","hash":{},"data":data})))\n    + "\\" />\\n<meta name=\\"twitter:image\\" content=\\""\n    + escapeExpression(((helper = (helper = helpers.socialLogo || (depth0 != null ? depth0.socialLogo : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"socialLogo","hash":{},"data":data}) : helper)))\n    + "\\" />\\n<meta name=\\"twitter:url\\" content=\\""\n    + escapeExpression(((helper = (helper = helpers.location || (depth0 != null ? depth0.location : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"location","hash":{},"data":data}) : helper)))\n    + "\\" />\\n<!-- End Twitter summary card-->\\n\\n<!-- Begin Open Graph markup -->\\n<meta property=\\"og:title\\" content=\\""\n    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))\n    + "\\" />\\n<meta property=\\"og:description\\" content=\\""\n    + escapeExpression(((helpers.l10n || (depth0 && depth0.l10n) || helperMissing).call(depth0, "DESCRIPTION", {"name":"l10n","hash":{},"data":data})))\n    + "\\" />\\n<meta property=\\"og:type\\" content=\\"website\\" />\\n<meta property=\\"og:url\\" content=\\""\n    + escapeExpression(((helper = (helper = helpers.location || (depth0 != null ? depth0.location : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"location","hash":{},"data":data}) : helper)))\n    + "\\" />\\n<meta property=\\"og:image\\" content=\\""\n    + escapeExpression(((helper = (helper = helpers.socialLogo || (depth0 != null ? depth0.socialLogo : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"socialLogo","hash":{},"data":data}) : helper)))\n    + "\\" />\\n\\n<link rel=\\"stylesheet\\" href=\\"static/semantic-ui/semantic.min.css\\">\\n";\n  stack1 = helpers[\'if\'].call(depth0, (depth0 != null ? depth0.isMobile : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});\n  if (stack1 != null) { buffer += stack1; }\n  return buffer + "<!-- End Open Graph markup -->\\n<script src=\\"/bundle.js\\"></script>\\n\\n<link rel=\\"shortcut icon\\" href=\\"/favicon.ico\\">\\n\\n\\n";\n},"useData":true}', errorTemplateSource: null},
{name: 'header', constructor: require('./catberry_components/header/index.js'), properties: {"name":"header","template":"./template.hbs","errorTemplate":"./error.hbs","logic":"index.js"}, templateSource: '{"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {\n  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;\n  return "<header>\\n\t<div class=\\"ui fixed inverted orange menu\\">\\n\t\t<div class=\\"borderless item\\"></div>\\n\t\t<div class=\\"borderless title item\\">\\n\t\t\t<a \thref=\\"/\\">"\n    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))\n    + "</a>\\n\t\t</div>\\n\t\t<div class=\\"right menu\\">\\n\t\t\t<cat-section-navigation id=\\"header-section-navigation\\" cat-store=\\"Pages\\">\\n\t\t\t</cat-section-navigation>\\n\t\t</div>\\n\t\t<div class=\\"borderless item\\"></div>\\n\t</div>\\n</header>\\n";\n},"useData":true}', errorTemplateSource: '{"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {\n  return "\\n";\n  },"useData":true}'},
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
},{"./catberry_components/document/Document.js":2,"./catberry_components/footer/index.js":3,"./catberry_components/ga/index.js":4,"./catberry_components/head/Head.js":5,"./catberry_components/header/index.js":6,"./catberry_components/hello-world/HelloWorld.js":7,"./catberry_stores/Main.js":8,"./catberry_stores/Pages.js":9,"./node_modules/catberry/browser/Catberry.js":21,"./node_modules/catberry/browser/CookieWrapper":22,"./node_modules/catberry/browser/Logger.js":24,"./node_modules/catberry/browser/providers/ModuleApiProvider":28,"./node_modules/catberry/lib/StoreDispatcher":32,"./node_modules/catberry/lib/base/BootstrapperBase.js":33,"./node_modules/catberry/lib/helpers/moduleHelper.js":40,"./routes.js":71,"util":49}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiYnJvd3Nlci5qcyIsImNhdGJlcnJ5X2NvbXBvbmVudHMvZG9jdW1lbnQvRG9jdW1lbnQuanMiLCJjYXRiZXJyeV9jb21wb25lbnRzL2Zvb3Rlci9pbmRleC5qcyIsImNhdGJlcnJ5X2NvbXBvbmVudHMvZ2EvaW5kZXguanMiLCJjYXRiZXJyeV9jb21wb25lbnRzL2hlYWQvSGVhZC5qcyIsImNhdGJlcnJ5X2NvbXBvbmVudHMvaGVhZGVyL2luZGV4LmpzIiwiY2F0YmVycnlfY29tcG9uZW50cy9oZWxsby13b3JsZC9IZWxsb1dvcmxkLmpzIiwiY2F0YmVycnlfc3RvcmVzL01haW4uanMiLCJjYXRiZXJyeV9zdG9yZXMvUGFnZXMuanMiLCJjb25maWcvZW52aXJvbm1lbnQuanNvbiIsImxpYi9Db21wb25lbnRCYXNlLmpzIiwibGliL2hlbHBlcnMvbDEwbkhlbHBlci5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS1oYW5kbGViYXJzL2Jyb3dzZXIvVGVtcGxhdGVQcm92aWRlci5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS1oYW5kbGViYXJzL2Jyb3dzZXIvdmVuZG9ycy9oYW5kbGViYXJzLmpzIiwibm9kZV9tb2R1bGVzL2NhdGJlcnJ5LWhhbmRsZWJhcnMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnktbDEwbi1oYW5kbGViYXJzLWhlbHBlci9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS1sMTBuLWhhbmRsZWJhcnMtaGVscGVyL2xpYi9Mb2NhbGl6YXRpb25IZWxwZXIuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnktbDEwbi9icm93c2VyL0xvY2FsaXphdGlvbkxvYWRlci5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS1sMTBuL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2NhdGJlcnJ5LWwxMG4vbGliL0xvY2FsaXphdGlvblByb3ZpZGVyLmpzIiwibm9kZV9tb2R1bGVzL2NhdGJlcnJ5L2Jyb3dzZXIvQ2F0YmVycnkuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvYnJvd3Nlci9Db29raWVXcmFwcGVyLmpzIiwibm9kZV9tb2R1bGVzL2NhdGJlcnJ5L2Jyb3dzZXIvRG9jdW1lbnRSZW5kZXJlci5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS9icm93c2VyL0xvZ2dlci5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS9icm93c2VyL1JlcXVlc3RSb3V0ZXIuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvYnJvd3Nlci9sb2FkZXJzL0NvbXBvbmVudExvYWRlci5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS9icm93c2VyL2xvYWRlcnMvU3RvcmVMb2FkZXIuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvYnJvd3Nlci9wcm92aWRlcnMvTW9kdWxlQXBpUHJvdmlkZXIuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvaW5kZXguanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvbGliL0NvbnRleHRGYWN0b3J5LmpzIiwibm9kZV9tb2R1bGVzL2NhdGJlcnJ5L2xpYi9TZXJpYWxXcmFwcGVyLmpzIiwibm9kZV9tb2R1bGVzL2NhdGJlcnJ5L2xpYi9TdG9yZURpc3BhdGNoZXIuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvbGliL2Jhc2UvQm9vdHN0cmFwcGVyQmFzZS5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS9saWIvYmFzZS9DYXRiZXJyeUJhc2UuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvbGliL2Jhc2UvQ29va2llV3JhcHBlckJhc2UuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvbGliL2Jhc2UvRG9jdW1lbnRSZW5kZXJlckJhc2UuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvbGliL2Jhc2UvTG9hZGVyQmFzZS5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS9saWIvYmFzZS9Nb2R1bGVBcGlQcm92aWRlckJhc2UuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvbGliL2hlbHBlcnMvZXJyb3JIZWxwZXIuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvbGliL2hlbHBlcnMvbW9kdWxlSGVscGVyLmpzIiwibm9kZV9tb2R1bGVzL2NhdGJlcnJ5L2xpYi9oZWxwZXJzL3Byb3BlcnR5SGVscGVyLmpzIiwibm9kZV9tb2R1bGVzL2NhdGJlcnJ5L2xpYi9oZWxwZXJzL3JvdXRlSGVscGVyLmpzIiwibm9kZV9tb2R1bGVzL2NhdGJlcnJ5L2xpYi9wcm92aWRlcnMvU3RhdGVQcm92aWRlci5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvZG9tYWluLWJyb3dzZXIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2V2ZW50cy9ldmVudHMuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2luaGVyaXRzL2luaGVyaXRzX2Jyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvdXRpbC9zdXBwb3J0L2lzQnVmZmVyQnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvdXRpbC91dGlsLmpzIiwibm9kZV9tb2R1bGVzL2NhdGJlcnJ5L25vZGVfbW9kdWxlcy9jYXRiZXJyeS1sb2NhdG9yL2xpYi9Db25zdHJ1Y3RvclRva2VuaXplci5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS9ub2RlX21vZHVsZXMvY2F0YmVycnktbG9jYXRvci9saWIvU2VydmljZUxvY2F0b3IuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvbm9kZV9tb2R1bGVzL2NhdGJlcnJ5LXVoci9icm93c2VyL1VIUi5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS9ub2RlX21vZHVsZXMvY2F0YmVycnktdWhyL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2NhdGJlcnJ5L25vZGVfbW9kdWxlcy9jYXRiZXJyeS11aHIvbGliL1VIUkJhc2UuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvbm9kZV9tb2R1bGVzL2NhdGJlcnJ5LXVyaS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS9ub2RlX21vZHVsZXMvY2F0YmVycnktdXJpL2xpYi9BdXRob3JpdHkuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvbm9kZV9tb2R1bGVzL2NhdGJlcnJ5LXVyaS9saWIvUXVlcnkuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvbm9kZV9tb2R1bGVzL2NhdGJlcnJ5LXVyaS9saWIvVVJJLmpzIiwibm9kZV9tb2R1bGVzL2NhdGJlcnJ5L25vZGVfbW9kdWxlcy9jYXRiZXJyeS11cmkvbGliL1VzZXJJbmZvLmpzIiwibm9kZV9tb2R1bGVzL2NhdGJlcnJ5L25vZGVfbW9kdWxlcy9jYXRiZXJyeS11cmkvbGliL3BlcmNlbnRFbmNvZGluZ0hlbHBlci5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS9ub2RlX21vZHVsZXMvcHJvbWlzZS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS9ub2RlX21vZHVsZXMvcHJvbWlzZS9saWIvY29yZS5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS9ub2RlX21vZHVsZXMvcHJvbWlzZS9saWIvZG9uZS5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS9ub2RlX21vZHVsZXMvcHJvbWlzZS9saWIvZXM2LWV4dGVuc2lvbnMuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvbm9kZV9tb2R1bGVzL3Byb21pc2UvbGliL2ZpbmFsbHkuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvbm9kZV9tb2R1bGVzL3Byb21pc2UvbGliL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2NhdGJlcnJ5L25vZGVfbW9kdWxlcy9wcm9taXNlL2xpYi9ub2RlLWV4dGVuc2lvbnMuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvbm9kZV9tb2R1bGVzL3Byb21pc2Uvbm9kZV9tb2R1bGVzL2FzYXAvYnJvd3Nlci1hc2FwLmpzIiwibm9kZV9tb2R1bGVzL2NhdGJlcnJ5L25vZGVfbW9kdWxlcy9wcm9taXNlL25vZGVfbW9kdWxlcy9hc2FwL2Jyb3dzZXItcmF3LmpzIiwibm9kZV9tb2R1bGVzL2NhdGJlcnJ5L25vZGVfbW9kdWxlcy9wcm9taXNlL25vZGVfbW9kdWxlcy9hc2FwL3Jhdy5qcyIsInJvdXRlcy5qcyIsIl9fQnJvd3NlckJ1bmRsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNySUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaktBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDalZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1WkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN1NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzFrQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdExBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3YkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyR0E7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDbEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDNU5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3JHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY2F0YmVycnkgPSByZXF1aXJlKCdjYXRiZXJyeScpLFxuXHQvLyB0aGlzIGNvbmZpZyB3aWxsIGJlIHJlcGxhY2VkIGJ5IGAuL2NvbmZpZy9icm93c2VyLmpzb25gIHdoZW4gYnVpbGRpbmdcblx0Ly8gYmVjYXVzZSBvZiBgYnJvd3NlcmAgZmllbGQgaW4gYHBhY2thZ2UuanNvbmBcblx0Y29uZmlnID0gcmVxdWlyZSgnLi9jb25maWcvZW52aXJvbm1lbnQuanNvbicpLFxuXHR0ZW1wbGF0ZUVuZ2luZSA9IHJlcXVpcmUoJ2NhdGJlcnJ5LWhhbmRsZWJhcnMnKSxcblx0bDEwbiA9IHJlcXVpcmUoJ2NhdGJlcnJ5LWwxMG4nKSxcblx0bG9jYWxpemF0aW9uSGVscGVyID0gcmVxdWlyZSgnY2F0YmVycnktbDEwbi1oYW5kbGViYXJzLWhlbHBlcicpLFxuXHRjYXQgPSBjYXRiZXJyeS5jcmVhdGUoY29uZmlnKTtcblxuLy8gcmVnaXN0ZXIgdGVtcGxhdGUgcHJvdmlkZXIgdG8gQ2F0YmVycnkgU2VydmljZSBMb2NhdG9yXG50ZW1wbGF0ZUVuZ2luZS5yZWdpc3RlcihjYXQubG9jYXRvcik7XG5sMTBuLnJlZ2lzdGVyKGNhdC5sb2NhdG9yKTtcbmxvY2FsaXphdGlvbkhlbHBlci5yZWdpc3RlcihjYXQubG9jYXRvcik7XG5jYXQuc3RhcnRXaGVuUmVhZHkoKTtcblxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERvY3VtZW50O1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWwnKSxcbiAgQ29tcG9uZW50QmFzZSA9IHJlcXVpcmUoJy4uLy4uL2xpYi9Db21wb25lbnRCYXNlJyk7XG5cbnV0aWwuaW5oZXJpdHMoRG9jdW1lbnQsIENvbXBvbmVudEJhc2UpO1xuXG4vKlxuICogVGhpcyBpcyBhIENhdGJlcnJ5IENhdC1jb21wb25lbnQgZmlsZS5cbiAqIE1vcmUgZGV0YWlscyBjYW4gYmUgZm91bmQgaGVyZVxuICogaHR0cHM6Ly9naXRodWIuY29tL2NhdGJlcnJ5L2NhdGJlcnJ5L2Jsb2IvbWFzdGVyL2RvY3MvaW5kZXgubWQjY2F0LWNvbXBvbmVudHNcbiAqL1xuXG4vKipcbiAqIENyZWF0ZXMgbmV3IGluc3RhbmNlIG9mIFwiZG9jdW1lbnRcIiBjb21wb25lbnQuXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gRG9jdW1lbnQoKSB7XG4gIENvbXBvbmVudEJhc2UuY2FsbCh0aGlzKTtcbn1cbiIsIi8qXG4gKiBjYXRiZXJyeS1ob21lcGFnZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNSBEZW5pcyBSZWNoa3Vub3YgYW5kIHByb2plY3QgY29udHJpYnV0b3JzLlxuICpcbiAqIGNhdGJlcnJ5LWhvbWVwYWdlJ3MgbGljZW5zZSBmb2xsb3dzOlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXG4gKiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvblxuICogZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLFxuICogaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSxcbiAqIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsXG4gKiBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuICogc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbiAqIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1NcbiAqIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICpcbiAqIFRoaXMgbGljZW5zZSBhcHBsaWVzIHRvIGFsbCBwYXJ0cyBvZiBjYXRiZXJyeS1ob21lcGFnZSB0aGF0IGFyZSBub3RcbiAqIGV4dGVybmFsbHkgbWFpbnRhaW5lZCBsaWJyYXJpZXMuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZvb3RlcjtcblxudmFyIHV0aWwgPSByZXF1aXJlKCd1dGlsJyksXG5cdENvbXBvbmVudEJhc2UgPSByZXF1aXJlKCcuLi8uLi9saWIvQ29tcG9uZW50QmFzZScpO1xudXRpbC5pbmhlcml0cyhGb290ZXIsIENvbXBvbmVudEJhc2UpO1xuXG4vKlxuICogVGhpcyBpcyBhIENhdGJlcnJ5IENhdC1jb21wb25lbnQgZmlsZS5cbiAqIE1vcmUgZGV0YWlscyBjYW4gYmUgZm91bmQgaGVyZVxuICogaHR0cHM6Ly9naXRodWIuY29tL2NhdGJlcnJ5L2NhdGJlcnJ5L2Jsb2IvbWFzdGVyL2RvY3MvaW5kZXgubWQjY2F0LWNvbXBvbmVudHNcbiAqL1xuXG4vKipcbiAqIENyZWF0ZXMgbmV3IGluc3RhbmNlIG9mIHRoZSBcImZvb3RlclwiIGNvbXBvbmVudC5cbiAqIEBleHRlbmRzIENvbXBvbmVudEJhc2VcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBGb290ZXIoKSB7XG5cdENvbXBvbmVudEJhc2UuY2FsbCh0aGlzKTtcbn1cblxuLyoqXG4gKiBHZXRzIGRhdGEgY29udGV4dCBmb3IgdGVtcGxhdGUgZW5naW5lLlxuICogVGhpcyBtZXRob2QgaXMgb3B0aW9uYWwuXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxPYmplY3Q+fE9iamVjdHxudWxsfHVuZGVmaW5lZH0gRGF0YSBjb250ZXh0XG4gKiBmb3IgdGVtcGxhdGUgZW5naW5lLlxuICovXG5Gb290ZXIucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcblx0dmFyIGwxMG4gPSB0aGlzLiRjb250ZXh0LmxvY2F0b3IucmVzb2x2ZSgnbG9jYWxpemF0aW9uUHJvdmlkZXInKSxcblx0XHRjb250ZXh0ID0gdGhpcy5sb2NhbGl6ZUNvbnRleHQoKTtcblx0Y29udGV4dC5jb3B5cmlnaHRUZXh0ID0gdXRpbC5mb3JtYXQoXG5cdFx0bDEwbi5nZXQoY29udGV4dC5sb2NhbGUsICdDT1BZUklHSFRTJyksXG5cdFx0KG5ldyBEYXRlKCkpLmdldEZ1bGxZZWFyKClcblx0KTtcblx0cmV0dXJuIGNvbnRleHQ7XG59OyIsIi8qXG4gKiBjYXRiZXJyeS1ob21lcGFnZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNSBEZW5pcyBSZWNoa3Vub3YgYW5kIHByb2plY3QgY29udHJpYnV0b3JzLlxuICpcbiAqIGNhdGJlcnJ5LWhvbWVwYWdlJ3MgbGljZW5zZSBmb2xsb3dzOlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXG4gKiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvblxuICogZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLFxuICogaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSxcbiAqIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsXG4gKiBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuICogc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbiAqIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1NcbiAqIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICpcbiAqIFRoaXMgbGljZW5zZSBhcHBsaWVzIHRvIGFsbCBwYXJ0cyBvZiBjYXRiZXJyeS1ob21lcGFnZSB0aGF0IGFyZSBub3RcbiAqIGV4dGVybmFsbHkgbWFpbnRhaW5lZCBsaWJyYXJpZXMuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEdhO1xuXG4vKlxuICogVGhpcyBpcyBhIENhdGJlcnJ5IENhdC1jb21wb25lbnQgZmlsZS5cbiAqIE1vcmUgZGV0YWlscyBjYW4gYmUgZm91bmQgaGVyZVxuICogaHR0cHM6Ly9naXRodWIuY29tL2NhdGJlcnJ5L2NhdGJlcnJ5L2Jsb2IvbWFzdGVyL2RvY3MvaW5kZXgubWQjY2F0LWNvbXBvbmVudHNcbiAqL1xuXG4vKipcbiAqIENyZWF0ZXMgbmV3IGluc3RhbmNlIG9mIHRoZSBcImdhXCIgY29tcG9uZW50LlxuICogQHBhcmFtIHtPYmplY3R9ICRjb25maWcgQ3VycmVudCBhcHBsaWNhdGlvbiBjb25maWcuXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gR2EoJGNvbmZpZykge1xuXHR0aGlzLl9jb25maWcgPSAkY29uZmlnLmdvb2dsZUFuYWx5dGljcyB8fCB7fTtcblx0aWYgKHRoaXMuJGNvbnRleHQuaXNCcm93c2VyKSB7XG5cdFx0dGhpcy5fd2luZG93ID0gdGhpcy4kY29udGV4dC5sb2NhdG9yLnJlc29sdmUoJ3dpbmRvdycpO1xuXHR9XG59XG5cbi8qKlxuICogR29vZ2xlIEFuYWx5dGljcyBjb25maWcuXG4gKiBAdHlwZSB7T2JqZWN0fVxuICogQHByaXZhdGVcbiAqL1xuR2EucHJvdG90eXBlLl9jb25maWcgPSBudWxsO1xuXG4vKipcbiAqIE9iamVjdCBcIndpbmRvd1wiLlxuICogQHR5cGUge09iamVjdH1cbiAqIEBwcml2YXRlXG4gKi9cbkdhLnByb3RvdHlwZS5fd2luZG93ID0gbnVsbDtcblxuLyoqXG4gKiBEZXRlcm1pbmVzIGlmIGFuYWx5dGljcyBpcyBpbml0aWFsaXplZC5cbiAqIEB0eXBlIHtib29sZWFufVxuICogQHByaXZhdGVcbiAqL1xuR2EucHJvdG90eXBlLl9pc0luaXRpYWxpemVkID0gZmFsc2U7XG5cbi8qKlxuICogUmV0dXJucyBldmVudCBiaW5kaW5nIHNldHRpbmdzIGZvciB0aGUgY29tcG9uZW50LlxuICogVGhpcyBtZXRob2QgaXMgb3B0aW9uYWwuXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxPYmplY3Q+fE9iamVjdHxudWxsfHVuZGVmaW5lZH0gQmluZGluZyBzZXR0aW5ncy5cbiAqL1xuR2EucHJvdG90eXBlLmJpbmQgPSBmdW5jdGlvbiAoKSB7XG5cdGlmICghdGhpcy5fY29uZmlnLmlkIHx8IHR5cGVvZih0aGlzLl93aW5kb3cuZ2EpICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdGlmICh0aGlzLl9pc0luaXRpYWxpemVkKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHRoaXMuX2lzSW5pdGlhbGl6ZWQgPSB0cnVlO1xuXHR0aGlzLl93aW5kb3cgPSB0aGlzLiRjb250ZXh0LmxvY2F0b3IucmVzb2x2ZSgnd2luZG93Jyk7XG5cdHRoaXMuX3dpbmRvdy5nYSgnY3JlYXRlJywgdGhpcy5fY29uZmlnLmlkIHx8IG51bGwsICdhdXRvJyk7XG5cdHRoaXMuX3dpbmRvdy5nYSgnc2VuZCcsICdwYWdldmlldycsIGdldExvY2F0aW9uKHRoaXMuJGNvbnRleHQpKTtcblx0dGhpcy50cmFja1BhZ2VzKCk7XG5cdHRoaXMudHJhY2tFcnJvcnMoKTtcbn07XG5cbi8qKlxuICogVHJhY2tzIHBhZ2VzLlxuICovXG5HYS5wcm90b3R5cGUudHJhY2tQYWdlcyA9IGZ1bmN0aW9uICgpIHtcblx0aWYgKHR5cGVvZih0aGlzLl93aW5kb3cuZ2EpICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0dmFyIHNlbGYgPSB0aGlzO1xuXHQvLyB0cmFjayBwYWdlc1xuXHR0aGlzLiRjb250ZXh0Lm9uKCdjb21wb25lbnRSZW5kZXJlZCcsIGZ1bmN0aW9uIChldmVudCkge1xuXHRcdGlmIChldmVudC5uYW1lICE9PSAnaGVhZCcpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0c2VsZi5fd2luZG93LmdhKCdzZW5kJywgJ3BhZ2V2aWV3JywgZ2V0TG9jYXRpb24oZXZlbnQuY29udGV4dCkpO1xuXHR9KTtcbn07XG5cbi8qKlxuICogVHJhY2tzIGVycm9ycy5cbiAqL1xuR2EucHJvdG90eXBlLnRyYWNrRXJyb3JzID0gZnVuY3Rpb24gKCkge1xuXHR2YXIgc2VsZiA9IHRoaXM7XG5cdC8vIHRyYWNrIGVycm9yc1xuXHR0aGlzLiRjb250ZXh0Lm9uKCdlcnJvcicsIGZ1bmN0aW9uIChlcnJvcikge1xuXHRcdHNlbGYuX3dpbmRvdy5nYSgnc2VuZCcsICdldmVudCcsICdlcnJvcicsIGVycm9yID8gZXJyb3Iuc3RhY2sgOiAnJyk7XG5cdH0pO1xufTtcblxuLyoqXG4gKiBHZXRzIGxvY2F0aW9uIGZvciBhbmFseXRpY3MuXG4gKiBAcGFyYW0ge09iamVjdH0gY29udGV4dCBDb21wb25lbnQgY29udGV4dC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFVSTC5cbiAqL1xuZnVuY3Rpb24gZ2V0TG9jYXRpb24oY29udGV4dCkge1xuXHR2YXIgbG9jYXRpb24gPSBjb250ZXh0LmxvY2F0aW9uLmNsb25lKCk7XG5cdGxvY2F0aW9uLnNjaGVtZSA9IG51bGw7XG5cdGxvY2F0aW9uLmF1dGhvcml0eSA9IG51bGw7XG5cblx0cmV0dXJuIGxvY2F0aW9uLnRvU3RyaW5nKCk7XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEhlYWQ7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgndXRpbCcpLFxuICBDb21wb25lbnRCYXNlID0gcmVxdWlyZSgnLi4vLi4vbGliL0NvbXBvbmVudEJhc2UnKTtcblxudXRpbC5pbmhlcml0cyhIZWFkLCBDb21wb25lbnRCYXNlKTtcblxuLypcbiAqIFRoaXMgaXMgYSBDYXRiZXJyeSBDYXQtY29tcG9uZW50IGZpbGUuXG4gKiBNb3JlIGRldGFpbHMgY2FuIGJlIGZvdW5kIGhlcmVcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9jYXRiZXJyeS9jYXRiZXJyeS9ibG9iL21hc3Rlci9kb2NzL2luZGV4Lm1kI2NhdC1jb21wb25lbnRzXG4gKi9cblxuLyoqXG4gKiBDcmVhdGVzIG5ldyBpbnN0YW5jZSBvZiBcImhlYWRcIiBjb21wb25lbnQuXG4gKiBAcGFyYW0ge09iamVjdH0gJGNvbmZpZyBDYXRiZXJyeSBhcHBsaWNhdGlvbiBjb25maWcuXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gSGVhZCgkY29uZmlnKSB7XG5cdHRoaXMuX2NvbmZpZyA9ICRjb25maWc7XG4gIENvbXBvbmVudEJhc2UuY2FsbCh0aGlzKTtcbn1cblxuLyoqXG4gKiBDdXJyZW50IGNvbmZpZy5cbiAqIEB0eXBlIHtPYmplY3R9XG4gKiBAcHJpdmF0ZVxuICovXG5IZWFkLnByb3RvdHlwZS5fY29uZmlnID0gbnVsbDtcblxuLyoqXG4gKiBHZXRzIGRhdGEgZm9yIHRlbXBsYXRlLlxuICogQHJldHVybnMge09iamVjdH0gRGF0YSBvYmplY3QuXG4gKi9cbkhlYWQucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHNlbGYgPSB0aGlzLFxuICAgIGxvY2F0aW9uID0gdGhpcy4kY29udGV4dC5sb2NhdGlvbi5jbG9uZSgpLFxuICAgIHNvY2lhbExvZ28gPSB0aGlzLiRjb250ZXh0LmxvY2F0aW9uLmNsb25lKCk7XG4gIGxvY2F0aW9uLnNjaGVtZSA9ICdodHRwJztcbiAgc29jaWFsTG9nby5zY2hlbWUgPSBsb2NhdGlvbi5zY2hlbWU7XG4gIHNvY2lhbExvZ28ucGF0aCA9ICcvYXNzZXRzL2hlYWQvaW1hZ2VzL3NvY2lhbC1sb2dvLnBuZyc7XG4gIHJldHVybiB0aGlzLiRjb250ZXh0LmdldFN0b3JlRGF0YSgpXG4gICAgLnRoZW4oZnVuY3Rpb24gKHBhZ2VzKSB7XG4gICAgICBjb25zb2xlLmxvZygnLS0tLS0tLS0tLS0tPiAnICsgcGFnZXMuY3VycmVudFBhZ2UpO1xuICAgICAgLy8gVE9ETzog0L3QtdGA0LDQsdC+0YLQsNC10YIgUGFnZXNcbiAgICAgIHJldHVybiBzZWxmLmxvY2FsaXplQ29udGV4dCh7XG4gICAgICAgIHNvY2lhbExvZ286IHNvY2lhbExvZ28sXG4gICAgICAgIGxvY2F0aW9uOiBsb2NhdGlvbixcbiAgICAgICAgcGFnZVRpdGxlS2V5OiBwYWdlcy5jdXJyZW50UGFnZSAhPT0gJ2hvbWUnID9cbiAgICAgICAgICAnUEFHRV9USVRMRV8nICsgcGFnZXMuY3VycmVudFBhZ2UgOiBudWxsXG4gICAgICAgIC8vIHBhZ2VUaXRsZUtleTogcGFnZXMuY3VycmVudFBhZ2UgIT09ICdob21lJyA/XG4gICAgICAgICAgLy8gJ1BBR0VfVElUTEVfJyArIHBhZ2VzLmN1cnJlbnRQYWdlLnRvVXBwZXJDYXNlKCkgOiBudWxsXG4gICAgICB9KTtcbiAgICB9KTtcbn07XG4iLCIvKlxuICogY2F0YmVycnktaG9tZXBhZ2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUgRGVuaXMgUmVjaGt1bm92IGFuZCBwcm9qZWN0IGNvbnRyaWJ1dG9ycy5cbiAqXG4gKiBjYXRiZXJyeS1ob21lcGFnZSdzIGxpY2Vuc2UgZm9sbG93czpcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvblxuICogb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb25cbiAqIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbixcbiAqIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsXG4gKiBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLFxuICogYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbiAqIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4gKiBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4gKiBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqXG4gKiBUaGlzIGxpY2Vuc2UgYXBwbGllcyB0byBhbGwgcGFydHMgb2YgY2F0YmVycnktaG9tZXBhZ2UgdGhhdCBhcmUgbm90XG4gKiBleHRlcm5hbGx5IG1haW50YWluZWQgbGlicmFyaWVzLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBIZWFkZXI7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgndXRpbCcpLFxuXHRDb21wb25lbnRCYXNlID0gcmVxdWlyZSgnLi4vLi4vbGliL0NvbXBvbmVudEJhc2UnKTtcblxudXRpbC5pbmhlcml0cyhIZWFkZXIsIENvbXBvbmVudEJhc2UpO1xuXG4vKlxuICogVGhpcyBpcyBhIENhdGJlcnJ5IENhdC1jb21wb25lbnQgZmlsZS5cbiAqIE1vcmUgZGV0YWlscyBjYW4gYmUgZm91bmQgaGVyZVxuICogaHR0cHM6Ly9naXRodWIuY29tL2NhdGJlcnJ5L2NhdGJlcnJ5L2Jsb2IvbWFzdGVyL2RvY3MvaW5kZXgubWQjY2F0LWNvbXBvbmVudHNcbiAqL1xuXG4vKipcbiAqIENyZWF0ZXMgbmV3IGluc3RhbmNlIG9mIHRoZSBcImhlYWRlclwiIGNvbXBvbmVudC5cbiAqIEBleHRlbmRzIENvbXBvbmVudEJhc2VcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBIZWFkZXIoKSB7XG5cdENvbXBvbmVudEJhc2UuY2FsbCh0aGlzKTtcbn0iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gSGVsbG9Xb3JsZDtcblxuLypcbiAqIFRoaXMgaXMgYSBDYXRiZXJyeSBDYXQtY29tcG9uZW50IGZpbGUuXG4gKiBNb3JlIGRldGFpbHMgY2FuIGJlIGZvdW5kIGhlcmVcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9jYXRiZXJyeS9jYXRiZXJyeS9ibG9iL21hc3Rlci9kb2NzL2luZGV4Lm1kI2NhdC1jb21wb25lbnRzXG4gKi9cblxuLyoqXG4gKiBDcmVhdGVzIG5ldyBpbnN0YW5jZSBvZiBcImhlbGxvLXdvcmxkXCIgY29tcG9uZW50LlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIEhlbGxvV29ybGQoKSB7XG5cbn1cblxuLyoqXG4gKiBHZXRzIGRhdGEgZm9yIHRlbXBsYXRlLlxuICogQHJldHVybnMge1Byb21pc2U8T2JqZWN0Pn0gUHJvbWlzZSBmb3IgZGF0YS5cbiAqL1xuSGVsbG9Xb3JsZC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuXHRyZXR1cm4gdGhpcy4kY29udGV4dC5nZXRTdG9yZURhdGEoKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gTWFpbjtcblxuLypcbiAqIFRoaXMgaXMgYSBDYXRiZXJyeSBTdG9yZSBmaWxlLlxuICogTW9yZSBkZXRhaWxzIGNhbiBiZSBmb3VuZCBoZXJlXG4gKiBodHRwczovL2dpdGh1Yi5jb20vY2F0YmVycnkvY2F0YmVycnkvYmxvYi9tYXN0ZXIvZG9jcy9pbmRleC5tZCNzdG9yZXNcbiAqL1xuXG4vKipcbiAqIENyZWF0ZXMgbmV3IGluc3RhbmNlIG9mIFwiTWFpblwiIHN0b3JlLlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIE1haW4oKSB7XG5cbn1cblxuLyoqXG4gKiBMb2FkcyBkYXRhIGZyb20gc29tZXdoZXJlLlxuICogQHJldHVybnMge09iamVjdH0gRGF0YSBvYmplY3QuXG4gKi9cbk1haW4ucHJvdG90eXBlLmxvYWQgPSBmdW5jdGlvbiAoKSB7XG5cdHJldHVybiB7d2hvOiAnV29ybGQnfTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gUGFnZXM7XG5cbi8qXG4gKiBUaGlzIGlzIGEgQ2F0YmVycnkgU3RvcmUgZmlsZS5cbiAqIE1vcmUgZGV0YWlscyBjYW4gYmUgZm91bmQgaGVyZVxuICogaHR0cHM6Ly9naXRodWIuY29tL2NhdGJlcnJ5L2NhdGJlcnJ5L2Jsb2IvbWFzdGVyL2RvY3MvaW5kZXgubWQjc3RvcmVzXG4gKi9cblxudmFyIEFMTE9XRURfUEFHRVMgPSB7XG5cdFx0aG9tZTogdHJ1ZSxcblx0XHRvdmVydmlldzogdHJ1ZSxcblx0XHRkb2N1bWVudGF0aW9uOiB0cnVlXG5cdH0sXG5cdERFRkFVTFRfUEFHRSA9ICdob21lJztcblxudmFyIFBBR0VTID0ge1xuXHRob21lOiAnSG9tZSBQYWdlJyxcblx0YWJvdXQ6ICdBYm91dCBDYXRiZXJyeSBGcmFtZXdvcmsnLFxuXHRjb21taXRzOiAnQ29tbWl0cyB0byBDYXRiZXJyeSBGcmFtZXdvcmsgcmVwb3NpdG9yeScsXG5cdHNlYXJjaDogJ1NlYXJjaCBpbiBDYXRiZXJyeVxcJ3MgY29kZSdcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBuZXcgaW5zdGFuY2Ugb2YgdGhlIFwiUGFnZXNcIiBzdG9yZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSAkY29uZmlnIEFwcGxpY2F0aW9uIGNvbmZpZy5cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBQYWdlcygkY29uZmlnKSB7XG5cdHRoaXMuX2NvbmZpZyA9ICRjb25maWc7XG59XG5cbi8qKlxuICogQ3VycmVudCBhcHBsaWNhdGlvbiBjb25maWcuXG4gKiBAdHlwZSB7T2JqZWN0fVxuICogQHByaXZhdGVcbiAqL1xuUGFnZXMucHJvdG90eXBlLl9jb25maWcgPSBudWxsO1xuXG4vKipcbiAqIEN1cnJlbnQgbGlmZXRpbWUgb2YgZGF0YSAoaW4gbWlsbGlzZWNvbmRzKSB0aGF0IGlzIHJldHVybmVkIGJ5IHRoaXMgc3RvcmUuXG4gKiBAdHlwZSB7bnVtYmVyfSBMaWZldGltZSBpbiBtaWxsaXNlY29uZHMuXG4gKi9cblBhZ2VzLnByb3RvdHlwZS4kbGlmZXRpbWUgPSA2MDAwMDtcbi8vIFBhZ2VzLnByb3RvdHlwZS4kbGlmZXRpbWUgPSAzNjAwMDAwO1xuXG4vKipcbiAqIExvYWRzIGRhdGEgZnJvbSByZW1vdGUgc291cmNlLlxuICogQHJldHVybnMge1Byb21pc2U8T2JqZWN0PnxPYmplY3R8bnVsbHx1bmRlZmluZWR9IExvYWRlZCBkYXRhLlxuICovXG5QYWdlcy5wcm90b3R5cGUubG9hZCA9IGZ1bmN0aW9uICgpIHtcblx0dmFyIGN1cnJlbnRQYWdlID0gdGhpcy4kY29udGV4dC5zdGF0ZS5wYWdlO1xuXHRpZiAoIWN1cnJlbnRQYWdlKSB7XG5cdFx0Y3VycmVudFBhZ2UgPSBERUZBVUxUX1BBR0U7XG5cdFx0Ly8gcmV0dXJuIHRoaXMuJGNvbnRleHQucmVkaXJlY3QoJy9hYm91dCcpO1xuXHR9XG5cdGN1cnJlbnRQYWdlID0gY3VycmVudFBhZ2UudG9Mb3dlckNhc2UoKTtcblx0aWYgKCFBTExPV0VEX1BBR0VTLmhhc093blByb3BlcnR5KGN1cnJlbnRQYWdlKSkge1xuXHRcdGN1cnJlbnRQYWdlID0gREVGQVVMVF9QQUdFO1xuXHR9XG5cdGlmICghUEFHRVMuaGFzT3duUHJvcGVydHkoY3VycmVudFBhZ2UpKSB7XG5cdFx0Y3VycmVudFBhZ2UgPSBERUZBVUxUX1BBR0U7XG5cdFx0Ly8gdGhyb3cgbmV3IEVycm9yKGN1cnJlbnRQYWdlICsgJyBwYWdlIG5vdCBmb3VuZCcpO1xuXHR9XG5cdHZhciByZXN1bHQgPSB7XG5cdFx0dGl0bGU6IHRoaXMuX2NvbmZpZy50aXRsZSxcblx0XHRzdWJ0aXRsZTogUEFHRVNbY3VycmVudFBhZ2VdLFxuXHRcdGN1cnJlbnQ6IGN1cnJlbnRQYWdlLFxuXHRcdGlzQWN0aXZlOiB7fVxuXHR9O1xuXHRPYmplY3Qua2V5cyhQQUdFUylcblx0XHQuZm9yRWFjaChmdW5jdGlvbiAocGFnZSkge1xuXHRcdFx0cmVzdWx0LmlzQWN0aXZlW3BhZ2VdID0gKGN1cnJlbnRQYWdlID09PSBwYWdlKTtcblx0XHR9KTtcblxuXHRyZXR1cm4gcmVzdWx0O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzPXtcblx0XCJ0aXRsZVwiOiBcIkNhdGJlcnJ5IFByb2plY3RcIixcbiAgXCJnaXRIdWJDbGllbnRcIjoge1xuICAgIFwiaG9zdFwiOiBcImh0dHBzOi8vYXBpLmdpdGh1Yi5jb21cIixcbiAgICBcImFjY2Vzc1Rva2VuXCI6IFwieW91ciBzZWNyZXQgdG9rZW4gaGVyZVwiXG4gIH0sXG4gIFwibDEwblwiOiB7XG4gICAgXCJkZWZhdWx0TG9jYWxlXCI6IFwicnVcIixcbiAgICBcImNvb2tpZVwiOiB7XG4gICAgICBcInBhdGhcIjogXCIvXCJcbiAgICB9XG4gIH0sXG4gIFwiZ29vZ2xlQW5hbHl0aWNzXCI6IHtcbiAgICBcImlkXCI6IFwiVUEtWFhYWFhYWFgtWFwiXG4gIH0sXG4gIFwic2VydmVyXCI6IHtcbiAgICBcInBvcnRcIjogMzAwMFxuICB9LFxuICBcImFzc2V0c1wiOiB7XG4gICAgXCJ3YXRjaEludGVydmFsXCI6IDBcbiAgfSxcbiAgXCJjb21wb25lbnRzR2xvYlwiOiBcImNhdGJlcnJ5X2NvbXBvbmVudHMvKiovY2F0LWNvbXBvbmVudC5qc29uXCIsXG4gIFwiaXNSZWxlYXNlXCI6IHRydWVcbn1cbiIsIi8qXG4gKiBjYXRiZXJyeS1ob21lcGFnZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNSBEZW5pcyBSZWNoa3Vub3YgYW5kIHByb2plY3QgY29udHJpYnV0b3JzLlxuICpcbiAqIGNhdGJlcnJ5LWhvbWVwYWdlJ3MgbGljZW5zZSBmb2xsb3dzOlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXG4gKiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvblxuICogZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLFxuICogaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSxcbiAqIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsXG4gKiBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuICogc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbiAqIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1NcbiAqIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICpcbiAqIFRoaXMgbGljZW5zZSBhcHBsaWVzIHRvIGFsbCBwYXJ0cyBvZiBjYXRiZXJyeS1ob21lcGFnZSB0aGF0IGFyZSBub3RcbiAqIGV4dGVybmFsbHkgbWFpbnRhaW5lZCBsaWJyYXJpZXMuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudEJhc2U7XG5cbnZhciBsMTBuSGVscGVyID0gcmVxdWlyZSgnLi9oZWxwZXJzL2wxMG5IZWxwZXInKTtcblxuLyoqXG4gKiBDcmVhdGVzIG5ldyBpbnN0YW5jZSBvZiBiYXNpYyBjb21wb25lbnQuXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gQ29tcG9uZW50QmFzZSgpIHtcblxufVxuXG4vKipcbiAqIEdldHMgZGF0YSBjb250ZXh0IGZvciB0ZW1wbGF0ZSBlbmdpbmUuXG4gKiBUaGlzIG1ldGhvZCBpcyBvcHRpb25hbC5cbiAqIEByZXR1cm5zIHtQcm9taXNlPE9iamVjdD58T2JqZWN0fG51bGx8dW5kZWZpbmVkfSBEYXRhIGNvbnRleHRcbiAqIGZvciB0ZW1wbGF0ZSBlbmdpbmUuXG4gKi9cbkNvbXBvbmVudEJhc2UucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuIHRoaXMubG9jYWxpemVDb250ZXh0KCk7XG59O1xuXG4vKipcbiAqIEFkZHMgbG9jYWxlIHRvIGFueSBkYXRhIG9iamVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0P30gZGF0YSBPcHRpb25hbCBkYXRhIG9iamVjdC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IERhdGEgb2JqZWN0IHdpdGggbG9jYWxlLlxuICovXG5Db21wb25lbnRCYXNlLnByb3RvdHlwZS5sb2NhbGl6ZUNvbnRleHQgPSBmdW5jdGlvbiAoZGF0YSkge1xuXHRkYXRhID0gZGF0YSB8fCB7fTtcbiAgZGF0YS5pc01vYmlsZSA9IGZhbHNlO1xuICBkYXRhLmlzQW5kcm9pZCA9IGZhbHNlO1xuICBkYXRhLmlzSXBob25lID0gZmFsc2U7XG5cdGRhdGEubG9jYWxlID0gbDEwbkhlbHBlci5nZXRDdXJyZW50TG9jYWxlKHRoaXMuJGNvbnRleHQpO1xuXHRyZXR1cm4gZGF0YTtcbn07XG5cbi8qKlxuICogQmluZHMgZXZlbnRzLlxuICovXG5Db21wb25lbnRCYXNlLnByb3RvdHlwZS5iaW5kID0gZnVuY3Rpb24gKCkge1xuXHR2YXIgbG9hZGVycyA9IHRoaXMuJGNvbnRleHQuZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdkaXYubG9hZGVyJyk7XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsb2FkZXJzLmxlbmd0aDsgaSsrKSB7XG5cdFx0bG9hZGVyc1tpXS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHR9XG59OyIsIi8qXG4gKiBjYXRiZXJyeS1ob21lcGFnZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNSBEZW5pcyBSZWNoa3Vub3YgYW5kIHByb2plY3QgY29udHJpYnV0b3JzLlxuICpcbiAqIGNhdGJlcnJ5LWhvbWVwYWdlJ3MgbGljZW5zZSBmb2xsb3dzOlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXG4gKiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvblxuICogZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLFxuICogaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSxcbiAqIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsXG4gKiBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuICogc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbiAqIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1NcbiAqIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICpcbiAqIFRoaXMgbGljZW5zZSBhcHBsaWVzIHRvIGFsbCBwYXJ0cyBvZiBjYXRiZXJyeS1ob21lcGFnZSB0aGF0IGFyZSBub3RcbiAqIGV4dGVybmFsbHkgbWFpbnRhaW5lZCBsaWJyYXJpZXMuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgbDEwbiA9IG51bGw7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXG5cdC8qKlxuXHQgKiBHZXRzIGxvY2FsaXphdGlvbiBwcm92aWRlci5cblx0ICogQHBhcmFtIHtPYmplY3R9IGNvbnRleHRcblx0ICogQHJldHVybnMge0xvY2FsaXphdGlvblByb3ZpZGVyfVxuXHQgKi9cblx0Z2V0TG9jYWxpemF0aW9uUHJvdmlkZXI6IGZ1bmN0aW9uIChjb250ZXh0KSB7XG5cdFx0bDEwbiA9IGwxMG4gfHwgY29udGV4dC5sb2NhdG9yLnJlc29sdmUoJ2xvY2FsaXphdGlvblByb3ZpZGVyJyk7XG5cdFx0cmV0dXJuIGwxMG47XG5cdH0sXG5cblx0LyoqXG5cdCAqIEdldHMgY3VycmVudCBsb2NhbGUuXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBjb250ZXh0XG5cdCAqIEByZXR1cm5zIHtzdHJpbmd9XG5cdCAqL1xuXHRnZXRDdXJyZW50TG9jYWxlOiBmdW5jdGlvbiAoY29udGV4dCkge1xuXHRcdHJldHVybiB0aGlzLmdldExvY2FsaXphdGlvblByb3ZpZGVyKGNvbnRleHQpXG5cdFx0XHQuZ2V0Q3VycmVudExvY2FsZShjb250ZXh0KTtcblx0fVxufTsiLCIvKlxuICogY2F0YmVycnktaGFuZGxlYmFyc1xuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNSBEZW5pcyBSZWNoa3Vub3YgYW5kIHByb2plY3QgY29udHJpYnV0b3JzLlxuICpcbiAqIGNhdGJlcnJ5LWhhbmRsZWJhcnMncyBsaWNlbnNlIGZvbGxvd3M6XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb25cbiAqIG9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uXG4gKiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sXG4gKiBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLFxuICogcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSxcbiAqIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4gKiBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuICogaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuICogT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKlxuICogVGhpcyBsaWNlbnNlIGFwcGxpZXMgdG8gYWxsIHBhcnRzIG9mIGNhdGJlcnJ5LWhhbmRsZWJhcnMgdGhhdCBhcmUgbm90IGV4dGVybmFsbHlcbiAqIG1haW50YWluZWQgbGlicmFyaWVzLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBUZW1wbGF0ZVByb3ZpZGVyO1xuXG4vKipcbiAqIENyZWF0ZXMgbmV3IGluc3RhbmNlIG9mIEhhbmRsZWJhcnMgdGVtcGxhdGUgcHJvdmlkZXIuXG4gKiBAcGFyYW0ge0hhbmRsZWJhcnN9ICRoYW5kbGViYXJzIEhhbmRsZWJhcnMgZmFjdG9yeS5cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBUZW1wbGF0ZVByb3ZpZGVyKCRoYW5kbGViYXJzKSB7XG5cdHRoaXMuX2hhbmRsZWJhcnMgPSAkaGFuZGxlYmFycztcblx0dGhpcy5fdGVtcGxhdGVzID0ge307XG59XG5cbi8qKlxuICogQ3VycmVudCBIYW5kbGViYXJzIGZhY3RvcnkuXG4gKiBAdHlwZSB7SGFuZGxlYmFyc31cbiAqIEBwcml2YXRlXG4gKi9cblRlbXBsYXRlUHJvdmlkZXIucHJvdG90eXBlLl9oYW5kbGViYXJzID0gbnVsbDtcblxuLyoqXG4gKiBDdXJyZW50IHNldCBvZiByZWdpc3RlcmVkIHRlbXBsYXRlcy5cbiAqIEB0eXBlIHtPYmplY3R9XG4gKiBAcHJpdmF0ZVxuICovXG5UZW1wbGF0ZVByb3ZpZGVyLnByb3RvdHlwZS5fdGVtcGxhdGVzID0gbnVsbDtcblxuLyoqXG4gKiBSZWdpc3RlcnMgY29tcGlsZWQgKHByZWNvbXBpbGVkKSBIYW5kbGViYXJzIHRlbXBsYXRlLlxuICogaHR0cDovL2hhbmRsZWJhcnNqcy5jb20vcmVmZXJlbmNlLmh0bWxcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIFRlbXBsYXRlIG5hbWUuXG4gKiBAcGFyYW0ge1N0cmluZ30gY29tcGlsZWQgQ29tcGlsZWQgdGVtcGxhdGUgc291cmNlLlxuICovXG5UZW1wbGF0ZVByb3ZpZGVyLnByb3RvdHlwZS5yZWdpc3RlckNvbXBpbGVkID0gZnVuY3Rpb24gKG5hbWUsIGNvbXBpbGVkKSB7XG5cdC8vIGpzaGludCBldmlsOnRydWVcblx0dmFyIHNwZWNzID0gbmV3IEZ1bmN0aW9uKCdyZXR1cm4gJyArIGNvbXBpbGVkICsgJzsnKTtcblx0dGhpcy5fdGVtcGxhdGVzW25hbWVdID0gdGhpcy5faGFuZGxlYmFycy50ZW1wbGF0ZShzcGVjcygpKTtcbn07XG5cbi8qKlxuICogUmVuZGVycyB0ZW1wbGF0ZSB3aXRoIHNwZWNpZmllZCBkYXRhLlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgTmFtZSBvZiB0ZW1wbGF0ZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIERhdGEgY29udGV4dCBmb3IgdGVtcGxhdGUuXG4gKiBAcmV0dXJucyB7Kn1cbiAqL1xuVGVtcGxhdGVQcm92aWRlci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKG5hbWUsIGRhdGEpIHtcblx0aWYgKCF0aGlzLl90ZW1wbGF0ZXMuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKCdObyBzdWNoIHRlbXBsYXRlJykpO1xuXHR9XG5cblx0dmFyIHByb21pc2U7XG5cdHRyeSB7XG5cdFx0cHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZSh0aGlzLl90ZW1wbGF0ZXNbbmFtZV0oZGF0YSkpO1xuXHR9IGNhdGNoKGUpIHtcblx0XHRwcm9taXNlID0gUHJvbWlzZS5yZWplY3QoZSk7XG5cdH1cblx0cmV0dXJuIHByb21pc2U7XG59OyIsIi8qIVxuXG4gaGFuZGxlYmFycyB2Mi4wLjBcblxuQ29weXJpZ2h0IChDKSAyMDExLTIwMTQgYnkgWWVodWRhIEthdHpcblxuUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxub2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xudG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG5mdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbklNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG5BVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG5MSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuVEhFIFNPRlRXQVJFLlxuXG5AbGljZW5zZVxuKi9cbi8qIGV4cG9ydGVkIEhhbmRsZWJhcnMgKi9cbihmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgZGVmaW5lKFtdLCBmYWN0b3J5KTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcbiAgfSBlbHNlIHtcbiAgICByb290LkhhbmRsZWJhcnMgPSByb290LkhhbmRsZWJhcnMgfHwgZmFjdG9yeSgpO1xuICB9XG59KHRoaXMsIGZ1bmN0aW9uICgpIHtcbi8vIGhhbmRsZWJhcnMvc2FmZS1zdHJpbmcuanNcbnZhciBfX21vZHVsZTNfXyA9IChmdW5jdGlvbigpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG4gIHZhciBfX2V4cG9ydHNfXztcbiAgLy8gQnVpbGQgb3V0IG91ciBiYXNpYyBTYWZlU3RyaW5nIHR5cGVcbiAgZnVuY3Rpb24gU2FmZVN0cmluZyhzdHJpbmcpIHtcbiAgICB0aGlzLnN0cmluZyA9IHN0cmluZztcbiAgfVxuXG4gIFNhZmVTdHJpbmcucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIFwiXCIgKyB0aGlzLnN0cmluZztcbiAgfTtcblxuICBfX2V4cG9ydHNfXyA9IFNhZmVTdHJpbmc7XG4gIHJldHVybiBfX2V4cG9ydHNfXztcbn0pKCk7XG5cbi8vIGhhbmRsZWJhcnMvdXRpbHMuanNcbnZhciBfX21vZHVsZTJfXyA9IChmdW5jdGlvbihfX2RlcGVuZGVuY3kxX18pIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG4gIHZhciBfX2V4cG9ydHNfXyA9IHt9O1xuICAvKmpzaGludCAtVzAwNCAqL1xuICB2YXIgU2FmZVN0cmluZyA9IF9fZGVwZW5kZW5jeTFfXztcblxuICB2YXIgZXNjYXBlID0ge1xuICAgIFwiJlwiOiBcIiZhbXA7XCIsXG4gICAgXCI8XCI6IFwiJmx0O1wiLFxuICAgIFwiPlwiOiBcIiZndDtcIixcbiAgICAnXCInOiBcIiZxdW90O1wiLFxuICAgIFwiJ1wiOiBcIiYjeDI3O1wiLFxuICAgIFwiYFwiOiBcIiYjeDYwO1wiXG4gIH07XG5cbiAgdmFyIGJhZENoYXJzID0gL1smPD5cIidgXS9nO1xuICB2YXIgcG9zc2libGUgPSAvWyY8PlwiJ2BdLztcblxuICBmdW5jdGlvbiBlc2NhcGVDaGFyKGNocikge1xuICAgIHJldHVybiBlc2NhcGVbY2hyXTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGV4dGVuZChvYmogLyogLCAuLi5zb3VyY2UgKi8pIHtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgZm9yICh2YXIga2V5IGluIGFyZ3VtZW50c1tpXSkge1xuICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGFyZ3VtZW50c1tpXSwga2V5KSkge1xuICAgICAgICAgIG9ialtrZXldID0gYXJndW1lbnRzW2ldW2tleV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgX19leHBvcnRzX18uZXh0ZW5kID0gZXh0ZW5kO3ZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG4gIF9fZXhwb3J0c19fLnRvU3RyaW5nID0gdG9TdHJpbmc7XG4gIC8vIFNvdXJjZWQgZnJvbSBsb2Rhc2hcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2Jlc3RpZWpzL2xvZGFzaC9ibG9iL21hc3Rlci9MSUNFTlNFLnR4dFxuICB2YXIgaXNGdW5jdGlvbiA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJztcbiAgfTtcbiAgLy8gZmFsbGJhY2sgZm9yIG9sZGVyIHZlcnNpb25zIG9mIENocm9tZSBhbmQgU2FmYXJpXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIGlmIChpc0Z1bmN0aW9uKC94LykpIHtcbiAgICBpc0Z1bmN0aW9uID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicgJiYgdG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG4gICAgfTtcbiAgfVxuICB2YXIgaXNGdW5jdGlvbjtcbiAgX19leHBvcnRzX18uaXNGdW5jdGlvbiA9IGlzRnVuY3Rpb247XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIHZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JykgPyB0b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgQXJyYXldJyA6IGZhbHNlO1xuICB9O1xuICBfX2V4cG9ydHNfXy5pc0FycmF5ID0gaXNBcnJheTtcblxuICBmdW5jdGlvbiBlc2NhcGVFeHByZXNzaW9uKHN0cmluZykge1xuICAgIC8vIGRvbid0IGVzY2FwZSBTYWZlU3RyaW5ncywgc2luY2UgdGhleSdyZSBhbHJlYWR5IHNhZmVcbiAgICBpZiAoc3RyaW5nIGluc3RhbmNlb2YgU2FmZVN0cmluZykge1xuICAgICAgcmV0dXJuIHN0cmluZy50b1N0cmluZygpO1xuICAgIH0gZWxzZSBpZiAoc3RyaW5nID09IG51bGwpIHtcbiAgICAgIHJldHVybiBcIlwiO1xuICAgIH0gZWxzZSBpZiAoIXN0cmluZykge1xuICAgICAgcmV0dXJuIHN0cmluZyArICcnO1xuICAgIH1cblxuICAgIC8vIEZvcmNlIGEgc3RyaW5nIGNvbnZlcnNpb24gYXMgdGhpcyB3aWxsIGJlIGRvbmUgYnkgdGhlIGFwcGVuZCByZWdhcmRsZXNzIGFuZFxuICAgIC8vIHRoZSByZWdleCB0ZXN0IHdpbGwgZG8gdGhpcyB0cmFuc3BhcmVudGx5IGJlaGluZCB0aGUgc2NlbmVzLCBjYXVzaW5nIGlzc3VlcyBpZlxuICAgIC8vIGFuIG9iamVjdCdzIHRvIHN0cmluZyBoYXMgZXNjYXBlZCBjaGFyYWN0ZXJzIGluIGl0LlxuICAgIHN0cmluZyA9IFwiXCIgKyBzdHJpbmc7XG5cbiAgICBpZighcG9zc2libGUudGVzdChzdHJpbmcpKSB7IHJldHVybiBzdHJpbmc7IH1cbiAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoYmFkQ2hhcnMsIGVzY2FwZUNoYXIpO1xuICB9XG5cbiAgX19leHBvcnRzX18uZXNjYXBlRXhwcmVzc2lvbiA9IGVzY2FwZUV4cHJlc3Npb247ZnVuY3Rpb24gaXNFbXB0eSh2YWx1ZSkge1xuICAgIGlmICghdmFsdWUgJiYgdmFsdWUgIT09IDApIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSBpZiAoaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIF9fZXhwb3J0c19fLmlzRW1wdHkgPSBpc0VtcHR5O2Z1bmN0aW9uIGFwcGVuZENvbnRleHRQYXRoKGNvbnRleHRQYXRoLCBpZCkge1xuICAgIHJldHVybiAoY29udGV4dFBhdGggPyBjb250ZXh0UGF0aCArICcuJyA6ICcnKSArIGlkO1xuICB9XG5cbiAgX19leHBvcnRzX18uYXBwZW5kQ29udGV4dFBhdGggPSBhcHBlbmRDb250ZXh0UGF0aDtcbiAgcmV0dXJuIF9fZXhwb3J0c19fO1xufSkoX19tb2R1bGUzX18pO1xuXG4vLyBoYW5kbGViYXJzL2V4Y2VwdGlvbi5qc1xudmFyIF9fbW9kdWxlNF9fID0gKGZ1bmN0aW9uKCkge1xuICBcInVzZSBzdHJpY3RcIjtcbiAgdmFyIF9fZXhwb3J0c19fO1xuXG4gIHZhciBlcnJvclByb3BzID0gWydkZXNjcmlwdGlvbicsICdmaWxlTmFtZScsICdsaW5lTnVtYmVyJywgJ21lc3NhZ2UnLCAnbmFtZScsICdudW1iZXInLCAnc3RhY2snXTtcblxuICBmdW5jdGlvbiBFeGNlcHRpb24obWVzc2FnZSwgbm9kZSkge1xuICAgIHZhciBsaW5lO1xuICAgIGlmIChub2RlICYmIG5vZGUuZmlyc3RMaW5lKSB7XG4gICAgICBsaW5lID0gbm9kZS5maXJzdExpbmU7XG5cbiAgICAgIG1lc3NhZ2UgKz0gJyAtICcgKyBsaW5lICsgJzonICsgbm9kZS5maXJzdENvbHVtbjtcbiAgICB9XG5cbiAgICB2YXIgdG1wID0gRXJyb3IucHJvdG90eXBlLmNvbnN0cnVjdG9yLmNhbGwodGhpcywgbWVzc2FnZSk7XG5cbiAgICAvLyBVbmZvcnR1bmF0ZWx5IGVycm9ycyBhcmUgbm90IGVudW1lcmFibGUgaW4gQ2hyb21lIChhdCBsZWFzdCksIHNvIGBmb3IgcHJvcCBpbiB0bXBgIGRvZXNuJ3Qgd29yay5cbiAgICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCBlcnJvclByb3BzLmxlbmd0aDsgaWR4KyspIHtcbiAgICAgIHRoaXNbZXJyb3JQcm9wc1tpZHhdXSA9IHRtcFtlcnJvclByb3BzW2lkeF1dO1xuICAgIH1cblxuICAgIGlmIChsaW5lKSB7XG4gICAgICB0aGlzLmxpbmVOdW1iZXIgPSBsaW5lO1xuICAgICAgdGhpcy5jb2x1bW4gPSBub2RlLmZpcnN0Q29sdW1uO1xuICAgIH1cbiAgfVxuXG4gIEV4Y2VwdGlvbi5wcm90b3R5cGUgPSBuZXcgRXJyb3IoKTtcblxuICBfX2V4cG9ydHNfXyA9IEV4Y2VwdGlvbjtcbiAgcmV0dXJuIF9fZXhwb3J0c19fO1xufSkoKTtcblxuLy8gaGFuZGxlYmFycy9iYXNlLmpzXG52YXIgX19tb2R1bGUxX18gPSAoZnVuY3Rpb24oX19kZXBlbmRlbmN5MV9fLCBfX2RlcGVuZGVuY3kyX18pIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG4gIHZhciBfX2V4cG9ydHNfXyA9IHt9O1xuICB2YXIgVXRpbHMgPSBfX2RlcGVuZGVuY3kxX187XG4gIHZhciBFeGNlcHRpb24gPSBfX2RlcGVuZGVuY3kyX187XG5cbiAgdmFyIFZFUlNJT04gPSBcIjIuMC4wXCI7XG4gIF9fZXhwb3J0c19fLlZFUlNJT04gPSBWRVJTSU9OO3ZhciBDT01QSUxFUl9SRVZJU0lPTiA9IDY7XG4gIF9fZXhwb3J0c19fLkNPTVBJTEVSX1JFVklTSU9OID0gQ09NUElMRVJfUkVWSVNJT047XG4gIHZhciBSRVZJU0lPTl9DSEFOR0VTID0ge1xuICAgIDE6ICc8PSAxLjAucmMuMicsIC8vIDEuMC5yYy4yIGlzIGFjdHVhbGx5IHJldjIgYnV0IGRvZXNuJ3QgcmVwb3J0IGl0XG4gICAgMjogJz09IDEuMC4wLXJjLjMnLFxuICAgIDM6ICc9PSAxLjAuMC1yYy40JyxcbiAgICA0OiAnPT0gMS54LngnLFxuICAgIDU6ICc9PSAyLjAuMC1hbHBoYS54JyxcbiAgICA2OiAnPj0gMi4wLjAtYmV0YS4xJ1xuICB9O1xuICBfX2V4cG9ydHNfXy5SRVZJU0lPTl9DSEFOR0VTID0gUkVWSVNJT05fQ0hBTkdFUztcbiAgdmFyIGlzQXJyYXkgPSBVdGlscy5pc0FycmF5LFxuICAgICAgaXNGdW5jdGlvbiA9IFV0aWxzLmlzRnVuY3Rpb24sXG4gICAgICB0b1N0cmluZyA9IFV0aWxzLnRvU3RyaW5nLFxuICAgICAgb2JqZWN0VHlwZSA9ICdbb2JqZWN0IE9iamVjdF0nO1xuXG4gIGZ1bmN0aW9uIEhhbmRsZWJhcnNFbnZpcm9ubWVudChoZWxwZXJzLCBwYXJ0aWFscykge1xuICAgIHRoaXMuaGVscGVycyA9IGhlbHBlcnMgfHwge307XG4gICAgdGhpcy5wYXJ0aWFscyA9IHBhcnRpYWxzIHx8IHt9O1xuXG4gICAgcmVnaXN0ZXJEZWZhdWx0SGVscGVycyh0aGlzKTtcbiAgfVxuXG4gIF9fZXhwb3J0c19fLkhhbmRsZWJhcnNFbnZpcm9ubWVudCA9IEhhbmRsZWJhcnNFbnZpcm9ubWVudDtIYW5kbGViYXJzRW52aXJvbm1lbnQucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBIYW5kbGViYXJzRW52aXJvbm1lbnQsXG5cbiAgICBsb2dnZXI6IGxvZ2dlcixcbiAgICBsb2c6IGxvZyxcblxuICAgIHJlZ2lzdGVySGVscGVyOiBmdW5jdGlvbihuYW1lLCBmbikge1xuICAgICAgaWYgKHRvU3RyaW5nLmNhbGwobmFtZSkgPT09IG9iamVjdFR5cGUpIHtcbiAgICAgICAgaWYgKGZuKSB7IHRocm93IG5ldyBFeGNlcHRpb24oJ0FyZyBub3Qgc3VwcG9ydGVkIHdpdGggbXVsdGlwbGUgaGVscGVycycpOyB9XG4gICAgICAgIFV0aWxzLmV4dGVuZCh0aGlzLmhlbHBlcnMsIG5hbWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5oZWxwZXJzW25hbWVdID0gZm47XG4gICAgICB9XG4gICAgfSxcbiAgICB1bnJlZ2lzdGVySGVscGVyOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgICBkZWxldGUgdGhpcy5oZWxwZXJzW25hbWVdO1xuICAgIH0sXG5cbiAgICByZWdpc3RlclBhcnRpYWw6IGZ1bmN0aW9uKG5hbWUsIHBhcnRpYWwpIHtcbiAgICAgIGlmICh0b1N0cmluZy5jYWxsKG5hbWUpID09PSBvYmplY3RUeXBlKSB7XG4gICAgICAgIFV0aWxzLmV4dGVuZCh0aGlzLnBhcnRpYWxzLCAgbmFtZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnBhcnRpYWxzW25hbWVdID0gcGFydGlhbDtcbiAgICAgIH1cbiAgICB9LFxuICAgIHVucmVnaXN0ZXJQYXJ0aWFsOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgICBkZWxldGUgdGhpcy5wYXJ0aWFsc1tuYW1lXTtcbiAgICB9XG4gIH07XG5cbiAgZnVuY3Rpb24gcmVnaXN0ZXJEZWZhdWx0SGVscGVycyhpbnN0YW5jZSkge1xuICAgIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCdoZWxwZXJNaXNzaW5nJywgZnVuY3Rpb24oLyogW2FyZ3MsIF1vcHRpb25zICovKSB7XG4gICAgICBpZihhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIC8vIEEgbWlzc2luZyBmaWVsZCBpbiBhIHt7Zm9vfX0gY29uc3R1Y3QuXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBTb21lb25lIGlzIGFjdHVhbGx5IHRyeWluZyB0byBjYWxsIHNvbWV0aGluZywgYmxvdyB1cC5cbiAgICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbihcIk1pc3NpbmcgaGVscGVyOiAnXCIgKyBhcmd1bWVudHNbYXJndW1lbnRzLmxlbmd0aC0xXS5uYW1lICsgXCInXCIpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ2Jsb2NrSGVscGVyTWlzc2luZycsIGZ1bmN0aW9uKGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciBpbnZlcnNlID0gb3B0aW9ucy5pbnZlcnNlLFxuICAgICAgICAgIGZuID0gb3B0aW9ucy5mbjtcblxuICAgICAgaWYoY29udGV4dCA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gZm4odGhpcyk7XG4gICAgICB9IGVsc2UgaWYoY29udGV4dCA9PT0gZmFsc2UgfHwgY29udGV4dCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBpbnZlcnNlKHRoaXMpO1xuICAgICAgfSBlbHNlIGlmIChpc0FycmF5KGNvbnRleHQpKSB7XG4gICAgICAgIGlmKGNvbnRleHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGlmIChvcHRpb25zLmlkcykge1xuICAgICAgICAgICAgb3B0aW9ucy5pZHMgPSBbb3B0aW9ucy5uYW1lXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gaW5zdGFuY2UuaGVscGVycy5lYWNoKGNvbnRleHQsIG9wdGlvbnMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBpbnZlcnNlKHRoaXMpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAob3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuaWRzKSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSBjcmVhdGVGcmFtZShvcHRpb25zLmRhdGEpO1xuICAgICAgICAgIGRhdGEuY29udGV4dFBhdGggPSBVdGlscy5hcHBlbmRDb250ZXh0UGF0aChvcHRpb25zLmRhdGEuY29udGV4dFBhdGgsIG9wdGlvbnMubmFtZSk7XG4gICAgICAgICAgb3B0aW9ucyA9IHtkYXRhOiBkYXRhfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmbihjb250ZXh0LCBvcHRpb25zKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCdlYWNoJywgZnVuY3Rpb24oY29udGV4dCwgb3B0aW9ucykge1xuICAgICAgaWYgKCFvcHRpb25zKSB7XG4gICAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ011c3QgcGFzcyBpdGVyYXRvciB0byAjZWFjaCcpO1xuICAgICAgfVxuXG4gICAgICB2YXIgZm4gPSBvcHRpb25zLmZuLCBpbnZlcnNlID0gb3B0aW9ucy5pbnZlcnNlO1xuICAgICAgdmFyIGkgPSAwLCByZXQgPSBcIlwiLCBkYXRhO1xuXG4gICAgICB2YXIgY29udGV4dFBhdGg7XG4gICAgICBpZiAob3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuaWRzKSB7XG4gICAgICAgIGNvbnRleHRQYXRoID0gVXRpbHMuYXBwZW5kQ29udGV4dFBhdGgob3B0aW9ucy5kYXRhLmNvbnRleHRQYXRoLCBvcHRpb25zLmlkc1swXSkgKyAnLic7XG4gICAgICB9XG5cbiAgICAgIGlmIChpc0Z1bmN0aW9uKGNvbnRleHQpKSB7IGNvbnRleHQgPSBjb250ZXh0LmNhbGwodGhpcyk7IH1cblxuICAgICAgaWYgKG9wdGlvbnMuZGF0YSkge1xuICAgICAgICBkYXRhID0gY3JlYXRlRnJhbWUob3B0aW9ucy5kYXRhKTtcbiAgICAgIH1cblxuICAgICAgaWYoY29udGV4dCAmJiB0eXBlb2YgY29udGV4dCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgaWYgKGlzQXJyYXkoY29udGV4dCkpIHtcbiAgICAgICAgICBmb3IodmFyIGogPSBjb250ZXh0Lmxlbmd0aDsgaTxqOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICAgIGRhdGEuaW5kZXggPSBpO1xuICAgICAgICAgICAgICBkYXRhLmZpcnN0ID0gKGkgPT09IDApO1xuICAgICAgICAgICAgICBkYXRhLmxhc3QgID0gKGkgPT09IChjb250ZXh0Lmxlbmd0aC0xKSk7XG5cbiAgICAgICAgICAgICAgaWYgKGNvbnRleHRQYXRoKSB7XG4gICAgICAgICAgICAgICAgZGF0YS5jb250ZXh0UGF0aCA9IGNvbnRleHRQYXRoICsgaTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0ID0gcmV0ICsgZm4oY29udGV4dFtpXSwgeyBkYXRhOiBkYXRhIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmb3IodmFyIGtleSBpbiBjb250ZXh0KSB7XG4gICAgICAgICAgICBpZihjb250ZXh0Lmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgaWYoZGF0YSkge1xuICAgICAgICAgICAgICAgIGRhdGEua2V5ID0ga2V5O1xuICAgICAgICAgICAgICAgIGRhdGEuaW5kZXggPSBpO1xuICAgICAgICAgICAgICAgIGRhdGEuZmlyc3QgPSAoaSA9PT0gMCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoY29udGV4dFBhdGgpIHtcbiAgICAgICAgICAgICAgICAgIGRhdGEuY29udGV4dFBhdGggPSBjb250ZXh0UGF0aCArIGtleTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0ID0gcmV0ICsgZm4oY29udGV4dFtrZXldLCB7ZGF0YTogZGF0YX0pO1xuICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmKGkgPT09IDApe1xuICAgICAgICByZXQgPSBpbnZlcnNlKHRoaXMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmV0O1xuICAgIH0pO1xuXG4gICAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ2lmJywgZnVuY3Rpb24oY29uZGl0aW9uYWwsIG9wdGlvbnMpIHtcbiAgICAgIGlmIChpc0Z1bmN0aW9uKGNvbmRpdGlvbmFsKSkgeyBjb25kaXRpb25hbCA9IGNvbmRpdGlvbmFsLmNhbGwodGhpcyk7IH1cblxuICAgICAgLy8gRGVmYXVsdCBiZWhhdmlvciBpcyB0byByZW5kZXIgdGhlIHBvc2l0aXZlIHBhdGggaWYgdGhlIHZhbHVlIGlzIHRydXRoeSBhbmQgbm90IGVtcHR5LlxuICAgICAgLy8gVGhlIGBpbmNsdWRlWmVyb2Agb3B0aW9uIG1heSBiZSBzZXQgdG8gdHJlYXQgdGhlIGNvbmR0aW9uYWwgYXMgcHVyZWx5IG5vdCBlbXB0eSBiYXNlZCBvbiB0aGVcbiAgICAgIC8vIGJlaGF2aW9yIG9mIGlzRW1wdHkuIEVmZmVjdGl2ZWx5IHRoaXMgZGV0ZXJtaW5lcyBpZiAwIGlzIGhhbmRsZWQgYnkgdGhlIHBvc2l0aXZlIHBhdGggb3IgbmVnYXRpdmUuXG4gICAgICBpZiAoKCFvcHRpb25zLmhhc2guaW5jbHVkZVplcm8gJiYgIWNvbmRpdGlvbmFsKSB8fCBVdGlscy5pc0VtcHR5KGNvbmRpdGlvbmFsKSkge1xuICAgICAgICByZXR1cm4gb3B0aW9ucy5pbnZlcnNlKHRoaXMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMuZm4odGhpcyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcigndW5sZXNzJywgZnVuY3Rpb24oY29uZGl0aW9uYWwsIG9wdGlvbnMpIHtcbiAgICAgIHJldHVybiBpbnN0YW5jZS5oZWxwZXJzWydpZiddLmNhbGwodGhpcywgY29uZGl0aW9uYWwsIHtmbjogb3B0aW9ucy5pbnZlcnNlLCBpbnZlcnNlOiBvcHRpb25zLmZuLCBoYXNoOiBvcHRpb25zLmhhc2h9KTtcbiAgICB9KTtcblxuICAgIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCd3aXRoJywgZnVuY3Rpb24oY29udGV4dCwgb3B0aW9ucykge1xuICAgICAgaWYgKGlzRnVuY3Rpb24oY29udGV4dCkpIHsgY29udGV4dCA9IGNvbnRleHQuY2FsbCh0aGlzKTsgfVxuXG4gICAgICB2YXIgZm4gPSBvcHRpb25zLmZuO1xuXG4gICAgICBpZiAoIVV0aWxzLmlzRW1wdHkoY29udGV4dCkpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuZGF0YSAmJiBvcHRpb25zLmlkcykge1xuICAgICAgICAgIHZhciBkYXRhID0gY3JlYXRlRnJhbWUob3B0aW9ucy5kYXRhKTtcbiAgICAgICAgICBkYXRhLmNvbnRleHRQYXRoID0gVXRpbHMuYXBwZW5kQ29udGV4dFBhdGgob3B0aW9ucy5kYXRhLmNvbnRleHRQYXRoLCBvcHRpb25zLmlkc1swXSk7XG4gICAgICAgICAgb3B0aW9ucyA9IHtkYXRhOmRhdGF9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZuKGNvbnRleHQsIG9wdGlvbnMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMuaW52ZXJzZSh0aGlzKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCdsb2cnLCBmdW5jdGlvbihtZXNzYWdlLCBvcHRpb25zKSB7XG4gICAgICB2YXIgbGV2ZWwgPSBvcHRpb25zLmRhdGEgJiYgb3B0aW9ucy5kYXRhLmxldmVsICE9IG51bGwgPyBwYXJzZUludChvcHRpb25zLmRhdGEubGV2ZWwsIDEwKSA6IDE7XG4gICAgICBpbnN0YW5jZS5sb2cobGV2ZWwsIG1lc3NhZ2UpO1xuICAgIH0pO1xuXG4gICAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ2xvb2t1cCcsIGZ1bmN0aW9uKG9iaiwgZmllbGQpIHtcbiAgICAgIHJldHVybiBvYmogJiYgb2JqW2ZpZWxkXTtcbiAgICB9KTtcbiAgfVxuXG4gIHZhciBsb2dnZXIgPSB7XG4gICAgbWV0aG9kTWFwOiB7IDA6ICdkZWJ1ZycsIDE6ICdpbmZvJywgMjogJ3dhcm4nLCAzOiAnZXJyb3InIH0sXG5cbiAgICAvLyBTdGF0ZSBlbnVtXG4gICAgREVCVUc6IDAsXG4gICAgSU5GTzogMSxcbiAgICBXQVJOOiAyLFxuICAgIEVSUk9SOiAzLFxuICAgIGxldmVsOiAzLFxuXG4gICAgLy8gY2FuIGJlIG92ZXJyaWRkZW4gaW4gdGhlIGhvc3QgZW52aXJvbm1lbnRcbiAgICBsb2c6IGZ1bmN0aW9uKGxldmVsLCBtZXNzYWdlKSB7XG4gICAgICBpZiAobG9nZ2VyLmxldmVsIDw9IGxldmVsKSB7XG4gICAgICAgIHZhciBtZXRob2QgPSBsb2dnZXIubWV0aG9kTWFwW2xldmVsXTtcbiAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJiBjb25zb2xlW21ldGhvZF0pIHtcbiAgICAgICAgICBjb25zb2xlW21ldGhvZF0uY2FsbChjb25zb2xlLCBtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgX19leHBvcnRzX18ubG9nZ2VyID0gbG9nZ2VyO1xuICB2YXIgbG9nID0gbG9nZ2VyLmxvZztcbiAgX19leHBvcnRzX18ubG9nID0gbG9nO1xuICB2YXIgY3JlYXRlRnJhbWUgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgICB2YXIgZnJhbWUgPSBVdGlscy5leHRlbmQoe30sIG9iamVjdCk7XG4gICAgZnJhbWUuX3BhcmVudCA9IG9iamVjdDtcbiAgICByZXR1cm4gZnJhbWU7XG4gIH07XG4gIF9fZXhwb3J0c19fLmNyZWF0ZUZyYW1lID0gY3JlYXRlRnJhbWU7XG4gIHJldHVybiBfX2V4cG9ydHNfXztcbn0pKF9fbW9kdWxlMl9fLCBfX21vZHVsZTRfXyk7XG5cbi8vIGhhbmRsZWJhcnMvcnVudGltZS5qc1xudmFyIF9fbW9kdWxlNV9fID0gKGZ1bmN0aW9uKF9fZGVwZW5kZW5jeTFfXywgX19kZXBlbmRlbmN5Ml9fLCBfX2RlcGVuZGVuY3kzX18pIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG4gIHZhciBfX2V4cG9ydHNfXyA9IHt9O1xuICB2YXIgVXRpbHMgPSBfX2RlcGVuZGVuY3kxX187XG4gIHZhciBFeGNlcHRpb24gPSBfX2RlcGVuZGVuY3kyX187XG4gIHZhciBDT01QSUxFUl9SRVZJU0lPTiA9IF9fZGVwZW5kZW5jeTNfXy5DT01QSUxFUl9SRVZJU0lPTjtcbiAgdmFyIFJFVklTSU9OX0NIQU5HRVMgPSBfX2RlcGVuZGVuY3kzX18uUkVWSVNJT05fQ0hBTkdFUztcbiAgdmFyIGNyZWF0ZUZyYW1lID0gX19kZXBlbmRlbmN5M19fLmNyZWF0ZUZyYW1lO1xuXG4gIGZ1bmN0aW9uIGNoZWNrUmV2aXNpb24oY29tcGlsZXJJbmZvKSB7XG4gICAgdmFyIGNvbXBpbGVyUmV2aXNpb24gPSBjb21waWxlckluZm8gJiYgY29tcGlsZXJJbmZvWzBdIHx8IDEsXG4gICAgICAgIGN1cnJlbnRSZXZpc2lvbiA9IENPTVBJTEVSX1JFVklTSU9OO1xuXG4gICAgaWYgKGNvbXBpbGVyUmV2aXNpb24gIT09IGN1cnJlbnRSZXZpc2lvbikge1xuICAgICAgaWYgKGNvbXBpbGVyUmV2aXNpb24gPCBjdXJyZW50UmV2aXNpb24pIHtcbiAgICAgICAgdmFyIHJ1bnRpbWVWZXJzaW9ucyA9IFJFVklTSU9OX0NIQU5HRVNbY3VycmVudFJldmlzaW9uXSxcbiAgICAgICAgICAgIGNvbXBpbGVyVmVyc2lvbnMgPSBSRVZJU0lPTl9DSEFOR0VTW2NvbXBpbGVyUmV2aXNpb25dO1xuICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKFwiVGVtcGxhdGUgd2FzIHByZWNvbXBpbGVkIHdpdGggYW4gb2xkZXIgdmVyc2lvbiBvZiBIYW5kbGViYXJzIHRoYW4gdGhlIGN1cnJlbnQgcnVudGltZS4gXCIrXG4gICAgICAgICAgICAgIFwiUGxlYXNlIHVwZGF0ZSB5b3VyIHByZWNvbXBpbGVyIHRvIGEgbmV3ZXIgdmVyc2lvbiAoXCIrcnVudGltZVZlcnNpb25zK1wiKSBvciBkb3duZ3JhZGUgeW91ciBydW50aW1lIHRvIGFuIG9sZGVyIHZlcnNpb24gKFwiK2NvbXBpbGVyVmVyc2lvbnMrXCIpLlwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFVzZSB0aGUgZW1iZWRkZWQgdmVyc2lvbiBpbmZvIHNpbmNlIHRoZSBydW50aW1lIGRvZXNuJ3Qga25vdyBhYm91dCB0aGlzIHJldmlzaW9uIHlldFxuICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKFwiVGVtcGxhdGUgd2FzIHByZWNvbXBpbGVkIHdpdGggYSBuZXdlciB2ZXJzaW9uIG9mIEhhbmRsZWJhcnMgdGhhbiB0aGUgY3VycmVudCBydW50aW1lLiBcIitcbiAgICAgICAgICAgICAgXCJQbGVhc2UgdXBkYXRlIHlvdXIgcnVudGltZSB0byBhIG5ld2VyIHZlcnNpb24gKFwiK2NvbXBpbGVySW5mb1sxXStcIikuXCIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF9fZXhwb3J0c19fLmNoZWNrUmV2aXNpb24gPSBjaGVja1JldmlzaW9uOy8vIFRPRE86IFJlbW92ZSB0aGlzIGxpbmUgYW5kIGJyZWFrIHVwIGNvbXBpbGVQYXJ0aWFsXG5cbiAgZnVuY3Rpb24gdGVtcGxhdGUodGVtcGxhdGVTcGVjLCBlbnYpIHtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIGlmICghZW52KSB7XG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKFwiTm8gZW52aXJvbm1lbnQgcGFzc2VkIHRvIHRlbXBsYXRlXCIpO1xuICAgIH1cbiAgICBpZiAoIXRlbXBsYXRlU3BlYyB8fCAhdGVtcGxhdGVTcGVjLm1haW4pIHtcbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ1Vua25vd24gdGVtcGxhdGUgb2JqZWN0OiAnICsgdHlwZW9mIHRlbXBsYXRlU3BlYyk7XG4gICAgfVxuXG4gICAgLy8gTm90ZTogVXNpbmcgZW52LlZNIHJlZmVyZW5jZXMgcmF0aGVyIHRoYW4gbG9jYWwgdmFyIHJlZmVyZW5jZXMgdGhyb3VnaG91dCB0aGlzIHNlY3Rpb24gdG8gYWxsb3dcbiAgICAvLyBmb3IgZXh0ZXJuYWwgdXNlcnMgdG8gb3ZlcnJpZGUgdGhlc2UgYXMgcHN1ZWRvLXN1cHBvcnRlZCBBUElzLlxuICAgIGVudi5WTS5jaGVja1JldmlzaW9uKHRlbXBsYXRlU3BlYy5jb21waWxlcik7XG5cbiAgICB2YXIgaW52b2tlUGFydGlhbFdyYXBwZXIgPSBmdW5jdGlvbihwYXJ0aWFsLCBpbmRlbnQsIG5hbWUsIGNvbnRleHQsIGhhc2gsIGhlbHBlcnMsIHBhcnRpYWxzLCBkYXRhLCBkZXB0aHMpIHtcbiAgICAgIGlmIChoYXNoKSB7XG4gICAgICAgIGNvbnRleHQgPSBVdGlscy5leHRlbmQoe30sIGNvbnRleHQsIGhhc2gpO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmVzdWx0ID0gZW52LlZNLmludm9rZVBhcnRpYWwuY2FsbCh0aGlzLCBwYXJ0aWFsLCBuYW1lLCBjb250ZXh0LCBoZWxwZXJzLCBwYXJ0aWFscywgZGF0YSwgZGVwdGhzKTtcblxuICAgICAgaWYgKHJlc3VsdCA9PSBudWxsICYmIGVudi5jb21waWxlKSB7XG4gICAgICAgIHZhciBvcHRpb25zID0geyBoZWxwZXJzOiBoZWxwZXJzLCBwYXJ0aWFsczogcGFydGlhbHMsIGRhdGE6IGRhdGEsIGRlcHRoczogZGVwdGhzIH07XG4gICAgICAgIHBhcnRpYWxzW25hbWVdID0gZW52LmNvbXBpbGUocGFydGlhbCwgeyBkYXRhOiBkYXRhICE9PSB1bmRlZmluZWQsIGNvbXBhdDogdGVtcGxhdGVTcGVjLmNvbXBhdCB9LCBlbnYpO1xuICAgICAgICByZXN1bHQgPSBwYXJ0aWFsc1tuYW1lXShjb250ZXh0LCBvcHRpb25zKTtcbiAgICAgIH1cbiAgICAgIGlmIChyZXN1bHQgIT0gbnVsbCkge1xuICAgICAgICBpZiAoaW5kZW50KSB7XG4gICAgICAgICAgdmFyIGxpbmVzID0gcmVzdWx0LnNwbGl0KCdcXG4nKTtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGxpbmVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgaWYgKCFsaW5lc1tpXSAmJiBpICsgMSA9PT0gbCkge1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGluZXNbaV0gPSBpbmRlbnQgKyBsaW5lc1tpXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVzdWx0ID0gbGluZXMuam9pbignXFxuJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oXCJUaGUgcGFydGlhbCBcIiArIG5hbWUgKyBcIiBjb3VsZCBub3QgYmUgY29tcGlsZWQgd2hlbiBydW5uaW5nIGluIHJ1bnRpbWUtb25seSBtb2RlXCIpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBKdXN0IGFkZCB3YXRlclxuICAgIHZhciBjb250YWluZXIgPSB7XG4gICAgICBsb29rdXA6IGZ1bmN0aW9uKGRlcHRocywgbmFtZSkge1xuICAgICAgICB2YXIgbGVuID0gZGVwdGhzLmxlbmd0aDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgIGlmIChkZXB0aHNbaV0gJiYgZGVwdGhzW2ldW25hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBkZXB0aHNbaV1bbmFtZV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbGFtYmRhOiBmdW5jdGlvbihjdXJyZW50LCBjb250ZXh0KSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgY3VycmVudCA9PT0gJ2Z1bmN0aW9uJyA/IGN1cnJlbnQuY2FsbChjb250ZXh0KSA6IGN1cnJlbnQ7XG4gICAgICB9LFxuXG4gICAgICBlc2NhcGVFeHByZXNzaW9uOiBVdGlscy5lc2NhcGVFeHByZXNzaW9uLFxuICAgICAgaW52b2tlUGFydGlhbDogaW52b2tlUGFydGlhbFdyYXBwZXIsXG5cbiAgICAgIGZuOiBmdW5jdGlvbihpKSB7XG4gICAgICAgIHJldHVybiB0ZW1wbGF0ZVNwZWNbaV07XG4gICAgICB9LFxuXG4gICAgICBwcm9ncmFtczogW10sXG4gICAgICBwcm9ncmFtOiBmdW5jdGlvbihpLCBkYXRhLCBkZXB0aHMpIHtcbiAgICAgICAgdmFyIHByb2dyYW1XcmFwcGVyID0gdGhpcy5wcm9ncmFtc1tpXSxcbiAgICAgICAgICAgIGZuID0gdGhpcy5mbihpKTtcbiAgICAgICAgaWYgKGRhdGEgfHwgZGVwdGhzKSB7XG4gICAgICAgICAgcHJvZ3JhbVdyYXBwZXIgPSBwcm9ncmFtKHRoaXMsIGksIGZuLCBkYXRhLCBkZXB0aHMpO1xuICAgICAgICB9IGVsc2UgaWYgKCFwcm9ncmFtV3JhcHBlcikge1xuICAgICAgICAgIHByb2dyYW1XcmFwcGVyID0gdGhpcy5wcm9ncmFtc1tpXSA9IHByb2dyYW0odGhpcywgaSwgZm4pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwcm9ncmFtV3JhcHBlcjtcbiAgICAgIH0sXG5cbiAgICAgIGRhdGE6IGZ1bmN0aW9uKGRhdGEsIGRlcHRoKSB7XG4gICAgICAgIHdoaWxlIChkYXRhICYmIGRlcHRoLS0pIHtcbiAgICAgICAgICBkYXRhID0gZGF0YS5fcGFyZW50O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgfSxcbiAgICAgIG1lcmdlOiBmdW5jdGlvbihwYXJhbSwgY29tbW9uKSB7XG4gICAgICAgIHZhciByZXQgPSBwYXJhbSB8fCBjb21tb247XG5cbiAgICAgICAgaWYgKHBhcmFtICYmIGNvbW1vbiAmJiAocGFyYW0gIT09IGNvbW1vbikpIHtcbiAgICAgICAgICByZXQgPSBVdGlscy5leHRlbmQoe30sIGNvbW1vbiwgcGFyYW0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgIH0sXG5cbiAgICAgIG5vb3A6IGVudi5WTS5ub29wLFxuICAgICAgY29tcGlsZXJJbmZvOiB0ZW1wbGF0ZVNwZWMuY29tcGlsZXJcbiAgICB9O1xuXG4gICAgdmFyIHJldCA9IGZ1bmN0aW9uKGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgdmFyIGRhdGEgPSBvcHRpb25zLmRhdGE7XG5cbiAgICAgIHJldC5fc2V0dXAob3B0aW9ucyk7XG4gICAgICBpZiAoIW9wdGlvbnMucGFydGlhbCAmJiB0ZW1wbGF0ZVNwZWMudXNlRGF0YSkge1xuICAgICAgICBkYXRhID0gaW5pdERhdGEoY29udGV4dCwgZGF0YSk7XG4gICAgICB9XG4gICAgICB2YXIgZGVwdGhzO1xuICAgICAgaWYgKHRlbXBsYXRlU3BlYy51c2VEZXB0aHMpIHtcbiAgICAgICAgZGVwdGhzID0gb3B0aW9ucy5kZXB0aHMgPyBbY29udGV4dF0uY29uY2F0KG9wdGlvbnMuZGVwdGhzKSA6IFtjb250ZXh0XTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRlbXBsYXRlU3BlYy5tYWluLmNhbGwoY29udGFpbmVyLCBjb250ZXh0LCBjb250YWluZXIuaGVscGVycywgY29udGFpbmVyLnBhcnRpYWxzLCBkYXRhLCBkZXB0aHMpO1xuICAgIH07XG4gICAgcmV0LmlzVG9wID0gdHJ1ZTtcblxuICAgIHJldC5fc2V0dXAgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICBpZiAoIW9wdGlvbnMucGFydGlhbCkge1xuICAgICAgICBjb250YWluZXIuaGVscGVycyA9IGNvbnRhaW5lci5tZXJnZShvcHRpb25zLmhlbHBlcnMsIGVudi5oZWxwZXJzKTtcblxuICAgICAgICBpZiAodGVtcGxhdGVTcGVjLnVzZVBhcnRpYWwpIHtcbiAgICAgICAgICBjb250YWluZXIucGFydGlhbHMgPSBjb250YWluZXIubWVyZ2Uob3B0aW9ucy5wYXJ0aWFscywgZW52LnBhcnRpYWxzKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29udGFpbmVyLmhlbHBlcnMgPSBvcHRpb25zLmhlbHBlcnM7XG4gICAgICAgIGNvbnRhaW5lci5wYXJ0aWFscyA9IG9wdGlvbnMucGFydGlhbHM7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHJldC5fY2hpbGQgPSBmdW5jdGlvbihpLCBkYXRhLCBkZXB0aHMpIHtcbiAgICAgIGlmICh0ZW1wbGF0ZVNwZWMudXNlRGVwdGhzICYmICFkZXB0aHMpIHtcbiAgICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignbXVzdCBwYXNzIHBhcmVudCBkZXB0aHMnKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByb2dyYW0oY29udGFpbmVyLCBpLCB0ZW1wbGF0ZVNwZWNbaV0sIGRhdGEsIGRlcHRocyk7XG4gICAgfTtcbiAgICByZXR1cm4gcmV0O1xuICB9XG5cbiAgX19leHBvcnRzX18udGVtcGxhdGUgPSB0ZW1wbGF0ZTtmdW5jdGlvbiBwcm9ncmFtKGNvbnRhaW5lciwgaSwgZm4sIGRhdGEsIGRlcHRocykge1xuICAgIHZhciBwcm9nID0gZnVuY3Rpb24oY29udGV4dCwgb3B0aW9ucykge1xuICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICAgIHJldHVybiBmbi5jYWxsKGNvbnRhaW5lciwgY29udGV4dCwgY29udGFpbmVyLmhlbHBlcnMsIGNvbnRhaW5lci5wYXJ0aWFscywgb3B0aW9ucy5kYXRhIHx8IGRhdGEsIGRlcHRocyAmJiBbY29udGV4dF0uY29uY2F0KGRlcHRocykpO1xuICAgIH07XG4gICAgcHJvZy5wcm9ncmFtID0gaTtcbiAgICBwcm9nLmRlcHRoID0gZGVwdGhzID8gZGVwdGhzLmxlbmd0aCA6IDA7XG4gICAgcmV0dXJuIHByb2c7XG4gIH1cblxuICBfX2V4cG9ydHNfXy5wcm9ncmFtID0gcHJvZ3JhbTtmdW5jdGlvbiBpbnZva2VQYXJ0aWFsKHBhcnRpYWwsIG5hbWUsIGNvbnRleHQsIGhlbHBlcnMsIHBhcnRpYWxzLCBkYXRhLCBkZXB0aHMpIHtcbiAgICB2YXIgb3B0aW9ucyA9IHsgcGFydGlhbDogdHJ1ZSwgaGVscGVyczogaGVscGVycywgcGFydGlhbHM6IHBhcnRpYWxzLCBkYXRhOiBkYXRhLCBkZXB0aHM6IGRlcHRocyB9O1xuXG4gICAgaWYocGFydGlhbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKFwiVGhlIHBhcnRpYWwgXCIgKyBuYW1lICsgXCIgY291bGQgbm90IGJlIGZvdW5kXCIpO1xuICAgIH0gZWxzZSBpZihwYXJ0aWFsIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgIHJldHVybiBwYXJ0aWFsKGNvbnRleHQsIG9wdGlvbnMpO1xuICAgIH1cbiAgfVxuXG4gIF9fZXhwb3J0c19fLmludm9rZVBhcnRpYWwgPSBpbnZva2VQYXJ0aWFsO2Z1bmN0aW9uIG5vb3AoKSB7IHJldHVybiBcIlwiOyB9XG5cbiAgX19leHBvcnRzX18ubm9vcCA9IG5vb3A7ZnVuY3Rpb24gaW5pdERhdGEoY29udGV4dCwgZGF0YSkge1xuICAgIGlmICghZGF0YSB8fCAhKCdyb290JyBpbiBkYXRhKSkge1xuICAgICAgZGF0YSA9IGRhdGEgPyBjcmVhdGVGcmFtZShkYXRhKSA6IHt9O1xuICAgICAgZGF0YS5yb290ID0gY29udGV4dDtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cbiAgcmV0dXJuIF9fZXhwb3J0c19fO1xufSkoX19tb2R1bGUyX18sIF9fbW9kdWxlNF9fLCBfX21vZHVsZTFfXyk7XG5cbi8vIGhhbmRsZWJhcnMucnVudGltZS5qc1xudmFyIF9fbW9kdWxlMF9fID0gKGZ1bmN0aW9uKF9fZGVwZW5kZW5jeTFfXywgX19kZXBlbmRlbmN5Ml9fLCBfX2RlcGVuZGVuY3kzX18sIF9fZGVwZW5kZW5jeTRfXywgX19kZXBlbmRlbmN5NV9fKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuICB2YXIgX19leHBvcnRzX187XG4gIC8qZ2xvYmFscyBIYW5kbGViYXJzOiB0cnVlICovXG4gIHZhciBiYXNlID0gX19kZXBlbmRlbmN5MV9fO1xuXG4gIC8vIEVhY2ggb2YgdGhlc2UgYXVnbWVudCB0aGUgSGFuZGxlYmFycyBvYmplY3QuIE5vIG5lZWQgdG8gc2V0dXAgaGVyZS5cbiAgLy8gKFRoaXMgaXMgZG9uZSB0byBlYXNpbHkgc2hhcmUgY29kZSBiZXR3ZWVuIGNvbW1vbmpzIGFuZCBicm93c2UgZW52cylcbiAgdmFyIFNhZmVTdHJpbmcgPSBfX2RlcGVuZGVuY3kyX187XG4gIHZhciBFeGNlcHRpb24gPSBfX2RlcGVuZGVuY3kzX187XG4gIHZhciBVdGlscyA9IF9fZGVwZW5kZW5jeTRfXztcbiAgdmFyIHJ1bnRpbWUgPSBfX2RlcGVuZGVuY3k1X187XG5cbiAgLy8gRm9yIGNvbXBhdGliaWxpdHkgYW5kIHVzYWdlIG91dHNpZGUgb2YgbW9kdWxlIHN5c3RlbXMsIG1ha2UgdGhlIEhhbmRsZWJhcnMgb2JqZWN0IGEgbmFtZXNwYWNlXG4gIHZhciBjcmVhdGUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaGIgPSBuZXcgYmFzZS5IYW5kbGViYXJzRW52aXJvbm1lbnQoKTtcblxuICAgIFV0aWxzLmV4dGVuZChoYiwgYmFzZSk7XG4gICAgaGIuU2FmZVN0cmluZyA9IFNhZmVTdHJpbmc7XG4gICAgaGIuRXhjZXB0aW9uID0gRXhjZXB0aW9uO1xuICAgIGhiLlV0aWxzID0gVXRpbHM7XG4gICAgaGIuZXNjYXBlRXhwcmVzc2lvbiA9IFV0aWxzLmVzY2FwZUV4cHJlc3Npb247XG5cbiAgICBoYi5WTSA9IHJ1bnRpbWU7XG4gICAgaGIudGVtcGxhdGUgPSBmdW5jdGlvbihzcGVjKSB7XG4gICAgICByZXR1cm4gcnVudGltZS50ZW1wbGF0ZShzcGVjLCBoYik7XG4gICAgfTtcblxuICAgIHJldHVybiBoYjtcbiAgfTtcblxuICB2YXIgSGFuZGxlYmFycyA9IGNyZWF0ZSgpO1xuICBIYW5kbGViYXJzLmNyZWF0ZSA9IGNyZWF0ZTtcblxuICBIYW5kbGViYXJzWydkZWZhdWx0J10gPSBIYW5kbGViYXJzO1xuXG4gIF9fZXhwb3J0c19fID0gSGFuZGxlYmFycztcbiAgcmV0dXJuIF9fZXhwb3J0c19fO1xufSkoX19tb2R1bGUxX18sIF9fbW9kdWxlM19fLCBfX21vZHVsZTRfXywgX19tb2R1bGUyX18sIF9fbW9kdWxlNV9fKTtcblxuICByZXR1cm4gX19tb2R1bGUwX187XG59KSk7XG4iLCIvKlxuICogY2F0YmVycnktaGFuZGxlYmFyc1xuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNCBEZW5pcyBSZWNoa3Vub3YgYW5kIHByb2plY3QgY29udHJpYnV0b3JzLlxuICpcbiAqIGNhdGJlcnJ5LWhhbmRsZWJhcnMncyBsaWNlbnNlIGZvbGxvd3M6XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb25cbiAqIG9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uXG4gKiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sXG4gKiBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLFxuICogcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSxcbiAqIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4gKiBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuICogaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuICogT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuICogU09GVFdBUkUuXG4gKlxuICogVGhpcyBsaWNlbnNlIGFwcGxpZXMgdG8gYWxsIHBhcnRzIG9mIGNhdGJlcnJ5LWhhbmRsZWJhcnMgdGhhdCBhcmUgbm90IGV4dGVybmFsbHlcbiAqIG1haW50YWluZWQgbGlicmFyaWVzLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIEhhbmRsZWJhcnMgPSByZXF1aXJlKCcuL2xpYi92ZW5kb3JzL2hhbmRsZWJhcnMnKSxcblx0VGVtcGxhdGVQcm92aWRlciA9IHJlcXVpcmUoJy4vbGliL1RlbXBsYXRlUHJvdmlkZXInKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdHJlZ2lzdGVyOiBmdW5jdGlvbiAobG9jYXRvciwgY29uZmlnKSB7XG5cdFx0Y29uZmlnID0gY29uZmlnIHx8IHt9O1xuXHRcdGxvY2F0b3IucmVnaXN0ZXJJbnN0YW5jZSgnaGFuZGxlYmFycycsIEhhbmRsZWJhcnMpO1xuXHRcdGxvY2F0b3IucmVnaXN0ZXIoJ3RlbXBsYXRlUHJvdmlkZXInLCBUZW1wbGF0ZVByb3ZpZGVyLCBjb25maWcsIHRydWUpO1xuXHR9LFxuXHRIYW5kbGViYXJzOiBIYW5kbGViYXJzLFxuXHRUZW1wbGF0ZVByb3ZpZGVyOiBUZW1wbGF0ZVByb3ZpZGVyXG59OyIsIi8qXG4gKiBjYXRiZXJyeVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNCBEZW5pcyBSZWNoa3Vub3YgYW5kIHByb2plY3QgY29udHJpYnV0b3JzLlxuICpcbiAqIGNhdGJlcnJ5J3MgbGljZW5zZSBmb2xsb3dzOlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXG4gKiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvblxuICogZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLFxuICogaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSxcbiAqIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsXG4gKiBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuICogc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbiAqIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1NcbiAqIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiAqIFNPRlRXQVJFLlxuICpcbiAqIFRoaXMgbGljZW5zZSBhcHBsaWVzIHRvIGFsbCBwYXJ0cyBvZiBjYXRiZXJyeSB0aGF0IGFyZSBub3QgZXh0ZXJuYWxseVxuICogbWFpbnRhaW5lZCBsaWJyYXJpZXMuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgTG9jYWxpemF0aW9uSGVscGVyID0gcmVxdWlyZSgnLi9saWIvTG9jYWxpemF0aW9uSGVscGVyJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHQvKipcblx0ICogUmVnaXN0ZXJzIGFsbCBsb2NhbGl6YXRpb24gY29tcG9uZW50cyBpbiBzZXJ2aWNlIGxvY2F0b3IuXG5cdCAqIEBwYXJhbSB7U2VydmljZUxvY2F0b3J9IGxvY2F0b3IgQ2F0YmVycnkncyBzZXJ2aWNlIGxvY2F0b3IuXG5cdCAqL1xuXHRyZWdpc3RlcjogZnVuY3Rpb24gKGxvY2F0b3IpIHtcblx0XHR2YXIgY29uZmlnID0gbG9jYXRvci5yZXNvbHZlKCdjb25maWcnKTtcblx0XHR0cnkge1xuXHRcdFx0dmFyIGhhbmRsZWJhcnMgPSBsb2NhdG9yLnJlc29sdmUoJ2hhbmRsZWJhcnMnKSxcblx0XHRcdFx0aGVscGVyID0gbG9jYXRvci5yZXNvbHZlSW5zdGFuY2UoTG9jYWxpemF0aW9uSGVscGVyLCBjb25maWcpO1xuXHRcdFx0aGFuZGxlYmFycy5yZWdpc3RlckhlbHBlcignbDEwbicsIGhlbHBlci5nZXRIYW5kbGViYXJzSGVscGVyKCkpO1xuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdC8vbm90aGluZyB0byBkby5cblx0XHR9XG5cdH1cbn07IiwiLypcbiAqIGNhdGJlcnJ5LWwxMG4taGFuZGxlYmFycy1oZWxwZXJcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUgRGVuaXMgUmVjaGt1bm92IGFuZCBwcm9qZWN0IGNvbnRyaWJ1dG9ycy5cbiAqXG4gKiBjYXRiZXJyeS1sMTBuLWhhbmRsZWJhcnMtaGVscGVyJ3MgbGljZW5zZSBmb2xsb3dzOlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXG4gKiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvblxuICogZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLFxuICogaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSxcbiAqIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsXG4gKiBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuICogc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbiAqIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1NcbiAqIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICpcbiAqIFRoaXMgbGljZW5zZSBhcHBsaWVzIHRvIGFsbCBwYXJ0cyBvZiBjYXRiZXJyeS1sMTBuLWhhbmRsZWJhcnMtaGVscGVyIHRoYXRcbiAqIGFyZSBub3QgZXh0ZXJuYWxseSBtYWludGFpbmVkIGxpYnJhcmllcy5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gTG9jYWxpemF0aW9uSGVscGVyO1xuXG4vKipcbiAqIENyZWF0ZXMgbmV3IGluc3RhbmNlIG9mIGxvY2FsaXphdGlvbiBoZWxwZXIuXG4gKiBAcGFyYW0ge0xvY2FsaXphdGlvblByb3ZpZGVyfSAkbG9jYWxpemF0aW9uUHJvdmlkZXIgTG9jYWxpemF0aW9uIHByb3ZpZGVyLlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIExvY2FsaXphdGlvbkhlbHBlcigkbG9jYWxpemF0aW9uUHJvdmlkZXIpIHtcblx0dGhpcy5fbG9jYWxpemF0aW9uUHJvdmlkZXIgPSAkbG9jYWxpemF0aW9uUHJvdmlkZXI7XG59XG5cbi8qKlxuICogQ3VycmVudCBsb2NhbGl6YXRpb24gcHJvdmlkZXIuXG4gKiBAdHlwZSB7TG9jYWxpemF0aW9uUHJvdmlkZXJ9XG4gKiBAcHJpdmF0ZVxuICovXG5Mb2NhbGl6YXRpb25IZWxwZXIucHJvdG90eXBlLl9sb2NhbGl6YXRpb25Qcm92aWRlciA9IG51bGw7XG5cbi8qKlxuICogR2V0cyBoYW5kbGViYXJzIGhlbHBlciBmb3IgbG9jYWxpemF0aW9uLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBIYW5kbGViYXJzIGhlbHBlciBmdW5jdGlvbi5cbiAqL1xuTG9jYWxpemF0aW9uSGVscGVyLnByb3RvdHlwZS5nZXRIYW5kbGViYXJzSGVscGVyID0gZnVuY3Rpb24gKCkge1xuXHRyZXR1cm4gZnVuY3Rpb24gKCkge1xuXHRcdHZhciBrZXkgPSBudWxsLFxuXHRcdFx0bG9jYWxlID0gbnVsbCxcblx0XHRcdGNvdW50ID0gbnVsbCxcblx0XHRcdG9wdGlvbnMgPSBhcmd1bWVudHNbYXJndW1lbnRzLmxlbmd0aCAtIDFdO1xuXG5cdFx0QXJyYXkucHJvdG90eXBlLmV2ZXJ5LmNhbGwoYXJndW1lbnRzLCBmdW5jdGlvbiAoYXJnKSB7XG5cdFx0XHRpZiAoIWtleSAmJiB0eXBlb2YoYXJnKSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdFx0a2V5ID0gYXJnO1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdGlmICghbG9jYWxlICYmIHR5cGVvZihhcmcpID09PSAnc3RyaW5nJykge1xuXHRcdFx0XHRsb2NhbGUgPSBhcmc7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCFjb3VudCAmJiB0eXBlb2YoYXJnKSA9PT0gJ251bWJlcicpIHtcblx0XHRcdFx0Y291bnQgPSBhcmc7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH0pO1xuXG5cdFx0aWYgKCFrZXkpIHtcblx0XHRcdHJldHVybiAnJztcblx0XHR9XG5cblx0XHRpZiAoIWxvY2FsZSkge1xuXHRcdFx0bG9jYWxlID0gb3B0aW9ucy5kYXRhLnJvb3QubG9jYWxlO1xuXHRcdH1cblxuXHRcdHZhciB2YWx1ZSA9ICcnO1xuXHRcdHRyeSB7XG5cdFx0XHR2YWx1ZSA9ICFpc05hTihjb3VudCkgP1xuXHRcdFx0XHR0aGlzLl9sb2NhbGl6YXRpb25Qcm92aWRlci5wbHVyYWxpemUobG9jYWxlLCBrZXksIGNvdW50KSA6XG5cdFx0XHRcdHRoaXMuX2xvY2FsaXphdGlvblByb3ZpZGVyLmdldChsb2NhbGUsIGtleSk7XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0Ly8gbm90aGluZyB0byBkb1xuXHRcdH1cblxuXHRcdHJldHVybiB2YWx1ZTtcblx0fS5iaW5kKHRoaXMpO1xufTsiLCIvKlxuICogY2F0YmVycnlcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgRGVuaXMgUmVjaGt1bm92IGFuZCBwcm9qZWN0IGNvbnRyaWJ1dG9ycy5cbiAqXG4gKiBjYXRiZXJyeSdzIGxpY2Vuc2UgZm9sbG93czpcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvblxuICogb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb25cbiAqIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbixcbiAqIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsXG4gKiBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLFxuICogYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbiAqIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4gKiBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4gKiBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG4gKiBTT0ZUV0FSRS5cbiAqXG4gKiBUaGlzIGxpY2Vuc2UgYXBwbGllcyB0byBhbGwgcGFydHMgb2YgY2F0YmVycnkgdGhhdCBhcmUgbm90IGV4dGVybmFsbHlcbiAqIG1haW50YWluZWQgbGlicmFyaWVzLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBMb2NhbGl6YXRpb25Mb2FkZXI7XG5cbi8qKlxuICogQ3JlYXRlcyBuZXcgaW5zdGFuY2Ugb2YgbG9jYWxpemF0aW9uIGxvYWRlci5cbiAqIEBwYXJhbSB7V2luZG93fSAkd2luZG93IGJyb3dzZXIgd2luZG93LlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIExvY2FsaXphdGlvbkxvYWRlcigkd2luZG93KSB7XG5cdHRoaXMuX2xvY2FsaXphdGlvbiA9ICR3aW5kb3cubG9jYWxpemF0aW9uICYmXG5cdFx0dHlwZW9mKCR3aW5kb3cubG9jYWxpemF0aW9uKSA9PT0gJ29iamVjdCcgPyAkd2luZG93LmxvY2FsaXphdGlvbiA6IHt9O1xufVxuXG4vKipcbiAqIEN1cnJlbnQgbG9jYWxpemF0aW9uLlxuICogQHR5cGUge09iamVjdH1cbiAqIEBwcml2YXRlXG4gKi9cbkxvY2FsaXphdGlvbkxvYWRlci5wcm90b3R5cGUuX2xvY2FsaXphdGlvbiA9IG51bGw7XG5cbi8qKlxuICogTG9hZHMgbG9jYWxpemF0aW9uIGJ5IGxvY2FsZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IE9iamVjdCB3aXRoIGxvY2FsaXphdGlvbi5cbiAqL1xuTG9jYWxpemF0aW9uTG9hZGVyLnByb3RvdHlwZS5sb2FkID0gZnVuY3Rpb24gKCkge1xuXHRyZXR1cm4gdGhpcy5fbG9jYWxpemF0aW9uO1xufTsiLCIvKlxuICogY2F0YmVycnlcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgRGVuaXMgUmVjaGt1bm92IGFuZCBwcm9qZWN0IGNvbnRyaWJ1dG9ycy5cbiAqXG4gKiBjYXRiZXJyeSdzIGxpY2Vuc2UgZm9sbG93czpcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvblxuICogb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb25cbiAqIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbixcbiAqIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsXG4gKiBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLFxuICogYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbiAqIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4gKiBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4gKiBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG4gKiBTT0ZUV0FSRS5cbiAqXG4gKiBUaGlzIGxpY2Vuc2UgYXBwbGllcyB0byBhbGwgcGFydHMgb2YgY2F0YmVycnkgdGhhdCBhcmUgbm90IGV4dGVybmFsbHlcbiAqIG1haW50YWluZWQgbGlicmFyaWVzLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIExvY2FsaXphdGlvblByb3ZpZGVyID0gcmVxdWlyZSgnLi9saWIvTG9jYWxpemF0aW9uUHJvdmlkZXInKSxcblx0TG9jYWxpemF0aW9uTG9hZGVyID0gcmVxdWlyZSgnLi9saWIvTG9jYWxpemF0aW9uTG9hZGVyJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHQvKipcblx0ICogUmVnaXN0ZXJzIGFsbCBsb2NhbGl6YXRpb24gY29tcG9uZW50cyBpbiBzZXJ2aWNlIGxvY2F0b3IuXG5cdCAqIEBwYXJhbSB7U2VydmljZUxvY2F0b3J9IGxvY2F0b3IgQ2F0YmVycnkncyBzZXJ2aWNlIGxvY2F0b3IuXG5cdCAqL1xuXHRyZWdpc3RlcjogZnVuY3Rpb24gKGxvY2F0b3IpIHtcblx0XHR2YXIgY29uZmlnID0gbG9jYXRvci5yZXNvbHZlKCdjb25maWcnKTtcblx0XHRsb2NhdG9yLnJlZ2lzdGVyKCdsb2NhbGl6YXRpb25Qcm92aWRlcicsXG5cdFx0XHRMb2NhbGl6YXRpb25Qcm92aWRlciwgY29uZmlnLCB0cnVlKTtcblx0XHRsb2NhdG9yLnJlZ2lzdGVyKCdsb2NhbGl6YXRpb25Mb2FkZXInLFxuXHRcdFx0TG9jYWxpemF0aW9uTG9hZGVyLCBjb25maWcsIHRydWUpO1xuXHR9LFxuXHRMb2NhbGl6YXRpb25Qcm92aWRlcjogTG9jYWxpemF0aW9uUHJvdmlkZXIsXG5cdExvY2FsaXphdGlvbkxvYWRlcjogTG9jYWxpemF0aW9uTG9hZGVyXG59OyIsIi8qXG4gKiBjYXRiZXJyeVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNCBEZW5pcyBSZWNoa3Vub3YgYW5kIHByb2plY3QgY29udHJpYnV0b3JzLlxuICpcbiAqIGNhdGJlcnJ5J3MgbGljZW5zZSBmb2xsb3dzOlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXG4gKiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvblxuICogZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLFxuICogaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSxcbiAqIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsXG4gKiBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuICogc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbiAqIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1NcbiAqIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiAqIFNPRlRXQVJFLlxuICpcbiAqIFRoaXMgbGljZW5zZSBhcHBsaWVzIHRvIGFsbCBwYXJ0cyBvZiBjYXRiZXJyeSB0aGF0IGFyZSBub3QgZXh0ZXJuYWxseVxuICogbWFpbnRhaW5lZCBsaWJyYXJpZXMuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IExvY2FsaXphdGlvblByb3ZpZGVyO1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWwnKTtcblxudmFyIERFRkFVTFRfTE9DQUxFX0NPT0tJRV9LRVkgPSAnbG9jYWxlJyxcblx0REVGQVVMVF9MT0NBTEVfQ09PS0lFX01BWF9BR0UgPSAzMTU1NjkyNjAwLCAvLyAxMDAgeWVhcnNcblx0TE9DQUxFX0NPT0tJRV9QQVRIID0gJy8nLFxuXHRMT0NBTEVfUkVHRVhQID0gL15bYS16XXsyfSgtW2Etel17Mn0pPyQvLFxuXHRFUlJPUl9MT0NBTEVfTkFNRSA9ICdXcm9uZyBsb2NhbGUgbmFtZSAlcyAoJyArXG5cdFx0TE9DQUxFX1JFR0VYUC50b1N0cmluZygpICsgJyknLFxuXHRFUlJPUl9MT0NBTElaQVRJT05fQ09ORklHID0gJ1wibDEwblwiIGNvbmZpZyBzZWN0aW9uIGlzIHJlcXVpcmVkJztcblxuLyoqXG4gKiBDcmVhdGVzIG5ldyBpbnN0YW5jZSBvZiBsb2NhbGl6YXRpb24gcHJvdmlkZXIuXG4gKiBAcGFyYW0ge0xvY2FsaXphdGlvbkxvYWRlcn0gJGxvY2FsaXphdGlvbkxvYWRlciBMb2NhbGl6YXRpb24gbG9hZGVyXG4gKiB0byBsb2FkIGxvY2FsZXMuXG4gKiBAcGFyYW0ge09iamVjdH0gbDEwbiBMb2NhbGl6YXRpb24gY29uZmlnLlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIExvY2FsaXphdGlvblByb3ZpZGVyKCRsb2NhbGl6YXRpb25Mb2FkZXIsIGwxMG4pIHtcblx0aWYgKCFsMTBuKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKEVSUk9SX0xPQ0FMSVpBVElPTl9DT05GSUcpO1xuXHR9XG5cdHRoaXMuX2RlZmF1bHRMb2NhbGUgPSBsMTBuLmRlZmF1bHRMb2NhbGUgP1xuXHRcdFN0cmluZyhsMTBuLmRlZmF1bHRMb2NhbGUpIDogJyc7XG5cdGlmICghTE9DQUxFX1JFR0VYUC50ZXN0KHRoaXMuX2RlZmF1bHRMb2NhbGUpKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKHV0aWwuZm9ybWF0KEVSUk9SX0xPQ0FMRV9OQU1FLCB0aGlzLl9kZWZhdWx0TG9jYWxlKSk7XG5cdH1cblxuXHRpZiAobDEwbi5jb29raWUgJiYgdHlwZW9mKGwxMG4uY29va2llKSA9PT0gJ29iamVjdCcpIHtcblx0XHR0aGlzLl9jb29raWVDb25maWcgPSBPYmplY3QuY3JlYXRlKGwxMG4uY29va2llKTtcblx0fSBlbHNlIHtcblx0XHR0aGlzLl9jb29raWVDb25maWcgPSB7fTtcblx0fVxuXG5cdGlmICh0eXBlb2YodGhpcy5fY29va2llQ29uZmlnLm5hbWUpICE9PSAnc3RyaW5nJyB8fFxuXHRcdHRoaXMuX2Nvb2tpZUNvbmZpZy5uYW1lLmxlbmd0aCA9PT0gMCkge1xuXHRcdHRoaXMuX2Nvb2tpZUNvbmZpZy5uYW1lID0gREVGQVVMVF9MT0NBTEVfQ09PS0lFX0tFWTtcblx0fVxuXG5cdGlmICh0eXBlb2YodGhpcy5fY29va2llQ29uZmlnLm1heEFnZSkgIT09ICdudW1iZXInKSB7XG5cdFx0dGhpcy5fY29va2llQ29uZmlnLm1heEFnZSA9IERFRkFVTFRfTE9DQUxFX0NPT0tJRV9NQVhfQUdFO1xuXHR9XG5cblx0aWYgKHR5cGVvZih0aGlzLl9jb29raWVDb25maWcucGF0aCkgIT09ICdzdHJpbmcnIHx8XG5cdFx0dGhpcy5fY29va2llQ29uZmlnLnBhdGgubGVuZ3RoID09PSAwKSB7XG5cdFx0dGhpcy5fY29va2llQ29uZmlnLnBhdGggPSBMT0NBTEVfQ09PS0lFX1BBVEg7XG5cdH1cblxuXHR0aGlzLl9sb2FkZXIgPSAkbG9jYWxpemF0aW9uTG9hZGVyO1xuXHR0aGlzLl9wbHVyYWxpemF0aW9uUnVsZXNDYWNoZSA9IHt9O1xufVxuXG4vKipcbiAqIEN1cnJlbnQgY29va2llIGNvbmZpZ3VyYXRpb24uXG4gKiBAdHlwZSB7T2JqZWN0fVxuICogQHByaXZhdGVcbiAqL1xuTG9jYWxpemF0aW9uUHJvdmlkZXIucHJvdG90eXBlLl9jb29raWVDb25maWcgPSBudWxsO1xuXG4vKipcbiAqIEN1cnJlbnQgbG9jYWxpemF0aW9uIGxvYWRlci5cbiAqIEB0eXBlIHtMb2NhbGl6YXRpb25Mb2FkZXJ9XG4gKiBAcHJpdmF0ZVxuICovXG5Mb2NhbGl6YXRpb25Qcm92aWRlci5wcm90b3R5cGUuX2xvYWRlciA9IG51bGw7XG5cbi8qKlxuICogQ3VycmVudCBjYWNoZSBvZiBwbHVyYWxpemF0aW9uIGZ1bmN0aW9ucy5cbiAqIEB0eXBlIHtPYmplY3R9XG4gKiBAcHJpdmF0ZVxuICovXG5Mb2NhbGl6YXRpb25Qcm92aWRlci5wcm90b3R5cGUuX3BsdXJhbGl6YXRpb25SdWxlc0NhY2hlID0gbnVsbDtcblxuLyoqXG4gKiBHZXRzIGN1cnJlbnQgbG9jYWxlIHZhbHVlIGZyb20gY29udGV4dC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb250ZXh0IENvbXBvbmVudCBjb250ZXh0LlxuICovXG5Mb2NhbGl6YXRpb25Qcm92aWRlci5wcm90b3R5cGUuZ2V0Q3VycmVudExvY2FsZSA9IGZ1bmN0aW9uIChjb250ZXh0KSB7XG5cdHJldHVybiBjb250ZXh0LmNvb2tpZS5nZXQodGhpcy5fY29va2llQ29uZmlnLm5hbWUpIHx8IHRoaXMuX2RlZmF1bHRMb2NhbGU7XG59O1xuXG4vKipcbiAqIENoYW5nZXMgY3VycmVudCBsb2NhbGUgdmFsdWUuXG4gKiBAcGFyYW0ge3N0cmluZ30gbG9jYWxlIExvY2FsZSBuYW1lIChpLmUuIGVuLCBlbi11cywgcnUgZXRjKS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb250ZXh0IENvbXBvbmVudCBjb250ZXh0LlxuICovXG5Mb2NhbGl6YXRpb25Qcm92aWRlci5wcm90b3R5cGUuY2hhbmdlTG9jYWxlID0gZnVuY3Rpb24gKGxvY2FsZSwgY29udGV4dCkge1xuXHR2YXIgZXhwaXJlRGF0ZSA9IG5ldyBEYXRlKChuZXcgRGF0ZSgpKS5nZXRUaW1lKCkgK1xuXHRcdFx0dGhpcy5fY29va2llQ29uZmlnLm1heEFnZSAqIDEwMDApO1xuXG5cdHRoaXMuX2Nvb2tpZUNvbmZpZy5rZXkgPSB0aGlzLl9jb29raWVDb25maWcubmFtZTtcblx0dGhpcy5fY29va2llQ29uZmlnLnZhbHVlID0gbG9jYWxlO1xuXHR0aGlzLl9jb29raWVDb25maWcuZXhwaXJlcyA9IGV4cGlyZURhdGU7XG5cdGNvbnRleHQuY29va2llLnNldCh0aGlzLl9jb29raWVDb25maWcpO1xuXG5cdGlmKGNvbnRleHQuaXNCcm93c2VyKSB7XG5cdFx0dmFyIHdpbmRvdyA9IGNvbnRleHQubG9jYXRvci5yZXNvbHZlKCd3aW5kb3cnKTtcblx0XHR3aW5kb3cuZG9jdW1lbnQubG9jYXRpb24ucmVsb2FkKCk7XG5cdH0gZWxzZSB7XG5cdFx0Y29udGV4dC5yZWRpcmVjdChjb250ZXh0LmxvY2F0aW9uLnRvU3RyaW5nKCkpO1xuXHR9XG59O1xuXG4vKipcbiAqIEdldHMgbG9jYWxpemVkIHZhbHVlIGZvciBzcGVjaWZpZWQgbG9jYWxlIGFuZCBrZXkgbmFtZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbGUgTG9jYWxlIG5hbWUgKGkuZS4gRU4sIFJVIGV0YykuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IExvY2FsaXphdGlvbiBrZXkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBMb2NhbGl6ZWQgdmFsdWUuXG4gKi9cbkxvY2FsaXphdGlvblByb3ZpZGVyLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAobG9jYWxlLCBrZXkpIHtcblx0dmFyIHZhbHVlID0gdGhpcy5fbG9hZGVyLmxvYWQobG9jYWxlKVtrZXldO1xuXHRpZiAodmFsdWUgaW5zdGFuY2VvZiBBcnJheSkge1xuXHRcdHZhbHVlID0gdmFsdWVbMF07XG5cdH1cblxuXHRyZXR1cm4gU3RyaW5nKHZhbHVlIHx8ICcnKTtcbn07XG5cbi8qKlxuICogR2V0cyBKYXZhU2NyaXB0IGZ1bmN0aW9uIGZvciBwbHVyYWxpemF0aW9uIHJ1bGUuXG4gKiBAcGFyYW0ge3N0cmluZ30gcnVsZSBQbHVyYWxpemF0aW9uIHJ1bGUuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFBsdXJhbGl6YXRpb24gcnVsZSBhcyBKYXZhU2NyaXB0IGZ1bmN0aW9uLlxuICogQHByaXZhdGVcbiAqL1xuTG9jYWxpemF0aW9uUHJvdmlkZXIucHJvdG90eXBlLl9nZXRQbHVyYWxpemF0aW9uUnVsZUZ1bmN0aW9uID0gZnVuY3Rpb24gKHJ1bGUpIHtcblx0aWYgKCEocnVsZSBpbiAgdGhpcy5fcGx1cmFsaXphdGlvblJ1bGVzQ2FjaGUpKSB7XG5cdFx0Lypqc2hpbnQgZXZpbDp0cnVlICovXG5cdFx0dGhpcy5fcGx1cmFsaXphdGlvblJ1bGVzQ2FjaGVbcnVsZV0gPSBuZXcgRnVuY3Rpb24oJ24nLCAncGx1cmFsRm9ybXMnLFxuXHRcdFx0J3ZhciBpbmRleCA9IE51bWJlcignICsgcnVsZSArXG5cdFx0XHQnKTsgcmV0dXJuIFN0cmluZyhwbHVyYWxGb3Jtc1tpbmRleF0gfHwgXFwnXFwnKTsnKTtcblx0fVxuXHRyZXR1cm4gdGhpcy5fcGx1cmFsaXphdGlvblJ1bGVzQ2FjaGVbcnVsZV07XG59O1xuXG4vKipcbiAqIFBsdXJhbGl6ZXMgbG9jYWxpemF0aW9uIGNvbnN0YW50IGZvcm1zIGJ5IHNwZWNpZmllZCBrZXkuXG4gKiBAcGFyYW0ge3N0cmluZ30gbG9jYWxlIExvY2FsZSBuYW1lLlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBMb2NhbGl6YXRpb24ga2V5LlxuICogQHBhcmFtIHtudW1iZXJ9IG4gTnVtYmVyIHRvIGRldGVybWluZSBwbHVyYWwgZm9ybS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IENvcnJlY3QgcGx1cmFsIGZvcm0uXG4gKi9cbkxvY2FsaXphdGlvblByb3ZpZGVyLnByb3RvdHlwZS5wbHVyYWxpemUgPSBmdW5jdGlvbiAobG9jYWxlLCBrZXksIG4pIHtcblx0dmFyIGxvY2FsZU9iamVjdCA9IHRoaXMuX2xvYWRlci5sb2FkKGxvY2FsZSksXG5cdFx0Zm9ybXMgPSBsb2NhbGVPYmplY3Rba2V5XTtcblxuXHRpZiAoIShmb3JtcyBpbnN0YW5jZW9mIEFycmF5KSkge1xuXHRcdHJldHVybiBTdHJpbmcoZm9ybXMgfHwgJycpO1xuXHR9XG5cblx0dmFyIHJ1bGUgPSB0eXBlb2YobG9jYWxlT2JqZWN0LiRwbHVyYWxpemF0aW9uLmZyb21EZWZhdWx0TG9jYWxlKSA9PT1cblx0XHQnb2JqZWN0JyAmJlxuXHRcdChrZXkgaW4gbG9jYWxlT2JqZWN0LiRwbHVyYWxpemF0aW9uLmZyb21EZWZhdWx0TG9jYWxlKSA/XG5cdFx0XHRsb2NhbGVPYmplY3QuJHBsdXJhbGl6YXRpb24uZGVmYXVsdFJ1bGUgOlxuXHRcdFx0bG9jYWxlT2JqZWN0LiRwbHVyYWxpemF0aW9uLnJ1bGUsXG5cdFx0cnVsZUZ1bmN0aW9uID0gdGhpcy5fZ2V0UGx1cmFsaXphdGlvblJ1bGVGdW5jdGlvbihydWxlIHx8ICcnKTtcblx0cmV0dXJuIHJ1bGVGdW5jdGlvbihuLCBmb3Jtcyk7XG59OyIsIi8qXG4gKiBjYXRiZXJyeVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNCBEZW5pcyBSZWNoa3Vub3YgYW5kIHByb2plY3QgY29udHJpYnV0b3JzLlxuICpcbiAqIGNhdGJlcnJ5J3MgbGljZW5zZSBmb2xsb3dzOlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXG4gKiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvblxuICogZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLFxuICogaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSxcbiAqIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsXG4gKiBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuICogc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbiAqIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1NcbiAqIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICpcbiAqIFRoaXMgbGljZW5zZSBhcHBsaWVzIHRvIGFsbCBwYXJ0cyBvZiBjYXRiZXJyeSB0aGF0IGFyZSBub3QgZXh0ZXJuYWxseVxuICogbWFpbnRhaW5lZCBsaWJyYXJpZXMuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhdGJlcnJ5O1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWwnKSxcblx0Q2F0YmVycnlCYXNlID0gcmVxdWlyZSgnLi4vbGliL2Jhc2UvQ2F0YmVycnlCYXNlJyk7XG5cbnV0aWwuaW5oZXJpdHMoQ2F0YmVycnksIENhdGJlcnJ5QmFzZSk7XG5cbi8qKlxuICogQ3JlYXRlcyBuZXcgaW5zdGFuY2Ugb2YgdGhlIGJyb3dzZXIgdmVyc2lvbiBvZiBDYXRiZXJyeS5cbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgQ2F0YmVycnlCYXNlXG4gKi9cbmZ1bmN0aW9uIENhdGJlcnJ5KCkge1xuXHRDYXRiZXJyeUJhc2UuY2FsbCh0aGlzKTtcbn1cblxuLyoqXG4gKiBDdXJyZW50IHJlcXVlc3Qgcm91dGVyLlxuICogQHR5cGUge1JlcXVlc3RSb3V0ZXJ9XG4gKiBAcHJpdmF0ZVxuICovXG5DYXRiZXJyeS5wcm90b3R5cGUuX3JvdXRlciA9IG51bGw7XG5cbi8qKlxuICogV3JhcHMgY3VycmVudCBIVE1MIGRvY3VtZW50IHdpdGggQ2F0YmVycnkgZXZlbnQgaGFuZGxlcnMuXG4gKi9cbkNhdGJlcnJ5LnByb3RvdHlwZS53cmFwRG9jdW1lbnQgPSBmdW5jdGlvbiAoKSB7XG5cdHRoaXMuX3JvdXRlciA9IHRoaXMubG9jYXRvci5yZXNvbHZlKCdyZXF1ZXN0Um91dGVyJyk7XG59O1xuXG4vKipcbiAqIFN0YXJ0cyBDYXRiZXJyeSBhcHBsaWNhdGlvbiB3aGVuIERPTSBpcyByZWFkeS5cbiAqIEByZXR1cm5zIHtQcm9taXNlfSBQcm9taXNlIGZvciBub3RoaW5nLlxuICovXG5DYXRiZXJyeS5wcm90b3R5cGUuc3RhcnRXaGVuUmVhZHkgPSBmdW5jdGlvbiAoKSB7XG5cdGlmICh3aW5kb3cuY2F0YmVycnkpIHtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG5cdH1cblx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoZnVsZmlsbCkge1xuXHRcdHdpbmRvdy5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0c2VsZi53cmFwRG9jdW1lbnQoKTtcblx0XHRcdHdpbmRvdy5jYXRiZXJyeSA9IHNlbGY7XG5cdFx0XHRmdWxmaWxsKCk7XG5cdFx0fSk7XG5cdH0pO1xufTsiLCIvKlxuICogY2F0YmVycnlcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgRGVuaXMgUmVjaGt1bm92IGFuZCBwcm9qZWN0IGNvbnRyaWJ1dG9ycy5cbiAqXG4gKiBjYXRiZXJyeSdzIGxpY2Vuc2UgZm9sbG93czpcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvblxuICogb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb25cbiAqIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbixcbiAqIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsXG4gKiBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLFxuICogYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbiAqIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4gKiBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4gKiBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqXG4gKiBUaGlzIGxpY2Vuc2UgYXBwbGllcyB0byBhbGwgcGFydHMgb2YgY2F0YmVycnkgdGhhdCBhcmUgbm90IGV4dGVybmFsbHlcbiAqIG1haW50YWluZWQgbGlicmFyaWVzLlxuICovXG5cbid1c2Ugc3RyaWN0Jztcbm1vZHVsZS5leHBvcnRzID0gQ29va2llV3JhcHBlcjtcblxudmFyIHV0aWwgPSByZXF1aXJlKCd1dGlsJyksXG5cdENvb2tpZVdyYXBwZXJCYXNlID0gcmVxdWlyZSgnLi4vbGliL2Jhc2UvQ29va2llV3JhcHBlckJhc2UnKTtcblxudXRpbC5pbmhlcml0cyhDb29raWVXcmFwcGVyLCBDb29raWVXcmFwcGVyQmFzZSk7XG5cbi8qKlxuICogQ3JlYXRlcyBuZXcgaW5zdGFuY2Ugb2YgdGhlIGJyb3dzZXIgY29va2llIHdyYXBwZXIuXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gQ29va2llV3JhcHBlcigkd2luZG93KSB7XG5cdENvb2tpZVdyYXBwZXJCYXNlLmNhbGwodGhpcyk7XG5cdHRoaXMuX3dpbmRvdyA9ICR3aW5kb3c7XG59XG5cbi8qKlxuICogQ3VycmVudCBicm93c2VyIHdpbmRvdy5cbiAqIEB0eXBlIHtXaW5kb3d9XG4gKiBAcHJpdmF0ZVxuICovXG5Db29raWVXcmFwcGVyLnByb3RvdHlwZS5fd2luZG93ID0gbnVsbDtcblxuLyoqXG4gKiBHZXRzIGN1cnJlbnQgY29va2llIHN0cmluZy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IENvb2tpZSBzdHJpbmcuXG4gKi9cbkNvb2tpZVdyYXBwZXIucHJvdG90eXBlLmdldENvb2tpZVN0cmluZyA9IGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuIHRoaXMuX3dpbmRvdy5kb2N1bWVudC5jb29raWUgP1xuXHRcdHRoaXMuX3dpbmRvdy5kb2N1bWVudC5jb29raWUudG9TdHJpbmcoKSA6XG5cdFx0Jyc7XG59O1xuXG4vKipcbiAqIFNldHMgY29va2llIHRvIHRoaXMgd3JhcHBlci5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb29raWVTZXR1cCBDb29raWUgc2V0dXAgb2JqZWN0LlxuICogQHBhcmFtIHtzdHJpbmd9IGNvb2tpZVNldHVwLmtleSBDb29raWUga2V5LlxuICogQHBhcmFtIHtzdHJpbmd9IGNvb2tpZVNldHVwLnZhbHVlIENvb2tpZSB2YWx1ZS5cbiAqIEBwYXJhbSB7bnVtYmVyP30gY29va2llU2V0dXAubWF4QWdlIE1heCBjb29raWUgYWdlIGluIHNlY29uZHMuXG4gKiBAcGFyYW0ge0RhdGU/fSBjb29raWVTZXR1cC5leHBpcmVzIEV4cGlyZSBkYXRlLlxuICogQHBhcmFtIHtzdHJpbmc/fSBjb29raWVTZXR1cC5wYXRoIFVSSSBwYXRoIGZvciBjb29raWUuXG4gKiBAcGFyYW0ge3N0cmluZz99IGNvb2tpZVNldHVwLmRvbWFpbiBDb29raWUgZG9tYWluLlxuICogQHBhcmFtIHtib29sZWFuP30gY29va2llU2V0dXAuc2VjdXJlIElzIGNvb2tpZSBzZWN1cmVkLlxuICogQHBhcmFtIHtib29sZWFuP30gY29va2llU2V0dXAuaHR0cE9ubHkgSXMgY29va2llIEhUVFAgb25seS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IENvb2tpZSBzZXR1cCBzdHJpbmcuXG4gKi9cbkNvb2tpZVdyYXBwZXIucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIChjb29raWVTZXR1cCkge1xuXHR2YXIgY29va2llID0gdGhpcy5fY29udmVydFRvQ29va2llU2V0dXAoY29va2llU2V0dXApO1xuXHR0aGlzLl93aW5kb3cuZG9jdW1lbnQuY29va2llID0gY29va2llO1xuXHRyZXR1cm4gY29va2llO1xufTsiLCIvKlxuICogY2F0YmVycnlcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUgRGVuaXMgUmVjaGt1bm92IGFuZCBwcm9qZWN0IGNvbnRyaWJ1dG9ycy5cbiAqXG4gKiBjYXRiZXJyeSdzIGxpY2Vuc2UgZm9sbG93czpcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvblxuICogb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb25cbiAqIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbixcbiAqIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsXG4gKiBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLFxuICogYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbiAqIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4gKiBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4gKiBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqXG4gKiBUaGlzIGxpY2Vuc2UgYXBwbGllcyB0byBhbGwgcGFydHMgb2YgY2F0YmVycnkgdGhhdCBhcmUgbm90IGV4dGVybmFsbHlcbiAqIG1haW50YWluZWQgbGlicmFyaWVzLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBEb2N1bWVudFJlbmRlcmVyO1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWwnKSxcblx0ZXJyb3JIZWxwZXIgPSByZXF1aXJlKCcuLi9saWIvaGVscGVycy9lcnJvckhlbHBlcicpLFxuXHRtb2R1bGVIZWxwZXIgPSByZXF1aXJlKCcuLi9saWIvaGVscGVycy9tb2R1bGVIZWxwZXInKSxcblx0RG9jdW1lbnRSZW5kZXJlckJhc2UgPSByZXF1aXJlKCcuLi9saWIvYmFzZS9Eb2N1bWVudFJlbmRlcmVyQmFzZScpO1xuXG51dGlsLmluaGVyaXRzKERvY3VtZW50UmVuZGVyZXIsIERvY3VtZW50UmVuZGVyZXJCYXNlKTtcblxudmFyIFNQRUNJQUxfSURTID0ge1xuXHRcdCQkaGVhZDogJyQkaGVhZCcsXG5cdFx0JCRkb2N1bWVudDogJyQkZG9jdW1lbnQnXG5cdH0sXG5cdEVSUk9SX0NSRUFURV9XUk9OR19BUkdVTUVOVFMgPSAnVGFnIG5hbWUgc2hvdWxkIGJlIGEgc3RyaW5nICcgK1xuXHRcdCdhbmQgYXR0cmlidXRlcyBzaG91bGQgYmUgYW4gb2JqZWN0Jyxcblx0RVJST1JfQ1JFQVRFX1dST05HX05BTUUgPSAnQ29tcG9uZW50IGZvciB0YWcgXCIlc1wiIG5vdCBmb3VuZCcsXG5cdEVSUk9SX0NSRUFURV9XUk9OR19JRCA9ICdUaGUgSUQgaXMgbm90IHNwZWNpZmllZCBvciBhbHJlYWR5IHVzZWQnLFxuXHRUQUdfTkFNRVMgPSB7XG5cdFx0VElUTEU6ICdUSVRMRScsXG5cdFx0SFRNTDogJ0hUTUwnLFxuXHRcdEhFQUQ6ICdIRUFEJyxcblx0XHRCQVNFOiAnQkFTRScsXG5cdFx0U1RZTEU6ICdTVFlMRScsXG5cdFx0U0NSSVBUOiAnU0NSSVBUJyxcblx0XHROT1NDUklQVDogJ05PU0NSSVBUJyxcblx0XHRNRVRBOiAnTUVUQScsXG5cdFx0TElOSzogJ0xJTksnXG5cdH0sXG5cdE5PREVfVFlQRVMgPSB7XG5cdFx0RUxFTUVOVF9OT0RFOiAxLFxuXHRcdFRFWFRfTk9ERTogMyxcblx0XHRQUk9DRVNTSU5HX0lOU1RSVUNUSU9OX05PREU6IDcsXG5cdFx0Q09NTUVOVF9OT0RFOiA4XG5cdH0sXG5cdC8vIGh0dHA6Ly93d3cudzMub3JnL1RSLzIwMTUvV0QtdWlldmVudHMtMjAxNTAzMTkvI2V2ZW50LXR5cGVzLWxpc3Rcblx0Tk9OX0JVQkJMSU5HX0VWRU5UUyA9IHtcblx0XHRhYm9ydDogdHJ1ZSxcblx0XHRibHVyOiB0cnVlLFxuXHRcdGVycm9yOiB0cnVlLFxuXHRcdGZvY3VzOiB0cnVlLFxuXHRcdGxvYWQ6IHRydWUsXG5cdFx0bW91c2VlbnRlcjogdHJ1ZSxcblx0XHRtb3VzZWxlYXZlOiB0cnVlLFxuXHRcdHJlc2l6ZTogdHJ1ZSxcblx0XHR1bmxvYWQ6IHRydWVcblx0fTtcblxuLyoqXG4gKiBDcmVhdGVzIG5ldyBpbnN0YW5jZSBvZiB0aGUgZG9jdW1lbnQgcmVuZGVyZXIuXG4gKiBAcGFyYW0ge1NlcnZpY2VMb2NhdG9yfSAkc2VydmljZUxvY2F0b3IgTG9jYXRvciB0byByZXNvbHZlIGRlcGVuZGVuY2llcy5cbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgRG9jdW1lbnRSZW5kZXJlckJhc2VcbiAqL1xuZnVuY3Rpb24gRG9jdW1lbnRSZW5kZXJlcigkc2VydmljZUxvY2F0b3IpIHtcblx0RG9jdW1lbnRSZW5kZXJlckJhc2UuY2FsbCh0aGlzLCAkc2VydmljZUxvY2F0b3IpO1xuXHR0aGlzLl9jb21wb25lbnRJbnN0YW5jZXMgPSB7fTtcblx0dGhpcy5fY29tcG9uZW50RWxlbWVudHMgPSB7fTtcblx0dGhpcy5fY29tcG9uZW50QmluZGluZ3MgPSB7fTtcblx0dGhpcy5fY3VycmVudENoYW5nZWRTdG9yZXMgPSB7fTtcblx0dGhpcy5fd2luZG93ID0gJHNlcnZpY2VMb2NhdG9yLnJlc29sdmUoJ3dpbmRvdycpO1xuXHR0aGlzLl9jb25maWcgPSAkc2VydmljZUxvY2F0b3IucmVzb2x2ZSgnY29uZmlnJyk7XG5cdHRoaXMuX3N0b3JlRGlzcGF0Y2hlciA9ICRzZXJ2aWNlTG9jYXRvci5yZXNvbHZlKCdzdG9yZURpc3BhdGNoZXInKTtcblxuXHR2YXIgc2VsZiA9IHRoaXM7XG5cblx0dGhpcy5fZXZlbnRCdXMub24oJ3N0b3JlQ2hhbmdlZCcsIGZ1bmN0aW9uIChzdG9yZU5hbWUpIHtcblx0XHRzZWxmLl9jdXJyZW50Q2hhbmdlZFN0b3Jlc1tzdG9yZU5hbWVdID0gdHJ1ZTtcblx0XHRpZiAoc2VsZi5faXNTdGF0ZUNoYW5naW5nKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdHNlbGYuX3VwZGF0ZVN0b3JlQ29tcG9uZW50cygpO1xuXHR9KTtcbn1cblxuLyoqXG4gKiBDdXJyZW50IGFwcGxpY2F0aW9uIGNvbmZpZy5cbiAqIEB0eXBlIHtPYmplY3R9XG4gKiBAcHJpdmF0ZVxuICovXG5Eb2N1bWVudFJlbmRlcmVyLnByb3RvdHlwZS5fY29uZmlnID0gbnVsbDtcblxuLyoqXG4gKiBDdXJyZW50IHN0b3JlIGRpc3BhdGNoZXIuXG4gKiBAdHlwZSB7U3RvcmVEaXNwYXRjaGVyfVxuICogQHByb3RlY3RlZFxuICovXG5Eb2N1bWVudFJlbmRlcmVyLnByb3RvdHlwZS5fc3RvcmVEaXNwYXRjaGVyID0gbnVsbDtcblxuLyoqXG4gKiBDdXJyZW50IHNldCBvZiBjb21wb25lbnQgaW5zdGFuY2VzIGJ5IHVuaXF1ZSBrZXlzLlxuICogQHR5cGUge09iamVjdH1cbiAqIEBwcml2YXRlXG4gKi9cbkRvY3VtZW50UmVuZGVyZXIucHJvdG90eXBlLl9jb21wb25lbnRJbnN0YW5jZXMgPSBudWxsO1xuXG4vKipcbiAqIEN1cnJlbnQgc2V0IG9mIGNvbXBvbmVudCBlbGVtZW50cyBieSB1bmlxdWUga2V5cy5cbiAqIEB0eXBlIHtPYmplY3R9XG4gKiBAcHJpdmF0ZVxuICovXG5Eb2N1bWVudFJlbmRlcmVyLnByb3RvdHlwZS5fY29tcG9uZW50RWxlbWVudHMgPSBudWxsO1xuXG4vKipcbiAqIEN1cnJlbnQgc2V0IG9mIGNvbXBvbmVudCBiaW5kaW5ncyBieSB1bmlxdWUga2V5cy5cbiAqIEB0eXBlIHtPYmplY3R9XG4gKiBAcHJpdmF0ZVxuICovXG5Eb2N1bWVudFJlbmRlcmVyLnByb3RvdHlwZS5fY29tcG9uZW50QmluZGluZ3MgPSBudWxsO1xuXG4vKipcbiAqIEN1cnJlbnQgcm91dGluZyBjb250ZXh0LlxuICogQHR5cGUge09iamVjdH1cbiAqIEBwcml2YXRlXG4gKi9cbkRvY3VtZW50UmVuZGVyZXIucHJvdG90eXBlLl9jdXJyZW50Um91dGluZ0NvbnRleHQgPSBudWxsO1xuXG4vKipcbiAqIEN1cnJlbnQgc2V0IG9mIGNoYW5nZWQgc3RvcmVzLlxuICogQHR5cGUge09iamVjdH1cbiAqIEBwcml2YXRlXG4gKi9cbkRvY3VtZW50UmVuZGVyZXIucHJvdG90eXBlLl9jdXJyZW50Q2hhbmdlZFN0b3JlcyA9IG51bGw7XG5cbi8qKlxuICogQ3VycmVudCBwcm9taXNlIGZvciByZW5kZXJlZCBwYWdlLlxuICogQHR5cGUge1Byb21pc2V9XG4gKiBAcHJpdmF0ZVxuICovXG5Eb2N1bWVudFJlbmRlcmVyLnByb3RvdHlwZS5fcmVuZGVyZWRQcm9taXNlID0gbnVsbDtcblxuLyoqXG4gKiBDdXJyZW50IHN0YXRlIG9mIHVwZGF0aW5nIGNvbXBvbmVudHMuXG4gKiBAdHlwZSB7Ym9vbGVhbn1cbiAqIEBwcml2YXRlXG4gKi9cbkRvY3VtZW50UmVuZGVyZXIucHJvdG90eXBlLl9pc1VwZGF0aW5nID0gZmFsc2U7XG5cbi8qKlxuICogQ3VycmVudCBhd2FpdGluZyByb3V0aW5nLlxuICogQHR5cGUge3tzdGF0ZTogT2JqZWN0LCByb3V0aW5nQ29udGV4dDogT2JqZWN0fX1cbiAqIEBwcml2YXRlXG4gKi9cbkRvY3VtZW50UmVuZGVyZXIucHJvdG90eXBlLl9hd2FpdGluZ1JvdXRpbmcgPSBudWxsO1xuXG4vKipcbiAqIFNldHMgdGhlIGluaXRpYWwgc3RhdGUgb2YgdGhlIGFwcGxpY2F0aW9uLlxuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlIE5ldyBzdGF0ZSBvZiBhcHBsaWNhdGlvbi5cbiAqIEBwYXJhbSB7T2JqZWN0fSByb3V0aW5nQ29udGV4dCBSb3V0aW5nIGNvbnRleHQuXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gUHJvbWlzZSBmb3Igbm90aGluZy5cbiAqL1xuRG9jdW1lbnRSZW5kZXJlci5wcm90b3R5cGUuaW5pdFdpdGhTdGF0ZSA9IGZ1bmN0aW9uIChzdGF0ZSwgcm91dGluZ0NvbnRleHQpIHtcblx0dmFyIHNlbGYgPSB0aGlzO1xuXHRyZXR1cm4gc2VsZi5fZ2V0UHJvbWlzZUZvclJlYWR5U3RhdGUoKVxuXHRcdC50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdHNlbGYuX2N1cnJlbnRSb3V0aW5nQ29udGV4dCA9IHJvdXRpbmdDb250ZXh0O1xuXHRcdFx0cmV0dXJuIHNlbGYuX3N0b3JlRGlzcGF0Y2hlci5zZXRTdGF0ZShzdGF0ZSwgcm91dGluZ0NvbnRleHQpO1xuXHRcdH0pXG5cdFx0LnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIHNlbGYuX2luaXRpYWxXcmFwKCk7XG5cdFx0fSk7XG59O1xuXG4vKipcbiAqIFJlbmRlcnMgbmV3IHN0YXRlIG9mIGFwcGxpY2F0aW9uLlxuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlIE5ldyBzdGF0ZSBvZiBhcHBsaWNhdGlvbi5cbiAqIEBwYXJhbSB7T2JqZWN0fSByb3V0aW5nQ29udGV4dCBSb3V0aW5nIGNvbnRleHQuXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gUHJvbWlzZSBmb3Igbm90aGluZy5cbiAqL1xuRG9jdW1lbnRSZW5kZXJlci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKHN0YXRlLCByb3V0aW5nQ29udGV4dCkge1xuXHR0aGlzLl9hd2FpdGluZ1JvdXRpbmcgPSB7XG5cdFx0c3RhdGU6IHN0YXRlLFxuXHRcdHJvdXRpbmdDb250ZXh0OiByb3V0aW5nQ29udGV4dFxuXHR9O1xuXHRpZiAodGhpcy5faXNTdGF0ZUNoYW5naW5nKSB7XG5cdFx0cmV0dXJuIHRoaXMuX3JlbmRlcmVkUHJvbWlzZTtcblx0fVxuXG5cdC8vIHdlIHNob3VsZCBzZXQgdGhpcyBmbGFnIHRvIGF2b2lkIFwic3RvcmVDaGFuZ2VkXCJcblx0Ly8gZXZlbnQgaGFuZGxpbmcgZm9yIG5vd1xuXHR0aGlzLl9pc1N0YXRlQ2hhbmdpbmcgPSB0cnVlO1xuXG5cdHZhciBzZWxmID0gdGhpcztcblx0c2VsZi5fcmVuZGVyZWRQcm9taXNlID0gdGhpcy5fZ2V0UHJvbWlzZUZvclJlYWR5U3RhdGUoKVxuXHRcdC50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdC8vIGFuZCB0aGVuIHdlIHVwZGF0ZSBhbGwgY29tcG9uZW50cyBvZiB0aGVzZSBzdG9yZXMgaW4gYSBiYXRjaC5cblx0XHRcdHJldHVybiBzZWxmLl91cGRhdGVTdG9yZUNvbXBvbmVudHMoKTtcblx0XHR9KVxuXHRcdC5jYXRjaChmdW5jdGlvbiAocmVhc29uKSB7XG5cdFx0XHRzZWxmLl9ldmVudEJ1cy5lbWl0KCdlcnJvcicsIHJlYXNvbik7XG5cdFx0fSlcblx0XHQudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRzZWxmLl9pc1N0YXRlQ2hhbmdpbmcgPSBmYWxzZTtcblx0XHR9KTtcblxuXHRyZXR1cm4gdGhpcy5fcmVuZGVyZWRQcm9taXNlO1xufTtcblxuLyoqXG4gKiBSZW5kZXJzIGNvbXBvbmVudCBpbnRvIEhUTUwgZWxlbWVudC5cbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCBIVE1MIGVsZW1lbnQgb2YgY29tcG9uZW50XG4gKiBAcGFyYW0ge09iamVjdD99IHJlbmRlcmluZ0NvbnRleHQgUmVuZGVyaW5nIGNvbnRleHQgZm9yIGdyb3VwIHJlbmRlcmluZy5cbiAqL1xuRG9jdW1lbnRSZW5kZXJlci5wcm90b3R5cGUucmVuZGVyQ29tcG9uZW50ID1cblx0ZnVuY3Rpb24gKGVsZW1lbnQsIHJlbmRlcmluZ0NvbnRleHQpIHtcblx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cdFx0cmV0dXJuIHRoaXMuX2dldFByb21pc2VGb3JSZWFkeVN0YXRlKClcblx0XHRcdC50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0cmVuZGVyaW5nQ29udGV4dCA9IHJlbmRlcmluZ0NvbnRleHQgfHxcblx0XHRcdFx0XHRzZWxmLl9jcmVhdGVSZW5kZXJpbmdDb250ZXh0KFtdKTtcblxuXHRcdFx0XHR2YXIgY29tcG9uZW50TmFtZSA9IG1vZHVsZUhlbHBlci5nZXRPcmlnaW5hbENvbXBvbmVudE5hbWUoXG5cdFx0XHRcdFx0XHRlbGVtZW50LnRhZ05hbWVcblx0XHRcdFx0XHQpLFxuXHRcdFx0XHRcdGhhZENoaWxkcmVuID0gZWxlbWVudC5oYXNDaGlsZE5vZGVzKCksXG5cdFx0XHRcdFx0Y29tcG9uZW50ID0gcmVuZGVyaW5nQ29udGV4dC5jb21wb25lbnRzW2NvbXBvbmVudE5hbWVdLFxuXHRcdFx0XHRcdGlkID0gc2VsZi5fZ2V0SWQoZWxlbWVudCksXG5cdFx0XHRcdFx0aW5zdGFuY2UgPSBzZWxmLl9jb21wb25lbnRJbnN0YW5jZXNbaWRdO1xuXG5cdFx0XHRcdGlmICghY29tcG9uZW50IHx8ICFpZCB8fFxuXHRcdFx0XHRcdHJlbmRlcmluZ0NvbnRleHQucmVuZGVyZWRJZHMuaGFzT3duUHJvcGVydHkoaWQpKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmVuZGVyaW5nQ29udGV4dC5yZW5kZXJlZElkc1tpZF0gPSB0cnVlO1xuXG5cdFx0XHRcdGlmICghaW5zdGFuY2UpIHtcblx0XHRcdFx0XHRjb21wb25lbnQuY29uc3RydWN0b3IucHJvdG90eXBlLiRjb250ZXh0ID1cblx0XHRcdFx0XHRcdHNlbGYuX2dldENvbXBvbmVudENvbnRleHQoY29tcG9uZW50LCBlbGVtZW50KTtcblx0XHRcdFx0XHRpbnN0YW5jZSA9IHNlbGYuX3NlcnZpY2VMb2NhdG9yLnJlc29sdmVJbnN0YW5jZShcblx0XHRcdFx0XHRcdGNvbXBvbmVudC5jb25zdHJ1Y3RvciwgcmVuZGVyaW5nQ29udGV4dC5jb25maWdcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdGluc3RhbmNlLiRjb250ZXh0ID0gY29tcG9uZW50LmNvbnN0cnVjdG9yLnByb3RvdHlwZS4kY29udGV4dDtcblx0XHRcdFx0XHRzZWxmLl9jb21wb25lbnRJbnN0YW5jZXNbaWRdID0gaW5zdGFuY2U7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgZXZlbnRBcmdzID0ge1xuXHRcdFx0XHRcdG5hbWU6IGNvbXBvbmVudE5hbWUsXG5cdFx0XHRcdFx0Y29udGV4dDogaW5zdGFuY2UuJGNvbnRleHRcblx0XHRcdFx0fTtcblxuXHRcdFx0XHRzZWxmLl9jb21wb25lbnRFbGVtZW50c1tpZF0gPSBlbGVtZW50O1xuXG5cdFx0XHRcdHZhciBzdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuXHRcdFx0XHRzZWxmLl9ldmVudEJ1cy5lbWl0KCdjb21wb25lbnRSZW5kZXInLCBldmVudEFyZ3MpO1xuXG5cdFx0XHRcdHJldHVybiBzZWxmLl91bmJpbmRBbGwoZWxlbWVudCwgcmVuZGVyaW5nQ29udGV4dClcblx0XHRcdFx0XHQuY2F0Y2goZnVuY3Rpb24gKHJlYXNvbikge1xuXHRcdFx0XHRcdFx0c2VsZi5fZXZlbnRCdXMuZW1pdCgnZXJyb3InLCByZWFzb24pO1xuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0LnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0aWYgKGluc3RhbmNlLiRjb250ZXh0LmVsZW1lbnQgIT09IGVsZW1lbnQpIHtcblx0XHRcdFx0XHRcdFx0aW5zdGFuY2UuJGNvbnRleHQgPSBzZWxmLl9nZXRDb21wb25lbnRDb250ZXh0KFxuXHRcdFx0XHRcdFx0XHRcdGNvbXBvbmVudCwgZWxlbWVudFxuXHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0dmFyIHJlbmRlck1ldGhvZCA9IG1vZHVsZUhlbHBlci5nZXRNZXRob2RUb0ludm9rZShcblx0XHRcdFx0XHRcdFx0aW5zdGFuY2UsICdyZW5kZXInXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0cmV0dXJuIG1vZHVsZUhlbHBlci5nZXRTYWZlUHJvbWlzZShyZW5kZXJNZXRob2QpO1xuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0LnRoZW4oZnVuY3Rpb24gKGRhdGFDb250ZXh0KSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gY29tcG9uZW50LnRlbXBsYXRlLnJlbmRlcihkYXRhQ29udGV4dCk7XG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0XHQuY2F0Y2goZnVuY3Rpb24gKHJlYXNvbikge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHNlbGYuX2hhbmRsZVJlbmRlckVycm9yKFxuXHRcdFx0XHRcdFx0XHRlbGVtZW50LCBjb21wb25lbnQsIHJlYXNvblxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdC50aGVuKGZ1bmN0aW9uIChodG1sKSB7XG5cdFx0XHRcdFx0XHRpZiAoZWxlbWVudC50YWdOYW1lID09PSBUQUdfTkFNRVMuSEVBRCkge1xuXHRcdFx0XHRcdFx0XHRzZWxmLl9tZXJnZUhlYWQoZWxlbWVudCwgaHRtbCk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRlbGVtZW50LmlubmVySFRNTCA9IGh0bWw7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR2YXIgcHJvbWlzZXMgPSBzZWxmLl9maW5kQ29tcG9uZW50cyhcblx0XHRcdFx0XHRcdFx0ZWxlbWVudCwgcmVuZGVyaW5nQ29udGV4dFxuXHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdFx0XHQubWFwKGZ1bmN0aW9uIChpbm5lckNvbXBvbmVudCkge1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBzZWxmLnJlbmRlckNvbXBvbmVudChcblx0XHRcdFx0XHRcdFx0XHRcdGlubmVyQ29tcG9uZW50LCByZW5kZXJpbmdDb250ZXh0XG5cdFx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0LnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0ZXZlbnRBcmdzLnRpbWUgPSBEYXRlLm5vdygpIC0gc3RhcnRUaW1lO1xuXHRcdFx0XHRcdFx0c2VsZi5fZXZlbnRCdXMuZW1pdCgnY29tcG9uZW50UmVuZGVyZWQnLCBldmVudEFyZ3MpO1xuXHRcdFx0XHRcdFx0cmV0dXJuIHNlbGYuX2JpbmRDb21wb25lbnQoZWxlbWVudCk7XG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0XHQudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRpZiAoIWhhZENoaWxkcmVuKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHNlbGYuX2NvbGxlY3RSZW5kZXJpbmdHYXJiYWdlKHJlbmRlcmluZ0NvbnRleHQpO1xuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0LmNhdGNoKGZ1bmN0aW9uIChyZWFzb24pIHtcblx0XHRcdFx0XHRcdHNlbGYuX2V2ZW50QnVzLmVtaXQoJ2Vycm9yJywgcmVhc29uKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHR9O1xuXG4vKipcbiAqIEdldHMgY29tcG9uZW50IGluc3RhbmNlIGJ5IElELlxuICogQHBhcmFtIHtTdHJpbmd9IGlkIENvbXBvbmVudCBJRC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IENvbXBvbmVudCBpbnN0YW5jZS5cbiAqL1xuRG9jdW1lbnRSZW5kZXJlci5wcm90b3R5cGUuZ2V0Q29tcG9uZW50QnlJZCA9IGZ1bmN0aW9uIChpZCkge1xuXHRyZXR1cm4gdGhpcy5fY29tcG9uZW50SW5zdGFuY2VzW2lkXSB8fCBudWxsO1xufTtcblxuLyoqXG4gKiBDaGVja3MgdGhhdCBldmVyeSBpbnN0YW5jZSBvZiBjb21wb25lbnQgaGFzIGVsZW1lbnQgb24gdGhlIHBhZ2UgYW5kXG4gKiByZW1vdmVzIGFsbCByZWZlcmVuY2VzIHRvIGNvbXBvbmVudHMgcmVtb3ZlZCBmcm9tIERPTS5cbiAqIEByZXR1cm5zIHtQcm9taXNlfSBQcm9taXNlIGZvciBub3RoaW5nLlxuICovXG5Eb2N1bWVudFJlbmRlcmVyLnByb3RvdHlwZS5jb2xsZWN0R2FyYmFnZSA9IGZ1bmN0aW9uICgpIHtcblx0dmFyIHNlbGYgPSB0aGlzO1xuXHRyZXR1cm4gdGhpcy5fZ2V0UHJvbWlzZUZvclJlYWR5U3RhdGUoKS5cblx0XHR0aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciBwcm9taXNlcyA9IFtdO1xuXHRcdFx0T2JqZWN0LmtleXMoc2VsZi5fY29tcG9uZW50RWxlbWVudHMpXG5cdFx0XHRcdC5mb3JFYWNoKGZ1bmN0aW9uIChpZCkge1xuXHRcdFx0XHRcdGlmIChTUEVDSUFMX0lEUy5oYXNPd25Qcm9wZXJ0eShpZCkpIHtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dmFyIGVsZW1lbnQgPSBzZWxmLl93aW5kb3cuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuXHRcdFx0XHRcdGlmIChlbGVtZW50KSB7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0dmFyIHByb21pc2UgPSBzZWxmLl91bmJpbmRDb21wb25lbnQoc2VsZi5fY29tcG9uZW50RWxlbWVudHNbaWRdKVxuXHRcdFx0XHRcdFx0LnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0XHRkZWxldGUgc2VsZi5fY29tcG9uZW50RWxlbWVudHNbaWRdO1xuXHRcdFx0XHRcdFx0XHRkZWxldGUgc2VsZi5fY29tcG9uZW50SW5zdGFuY2VzW2lkXTtcblx0XHRcdFx0XHRcdFx0ZGVsZXRlIHNlbGYuX2NvbXBvbmVudEJpbmRpbmdzW2lkXTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdHByb21pc2VzLnB1c2gocHJvbWlzZSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcblx0XHR9KTtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhbmQgcmVuZGVycyBjb21wb25lbnQgZWxlbWVudC5cbiAqIEBwYXJhbSB7U3RyaW5nfSB0YWdOYW1lIE5hbWUgb2YgSFRNTCB0YWcuXG4gKiBAcGFyYW0ge09iamVjdH0gYXR0cmlidXRlcyBFbGVtZW50IGF0dHJpYnV0ZXMuXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxFbGVtZW50Pn0gUHJvbWlzZSBmb3IgSFRNTCBlbGVtZW50IHdpdGggcmVuZGVyZWQgY29tcG9uZW50LlxuICovXG5Eb2N1bWVudFJlbmRlcmVyLnByb3RvdHlwZS5jcmVhdGVDb21wb25lbnQgPSBmdW5jdGlvbiAodGFnTmFtZSwgYXR0cmlidXRlcykge1xuXHRpZiAodHlwZW9mKHRhZ05hbWUpICE9PSAnc3RyaW5nJyB8fCAhYXR0cmlidXRlcyB8fFxuXHRcdHR5cGVvZihhdHRyaWJ1dGVzKSAhPT0gJ29iamVjdCcpIHtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoXG5cdFx0XHRuZXcgRXJyb3IoRVJST1JfQ1JFQVRFX1dST05HX0FSR1VNRU5UUylcblx0XHQpO1xuXHR9XG5cblx0dmFyIHNlbGYgPSB0aGlzO1xuXHRyZXR1cm4gdGhpcy5fZ2V0UHJvbWlzZUZvclJlYWR5U3RhdGUoKVxuXHRcdC50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciBjb21wb25lbnRzID0gc2VsZi5fY29tcG9uZW50TG9hZGVyLmdldENvbXBvbmVudHNCeU5hbWVzKCksXG5cdFx0XHRcdGNvbXBvbmVudE5hbWUgPSBtb2R1bGVIZWxwZXIuZ2V0T3JpZ2luYWxDb21wb25lbnROYW1lKHRhZ05hbWUpO1xuXG5cdFx0XHRpZiAobW9kdWxlSGVscGVyLmlzSGVhZENvbXBvbmVudChjb21wb25lbnROYW1lKSB8fFxuXHRcdFx0XHRtb2R1bGVIZWxwZXIuaXNEb2N1bWVudENvbXBvbmVudChjb21wb25lbnROYW1lKSB8fFxuXHRcdFx0XHQhY29tcG9uZW50cy5oYXNPd25Qcm9wZXJ0eShjb21wb25lbnROYW1lKSkge1xuXHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoXG5cdFx0XHRcdFx0bmV3IEVycm9yKHV0aWwuZm9ybWF0KEVSUk9SX0NSRUFURV9XUk9OR19OQU1FLCB0YWdOYW1lKSlcblx0XHRcdFx0KTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIHNhZmVUYWdOYW1lID0gbW9kdWxlSGVscGVyLmdldFRhZ05hbWVGb3JDb21wb25lbnROYW1lKGNvbXBvbmVudE5hbWUpO1xuXG5cdFx0XHR2YXIgaWQgPSBhdHRyaWJ1dGVzW21vZHVsZUhlbHBlci5BVFRSSUJVVEVfSURdO1xuXHRcdFx0aWYgKCFpZCB8fCBzZWxmLl9jb21wb25lbnRJbnN0YW5jZXMuaGFzT3duUHJvcGVydHkoaWQpKSB7XG5cdFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoRVJST1JfQ1JFQVRFX1dST05HX0lEKSk7XG5cdFx0XHR9XG5cblx0XHRcdHZhciBlbGVtZW50ID0gc2VsZi5fd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoc2FmZVRhZ05hbWUpO1xuXHRcdFx0T2JqZWN0LmtleXMoYXR0cmlidXRlcylcblx0XHRcdFx0LmZvckVhY2goZnVuY3Rpb24gKGF0dHJpYnV0ZU5hbWUpIHtcblx0XHRcdFx0XHRlbGVtZW50LnNldEF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVzW2F0dHJpYnV0ZU5hbWVdKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdHJldHVybiBzZWxmLnJlbmRlckNvbXBvbmVudChlbGVtZW50KVxuXHRcdFx0XHQudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGVsZW1lbnQ7XG5cdFx0XHRcdH0pO1xuXHRcdH0pO1xufTtcblxuLyoqXG4gKiBDbGVhcnMgYWxsIHJlZmVyZW5jZXMgdG8gcmVtb3ZlZCBjb21wb25lbnRzIGR1cmluZyByZW5kZXJpbmcgcHJvY2Vzcy5cbiAqIEBwYXJhbSB7T2JqZWN0fSByZW5kZXJpbmdDb250ZXh0IENvbnRleHQgb2YgcmVuZGVyaW5nLlxuICogQHByaXZhdGVcbiAqL1xuRG9jdW1lbnRSZW5kZXJlci5wcm90b3R5cGUuX2NvbGxlY3RSZW5kZXJpbmdHYXJiYWdlID1cblx0ZnVuY3Rpb24gKHJlbmRlcmluZ0NvbnRleHQpIHtcblx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cdFx0T2JqZWN0LmtleXMocmVuZGVyaW5nQ29udGV4dC51bmJvdW5kSWRzKVxuXHRcdFx0LmZvckVhY2goZnVuY3Rpb24gKGlkKSB7XG5cdFx0XHRcdC8vIHRoaXMgY29tcG9uZW50IGhhcyBiZWVuIHJlbmRlcmVkIGFnYWluIGFuZCB3ZSBkbyBub3QgbmVlZCB0b1xuXHRcdFx0XHQvLyByZW1vdmUgaXQuXG5cdFx0XHRcdGlmIChyZW5kZXJpbmdDb250ZXh0LnJlbmRlcmVkSWRzLmhhc093blByb3BlcnR5KGlkKSkge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGRlbGV0ZSBzZWxmLl9jb21wb25lbnRFbGVtZW50c1tpZF07XG5cdFx0XHRcdGRlbGV0ZSBzZWxmLl9jb21wb25lbnRJbnN0YW5jZXNbaWRdO1xuXHRcdFx0XHRkZWxldGUgc2VsZi5fY29tcG9uZW50QmluZGluZ3NbaWRdO1xuXHRcdFx0fSk7XG5cdH07XG5cbi8qKlxuICogVW5iaW5kcyBhbGwgZXZlbnQgaGFuZGxlcnMgZnJvbSBzcGVjaWZpZWQgY29tcG9uZW50IGFuZCBhbGwgaXQncyBkZXNjZW5kYW50cy5cbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCBDb21wb25lbnQgSFRNTCBlbGVtZW50LlxuICogQHBhcmFtIHtPYmplY3R9IHJlbmRlcmluZ0NvbnRleHQgQ29udGV4dCBvZiByZW5kZXJpbmcuXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gUHJvbWlzZSBmb3Igbm90aGluZy5cbiAqIEBwcml2YXRlXG4gKi9cbkRvY3VtZW50UmVuZGVyZXIucHJvdG90eXBlLl91bmJpbmRBbGwgPSBmdW5jdGlvbiAoZWxlbWVudCwgcmVuZGVyaW5nQ29udGV4dCkge1xuXHR2YXIgc2VsZiA9IHRoaXMsXG5cdFx0aWQgPSB0aGlzLl9nZXRJZChlbGVtZW50KSxcblx0XHRwcm9taXNlcyA9IFtdO1xuXG5cdGlmIChlbGVtZW50Lmhhc0NoaWxkTm9kZXMoKSkge1xuXHRcdHNlbGYuX2ZpbmRDb21wb25lbnRzKGVsZW1lbnQsIHJlbmRlcmluZ0NvbnRleHQpXG5cdFx0XHQuZm9yRWFjaChmdW5jdGlvbiAoaW5uZXJFbGVtZW50KSB7XG5cdFx0XHRcdHZhciBpZCA9IHNlbGYuX2dldElkKGlubmVyRWxlbWVudCk7XG5cdFx0XHRcdGlmIChyZW5kZXJpbmdDb250ZXh0LnVuYm91bmRJZHMuaGFzT3duUHJvcGVydHkoaWQpKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJlbmRlcmluZ0NvbnRleHQudW5ib3VuZElkc1tpZF0gPSB0cnVlO1xuXHRcdFx0XHRwcm9taXNlcy5wdXNoKHNlbGYuX3VuYmluZENvbXBvbmVudChpbm5lckVsZW1lbnQpKTtcblx0XHRcdH0pO1xuXHR9XG5cblx0aWYgKCFyZW5kZXJpbmdDb250ZXh0LnVuYm91bmRJZHMuaGFzT3duUHJvcGVydHkoaWQpKSB7XG5cdFx0cHJvbWlzZXMucHVzaCh0aGlzLl91bmJpbmRDb21wb25lbnQoZWxlbWVudCkpO1xuXHRcdHJlbmRlcmluZ0NvbnRleHQudW5ib3VuZElkc1tpZF0gPSB0cnVlO1xuXHR9XG5cblx0cmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbn07XG5cbi8qKlxuICogVW5iaW5kcyBhbGwgZXZlbnQgaGFuZGxlcnMgZnJvbSBzcGVjaWZpZWQgY29tcG9uZW50LlxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50IENvbXBvbmVudCBIVE1MIGVsZW1lbnQuXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gUHJvbWlzZSBmb3Igbm90aGluZy5cbiAqIEBwcml2YXRlXG4gKi9cbkRvY3VtZW50UmVuZGVyZXIucHJvdG90eXBlLl91bmJpbmRDb21wb25lbnQgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuXHR2YXIgaWQgPSB0aGlzLl9nZXRJZChlbGVtZW50KSxcblx0XHRzZWxmID0gdGhpcyxcblx0XHRpbnN0YW5jZSA9IHRoaXMuX2NvbXBvbmVudEluc3RhbmNlc1tpZF07XG5cdGlmICghaW5zdGFuY2UpIHtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG5cdH1cblx0aWYgKHRoaXMuX2NvbXBvbmVudEJpbmRpbmdzLmhhc093blByb3BlcnR5KGlkKSkge1xuXHRcdE9iamVjdC5rZXlzKHRoaXMuX2NvbXBvbmVudEJpbmRpbmdzW2lkXSlcblx0XHRcdC5mb3JFYWNoKGZ1bmN0aW9uIChldmVudE5hbWUpIHtcblx0XHRcdFx0ZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFxuXHRcdFx0XHRcdGV2ZW50TmFtZSxcblx0XHRcdFx0XHRzZWxmLl9jb21wb25lbnRCaW5kaW5nc1tpZF1bZXZlbnROYW1lXS5oYW5kbGVyLFxuXHRcdFx0XHRcdE5PTl9CVUJCTElOR19FVkVOVFMuaGFzT3duUHJvcGVydHkoZXZlbnROYW1lKVxuXHRcdFx0XHQpO1xuXHRcdFx0fSk7XG5cdFx0ZGVsZXRlIHRoaXMuX2NvbXBvbmVudEJpbmRpbmdzW2lkXTtcblx0fVxuXHR2YXIgdW5iaW5kTWV0aG9kID0gbW9kdWxlSGVscGVyLmdldE1ldGhvZFRvSW52b2tlKGluc3RhbmNlLCAndW5iaW5kJyk7XG5cdHJldHVybiBtb2R1bGVIZWxwZXIuZ2V0U2FmZVByb21pc2UodW5iaW5kTWV0aG9kKVxuXHRcdC50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdHNlbGYuX2V2ZW50QnVzLmVtaXQoJ2NvbXBvbmVudFVuYm91bmQnLCB7XG5cdFx0XHRcdGVsZW1lbnQ6IGVsZW1lbnQsXG5cdFx0XHRcdGlkOiAhU1BFQ0lBTF9JRFMuaGFzT3duUHJvcGVydHkoaWQpID8gaWQgOiBudWxsXG5cdFx0XHR9KTtcblx0XHR9KVxuXHRcdC5jYXRjaChmdW5jdGlvbiAocmVhc29uKSB7XG5cdFx0XHRzZWxmLl9ldmVudEJ1cy5lbWl0KCdlcnJvcicsIHJlYXNvbik7XG5cdFx0fSk7XG59O1xuXG4vKipcbiAqIEJpbmRzIGFsbCByZXF1aXJlZCBldmVudCBoYW5kbGVycyB0byBjb21wb25lbnQuXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgQ29tcG9uZW50IEhUTUwgZWxlbWVudC5cbiAqIEByZXR1cm5zIHtQcm9taXNlfSBQcm9taXNlIGZvciBub3RoaW5nLlxuICogQHByaXZhdGVcbiAqL1xuRG9jdW1lbnRSZW5kZXJlci5wcm90b3R5cGUuX2JpbmRDb21wb25lbnQgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuXHR2YXIgaWQgPSB0aGlzLl9nZXRJZChlbGVtZW50KSxcblx0XHRzZWxmID0gdGhpcyxcblx0XHRpbnN0YW5jZSA9IHRoaXMuX2NvbXBvbmVudEluc3RhbmNlc1tpZF07XG5cdGlmICghaW5zdGFuY2UpIHtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG5cdH1cblxuXHR2YXIgYmluZE1ldGhvZCA9IG1vZHVsZUhlbHBlci5nZXRNZXRob2RUb0ludm9rZShpbnN0YW5jZSwgJ2JpbmQnKTtcblx0cmV0dXJuIG1vZHVsZUhlbHBlci5nZXRTYWZlUHJvbWlzZShiaW5kTWV0aG9kKVxuXHRcdC50aGVuKGZ1bmN0aW9uIChiaW5kaW5ncykge1xuXHRcdFx0aWYgKCFiaW5kaW5ncyB8fCB0eXBlb2YoYmluZGluZ3MpICE9PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRzZWxmLl9ldmVudEJ1cy5lbWl0KCdjb21wb25lbnRCb3VuZCcsIHtcblx0XHRcdFx0XHRlbGVtZW50OiBlbGVtZW50LFxuXHRcdFx0XHRcdGlkOiAhU1BFQ0lBTF9JRFMuaGFzT3duUHJvcGVydHkoaWQpID8gaWQgOiBudWxsXG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRzZWxmLl9jb21wb25lbnRCaW5kaW5nc1tpZF0gPSB7fTtcblx0XHRcdE9iamVjdC5rZXlzKGJpbmRpbmdzKVxuXHRcdFx0XHQuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnROYW1lKSB7XG5cdFx0XHRcdFx0ZXZlbnROYW1lID0gZXZlbnROYW1lLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdFx0aWYgKHNlbGYuX2NvbXBvbmVudEJpbmRpbmdzW2lkXS5oYXNPd25Qcm9wZXJ0eShldmVudE5hbWUpKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHZhciBzZWxlY3RvckhhbmRsZXJzID0ge307XG5cdFx0XHRcdFx0T2JqZWN0LmtleXMoYmluZGluZ3NbZXZlbnROYW1lXSlcblx0XHRcdFx0XHRcdC5mb3JFYWNoKGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuXHRcdFx0XHRcdFx0XHR2YXIgaGFuZGxlciA9IGJpbmRpbmdzW2V2ZW50TmFtZV1bc2VsZWN0b3JdO1xuXHRcdFx0XHRcdFx0XHRpZiAodHlwZW9mKGhhbmRsZXIpICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdHNlbGVjdG9ySGFuZGxlcnNbc2VsZWN0b3JdID0gaGFuZGxlci5iaW5kKGluc3RhbmNlKTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdHNlbGYuX2NvbXBvbmVudEJpbmRpbmdzW2lkXVtldmVudE5hbWVdID0ge1xuXHRcdFx0XHRcdFx0aGFuZGxlcjogc2VsZi5fY3JlYXRlQmluZGluZ0hhbmRsZXIoXG5cdFx0XHRcdFx0XHRcdGVsZW1lbnQsIHNlbGVjdG9ySGFuZGxlcnNcblx0XHRcdFx0XHRcdCksXG5cdFx0XHRcdFx0XHRzZWxlY3RvckhhbmRsZXJzOiBzZWxlY3RvckhhbmRsZXJzXG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXG5cdFx0XHRcdFx0XHRldmVudE5hbWUsXG5cdFx0XHRcdFx0XHRzZWxmLl9jb21wb25lbnRCaW5kaW5nc1tpZF1bZXZlbnROYW1lXS5oYW5kbGVyLFxuXHRcdFx0XHRcdFx0Tk9OX0JVQkJMSU5HX0VWRU5UUy5oYXNPd25Qcm9wZXJ0eShldmVudE5hbWUpXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fSk7XG5cdFx0XHRzZWxmLl9ldmVudEJ1cy5lbWl0KCdjb21wb25lbnRCb3VuZCcsIHtcblx0XHRcdFx0ZWxlbWVudDogZWxlbWVudCxcblx0XHRcdFx0aWQ6IGlkXG5cdFx0XHR9KTtcblx0XHR9KTtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyB1bml2ZXJzYWwgZXZlbnQgaGFuZGxlciBmb3IgZGVsZWdhdGVkIGV2ZW50cy5cbiAqIEBwYXJhbSB7RWxlbWVudH0gY29tcG9uZW50Um9vdCBSb290IGVsZW1lbnQgb2YgY29tcG9uZW50LlxuICogQHBhcmFtIHtPYmplY3R9IHNlbGVjdG9ySGFuZGxlcnMgTWFwIG9mIGV2ZW50IGhhbmRsZXJzIGJ5IENTUyBzZWxlY3RvcnMuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFVuaXZlcnNhbCBldmVudCBoYW5kbGVyIGZvciBkZWxlZ2F0ZWQgZXZlbnRzLlxuICogQHByaXZhdGVcbiAqL1xuRG9jdW1lbnRSZW5kZXJlci5wcm90b3R5cGUuX2NyZWF0ZUJpbmRpbmdIYW5kbGVyID1cblx0ZnVuY3Rpb24gKGNvbXBvbmVudFJvb3QsIHNlbGVjdG9ySGFuZGxlcnMpIHtcblx0XHR2YXIgc2VsZWN0b3JzID0gT2JqZWN0LmtleXMoc2VsZWN0b3JIYW5kbGVycyk7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uIChldmVudCkge1xuXHRcdFx0dmFyIGRpc3BhdGNoZWRFdmVudCA9IGNyZWF0ZUN1c3RvbUV2ZW50KGV2ZW50LCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGVsZW1lbnQ7XG5cdFx0XHRcdH0pLFxuXHRcdFx0XHRlbGVtZW50ID0gZXZlbnQudGFyZ2V0LFxuXHRcdFx0XHR0YXJnZXRNYXRjaGVzID0gZ2V0TWF0Y2hlc01ldGhvZChlbGVtZW50KSxcblx0XHRcdFx0aXNIYW5kbGVkID0gc2VsZWN0b3JzLnNvbWUoZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG5cdFx0XHRcdFx0aWYgKHRhcmdldE1hdGNoZXMoc2VsZWN0b3IpKSB7XG5cdFx0XHRcdFx0XHRzZWxlY3RvckhhbmRsZXJzW3NlbGVjdG9yXShkaXNwYXRjaGVkRXZlbnQpO1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fSk7XG5cdFx0XHRpZiAoaXNIYW5kbGVkIHx8ICFldmVudC5idWJibGVzKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0d2hpbGUoZWxlbWVudC5wYXJlbnRFbGVtZW50ICYmIGVsZW1lbnQgIT09IGNvbXBvbmVudFJvb3QpIHtcblx0XHRcdFx0ZWxlbWVudCA9IGVsZW1lbnQucGFyZW50RWxlbWVudDtcblx0XHRcdFx0dGFyZ2V0TWF0Y2hlcyA9IGdldE1hdGNoZXNNZXRob2QoZWxlbWVudCk7XG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc2VsZWN0b3JzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0aWYgKCF0YXJnZXRNYXRjaGVzKHNlbGVjdG9yc1tpXSkpIHtcblx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpc0hhbmRsZWQgPSB0cnVlO1xuXHRcdFx0XHRcdHNlbGVjdG9ySGFuZGxlcnNbc2VsZWN0b3JzW2ldXShkaXNwYXRjaGVkRXZlbnQpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGlzSGFuZGxlZCkge1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblx0fTtcblxuLyoqXG4gKiBGaW5kcyBhbGwgZGVzY2VuZGFudCBjb21wb25lbnRzIG9mIHNwZWNpZmllZCBjb21wb25lbnQgZWxlbWVudC5cbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCBSb290IGNvbXBvbmVudCBIVE1MIGVsZW1lbnQgdG8gYmVnaW4gc2VhcmNoIHdpdGguXG4gKiBAcGFyYW0ge09iamVjdH0gcmVuZGVyaW5nQ29udGV4dCBDb250ZXh0IG9mIHJlbmRlcmluZy5cbiAqIEBwcml2YXRlXG4gKi9cbkRvY3VtZW50UmVuZGVyZXIucHJvdG90eXBlLl9maW5kQ29tcG9uZW50cyA9XG5cdGZ1bmN0aW9uIChlbGVtZW50LCByZW5kZXJpbmdDb250ZXh0KSB7XG5cdFx0dmFyIGNvbXBvbmVudHMgPSBbXTtcblx0XHRyZW5kZXJpbmdDb250ZXh0LmNvbXBvbmVudFRhZ3Ncblx0XHRcdC5mb3JFYWNoKGZ1bmN0aW9uICh0YWcpIHtcblx0XHRcdFx0dmFyIG5vZGVzID0gZWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSh0YWcpO1xuXHRcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRjb21wb25lbnRzLnB1c2gobm9kZXNbaV0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRyZXR1cm4gY29tcG9uZW50cztcblx0fTtcblxuLyoqXG4gKiBIYW5kbGVzIGVycm9yIHdoaWxlIHJlbmRlcmluZy5cbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCBDb21wb25lbnQgSFRNTCBlbGVtZW50LlxuICogQHBhcmFtIHtPYmplY3R9IGNvbXBvbmVudCBDb21wb25lbnQgaW5zdGFuY2UuXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJvciBFcnJvciB0byBoYW5kbGUuXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxTdHJpbmc+fSBQcm9taXNlIGZvciBIVE1MIHN0cmluZy5cbiAqIEBwcml2YXRlXG4gKi9cbkRvY3VtZW50UmVuZGVyZXIucHJvdG90eXBlLl9oYW5kbGVSZW5kZXJFcnJvciA9XG5cdGZ1bmN0aW9uIChlbGVtZW50LCBjb21wb25lbnQsIGVycm9yKSB7XG5cdFx0dGhpcy5fZXZlbnRCdXMuZW1pdCgnZXJyb3InLCBlcnJvcik7XG5cblx0XHQvLyBkbyBub3QgY29ycnVwdCBleGlzdGVkIEhFQUQgd2hlbiBlcnJvciBvY2N1cnNcblx0XHRpZiAoZWxlbWVudC50YWdOYW1lID09PSBUQUdfTkFNRVMuSEVBRCkge1xuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgnJyk7XG5cdFx0fVxuXG5cdFx0aWYgKCF0aGlzLl9jb25maWcuaXNSZWxlYXNlICYmIGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoZXJyb3JIZWxwZXIucHJldHR5UHJpbnQoXG5cdFx0XHRcdGVycm9yLCB0aGlzLl93aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudFxuXHRcdFx0KSk7XG5cdFx0fSBlbHNlIGlmIChjb21wb25lbnQuZXJyb3JUZW1wbGF0ZSkge1xuXHRcdFx0cmV0dXJuIGNvbXBvbmVudC5lcnJvclRlbXBsYXRlLnJlbmRlcihlcnJvcik7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgnJyk7XG5cdH07XG5cbi8qKlxuICogVXBkYXRlcyBhbGwgY29tcG9uZW50cyB0aGF0IGRlcGVuZCBvbiBjdXJyZW50IHNldCBvZiBjaGFuZ2VkIHN0b3Jlcy5cbiAqIEByZXR1cm5zIHtQcm9taXNlfSBQcm9taXNlIGZvciBub3RoaW5nLlxuICogQHByaXZhdGVcbiAqL1xuRG9jdW1lbnRSZW5kZXJlci5wcm90b3R5cGUuX3VwZGF0ZVN0b3JlQ29tcG9uZW50cyA9IGZ1bmN0aW9uICgpIHtcblx0aWYgKHRoaXMuX2lzVXBkYXRpbmcpIHtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG5cdH1cblxuXHR2YXIgc2VsZiA9IHRoaXM7XG5cblx0Ly8gaWYgZG9jdW1lbnQgY29tcG9uZW50IGlzIGNoYW5nZWQgd2Ugc2hvdWxkIHJlbG9hZCB0aGUgcGFnZVxuXHR2YXIgZG9jdW1lbnRTdG9yZSA9IHRoaXMuX3dpbmRvdy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKFxuXHRcdG1vZHVsZUhlbHBlci5BVFRSSUJVVEVfU1RPUkVcblx0KTtcblx0aWYgKHRoaXMuX2N1cnJlbnRDaGFuZ2VkU3RvcmVzLmhhc093blByb3BlcnR5KGRvY3VtZW50U3RvcmUpKSB7XG5cdFx0dmFyIG5ld0xvY2F0aW9uID0gdGhpcy5fY3VycmVudFJvdXRpbmdDb250ZXh0LmxvY2F0aW9uLnRvU3RyaW5nKCk7XG5cdFx0aWYgKG5ld0xvY2F0aW9uID09PSB0aGlzLl93aW5kb3cubG9jYXRpb24udG9TdHJpbmcoKSkge1xuXHRcdFx0dGhpcy5fd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuXHRcdH1cblx0XHR0aGlzLl93aW5kb3cubG9jYXRpb24uYXNzaWduKG5ld0xvY2F0aW9uKTtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG5cdH1cblxuXHQvLyBpZiB3ZSBoYXZlIGF3YWl0aW5nIHJvdXRpbmcgd2Ugc2hvdWxkIGFwcGx5IHN0YXRlIHRvIHRoZSBzdG9yZXNcblx0aWYgKHRoaXMuX2F3YWl0aW5nUm91dGluZykge1xuXHRcdHZhciBjb21wb25lbnRzID0gdGhpcy5fY29tcG9uZW50TG9hZGVyLmdldENvbXBvbmVudHNCeU5hbWVzKCksXG5cdFx0XHRjaGFuZ2VkQnlTdGF0ZSA9IHRoaXMuX3N0b3JlRGlzcGF0Y2hlci5zZXRTdGF0ZShcblx0XHRcdFx0dGhpcy5fYXdhaXRpbmdSb3V0aW5nLnN0YXRlLFxuXHRcdFx0XHR0aGlzLl9hd2FpdGluZ1JvdXRpbmcucm91dGluZ0NvbnRleHRcblx0XHRcdCk7XG5cblx0XHRjaGFuZ2VkQnlTdGF0ZS5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG5cdFx0XHRzZWxmLl9jdXJyZW50Q2hhbmdlZFN0b3Jlc1tuYW1lXSA9IHRydWU7XG5cdFx0fSk7XG5cblx0XHQvLyB3ZSBzaG91bGQgdXBkYXRlIGNvbnRleHRzIG9mIHRoZSBzdG9yZXMgd2l0aCB0aGUgbmV3IHJvdXRpbmcgY29udGV4dFxuXHRcdHRoaXMuX2N1cnJlbnRSb3V0aW5nQ29udGV4dCA9IHRoaXMuX2F3YWl0aW5nUm91dGluZy5yb3V0aW5nQ29udGV4dDtcblx0XHRPYmplY3Qua2V5cyh0aGlzLl9jb21wb25lbnRJbnN0YW5jZXMpXG5cdFx0XHQuZm9yRWFjaChmdW5jdGlvbiAoaWQpIHtcblx0XHRcdFx0dmFyIGluc3RhbmNlID0gc2VsZi5fY29tcG9uZW50SW5zdGFuY2VzW2lkXTtcblx0XHRcdFx0aW5zdGFuY2UuJGNvbnRleHQgPSBzZWxmLl9nZXRDb21wb25lbnRDb250ZXh0KFxuXHRcdFx0XHRcdGNvbXBvbmVudHNbaW5zdGFuY2UuJGNvbnRleHQubmFtZV0sXG5cdFx0XHRcdFx0aW5zdGFuY2UuJGNvbnRleHQuZWxlbWVudFxuXHRcdFx0XHQpO1xuXHRcdFx0fSk7XG5cdFx0dGhpcy5fYXdhaXRpbmdSb3V0aW5nID0gbnVsbDtcblx0fVxuXG5cdHZhciBjaGFuZ2VkU3RvcmVzID0gT2JqZWN0LmtleXModGhpcy5fY3VycmVudENoYW5nZWRTdG9yZXMpO1xuXHRpZiAoY2hhbmdlZFN0b3Jlcy5sZW5ndGggPT09IDApIHtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG5cdH1cblx0dGhpcy5fY3VycmVudENoYW5nZWRTdG9yZXMgPSB7fTtcblxuXHR2YXIgcmVuZGVyaW5nQ29udGV4dCA9IHRoaXMuX2NyZWF0ZVJlbmRlcmluZ0NvbnRleHQoY2hhbmdlZFN0b3JlcyksXG5cdFx0cHJvbWlzZXMgPSByZW5kZXJpbmdDb250ZXh0LnJvb3RzLm1hcChmdW5jdGlvbiAocm9vdCkge1xuXHRcdFx0cmV0dXJuIHNlbGYucmVuZGVyQ29tcG9uZW50KHJvb3QsIHJlbmRlcmluZ0NvbnRleHQpO1xuXHRcdH0pO1xuXG5cdHRoaXMuX2lzVXBkYXRpbmcgPSB0cnVlO1xuXHRyZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpXG5cdFx0LmNhdGNoKGZ1bmN0aW9uIChyZWFzb24pIHtcblx0XHRcdHNlbGYuX2V2ZW50QnVzLmVtaXQoJ2Vycm9yJywgcmVhc29uKTtcblx0XHR9KVxuXHRcdC50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdHNlbGYuX2lzVXBkYXRpbmcgPSBmYWxzZTtcblx0XHRcdHNlbGYuX2V2ZW50QnVzLmVtaXQoJ2RvY3VtZW50VXBkYXRlZCcsIGNoYW5nZWRTdG9yZXMpO1xuXHRcdFx0cmV0dXJuIHNlbGYuX3VwZGF0ZVN0b3JlQ29tcG9uZW50cygpO1xuXHRcdH0pO1xufTtcblxuLyoqXG4gKiBNZXJnZXMgbmV3IGFuZCBleGlzdGVkIGhlYWQgZWxlbWVudHMgYW5kIGNoYW5nZSBvbmx5IGRpZmZlcmVuY2UuXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGhlYWQgSEVBRCBET00gZWxlbWVudC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBodG1sVGV4dCBIVE1MIG9mIG5ldyBIRUFEIGVsZW1lbnQgY29udGVudC5cbiAqIEBwcml2YXRlXG4gKi9cbi8qanNoaW50IG1heGNvbXBsZXhpdHk6ZmFsc2UgKi9cbkRvY3VtZW50UmVuZGVyZXIucHJvdG90eXBlLl9tZXJnZUhlYWQgPSBmdW5jdGlvbiAoaGVhZCwgaHRtbFRleHQpIHtcblx0aWYgKCFodG1sVGV4dCkge1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgc2VsZiA9IHRoaXMsXG5cdFx0bmV3SGVhZCA9IHRoaXMuX3dpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoZWFkJyk7XG5cdG5ld0hlYWQuaW5uZXJIVE1MID0gaHRtbFRleHQ7XG5cblx0dmFyIG1hcCA9IHRoaXMuX2dldEhlYWRNYXAoaGVhZC5jaGlsZE5vZGVzKSxcblx0XHRjdXJyZW50LCBpLCBrZXksIG9sZEtleSwgb2xkSXRlbSxcblx0XHRzYW1lTWV0YUVsZW1lbnRzID0ge307XG5cblx0Zm9yIChpID0gMDsgaSA8IG5ld0hlYWQuY2hpbGROb2Rlcy5sZW5ndGg7IGkrKykge1xuXHRcdGN1cnJlbnQgPSBuZXdIZWFkLmNoaWxkTm9kZXNbaV07XG5cblx0XHRpZiAoIW1hcC5oYXNPd25Qcm9wZXJ0eShjdXJyZW50Lm5vZGVOYW1lKSkge1xuXHRcdFx0bWFwW2N1cnJlbnQubm9kZU5hbWVdID0ge307XG5cdFx0fVxuXG5cdFx0c3dpdGNoIChjdXJyZW50Lm5vZGVOYW1lKSB7XG5cdFx0XHQvLyB0aGVzZSBlbGVtZW50cyBjYW4gYmUgb25seSByZXBsYWNlZFxuXHRcdFx0Y2FzZSBUQUdfTkFNRVMuVElUTEU6XG5cdFx0XHRjYXNlIFRBR19OQU1FUy5CQVNFOlxuXHRcdFx0Y2FzZSBUQUdfTkFNRVMuTk9TQ1JJUFQ6XG5cdFx0XHRcdGtleSA9IHRoaXMuX2dldE5vZGVLZXkoY3VycmVudCk7XG5cdFx0XHRcdG9sZEl0ZW0gPSBoZWFkLmdldEVsZW1lbnRzQnlUYWdOYW1lKGN1cnJlbnQubm9kZU5hbWUpWzBdO1xuXHRcdFx0XHRpZiAob2xkSXRlbSkge1xuXHRcdFx0XHRcdG9sZEtleSA9IHRoaXMuX2dldE5vZGVLZXkob2xkSXRlbSk7XG5cdFx0XHRcdFx0aGVhZC5yZXBsYWNlQ2hpbGQoY3VycmVudCwgb2xkSXRlbSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0aGVhZC5hcHBlbmRDaGlsZChjdXJyZW50KTtcblx0XHRcdFx0fVxuXHRcdFx0XHQvLyB3aGVuIHdlIGRvIHJlcGxhY2Ugb3IgYXBwZW5kIGN1cnJlbnQgaXMgcmVtb3ZlZCBmcm9tIG5ld0hlYWRcblx0XHRcdFx0Ly8gdGhlcmVmb3JlIHdlIG5lZWQgdG8gZGVjcmVtZW50IGluZGV4XG5cdFx0XHRcdGktLTtcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdC8vIHRoZXNlIGVsZW1lbnRzIGNhbiBub3QgYmUgZGVsZXRlZCBmcm9tIGhlYWRcblx0XHRcdC8vIHRoZXJlZm9yZSB3ZSBqdXN0IGFkZCBuZXcgZWxlbWVudHMgdGhhdCBkaWZmZXJzIGZyb20gZXhpc3RlZFxuXHRcdFx0Y2FzZSBUQUdfTkFNRVMuU1RZTEU6XG5cdFx0XHRjYXNlIFRBR19OQU1FUy5MSU5LOlxuXHRcdFx0Y2FzZSBUQUdfTkFNRVMuU0NSSVBUOlxuXHRcdFx0XHRrZXkgPSBzZWxmLl9nZXROb2RlS2V5KGN1cnJlbnQpO1xuXHRcdFx0XHRpZiAoIW1hcFtjdXJyZW50Lm5vZGVOYW1lXS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdFx0aGVhZC5hcHBlbmRDaGlsZChjdXJyZW50KTtcblx0XHRcdFx0XHRpLS07XG5cdFx0XHRcdH1cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHQvLyBtZXRhIGFuZCBvdGhlciBlbGVtZW50cyBjYW4gYmUgZGVsZXRlZFxuXHRcdFx0Ly8gYnV0IHdlIHNob3VsZCBub3QgZGVsZXRlIGFuZCBhcHBlbmQgc2FtZSBlbGVtZW50c1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0a2V5ID0gc2VsZi5fZ2V0Tm9kZUtleShjdXJyZW50KTtcblx0XHRcdFx0aWYgKG1hcFtjdXJyZW50Lm5vZGVOYW1lXS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdFx0c2FtZU1ldGFFbGVtZW50c1trZXldID0gdHJ1ZTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRoZWFkLmFwcGVuZENoaWxkKGN1cnJlbnQpO1xuXHRcdFx0XHRcdGktLTtcblx0XHRcdFx0fVxuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cdH1cblxuXHRpZiAobWFwLmhhc093blByb3BlcnR5KFRBR19OQU1FUy5NRVRBKSkge1xuXHRcdC8vIHJlbW92ZSBtZXRhIHRhZ3Mgd2hpY2ggYSBub3QgaW4gYSBuZXcgaGVhZCBzdGF0ZVxuXHRcdE9iamVjdC5rZXlzKG1hcFtUQUdfTkFNRVMuTUVUQV0pXG5cdFx0XHQuZm9yRWFjaChmdW5jdGlvbiAobWV0YUtleSkge1xuXHRcdFx0XHRpZiAoc2FtZU1ldGFFbGVtZW50cy5oYXNPd25Qcm9wZXJ0eShtZXRhS2V5KSkge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGhlYWQucmVtb3ZlQ2hpbGQobWFwW1RBR19OQU1FUy5NRVRBXVttZXRhS2V5XSk7XG5cdFx0XHR9KTtcblx0fVxufTtcblxuLyoqXG4gKiBHZXRzIG1hcCBvZiBhbGwgSEVBRCdzIGVsZW1lbnRzLlxuICogQHBhcmFtIHtOb2RlTGlzdH0gaGVhZENoaWxkcmVuIEhlYWQgY2hpbGRyZW4gRE9NIG5vZGVzLlxuICogQHJldHVybnMge09iamVjdH0gTWFwIG9mIEhFQUQgZWxlbWVudHMuXG4gKiBAcHJpdmF0ZVxuICovXG5Eb2N1bWVudFJlbmRlcmVyLnByb3RvdHlwZS5fZ2V0SGVhZE1hcCA9IGZ1bmN0aW9uIChoZWFkQ2hpbGRyZW4pIHtcblx0Ly8gQ3JlYXRlIG1hcCBvZiA8bWV0YT4sIDxsaW5rPiwgPHN0eWxlPiBhbmQgPHNjcmlwdD4gdGFnc1xuXHQvLyBieSB1bmlxdWUga2V5cyB0aGF0IGNvbnRhaW4gYXR0cmlidXRlcyBhbmQgY29udGVudFxuXHR2YXIgbWFwID0ge30sXG5cdFx0aSwgY3VycmVudCxcblx0XHRzZWxmID0gdGhpcztcblxuXHRmb3IgKGkgPSAwOyBpIDwgaGVhZENoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y3VycmVudCA9IGhlYWRDaGlsZHJlbltpXTtcblx0XHRpZiAoIW1hcC5oYXNPd25Qcm9wZXJ0eShjdXJyZW50Lm5vZGVOYW1lKSkge1xuXHRcdFx0bWFwW2N1cnJlbnQubm9kZU5hbWVdID0ge307XG5cdFx0fVxuXHRcdG1hcFtjdXJyZW50Lm5vZGVOYW1lXVtzZWxmLl9nZXROb2RlS2V5KGN1cnJlbnQpXSA9IGN1cnJlbnQ7XG5cdH1cblx0cmV0dXJuIG1hcDtcbn07XG5cbi8qKlxuICogR2V0cyB1bmlxdWUgZWxlbWVudCBrZXkgdXNpbmcgZWxlbWVudCdzIGF0dHJpYnV0ZXMgYW5kIGl0cyBjb250ZW50LlxuICogQHBhcmFtIHtOb2RlfSBub2RlIEhUTUwgZWxlbWVudC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFVuaXF1ZSBrZXkgZm9yIGVsZW1lbnQuXG4gKiBAcHJpdmF0ZVxuICovXG5Eb2N1bWVudFJlbmRlcmVyLnByb3RvdHlwZS5fZ2V0Tm9kZUtleSA9IGZ1bmN0aW9uIChub2RlKSB7XG5cdHZhciBjdXJyZW50LCBpLFxuXHRcdGF0dHJpYnV0ZXMgPSBbXTtcblxuXHRpZiAobm9kZS5ub2RlVHlwZSAhPT0gTk9ERV9UWVBFUy5FTEVNRU5UX05PREUpIHtcblx0XHRyZXR1cm4gbm9kZS5ub2RlVmFsdWUgfHwgJyc7XG5cdH1cblxuXHRpZiAobm9kZS5oYXNBdHRyaWJ1dGVzKCkpIHtcblx0XHRmb3IgKGkgPSAwOyBpIDwgbm9kZS5hdHRyaWJ1dGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRjdXJyZW50ID0gbm9kZS5hdHRyaWJ1dGVzW2ldO1xuXHRcdFx0YXR0cmlidXRlcy5wdXNoKGN1cnJlbnQubmFtZSArICc9JyArIGN1cnJlbnQudmFsdWUpO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBhdHRyaWJ1dGVzXG5cdFx0XHQuc29ydCgpXG5cdFx0XHQuam9pbignfCcpICsgJz4nICsgbm9kZS50ZXh0Q29udGVudDtcbn07XG5cbi8qKlxuICogRG9lcyBpbml0aWFsIHdyYXBwaW5nIGZvciBldmVyeSBjb21wb25lbnQgb24gdGhlIHBhZ2UuXG4gKiBAcHJpdmF0ZVxuICovXG5Eb2N1bWVudFJlbmRlcmVyLnByb3RvdHlwZS5faW5pdGlhbFdyYXAgPSBmdW5jdGlvbiAoKSB7XG5cdHZhciBzZWxmID0gdGhpcyxcblx0XHRjdXJyZW50LCBpLCBpZCwgaW5zdGFuY2UsXG5cdFx0Y29tcG9uZW50cyA9IHRoaXMuX2NvbXBvbmVudExvYWRlci5nZXRDb21wb25lbnRzQnlOYW1lcygpLFxuXHRcdGJpbmRQcm9taXNlcyA9IFtdO1xuXG5cdE9iamVjdC5rZXlzKGNvbXBvbmVudHMpXG5cdFx0LmZvckVhY2goZnVuY3Rpb24gKGNvbXBvbmVudE5hbWUpIHtcblx0XHRcdHZhciB0YWdOYW1lID0gbW9kdWxlSGVscGVyXG5cdFx0XHRcdFx0LmdldFRhZ05hbWVGb3JDb21wb25lbnROYW1lKGNvbXBvbmVudE5hbWUpLFxuXHRcdFx0XHRlbGVtZW50cyxcblx0XHRcdFx0Y29uc3RydWN0b3IgPSBjb21wb25lbnRzW2NvbXBvbmVudE5hbWVdLmNvbnN0cnVjdG9yO1xuXG5cdFx0XHRpZiAobW9kdWxlSGVscGVyLmlzRG9jdW1lbnRDb21wb25lbnQoY29tcG9uZW50TmFtZSkpIHtcblx0XHRcdFx0ZWxlbWVudHMgPSBbc2VsZi5fd2luZG93LmRvY3VtZW50LmRvY3VtZW50RWxlbWVudF07XG5cdFx0XHR9IGVsc2UgaWYgKG1vZHVsZUhlbHBlci5pc0hlYWRDb21wb25lbnQoY29tcG9uZW50TmFtZSkpIHtcblx0XHRcdFx0ZWxlbWVudHMgPSBbc2VsZi5fd2luZG93LmRvY3VtZW50LmhlYWRdO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZWxlbWVudHMgPSBzZWxmLl93aW5kb3cuZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUodGFnTmFtZSk7XG5cdFx0XHR9XG5cblx0XHRcdGZvciAoaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRjdXJyZW50ID0gZWxlbWVudHNbaV07XG5cdFx0XHRcdGlkID0gc2VsZi5fZ2V0SWQoY3VycmVudCk7XG5cdFx0XHRcdGlmICghaWQpIHtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGNvbnN0cnVjdG9yLnByb3RvdHlwZS4kY29udGV4dCA9IHNlbGYuX2dldENvbXBvbmVudENvbnRleHQoXG5cdFx0XHRcdFx0Y29tcG9uZW50c1tjb21wb25lbnROYW1lXSwgY3VycmVudFxuXHRcdFx0XHQpO1xuXHRcdFx0XHRpbnN0YW5jZSA9IHNlbGYuX3NlcnZpY2VMb2NhdG9yLnJlc29sdmVJbnN0YW5jZShcblx0XHRcdFx0XHRjb25zdHJ1Y3Rvciwgc2VsZi5fY29uZmlnXG5cdFx0XHRcdCk7XG5cdFx0XHRcdGluc3RhbmNlLiRjb250ZXh0ID0gY29uc3RydWN0b3IucHJvdG90eXBlLiRjb250ZXh0O1xuXHRcdFx0XHRzZWxmLl9jb21wb25lbnRFbGVtZW50c1tpZF0gPSBjdXJyZW50O1xuXHRcdFx0XHRzZWxmLl9jb21wb25lbnRJbnN0YW5jZXNbaWRdID0gaW5zdGFuY2U7XG5cdFx0XHRcdC8vIGluaXRpYWxpemUgdGhlIHN0b3JlIG9mIHRoZSBjb21wb25lbnRcblx0XHRcdFx0c2VsZi5fc3RvcmVEaXNwYXRjaGVyLmdldFN0b3JlKFxuXHRcdFx0XHRcdGN1cnJlbnQuZ2V0QXR0cmlidXRlKG1vZHVsZUhlbHBlci5BVFRSSUJVVEVfU1RPUkUpXG5cdFx0XHRcdCk7XG5cdFx0XHRcdHNlbGYuX2V2ZW50QnVzLmVtaXQoJ2NvbXBvbmVudFJlbmRlcmVkJywge1xuXHRcdFx0XHRcdG5hbWU6IGNvbXBvbmVudE5hbWUsXG5cdFx0XHRcdFx0YXR0cmlidXRlczogaW5zdGFuY2UuJGNvbnRleHQuYXR0cmlidXRlcyxcblx0XHRcdFx0XHRjb250ZXh0OiBpbnN0YW5jZS4kY29udGV4dFxuXHRcdFx0XHR9KTtcblx0XHRcdFx0YmluZFByb21pc2VzLnB1c2goc2VsZi5fYmluZENvbXBvbmVudChjdXJyZW50KSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0cmV0dXJuIFByb21pc2UuYWxsKGJpbmRQcm9taXNlcylcblx0XHQudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRzZWxmLl9ldmVudEJ1cy5lbWl0KCdkb2N1bWVudFJlbmRlcmVkJywgc2VsZi5fY3VycmVudFJvdXRpbmdDb250ZXh0KTtcblx0XHR9KTtcbn07XG5cbi8qKlxuICogR2V0cyBjb21wb25lbnQgY29udGV4dCB1c2luZyBiYXNpYyBjb250ZXh0LlxuICogQHBhcmFtIHtPYmplY3R9IGNvbXBvbmVudCBDb21wb25lbnQgZGV0YWlscy5cbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCBET00gZWxlbWVudCBvZiBjb21wb25lbnQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBDb21wb25lbnQgY29udGV4dC5cbiAqIEBwcml2YXRlXG4gKi9cbkRvY3VtZW50UmVuZGVyZXIucHJvdG90eXBlLl9nZXRDb21wb25lbnRDb250ZXh0ID1cblx0ZnVuY3Rpb24gKGNvbXBvbmVudCwgZWxlbWVudCkge1xuXHRcdHZhciBzZWxmID0gdGhpcyxcblx0XHRcdHN0b3JlTmFtZSA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKG1vZHVsZUhlbHBlci5BVFRSSUJVVEVfU1RPUkUpLFxuXHRcdFx0Y29tcG9uZW50Q29udGV4dCA9IE9iamVjdC5jcmVhdGUodGhpcy5fY3VycmVudFJvdXRpbmdDb250ZXh0KTtcblxuXHRcdC8vIGluaXRpYWxpemUgdGhlIHN0b3JlIG9mIHRoZSBjb21wb25lbnRcblx0XHR0aGlzLl9zdG9yZURpc3BhdGNoZXIuZ2V0U3RvcmUoc3RvcmVOYW1lKTtcblxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGNvbXBvbmVudENvbnRleHQsIHtcblx0XHRcdGVsZW1lbnQ6IHtcblx0XHRcdFx0dmFsdWU6IGVsZW1lbnQsXG5cdFx0XHRcdGVudW1lcmFibGU6IHRydWVcblx0XHRcdH0sXG5cdFx0XHRuYW1lOiB7XG5cdFx0XHRcdGdldDogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHJldHVybiBjb21wb25lbnQubmFtZTtcblx0XHRcdFx0fSxcblx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdGF0dHJpYnV0ZXM6IHtcblx0XHRcdFx0Z2V0OiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGF0dHJpYnV0ZXNUb09iamVjdChlbGVtZW50LmF0dHJpYnV0ZXMpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0Z2V0Q29tcG9uZW50QnlJZDoge1xuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gKGlkKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHNlbGYuZ2V0Q29tcG9uZW50QnlJZChpZCk7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRjcmVhdGVDb21wb25lbnQ6IHtcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uICh0YWdOYW1lLCBhdHRyaWJ1dGVzKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHNlbGYuY3JlYXRlQ29tcG9uZW50KHRhZ05hbWUsIGF0dHJpYnV0ZXMpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0Y29sbGVjdEdhcmJhZ2U6IHtcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRyZXR1cm4gc2VsZi5jb2xsZWN0R2FyYmFnZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0Z2V0U3RvcmVEYXRhOiB7XG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0dmFyIGN1cnJlbnRTdG9yZU5hbWUgPSBjb21wb25lbnRDb250ZXh0LmVsZW1lbnRcblx0XHRcdFx0XHRcdC5nZXRBdHRyaWJ1dGUobW9kdWxlSGVscGVyLkFUVFJJQlVURV9TVE9SRSk7XG5cdFx0XHRcdFx0cmV0dXJuIHNlbGYuX3N0b3JlRGlzcGF0Y2hlclxuXHRcdFx0XHRcdFx0LmdldFN0b3JlRGF0YShjdXJyZW50U3RvcmVOYW1lKTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdHNlbmRBY3Rpb246IHtcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIChuYW1lLCBhcmdzKSB7XG5cdFx0XHRcdFx0dmFyIGN1cnJlbnRTdG9yZU5hbWUgPSBjb21wb25lbnRDb250ZXh0LmVsZW1lbnRcblx0XHRcdFx0XHRcdC5nZXRBdHRyaWJ1dGUobW9kdWxlSGVscGVyLkFUVFJJQlVURV9TVE9SRSk7XG5cdFx0XHRcdFx0cmV0dXJuIHNlbGYuX3N0b3JlRGlzcGF0Y2hlclxuXHRcdFx0XHRcdFx0LnNlbmRBY3Rpb24oY3VycmVudFN0b3JlTmFtZSwgbmFtZSwgYXJncyk7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRzZW5kQnJvYWRjYXN0QWN0aW9uOiB7XG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiAobmFtZSwgYXJncykge1xuXHRcdFx0XHRcdHJldHVybiBzZWxmLl9zdG9yZURpc3BhdGNoZXJcblx0XHRcdFx0XHRcdC5zZW5kQnJvYWRjYXN0QWN0aW9uKG5hbWUsIGFyZ3MpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gY29tcG9uZW50Q29udGV4dDtcblx0fTtcblxuLyoqXG4gKiBGaW5kcyBhbGwgcmVuZGVyaW5nIHJvb3RzIG9uIHBhZ2UgZm9yIGFsbCBjaGFuZ2VkIHN0b3Jlcy5cbiAqIEBwYXJhbSB7QXJyYXl9IGNoYW5nZWRTdG9yZU5hbWVzIExpc3Qgb2Ygc3RvcmUgbmFtZXMgd2hpY2ggaGFzIGJlZW4gY2hhbmdlZC5cbiAqIEByZXR1cm5zIHtBcnJheTxFbGVtZW50Pn0gSFRNTCBlbGVtZW50cyB0aGF0IGFyZSByZW5kZXJpbmcgcm9vdHMuXG4gKiBAcHJpdmF0ZVxuICovXG5Eb2N1bWVudFJlbmRlcmVyLnByb3RvdHlwZS5fZmluZFJlbmRlcmluZ1Jvb3RzID0gZnVuY3Rpb24gKGNoYW5nZWRTdG9yZU5hbWVzKSB7XG5cdHZhciBzZWxmID0gdGhpcyxcblx0XHRoZWFkU3RvcmUgPSB0aGlzLl93aW5kb3cuZG9jdW1lbnQuaGVhZC5nZXRBdHRyaWJ1dGUoXG5cdFx0XHRtb2R1bGVIZWxwZXIuQVRUUklCVVRFX1NUT1JFXG5cdFx0KSxcblx0XHRjb21wb25lbnRzID0gdGhpcy5fY29tcG9uZW50TG9hZGVyLmdldENvbXBvbmVudHNCeU5hbWVzKCksXG5cdFx0Y29tcG9uZW50c0VsZW1lbnRzID0ge30sXG5cdFx0c3RvcmVOYW1lc1NldCA9IHt9LFxuXHRcdHJvb3RzU2V0ID0ge30sXG5cdFx0cm9vdHMgPSBbXTtcblxuXHQvLyB3ZSBzaG91bGQgZmluZCBhbGwgY29tcG9uZW50cyBhbmQgdGhlbiBsb29raW5nIGZvciByb290c1xuXHRjaGFuZ2VkU3RvcmVOYW1lc1xuXHRcdC5mb3JFYWNoKGZ1bmN0aW9uIChzdG9yZU5hbWUpIHtcblx0XHRcdHN0b3JlTmFtZXNTZXRbc3RvcmVOYW1lXSA9IHRydWU7XG5cdFx0XHRjb21wb25lbnRzRWxlbWVudHNbc3RvcmVOYW1lXSA9IHNlbGYuX3dpbmRvdy5kb2N1bWVudFxuXHRcdFx0XHQucXVlcnlTZWxlY3RvckFsbChcblx0XHRcdFx0XHQnWycgK1xuXHRcdFx0XHRcdG1vZHVsZUhlbHBlci5BVFRSSUJVVEVfSUQgK1xuXHRcdFx0XHRcdCddJyArXG5cdFx0XHRcdFx0J1snICtcblx0XHRcdFx0XHRtb2R1bGVIZWxwZXIuQVRUUklCVVRFX1NUT1JFICtcblx0XHRcdFx0XHQnPVwiJyArXG5cdFx0XHRcdFx0c3RvcmVOYW1lICtcblx0XHRcdFx0XHQnXCJdJ1xuXHRcdFx0XHQpO1xuXHRcdH0pO1xuXG5cdGlmIChjb21wb25lbnRzLmhhc093blByb3BlcnR5KG1vZHVsZUhlbHBlci5IRUFEX0NPTVBPTkVOVF9OQU1FKSAmJlxuXHRcdHN0b3JlTmFtZXNTZXQuaGFzT3duUHJvcGVydHkoaGVhZFN0b3JlKSkge1xuXHRcdHJvb3RzU2V0W3RoaXMuX2dldElkKHRoaXMuX3dpbmRvdy5kb2N1bWVudC5oZWFkKV0gPSB0cnVlO1xuXHRcdHJvb3RzLnB1c2godGhpcy5fd2luZG93LmRvY3VtZW50LmhlYWQpO1xuXHR9XG5cblx0Y2hhbmdlZFN0b3JlTmFtZXNcblx0XHQuZm9yRWFjaChmdW5jdGlvbiAoc3RvcmVOYW1lKSB7XG5cdFx0XHR2YXIgY3VycmVudCwgY3VycmVudElkLFxuXHRcdFx0XHRsYXN0Um9vdCwgbGFzdFJvb3RJZCxcblx0XHRcdFx0Y3VycmVudFN0b3JlLCBjdXJyZW50Q29tcG9uZW50TmFtZTtcblxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjb21wb25lbnRzRWxlbWVudHNbc3RvcmVOYW1lXS5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRjdXJyZW50ID0gY29tcG9uZW50c0VsZW1lbnRzW3N0b3JlTmFtZV1baV07XG5cdFx0XHRcdGN1cnJlbnRJZCA9IGNvbXBvbmVudHNFbGVtZW50c1tzdG9yZU5hbWVdW2ldXG5cdFx0XHRcdFx0LmdldEF0dHJpYnV0ZShtb2R1bGVIZWxwZXIuQVRUUklCVVRFX0lEKTtcblx0XHRcdFx0bGFzdFJvb3QgPSBjdXJyZW50O1xuXHRcdFx0XHRsYXN0Um9vdElkID0gY3VycmVudElkO1xuXHRcdFx0XHRjdXJyZW50Q29tcG9uZW50TmFtZSA9IG1vZHVsZUhlbHBlci5nZXRPcmlnaW5hbENvbXBvbmVudE5hbWUoXG5cdFx0XHRcdFx0Y3VycmVudC50YWdOYW1lXG5cdFx0XHRcdCk7XG5cblx0XHRcdFx0d2hpbGUgKGN1cnJlbnQucGFyZW50RWxlbWVudCkge1xuXHRcdFx0XHRcdGN1cnJlbnQgPSBjdXJyZW50LnBhcmVudEVsZW1lbnQ7XG5cdFx0XHRcdFx0Y3VycmVudElkID0gc2VsZi5fZ2V0SWQoY3VycmVudCk7XG5cdFx0XHRcdFx0Y3VycmVudFN0b3JlID0gY3VycmVudC5nZXRBdHRyaWJ1dGUoXG5cdFx0XHRcdFx0XHRtb2R1bGVIZWxwZXIuQVRUUklCVVRFX1NUT1JFXG5cdFx0XHRcdFx0KTtcblxuXHRcdFx0XHRcdC8vIHN0b3JlIGRpZCBub3QgY2hhbmdlIHN0YXRlXG5cdFx0XHRcdFx0aWYgKCFjdXJyZW50U3RvcmUgfHxcblx0XHRcdFx0XHRcdCFzdG9yZU5hbWVzU2V0Lmhhc093blByb3BlcnR5KGN1cnJlbnRTdG9yZSkpIHtcblx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vLy8gaXMgbm90IGFuIGFjdGl2ZSBjb21wb25lbnRcblx0XHRcdFx0XHRpZiAoIWNvbXBvbmVudHMuaGFzT3duUHJvcGVydHkoY3VycmVudENvbXBvbmVudE5hbWUpKSB7XG5cdFx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRsYXN0Um9vdCA9IGN1cnJlbnQ7XG5cdFx0XHRcdFx0bGFzdFJvb3RJZCA9IGN1cnJlbnRJZDtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAocm9vdHNTZXQuaGFzT3duUHJvcGVydHkobGFzdFJvb3RJZCkpIHtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyb290c1NldFtsYXN0Um9vdElkXSA9IHRydWU7XG5cdFx0XHRcdHJvb3RzLnB1c2gobGFzdFJvb3QpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdHJldHVybiByb290cztcbn07XG5cbi8qKlxuICogQ3JlYXRlcyByZW5kZXJpbmcgY29udGV4dC5cbiAqIEBwYXJhbSB7QXJyYXk/fSBjaGFuZ2VkU3RvcmVzIE5hbWVzIG9mIGNoYW5nZWQgc3RvcmVzLlxuICogQHJldHVybnMge3tcbiAqICAgY29uZmlnOiBPYmplY3QsXG4gKiAgIHJlbmRlcmVkSWRzOiB7fSxcbiAqICAgdW5ib3VuZElkczoge30sXG4gKiAgIGlzSGVhZFJlbmRlcmVkOiBCb29sZWFuLFxuICogICBiaW5kTWV0aG9kczogQXJyYXksXG4gKiAgIHJvdXRpbmdDb250ZXh0OiBPYmplY3QsXG4gKiAgIGNvbXBvbmVudHM6IE9iamVjdCxcbiAqICAgY29tcG9uZW50VGFnczogQXJyYXksXG4gKiAgIHJvb3RzOiBBcnJheS48RWxlbWVudD5cbiAqIH19XG4gKiBAcHJpdmF0ZVxuICovXG5Eb2N1bWVudFJlbmRlcmVyLnByb3RvdHlwZS5fY3JlYXRlUmVuZGVyaW5nQ29udGV4dCA9IGZ1bmN0aW9uIChjaGFuZ2VkU3RvcmVzKSB7XG5cdHZhciBjb21wb25lbnRzID0gdGhpcy5fY29tcG9uZW50TG9hZGVyLmdldENvbXBvbmVudHNCeU5hbWVzKCksXG5cdFx0Y29tcG9uZW50VGFncyA9IE9iamVjdC5rZXlzKGNvbXBvbmVudHMpXG5cdFx0XHQubWFwKGZ1bmN0aW9uIChuYW1lKSB7XG5cdFx0XHRcdHJldHVybiBtb2R1bGVIZWxwZXIuZ2V0VGFnTmFtZUZvckNvbXBvbmVudE5hbWUobmFtZSk7XG5cdFx0XHR9KTtcblx0cmV0dXJuIHtcblx0XHRjb25maWc6IHRoaXMuX2NvbmZpZyxcblx0XHRyZW5kZXJlZElkczoge30sXG5cdFx0dW5ib3VuZElkczoge30sXG5cdFx0aXNIZWFkUmVuZGVyZWQ6IGZhbHNlLFxuXHRcdGJpbmRNZXRob2RzOiBbXSxcblx0XHRyb3V0aW5nQ29udGV4dDogdGhpcy5fY3VycmVudFJvdXRpbmdDb250ZXh0LFxuXHRcdGNvbXBvbmVudHM6IGNvbXBvbmVudHMsXG5cdFx0Y29tcG9uZW50VGFnczogY29tcG9uZW50VGFncyxcblx0XHRyb290czogY2hhbmdlZFN0b3JlcyA/IHRoaXMuX2ZpbmRSZW5kZXJpbmdSb290cyhjaGFuZ2VkU3RvcmVzKSA6IFtdXG5cdH07XG59O1xuXG4vKipcbiAqIEdldHMgSUQgb2YgdGhlIGVsZW1lbnQuXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgSFRNTCBlbGVtZW50IG9mIGNvbXBvbmVudC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IElELlxuICovXG5Eb2N1bWVudFJlbmRlcmVyLnByb3RvdHlwZS5fZ2V0SWQgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuXHRpZiAoZWxlbWVudCA9PT0gdGhpcy5fd2luZG93LmRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkge1xuXHRcdHJldHVybiBTUEVDSUFMX0lEUy4kJGRvY3VtZW50O1xuXHR9XG5cdGlmIChlbGVtZW50ID09PSB0aGlzLl93aW5kb3cuZG9jdW1lbnQuaGVhZCkge1xuXHRcdHJldHVybiBTUEVDSUFMX0lEUy4kJGhlYWQ7XG5cdH1cblx0cmV0dXJuIGVsZW1lbnQuZ2V0QXR0cmlidXRlKG1vZHVsZUhlbHBlci5BVFRSSUJVVEVfSUQpO1xufTtcblxuLyoqXG4gKiBDb252ZXJ0cyBOYW1lZE5vZGVNYXAgb2YgQXR0ciBpdGVtcyB0byBrZXktdmFsdWUgb2JqZWN0IG1hcC5cbiAqIEBwYXJhbSB7TmFtZWROb2RlTWFwfSBhdHRyaWJ1dGVzIExpc3Qgb2YgRWxlbWVudCBhdHRyaWJ1dGVzLlxuICogQHJldHVybnMge09iamVjdH0gTWFwIG9mIGF0dHJpYnV0ZSB2YWx1ZXMgYnkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIGF0dHJpYnV0ZXNUb09iamVjdChhdHRyaWJ1dGVzKSB7XG5cdHZhciByZXN1bHQgPSB7fTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhdHRyaWJ1dGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0cmVzdWx0W2F0dHJpYnV0ZXNbaV0ubmFtZV0gPSBhdHRyaWJ1dGVzW2ldLnZhbHVlO1xuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogR2V0cyBjcm9zcy1icm93c2VyIFwibWF0Y2hlc1wiIG1ldGhvZCBmb3IgdGhlIGVsZW1lbnQuXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgSFRNTCBlbGVtZW50LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBcIm1hdGNoZXNcIiBtZXRob2QuXG4gKi9cbmZ1bmN0aW9uIGdldE1hdGNoZXNNZXRob2QoZWxlbWVudCkge1xuXHR2YXIgbWV0aG9kID0gIChlbGVtZW50Lm1hdGNoZXMgfHxcblx0XHRlbGVtZW50LndlYmtpdE1hdGNoZXNTZWxlY3RvciB8fFxuXHRcdGVsZW1lbnQubW96TWF0Y2hlc1NlbGVjdG9yIHx8XG5cdFx0ZWxlbWVudC5vTWF0Y2hlc1NlbGVjdG9yIHx8XG5cdFx0ZWxlbWVudC5tc01hdGNoZXNTZWxlY3Rvcik7XG5cblx0cmV0dXJuIG1ldGhvZC5iaW5kKGVsZW1lbnQpO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgaW1pdGF0aW9uIG9mIG9yaWdpbmFsIEV2ZW50IG9iamVjdCBidXQgd2l0aCBzcGVjaWZpZWQgY3VycmVudFRhcmdldC5cbiAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IE9yaWdpbmFsIGV2ZW50IG9iamVjdC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGN1cnJlbnRUYXJnZXRHZXR0ZXIgR2V0dGVyIGZvciBjdXJyZW50VGFyZ2V0LlxuICogQHJldHVybnMge0V2ZW50fSBXcmFwcGVkIGV2ZW50LlxuICovXG5mdW5jdGlvbiBjcmVhdGVDdXN0b21FdmVudChldmVudCwgY3VycmVudFRhcmdldEdldHRlcikge1xuXHR2YXIgY2F0RXZlbnQgPSBPYmplY3QuY3JlYXRlKGV2ZW50KSxcblx0XHRrZXlzID0gW10sXG5cdFx0cHJvcGVydGllcyA9IHt9O1xuXHRmb3IodmFyIGtleSBpbiBldmVudCkge1xuXHRcdGtleXMucHVzaChrZXkpO1xuXHR9XG5cdGtleXMuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0aWYgKHR5cGVvZihldmVudFtrZXldKSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0cHJvcGVydGllc1trZXldID0ge1xuXHRcdFx0XHRnZXQ6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRyZXR1cm4gZXZlbnRba2V5XS5iaW5kKGV2ZW50KTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRwcm9wZXJ0aWVzW2tleV0gPSB7XG5cdFx0XHRnZXQ6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0cmV0dXJuIGV2ZW50W2tleV07XG5cdFx0XHR9LFxuXHRcdFx0c2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcblx0XHRcdFx0ZXZlbnRba2V5XSA9IHZhbHVlO1xuXHRcdFx0fVxuXHRcdH07XG5cdH0pO1xuXG5cdHByb3BlcnRpZXMuY3VycmVudFRhcmdldCA9IHtcblx0XHRnZXQ6IGN1cnJlbnRUYXJnZXRHZXR0ZXJcblx0fTtcblx0T2JqZWN0LmRlZmluZVByb3BlcnRpZXMoY2F0RXZlbnQsIHByb3BlcnRpZXMpO1xuXHRPYmplY3Quc2VhbChjYXRFdmVudCk7XG5cdE9iamVjdC5mcmVlemUoY2F0RXZlbnQpO1xuXHRyZXR1cm4gY2F0RXZlbnQ7XG59IiwiLypcbiAqIGNhdGJlcnJ5XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0IERlbmlzIFJlY2hrdW5vdiBhbmQgcHJvamVjdCBjb250cmlidXRvcnMuXG4gKlxuICogY2F0YmVycnkncyBsaWNlbnNlIGZvbGxvd3M6XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb25cbiAqIG9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uXG4gKiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sXG4gKiBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLFxuICogcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSxcbiAqIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4gKiBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuICogaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuICogT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKlxuICogVGhpcyBsaWNlbnNlIGFwcGxpZXMgdG8gYWxsIHBhcnRzIG9mIGNhdGJlcnJ5IHRoYXQgYXJlIG5vdCBleHRlcm5hbGx5XG4gKiBtYWludGFpbmVkIGxpYnJhcmllcy5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gTG9nZ2VyO1xuXG52YXIgTEVWRUxTID0ge1xuXHRUUkFDRTogJ3RyYWNlJyxcblx0SU5GTzogJ2luZm8nLFxuXHRXQVJOOiAnd2FybicsXG5cdEVSUk9SOiAnZXJyb3InLFxuXHRGQVRBTDogJ2ZhdGFsJ1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGJyb3dzZXIgbG9nZ2VyLlxuICogQHBhcmFtIHtPYmplY3R8c3RyaW5nfSBsZXZlbHMgTGV2ZWxzIHRvIGxvZy5cbiAqIEBzdXBwb3J0ZWQgQ2hyb21lLCBGaXJlZm94Pj0yLjAsIEludGVybmV0IEV4cGxvcmVyPj04LCBPcGVyYSwgU2FmYXJpLlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIExvZ2dlcihsZXZlbHMpIHtcblx0aWYgKHR5cGVvZiAobGV2ZWxzKSA9PT0gJ29iamVjdCcpIHtcblx0XHR0aGlzLl9sZXZlbHMgPSBsZXZlbHM7XG5cdH1cblxuXHRpZiAodHlwZW9mKGxldmVscykgPT09ICdzdHJpbmcnKSB7XG5cdFx0dGhpcy5fbGV2ZWxzID0ge307XG5cdFx0T2JqZWN0LmtleXMoTEVWRUxTKVxuXHRcdFx0LmZvckVhY2goZnVuY3Rpb24gKGxldmVsKSB7XG5cdFx0XHRcdHRoaXMuX2xldmVsc1tMRVZFTFNbbGV2ZWxdXSA9XG5cdFx0XHRcdFx0KGxldmVscy5zZWFyY2goTEVWRUxTW2xldmVsXSkgIT09IC0xKTtcblx0XHRcdH0sIHRoaXMpO1xuXHR9XG5cblx0dGhpcy50cmFjZSA9IHRoaXMudHJhY2UuYmluZCh0aGlzKTtcblx0dGhpcy5pbmZvID0gdGhpcy5pbmZvLmJpbmQodGhpcyk7XG5cdHRoaXMud2FybiA9IHRoaXMud2Fybi5iaW5kKHRoaXMpO1xuXHR0aGlzLmVycm9yID0gdGhpcy5lcnJvci5iaW5kKHRoaXMpO1xuXHR0aGlzLmZhdGFsID0gdGhpcy5mYXRhbC5iaW5kKHRoaXMpO1xufVxuXG4vKipcbiAqIEN1cnJlbnQgbGV2ZWxzIG9mIGxvZ2dpbmcuXG4gKiBAdHlwZSB7T2JqZWN0fVxuICogQHByaXZhdGVcbiAqL1xuTG9nZ2VyLnByb3RvdHlwZS5fbGV2ZWxzID0ge1xuXHR0cmFjZTogdHJ1ZSxcblx0aW5mbzogdHJ1ZSxcblx0d2FybjogdHJ1ZSxcblx0ZXJyb3I6IHRydWUsXG5cdGZhdGFsOiB0cnVlXG59O1xuXG4vKipcbiAqIExvZ3MgdHJhY2UgbWVzc2FnZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIFRyYWNlIG1lc3NhZ2UuXG4gKi9cbkxvZ2dlci5wcm90b3R5cGUudHJhY2UgPSBmdW5jdGlvbiAobWVzc2FnZSkge1xuXHRpZiAoIXRoaXMuX2xldmVscy50cmFjZSkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGlmIChjb25zb2xlLmxvZykge1xuXHRcdGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xuXHR9XG59O1xuXG4vKipcbiAqIExvZ3MgaW5mbyBtZXNzYWdlLlxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgSW5mb3JtYXRpb24gbWVzc2FnZS5cbiAqL1xuTG9nZ2VyLnByb3RvdHlwZS5pbmZvID0gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcblx0aWYgKCF0aGlzLl9sZXZlbHMuaW5mbykge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGlmIChjb25zb2xlLmluZm8pIHtcblx0XHRjb25zb2xlLmluZm8obWVzc2FnZSk7XG5cdH1cbn07XG5cbi8qKlxuICogTG9ncyB3YXJuIG1lc3NhZ2UuXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSBXYXJuaW5nIG1lc3NhZ2UuXG4gKi9cbkxvZ2dlci5wcm90b3R5cGUud2FybiA9IGZ1bmN0aW9uIChtZXNzYWdlKSB7XG5cdGlmICghdGhpcy5fbGV2ZWxzLndhcm4pIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRpZiAoY29uc29sZS53YXJuKSB7XG5cdFx0Y29uc29sZS53YXJuKG1lc3NhZ2UpO1xuXHR9XG59O1xuLyoqXG4gKiBMb2dzIGVycm9yIG1lc3NhZ2UuXG4gKiBAcGFyYW0ge3N0cmluZ3xFcnJvcn0gZXJyb3IgRXJyb3Igb2JqZWN0IG9yIG1lc3NhZ2UuXG4gKi9cbkxvZ2dlci5wcm90b3R5cGUuZXJyb3IgPSBmdW5jdGlvbiAoZXJyb3IpIHtcblx0aWYgKCF0aGlzLl9sZXZlbHMuZXJyb3IpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHR3cml0ZUVycm9yKGVycm9yKTtcbn07XG5cbi8qKlxuICogTG9ncyBlcnJvciBtZXNzYWdlLlxuICogQHBhcmFtIHtzdHJpbmd8RXJyb3J9IGVycm9yIEVycm9yIG9iamVjdCBvciBtZXNzYWdlLlxuICovXG5Mb2dnZXIucHJvdG90eXBlLmZhdGFsID0gZnVuY3Rpb24gKGVycm9yKSB7XG5cdGlmICghdGhpcy5fbGV2ZWxzLmZhdGFsKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHdyaXRlRXJyb3IoZXJyb3IpO1xufTtcblxuLyoqXG4gKiBXcml0ZXMgZXJyb3IgdG8gY29uc29sZS5cbiAqIEBwYXJhbSB7RXJyb3J8c3RyaW5nfSBlcnJvciBFcnJvciB0byB3cml0ZS5cbiAqL1xuZnVuY3Rpb24gd3JpdGVFcnJvcihlcnJvcikge1xuXHR0cnkge1xuXHRcdGlmICghKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpKSB7XG5cdFx0XHRlcnJvciA9IHR5cGVvZihlcnJvcikgPT09ICdzdHJpbmcnID8gbmV3IEVycm9yKGVycm9yKSA6IG5ldyBFcnJvcigpO1xuXHRcdH1cblx0XHRpZiAoY29uc29sZS5lcnJvcikge1xuXHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcik7XG5cdFx0fVxuXHR9IGNhdGNoIChlKSB7XG5cdFx0d3JpdGVFcnJvcihlKTtcblx0fVxufSIsIi8qXG4gKiBjYXRiZXJyeVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNCBEZW5pcyBSZWNoa3Vub3YgYW5kIHByb2plY3QgY29udHJpYnV0b3JzLlxuICpcbiAqIGNhdGJlcnJ5J3MgbGljZW5zZSBmb2xsb3dzOlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXG4gKiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvblxuICogZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLFxuICogaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSxcbiAqIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsXG4gKiBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuICogc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbiAqIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1NcbiAqIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICpcbiAqIFRoaXMgbGljZW5zZSBhcHBsaWVzIHRvIGFsbCBwYXJ0cyBvZiBjYXRiZXJyeSB0aGF0IGFyZSBub3QgZXh0ZXJuYWxseVxuICogbWFpbnRhaW5lZCBsaWJyYXJpZXMuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlcXVlc3RSb3V0ZXI7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgndXRpbCcpLFxuXHRVUkkgPSByZXF1aXJlKCdjYXRiZXJyeS11cmknKS5VUkk7XG5cbnZhciBNT1VTRV9LRVlTID0ge1xuXHRcdExFRlQ6IDAsXG5cdFx0TUlERExFOiAxXG5cdH0sXG5cblx0SFJFRl9BVFRSSUJVVEVfTkFNRSA9ICdocmVmJyxcblx0VEFSR0VUX0FUVFJJQlVURV9OQU1FID0gJ3RhcmdldCcsXG5cdEFfVEFHX05BTUUgPSAnQScsXG5cdEJPRFlfVEFHX05BTUUgPSAnQk9EWSc7XG5cbi8qKlxuICogQ3JlYXRlcyBuZXcgaW5zdGFuY2Ugb2YgdGhlIGJyb3dzZXIgcmVxdWVzdCByb3V0ZXIuXG4gKiBAcGFyYW0ge1NlcnZpY2VMb2NhdG9yfSAkc2VydmljZUxvY2F0b3IgU2VydmljZSBsb2NhdG9yIHRvIHJlc29sdmUgc2VydmljZXMuXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gUmVxdWVzdFJvdXRlcigkc2VydmljZUxvY2F0b3IpIHtcblx0dGhpcy5fZXZlbnRCdXMgPSAkc2VydmljZUxvY2F0b3IucmVzb2x2ZSgnZXZlbnRCdXMnKTtcblx0dGhpcy5fd2luZG93ID0gJHNlcnZpY2VMb2NhdG9yLnJlc29sdmUoJ3dpbmRvdycpO1xuXHR0aGlzLl9kb2N1bWVudFJlbmRlcmVyID0gJHNlcnZpY2VMb2NhdG9yLnJlc29sdmUoJ2RvY3VtZW50UmVuZGVyZXInKTtcblx0dGhpcy5fc3RhdGVQcm92aWRlciA9ICRzZXJ2aWNlTG9jYXRvci5yZXNvbHZlKCdzdGF0ZVByb3ZpZGVyJyk7XG5cdHRoaXMuX2NvbnRleHRGYWN0b3J5ID0gJHNlcnZpY2VMb2NhdG9yLnJlc29sdmUoJ2NvbnRleHRGYWN0b3J5Jyk7XG5cblx0dGhpcy5faXNIaXN0b3J5U3VwcG9ydGVkID0gdGhpcy5fd2luZG93Lmhpc3RvcnkgJiZcblx0XHR0aGlzLl93aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUgaW5zdGFuY2VvZiBGdW5jdGlvbjtcblx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdC8vIGFkZCBldmVudCBoYW5kbGVyc1xuXHRzZWxmLl93cmFwRG9jdW1lbnQoKTtcblxuXHQvLyBzZXQgaW5pdGlhbCBzdGF0ZSBmcm9tIGN1cnJlbnQgVVJJXG5cdHRoaXMuX2NoYW5nZVN0YXRlKG5ldyBVUkkodGhpcy5fd2luZG93LmxvY2F0aW9uLnRvU3RyaW5nKCkpKVxuXHRcdC5jYXRjaChmdW5jdGlvbiAocmVhc29uKSB7XG5cdFx0XHRzZWxmLl9oYW5kbGVFcnJvcihyZWFzb24pO1xuXHRcdH0pO1xufVxuXG4vKipcbiAqIEN1cnJlbnQgaW5pdGlhbGl6YXRpb24gZmxhZy5cbiAqIEB0eXBlIHtib29sZWFufVxuICogQHByaXZhdGVcbiAqL1xuUmVxdWVzdFJvdXRlci5wcm90b3R5cGUuX2lzU3RhdGVJbml0aWFsaXplZCA9IGZhbHNlO1xuXG4vKipcbiAqIEN1cnJlbnQgcmVmZXJyZXIuXG4gKiBAdHlwZSB7VVJJfVxuICogQHByaXZhdGVcbiAqL1xuUmVxdWVzdFJvdXRlci5wcm90b3R5cGUuX3JlZmVycmVyID0gJyc7XG5cbi8qKlxuICogQ3VycmVudCBsb2NhdGlvbi5cbiAqIEB0eXBlIHtVUkl9XG4gKiBAcHJpdmF0ZVxuICovXG5SZXF1ZXN0Um91dGVyLnByb3RvdHlwZS5fbG9jYXRpb24gPSBudWxsO1xuXG4vKipcbiAqIEN1cnJlbnQgZXZlbnQgYnVzLlxuICogQHR5cGUge0V2ZW50RW1pdHRlcn1cbiAqIEBwcml2YXRlXG4gKi9cblJlcXVlc3RSb3V0ZXIucHJvdG90eXBlLl9ldmVudEJ1cyA9IG51bGw7XG5cbi8qKlxuICogQ3VycmVudCBjb250ZXh0IGZhY3RvcnkuXG4gKiBAdHlwZSB7Q29udGV4dEZhY3Rvcnl9XG4gKiBAcHJpdmF0ZVxuICovXG5SZXF1ZXN0Um91dGVyLnByb3RvdHlwZS5fY29udGV4dEZhY3RvcnkgPSBudWxsO1xuXG4vKipcbiAqIEN1cnJlbnQgc3RhdGUgcHJvdmlkZXIuXG4gKiBAdHlwZSB7U3RhdGVQcm92aWRlcn1cbiAqIEBwcml2YXRlXG4gKi9cblJlcXVlc3RSb3V0ZXIucHJvdG90eXBlLl9zdGF0ZVByb3ZpZGVyID0gbnVsbDtcblxuLyoqXG4gKiBDdXJyZW50IGRvY3VtZW50IHJlbmRlcmVyLlxuICogQHR5cGUge0RvY3VtZW50UmVuZGVyZXJ9XG4gKiBAcHJpdmF0ZVxuICovXG5SZXF1ZXN0Um91dGVyLnByb3RvdHlwZS5fZG9jdW1lbnRSZW5kZXJlciA9IG51bGw7XG5cbi8qKlxuICogQ3VycmVudCBicm93c2VyIHdpbmRvdy5cbiAqIEB0eXBlIHtXaW5kb3d9XG4gKiBAcHJpdmF0ZVxuICovXG5SZXF1ZXN0Um91dGVyLnByb3RvdHlwZS5fd2luZG93ID0gbnVsbDtcblxuLyoqXG4gKiBUcnVlIGlmIGN1cnJlbnQgYnJvd3NlciBzdXBwb3J0cyBoaXN0b3J5IEFQSS5cbiAqIEB0eXBlIHtib29sZWFufVxuICogQHByaXZhdGVcbiAqL1xuUmVxdWVzdFJvdXRlci5wcm90b3R5cGUuX2lzSGlzdG9yeVN1cHBvcnRlZCA9IGZhbHNlO1xuXG4vKipcbiAqIFJvdXRlcyBicm93c2VyIHJlbmRlciByZXF1ZXN0LlxuICogQHJldHVybnMge1Byb21pc2V9IFByb21pc2UgZm9yIG5vdGhpbmcuXG4gKi9cblJlcXVlc3RSb3V0ZXIucHJvdG90eXBlLnJvdXRlID0gZnVuY3Rpb24gKCkge1xuXHR2YXIgc2VsZiA9IHRoaXM7XG5cdC8vIGJlY2F1c2Ugbm93IGxvY2F0aW9uIHdhcyBub3QgY2hhbmdlIHlldCBhbmRcblx0Ly8gZGlmZmVyZW50IGJyb3dzZXJzIGhhbmRsZSBgcG9wc3RhdGVgIGRpZmZlcmVudGx5XG5cdC8vIHdlIG5lZWQgdG8gZG8gcm91dGUgaW4gbmV4dCBpdGVyYXRpb24gb2YgZXZlbnQgbG9vcFxuXHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcblx0XHQudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgbmV3TG9jYXRpb24gPSBuZXcgVVJJKHNlbGYuX3dpbmRvdy5sb2NhdGlvbi50b1N0cmluZygpKSxcblx0XHRcdFx0bmV3QXV0aG9yaXR5ID0gbmV3TG9jYXRpb24uYXV0aG9yaXR5ID9cblx0XHRcdFx0XHRuZXdMb2NhdGlvbi5hdXRob3JpdHkudG9TdHJpbmcoKSA6IG51bGwsXG5cdFx0XHRcdGN1cnJlbnRBdXRob3JpdHkgPSBzZWxmLl9sb2NhdGlvbi5hdXRob3JpdHkgP1xuXHRcdFx0XHRcdHNlbGYuX2xvY2F0aW9uLmF1dGhvcml0eS50b1N0cmluZygpIDogbnVsbDtcblxuXHRcdFx0aWYgKG5ld0xvY2F0aW9uLnNjaGVtZSAhPT0gc2VsZi5fbG9jYXRpb24uc2NoZW1lIHx8XG5cdFx0XHRcdG5ld0F1dGhvcml0eSAhPT0gY3VycmVudEF1dGhvcml0eSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIGlmIG9ubHkgVVJJIGZyYWdtZW50IGlzIGNoYW5nZWRcblx0XHRcdHZhciBuZXdRdWVyeSA9IG5ld0xvY2F0aW9uLnF1ZXJ5ID9cblx0XHRcdFx0XHRuZXdMb2NhdGlvbi5xdWVyeS50b1N0cmluZygpIDogbnVsbCxcblx0XHRcdFx0Y3VycmVudFF1ZXJ5ID0gc2VsZi5fbG9jYXRpb24ucXVlcnkgP1xuXHRcdFx0XHRcdHNlbGYuX2xvY2F0aW9uLnF1ZXJ5LnRvU3RyaW5nKCkgOiBudWxsO1xuXHRcdFx0aWYgKG5ld0xvY2F0aW9uLnBhdGggPT09IHNlbGYuX2xvY2F0aW9uLnBhdGggJiZcblx0XHRcdFx0bmV3UXVlcnkgPT09IGN1cnJlbnRRdWVyeSkge1xuXHRcdFx0XHRzZWxmLl9sb2NhdGlvbiA9IG5ld0xvY2F0aW9uO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gc2VsZi5fY2hhbmdlU3RhdGUobmV3TG9jYXRpb24pO1xuXHRcdH0pO1xufTtcblxuLyoqXG4gKiBTZXRzIGFwcGxpY2F0aW9uIHN0YXRlIHRvIHNwZWNpZmllZCBVUkkuXG4gKiBAcGFyYW0ge3N0cmluZ30gbG9jYXRpb25TdHJpbmcgVVJJIHRvIGdvLlxuICogQHJldHVybnMge1Byb21pc2V9IFByb21pc2UgZm9yIG5vdGhpbmcuXG4gKi9cblJlcXVlc3RSb3V0ZXIucHJvdG90eXBlLmdvID0gZnVuY3Rpb24gKGxvY2F0aW9uU3RyaW5nKSB7XG5cdHZhciBzZWxmID0gdGhpcztcblx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG5cdFx0LnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIGxvY2F0aW9uID0gbmV3IFVSSShsb2NhdGlvblN0cmluZyk7XG5cdFx0XHRsb2NhdGlvbiA9IGxvY2F0aW9uLnJlc29sdmVSZWxhdGl2ZShzZWxmLl9sb2NhdGlvbik7XG5cdFx0XHRsb2NhdGlvblN0cmluZyA9IGxvY2F0aW9uLnRvU3RyaW5nKCk7XG5cblx0XHRcdHZhciBjdXJyZW50QXV0aG9yaXR5ID0gc2VsZi5fbG9jYXRpb24uYXV0aG9yaXR5ID9cblx0XHRcdFx0XHRzZWxmLl9sb2NhdGlvbi5hdXRob3JpdHkudG9TdHJpbmcoKSA6IG51bGwsXG5cdFx0XHRcdG5ld0F1dGhvcml0eSA9IGxvY2F0aW9uLmF1dGhvcml0eSA/XG5cdFx0XHRcdFx0bG9jYXRpb24uYXV0aG9yaXR5LnRvU3RyaW5nKCkgOiBudWxsO1xuXG5cdFx0XHQvLyB3ZSBtdXN0IGNoZWNrIGlmIHRoaXMgaXMgYW4gZXh0ZXJuYWwgbGluayBiZWZvcmUgbWFwIFVSSVxuXHRcdFx0Ly8gdG8gaW50ZXJuYWwgYXBwbGljYXRpb24gc3RhdGVcblx0XHRcdGlmICghc2VsZi5faXNIaXN0b3J5U3VwcG9ydGVkIHx8XG5cdFx0XHRcdGxvY2F0aW9uLnNjaGVtZSAhPT0gc2VsZi5fbG9jYXRpb24uc2NoZW1lIHx8XG5cdFx0XHRcdG5ld0F1dGhvcml0eSAhPT0gY3VycmVudEF1dGhvcml0eSkge1xuXHRcdFx0XHRzZWxmLl93aW5kb3cubG9jYXRpb24uYXNzaWduKGxvY2F0aW9uU3RyaW5nKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgc3RhdGUgPSBzZWxmLl9zdGF0ZVByb3ZpZGVyLmdldFN0YXRlQnlVcmkobG9jYXRpb24pO1xuXHRcdFx0aWYgKCFzdGF0ZSkge1xuXHRcdFx0XHRzZWxmLl93aW5kb3cubG9jYXRpb24uYXNzaWduKGxvY2F0aW9uU3RyaW5nKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRzZWxmLl93aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoc3RhdGUsICcnLCBsb2NhdGlvblN0cmluZyk7XG5cdFx0XHRyZXR1cm4gc2VsZi5yb3V0ZSgpO1xuXHRcdH0pO1xufTtcblxuLyoqXG4gKiBDaGFuZ2VzIGN1cnJlbnQgYXBwbGljYXRpb24gc3RhdGUgd2l0aCBuZXcgbG9jYXRpb24uXG4gKiBAcGFyYW0ge1VSSX0gbmV3TG9jYXRpb24gTmV3IGxvY2F0aW9uLlxuICogQHJldHVybnMge1Byb21pc2V9IFByb21pc2UgZm9yIG5vdGhpbmcuXG4gKiBAcHJpdmF0ZVxuICovXG5SZXF1ZXN0Um91dGVyLnByb3RvdHlwZS5fY2hhbmdlU3RhdGUgPSBmdW5jdGlvbiAobmV3TG9jYXRpb24pIHtcblx0dmFyIHNlbGYgPSB0aGlzO1xuXHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcblx0XHQudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRzZWxmLl9sb2NhdGlvbiA9IG5ld0xvY2F0aW9uO1xuXHRcdFx0dmFyIHN0YXRlID0gc2VsZi5fc3RhdGVQcm92aWRlci5nZXRTdGF0ZUJ5VXJpKG5ld0xvY2F0aW9uKSxcblx0XHRcdFx0cm91dGluZ0NvbnRleHQgPSBzZWxmLl9jb250ZXh0RmFjdG9yeS5jcmVhdGUoe1xuXHRcdFx0XHRcdHJlZmVycmVyOiBzZWxmLl9yZWZlcnJlciB8fCBzZWxmLl93aW5kb3cuZG9jdW1lbnQucmVmZXJyZXIsXG5cdFx0XHRcdFx0bG9jYXRpb246IHNlbGYuX2xvY2F0aW9uLFxuXHRcdFx0XHRcdHVzZXJBZ2VudDogc2VsZi5fd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnRcblx0XHRcdFx0fSk7XG5cblx0XHRcdGlmICghc2VsZi5faXNTdGF0ZUluaXRpYWxpemVkKSB7XG5cdFx0XHRcdHNlbGYuX2lzU3RhdGVJbml0aWFsaXplZCA9IHRydWU7XG5cdFx0XHRcdHJldHVybiBzZWxmLl9kb2N1bWVudFJlbmRlcmVyLmluaXRXaXRoU3RhdGUoXG5cdFx0XHRcdFx0c3RhdGUsIHJvdXRpbmdDb250ZXh0XG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChzdGF0ZSA9PT0gbnVsbCkge1xuXHRcdFx0XHR3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHNlbGYuX2RvY3VtZW50UmVuZGVyZXJcblx0XHRcdFx0LnJlbmRlcihzdGF0ZSwgcm91dGluZ0NvbnRleHQpO1xuXHRcdH0pXG5cdFx0LnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0c2VsZi5fcmVmZXJyZXIgPSBzZWxmLl9sb2NhdGlvbjtcblx0XHR9KTtcbn07XG5cbi8qKlxuICogV3JhcHMgZG9jdW1lbnQgd2l0aCByZXF1aXJlZCBldmVudHMgdG8gcm91dGUgcmVxdWVzdHMuXG4gKiBAcHJpdmF0ZVxuICovXG5SZXF1ZXN0Um91dGVyLnByb3RvdHlwZS5fd3JhcERvY3VtZW50ID0gZnVuY3Rpb24gKCkge1xuXHR2YXIgc2VsZiA9IHRoaXM7XG5cblx0aWYgKCF0aGlzLl9pc0hpc3RvcnlTdXBwb3J0ZWQpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHR0aGlzLl93aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9wc3RhdGUnLCBmdW5jdGlvbiAoKSB7XG5cdFx0c2VsZi5yb3V0ZSgpLmNhdGNoKHNlbGYuX2hhbmRsZUVycm9yLmJpbmQoc2VsZikpO1xuXHR9KTtcblxuXHR0aGlzLl93aW5kb3cuZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuXHRcdGlmIChldmVudC5kZWZhdWx0UHJldmVudGVkKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGlmIChldmVudC50YXJnZXQudGFnTmFtZSA9PT0gQV9UQUdfTkFNRSkge1xuXHRcdFx0c2VsZi5fbGlua0NsaWNrSGFuZGxlcihldmVudCwgZXZlbnQudGFyZ2V0KVxuXHRcdFx0XHQuY2F0Y2goc2VsZi5faGFuZGxlRXJyb3IuYmluZChzZWxmKSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBsaW5rID0gY2xvc2VzdExpbmsoZXZlbnQudGFyZ2V0KTtcblx0XHRcdGlmICghbGluaykge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRzZWxmLl9saW5rQ2xpY2tIYW5kbGVyKGV2ZW50LCBsaW5rKTtcblx0XHR9XG5cdH0pO1xufTtcblxuLyoqXG4gKiBIYW5kbGVzIGxpbmsgY2xpY2sgb24gdGhlIHBhZ2UuXG4gKiBAcGFyYW0ge0V2ZW50fSBldmVudCBFdmVudC1yZWxhdGVkIG9iamVjdC5cbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCBMaW5rIGVsZW1lbnQuXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gUHJvbWlzZSBmb3Igbm90aGluZy5cbiAqIEBwcml2YXRlXG4gKi9cblJlcXVlc3RSb3V0ZXIucHJvdG90eXBlLl9saW5rQ2xpY2tIYW5kbGVyID0gZnVuY3Rpb24gKGV2ZW50LCBlbGVtZW50KSB7XG5cdHZhciBzZWxmID0gdGhpcztcblx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG5cdFx0LnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIHRhcmdldEF0dHJpYnV0ZSA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKFRBUkdFVF9BVFRSSUJVVEVfTkFNRSk7XG5cdFx0XHRpZiAodGFyZ2V0QXR0cmlidXRlKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gaWYgbWlkZGxlIG1vdXNlIGJ1dHRvbiB3YXMgY2xpY2tlZFxuXHRcdFx0aWYgKGV2ZW50LmJ1dHRvbiA9PT0gTU9VU0VfS0VZUy5NSURETEUpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgbG9jYXRpb25TdHJpbmcgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShIUkVGX0FUVFJJQlVURV9OQU1FKTtcblx0XHRcdGlmICghbG9jYXRpb25TdHJpbmcpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGxvY2F0aW9uU3RyaW5nWzBdID09PSAnIycpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0cmV0dXJuIHNlbGYuZ28obG9jYXRpb25TdHJpbmcpO1xuXHRcdH0pXG5cdFx0LmNhdGNoKGZ1bmN0aW9uIChyZWFzb24pIHtcblx0XHRcdHNlbGYuX2hhbmRsZUVycm9yKHJlYXNvbik7XG5cdFx0fSk7XG59O1xuXG4vKipcbiAqIEhhbmRsZXMgYWxsIGVycm9ycy5cbiAqIEBwYXJhbSB7RXJyb3J9IGVycm9yIEVycm9yIHRvIGhhbmRsZS5cbiAqIEBwcml2YXRlXG4gKi9cblJlcXVlc3RSb3V0ZXIucHJvdG90eXBlLl9oYW5kbGVFcnJvciA9IGZ1bmN0aW9uIChlcnJvcikge1xuXHR0aGlzLl9ldmVudEJ1cy5lbWl0KCdlcnJvcicsIGVycm9yKTtcbn07XG5cbi8qKlxuICogRmluZHMgdGhlIGNsb3Nlc3QgYXNjZW5kaW5nIFwiQVwiIGVsZW1lbnQgbm9kZS5cbiAqIEBwYXJhbSB7Tm9kZX0gZWxlbWVudCBET00gZWxlbWVudC5cbiAqIEByZXR1cm5zIHtOb2RlfG51bGx9IFRoZSBjbG9zZXN0IFwiQVwiIGVsZW1lbnQgb3IgbnVsbC5cbiAqL1xuZnVuY3Rpb24gY2xvc2VzdExpbmsoZWxlbWVudCkge1xuXHR3aGlsZShlbGVtZW50ICYmIGVsZW1lbnQubm9kZU5hbWUgIT09IEFfVEFHX05BTUUgJiZcblx0XHRlbGVtZW50Lm5vZGVOYW1lICE9PSBCT0RZX1RBR19OQU1FKSB7XG5cdFx0ZWxlbWVudCA9IGVsZW1lbnQucGFyZW50Tm9kZTtcblx0fVxuXHRyZXR1cm4gZWxlbWVudCAmJiBlbGVtZW50Lm5vZGVOYW1lID09PSBBX1RBR19OQU1FID8gZWxlbWVudCA6IG51bGw7XG59IiwiLypcbiAqIGNhdGJlcnJ5XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE1IERlbmlzIFJlY2hrdW5vdiBhbmQgcHJvamVjdCBjb250cmlidXRvcnMuXG4gKlxuICogY2F0YmVycnkncyBsaWNlbnNlIGZvbGxvd3M6XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb25cbiAqIG9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uXG4gKiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sXG4gKiBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLFxuICogcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSxcbiAqIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4gKiBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuICogaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuICogT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKlxuICogVGhpcyBsaWNlbnNlIGFwcGxpZXMgdG8gYWxsIHBhcnRzIG9mIGNhdGJlcnJ5IHRoYXQgYXJlIG5vdCBleHRlcm5hbGx5XG4gKiBtYWludGFpbmVkIGxpYnJhcmllcy5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50TG9hZGVyO1xuXG52YXIgbW9kdWxlSGVscGVyID0gcmVxdWlyZSgnLi4vLi4vbGliL2hlbHBlcnMvbW9kdWxlSGVscGVyJyksXG5cdHV0aWwgPSByZXF1aXJlKCd1dGlsJyksXG5cdExvYWRlckJhc2UgPSByZXF1aXJlKCcuLi8uLi9saWIvYmFzZS9Mb2FkZXJCYXNlJyk7XG5cbnV0aWwuaW5oZXJpdHMoQ29tcG9uZW50TG9hZGVyLCBMb2FkZXJCYXNlKTtcblxuLyoqXG4gKiBDcmVhdGVzIG5ldyBpbnN0YW5jZSBvZiB0aGUgY29tcG9uZW50IGxvYWRlci5cbiAqIEBwYXJhbSB7U2VydmljZUxvY2F0b3J9ICRzZXJ2aWNlTG9jYXRvciBMb2NhdG9yIHRvIHJlc29sdmUgZGVwZW5kZW5jaWVzLlxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBMb2FkZXJCYXNlXG4gKi9cbmZ1bmN0aW9uIENvbXBvbmVudExvYWRlcigkc2VydmljZUxvY2F0b3IpIHtcblx0dGhpcy5fc2VydmljZUxvY2F0b3IgPSAkc2VydmljZUxvY2F0b3I7XG5cdHRoaXMuX2V2ZW50QnVzID0gJHNlcnZpY2VMb2NhdG9yLnJlc29sdmUoJ2V2ZW50QnVzJyk7XG5cdHRoaXMuX3RlbXBsYXRlUHJvdmlkZXIgPSAkc2VydmljZUxvY2F0b3IucmVzb2x2ZSgndGVtcGxhdGVQcm92aWRlcicpO1xuXHRMb2FkZXJCYXNlLmNhbGwodGhpcywgJHNlcnZpY2VMb2NhdG9yLnJlc29sdmVBbGwoJ2NvbXBvbmVudFRyYW5zZm9ybScpKTtcbn1cblxuLyoqXG4gKiBDdXJyZW50IGV2ZW50IGJ1cy5cbiAqIEB0eXBlIHtFdmVudEVtaXR0ZXJ9XG4gKiBAcHJpdmF0ZVxuICovXG5Db21wb25lbnRMb2FkZXIucHJvdG90eXBlLl9ldmVudEJ1cyA9IG51bGw7XG5cbi8qKlxuICogQ3VycmVudCBzZXJ2aWNlIGxvY2F0b3IuXG4gKiBAdHlwZSB7U2VydmljZUxvY2F0b3J9XG4gKiBAcHJpdmF0ZVxuICovXG5Db21wb25lbnRMb2FkZXIucHJvdG90eXBlLl9zZXJ2aWNlTG9jYXRvciA9IG51bGw7XG5cbi8qKlxuICogQ3VycmVudCB0ZW1wbGF0ZSBwcm92aWRlci5cbiAqIEB0eXBlIHtUZW1wbGF0ZVByb3ZpZGVyfVxuICogQHByaXZhdGVcbiAqL1xuQ29tcG9uZW50TG9hZGVyLnByb3RvdHlwZS5fdGVtcGxhdGVQcm92aWRlciA9IG51bGw7XG5cbi8qKlxuICogQ3VycmVudCBtYXAgb2YgbG9hZGVkIGNvbXBvbmVudHMgYnkgbmFtZXMuXG4gKiBAdHlwZSB7T2JqZWN0fSBNYXAgb2YgY29tcG9uZW50cyBieSBuYW1lcy5cbiAqIEBwcml2YXRlXG4gKi9cbkNvbXBvbmVudExvYWRlci5wcm90b3R5cGUuX2xvYWRlZENvbXBvbmVudHMgPSBudWxsO1xuXG4vKipcbiAqIExvYWRzIGNvbXBvbmVudHMgd2hlbiBpdCBpcyBpbiBhIGJyb3dzZXIuXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gUHJvbWlzZSBmb3Igbm90aGluZy5cbiAqL1xuQ29tcG9uZW50TG9hZGVyLnByb3RvdHlwZS5sb2FkID0gZnVuY3Rpb24gKCkge1xuXHRpZiAodGhpcy5fbG9hZGVkQ29tcG9uZW50cykge1xuXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5fbG9hZGVkQ29tcG9uZW50cyk7XG5cdH1cblxuXHR0aGlzLl9sb2FkZWRDb21wb25lbnRzID0ge307XG5cblx0dmFyIHNlbGYgPSB0aGlzO1xuXHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcblx0XHQudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgY29tcG9uZW50cyA9IHNlbGYuX3NlcnZpY2VMb2NhdG9yLnJlc29sdmVBbGwoJ2NvbXBvbmVudCcpLFxuXHRcdFx0XHRjb21wb25lbnRQcm9taXNlcyA9IFtdO1xuXG5cdFx0XHQvLyB0aGUgbGlzdCBpcyBhIHN0YWNrLCB3ZSBzaG91bGQgcmV2ZXJzZSBpdFxuXHRcdFx0Y29tcG9uZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChjb21wb25lbnQpIHtcblx0XHRcdFx0Y29tcG9uZW50UHJvbWlzZXMudW5zaGlmdChcblx0XHRcdFx0XHRzZWxmLl9wcm9jZXNzQ29tcG9uZW50KGNvbXBvbmVudClcblx0XHRcdFx0KTtcblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIFByb21pc2UuYWxsKGNvbXBvbmVudFByb21pc2VzKTtcblx0XHR9KVxuXHRcdC50aGVuKGZ1bmN0aW9uIChjb21wb25lbnRzKSB7XG5cdFx0XHRjb21wb25lbnRzLmZvckVhY2goZnVuY3Rpb24gKGNvbXBvbmVudCkge1xuXHRcdFx0XHRpZiAoIWNvbXBvbmVudCB8fCB0eXBlb2YoY29tcG9uZW50KSAhPT0gJ29iamVjdCcpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdFx0c2VsZi5fbG9hZGVkQ29tcG9uZW50c1tjb21wb25lbnQubmFtZV0gPSBjb21wb25lbnQ7XG5cdFx0XHR9KTtcblx0XHRcdHNlbGYuX2V2ZW50QnVzLmVtaXQoJ2FsbENvbXBvbmVudHNMb2FkZWQnLCBjb21wb25lbnRzKTtcblx0XHRcdHJldHVybiBzZWxmLl9sb2FkZWRDb21wb25lbnRzO1xuXHRcdH0pO1xufTtcblxuLyoqXG4gKiBQcm9jZXNzZXMgY29tcG9uZW50IGFuZCBhcHBseSByZXF1aXJlZCBvcGVyYXRpb25zLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbXBvbmVudERldGFpbHMgTG9hZGVkIGNvbXBvbmVudCBkZXRhaWxzLlxuICogQHJldHVybnMge09iamVjdH0gQ29tcG9uZW50IG9iamVjdC5cbiAqIEBwcml2YXRlXG4gKi9cbkNvbXBvbmVudExvYWRlci5wcm90b3R5cGUuX3Byb2Nlc3NDb21wb25lbnQgPSBmdW5jdGlvbiAoY29tcG9uZW50RGV0YWlscykge1xuXHR2YXIgc2VsZiA9IHRoaXMsXG5cdFx0Y29tcG9uZW50ID0gT2JqZWN0LmNyZWF0ZShjb21wb25lbnREZXRhaWxzKTtcblxuXHRyZXR1cm4gdGhpcy5fYXBwbHlUcmFuc2Zvcm1zKGNvbXBvbmVudClcblx0XHQudGhlbihmdW5jdGlvbiAodHJhbnNmb3JtZWQpIHtcblx0XHRcdGNvbXBvbmVudCA9IHRyYW5zZm9ybWVkO1xuXHRcdFx0c2VsZi5fdGVtcGxhdGVQcm92aWRlci5yZWdpc3RlckNvbXBpbGVkKFxuXHRcdFx0XHRjb21wb25lbnQubmFtZSwgY29tcG9uZW50LnRlbXBsYXRlU291cmNlXG5cdFx0XHQpO1xuXHRcdFx0Y29tcG9uZW50LnRlbXBsYXRlID0ge1xuXHRcdFx0XHRyZW5kZXI6IGZ1bmN0aW9uIChkYXRhQ29udGV4dCkge1xuXHRcdFx0XHRcdHJldHVybiBzZWxmLl90ZW1wbGF0ZVByb3ZpZGVyLnJlbmRlcihcblx0XHRcdFx0XHRcdGNvbXBvbmVudC5uYW1lLCBkYXRhQ29udGV4dFxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHRpZiAodHlwZW9mKGNvbXBvbmVudC5lcnJvclRlbXBsYXRlU291cmNlKSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdFx0dmFyIGVycm9yVGVtcGxhdGVOYW1lID0gbW9kdWxlSGVscGVyLmdldE5hbWVGb3JFcnJvclRlbXBsYXRlKFxuXHRcdFx0XHRcdGNvbXBvbmVudC5uYW1lXG5cdFx0XHRcdCk7XG5cdFx0XHRcdHNlbGYuX3RlbXBsYXRlUHJvdmlkZXIucmVnaXN0ZXJDb21waWxlZChcblx0XHRcdFx0XHRlcnJvclRlbXBsYXRlTmFtZSwgY29tcG9uZW50LmVycm9yVGVtcGxhdGVTb3VyY2Vcblx0XHRcdFx0KTtcblx0XHRcdFx0Y29tcG9uZW50LmVycm9yVGVtcGxhdGUgPSB7XG5cdFx0XHRcdFx0cmVuZGVyOiBmdW5jdGlvbiAoZGF0YUNvbnRleHQpIHtcblx0XHRcdFx0XHRcdHJldHVybiBzZWxmLl90ZW1wbGF0ZVByb3ZpZGVyLnJlbmRlcihcblx0XHRcdFx0XHRcdFx0ZXJyb3JUZW1wbGF0ZU5hbWUsIGRhdGFDb250ZXh0XG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHRcdHNlbGYuX2V2ZW50QnVzLmVtaXQoJ2NvbXBvbmVudExvYWRlZCcsIGNvbXBvbmVudCk7XG5cdFx0XHRyZXR1cm4gY29tcG9uZW50O1xuXHRcdH0pXG5cdFx0LmNhdGNoKGZ1bmN0aW9uIChyZWFzb24pIHtcblx0XHRcdHNlbGYuX2V2ZW50QnVzLmVtaXQoJ2Vycm9yJywgcmVhc29uKTtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH0pO1xufTtcblxuLyoqXG4gKiBHZXRzIG1hcCBvZiBjb21wb25lbnRzIGJ5IG5hbWVzLlxuICogQHJldHVybnMge09iamVjdH0gTWFwIG9mIGNvbXBvbmVudHMgYnkgbmFtZXMuXG4gKi9cbkNvbXBvbmVudExvYWRlci5wcm90b3R5cGUuZ2V0Q29tcG9uZW50c0J5TmFtZXMgPSBmdW5jdGlvbiAoKSB7XG5cdHJldHVybiB0aGlzLl9sb2FkZWRDb21wb25lbnRzIHx8IHt9O1xufTsiLCIvKlxuICogY2F0YmVycnlcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUgRGVuaXMgUmVjaGt1bm92IGFuZCBwcm9qZWN0IGNvbnRyaWJ1dG9ycy5cbiAqXG4gKiBjYXRiZXJyeSdzIGxpY2Vuc2UgZm9sbG93czpcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvblxuICogb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb25cbiAqIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbixcbiAqIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsXG4gKiBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLFxuICogYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbiAqIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4gKiBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4gKiBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqXG4gKiBUaGlzIGxpY2Vuc2UgYXBwbGllcyB0byBhbGwgcGFydHMgb2YgY2F0YmVycnkgdGhhdCBhcmUgbm90IGV4dGVybmFsbHlcbiAqIG1haW50YWluZWQgbGlicmFyaWVzLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBTdG9yZUxvYWRlcjtcblxudmFyIG1vZHVsZUhlbHBlciA9IHJlcXVpcmUoJy4uLy4uL2xpYi9oZWxwZXJzL21vZHVsZUhlbHBlcicpLFxuXHR1dGlsID0gcmVxdWlyZSgndXRpbCcpLFxuXHRMb2FkZXJCYXNlID0gcmVxdWlyZSgnLi4vLi4vbGliL2Jhc2UvTG9hZGVyQmFzZScpO1xuXG51dGlsLmluaGVyaXRzKFN0b3JlTG9hZGVyLCBMb2FkZXJCYXNlKTtcblxuLyoqXG4gKiBDcmVhdGVzIGluc3RhbmNlIG9mIHRoZSBzdG9yZSBsb2FkZXIuXG4gKiBAcGFyYW0ge1NlcnZpY2VMb2NhdG9yfSAkc2VydmljZUxvY2F0b3IgTG9jYXRvciB0byByZXNvbHZlIHN0b3Jlcy5cbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgTG9hZGVyQmFzZVxuICovXG5mdW5jdGlvbiBTdG9yZUxvYWRlcigkc2VydmljZUxvY2F0b3IpIHtcblx0dGhpcy5fc2VydmljZUxvY2F0b3IgPSAkc2VydmljZUxvY2F0b3I7XG5cdHRoaXMuX2V2ZW50QnVzID0gJHNlcnZpY2VMb2NhdG9yLnJlc29sdmUoJ2V2ZW50QnVzJyk7XG5cdExvYWRlckJhc2UuY2FsbCh0aGlzLCAkc2VydmljZUxvY2F0b3IucmVzb2x2ZUFsbCgnc3RvcmVUcmFuc2Zvcm0nKSk7XG59XG5cbi8qKlxuICogQ3VycmVudCBldmVudCBidXMuXG4gKiBAdHlwZSB7RXZlbnRFbWl0dGVyfVxuICogQHByaXZhdGVcbiAqL1xuU3RvcmVMb2FkZXIucHJvdG90eXBlLl9ldmVudEJ1cyA9IG51bGw7XG5cbi8qKlxuICogQ3VycmVudCBzZXJ2aWNlIGxvY2F0b3IuXG4gKiBAdHlwZSB7U2VydmljZUxvY2F0b3J9XG4gKiBAcHJpdmF0ZVxuICovXG5TdG9yZUxvYWRlci5wcm90b3R5cGUuX3NlcnZpY2VMb2NhdG9yID0gbnVsbDtcblxuLyoqXG4gKiBDdXJyZW50IHNldCBvZiBsb2FkZWQgc3RvcmVzLlxuICogQHR5cGUge09iamVjdH1cbiAqIEBwcml2YXRlXG4gKi9cblN0b3JlTG9hZGVyLnByb3RvdHlwZS5fbG9hZGVkU3RvcmVzID0gbnVsbDtcblxuLyoqXG4gKiBMb2FkcyBhbGwgc3RvcmVzIHdoZW4gaXQgaXMgaW4gYSBicm93c2VyLlxuICogQHJldHVybnMge1Byb21pc2V9IFByb21pc2UgZm9yIG5vdGhpbmcuXG4gKi9cblN0b3JlTG9hZGVyLnByb3RvdHlwZS5sb2FkID0gZnVuY3Rpb24gKCkge1xuXHRpZiAodGhpcy5fbG9hZGVkU3RvcmVzKSB7XG5cdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9sb2FkZWRTdG9yZXMpO1xuXHR9XG5cblx0dGhpcy5fbG9hZGVkU3RvcmVzID0ge307XG5cdHZhciBzZWxmID0gdGhpcztcblxuXHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcblx0XHQudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgc3RvcmVzID0gc2VsZi5fc2VydmljZUxvY2F0b3IucmVzb2x2ZUFsbCgnc3RvcmUnKSxcblx0XHRcdFx0c3RvcmVQcm9taXNlcyA9IFtdO1xuXG5cdFx0XHQvLyB0aGUgbGlzdCBpcyBhIHN0YWNrLCB3ZSBzaG91bGQgcmV2ZXJzZSBpdFxuXHRcdFx0c3RvcmVzLmZvckVhY2goZnVuY3Rpb24gKHN0b3JlKSB7XG5cdFx0XHRcdHN0b3JlUHJvbWlzZXMudW5zaGlmdChcblx0XHRcdFx0XHRzZWxmLl9nZXRTdG9yZShzdG9yZSlcblx0XHRcdFx0KTtcblx0XHRcdH0pO1xuXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5hbGwoc3RvcmVQcm9taXNlcyk7XG5cdFx0fSlcblx0XHQudGhlbihmdW5jdGlvbiAoc3RvcmVzKSB7XG5cdFx0XHRzdG9yZXMuZm9yRWFjaChmdW5jdGlvbiAoc3RvcmUpIHtcblx0XHRcdFx0aWYgKCFzdG9yZSB8fCB0eXBlb2Yoc3RvcmUpICE9PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHRzZWxmLl9sb2FkZWRTdG9yZXNbc3RvcmUubmFtZV0gPSBzdG9yZTtcblx0XHRcdH0pO1xuXHRcdFx0c2VsZi5fZXZlbnRCdXMuZW1pdCgnYWxsU3RvcmVzTG9hZGVkJywgc2VsZi5fbG9hZGVkU3RvcmVzKTtcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoc2VsZi5fbG9hZGVkU3RvcmVzKTtcblx0XHR9KTtcbn07XG5cbi8qKlxuICogR2V0cyB0aGUgc3RvcmUgZnJvbSBzdG9yZSBkZXRhaWxzLlxuICogQHBhcmFtIHtPYmplY3R9IHN0b3JlRGV0YWlscyBTdG9yZSBkZXRhaWxzLlxuICogQHJldHVybnMge1Byb21pc2U8T2JqZWN0Pn0gUHJvbWlzZSBmb3Igc3RvcmUuXG4gKiBAcHJpdmF0ZVxuICovXG5TdG9yZUxvYWRlci5wcm90b3R5cGUuX2dldFN0b3JlID0gZnVuY3Rpb24gKHN0b3JlRGV0YWlscykge1xuXHR2YXIgc2VsZiA9IHRoaXM7XG5cdHJldHVybiB0aGlzLl9hcHBseVRyYW5zZm9ybXMoc3RvcmVEZXRhaWxzKVxuXHRcdC50aGVuKGZ1bmN0aW9uICh0cmFuc2Zvcm1lZCkge1xuXHRcdFx0c2VsZi5fZXZlbnRCdXMuZW1pdCgnc3RvcmVMb2FkZWQnLCB0cmFuc2Zvcm1lZCk7XG5cdFx0XHRyZXR1cm4gdHJhbnNmb3JtZWQ7XG5cdFx0fSlcblx0XHQuY2F0Y2goZnVuY3Rpb24gKHJlYXNvbikge1xuXHRcdFx0c2VsZi5fZXZlbnRCdXMuZW1pdCgnZXJyb3InLCByZWFzb24pO1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fSk7XG59O1xuXG4vKipcbiAqIEdldHMgc3RvcmVzIG1hcCBieSBuYW1lcy5cbiAqIEByZXR1cm5zIHtPYmplY3R9IE1hcCBvZiBzdG9yZXMgYnkgbmFtZXMuXG4gKi9cblN0b3JlTG9hZGVyLnByb3RvdHlwZS5nZXRTdG9yZXNCeU5hbWVzID0gZnVuY3Rpb24gKCkge1xuXHRyZXR1cm4gdGhpcy5fbG9hZGVkU3RvcmVzIHx8IHt9O1xufTsiLCIvKlxuICogY2F0YmVycnlcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgRGVuaXMgUmVjaGt1bm92IGFuZCBwcm9qZWN0IGNvbnRyaWJ1dG9ycy5cbiAqXG4gKiBjYXRiZXJyeSdzIGxpY2Vuc2UgZm9sbG93czpcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvblxuICogb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb25cbiAqIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbixcbiAqIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsXG4gKiBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLFxuICogYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbiAqIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4gKiBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4gKiBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqXG4gKiBUaGlzIGxpY2Vuc2UgYXBwbGllcyB0byBhbGwgcGFydHMgb2YgY2F0YmVycnkgdGhhdCBhcmUgbm90IGV4dGVybmFsbHlcbiAqIG1haW50YWluZWQgbGlicmFyaWVzLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBNb2R1bGVBcGlQcm92aWRlcjtcblxudmFyIHV0aWwgPSByZXF1aXJlKCd1dGlsJyksXG5cdHByb3BlcnR5SGVscGVyID0gcmVxdWlyZSgnLi4vLi4vbGliL2hlbHBlcnMvcHJvcGVydHlIZWxwZXInKSxcblx0TW9kdWxlQXBpUHJvdmlkZXJCYXNlID0gcmVxdWlyZSgnLi4vLi4vbGliL2Jhc2UvTW9kdWxlQXBpUHJvdmlkZXJCYXNlJyksXG5cdG1vZHVsZUhlbHBlciA9IHJlcXVpcmUoJy4uLy4uL2xpYi9oZWxwZXJzL21vZHVsZUhlbHBlcicpO1xuXG51dGlsLmluaGVyaXRzKE1vZHVsZUFwaVByb3ZpZGVyLCBNb2R1bGVBcGlQcm92aWRlckJhc2UpO1xuXG4vKipcbiAqIENyZWF0ZXMgbmV3IGluc3RhbmNlIG9mIHRoZSBtb2R1bGUgQVBJIHByb3ZpZGVyLlxuICogQHBhcmFtIHtTZXJ2aWNlTG9jYXRvcn0gJHNlcnZpY2VMb2NhdG9yIFNlcnZpY2UgbG9jYXRvclxuICogdG8gcmVzb2x2ZSBkZXBlbmRlbmNpZXMuXG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIE1vZHVsZUFwaVByb3ZpZGVyQmFzZVxuICovXG5mdW5jdGlvbiBNb2R1bGVBcGlQcm92aWRlcigkc2VydmljZUxvY2F0b3IpIHtcblx0TW9kdWxlQXBpUHJvdmlkZXJCYXNlLmNhbGwodGhpcywgJHNlcnZpY2VMb2NhdG9yKTtcblx0cHJvcGVydHlIZWxwZXIuZGVmaW5lUmVhZE9ubHkodGhpcywgJ2lzQnJvd3NlcicsIHRydWUpO1xuXHRwcm9wZXJ0eUhlbHBlci5kZWZpbmVSZWFkT25seSh0aGlzLCAnaXNTZXJ2ZXInLCBmYWxzZSk7XG59XG5cbi8qKlxuICogUmVkaXJlY3RzIGN1cnJlbnQgcGFnZSB0byBzcGVjaWZpZWQgVVJJLlxuICogQHBhcmFtIHtzdHJpbmd9IHVyaVN0cmluZyBVUkkgdG8gcmVkaXJlY3QuXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gUHJvbWlzZSBmb3Igbm90aGluZy5cbiAqL1xuTW9kdWxlQXBpUHJvdmlkZXIucHJvdG90eXBlLnJlZGlyZWN0ID0gZnVuY3Rpb24gKHVyaVN0cmluZykge1xuXHR2YXIgcmVxdWVzdFJvdXRlciA9IHRoaXMubG9jYXRvci5yZXNvbHZlKCdyZXF1ZXN0Um91dGVyJyk7XG5cdHJldHVybiByZXF1ZXN0Um91dGVyLmdvKHVyaVN0cmluZyk7XG59O1xuXG4vKipcbiAqIENsZWFycyBjdXJyZW50IGxvY2F0aW9uIFVSSSdzIGZyYWdtZW50LlxuICogQHJldHVybnMge1Byb21pc2V9IFByb21pc2UgZm9yIG5vdGhpbmcuXG4gKi9cbk1vZHVsZUFwaVByb3ZpZGVyLnByb3RvdHlwZS5jbGVhckZyYWdtZW50ID0gZnVuY3Rpb24gKCkge1xuXHR2YXIgd2luZG93ID0gdGhpcy5sb2NhdG9yLnJlc29sdmUoJ3dpbmRvdycpLFxuXHRcdHBvc2l0aW9uID0gd2luZG93LmRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wO1xuXHR3aW5kb3cubG9jYXRpb24uaGFzaCA9ICcnO1xuXHR3aW5kb3cuZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgPSBwb3NpdGlvbjtcblx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xufTsiLCIvKlxuICogY2F0YmVycnlcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgRGVuaXMgUmVjaGt1bm92IGFuZCBwcm9qZWN0IGNvbnRyaWJ1dG9ycy5cbiAqXG4gKiBjYXRiZXJyeSdzIGxpY2Vuc2UgZm9sbG93czpcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvblxuICogb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb25cbiAqIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbixcbiAqIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsXG4gKiBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLFxuICogYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbiAqIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4gKiBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4gKiBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqXG4gKiBUaGlzIGxpY2Vuc2UgYXBwbGllcyB0byBhbGwgcGFydHMgb2YgY2F0YmVycnkgdGhhdCBhcmUgbm90IGV4dGVybmFsbHlcbiAqIG1haW50YWluZWQgbGlicmFyaWVzLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9Cb290c3RyYXBwZXInKTtcbiIsIi8qXG4gKiBjYXRiZXJyeVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNCBEZW5pcyBSZWNoa3Vub3YgYW5kIHByb2plY3QgY29udHJpYnV0b3JzLlxuICpcbiAqIGNhdGJlcnJ5J3MgbGljZW5zZSBmb2xsb3dzOlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXG4gKiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvblxuICogZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLFxuICogaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSxcbiAqIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsXG4gKiBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuICogc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbiAqIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1NcbiAqIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICpcbiAqIFRoaXMgbGljZW5zZSBhcHBsaWVzIHRvIGFsbCBwYXJ0cyBvZiBjYXRiZXJyeSB0aGF0IGFyZSBub3QgZXh0ZXJuYWxseVxuICogbWFpbnRhaW5lZCBsaWJyYXJpZXMuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENvbnRleHRGYWN0b3J5O1xuXG52YXIgVVJJID0gcmVxdWlyZSgnY2F0YmVycnktdXJpJykuVVJJLFxuXHRwcm9wZXJ0eUhlbHBlciA9IHJlcXVpcmUoJy4vaGVscGVycy9wcm9wZXJ0eUhlbHBlcicpO1xuXG4vKipcbiAqIENyZWF0ZXMgbmV3IGluc3RhbmNlIG9mIHRoZSBjb250ZXh0IGZhY3RvcnkuXG4gKiBAcGFyYW0ge1NlcnZpY2VMb2NhdG9yfSAkc2VydmljZUxvY2F0b3IgTG9jYXRvciB0byByZXNvbHZlIGRlcGVuZGVuY2llcy5cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBDb250ZXh0RmFjdG9yeSgkc2VydmljZUxvY2F0b3IpIHtcblx0dGhpcy5fc2VydmljZUxvY2F0b3IgPSAkc2VydmljZUxvY2F0b3I7XG59XG5cbi8qKlxuICogQ3VycmVudCBzZXJ2aWNlIGxvY2F0b3IuXG4gKiBAdHlwZSB7U2VydmljZUxvY2F0b3J9XG4gKiBAcHJpdmF0ZVxuICovXG5Db250ZXh0RmFjdG9yeS5wcm90b3R5cGUuX3NlcnZpY2VMb2NhdG9yID0gbnVsbDtcblxuLyoqXG4gKiBDcmVhdGVzIG5ldyBjb250ZXh0IGZvciBtb2R1bGVzLlxuICogQHBhcmFtIHtPYmplY3R9IGFkZGl0aW9uYWwgQWRkaXRpb25hbCBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtVUkl9IGFkZGl0aW9uYWwucmVmZXJyZXIgQ3VycmVudCByZWZlcnJlci5cbiAqIEBwYXJhbSB7VVJJfSBhZGRpdGlvbmFsLmxvY2F0aW9uIEN1cnJlbnQgbG9jYXRpb24uXG4gKiBAcGFyYW0ge1N0cmluZ30gYWRkaXRpb25hbC51c2VyQWdlbnQgQ3VycmVudCB1c2VyIGFnZW50LlxuICovXG5Db250ZXh0RmFjdG9yeS5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gKGFkZGl0aW9uYWwpIHtcblx0dmFyIGFwaVByb3ZpZGVyID0gdGhpcy5fc2VydmljZUxvY2F0b3IucmVzb2x2ZSgnbW9kdWxlQXBpUHJvdmlkZXInKSxcblx0XHRjb250ZXh0ID0gT2JqZWN0LmNyZWF0ZShhcGlQcm92aWRlcik7XG5cdE9iamVjdC5rZXlzKGFkZGl0aW9uYWwpXG5cdFx0LmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdFx0cHJvcGVydHlIZWxwZXIuZGVmaW5lUmVhZE9ubHkoY29udGV4dCwga2V5LCBhZGRpdGlvbmFsW2tleV0pO1xuXHRcdH0pO1xuXHRyZXR1cm4gY29udGV4dDtcbn07IiwiLypcbiAqIGNhdGJlcnJ5XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE1IERlbmlzIFJlY2hrdW5vdiBhbmQgcHJvamVjdCBjb250cmlidXRvcnMuXG4gKlxuICogY2F0YmVycnkncyBsaWNlbnNlIGZvbGxvd3M6XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb25cbiAqIG9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uXG4gKiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sXG4gKiBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLFxuICogcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSxcbiAqIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4gKiBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuICogaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuICogT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKlxuICogVGhpcyBsaWNlbnNlIGFwcGxpZXMgdG8gYWxsIHBhcnRzIG9mIGNhdGJlcnJ5IHRoYXQgYXJlIG5vdCBleHRlcm5hbGx5XG4gKiBtYWludGFpbmVkIGxpYnJhcmllcy5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gU2VyaWFsV3JhcHBlcjtcblxudmFyIGV2ZW50cyA9IHJlcXVpcmUoJ2V2ZW50cycpO1xuXG52YXIgRVJST1JfTk9fU1VDSF9NRVRIT0QgPSAnVGhlcmUgaXMgbm8gc3VjaCByZWdpc3RlcmVkIG1ldGhvZCc7XG5cbi8qKlxuICogQ3JlYXRlcyBuZXcgaW5zdGFuY2Ugb2YgdGhlIHNlcmlhbCB3cmFwcGVyIGZvciBwcm9taXNlcy5cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBTZXJpYWxXcmFwcGVyKCkge1xuXHR0aGlzLl9lbWl0dGVyID0gbmV3IGV2ZW50cy5FdmVudEVtaXR0ZXIoKTtcblx0dGhpcy5fZW1pdHRlci5zZXRNYXhMaXN0ZW5lcnMoMCk7XG5cdHRoaXMuX3RvSW52b2tlID0ge307XG5cdHRoaXMuX2luUHJvZ3Jlc3MgPSB7fTtcbn1cblxuLyoqXG4gKiBDdXJyZW50IGV2ZW50IGVtaXR0ZXIuXG4gKiBAdHlwZSB7RXZlbnRFbWl0dGVyfVxuICogQHByaXZhdGVcbiAqL1xuU2VyaWFsV3JhcHBlci5wcm90b3R5cGUuX2VtaXR0ZXIgPSBudWxsO1xuXG4vKipcbiAqIEN1cnJlbnQgc2V0IG9mIG5hbWVkIG1ldGhvZHMgdG8gaW52b2tlLlxuICogQHR5cGUge09iamVjdH1cbiAqIEBwcml2YXRlXG4gKi9cblNlcmlhbFdyYXBwZXIucHJvdG90eXBlLl90b0ludm9rZSA9IG51bGw7XG5cbi8qKlxuICogQ3VycmVudCBzZXQgb2YgZmxhZ3MgaWYgdGhlIG1ldGhvZCBpcyBpbiBwcm9ncmVzcy5cbiAqIEB0eXBlIHtPYmplY3R9XG4gKiBAcHJpdmF0ZVxuICovXG5TZXJpYWxXcmFwcGVyLnByb3RvdHlwZS5faW5Qcm9ncmVzcyA9IG51bGw7XG5cbi8qKlxuICogQWRkcyBtZXRob2QgdG8gdGhlIHNldC5cbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIE1ldGhvZCBuYW1lLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gdG9JbnZva2UgRnVuY3Rpb24gdGhhdCByZXR1cm5zIHByb21pc2UuXG4gKi9cblNlcmlhbFdyYXBwZXIucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChuYW1lLCB0b0ludm9rZSkge1xuXHR0aGlzLl90b0ludm9rZVtuYW1lXSA9IHRvSW52b2tlO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgbWV0aG9kIHdpdGggc3VjaCBuYW1lIHdhcyByZWdpc3RlcmVkIHRvIHRoZSBzZXQuXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBOYW1lIG9mIG1ldGhvZC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIG1ldGhvZCBuYW1lIGlzIHJlZ2lzdGVyZWQuXG4gKi9cblNlcmlhbFdyYXBwZXIucHJvdG90eXBlLmlzUmVnaXN0ZXJlZCA9IGZ1bmN0aW9uIChuYW1lKSB7XG5cdHJldHVybiB0eXBlb2YodGhpcy5fdG9JbnZva2VbbmFtZV0pID09PSAnZnVuY3Rpb24nO1xufTtcblxuLyoqXG4gKiBJbnZva2VzIG1ldGhvZCB3aXRob3V0IGNvbmN1cnJlbmN5LlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgTWV0aG9kIG5hbWUuXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxPYmplY3Q+fSBQcm9taXNlIGZvciByZXN1bHQuXG4gKi9cblNlcmlhbFdyYXBwZXIucHJvdG90eXBlLmludm9rZSA9IGZ1bmN0aW9uIChuYW1lKSB7XG5cdHZhciBzZWxmID0gdGhpcztcblxuXHRpZiAoIXRoaXMuaXNSZWdpc3RlcmVkKG5hbWUpKSB7XG5cdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihFUlJPUl9OT19TVUNIX01FVEhPRCkpO1xuXHR9XG5cblx0aWYgKHRoaXMuX2luUHJvZ3Jlc3NbbmFtZV0pIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UgKGZ1bmN0aW9uIChmdWxmaWxsLCByZWplY3QpIHtcblx0XHRcdHNlbGYuX2VtaXR0ZXIub25jZShuYW1lLCBmdWxmaWxsKTtcblx0XHRcdHNlbGYuX2VtaXR0ZXIub25jZShuYW1lICsgJy0tZXJyb3InLCByZWplY3QpO1xuXHRcdH0pO1xuXHR9XG5cblx0dGhpcy5faW5Qcm9ncmVzc1tuYW1lXSA9IHRydWU7XG5cdHRoaXMuX3RvSW52b2tlW25hbWVdKClcblx0XHQudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG5cdFx0XHRzZWxmLl9lbWl0dGVyLmVtaXQobmFtZSwgcmVzdWx0KTtcblx0XHRcdHNlbGYuX2luUHJvZ3Jlc3NbbmFtZV0gPSBudWxsO1xuXHRcdH0pXG5cdFx0LmNhdGNoKGZ1bmN0aW9uIChyZWFzb24pIHtcblx0XHRcdHNlbGYuX2VtaXR0ZXIuZW1pdChuYW1lICsgJy0tZXJyb3InLCByZWFzb24pO1xuXHRcdFx0c2VsZi5faW5Qcm9ncmVzc1tuYW1lXSA9IG51bGw7XG5cdFx0fSk7XG5cblx0cmV0dXJuIHRoaXMuaW52b2tlKG5hbWUpO1xufTsiLCIvKlxuICogY2F0YmVycnlcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUgRGVuaXMgUmVjaGt1bm92IGFuZCBwcm9qZWN0IGNvbnRyaWJ1dG9ycy5cbiAqXG4gKiBjYXRiZXJyeSdzIGxpY2Vuc2UgZm9sbG93czpcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvblxuICogb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb25cbiAqIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbixcbiAqIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsXG4gKiBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLFxuICogYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbiAqIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4gKiBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4gKiBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqXG4gKiBUaGlzIGxpY2Vuc2UgYXBwbGllcyB0byBhbGwgcGFydHMgb2YgY2F0YmVycnkgdGhhdCBhcmUgbm90IGV4dGVybmFsbHlcbiAqIG1haW50YWluZWQgbGlicmFyaWVzLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBTdG9yZURpc3BhdGNoZXI7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgndXRpbCcpLFxuXHRTZXJpYWxXcmFwcGVyID0gcmVxdWlyZSgnLi9TZXJpYWxXcmFwcGVyJyksXG5cdG1vZHVsZUhlbHBlciA9IHJlcXVpcmUoJy4vaGVscGVycy9tb2R1bGVIZWxwZXInKTtcblxudmFyIEVSUk9SX1NUT1JFX05PVF9GT1VORCA9ICdTdG9yZSBcIiVzXCIgbm90IGZvdW5kJyxcblx0RVJST1JfU1RBVEUgPSAnU3RhdGUgc2hvdWxkIGJlIHNldCBiZWZvcmUgYW55IHJlcXVlc3QnLFxuXHRERUZBVUxUX0xJRkVUSU1FID0gNjAwMDA7XG5cbi8qKlxuICogQ3JlYXRlcyBuZXcgaW5zdGFuY2Ugb2Ygc3RvcmUgZGlzcGF0Y2hlci5cbiAqIEBwYXJhbSB7U2VydmljZUxvY2F0b3J9ICRzZXJ2aWNlTG9jYXRvciBMb2NhdG9yIHRvIHJlc29sdmUgZGVwZW5kZW5jaWVzLlxuICogQHBhcmFtIHtTdG9yZUxvYWRlcn0gJHN0b3JlTG9hZGVyIFN0b3JlIGxvYWRlciB0byBsb2FkIHN0b3Jlcy5cbiAqIEBwYXJhbSB7RXZlbnRFbWl0dGVyfSAkZXZlbnRCdXMgRXZlbnQgYnVzIHRvIGVtaXQgZXZlbnRzLlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIFN0b3JlRGlzcGF0Y2hlcigkc2VydmljZUxvY2F0b3IsICRzdG9yZUxvYWRlciwgJGV2ZW50QnVzKSB7XG5cdHRoaXMuX3NlcnZpY2VMb2NhdG9yID0gJHNlcnZpY2VMb2NhdG9yO1xuXHR0aGlzLl9zdG9yZUxvYWRlciA9ICRzdG9yZUxvYWRlcjtcblx0dGhpcy5fZXZlbnRCdXMgPSAkZXZlbnRCdXM7XG5cdHRoaXMuX3N0b3JlSW5zdGFuY2VzID0ge307XG5cdHRoaXMuX2xhc3REYXRhID0ge307XG5cdHRoaXMuX2RlcGVuZGVuY2llcyA9IHt9O1xuXHR0aGlzLl9zZXJpYWxXcmFwcGVyID0gbmV3IFNlcmlhbFdyYXBwZXIoKTtcbn1cblxuLyoqXG4gKiBDdXJyZW50IHNlcnZpY2UgbG9jYXRvci5cbiAqIEB0eXBlIHtTZXJ2aWNlTG9jYXRvcn1cbiAqIEBwcml2YXRlXG4gKi9cblN0b3JlRGlzcGF0Y2hlci5wcm90b3R5cGUuX3NlcnZpY2VMb2NhdG9yID0gbnVsbDtcblxuLyoqXG4gKiBDdXJyZW50IGV2ZW50IGJ1cy5cbiAqIEB0eXBlIHtFdmVudEVtaXR0ZXJ9XG4gKiBAcHJpdmF0ZVxuICovXG5TdG9yZURpc3BhdGNoZXIucHJvdG90eXBlLl9ldmVudEJ1cyA9IG51bGw7XG5cbi8qKlxuICogQ3VycmVudCBzdG9yZSBsb2FkZXIuXG4gKiBAdHlwZSB7U3RvcmVMb2FkZXJ9XG4gKiBAcHJpdmF0ZVxuICovXG5TdG9yZURpc3BhdGNoZXIucHJvdG90eXBlLl9zdG9yZUxvYWRlciA9IG51bGw7XG5cbi8qKlxuICogQ3VycmVudCBtYXAgb2YgYWxsIHN0b3JlIGluc3RhbmNlcy5cbiAqIEB0eXBlIHtudWxsfVxuICogQHByaXZhdGVcbiAqL1xuU3RvcmVEaXNwYXRjaGVyLnByb3RvdHlwZS5fc3RvcmVJbnN0YW5jZXMgPSBudWxsO1xuXG4vKipcbiAqIEN1cnJlbnQgbWFwIG9mIGxhc3QgZGF0YSBmb3IgZWFjaCBzdG9yZS5cbiAqIEB0eXBlIHtPYmplY3R9XG4gKiBAcHJpdmF0ZVxuICovXG5TdG9yZURpc3BhdGNoZXIucHJvdG90eXBlLl9sYXN0RGF0YSA9IG51bGw7XG5cbi8qKlxuICogQ3VycmVudCBtYXAgb2YgbGFzdCBzdGF0ZSBvZiBzdG9yZSBkaXNwYXRjaGVyLlxuICogQHR5cGUge09iamVjdH1cbiAqIEBwcml2YXRlXG4gKi9cblN0b3JlRGlzcGF0Y2hlci5wcm90b3R5cGUuX2xhc3RTdGF0ZSA9IG51bGw7XG5cbi8qKlxuICogQ3VycmVudCBzZXJpYWwgd3JhcHBlci5cbiAqIEB0eXBlIHtTZXJpYWxXcmFwcGVyfVxuICogQHByaXZhdGVcbiAqL1xuU3RvcmVEaXNwYXRjaGVyLnByb3RvdHlwZS5fc2VyaWFsV3JhcHBlciA9IG51bGw7XG5cbi8qKlxuICogQ3VycmVudCBiYXNpYyBjb250ZXh0IGZvciBhbGwgc3RvcmUgY29udGV4dHMuXG4gKiBAdHlwZSB7T2JqZWN0fVxuICogQHByaXZhdGVcbiAqL1xuU3RvcmVEaXNwYXRjaGVyLnByb3RvdHlwZS5fY3VycmVudEJhc2ljQ29udGV4dCA9IG51bGw7XG5cbi8qKlxuICogQ3VycmVudCBzZXQgb2Ygc3RvcmUgZGVwZW5kZW5jeSBncmFwaC5cbiAqIEB0eXBlIHtPYmplY3R9XG4gKiBAcHJpdmF0ZVxuICovXG5TdG9yZURpc3BhdGNoZXIucHJvdG90eXBlLl9kZXBlbmRlbmNpZXMgPSBudWxsO1xuXG4vKipcbiAqIEdldHMgc3RvcmUgZGF0YSBhbmQgY3JlYXRlcyBzdG9yZSBpbnN0YW5jZSBpZiByZXF1aXJlZC5cbiAqIEBwYXJhbSB7U3RyaW5nfSBzdG9yZU5hbWUgTmFtZSBvZiBzdG9yZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFN0b3JlJ3MgZGF0YS5cbiAqL1xuU3RvcmVEaXNwYXRjaGVyLnByb3RvdHlwZS5nZXRTdG9yZURhdGEgPSBmdW5jdGlvbiAoc3RvcmVOYW1lKSB7XG5cdGlmICghdGhpcy5fbGFzdFN0YXRlKSB7XG5cdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihFUlJPUl9TVEFURSkpO1xuXHR9XG5cdGlmICh0eXBlb2Yoc3RvcmVOYW1lKSAhPT0gJ3N0cmluZycpIHtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xuXHR9XG5cdGlmICh0aGlzLl9sYXN0RGF0YS5oYXNPd25Qcm9wZXJ0eShzdG9yZU5hbWUpKSB7XG5cdFx0dmFyIGV4aXN0VGltZSA9IERhdGUubm93KCkgLSB0aGlzLl9sYXN0RGF0YVtzdG9yZU5hbWVdLmNyZWF0ZWRBdDtcblx0XHRpZiAoZXhpc3RUaW1lIDw9IHRoaXMuX2xhc3REYXRhW3N0b3JlTmFtZV0ubGlmZXRpbWUpIHtcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5fbGFzdERhdGFbc3RvcmVOYW1lXS5kYXRhKTtcblx0XHR9XG5cdFx0ZGVsZXRlIHRoaXMuX2xhc3REYXRhW3N0b3JlTmFtZV07XG5cdH1cblx0dmFyIHNlbGYgPSB0aGlzLFxuXHRcdGxpZmV0aW1lID0gREVGQVVMVF9MSUZFVElNRTtcblx0c2VsZi5fZXZlbnRCdXMuZW1pdCgnc3RvcmVEYXRhTG9hZCcsIHtuYW1lOiBzdG9yZU5hbWV9KTtcblx0dmFyIHN0b3JlID0gdGhpcy5nZXRTdG9yZShzdG9yZU5hbWUpO1xuXHRpZiAoIXN0b3JlKSB7XG5cdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcblx0XHRcdFx0dXRpbC5mb3JtYXQoRVJST1JfU1RPUkVfTk9UX0ZPVU5ELCBzdG9yZU5hbWUpKVxuXHRcdCk7XG5cdH1cblx0aWYgKHR5cGVvZihzdG9yZS4kbGlmZXRpbWUpID09PSAnbnVtYmVyJykge1xuXHRcdGxpZmV0aW1lID0gc3RvcmUuJGxpZmV0aW1lO1xuXHR9XG5cdHJldHVybiBzZWxmLl9zZXJpYWxXcmFwcGVyLmludm9rZShzdG9yZU5hbWUpXG5cdFx0LnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcblx0XHRcdHNlbGYuX2xhc3REYXRhW3N0b3JlTmFtZV0gPSB7XG5cdFx0XHRcdGRhdGE6IGRhdGEsXG5cdFx0XHRcdGxpZmV0aW1lOiBsaWZldGltZSxcblx0XHRcdFx0Y3JlYXRlZEF0OiBEYXRlLm5vdygpXG5cdFx0XHR9O1xuXHRcdFx0c2VsZi5fZXZlbnRCdXMuZW1pdCgnc3RvcmVEYXRhTG9hZGVkJywge1xuXHRcdFx0XHRuYW1lOiBzdG9yZU5hbWUsXG5cdFx0XHRcdGRhdGE6IGRhdGEsXG5cdFx0XHRcdGxpZmV0aW1lOiBsaWZldGltZVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gZGF0YTtcblx0XHR9KTtcbn07XG5cbi8qKlxuICogU2VuZHMgYWN0aW9uIHRvIHNwZWNpZmllZCBzdG9yZSBhbmQgcmVzb2x2ZXMgcHJvbWlzZXMgaW4gc2VyaWFsIG1vZGUuXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RvcmVOYW1lIE5hbWUgb2YgdGhlIHN0b3JlLlxuICogQHBhcmFtIHtTdHJpbmd9IGFjdGlvbk5hbWUgTmFtZSBvZiB0aGUgYWN0aW9uLlxuICogQHBhcmFtIHtPYmplY3R9IGFyZ3MgQWN0aW9uIGFyZ3VtZW50cy5cbiAqIEByZXR1cm5zIHtQcm9taXNlPCo+fSBQcm9taXNlIGZvciBhY3Rpb24gaGFuZGxpbmcgcmVzdWx0LlxuICovXG5TdG9yZURpc3BhdGNoZXIucHJvdG90eXBlLnNlbmRBY3Rpb24gPSBmdW5jdGlvbiAoc3RvcmVOYW1lLCBhY3Rpb25OYW1lLCBhcmdzKSB7XG5cdGlmICghdGhpcy5fbGFzdFN0YXRlKSB7XG5cdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihFUlJPUl9TVEFURSkpO1xuXHR9XG5cdHZhciBzZWxmID0gdGhpcyxcblx0XHRhY3Rpb25EZXRhaWxzID0ge1xuXHRcdFx0c3RvcmVOYW1lOiBzdG9yZU5hbWUsXG5cdFx0XHRhY3Rpb25OYW1lOiBhY3Rpb25OYW1lLFxuXHRcdFx0YXJnczogYXJnc1xuXHRcdH07XG5cdHRoaXMuX2V2ZW50QnVzLmVtaXQoJ2FjdGlvblNlbmQnLCBhY3Rpb25EZXRhaWxzKTtcblx0dmFyIHN0b3JlID0gdGhpcy5nZXRTdG9yZShzdG9yZU5hbWUpO1xuXHRpZiAoIXN0b3JlKSB7XG5cdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcblx0XHRcdHV0aWwuZm9ybWF0KEVSUk9SX1NUT1JFX05PVF9GT1VORCwgc3RvcmVOYW1lKSlcblx0XHQpO1xuXHR9XG5cdHZhciBoYW5kbGVNZXRob2QgPSBtb2R1bGVIZWxwZXIuZ2V0TWV0aG9kVG9JbnZva2UoXG5cdFx0c3RvcmUsICdoYW5kbGUnLCBhY3Rpb25OYW1lXG5cdCk7XG5cdHJldHVybiBtb2R1bGVIZWxwZXIuZ2V0U2FmZVByb21pc2UoZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiBoYW5kbGVNZXRob2QoYXJncyk7XG5cdH0pXG5cdFx0LnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuXHRcdFx0c2VsZi5fZXZlbnRCdXMuZW1pdCgnYWN0aW9uU2VudCcsIGFjdGlvbkRldGFpbHMpO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9KTtcbn07XG5cbi8qKlxuICogU2VuZHMgYWN0aW9uIHRvIGV2ZXJ5IHN0b3JlIHRoYXQgaGFzIGhhbmRsZSBtZXRob2QgZm9yIHN1Y2ggYWN0aW9uLlxuICogQHBhcmFtIHtTdHJpbmd9IGFjdGlvbk5hbWUgTmFtZSBvZiB0aGUgYWN0aW9uLlxuICogQHBhcmFtIHtPYmplY3R9IGFyZyBBY3Rpb24gYXJndW1lbnRzLlxuICogQHJldHVybnMge1Byb21pc2U8QXJyYXk8Kj4+fSBQcm9taXNlIGZvciB0aGUgYWN0aW9uIGhhbmRsaW5nIHJlc3VsdC5cbiAqL1xuU3RvcmVEaXNwYXRjaGVyLnByb3RvdHlwZS5zZW5kQnJvYWRjYXN0QWN0aW9uID0gZnVuY3Rpb24gKGFjdGlvbk5hbWUsIGFyZykge1xuXHR2YXIgcHJvbWlzZXMgPSBbXSxcblx0XHRzZWxmID0gdGhpcyxcblx0XHRzdG9yZXNCeU5hbWVzID0gdGhpcy5fc3RvcmVMb2FkZXIuZ2V0U3RvcmVzQnlOYW1lcygpLFxuXHRcdG1ldGhvZE5hbWUgPSBtb2R1bGVIZWxwZXIuZ2V0Q2FtZWxDYXNlTmFtZSgnaGFuZGxlJywgYWN0aW9uTmFtZSk7XG5cdE9iamVjdC5rZXlzKHN0b3Jlc0J5TmFtZXMpXG5cdFx0LmZvckVhY2goZnVuY3Rpb24gKHN0b3JlTmFtZSkge1xuXHRcdFx0dmFyIHN0b3JlID0gc3RvcmVzQnlOYW1lc1tzdG9yZU5hbWVdLFxuXHRcdFx0XHRwcm90b01ldGhvZCA9IHN0b3JlLmNvbnN0cnVjdG9yLnByb3RvdHlwZVttZXRob2ROYW1lXTtcblx0XHRcdGlmICh0eXBlb2YocHJvdG9NZXRob2QpICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdHZhciBzZW5kQWN0aW9uUHJvbWlzZSA9IHNlbGYuc2VuZEFjdGlvbihcblx0XHRcdFx0c3RvcmUubmFtZSwgYWN0aW9uTmFtZSwgIGFyZ1xuXHRcdFx0KTtcblx0XHRcdHByb21pc2VzLnB1c2goc2VuZEFjdGlvblByb21pc2UpO1xuXHRcdH0pO1xuXHRyZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xufTtcblxuLyoqXG4gKiBTZXRzIG5ldyBzdGF0ZSB0byBzdG9yZSBkaXNwYXRjaGVyIGFuZCBpbnZva2VzIFwiY2hhbmdlZFwiIG1ldGhvZCBmb3IgYWxsXG4gKiBzdG9yZXMgd2hpY2ggc3RhdGUgaGF2ZSBiZWVuIGNoYW5nZWQuXG4gKiBAcGFyYW0ge09iamVjdH0gcGFyYW1ldGVycyBNYXAgb2YgbmV3IHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0ge09iamVjdH0gYmFzaWNDb250ZXh0IEJhc2ljIGNvbnRleHQgZm9yIGFsbCBzdG9yZXMuXG4gKiBAcmV0dXJucyB7QXJyYXk8U3RyaW5nPn0gTmFtZXMgb2Ygc3RvcmVzIHRoYXQgaGF2ZSBiZWVuIGNoYW5nZWQuXG4gKi9cblN0b3JlRGlzcGF0Y2hlci5wcm90b3R5cGUuc2V0U3RhdGUgPSBmdW5jdGlvbiAocGFyYW1ldGVycywgYmFzaWNDb250ZXh0KSB7XG5cdHBhcmFtZXRlcnMgPSBwYXJhbWV0ZXJzIHx8IHt9O1xuXHRpZiAoIXRoaXMuX2xhc3RTdGF0ZSkge1xuXHRcdHRoaXMuX2N1cnJlbnRCYXNpY0NvbnRleHQgPSBiYXNpY0NvbnRleHQ7XG5cdFx0dGhpcy5fbGFzdFN0YXRlID0gcGFyYW1ldGVycztcblx0XHRyZXR1cm4gW107XG5cdH1cblxuXHQvLyBzb21lIHN0b3JlJ3MgcGFyYW1ldGVycyBjYW4gYmUgcmVtb3ZlZCBzaW5jZSBsYXN0IHRpbWVcblx0dmFyIHNlbGYgPSB0aGlzLFxuXHRcdGNoYW5nZWQgPSB7fTtcblxuXHRPYmplY3Qua2V5cyh0aGlzLl9sYXN0U3RhdGUpXG5cdFx0LmZpbHRlcihmdW5jdGlvbiAoc3RvcmVOYW1lKSB7XG5cdFx0XHRyZXR1cm4gIXBhcmFtZXRlcnMuaGFzT3duUHJvcGVydHkoc3RvcmVOYW1lKTtcblx0XHR9KVxuXHRcdC5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG5cdFx0XHRjaGFuZ2VkW25hbWVdID0gdHJ1ZTtcblx0XHR9KTtcblxuXHRPYmplY3Qua2V5cyhwYXJhbWV0ZXJzKVxuXHRcdC5mb3JFYWNoKGZ1bmN0aW9uIChzdG9yZU5hbWUpIHtcblx0XHRcdC8vIG5ldyBwYXJhbWV0ZXJzIHdlcmUgc2V0IGZvciBzdG9yZVxuXHRcdFx0aWYgKCFzZWxmLl9sYXN0U3RhdGUuaGFzT3duUHJvcGVydHkoc3RvcmVOYW1lKSkge1xuXHRcdFx0XHRjaGFuZ2VkW3N0b3JlTmFtZV0gPSB0cnVlO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIG5ldyBhbmQgbGFzdCBwYXJhbWV0ZXJzIGhhcyBkaWZmZXJlbnQgdmFsdWVzXG5cdFx0XHR2YXIgbGFzdFBhcmFtZXRlck5hbWVzID1cblx0XHRcdFx0XHRPYmplY3Qua2V5cyhzZWxmLl9sYXN0U3RhdGVbc3RvcmVOYW1lXSksXG5cdFx0XHRcdGN1cnJlbnRQYXJhbWV0ZXJOYW1lcyA9XG5cdFx0XHRcdFx0T2JqZWN0LmtleXMocGFyYW1ldGVyc1tzdG9yZU5hbWVdKTtcblxuXHRcdFx0aWYgKGN1cnJlbnRQYXJhbWV0ZXJOYW1lcy5sZW5ndGggIT09XG5cdFx0XHRcdGxhc3RQYXJhbWV0ZXJOYW1lcy5sZW5ndGgpIHtcblx0XHRcdFx0Y2hhbmdlZFtzdG9yZU5hbWVdID0gdHJ1ZTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRjdXJyZW50UGFyYW1ldGVyTmFtZXMuZXZlcnkoZnVuY3Rpb24gKHBhcmFtZXRlck5hbWUpIHtcblx0XHRcdFx0aWYgKHBhcmFtZXRlcnNbc3RvcmVOYW1lXVtwYXJhbWV0ZXJOYW1lXSAhPT1cblx0XHRcdFx0XHRzZWxmLl9sYXN0U3RhdGVbc3RvcmVOYW1lXVtwYXJhbWV0ZXJOYW1lXSkge1xuXHRcdFx0XHRcdGNoYW5nZWRbc3RvcmVOYW1lXSA9IHRydWU7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0dGhpcy5fbGFzdFN0YXRlID0gcGFyYW1ldGVycztcblx0aWYgKHRoaXMuX2N1cnJlbnRCYXNpY0NvbnRleHQgIT09IGJhc2ljQ29udGV4dCkge1xuXHRcdHRoaXMuX2N1cnJlbnRCYXNpY0NvbnRleHQgPSBiYXNpY0NvbnRleHQ7XG5cdFx0T2JqZWN0LmtleXModGhpcy5fc3RvcmVJbnN0YW5jZXMpXG5cdFx0XHQuZm9yRWFjaChmdW5jdGlvbiAoc3RvcmVOYW1lKSB7XG5cdFx0XHRcdHNlbGYuX3N0b3JlSW5zdGFuY2VzW3N0b3JlTmFtZV0uJGNvbnRleHQgPVxuXHRcdFx0XHRcdHNlbGYuX2dldFN0b3JlQ29udGV4dChzdG9yZU5hbWUpO1xuXHRcdFx0fSk7XG5cdH1cblxuXHR2YXIgY2hhbmdlZFN0b3JlTmFtZXMgPSB7fTtcblx0T2JqZWN0LmtleXMoY2hhbmdlZClcblx0XHQuZm9yRWFjaChmdW5jdGlvbiAoc3RvcmVOYW1lKSB7XG5cdFx0XHR2YXIgc3RvcmUgPSBzZWxmLmdldFN0b3JlKHN0b3JlTmFtZSk7XG5cdFx0XHRpZiAoIXN0b3JlKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdHN0b3JlLiRjb250ZXh0LmNoYW5nZWQoKVxuXHRcdFx0XHQuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuXHRcdFx0XHRcdGNoYW5nZWRTdG9yZU5hbWVzW25hbWVdID0gdHJ1ZTtcblx0XHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0dGhpcy5fZXZlbnRCdXMuZW1pdCgnc3RhdGVDaGFuZ2VkJywge1xuXHRcdG9sZFN0YXRlOiB0aGlzLl9sYXN0U3RhdGUsXG5cdFx0bmV3U3RhdGU6IHBhcmFtZXRlcnNcblx0fSk7XG5cdHJldHVybiBPYmplY3Qua2V5cyhjaGFuZ2VkU3RvcmVOYW1lcyk7XG59O1xuXG4vKipcbiAqIEdldHMgY29udGV4dCBmb3Igc3RvcmUgdXNpbmcgY29tcG9uZW50J3MgY29udGV4dCBhcyBhIHByb3RvdHlwZS5cbiAqIEBwYXJhbSB7U3RyaW5nfSBzdG9yZU5hbWUgTmFtZSBvZiBzdG9yZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFN0b3JlIGNvbnRleHQuXG4gKiBAcHJpdmF0ZVxuICovXG5TdG9yZURpc3BhdGNoZXIucHJvdG90eXBlLl9nZXRTdG9yZUNvbnRleHQgPSBmdW5jdGlvbiAoc3RvcmVOYW1lKSB7XG5cdHZhciBzZWxmID0gdGhpcyxcblx0XHRzdG9yZUNvbnRleHQgPSBPYmplY3QuY3JlYXRlKHRoaXMuX2N1cnJlbnRCYXNpY0NvbnRleHQpO1xuXHRzdG9yZUNvbnRleHQubmFtZSA9IHN0b3JlTmFtZTtcblx0c3RvcmVDb250ZXh0LnN0YXRlID0gdGhpcy5fbGFzdFN0YXRlW3N0b3JlTmFtZV0gfHwge307XG5cdHN0b3JlQ29udGV4dC5jaGFuZ2VkID0gZnVuY3Rpb24gKCkge1xuXHRcdHZhciB3YWxrZWQgPSB7fSxcblx0XHRcdGN1cnJlbnQsXG5cdFx0XHR0b0NoYW5nZSA9IFtzdG9yZU5hbWVdO1xuXG5cdFx0d2hpbGUgKHRvQ2hhbmdlLmxlbmd0aCA+IDApIHtcblx0XHRcdGN1cnJlbnQgPSB0b0NoYW5nZS5zaGlmdCgpO1xuXHRcdFx0aWYgKHdhbGtlZC5oYXNPd25Qcm9wZXJ0eShjdXJyZW50KSkge1xuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdH1cblx0XHRcdHdhbGtlZFtjdXJyZW50XSA9IHRydWU7XG5cdFx0XHRpZiAoc2VsZi5fZGVwZW5kZW5jaWVzLmhhc093blByb3BlcnR5KGN1cnJlbnQpKSB7XG5cdFx0XHRcdHRvQ2hhbmdlID0gdG9DaGFuZ2UuY29uY2F0KFxuXHRcdFx0XHRcdE9iamVjdC5rZXlzKHNlbGYuX2RlcGVuZGVuY2llc1tjdXJyZW50XSlcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHRcdGRlbGV0ZSBzZWxmLl9sYXN0RGF0YVtjdXJyZW50XTtcblx0XHRcdHNlbGYuX2V2ZW50QnVzLmVtaXQoJ3N0b3JlQ2hhbmdlZCcsIGN1cnJlbnQpO1xuXHRcdH1cblx0XHRyZXR1cm4gT2JqZWN0LmtleXMod2Fsa2VkKTtcblx0fTtcblx0c3RvcmVDb250ZXh0LmdldFN0b3JlRGF0YSA9IGZ1bmN0aW9uIChzb3VyY2VTdG9yZU5hbWUpIHtcblx0XHRpZiAoc291cmNlU3RvcmVOYW1lID09PSBzdG9yZU5hbWUpIHtcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XG5cdFx0fVxuXHRcdHJldHVybiBzZWxmLmdldFN0b3JlRGF0YShzb3VyY2VTdG9yZU5hbWUpO1xuXHR9O1xuXHRzdG9yZUNvbnRleHQuc2V0RGVwZW5kZW5jeSA9IGZ1bmN0aW9uIChuYW1lKSB7XG5cdFx0aWYgKCFzZWxmLl9kZXBlbmRlbmNpZXMuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcblx0XHRcdHNlbGYuX2RlcGVuZGVuY2llc1tuYW1lXSA9IHt9O1xuXHRcdH1cblx0XHRzZWxmLl9kZXBlbmRlbmNpZXNbbmFtZV1bc3RvcmVOYW1lXSA9IHRydWU7XG5cdH07XG5cdHN0b3JlQ29udGV4dC51bnNldERlcGVuZGVuY3kgPSBmdW5jdGlvbiAobmFtZSkge1xuXHRcdGlmICghc2VsZi5fZGVwZW5kZW5jaWVzLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGRlbGV0ZSBzZWxmLl9kZXBlbmRlbmNpZXNbbmFtZV1bc3RvcmVOYW1lXTtcblx0fTtcblx0c3RvcmVDb250ZXh0LnNlbmRBY3Rpb24gPSBmdW5jdGlvbiAoc3RvcmVOYW1lLCBuYW1lLCBhcmdzKSB7XG5cdFx0cmV0dXJuIHNlbGYuc2VuZEFjdGlvbihzdG9yZU5hbWUsIG5hbWUsIGFyZ3MpO1xuXHR9O1xuXHRzdG9yZUNvbnRleHQuc2VuZEJyb2FkY2FzdEFjdGlvbiA9IGZ1bmN0aW9uIChuYW1lLCBhcmdzKSB7XG5cdFx0cmV0dXJuIHNlbGYuc2VuZEJyb2FkY2FzdEFjdGlvbihuYW1lLCBhcmdzKTtcblx0fTtcblxuXHRyZXR1cm4gc3RvcmVDb250ZXh0O1xufTtcblxuLyoqXG4gKiBHZXRzIHN0b3JlIGluc3RhbmNlIGFuZCBjcmVhdGVzIGl0IGlmIHJlcXVpcmVkLlxuICogQHBhcmFtIHtTdHJpbmd9IHN0b3JlTmFtZSBOYW1lIG9mIHN0b3JlLlxuICogQHJldHVybnMge1Byb21pc2U8T2JqZWN0Pn0gUHJvbWlzZSBmb3Igc3RvcmUuXG4gKi9cblN0b3JlRGlzcGF0Y2hlci5wcm90b3R5cGUuZ2V0U3RvcmUgPSBmdW5jdGlvbiAoc3RvcmVOYW1lKSB7XG5cdGlmICghc3RvcmVOYW1lKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblx0dmFyIHN0b3JlID0gdGhpcy5fc3RvcmVJbnN0YW5jZXNbc3RvcmVOYW1lXTtcblx0aWYgKHN0b3JlKSB7XG5cdFx0cmV0dXJuIHN0b3JlO1xuXHR9XG5cdHZhciBzZWxmID0gdGhpcztcblxuXHR2YXIgc3RvcmVzID0gc2VsZi5fc3RvcmVMb2FkZXIuZ2V0U3RvcmVzQnlOYW1lcygpLFxuXHRcdGNvbmZpZyA9IHNlbGYuX3NlcnZpY2VMb2NhdG9yLnJlc29sdmUoJ2NvbmZpZycpO1xuXHRpZiAoIXN0b3Jlcy5oYXNPd25Qcm9wZXJ0eShzdG9yZU5hbWUpKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHR2YXIgY29uc3RydWN0b3IgPSBzdG9yZXNbc3RvcmVOYW1lXS5jb25zdHJ1Y3Rvcjtcblx0Y29uc3RydWN0b3IucHJvdG90eXBlLiRjb250ZXh0ID0gc2VsZi5fZ2V0U3RvcmVDb250ZXh0KHN0b3JlTmFtZSk7XG5cdHNlbGYuX3N0b3JlSW5zdGFuY2VzW3N0b3JlTmFtZV0gPSBzZWxmLl9zZXJ2aWNlTG9jYXRvclxuXHRcdC5yZXNvbHZlSW5zdGFuY2UoY29uc3RydWN0b3IsIGNvbmZpZyk7XG5cdHNlbGYuX3N0b3JlSW5zdGFuY2VzW3N0b3JlTmFtZV0uJGNvbnRleHQgPSBjb25zdHJ1Y3Rvci5wcm90b3R5cGUuJGNvbnRleHQ7XG5cblx0c2VsZi5fc2VyaWFsV3JhcHBlci5hZGQoc3RvcmVOYW1lLCBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIGxvYWRNZXRob2QgPSBtb2R1bGVIZWxwZXIuZ2V0TWV0aG9kVG9JbnZva2UoXG5cdFx0XHRzZWxmLl9zdG9yZUluc3RhbmNlc1tzdG9yZU5hbWVdLCAnbG9hZCdcblx0XHQpO1xuXHRcdHJldHVybiBtb2R1bGVIZWxwZXIuZ2V0U2FmZVByb21pc2UobG9hZE1ldGhvZCk7XG5cdH0pO1xuXHRyZXR1cm4gc2VsZi5fc3RvcmVJbnN0YW5jZXNbc3RvcmVOYW1lXTtcbn07IiwiLypcbiAqIGNhdGJlcnJ5XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0IERlbmlzIFJlY2hrdW5vdiBhbmQgcHJvamVjdCBjb250cmlidXRvcnMuXG4gKlxuICogY2F0YmVycnkncyBsaWNlbnNlIGZvbGxvd3M6XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb25cbiAqIG9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uXG4gKiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sXG4gKiBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLFxuICogcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSxcbiAqIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4gKiBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuICogaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuICogT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKlxuICogVGhpcyBsaWNlbnNlIGFwcGxpZXMgdG8gYWxsIHBhcnRzIG9mIGNhdGJlcnJ5IHRoYXQgYXJlIG5vdCBleHRlcm5hbGx5XG4gKiBtYWludGFpbmVkIGxpYnJhcmllcy5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gQm9vdHN0cmFwcGVyQmFzZTtcblxudmFyIHV0aWwgPSByZXF1aXJlKCd1dGlsJyksXG5cdG1vZHVsZUhlbHBlciA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvbW9kdWxlSGVscGVyJyksXG5cdHVociA9IHJlcXVpcmUoJ2NhdGJlcnJ5LXVocicpLFxuXHRQcm9taXNlID0gcmVxdWlyZSgncHJvbWlzZScpLFxuXHRTdGF0ZVByb3ZpZGVyID0gcmVxdWlyZSgnLi4vcHJvdmlkZXJzL1N0YXRlUHJvdmlkZXInKSxcblx0U3RvcmVMb2FkZXIgPSByZXF1aXJlKCcuLi9sb2FkZXJzL1N0b3JlTG9hZGVyJyksXG5cdENvbXBvbmVudExvYWRlciA9IHJlcXVpcmUoJy4uL2xvYWRlcnMvQ29tcG9uZW50TG9hZGVyJyksXG5cdERvY3VtZW50UmVuZGVyZXIgPSByZXF1aXJlKCcuLi9Eb2N1bWVudFJlbmRlcmVyJyksXG5cdFJlcXVlc3RSb3V0ZXIgPSByZXF1aXJlKCcuLi9SZXF1ZXN0Um91dGVyJyksXG5cdE1vZHVsZUFwaVByb3ZpZGVyQmFzZSA9IHJlcXVpcmUoJy4uL2Jhc2UvTW9kdWxlQXBpUHJvdmlkZXJCYXNlJyksXG5cdENvbnRleHRGYWN0b3J5ID0gcmVxdWlyZSgnLi4vQ29udGV4dEZhY3RvcnknKSxcblx0RXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnZXZlbnRzJykuRXZlbnRFbWl0dGVyO1xuXG52YXIgSU5GT19DT01QT05FTlRfTE9BREVEID0gJ0NvbXBvbmVudCBcIiVzXCIgbG9hZGVkJyxcblx0SU5GT19TVE9SRV9MT0FERUQgPSAnU3RvcmUgXCIlc1wiIGxvYWRlZCcsXG5cdElORk9fQUxMX1NUT1JFU19MT0FERUQgPSAnQWxsIHN0b3JlcyBsb2FkZWQnLFxuXHRJTkZPX0FMTF9DT01QT05FTlRTX0xPQURFRCA9ICdBbGwgY29tcG9uZW50cyBsb2FkZWQnLFxuXHRJTkZPX0RPQ1VNRU5UX1JFTkRFUkVEID0gJ0RvY3VtZW50IHJlbmRlcmVkIGZvciBVUkkgJXMnLFxuXHRUUkFDRV9SRU5ERVJfQ09NUE9ORU5UID0gJ0NvbXBvbmVudCBcIiVzJXNcIiBpcyBiZWluZyByZW5kZXJlZC4uLicsXG5cdFRJTUVTVEFNUF9GT1JNQVQgPSAnICglZCBtcyknLFxuXHRUUkFDRV9DT01QT05FTlRfUkVOREVSRUQgPSAnQ29tcG9uZW50IFwiJXMlc1wiIHJlbmRlcmVkJXMnO1xuXG4vKipcbiAqIENyZWF0ZXMgbmV3IGluc3RhbmNlIG9mIGJhc2UgQ2F0YmVycnkgYm9vdHN0cmFwcGVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2F0YmVycnlDb25zdHJ1Y3RvciBDb25zdHJ1Y3RvclxuICogb2YgdGhlIENhdGJlcnJ5J3MgbWFpbiBtb2R1bGUuXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gQm9vdHN0cmFwcGVyQmFzZShjYXRiZXJyeUNvbnN0cnVjdG9yKSB7XG5cdHRoaXMuX2NhdGJlcnJ5Q29uc3RydWN0b3IgPSBjYXRiZXJyeUNvbnN0cnVjdG9yO1xufVxuXG4vKipcbiAqIEN1cnJlbnQgY29uc3RydWN0b3Igb2YgdGhlIENhdGJlcnJ5J3MgbWFpbiBtb2R1bGUuXG4gKiBAdHlwZSB7RnVuY3Rpb259XG4gKiBAcHJpdmF0ZVxuICovXG5Cb290c3RyYXBwZXJCYXNlLnByb3RvdHlwZS5fY2F0YmVycnlDb25zdHJ1Y3RvciA9IG51bGw7XG5cbi8qKlxuICogQ3JlYXRlcyBuZXcgZnVsbC1jb25maWd1cmVkIGluc3RhbmNlIG9mIHRoZSBDYXRiZXJyeSBhcHBsaWNhdGlvbi5cbiAqIEBwYXJhbSB7T2JqZWN0P30gY29uZmlnT2JqZWN0IENvbmZpZ3VyYXRpb24gb2JqZWN0LlxuICogQHJldHVybnMge0NhdGJlcnJ5fSBDYXRiZXJyeSBhcHBsaWNhdGlvbiBpbnN0YW5jZS5cbiAqL1xuQm9vdHN0cmFwcGVyQmFzZS5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gKGNvbmZpZ09iamVjdCkge1xuXHR2YXIgY3VycmVudENvbmZpZyA9IGNvbmZpZ09iamVjdCB8fCB7fSxcblx0XHRjYXRiZXJyeSA9IG5ldyB0aGlzLl9jYXRiZXJyeUNvbnN0cnVjdG9yKCk7XG5cblx0dGhpcy5jb25maWd1cmUoY3VycmVudENvbmZpZywgY2F0YmVycnkubG9jYXRvcik7XG5cdGNhdGJlcnJ5LmV2ZW50cyA9IGNhdGJlcnJ5LmxvY2F0b3IucmVzb2x2ZUluc3RhbmNlKE1vZHVsZUFwaVByb3ZpZGVyQmFzZSk7XG5cdHJldHVybiBjYXRiZXJyeTtcbn07XG5cbi8qKlxuICogQ29uZmlndXJlcyBsb2NhdG9yIHdpdGggYWxsIHJlcXVpcmVkIHR5cGUgcmVnaXN0cmF0aW9ucy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWdPYmplY3QgQ29uZmlndXJhdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0ge1NlcnZpY2VMb2NhdG9yfSBsb2NhdG9yIFNlcnZpY2UgbG9jYXRvciB0byBjb25maWd1cmUuXG4gKi9cbkJvb3RzdHJhcHBlckJhc2UucHJvdG90eXBlLmNvbmZpZ3VyZSA9IGZ1bmN0aW9uIChjb25maWdPYmplY3QsIGxvY2F0b3IpIHtcblx0dmFyIGV2ZW50QnVzID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXHRldmVudEJ1cy5zZXRNYXhMaXN0ZW5lcnMoMCk7XG5cdGxvY2F0b3IucmVnaXN0ZXJJbnN0YW5jZSgncHJvbWlzZScsIFByb21pc2UpO1xuXHRsb2NhdG9yLnJlZ2lzdGVySW5zdGFuY2UoJ2V2ZW50QnVzJywgZXZlbnRCdXMpO1xuXHRsb2NhdG9yLnJlZ2lzdGVySW5zdGFuY2UoJ2NvbmZpZycsIGNvbmZpZ09iamVjdCk7XG5cdGxvY2F0b3IucmVnaXN0ZXIoJ3N0YXRlUHJvdmlkZXInLCBTdGF0ZVByb3ZpZGVyLCBjb25maWdPYmplY3QsIHRydWUpO1xuXHRsb2NhdG9yLnJlZ2lzdGVyKCdjb250ZXh0RmFjdG9yeScsIENvbnRleHRGYWN0b3J5LCBjb25maWdPYmplY3QsIHRydWUpO1xuXHRsb2NhdG9yLnJlZ2lzdGVyKCdzdG9yZUxvYWRlcicsIFN0b3JlTG9hZGVyLCBjb25maWdPYmplY3QsIHRydWUpO1xuXHRsb2NhdG9yLnJlZ2lzdGVyKCdjb21wb25lbnRMb2FkZXInLCBDb21wb25lbnRMb2FkZXIsIGNvbmZpZ09iamVjdCwgdHJ1ZSk7XG5cdGxvY2F0b3IucmVnaXN0ZXIoJ2RvY3VtZW50UmVuZGVyZXInLCBEb2N1bWVudFJlbmRlcmVyLCBjb25maWdPYmplY3QsIHRydWUpO1xuXHRsb2NhdG9yLnJlZ2lzdGVyKCdyZXF1ZXN0Um91dGVyJywgUmVxdWVzdFJvdXRlciwgY29uZmlnT2JqZWN0LCB0cnVlKTtcblxuXHR1aHIucmVnaXN0ZXIobG9jYXRvcik7XG59O1xuXG4vKipcbiAqIFdyYXBzIGV2ZW50IGJ1cyB3aXRoIGxvZyBtZXNzYWdlcy5cbiAqIEBwYXJhbSB7RXZlbnRFbWl0dGVyfSBldmVudEJ1cyBFdmVudCBlbWl0dGVyIHRoYXQgaW1wbGVtZW50cyBldmVudCBidXMuXG4gKiBAcGFyYW0ge0xvZ2dlcn0gbG9nZ2VyIExvZ2dlciB0byB3cml0ZSBtZXNzYWdlcy5cbiAqIEBwcm90ZWN0ZWRcbiAqL1xuQm9vdHN0cmFwcGVyQmFzZS5wcm90b3R5cGUuX3dyYXBFdmVudHNXaXRoTG9nZ2VyID0gZnVuY3Rpb24gKGV2ZW50QnVzLCBsb2dnZXIpIHtcblx0ZXZlbnRCdXNcblx0XHQub24oJ2NvbXBvbmVudExvYWRlZCcsIGZ1bmN0aW9uIChhcmdzKSB7XG5cdFx0XHRsb2dnZXIuaW5mbyh1dGlsLmZvcm1hdChJTkZPX0NPTVBPTkVOVF9MT0FERUQsIGFyZ3MubmFtZSkpO1xuXHRcdH0pXG5cdFx0Lm9uKCdzdG9yZUxvYWRlZCcsIGZ1bmN0aW9uIChhcmdzKSB7XG5cdFx0XHRsb2dnZXIuaW5mbyh1dGlsLmZvcm1hdChJTkZPX1NUT1JFX0xPQURFRCwgYXJncy5uYW1lKSk7XG5cdFx0fSlcblx0XHQub24oJ2FsbFN0b3Jlc0xvYWRlZCcsIGZ1bmN0aW9uICgpIHtcblx0XHRcdGxvZ2dlci5pbmZvKElORk9fQUxMX1NUT1JFU19MT0FERUQpO1xuXHRcdH0pXG5cdFx0Lm9uKCdhbGxDb21wb25lbnRzTG9hZGVkJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0bG9nZ2VyLmluZm8oSU5GT19BTExfQ09NUE9ORU5UU19MT0FERUQpO1xuXHRcdH0pXG5cdFx0Lm9uKCdjb21wb25lbnRSZW5kZXInLCBmdW5jdGlvbiAoYXJncykge1xuXHRcdFx0dmFyIGlkID0gYXJncy5jb250ZXh0LlxuXHRcdFx0XHRcdGF0dHJpYnV0ZXNbbW9kdWxlSGVscGVyLkFUVFJJQlVURV9JRF07XG5cdFx0XHRsb2dnZXIudHJhY2UodXRpbC5mb3JtYXQoVFJBQ0VfUkVOREVSX0NPTVBPTkVOVCxcblx0XHRcdFx0bW9kdWxlSGVscGVyLmdldFRhZ05hbWVGb3JDb21wb25lbnROYW1lKGFyZ3MubmFtZSksXG5cdFx0XHRcdGlkID8gJyMnICsgaWQgOiAnJ1xuXHRcdFx0KSk7XG5cdFx0fSlcblx0XHQub24oJ2NvbXBvbmVudFJlbmRlcmVkJywgZnVuY3Rpb24gKGFyZ3MpIHtcblx0XHRcdHZhciBpZCA9IGFyZ3MuY29udGV4dC5cblx0XHRcdFx0XHRhdHRyaWJ1dGVzW21vZHVsZUhlbHBlci5BVFRSSUJVVEVfSURdO1xuXHRcdFx0bG9nZ2VyLnRyYWNlKHV0aWwuZm9ybWF0KFxuXHRcdFx0XHRUUkFDRV9DT01QT05FTlRfUkVOREVSRUQsXG5cdFx0XHRcdG1vZHVsZUhlbHBlci5nZXRUYWdOYW1lRm9yQ29tcG9uZW50TmFtZShhcmdzLm5hbWUpLFxuXHRcdFx0XHRpZCA/ICcjJyArIGlkIDogJycsXG5cdFx0XHRcdHR5cGVvZihhcmdzLnRpbWUpID09PSAnbnVtYmVyJyA/XG5cdFx0XHRcdFx0dXRpbC5mb3JtYXQoVElNRVNUQU1QX0ZPUk1BVCwgYXJncy50aW1lKSA6ICcnXG5cdFx0XHQpKTtcblx0XHR9KVxuXHRcdC5vbignZG9jdW1lbnRSZW5kZXJlZCcsIGZ1bmN0aW9uIChhcmdzKSB7XG5cdFx0XHRsb2dnZXIuaW5mbyh1dGlsLmZvcm1hdChcblx0XHRcdFx0SU5GT19ET0NVTUVOVF9SRU5ERVJFRCwgYXJncy5sb2NhdGlvbi50b1N0cmluZygpXG5cdFx0XHQpKTtcblx0XHR9KVxuXHRcdC5vbignZXJyb3InLCBmdW5jdGlvbiAoZXJyb3IpIHtcblx0XHRcdGxvZ2dlci5lcnJvcihlcnJvcik7XG5cdFx0fSk7XG59OyIsIi8qXG4gKiBjYXRiZXJyeVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNCBEZW5pcyBSZWNoa3Vub3YgYW5kIHByb2plY3QgY29udHJpYnV0b3JzLlxuICpcbiAqIGNhdGJlcnJ5J3MgbGljZW5zZSBmb2xsb3dzOlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXG4gKiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvblxuICogZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLFxuICogaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSxcbiAqIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsXG4gKiBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuICogc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbiAqIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1NcbiAqIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICpcbiAqIFRoaXMgbGljZW5zZSBhcHBsaWVzIHRvIGFsbCBwYXJ0cyBvZiBjYXRiZXJyeSB0aGF0IGFyZSBub3QgZXh0ZXJuYWxseVxuICogbWFpbnRhaW5lZCBsaWJyYXJpZXMuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhdGJlcnJ5QmFzZTtcblxudmFyIFNlcnZpY2VMb2NhdG9yID0gcmVxdWlyZSgnY2F0YmVycnktbG9jYXRvcicpO1xuXG4vKipcbiAqIENyZWF0ZXMgbmV3IGluc3RhbmNlIG9mIHRoZSBiYXNpYyBDYXRiZXJyeSBhcHBsaWNhdGlvbiBtb2R1bGUuXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gQ2F0YmVycnlCYXNlKCkge1xuXHR0aGlzLmxvY2F0b3IgPSBuZXcgU2VydmljZUxvY2F0b3IoKTtcblx0dGhpcy5sb2NhdG9yLnJlZ2lzdGVySW5zdGFuY2UoJ3NlcnZpY2VMb2NhdG9yJywgdGhpcy5sb2NhdG9yKTtcblx0dGhpcy5sb2NhdG9yLnJlZ2lzdGVySW5zdGFuY2UoJ2NhdGJlcnJ5JywgdGhpcyk7XG59XG5cbi8qKlxuICogQ3VycmVudCB2ZXJzaW9uIG9mIGNhdGJlcnJ5LlxuICovXG5DYXRiZXJyeUJhc2UucHJvdG90eXBlLnZlcnNpb24gPSAnNS4wLjUnO1xuXG4vKipcbiAqIEN1cnJlbnQgb2JqZWN0IHdpdGggZXZlbnRzLlxuICogQHR5cGUge01vZHVsZUFwaVByb3ZpZGVyfVxuICovXG5DYXRiZXJyeUJhc2UucHJvdG90eXBlLmV2ZW50cyA9IG51bGw7XG5cbi8qKlxuICogQ3VycmVudCBzZXJ2aWNlIGxvY2F0b3IuXG4gKiBAdHlwZSB7U2VydmljZUxvY2F0b3J9XG4gKi9cbkNhdGJlcnJ5QmFzZS5wcm90b3R5cGUubG9jYXRvciA9IG51bGw7IiwiLypcbiAqIGNhdGJlcnJ5XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0IERlbmlzIFJlY2hrdW5vdiBhbmQgcHJvamVjdCBjb250cmlidXRvcnMuXG4gKlxuICogY2F0YmVycnkncyBsaWNlbnNlIGZvbGxvd3M6XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb25cbiAqIG9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uXG4gKiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sXG4gKiBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLFxuICogcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSxcbiAqIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4gKiBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuICogaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuICogT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKlxuICogVGhpcyBsaWNlbnNlIGFwcGxpZXMgdG8gYWxsIHBhcnRzIG9mIGNhdGJlcnJ5IHRoYXQgYXJlIG5vdCBleHRlcm5hbGx5XG4gKiBtYWludGFpbmVkIGxpYnJhcmllcy5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gQ29va2llV3JhcHBlckJhc2U7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgndXRpbCcpO1xuXG4vKipcbiAqIENyZWF0ZXMgbmV3IGluc3RhbmNlIG9mIHRoZSBiYXNpYyBjb29raWUgd3JhcHBlci5cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBDb29raWVXcmFwcGVyQmFzZSgpIHtcbn1cblxuLyoqXG4gKiBHZXRzIG1hcCBvZiBjb29raWUgdmFsdWVzIGJ5IG5hbWUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBDb29raWVzIG1hcCBieSBuYW1lcy5cbiAqL1xuQ29va2llV3JhcHBlckJhc2UucHJvdG90eXBlLmdldEFsbCA9IGZ1bmN0aW9uICgpIHtcblx0dmFyIHN0cmluZyA9IHRoaXMuZ2V0Q29va2llU3RyaW5nKCk7XG5cdHJldHVybiB0aGlzLl9wYXJzZUNvb2tpZVN0cmluZyhzdHJpbmcpO1xufTtcblxuLyoqXG4gKiBHZXRzIGNvb2tpZSB2YWx1ZSBieSBuYW1lLlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgQ29va2llIG5hbWUuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBDb29raWUgdmFsdWUuXG4gKi9cbkNvb2tpZVdyYXBwZXJCYXNlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAobmFtZSkge1xuXHRpZiAodHlwZW9mKG5hbWUpICE9PSAnc3RyaW5nJykge1xuXHRcdHJldHVybiAnJztcblx0fVxuXG5cdHJldHVybiB0aGlzLmdldEFsbCgpW25hbWVdIHx8ICcnO1xufTtcblxuLyoqXG4gKiBQYXJzZXMgY29va2llIHN0cmluZyBpbnRvIG1hcCBvZiBjb29raWUga2V5L3ZhbHVlIHBhaXJzLlxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyBDb29raWUgc3RyaW5nLlxuICogQHJldHVybnMge09iamVjdH0gT2JqZWN0IHdpdGggY29va2llIHZhbHVlcyBieSBrZXlzLlxuICogQHByb3RlY3RlZFxuICovXG5Db29raWVXcmFwcGVyQmFzZS5wcm90b3R5cGUuX3BhcnNlQ29va2llU3RyaW5nID0gZnVuY3Rpb24gKHN0cmluZykge1xuXHR2YXIgY29va2llID0ge307XG5cblx0aWYgKHR5cGVvZiAoc3RyaW5nKSAhPT0gJ3N0cmluZycpIHtcblx0XHRyZXR1cm4gY29va2llO1xuXHR9XG5cdHN0cmluZ1xuXHRcdC5zcGxpdCgvOyAqLylcblx0XHQuZm9yRWFjaChmdW5jdGlvbiAoY29va2llUGFpcikge1xuXHRcdFx0dmFyIGVxdWFsc0luZGV4ID0gY29va2llUGFpci5pbmRleE9mKCc9Jyk7XG5cdFx0XHRpZiAoZXF1YWxzSW5kZXggPCAwKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dmFyIGtleSA9IGNvb2tpZVBhaXIuc3Vic3RyKDAsIGVxdWFsc0luZGV4KS50cmltKCksXG5cdFx0XHRcdHZhbHVlID0gY29va2llUGFpci5zdWJzdHIoXG5cdFx0XHRcdFx0ZXF1YWxzSW5kZXggKyAxLCBjb29raWVQYWlyLmxlbmd0aFxuXHRcdFx0XHQpLnRyaW0oKTtcblxuXHRcdFx0dmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9eXCJ8XCIkL2csICcnKTtcblx0XHRcdGNvb2tpZVtrZXldID0gdmFsdWU7XG5cdFx0fSk7XG5cblx0cmV0dXJuIGNvb2tpZTtcbn07XG5cbi8qKlxuICogQ29udmVydHMgY29va2llIHNldHVwIG9iamVjdCB0byBjb29raWUgc3RyaW5nLlxuICogQHBhcmFtIHtPYmplY3R9IGNvb2tpZVNldHVwIENvb2tpZSBzZXR1cCBvYmplY3QuXG4gKiBAcGFyYW0ge3N0cmluZ30gY29va2llU2V0dXAua2V5IENvb2tpZSBrZXkuXG4gKiBAcGFyYW0ge3N0cmluZ30gY29va2llU2V0dXAudmFsdWUgQ29va2llIHZhbHVlLlxuICogQHBhcmFtIHtudW1iZXI/fSBjb29raWVTZXR1cC5tYXhBZ2UgTWF4IGNvb2tpZSBhZ2UgaW4gc2Vjb25kcy5cbiAqIEBwYXJhbSB7RGF0ZT99IGNvb2tpZVNldHVwLmV4cGlyZXMgRXhwaXJlIGRhdGUuXG4gKiBAcGFyYW0ge3N0cmluZz99IGNvb2tpZVNldHVwLnBhdGggVVJJIHBhdGggZm9yIGNvb2tpZS5cbiAqIEBwYXJhbSB7c3RyaW5nP30gY29va2llU2V0dXAuZG9tYWluIENvb2tpZSBkb21haW4uXG4gKiBAcGFyYW0ge2Jvb2xlYW4/fSBjb29raWVTZXR1cC5zZWN1cmUgSXMgY29va2llIHNlY3VyZWQuXG4gKiBAcGFyYW0ge2Jvb2xlYW4/fSBjb29raWVTZXR1cC5odHRwT25seSBJcyBjb29raWUgSFRUUCBvbmx5LlxuICogQHJldHVybnMge3N0cmluZ30gQ29va2llIHN0cmluZy5cbiAqIEBwcm90ZWN0ZWRcbiAqL1xuQ29va2llV3JhcHBlckJhc2UucHJvdG90eXBlLl9jb252ZXJ0VG9Db29raWVTZXR1cCA9IGZ1bmN0aW9uIChjb29raWVTZXR1cCkge1xuXHRpZiAodHlwZW9mKGNvb2tpZVNldHVwLmtleSkgIT09ICdzdHJpbmcnIHx8XG5cdFx0dHlwZW9mKGNvb2tpZVNldHVwLnZhbHVlKSAhPT0gJ3N0cmluZycpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ1dyb25nIGtleSBvciB2YWx1ZScpO1xuXHR9XG5cblx0dmFyIGNvb2tpZSA9IGNvb2tpZVNldHVwLmtleSArICc9JyArIGNvb2tpZVNldHVwLnZhbHVlO1xuXG5cdC8vIGh0dHA6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzYyNjUjc2VjdGlvbi00LjEuMVxuXHRpZiAodHlwZW9mKGNvb2tpZVNldHVwLm1heEFnZSkgPT09ICdudW1iZXInKSB7XG5cdFx0Y29va2llICs9ICc7IE1heC1BZ2U9JyArIGNvb2tpZVNldHVwLm1heEFnZS50b0ZpeGVkKCk7XG5cdFx0aWYgKCFjb29raWVTZXR1cC5leHBpcmVzKSB7XG5cdFx0XHQvLyBieSBkZWZhdWx0IGV4cGlyZSBkYXRlID0gY3VycmVudCBkYXRlICsgbWF4LWFnZSBpbiBzZWNvbmRzXG5cdFx0XHRjb29raWVTZXR1cC5leHBpcmVzID0gbmV3IERhdGUoRGF0ZS5ub3coKSArXG5cdFx0XHRcdGNvb2tpZVNldHVwLm1heEFnZSAqIDEwMDApO1xuXHRcdH1cblx0fVxuXHRpZiAoY29va2llU2V0dXAuZXhwaXJlcyBpbnN0YW5jZW9mIERhdGUpIHtcblx0XHRjb29raWUgKz0gJzsgRXhwaXJlcz0nICsgY29va2llU2V0dXAuZXhwaXJlcy50b1VUQ1N0cmluZygpO1xuXHR9XG5cdGlmICh0eXBlb2YoY29va2llU2V0dXAucGF0aCkgPT09ICdzdHJpbmcnKSB7XG5cdFx0Y29va2llICs9ICc7IFBhdGg9JyArIGNvb2tpZVNldHVwLnBhdGg7XG5cdH1cblx0aWYgKHR5cGVvZihjb29raWVTZXR1cC5kb21haW4pID09PSAnc3RyaW5nJykge1xuXHRcdGNvb2tpZSArPSAnOyBEb21haW49JyArIGNvb2tpZVNldHVwLmRvbWFpbjtcblx0fVxuXHRpZiAodHlwZW9mKGNvb2tpZVNldHVwLnNlY3VyZSkgPT09ICdib29sZWFuJyAmJlxuXHRcdGNvb2tpZVNldHVwLnNlY3VyZSkge1xuXHRcdGNvb2tpZSArPSAnOyBTZWN1cmUnO1xuXHR9XG5cdGlmICh0eXBlb2YoY29va2llU2V0dXAuaHR0cE9ubHkpID09PSAnYm9vbGVhbicgJiZcblx0XHRjb29raWVTZXR1cC5odHRwT25seSkge1xuXHRcdGNvb2tpZSArPSAnOyBIdHRwT25seSc7XG5cdH1cblxuXHRyZXR1cm4gY29va2llO1xufTsiLCIvKlxuICogY2F0YmVycnlcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUgRGVuaXMgUmVjaGt1bm92IGFuZCBwcm9qZWN0IGNvbnRyaWJ1dG9ycy5cbiAqXG4gKiBjYXRiZXJyeSdzIGxpY2Vuc2UgZm9sbG93czpcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvblxuICogb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb25cbiAqIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbixcbiAqIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsXG4gKiBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLFxuICogYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbiAqIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4gKiBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4gKiBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqXG4gKiBUaGlzIGxpY2Vuc2UgYXBwbGllcyB0byBhbGwgcGFydHMgb2YgY2F0YmVycnkgdGhhdCBhcmUgbm90IGV4dGVybmFsbHlcbiAqIG1haW50YWluZWQgbGlicmFyaWVzLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBEb2N1bWVudFJlbmRlcmVyQmFzZTtcblxuLyoqXG4gKiBDcmVhdGVzIG5ldyBpbnN0YW5jZSBvZiB0aGUgYmFzaWMgZG9jdW1lbnQgcmVuZGVyZXIuXG4gKiBAcGFyYW0ge1NlcnZpY2VMb2NhdG9yfSAkc2VydmljZUxvY2F0b3IgTG9jYXRvciB0byByZXNvbHZlIGRlcGVuZGVuY2llcy5cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBEb2N1bWVudFJlbmRlcmVyQmFzZSgkc2VydmljZUxvY2F0b3IpIHtcblx0dmFyIHNlbGYgPSB0aGlzO1xuXHR0aGlzLl9zZXJ2aWNlTG9jYXRvciA9ICRzZXJ2aWNlTG9jYXRvcjtcblx0dGhpcy5fY29udGV4dEZhY3RvcnkgPSAkc2VydmljZUxvY2F0b3IucmVzb2x2ZSgnY29udGV4dEZhY3RvcnknKTtcblx0dGhpcy5fY29tcG9uZW50TG9hZGVyID0gJHNlcnZpY2VMb2NhdG9yLnJlc29sdmUoJ2NvbXBvbmVudExvYWRlcicpO1xuXHR0aGlzLl9ldmVudEJ1cyA9ICRzZXJ2aWNlTG9jYXRvci5yZXNvbHZlKCdldmVudEJ1cycpO1xuXG5cdHZhciBzdG9yZUxvYWRlciA9ICRzZXJ2aWNlTG9jYXRvci5yZXNvbHZlKCdzdG9yZUxvYWRlcicpO1xuXHR0aGlzLl9sb2FkaW5nID0gUHJvbWlzZS5hbGwoW1xuXHRcdHRoaXMuX2NvbXBvbmVudExvYWRlci5sb2FkKCksXG5cdFx0c3RvcmVMb2FkZXIubG9hZCgpXG5cdF0pXG5cdFx0LnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0c2VsZi5fbG9hZGluZyA9IG51bGw7XG5cdFx0XHRzZWxmLl9ldmVudEJ1cy5lbWl0KCdyZWFkeScpO1xuXHRcdH0pXG5cdFx0LmNhdGNoKGZ1bmN0aW9uIChyZWFzb24pIHtcblx0XHRcdHNlbGYuX2V2ZW50QnVzLmVtaXQoJ2Vycm9yJywgcmVhc29uKTtcblx0XHR9KTtcbn1cblxuLyoqXG4gKiBDdXJyZW50IHNlcnZpY2UgbG9jYXRvci5cbiAqIEB0eXBlIHtTZXJ2aWNlTG9jYXRvcn1cbiAqIEBwcm90ZWN0ZWRcbiAqL1xuRG9jdW1lbnRSZW5kZXJlckJhc2UucHJvdG90eXBlLl9zZXJ2aWNlTG9jYXRvciA9IG51bGw7XG5cbi8qKlxuICogQ3VycmVudCBjb21wb25lbnQgbG9hZGVyLlxuICogQHR5cGUge0NvbXBvbmVudExvYWRlcn1cbiAqIEBwcm90ZWN0ZWRcbiAqL1xuRG9jdW1lbnRSZW5kZXJlckJhc2UucHJvdG90eXBlLl9jb21wb25lbnRMb2FkZXIgPSBudWxsO1xuXG4vKipcbiAqIEN1cnJlbnQgbW9kdWxlIGxvYWRpbmcgcHJvbWlzZS5cbiAqIEB0eXBlIHtQcm9taXNlfVxuICogQHByb3RlY3RlZFxuICovXG5Eb2N1bWVudFJlbmRlcmVyQmFzZS5wcm90b3R5cGUuX2xvYWRpbmcgPSBudWxsO1xuXG4vKipcbiAqIEN1cnJlbnQgY29udGV4dCBmYWN0b3J5LlxuICogQHR5cGUge0NvbnRleHRGYWN0b3J5fVxuICogQHByb3RlY3RlZFxuICovXG5Eb2N1bWVudFJlbmRlcmVyQmFzZS5wcm90b3R5cGUuX2NvbnRleHRGYWN0b3J5ID0gbnVsbDtcblxuLyoqXG4gKiBHZXRzIHByb21pc2UgZm9yIHJlYWR5IHN0YXRlIHdoZW4gaXQgd2lsbCBiZSBhYmxlIGhhbmRsZSByZXF1ZXN0cy5cbiAqIEByZXR1cm5zIHtQcm9taXNlfSBQcm9taXNlIGZvciBub3RoaW5nLlxuICogQHByb3RlY3RlZFxuICovXG5Eb2N1bWVudFJlbmRlcmVyQmFzZS5wcm90b3R5cGUuX2dldFByb21pc2VGb3JSZWFkeVN0YXRlID0gZnVuY3Rpb24gKCkge1xuXHRyZXR1cm4gdGhpcy5fbG9hZGluZyA/XG5cdFx0dGhpcy5fbG9hZGluZyA6XG5cdFx0UHJvbWlzZS5yZXNvbHZlKCk7XG59OyIsIi8qXG4gKiBjYXRiZXJyeVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNSBEZW5pcyBSZWNoa3Vub3YgYW5kIHByb2plY3QgY29udHJpYnV0b3JzLlxuICpcbiAqIGNhdGJlcnJ5J3MgbGljZW5zZSBmb2xsb3dzOlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXG4gKiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvblxuICogZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLFxuICogaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSxcbiAqIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsXG4gKiBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuICogc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbiAqIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1NcbiAqIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICpcbiAqIFRoaXMgbGljZW5zZSBhcHBsaWVzIHRvIGFsbCBwYXJ0cyBvZiBjYXRiZXJyeSB0aGF0IGFyZSBub3QgZXh0ZXJuYWxseVxuICogbWFpbnRhaW5lZCBsaWJyYXJpZXMuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IExvYWRlckJhc2U7XG5cbnZhciBtb2R1bGVIZWxwZXIgPSByZXF1aXJlKCcuLi9oZWxwZXJzL21vZHVsZUhlbHBlcicpO1xuXG4vKipcbiAqIENyZWF0ZSBiYXNpYyBpbXBsZW1lbnRhdGlvbiBvZiBhIG1vZHVsZSBsb2FkZXIuXG4gKiBAcGFyYW0ge0FycmF5fSB0cmFuc2Zvcm1zIEFycmF5IG9mIG1vZHVsZSB0cmFuc2Zvcm1hdGlvbnMuXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gTG9hZGVyQmFzZSh0cmFuc2Zvcm1zKSB7XG5cdHRoaXMuX3RyYW5zZm9ybXMgPSB0cmFuc2Zvcm1zO1xufVxuXG4vKipcbiAqIEN1cnJlbnQgbGlzdCBvZiBjb21wb25lbnQgdHJhbnNmb3Jtcy5cbiAqIEB0eXBlIHtBcnJheX1cbiAqIEBwcml2YXRlXG4gKi9cbkxvYWRlckJhc2UucHJvdG90eXBlLl90cmFuc2Zvcm1zID0gbnVsbDtcblxuLyoqXG4gKiBBcHBsaWVzIGFsbCB0cmFuc2Zvcm1hdGlvbnMgcmVnaXN0ZXJlZCBpbiBTZXJ2aWNlIExvY2F0b3IuXG4gKiBAcGFyYW0ge09iamVjdH0gbW9kdWxlIExvYWRlZCBtb2R1bGUuXG4gKiBAcGFyYW0ge251bWJlcj99IGluZGV4IFRyYW5zZm9ybWF0aW9uIGluZGV4IGluIGEgbGlzdC5cbiAqIEByZXR1cm5zIHtQcm9taXNlPE9iamVjdD59IFRyYW5zZm9ybWVkIG1vZHVsZS5cbiAqIEBwcm90ZWN0ZWRcbiAqL1xuTG9hZGVyQmFzZS5wcm90b3R5cGUuX2FwcGx5VHJhbnNmb3JtcyA9IGZ1bmN0aW9uIChtb2R1bGUsIGluZGV4KSB7XG5cdGlmIChpbmRleCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0Ly8gdGhlIGxpc3QgaXMgYSBzdGFjaywgd2Ugc2hvdWxkIHJldmVyc2UgaXRcblx0XHRpbmRleCA9IHRoaXMuX3RyYW5zZm9ybXMubGVuZ3RoIC0gMTtcblx0fVxuXG5cdGlmIChpbmRleCA8IDApIHtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG1vZHVsZSk7XG5cdH1cblxuXHR2YXIgc2VsZiA9IHRoaXMsXG5cdFx0dHJhbnNmb3JtYXRpb24gPSB0aGlzLl90cmFuc2Zvcm1zW2luZGV4XTtcblxuXHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcblx0XHQudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gdHJhbnNmb3JtYXRpb24udHJhbnNmb3JtKG1vZHVsZSk7XG5cdFx0fSlcblx0XHQudGhlbihmdW5jdGlvbiAodHJhbnNmb3JtZWRNb2R1bGUpIHtcblx0XHRcdHJldHVybiBzZWxmLl9hcHBseVRyYW5zZm9ybXModHJhbnNmb3JtZWRNb2R1bGUsIGluZGV4IC0gMSk7XG5cdFx0fSk7XG59OyIsIi8qXG4gKiBjYXRiZXJyeVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNCBEZW5pcyBSZWNoa3Vub3YgYW5kIHByb2plY3QgY29udHJpYnV0b3JzLlxuICpcbiAqIGNhdGJlcnJ5J3MgbGljZW5zZSBmb2xsb3dzOlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXG4gKiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvblxuICogZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLFxuICogaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSxcbiAqIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsXG4gKiBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuICogc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbiAqIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1NcbiAqIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICpcbiAqIFRoaXMgbGljZW5zZSBhcHBsaWVzIHRvIGFsbCBwYXJ0cyBvZiBjYXRiZXJyeSB0aGF0IGFyZSBub3QgZXh0ZXJuYWxseVxuICogbWFpbnRhaW5lZCBsaWJyYXJpZXMuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1vZHVsZUFwaVByb3ZpZGVyQmFzZTtcblxudmFyIEVSUk9SX0VWRU5UX05BTUUgPSAnRXZlbnQgbmFtZSBzaG91bGQgYmUgYSBzdHJpbmcnLFxuXHRFUlJPUl9FVkVOVF9IQU5ETEVSID0gJ0V2ZW50IGhhbmRsZXIgc2hvdWxkIGJlIGEgZnVuY3Rpb24nO1xuXG4vKipcbiAqIENyZWF0ZXMgbmV3IGluc3RhbmNlIG9mIHRoZSBiYXNpYyBBUEkgcHJvdmlkZXIuXG4gKiBAcGFyYW0ge1NlcnZpY2VMb2NhdG9yfSAkc2VydmljZUxvY2F0b3IgU2VydmljZSBsb2NhdG9yXG4gKiB0byByZXNvbHZlIGRlcGVuZGVuY2llcy5cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBNb2R1bGVBcGlQcm92aWRlckJhc2UoJHNlcnZpY2VMb2NhdG9yKSB7XG5cdHRoaXMubG9jYXRvciA9ICRzZXJ2aWNlTG9jYXRvcjtcblx0dGhpcy5jb29raWUgPSAkc2VydmljZUxvY2F0b3IucmVzb2x2ZSgnY29va2llV3JhcHBlcicpO1xuXHR0aGlzLl9ldmVudEJ1cyA9ICRzZXJ2aWNlTG9jYXRvci5yZXNvbHZlKCdldmVudEJ1cycpO1xufVxuXG4vKipcbiAqIEN1cnJlbnQgY29va2llIHByb3ZpZGVyLlxuICogQHR5cGUge0Nvb2tpZVdyYXBwZXJ9XG4gKi9cbk1vZHVsZUFwaVByb3ZpZGVyQmFzZS5wcm90b3R5cGUuY29va2llID0gbnVsbDtcblxuLyoqXG4gKiBDdXJyZW50IHNlcnZpY2UgbG9jYXRvci5cbiAqIEB0eXBlIHtTZXJ2aWNlTG9jYXRvcn1cbiAqIEBwcm90ZWN0ZWRcbiAqL1xuTW9kdWxlQXBpUHJvdmlkZXJCYXNlLnByb3RvdHlwZS5sb2NhdG9yID0gbnVsbDtcblxuLyoqXG4gKiBDdXJyZW50IGV2ZW50IGJ1cy5cbiAqIEB0eXBlIHtFdmVudEVtaXR0ZXJ9XG4gKiBAcHJpdmF0ZVxuICovXG5Nb2R1bGVBcGlQcm92aWRlckJhc2UucHJvdG90eXBlLl9ldmVudEJ1cyA9IG51bGw7XG5cbi8qKlxuICogU3Vic2NyaWJlcyBvbiB0aGUgc3BlY2lmaWVkIGV2ZW50IGluIENhdGJlcnJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZSBOYW1lIG9mIHRoZSBldmVudC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGhhbmRsZXIgRXZlbnQgaGFuZGxlci5cbiAqIEByZXR1cm5zIHtNb2R1bGVBcGlQcm92aWRlckJhc2V9IFRoaXMgb2JqZWN0IGZvciBjaGFpbmluZy5cbiAqL1xuTW9kdWxlQXBpUHJvdmlkZXJCYXNlLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGhhbmRsZXIpIHtcblx0Y2hlY2tFdmVudE5hbWVBbmRIYW5kbGVyKGV2ZW50TmFtZSwgaGFuZGxlcik7XG5cdHRoaXMuX2V2ZW50QnVzLm9uKGV2ZW50TmFtZSwgaGFuZGxlcik7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTdWJzY3JpYmVzIG9uIHRoZSBzcGVjaWZpZWQgZXZlbnQgaW4gQ2F0YmVycnkgdG8gaGFuZGxlIG9uY2UuXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lIE5hbWUgb2YgdGhlIGV2ZW50LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaGFuZGxlciBFdmVudCBoYW5kbGVyLlxuICogQHJldHVybnMge01vZHVsZUFwaVByb3ZpZGVyQmFzZX0gVGhpcyBvYmplY3QgZm9yIGNoYWluaW5nLlxuICovXG5Nb2R1bGVBcGlQcm92aWRlckJhc2UucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBoYW5kbGVyKSB7XG5cdGNoZWNrRXZlbnROYW1lQW5kSGFuZGxlcihldmVudE5hbWUsIGhhbmRsZXIpO1xuXHR0aGlzLl9ldmVudEJ1cy5vbmNlKGV2ZW50TmFtZSwgaGFuZGxlcik7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZW1vdmVzIHRoZSBzcGVjaWZpZWQgaGFuZGxlciBmcm9tIHRoZSBzcGVjaWZpZWQgZXZlbnQuXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lIE5hbWUgb2YgdGhlIGV2ZW50LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaGFuZGxlciBFdmVudCBoYW5kbGVyLlxuICogQHJldHVybnMge01vZHVsZUFwaVByb3ZpZGVyQmFzZX0gVGhpcyBvYmplY3QgZm9yIGNoYWluaW5nLlxuICovXG5Nb2R1bGVBcGlQcm92aWRlckJhc2UucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgaGFuZGxlcikge1xuXHRjaGVja0V2ZW50TmFtZUFuZEhhbmRsZXIoZXZlbnROYW1lLCBoYW5kbGVyKTtcblx0dGhpcy5fZXZlbnRCdXMucmVtb3ZlTGlzdGVuZXIoZXZlbnROYW1lLCBoYW5kbGVyKTtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGhhbmRsZXJzIGZyb20gdGhlIHNwZWNpZmllZCBldmVudCBpbiBDYXRiZXJyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWUgTmFtZSBvZiB0aGUgZXZlbnQuXG4gKiBAcmV0dXJucyB7TW9kdWxlQXBpUHJvdmlkZXJCYXNlfSBUaGlzIG9iamVjdCBmb3IgY2hhaW5pbmcuXG4gKi9cbk1vZHVsZUFwaVByb3ZpZGVyQmFzZS5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID0gZnVuY3Rpb24gKGV2ZW50TmFtZSkge1xuXHRjaGVja0V2ZW50TmFtZUFuZEhhbmRsZXIoZXZlbnROYW1lLCBkdW1teSk7XG5cdHRoaXMuX2V2ZW50QnVzLnJlbW92ZUFsbExpc3RlbmVycyhldmVudE5hbWUpO1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQ2hlY2tzIGlmIGV2ZW50IG5hbWUgaXMgYSBzdHJpbmcgYW5kIGhhbmRsZXIgaXMgYSBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7Kn0gZXZlbnROYW1lIE5hbWUgb2YgdGhlIGV2ZW50IHRvIGNoZWNrLlxuICogQHBhcmFtIHsqfSBoYW5kbGVyIFRoZSBldmVudCBoYW5kbGVyIHRvIGNoZWNrLlxuICovXG5mdW5jdGlvbiBjaGVja0V2ZW50TmFtZUFuZEhhbmRsZXIoZXZlbnROYW1lLCBoYW5kbGVyKSB7XG5cdGlmICh0eXBlb2YgKGV2ZW50TmFtZSkgIT09ICdzdHJpbmcnKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKEVSUk9SX0VWRU5UX05BTUUpO1xuXHR9XG5cblx0aWYgKHR5cGVvZiAoaGFuZGxlcikgIT09ICdmdW5jdGlvbicpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoRVJST1JfRVZFTlRfSEFORExFUik7XG5cdH1cbn1cblxuLyoqXG4gKiBEb2VzIG5vdGhpbmcuIEl0IGlzIHVzZWQgYXMgYSBkZWZhdWx0IGNhbGxiYWNrLlxuICovXG5mdW5jdGlvbiBkdW1teSgpIHt9XG4iLCIvKlxuICogY2F0YmVycnlcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgRGVuaXMgUmVjaGt1bm92IGFuZCBwcm9qZWN0IGNvbnRyaWJ1dG9ycy5cbiAqXG4gKiBjYXRiZXJyeSdzIGxpY2Vuc2UgZm9sbG93czpcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvblxuICogb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb25cbiAqIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbixcbiAqIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsXG4gKiBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLFxuICogYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbiAqIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4gKiBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4gKiBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqXG4gKiBUaGlzIGxpY2Vuc2UgYXBwbGllcyB0byBhbGwgcGFydHMgb2YgY2F0YmVycnkgdGhhdCBhcmUgbm90IGV4dGVybmFsbHlcbiAqIG1haW50YWluZWQgbGlicmFyaWVzLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWwgPSByZXF1aXJlKCd1dGlsJyk7XG5cbnZhciBUSVRMRSA9ICdDYXRiZXJyeUA1LjAuNSAoJyArXG5cdFx0JzxhIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vY2F0YmVycnkvY2F0YmVycnkvaXNzdWVzXCIgJyArXG5cdFx0J3RhcmdldD1cIl9ibGFua1wiPicgK1xuXHRcdCdyZXBvcnQgYW4gaXNzdWUnICtcblx0XHQnPC9hPicgK1xuXHRcdCcpJyxcblx0QU1QID0gLyYvZyxcblx0TFQgPSAvPC9nLFxuXHRHVCA9IC8+L2csXG5cdFFVT1QgPSAvXFxcIi9nLFxuXHRTSU5HTEVfUVVPVCA9IC9cXCcvZyxcblx0RVJST1JfTUVTU0FHRV9SRUdFWFAgPSAvXig/OltcXHckXSspOiAoPzouKylcXHI/XFxuL2ksXG5cdEVSUk9SX01FU1NBR0VfRk9STUFUID0gJzxzcGFuICcgK1xuXHRcdCdzdHlsZT1cImNvbG9yOiByZWQ7IGZvbnQtc2l6ZTogMTZwdDsgZm9udC13ZWlnaHQ6IGJvbGQ7XCI+JyArXG5cdFx0JyVzJXMnICtcblx0XHQnPC9zcGFuPicsXG5cdE5FV19MSU5FID0gL1xccj9cXG4vZztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdC8qKlxuXHQgKiBQcmludHMgZXJyb3Igd2l0aCBwcmV0dHkgZm9ybWF0dGluZy5cblx0ICogQHBhcmFtIHtFcnJvcn0gZXJyb3IgRXJyb3IgdG8gcHJpbnQuXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB1c2VyQWdlbnQgVXNlciBhZ2VudCBpbmZvcm1hdGlvbi5cblx0ICogQHJldHVybnMge3N0cmluZ30gSFRNTCB3aXRoIGFsbCBpbmZvcm1hdGlvbiBhYm91dCBlcnJvci5cblx0ICovXG5cdHByZXR0eVByaW50OiBmdW5jdGlvbiAoZXJyb3IsIHVzZXJBZ2VudCkge1xuXHRcdGlmICghZXJyb3IgfHwgdHlwZW9mKGVycm9yKSAhPT0gJ29iamVjdCcpIHtcblx0XHRcdHJldHVybiAnJztcblx0XHR9XG5cdFx0dmFyIGRhdGVTdHJpbmcgPSAobmV3IERhdGUoKSkudG9VVENTdHJpbmcoKSArICc7PGJyLz4nLFxuXHRcdFx0dXNlckFnZW50U3RyaW5nID0gKHVzZXJBZ2VudCA/ICh1c2VyQWdlbnQgKyAnOzxici8+JykgOiAnJyksXG5cdFx0XHRuYW1lID0gKHR5cGVvZihlcnJvci5uYW1lKSA9PT0gJ3N0cmluZycgPyBlcnJvci5uYW1lICsgJzogJyA6ICcnKSxcblx0XHRcdG1lc3NhZ2UgPSBTdHJpbmcoZXJyb3IubWVzc2FnZSB8fCAnJyksXG5cdFx0XHRzdGFjayA9IFN0cmluZyhlcnJvci5zdGFjayB8fCAnJykucmVwbGFjZShFUlJPUl9NRVNTQUdFX1JFR0VYUCwgJycpLFxuXHRcdFx0ZnVsbE1lc3NhZ2UgPSB1dGlsLmZvcm1hdChcblx0XHRcdFx0RVJST1JfTUVTU0FHRV9GT1JNQVQsIGVzY2FwZShuYW1lKSwgZXNjYXBlKG1lc3NhZ2UpXG5cdFx0XHQpO1xuXG5cdFx0cmV0dXJuICc8ZGl2IHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7IGZvbnQtc2l6ZTogMTJwdDtcIj4nICtcblx0XHRcdGRhdGVTdHJpbmcgK1xuXHRcdFx0dXNlckFnZW50U3RyaW5nICtcblx0XHRcdFRJVExFICsgJzxici8+PGJyLz4nICtcblx0XHRcdGZ1bGxNZXNzYWdlICsgJzxici8+PGJyLz4nICtcblx0XHRcdGVzY2FwZShzdGFjaykgK1xuXHRcdFx0JzwvZGl2Pic7XG5cdH1cbn07XG5cbi8qKlxuICogRXNjYXBlcyBlcnJvciB0ZXh0LlxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIEVycm9yIHRleHQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBlc2NhcGVkIGFuZCBmb3JtYXR0ZWQgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBlc2NhcGUodmFsdWUpIHtcblx0cmV0dXJuIHZhbHVlXG5cdFx0LnJlcGxhY2UoQU1QLCAnJmFtcDsnKVxuXHRcdC5yZXBsYWNlKExULCAnJmx0OycpXG5cdFx0LnJlcGxhY2UoR1QsICcmZ3Q7Jylcblx0XHQucmVwbGFjZShRVU9ULCAnJnF1b3Q7Jylcblx0XHQucmVwbGFjZShTSU5HTEVfUVVPVCwgJyYjMzk7Jylcblx0XHQucmVwbGFjZShORVdfTElORSwgJzxici8+Jyk7XG59IiwiLypcbiAqIGNhdGJlcnJ5XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0IERlbmlzIFJlY2hrdW5vdiBhbmQgcHJvamVjdCBjb250cmlidXRvcnMuXG4gKlxuICogY2F0YmVycnkncyBsaWNlbnNlIGZvbGxvd3M6XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb25cbiAqIG9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uXG4gKiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sXG4gKiBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLFxuICogcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSxcbiAqIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4gKiBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuICogaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuICogT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKlxuICogVGhpcyBsaWNlbnNlIGFwcGxpZXMgdG8gYWxsIHBhcnRzIG9mIGNhdGJlcnJ5IHRoYXQgYXJlIG5vdCBleHRlcm5hbGx5XG4gKiBtYWludGFpbmVkIGxpYnJhcmllcy5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBoZWxwZXIgPSB7XG5cdENPTVBPTkVOVF9QUkVGSVg6ICdjYXQtJyxcblx0Q09NUE9ORU5UX1BSRUZJWF9SRUdFWFA6IC9eY2F0LS8sXG5cdENPTVBPTkVOVF9FUlJPUl9URU1QTEFURV9QT1NURklYOiAnLS1lcnJvcicsXG5cdERPQ1VNRU5UX0NPTVBPTkVOVF9OQU1FOiAnZG9jdW1lbnQnLFxuXHRIRUFEX0NPTVBPTkVOVF9OQU1FOiAnaGVhZCcsXG5cdEFUVFJJQlVURV9JRDogJ2lkJyxcblx0QVRUUklCVVRFX1NUT1JFOiAnY2F0LXN0b3JlJyxcblx0REVGQVVMVF9MT0dJQ19GSUxFTkFNRTogJ2luZGV4LmpzJyxcblxuXHQvKipcblx0ICogQ3JlYXRlcyBuYW1lIGZvciBlcnJvciB0ZW1wbGF0ZSBvZiBjb21wb25lbnQuXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBjb21wb25lbnROYW1lIG5hbWUgb2YgY29tcG9uZW50LlxuXHQgKiBAcmV0dXJucyB7c3RyaW5nfSBOYW1lIG9mIGVycm9yIHRlbXBsYXRlIG9mIHRoZSBjb21wb25lbnQuXG5cdCAqL1xuXHRnZXROYW1lRm9yRXJyb3JUZW1wbGF0ZTogZnVuY3Rpb24gKGNvbXBvbmVudE5hbWUpIHtcblx0XHRpZiAodHlwZW9mKGNvbXBvbmVudE5hbWUpICE9PSAnc3RyaW5nJykge1xuXHRcdFx0cmV0dXJuICcnO1xuXHRcdH1cblx0XHRyZXR1cm4gY29tcG9uZW50TmFtZSArIGhlbHBlci5DT01QT05FTlRfRVJST1JfVEVNUExBVEVfUE9TVEZJWDtcblx0fSxcblxuXHQvKipcblx0ICogRGV0ZXJtaW5lcyBpZiBzcGVjaWZpZWQgY29tcG9uZW50IG5hbWUgaXMgdGhlIFwiZG9jdW1lbnRcIiBjb21wb25lbnQgbmFtZS5cblx0ICogQHBhcmFtIHtzdHJpbmd9IGNvbXBvbmVudE5hbWUgTmFtZSBvZiB0aGUgY29tcG9uZW50LlxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiBzcGVjaWZpZWQgY29tcG9uZW50IGlzIHRoZSBcImRvY3VtZW50XCIgY29tcG9uZW50LlxuXHQgKi9cblx0aXNEb2N1bWVudENvbXBvbmVudDogZnVuY3Rpb24gKGNvbXBvbmVudE5hbWUpIHtcblx0XHRyZXR1cm4gY29tcG9uZW50TmFtZS50b0xvd2VyQ2FzZSgpID09PSBoZWxwZXIuRE9DVU1FTlRfQ09NUE9ORU5UX05BTUU7XG5cdH0sXG5cdC8qKlxuXHQgKiBEZXRlcm1pbmVzIGlmIHNwZWNpZmllZCBjb21wb25lbnQgbmFtZSBpcyB0aGUgXCJoZWFkXCIgY29tcG9uZW50IG5hbWUuXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBjb21wb25lbnROYW1lIE5hbWUgb2YgdGhlIGNvbXBvbmVudC5cblx0ICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgc3BlY2lmaWVkIGNvbXBvbmVudCBpcyB0aGUgXCJoZWFkXCIgY29tcG9uZW50LlxuXHQgKi9cblx0aXNIZWFkQ29tcG9uZW50OiBmdW5jdGlvbiAoY29tcG9uZW50TmFtZSkge1xuXHRcdHJldHVybiBjb21wb25lbnROYW1lLnRvTG93ZXJDYXNlKCkgPT09IGhlbHBlci5IRUFEX0NPTVBPTkVOVF9OQU1FO1xuXHR9LFxuXG5cdC8qKlxuXHQgKiBHZXRzIHRoZSBvcmlnaW5hbCBjb21wb25lbnQgbmFtZSB3aXRob3V0IHByZWZpeC5cblx0ICogQHBhcmFtIHtTdHJpbmd9IGZ1bGxDb21wb25lbnROYW1lIEZ1bGwgY29tcG9uZW50IG5hbWUgKHRhZyBuYW1lKS5cblx0ICogQHJldHVybnMge1N0cmluZ30gVGhlIG9yaWdpbmFsIGNvbXBvbmVudCBuYW1lIHdpdGhvdXQgcHJlZml4LlxuXHQgKi9cblx0Z2V0T3JpZ2luYWxDb21wb25lbnROYW1lOiBmdW5jdGlvbiAoZnVsbENvbXBvbmVudE5hbWUpIHtcblx0XHRpZiAodHlwZW9mIChmdWxsQ29tcG9uZW50TmFtZSkgIT09ICdzdHJpbmcnKSB7XG5cdFx0XHRyZXR1cm4gJyc7XG5cdFx0fVxuXHRcdGZ1bGxDb21wb25lbnROYW1lID0gZnVsbENvbXBvbmVudE5hbWUudG9Mb3dlckNhc2UoKTtcblx0XHRpZiAoZnVsbENvbXBvbmVudE5hbWUgPT09IGhlbHBlci5IRUFEX0NPTVBPTkVOVF9OQU1FKSB7XG5cdFx0XHRyZXR1cm4gZnVsbENvbXBvbmVudE5hbWU7XG5cdFx0fVxuXHRcdGlmIChmdWxsQ29tcG9uZW50TmFtZSA9PT0gaGVscGVyLkRPQ1VNRU5UX0NPTVBPTkVOVF9OQU1FKSB7XG5cdFx0XHRyZXR1cm4gZnVsbENvbXBvbmVudE5hbWU7XG5cdFx0fVxuXHRcdHJldHVybiBmdWxsQ29tcG9uZW50TmFtZS5yZXBsYWNlKGhlbHBlci5DT01QT05FTlRfUFJFRklYX1JFR0VYUCwgJycpO1xuXHR9LFxuXG5cdC8qKlxuXHQgKiBHZXRzIHZhbGlkIHRhZyBuYW1lIGZvciBjb21wb25lbnQuXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBjb21wb25lbnROYW1lIE5hbWUgb2YgdGhlIGNvbXBvbmVudC5cblx0ICogQHJldHVybnMge3N0cmluZ30gTmFtZSBvZiB0aGUgdGFnLlxuXHQgKi9cblx0Z2V0VGFnTmFtZUZvckNvbXBvbmVudE5hbWU6IGZ1bmN0aW9uIChjb21wb25lbnROYW1lKSB7XG5cdFx0aWYgKHR5cGVvZihjb21wb25lbnROYW1lKSAhPT0gJ3N0cmluZycpIHtcblx0XHRcdHJldHVybiAnJztcblx0XHR9XG5cdFx0dmFyIHVwcGVyQ29tcG9uZW50TmFtZSA9IGNvbXBvbmVudE5hbWUudG9VcHBlckNhc2UoKTtcblx0XHRpZiAoY29tcG9uZW50TmFtZSA9PT0gaGVscGVyLkhFQURfQ09NUE9ORU5UX05BTUUpIHtcblx0XHRcdHJldHVybiB1cHBlckNvbXBvbmVudE5hbWU7XG5cdFx0fVxuXHRcdGlmIChjb21wb25lbnROYW1lID09PSBoZWxwZXIuRE9DVU1FTlRfQ09NUE9ORU5UX05BTUUpIHtcblx0XHRcdHJldHVybiB1cHBlckNvbXBvbmVudE5hbWU7XG5cdFx0fVxuXHRcdHJldHVybiBoZWxwZXIuQ09NUE9ORU5UX1BSRUZJWC50b1VwcGVyQ2FzZSgpICsgdXBwZXJDb21wb25lbnROYW1lO1xuXHR9LFxuXG5cdC8qKlxuXHQgKiBHZXRzIG1ldGhvZCBvZiB0aGUgbW9kdWxlIHRoYXQgY2FuIGJlIGludm9rZWQuXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBtb2R1bGUgTW9kdWxlIGltcGxlbWVudGF0aW9uLlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gcHJlZml4IE1ldGhvZCBwcmVmaXggKGkuZS4gaGFuZGxlKS5cblx0ICogQHBhcmFtIHtzdHJpbmc/fSBuYW1lIE5hbWUgb2YgdGhlIGVudGl0eSB0byBpbnZva2UgbWV0aG9kIGZvclxuXHQgKiAod2lsbCBiZSBjb252ZXJ0ZWQgdG8gY2FtZWwgY2FzaW5nKS5cblx0ICogQHJldHVybnMge0Z1bmN0aW9ufSBNZXRob2QgdG8gaW52b2tlLlxuXHQgKi9cblx0Z2V0TWV0aG9kVG9JbnZva2U6IGZ1bmN0aW9uIChtb2R1bGUsIHByZWZpeCwgbmFtZSkge1xuXHRcdGlmICghbW9kdWxlIHx8IHR5cGVvZihtb2R1bGUpICE9PSAnb2JqZWN0Jykge1xuXHRcdFx0cmV0dXJuIGRlZmF1bHRQcm9taXNlTWV0aG9kO1xuXHRcdH1cblx0XHR2YXIgbWV0aG9kTmFtZSA9IGhlbHBlci5nZXRDYW1lbENhc2VOYW1lKHByZWZpeCwgbmFtZSk7XG5cdFx0aWYgKHR5cGVvZihtb2R1bGVbbWV0aG9kTmFtZV0pID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRyZXR1cm4gbW9kdWxlW21ldGhvZE5hbWVdLmJpbmQobW9kdWxlKTtcblx0XHR9XG5cdFx0aWYgKHR5cGVvZihtb2R1bGVbcHJlZml4XSkgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdHJldHVybiBtb2R1bGVbcHJlZml4XS5iaW5kKG1vZHVsZSwgbmFtZSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGRlZmF1bHRQcm9taXNlTWV0aG9kO1xuXHR9LFxuXG5cdC8qKlxuXHQgKiBHZXRzIG5hbWUgaW4gY2FtZWwgY2FzaW5nIGZvciBldmVyeXRoaW5nLlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gcHJlZml4IFByZWZpeCBmb3IgdGhlIG5hbWUuXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIE5hbWUgdG8gY29udmVydC5cblx0ICovXG5cdGdldENhbWVsQ2FzZU5hbWU6IGZ1bmN0aW9uIChwcmVmaXgsIG5hbWUpIHtcblx0XHRpZiAoIW5hbWUpIHtcblx0XHRcdHJldHVybiAnJztcblx0XHR9XG5cdFx0dmFyIHBhcnRzID0gbmFtZS5zcGxpdCgvW15hLXowLTldL2kpLFxuXHRcdFx0Y2FtZWxDYXNlTmFtZSA9IFN0cmluZyhwcmVmaXggfHwgJycpO1xuXG5cdFx0cGFydHMuZm9yRWFjaChmdW5jdGlvbiAocGFydCkge1xuXHRcdFx0aWYgKCFwYXJ0KSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gZmlyc3QgY2hhcmFjdGVyIGluIG1ldGhvZCBuYW1lIG11c3QgYmUgaW4gbG93ZXJjYXNlXG5cdFx0XHRjYW1lbENhc2VOYW1lICs9IGNhbWVsQ2FzZU5hbWUgP1xuXHRcdFx0XHRwYXJ0WzBdLnRvVXBwZXJDYXNlKCkgOlxuXHRcdFx0XHRwYXJ0WzBdLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRjYW1lbENhc2VOYW1lICs9IHBhcnQuc3Vic3RyaW5nKDEpO1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIGNhbWVsQ2FzZU5hbWU7XG5cdH0sXG5cblx0LyoqXG5cdCAqIEdldHMgc2FmZSBwcm9taXNlIHJlc29sdmVkIGZyb20gYWN0aW9uLlxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBhY3Rpb24gQWN0aW9uIHRvIHdyYXAgd2l0aCBzYWZlIHByb21pc2UuXG5cdCAqIEByZXR1cm5zIHtQcm9taXNlfVxuXHQgKi9cblx0Z2V0U2FmZVByb21pc2U6IGZ1bmN0aW9uIChhY3Rpb24pIHtcblx0XHR2YXIgcHJvbWlzZTtcblx0XHR0cnkge1xuXHRcdFx0cHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZShhY3Rpb24oKSk7XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0cHJvbWlzZSA9IFByb21pc2UucmVqZWN0KGUpO1xuXHRcdH1cblxuXHRcdHJldHVybiBwcm9taXNlO1xuXHR9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGhlbHBlcjtcblxuLyoqXG4gKiBKdXN0IHJldHVybnMgcmVzb2x2ZWQgcHJvbWlzZS5cbiAqIEByZXR1cm5zIHtQcm9taXNlfSBQcm9taXNlIGZvciBub3RoaW5nLlxuICovXG5mdW5jdGlvbiBkZWZhdWx0UHJvbWlzZU1ldGhvZCgpIHtcblx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xufSIsIi8qXG4gKiBjYXRiZXJyeVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNCBEZW5pcyBSZWNoa3Vub3YgYW5kIHByb2plY3QgY29udHJpYnV0b3JzLlxuICpcbiAqIGNhdGJlcnJ5J3MgbGljZW5zZSBmb2xsb3dzOlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXG4gKiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvblxuICogZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLFxuICogaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSxcbiAqIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsXG4gKiBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuICogc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbiAqIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1NcbiAqIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICpcbiAqIFRoaXMgbGljZW5zZSBhcHBsaWVzIHRvIGFsbCBwYXJ0cyBvZiBjYXRiZXJyeSB0aGF0IGFyZSBub3QgZXh0ZXJuYWxseVxuICogbWFpbnRhaW5lZCBsaWJyYXJpZXMuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0LyoqXG5cdCAqIERlZmluZXMgcmVhZC1vbmx5IHByb3BlcnR5LlxuXHQgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IE9iamVjdCB0byBkZWZpbmUgcHJvcGVydHkgaW4uXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIE5hbWUgb2YgdGhlIHByb3BlcnR5LlxuXHQgKiBAcGFyYW0geyp9IHZhbHVlIFByb3BlcnR5IHZhbHVlLlxuXHQgKi9cblx0ZGVmaW5lUmVhZE9ubHk6IGZ1bmN0aW9uIChvYmplY3QsIG5hbWUsIHZhbHVlKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iamVjdCwgbmFtZSwge1xuXHRcdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuXHRcdFx0d3JpdGFibGU6IGZhbHNlLFxuXHRcdFx0dmFsdWU6IHZhbHVlXG5cdFx0fSk7XG5cdH1cbn07IiwiLypcbiAqIGNhdGJlcnJ5XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0IERlbmlzIFJlY2hrdW5vdiBhbmQgcHJvamVjdCBjb250cmlidXRvcnMuXG4gKlxuICogY2F0YmVycnkncyBsaWNlbnNlIGZvbGxvd3M6XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb25cbiAqIG9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uXG4gKiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sXG4gKiBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLFxuICogcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSxcbiAqIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4gKiBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuICogaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuICogT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKlxuICogVGhpcyBsaWNlbnNlIGFwcGxpZXMgdG8gYWxsIHBhcnRzIG9mIGNhdGJlcnJ5IHRoYXQgYXJlIG5vdCBleHRlcm5hbGx5XG4gKiBtYWludGFpbmVkIGxpYnJhcmllcy5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWwnKSxcblx0VVJJID0gcmVxdWlyZSgnY2F0YmVycnktdXJpJykuVVJJO1xuXG52YXIgVVJJX1BBVEhfUkVQTEFDRU1FTlRfUkVHX0VYUF9TT1VSQ0UgPSAnKFteXFxcXC9cXFxcXFxcXF0qKScsXG5cdFVSSV9RVUVSWV9SRVBMQUNFTUVOVF9SRUdfRVhQX1NPVVJDRSA9ICcoW14mPz1dKiknO1xuXG52YXIgUEFUSF9FTkRfU0xBU0hfUkVHX0VYUCA9IC8oLispXFwvKCR8XFw/fCMpLyxcblx0RVhQUkVTU0lPTl9FU0NBUEVfUkVHX0VYUCA9IC9bXFwtXFxbXFxdXFx7XFx9XFwoXFwpXFwqXFwrXFw/XFwuXFxcXFxcXlxcJFxcfF0vZyxcblx0SURFTlRJRklFUl9SRUdfRVhQX1NPVVJDRSA9ICdbJEEtWl9dW1xcXFxkQS1aXyRdKicsXG5cdFNUT1JFX0xJU1RfUkVHX0VYUF9TT1VSQ0UgPSAnKD86KD86XFxcXFxcXFxbWyBdKicgK1xuXHRcdCdbXlxcXFxbXFxcXF0sXSsnICtcblx0XHQnKFsgXSosWyBdKicgK1xuXHRcdCdbXlxcXFxbXFxcXF0sXSsnICtcblx0XHQnKSpbIF0qXFxcXFxcXFxdKXwoPzpcXFxcXFxcXFtbIF0qXFxcXFxcXFxdKSk/Jyxcblx0UEFSQU1FVEVSX1JFR19FWFAgPSBuZXcgUmVnRXhwKFxuXHRcdFx0JzonICtcblx0XHRcdElERU5USUZJRVJfUkVHX0VYUF9TT1VSQ0UgK1xuXHRcdFx0U1RPUkVfTElTVF9SRUdfRVhQX1NPVVJDRSwgJ2dpJyksXG5cdFNMQVNIRURfQlJBQ0tFVFNfUkVHX0VYUCA9IC9cXFxcXFxbfFxcXFxcXF0vLFxuXHRTVE9SRV9MSVNUX1NFUEFSQVRPUiA9ICcsJztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdC8qKlxuXHQgKiBSZW1vdmVzIHNsYXNoIGZyb20gdGhlIGVuZCBvZiBVUkkgcGF0aC5cblx0ICogQHBhcmFtIHtzdHJpbmd9IHVyaVBhdGggVVJJIHBhdGggdG8gcHJvY2Vzcy5cblx0ICogQHJldHVybnMge3N0cmluZ31cblx0ICovXG5cdHJlbW92ZUVuZFNsYXNoOiBmdW5jdGlvbiAodXJpUGF0aCkge1xuXHRcdGlmICghdXJpUGF0aCB8fCB0eXBlb2YodXJpUGF0aCkgIT09ICdzdHJpbmcnKSB7XG5cdFx0XHRyZXR1cm4gJyc7XG5cdFx0fVxuXHRcdGlmICh1cmlQYXRoID09PSAnLycpIHtcblx0XHRcdHJldHVybiB1cmlQYXRoO1xuXHRcdH1cblx0XHRyZXR1cm4gdXJpUGF0aC5yZXBsYWNlKFBBVEhfRU5EX1NMQVNIX1JFR19FWFAsICckMSQyJyk7XG5cdH0sXG5cdC8qKlxuXHQgKiBHZXRzIFVSSSBtYXBwZXIgZnJvbSB0aGUgcm91dGUgZXhwcmVzc2lvbiBsaWtlXG5cdCAqIC9zb21lLzppZFtzdG9yZTEsIHN0b3JlMiwgc3RvcmUzXS9kZXRhaWxzP2ZpbHRlcj06ZmlsdGVyW3N0b3JlM11cblx0ICogQHBhcmFtIHtVUkl9IHJvdXRlVXJpIEV4cHJlc3Npb24gdGhhdCBkZWZpbmVzIHJvdXRlLlxuXHQgKiBAcmV0dXJucyB7e2V4cHJlc3Npb246IFJlZ0V4cCwgbWFwOiBGdW5jdGlvbn19XG5cdCAqIFVSSSBtYXBwZXIgb2JqZWN0LlxuXHQgKi9cblx0Y29tcGlsZVJvdXRlOiBmdW5jdGlvbiAocm91dGVVcmkpIHtcblx0XHRpZiAoIXJvdXRlVXJpKSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cblx0XHQvLyBlc2NhcGUgcmVndWxhciBleHByZXNzaW9uIGNoYXJhY3RlcnNcblx0XHR2YXIgZXNjYXBlZCA9IHJvdXRlVXJpLnBhdGgucmVwbGFjZShcblx0XHRcdEVYUFJFU1NJT05fRVNDQVBFX1JFR19FWFAsICdcXFxcJCYnXG5cdFx0KTtcblxuXHRcdC8vIGdldCBhbGwgb2NjdXJyZW5jZXMgb2Ygcm91dGluZyBwYXJhbWV0ZXJzIGluIFVSSSBwYXRoXG5cdFx0dmFyIHJlZ0V4cFNvdXJjZSA9ICdeJyArIGVzY2FwZWQucmVwbGFjZShcblx0XHRcdFx0XHRQQVJBTUVURVJfUkVHX0VYUCxcblx0XHRcdFx0XHRVUklfUEFUSF9SRVBMQUNFTUVOVF9SRUdfRVhQX1NPVVJDRSkgKyAnJCcsXG5cdFx0XHRleHByZXNzaW9uID0gbmV3IFJlZ0V4cChyZWdFeHBTb3VyY2UsICdpJyksXG5cdFx0XHRxdWVyeU1hcHBlcixcblx0XHRcdHBhdGhNYXBwZXIsXG5cdFx0XHRwYXRoUGFyYW1ldGVyTWF0Y2hlcyA9IGVzY2FwZWQubWF0Y2goXG5cdFx0XHRcdFBBUkFNRVRFUl9SRUdfRVhQXG5cdFx0XHQpLFxuXHRcdFx0cGF0aFBhcmFtZXRlcnMgPSBwYXRoUGFyYW1ldGVyTWF0Y2hlcyA/XG5cdFx0XHRcdHBhdGhQYXJhbWV0ZXJNYXRjaGVzLm1hcChnZXRQYXJhbWV0ZXJEZXNjcmlwdG9yKSA6IG51bGw7XG5cblx0XHRpZiAocGF0aFBhcmFtZXRlcnMpIHtcblx0XHRcdHBhdGhNYXBwZXIgPSBjcmVhdGVVcmlQYXRoTWFwcGVyKGV4cHJlc3Npb24sIHBhdGhQYXJhbWV0ZXJzKTtcblx0XHR9XG5cblx0XHRpZiAocm91dGVVcmkucXVlcnkpIHtcblx0XHRcdHZhciBxdWVyeVBhcmFtZXRlcnMgPSB7fTtcblx0XHRcdE9iamVjdC5rZXlzKHJvdXRlVXJpLnF1ZXJ5LnZhbHVlcylcblx0XHRcdFx0LmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcblx0XHRcdFx0XHQvLyBhcnJheXMgaW4gcm91dGluZyBkZWZpbml0aW9ucyBhcmUgbm90IHN1cHBvcnRlZFxuXHRcdFx0XHRcdGlmICh1dGlsLmlzQXJyYXkocm91dGVVcmkucXVlcnkudmFsdWVzW25hbWVdKSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIGVzY2FwZSByZWd1bGFyIGV4cHJlc3Npb24gY2hhcmFjdGVyc1xuXHRcdFx0XHRcdHZhciBlc2NhcGVkID0gcm91dGVVcmkucXVlcnkudmFsdWVzW25hbWVdLnJlcGxhY2UoXG5cdFx0XHRcdFx0XHRFWFBSRVNTSU9OX0VTQ0FQRV9SRUdfRVhQLCAnXFxcXCQmJ1xuXHRcdFx0XHRcdCk7XG5cblx0XHRcdFx0XHQvLyBnZXQgYWxsIG9jY3VycmVuY2VzIG9mIHJvdXRpbmcgcGFyYW1ldGVycyBpbiBVUkkgcGF0aFxuXHRcdFx0XHRcdHZhciByZWdFeHBTb3VyY2UgPSAnXicgKyBlc2NhcGVkLnJlcGxhY2UoXG5cdFx0XHRcdFx0XHRcdFBBUkFNRVRFUl9SRUdfRVhQLFxuXHRcdFx0XHRcdFx0XHRVUklfUVVFUllfUkVQTEFDRU1FTlRfUkVHX0VYUF9TT1VSQ0UpICsgJyQnO1xuXHRcdFx0XHRcdHZhciBxdWVyeVBhcmFtZXRlck1hdGNoZXMgPSBlc2NhcGVkLm1hdGNoKFxuXHRcdFx0XHRcdFx0XHRQQVJBTUVURVJfUkVHX0VYUFxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRpZiAoIXF1ZXJ5UGFyYW1ldGVyTWF0Y2hlcyB8fFxuXHRcdFx0XHRcdFx0cXVlcnlQYXJhbWV0ZXJNYXRjaGVzLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHZhciBwYXJhbWV0ZXIgPSBnZXRQYXJhbWV0ZXJEZXNjcmlwdG9yKFxuXHRcdFx0XHRcdFx0cXVlcnlQYXJhbWV0ZXJNYXRjaGVzW3F1ZXJ5UGFyYW1ldGVyTWF0Y2hlcy5sZW5ndGggLSAxXVxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0dmFyIGV4cHJlc3Npb24gPSBuZXcgUmVnRXhwKHJlZ0V4cFNvdXJjZSwgJ2knKTtcblx0XHRcdFx0XHRwYXJhbWV0ZXIubWFwID0gY3JlYXRlVXJpUXVlcnlWYWx1ZU1hcHBlcihleHByZXNzaW9uKTtcblx0XHRcdFx0XHRxdWVyeVBhcmFtZXRlcnNbbmFtZV0gPSBwYXJhbWV0ZXI7XG5cdFx0XHRcdH0pO1xuXHRcdFx0cXVlcnlNYXBwZXIgPSBjcmVhdGVVcmlRdWVyeU1hcHBlcihxdWVyeVBhcmFtZXRlcnMpO1xuXHRcdH1cblxuXHRcdHJldHVybiB7XG5cdFx0XHRleHByZXNzaW9uOiBleHByZXNzaW9uLFxuXHRcdFx0bWFwOiBmdW5jdGlvbiAodXJpKSB7XG5cdFx0XHRcdHZhciBzdGF0ZSA9IHt9O1xuXHRcdFx0XHRpZiAocGF0aE1hcHBlcikge1xuXHRcdFx0XHRcdHBhdGhNYXBwZXIodXJpLnBhdGgsIHN0YXRlKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChxdWVyeU1hcHBlciAmJiB1cmkucXVlcnkpIHtcblx0XHRcdFx0XHRxdWVyeU1hcHBlcih1cmkucXVlcnkudmFsdWVzLCBzdGF0ZSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gc3RhdGU7XG5cdFx0XHR9XG5cdFx0fTtcblx0fVxufTtcblxuLyoqXG4gKiBDcmVhdGVzIG5ldyBVUkkgcGF0aC10by1zdGF0ZSBvYmplY3QgbWFwcGVyLlxuICogQHBhcmFtIHtSZWdFeHB9IGV4cHJlc3Npb24gUmVndWxhciBleHByZXNzaW9uIHRvIG1hdGNoIFVSSSBwYXRoLlxuICogQHBhcmFtIHtBcnJheX0gcGFyYW1ldGVycyBMaXN0IG9mIHBhcmFtZXRlciBkZXNjcmlwdG9ycy5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gVVJJIG1hcHBlciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlVXJpUGF0aE1hcHBlcihleHByZXNzaW9uLCBwYXJhbWV0ZXJzKSB7XG5cdHJldHVybiBmdW5jdGlvbiAodXJpUGF0aCwgc3RhdGUpIHtcblx0XHR2YXIgbWF0Y2hlcyA9IHVyaVBhdGgubWF0Y2goZXhwcmVzc2lvbik7XG5cdFx0aWYgKCFtYXRjaGVzIHx8IG1hdGNoZXMubGVuZ3RoIDwgMikge1xuXHRcdFx0cmV0dXJuIHN0YXRlO1xuXHRcdH1cblxuXHRcdC8vIHN0YXJ0IHdpdGggc2Vjb25kIG1hdGNoIGJlY2F1c2UgZmlyc3QgbWF0Y2ggaXMgYWx3YXlzXG5cdFx0Ly8gdGhlIHdob2xlIFVSSSBwYXRoXG5cdFx0bWF0Y2hlcyA9IG1hdGNoZXMuc3BsaWNlKDEpO1xuXG5cdFx0cGFyYW1ldGVycy5mb3JFYWNoKGZ1bmN0aW9uIChwYXJhbWV0ZXIsIGluZGV4KSB7XG5cdFx0XHR2YXIgdmFsdWUgPSBtYXRjaGVzW2luZGV4XTtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdHZhbHVlID0gZGVjb2RlVVJJQ29tcG9uZW50KHZhbHVlKTtcblx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0Ly8gbm90aGluZyB0byBkb1xuXHRcdFx0fVxuXHRcdFx0cGFyYW1ldGVyLnN0b3JlTmFtZXMuZm9yRWFjaChmdW5jdGlvbiAoc3RvcmVOYW1lKSB7XG5cdFx0XHRcdGlmICghc3RhdGVbc3RvcmVOYW1lXSkge1xuXHRcdFx0XHRcdHN0YXRlW3N0b3JlTmFtZV0gPSB7fTtcblx0XHRcdFx0fVxuXHRcdFx0XHRzdGF0ZVtzdG9yZU5hbWVdW3BhcmFtZXRlci5uYW1lXSA9IHZhbHVlO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH07XG59XG5cbi8qKlxuICogQ3JlYXRlcyBuZXcgVVJJIHF1ZXJ5LXRvLXN0YXRlIG9iamVjdCBtYXBwZXIuXG4gKiBAcGFyYW0ge09iamVjdH0gcGFyYW1ldGVycyBMaXN0IG9mIHBvc3NpYmxlIHF1ZXJ5IHBhcmFtZXRlciBkZXNjcmlwdG9ycyBieVxuICogcXVlcnkgcGFyYW1ldGVyIG5hbWVzLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBVUkkgbWFwcGVyIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBjcmVhdGVVcmlRdWVyeU1hcHBlcihwYXJhbWV0ZXJzKSB7XG5cdHJldHVybiBmdW5jdGlvbiAocXVlcnlWYWx1ZXMsIHN0YXRlKSB7XG5cdFx0cXVlcnlWYWx1ZXMgPSBxdWVyeVZhbHVlcyB8fCB7fTtcblxuXHRcdE9iamVjdC5rZXlzKHF1ZXJ5VmFsdWVzKVxuXHRcdFx0LmZvckVhY2goZnVuY3Rpb24gKHF1ZXJ5S2V5KSB7XG5cdFx0XHRcdHZhciBwYXJhbWV0ZXIgPSBwYXJhbWV0ZXJzW3F1ZXJ5S2V5XTtcblx0XHRcdFx0aWYgKCFwYXJhbWV0ZXIpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgdmFsdWUgPSB1dGlsLmlzQXJyYXkocXVlcnlWYWx1ZXNbcXVlcnlLZXldKSA/XG5cdFx0XHRcdFx0XHRxdWVyeVZhbHVlc1txdWVyeUtleV1cblx0XHRcdFx0XHRcdFx0Lm1hcChwYXJhbWV0ZXIubWFwKVxuXHRcdFx0XHRcdFx0XHQuZmlsdGVyKGZ1bmN0aW9uICh2YWx1ZSkge1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiB2YWx1ZSAhPT0gbnVsbDtcblx0XHRcdFx0XHRcdFx0fSkgOlxuXHRcdFx0XHRcdFx0cGFyYW1ldGVyLm1hcChxdWVyeVZhbHVlc1txdWVyeUtleV0pO1xuXG5cdFx0XHRcdGlmICh2YWx1ZSA9PT0gbnVsbCkge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHRwYXJhbWV0ZXIuc3RvcmVOYW1lcy5mb3JFYWNoKGZ1bmN0aW9uIChzdG9yZU5hbWUpIHtcblx0XHRcdFx0XHRpZiAoIXN0YXRlW3N0b3JlTmFtZV0pIHtcblx0XHRcdFx0XHRcdHN0YXRlW3N0b3JlTmFtZV0gPSB7fTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0c3RhdGVbc3RvcmVOYW1lXVtwYXJhbWV0ZXIubmFtZV0gPSB2YWx1ZTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0fTtcbn1cblxuLyoqXG4gKiBNYXBzIHF1ZXJ5IHBhcmFtZXRlciB2YWx1ZSB1c2luZyB0aGUgcGFyYW1ldGVycyBleHByZXNzaW9uLlxuICogQHBhcmFtIHtSZWdFeHB9IGV4cHJlc3Npb24gUmVndWxhciBleHByZXNzaW9uIHRvIGdldCBwYXJhbWV0ZXIgdmFsdWUuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFVSSSBxdWVyeSBzdHJpbmcgcGFyYW1ldGVyIHZhbHVlIG1hcHBlciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlVXJpUXVlcnlWYWx1ZU1hcHBlcihleHByZXNzaW9uKSB7XG5cdHJldHVybiBmdW5jdGlvbiAodmFsdWUpIHtcblx0XHR2YWx1ZSA9IHZhbHVlLnRvU3RyaW5nKCk7XG5cdFx0dmFyIG1hdGNoZXMgPSB2YWx1ZS5tYXRjaChleHByZXNzaW9uKTtcblx0XHRpZiAoIW1hdGNoZXMgfHwgbWF0Y2hlcy5sZW5ndGggPT09IDApIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblxuXHRcdC8vIHRoZSB2YWx1ZSBpcyB0aGUgc2Vjb25kIGl0ZW0sIHRoZSBmaXJzdCBpcyBhIHdob2xlIHN0cmluZ1xuXHRcdHZhciBtYXBwZWRWYWx1ZSA9IG1hdGNoZXNbbWF0Y2hlcy5sZW5ndGggLSAxXTtcblx0XHR0cnkge1xuXHRcdFx0bWFwcGVkVmFsdWUgPSBkZWNvZGVVUklDb21wb25lbnQobWFwcGVkVmFsdWUpO1xuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdC8vIG5vdGhpbmcgdG8gZG9cblx0XHR9XG5cblx0XHRyZXR1cm4gbWFwcGVkVmFsdWU7XG5cdH07XG59XG5cbi8qKlxuICogR2V0cyBkZXNjcmlwdGlvbiBvZiBwYXJhbWV0ZXJzIGZyb20gaXRzIGV4cHJlc3Npb24uXG4gKiBAcGFyYW0ge3N0cmluZ30gcGFyYW1ldGVyIFBhcmFtZXRlciBleHByZXNzaW9uLlxuICogQHJldHVybnMge3tuYW1lOiBzdHJpbmcsIHN0b3JlTmFtZXM6IEFycmF5fX0gUGFyYW1ldGVyIGRlc2NyaXB0b3IuXG4gKi9cbmZ1bmN0aW9uIGdldFBhcmFtZXRlckRlc2NyaXB0b3IocGFyYW1ldGVyKSB7XG5cdHZhciBwYXJ0cyA9IHBhcmFtZXRlci5zcGxpdChTTEFTSEVEX0JSQUNLRVRTX1JFR19FWFApO1xuXG5cdHJldHVybiB7XG5cdFx0bmFtZTogcGFydHNbMF1cblx0XHRcdC50cmltKClcblx0XHRcdC5zdWJzdHJpbmcoMSksXG5cdFx0c3RvcmVOYW1lczogKHBhcnRzWzFdID8gcGFydHNbMV0gOiAnJylcblx0XHRcdC5zcGxpdChTVE9SRV9MSVNUX1NFUEFSQVRPUilcblx0XHRcdC5tYXAoZnVuY3Rpb24gKHN0b3JlTmFtZSkge1xuXHRcdFx0XHRyZXR1cm4gc3RvcmVOYW1lLnRyaW0oKTtcblx0XHRcdH0pXG5cdFx0XHQuZmlsdGVyKGZ1bmN0aW9uIChzdG9yZU5hbWUpIHtcblx0XHRcdFx0cmV0dXJuIHN0b3JlTmFtZS5sZW5ndGggPiAwO1xuXHRcdFx0fSlcblx0fTtcbn0iLCIvKlxuICogY2F0YmVycnlcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgRGVuaXMgUmVjaGt1bm92IGFuZCBwcm9qZWN0IGNvbnRyaWJ1dG9ycy5cbiAqXG4gKiBjYXRiZXJyeSdzIGxpY2Vuc2UgZm9sbG93czpcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvblxuICogb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb25cbiAqIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbixcbiAqIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsXG4gKiBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLFxuICogYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbiAqIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4gKiBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4gKiBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqXG4gKiBUaGlzIGxpY2Vuc2UgYXBwbGllcyB0byBhbGwgcGFydHMgb2YgY2F0YmVycnkgdGhhdCBhcmUgbm90IGV4dGVybmFsbHlcbiAqIG1haW50YWluZWQgbGlicmFyaWVzLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBTdGF0ZVByb3ZpZGVyO1xuXG52YXIgcm91dGVIZWxwZXIgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvcm91dGVIZWxwZXInKSxcblx0Y2F0YmVycnlVcmkgPSByZXF1aXJlKCdjYXRiZXJyeS11cmknKSxcblx0VVJJID0gY2F0YmVycnlVcmkuVVJJO1xuXG4vKipcbiAqIENyZWF0ZSBuZXcgaW5zdGFuY2Ugb2YgdGhlIHN0YXRlIHByb3ZpZGVyLlxuICogQHBhcmFtIHtTZXJ2aWNlTG9jYXRvcn0gJHNlcnZpY2VMb2NhdG9yIFNlcnZpY2UgbG9jYXRvclxuICogdG8gcmVzb2x2ZSBVUkkgbWFwcGVycy5cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBTdGF0ZVByb3ZpZGVyKCRzZXJ2aWNlTG9jYXRvcikge1xuXHR0aGlzLl91cmlNYXBwZXJzID0gZ2V0VXJpTWFwcGVycygkc2VydmljZUxvY2F0b3IpO1xufVxuXG4vKipcbiAqIEN1cnJlbnQgbGlzdCBvZiBVUkkgbWFwcGVycy5cbiAqIEB0eXBlIHtBcnJheX1cbiAqIEBwcml2YXRlXG4gKi9cblN0YXRlUHJvdmlkZXIucHJvdG90eXBlLl91cmlNYXBwZXJzID0gbnVsbDtcblxuLyoqXG4gKiBHZXRzIHN0YXRlIGJ5IHNwZWNpZmllZCBsb2NhdGlvbiBVUkkuXG4gKiBAcGFyYW0ge1VSSX0gbG9jYXRpb24gVVJJIGxvY2F0aW9uLlxuICogQHJldHVybnMge09iamVjdH0gU3RhdGUgb2JqZWN0LlxuICovXG5TdGF0ZVByb3ZpZGVyLnByb3RvdHlwZS5nZXRTdGF0ZUJ5VXJpID0gZnVuY3Rpb24gKGxvY2F0aW9uKSB7XG5cdGlmICh0aGlzLl91cmlNYXBwZXJzLmxlbmd0aCA9PT0gMCkge1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0bG9jYXRpb24gPSBsb2NhdGlvbi5jbG9uZSgpO1xuXG5cdGxvY2F0aW9uLnBhdGggPSByb3V0ZUhlbHBlci5yZW1vdmVFbmRTbGFzaChsb2NhdGlvbi5wYXRoKTtcblx0dmFyIHN0YXRlID0gZ2V0U3RhdGUodGhpcy5fdXJpTWFwcGVycywgbG9jYXRpb24pO1xuXG5cdGlmICghc3RhdGUpIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdC8vIG1ha2Ugc3RhdGUgb2JqZWN0IGltbXV0YWJsZVxuXHRPYmplY3Qua2V5cyhzdGF0ZSlcblx0XHQuZm9yRWFjaChmdW5jdGlvbiAoc3RvcmVOYW1lKSB7XG5cdFx0XHRPYmplY3QuZnJlZXplKHN0YXRlW3N0b3JlTmFtZV0pO1xuXHRcdH0pO1xuXHRPYmplY3QuZnJlZXplKHN0YXRlKTtcblxuXHRyZXR1cm4gc3RhdGU7XG59O1xuXG4vKipcbiAqIEdldHMgbGlzdCBvZiBVUkkgbWFwcGVycy5cbiAqIEBwYXJhbSB7U2VydmljZUxvY2F0b3J9IHNlcnZpY2VMb2NhdG9yIFNlcnZpY2UgbG9jYXRvciB0byBnZXQgcm91dGVcbiAqIGRlZmluaXRpb25zLlxuICogQHJldHVybnMge0FycmF5fSBMaXN0IG9mIFVSSSBtYXBwZXJzLlxuICovXG5mdW5jdGlvbiBnZXRVcmlNYXBwZXJzKHNlcnZpY2VMb2NhdG9yKSB7XG5cdHZhciB1cmlNYXBwZXJzID0gW107XG5cblx0c2VydmljZUxvY2F0b3IucmVzb2x2ZUFsbCgncm91dGVEZWZpbml0aW9uJylcblx0XHQuZm9yRWFjaChmdW5jdGlvbiAocm91dGUpIHtcblx0XHRcdC8vIGp1c3QgY29sb24tcGFyYW1ldHJpemVkIHN0cmluZ1xuXHRcdFx0aWYgKHR5cGVvZihyb3V0ZSkgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdHZhciByb3V0ZVVyaSA9IG5ldyBVUkkocm91dGUpO1xuXHRcdFx0XHRyb3V0ZVVyaS5wYXRoID0gcm91dGVIZWxwZXIucmVtb3ZlRW5kU2xhc2gocm91dGVVcmkucGF0aCk7XG5cdFx0XHRcdHVyaU1hcHBlcnMucHVzaChyb3V0ZUhlbHBlci5jb21waWxlUm91dGUocm91dGVVcmkpKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBleHRlbmRlZCBjb2xvbi1wYXJhbWV0cml6ZWQgbWFwcGVyXG5cdFx0XHRpZiAodHlwZW9mKHJvdXRlKSA9PT0gJ29iamVjdCcgJiZcblx0XHRcdFx0KHR5cGVvZihyb3V0ZS5leHByZXNzaW9uKSA9PT0gJ3N0cmluZycpICYmXG5cdFx0XHRcdChyb3V0ZS5tYXAgaW5zdGFuY2VvZiBGdW5jdGlvbikpIHtcblx0XHRcdFx0dmFyIG1hcHBlclVyaSA9IG5ldyBVUkkocm91dGUuZXhwcmVzc2lvbik7XG5cdFx0XHRcdG1hcHBlclVyaS5wYXRoID0gcm91dGVIZWxwZXIucmVtb3ZlRW5kU2xhc2gobWFwcGVyVXJpLnBhdGgpO1xuXHRcdFx0XHR2YXIgbWFwcGVyID0gcm91dGVIZWxwZXIuY29tcGlsZVJvdXRlKG1hcHBlclVyaSk7XG5cdFx0XHRcdHVyaU1hcHBlcnMucHVzaCh7XG5cdFx0XHRcdFx0ZXhwcmVzc2lvbjogbWFwcGVyLmV4cHJlc3Npb24sXG5cdFx0XHRcdFx0bWFwOiBmdW5jdGlvbiAodXJpKSB7XG5cdFx0XHRcdFx0XHR2YXIgc3RhdGUgPSBtYXBwZXIubWFwKHVyaSk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gcm91dGUubWFwKHN0YXRlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIHJlZ3VsYXIgZXhwcmVzc2lvbiBtYXBwZXJcblx0XHRcdGlmICh0eXBlb2Yocm91dGUpID09PSAnb2JqZWN0JyAmJlxuXHRcdFx0XHQocm91dGUuZXhwcmVzc2lvbiBpbnN0YW5jZW9mIFJlZ0V4cCkgJiZcblx0XHRcdFx0KHJvdXRlLm1hcCBpbnN0YW5jZW9mIEZ1bmN0aW9uKSkge1xuXHRcdFx0XHR1cmlNYXBwZXJzLnB1c2gocm91dGUpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRyZXR1cm4gdXJpTWFwcGVycztcbn1cblxuLyoqXG4gKiBHZXRzIHN0YXRlLlxuICogQHBhcmFtIHtBcnJheX0gdXJpTWFwcGVycy5cbiAqIEBwYXJhbSB7VVJJfSBsb2NhdGlvbi5cbiAqIEByZXR1cm5zIHtPYmplY3R8bnVsbH1cbiAqL1xuZnVuY3Rpb24gZ2V0U3RhdGUgKHVyaU1hcHBlcnMsIGxvY2F0aW9uKSB7XG5cdHZhciBzdGF0ZSA9IG51bGw7XG5cblx0dXJpTWFwcGVycy5zb21lKGZ1bmN0aW9uIChtYXBwZXIpIHtcblx0XHRpZiAobWFwcGVyLmV4cHJlc3Npb24udGVzdChsb2NhdGlvbi5wYXRoKSkge1xuXHRcdFx0c3RhdGUgPSBtYXBwZXIubWFwKGxvY2F0aW9uKSB8fCB7fTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0pO1xuXG5cdHJldHVybiBzdGF0ZTtcbn0iLCIvKmdsb2JhbCBkZWZpbmU6ZmFsc2UgcmVxdWlyZTpmYWxzZSAqL1xubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24oKXtcblx0Ly8gSW1wb3J0IEV2ZW50c1xuXHR2YXIgZXZlbnRzID0gcmVxdWlyZSgnZXZlbnRzJylcblxuXHQvLyBFeHBvcnQgRG9tYWluXG5cdHZhciBkb21haW4gPSB7fVxuXHRkb21haW4uY3JlYXRlRG9tYWluID0gZG9tYWluLmNyZWF0ZSA9IGZ1bmN0aW9uKCl7XG5cdFx0dmFyIGQgPSBuZXcgZXZlbnRzLkV2ZW50RW1pdHRlcigpXG5cblx0XHRmdW5jdGlvbiBlbWl0RXJyb3IoZSkge1xuXHRcdFx0ZC5lbWl0KCdlcnJvcicsIGUpXG5cdFx0fVxuXG5cdFx0ZC5hZGQgPSBmdW5jdGlvbihlbWl0dGVyKXtcblx0XHRcdGVtaXR0ZXIub24oJ2Vycm9yJywgZW1pdEVycm9yKVxuXHRcdH1cblx0XHRkLnJlbW92ZSA9IGZ1bmN0aW9uKGVtaXR0ZXIpe1xuXHRcdFx0ZW1pdHRlci5yZW1vdmVMaXN0ZW5lcignZXJyb3InLCBlbWl0RXJyb3IpXG5cdFx0fVxuXHRcdGQuYmluZCA9IGZ1bmN0aW9uKGZuKXtcblx0XHRcdHJldHVybiBmdW5jdGlvbigpe1xuXHRcdFx0XHR2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cylcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRmbi5hcHBseShudWxsLCBhcmdzKVxuXHRcdFx0XHR9XG5cdFx0XHRcdGNhdGNoIChlcnIpe1xuXHRcdFx0XHRcdGVtaXRFcnJvcihlcnIpXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0ZC5pbnRlcmNlcHQgPSBmdW5jdGlvbihmbil7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24oZXJyKXtcblx0XHRcdFx0aWYgKCBlcnIgKSB7XG5cdFx0XHRcdFx0ZW1pdEVycm9yKGVycilcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHR2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSlcblx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0Zm4uYXBwbHkobnVsbCwgYXJncylcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Y2F0Y2ggKGVycil7XG5cdFx0XHRcdFx0XHRlbWl0RXJyb3IoZXJyKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRkLnJ1biA9IGZ1bmN0aW9uKGZuKXtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGZuKClcblx0XHRcdH1cblx0XHRcdGNhdGNoIChlcnIpIHtcblx0XHRcdFx0ZW1pdEVycm9yKGVycilcblx0XHRcdH1cblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fTtcblx0XHRkLmRpc3Bvc2UgPSBmdW5jdGlvbigpe1xuXHRcdFx0dGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoKVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9O1xuXHRcdGQuZW50ZXIgPSBkLmV4aXQgPSBmdW5jdGlvbigpe1xuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9XG5cdFx0cmV0dXJuIGRcblx0fTtcblx0cmV0dXJuIGRvbWFpblxufSkuY2FsbCh0aGlzKSIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gIHRoaXMuX2V2ZW50cyA9IHRoaXMuX2V2ZW50cyB8fCB7fTtcbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gdGhpcy5fbWF4TGlzdGVuZXJzIHx8IHVuZGVmaW5lZDtcbn1cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xuXG4vLyBCYWNrd2FyZHMtY29tcGF0IHdpdGggbm9kZSAwLjEwLnhcbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX21heExpc3RlbmVycyA9IHVuZGVmaW5lZDtcblxuLy8gQnkgZGVmYXVsdCBFdmVudEVtaXR0ZXJzIHdpbGwgcHJpbnQgYSB3YXJuaW5nIGlmIG1vcmUgdGhhbiAxMCBsaXN0ZW5lcnMgYXJlXG4vLyBhZGRlZCB0byBpdC4gVGhpcyBpcyBhIHVzZWZ1bCBkZWZhdWx0IHdoaWNoIGhlbHBzIGZpbmRpbmcgbWVtb3J5IGxlYWtzLlxuRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnMgPSAxMDtcblxuLy8gT2J2aW91c2x5IG5vdCBhbGwgRW1pdHRlcnMgc2hvdWxkIGJlIGxpbWl0ZWQgdG8gMTAuIFRoaXMgZnVuY3Rpb24gYWxsb3dzXG4vLyB0aGF0IHRvIGJlIGluY3JlYXNlZC4gU2V0IHRvIHplcm8gZm9yIHVubGltaXRlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuc2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24obikge1xuICBpZiAoIWlzTnVtYmVyKG4pIHx8IG4gPCAwIHx8IGlzTmFOKG4pKVxuICAgIHRocm93IFR5cGVFcnJvcignbiBtdXN0IGJlIGEgcG9zaXRpdmUgbnVtYmVyJyk7XG4gIHRoaXMuX21heExpc3RlbmVycyA9IG47XG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIgZXIsIGhhbmRsZXIsIGxlbiwgYXJncywgaSwgbGlzdGVuZXJzO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuXG4gIC8vIElmIHRoZXJlIGlzIG5vICdlcnJvcicgZXZlbnQgbGlzdGVuZXIgdGhlbiB0aHJvdy5cbiAgaWYgKHR5cGUgPT09ICdlcnJvcicpIHtcbiAgICBpZiAoIXRoaXMuX2V2ZW50cy5lcnJvciB8fFxuICAgICAgICAoaXNPYmplY3QodGhpcy5fZXZlbnRzLmVycm9yKSAmJiAhdGhpcy5fZXZlbnRzLmVycm9yLmxlbmd0aCkpIHtcbiAgICAgIGVyID0gYXJndW1lbnRzWzFdO1xuICAgICAgaWYgKGVyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgdGhyb3cgZXI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gICAgICB9XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoJ1VuY2F1Z2h0LCB1bnNwZWNpZmllZCBcImVycm9yXCIgZXZlbnQuJyk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlciA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICBpZiAoaXNVbmRlZmluZWQoaGFuZGxlcikpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGlmIChpc0Z1bmN0aW9uKGhhbmRsZXIpKSB7XG4gICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAvLyBmYXN0IGNhc2VzXG4gICAgICBjYXNlIDE6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBhcmd1bWVudHNbMV0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAvLyBzbG93ZXJcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICAgIGFyZ3MgPSBuZXcgQXJyYXkobGVuIC0gMSk7XG4gICAgICAgIGZvciAoaSA9IDE7IGkgPCBsZW47IGkrKylcbiAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgaGFuZGxlci5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNPYmplY3QoaGFuZGxlcikpIHtcbiAgICBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIGFyZ3MgPSBuZXcgQXJyYXkobGVuIC0gMSk7XG4gICAgZm9yIChpID0gMTsgaSA8IGxlbjsgaSsrKVxuICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG5cbiAgICBsaXN0ZW5lcnMgPSBoYW5kbGVyLnNsaWNlKCk7XG4gICAgbGVuID0gbGlzdGVuZXJzLmxlbmd0aDtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspXG4gICAgICBsaXN0ZW5lcnNbaV0uYXBwbHkodGhpcywgYXJncyk7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgbTtcblxuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgdGhpcy5fZXZlbnRzID0ge307XG5cbiAgLy8gVG8gYXZvaWQgcmVjdXJzaW9uIGluIHRoZSBjYXNlIHRoYXQgdHlwZSA9PT0gXCJuZXdMaXN0ZW5lclwiISBCZWZvcmVcbiAgLy8gYWRkaW5nIGl0IHRvIHRoZSBsaXN0ZW5lcnMsIGZpcnN0IGVtaXQgXCJuZXdMaXN0ZW5lclwiLlxuICBpZiAodGhpcy5fZXZlbnRzLm5ld0xpc3RlbmVyKVxuICAgIHRoaXMuZW1pdCgnbmV3TGlzdGVuZXInLCB0eXBlLFxuICAgICAgICAgICAgICBpc0Z1bmN0aW9uKGxpc3RlbmVyLmxpc3RlbmVyKSA/XG4gICAgICAgICAgICAgIGxpc3RlbmVyLmxpc3RlbmVyIDogbGlzdGVuZXIpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgIC8vIE9wdGltaXplIHRoZSBjYXNlIG9mIG9uZSBsaXN0ZW5lci4gRG9uJ3QgbmVlZCB0aGUgZXh0cmEgYXJyYXkgb2JqZWN0LlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IGxpc3RlbmVyO1xuICBlbHNlIGlmIChpc09iamVjdCh0aGlzLl9ldmVudHNbdHlwZV0pKVxuICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgZ290IGFuIGFycmF5LCBqdXN0IGFwcGVuZC5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0ucHVzaChsaXN0ZW5lcik7XG4gIGVsc2VcbiAgICAvLyBBZGRpbmcgdGhlIHNlY29uZCBlbGVtZW50LCBuZWVkIHRvIGNoYW5nZSB0byBhcnJheS5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBbdGhpcy5fZXZlbnRzW3R5cGVdLCBsaXN0ZW5lcl07XG5cbiAgLy8gQ2hlY2sgZm9yIGxpc3RlbmVyIGxlYWtcbiAgaWYgKGlzT2JqZWN0KHRoaXMuX2V2ZW50c1t0eXBlXSkgJiYgIXRoaXMuX2V2ZW50c1t0eXBlXS53YXJuZWQpIHtcbiAgICB2YXIgbTtcbiAgICBpZiAoIWlzVW5kZWZpbmVkKHRoaXMuX21heExpc3RlbmVycykpIHtcbiAgICAgIG0gPSB0aGlzLl9tYXhMaXN0ZW5lcnM7XG4gICAgfSBlbHNlIHtcbiAgICAgIG0gPSBFdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycztcbiAgICB9XG5cbiAgICBpZiAobSAmJiBtID4gMCAmJiB0aGlzLl9ldmVudHNbdHlwZV0ubGVuZ3RoID4gbSkge1xuICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLndhcm5lZCA9IHRydWU7XG4gICAgICBjb25zb2xlLmVycm9yKCcobm9kZSkgd2FybmluZzogcG9zc2libGUgRXZlbnRFbWl0dGVyIG1lbW9yeSAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2xlYWsgZGV0ZWN0ZWQuICVkIGxpc3RlbmVycyBhZGRlZC4gJyArXG4gICAgICAgICAgICAgICAgICAgICdVc2UgZW1pdHRlci5zZXRNYXhMaXN0ZW5lcnMoKSB0byBpbmNyZWFzZSBsaW1pdC4nLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ldmVudHNbdHlwZV0ubGVuZ3RoKTtcbiAgICAgIGlmICh0eXBlb2YgY29uc29sZS50cmFjZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAvLyBub3Qgc3VwcG9ydGVkIGluIElFIDEwXG4gICAgICAgIGNvbnNvbGUudHJhY2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgdmFyIGZpcmVkID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gZygpIHtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGcpO1xuXG4gICAgaWYgKCFmaXJlZCkge1xuICAgICAgZmlyZWQgPSB0cnVlO1xuICAgICAgbGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG4gIH1cblxuICBnLmxpc3RlbmVyID0gbGlzdGVuZXI7XG4gIHRoaXMub24odHlwZSwgZyk7XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyBlbWl0cyBhICdyZW1vdmVMaXN0ZW5lcicgZXZlbnQgaWZmIHRoZSBsaXN0ZW5lciB3YXMgcmVtb3ZlZFxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBsaXN0LCBwb3NpdGlvbiwgbGVuZ3RoLCBpO1xuXG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhdGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIGxpc3QgPSB0aGlzLl9ldmVudHNbdHlwZV07XG4gIGxlbmd0aCA9IGxpc3QubGVuZ3RoO1xuICBwb3NpdGlvbiA9IC0xO1xuXG4gIGlmIChsaXN0ID09PSBsaXN0ZW5lciB8fFxuICAgICAgKGlzRnVuY3Rpb24obGlzdC5saXN0ZW5lcikgJiYgbGlzdC5saXN0ZW5lciA9PT0gbGlzdGVuZXIpKSB7XG4gICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICBpZiAodGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3RlbmVyKTtcblxuICB9IGVsc2UgaWYgKGlzT2JqZWN0KGxpc3QpKSB7XG4gICAgZm9yIChpID0gbGVuZ3RoOyBpLS0gPiAwOykge1xuICAgICAgaWYgKGxpc3RbaV0gPT09IGxpc3RlbmVyIHx8XG4gICAgICAgICAgKGxpc3RbaV0ubGlzdGVuZXIgJiYgbGlzdFtpXS5saXN0ZW5lciA9PT0gbGlzdGVuZXIpKSB7XG4gICAgICAgIHBvc2l0aW9uID0gaTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHBvc2l0aW9uIDwgMClcbiAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgaWYgKGxpc3QubGVuZ3RoID09PSAxKSB7XG4gICAgICBsaXN0Lmxlbmd0aCA9IDA7XG4gICAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIH0gZWxzZSB7XG4gICAgICBsaXN0LnNwbGljZShwb3NpdGlvbiwgMSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0ZW5lcik7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIga2V5LCBsaXN0ZW5lcnM7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgLy8gbm90IGxpc3RlbmluZyBmb3IgcmVtb3ZlTGlzdGVuZXIsIG5vIG5lZWQgdG8gZW1pdFxuICBpZiAoIXRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcikge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKVxuICAgICAgdGhpcy5fZXZlbnRzID0ge307XG4gICAgZWxzZSBpZiAodGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIGVtaXQgcmVtb3ZlTGlzdGVuZXIgZm9yIGFsbCBsaXN0ZW5lcnMgb24gYWxsIGV2ZW50c1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgIGZvciAoa2V5IGluIHRoaXMuX2V2ZW50cykge1xuICAgICAgaWYgKGtleSA9PT0gJ3JlbW92ZUxpc3RlbmVyJykgY29udGludWU7XG4gICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycyhrZXkpO1xuICAgIH1cbiAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygncmVtb3ZlTGlzdGVuZXInKTtcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICBpZiAoaXNGdW5jdGlvbihsaXN0ZW5lcnMpKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnMpO1xuICB9IGVsc2Uge1xuICAgIC8vIExJRk8gb3JkZXJcbiAgICB3aGlsZSAobGlzdGVuZXJzLmxlbmd0aClcbiAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzW2xpc3RlbmVycy5sZW5ndGggLSAxXSk7XG4gIH1cbiAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIgcmV0O1xuICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhdGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgIHJldCA9IFtdO1xuICBlbHNlIGlmIChpc0Z1bmN0aW9uKHRoaXMuX2V2ZW50c1t0eXBlXSkpXG4gICAgcmV0ID0gW3RoaXMuX2V2ZW50c1t0eXBlXV07XG4gIGVsc2VcbiAgICByZXQgPSB0aGlzLl9ldmVudHNbdHlwZV0uc2xpY2UoKTtcbiAgcmV0dXJuIHJldDtcbn07XG5cbkV2ZW50RW1pdHRlci5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24oZW1pdHRlciwgdHlwZSkge1xuICB2YXIgcmV0O1xuICBpZiAoIWVtaXR0ZXIuX2V2ZW50cyB8fCAhZW1pdHRlci5fZXZlbnRzW3R5cGVdKVxuICAgIHJldCA9IDA7XG4gIGVsc2UgaWYgKGlzRnVuY3Rpb24oZW1pdHRlci5fZXZlbnRzW3R5cGVdKSlcbiAgICByZXQgPSAxO1xuICBlbHNlXG4gICAgcmV0ID0gZW1pdHRlci5fZXZlbnRzW3R5cGVdLmxlbmd0aDtcbiAgcmV0dXJuIHJldDtcbn07XG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24oYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnZnVuY3Rpb24nO1xufVxuXG5mdW5jdGlvbiBpc051bWJlcihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdudW1iZXInO1xufVxuXG5mdW5jdGlvbiBpc09iamVjdChhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdvYmplY3QnICYmIGFyZyAhPT0gbnVsbDtcbn1cblxuZnVuY3Rpb24gaXNVbmRlZmluZWQoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IHZvaWQgMDtcbn1cbiIsImlmICh0eXBlb2YgT2JqZWN0LmNyZWF0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAvLyBpbXBsZW1lbnRhdGlvbiBmcm9tIHN0YW5kYXJkIG5vZGUuanMgJ3V0aWwnIG1vZHVsZVxuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGluaGVyaXRzKGN0b3IsIHN1cGVyQ3Rvcikge1xuICAgIGN0b3Iuc3VwZXJfID0gc3VwZXJDdG9yXG4gICAgY3Rvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ3Rvci5wcm90b3R5cGUsIHtcbiAgICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICAgIHZhbHVlOiBjdG9yLFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgfVxuICAgIH0pO1xuICB9O1xufSBlbHNlIHtcbiAgLy8gb2xkIHNjaG9vbCBzaGltIGZvciBvbGQgYnJvd3NlcnNcbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbmhlcml0cyhjdG9yLCBzdXBlckN0b3IpIHtcbiAgICBjdG9yLnN1cGVyXyA9IHN1cGVyQ3RvclxuICAgIHZhciBUZW1wQ3RvciA9IGZ1bmN0aW9uICgpIHt9XG4gICAgVGVtcEN0b3IucHJvdG90eXBlID0gc3VwZXJDdG9yLnByb3RvdHlwZVxuICAgIGN0b3IucHJvdG90eXBlID0gbmV3IFRlbXBDdG9yKClcbiAgICBjdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGN0b3JcbiAgfVxufVxuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG5cbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHNldFRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKCFkcmFpbmluZykge1xuICAgICAgICBzZXRUaW1lb3V0KGRyYWluUXVldWUsIDApO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxuLy8gVE9ETyhzaHR5bG1hbilcbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNCdWZmZXIoYXJnKSB7XG4gIHJldHVybiBhcmcgJiYgdHlwZW9mIGFyZyA9PT0gJ29iamVjdCdcbiAgICAmJiB0eXBlb2YgYXJnLmNvcHkgPT09ICdmdW5jdGlvbidcbiAgICAmJiB0eXBlb2YgYXJnLmZpbGwgPT09ICdmdW5jdGlvbidcbiAgICAmJiB0eXBlb2YgYXJnLnJlYWRVSW50OCA9PT0gJ2Z1bmN0aW9uJztcbn0iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxudmFyIGZvcm1hdFJlZ0V4cCA9IC8lW3NkaiVdL2c7XG5leHBvcnRzLmZvcm1hdCA9IGZ1bmN0aW9uKGYpIHtcbiAgaWYgKCFpc1N0cmluZyhmKSkge1xuICAgIHZhciBvYmplY3RzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIG9iamVjdHMucHVzaChpbnNwZWN0KGFyZ3VtZW50c1tpXSkpO1xuICAgIH1cbiAgICByZXR1cm4gb2JqZWN0cy5qb2luKCcgJyk7XG4gIH1cblxuICB2YXIgaSA9IDE7XG4gIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICB2YXIgbGVuID0gYXJncy5sZW5ndGg7XG4gIHZhciBzdHIgPSBTdHJpbmcoZikucmVwbGFjZShmb3JtYXRSZWdFeHAsIGZ1bmN0aW9uKHgpIHtcbiAgICBpZiAoeCA9PT0gJyUlJykgcmV0dXJuICclJztcbiAgICBpZiAoaSA+PSBsZW4pIHJldHVybiB4O1xuICAgIHN3aXRjaCAoeCkge1xuICAgICAgY2FzZSAnJXMnOiByZXR1cm4gU3RyaW5nKGFyZ3NbaSsrXSk7XG4gICAgICBjYXNlICclZCc6IHJldHVybiBOdW1iZXIoYXJnc1tpKytdKTtcbiAgICAgIGNhc2UgJyVqJzpcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoYXJnc1tpKytdKTtcbiAgICAgICAgfSBjYXRjaCAoXykge1xuICAgICAgICAgIHJldHVybiAnW0NpcmN1bGFyXSc7XG4gICAgICAgIH1cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB4O1xuICAgIH1cbiAgfSk7XG4gIGZvciAodmFyIHggPSBhcmdzW2ldOyBpIDwgbGVuOyB4ID0gYXJnc1srK2ldKSB7XG4gICAgaWYgKGlzTnVsbCh4KSB8fCAhaXNPYmplY3QoeCkpIHtcbiAgICAgIHN0ciArPSAnICcgKyB4O1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHIgKz0gJyAnICsgaW5zcGVjdCh4KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN0cjtcbn07XG5cblxuLy8gTWFyayB0aGF0IGEgbWV0aG9kIHNob3VsZCBub3QgYmUgdXNlZC5cbi8vIFJldHVybnMgYSBtb2RpZmllZCBmdW5jdGlvbiB3aGljaCB3YXJucyBvbmNlIGJ5IGRlZmF1bHQuXG4vLyBJZiAtLW5vLWRlcHJlY2F0aW9uIGlzIHNldCwgdGhlbiBpdCBpcyBhIG5vLW9wLlxuZXhwb3J0cy5kZXByZWNhdGUgPSBmdW5jdGlvbihmbiwgbXNnKSB7XG4gIC8vIEFsbG93IGZvciBkZXByZWNhdGluZyB0aGluZ3MgaW4gdGhlIHByb2Nlc3Mgb2Ygc3RhcnRpbmcgdXAuXG4gIGlmIChpc1VuZGVmaW5lZChnbG9iYWwucHJvY2VzcykpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZXhwb3J0cy5kZXByZWNhdGUoZm4sIG1zZykuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9XG5cbiAgaWYgKHByb2Nlc3Mubm9EZXByZWNhdGlvbiA9PT0gdHJ1ZSkge1xuICAgIHJldHVybiBmbjtcbiAgfVxuXG4gIHZhciB3YXJuZWQgPSBmYWxzZTtcbiAgZnVuY3Rpb24gZGVwcmVjYXRlZCgpIHtcbiAgICBpZiAoIXdhcm5lZCkge1xuICAgICAgaWYgKHByb2Nlc3MudGhyb3dEZXByZWNhdGlvbikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgICAgIH0gZWxzZSBpZiAocHJvY2Vzcy50cmFjZURlcHJlY2F0aW9uKSB7XG4gICAgICAgIGNvbnNvbGUudHJhY2UobXNnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IobXNnKTtcbiAgICAgIH1cbiAgICAgIHdhcm5lZCA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgcmV0dXJuIGRlcHJlY2F0ZWQ7XG59O1xuXG5cbnZhciBkZWJ1Z3MgPSB7fTtcbnZhciBkZWJ1Z0Vudmlyb247XG5leHBvcnRzLmRlYnVnbG9nID0gZnVuY3Rpb24oc2V0KSB7XG4gIGlmIChpc1VuZGVmaW5lZChkZWJ1Z0Vudmlyb24pKVxuICAgIGRlYnVnRW52aXJvbiA9IHByb2Nlc3MuZW52Lk5PREVfREVCVUcgfHwgJyc7XG4gIHNldCA9IHNldC50b1VwcGVyQ2FzZSgpO1xuICBpZiAoIWRlYnVnc1tzZXRdKSB7XG4gICAgaWYgKG5ldyBSZWdFeHAoJ1xcXFxiJyArIHNldCArICdcXFxcYicsICdpJykudGVzdChkZWJ1Z0Vudmlyb24pKSB7XG4gICAgICB2YXIgcGlkID0gcHJvY2Vzcy5waWQ7XG4gICAgICBkZWJ1Z3Nbc2V0XSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbXNnID0gZXhwb3J0cy5mb3JtYXQuYXBwbHkoZXhwb3J0cywgYXJndW1lbnRzKTtcbiAgICAgICAgY29uc29sZS5lcnJvcignJXMgJWQ6ICVzJywgc2V0LCBwaWQsIG1zZyk7XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWJ1Z3Nbc2V0XSA9IGZ1bmN0aW9uKCkge307XG4gICAgfVxuICB9XG4gIHJldHVybiBkZWJ1Z3Nbc2V0XTtcbn07XG5cblxuLyoqXG4gKiBFY2hvcyB0aGUgdmFsdWUgb2YgYSB2YWx1ZS4gVHJ5cyB0byBwcmludCB0aGUgdmFsdWUgb3V0XG4gKiBpbiB0aGUgYmVzdCB3YXkgcG9zc2libGUgZ2l2ZW4gdGhlIGRpZmZlcmVudCB0eXBlcy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3QgdG8gcHJpbnQgb3V0LlxuICogQHBhcmFtIHtPYmplY3R9IG9wdHMgT3B0aW9uYWwgb3B0aW9ucyBvYmplY3QgdGhhdCBhbHRlcnMgdGhlIG91dHB1dC5cbiAqL1xuLyogbGVnYWN5OiBvYmosIHNob3dIaWRkZW4sIGRlcHRoLCBjb2xvcnMqL1xuZnVuY3Rpb24gaW5zcGVjdChvYmosIG9wdHMpIHtcbiAgLy8gZGVmYXVsdCBvcHRpb25zXG4gIHZhciBjdHggPSB7XG4gICAgc2VlbjogW10sXG4gICAgc3R5bGl6ZTogc3R5bGl6ZU5vQ29sb3JcbiAgfTtcbiAgLy8gbGVnYWN5Li4uXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID49IDMpIGN0eC5kZXB0aCA9IGFyZ3VtZW50c1syXTtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPj0gNCkgY3R4LmNvbG9ycyA9IGFyZ3VtZW50c1szXTtcbiAgaWYgKGlzQm9vbGVhbihvcHRzKSkge1xuICAgIC8vIGxlZ2FjeS4uLlxuICAgIGN0eC5zaG93SGlkZGVuID0gb3B0cztcbiAgfSBlbHNlIGlmIChvcHRzKSB7XG4gICAgLy8gZ290IGFuIFwib3B0aW9uc1wiIG9iamVjdFxuICAgIGV4cG9ydHMuX2V4dGVuZChjdHgsIG9wdHMpO1xuICB9XG4gIC8vIHNldCBkZWZhdWx0IG9wdGlvbnNcbiAgaWYgKGlzVW5kZWZpbmVkKGN0eC5zaG93SGlkZGVuKSkgY3R4LnNob3dIaWRkZW4gPSBmYWxzZTtcbiAgaWYgKGlzVW5kZWZpbmVkKGN0eC5kZXB0aCkpIGN0eC5kZXB0aCA9IDI7XG4gIGlmIChpc1VuZGVmaW5lZChjdHguY29sb3JzKSkgY3R4LmNvbG9ycyA9IGZhbHNlO1xuICBpZiAoaXNVbmRlZmluZWQoY3R4LmN1c3RvbUluc3BlY3QpKSBjdHguY3VzdG9tSW5zcGVjdCA9IHRydWU7XG4gIGlmIChjdHguY29sb3JzKSBjdHguc3R5bGl6ZSA9IHN0eWxpemVXaXRoQ29sb3I7XG4gIHJldHVybiBmb3JtYXRWYWx1ZShjdHgsIG9iaiwgY3R4LmRlcHRoKTtcbn1cbmV4cG9ydHMuaW5zcGVjdCA9IGluc3BlY3Q7XG5cblxuLy8gaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9BTlNJX2VzY2FwZV9jb2RlI2dyYXBoaWNzXG5pbnNwZWN0LmNvbG9ycyA9IHtcbiAgJ2JvbGQnIDogWzEsIDIyXSxcbiAgJ2l0YWxpYycgOiBbMywgMjNdLFxuICAndW5kZXJsaW5lJyA6IFs0LCAyNF0sXG4gICdpbnZlcnNlJyA6IFs3LCAyN10sXG4gICd3aGl0ZScgOiBbMzcsIDM5XSxcbiAgJ2dyZXknIDogWzkwLCAzOV0sXG4gICdibGFjaycgOiBbMzAsIDM5XSxcbiAgJ2JsdWUnIDogWzM0LCAzOV0sXG4gICdjeWFuJyA6IFszNiwgMzldLFxuICAnZ3JlZW4nIDogWzMyLCAzOV0sXG4gICdtYWdlbnRhJyA6IFszNSwgMzldLFxuICAncmVkJyA6IFszMSwgMzldLFxuICAneWVsbG93JyA6IFszMywgMzldXG59O1xuXG4vLyBEb24ndCB1c2UgJ2JsdWUnIG5vdCB2aXNpYmxlIG9uIGNtZC5leGVcbmluc3BlY3Quc3R5bGVzID0ge1xuICAnc3BlY2lhbCc6ICdjeWFuJyxcbiAgJ251bWJlcic6ICd5ZWxsb3cnLFxuICAnYm9vbGVhbic6ICd5ZWxsb3cnLFxuICAndW5kZWZpbmVkJzogJ2dyZXknLFxuICAnbnVsbCc6ICdib2xkJyxcbiAgJ3N0cmluZyc6ICdncmVlbicsXG4gICdkYXRlJzogJ21hZ2VudGEnLFxuICAvLyBcIm5hbWVcIjogaW50ZW50aW9uYWxseSBub3Qgc3R5bGluZ1xuICAncmVnZXhwJzogJ3JlZCdcbn07XG5cblxuZnVuY3Rpb24gc3R5bGl6ZVdpdGhDb2xvcihzdHIsIHN0eWxlVHlwZSkge1xuICB2YXIgc3R5bGUgPSBpbnNwZWN0LnN0eWxlc1tzdHlsZVR5cGVdO1xuXG4gIGlmIChzdHlsZSkge1xuICAgIHJldHVybiAnXFx1MDAxYlsnICsgaW5zcGVjdC5jb2xvcnNbc3R5bGVdWzBdICsgJ20nICsgc3RyICtcbiAgICAgICAgICAgJ1xcdTAwMWJbJyArIGluc3BlY3QuY29sb3JzW3N0eWxlXVsxXSArICdtJztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gc3RyO1xuICB9XG59XG5cblxuZnVuY3Rpb24gc3R5bGl6ZU5vQ29sb3Ioc3RyLCBzdHlsZVR5cGUpIHtcbiAgcmV0dXJuIHN0cjtcbn1cblxuXG5mdW5jdGlvbiBhcnJheVRvSGFzaChhcnJheSkge1xuICB2YXIgaGFzaCA9IHt9O1xuXG4gIGFycmF5LmZvckVhY2goZnVuY3Rpb24odmFsLCBpZHgpIHtcbiAgICBoYXNoW3ZhbF0gPSB0cnVlO1xuICB9KTtcblxuICByZXR1cm4gaGFzaDtcbn1cblxuXG5mdW5jdGlvbiBmb3JtYXRWYWx1ZShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMpIHtcbiAgLy8gUHJvdmlkZSBhIGhvb2sgZm9yIHVzZXItc3BlY2lmaWVkIGluc3BlY3QgZnVuY3Rpb25zLlxuICAvLyBDaGVjayB0aGF0IHZhbHVlIGlzIGFuIG9iamVjdCB3aXRoIGFuIGluc3BlY3QgZnVuY3Rpb24gb24gaXRcbiAgaWYgKGN0eC5jdXN0b21JbnNwZWN0ICYmXG4gICAgICB2YWx1ZSAmJlxuICAgICAgaXNGdW5jdGlvbih2YWx1ZS5pbnNwZWN0KSAmJlxuICAgICAgLy8gRmlsdGVyIG91dCB0aGUgdXRpbCBtb2R1bGUsIGl0J3MgaW5zcGVjdCBmdW5jdGlvbiBpcyBzcGVjaWFsXG4gICAgICB2YWx1ZS5pbnNwZWN0ICE9PSBleHBvcnRzLmluc3BlY3QgJiZcbiAgICAgIC8vIEFsc28gZmlsdGVyIG91dCBhbnkgcHJvdG90eXBlIG9iamVjdHMgdXNpbmcgdGhlIGNpcmN1bGFyIGNoZWNrLlxuICAgICAgISh2YWx1ZS5jb25zdHJ1Y3RvciAmJiB2YWx1ZS5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgPT09IHZhbHVlKSkge1xuICAgIHZhciByZXQgPSB2YWx1ZS5pbnNwZWN0KHJlY3Vyc2VUaW1lcywgY3R4KTtcbiAgICBpZiAoIWlzU3RyaW5nKHJldCkpIHtcbiAgICAgIHJldCA9IGZvcm1hdFZhbHVlKGN0eCwgcmV0LCByZWN1cnNlVGltZXMpO1xuICAgIH1cbiAgICByZXR1cm4gcmV0O1xuICB9XG5cbiAgLy8gUHJpbWl0aXZlIHR5cGVzIGNhbm5vdCBoYXZlIHByb3BlcnRpZXNcbiAgdmFyIHByaW1pdGl2ZSA9IGZvcm1hdFByaW1pdGl2ZShjdHgsIHZhbHVlKTtcbiAgaWYgKHByaW1pdGl2ZSkge1xuICAgIHJldHVybiBwcmltaXRpdmU7XG4gIH1cblxuICAvLyBMb29rIHVwIHRoZSBrZXlzIG9mIHRoZSBvYmplY3QuXG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXModmFsdWUpO1xuICB2YXIgdmlzaWJsZUtleXMgPSBhcnJheVRvSGFzaChrZXlzKTtcblxuICBpZiAoY3R4LnNob3dIaWRkZW4pIHtcbiAgICBrZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModmFsdWUpO1xuICB9XG5cbiAgLy8gSUUgZG9lc24ndCBtYWtlIGVycm9yIGZpZWxkcyBub24tZW51bWVyYWJsZVxuICAvLyBodHRwOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvaWUvZHd3NTJzYnQodj12cy45NCkuYXNweFxuICBpZiAoaXNFcnJvcih2YWx1ZSlcbiAgICAgICYmIChrZXlzLmluZGV4T2YoJ21lc3NhZ2UnKSA+PSAwIHx8IGtleXMuaW5kZXhPZignZGVzY3JpcHRpb24nKSA+PSAwKSkge1xuICAgIHJldHVybiBmb3JtYXRFcnJvcih2YWx1ZSk7XG4gIH1cblxuICAvLyBTb21lIHR5cGUgb2Ygb2JqZWN0IHdpdGhvdXQgcHJvcGVydGllcyBjYW4gYmUgc2hvcnRjdXR0ZWQuXG4gIGlmIChrZXlzLmxlbmd0aCA9PT0gMCkge1xuICAgIGlmIChpc0Z1bmN0aW9uKHZhbHVlKSkge1xuICAgICAgdmFyIG5hbWUgPSB2YWx1ZS5uYW1lID8gJzogJyArIHZhbHVlLm5hbWUgOiAnJztcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZSgnW0Z1bmN0aW9uJyArIG5hbWUgKyAnXScsICdzcGVjaWFsJyk7XG4gICAgfVxuICAgIGlmIChpc1JlZ0V4cCh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZShSZWdFeHAucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpLCAncmVnZXhwJyk7XG4gICAgfVxuICAgIGlmIChpc0RhdGUodmFsdWUpKSB7XG4gICAgICByZXR1cm4gY3R4LnN0eWxpemUoRGF0ZS5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSksICdkYXRlJyk7XG4gICAgfVxuICAgIGlmIChpc0Vycm9yKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGZvcm1hdEVycm9yKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICB2YXIgYmFzZSA9ICcnLCBhcnJheSA9IGZhbHNlLCBicmFjZXMgPSBbJ3snLCAnfSddO1xuXG4gIC8vIE1ha2UgQXJyYXkgc2F5IHRoYXQgdGhleSBhcmUgQXJyYXlcbiAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgYXJyYXkgPSB0cnVlO1xuICAgIGJyYWNlcyA9IFsnWycsICddJ107XG4gIH1cblxuICAvLyBNYWtlIGZ1bmN0aW9ucyBzYXkgdGhhdCB0aGV5IGFyZSBmdW5jdGlvbnNcbiAgaWYgKGlzRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgdmFyIG4gPSB2YWx1ZS5uYW1lID8gJzogJyArIHZhbHVlLm5hbWUgOiAnJztcbiAgICBiYXNlID0gJyBbRnVuY3Rpb24nICsgbiArICddJztcbiAgfVxuXG4gIC8vIE1ha2UgUmVnRXhwcyBzYXkgdGhhdCB0aGV5IGFyZSBSZWdFeHBzXG4gIGlmIChpc1JlZ0V4cCh2YWx1ZSkpIHtcbiAgICBiYXNlID0gJyAnICsgUmVnRXhwLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKTtcbiAgfVxuXG4gIC8vIE1ha2UgZGF0ZXMgd2l0aCBwcm9wZXJ0aWVzIGZpcnN0IHNheSB0aGUgZGF0ZVxuICBpZiAoaXNEYXRlKHZhbHVlKSkge1xuICAgIGJhc2UgPSAnICcgKyBEYXRlLnByb3RvdHlwZS50b1VUQ1N0cmluZy5jYWxsKHZhbHVlKTtcbiAgfVxuXG4gIC8vIE1ha2UgZXJyb3Igd2l0aCBtZXNzYWdlIGZpcnN0IHNheSB0aGUgZXJyb3JcbiAgaWYgKGlzRXJyb3IodmFsdWUpKSB7XG4gICAgYmFzZSA9ICcgJyArIGZvcm1hdEVycm9yKHZhbHVlKTtcbiAgfVxuXG4gIGlmIChrZXlzLmxlbmd0aCA9PT0gMCAmJiAoIWFycmF5IHx8IHZhbHVlLmxlbmd0aCA9PSAwKSkge1xuICAgIHJldHVybiBicmFjZXNbMF0gKyBiYXNlICsgYnJhY2VzWzFdO1xuICB9XG5cbiAgaWYgKHJlY3Vyc2VUaW1lcyA8IDApIHtcbiAgICBpZiAoaXNSZWdFeHAodmFsdWUpKSB7XG4gICAgICByZXR1cm4gY3R4LnN0eWxpemUoUmVnRXhwLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSwgJ3JlZ2V4cCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gY3R4LnN0eWxpemUoJ1tPYmplY3RdJywgJ3NwZWNpYWwnKTtcbiAgICB9XG4gIH1cblxuICBjdHguc2Vlbi5wdXNoKHZhbHVlKTtcblxuICB2YXIgb3V0cHV0O1xuICBpZiAoYXJyYXkpIHtcbiAgICBvdXRwdXQgPSBmb3JtYXRBcnJheShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLCBrZXlzKTtcbiAgfSBlbHNlIHtcbiAgICBvdXRwdXQgPSBrZXlzLm1hcChmdW5jdGlvbihrZXkpIHtcbiAgICAgIHJldHVybiBmb3JtYXRQcm9wZXJ0eShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLCBrZXksIGFycmF5KTtcbiAgICB9KTtcbiAgfVxuXG4gIGN0eC5zZWVuLnBvcCgpO1xuXG4gIHJldHVybiByZWR1Y2VUb1NpbmdsZVN0cmluZyhvdXRwdXQsIGJhc2UsIGJyYWNlcyk7XG59XG5cblxuZnVuY3Rpb24gZm9ybWF0UHJpbWl0aXZlKGN0eCwgdmFsdWUpIHtcbiAgaWYgKGlzVW5kZWZpbmVkKHZhbHVlKSlcbiAgICByZXR1cm4gY3R4LnN0eWxpemUoJ3VuZGVmaW5lZCcsICd1bmRlZmluZWQnKTtcbiAgaWYgKGlzU3RyaW5nKHZhbHVlKSkge1xuICAgIHZhciBzaW1wbGUgPSAnXFwnJyArIEpTT04uc3RyaW5naWZ5KHZhbHVlKS5yZXBsYWNlKC9eXCJ8XCIkL2csICcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoLycvZywgXCJcXFxcJ1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcXFxcIi9nLCAnXCInKSArICdcXCcnO1xuICAgIHJldHVybiBjdHguc3R5bGl6ZShzaW1wbGUsICdzdHJpbmcnKTtcbiAgfVxuICBpZiAoaXNOdW1iZXIodmFsdWUpKVxuICAgIHJldHVybiBjdHguc3R5bGl6ZSgnJyArIHZhbHVlLCAnbnVtYmVyJyk7XG4gIGlmIChpc0Jvb2xlYW4odmFsdWUpKVxuICAgIHJldHVybiBjdHguc3R5bGl6ZSgnJyArIHZhbHVlLCAnYm9vbGVhbicpO1xuICAvLyBGb3Igc29tZSByZWFzb24gdHlwZW9mIG51bGwgaXMgXCJvYmplY3RcIiwgc28gc3BlY2lhbCBjYXNlIGhlcmUuXG4gIGlmIChpc051bGwodmFsdWUpKVxuICAgIHJldHVybiBjdHguc3R5bGl6ZSgnbnVsbCcsICdudWxsJyk7XG59XG5cblxuZnVuY3Rpb24gZm9ybWF0RXJyb3IodmFsdWUpIHtcbiAgcmV0dXJuICdbJyArIEVycm9yLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSArICddJztcbn1cblxuXG5mdW5jdGlvbiBmb3JtYXRBcnJheShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLCBrZXlzKSB7XG4gIHZhciBvdXRwdXQgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSB2YWx1ZS5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkodmFsdWUsIFN0cmluZyhpKSkpIHtcbiAgICAgIG91dHB1dC5wdXNoKGZvcm1hdFByb3BlcnR5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsXG4gICAgICAgICAgU3RyaW5nKGkpLCB0cnVlKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG91dHB1dC5wdXNoKCcnKTtcbiAgICB9XG4gIH1cbiAga2V5cy5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuICAgIGlmICgha2V5Lm1hdGNoKC9eXFxkKyQvKSkge1xuICAgICAgb3V0cHV0LnB1c2goZm9ybWF0UHJvcGVydHkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cyxcbiAgICAgICAgICBrZXksIHRydWUpKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gb3V0cHV0O1xufVxuXG5cbmZ1bmN0aW9uIGZvcm1hdFByb3BlcnR5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsIGtleSwgYXJyYXkpIHtcbiAgdmFyIG5hbWUsIHN0ciwgZGVzYztcbiAgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodmFsdWUsIGtleSkgfHwgeyB2YWx1ZTogdmFsdWVba2V5XSB9O1xuICBpZiAoZGVzYy5nZXQpIHtcbiAgICBpZiAoZGVzYy5zZXQpIHtcbiAgICAgIHN0ciA9IGN0eC5zdHlsaXplKCdbR2V0dGVyL1NldHRlcl0nLCAnc3BlY2lhbCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHIgPSBjdHguc3R5bGl6ZSgnW0dldHRlcl0nLCAnc3BlY2lhbCcpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoZGVzYy5zZXQpIHtcbiAgICAgIHN0ciA9IGN0eC5zdHlsaXplKCdbU2V0dGVyXScsICdzcGVjaWFsJyk7XG4gICAgfVxuICB9XG4gIGlmICghaGFzT3duUHJvcGVydHkodmlzaWJsZUtleXMsIGtleSkpIHtcbiAgICBuYW1lID0gJ1snICsga2V5ICsgJ10nO1xuICB9XG4gIGlmICghc3RyKSB7XG4gICAgaWYgKGN0eC5zZWVuLmluZGV4T2YoZGVzYy52YWx1ZSkgPCAwKSB7XG4gICAgICBpZiAoaXNOdWxsKHJlY3Vyc2VUaW1lcykpIHtcbiAgICAgICAgc3RyID0gZm9ybWF0VmFsdWUoY3R4LCBkZXNjLnZhbHVlLCBudWxsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0ciA9IGZvcm1hdFZhbHVlKGN0eCwgZGVzYy52YWx1ZSwgcmVjdXJzZVRpbWVzIC0gMSk7XG4gICAgICB9XG4gICAgICBpZiAoc3RyLmluZGV4T2YoJ1xcbicpID4gLTEpIHtcbiAgICAgICAgaWYgKGFycmF5KSB7XG4gICAgICAgICAgc3RyID0gc3RyLnNwbGl0KCdcXG4nKS5tYXAoZnVuY3Rpb24obGluZSkge1xuICAgICAgICAgICAgcmV0dXJuICcgICcgKyBsaW5lO1xuICAgICAgICAgIH0pLmpvaW4oJ1xcbicpLnN1YnN0cigyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdHIgPSAnXFxuJyArIHN0ci5zcGxpdCgnXFxuJykubWFwKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICAgICAgICAgIHJldHVybiAnICAgJyArIGxpbmU7XG4gICAgICAgICAgfSkuam9pbignXFxuJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgc3RyID0gY3R4LnN0eWxpemUoJ1tDaXJjdWxhcl0nLCAnc3BlY2lhbCcpO1xuICAgIH1cbiAgfVxuICBpZiAoaXNVbmRlZmluZWQobmFtZSkpIHtcbiAgICBpZiAoYXJyYXkgJiYga2V5Lm1hdGNoKC9eXFxkKyQvKSkge1xuICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG4gICAgbmFtZSA9IEpTT04uc3RyaW5naWZ5KCcnICsga2V5KTtcbiAgICBpZiAobmFtZS5tYXRjaCgvXlwiKFthLXpBLVpfXVthLXpBLVpfMC05XSopXCIkLykpIHtcbiAgICAgIG5hbWUgPSBuYW1lLnN1YnN0cigxLCBuYW1lLmxlbmd0aCAtIDIpO1xuICAgICAgbmFtZSA9IGN0eC5zdHlsaXplKG5hbWUsICduYW1lJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5hbWUgPSBuYW1lLnJlcGxhY2UoLycvZywgXCJcXFxcJ1wiKVxuICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFxcXFwiL2csICdcIicpXG4gICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8oXlwifFwiJCkvZywgXCInXCIpO1xuICAgICAgbmFtZSA9IGN0eC5zdHlsaXplKG5hbWUsICdzdHJpbmcnKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmFtZSArICc6ICcgKyBzdHI7XG59XG5cblxuZnVuY3Rpb24gcmVkdWNlVG9TaW5nbGVTdHJpbmcob3V0cHV0LCBiYXNlLCBicmFjZXMpIHtcbiAgdmFyIG51bUxpbmVzRXN0ID0gMDtcbiAgdmFyIGxlbmd0aCA9IG91dHB1dC5yZWR1Y2UoZnVuY3Rpb24ocHJldiwgY3VyKSB7XG4gICAgbnVtTGluZXNFc3QrKztcbiAgICBpZiAoY3VyLmluZGV4T2YoJ1xcbicpID49IDApIG51bUxpbmVzRXN0Kys7XG4gICAgcmV0dXJuIHByZXYgKyBjdXIucmVwbGFjZSgvXFx1MDAxYlxcW1xcZFxcZD9tL2csICcnKS5sZW5ndGggKyAxO1xuICB9LCAwKTtcblxuICBpZiAobGVuZ3RoID4gNjApIHtcbiAgICByZXR1cm4gYnJhY2VzWzBdICtcbiAgICAgICAgICAgKGJhc2UgPT09ICcnID8gJycgOiBiYXNlICsgJ1xcbiAnKSArXG4gICAgICAgICAgICcgJyArXG4gICAgICAgICAgIG91dHB1dC5qb2luKCcsXFxuICAnKSArXG4gICAgICAgICAgICcgJyArXG4gICAgICAgICAgIGJyYWNlc1sxXTtcbiAgfVxuXG4gIHJldHVybiBicmFjZXNbMF0gKyBiYXNlICsgJyAnICsgb3V0cHV0LmpvaW4oJywgJykgKyAnICcgKyBicmFjZXNbMV07XG59XG5cblxuLy8gTk9URTogVGhlc2UgdHlwZSBjaGVja2luZyBmdW5jdGlvbnMgaW50ZW50aW9uYWxseSBkb24ndCB1c2UgYGluc3RhbmNlb2ZgXG4vLyBiZWNhdXNlIGl0IGlzIGZyYWdpbGUgYW5kIGNhbiBiZSBlYXNpbHkgZmFrZWQgd2l0aCBgT2JqZWN0LmNyZWF0ZSgpYC5cbmZ1bmN0aW9uIGlzQXJyYXkoYXIpIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkoYXIpO1xufVxuZXhwb3J0cy5pc0FycmF5ID0gaXNBcnJheTtcblxuZnVuY3Rpb24gaXNCb29sZWFuKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ2Jvb2xlYW4nO1xufVxuZXhwb3J0cy5pc0Jvb2xlYW4gPSBpc0Jvb2xlYW47XG5cbmZ1bmN0aW9uIGlzTnVsbChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gbnVsbDtcbn1cbmV4cG9ydHMuaXNOdWxsID0gaXNOdWxsO1xuXG5mdW5jdGlvbiBpc051bGxPclVuZGVmaW5lZChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PSBudWxsO1xufVxuZXhwb3J0cy5pc051bGxPclVuZGVmaW5lZCA9IGlzTnVsbE9yVW5kZWZpbmVkO1xuXG5mdW5jdGlvbiBpc051bWJlcihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdudW1iZXInO1xufVxuZXhwb3J0cy5pc051bWJlciA9IGlzTnVtYmVyO1xuXG5mdW5jdGlvbiBpc1N0cmluZyhhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdzdHJpbmcnO1xufVxuZXhwb3J0cy5pc1N0cmluZyA9IGlzU3RyaW5nO1xuXG5mdW5jdGlvbiBpc1N5bWJvbChhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdzeW1ib2wnO1xufVxuZXhwb3J0cy5pc1N5bWJvbCA9IGlzU3ltYm9sO1xuXG5mdW5jdGlvbiBpc1VuZGVmaW5lZChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gdm9pZCAwO1xufVxuZXhwb3J0cy5pc1VuZGVmaW5lZCA9IGlzVW5kZWZpbmVkO1xuXG5mdW5jdGlvbiBpc1JlZ0V4cChyZSkge1xuICByZXR1cm4gaXNPYmplY3QocmUpICYmIG9iamVjdFRvU3RyaW5nKHJlKSA9PT0gJ1tvYmplY3QgUmVnRXhwXSc7XG59XG5leHBvcnRzLmlzUmVnRXhwID0gaXNSZWdFeHA7XG5cbmZ1bmN0aW9uIGlzT2JqZWN0KGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ29iamVjdCcgJiYgYXJnICE9PSBudWxsO1xufVxuZXhwb3J0cy5pc09iamVjdCA9IGlzT2JqZWN0O1xuXG5mdW5jdGlvbiBpc0RhdGUoZCkge1xuICByZXR1cm4gaXNPYmplY3QoZCkgJiYgb2JqZWN0VG9TdHJpbmcoZCkgPT09ICdbb2JqZWN0IERhdGVdJztcbn1cbmV4cG9ydHMuaXNEYXRlID0gaXNEYXRlO1xuXG5mdW5jdGlvbiBpc0Vycm9yKGUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KGUpICYmXG4gICAgICAob2JqZWN0VG9TdHJpbmcoZSkgPT09ICdbb2JqZWN0IEVycm9yXScgfHwgZSBpbnN0YW5jZW9mIEVycm9yKTtcbn1cbmV4cG9ydHMuaXNFcnJvciA9IGlzRXJyb3I7XG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24oYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnZnVuY3Rpb24nO1xufVxuZXhwb3J0cy5pc0Z1bmN0aW9uID0gaXNGdW5jdGlvbjtcblxuZnVuY3Rpb24gaXNQcmltaXRpdmUoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IG51bGwgfHxcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICdib29sZWFuJyB8fFxuICAgICAgICAgdHlwZW9mIGFyZyA9PT0gJ251bWJlcicgfHxcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICdzdHJpbmcnIHx8XG4gICAgICAgICB0eXBlb2YgYXJnID09PSAnc3ltYm9sJyB8fCAgLy8gRVM2IHN5bWJvbFxuICAgICAgICAgdHlwZW9mIGFyZyA9PT0gJ3VuZGVmaW5lZCc7XG59XG5leHBvcnRzLmlzUHJpbWl0aXZlID0gaXNQcmltaXRpdmU7XG5cbmV4cG9ydHMuaXNCdWZmZXIgPSByZXF1aXJlKCcuL3N1cHBvcnQvaXNCdWZmZXInKTtcblxuZnVuY3Rpb24gb2JqZWN0VG9TdHJpbmcobykge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pO1xufVxuXG5cbmZ1bmN0aW9uIHBhZChuKSB7XG4gIHJldHVybiBuIDwgMTAgPyAnMCcgKyBuLnRvU3RyaW5nKDEwKSA6IG4udG9TdHJpbmcoMTApO1xufVxuXG5cbnZhciBtb250aHMgPSBbJ0phbicsICdGZWInLCAnTWFyJywgJ0FwcicsICdNYXknLCAnSnVuJywgJ0p1bCcsICdBdWcnLCAnU2VwJyxcbiAgICAgICAgICAgICAgJ09jdCcsICdOb3YnLCAnRGVjJ107XG5cbi8vIDI2IEZlYiAxNjoxOTozNFxuZnVuY3Rpb24gdGltZXN0YW1wKCkge1xuICB2YXIgZCA9IG5ldyBEYXRlKCk7XG4gIHZhciB0aW1lID0gW3BhZChkLmdldEhvdXJzKCkpLFxuICAgICAgICAgICAgICBwYWQoZC5nZXRNaW51dGVzKCkpLFxuICAgICAgICAgICAgICBwYWQoZC5nZXRTZWNvbmRzKCkpXS5qb2luKCc6Jyk7XG4gIHJldHVybiBbZC5nZXREYXRlKCksIG1vbnRoc1tkLmdldE1vbnRoKCldLCB0aW1lXS5qb2luKCcgJyk7XG59XG5cblxuLy8gbG9nIGlzIGp1c3QgYSB0aGluIHdyYXBwZXIgdG8gY29uc29sZS5sb2cgdGhhdCBwcmVwZW5kcyBhIHRpbWVzdGFtcFxuZXhwb3J0cy5sb2cgPSBmdW5jdGlvbigpIHtcbiAgY29uc29sZS5sb2coJyVzIC0gJXMnLCB0aW1lc3RhbXAoKSwgZXhwb3J0cy5mb3JtYXQuYXBwbHkoZXhwb3J0cywgYXJndW1lbnRzKSk7XG59O1xuXG5cbi8qKlxuICogSW5oZXJpdCB0aGUgcHJvdG90eXBlIG1ldGhvZHMgZnJvbSBvbmUgY29uc3RydWN0b3IgaW50byBhbm90aGVyLlxuICpcbiAqIFRoZSBGdW5jdGlvbi5wcm90b3R5cGUuaW5oZXJpdHMgZnJvbSBsYW5nLmpzIHJld3JpdHRlbiBhcyBhIHN0YW5kYWxvbmVcbiAqIGZ1bmN0aW9uIChub3Qgb24gRnVuY3Rpb24ucHJvdG90eXBlKS4gTk9URTogSWYgdGhpcyBmaWxlIGlzIHRvIGJlIGxvYWRlZFxuICogZHVyaW5nIGJvb3RzdHJhcHBpbmcgdGhpcyBmdW5jdGlvbiBuZWVkcyB0byBiZSByZXdyaXR0ZW4gdXNpbmcgc29tZSBuYXRpdmVcbiAqIGZ1bmN0aW9ucyBhcyBwcm90b3R5cGUgc2V0dXAgdXNpbmcgbm9ybWFsIEphdmFTY3JpcHQgZG9lcyBub3Qgd29yayBhc1xuICogZXhwZWN0ZWQgZHVyaW5nIGJvb3RzdHJhcHBpbmcgKHNlZSBtaXJyb3IuanMgaW4gcjExNDkwMykuXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gY3RvciBDb25zdHJ1Y3RvciBmdW5jdGlvbiB3aGljaCBuZWVkcyB0byBpbmhlcml0IHRoZVxuICogICAgIHByb3RvdHlwZS5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHN1cGVyQ3RvciBDb25zdHJ1Y3RvciBmdW5jdGlvbiB0byBpbmhlcml0IHByb3RvdHlwZSBmcm9tLlxuICovXG5leHBvcnRzLmluaGVyaXRzID0gcmVxdWlyZSgnaW5oZXJpdHMnKTtcblxuZXhwb3J0cy5fZXh0ZW5kID0gZnVuY3Rpb24ob3JpZ2luLCBhZGQpIHtcbiAgLy8gRG9uJ3QgZG8gYW55dGhpbmcgaWYgYWRkIGlzbid0IGFuIG9iamVjdFxuICBpZiAoIWFkZCB8fCAhaXNPYmplY3QoYWRkKSkgcmV0dXJuIG9yaWdpbjtcblxuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGFkZCk7XG4gIHZhciBpID0ga2V5cy5sZW5ndGg7XG4gIHdoaWxlIChpLS0pIHtcbiAgICBvcmlnaW5ba2V5c1tpXV0gPSBhZGRba2V5c1tpXV07XG4gIH1cbiAgcmV0dXJuIG9yaWdpbjtcbn07XG5cbmZ1bmN0aW9uIGhhc093blByb3BlcnR5KG9iaiwgcHJvcCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7XG59XG4iLCIvKlxuICogY2F0YmVycnktbG9jYXRvclxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNCBEZW5pcyBSZWNoa3Vub3YgYW5kIHByb2plY3QgY29udHJpYnV0b3JzLlxuICpcbiAqIGNhdGJlcnJ5LWxvY2F0b3IncyBsaWNlbnNlIGZvbGxvd3M6XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb25cbiAqIG9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uXG4gKiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sXG4gKiBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLFxuICogcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSxcbiAqIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4gKiBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuICogaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuICogT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuICogU09GVFdBUkUuXG4gKlxuICogVGhpcyBsaWNlbnNlIGFwcGxpZXMgdG8gYWxsIHBhcnRzIG9mIGNhdGJlcnJ5LWxvY2F0b3IgdGhhdCBhcmUgbm90IGV4dGVybmFsbHlcbiAqIG1haW50YWluZWQgbGlicmFyaWVzLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBDb25zdHJ1Y3RvclRva2VuaXplcjtcblxudmFyIFNUQVRFUyA9IHtcblx0SUxMRUdBTDogLTEsXG5cdE5POiAwLFxuXHRJREVOVElGSUVSOiAxLFxuXHRGVU5DVElPTjogMixcblx0UEFSRU5USEVTRVNfT1BFTjogMyxcblx0UEFSRU5USEVTRVNfQ0xPU0U6IDQsXG5cdENPTU1BOiA1LFxuXHRFTkQ6IDZcbn07XG5Db25zdHJ1Y3RvclRva2VuaXplci5TVEFURVMgPSBTVEFURVM7XG5cbnZhciBLRVlXT1JEUyA9IHtcblx0RlVOQ1RJT046ICdmdW5jdGlvbidcbn07XG5cbnZhciBXSElURVNQQUNFX1RFU1QgPSAvXlxccyQvLFxuXHRJREVOVElGSUVSX1RFU1QgPSAvXltcXCRcXHddJC87XG5cbmZ1bmN0aW9uIENvbnN0cnVjdG9yVG9rZW5pemVyKGNvbnN0cnVjdG9yU291cmNlKSB7XG5cdHRoaXMuX3NvdXJjZSA9IFN0cmluZyhjb25zdHJ1Y3RvclNvdXJjZSB8fCAnJyk7XG59XG5cbi8qKlxuICogQ3VycmVudCBzb3VyY2UgY29kZSBvZiBjb25zdHJ1Y3Rvci5cbiAqIEB0eXBlIHtzdHJpbmd9XG4gKiBAcHJpdmF0ZVxuICovXG5Db25zdHJ1Y3RvclRva2VuaXplci5wcm90b3R5cGUuX3NvdXJjZSA9ICcnO1xuXG4vKipcbiAqIEN1cnJlbnQgaW5kZXggaW4gc291cmNlIGNvZGUuXG4gKiBAdHlwZSB7bnVtYmVyfVxuICogQHByaXZhdGVcbiAqL1xuQ29uc3RydWN0b3JUb2tlbml6ZXIucHJvdG90eXBlLl9jdXJyZW50SW5kZXggPSAwO1xuXG4vKipcbiAqIEN1cnJlbnQgaW5kZXggaW4gc291cmNlIGNvZGUuXG4gKiBAdHlwZSB7bnVtYmVyfVxuICogQHByaXZhdGVcbiAqL1xuQ29uc3RydWN0b3JUb2tlbml6ZXIucHJvdG90eXBlLl9jdXJyZW50RW5kID0gMDtcblxuLyoqXG4gKiBDdXJyZW50IHN0YXRlLlxuICogQHR5cGUge251bWJlcn1cbiAqIEBwcml2YXRlXG4gKi9cbkNvbnN0cnVjdG9yVG9rZW5pemVyLnByb3RvdHlwZS5fY3VycmVudFN0YXRlID0gU1RBVEVTLk5PO1xuXG4vKipcbiAqIEdldHMgbmV4dCB0b2tlbiBpbiBzb3VyY2UuXG4gKiBAcmV0dXJucyB7e3N0YXRlOiAobnVtYmVyKSwgc3RhcnQ6IG51bWJlciwgZW5kOiBudW1iZXJ9fVxuICovXG5Db25zdHJ1Y3RvclRva2VuaXplci5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICgpIHtcblx0aWYgKHRoaXMuX2N1cnJlbnRTdGF0ZSA9PT0gU1RBVEVTLklMTEVHQUwgfHxcblx0XHR0aGlzLl9jdXJyZW50U3RhdGUgPT09IFNUQVRFUy5FTkQpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0c3RhdGU6IHRoaXMuX2N1cnJlbnRTdGF0ZSxcblx0XHRcdHN0YXJ0OiB0aGlzLl9jdXJyZW50SW5kZXgsXG5cdFx0XHRlbmQ6IHRoaXMuX2N1cnJlbnRJbmRleCArIDFcblx0XHR9O1xuXHR9XG5cblx0dmFyIHN0YXJ0ID0gdGhpcy5fY3VycmVudEluZGV4LFxuXHRcdHN0YXRlID0gdGhpcy5fY3VycmVudFN0YXRlO1xuXG5cdHN3aXRjaCAodGhpcy5fY3VycmVudFN0YXRlKSB7XG5cdFx0Y2FzZSBTVEFURVMuUEFSRU5USEVTRVNfT1BFTjpcblx0XHRcdHRoaXMucGFyZW50aGVzZXNPcGVuU3RhdGUoKTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgU1RBVEVTLlBBUkVOVEhFU0VTX0NMT1NFOlxuXHRcdFx0dGhpcy5wYXJlbnRoZXNlc0Nsb3NlU3RhdGUoKTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgU1RBVEVTLklERU5USUZJRVI6XG5cdFx0XHR0aGlzLmlkZW50aWZpZXJTdGF0ZSgpO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBTVEFURVMuQ09NTUE6XG5cdFx0XHR0aGlzLmNvbW1hU3RhdGUoKTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgU1RBVEVTLkZVTkNUSU9OOlxuXHRcdFx0dGhpcy5mdW5jdGlvblN0YXRlKCk7XG5cdFx0XHRicmVhaztcblx0XHRkZWZhdWx0OlxuXHRcdFx0dGhpcy5za2lwV2hpdGVzcGFjZSgpO1xuXHRcdFx0dmFyIGV4cGVjdGVkID0gdGhpcy5fc291cmNlLnN1YnN0cihcblx0XHRcdFx0dGhpcy5fY3VycmVudEluZGV4LCBLRVlXT1JEUy5GVU5DVElPTi5sZW5ndGhcblx0XHRcdCk7XG5cdFx0XHRpZiAoZXhwZWN0ZWQgPT09IEtFWVdPUkRTLkZVTkNUSU9OKSB7XG5cdFx0XHRcdHRoaXMuX2N1cnJlbnRTdGF0ZSA9IFNUQVRFUy5GVU5DVElPTjtcblx0XHRcdFx0cmV0dXJuIHRoaXMubmV4dCgpO1xuXHRcdFx0fVxuXG5cdFx0XHRzdGF0ZSA9IFNUQVRFUy5JTExFR0FMO1xuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRzdGF0ZTogc3RhdGUsXG5cdFx0c3RhcnQ6IHN0YXJ0LFxuXHRcdGVuZDogdGhpcy5fY3VycmVudEVuZFxuXHR9O1xufTtcblxuLyoqXG4gKiBTa2lwcyBhbGwgd2hpdGVzcGFjZSBjaGFyYWN0ZXJzLlxuICovXG5Db25zdHJ1Y3RvclRva2VuaXplci5wcm90b3R5cGUuc2tpcFdoaXRlc3BhY2UgPSBmdW5jdGlvbiAoKSB7XG5cdHdoaWxlIChcblx0XHR0aGlzLl9jdXJyZW50SW5kZXggPCB0aGlzLl9zb3VyY2UubGVuZ3RoICYmXG5cdFx0V0hJVEVTUEFDRV9URVNULnRlc3QodGhpcy5fc291cmNlW3RoaXMuX2N1cnJlbnRJbmRleF0pKSB7XG5cdFx0dGhpcy5fY3VycmVudEluZGV4Kys7XG5cdH1cbn07XG5cbi8qKlxuICogRGVzY3JpYmVzIFBBUkVOVEhFU0VTX09QRU4gc3RhdGUgb2YgbWFjaGluZS5cbiAqL1xuQ29uc3RydWN0b3JUb2tlbml6ZXIucHJvdG90eXBlLnBhcmVudGhlc2VzT3BlblN0YXRlID0gZnVuY3Rpb24gKCkge1xuXHR0aGlzLl9jdXJyZW50SW5kZXgrKztcblx0dGhpcy5fY3VycmVudEVuZCA9IHRoaXMuX2N1cnJlbnRJbmRleDtcblxuXHR0aGlzLnNraXBXaGl0ZXNwYWNlKCk7XG5cdGlmIChJREVOVElGSUVSX1RFU1QudGVzdCh0aGlzLl9zb3VyY2VbdGhpcy5fY3VycmVudEluZGV4XSkpIHtcblx0XHR0aGlzLl9jdXJyZW50U3RhdGUgPSBTVEFURVMuSURFTlRJRklFUjtcblx0fSBlbHNlIGlmICh0aGlzLl9zb3VyY2VbdGhpcy5fY3VycmVudEluZGV4XSA9PT0gJyknKSB7XG5cdFx0dGhpcy5fY3VycmVudFN0YXRlID0gU1RBVEVTLlBBUkVOVEhFU0VTX0NMT1NFO1xuXHR9IGVsc2Uge1xuXHRcdHRoaXMuX2N1cnJlbnRTdGF0ZSA9IFNUQVRFUy5JTExFR0FMO1xuXHR9XG59O1xuXG4vKipcbiAqIERlc2NyaWJlcyBQQVJFTlRIRVNFU19DTE9TRSBzdGF0ZSBvZiBtYWNoaW5lLlxuICovXG5Db25zdHJ1Y3RvclRva2VuaXplci5wcm90b3R5cGUucGFyZW50aGVzZXNDbG9zZVN0YXRlID0gZnVuY3Rpb24gKCkge1xuXHR0aGlzLl9jdXJyZW50SW5kZXgrKztcblx0dGhpcy5fY3VycmVudEVuZCA9IHRoaXMuX2N1cnJlbnRJbmRleDtcblx0dGhpcy5fY3VycmVudFN0YXRlID0gU1RBVEVTLkVORDtcbn07XG5cbi8qKlxuICogRGVzY3JpYmVzIEZVTkNUSU9OIHN0YXRlIG9mIG1hY2hpbmUuXG4gKi9cbkNvbnN0cnVjdG9yVG9rZW5pemVyLnByb3RvdHlwZS5mdW5jdGlvblN0YXRlID0gZnVuY3Rpb24gKCkge1xuXHR0aGlzLl9jdXJyZW50SW5kZXggKz0gS0VZV09SRFMuRlVOQ1RJT04ubGVuZ3RoO1xuXHR0aGlzLl9jdXJyZW50RW5kID0gdGhpcy5fY3VycmVudEluZGV4O1xuXG5cdHRoaXMuc2tpcFdoaXRlc3BhY2UoKTtcblxuXHRpZiAodGhpcy5fc291cmNlW3RoaXMuX2N1cnJlbnRJbmRleF0gPT09ICcoJykge1xuXHRcdHRoaXMuX2N1cnJlbnRTdGF0ZSA9IFNUQVRFUy5QQVJFTlRIRVNFU19PUEVOO1xuXHR9IGVsc2UgaWYgKElERU5USUZJRVJfVEVTVC50ZXN0KHRoaXMuX3NvdXJjZVt0aGlzLl9jdXJyZW50SW5kZXhdKSkge1xuXHRcdHRoaXMuX2N1cnJlbnRTdGF0ZSA9IFNUQVRFUy5JREVOVElGSUVSO1xuXHR9IGVsc2Uge1xuXHRcdHRoaXMuX2N1cnJlbnRTdGF0ZSA9IFNUQVRFUy5JTExFR0FMO1xuXHR9XG59O1xuXG4vKipcbiAqIERlc2NyaWJlcyBJREVOVElGSUVSIHN0YXRlIG9mIG1hY2hpbmUuXG4gKi9cbkNvbnN0cnVjdG9yVG9rZW5pemVyLnByb3RvdHlwZS5pZGVudGlmaWVyU3RhdGUgPSBmdW5jdGlvbiAoKSB7XG5cdHdoaWxlIChcblx0XHR0aGlzLl9jdXJyZW50SW5kZXggPCB0aGlzLl9zb3VyY2UubGVuZ3RoICYmXG5cdFx0SURFTlRJRklFUl9URVNULnRlc3QodGhpcy5fc291cmNlW3RoaXMuX2N1cnJlbnRJbmRleF0pKSB7XG5cdFx0dGhpcy5fY3VycmVudEluZGV4Kys7XG5cdH1cblxuXHR0aGlzLl9jdXJyZW50RW5kID0gdGhpcy5fY3VycmVudEluZGV4O1xuXG5cdHRoaXMuc2tpcFdoaXRlc3BhY2UoKTtcblx0aWYgKHRoaXMuX3NvdXJjZVt0aGlzLl9jdXJyZW50SW5kZXhdID09PSAnKCcpIHtcblx0XHR0aGlzLl9jdXJyZW50U3RhdGUgPSBTVEFURVMuUEFSRU5USEVTRVNfT1BFTjtcblx0fSBlbHNlIGlmICh0aGlzLl9zb3VyY2VbdGhpcy5fY3VycmVudEluZGV4XSA9PT0gJyknKSB7XG5cdFx0dGhpcy5fY3VycmVudFN0YXRlID0gU1RBVEVTLlBBUkVOVEhFU0VTX0NMT1NFO1xuXHR9IGVsc2UgaWYgKHRoaXMuX3NvdXJjZVt0aGlzLl9jdXJyZW50SW5kZXhdID09PSAnLCcpIHtcblx0XHR0aGlzLl9jdXJyZW50U3RhdGUgPSBTVEFURVMuQ09NTUE7XG5cdH0gZWxzZSB7XG5cdFx0dGhpcy5fY3VycmVudFN0YXRlID0gU1RBVEVTLklMTEVHQUw7XG5cdH1cbn07XG5cbi8qKlxuICogRGVzY3JpYmVzIENPTU1BIHN0YXRlIG9mIG1hY2hpbmUuXG4gKi9cbkNvbnN0cnVjdG9yVG9rZW5pemVyLnByb3RvdHlwZS5jb21tYVN0YXRlID0gZnVuY3Rpb24gKCkge1xuXHR0aGlzLl9jdXJyZW50SW5kZXgrKztcblx0dGhpcy5fY3VycmVudEVuZCA9IHRoaXMuX2N1cnJlbnRJbmRleDtcblxuXHR0aGlzLnNraXBXaGl0ZXNwYWNlKCk7XG5cdGlmIChJREVOVElGSUVSX1RFU1QudGVzdCh0aGlzLl9zb3VyY2VbdGhpcy5fY3VycmVudEluZGV4XSkpIHtcblx0XHR0aGlzLl9jdXJyZW50U3RhdGUgPSBTVEFURVMuSURFTlRJRklFUjtcblx0XHRyZXR1cm47XG5cdH1cblx0dGhpcy5fY3VycmVudFN0YXRlID0gU1RBVEVTLklMTEVHQUw7XG59OyIsIi8qXG4gKiBjYXRiZXJyeS1sb2NhdG9yXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0IERlbmlzIFJlY2hrdW5vdiBhbmQgcHJvamVjdCBjb250cmlidXRvcnMuXG4gKlxuICogY2F0YmVycnktbG9jYXRvcidzIGxpY2Vuc2UgZm9sbG93czpcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvblxuICogb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb25cbiAqIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbixcbiAqIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsXG4gKiBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLFxuICogYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbiAqIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4gKiBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4gKiBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG4gKiBTT0ZUV0FSRS5cbiAqXG4gKiBUaGlzIGxpY2Vuc2UgYXBwbGllcyB0byBhbGwgcGFydHMgb2YgY2F0YmVycnktbG9jYXRvciB0aGF0IGFyZSBub3QgZXh0ZXJuYWxseVxuICogbWFpbnRhaW5lZCBsaWJyYXJpZXMuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNlcnZpY2VMb2NhdG9yO1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWwnKSxcblx0Q29uc3RydWN0b3JUb2tlbml6ZXIgPSByZXF1aXJlKCcuL0NvbnN0cnVjdG9yVG9rZW5pemVyJyk7XG5cbnZhciBERVBFTkRFTkNZX1JFR0VYUCA9IC9eXFwkXFx3Ky8sXG5cdEVSUk9SX0NPTlNUUlVDVE9SX1NIT1VMRF9CRV9GVU5DVElPTiA9ICdDb25zdHJ1Y3RvciBzaG91bGQgYmUgYSBmdW5jdGlvbicsXG5cdEVSUk9SX1RZUEVfTk9UX1JFR0lTVEVSRUQgPSAnVHlwZSBcIiVzXCIgbm90IHJlZ2lzdGVyZWQnLFxuXHRFUlJPUl9UWVBFX1NIT1VMRF9CRV9TVFJJTkcgPSAnVHlwZSBuYW1lIFwiJXNcIiBzaG91bGQgYmUgYSBzdHJpbmcnO1xuXG4vKipcbiAqIENyZWF0ZXMgbmV3IGluc3RhbmNlIG9mIHNlcnZpY2UgbG9jYXRvci5cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBTZXJ2aWNlTG9jYXRvcigpIHtcblx0dGhpcy5fcmVnaXN0cmF0aW9ucyA9IHt9O1xufVxuXG4vKipcbiAqIEN1cnJlbnQgdHlwZSByZWdpc3RyYXRpb25zLlxuICogQHR5cGUge09iamVjdH1cbiAqIEBwcm90ZWN0ZWRcbiAqL1xuU2VydmljZUxvY2F0b3IucHJvdG90eXBlLl9yZWdpc3RyYXRpb25zID0gbnVsbDtcblxuLyoqXG4gKiBSZWdpc3RlcnMgbmV3IHR5cGUgaW4gc2VydmljZSBsb2NhdG9yLlxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgVHlwZSBuYW1lLCB3aGljaCB3aWxsIGJlIGFsaWFzIGluIG90aGVyIGNvbnN0cnVjdG9ycy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNvbnN0cnVjdG9yIENvbnN0cnVjdG9yIHdoaWNoXG4gKiBpbml0aWFsaXplcyBpbnN0YW5jZSBvZiBzcGVjaWZpZWQgdHlwZS5cbiAqIEBwYXJhbSB7T2JqZWN0P30gcGFyYW1ldGVycyBTZXQgb2YgbmFtZWQgcGFyYW1ldGVyc1xuICogd2hpY2ggd2lsbCBiZSBhbHNvIGluamVjdGVkLlxuICogQHBhcmFtIHtib29sZWFuP30gaXNTaW5nbGV0b24gSWYgdHJ1ZSBldmVyeSByZXNvbHZlIHdpbGwgcmV0dXJuXG4gKiB0aGUgc2FtZSBpbnN0YW5jZS5cbiAqL1xuU2VydmljZUxvY2F0b3IucHJvdG90eXBlLnJlZ2lzdGVyID1cblx0ZnVuY3Rpb24gKHR5cGUsIGNvbnN0cnVjdG9yLCBwYXJhbWV0ZXJzLCBpc1NpbmdsZXRvbikge1xuXHRcdHRocm93SWZOb3RGdW5jdGlvbihjb25zdHJ1Y3Rvcik7XG5cdFx0dGhyb3dJZk5vdFN0cmluZyh0eXBlKTtcblxuXHRcdGluaXRpYWxpemVSZWdpc3RyYXRpb24odHlwZSwgdGhpcyk7XG5cdFx0dmFyIHBhcmFtZXRlck5hbWVzID0gZ2V0UGFyYW1ldGVyTmFtZXMoY29uc3RydWN0b3IpO1xuXG5cdFx0dGhpcy5fcmVnaXN0cmF0aW9uc1t0eXBlXS51bnNoaWZ0KHtcblx0XHRcdGNvbnN0cnVjdG9yOiBjb25zdHJ1Y3Rvcixcblx0XHRcdHBhcmFtZXRlcnM6IHBhcmFtZXRlcnMgfHwge30sXG5cdFx0XHRwYXJhbWV0ZXJOYW1lczogcGFyYW1ldGVyTmFtZXMsXG5cdFx0XHRpc1NpbmdsZXRvbjogQm9vbGVhbihpc1NpbmdsZXRvbiksXG5cdFx0XHRzaW5nbGVJbnN0YW5jZTogbnVsbFxuXHRcdH0pO1xuXHR9O1xuXG4vKipcbiAqIFJlZ2lzdGVycyBzaW5nbGUgaW5zdGFuY2UgZm9yIHNwZWNpZmllZCB0eXBlLlxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgVHlwZSBuYW1lLlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlIEluc3RhbmNlIHRvIHJlZ2lzdGVyLlxuICovXG5TZXJ2aWNlTG9jYXRvci5wcm90b3R5cGUucmVnaXN0ZXJJbnN0YW5jZSA9IGZ1bmN0aW9uICh0eXBlLCBpbnN0YW5jZSkge1xuXHR0aHJvd0lmTm90U3RyaW5nKHR5cGUpO1xuXHRpbml0aWFsaXplUmVnaXN0cmF0aW9uKHR5cGUsIHRoaXMpO1xuXG5cdHRoaXMuX3JlZ2lzdHJhdGlvbnNbdHlwZV0udW5zaGlmdCh7XG5cdFx0Y29uc3RydWN0b3I6IGluc3RhbmNlLmNvbnN0cnVjdG9yLFxuXHRcdHBhcmFtZXRlcnM6IHt9LFxuXHRcdHBhcmFtZXRlck5hbWVzOiBbXSxcblx0XHRpc1NpbmdsZXRvbjogdHJ1ZSxcblx0XHRzaW5nbGVJbnN0YW5jZTogaW5zdGFuY2Vcblx0fSk7XG59O1xuXG4vKipcbiAqIFJlc29sdmVzIGxhc3QgcmVnaXN0ZXJlZCBpbXBsZW1lbnRhdGlvbiBieSB0eXBlIG5hbWVcbiAqIGluY2x1ZGluZyBhbGwgaXRzIGRlcGVuZGVuY2llcyByZWN1cnNpdmVseS5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIFR5cGUgbmFtZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IEluc3RhbmNlIG9mIHNwZWNpZmllZCB0eXBlLlxuICovXG5TZXJ2aWNlTG9jYXRvci5wcm90b3R5cGUucmVzb2x2ZSA9IGZ1bmN0aW9uICh0eXBlKSB7XG5cdHRocm93SWZOb3RTdHJpbmcodHlwZSk7XG5cdHRocm93SWZOb1R5cGUodGhpcy5fcmVnaXN0cmF0aW9ucywgdHlwZSk7XG5cdHZhciBmaXJzdFJlZ2lzdHJhdGlvbiA9IHRoaXMuX3JlZ2lzdHJhdGlvbnNbdHlwZV1bMF07XG5cdHJldHVybiBjcmVhdGVJbnN0YW5jZShmaXJzdFJlZ2lzdHJhdGlvbiwgdGhpcyk7XG59O1xuXG4vKipcbiAqIFJlc29sdmVzIGFsbCByZWdpc3RlcmVkIGltcGxlbWVudGF0aW9ucyBieSB0eXBlIG5hbWVcbiAqIGluY2x1ZGluZyBhbGwgZGVwZW5kZW5jaWVzIHJlY3Vyc2l2ZWx5LlxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgVHlwZSBuYW1lLlxuICogQHJldHVybnMge0FycmF5fSBBcnJheSBvZiBpbnN0YW5jZXMgc3BlY2lmaWVkIHR5cGUuXG4gKi9cblNlcnZpY2VMb2NhdG9yLnByb3RvdHlwZS5yZXNvbHZlQWxsID0gZnVuY3Rpb24gKHR5cGUpIHtcblx0dGhyb3dJZk5vdFN0cmluZyh0eXBlKTtcblx0dHJ5IHtcblx0XHR0aHJvd0lmTm9UeXBlKHRoaXMuX3JlZ2lzdHJhdGlvbnMsIHR5cGUpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0cmV0dXJuIFtdO1xuXHR9XG5cdHJldHVybiB0aGlzLl9yZWdpc3RyYXRpb25zW3R5cGVdLm1hcChmdW5jdGlvbiAocmVnaXN0cmF0aW9uKSB7XG5cdFx0cmV0dXJuIGNyZWF0ZUluc3RhbmNlKHJlZ2lzdHJhdGlvbiwgdGhpcyk7XG5cdH0sIHRoaXMpO1xufTtcblxuLyoqXG4gKiBSZXNvbHZlcyBpbnN0YW5jZSBvZiBzcGVjaWZpZWQgY29uc3RydWN0b3IgaW5jbHVkaW5nIGRlcGVuZGVuY2llcy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNvbnN0cnVjdG9yIENvbnN0cnVjdG9yIGZvciBpbnN0YW5jZSBjcmVhdGlvbi5cbiAqIEBwYXJhbSB7T2JqZWN0P30gcGFyYW1ldGVycyBTZXQgb2YgaXRzIHBhcmFtZXRlcnMgdmFsdWVzLlxuICogQHJldHVybnMge09iamVjdH0gSW5zdGFuY2Ugb2Ygc3BlY2lmaWVkIGNvbnN0cnVjdG9yLlxuICovXG5TZXJ2aWNlTG9jYXRvci5wcm90b3R5cGUucmVzb2x2ZUluc3RhbmNlID0gZnVuY3Rpb24gKGNvbnN0cnVjdG9yLCBwYXJhbWV0ZXJzKSB7XG5cdHJldHVybiBjcmVhdGVJbnN0YW5jZSh7XG5cdFx0Y29uc3RydWN0b3I6IGNvbnN0cnVjdG9yLFxuXHRcdHBhcmFtZXRlcnM6IHBhcmFtZXRlcnMgfHwge30sXG5cdFx0cGFyYW1ldGVyTmFtZXM6IGdldFBhcmFtZXRlck5hbWVzKGNvbnN0cnVjdG9yKSxcblx0XHRpc1NpbmdsZXRvbjogZmFsc2UsXG5cdFx0c2luZ2xlSW5zdGFuY2U6IG51bGxcblx0fSwgdGhpcyk7XG59O1xuXG4vKipcbiAqIFVucmVnaXN0ZXJzIGFsbCByZWdpc3RyYXRpb25zIG9mIHNwZWNpZmllZCB0eXBlLlxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgVHlwZSBuYW1lLlxuICovXG5TZXJ2aWNlTG9jYXRvci5wcm90b3R5cGUudW5yZWdpc3RlciA9IGZ1bmN0aW9uICh0eXBlKSB7XG5cdHRocm93SWZOb3RTdHJpbmcodHlwZSk7XG5cdGRlbGV0ZSB0aGlzLl9yZWdpc3RyYXRpb25zW3R5cGVdO1xufTtcblxuLyoqXG4gKiBJbml0aWFsaXplcyByZWdpc3RyYXRpb24gYXJyYXkgZm9yIHNwZWNpZmllZCB0eXBlLlxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgVHlwZSBuYW1lLlxuICogQHBhcmFtIHtTZXJ2aWNlTG9jYXRvcn0gY29udGV4dCBDb250ZXh0IG9mIGV4ZWN1dGlvbi5cbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZVJlZ2lzdHJhdGlvbih0eXBlLCBjb250ZXh0KSB7XG5cdGlmICghY29udGV4dC5fcmVnaXN0cmF0aW9ucy5oYXNPd25Qcm9wZXJ0eSh0eXBlKSkge1xuXHRcdGNvbnRleHQuX3JlZ2lzdHJhdGlvbnNbdHlwZV0gPSBbXTtcblx0fVxufVxuXG4vKipcbiAqIFRocm93cyBlcnJvciBpZiBzcGVjaWZpZWQgcmVnaXN0cmF0aW9uIGlzIG5vdCBmb3VuZC5cbiAqIEBwYXJhbSB7T2JqZWN0fSByZWdpc3RyYXRpb25zIEN1cnJlbnQgcmVnaXN0cmF0aW9ucyBzZXQuXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZSBUeXBlIHRvIGNoZWNrLlxuICovXG5mdW5jdGlvbiB0aHJvd0lmTm9UeXBlKHJlZ2lzdHJhdGlvbnMsIHR5cGUpIHtcblx0aWYgKCFyZWdpc3RyYXRpb25zLmhhc093blByb3BlcnR5KHR5cGUpIHx8XG5cdFx0cmVnaXN0cmF0aW9uc1t0eXBlXS5sZW5ndGggPT09IDApIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IodXRpbC5mb3JtYXQoRVJST1JfVFlQRV9OT1RfUkVHSVNURVJFRCwgdHlwZSkpO1xuXHR9XG59XG5cbi8qKlxuICogVGhyb3dzIGVycm9yIGlmIHNwZWNpZmllZCBjb25zdHJ1Y3RvciBpcyBub3QgYSBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNvbnN0cnVjdG9yIENvbnN0cnVjdG9yIHRvIGNoZWNrLlxuICovXG5mdW5jdGlvbiB0aHJvd0lmTm90RnVuY3Rpb24oY29uc3RydWN0b3IpIHtcblx0aWYgKGNvbnN0cnVjdG9yIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHR0aHJvdyBuZXcgRXJyb3IoRVJST1JfQ09OU1RSVUNUT1JfU0hPVUxEX0JFX0ZVTkNUSU9OKTtcbn1cblxuLyoqXG4gKiBUaHJvd3MgZXJyb3IgaWYgc3BlY2lmaWVkIHR5cGUgbmFtZSBpcyBub3QgYSBzdHJpbmcuXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZSBUeXBlIG5hbWUgdG8gY2hlY2suXG4gKi9cbmZ1bmN0aW9uIHRocm93SWZOb3RTdHJpbmcodHlwZSkge1xuXHRpZiAodHlwZW9mKHR5cGUpID09PSAnc3RyaW5nJykge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdHRocm93IG5ldyBFcnJvcih1dGlsLmZvcm1hdChFUlJPUl9UWVBFX1NIT1VMRF9CRV9TVFJJTkcsIHR5cGUpKTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGluc3RhbmNlIG9mIHR5cGUgc3BlY2lmaWVkIGFuZCBwYXJhbWV0ZXJzIGluIHJlZ2lzdHJhdGlvbi5cbiAqIEBwYXJhbSB7T2JqZWN0fSByZWdpc3RyYXRpb24gU3BlY2lmaWVkIHJlZ2lzdHJhdGlvbiBvZiB0eXBlLlxuICogQHBhcmFtIHtTZXJ2aWNlTG9jYXRvcn0gY29udGV4dCBDb250ZXh0IG9mIGV4ZWN1dGlvbi5cbiAqIEByZXR1cm5zIHtPYmplY3R9IEluc3RhbmNlIG9mIHR5cGUgc3BlY2lmaWVkIGluIHJlZ2lzdHJhdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2UocmVnaXN0cmF0aW9uLCBjb250ZXh0KSB7XG5cdGlmIChyZWdpc3RyYXRpb24uaXNTaW5nbGV0b24gJiYgcmVnaXN0cmF0aW9uLnNpbmdsZUluc3RhbmNlICE9PSBudWxsKSB7XG5cdFx0cmV0dXJuIHJlZ2lzdHJhdGlvbi5zaW5nbGVJbnN0YW5jZTtcblx0fVxuXG5cdHZhciBpbnN0YW5jZVBhcmFtZXRlcnMgPSBnZXRQYXJhbWV0ZXJzKHJlZ2lzdHJhdGlvbiwgY29udGV4dCksXG5cdFx0aW5zdGFuY2UgPSBPYmplY3QuY3JlYXRlKHJlZ2lzdHJhdGlvbi5jb25zdHJ1Y3Rvci5wcm90b3R5cGUpO1xuXHRyZWdpc3RyYXRpb24uY29uc3RydWN0b3IuYXBwbHkoaW5zdGFuY2UsIGluc3RhbmNlUGFyYW1ldGVycyk7XG5cblx0aWYgKHJlZ2lzdHJhdGlvbi5pc1NpbmdsZXRvbikge1xuXHRcdHJlZ2lzdHJhdGlvbi5zaW5nbGVJbnN0YW5jZSA9IGluc3RhbmNlO1xuXHR9XG5cblx0cmV0dXJuIGluc3RhbmNlO1xufVxuXG4vKipcbiAqIEdldHMgY29uc3RydWN0b3IgcGFyYW1ldGVycyBzcGVjaWZpZWQgaW4gdHlwZSBjb25zdHJ1Y3Rvci5cbiAqIEBwYXJhbSB7T2JqZWN0fSByZWdpc3RyYXRpb24gVHlwZSByZWdpc3RyYXRpb24uXG4gKiBAcGFyYW0ge1NlcnZpY2VMb2NhdG9yfSBjb250ZXh0IENvbnRleHQgb2YgZXhlY3V0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBBcnJheSBvZiByZXNvbHZlZCBkZXBlbmRlbmNpZXMgdG8gaW5qZWN0LlxuICovXG5mdW5jdGlvbiBnZXRQYXJhbWV0ZXJzKHJlZ2lzdHJhdGlvbiwgY29udGV4dCkge1xuXHRyZXR1cm4gcmVnaXN0cmF0aW9uLnBhcmFtZXRlck5hbWVzLm1hcChmdW5jdGlvbiAocGFyYW1ldGVyTmFtZSkge1xuXHRcdHZhciBkZXBlbmRlbmN5TmFtZSA9IGdldERlcGVuZGVuY3lOYW1lKHBhcmFtZXRlck5hbWUpO1xuXHRcdHJldHVybiBkZXBlbmRlbmN5TmFtZSA9PT0gbnVsbCA/XG5cdFx0XHRyZWdpc3RyYXRpb24ucGFyYW1ldGVyc1twYXJhbWV0ZXJOYW1lXSA6XG5cdFx0XHR0aGlzLnJlc29sdmUoZGVwZW5kZW5jeU5hbWUpO1xuXHR9LCBjb250ZXh0KTtcbn1cblxuLyoqXG4gKiBHZXRzIG5hbWUgb2YgZGVwZW5kZW5jeSB0eXBlLlxuICogQHBhcmFtIHtzdHJpbmd9IHBhcmFtZXRlck5hbWUgTmFtZSBvZiBjb25zdHJ1Y3RvciBwYXJhbWV0ZXIuXG4gKiBAcmV0dXJucyB7c3RyaW5nfG51bGx9IE5hbWUgb2YgZGVwZW5kZW5jeSB0eXBlLlxuICovXG5mdW5jdGlvbiBnZXREZXBlbmRlbmN5TmFtZShwYXJhbWV0ZXJOYW1lKSB7XG5cdGlmICghREVQRU5ERU5DWV9SRUdFWFAudGVzdChwYXJhbWV0ZXJOYW1lKSkge1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0cmV0dXJuIHBhcmFtZXRlck5hbWUuc3Vic3RyKDEsIHBhcmFtZXRlck5hbWUubGVuZ3RoIC0gMSk7XG59XG5cbi8qKlxuICogR2V0cyBhbGwgcGFyYW1ldGVyIG5hbWVzIHVzZWQgaW4gY29uc3RydWN0b3IgZnVuY3Rpb24uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb25zdHJ1Y3RvciBDb25zdHJ1Y3RvciBmdW5jdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheTxzdHJpbmc+fSBBcnJheSBvZiBwYXJhbWV0ZXIgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIGdldFBhcmFtZXRlck5hbWVzKGNvbnN0cnVjdG9yKSB7XG5cdHZhciBzb3VyY2UgPSBjb25zdHJ1Y3Rvci50b1N0cmluZygpLFxuXHRcdHRva2VuaXplciA9IG5ldyBDb25zdHJ1Y3RvclRva2VuaXplcihzb3VyY2UpLFxuXHRcdHJlc3VsdCA9IFtdLFxuXHRcdHRva2VuID0ge1xuXHRcdFx0c3RhdGU6IENvbnN0cnVjdG9yVG9rZW5pemVyLlNUQVRFUy5OTyxcblx0XHRcdHN0YXJ0OiAwLFxuXHRcdFx0ZW5kOiAwXG5cdFx0fSxcblx0XHRhcmVQYXJhbWV0ZXJzU3RhcnRlZCA9IGZhbHNlO1xuXG5cdHdoaWxlIChcblx0XHR0b2tlbi5zdGF0ZSAhPT0gQ29uc3RydWN0b3JUb2tlbml6ZXIuU1RBVEVTLkVORCAmJlxuXHRcdHRva2VuLnN0YXRlICE9PSBDb25zdHJ1Y3RvclRva2VuaXplci5TVEFURVMuSUxMRUdBTCkge1xuXHRcdHRva2VuID0gdG9rZW5pemVyLm5leHQoKTtcblx0XHRpZiAodG9rZW4uc3RhdGUgPT09IENvbnN0cnVjdG9yVG9rZW5pemVyLlNUQVRFUy5QQVJFTlRIRVNFU19PUEVOKSB7XG5cdFx0XHRhcmVQYXJhbWV0ZXJzU3RhcnRlZCA9IHRydWU7XG5cdFx0fVxuXG5cdFx0aWYgKGFyZVBhcmFtZXRlcnNTdGFydGVkICYmXG5cdFx0XHR0b2tlbi5zdGF0ZSA9PT0gQ29uc3RydWN0b3JUb2tlbml6ZXIuU1RBVEVTLklERU5USUZJRVIpIHtcblx0XHRcdHJlc3VsdC5wdXNoKHNvdXJjZS5zdWJzdHJpbmcodG9rZW4uc3RhcnQsIHRva2VuLmVuZCkpO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xuXG59IiwiLypcbiAqIGNhdGJlcnJ5XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0IERlbmlzIFJlY2hrdW5vdiBhbmQgcHJvamVjdCBjb250cmlidXRvcnMuXG4gKlxuICogY2F0YmVycnkncyBsaWNlbnNlIGZvbGxvd3M6XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb25cbiAqIG9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uXG4gKiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sXG4gKiBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLFxuICogcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSxcbiAqIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4gKiBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuICogaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuICogT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuICogU09GVFdBUkUuXG4gKlxuICogVGhpcyBsaWNlbnNlIGFwcGxpZXMgdG8gYWxsIHBhcnRzIG9mIGNhdGJlcnJ5IHRoYXQgYXJlIG5vdCBleHRlcm5hbGx5XG4gKiBtYWludGFpbmVkIGxpYnJhcmllcy5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gVUhSO1xuXG52YXIgVUhSQmFzZSA9IHJlcXVpcmUoJy4uL2xpYi9VSFJCYXNlJyksXG5cdFByb21pc2UgPSByZXF1aXJlKCdwcm9taXNlJyksXG5cdFVSSSA9IHJlcXVpcmUoJ2NhdGJlcnJ5LXVyaScpLlVSSSxcblx0dXRpbCA9IHJlcXVpcmUoJ3V0aWwnKTtcblxuLy8gaWYgYnJvd3NlciBzdGlsbCBkb2VzIG5vdCBoYXZlIHByb21pc2VzIHRoZW4gYWRkIGl0LlxuaWYgKCEoJ1Byb21pc2UnIGluIHdpbmRvdykpIHtcblx0d2luZG93LlByb21pc2UgPSBQcm9taXNlO1xufVxuXG51dGlsLmluaGVyaXRzKFVIUiwgVUhSQmFzZSk7XG5cbnZhciBOT05fU0FGRV9IRUFERVJTID0ge1xuXHRjb29raWU6IHRydWUsXG5cdCdhY2NlcHQtY2hhcnNldCc6IHRydWVcbn07XG5cbnZhciBFUlJPUl9DT05ORUNUSU9OID0gJ0Nvbm5lY3Rpb24gZXJyb3InLFxuXHRFUlJPUl9USU1FT1VUID0gJ1JlcXVlc3QgdGltZW91dCcsXG5cdEVSUk9SX0FCT1JURUQgPSAnUmVxdWVzdCBhYm9ydGVkJztcblxuLyoqXG4gKiBDcmVhdGVzIG5ldyBpbnN0YW5jZSBvZiBjbGllbnQtc2lkZSBIVFRQKFMpIHJlcXVlc3QgaW1wbGVtZW50YXRpb24uXG4gKiBAcGFyYW0ge1dpbmRvd30gJHdpbmRvdyBDdXJyZW50IHdpbmRvdyBvYmplY3QuXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gVUhSKCR3aW5kb3cpIHtcblx0VUhSQmFzZS5jYWxsKHRoaXMpO1xuXHR0aGlzLndpbmRvdyA9ICR3aW5kb3c7XG59XG5cbi8qKlxuICogQ3VycmVudCBpbnN0YW5jZSBvZiB3aW5kb3cuXG4gKiBAdHlwZSB7V2luZG93fVxuICovXG5VSFIucHJvdG90eXBlLndpbmRvdyA9IG51bGw7XG5cbi8qKlxuICogRG9lcyByZXF1ZXN0IHdpdGggc3BlY2lmaWVkIHBhcmFtZXRlcnMgdXNpbmcgcHJvdG9jb2wgaW1wbGVtZW50YXRpb24uXG4gKiBAcGFyYW0ge09iamVjdH0gcGFyYW1ldGVycyBSZXF1ZXN0IHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0ge1N0cmluZ30gcGFyYW1ldGVycy5tZXRob2QgSFRUUCBtZXRob2QuXG4gKiBAcGFyYW0ge1N0cmluZ30gcGFyYW1ldGVycy51cmwgVVJMIGZvciByZXF1ZXN0LlxuICogQHBhcmFtIHtVUkl9IHBhcmFtZXRlcnMudXJpIFVSSSBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdH0gcGFyYW1ldGVycy5oZWFkZXJzIEhUVFAgaGVhZGVycyB0byBzZW5kLlxuICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSBwYXJhbWV0ZXJzLmRhdGEgRGF0YSB0byBzZW5kLlxuICogQHBhcmFtIHtOdW1iZXJ9IHBhcmFtZXRlcnMudGltZW91dCBSZXF1ZXN0IHRpbWVvdXQuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHBhcmFtZXRlcnMudW5zYWZlSFRUUFMgSWYgdHJ1ZSB0aGVuIHJlcXVlc3RzIHRvIHNlcnZlcnMgd2l0aFxuICogaW52YWxpZCBIVFRQUyBjZXJ0aWZpY2F0ZXMgYXJlIGFsbG93ZWQuXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxPYmplY3Q+fSBQcm9taXNlIGZvciByZXN1bHQgd2l0aCBzdGF0dXMgb2JqZWN0IGFuZCBjb250ZW50LlxuICogQHByb3RlY3RlZFxuICovXG5VSFIucHJvdG90eXBlLl9kb1JlcXVlc3QgPSBmdW5jdGlvbiAocGFyYW1ldGVycykge1xuXHR2YXIgc2VsZiA9IHRoaXM7XG5cblx0T2JqZWN0LmtleXMocGFyYW1ldGVycy5oZWFkZXJzKVxuXHRcdC5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG5cdFx0XHRpZiAoTk9OX1NBRkVfSEVBREVSUy5oYXNPd25Qcm9wZXJ0eShuYW1lLnRvTG93ZXJDYXNlKCkpKSB7XG5cdFx0XHRcdGRlbGV0ZSBwYXJhbWV0ZXJzLmhlYWRlcnNbbmFtZV07XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChmdWxmaWxsLCByZWplY3QpIHtcblx0XHR2YXIgcmVxdWVzdEVycm9yID0gbnVsbCxcblx0XHRcdHhociA9IG5ldyBzZWxmLndpbmRvdy5YTUxIdHRwUmVxdWVzdCgpO1xuXG5cdFx0eGhyLm9uYWJvcnQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXF1ZXN0RXJyb3IgPSBuZXcgRXJyb3IoRVJST1JfQUJPUlRFRCk7XG5cdFx0XHRyZWplY3QocmVxdWVzdEVycm9yKTtcblx0XHR9O1xuXHRcdHhoci5vbnRpbWVvdXQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXF1ZXN0RXJyb3IgPSBuZXcgRXJyb3IoRVJST1JfVElNRU9VVCk7XG5cdFx0XHRyZWplY3QocmVxdWVzdEVycm9yKTtcblx0XHR9O1xuXHRcdHhoci5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVxdWVzdEVycm9yID0gbmV3IEVycm9yKHhoci5zdGF0dXNUZXh0IHx8IEVSUk9SX0NPTk5FQ1RJT04pO1xuXHRcdFx0cmVqZWN0KHJlcXVlc3RFcnJvcik7XG5cdFx0fTtcblx0XHR4aHIub25sb2FkZW5kID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYgKHJlcXVlc3RFcnJvcikge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHR2YXIgc3RhdHVzT2JqZWN0ID0gZ2V0U3RhdHVzT2JqZWN0KHhociksXG5cdFx0XHRcdGNvbnRlbnQgPSBzZWxmLmNvbnZlcnRSZXNwb25zZShcblx0XHRcdFx0XHRzdGF0dXNPYmplY3QuaGVhZGVycyxcblx0XHRcdFx0XHR4aHIucmVzcG9uc2VUZXh0XG5cdFx0XHRcdCk7XG5cdFx0XHRmdWxmaWxsKHtzdGF0dXM6IHN0YXR1c09iamVjdCwgY29udGVudDogY29udGVudH0pO1xuXHRcdH07XG5cblx0XHR2YXIgdXNlciA9IHBhcmFtZXRlcnMudXJpLmF1dGhvcml0eS51c2VySW5mbyA/XG5cdFx0XHRcdHBhcmFtZXRlcnMudXJpLmF1dGhvcml0eS51c2VySW5mby51c2VyIDogbnVsbCxcblx0XHRcdHBhc3N3b3JkID0gcGFyYW1ldGVycy51cmkuYXV0aG9yaXR5LnVzZXJJbmZvID9cblx0XHRcdFx0cGFyYW1ldGVycy51cmkuYXV0aG9yaXR5LnVzZXJJbmZvLnBhc3N3b3JkIDogbnVsbDtcblx0XHR4aHIub3Blbihcblx0XHRcdHBhcmFtZXRlcnMubWV0aG9kLCBwYXJhbWV0ZXJzLnVyaS50b1N0cmluZygpLCB0cnVlLFxuXHRcdFx0dXNlciB8fCB1bmRlZmluZWQsIHBhc3N3b3JkIHx8IHVuZGVmaW5lZFxuXHRcdCk7XG5cdFx0eGhyLnRpbWVvdXQgPSBwYXJhbWV0ZXJzLnRpbWVvdXQ7XG5cblx0XHRPYmplY3Qua2V5cyhwYXJhbWV0ZXJzLmhlYWRlcnMpXG5cdFx0XHQuZm9yRWFjaChmdW5jdGlvbiAoaGVhZGVyTmFtZSkge1xuXHRcdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcihcblx0XHRcdFx0XHRoZWFkZXJOYW1lLCBwYXJhbWV0ZXJzLmhlYWRlcnNbaGVhZGVyTmFtZV1cblx0XHRcdFx0KTtcblx0XHRcdH0pO1xuXG5cdFx0eGhyLnNlbmQocGFyYW1ldGVycy5kYXRhKTtcblx0fSk7XG59O1xuXG4vKipcbiAqIEdldHMgc3RhdGUgb2JqZWN0IGZvciBzcGVjaWZpZWQgalF1ZXJ5IFhIUiBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdD99IHhociBYSFIgb2JqZWN0LlxuICogQHJldHVybnMge3tjb2RlOiBudW1iZXIsIHRleHQ6IHN0cmluZywgaGVhZGVyczogT2JqZWN0fX0gU3RhdHVzIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gZ2V0U3RhdHVzT2JqZWN0KHhocikge1xuXHR2YXIgaGVhZGVycyA9IHt9O1xuXG5cdGlmICgheGhyKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGNvZGU6IDAsXG5cdFx0XHR0ZXh0OiAnJyxcblx0XHRcdGhlYWRlcnM6IGhlYWRlcnNcblx0XHR9O1xuXHR9XG5cblx0eGhyXG5cdFx0LmdldEFsbFJlc3BvbnNlSGVhZGVycygpXG5cdFx0LnNwbGl0KCdcXG4nKVxuXHRcdC5mb3JFYWNoKGZ1bmN0aW9uIChoZWFkZXIpIHtcblx0XHRcdHZhciBkZWxpbWl0ZXJJbmRleCA9IGhlYWRlci5pbmRleE9mKCc6Jyk7XG5cdFx0XHRpZiAoZGVsaW1pdGVySW5kZXggPD0gMCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHR2YXIgaGVhZGVyTmFtZSA9IGhlYWRlclxuXHRcdFx0XHQuc3Vic3RyaW5nKDAsIGRlbGltaXRlckluZGV4KVxuXHRcdFx0XHQudHJpbSgpXG5cdFx0XHRcdC50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0aGVhZGVyc1toZWFkZXJOYW1lXSA9IGhlYWRlclxuXHRcdFx0XHQuc3Vic3RyaW5nKGRlbGltaXRlckluZGV4ICsgMSlcblx0XHRcdFx0LnRyaW0oKTtcblx0XHR9KTtcblxuXHRyZXR1cm4ge1xuXHRcdGNvZGU6IHhoci5zdGF0dXMsXG5cdFx0dGV4dDogeGhyLnN0YXR1c1RleHQsXG5cdFx0aGVhZGVyczogaGVhZGVyc1xuXHR9O1xufSIsIi8qXG4gKiBjYXRiZXJyeVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNCBEZW5pcyBSZWNoa3Vub3YgYW5kIHByb2plY3QgY29udHJpYnV0b3JzLlxuICpcbiAqIGNhdGJlcnJ5J3MgbGljZW5zZSBmb2xsb3dzOlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXG4gKiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvblxuICogZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLFxuICogaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSxcbiAqIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsXG4gKiBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuICogc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbiAqIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1NcbiAqIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiAqIFNPRlRXQVJFLlxuICpcbiAqIFRoaXMgbGljZW5zZSBhcHBsaWVzIHRvIGFsbCBwYXJ0cyBvZiBjYXRiZXJyeSB0aGF0IGFyZSBub3QgZXh0ZXJuYWxseVxuICogbWFpbnRhaW5lZCBsaWJyYXJpZXMuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgVUhSID0gcmVxdWlyZSgnLi9saWIvVUhSJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHQvKipcblx0ICogUmVnaXN0ZXJzIFVIUiBpbiBzZXJ2ZXItc2lkZSBzZXJ2aWNlIGxvY2F0b3IuXG5cdCAqIEBwYXJhbSB7U2VydmljZUxvY2F0b3J9IGxvY2F0b3IgQ2F0YmVycnkncyBzZXJ2aWNlIGxvY2F0b3IuXG5cdCAqL1xuXHRyZWdpc3RlcjogZnVuY3Rpb24gKGxvY2F0b3IpIHtcblx0XHR2YXIgY29uZmlnID0gbG9jYXRvci5yZXNvbHZlKCdjb25maWcnKTtcblx0XHRsb2NhdG9yLnJlZ2lzdGVyKCd1aHInLCBVSFIsIGNvbmZpZywgdHJ1ZSk7XG5cdH0sXG5cdFVIUjogVUhSXG59OyIsIi8qXG4gKiBjYXRiZXJyeVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNCBEZW5pcyBSZWNoa3Vub3YgYW5kIHByb2plY3QgY29udHJpYnV0b3JzLlxuICpcbiAqIGNhdGJlcnJ5J3MgbGljZW5zZSBmb2xsb3dzOlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXG4gKiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvblxuICogZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLFxuICogaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSxcbiAqIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsXG4gKiBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuICogc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbiAqIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1NcbiAqIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiAqIFNPRlRXQVJFLlxuICpcbiAqIFRoaXMgbGljZW5zZSBhcHBsaWVzIHRvIGFsbCBwYXJ0cyBvZiBjYXRiZXJyeSB0aGF0IGFyZSBub3QgZXh0ZXJuYWxseVxuICogbWFpbnRhaW5lZCBsaWJyYXJpZXMuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFVIUkJhc2U7XG5cbnZhciBjYXRiZXJyeVVyaSA9IHJlcXVpcmUoJ2NhdGJlcnJ5LXVyaScpLFxuXHRRdWVyeSA9IGNhdGJlcnJ5VXJpLlF1ZXJ5LFxuXHRVUkkgPSBjYXRiZXJyeVVyaS5VUkk7XG5cbnZhciBFUlJPUl9VTlNVUFBPUlRFRF9QUk9UT0NPTCA9ICdQcm90b2NvbCBpcyB1bnN1cHBvcnRlZCcsXG5cdEVSUk9SX1BBUkFNRVRFUlNfU0hPVUxEX0JFX09CSkVDVCA9ICdSZXF1ZXN0IHBhcmFtZXRlcnMgc2hvdWxkIGJlIG9iamVjdCcsXG5cdEVSUk9SX1VSTF9JU19SRVFVSVJFRCA9ICdVUkwgaXMgcmVxdWlyZWQgcGFyYW1ldGVyJyxcblx0RVJST1JfTUVUSE9EX0lTX1JFUVVJUkVEID0gJ1JlcXVlc3QgbWV0aG9kIGlzIHJlcXVpcmVkIHBhcmFtZXRlcicsXG5cdEVSUk9SX0hPU1RfSVNfUkVRVUlSRUQgPSAnSG9zdCBpbiBVUkwgaXMgcmVxdWlyZWQnLFxuXHRFUlJPUl9TQ0hFTUVfSVNfUkVRVUlSRUQgPSAnU2NoZW1lIGluIFVSTCBpcyByZXF1aXJlZCcsXG5cdEVSUk9SX1RJTUVPVVRfU0hPVUxEX0JFX05VTUJFUiA9ICdUaW1lb3V0IHNob3VsZCBiZSBhIG51bWJlcicsXG5cdERFRkFVTFRfVElNRU9VVCA9IDMwMDAwLFxuXHRIVFRQX1BST1RPQ09MX1JFR0VYUCA9IC9eKGh0dHApcz8kL2k7XG5cbnZhciBNRVRIT0RTID0ge1xuXHRHRVQ6ICdHRVQnLFxuXHRIRUFEOiAnSEVBRCcsXG5cdFBPU1Q6ICdQT1NUJyxcblx0UFVUOiAnUFVUJyxcblx0UEFUQ0g6ICdQQVRDSCcsXG5cdERFTEVURTogJ0RFTEVURScsXG5cdE9QVElPTlM6ICdPUFRJT05TJyxcblx0VFJBQ0U6ICdUUkFDRScsXG5cdENPTk5FQ1Q6ICdDT05ORUNUJ1xufTtcblxuVUhSQmFzZS5UWVBFUyA9IHtcblx0VVJMX0VOQ09ERUQ6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLFxuXHRKU09OOiAnYXBwbGljYXRpb24vanNvbicsXG5cdFBMQUlOX1RFWFQ6ICd0ZXh0L3BsYWluJyxcblx0SFRNTDogJ3RleHQvaHRtbCdcbn07XG5cblVIUkJhc2UuQ0hBUlNFVCA9ICdVVEYtOCc7XG5cblVIUkJhc2UuREVGQVVMVF9HRU5FUkFMX0hFQURFUlMgPSB7XG5cdEFjY2VwdDogVUhSQmFzZS5UWVBFUy5KU09OICsgJzsgcT0wLjcsICcgK1xuXHRcdFVIUkJhc2UuVFlQRVMuSFRNTCArICc7IHE9MC4yLCAnICtcblx0XHRVSFJCYXNlLlRZUEVTLlBMQUlOX1RFWFQgKyAnOyBxPTAuMScsXG5cdCdBY2NlcHQtQ2hhcnNldCc6IFVIUkJhc2UuQ0hBUlNFVCArICc7IHE9MSdcbn07XG5cblVIUkJhc2UuQ0hBUlNFVF9QQVJBTUVURVIgPSAnOyBjaGFyc2V0PScgKyBVSFJCYXNlLkNIQVJTRVQ7XG5VSFJCYXNlLlVSTF9FTkNPREVEX0VOVElUWV9DT05URU5UX1RZUEUgPSBVSFJCYXNlLlRZUEVTLlVSTF9FTkNPREVEICtcblx0VUhSQmFzZS5DSEFSU0VUX1BBUkFNRVRFUjtcblxuVUhSQmFzZS5KU09OX0VOVElUWV9DT05URU5UX1RZUEUgPSBVSFJCYXNlLlRZUEVTLkpTT04gK1xuXHRVSFJCYXNlLkNIQVJTRVRfUEFSQU1FVEVSO1xuXG5VSFJCYXNlLlBMQUlOX1RFWFRfRU5USVRZX0NPTlRFTlRfVFlQRSA9IFVIUkJhc2UuVFlQRVMuUExBSU5fVEVYVCArXG5cdFVIUkJhc2UuQ0hBUlNFVF9QQVJBTUVURVI7XG5cbi8vIFRoaXMgbW9kdWxlIHdlcmUgZGV2ZWxvcGVkIHVzaW5nIEhUVFAvMS4xdjIgUkZDIDI2MTZcbi8vIChodHRwOi8vd3d3LnczLm9yZy9Qcm90b2NvbHMvcmZjMjYxNi8pXG4vKipcbiAqIENyZWF0ZXMgbmV3IGluc3RhbmNlIG9mIEJhc2ljIFVuaXZlcnNhbCBIVFRQKFMpIFJlcXVlc3QgaW1wbGVtZW50YXRpb24uXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gVUhSQmFzZSgpIHtcblxufVxuXG4vKipcbiAqIERvZXMgR0VUIHJlcXVlc3QgdG8gSFRUUCBzZXJ2ZXIuXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFVSTCB0byByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3Q/fSBvcHRpb25zIFJlcXVlc3QgcGFyYW1ldGVycy5cbiAqIEBwYXJhbSB7T2JqZWN0P30gb3B0aW9ucy5oZWFkZXJzIEhUVFAgaGVhZGVycyB0byBzZW5kLlxuICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0P30gb3B0aW9ucy5kYXRhIERhdGEgdG8gc2VuZC5cbiAqIEBwYXJhbSB7TnVtYmVyP30gb3B0aW9ucy50aW1lb3V0IFJlcXVlc3QgdGltZW91dC5cbiAqIEBwYXJhbSB7Qm9vbGVhbj99IG9wdGlvbnMudW5zYWZlSFRUUFMgSWYgdHJ1ZSB0aGVuIHJlcXVlc3RzIHRvIHNlcnZlcnMgd2l0aFxuICogaW52YWxpZCBIVFRQUyBjZXJ0aWZpY2F0ZXMgYXJlIGFsbG93ZWQuXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxPYmplY3Q+fSBQcm9taXNlIGZvciByZXN1bHQgd2l0aCBzdGF0dXMgb2JqZWN0IGFuZCBjb250ZW50LlxuICovXG5VSFJCYXNlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXHR2YXIgcGFyYW1ldGVycyA9IE9iamVjdC5jcmVhdGUob3B0aW9ucyk7XG5cdHBhcmFtZXRlcnMubWV0aG9kID0gTUVUSE9EUy5HRVQ7XG5cdHBhcmFtZXRlcnMudXJsID0gdXJsO1xuXHRyZXR1cm4gdGhpcy5yZXF1ZXN0KHBhcmFtZXRlcnMpO1xufTtcblxuLyoqXG4gKiBEb2VzIFBPU1QgcmVxdWVzdCB0byBIVFRQIHNlcnZlci5cbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVVJMIHRvIHJlcXVlc3QuXG4gKiBAcGFyYW0ge09iamVjdD99IG9wdGlvbnMgUmVxdWVzdCBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtPYmplY3Q/fSBvcHRpb25zLmhlYWRlcnMgSFRUUCBoZWFkZXJzIHRvIHNlbmQuXG4gKiBAcGFyYW0ge1N0cmluZ3xPYmplY3Q/fSBvcHRpb25zLmRhdGEgRGF0YSB0byBzZW5kLlxuICogQHBhcmFtIHtOdW1iZXI/fSBvcHRpb25zLnRpbWVvdXQgUmVxdWVzdCB0aW1lb3V0LlxuICogQHBhcmFtIHtCb29sZWFuP30gb3B0aW9ucy51bnNhZmVIVFRQUyBJZiB0cnVlIHRoZW4gcmVxdWVzdHMgdG8gc2VydmVycyB3aXRoXG4gKiBpbnZhbGlkIEhUVFBTIGNlcnRpZmljYXRlcyBhcmUgYWxsb3dlZC5cbiAqIEByZXR1cm5zIHtQcm9taXNlPE9iamVjdD59IFByb21pc2UgZm9yIHJlc3VsdCB3aXRoIHN0YXR1cyBvYmplY3QgYW5kIGNvbnRlbnQuXG4gKi9cblVIUkJhc2UucHJvdG90eXBlLnBvc3QgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXHR2YXIgcGFyYW1ldGVycyA9IE9iamVjdC5jcmVhdGUob3B0aW9ucyk7XG5cdHBhcmFtZXRlcnMubWV0aG9kID0gTUVUSE9EUy5QT1NUO1xuXHRwYXJhbWV0ZXJzLnVybCA9IHVybDtcblx0cmV0dXJuIHRoaXMucmVxdWVzdChwYXJhbWV0ZXJzKTtcbn07XG5cbi8qKlxuICogRG9lcyBQVVQgcmVxdWVzdCB0byBIVFRQIHNlcnZlci5cbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVVJMIHRvIHJlcXVlc3QuXG4gKiBAcGFyYW0ge09iamVjdD99IG9wdGlvbnMgUmVxdWVzdCBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtPYmplY3Q/fSBvcHRpb25zLmhlYWRlcnMgSFRUUCBoZWFkZXJzIHRvIHNlbmQuXG4gKiBAcGFyYW0ge1N0cmluZ3xPYmplY3Q/fSBvcHRpb25zLmRhdGEgRGF0YSB0byBzZW5kLlxuICogQHBhcmFtIHtOdW1iZXI/fSBvcHRpb25zLnRpbWVvdXQgUmVxdWVzdCB0aW1lb3V0LlxuICogQHBhcmFtIHtCb29sZWFuP30gb3B0aW9ucy51bnNhZmVIVFRQUyBJZiB0cnVlIHRoZW4gcmVxdWVzdHMgdG8gc2VydmVycyB3aXRoXG4gKiBpbnZhbGlkIEhUVFBTIGNlcnRpZmljYXRlcyBhcmUgYWxsb3dlZC5cbiAqIEByZXR1cm5zIHtQcm9taXNlPE9iamVjdD59IFByb21pc2UgZm9yIHJlc3VsdCB3aXRoIHN0YXR1cyBvYmplY3QgYW5kIGNvbnRlbnQuXG4gKi9cblVIUkJhc2UucHJvdG90eXBlLnB1dCA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cdHZhciBwYXJhbWV0ZXJzID0gT2JqZWN0LmNyZWF0ZShvcHRpb25zKTtcblx0cGFyYW1ldGVycy5tZXRob2QgPSBNRVRIT0RTLlBVVDtcblx0cGFyYW1ldGVycy51cmwgPSB1cmw7XG5cdHJldHVybiB0aGlzLnJlcXVlc3QocGFyYW1ldGVycyk7XG59O1xuXG4vKipcbiAqIERvZXMgUEFUQ0ggcmVxdWVzdCB0byBIVFRQIHNlcnZlci5cbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVVJMIHRvIHJlcXVlc3QuXG4gKiBAcGFyYW0ge09iamVjdD99IG9wdGlvbnMgUmVxdWVzdCBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtPYmplY3Q/fSBvcHRpb25zLmhlYWRlcnMgSFRUUCBoZWFkZXJzIHRvIHNlbmQuXG4gKiBAcGFyYW0ge1N0cmluZ3xPYmplY3Q/fSBvcHRpb25zLmRhdGEgRGF0YSB0byBzZW5kLlxuICogQHBhcmFtIHtOdW1iZXI/fSBvcHRpb25zLnRpbWVvdXQgUmVxdWVzdCB0aW1lb3V0LlxuICogQHBhcmFtIHtCb29sZWFuP30gb3B0aW9ucy51bnNhZmVIVFRQUyBJZiB0cnVlIHRoZW4gcmVxdWVzdHMgdG8gc2VydmVycyB3aXRoXG4gKiBpbnZhbGlkIEhUVFBTIGNlcnRpZmljYXRlcyBhcmUgYWxsb3dlZC5cbiAqIEByZXR1cm5zIHtQcm9taXNlPE9iamVjdD59IFByb21pc2UgZm9yIHJlc3VsdCB3aXRoIHN0YXR1cyBvYmplY3QgYW5kIGNvbnRlbnQuXG4gKi9cblVIUkJhc2UucHJvdG90eXBlLnBhdGNoID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblx0dmFyIHBhcmFtZXRlcnMgPSBPYmplY3QuY3JlYXRlKG9wdGlvbnMpO1xuXHRwYXJhbWV0ZXJzLm1ldGhvZCA9IE1FVEhPRFMuUEFUQ0g7XG5cdHBhcmFtZXRlcnMudXJsID0gdXJsO1xuXHRyZXR1cm4gdGhpcy5yZXF1ZXN0KHBhcmFtZXRlcnMpO1xufTtcblxuLyoqXG4gKiBEb2VzIERFTEVURSByZXF1ZXN0IHRvIEhUVFAgc2VydmVyLlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBVUkwgdG8gcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0P30gb3B0aW9ucyBSZXF1ZXN0IHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0ge09iamVjdD99IG9wdGlvbnMuaGVhZGVycyBIVFRQIGhlYWRlcnMgdG8gc2VuZC5cbiAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdD99IG9wdGlvbnMuZGF0YSBEYXRhIHRvIHNlbmQuXG4gKiBAcGFyYW0ge051bWJlcj99IG9wdGlvbnMudGltZW91dCBSZXF1ZXN0IHRpbWVvdXQuXG4gKiBAcGFyYW0ge0Jvb2xlYW4/fSBvcHRpb25zLnVuc2FmZUhUVFBTIElmIHRydWUgdGhlbiByZXF1ZXN0cyB0byBzZXJ2ZXJzIHdpdGhcbiAqIGludmFsaWQgSFRUUFMgY2VydGlmaWNhdGVzIGFyZSBhbGxvd2VkLlxuICogQHJldHVybnMge1Byb21pc2U8T2JqZWN0Pn0gUHJvbWlzZSBmb3IgcmVzdWx0IHdpdGggc3RhdHVzIG9iamVjdCBhbmQgY29udGVudC5cbiAqL1xuVUhSQmFzZS5wcm90b3R5cGUuZGVsZXRlID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuXHR2YXIgcGFyYW1ldGVycyA9IE9iamVjdC5jcmVhdGUob3B0aW9ucyk7XG5cdHBhcmFtZXRlcnMubWV0aG9kID0gTUVUSE9EUy5ERUxFVEU7XG5cdHBhcmFtZXRlcnMudXJsID0gdXJsO1xuXHRyZXR1cm4gdGhpcy5yZXF1ZXN0KHBhcmFtZXRlcnMpO1xufTtcblxuLyoqXG4gKiBEb2VzIHJlcXVlc3Qgd2l0aCBzcGVjaWZpZWQgcGFyYW1ldGVycy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbWV0ZXJzIFJlcXVlc3QgcGFyYW1ldGVycy5cbiAqIEBwYXJhbSB7U3RyaW5nfSBwYXJhbWV0ZXJzLm1ldGhvZCBIVFRQIG1ldGhvZC5cbiAqIEBwYXJhbSB7U3RyaW5nfSBwYXJhbWV0ZXJzLnVybCBVUkwgZm9yIHJlcXVlc3QuXG4gKiBAcGFyYW0ge09iamVjdD99IHBhcmFtZXRlcnMuaGVhZGVycyBIVFRQIGhlYWRlcnMgdG8gc2VuZC5cbiAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdD99IHBhcmFtZXRlcnMuZGF0YSBEYXRhIHRvIHNlbmQuXG4gKiBAcGFyYW0ge051bWJlcj99IHBhcmFtZXRlcnMudGltZW91dCBSZXF1ZXN0IHRpbWVvdXQuXG4gKiBAcGFyYW0ge0Jvb2xlYW4/fSBwYXJhbWV0ZXJzLnVuc2FmZUhUVFBTIElmIHRydWUgdGhlbiByZXF1ZXN0c1xuICogdG8gc2VydmVycyB3aXRoIGludmFsaWQgSFRUUFMgY2VydGlmaWNhdGVzIGFyZSBhbGxvd2VkLlxuICogQHJldHVybnMge1Byb21pc2U8T2JqZWN0Pn0gUHJvbWlzZSBmb3IgcmVzdWx0IHdpdGggc3RhdHVzIG9iamVjdCBhbmQgY29udGVudC5cbiAqL1xuVUhSQmFzZS5wcm90b3R5cGUucmVxdWVzdCA9IGZ1bmN0aW9uIChwYXJhbWV0ZXJzKSB7XG5cdHZhciBzZWxmID0gdGhpcztcblx0cmV0dXJuIHRoaXMuX3ZhbGlkYXRlUmVxdWVzdChwYXJhbWV0ZXJzKVxuXHRcdC50aGVuKGZ1bmN0aW9uICh2YWxpZGF0ZWQpIHtcblx0XHRcdHJldHVybiBzZWxmLl9kb1JlcXVlc3QodmFsaWRhdGVkKTtcblx0XHR9KTtcbn07XG5cbi8qKlxuICogVmFsaWRhdGVzIFVIUiBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtPYmplY3R9IHBhcmFtZXRlcnMgUmVxdWVzdCBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtTdHJpbmd9IHBhcmFtZXRlcnMubWV0aG9kIEhUVFAgbWV0aG9kLlxuICogQHBhcmFtIHtTdHJpbmd9IHBhcmFtZXRlcnMudXJsIFVSTCBmb3IgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0P30gcGFyYW1ldGVycy5oZWFkZXJzIEhUVFAgaGVhZGVycyB0byBzZW5kLlxuICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0P30gcGFyYW1ldGVycy5kYXRhIERhdGEgdG8gc2VuZC5cbiAqIEBwYXJhbSB7TnVtYmVyP30gcGFyYW1ldGVycy50aW1lb3V0IFJlcXVlc3QgdGltZW91dC5cbiAqIEBwYXJhbSB7Qm9vbGVhbj99IHBhcmFtZXRlcnMudW5zYWZlSFRUUFMgSWYgdHJ1ZSB0aGVuIHJlcXVlc3RzXG4gKiB0byBzZXJ2ZXJzIHdpdGggaW52YWxpZCBIVFRQUyBjZXJ0aWZpY2F0ZXMgYXJlIGFsbG93ZWQuXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gUHJvbWlzZSBmb3Igbm90aGluZy5cbiAqIEBwcml2YXRlXG4gKi9cbi8qanNoaW50IG1heGNvbXBsZXhpdHk6ZmFsc2UgKi9cblVIUkJhc2UucHJvdG90eXBlLl92YWxpZGF0ZVJlcXVlc3QgPSBmdW5jdGlvbiAocGFyYW1ldGVycykge1xuXHRpZiAoIXBhcmFtZXRlcnMgfHwgdHlwZW9mKHBhcmFtZXRlcnMpICE9PSAnb2JqZWN0Jykge1xuXHRcdHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoRVJST1JfUEFSQU1FVEVSU19TSE9VTERfQkVfT0JKRUNUKSk7XG5cdH1cblxuXHR2YXIgdmFsaWRhdGVkID0gT2JqZWN0LmNyZWF0ZShwYXJhbWV0ZXJzKTtcblxuXHRpZiAodHlwZW9mKHBhcmFtZXRlcnMudXJsKSAhPT0gJ3N0cmluZycpIHtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKEVSUk9SX1VSTF9JU19SRVFVSVJFRCkpO1xuXHR9XG5cdHZhbGlkYXRlZC51cmkgPSBuZXcgVVJJKHZhbGlkYXRlZC51cmwpO1xuXHRpZiAoIXZhbGlkYXRlZC51cmkuc2NoZW1lKSB7XG5cdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihFUlJPUl9TQ0hFTUVfSVNfUkVRVUlSRUQpKTtcblx0fVxuXHRpZiAoIUhUVFBfUFJPVE9DT0xfUkVHRVhQLnRlc3QodmFsaWRhdGVkLnVyaS5zY2hlbWUpKSB7XG5cdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihFUlJPUl9VTlNVUFBPUlRFRF9QUk9UT0NPTCkpO1xuXHR9XG5cdGlmICghdmFsaWRhdGVkLnVyaS5hdXRob3JpdHkgfHwgIXZhbGlkYXRlZC51cmkuYXV0aG9yaXR5Lmhvc3QpIHtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKEVSUk9SX0hPU1RfSVNfUkVRVUlSRUQpKTtcblx0fVxuXHRpZiAodHlwZW9mKHZhbGlkYXRlZC5tZXRob2QpICE9PSAnc3RyaW5nJyB8fFxuXHRcdCEodmFsaWRhdGVkLm1ldGhvZCBpbiBNRVRIT0RTKSkge1xuXHRcdHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoRVJST1JfTUVUSE9EX0lTX1JFUVVJUkVEKSk7XG5cdH1cblxuXHR2YWxpZGF0ZWQudGltZW91dCA9IHZhbGlkYXRlZC50aW1lb3V0IHx8IERFRkFVTFRfVElNRU9VVDtcblx0aWYgKHR5cGVvZih2YWxpZGF0ZWQudGltZW91dCkgIT09ICdudW1iZXInKSB7XG5cdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihFUlJPUl9USU1FT1VUX1NIT1VMRF9CRV9OVU1CRVIpKTtcblx0fVxuXG5cdHZhbGlkYXRlZC5oZWFkZXJzID0gdGhpcy5fY3JlYXRlSGVhZGVycyh2YWxpZGF0ZWQuaGVhZGVycyk7XG5cblx0aWYgKCF0aGlzLl9pc1Vwc3RyZWFtUmVxdWVzdChwYXJhbWV0ZXJzLm1ldGhvZCkgJiZcblx0XHR2YWxpZGF0ZWQuZGF0YSAmJiB0eXBlb2YodmFsaWRhdGVkLmRhdGEpID09PSAnb2JqZWN0Jykge1xuXG5cdFx0dmFyIGRhdGFLZXlzID0gT2JqZWN0LmtleXModmFsaWRhdGVkLmRhdGEpO1xuXG5cdFx0aWYgKGRhdGFLZXlzLmxlbmd0aCA+IDAgJiYgIXZhbGlkYXRlZC51cmkucXVlcnkpIHtcblx0XHRcdHZhbGlkYXRlZC51cmkucXVlcnkgPSBuZXcgUXVlcnkoJycpO1xuXHRcdH1cblxuXHRcdGRhdGFLZXlzLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdFx0dmFsaWRhdGVkLnVyaS5xdWVyeS52YWx1ZXNba2V5XSA9IHZhbGlkYXRlZC5kYXRhW2tleV07XG5cdFx0fSk7XG5cdFx0dmFsaWRhdGVkLmRhdGEgPSBudWxsO1xuXHR9IGVsc2Uge1xuXHRcdHZhciBkYXRhQW5kSGVhZGVycyA9IHRoaXMuX2dldERhdGFUb1NlbmQoXG5cdFx0XHR2YWxpZGF0ZWQuaGVhZGVycywgdmFsaWRhdGVkLmRhdGFcblx0XHQpO1xuXHRcdHZhbGlkYXRlZC5oZWFkZXJzID0gZGF0YUFuZEhlYWRlcnMuaGVhZGVycztcblx0XHR2YWxpZGF0ZWQuZGF0YSA9IGRhdGFBbmRIZWFkZXJzLmRhdGE7XG5cdH1cblxuXHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHZhbGlkYXRlZCk7XG59O1xuXG4vKipcbiAqIEdldHMgZGF0YSBmb3Igc2VuZGluZyB2aWEgSFRUUCByZXF1ZXN0IHVzaW5nIENvbnRlbnQgVHlwZSBIVFRQIGhlYWRlci5cbiAqIEBwYXJhbSB7T2JqZWN0fSBoZWFkZXJzIEhUVFAgaGVhZGVycy5cbiAqIEBwYXJhbSB7T2JqZWN0fHN0cmluZ30gZGF0YSBEYXRhIHRvIHNlbmQuXG4gKiBAcmV0dXJucyB7e2hlYWRlcnM6IE9iamVjdCwgZGF0YTogT2JqZWN0fFN0cmluZ319IERhdGEgYW5kIGhlYWRlcnMgdG8gc2VuZC5cbiAqIEBwcml2YXRlXG4gKi9cblVIUkJhc2UucHJvdG90eXBlLl9nZXREYXRhVG9TZW5kID0gZnVuY3Rpb24gKGhlYWRlcnMsIGRhdGEpIHtcblx0dmFyIGZvdW5kID0gZmluZENvbnRlbnRUeXBlKGhlYWRlcnMpLFxuXHRcdGNvbnRlbnRUeXBlSGVhZGVyID0gZm91bmQubmFtZSxcblx0XHRjb250ZW50VHlwZSA9IGZvdW5kLnR5cGU7XG5cblx0aWYgKCFkYXRhIHx8IHR5cGVvZihkYXRhKSAhPT0gJ29iamVjdCcpIHtcblx0XHRkYXRhID0gZGF0YSA/IFN0cmluZyhkYXRhKSA6ICcnO1xuXHRcdGlmICghY29udGVudFR5cGUpIHtcblx0XHRcdGhlYWRlcnNbY29udGVudFR5cGVIZWFkZXJdID0gVUhSQmFzZS5QTEFJTl9URVhUX0VOVElUWV9DT05URU5UX1RZUEU7XG5cdFx0fVxuXHRcdHJldHVybiB7XG5cdFx0XHRoZWFkZXJzOiBoZWFkZXJzLFxuXHRcdFx0ZGF0YTogZGF0YVxuXHRcdH07XG5cdH1cblxuXHRpZiAoY29udGVudFR5cGUgPT09IFVIUkJhc2UuVFlQRVMuSlNPTikge1xuXHRcdHJldHVybiB7XG5cdFx0XHRoZWFkZXJzOiBoZWFkZXJzLFxuXHRcdFx0ZGF0YTogSlNPTi5zdHJpbmdpZnkoZGF0YSlcblx0XHR9O1xuXHR9XG5cblx0Ly8gb3RoZXJ3aXNlIG9iamVjdCB3aWxsIGJlIHNlbnQgd2l0aFxuXHQvLyBhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcblx0aGVhZGVyc1tjb250ZW50VHlwZUhlYWRlcl0gPSBVSFJCYXNlLlVSTF9FTkNPREVEX0VOVElUWV9DT05URU5UX1RZUEU7XG5cblx0dmFyIHF1ZXJ5ID0gbmV3IFF1ZXJ5KCk7XG5cdHF1ZXJ5LnZhbHVlcyA9IGRhdGE7XG5cdHJldHVybiB7XG5cdFx0aGVhZGVyczogaGVhZGVycyxcblx0XHRkYXRhOiBxdWVyeS50b1N0cmluZygpXG5cdFx0XHQucmVwbGFjZSgnKycsICclMkInKVxuXHRcdFx0LnJlcGxhY2UoJyUyMCcsICcrJylcblx0fTtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBIVFRQIGhlYWRlcnMgZm9yIHJlcXVlc3QgdXNpbmcgZGVmYXVsdHMgYW5kIGN1cnJlbnQgcGFyYW1ldGVycy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbWV0ZXJIZWFkZXJzIEhUVFAgaGVhZGVycyBvZiBVSFIuXG4gKiBAcHJvdGVjdGVkXG4gKi9cblVIUkJhc2UucHJvdG90eXBlLl9jcmVhdGVIZWFkZXJzID0gZnVuY3Rpb24gKHBhcmFtZXRlckhlYWRlcnMpIHtcblx0aWYgKCFwYXJhbWV0ZXJIZWFkZXJzIHx8IHR5cGVvZihwYXJhbWV0ZXJIZWFkZXJzKSAhPT0gJ29iamVjdCcpIHtcblx0XHRwYXJhbWV0ZXJIZWFkZXJzID0ge307XG5cdH1cblx0dmFyIGhlYWRlcnMgPSB7fTtcblxuXHRPYmplY3Qua2V5cyhVSFJCYXNlLkRFRkFVTFRfR0VORVJBTF9IRUFERVJTKVxuXHRcdC5mb3JFYWNoKGZ1bmN0aW9uIChoZWFkZXJOYW1lKSB7XG5cdFx0XHRoZWFkZXJzW2hlYWRlck5hbWVdID0gVUhSQmFzZS5ERUZBVUxUX0dFTkVSQUxfSEVBREVSU1toZWFkZXJOYW1lXTtcblx0XHR9KTtcblxuXHRPYmplY3Qua2V5cyhwYXJhbWV0ZXJIZWFkZXJzKVxuXHRcdC5mb3JFYWNoKGZ1bmN0aW9uIChoZWFkZXJOYW1lKSB7XG5cdFx0XHRpZiAocGFyYW1ldGVySGVhZGVyc1toZWFkZXJOYW1lXSA9PT0gbnVsbCB8fFxuXHRcdFx0XHRwYXJhbWV0ZXJIZWFkZXJzW2hlYWRlck5hbWVdID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0ZGVsZXRlIGhlYWRlcnNbaGVhZGVyTmFtZV07XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdGhlYWRlcnNbaGVhZGVyTmFtZV0gPSBwYXJhbWV0ZXJIZWFkZXJzW2hlYWRlck5hbWVdO1xuXHRcdH0pO1xuXG5cdHJldHVybiBoZWFkZXJzO1xufTtcblxuLyoqXG4gKiBEb2VzIHJlcXVlc3Qgd2l0aCBzcGVjaWZpZWQgcGFyYW1ldGVycyB1c2luZyBwcm90b2NvbCBpbXBsZW1lbnRhdGlvbi5cbiAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbWV0ZXJzIFJlcXVlc3QgcGFyYW1ldGVycy5cbiAqIEBwYXJhbSB7U3RyaW5nfSBwYXJhbWV0ZXJzLm1ldGhvZCBIVFRQIG1ldGhvZC5cbiAqIEBwYXJhbSB7U3RyaW5nfSBwYXJhbWV0ZXJzLnVybCBVUkwgZm9yIHJlcXVlc3QuXG4gKiBAcGFyYW0ge1VSSX0gcGFyYW1ldGVycy51cmkgVVJJIG9iamVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbWV0ZXJzLmhlYWRlcnMgSFRUUCBoZWFkZXJzIHRvIHNlbmQuXG4gKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IHBhcmFtZXRlcnMuZGF0YSBEYXRhIHRvIHNlbmQuXG4gKiBAcGFyYW0ge051bWJlcn0gcGFyYW1ldGVycy50aW1lb3V0IFJlcXVlc3QgdGltZW91dC5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gcGFyYW1ldGVycy51bnNhZmVIVFRQUyBJZiB0cnVlIHRoZW4gcmVxdWVzdHMgdG8gc2VydmVycyB3aXRoXG4gKiBpbnZhbGlkIEhUVFBTIGNlcnRpZmljYXRlcyBhcmUgYWxsb3dlZC5cbiAqIEByZXR1cm5zIHtQcm9taXNlPE9iamVjdD59IFByb21pc2UgZm9yIHJlc3VsdCB3aXRoIHN0YXR1cyBvYmplY3QgYW5kIGNvbnRlbnQuXG4gKiBAcHJvdGVjdGVkXG4gKiBAYWJzdHJhY3RcbiAqL1xuVUhSQmFzZS5wcm90b3R5cGUuX2RvUmVxdWVzdCA9IGZ1bmN0aW9uIChwYXJhbWV0ZXJzKSB7XG59O1xuXG4vKipcbiAqIENvbnZlcnRzIHJlc3BvbnNlIGRhdGEgYWNjb3JkaW5nIGNvbnRlbnQgdHlwZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBoZWFkZXJzIEhUVFAgaGVhZGVycy5cbiAqIEBwYXJhbSB7c3RyaW5nfSByZXNwb25zZURhdGEgRGF0YSBmcm9tIHJlc3BvbnNlLlxuICogQHJldHVybnMge3N0cmluZ3xPYmplY3R9IENvbnZlcnRlZCBkYXRhLlxuICovXG5VSFJCYXNlLnByb3RvdHlwZS5jb252ZXJ0UmVzcG9uc2UgPSBmdW5jdGlvbiAoaGVhZGVycywgcmVzcG9uc2VEYXRhKSB7XG5cdGlmICh0eXBlb2YocmVzcG9uc2VEYXRhKSAhPT0gJ3N0cmluZycpIHtcblx0XHRyZXNwb25zZURhdGEgPSAnJztcblx0fVxuXHR2YXIgZm91bmQgPSBmaW5kQ29udGVudFR5cGUoaGVhZGVycyksXG5cdFx0Y29udGVudFR5cGUgPSBmb3VuZC50eXBlIHx8IFVIUkJhc2UuVFlQRVMuUExBSU5fVEVYVDtcblxuXHRzd2l0Y2ggKGNvbnRlbnRUeXBlKSB7XG5cdFx0Y2FzZSBVSFJCYXNlLlRZUEVTLkpTT046XG5cdFx0XHR2YXIganNvbjtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGpzb24gPSBKU09OLnBhcnNlKHJlc3BvbnNlRGF0YSk7XG5cdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdC8vIG5vdGhpbmcgdG8gZG9cblx0XHRcdH1cblx0XHRcdHJldHVybiBqc29uIHx8IHt9O1xuXHRcdGNhc2UgVUhSQmFzZS5UWVBFUy5VUkxfRU5DT0RFRDpcblx0XHRcdHZhciBvYmplY3Q7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHR2YXIgcXVlcnkgPSBuZXcgUXVlcnkocmVzcG9uc2VEYXRhLnJlcGxhY2UoJysnLCAnJTIwJykpO1xuXHRcdFx0XHRvYmplY3QgPSBxdWVyeS52YWx1ZXM7XG5cdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdC8vIG5vdGhpbmcgdG8gZG9cblx0XHRcdH1cblx0XHRcdHJldHVybiBvYmplY3QgfHwge307XG5cdFx0ZGVmYXVsdDpcblx0XHRcdHJldHVybiByZXNwb25zZURhdGE7XG5cdH1cbn07XG5cbi8qKlxuICogRGV0ZXJtaW5lcyBpcyBjdXJyZW50IHF1ZXJ5IG5lZWRzIHRvIHVzZSB1cHN0cmVhbS5cbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXRob2QgSFRUUCBtZXRob2QuXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gSXMgY3VycmVudCBIVFRQIG1ldGhvZCBtZWFucyB1cHN0cmVhbSB1c2FnZS5cbiAqIEBwcm90ZWN0ZWRcbiAqL1xuVUhSQmFzZS5wcm90b3R5cGUuX2lzVXBzdHJlYW1SZXF1ZXN0ID0gZnVuY3Rpb24gKG1ldGhvZCkge1xuXHRyZXR1cm4gKFxuXHRcdG1ldGhvZCA9PT0gTUVUSE9EUy5QT1NUIHx8XG5cdFx0bWV0aG9kID09PSBNRVRIT0RTLlBVVCB8fFxuXHRcdG1ldGhvZCA9PT0gTUVUSE9EUy5QQVRDSFxuXHRcdCk7XG59O1xuXG4vKipcbiAqIEZpbmRzIGNvbnRlbnQgdHlwZSBoZWFkZXIgaW4gaGVhZGVycyBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdH0gaGVhZGVycyBIVFRQIGhlYWRlcnMuXG4gKiBAcmV0dXJucyB7e25hbWU6IFN0cmluZywgdHlwZTogU3RyaW5nfX0gTmFtZSBvZiBoZWFkZXIgYW5kIGNvbnRlbnQgdHlwZS5cbiAqL1xuZnVuY3Rpb24gZmluZENvbnRlbnRUeXBlKGhlYWRlcnMpIHtcblx0dmFyIGNvbnRlbnRUeXBlU3RyaW5nID0gJycsXG5cdFx0Y29udGVudFR5cGVIZWFkZXIgPSAnQ29udGVudC1UeXBlJztcblxuXHRPYmplY3Qua2V5cyhoZWFkZXJzKVxuXHRcdC5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRcdGlmIChrZXkudG9Mb3dlckNhc2UoKSAhPT0gJ2NvbnRlbnQtdHlwZScpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0Y29udGVudFR5cGVIZWFkZXIgPSBrZXk7XG5cdFx0XHRjb250ZW50VHlwZVN0cmluZyA9IGhlYWRlcnNba2V5XTtcblx0XHR9KTtcblxuXHR2YXIgdHlwZUFuZFBhcmFtZXRlcnMgPSBjb250ZW50VHlwZVN0cmluZy5zcGxpdCgnOycpLFxuXHRcdGNvbnRlbnRUeXBlID0gdHlwZUFuZFBhcmFtZXRlcnNbMF0udG9Mb3dlckNhc2UoKTtcblx0cmV0dXJuIHtcblx0XHRuYW1lOiBjb250ZW50VHlwZUhlYWRlcixcblx0XHR0eXBlOiBjb250ZW50VHlwZVxuXHR9O1xufSIsIi8qXG4gKiBjYXRiZXJyeVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNCBEZW5pcyBSZWNoa3Vub3YgYW5kIHByb2plY3QgY29udHJpYnV0b3JzLlxuICpcbiAqIGNhdGJlcnJ5J3MgbGljZW5zZSBmb2xsb3dzOlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXG4gKiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvblxuICogZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLFxuICogaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSxcbiAqIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsXG4gKiBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuICogc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbiAqIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1NcbiAqIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiAqIFNPRlRXQVJFLlxuICpcbiAqIFRoaXMgbGljZW5zZSBhcHBsaWVzIHRvIGFsbCBwYXJ0cyBvZiBjYXRiZXJyeSB0aGF0IGFyZSBub3QgZXh0ZXJuYWxseVxuICogbWFpbnRhaW5lZCBsaWJyYXJpZXMuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0VVJJOiByZXF1aXJlKCcuL2xpYi9VUkknKSxcblx0QXV0aG9yaXR5OiByZXF1aXJlKCcuL2xpYi9BdXRob3JpdHknKSxcblx0VXNlckluZm86IHJlcXVpcmUoJy4vbGliL1VzZXJJbmZvJyksXG5cdFF1ZXJ5OiByZXF1aXJlKCcuL2xpYi9RdWVyeScpXG59OyIsIi8qXG4gKiBjYXRiZXJyeS11cmlcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgRGVuaXMgUmVjaGt1bm92IGFuZCBwcm9qZWN0IGNvbnRyaWJ1dG9ycy5cbiAqXG4gKiBjYXRiZXJyeS11cmkncyBsaWNlbnNlIGZvbGxvd3M6XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb25cbiAqIG9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uXG4gKiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sXG4gKiBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLFxuICogcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSxcbiAqIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4gKiBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuICogaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuICogT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKlxuICogVGhpcyBsaWNlbnNlIGFwcGxpZXMgdG8gYWxsIHBhcnRzIG9mIGNhdGJlcnJ5LXVyaSB0aGF0IGFyZSBub3QgZXh0ZXJuYWxseVxuICogbWFpbnRhaW5lZCBsaWJyYXJpZXMuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEF1dGhvcml0eTtcblxudmFyIFVzZXJJbmZvID0gcmVxdWlyZSgnLi9Vc2VySW5mbycpLFxuXHRwZXJjZW50RW5jb2RpbmdIZWxwZXIgPSByZXF1aXJlKCcuL3BlcmNlbnRFbmNvZGluZ0hlbHBlcicpO1xuXG52YXIgUE9SVF9SRUdFWFAgPSAvXlxcZCskLyxcblx0RVJST1JfUE9SVCA9ICdVUkkgYXV0aG9yaXR5IHBvcnQgbXVzdCBzYXRpc2Z5IGV4cHJlc3Npb24gJyArXG5cdFx0UE9SVF9SRUdFWFAudG9TdHJpbmcoKTtcblxuLyoqXG4gKiBDcmVhdGVzIG5ldyBpbnN0YW5jZSBvZiBVUkkgYXV0aG9yaXR5IGNvbXBvbmVudCBwYXJzZXIuXG4gKiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzk4NiNzZWN0aW9uLTMuMlxuICogQHBhcmFtIHtTdHJpbmc/fSBhdXRob3JpdHlTdHJpbmcgVVJJIGF1dGhvcml0eSBjb21wb25lbnQgc3RyaW5nLlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIEF1dGhvcml0eShhdXRob3JpdHlTdHJpbmcpIHtcblx0aWYgKHR5cGVvZihhdXRob3JpdHlTdHJpbmcpID09PSAnc3RyaW5nJyAmJiBhdXRob3JpdHlTdHJpbmcubGVuZ3RoID4gMCkge1xuXHRcdHZhciBmaXJzdEF0SW5kZXggPSBhdXRob3JpdHlTdHJpbmcuaW5kZXhPZignQCcpO1xuXHRcdGlmIChmaXJzdEF0SW5kZXggIT09IC0xKSB7XG5cdFx0XHR2YXIgdXNlckluZm9TdHJpbmcgPSBhdXRob3JpdHlTdHJpbmcuc3Vic3RyaW5nKDAsIGZpcnN0QXRJbmRleCk7XG5cdFx0XHR0aGlzLnVzZXJJbmZvID0gbmV3IFVzZXJJbmZvKHVzZXJJbmZvU3RyaW5nKTtcblx0XHRcdGF1dGhvcml0eVN0cmluZyA9IGF1dGhvcml0eVN0cmluZy5zdWJzdHJpbmcoZmlyc3RBdEluZGV4ICsgMSk7XG5cdFx0fVxuXG5cdFx0dmFyIGxhc3RDb2xvbkluZGV4ID0gYXV0aG9yaXR5U3RyaW5nLmxhc3RJbmRleE9mKCc6Jyk7XG5cdFx0aWYgKGxhc3RDb2xvbkluZGV4ICE9PSAtMSkge1xuXHRcdFx0dmFyIHBvcnRTdHJpbmcgPSBhdXRob3JpdHlTdHJpbmcuc3Vic3RyaW5nKGxhc3RDb2xvbkluZGV4ICsgMSk7XG5cdFx0XHRpZiAobGFzdENvbG9uSW5kZXggPT09IGF1dGhvcml0eVN0cmluZy5sZW5ndGggLSAxKSB7XG5cdFx0XHRcdHRoaXMucG9ydCA9ICcnO1xuXHRcdFx0XHRhdXRob3JpdHlTdHJpbmcgPSBhdXRob3JpdHlTdHJpbmcuc3Vic3RyaW5nKDAsIGxhc3RDb2xvbkluZGV4KTtcblx0XHRcdH1lbHNlIGlmIChQT1JUX1JFR0VYUC50ZXN0KHBvcnRTdHJpbmcpKSB7XG5cdFx0XHRcdHRoaXMucG9ydCA9IHBvcnRTdHJpbmc7XG5cdFx0XHRcdGF1dGhvcml0eVN0cmluZyA9IGF1dGhvcml0eVN0cmluZy5zdWJzdHJpbmcoMCwgbGFzdENvbG9uSW5kZXgpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRoaXMuaG9zdCA9IHBlcmNlbnRFbmNvZGluZ0hlbHBlci5kZWNvZGUoYXV0aG9yaXR5U3RyaW5nKTtcblx0fVxufVxuXG4vKipcbiAqIEN1cnJlbnQgdXNlciBpbmZvcm1hdGlvbi5cbiAqIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzOTg2I3NlY3Rpb24tMy4yLjFcbiAqIEB0eXBlIHtVc2VySW5mb31cbiAqL1xuQXV0aG9yaXR5LnByb3RvdHlwZS51c2VySW5mbyA9IG51bGw7XG5cbi8qKlxuICogQ3VycmVudCBob3N0LlxuICogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzM5ODYjc2VjdGlvbi0zLjIuMlxuICogQHR5cGUge1N0cmluZ31cbiAqL1xuQXV0aG9yaXR5LnByb3RvdHlwZS5ob3N0ID0gbnVsbDtcblxuLyoqXG4gKiBDdXJyZW50IHBvcnQuXG4gKiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzk4NiNzZWN0aW9uLTMuMi4zXG4gKiBAdHlwZSB7U3RyaW5nfVxuICovXG5BdXRob3JpdHkucHJvdG90eXBlLnBvcnQgPSBudWxsO1xuXG4vKipcbiAqIENsb25lcyBjdXJyZW50IGF1dGhvcml0eS5cbiAqIEByZXR1cm5zIHtBdXRob3JpdHl9IE5ldyBjbG9uZSBvZiBjdXJyZW50IG9iamVjdC5cbiAqL1xuQXV0aG9yaXR5LnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uICgpIHtcblx0dmFyIGF1dGhvcml0eSA9IG5ldyBBdXRob3JpdHkoKTtcblx0aWYgKHRoaXMudXNlckluZm8pIHtcblx0XHRhdXRob3JpdHkudXNlckluZm8gPSB0aGlzLnVzZXJJbmZvLmNsb25lKCk7XG5cdH1cblx0aWYgKHR5cGVvZih0aGlzLmhvc3QpID09PSAnc3RyaW5nJykge1xuXHRcdGF1dGhvcml0eS5ob3N0ID0gdGhpcy5ob3N0O1xuXHR9XG5cdGlmICh0eXBlb2YodGhpcy5wb3J0KSA9PT0gJ3N0cmluZycpIHtcblx0XHRhdXRob3JpdHkucG9ydCA9IHRoaXMucG9ydDtcblx0fVxuXHRyZXR1cm4gYXV0aG9yaXR5O1xufTtcblxuLyoqXG4gKiBSZWNvbWJpbmUgYWxsIGF1dGhvcml0eSBjb21wb25lbnRzIGludG8gYXV0aG9yaXR5IHN0cmluZy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IEF1dGhvcml0eSBjb21wb25lbnQgc3RyaW5nLlxuICovXG5BdXRob3JpdHkucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuXHR2YXIgcmVzdWx0ID0gJyc7XG5cdGlmICh0aGlzLnVzZXJJbmZvKSB7XG5cdFx0cmVzdWx0ICs9IHRoaXMudXNlckluZm8udG9TdHJpbmcoKSArICdAJztcblx0fVxuXHRpZiAodGhpcy5ob3N0ICE9PSB1bmRlZmluZWQgJiYgdGhpcy5ob3N0ICE9PSBudWxsKSB7XG5cdFx0dmFyIGhvc3QgPSBTdHJpbmcodGhpcy5ob3N0KTtcblx0XHRyZXN1bHQgKz0gcGVyY2VudEVuY29kaW5nSGVscGVyLmVuY29kZUhvc3QoaG9zdCk7XG5cdH1cblx0aWYgKHRoaXMucG9ydCAhPT0gdW5kZWZpbmVkICYmIHRoaXMucG9ydCAhPT0gbnVsbCkge1xuXHRcdHZhciBwb3J0ID0gU3RyaW5nKHRoaXMucG9ydCk7XG5cdFx0aWYgKHBvcnQubGVuZ3RoID4gMCAmJiAhUE9SVF9SRUdFWFAudGVzdChwb3J0KSkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKEVSUk9SX1BPUlQpO1xuXHRcdH1cblx0XHRyZXN1bHQgKz0gJzonICsgcG9ydDtcblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvKlxuICogY2F0YmVycnktdXJpXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0IERlbmlzIFJlY2hrdW5vdiBhbmQgcHJvamVjdCBjb250cmlidXRvcnMuXG4gKlxuICogY2F0YmVycnktdXJpJ3MgbGljZW5zZSBmb2xsb3dzOlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXG4gKiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvblxuICogZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLFxuICogaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSxcbiAqIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsXG4gKiBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuICogc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbiAqIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1NcbiAqIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICpcbiAqIFRoaXMgbGljZW5zZSBhcHBsaWVzIHRvIGFsbCBwYXJ0cyBvZiBjYXRiZXJyeS11cmkgdGhhdCBhcmUgbm90IGV4dGVybmFsbHlcbiAqIG1haW50YWluZWQgbGlicmFyaWVzLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBRdWVyeTtcblxudmFyIHBlcmNlbnRFbmNvZGluZ0hlbHBlciA9IHJlcXVpcmUoJy4vcGVyY2VudEVuY29kaW5nSGVscGVyJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBuZXcgaW5zdGFuY2Ugb2YgVVJJIHF1ZXJ5IGNvbXBvbmVudCBwYXJzZXIuXG4gKiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzk4NiNzZWN0aW9uLTMuNFxuICogQHBhcmFtIHtTdHJpbmc/fSBxdWVyeVN0cmluZyBVUkkgcXVlcnkgY29tcG9uZW50IHN0cmluZy5cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBRdWVyeShxdWVyeVN0cmluZykge1xuXHRpZiAodHlwZW9mKHF1ZXJ5U3RyaW5nKSA9PT0gJ3N0cmluZycpIHtcblx0XHR0aGlzLnZhbHVlcyA9IHt9O1xuXG5cdFx0cXVlcnlTdHJpbmdcblx0XHRcdC5zcGxpdCgnJicpXG5cdFx0XHQuZm9yRWFjaChmdW5jdGlvbiAocGFpcikge1xuXHRcdFx0XHR2YXIgcGFydHMgPSBwYWlyLnNwbGl0KCc9JyksXG5cdFx0XHRcdFx0a2V5ID0gcGVyY2VudEVuY29kaW5nSGVscGVyLmRlY29kZShwYXJ0c1swXSk7XG5cdFx0XHRcdGlmICgha2V5KSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChrZXkgaW4gdGhpcy52YWx1ZXMgJiZcblx0XHRcdFx0XHQhKHRoaXMudmFsdWVzW2tleV0gaW5zdGFuY2VvZiBBcnJheSkpIHtcblx0XHRcdFx0XHR0aGlzLnZhbHVlc1trZXldID0gW3RoaXMudmFsdWVzW2tleV1dO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIHZhbHVlID0gdHlwZW9mKHBhcnRzWzFdKSA9PT0gJ3N0cmluZycgP1xuXHRcdFx0XHRcdHBlcmNlbnRFbmNvZGluZ0hlbHBlci5kZWNvZGUocGFydHNbMV0pIDogbnVsbDtcblxuXHRcdFx0XHRpZiAodGhpcy52YWx1ZXNba2V5XSBpbnN0YW5jZW9mIEFycmF5KSB7XG5cdFx0XHRcdFx0dGhpcy52YWx1ZXNba2V5XS5wdXNoKHZhbHVlKTtcblx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0dGhpcy52YWx1ZXNba2V5XSA9IHZhbHVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9LCB0aGlzKTtcblx0fVxufVxuXG4vKipcbiAqIEN1cnJlbnQgc2V0IG9mIHZhbHVlcyBvZiBxdWVyeS5cbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cblF1ZXJ5LnByb3RvdHlwZS52YWx1ZXMgPSBudWxsO1xuXG4vKipcbiAqIENsb25lcyBjdXJyZW50IHF1ZXJ5IHRvIGEgbmV3IG9iamVjdC5cbiAqIEByZXR1cm5zIHtRdWVyeX0gTmV3IGNsb25lIG9mIGN1cnJlbnQgb2JqZWN0LlxuICovXG5RdWVyeS5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbiAoKSB7XG5cdHZhciBxdWVyeSA9IG5ldyBRdWVyeSgpO1xuXHRpZiAodGhpcy52YWx1ZXMpIHtcblx0XHRxdWVyeS52YWx1ZXMgPSB7fTtcblx0XHRPYmplY3Qua2V5cyh0aGlzLnZhbHVlcylcblx0XHRcdC5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRcdFx0cXVlcnkudmFsdWVzW2tleV0gPSB0aGlzLnZhbHVlc1trZXldO1xuXHRcdFx0fSwgdGhpcyk7XG5cdH1cblx0cmV0dXJuIHF1ZXJ5O1xufTtcblxuLyoqXG4gKiBDb252ZXJ0cyBjdXJyZW50IHNldCBvZiBxdWVyeSB2YWx1ZXMgdG8gc3RyaW5nLlxuICogQHJldHVybnMge3N0cmluZ30gUXVlcnkgY29tcG9uZW50IHN0cmluZy5cbiAqL1xuUXVlcnkucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuXHRpZiAoIXRoaXMudmFsdWVzKSB7XG5cdFx0cmV0dXJuICcnO1xuXHR9XG5cblx0dmFyIHF1ZXJ5U3RyaW5nID0gJyc7XG5cdE9iamVjdC5rZXlzKHRoaXMudmFsdWVzKVxuXHRcdC5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRcdHZhciB2YWx1ZXMgPSB0aGlzLnZhbHVlc1trZXldIGluc3RhbmNlb2YgQXJyYXkgP1xuXHRcdFx0XHR0aGlzLnZhbHVlc1trZXldIDogW3RoaXMudmFsdWVzW2tleV1dO1xuXG5cdFx0XHR2YWx1ZXMuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUpIHtcblx0XHRcdFx0cXVlcnlTdHJpbmcgKz0gJyYnICsgcGVyY2VudEVuY29kaW5nSGVscGVyXG5cdFx0XHRcdFx0LmVuY29kZVF1ZXJ5U3ViQ29tcG9uZW50KGtleSk7XG5cdFx0XHRcdGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHZhbHVlID0gU3RyaW5nKHZhbHVlKTtcblx0XHRcdFx0cXVlcnlTdHJpbmcgKz0gJz0nICtcblx0XHRcdFx0XHRwZXJjZW50RW5jb2RpbmdIZWxwZXIuZW5jb2RlUXVlcnlTdWJDb21wb25lbnQodmFsdWUpO1xuXHRcdFx0fSk7XG5cdFx0fSwgdGhpcyk7XG5cblx0cmV0dXJuIHF1ZXJ5U3RyaW5nLnJlcGxhY2UoL14mLywgJycpO1xufTsiLCIvKlxuICogY2F0YmVycnlcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgRGVuaXMgUmVjaGt1bm92IGFuZCBwcm9qZWN0IGNvbnRyaWJ1dG9ycy5cbiAqXG4gKiBjYXRiZXJyeSdzIGxpY2Vuc2UgZm9sbG93czpcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvblxuICogb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb25cbiAqIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbixcbiAqIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsXG4gKiBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLFxuICogYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbiAqIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4gKiBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4gKiBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqXG4gKiBUaGlzIGxpY2Vuc2UgYXBwbGllcyB0byBhbGwgcGFydHMgb2YgY2F0YmVycnkgdGhhdCBhcmUgbm90IGV4dGVybmFsbHlcbiAqIG1haW50YWluZWQgbGlicmFyaWVzLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBVUkk7XG5cbnZhciBBdXRob3JpdHkgPSByZXF1aXJlKCcuL0F1dGhvcml0eScpLFxuXHRwZXJjZW50RW5jb2RpbmdIZWxwZXIgPSByZXF1aXJlKCcuL3BlcmNlbnRFbmNvZGluZ0hlbHBlcicpLFxuXHRRdWVyeSA9IHJlcXVpcmUoJy4vUXVlcnknKTtcblxuXHQvLyBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzk4NiNhcHBlbmRpeC1CXG52YXIgVVJJX1BBUlNFX1JFR0VYUCA9IG5ldyBSZWdFeHAoXG5cdFx0J14oKFteOi8/I10rKTopPygvLyhbXi8/I10qKSk/KFtePyNdKikoXFxcXD8oW14jXSopKT8oIyguKikpPydcblx0KSxcblx0Ly8gaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzM5ODYjc2VjdGlvbi0zLjFcblx0U0NIRU1FX1JFR0VYUCA9IC9eW2Etel0rW2EtelxcZFxcK1xcLi1dKiQvaSxcblx0RVJST1JfU0NIRU1FID0gJ1VSSSBzY2hlbWUgbXVzdCBzYXRpc2Z5IGV4cHJlc3Npb24gJyArXG5cdFx0U0NIRU1FX1JFR0VYUC50b1N0cmluZygpLFxuXHRFUlJPUl9CQVNFX1NDSEVNRSA9ICdTY2hlbWUgY29tcG9uZW50IGlzIHJlcXVpcmVkIHRvIGJlIHByZXNlbnQgJyArXG5cdFx0J2luIGEgYmFzZSBVUkknO1xuXG4vKipcbiAqIENyZWF0ZXMgbmV3IGluc3RhbmNlIG9mIFVSSSBhY2NvcmRpbmcgdG8gUkZDIDM5ODYuXG4gKiBAcGFyYW0ge1N0cmluZz99IHVyaVN0cmluZyBVUkkgc3RyaW5nIHRvIHBhcnNlIGNvbXBvbmVudHMuXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gVVJJKHVyaVN0cmluZykge1xuXHRpZiAodHlwZW9mKHVyaVN0cmluZykgIT09ICdzdHJpbmcnKSB7XG5cdFx0dXJpU3RyaW5nID0gJyc7XG5cdH1cblxuXHQvLyBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzk4NiNhcHBlbmRpeC1CXG5cdHZhciBtYXRjaGVzID0gdXJpU3RyaW5nLm1hdGNoKFVSSV9QQVJTRV9SRUdFWFApO1xuXG5cdGlmIChtYXRjaGVzKSB7XG5cdFx0aWYgKHR5cGVvZihtYXRjaGVzWzJdKSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdHRoaXMuc2NoZW1lID0gcGVyY2VudEVuY29kaW5nSGVscGVyLmRlY29kZShtYXRjaGVzWzJdKTtcblx0XHR9XG5cdFx0aWYgKHR5cGVvZihtYXRjaGVzWzRdKSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdHRoaXMuYXV0aG9yaXR5ID0gbmV3IEF1dGhvcml0eShtYXRjaGVzWzRdKTtcblx0XHR9XG5cdFx0aWYgKHR5cGVvZihtYXRjaGVzWzVdKSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdHRoaXMucGF0aCA9IHBlcmNlbnRFbmNvZGluZ0hlbHBlci5kZWNvZGUobWF0Y2hlc1s1XSk7XG5cdFx0fVxuXHRcdGlmICh0eXBlb2YobWF0Y2hlc1s3XSkgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHR0aGlzLnF1ZXJ5ID0gbmV3IFF1ZXJ5KG1hdGNoZXNbN10pO1xuXHRcdH1cblx0XHRpZiAodHlwZW9mKG1hdGNoZXNbOV0pID09PSAnc3RyaW5nJykge1xuXHRcdFx0dGhpcy5mcmFnbWVudCA9IHBlcmNlbnRFbmNvZGluZ0hlbHBlci5kZWNvZGUobWF0Y2hlc1s5XSk7XG5cdFx0fVxuXHR9XG59XG5cbi8qKlxuICogQ3VycmVudCBVUkkgc2NoZW1lLlxuICogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzM5ODYjc2VjdGlvbi0zLjFcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKi9cblVSSS5wcm90b3R5cGUuc2NoZW1lID0gbnVsbDtcblxuLyoqXG4gKiBDdXJyZW50IFVSSSBhdXRob3JpdHkuXG4gKiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzk4NiNzZWN0aW9uLTMuMlxuICogQHR5cGUge0F1dGhvcml0eX1cbiAqL1xuVVJJLnByb3RvdHlwZS5hdXRob3JpdHkgPSBudWxsO1xuXG4vKipcbiAqIEN1cnJlbnQgVVJJIHBhdGguXG4gKiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzk4NiNzZWN0aW9uLTMuM1xuICogQHR5cGUge1N0cmluZ31cbiAqL1xuVVJJLnByb3RvdHlwZS5wYXRoID0gbnVsbDtcblxuLyoqXG4gKiBDdXJyZW50IFVSSSBxdWVyeS5cbiAqIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzOTg2I3NlY3Rpb24tMy40XG4gKiBAdHlwZSB7UXVlcnl9XG4gKi9cblVSSS5wcm90b3R5cGUucXVlcnkgPSBudWxsO1xuXG4vKipcbiAqIEN1cnJlbnQgVVJJIGZyYWdtZW50LlxuICogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzM5ODYjc2VjdGlvbi0zLjVcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKi9cblVSSS5wcm90b3R5cGUuZnJhZ21lbnQgPSBudWxsO1xuXG4vKipcbiAqIENvbnZlcnRzIGEgVVJJIHJlZmVyZW5jZSB0aGF0IG1pZ2h0IGJlIHJlbGF0aXZlIHRvIGEgZ2l2ZW4gYmFzZSBVUklcbiAqIGludG8gdGhlIHJlZmVyZW5jZSdzIHRhcmdldCBVUkkuXG4gKiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzk4NiNzZWN0aW9uLTUuMlxuICogQHBhcmFtIHtVUkl9IGJhc2VVcmkgQmFzZSBVUkkuXG4gKiBAcmV0dXJucyB7VVJJfSBSZXNvbHZlZCBVUkkuXG4gKi9cblVSSS5wcm90b3R5cGUucmVzb2x2ZVJlbGF0aXZlID0gZnVuY3Rpb24gKGJhc2VVcmkpIHtcblx0aWYgKCFiYXNlVXJpLnNjaGVtZSkge1xuXHRcdHRocm93IG5ldyBFcnJvcihFUlJPUl9CQVNFX1NDSEVNRSk7XG5cdH1cblxuXHRyZXR1cm4gdHJhbnNmb3JtUmVmZXJlbmNlKGJhc2VVcmksIHRoaXMpO1xufTtcblxuLyoqXG4gKiBDbG9uZXMgY3VycmVudCBVUkkgdG8gYSBuZXcgb2JqZWN0LlxuICogQHJldHVybnMge1VSSX0gTmV3IGNsb25lIG9mIGN1cnJlbnQgb2JqZWN0LlxuICovXG5VUkkucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24gKCkge1xuXHR2YXIgdXJpID0gbmV3IFVSSSgpO1xuXG5cdGlmICh0eXBlb2YodGhpcy5zY2hlbWUpID09PSAnc3RyaW5nJykge1xuXHRcdHVyaS5zY2hlbWUgPSB0aGlzLnNjaGVtZTtcblx0fVxuXG5cdGlmICh0aGlzLmF1dGhvcml0eSkge1xuXHRcdHVyaS5hdXRob3JpdHkgPSB0aGlzLmF1dGhvcml0eS5jbG9uZSgpO1xuXHR9XG5cblx0aWYgKHR5cGVvZih0aGlzLnBhdGgpID09PSAnc3RyaW5nJykge1xuXHRcdHVyaS5wYXRoID0gdGhpcy5wYXRoO1xuXHR9XG5cblx0aWYgKHRoaXMucXVlcnkpIHtcblx0XHR1cmkucXVlcnkgPSB0aGlzLnF1ZXJ5LmNsb25lKCk7XG5cdH1cblxuXHRpZiAodHlwZW9mKHRoaXMuZnJhZ21lbnQpID09PSAnc3RyaW5nJykge1xuXHRcdHVyaS5mcmFnbWVudCA9IHRoaXMuZnJhZ21lbnQ7XG5cdH1cblxuXHRyZXR1cm4gdXJpO1xufTtcblxuLyoqXG4gKiBSZWNvbXBvc2VzIFVSSSBjb21wb25lbnRzIHRvIFVSSSBzdHJpbmcsXG4gKiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzk4NiNzZWN0aW9uLTUuM1xuICogQHJldHVybnMge3N0cmluZ30gVVJJIHN0cmluZy5cbiAqL1xuVVJJLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcblx0dmFyIHJlc3VsdCA9ICcnO1xuXG5cdGlmICh0aGlzLnNjaGVtZSAhPT0gdW5kZWZpbmVkICYmIHRoaXMuc2NoZW1lICE9PSBudWxsKSB7XG5cdFx0dmFyIHNjaGVtZSA9IFN0cmluZyh0aGlzLnNjaGVtZSk7XG5cdFx0aWYgKCFTQ0hFTUVfUkVHRVhQLnRlc3Qoc2NoZW1lKSkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKEVSUk9SX1NDSEVNRSk7XG5cdFx0fVxuXHRcdHJlc3VsdCArPSBzY2hlbWUgKyAnOic7XG5cdH1cblxuXHRpZiAodGhpcy5hdXRob3JpdHkpIHtcblx0XHRyZXN1bHQgKz0gJy8vJyArIHRoaXMuYXV0aG9yaXR5LnRvU3RyaW5nKCk7XG5cdH1cblxuXHR2YXIgcGF0aCA9IHRoaXMucGF0aCA9PT0gdW5kZWZpbmVkIHx8IHRoaXMucGF0aCA9PT0gbnVsbCA/XG5cdFx0JycgOiBTdHJpbmcodGhpcy5wYXRoKTtcblx0cmVzdWx0ICs9IHBlcmNlbnRFbmNvZGluZ0hlbHBlci5lbmNvZGVQYXRoKHBhdGgpO1xuXG5cdGlmICh0aGlzLnF1ZXJ5KSB7XG5cdFx0cmVzdWx0ICs9ICc/JyArIHRoaXMucXVlcnkudG9TdHJpbmcoKTtcblx0fVxuXG5cdGlmICh0aGlzLmZyYWdtZW50ICE9PSB1bmRlZmluZWQgJiYgdGhpcy5mcmFnbWVudCAhPT0gbnVsbCkge1xuXHRcdHZhciBmcmFnbWVudCA9IFN0cmluZyh0aGlzLmZyYWdtZW50KTtcblx0XHRyZXN1bHQgKz0gJyMnICsgcGVyY2VudEVuY29kaW5nSGVscGVyLmVuY29kZUZyYWdtZW50KGZyYWdtZW50KTtcblx0fVxuXG5cdHJldHVybiByZXN1bHQ7XG59O1xuXG4vKipcbiAqIFRyYW5zZm9ybXMgcmVmZXJlbmNlIGZvciByZWxhdGl2ZSByZXNvbHV0aW9uLlxuICogV2hvbGUgYWxnb3JpdGhtIGhhcyBiZWVuIHRha2VuIGZyb21cbiAqIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzOTg2I3NlY3Rpb24tNS4yLjJcbiAqIEBwYXJhbSB7VVJJfSBiYXNlVXJpIEJhc2UgVVJJIGZvciByZXNvbHV0aW9uLlxuICogQHBhcmFtIHtVUkl9IHJlZmVyZW5jZVVyaSBSZWZlcmVuY2UgVVJJIHRvIHJlc29sdmUuXG4gKiBAcmV0dXJucyB7VVJJfSBDb21wb25lbnRzIG9mIHRhcmdldCBVUkkuXG4gKi9cbi8qanNoaW50IG1heGRlcHRoOmZhbHNlICovXG4vKmpzaGludCBtYXhjb21wbGV4aXR5OmZhbHNlICovXG5mdW5jdGlvbiB0cmFuc2Zvcm1SZWZlcmVuY2UoYmFzZVVyaSwgcmVmZXJlbmNlVXJpKSB7XG5cdHZhciB0YXJnZXRVcmkgPSBuZXcgVVJJKCcnKTtcblxuXHRpZiAocmVmZXJlbmNlVXJpLnNjaGVtZSkge1xuXHRcdHRhcmdldFVyaS5zY2hlbWUgPSByZWZlcmVuY2VVcmkuc2NoZW1lO1xuXHRcdHRhcmdldFVyaS5hdXRob3JpdHkgPSByZWZlcmVuY2VVcmkuYXV0aG9yaXR5ID9cblx0XHRcdHJlZmVyZW5jZVVyaS5hdXRob3JpdHkuY2xvbmUoKSA6IHJlZmVyZW5jZVVyaS5hdXRob3JpdHk7XG5cdFx0dGFyZ2V0VXJpLnBhdGggPSByZW1vdmVEb3RTZWdtZW50cyhyZWZlcmVuY2VVcmkucGF0aCk7XG5cdFx0dGFyZ2V0VXJpLnF1ZXJ5ID0gcmVmZXJlbmNlVXJpLnF1ZXJ5ID9cblx0XHRcdHJlZmVyZW5jZVVyaS5xdWVyeS5jbG9uZSgpIDogcmVmZXJlbmNlVXJpLnF1ZXJ5O1xuXHR9IGVsc2Uge1xuXHRcdGlmIChyZWZlcmVuY2VVcmkuYXV0aG9yaXR5KSB7XG5cdFx0XHR0YXJnZXRVcmkuYXV0aG9yaXR5ID0gcmVmZXJlbmNlVXJpLmF1dGhvcml0eSA/XG5cdFx0XHRcdHJlZmVyZW5jZVVyaS5hdXRob3JpdHkuY2xvbmUoKSA6IHJlZmVyZW5jZVVyaS5hdXRob3JpdHk7XG5cdFx0XHR0YXJnZXRVcmkucGF0aCA9IHJlbW92ZURvdFNlZ21lbnRzKHJlZmVyZW5jZVVyaS5wYXRoKTtcblx0XHRcdHRhcmdldFVyaS5xdWVyeSA9IHJlZmVyZW5jZVVyaS5xdWVyeSA/XG5cdFx0XHRcdHJlZmVyZW5jZVVyaS5xdWVyeS5jbG9uZSgpIDogcmVmZXJlbmNlVXJpLnF1ZXJ5O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAocmVmZXJlbmNlVXJpLnBhdGggPT09ICcnKSB7XG5cdFx0XHRcdHRhcmdldFVyaS5wYXRoID0gYmFzZVVyaS5wYXRoO1xuXHRcdFx0XHRpZiAocmVmZXJlbmNlVXJpLnF1ZXJ5KSB7XG5cdFx0XHRcdFx0dGFyZ2V0VXJpLnF1ZXJ5ID0gcmVmZXJlbmNlVXJpLnF1ZXJ5LmNsb25lKCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGFyZ2V0VXJpLnF1ZXJ5ID0gYmFzZVVyaS5xdWVyeSA/XG5cdFx0XHRcdFx0XHRiYXNlVXJpLnF1ZXJ5LmNsb25lKCkgOiBiYXNlVXJpLnF1ZXJ5O1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAocmVmZXJlbmNlVXJpLnBhdGhbMF0gPT09ICcvJykge1xuXHRcdFx0XHRcdHRhcmdldFVyaS5wYXRoID1cblx0XHRcdFx0XHRcdHJlbW92ZURvdFNlZ21lbnRzKHJlZmVyZW5jZVVyaS5wYXRoKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0YXJnZXRVcmkucGF0aCA9XG5cdFx0XHRcdFx0XHRtZXJnZShiYXNlVXJpLCByZWZlcmVuY2VVcmkpO1xuXHRcdFx0XHRcdHRhcmdldFVyaS5wYXRoID1cblx0XHRcdFx0XHRcdHJlbW92ZURvdFNlZ21lbnRzKHRhcmdldFVyaS5wYXRoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHR0YXJnZXRVcmkucXVlcnkgPSByZWZlcmVuY2VVcmkucXVlcnkgP1xuXHRcdFx0XHRcdHJlZmVyZW5jZVVyaS5xdWVyeS5jbG9uZSgpIDogcmVmZXJlbmNlVXJpLnF1ZXJ5O1xuXHRcdFx0fVxuXHRcdFx0dGFyZ2V0VXJpLmF1dGhvcml0eSA9IGJhc2VVcmkuYXV0aG9yaXR5ID9cblx0XHRcdFx0YmFzZVVyaS5hdXRob3JpdHkuY2xvbmUoKSA6IGJhc2VVcmkuYXV0aG9yaXR5O1xuXHRcdH1cblx0XHR0YXJnZXRVcmkuc2NoZW1lID0gYmFzZVVyaS5zY2hlbWU7XG5cdH1cblxuXHR0YXJnZXRVcmkuZnJhZ21lbnQgPSByZWZlcmVuY2VVcmkuZnJhZ21lbnQ7XG5cdHJldHVybiB0YXJnZXRVcmk7XG59XG5cbi8qKlxuICogTWVyZ2VzIGEgcmVsYXRpdmUtcGF0aCByZWZlcmVuY2Ugd2l0aCB0aGUgcGF0aCBvZiB0aGUgYmFzZSBVUkkuXG4gKiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzk4NiNzZWN0aW9uLTUuMi4zXG4gKiBAcGFyYW0ge1VSSX0gYmFzZVVyaSBDb21wb25lbnRzIG9mIGJhc2UgVVJJLlxuICogQHBhcmFtIHtVUkl9IHJlZmVyZW5jZVVyaSBDb21wb25lbnRzIG9mIHJlZmVyZW5jZSBVUkkuXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBNZXJnZWQgcGF0aC5cbiAqL1xuZnVuY3Rpb24gbWVyZ2UoYmFzZVVyaSwgcmVmZXJlbmNlVXJpKSB7XG5cdGlmIChiYXNlVXJpLmF1dGhvcml0eSAmJiBiYXNlVXJpLnBhdGggPT09ICcnKSB7XG5cdFx0cmV0dXJuICcvJyArIHJlZmVyZW5jZVVyaS5wYXRoO1xuXHR9XG5cblx0dmFyIHNlZ21lbnRzU3RyaW5nID0gYmFzZVVyaS5wYXRoLmluZGV4T2YoJy8nKSAhPT0gLTEgP1xuXHRcdGJhc2VVcmkucGF0aC5yZXBsYWNlKC9cXC9bXlxcL10rJC8sICcvJykgOiAnJztcblxuXHRyZXR1cm4gc2VnbWVudHNTdHJpbmcgKyByZWZlcmVuY2VVcmkucGF0aDtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGRvdHMgc2VnbWVudHMgZnJvbSBVUkkgcGF0aC5cbiAqIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzOTg2I3NlY3Rpb24tNS4yLjRcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmlQYXRoIFVSSSBwYXRoIHdpdGggcG9zc2libGUgZG90IHNlZ21lbnRzLlxuICogQHJldHVybnMge1N0cmluZ30gVVJJIHBhdGggd2l0aG91dCBkb3Qgc2VnbWVudHMuXG4gKi9cbmZ1bmN0aW9uIHJlbW92ZURvdFNlZ21lbnRzKHVyaVBhdGgpIHtcblx0aWYgKCF1cmlQYXRoKSB7XG5cdFx0cmV0dXJuICcnO1xuXHR9XG5cblx0dmFyIGlucHV0QnVmZmVyID0gdXJpUGF0aCxcblx0XHRuZXdCdWZmZXIgPSAnJyxcblx0XHRuZXh0U2VnbWVudCA9ICcnLFxuXHRcdG91dHB1dEJ1ZmZlciA9ICcnO1xuXG5cdHdoaWxlIChpbnB1dEJ1ZmZlci5sZW5ndGggIT09IDApIHtcblxuXHRcdC8vIElmIHRoZSBpbnB1dCBidWZmZXIgYmVnaW5zIHdpdGggYSBwcmVmaXggb2YgXCIuLi9cIiBvciBcIi4vXCIsXG5cdFx0Ly8gdGhlbiByZW1vdmUgdGhhdCBwcmVmaXggZnJvbSB0aGUgaW5wdXQgYnVmZmVyXG5cdFx0bmV3QnVmZmVyID0gaW5wdXRCdWZmZXIucmVwbGFjZSgvXlxcLj9cXC5cXC8vLCAnJyk7XG5cdFx0aWYgKG5ld0J1ZmZlciAhPT0gaW5wdXRCdWZmZXIpIHtcblx0XHRcdGlucHV0QnVmZmVyID0gbmV3QnVmZmVyO1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXG5cdFx0Ly8gaWYgdGhlIGlucHV0IGJ1ZmZlciBiZWdpbnMgd2l0aCBhIHByZWZpeCBvZiBcIi8uL1wiIG9yIFwiLy5cIixcblx0XHQvLyB3aGVyZSBcIi5cIiBpcyBhIGNvbXBsZXRlIHBhdGggc2VnbWVudCwgdGhlbiByZXBsYWNlIHRoYXRcblx0XHQvLyBwcmVmaXggd2l0aCBcIi9cIiBpbiB0aGUgaW5wdXQgYnVmZmVyXG5cdFx0bmV3QnVmZmVyID0gaW5wdXRCdWZmZXIucmVwbGFjZSgvXigoXFwvXFwuXFwvKXwoXFwvXFwuJCkpLywgJy8nKTtcblx0XHRpZiAobmV3QnVmZmVyICE9PSBpbnB1dEJ1ZmZlcikge1xuXHRcdFx0aW5wdXRCdWZmZXIgPSBuZXdCdWZmZXI7XG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cblx0XHQvLyBpZiB0aGUgaW5wdXQgYnVmZmVyIGJlZ2lucyB3aXRoIGEgcHJlZml4IG9mIFwiLy4uL1wiIG9yIFwiLy4uXCIsXG5cdFx0Ly8gd2hlcmUgXCIuLlwiIGlzIGEgY29tcGxldGUgcGF0aCBzZWdtZW50LCB0aGVuIHJlcGxhY2UgdGhhdFxuXHRcdC8vIHByZWZpeCB3aXRoIFwiL1wiIGluIHRoZSBpbnB1dCBidWZmZXIgYW5kIHJlbW92ZSB0aGUgbGFzdFxuXHRcdC8vIHNlZ21lbnQgYW5kIGl0cyBwcmVjZWRpbmcgXCIvXCIgKGlmIGFueSkgZnJvbSB0aGUgb3V0cHV0XG5cdFx0Ly8gYnVmZmVyXG5cdFx0bmV3QnVmZmVyID0gaW5wdXRCdWZmZXIucmVwbGFjZSgvXigoXFwvXFwuXFwuXFwvKXwoXFwvXFwuXFwuJCkpLywgJy8nKTtcblx0XHRpZiAobmV3QnVmZmVyICE9PSBpbnB1dEJ1ZmZlcikge1xuXHRcdFx0b3V0cHV0QnVmZmVyID0gb3V0cHV0QnVmZmVyLnJlcGxhY2UoL1xcL1teXFwvXSskLywgJycpO1xuXHRcdFx0aW5wdXRCdWZmZXIgPSBuZXdCdWZmZXI7XG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cblx0XHQvLyBpZiB0aGUgaW5wdXQgYnVmZmVyIGNvbnNpc3RzIG9ubHkgb2YgXCIuXCIgb3IgXCIuLlwiLCB0aGVuIHJlbW92ZVxuXHRcdC8vIHRoYXQgZnJvbSB0aGUgaW5wdXQgYnVmZmVyXG5cdFx0aWYgKGlucHV0QnVmZmVyID09PSAnLicgfHwgaW5wdXRCdWZmZXIgPT09ICcuLicpIHtcblx0XHRcdGJyZWFrO1xuXHRcdH1cblxuXHRcdC8vIG1vdmUgdGhlIGZpcnN0IHBhdGggc2VnbWVudCBpbiB0aGUgaW5wdXQgYnVmZmVyIHRvIHRoZSBlbmQgb2Zcblx0XHQvLyB0aGUgb3V0cHV0IGJ1ZmZlciwgaW5jbHVkaW5nIHRoZSBpbml0aWFsIFwiL1wiIGNoYXJhY3RlciAoaWZcblx0XHQvLyBhbnkpIGFuZCBhbnkgc3Vic2VxdWVudCBjaGFyYWN0ZXJzIHVwIHRvLCBidXQgbm90IGluY2x1ZGluZyxcblx0XHQvLyB0aGUgbmV4dCBcIi9cIiBjaGFyYWN0ZXIgb3IgdGhlIGVuZCBvZiB0aGUgaW5wdXQgYnVmZmVyXG5cdFx0bmV4dFNlZ21lbnQgPSAvXlxcLz9bXlxcL10qKFxcL3wkKS8uZXhlYyhpbnB1dEJ1ZmZlcilbMF07XG5cdFx0bmV4dFNlZ21lbnQgPSBuZXh0U2VnbWVudC5yZXBsYWNlKC8oW15cXC9dKShcXC8kKS8sICckMScpO1xuXHRcdGlucHV0QnVmZmVyID0gaW5wdXRCdWZmZXIuc3Vic3RyaW5nKG5leHRTZWdtZW50Lmxlbmd0aCk7XG5cdFx0b3V0cHV0QnVmZmVyICs9IG5leHRTZWdtZW50O1xuXHR9XG5cblx0cmV0dXJuIG91dHB1dEJ1ZmZlcjtcbn0iLCIvKlxuICogY2F0YmVycnktdXJpXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0IERlbmlzIFJlY2hrdW5vdiBhbmQgcHJvamVjdCBjb250cmlidXRvcnMuXG4gKlxuICogY2F0YmVycnktdXJpJ3MgbGljZW5zZSBmb2xsb3dzOlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXG4gKiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvblxuICogZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLFxuICogaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSxcbiAqIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsXG4gKiBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuICogc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbiAqIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1NcbiAqIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICpcbiAqIFRoaXMgbGljZW5zZSBhcHBsaWVzIHRvIGFsbCBwYXJ0cyBvZiBjYXRiZXJyeS11cmkgdGhhdCBhcmUgbm90IGV4dGVybmFsbHlcbiAqIG1haW50YWluZWQgbGlicmFyaWVzLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBVc2VySW5mbztcblxudmFyIHBlcmNlbnRFbmNvZGluZ0hlbHBlciA9IHJlcXVpcmUoJy4vcGVyY2VudEVuY29kaW5nSGVscGVyJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBuZXcgaW5zdGFuY2Ugb2YgdXNlciBpbmZvcm1hdGlvbiBjb21wb25lbnQgcGFyc2VyLlxuICogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzM5ODYjc2VjdGlvbi0zLjIuMVxuICogQHBhcmFtIHtTdHJpbmc/fSB1c2VySW5mb1N0cmluZyBVc2VyIGluZm9ybWF0aW9uIGNvbXBvbmVudCBzdHJpbmcuXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gVXNlckluZm8odXNlckluZm9TdHJpbmcpIHtcblx0aWYgKHR5cGVvZih1c2VySW5mb1N0cmluZykgPT09ICdzdHJpbmcnICYmIHVzZXJJbmZvU3RyaW5nLmxlbmd0aCA+IDApIHtcblx0XHR2YXIgcGFydHMgPSB1c2VySW5mb1N0cmluZy5zcGxpdCgnOicpO1xuXHRcdGlmICh0eXBlb2YocGFydHNbMF0pID09PSAnc3RyaW5nJykge1xuXHRcdFx0dGhpcy51c2VyID0gcGVyY2VudEVuY29kaW5nSGVscGVyLmRlY29kZShwYXJ0c1swXSk7XG5cdFx0fVxuXHRcdGlmICh0eXBlb2YocGFydHNbMV0pID09PSAnc3RyaW5nJykge1xuXHRcdFx0dGhpcy5wYXNzd29yZCA9IHBlcmNlbnRFbmNvZGluZ0hlbHBlci5kZWNvZGUocGFydHNbMV0pO1xuXHRcdH1cblx0fVxufVxuXG4vKipcbiAqIEN1cnJlbnQgdXNlciBjb21wb25lbnQuXG4gKiBAdHlwZSB7U3RyaW5nfVxuICovXG5Vc2VySW5mby5wcm90b3R5cGUudXNlciA9IG51bGw7XG5cbi8qKlxuICogQ3VycmVudCBwYXNzd29yZC5cbiAqIEB0eXBlIHtTdHJpbmd9XG4gKi9cblVzZXJJbmZvLnByb3RvdHlwZS5wYXNzd29yZCA9IG51bGw7XG5cbi8qKlxuICogQ2xvbmVzIGN1cnJlbnQgdXNlciBpbmZvcm1hdGlvbi5cbiAqIEByZXR1cm5zIHtVc2VySW5mb30gTmV3IGNsb25lIG9mIGN1cnJlbnQgb2JqZWN0LlxuICovXG5Vc2VySW5mby5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbiAoKSB7XG5cdHZhciB1c2VySW5mbyA9IG5ldyBVc2VySW5mbygpO1xuXHRpZiAodHlwZW9mKHRoaXMudXNlcikgPT09ICdzdHJpbmcnKSB7XG5cdFx0dXNlckluZm8udXNlciA9IHRoaXMudXNlcjtcblx0fVxuXHRpZiAodHlwZW9mKHRoaXMucGFzc3dvcmQpID09PSAnc3RyaW5nJykge1xuXHRcdHVzZXJJbmZvLnBhc3N3b3JkID0gdGhpcy5wYXNzd29yZDtcblx0fVxuXHRyZXR1cm4gdXNlckluZm87XG59O1xuXG4vKipcbiAqIFJlY29tYmluZXMgdXNlciBpbmZvcm1hdGlvbiBjb21wb25lbnRzIHRvIHVzZXJJbmZvIHN0cmluZy5cbiAqIEByZXR1cm5zIHtTdHJpbmd9IFVzZXIgaW5mb3JtYXRpb24gY29tcG9uZW50IHN0cmluZy5cbiAqL1xuVXNlckluZm8ucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuXHR2YXIgcmVzdWx0ID0gJyc7XG5cdGlmICh0aGlzLnVzZXIgIT09IHVuZGVmaW5lZCAmJiB0aGlzLnVzZXIgIT09IG51bGwpIHtcblx0XHR2YXIgdXNlciA9IFN0cmluZyh0aGlzLnVzZXIpO1xuXHRcdHJlc3VsdCArPSBwZXJjZW50RW5jb2RpbmdIZWxwZXJcblx0XHRcdC5lbmNvZGVVc2VySW5mb1N1YkNvbXBvbmVudCh1c2VyKTtcblx0fVxuXHRpZiAodGhpcy5wYXNzd29yZCAhPT0gdW5kZWZpbmVkICYmIHRoaXMucGFzc3dvcmQgIT09IG51bGwpIHtcblx0XHR2YXIgcGFzc3dvcmQgPSBTdHJpbmcodGhpcy5wYXNzd29yZCk7XG5cdFx0cmVzdWx0ICs9ICc6JyArIHBlcmNlbnRFbmNvZGluZ0hlbHBlclxuXHRcdFx0LmVuY29kZVVzZXJJbmZvU3ViQ29tcG9uZW50KHBhc3N3b3JkKTtcblx0fVxuXG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8qXG4gKiBjYXRiZXJyeS11cmlcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgRGVuaXMgUmVjaGt1bm92IGFuZCBwcm9qZWN0IGNvbnRyaWJ1dG9ycy5cbiAqXG4gKiBjYXRiZXJyeS11cmkncyBsaWNlbnNlIGZvbGxvd3M6XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb25cbiAqIG9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uXG4gKiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sXG4gKiBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLFxuICogcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSxcbiAqIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4gKiBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuICogaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuICogT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKlxuICogVGhpcyBsaWNlbnNlIGFwcGxpZXMgdG8gYWxsIHBhcnRzIG9mIGNhdGJlcnJ5LXVyaSB0aGF0IGFyZSBub3QgZXh0ZXJuYWxseVxuICogbWFpbnRhaW5lZCBsaWJyYXJpZXMuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vLyBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzk4NiNzZWN0aW9uLTIuMVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0LyoqXG5cdCAqIEVuY29kZXMgYXV0aG9yaXR5IHVzZXIgaW5mb3JtYXRpb24gc3ViLWNvbXBvbmVudCBhY2NvcmRpbmcgdG8gUkZDIDM5ODYuXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgQ29tcG9uZW50IHRvIGVuY29kZS5cblx0ICogQHJldHVybnMge1N0cmluZ30gRW5jb2RlZCBjb21wb25lbnQuXG5cdCAqL1xuXHRlbmNvZGVVc2VySW5mb1N1YkNvbXBvbmVudDogZnVuY3Rpb24gKHN0cmluZykge1xuXHRcdHJldHVybiBzdHJpbmcucmVwbGFjZShcblx0XHRcdC8vIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzOTg2I3NlY3Rpb24tMy4yLjFcblx0XHRcdC9bXlxcd1xcLn5cXC0hXFwkJidcXChcXClcXCpcXCssOz1dL2csIGVuY29kZVVSSUNvbXBvbmVudFxuXHRcdCk7XG5cdH0sXG5cdC8qKlxuXHQgKiBFbmNvZGVzIGF1dGhvcml0eSBob3N0IGNvbXBvbmVudCBhY2NvcmRpbmcgdG8gUkZDIDM5ODYuXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgQ29tcG9uZW50IHRvIGVuY29kZS5cblx0ICogQHJldHVybnMge1N0cmluZ30gRW5jb2RlZCBjb21wb25lbnQuXG5cdCAqL1xuXHRlbmNvZGVIb3N0OiBmdW5jdGlvbiAoc3RyaW5nKSB7XG5cdFx0cmV0dXJuIHN0cmluZy5yZXBsYWNlKFxuXHRcdFx0Ly8gaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzM5ODYjc2VjdGlvbi0zLjIuMlxuXHRcdFx0L1teXFx3XFwuflxcLSFcXCQmJ1xcKFxcKVxcKlxcKyw7PTpcXFtcXF1dL2csIGVuY29kZVVSSUNvbXBvbmVudFxuXHRcdCk7XG5cblx0fSxcblx0LyoqXG5cdCAqIEVuY29kZXMgVVJJIHBhdGggY29tcG9uZW50IGFjY29yZGluZyB0byBSRkMgMzk4Ni5cblx0ICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZyBDb21wb25lbnQgdG8gZW5jb2RlLlxuXHQgKiBAcmV0dXJucyB7U3RyaW5nfSBFbmNvZGVkIGNvbXBvbmVudC5cblx0ICovXG5cdGVuY29kZVBhdGg6IGZ1bmN0aW9uIChzdHJpbmcpIHtcblx0XHRyZXR1cm4gc3RyaW5nLnJlcGxhY2UoXG5cdFx0XHQvLyBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzk4NiNzZWN0aW9uLTMuM1xuXHRcdFx0L1teXFx3XFwuflxcLSFcXCQmJ1xcKFxcKVxcKlxcKyw7PTpAXFwvXS9nLCBlbmNvZGVVUklDb21wb25lbnRcblx0XHQpO1xuXHR9LFxuXHQvKipcblx0ICogRW5jb2RlcyBxdWVyeSBzdWItY29tcG9uZW50IGFjY29yZGluZyB0byBSRkMgMzk4Ni5cblx0ICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZyBDb21wb25lbnQgdG8gZW5jb2RlLlxuXHQgKiBAcmV0dXJucyB7U3RyaW5nfSBFbmNvZGVkIGNvbXBvbmVudC5cblx0ICovXG5cdGVuY29kZVF1ZXJ5U3ViQ29tcG9uZW50OiBmdW5jdGlvbiAoc3RyaW5nKSB7XG5cdFx0cmV0dXJuIHN0cmluZy5yZXBsYWNlKFxuXHRcdFx0Ly8gaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzM5ODYjc2VjdGlvbi0zLjRcblx0XHRcdC9bXlxcd1xcLn5cXC0hXFwkJ1xcKFxcKVxcKlxcKyw7OkBcXC9cXD9dL2csIGVuY29kZVVSSUNvbXBvbmVudFxuXHRcdCk7XG5cdH0sXG5cblx0LyoqXG5cdCAqIEVuY29kZXMgVVJJIGZyYWdtZW50IGNvbXBvbmVudCBhY2NvcmRpbmcgdG8gUkZDIDM5ODYuXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgQ29tcG9uZW50IHRvIGVuY29kZS5cblx0ICogQHJldHVybnMge1N0cmluZ30gRW5jb2RlZCBjb21wb25lbnQuXG5cdCAqL1xuXHRlbmNvZGVGcmFnbWVudDogZnVuY3Rpb24gKHN0cmluZykge1xuXHRcdHJldHVybiBzdHJpbmcucmVwbGFjZShcblx0XHRcdC8vIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzOTg2I3NlY3Rpb24tMy41XG5cdFx0XHQvW15cXHdcXC5+XFwtIVxcJCYnXFwoXFwpXFwqXFwrLDs9OkBcXC9cXD9dL2csIGVuY29kZVVSSUNvbXBvbmVudFxuXHRcdCk7XG5cdH0sXG5cblx0LyoqXG5cdCAqIERlY29kZXMgcGVyY2VudCBlbmNvZGVkIGNvbXBvbmVudC5cblx0ICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZyBDb21wb25lbnQgdG8gZGVjb2RlLlxuXHQgKiBAcmV0dXJucyB7U3RyaW5nfSBEZWNvZGVkIGNvbXBvbmVudC5cblx0ICovXG5cdGRlY29kZTogZnVuY3Rpb24gKHN0cmluZykge1xuXHRcdHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoc3RyaW5nKTtcblx0fVxufTsiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWInKVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYXNhcCA9IHJlcXVpcmUoJ2FzYXAvcmF3Jyk7XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG4vLyBTdGF0ZXM6XG4vL1xuLy8gMCAtIHBlbmRpbmdcbi8vIDEgLSBmdWxmaWxsZWQgd2l0aCBfdmFsdWVcbi8vIDIgLSByZWplY3RlZCB3aXRoIF92YWx1ZVxuLy8gMyAtIGFkb3B0ZWQgdGhlIHN0YXRlIG9mIGFub3RoZXIgcHJvbWlzZSwgX3ZhbHVlXG4vL1xuLy8gb25jZSB0aGUgc3RhdGUgaXMgbm8gbG9uZ2VyIHBlbmRpbmcgKDApIGl0IGlzIGltbXV0YWJsZVxuXG4vLyBBbGwgYF9gIHByZWZpeGVkIHByb3BlcnRpZXMgd2lsbCBiZSByZWR1Y2VkIHRvIGBfe3JhbmRvbSBudW1iZXJ9YFxuLy8gYXQgYnVpbGQgdGltZSB0byBvYmZ1c2NhdGUgdGhlbSBhbmQgZGlzY291cmFnZSB0aGVpciB1c2UuXG4vLyBXZSBkb24ndCB1c2Ugc3ltYm9scyBvciBPYmplY3QuZGVmaW5lUHJvcGVydHkgdG8gZnVsbHkgaGlkZSB0aGVtXG4vLyBiZWNhdXNlIHRoZSBwZXJmb3JtYW5jZSBpc24ndCBnb29kIGVub3VnaC5cblxuXG4vLyB0byBhdm9pZCB1c2luZyB0cnkvY2F0Y2ggaW5zaWRlIGNyaXRpY2FsIGZ1bmN0aW9ucywgd2Vcbi8vIGV4dHJhY3QgdGhlbSB0byBoZXJlLlxudmFyIExBU1RfRVJST1IgPSBudWxsO1xudmFyIElTX0VSUk9SID0ge307XG5mdW5jdGlvbiBnZXRUaGVuKG9iaikge1xuICB0cnkge1xuICAgIHJldHVybiBvYmoudGhlbjtcbiAgfSBjYXRjaCAoZXgpIHtcbiAgICBMQVNUX0VSUk9SID0gZXg7XG4gICAgcmV0dXJuIElTX0VSUk9SO1xuICB9XG59XG5cbmZ1bmN0aW9uIHRyeUNhbGxPbmUoZm4sIGEpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZm4oYSk7XG4gIH0gY2F0Y2ggKGV4KSB7XG4gICAgTEFTVF9FUlJPUiA9IGV4O1xuICAgIHJldHVybiBJU19FUlJPUjtcbiAgfVxufVxuZnVuY3Rpb24gdHJ5Q2FsbFR3byhmbiwgYSwgYikge1xuICB0cnkge1xuICAgIGZuKGEsIGIpO1xuICB9IGNhdGNoIChleCkge1xuICAgIExBU1RfRVJST1IgPSBleDtcbiAgICByZXR1cm4gSVNfRVJST1I7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQcm9taXNlO1xuXG5mdW5jdGlvbiBQcm9taXNlKGZuKSB7XG4gIGlmICh0eXBlb2YgdGhpcyAhPT0gJ29iamVjdCcpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdQcm9taXNlcyBtdXN0IGJlIGNvbnN0cnVjdGVkIHZpYSBuZXcnKTtcbiAgfVxuICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignbm90IGEgZnVuY3Rpb24nKTtcbiAgfVxuICB0aGlzLl8zMiA9IDA7XG4gIHRoaXMuXzggPSBudWxsO1xuICB0aGlzLl84OSA9IFtdO1xuICBpZiAoZm4gPT09IG5vb3ApIHJldHVybjtcbiAgZG9SZXNvbHZlKGZuLCB0aGlzKTtcbn1cblByb21pc2UuXzgzID0gbm9vcDtcblxuUHJvbWlzZS5wcm90b3R5cGUudGhlbiA9IGZ1bmN0aW9uKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKSB7XG4gIGlmICh0aGlzLmNvbnN0cnVjdG9yICE9PSBQcm9taXNlKSB7XG4gICAgcmV0dXJuIHNhZmVUaGVuKHRoaXMsIG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKTtcbiAgfVxuICB2YXIgcmVzID0gbmV3IFByb21pc2Uobm9vcCk7XG4gIGhhbmRsZSh0aGlzLCBuZXcgSGFuZGxlcihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCwgcmVzKSk7XG4gIHJldHVybiByZXM7XG59O1xuXG5mdW5jdGlvbiBzYWZlVGhlbihzZWxmLCBvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCkge1xuICByZXR1cm4gbmV3IHNlbGYuY29uc3RydWN0b3IoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgIHZhciByZXMgPSBuZXcgUHJvbWlzZShub29wKTtcbiAgICByZXMudGhlbihyZXNvbHZlLCByZWplY3QpO1xuICAgIGhhbmRsZShzZWxmLCBuZXcgSGFuZGxlcihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCwgcmVzKSk7XG4gIH0pO1xufTtcbmZ1bmN0aW9uIGhhbmRsZShzZWxmLCBkZWZlcnJlZCkge1xuICB3aGlsZSAoc2VsZi5fMzIgPT09IDMpIHtcbiAgICBzZWxmID0gc2VsZi5fODtcbiAgfVxuICBpZiAoc2VsZi5fMzIgPT09IDApIHtcbiAgICBzZWxmLl84OS5wdXNoKGRlZmVycmVkKTtcbiAgICByZXR1cm47XG4gIH1cbiAgYXNhcChmdW5jdGlvbigpIHtcbiAgICB2YXIgY2IgPSBzZWxmLl8zMiA9PT0gMSA/IGRlZmVycmVkLm9uRnVsZmlsbGVkIDogZGVmZXJyZWQub25SZWplY3RlZDtcbiAgICBpZiAoY2IgPT09IG51bGwpIHtcbiAgICAgIGlmIChzZWxmLl8zMiA9PT0gMSkge1xuICAgICAgICByZXNvbHZlKGRlZmVycmVkLnByb21pc2UsIHNlbGYuXzgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVqZWN0KGRlZmVycmVkLnByb21pc2UsIHNlbGYuXzgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgcmV0ID0gdHJ5Q2FsbE9uZShjYiwgc2VsZi5fOCk7XG4gICAgaWYgKHJldCA9PT0gSVNfRVJST1IpIHtcbiAgICAgIHJlamVjdChkZWZlcnJlZC5wcm9taXNlLCBMQVNUX0VSUk9SKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzb2x2ZShkZWZlcnJlZC5wcm9taXNlLCByZXQpO1xuICAgIH1cbiAgfSk7XG59XG5mdW5jdGlvbiByZXNvbHZlKHNlbGYsIG5ld1ZhbHVlKSB7XG4gIC8vIFByb21pc2UgUmVzb2x1dGlvbiBQcm9jZWR1cmU6IGh0dHBzOi8vZ2l0aHViLmNvbS9wcm9taXNlcy1hcGx1cy9wcm9taXNlcy1zcGVjI3RoZS1wcm9taXNlLXJlc29sdXRpb24tcHJvY2VkdXJlXG4gIGlmIChuZXdWYWx1ZSA9PT0gc2VsZikge1xuICAgIHJldHVybiByZWplY3QoXG4gICAgICBzZWxmLFxuICAgICAgbmV3IFR5cGVFcnJvcignQSBwcm9taXNlIGNhbm5vdCBiZSByZXNvbHZlZCB3aXRoIGl0c2VsZi4nKVxuICAgICk7XG4gIH1cbiAgaWYgKFxuICAgIG5ld1ZhbHVlICYmXG4gICAgKHR5cGVvZiBuZXdWYWx1ZSA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIG5ld1ZhbHVlID09PSAnZnVuY3Rpb24nKVxuICApIHtcbiAgICB2YXIgdGhlbiA9IGdldFRoZW4obmV3VmFsdWUpO1xuICAgIGlmICh0aGVuID09PSBJU19FUlJPUikge1xuICAgICAgcmV0dXJuIHJlamVjdChzZWxmLCBMQVNUX0VSUk9SKTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgdGhlbiA9PT0gc2VsZi50aGVuICYmXG4gICAgICBuZXdWYWx1ZSBpbnN0YW5jZW9mIFByb21pc2VcbiAgICApIHtcbiAgICAgIHNlbGYuXzMyID0gMztcbiAgICAgIHNlbGYuXzggPSBuZXdWYWx1ZTtcbiAgICAgIGZpbmFsZShzZWxmKTtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGVuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBkb1Jlc29sdmUodGhlbi5iaW5kKG5ld1ZhbHVlKSwgc2VsZik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG4gIHNlbGYuXzMyID0gMTtcbiAgc2VsZi5fOCA9IG5ld1ZhbHVlO1xuICBmaW5hbGUoc2VsZik7XG59XG5cbmZ1bmN0aW9uIHJlamVjdChzZWxmLCBuZXdWYWx1ZSkge1xuICBzZWxmLl8zMiA9IDI7XG4gIHNlbGYuXzggPSBuZXdWYWx1ZTtcbiAgZmluYWxlKHNlbGYpO1xufVxuZnVuY3Rpb24gZmluYWxlKHNlbGYpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZWxmLl84OS5sZW5ndGg7IGkrKykge1xuICAgIGhhbmRsZShzZWxmLCBzZWxmLl84OVtpXSk7XG4gIH1cbiAgc2VsZi5fODkgPSBudWxsO1xufVxuXG5mdW5jdGlvbiBIYW5kbGVyKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkLCBwcm9taXNlKXtcbiAgdGhpcy5vbkZ1bGZpbGxlZCA9IHR5cGVvZiBvbkZ1bGZpbGxlZCA9PT0gJ2Z1bmN0aW9uJyA/IG9uRnVsZmlsbGVkIDogbnVsbDtcbiAgdGhpcy5vblJlamVjdGVkID0gdHlwZW9mIG9uUmVqZWN0ZWQgPT09ICdmdW5jdGlvbicgPyBvblJlamVjdGVkIDogbnVsbDtcbiAgdGhpcy5wcm9taXNlID0gcHJvbWlzZTtcbn1cblxuLyoqXG4gKiBUYWtlIGEgcG90ZW50aWFsbHkgbWlzYmVoYXZpbmcgcmVzb2x2ZXIgZnVuY3Rpb24gYW5kIG1ha2Ugc3VyZVxuICogb25GdWxmaWxsZWQgYW5kIG9uUmVqZWN0ZWQgYXJlIG9ubHkgY2FsbGVkIG9uY2UuXG4gKlxuICogTWFrZXMgbm8gZ3VhcmFudGVlcyBhYm91dCBhc3luY2hyb255LlxuICovXG5mdW5jdGlvbiBkb1Jlc29sdmUoZm4sIHByb21pc2UpIHtcbiAgdmFyIGRvbmUgPSBmYWxzZTtcbiAgdmFyIHJlcyA9IHRyeUNhbGxUd28oZm4sIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIGlmIChkb25lKSByZXR1cm47XG4gICAgZG9uZSA9IHRydWU7XG4gICAgcmVzb2x2ZShwcm9taXNlLCB2YWx1ZSk7XG4gIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICBpZiAoZG9uZSkgcmV0dXJuO1xuICAgIGRvbmUgPSB0cnVlO1xuICAgIHJlamVjdChwcm9taXNlLCByZWFzb24pO1xuICB9KVxuICBpZiAoIWRvbmUgJiYgcmVzID09PSBJU19FUlJPUikge1xuICAgIGRvbmUgPSB0cnVlO1xuICAgIHJlamVjdChwcm9taXNlLCBMQVNUX0VSUk9SKTtcbiAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgUHJvbWlzZSA9IHJlcXVpcmUoJy4vY29yZS5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFByb21pc2U7XG5Qcm9taXNlLnByb3RvdHlwZS5kb25lID0gZnVuY3Rpb24gKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKSB7XG4gIHZhciBzZWxmID0gYXJndW1lbnRzLmxlbmd0aCA/IHRoaXMudGhlbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpIDogdGhpcztcbiAgc2VsZi50aGVuKG51bGwsIGZ1bmN0aW9uIChlcnIpIHtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIHRocm93IGVycjtcbiAgICB9LCAwKTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vL1RoaXMgZmlsZSBjb250YWlucyB0aGUgRVM2IGV4dGVuc2lvbnMgdG8gdGhlIGNvcmUgUHJvbWlzZXMvQSsgQVBJXG5cbnZhciBQcm9taXNlID0gcmVxdWlyZSgnLi9jb3JlLmpzJyk7XG52YXIgYXNhcCA9IHJlcXVpcmUoJ2FzYXAvcmF3Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gUHJvbWlzZTtcblxuLyogU3RhdGljIEZ1bmN0aW9ucyAqL1xuXG52YXIgVFJVRSA9IHZhbHVlUHJvbWlzZSh0cnVlKTtcbnZhciBGQUxTRSA9IHZhbHVlUHJvbWlzZShmYWxzZSk7XG52YXIgTlVMTCA9IHZhbHVlUHJvbWlzZShudWxsKTtcbnZhciBVTkRFRklORUQgPSB2YWx1ZVByb21pc2UodW5kZWZpbmVkKTtcbnZhciBaRVJPID0gdmFsdWVQcm9taXNlKDApO1xudmFyIEVNUFRZU1RSSU5HID0gdmFsdWVQcm9taXNlKCcnKTtcblxuZnVuY3Rpb24gdmFsdWVQcm9taXNlKHZhbHVlKSB7XG4gIHZhciBwID0gbmV3IFByb21pc2UoUHJvbWlzZS5fODMpO1xuICBwLl8zMiA9IDE7XG4gIHAuXzggPSB2YWx1ZTtcbiAgcmV0dXJuIHA7XG59XG5Qcm9taXNlLnJlc29sdmUgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgaWYgKHZhbHVlIGluc3RhbmNlb2YgUHJvbWlzZSkgcmV0dXJuIHZhbHVlO1xuXG4gIGlmICh2YWx1ZSA9PT0gbnVsbCkgcmV0dXJuIE5VTEw7XG4gIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gVU5ERUZJTkVEO1xuICBpZiAodmFsdWUgPT09IHRydWUpIHJldHVybiBUUlVFO1xuICBpZiAodmFsdWUgPT09IGZhbHNlKSByZXR1cm4gRkFMU0U7XG4gIGlmICh2YWx1ZSA9PT0gMCkgcmV0dXJuIFpFUk87XG4gIGlmICh2YWx1ZSA9PT0gJycpIHJldHVybiBFTVBUWVNUUklORztcblxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyB8fCB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICB0cnkge1xuICAgICAgdmFyIHRoZW4gPSB2YWx1ZS50aGVuO1xuICAgICAgaWYgKHR5cGVvZiB0aGVuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSh0aGVuLmJpbmQodmFsdWUpKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChleCkge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgcmVqZWN0KGV4KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdmFsdWVQcm9taXNlKHZhbHVlKTtcbn07XG5cblByb21pc2UuYWxsID0gZnVuY3Rpb24gKGFycikge1xuICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFycik7XG5cbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICBpZiAoYXJncy5sZW5ndGggPT09IDApIHJldHVybiByZXNvbHZlKFtdKTtcbiAgICB2YXIgcmVtYWluaW5nID0gYXJncy5sZW5ndGg7XG4gICAgZnVuY3Rpb24gcmVzKGksIHZhbCkge1xuICAgICAgaWYgKHZhbCAmJiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJykpIHtcbiAgICAgICAgaWYgKHZhbCBpbnN0YW5jZW9mIFByb21pc2UgJiYgdmFsLnRoZW4gPT09IFByb21pc2UucHJvdG90eXBlLnRoZW4pIHtcbiAgICAgICAgICB3aGlsZSAodmFsLl8zMiA9PT0gMykge1xuICAgICAgICAgICAgdmFsID0gdmFsLl84O1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodmFsLl8zMiA9PT0gMSkgcmV0dXJuIHJlcyhpLCB2YWwuXzgpO1xuICAgICAgICAgIGlmICh2YWwuXzMyID09PSAyKSByZWplY3QodmFsLl84KTtcbiAgICAgICAgICB2YWwudGhlbihmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgICByZXMoaSwgdmFsKTtcbiAgICAgICAgICB9LCByZWplY3QpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgdGhlbiA9IHZhbC50aGVuO1xuICAgICAgICAgIGlmICh0eXBlb2YgdGhlbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdmFyIHAgPSBuZXcgUHJvbWlzZSh0aGVuLmJpbmQodmFsKSk7XG4gICAgICAgICAgICBwLnRoZW4oZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgICAgICByZXMoaSwgdmFsKTtcbiAgICAgICAgICAgIH0sIHJlamVjdCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBhcmdzW2ldID0gdmFsO1xuICAgICAgaWYgKC0tcmVtYWluaW5nID09PSAwKSB7XG4gICAgICAgIHJlc29sdmUoYXJncyk7XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgcmVzKGksIGFyZ3NbaV0pO1xuICAgIH1cbiAgfSk7XG59O1xuXG5Qcm9taXNlLnJlamVjdCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgIHJlamVjdCh2YWx1ZSk7XG4gIH0pO1xufTtcblxuUHJvbWlzZS5yYWNlID0gZnVuY3Rpb24gKHZhbHVlcykge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgIHZhbHVlcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgIFByb21pc2UucmVzb2x2ZSh2YWx1ZSkudGhlbihyZXNvbHZlLCByZWplY3QpO1xuICAgIH0pO1xuICB9KTtcbn07XG5cbi8qIFByb3RvdHlwZSBNZXRob2RzICovXG5cblByb21pc2UucHJvdG90eXBlWydjYXRjaCddID0gZnVuY3Rpb24gKG9uUmVqZWN0ZWQpIHtcbiAgcmV0dXJuIHRoaXMudGhlbihudWxsLCBvblJlamVjdGVkKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBQcm9taXNlID0gcmVxdWlyZSgnLi9jb3JlLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gUHJvbWlzZTtcblByb21pc2UucHJvdG90eXBlWydmaW5hbGx5J10gPSBmdW5jdGlvbiAoZikge1xuICByZXR1cm4gdGhpcy50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZigpKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9KTtcbiAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZigpKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgIHRocm93IGVycjtcbiAgICB9KTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vY29yZS5qcycpO1xucmVxdWlyZSgnLi9kb25lLmpzJyk7XG5yZXF1aXJlKCcuL2ZpbmFsbHkuanMnKTtcbnJlcXVpcmUoJy4vZXM2LWV4dGVuc2lvbnMuanMnKTtcbnJlcXVpcmUoJy4vbm9kZS1leHRlbnNpb25zLmpzJyk7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIFRoaXMgZmlsZSBjb250YWlucyB0aGVuL3Byb21pc2Ugc3BlY2lmaWMgZXh0ZW5zaW9ucyB0aGF0IGFyZSBvbmx5IHVzZWZ1bFxuLy8gZm9yIG5vZGUuanMgaW50ZXJvcFxuXG52YXIgUHJvbWlzZSA9IHJlcXVpcmUoJy4vY29yZS5qcycpO1xudmFyIGFzYXAgPSByZXF1aXJlKCdhc2FwJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gUHJvbWlzZTtcblxuLyogU3RhdGljIEZ1bmN0aW9ucyAqL1xuXG5Qcm9taXNlLmRlbm9kZWlmeSA9IGZ1bmN0aW9uIChmbiwgYXJndW1lbnRDb3VudCkge1xuICBhcmd1bWVudENvdW50ID0gYXJndW1lbnRDb3VudCB8fCBJbmZpbml0eTtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB3aGlsZSAoYXJncy5sZW5ndGggJiYgYXJncy5sZW5ndGggPiBhcmd1bWVudENvdW50KSB7XG4gICAgICAgIGFyZ3MucG9wKCk7XG4gICAgICB9XG4gICAgICBhcmdzLnB1c2goZnVuY3Rpb24gKGVyciwgcmVzKSB7XG4gICAgICAgIGlmIChlcnIpIHJlamVjdChlcnIpO1xuICAgICAgICBlbHNlIHJlc29sdmUocmVzKTtcbiAgICAgIH0pXG4gICAgICB2YXIgcmVzID0gZm4uYXBwbHkoc2VsZiwgYXJncyk7XG4gICAgICBpZiAocmVzICYmXG4gICAgICAgIChcbiAgICAgICAgICB0eXBlb2YgcmVzID09PSAnb2JqZWN0JyB8fFxuICAgICAgICAgIHR5cGVvZiByZXMgPT09ICdmdW5jdGlvbidcbiAgICAgICAgKSAmJlxuICAgICAgICB0eXBlb2YgcmVzLnRoZW4gPT09ICdmdW5jdGlvbidcbiAgICAgICkge1xuICAgICAgICByZXNvbHZlKHJlcyk7XG4gICAgICB9XG4gICAgfSlcbiAgfVxufVxuUHJvbWlzZS5ub2RlaWZ5ID0gZnVuY3Rpb24gKGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgIHZhciBjYWxsYmFjayA9XG4gICAgICB0eXBlb2YgYXJnc1thcmdzLmxlbmd0aCAtIDFdID09PSAnZnVuY3Rpb24nID8gYXJncy5wb3AoKSA6IG51bGw7XG4gICAgdmFyIGN0eCA9IHRoaXM7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpLm5vZGVpZnkoY2FsbGJhY2ssIGN0eCk7XG4gICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgIGlmIChjYWxsYmFjayA9PT0gbnVsbCB8fCB0eXBlb2YgY2FsbGJhY2sgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICByZWplY3QoZXgpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFzYXAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGNhbGxiYWNrLmNhbGwoY3R4LCBleCk7XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cblByb21pc2UucHJvdG90eXBlLm5vZGVpZnkgPSBmdW5jdGlvbiAoY2FsbGJhY2ssIGN0eCkge1xuICBpZiAodHlwZW9mIGNhbGxiYWNrICE9ICdmdW5jdGlvbicpIHJldHVybiB0aGlzO1xuXG4gIHRoaXMudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICBhc2FwKGZ1bmN0aW9uICgpIHtcbiAgICAgIGNhbGxiYWNrLmNhbGwoY3R4LCBudWxsLCB2YWx1ZSk7XG4gICAgfSk7XG4gIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICBhc2FwKGZ1bmN0aW9uICgpIHtcbiAgICAgIGNhbGxiYWNrLmNhbGwoY3R4LCBlcnIpO1xuICAgIH0pO1xuICB9KTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vLyByYXdBc2FwIHByb3ZpZGVzIGV2ZXJ5dGhpbmcgd2UgbmVlZCBleGNlcHQgZXhjZXB0aW9uIG1hbmFnZW1lbnQuXG52YXIgcmF3QXNhcCA9IHJlcXVpcmUoXCIuL3Jhd1wiKTtcbi8vIFJhd1Rhc2tzIGFyZSByZWN5Y2xlZCB0byByZWR1Y2UgR0MgY2h1cm4uXG52YXIgZnJlZVRhc2tzID0gW107XG4vLyBXZSBxdWV1ZSBlcnJvcnMgdG8gZW5zdXJlIHRoZXkgYXJlIHRocm93biBpbiByaWdodCBvcmRlciAoRklGTykuXG4vLyBBcnJheS1hcy1xdWV1ZSBpcyBnb29kIGVub3VnaCBoZXJlLCBzaW5jZSB3ZSBhcmUganVzdCBkZWFsaW5nIHdpdGggZXhjZXB0aW9ucy5cbnZhciBwZW5kaW5nRXJyb3JzID0gW107XG52YXIgcmVxdWVzdEVycm9yVGhyb3cgPSByYXdBc2FwLm1ha2VSZXF1ZXN0Q2FsbEZyb21UaW1lcih0aHJvd0ZpcnN0RXJyb3IpO1xuXG5mdW5jdGlvbiB0aHJvd0ZpcnN0RXJyb3IoKSB7XG4gICAgaWYgKHBlbmRpbmdFcnJvcnMubGVuZ3RoKSB7XG4gICAgICAgIHRocm93IHBlbmRpbmdFcnJvcnMuc2hpZnQoKTtcbiAgICB9XG59XG5cbi8qKlxuICogQ2FsbHMgYSB0YXNrIGFzIHNvb24gYXMgcG9zc2libGUgYWZ0ZXIgcmV0dXJuaW5nLCBpbiBpdHMgb3duIGV2ZW50LCB3aXRoIHByaW9yaXR5XG4gKiBvdmVyIG90aGVyIGV2ZW50cyBsaWtlIGFuaW1hdGlvbiwgcmVmbG93LCBhbmQgcmVwYWludC4gQW4gZXJyb3IgdGhyb3duIGZyb20gYW5cbiAqIGV2ZW50IHdpbGwgbm90IGludGVycnVwdCwgbm9yIGV2ZW4gc3Vic3RhbnRpYWxseSBzbG93IGRvd24gdGhlIHByb2Nlc3Npbmcgb2ZcbiAqIG90aGVyIGV2ZW50cywgYnV0IHdpbGwgYmUgcmF0aGVyIHBvc3Rwb25lZCB0byBhIGxvd2VyIHByaW9yaXR5IGV2ZW50LlxuICogQHBhcmFtIHt7Y2FsbH19IHRhc2sgQSBjYWxsYWJsZSBvYmplY3QsIHR5cGljYWxseSBhIGZ1bmN0aW9uIHRoYXQgdGFrZXMgbm9cbiAqIGFyZ3VtZW50cy5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBhc2FwO1xuZnVuY3Rpb24gYXNhcCh0YXNrKSB7XG4gICAgdmFyIHJhd1Rhc2s7XG4gICAgaWYgKGZyZWVUYXNrcy5sZW5ndGgpIHtcbiAgICAgICAgcmF3VGFzayA9IGZyZWVUYXNrcy5wb3AoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByYXdUYXNrID0gbmV3IFJhd1Rhc2soKTtcbiAgICB9XG4gICAgcmF3VGFzay50YXNrID0gdGFzaztcbiAgICByYXdBc2FwKHJhd1Rhc2spO1xufVxuXG4vLyBXZSB3cmFwIHRhc2tzIHdpdGggcmVjeWNsYWJsZSB0YXNrIG9iamVjdHMuICBBIHRhc2sgb2JqZWN0IGltcGxlbWVudHNcbi8vIGBjYWxsYCwganVzdCBsaWtlIGEgZnVuY3Rpb24uXG5mdW5jdGlvbiBSYXdUYXNrKCkge1xuICAgIHRoaXMudGFzayA9IG51bGw7XG59XG5cbi8vIFRoZSBzb2xlIHB1cnBvc2Ugb2Ygd3JhcHBpbmcgdGhlIHRhc2sgaXMgdG8gY2F0Y2ggdGhlIGV4Y2VwdGlvbiBhbmQgcmVjeWNsZVxuLy8gdGhlIHRhc2sgb2JqZWN0IGFmdGVyIGl0cyBzaW5nbGUgdXNlLlxuUmF3VGFzay5wcm90b3R5cGUuY2FsbCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICB0aGlzLnRhc2suY2FsbCgpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmIChhc2FwLm9uZXJyb3IpIHtcbiAgICAgICAgICAgIC8vIFRoaXMgaG9vayBleGlzdHMgcHVyZWx5IGZvciB0ZXN0aW5nIHB1cnBvc2VzLlxuICAgICAgICAgICAgLy8gSXRzIG5hbWUgd2lsbCBiZSBwZXJpb2RpY2FsbHkgcmFuZG9taXplZCB0byBicmVhayBhbnkgY29kZSB0aGF0XG4gICAgICAgICAgICAvLyBkZXBlbmRzIG9uIGl0cyBleGlzdGVuY2UuXG4gICAgICAgICAgICBhc2FwLm9uZXJyb3IoZXJyb3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gSW4gYSB3ZWIgYnJvd3NlciwgZXhjZXB0aW9ucyBhcmUgbm90IGZhdGFsLiBIb3dldmVyLCB0byBhdm9pZFxuICAgICAgICAgICAgLy8gc2xvd2luZyBkb3duIHRoZSBxdWV1ZSBvZiBwZW5kaW5nIHRhc2tzLCB3ZSByZXRocm93IHRoZSBlcnJvciBpbiBhXG4gICAgICAgICAgICAvLyBsb3dlciBwcmlvcml0eSB0dXJuLlxuICAgICAgICAgICAgcGVuZGluZ0Vycm9ycy5wdXNoKGVycm9yKTtcbiAgICAgICAgICAgIHJlcXVlc3RFcnJvclRocm93KCk7XG4gICAgICAgIH1cbiAgICB9IGZpbmFsbHkge1xuICAgICAgICB0aGlzLnRhc2sgPSBudWxsO1xuICAgICAgICBmcmVlVGFza3NbZnJlZVRhc2tzLmxlbmd0aF0gPSB0aGlzO1xuICAgIH1cbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLy8gVXNlIHRoZSBmYXN0ZXN0IG1lYW5zIHBvc3NpYmxlIHRvIGV4ZWN1dGUgYSB0YXNrIGluIGl0cyBvd24gdHVybiwgd2l0aFxuLy8gcHJpb3JpdHkgb3ZlciBvdGhlciBldmVudHMgaW5jbHVkaW5nIElPLCBhbmltYXRpb24sIHJlZmxvdywgYW5kIHJlZHJhd1xuLy8gZXZlbnRzIGluIGJyb3dzZXJzLlxuLy9cbi8vIEFuIGV4Y2VwdGlvbiB0aHJvd24gYnkgYSB0YXNrIHdpbGwgcGVybWFuZW50bHkgaW50ZXJydXB0IHRoZSBwcm9jZXNzaW5nIG9mXG4vLyBzdWJzZXF1ZW50IHRhc2tzLiBUaGUgaGlnaGVyIGxldmVsIGBhc2FwYCBmdW5jdGlvbiBlbnN1cmVzIHRoYXQgaWYgYW5cbi8vIGV4Y2VwdGlvbiBpcyB0aHJvd24gYnkgYSB0YXNrLCB0aGF0IHRoZSB0YXNrIHF1ZXVlIHdpbGwgY29udGludWUgZmx1c2hpbmcgYXNcbi8vIHNvb24gYXMgcG9zc2libGUsIGJ1dCBpZiB5b3UgdXNlIGByYXdBc2FwYCBkaXJlY3RseSwgeW91IGFyZSByZXNwb25zaWJsZSB0b1xuLy8gZWl0aGVyIGVuc3VyZSB0aGF0IG5vIGV4Y2VwdGlvbnMgYXJlIHRocm93biBmcm9tIHlvdXIgdGFzaywgb3IgdG8gbWFudWFsbHlcbi8vIGNhbGwgYHJhd0FzYXAucmVxdWVzdEZsdXNoYCBpZiBhbiBleGNlcHRpb24gaXMgdGhyb3duLlxubW9kdWxlLmV4cG9ydHMgPSByYXdBc2FwO1xuZnVuY3Rpb24gcmF3QXNhcCh0YXNrKSB7XG4gICAgaWYgKCFxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcmVxdWVzdEZsdXNoKCk7XG4gICAgICAgIGZsdXNoaW5nID0gdHJ1ZTtcbiAgICB9XG4gICAgLy8gRXF1aXZhbGVudCB0byBwdXNoLCBidXQgYXZvaWRzIGEgZnVuY3Rpb24gY2FsbC5cbiAgICBxdWV1ZVtxdWV1ZS5sZW5ndGhdID0gdGFzaztcbn1cblxudmFyIHF1ZXVlID0gW107XG4vLyBPbmNlIGEgZmx1c2ggaGFzIGJlZW4gcmVxdWVzdGVkLCBubyBmdXJ0aGVyIGNhbGxzIHRvIGByZXF1ZXN0Rmx1c2hgIGFyZVxuLy8gbmVjZXNzYXJ5IHVudGlsIHRoZSBuZXh0IGBmbHVzaGAgY29tcGxldGVzLlxudmFyIGZsdXNoaW5nID0gZmFsc2U7XG4vLyBgcmVxdWVzdEZsdXNoYCBpcyBhbiBpbXBsZW1lbnRhdGlvbi1zcGVjaWZpYyBtZXRob2QgdGhhdCBhdHRlbXB0cyB0byBraWNrXG4vLyBvZmYgYSBgZmx1c2hgIGV2ZW50IGFzIHF1aWNrbHkgYXMgcG9zc2libGUuIGBmbHVzaGAgd2lsbCBhdHRlbXB0IHRvIGV4aGF1c3Rcbi8vIHRoZSBldmVudCBxdWV1ZSBiZWZvcmUgeWllbGRpbmcgdG8gdGhlIGJyb3dzZXIncyBvd24gZXZlbnQgbG9vcC5cbnZhciByZXF1ZXN0Rmx1c2g7XG4vLyBUaGUgcG9zaXRpb24gb2YgdGhlIG5leHQgdGFzayB0byBleGVjdXRlIGluIHRoZSB0YXNrIHF1ZXVlLiBUaGlzIGlzXG4vLyBwcmVzZXJ2ZWQgYmV0d2VlbiBjYWxscyB0byBgZmx1c2hgIHNvIHRoYXQgaXQgY2FuIGJlIHJlc3VtZWQgaWZcbi8vIGEgdGFzayB0aHJvd3MgYW4gZXhjZXB0aW9uLlxudmFyIGluZGV4ID0gMDtcbi8vIElmIGEgdGFzayBzY2hlZHVsZXMgYWRkaXRpb25hbCB0YXNrcyByZWN1cnNpdmVseSwgdGhlIHRhc2sgcXVldWUgY2FuIGdyb3dcbi8vIHVuYm91bmRlZC4gVG8gcHJldmVudCBtZW1vcnkgZXhoYXVzdGlvbiwgdGhlIHRhc2sgcXVldWUgd2lsbCBwZXJpb2RpY2FsbHlcbi8vIHRydW5jYXRlIGFscmVhZHktY29tcGxldGVkIHRhc2tzLlxudmFyIGNhcGFjaXR5ID0gMTAyNDtcblxuLy8gVGhlIGZsdXNoIGZ1bmN0aW9uIHByb2Nlc3NlcyBhbGwgdGFza3MgdGhhdCBoYXZlIGJlZW4gc2NoZWR1bGVkIHdpdGhcbi8vIGByYXdBc2FwYCB1bmxlc3MgYW5kIHVudGlsIG9uZSBvZiB0aG9zZSB0YXNrcyB0aHJvd3MgYW4gZXhjZXB0aW9uLlxuLy8gSWYgYSB0YXNrIHRocm93cyBhbiBleGNlcHRpb24sIGBmbHVzaGAgZW5zdXJlcyB0aGF0IGl0cyBzdGF0ZSB3aWxsIHJlbWFpblxuLy8gY29uc2lzdGVudCBhbmQgd2lsbCByZXN1bWUgd2hlcmUgaXQgbGVmdCBvZmYgd2hlbiBjYWxsZWQgYWdhaW4uXG4vLyBIb3dldmVyLCBgZmx1c2hgIGRvZXMgbm90IG1ha2UgYW55IGFycmFuZ2VtZW50cyB0byBiZSBjYWxsZWQgYWdhaW4gaWYgYW5cbi8vIGV4Y2VwdGlvbiBpcyB0aHJvd24uXG5mdW5jdGlvbiBmbHVzaCgpIHtcbiAgICB3aGlsZSAoaW5kZXggPCBxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGN1cnJlbnRJbmRleCA9IGluZGV4O1xuICAgICAgICAvLyBBZHZhbmNlIHRoZSBpbmRleCBiZWZvcmUgY2FsbGluZyB0aGUgdGFzay4gVGhpcyBlbnN1cmVzIHRoYXQgd2Ugd2lsbFxuICAgICAgICAvLyBiZWdpbiBmbHVzaGluZyBvbiB0aGUgbmV4dCB0YXNrIHRoZSB0YXNrIHRocm93cyBhbiBlcnJvci5cbiAgICAgICAgaW5kZXggPSBpbmRleCArIDE7XG4gICAgICAgIHF1ZXVlW2N1cnJlbnRJbmRleF0uY2FsbCgpO1xuICAgICAgICAvLyBQcmV2ZW50IGxlYWtpbmcgbWVtb3J5IGZvciBsb25nIGNoYWlucyBvZiByZWN1cnNpdmUgY2FsbHMgdG8gYGFzYXBgLlxuICAgICAgICAvLyBJZiB3ZSBjYWxsIGBhc2FwYCB3aXRoaW4gdGFza3Mgc2NoZWR1bGVkIGJ5IGBhc2FwYCwgdGhlIHF1ZXVlIHdpbGxcbiAgICAgICAgLy8gZ3JvdywgYnV0IHRvIGF2b2lkIGFuIE8obikgd2FsayBmb3IgZXZlcnkgdGFzayB3ZSBleGVjdXRlLCB3ZSBkb24ndFxuICAgICAgICAvLyBzaGlmdCB0YXNrcyBvZmYgdGhlIHF1ZXVlIGFmdGVyIHRoZXkgaGF2ZSBiZWVuIGV4ZWN1dGVkLlxuICAgICAgICAvLyBJbnN0ZWFkLCB3ZSBwZXJpb2RpY2FsbHkgc2hpZnQgMTAyNCB0YXNrcyBvZmYgdGhlIHF1ZXVlLlxuICAgICAgICBpZiAoaW5kZXggPiBjYXBhY2l0eSkge1xuICAgICAgICAgICAgLy8gTWFudWFsbHkgc2hpZnQgYWxsIHZhbHVlcyBzdGFydGluZyBhdCB0aGUgaW5kZXggYmFjayB0byB0aGVcbiAgICAgICAgICAgIC8vIGJlZ2lubmluZyBvZiB0aGUgcXVldWUuXG4gICAgICAgICAgICBmb3IgKHZhciBzY2FuID0gMCwgbmV3TGVuZ3RoID0gcXVldWUubGVuZ3RoIC0gaW5kZXg7IHNjYW4gPCBuZXdMZW5ndGg7IHNjYW4rKykge1xuICAgICAgICAgICAgICAgIHF1ZXVlW3NjYW5dID0gcXVldWVbc2NhbiArIGluZGV4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHF1ZXVlLmxlbmd0aCAtPSBpbmRleDtcbiAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5sZW5ndGggPSAwO1xuICAgIGluZGV4ID0gMDtcbiAgICBmbHVzaGluZyA9IGZhbHNlO1xufVxuXG4vLyBgcmVxdWVzdEZsdXNoYCBpcyBpbXBsZW1lbnRlZCB1c2luZyBhIHN0cmF0ZWd5IGJhc2VkIG9uIGRhdGEgY29sbGVjdGVkIGZyb21cbi8vIGV2ZXJ5IGF2YWlsYWJsZSBTYXVjZUxhYnMgU2VsZW5pdW0gd2ViIGRyaXZlciB3b3JrZXIgYXQgdGltZSBvZiB3cml0aW5nLlxuLy8gaHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vc3ByZWFkc2hlZXRzL2QvMW1HLTVVWUd1cDVxeEdkRU1Xa2hQNkJXQ3owNTNOVWIyRTFRb1VUVTE2dUEvZWRpdCNnaWQ9NzgzNzI0NTkzXG5cbi8vIFNhZmFyaSA2IGFuZCA2LjEgZm9yIGRlc2t0b3AsIGlQYWQsIGFuZCBpUGhvbmUgYXJlIHRoZSBvbmx5IGJyb3dzZXJzIHRoYXRcbi8vIGhhdmUgV2ViS2l0TXV0YXRpb25PYnNlcnZlciBidXQgbm90IHVuLXByZWZpeGVkIE11dGF0aW9uT2JzZXJ2ZXIuXG4vLyBNdXN0IHVzZSBgZ2xvYmFsYCBpbnN0ZWFkIG9mIGB3aW5kb3dgIHRvIHdvcmsgaW4gYm90aCBmcmFtZXMgYW5kIHdlYlxuLy8gd29ya2Vycy4gYGdsb2JhbGAgaXMgYSBwcm92aXNpb24gb2YgQnJvd3NlcmlmeSwgTXIsIE1ycywgb3IgTW9wLlxudmFyIEJyb3dzZXJNdXRhdGlvbk9ic2VydmVyID0gZ2xvYmFsLk11dGF0aW9uT2JzZXJ2ZXIgfHwgZ2xvYmFsLldlYktpdE11dGF0aW9uT2JzZXJ2ZXI7XG5cbi8vIE11dGF0aW9uT2JzZXJ2ZXJzIGFyZSBkZXNpcmFibGUgYmVjYXVzZSB0aGV5IGhhdmUgaGlnaCBwcmlvcml0eSBhbmQgd29ya1xuLy8gcmVsaWFibHkgZXZlcnl3aGVyZSB0aGV5IGFyZSBpbXBsZW1lbnRlZC5cbi8vIFRoZXkgYXJlIGltcGxlbWVudGVkIGluIGFsbCBtb2Rlcm4gYnJvd3NlcnMuXG4vL1xuLy8gLSBBbmRyb2lkIDQtNC4zXG4vLyAtIENocm9tZSAyNi0zNFxuLy8gLSBGaXJlZm94IDE0LTI5XG4vLyAtIEludGVybmV0IEV4cGxvcmVyIDExXG4vLyAtIGlQYWQgU2FmYXJpIDYtNy4xXG4vLyAtIGlQaG9uZSBTYWZhcmkgNy03LjFcbi8vIC0gU2FmYXJpIDYtN1xuaWYgKHR5cGVvZiBCcm93c2VyTXV0YXRpb25PYnNlcnZlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgcmVxdWVzdEZsdXNoID0gbWFrZVJlcXVlc3RDYWxsRnJvbU11dGF0aW9uT2JzZXJ2ZXIoZmx1c2gpO1xuXG4vLyBNZXNzYWdlQ2hhbm5lbHMgYXJlIGRlc2lyYWJsZSBiZWNhdXNlIHRoZXkgZ2l2ZSBkaXJlY3QgYWNjZXNzIHRvIHRoZSBIVE1MXG4vLyB0YXNrIHF1ZXVlLCBhcmUgaW1wbGVtZW50ZWQgaW4gSW50ZXJuZXQgRXhwbG9yZXIgMTAsIFNhZmFyaSA1LjAtMSwgYW5kIE9wZXJhXG4vLyAxMS0xMiwgYW5kIGluIHdlYiB3b3JrZXJzIGluIG1hbnkgZW5naW5lcy5cbi8vIEFsdGhvdWdoIG1lc3NhZ2UgY2hhbm5lbHMgeWllbGQgdG8gYW55IHF1ZXVlZCByZW5kZXJpbmcgYW5kIElPIHRhc2tzLCB0aGV5XG4vLyB3b3VsZCBiZSBiZXR0ZXIgdGhhbiBpbXBvc2luZyB0aGUgNG1zIGRlbGF5IG9mIHRpbWVycy5cbi8vIEhvd2V2ZXIsIHRoZXkgZG8gbm90IHdvcmsgcmVsaWFibHkgaW4gSW50ZXJuZXQgRXhwbG9yZXIgb3IgU2FmYXJpLlxuXG4vLyBJbnRlcm5ldCBFeHBsb3JlciAxMCBpcyB0aGUgb25seSBicm93c2VyIHRoYXQgaGFzIHNldEltbWVkaWF0ZSBidXQgZG9lc1xuLy8gbm90IGhhdmUgTXV0YXRpb25PYnNlcnZlcnMuXG4vLyBBbHRob3VnaCBzZXRJbW1lZGlhdGUgeWllbGRzIHRvIHRoZSBicm93c2VyJ3MgcmVuZGVyZXIsIGl0IHdvdWxkIGJlXG4vLyBwcmVmZXJyYWJsZSB0byBmYWxsaW5nIGJhY2sgdG8gc2V0VGltZW91dCBzaW5jZSBpdCBkb2VzIG5vdCBoYXZlXG4vLyB0aGUgbWluaW11bSA0bXMgcGVuYWx0eS5cbi8vIFVuZm9ydHVuYXRlbHkgdGhlcmUgYXBwZWFycyB0byBiZSBhIGJ1ZyBpbiBJbnRlcm5ldCBFeHBsb3JlciAxMCBNb2JpbGUgKGFuZFxuLy8gRGVza3RvcCB0byBhIGxlc3NlciBleHRlbnQpIHRoYXQgcmVuZGVycyBib3RoIHNldEltbWVkaWF0ZSBhbmRcbi8vIE1lc3NhZ2VDaGFubmVsIHVzZWxlc3MgZm9yIHRoZSBwdXJwb3NlcyBvZiBBU0FQLlxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2tyaXNrb3dhbC9xL2lzc3Vlcy8zOTZcblxuLy8gVGltZXJzIGFyZSBpbXBsZW1lbnRlZCB1bml2ZXJzYWxseS5cbi8vIFdlIGZhbGwgYmFjayB0byB0aW1lcnMgaW4gd29ya2VycyBpbiBtb3N0IGVuZ2luZXMsIGFuZCBpbiBmb3JlZ3JvdW5kXG4vLyBjb250ZXh0cyBpbiB0aGUgZm9sbG93aW5nIGJyb3dzZXJzLlxuLy8gSG93ZXZlciwgbm90ZSB0aGF0IGV2ZW4gdGhpcyBzaW1wbGUgY2FzZSByZXF1aXJlcyBudWFuY2VzIHRvIG9wZXJhdGUgaW4gYVxuLy8gYnJvYWQgc3BlY3RydW0gb2YgYnJvd3NlcnMuXG4vL1xuLy8gLSBGaXJlZm94IDMtMTNcbi8vIC0gSW50ZXJuZXQgRXhwbG9yZXIgNi05XG4vLyAtIGlQYWQgU2FmYXJpIDQuM1xuLy8gLSBMeW54IDIuOC43XG59IGVsc2Uge1xuICAgIHJlcXVlc3RGbHVzaCA9IG1ha2VSZXF1ZXN0Q2FsbEZyb21UaW1lcihmbHVzaCk7XG59XG5cbi8vIGByZXF1ZXN0Rmx1c2hgIHJlcXVlc3RzIHRoYXQgdGhlIGhpZ2ggcHJpb3JpdHkgZXZlbnQgcXVldWUgYmUgZmx1c2hlZCBhc1xuLy8gc29vbiBhcyBwb3NzaWJsZS5cbi8vIFRoaXMgaXMgdXNlZnVsIHRvIHByZXZlbnQgYW4gZXJyb3IgdGhyb3duIGluIGEgdGFzayBmcm9tIHN0YWxsaW5nIHRoZSBldmVudFxuLy8gcXVldWUgaWYgdGhlIGV4Y2VwdGlvbiBoYW5kbGVkIGJ5IE5vZGUuanPigJlzXG4vLyBgcHJvY2Vzcy5vbihcInVuY2F1Z2h0RXhjZXB0aW9uXCIpYCBvciBieSBhIGRvbWFpbi5cbnJhd0FzYXAucmVxdWVzdEZsdXNoID0gcmVxdWVzdEZsdXNoO1xuXG4vLyBUbyByZXF1ZXN0IGEgaGlnaCBwcmlvcml0eSBldmVudCwgd2UgaW5kdWNlIGEgbXV0YXRpb24gb2JzZXJ2ZXIgYnkgdG9nZ2xpbmdcbi8vIHRoZSB0ZXh0IG9mIGEgdGV4dCBub2RlIGJldHdlZW4gXCIxXCIgYW5kIFwiLTFcIi5cbmZ1bmN0aW9uIG1ha2VSZXF1ZXN0Q2FsbEZyb21NdXRhdGlvbk9ic2VydmVyKGNhbGxiYWNrKSB7XG4gICAgdmFyIHRvZ2dsZSA9IDE7XG4gICAgdmFyIG9ic2VydmVyID0gbmV3IEJyb3dzZXJNdXRhdGlvbk9ic2VydmVyKGNhbGxiYWNrKTtcbiAgICB2YXIgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiXCIpO1xuICAgIG9ic2VydmVyLm9ic2VydmUobm9kZSwge2NoYXJhY3RlckRhdGE6IHRydWV9KTtcbiAgICByZXR1cm4gZnVuY3Rpb24gcmVxdWVzdENhbGwoKSB7XG4gICAgICAgIHRvZ2dsZSA9IC10b2dnbGU7XG4gICAgICAgIG5vZGUuZGF0YSA9IHRvZ2dsZTtcbiAgICB9O1xufVxuXG4vLyBUaGUgbWVzc2FnZSBjaGFubmVsIHRlY2huaXF1ZSB3YXMgZGlzY292ZXJlZCBieSBNYWx0ZSBVYmwgYW5kIHdhcyB0aGVcbi8vIG9yaWdpbmFsIGZvdW5kYXRpb24gZm9yIHRoaXMgbGlicmFyeS5cbi8vIGh0dHA6Ly93d3cubm9uYmxvY2tpbmcuaW8vMjAxMS8wNi93aW5kb3duZXh0dGljay5odG1sXG5cbi8vIFNhZmFyaSA2LjAuNSAoYXQgbGVhc3QpIGludGVybWl0dGVudGx5IGZhaWxzIHRvIGNyZWF0ZSBtZXNzYWdlIHBvcnRzIG9uIGFcbi8vIHBhZ2UncyBmaXJzdCBsb2FkLiBUaGFua2Z1bGx5LCB0aGlzIHZlcnNpb24gb2YgU2FmYXJpIHN1cHBvcnRzXG4vLyBNdXRhdGlvbk9ic2VydmVycywgc28gd2UgZG9uJ3QgbmVlZCB0byBmYWxsIGJhY2sgaW4gdGhhdCBjYXNlLlxuXG4vLyBmdW5jdGlvbiBtYWtlUmVxdWVzdENhbGxGcm9tTWVzc2FnZUNoYW5uZWwoY2FsbGJhY2spIHtcbi8vICAgICB2YXIgY2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuLy8gICAgIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gY2FsbGJhY2s7XG4vLyAgICAgcmV0dXJuIGZ1bmN0aW9uIHJlcXVlc3RDYWxsKCkge1xuLy8gICAgICAgICBjaGFubmVsLnBvcnQyLnBvc3RNZXNzYWdlKDApO1xuLy8gICAgIH07XG4vLyB9XG5cbi8vIEZvciByZWFzb25zIGV4cGxhaW5lZCBhYm92ZSwgd2UgYXJlIGFsc28gdW5hYmxlIHRvIHVzZSBgc2V0SW1tZWRpYXRlYFxuLy8gdW5kZXIgYW55IGNpcmN1bXN0YW5jZXMuXG4vLyBFdmVuIGlmIHdlIHdlcmUsIHRoZXJlIGlzIGFub3RoZXIgYnVnIGluIEludGVybmV0IEV4cGxvcmVyIDEwLlxuLy8gSXQgaXMgbm90IHN1ZmZpY2llbnQgdG8gYXNzaWduIGBzZXRJbW1lZGlhdGVgIHRvIGByZXF1ZXN0Rmx1c2hgIGJlY2F1c2Vcbi8vIGBzZXRJbW1lZGlhdGVgIG11c3QgYmUgY2FsbGVkICpieSBuYW1lKiBhbmQgdGhlcmVmb3JlIG11c3QgYmUgd3JhcHBlZCBpbiBhXG4vLyBjbG9zdXJlLlxuLy8gTmV2ZXIgZm9yZ2V0LlxuXG4vLyBmdW5jdGlvbiBtYWtlUmVxdWVzdENhbGxGcm9tU2V0SW1tZWRpYXRlKGNhbGxiYWNrKSB7XG4vLyAgICAgcmV0dXJuIGZ1bmN0aW9uIHJlcXVlc3RDYWxsKCkge1xuLy8gICAgICAgICBzZXRJbW1lZGlhdGUoY2FsbGJhY2spO1xuLy8gICAgIH07XG4vLyB9XG5cbi8vIFNhZmFyaSA2LjAgaGFzIGEgcHJvYmxlbSB3aGVyZSB0aW1lcnMgd2lsbCBnZXQgbG9zdCB3aGlsZSB0aGUgdXNlciBpc1xuLy8gc2Nyb2xsaW5nLiBUaGlzIHByb2JsZW0gZG9lcyBub3QgaW1wYWN0IEFTQVAgYmVjYXVzZSBTYWZhcmkgNi4wIHN1cHBvcnRzXG4vLyBtdXRhdGlvbiBvYnNlcnZlcnMsIHNvIHRoYXQgaW1wbGVtZW50YXRpb24gaXMgdXNlZCBpbnN0ZWFkLlxuLy8gSG93ZXZlciwgaWYgd2UgZXZlciBlbGVjdCB0byB1c2UgdGltZXJzIGluIFNhZmFyaSwgdGhlIHByZXZhbGVudCB3b3JrLWFyb3VuZFxuLy8gaXMgdG8gYWRkIGEgc2Nyb2xsIGV2ZW50IGxpc3RlbmVyIHRoYXQgY2FsbHMgZm9yIGEgZmx1c2guXG5cbi8vIGBzZXRUaW1lb3V0YCBkb2VzIG5vdCBjYWxsIHRoZSBwYXNzZWQgY2FsbGJhY2sgaWYgdGhlIGRlbGF5IGlzIGxlc3MgdGhhblxuLy8gYXBwcm94aW1hdGVseSA3IGluIHdlYiB3b3JrZXJzIGluIEZpcmVmb3ggOCB0aHJvdWdoIDE4LCBhbmQgc29tZXRpbWVzIG5vdFxuLy8gZXZlbiB0aGVuLlxuXG5mdW5jdGlvbiBtYWtlUmVxdWVzdENhbGxGcm9tVGltZXIoY2FsbGJhY2spIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gcmVxdWVzdENhbGwoKSB7XG4gICAgICAgIC8vIFdlIGRpc3BhdGNoIGEgdGltZW91dCB3aXRoIGEgc3BlY2lmaWVkIGRlbGF5IG9mIDAgZm9yIGVuZ2luZXMgdGhhdFxuICAgICAgICAvLyBjYW4gcmVsaWFibHkgYWNjb21tb2RhdGUgdGhhdCByZXF1ZXN0LiBUaGlzIHdpbGwgdXN1YWxseSBiZSBzbmFwcGVkXG4gICAgICAgIC8vIHRvIGEgNCBtaWxpc2Vjb25kIGRlbGF5LCBidXQgb25jZSB3ZSdyZSBmbHVzaGluZywgdGhlcmUncyBubyBkZWxheVxuICAgICAgICAvLyBiZXR3ZWVuIGV2ZW50cy5cbiAgICAgICAgdmFyIHRpbWVvdXRIYW5kbGUgPSBzZXRUaW1lb3V0KGhhbmRsZVRpbWVyLCAwKTtcbiAgICAgICAgLy8gSG93ZXZlciwgc2luY2UgdGhpcyB0aW1lciBnZXRzIGZyZXF1ZW50bHkgZHJvcHBlZCBpbiBGaXJlZm94XG4gICAgICAgIC8vIHdvcmtlcnMsIHdlIGVubGlzdCBhbiBpbnRlcnZhbCBoYW5kbGUgdGhhdCB3aWxsIHRyeSB0byBmaXJlXG4gICAgICAgIC8vIGFuIGV2ZW50IDIwIHRpbWVzIHBlciBzZWNvbmQgdW50aWwgaXQgc3VjY2VlZHMuXG4gICAgICAgIHZhciBpbnRlcnZhbEhhbmRsZSA9IHNldEludGVydmFsKGhhbmRsZVRpbWVyLCA1MCk7XG5cbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlVGltZXIoKSB7XG4gICAgICAgICAgICAvLyBXaGljaGV2ZXIgdGltZXIgc3VjY2VlZHMgd2lsbCBjYW5jZWwgYm90aCB0aW1lcnMgYW5kXG4gICAgICAgICAgICAvLyBleGVjdXRlIHRoZSBjYWxsYmFjay5cbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0SGFuZGxlKTtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxIYW5kbGUpO1xuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgIH07XG59XG5cbi8vIFRoaXMgaXMgZm9yIGBhc2FwLmpzYCBvbmx5LlxuLy8gSXRzIG5hbWUgd2lsbCBiZSBwZXJpb2RpY2FsbHkgcmFuZG9taXplZCB0byBicmVhayBhbnkgY29kZSB0aGF0IGRlcGVuZHMgb25cbi8vIGl0cyBleGlzdGVuY2UuXG5yYXdBc2FwLm1ha2VSZXF1ZXN0Q2FsbEZyb21UaW1lciA9IG1ha2VSZXF1ZXN0Q2FsbEZyb21UaW1lcjtcblxuLy8gQVNBUCB3YXMgb3JpZ2luYWxseSBhIG5leHRUaWNrIHNoaW0gaW5jbHVkZWQgaW4gUS4gVGhpcyB3YXMgZmFjdG9yZWQgb3V0XG4vLyBpbnRvIHRoaXMgQVNBUCBwYWNrYWdlLiBJdCB3YXMgbGF0ZXIgYWRhcHRlZCB0byBSU1ZQIHdoaWNoIG1hZGUgZnVydGhlclxuLy8gYW1lbmRtZW50cy4gVGhlc2UgZGVjaXNpb25zLCBwYXJ0aWN1bGFybHkgdG8gbWFyZ2luYWxpemUgTWVzc2FnZUNoYW5uZWwgYW5kXG4vLyB0byBjYXB0dXJlIHRoZSBNdXRhdGlvbk9ic2VydmVyIGltcGxlbWVudGF0aW9uIGluIGEgY2xvc3VyZSwgd2VyZSBpbnRlZ3JhdGVkXG4vLyBiYWNrIGludG8gQVNBUCBwcm9wZXIuXG4vLyBodHRwczovL2dpdGh1Yi5jb20vdGlsZGVpby9yc3ZwLmpzL2Jsb2IvY2RkZjcyMzI1NDZhOWNmODU4NTI0Yjc1Y2RlNmY5ZWRmNzI2MjBhNy9saWIvcnN2cC9hc2FwLmpzXG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGRvbWFpbjsgLy8gVGhlIGRvbWFpbiBtb2R1bGUgaXMgZXhlY3V0ZWQgb24gZGVtYW5kXG52YXIgaGFzU2V0SW1tZWRpYXRlID0gdHlwZW9mIHNldEltbWVkaWF0ZSA9PT0gXCJmdW5jdGlvblwiO1xuXG4vLyBVc2UgdGhlIGZhc3Rlc3QgbWVhbnMgcG9zc2libGUgdG8gZXhlY3V0ZSBhIHRhc2sgaW4gaXRzIG93biB0dXJuLCB3aXRoXG4vLyBwcmlvcml0eSBvdmVyIG90aGVyIGV2ZW50cyBpbmNsdWRpbmcgbmV0d29yayBJTyBldmVudHMgaW4gTm9kZS5qcy5cbi8vXG4vLyBBbiBleGNlcHRpb24gdGhyb3duIGJ5IGEgdGFzayB3aWxsIHBlcm1hbmVudGx5IGludGVycnVwdCB0aGUgcHJvY2Vzc2luZyBvZlxuLy8gc3Vic2VxdWVudCB0YXNrcy4gVGhlIGhpZ2hlciBsZXZlbCBgYXNhcGAgZnVuY3Rpb24gZW5zdXJlcyB0aGF0IGlmIGFuXG4vLyBleGNlcHRpb24gaXMgdGhyb3duIGJ5IGEgdGFzaywgdGhhdCB0aGUgdGFzayBxdWV1ZSB3aWxsIGNvbnRpbnVlIGZsdXNoaW5nIGFzXG4vLyBzb29uIGFzIHBvc3NpYmxlLCBidXQgaWYgeW91IHVzZSBgcmF3QXNhcGAgZGlyZWN0bHksIHlvdSBhcmUgcmVzcG9uc2libGUgdG9cbi8vIGVpdGhlciBlbnN1cmUgdGhhdCBubyBleGNlcHRpb25zIGFyZSB0aHJvd24gZnJvbSB5b3VyIHRhc2ssIG9yIHRvIG1hbnVhbGx5XG4vLyBjYWxsIGByYXdBc2FwLnJlcXVlc3RGbHVzaGAgaWYgYW4gZXhjZXB0aW9uIGlzIHRocm93bi5cbm1vZHVsZS5leHBvcnRzID0gcmF3QXNhcDtcbmZ1bmN0aW9uIHJhd0FzYXAodGFzaykge1xuICAgIGlmICghcXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHJlcXVlc3RGbHVzaCgpO1xuICAgICAgICBmbHVzaGluZyA9IHRydWU7XG4gICAgfVxuICAgIC8vIEF2b2lkcyBhIGZ1bmN0aW9uIGNhbGxcbiAgICBxdWV1ZVtxdWV1ZS5sZW5ndGhdID0gdGFzaztcbn1cblxudmFyIHF1ZXVlID0gW107XG4vLyBPbmNlIGEgZmx1c2ggaGFzIGJlZW4gcmVxdWVzdGVkLCBubyBmdXJ0aGVyIGNhbGxzIHRvIGByZXF1ZXN0Rmx1c2hgIGFyZVxuLy8gbmVjZXNzYXJ5IHVudGlsIHRoZSBuZXh0IGBmbHVzaGAgY29tcGxldGVzLlxudmFyIGZsdXNoaW5nID0gZmFsc2U7XG4vLyBUaGUgcG9zaXRpb24gb2YgdGhlIG5leHQgdGFzayB0byBleGVjdXRlIGluIHRoZSB0YXNrIHF1ZXVlLiBUaGlzIGlzXG4vLyBwcmVzZXJ2ZWQgYmV0d2VlbiBjYWxscyB0byBgZmx1c2hgIHNvIHRoYXQgaXQgY2FuIGJlIHJlc3VtZWQgaWZcbi8vIGEgdGFzayB0aHJvd3MgYW4gZXhjZXB0aW9uLlxudmFyIGluZGV4ID0gMDtcbi8vIElmIGEgdGFzayBzY2hlZHVsZXMgYWRkaXRpb25hbCB0YXNrcyByZWN1cnNpdmVseSwgdGhlIHRhc2sgcXVldWUgY2FuIGdyb3dcbi8vIHVuYm91bmRlZC4gVG8gcHJldmVudCBtZW1vcnkgZXhjYXVzdGlvbiwgdGhlIHRhc2sgcXVldWUgd2lsbCBwZXJpb2RpY2FsbHlcbi8vIHRydW5jYXRlIGFscmVhZHktY29tcGxldGVkIHRhc2tzLlxudmFyIGNhcGFjaXR5ID0gMTAyNDtcblxuLy8gVGhlIGZsdXNoIGZ1bmN0aW9uIHByb2Nlc3NlcyBhbGwgdGFza3MgdGhhdCBoYXZlIGJlZW4gc2NoZWR1bGVkIHdpdGhcbi8vIGByYXdBc2FwYCB1bmxlc3MgYW5kIHVudGlsIG9uZSBvZiB0aG9zZSB0YXNrcyB0aHJvd3MgYW4gZXhjZXB0aW9uLlxuLy8gSWYgYSB0YXNrIHRocm93cyBhbiBleGNlcHRpb24sIGBmbHVzaGAgZW5zdXJlcyB0aGF0IGl0cyBzdGF0ZSB3aWxsIHJlbWFpblxuLy8gY29uc2lzdGVudCBhbmQgd2lsbCByZXN1bWUgd2hlcmUgaXQgbGVmdCBvZmYgd2hlbiBjYWxsZWQgYWdhaW4uXG4vLyBIb3dldmVyLCBgZmx1c2hgIGRvZXMgbm90IG1ha2UgYW55IGFycmFuZ2VtZW50cyB0byBiZSBjYWxsZWQgYWdhaW4gaWYgYW5cbi8vIGV4Y2VwdGlvbiBpcyB0aHJvd24uXG5mdW5jdGlvbiBmbHVzaCgpIHtcbiAgICB3aGlsZSAoaW5kZXggPCBxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGN1cnJlbnRJbmRleCA9IGluZGV4O1xuICAgICAgICAvLyBBZHZhbmNlIHRoZSBpbmRleCBiZWZvcmUgY2FsbGluZyB0aGUgdGFzay4gVGhpcyBlbnN1cmVzIHRoYXQgd2Ugd2lsbFxuICAgICAgICAvLyBiZWdpbiBmbHVzaGluZyBvbiB0aGUgbmV4dCB0YXNrIHRoZSB0YXNrIHRocm93cyBhbiBlcnJvci5cbiAgICAgICAgaW5kZXggPSBpbmRleCArIDE7XG4gICAgICAgIHF1ZXVlW2N1cnJlbnRJbmRleF0uY2FsbCgpO1xuICAgICAgICAvLyBQcmV2ZW50IGxlYWtpbmcgbWVtb3J5IGZvciBsb25nIGNoYWlucyBvZiByZWN1cnNpdmUgY2FsbHMgdG8gYGFzYXBgLlxuICAgICAgICAvLyBJZiB3ZSBjYWxsIGBhc2FwYCB3aXRoaW4gdGFza3Mgc2NoZWR1bGVkIGJ5IGBhc2FwYCwgdGhlIHF1ZXVlIHdpbGxcbiAgICAgICAgLy8gZ3JvdywgYnV0IHRvIGF2b2lkIGFuIE8obikgd2FsayBmb3IgZXZlcnkgdGFzayB3ZSBleGVjdXRlLCB3ZSBkb24ndFxuICAgICAgICAvLyBzaGlmdCB0YXNrcyBvZmYgdGhlIHF1ZXVlIGFmdGVyIHRoZXkgaGF2ZSBiZWVuIGV4ZWN1dGVkLlxuICAgICAgICAvLyBJbnN0ZWFkLCB3ZSBwZXJpb2RpY2FsbHkgc2hpZnQgMTAyNCB0YXNrcyBvZmYgdGhlIHF1ZXVlLlxuICAgICAgICBpZiAoaW5kZXggPiBjYXBhY2l0eSkge1xuICAgICAgICAgICAgLy8gTWFudWFsbHkgc2hpZnQgYWxsIHZhbHVlcyBzdGFydGluZyBhdCB0aGUgaW5kZXggYmFjayB0byB0aGVcbiAgICAgICAgICAgIC8vIGJlZ2lubmluZyBvZiB0aGUgcXVldWUuXG4gICAgICAgICAgICBmb3IgKHZhciBzY2FuID0gMCwgbmV3TGVuZ3RoID0gcXVldWUubGVuZ3RoIC0gaW5kZXg7IHNjYW4gPCBuZXdMZW5ndGg7IHNjYW4rKykge1xuICAgICAgICAgICAgICAgIHF1ZXVlW3NjYW5dID0gcXVldWVbc2NhbiArIGluZGV4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHF1ZXVlLmxlbmd0aCAtPSBpbmRleDtcbiAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5sZW5ndGggPSAwO1xuICAgIGluZGV4ID0gMDtcbiAgICBmbHVzaGluZyA9IGZhbHNlO1xufVxuXG5yYXdBc2FwLnJlcXVlc3RGbHVzaCA9IHJlcXVlc3RGbHVzaDtcbmZ1bmN0aW9uIHJlcXVlc3RGbHVzaCgpIHtcbiAgICAvLyBFbnN1cmUgZmx1c2hpbmcgaXMgbm90IGJvdW5kIHRvIGFueSBkb21haW4uXG4gICAgLy8gSXQgaXMgbm90IHN1ZmZpY2llbnQgdG8gZXhpdCB0aGUgZG9tYWluLCBiZWNhdXNlIGRvbWFpbnMgZXhpc3Qgb24gYSBzdGFjay5cbiAgICAvLyBUbyBleGVjdXRlIGNvZGUgb3V0c2lkZSBvZiBhbnkgZG9tYWluLCB0aGUgZm9sbG93aW5nIGRhbmNlIGlzIG5lY2Vzc2FyeS5cbiAgICB2YXIgcGFyZW50RG9tYWluID0gcHJvY2Vzcy5kb21haW47XG4gICAgaWYgKHBhcmVudERvbWFpbikge1xuICAgICAgICBpZiAoIWRvbWFpbikge1xuICAgICAgICAgICAgLy8gTGF6eSBleGVjdXRlIHRoZSBkb21haW4gbW9kdWxlLlxuICAgICAgICAgICAgLy8gT25seSBlbXBsb3llZCBpZiB0aGUgdXNlciBlbGVjdHMgdG8gdXNlIGRvbWFpbnMuXG4gICAgICAgICAgICBkb21haW4gPSByZXF1aXJlKFwiZG9tYWluXCIpO1xuICAgICAgICB9XG4gICAgICAgIGRvbWFpbi5hY3RpdmUgPSBwcm9jZXNzLmRvbWFpbiA9IG51bGw7XG4gICAgfVxuXG4gICAgLy8gYHNldEltbWVkaWF0ZWAgaXMgc2xvd2VyIHRoYXQgYHByb2Nlc3MubmV4dFRpY2tgLCBidXQgYHByb2Nlc3MubmV4dFRpY2tgXG4gICAgLy8gY2Fubm90IGhhbmRsZSByZWN1cnNpb24uXG4gICAgLy8gYHJlcXVlc3RGbHVzaGAgd2lsbCBvbmx5IGJlIGNhbGxlZCByZWN1cnNpdmVseSBmcm9tIGBhc2FwLmpzYCwgdG8gcmVzdW1lXG4gICAgLy8gZmx1c2hpbmcgYWZ0ZXIgYW4gZXJyb3IgaXMgdGhyb3duIGludG8gYSBkb21haW4uXG4gICAgLy8gQ29udmVuaWVudGx5LCBgc2V0SW1tZWRpYXRlYCB3YXMgaW50cm9kdWNlZCBpbiB0aGUgc2FtZSB2ZXJzaW9uXG4gICAgLy8gYHByb2Nlc3MubmV4dFRpY2tgIHN0YXJ0ZWQgdGhyb3dpbmcgcmVjdXJzaW9uIGVycm9ycy5cbiAgICBpZiAoZmx1c2hpbmcgJiYgaGFzU2V0SW1tZWRpYXRlKSB7XG4gICAgICAgIHNldEltbWVkaWF0ZShmbHVzaCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcHJvY2Vzcy5uZXh0VGljayhmbHVzaCk7XG4gICAgfVxuXG4gICAgaWYgKHBhcmVudERvbWFpbikge1xuICAgICAgICBkb21haW4uYWN0aXZlID0gcHJvY2Vzcy5kb21haW4gPSBwYXJlbnREb21haW47XG4gICAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyBUaGlzIGZpbGUgY29udGFpbnMgZGVmaW5pdGlvbnMgb2YgcnVsZXMgaG93IGxvY2F0aW9uIFVSTHMgYXJlIHRyYW5zbGF0ZWRcbi8vIHRvIHBhcmFtZXRlcnMgZm9yIHN0b3JlcyBpbiBDYXRiZXJyeSBhcHBsaWNhdGlvbi5cbi8vXG4vLyBGb3JtYXQ6XG4vLyAvc29tZS86cGFyYW1ldGVyW3N0b3JlMSxzdG9yZTIsc3RvcmUzXVxuLy9cbi8vIE1vcmUgZGV0YWlscyBoZXJlOlxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2NhdGJlcnJ5L2NhdGJlcnJ5L2Jsb2IvbWFzdGVyL2RvY3MvaW5kZXgubWQjcm91dGluZ1xuXG5tb2R1bGUuZXhwb3J0cyA9IFtcbiAgLy8gJy86ZmlsdGVyW1RvZG9MaXN0LEZpbHRlcnNdJ1xuICAnLzpwYWdlW1BhZ2VzXSdcbiAgLy8gJy86cGFnZVtQYWdlc10/cXVlcnk9OnF1ZXJ5W2NvbW1pdHMvU2VhcmNoXSdcblx0Ly8gJy8nXG5dO1xuIiwiLypcbiAqIGNhdGJlcnJ5XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0IERlbmlzIFJlY2hrdW5vdiBhbmQgcHJvamVjdCBjb250cmlidXRvcnMuXG4gKlxuICogY2F0YmVycnkncyBsaWNlbnNlIGZvbGxvd3M6XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb25cbiAqIG9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uXG4gKiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sXG4gKiBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLFxuICogcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSxcbiAqIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4gKiBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuICogaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuICogT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKlxuICogVGhpcyBsaWNlbnNlIGFwcGxpZXMgdG8gYWxsIHBhcnRzIG9mIGNhdGJlcnJ5IHRoYXQgYXJlIG5vdCBleHRlcm5hbGx5XG4gKiBtYWludGFpbmVkIGxpYnJhcmllcy5cbiAqL1xuXG4vKipcbiAqIFRoaXMgbW9kdWxlIGlzIGEgdGVtcGxhdGUgYW5kIGl0IGlzIHVzZWQgb25seSB3aXRoIHNvbWUgc3RyaW5nIHJlcGxhY2VzXG4gKiBieSBCcm93c2VyQnVuZGxlQnVpbGRlciBtb2R1bGUuIEl0IGRvZXMgbm90IHdvcmsgYnkgaXRzZWxmLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHN0b3JlcyA9IFtcblxue25hbWU6ICdNYWluJywgY29uc3RydWN0b3I6IHJlcXVpcmUoJy4vY2F0YmVycnlfc3RvcmVzL01haW4uanMnKX0sXG57bmFtZTogJ1BhZ2VzJywgY29uc3RydWN0b3I6IHJlcXVpcmUoJy4vY2F0YmVycnlfc3RvcmVzL1BhZ2VzLmpzJyl9XG5dO1xuXG52YXIgY29tcG9uZW50cyA9IFtcblxue25hbWU6ICdkb2N1bWVudCcsIGNvbnN0cnVjdG9yOiByZXF1aXJlKCcuL2NhdGJlcnJ5X2NvbXBvbmVudHMvZG9jdW1lbnQvRG9jdW1lbnQuanMnKSwgcHJvcGVydGllczoge1wibmFtZVwiOlwiZG9jdW1lbnRcIixcInRlbXBsYXRlXCI6XCIuL2RvY3VtZW50Lmhic1wiLFwibG9naWNcIjpcIi4vRG9jdW1lbnQuanNcIn0sIHRlbXBsYXRlU291cmNlOiAne1wiY29tcGlsZXJcIjpbNixcIj49IDIuMC4wLWJldGEuMVwiXSxcIm1haW5cIjpmdW5jdGlvbihkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XFxuICB2YXIgaGVscGVyLCBmdW5jdGlvblR5cGU9XCJmdW5jdGlvblwiLCBoZWxwZXJNaXNzaW5nPWhlbHBlcnMuaGVscGVyTWlzc2luZywgZXNjYXBlRXhwcmVzc2lvbj10aGlzLmVzY2FwZUV4cHJlc3Npb247XFxuICByZXR1cm4gXCI8IURPQ1RZUEUgaHRtbD5cXFxcbjxodG1sIGxhbmc9XFxcXFwiXCJcXG4gICAgKyBlc2NhcGVFeHByZXNzaW9uKCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMubG9jYWxlIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5sb2NhbGUgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogaGVscGVyTWlzc2luZyksKHR5cGVvZiBoZWxwZXIgPT09IGZ1bmN0aW9uVHlwZSA/IGhlbHBlci5jYWxsKGRlcHRoMCwge1wibmFtZVwiOlwibG9jYWxlXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXFxuICAgICsgXCJcXFxcXCI+XFxcXG48aGVhZCBjYXQtc3RvcmU9XFxcXFwiUGFnZXNcXFxcXCIgcHJlZml4PVxcXFxcIm9nOiBodHRwOi8vb2dwLm1lL25zIyBmYjogaHR0cDovL29ncC5tZS9ucy9mYiNcXFxcXCI+XFxcXG48L2hlYWQ+XFxcXG48Ym9keT5cXFxcbiAgPGNhdC1oZWFkZXIgaWQ9XFxcXFwiZG9jdW1lbnQtaGVhZGVyXFxcXFwiPjwvY2F0LWhlYWRlcj5cXFxcbiAgPGNhdC1oZWxsby13b3JsZCBpZD1cXFxcXCJ1bmlxdWVcXFxcXCIgY2F0LXN0b3JlPVxcXFxcIk1haW5cXFxcXCI+PC9jYXQtaGVsbG8td29ybGQ+XFxcXG4gIDxjYXQtcGFnZXMgaWQ9XFxcXFwiZG9jdW1lbnQtcGFnZXNcXFxcXCIgY2F0LXN0b3JlPVxcXFxcIlBhZ2VzXFxcXFwiPjwvY2F0LXBhZ2VzPlxcXFxuICA8Y2F0LWZvb3RlciBpZD1cXFxcXCJkb2N1bWVudC1mb290ZXJcXFxcXCI+PC9jYXQtZm9vdGVyPlxcXFxuICA8Y2F0LWdhIGlkPVxcXFxcImFuYWx5dGljcy10cmFja2luZy1jb2RlXFxcXFwiPjwvY2F0LWdhPlxcXFxuPC9ib2R5PlxcXFxuPC9odG1sPlxcXFxuXCI7XFxufSxcInVzZURhdGFcIjp0cnVlfScsIGVycm9yVGVtcGxhdGVTb3VyY2U6IG51bGx9LFxue25hbWU6ICdmb290ZXInLCBjb25zdHJ1Y3RvcjogcmVxdWlyZSgnLi9jYXRiZXJyeV9jb21wb25lbnRzL2Zvb3Rlci9pbmRleC5qcycpLCBwcm9wZXJ0aWVzOiB7XCJuYW1lXCI6XCJmb290ZXJcIixcInRlbXBsYXRlXCI6XCIuL3RlbXBsYXRlLmhic1wiLFwibG9naWNcIjpcImluZGV4LmpzXCJ9LCB0ZW1wbGF0ZVNvdXJjZTogJ3tcImNvbXBpbGVyXCI6WzYsXCI+PSAyLjAuMC1iZXRhLjFcIl0sXCJtYWluXCI6ZnVuY3Rpb24oZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xcbiAgdmFyIHN0YWNrMSwgaGVscGVyLCBmdW5jdGlvblR5cGU9XCJmdW5jdGlvblwiLCBoZWxwZXJNaXNzaW5nPWhlbHBlcnMuaGVscGVyTWlzc2luZywgYnVmZmVyID0gXCI8Zm9vdGVyPlxcXFxuXFx0PGRpdiBjbGFzcz1cXFxcXCJ1aSB2ZXJ0aWNhbCBpbnZlcnRlZCBvcmFuZ2UgZm9vdGVyIHNlZ21lbnRcXFxcXCI+XFxcXG5cXHRcXHQ8ZGl2IGNsYXNzPVxcXFxcInVpIHN0YWNrYWJsZSBncmlkXFxcXFwiPlxcXFxuXFx0XFx0XFx0PGRpdiBjbGFzcz1cXFxcXCJvbmUgd2lkZSBjb2x1bW5cXFxcXCI+PC9kaXY+XFxcXG5cXHRcXHRcXHQ8ZGl2IGNsYXNzPVxcXFxcInRocmVlIHdpZGUgY29sdW1uIGZvcmstcGhyYXNlXFxcXFwiPlxcXFxuXFx0XFx0XFx0XFx0PHNwYW4+dGhpcyB3ZWJzaXRlPC9zcGFuPlxcXFxuXFx0XFx0XFx0PC9kaXY+XFxcXG5cXHRcXHRcXHQ8ZGl2IGNsYXNzPVxcXFxcInNldmVuIHdpZGUgY29sdW1uXFxcXFwiPjwvZGl2PlxcXFxuXFx0XFx0XFx0PGRpdiBjbGFzcz1cXFxcXCJ0aHJlZSB3aWRlIHJpZ2h0IGFsaWduZWQgY29sdW1uXFxcXFwiPlxcXFxuXFx0XFx0XFx0XFx0PGRpdiBjbGFzcz1cXFxcXCJib3JkZXJsZXNzIHRpdGxlIGl0ZW1cXFxcXCI+XFxcXG5cXHRcXHRcXHRcXHRcXHRcIjtcXG4gIHN0YWNrMSA9ICgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMuY29weXJpZ2h0VGV4dCB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuY29weXJpZ2h0VGV4dCA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBoZWxwZXJNaXNzaW5nKSwodHlwZW9mIGhlbHBlciA9PT0gZnVuY3Rpb25UeXBlID8gaGVscGVyLmNhbGwoZGVwdGgwLCB7XCJuYW1lXCI6XCJjb3B5cmlnaHRUZXh0XCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSk7XFxuICBpZiAoc3RhY2sxICE9IG51bGwpIHsgYnVmZmVyICs9IHN0YWNrMTsgfVxcbiAgcmV0dXJuIGJ1ZmZlciArIFwiXFxcXG5cXHRcXHRcXHRcXHQ8L2Rpdj5cXFxcblxcdFxcdFxcdDwvZGl2PlxcXFxuXFx0XFx0PC9kaXY+XFxcXG5cXHQ8L2Rpdj5cXFxcbjwvZm9vdGVyPlxcXFxuXCI7XFxufSxcInVzZURhdGFcIjp0cnVlfScsIGVycm9yVGVtcGxhdGVTb3VyY2U6IG51bGx9LFxue25hbWU6ICdnYScsIGNvbnN0cnVjdG9yOiByZXF1aXJlKCcuL2NhdGJlcnJ5X2NvbXBvbmVudHMvZ2EvaW5kZXguanMnKSwgcHJvcGVydGllczoge1wibmFtZVwiOlwiZ2FcIixcInRlbXBsYXRlXCI6XCIuL3RlbXBsYXRlLmhic1wiLFwibG9naWNcIjpcImluZGV4LmpzXCJ9LCB0ZW1wbGF0ZVNvdXJjZTogJ3tcImNvbXBpbGVyXCI6WzYsXCI+PSAyLjAuMC1iZXRhLjFcIl0sXCJtYWluXCI6ZnVuY3Rpb24oZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xcbiAgcmV0dXJuIFwiPHNjcmlwdD5cXFxcblxcdChmdW5jdGlvbihpLHMsbyxnLHIsYSxtKXtpW1xcJ0dvb2dsZUFuYWx5dGljc09iamVjdFxcJ109cjtpW3JdPWlbcl18fGZ1bmN0aW9uKCl7XFxcXG5cXHRcXHQoaVtyXS5xPWlbcl0ucXx8W10pLnB1c2goYXJndW1lbnRzKX0saVtyXS5sPTEqbmV3IERhdGUoKTthPXMuY3JlYXRlRWxlbWVudChvKSxcXFxcblxcdFxcdG09cy5nZXRFbGVtZW50c0J5VGFnTmFtZShvKVswXTthLmFzeW5jPTE7YS5zcmM9ZzttLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGEsbSlcXFxcblxcdH0pKHdpbmRvdyxkb2N1bWVudCxcXCdzY3JpcHRcXCcsXFwnLy93d3cuZ29vZ2xlLWFuYWx5dGljcy5jb20vYW5hbHl0aWNzLmpzXFwnLFxcJ2dhXFwnKTtcXFxcbjwvc2NyaXB0PlwiO1xcbiAgfSxcInVzZURhdGFcIjp0cnVlfScsIGVycm9yVGVtcGxhdGVTb3VyY2U6IG51bGx9LFxue25hbWU6ICdoZWFkJywgY29uc3RydWN0b3I6IHJlcXVpcmUoJy4vY2F0YmVycnlfY29tcG9uZW50cy9oZWFkL0hlYWQuanMnKSwgcHJvcGVydGllczoge1wibmFtZVwiOlwiaGVhZFwiLFwidGVtcGxhdGVcIjpcIi4vaGVhZC5oYnNcIixcImxvZ2ljXCI6XCIuL0hlYWQuanNcIn0sIHRlbXBsYXRlU291cmNlOiAne1wiMVwiOmZ1bmN0aW9uKGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcXG4gIHJldHVybiBcIjwhLS0gTW9iaWxlIGhlYWQgLS0+XFxcXG5cIjtcXG4gIH0sXCJjb21waWxlclwiOls2LFwiPj0gMi4wLjAtYmV0YS4xXCJdLFwibWFpblwiOmZ1bmN0aW9uKGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcXG4gIHZhciBzdGFjazEsIGhlbHBlciwgZnVuY3Rpb25UeXBlPVwiZnVuY3Rpb25cIiwgaGVscGVyTWlzc2luZz1oZWxwZXJzLmhlbHBlck1pc3NpbmcsIGVzY2FwZUV4cHJlc3Npb249dGhpcy5lc2NhcGVFeHByZXNzaW9uLCBidWZmZXIgPSBcIjxtZXRhIGNoYXJzZXQ9XFxcXFwiVVRGLThcXFxcXCI+XFxcXG48bWV0YSBodHRwLWVxdWl2PVxcXFxcIlgtVUEtQ29tcGF0aWJsZVxcXFxcIiBjb250ZW50PVxcXFxcIklFPWVkZ2VcXFxcXCI+XFxcXG48bWV0YSBuYW1lPVxcXFxcInZpZXdwb3J0XFxcXFwiIGNvbnRlbnQ9XFxcXFwid2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTFcXFxcXCI+XFxcXG48dGl0bGU+XCJcXG4gICAgKyBlc2NhcGVFeHByZXNzaW9uKCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMudGl0bGUgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLnRpdGxlIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGhlbHBlck1pc3NpbmcpLCh0eXBlb2YgaGVscGVyID09PSBmdW5jdGlvblR5cGUgPyBoZWxwZXIuY2FsbChkZXB0aDAsIHtcIm5hbWVcIjpcInRpdGxlXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXFxuICAgICsgXCIgOjo6IFwiXFxuICAgICsgZXNjYXBlRXhwcmVzc2lvbigoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLnN1YnRpdGxlIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5zdWJ0aXRsZSA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBoZWxwZXJNaXNzaW5nKSwodHlwZW9mIGhlbHBlciA9PT0gZnVuY3Rpb25UeXBlID8gaGVscGVyLmNhbGwoZGVwdGgwLCB7XCJuYW1lXCI6XCJzdWJ0aXRsZVwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxcbiAgICArIFwiPC90aXRsZT5cXFxcbjxtZXRhIG5hbWU9XFxcXFwiZGVzY3JpcHRpb25cXFxcXCIgY29udGVudD1cXFxcXCJcIlxcbiAgICArIGVzY2FwZUV4cHJlc3Npb24oKChoZWxwZXJzLmwxMG4gfHwgKGRlcHRoMCAmJiBkZXB0aDAubDEwbikgfHwgaGVscGVyTWlzc2luZykuY2FsbChkZXB0aDAsIFwiREVTQ1JJUFRJT05cIiwge1wibmFtZVwiOlwibDEwblwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSkpXFxuICAgICsgXCJcXFxcXCI+XFxcXG48bWV0YSBuYW1lPVxcXFxcImtleXdvcmRzXFxcXFwiIGNvbnRlbnQ9XFxcXFwiXCJcXG4gICAgKyBlc2NhcGVFeHByZXNzaW9uKCgoaGVscGVycy5sMTBuIHx8IChkZXB0aDAgJiYgZGVwdGgwLmwxMG4pIHx8IGhlbHBlck1pc3NpbmcpLmNhbGwoZGVwdGgwLCBcIktFWVdPUkRTXCIsIHtcIm5hbWVcIjpcImwxMG5cIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkpKVxcbiAgICArIFwiXFxcXFwiPlxcXFxuPGxpbmsgaHJlZj1cXFxcXCIvc3RhdGljL2Nzcy9sb2FkZXIuY3NzXFxcXFwiIHJlbD1cXFxcXCJzdHlsZXNoZWV0XFxcXFwiPlxcXFxuXFxcXG48IS0tIEJlZ2luIFR3aXR0ZXIgc3VtbWFyeSBjYXJkIC0tPlxcXFxuPG1ldGEgbmFtZT1cXFxcXCJ0d2l0dGVyOmNhcmRcXFxcXCIgY29udGVudD1cXFxcXCJzdW1tYXJ5XFxcXFwiIC8+XFxcXG48bWV0YSBuYW1lPVxcXFxcInR3aXR0ZXI6c2l0ZVxcXFxcIiBjb250ZW50PVxcXFxcIkBqYm9raWV2XFxcXFwiIC8+XFxcXG48bWV0YSBuYW1lPVxcXFxcInR3aXR0ZXI6dGl0bGVcXFxcXCIgY29udGVudD1cXFxcXCJcIlxcbiAgICArIGVzY2FwZUV4cHJlc3Npb24oKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy50aXRsZSB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAudGl0bGUgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogaGVscGVyTWlzc2luZyksKHR5cGVvZiBoZWxwZXIgPT09IGZ1bmN0aW9uVHlwZSA/IGhlbHBlci5jYWxsKGRlcHRoMCwge1wibmFtZVwiOlwidGl0bGVcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcXG4gICAgKyBcIlxcXFxcIiAvPlxcXFxuPG1ldGEgbmFtZT1cXFxcXCJ0d2l0dGVyOmRlc2NyaXB0aW9uXFxcXFwiIGNvbnRlbnQ9XFxcXFwiXCJcXG4gICAgKyBlc2NhcGVFeHByZXNzaW9uKCgoaGVscGVycy5sMTBuIHx8IChkZXB0aDAgJiYgZGVwdGgwLmwxMG4pIHx8IGhlbHBlck1pc3NpbmcpLmNhbGwoZGVwdGgwLCBcIkRFU0NSSVBUSU9OXCIsIHtcIm5hbWVcIjpcImwxMG5cIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkpKVxcbiAgICArIFwiXFxcXFwiIC8+XFxcXG48bWV0YSBuYW1lPVxcXFxcInR3aXR0ZXI6aW1hZ2VcXFxcXCIgY29udGVudD1cXFxcXCJcIlxcbiAgICArIGVzY2FwZUV4cHJlc3Npb24oKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5zb2NpYWxMb2dvIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5zb2NpYWxMb2dvIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGhlbHBlck1pc3NpbmcpLCh0eXBlb2YgaGVscGVyID09PSBmdW5jdGlvblR5cGUgPyBoZWxwZXIuY2FsbChkZXB0aDAsIHtcIm5hbWVcIjpcInNvY2lhbExvZ29cIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcXG4gICAgKyBcIlxcXFxcIiAvPlxcXFxuPG1ldGEgbmFtZT1cXFxcXCJ0d2l0dGVyOnVybFxcXFxcIiBjb250ZW50PVxcXFxcIlwiXFxuICAgICsgZXNjYXBlRXhwcmVzc2lvbigoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLmxvY2F0aW9uIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5sb2NhdGlvbiA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBoZWxwZXJNaXNzaW5nKSwodHlwZW9mIGhlbHBlciA9PT0gZnVuY3Rpb25UeXBlID8gaGVscGVyLmNhbGwoZGVwdGgwLCB7XCJuYW1lXCI6XCJsb2NhdGlvblwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxcbiAgICArIFwiXFxcXFwiIC8+XFxcXG48IS0tIEVuZCBUd2l0dGVyIHN1bW1hcnkgY2FyZC0tPlxcXFxuXFxcXG48IS0tIEJlZ2luIE9wZW4gR3JhcGggbWFya3VwIC0tPlxcXFxuPG1ldGEgcHJvcGVydHk9XFxcXFwib2c6dGl0bGVcXFxcXCIgY29udGVudD1cXFxcXCJcIlxcbiAgICArIGVzY2FwZUV4cHJlc3Npb24oKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy50aXRsZSB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAudGl0bGUgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogaGVscGVyTWlzc2luZyksKHR5cGVvZiBoZWxwZXIgPT09IGZ1bmN0aW9uVHlwZSA/IGhlbHBlci5jYWxsKGRlcHRoMCwge1wibmFtZVwiOlwidGl0bGVcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcXG4gICAgKyBcIlxcXFxcIiAvPlxcXFxuPG1ldGEgcHJvcGVydHk9XFxcXFwib2c6ZGVzY3JpcHRpb25cXFxcXCIgY29udGVudD1cXFxcXCJcIlxcbiAgICArIGVzY2FwZUV4cHJlc3Npb24oKChoZWxwZXJzLmwxMG4gfHwgKGRlcHRoMCAmJiBkZXB0aDAubDEwbikgfHwgaGVscGVyTWlzc2luZykuY2FsbChkZXB0aDAsIFwiREVTQ1JJUFRJT05cIiwge1wibmFtZVwiOlwibDEwblwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSkpXFxuICAgICsgXCJcXFxcXCIgLz5cXFxcbjxtZXRhIHByb3BlcnR5PVxcXFxcIm9nOnR5cGVcXFxcXCIgY29udGVudD1cXFxcXCJ3ZWJzaXRlXFxcXFwiIC8+XFxcXG48bWV0YSBwcm9wZXJ0eT1cXFxcXCJvZzp1cmxcXFxcXCIgY29udGVudD1cXFxcXCJcIlxcbiAgICArIGVzY2FwZUV4cHJlc3Npb24oKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5sb2NhdGlvbiB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAubG9jYXRpb24gOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogaGVscGVyTWlzc2luZyksKHR5cGVvZiBoZWxwZXIgPT09IGZ1bmN0aW9uVHlwZSA/IGhlbHBlci5jYWxsKGRlcHRoMCwge1wibmFtZVwiOlwibG9jYXRpb25cIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcXG4gICAgKyBcIlxcXFxcIiAvPlxcXFxuPG1ldGEgcHJvcGVydHk9XFxcXFwib2c6aW1hZ2VcXFxcXCIgY29udGVudD1cXFxcXCJcIlxcbiAgICArIGVzY2FwZUV4cHJlc3Npb24oKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5zb2NpYWxMb2dvIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5zb2NpYWxMb2dvIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGhlbHBlck1pc3NpbmcpLCh0eXBlb2YgaGVscGVyID09PSBmdW5jdGlvblR5cGUgPyBoZWxwZXIuY2FsbChkZXB0aDAsIHtcIm5hbWVcIjpcInNvY2lhbExvZ29cIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcXG4gICAgKyBcIlxcXFxcIiAvPlxcXFxuXFxcXG48bGluayByZWw9XFxcXFwic3R5bGVzaGVldFxcXFxcIiBocmVmPVxcXFxcInN0YXRpYy9zZW1hbnRpYy11aS9zZW1hbnRpYy5taW4uY3NzXFxcXFwiPlxcXFxuXCI7XFxuICBzdGFjazEgPSBoZWxwZXJzW1xcJ2lmXFwnXS5jYWxsKGRlcHRoMCwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmlzTW9iaWxlIDogZGVwdGgwKSwge1wibmFtZVwiOlwiaWZcIixcImhhc2hcIjp7fSxcImZuXCI6dGhpcy5wcm9ncmFtKDEsIGRhdGEpLFwiaW52ZXJzZVwiOnRoaXMubm9vcCxcImRhdGFcIjpkYXRhfSk7XFxuICBpZiAoc3RhY2sxICE9IG51bGwpIHsgYnVmZmVyICs9IHN0YWNrMTsgfVxcbiAgcmV0dXJuIGJ1ZmZlciArIFwiPCEtLSBFbmQgT3BlbiBHcmFwaCBtYXJrdXAgLS0+XFxcXG48c2NyaXB0IHNyYz1cXFxcXCIvYnVuZGxlLmpzXFxcXFwiPjwvc2NyaXB0PlxcXFxuXFxcXG48bGluayByZWw9XFxcXFwic2hvcnRjdXQgaWNvblxcXFxcIiBocmVmPVxcXFxcIi9mYXZpY29uLmljb1xcXFxcIj5cXFxcblxcXFxuXFxcXG5cIjtcXG59LFwidXNlRGF0YVwiOnRydWV9JywgZXJyb3JUZW1wbGF0ZVNvdXJjZTogbnVsbH0sXG57bmFtZTogJ2hlYWRlcicsIGNvbnN0cnVjdG9yOiByZXF1aXJlKCcuL2NhdGJlcnJ5X2NvbXBvbmVudHMvaGVhZGVyL2luZGV4LmpzJyksIHByb3BlcnRpZXM6IHtcIm5hbWVcIjpcImhlYWRlclwiLFwidGVtcGxhdGVcIjpcIi4vdGVtcGxhdGUuaGJzXCIsXCJlcnJvclRlbXBsYXRlXCI6XCIuL2Vycm9yLmhic1wiLFwibG9naWNcIjpcImluZGV4LmpzXCJ9LCB0ZW1wbGF0ZVNvdXJjZTogJ3tcImNvbXBpbGVyXCI6WzYsXCI+PSAyLjAuMC1iZXRhLjFcIl0sXCJtYWluXCI6ZnVuY3Rpb24oZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xcbiAgdmFyIGhlbHBlciwgZnVuY3Rpb25UeXBlPVwiZnVuY3Rpb25cIiwgaGVscGVyTWlzc2luZz1oZWxwZXJzLmhlbHBlck1pc3NpbmcsIGVzY2FwZUV4cHJlc3Npb249dGhpcy5lc2NhcGVFeHByZXNzaW9uO1xcbiAgcmV0dXJuIFwiPGhlYWRlcj5cXFxcblxcdDxkaXYgY2xhc3M9XFxcXFwidWkgZml4ZWQgaW52ZXJ0ZWQgb3JhbmdlIG1lbnVcXFxcXCI+XFxcXG5cXHRcXHQ8ZGl2IGNsYXNzPVxcXFxcImJvcmRlcmxlc3MgaXRlbVxcXFxcIj48L2Rpdj5cXFxcblxcdFxcdDxkaXYgY2xhc3M9XFxcXFwiYm9yZGVybGVzcyB0aXRsZSBpdGVtXFxcXFwiPlxcXFxuXFx0XFx0XFx0PGEgXFx0aHJlZj1cXFxcXCIvXFxcXFwiPlwiXFxuICAgICsgZXNjYXBlRXhwcmVzc2lvbigoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLnRpdGxlIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC50aXRsZSA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBoZWxwZXJNaXNzaW5nKSwodHlwZW9mIGhlbHBlciA9PT0gZnVuY3Rpb25UeXBlID8gaGVscGVyLmNhbGwoZGVwdGgwLCB7XCJuYW1lXCI6XCJ0aXRsZVwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxcbiAgICArIFwiPC9hPlxcXFxuXFx0XFx0PC9kaXY+XFxcXG5cXHRcXHQ8ZGl2IGNsYXNzPVxcXFxcInJpZ2h0IG1lbnVcXFxcXCI+XFxcXG5cXHRcXHRcXHQ8Y2F0LXNlY3Rpb24tbmF2aWdhdGlvbiBpZD1cXFxcXCJoZWFkZXItc2VjdGlvbi1uYXZpZ2F0aW9uXFxcXFwiIGNhdC1zdG9yZT1cXFxcXCJQYWdlc1xcXFxcIj5cXFxcblxcdFxcdFxcdDwvY2F0LXNlY3Rpb24tbmF2aWdhdGlvbj5cXFxcblxcdFxcdDwvZGl2PlxcXFxuXFx0XFx0PGRpdiBjbGFzcz1cXFxcXCJib3JkZXJsZXNzIGl0ZW1cXFxcXCI+PC9kaXY+XFxcXG5cXHQ8L2Rpdj5cXFxcbjwvaGVhZGVyPlxcXFxuXCI7XFxufSxcInVzZURhdGFcIjp0cnVlfScsIGVycm9yVGVtcGxhdGVTb3VyY2U6ICd7XCJjb21waWxlclwiOls2LFwiPj0gMi4wLjAtYmV0YS4xXCJdLFwibWFpblwiOmZ1bmN0aW9uKGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcXG4gIHJldHVybiBcIlxcXFxuXCI7XFxuICB9LFwidXNlRGF0YVwiOnRydWV9J30sXG57bmFtZTogJ2hlbGxvLXdvcmxkJywgY29uc3RydWN0b3I6IHJlcXVpcmUoJy4vY2F0YmVycnlfY29tcG9uZW50cy9oZWxsby13b3JsZC9IZWxsb1dvcmxkLmpzJyksIHByb3BlcnRpZXM6IHtcIm5hbWVcIjpcImhlbGxvLXdvcmxkXCIsXCJ0ZW1wbGF0ZVwiOlwiLi9oZWxsby5oYnNcIixcImVycm9yVGVtcGxhdGVcIjpcIi4vZXJyb3IuaGJzXCIsXCJsb2dpY1wiOlwiLi9IZWxsb1dvcmxkLmpzXCJ9LCB0ZW1wbGF0ZVNvdXJjZTogJ3tcImNvbXBpbGVyXCI6WzYsXCI+PSAyLjAuMC1iZXRhLjFcIl0sXCJtYWluXCI6ZnVuY3Rpb24oZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xcbiAgdmFyIGhlbHBlciwgZnVuY3Rpb25UeXBlPVwiZnVuY3Rpb25cIiwgaGVscGVyTWlzc2luZz1oZWxwZXJzLmhlbHBlck1pc3NpbmcsIGVzY2FwZUV4cHJlc3Npb249dGhpcy5lc2NhcGVFeHByZXNzaW9uO1xcbiAgcmV0dXJuIFwiPGgxPkhlbGxvLCBcIlxcbiAgICArIGVzY2FwZUV4cHJlc3Npb24oKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy53aG8gfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLndobyA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBoZWxwZXJNaXNzaW5nKSwodHlwZW9mIGhlbHBlciA9PT0gZnVuY3Rpb25UeXBlID8gaGVscGVyLmNhbGwoZGVwdGgwLCB7XCJuYW1lXCI6XCJ3aG9cIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcXG4gICAgKyBcIiE8L2gxPlxcXFxuXCI7XFxufSxcInVzZURhdGFcIjp0cnVlfScsIGVycm9yVGVtcGxhdGVTb3VyY2U6ICd7XCJjb21waWxlclwiOls2LFwiPj0gMi4wLjAtYmV0YS4xXCJdLFwibWFpblwiOmZ1bmN0aW9uKGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcXG4gIHJldHVybiBcIlxcXFxuXCI7XFxuICB9LFwidXNlRGF0YVwiOnRydWV9J31cbl07XG5cbnZhciB1dGlsID0gcmVxdWlyZSgndXRpbCcpLFxuXHRyb3V0ZURlZmluaXRpb25zID0gcmVxdWlyZSgnLi9yb3V0ZXMuanMnKSB8fCBbXSxcblx0bW9kdWxlSGVscGVyID0gcmVxdWlyZSgnLi9ub2RlX21vZHVsZXMvY2F0YmVycnkvbGliL2hlbHBlcnMvbW9kdWxlSGVscGVyLmpzJyksXG5cdENhdGJlcnJ5ID0gcmVxdWlyZSgnLi9ub2RlX21vZHVsZXMvY2F0YmVycnkvYnJvd3Nlci9DYXRiZXJyeS5qcycpLFxuXHRMb2dnZXIgPSByZXF1aXJlKCcuL25vZGVfbW9kdWxlcy9jYXRiZXJyeS9icm93c2VyL0xvZ2dlci5qcycpLFxuXHRCb290c3RyYXBwZXJCYXNlID1cblx0XHRyZXF1aXJlKCcuL25vZGVfbW9kdWxlcy9jYXRiZXJyeS9saWIvYmFzZS9Cb290c3RyYXBwZXJCYXNlLmpzJyksXG5cdFN0b3JlRGlzcGF0Y2hlciA9IHJlcXVpcmUoJy4vbm9kZV9tb2R1bGVzL2NhdGJlcnJ5L2xpYi9TdG9yZURpc3BhdGNoZXInKSxcblx0TW9kdWxlQXBpUHJvdmlkZXIgPVxuXHRcdHJlcXVpcmUoJy4vbm9kZV9tb2R1bGVzL2NhdGJlcnJ5L2Jyb3dzZXIvcHJvdmlkZXJzL01vZHVsZUFwaVByb3ZpZGVyJyksXG5cdENvb2tpZVdyYXBwZXIgPSByZXF1aXJlKCcuL25vZGVfbW9kdWxlcy9jYXRiZXJyeS9icm93c2VyL0Nvb2tpZVdyYXBwZXInKTtcblxudmFyIElORk9fRE9DVU1FTlRfVVBEQVRFRCA9ICdEb2N1bWVudCB1cGRhdGVkICglZCBzdG9yZShzKSBjaGFuZ2VkKScsXG5cdElORk9fQ09NUE9ORU5UX0JPVU5EID0gJ0NvbXBvbmVudCBcIiVzXCIgaXMgYm91bmQnLFxuXHRJTkZPX0NPTVBPTkVOVF9VTkJPVU5EID0gJ0NvbXBvbmVudCBcIiVzXCIgaXMgdW5ib3VuZCc7XG5cbnV0aWwuaW5oZXJpdHMoQm9vdHN0cmFwcGVyLCBCb290c3RyYXBwZXJCYXNlKTtcblxuLyoqXG4gKiBDcmVhdGVzIG5ldyBpbnN0YW5jZSBvZiB0aGUgYnJvd3NlciBDYXRiZXJyeSdzIGJvb3RzdHJhcHBlci5cbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgQm9vdHN0cmFwcGVyQmFzZVxuICovXG5mdW5jdGlvbiBCb290c3RyYXBwZXIoKSB7XG5cdEJvb3RzdHJhcHBlckJhc2UuY2FsbCh0aGlzLCBDYXRiZXJyeSk7XG59XG5cbi8qKlxuICogQ29uZmlndXJlcyBDYXRiZXJyeSdzIHNlcnZpY2UgbG9jYXRvci5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWdPYmplY3QgQXBwbGljYXRpb24gY29uZmlnIG9iamVjdC5cbiAqIEBwYXJhbSB7U2VydmljZUxvY2F0b3J9IGxvY2F0b3IgU2VydmljZSBsb2NhdG9yIHRvIGNvbmZpZ3VyZS5cbiAqL1xuQm9vdHN0cmFwcGVyLnByb3RvdHlwZS5jb25maWd1cmUgPSBmdW5jdGlvbiAoY29uZmlnT2JqZWN0LCBsb2NhdG9yKSB7XG5cdEJvb3RzdHJhcHBlckJhc2UucHJvdG90eXBlLmNvbmZpZ3VyZS5jYWxsKHRoaXMsIGNvbmZpZ09iamVjdCwgbG9jYXRvcik7XG5cblx0Ly8gaWYgYnJvd3NlciBzdGlsbCBkb2VzIG5vdCBoYXZlIHByb21pc2VzIHRoZW4gYWRkIGl0LlxuXHRpZiAoISgnUHJvbWlzZScgaW4gd2luZG93KSkge1xuXHRcdHdpbmRvdy5Qcm9taXNlID0gbG9jYXRvci5yZXNvbHZlKCdwcm9taXNlJyk7XG5cdH1cblxuXHRsb2NhdG9yLnJlZ2lzdGVyKCdzdG9yZURpc3BhdGNoZXInLCBTdG9yZURpc3BhdGNoZXIsIGNvbmZpZ09iamVjdCwgdHJ1ZSk7XG5cdGxvY2F0b3IucmVnaXN0ZXIoXG5cdFx0J21vZHVsZUFwaVByb3ZpZGVyJywgTW9kdWxlQXBpUHJvdmlkZXIsIGNvbmZpZ09iamVjdCwgdHJ1ZVxuXHQpO1xuXHRsb2NhdG9yLnJlZ2lzdGVyKCdjb29raWVXcmFwcGVyJywgQ29va2llV3JhcHBlciwgY29uZmlnT2JqZWN0LCB0cnVlKTtcblxuXHRsb2NhdG9yLnJlZ2lzdGVySW5zdGFuY2UoJ3dpbmRvdycsIHdpbmRvdyk7XG5cblx0dmFyIGxvZ2dlckNvbmZpZyA9IGNvbmZpZ09iamVjdC5sb2dnZXIgfHwge30sXG5cdFx0bG9nZ2VyID0gbmV3IExvZ2dlcihsb2dnZXJDb25maWcubGV2ZWxzKTtcblx0bG9jYXRvci5yZWdpc3Rlckluc3RhbmNlKCdsb2dnZXInLCBsb2dnZXIpO1xuXHR3aW5kb3cub25lcnJvciA9IGZ1bmN0aW9uIGVycm9ySGFuZGxlcihtc2csIHVyaSwgbGluZSkge1xuXHRcdGxvZ2dlci5mYXRhbCh1cmkgKyAnOicgKyBsaW5lICsgJyAnICsgbXNnKTtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fTtcblx0dmFyIGV2ZW50QnVzID0gbG9jYXRvci5yZXNvbHZlKCdldmVudEJ1cycpO1xuXHR0aGlzLl93cmFwRXZlbnRzV2l0aExvZ2dlcihldmVudEJ1cywgbG9nZ2VyKTtcblxuXHRyb3V0ZURlZmluaXRpb25zLmZvckVhY2goZnVuY3Rpb24gKHJvdXRlRGVmaW5pdGlvbikge1xuXHRcdGxvY2F0b3IucmVnaXN0ZXJJbnN0YW5jZSgncm91dGVEZWZpbml0aW9uJywgcm91dGVEZWZpbml0aW9uKTtcblx0fSk7XG5cblx0c3RvcmVzLmZvckVhY2goZnVuY3Rpb24gKHN0b3JlKSB7XG5cdFx0bG9jYXRvci5yZWdpc3Rlckluc3RhbmNlKCdzdG9yZScsIHN0b3JlKTtcblx0fSk7XG5cblx0Y29tcG9uZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChjb21wb25lbnQpIHtcblx0XHRsb2NhdG9yLnJlZ2lzdGVySW5zdGFuY2UoJ2NvbXBvbmVudCcsIGNvbXBvbmVudCk7XG5cdH0pO1xufTtcblxuLyoqXG4gKiBXcmFwcyBldmVudCBidXMgd2l0aCBsb2cgbWVzc2FnZXMuXG4gKiBAcGFyYW0ge0V2ZW50RW1pdHRlcn0gZXZlbnRCdXMgRXZlbnQgZW1pdHRlciB0aGF0IGltcGxlbWVudHMgZXZlbnQgYnVzLlxuICogQHBhcmFtIHtMb2dnZXJ9IGxvZ2dlciBMb2dnZXIgdG8gd3JpdGUgbWVzc2FnZXMuXG4gKiBAcHJvdGVjdGVkXG4gKi9cbkJvb3RzdHJhcHBlci5wcm90b3R5cGUuX3dyYXBFdmVudHNXaXRoTG9nZ2VyID0gZnVuY3Rpb24gKGV2ZW50QnVzLCBsb2dnZXIpIHtcblx0Qm9vdHN0cmFwcGVyQmFzZS5wcm90b3R5cGUuX3dyYXBFdmVudHNXaXRoTG9nZ2VyXG5cdFx0LmNhbGwodGhpcywgZXZlbnRCdXMsIGxvZ2dlcik7XG5cdGV2ZW50QnVzXG5cdFx0Lm9uKCdkb2N1bWVudFVwZGF0ZWQnLCBmdW5jdGlvbiAoYXJncykge1xuXHRcdFx0bG9nZ2VyLmluZm8odXRpbC5mb3JtYXQoSU5GT19ET0NVTUVOVF9VUERBVEVELCBhcmdzLmxlbmd0aCkpO1xuXHRcdH0pXG5cdFx0Lm9uKCdjb21wb25lbnRCb3VuZCcsIGZ1bmN0aW9uIChhcmdzKSB7XG5cdFx0XHRsb2dnZXIuaW5mbyh1dGlsLmZvcm1hdChcblx0XHRcdFx0SU5GT19DT01QT05FTlRfQk9VTkQsXG5cdFx0XHRcdGFyZ3MuZWxlbWVudC50YWdOYW1lICsgKGFyZ3MuaWQgPyAnIycgKyBhcmdzLmlkIDogJycpXG5cdFx0XHQpKTtcblx0XHR9KVxuXHRcdC5vbignY29tcG9uZW50VW5ib3VuZCcsIGZ1bmN0aW9uIChhcmdzKSB7XG5cdFx0XHRsb2dnZXIuaW5mbyh1dGlsLmZvcm1hdChcblx0XHRcdFx0SU5GT19DT01QT05FTlRfVU5CT1VORCxcblx0XHRcdFx0YXJncy5lbGVtZW50LnRhZ05hbWUgKyAoYXJncy5pZCA/ICcjJyArIGFyZ3MuaWQgOiAnJylcblx0XHRcdCkpO1xuXHRcdH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgQm9vdHN0cmFwcGVyKCk7Il19
