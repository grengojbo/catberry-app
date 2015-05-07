/*
 * catberry-app: 0.0.1
 * Build Date: Thu May 07 2015 13:53:17 GMT+0300 (EEST)
 */

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var catberry = require('catberry'),
	templateEngine = require('catberry-handlebars'),
	// this config will be replaced by `./config/browser.json` when building
	// because of `browser` field in `package.json`
	config = require('./config/environment.json'),
	cat = catberry.create(config);

templateEngine.register(cat.locator);
cat.startWhenReady();


},{"./config/environment.json":6,"catberry":18,"catberry-handlebars":9}],2:[function(require,module,exports){
'use strict';

module.exports = Document;

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

}

},{}],3:[function(require,module,exports){
'use strict';

module.exports = Head;

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
	return this._config;
};

},{}],4:[function(require,module,exports){
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
  "componentsGlob": "catberry_components/**/cat-component.json",
  "isRelease": true
}

},{}],7:[function(require,module,exports){
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
},{}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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
},{"./lib/TemplateProvider":7,"./lib/vendors/handlebars":8}],10:[function(require,module,exports){
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
},{"../lib/base/CatberryBase":23,"util":38}],11:[function(require,module,exports){
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
},{"../lib/base/CookieWrapperBase":24,"util":38}],12:[function(require,module,exports){
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
},{"../lib/base/DocumentRendererBase":25,"../lib/helpers/errorHelper":28,"../lib/helpers/moduleHelper":29,"util":38}],13:[function(require,module,exports){
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
},{}],14:[function(require,module,exports){
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
},{"catberry-uri":44,"util":38}],15:[function(require,module,exports){
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
},{"../../lib/base/LoaderBase":26,"../../lib/helpers/moduleHelper":29,"util":38}],16:[function(require,module,exports){
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
},{"../../lib/base/LoaderBase":26,"../../lib/helpers/moduleHelper":29,"util":38}],17:[function(require,module,exports){
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
},{"../../lib/base/ModuleApiProviderBase":27,"../../lib/helpers/moduleHelper":29,"../../lib/helpers/propertyHelper":30,"util":38}],18:[function(require,module,exports){
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

},{"./lib/Bootstrapper":61}],19:[function(require,module,exports){
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
},{"./helpers/propertyHelper":30,"catberry-uri":44}],20:[function(require,module,exports){
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
},{"events":34}],21:[function(require,module,exports){
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
},{"./SerialWrapper":20,"./helpers/moduleHelper":29,"util":38}],22:[function(require,module,exports){
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
},{"../ContextFactory":19,"../DocumentRenderer":12,"../RequestRouter":14,"../base/ModuleApiProviderBase":27,"../helpers/moduleHelper":29,"../loaders/ComponentLoader":15,"../loaders/StoreLoader":16,"../providers/StateProvider":32,"catberry-uhr":42,"events":34,"promise":50,"util":38}],23:[function(require,module,exports){
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
},{"catberry-locator":40}],24:[function(require,module,exports){
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
},{"util":38}],25:[function(require,module,exports){
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
},{}],26:[function(require,module,exports){
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
},{"../helpers/moduleHelper":29}],27:[function(require,module,exports){
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

},{}],28:[function(require,module,exports){
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
},{"util":38}],29:[function(require,module,exports){
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
},{}],30:[function(require,module,exports){
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
},{}],31:[function(require,module,exports){
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
},{"catberry-uri":44,"util":38}],32:[function(require,module,exports){
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
},{"./../helpers/routeHelper":31,"catberry-uri":44}],33:[function(require,module,exports){
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
},{"events":34}],34:[function(require,module,exports){
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

},{}],35:[function(require,module,exports){
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

},{}],36:[function(require,module,exports){
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

},{}],37:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],38:[function(require,module,exports){
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

},{"./support/isBuffer":37,"_process":36,"inherits":35}],39:[function(require,module,exports){
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
},{}],40:[function(require,module,exports){
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
},{"./ConstructorTokenizer":39,"util":38}],41:[function(require,module,exports){
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
},{"../lib/UHRBase":43,"catberry-uri":44,"promise":50,"util":38}],42:[function(require,module,exports){
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
},{"./lib/UHR":41}],43:[function(require,module,exports){
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
},{"catberry-uri":44}],44:[function(require,module,exports){
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
},{"./lib/Authority":45,"./lib/Query":46,"./lib/URI":47,"./lib/UserInfo":48}],45:[function(require,module,exports){
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
},{"./UserInfo":48,"./percentEncodingHelper":49}],46:[function(require,module,exports){
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
},{"./percentEncodingHelper":49}],47:[function(require,module,exports){
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
},{"./Authority":45,"./Query":46,"./percentEncodingHelper":49}],48:[function(require,module,exports){
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
},{"./percentEncodingHelper":49}],49:[function(require,module,exports){
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
},{}],50:[function(require,module,exports){
'use strict';

module.exports = require('./lib')

},{"./lib":55}],51:[function(require,module,exports){
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

},{"asap/raw":59}],52:[function(require,module,exports){
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

},{"./core.js":51}],53:[function(require,module,exports){
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

},{"./core.js":51,"asap/raw":59}],54:[function(require,module,exports){
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

},{"./core.js":51}],55:[function(require,module,exports){
'use strict';

module.exports = require('./core.js');
require('./done.js');
require('./finally.js');
require('./es6-extensions.js');
require('./node-extensions.js');

},{"./core.js":51,"./done.js":52,"./es6-extensions.js":53,"./finally.js":54,"./node-extensions.js":56}],56:[function(require,module,exports){
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

},{"./core.js":51,"asap":57}],57:[function(require,module,exports){
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

},{"./raw":58}],58:[function(require,module,exports){
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

},{}],59:[function(require,module,exports){
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

},{"_process":36,"domain":33}],60:[function(require,module,exports){
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
	'/'
];

},{}],61:[function(require,module,exports){
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
},{"./catberry_components/document/Document.js":2,"./catberry_components/head/Head.js":3,"./catberry_components/hello-world/HelloWorld.js":4,"./catberry_stores/Main.js":5,"./node_modules/catberry/browser/Catberry.js":10,"./node_modules/catberry/browser/CookieWrapper":11,"./node_modules/catberry/browser/Logger.js":13,"./node_modules/catberry/browser/providers/ModuleApiProvider":17,"./node_modules/catberry/lib/StoreDispatcher":21,"./node_modules/catberry/lib/base/BootstrapperBase.js":22,"./node_modules/catberry/lib/helpers/moduleHelper.js":29,"./routes.js":60,"util":38}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiYnJvd3Nlci5qcyIsImNhdGJlcnJ5X2NvbXBvbmVudHMvZG9jdW1lbnQvRG9jdW1lbnQuanMiLCJjYXRiZXJyeV9jb21wb25lbnRzL2hlYWQvSGVhZC5qcyIsImNhdGJlcnJ5X2NvbXBvbmVudHMvaGVsbG8td29ybGQvSGVsbG9Xb3JsZC5qcyIsImNhdGJlcnJ5X3N0b3Jlcy9NYWluLmpzIiwiY29uZmlnL2Vudmlyb25tZW50Lmpzb24iLCJub2RlX21vZHVsZXMvY2F0YmVycnktaGFuZGxlYmFycy9icm93c2VyL1RlbXBsYXRlUHJvdmlkZXIuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnktaGFuZGxlYmFycy9icm93c2VyL3ZlbmRvcnMvaGFuZGxlYmFycy5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS1oYW5kbGViYXJzL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2NhdGJlcnJ5L2Jyb3dzZXIvQ2F0YmVycnkuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvYnJvd3Nlci9Db29raWVXcmFwcGVyLmpzIiwibm9kZV9tb2R1bGVzL2NhdGJlcnJ5L2Jyb3dzZXIvRG9jdW1lbnRSZW5kZXJlci5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS9icm93c2VyL0xvZ2dlci5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS9icm93c2VyL1JlcXVlc3RSb3V0ZXIuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvYnJvd3Nlci9sb2FkZXJzL0NvbXBvbmVudExvYWRlci5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS9icm93c2VyL2xvYWRlcnMvU3RvcmVMb2FkZXIuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvYnJvd3Nlci9wcm92aWRlcnMvTW9kdWxlQXBpUHJvdmlkZXIuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvaW5kZXguanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvbGliL0NvbnRleHRGYWN0b3J5LmpzIiwibm9kZV9tb2R1bGVzL2NhdGJlcnJ5L2xpYi9TZXJpYWxXcmFwcGVyLmpzIiwibm9kZV9tb2R1bGVzL2NhdGJlcnJ5L2xpYi9TdG9yZURpc3BhdGNoZXIuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvbGliL2Jhc2UvQm9vdHN0cmFwcGVyQmFzZS5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS9saWIvYmFzZS9DYXRiZXJyeUJhc2UuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvbGliL2Jhc2UvQ29va2llV3JhcHBlckJhc2UuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvbGliL2Jhc2UvRG9jdW1lbnRSZW5kZXJlckJhc2UuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvbGliL2Jhc2UvTG9hZGVyQmFzZS5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS9saWIvYmFzZS9Nb2R1bGVBcGlQcm92aWRlckJhc2UuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvbGliL2hlbHBlcnMvZXJyb3JIZWxwZXIuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvbGliL2hlbHBlcnMvbW9kdWxlSGVscGVyLmpzIiwibm9kZV9tb2R1bGVzL2NhdGJlcnJ5L2xpYi9oZWxwZXJzL3Byb3BlcnR5SGVscGVyLmpzIiwibm9kZV9tb2R1bGVzL2NhdGJlcnJ5L2xpYi9oZWxwZXJzL3JvdXRlSGVscGVyLmpzIiwibm9kZV9tb2R1bGVzL2NhdGJlcnJ5L2xpYi9wcm92aWRlcnMvU3RhdGVQcm92aWRlci5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvZG9tYWluLWJyb3dzZXIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2V2ZW50cy9ldmVudHMuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2luaGVyaXRzL2luaGVyaXRzX2Jyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvdXRpbC9zdXBwb3J0L2lzQnVmZmVyQnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvdXRpbC91dGlsLmpzIiwibm9kZV9tb2R1bGVzL2NhdGJlcnJ5L25vZGVfbW9kdWxlcy9jYXRiZXJyeS1sb2NhdG9yL2xpYi9Db25zdHJ1Y3RvclRva2VuaXplci5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS9ub2RlX21vZHVsZXMvY2F0YmVycnktbG9jYXRvci9saWIvU2VydmljZUxvY2F0b3IuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvbm9kZV9tb2R1bGVzL2NhdGJlcnJ5LXVoci9icm93c2VyL1VIUi5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS9ub2RlX21vZHVsZXMvY2F0YmVycnktdWhyL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2NhdGJlcnJ5L25vZGVfbW9kdWxlcy9jYXRiZXJyeS11aHIvbGliL1VIUkJhc2UuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvbm9kZV9tb2R1bGVzL2NhdGJlcnJ5LXVyaS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS9ub2RlX21vZHVsZXMvY2F0YmVycnktdXJpL2xpYi9BdXRob3JpdHkuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvbm9kZV9tb2R1bGVzL2NhdGJlcnJ5LXVyaS9saWIvUXVlcnkuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvbm9kZV9tb2R1bGVzL2NhdGJlcnJ5LXVyaS9saWIvVVJJLmpzIiwibm9kZV9tb2R1bGVzL2NhdGJlcnJ5L25vZGVfbW9kdWxlcy9jYXRiZXJyeS11cmkvbGliL1VzZXJJbmZvLmpzIiwibm9kZV9tb2R1bGVzL2NhdGJlcnJ5L25vZGVfbW9kdWxlcy9jYXRiZXJyeS11cmkvbGliL3BlcmNlbnRFbmNvZGluZ0hlbHBlci5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS9ub2RlX21vZHVsZXMvcHJvbWlzZS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS9ub2RlX21vZHVsZXMvcHJvbWlzZS9saWIvY29yZS5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS9ub2RlX21vZHVsZXMvcHJvbWlzZS9saWIvZG9uZS5qcyIsIm5vZGVfbW9kdWxlcy9jYXRiZXJyeS9ub2RlX21vZHVsZXMvcHJvbWlzZS9saWIvZXM2LWV4dGVuc2lvbnMuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvbm9kZV9tb2R1bGVzL3Byb21pc2UvbGliL2ZpbmFsbHkuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvbm9kZV9tb2R1bGVzL3Byb21pc2UvbGliL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2NhdGJlcnJ5L25vZGVfbW9kdWxlcy9wcm9taXNlL2xpYi9ub2RlLWV4dGVuc2lvbnMuanMiLCJub2RlX21vZHVsZXMvY2F0YmVycnkvbm9kZV9tb2R1bGVzL3Byb21pc2Uvbm9kZV9tb2R1bGVzL2FzYXAvYnJvd3Nlci1hc2FwLmpzIiwibm9kZV9tb2R1bGVzL2NhdGJlcnJ5L25vZGVfbW9kdWxlcy9wcm9taXNlL25vZGVfbW9kdWxlcy9hc2FwL2Jyb3dzZXItcmF3LmpzIiwibm9kZV9tb2R1bGVzL2NhdGJlcnJ5L25vZGVfbW9kdWxlcy9wcm9taXNlL25vZGVfbW9kdWxlcy9hc2FwL3Jhdy5qcyIsInJvdXRlcy5qcyIsIl9fQnJvd3NlckJ1bmRsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaktBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDalZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1WkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN1NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzFrQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdExBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3YkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyR0E7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDbEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDNU5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3JHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY2F0YmVycnkgPSByZXF1aXJlKCdjYXRiZXJyeScpLFxuXHR0ZW1wbGF0ZUVuZ2luZSA9IHJlcXVpcmUoJ2NhdGJlcnJ5LWhhbmRsZWJhcnMnKSxcblx0Ly8gdGhpcyBjb25maWcgd2lsbCBiZSByZXBsYWNlZCBieSBgLi9jb25maWcvYnJvd3Nlci5qc29uYCB3aGVuIGJ1aWxkaW5nXG5cdC8vIGJlY2F1c2Ugb2YgYGJyb3dzZXJgIGZpZWxkIGluIGBwYWNrYWdlLmpzb25gXG5cdGNvbmZpZyA9IHJlcXVpcmUoJy4vY29uZmlnL2Vudmlyb25tZW50Lmpzb24nKSxcblx0Y2F0ID0gY2F0YmVycnkuY3JlYXRlKGNvbmZpZyk7XG5cbnRlbXBsYXRlRW5naW5lLnJlZ2lzdGVyKGNhdC5sb2NhdG9yKTtcbmNhdC5zdGFydFdoZW5SZWFkeSgpO1xuXG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gRG9jdW1lbnQ7XG5cbi8qXG4gKiBUaGlzIGlzIGEgQ2F0YmVycnkgQ2F0LWNvbXBvbmVudCBmaWxlLlxuICogTW9yZSBkZXRhaWxzIGNhbiBiZSBmb3VuZCBoZXJlXG4gKiBodHRwczovL2dpdGh1Yi5jb20vY2F0YmVycnkvY2F0YmVycnkvYmxvYi9tYXN0ZXIvZG9jcy9pbmRleC5tZCNjYXQtY29tcG9uZW50c1xuICovXG5cbi8qKlxuICogQ3JlYXRlcyBuZXcgaW5zdGFuY2Ugb2YgXCJkb2N1bWVudFwiIGNvbXBvbmVudC5cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBEb2N1bWVudCgpIHtcblxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEhlYWQ7XG5cbi8qXG4gKiBUaGlzIGlzIGEgQ2F0YmVycnkgQ2F0LWNvbXBvbmVudCBmaWxlLlxuICogTW9yZSBkZXRhaWxzIGNhbiBiZSBmb3VuZCBoZXJlXG4gKiBodHRwczovL2dpdGh1Yi5jb20vY2F0YmVycnkvY2F0YmVycnkvYmxvYi9tYXN0ZXIvZG9jcy9pbmRleC5tZCNjYXQtY29tcG9uZW50c1xuICovXG5cbi8qKlxuICogQ3JlYXRlcyBuZXcgaW5zdGFuY2Ugb2YgXCJoZWFkXCIgY29tcG9uZW50LlxuICogQHBhcmFtIHtPYmplY3R9ICRjb25maWcgQ2F0YmVycnkgYXBwbGljYXRpb24gY29uZmlnLlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIEhlYWQoJGNvbmZpZykge1xuXHR0aGlzLl9jb25maWcgPSAkY29uZmlnO1xufVxuXG4vKipcbiAqIEN1cnJlbnQgY29uZmlnLlxuICogQHR5cGUge09iamVjdH1cbiAqIEBwcml2YXRlXG4gKi9cbkhlYWQucHJvdG90eXBlLl9jb25maWcgPSBudWxsO1xuXG4vKipcbiAqIEdldHMgZGF0YSBmb3IgdGVtcGxhdGUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBEYXRhIG9iamVjdC5cbiAqL1xuSGVhZC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuXHRyZXR1cm4gdGhpcy5fY29uZmlnO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBIZWxsb1dvcmxkO1xuXG4vKlxuICogVGhpcyBpcyBhIENhdGJlcnJ5IENhdC1jb21wb25lbnQgZmlsZS5cbiAqIE1vcmUgZGV0YWlscyBjYW4gYmUgZm91bmQgaGVyZVxuICogaHR0cHM6Ly9naXRodWIuY29tL2NhdGJlcnJ5L2NhdGJlcnJ5L2Jsb2IvbWFzdGVyL2RvY3MvaW5kZXgubWQjY2F0LWNvbXBvbmVudHNcbiAqL1xuXG4vKipcbiAqIENyZWF0ZXMgbmV3IGluc3RhbmNlIG9mIFwiaGVsbG8td29ybGRcIiBjb21wb25lbnQuXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gSGVsbG9Xb3JsZCgpIHtcblxufVxuXG4vKipcbiAqIEdldHMgZGF0YSBmb3IgdGVtcGxhdGUuXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxPYmplY3Q+fSBQcm9taXNlIGZvciBkYXRhLlxuICovXG5IZWxsb1dvcmxkLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG5cdHJldHVybiB0aGlzLiRjb250ZXh0LmdldFN0b3JlRGF0YSgpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBNYWluO1xuXG4vKlxuICogVGhpcyBpcyBhIENhdGJlcnJ5IFN0b3JlIGZpbGUuXG4gKiBNb3JlIGRldGFpbHMgY2FuIGJlIGZvdW5kIGhlcmVcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9jYXRiZXJyeS9jYXRiZXJyeS9ibG9iL21hc3Rlci9kb2NzL2luZGV4Lm1kI3N0b3Jlc1xuICovXG5cbi8qKlxuICogQ3JlYXRlcyBuZXcgaW5zdGFuY2Ugb2YgXCJNYWluXCIgc3RvcmUuXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gTWFpbigpIHtcblxufVxuXG4vKipcbiAqIExvYWRzIGRhdGEgZnJvbSBzb21ld2hlcmUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBEYXRhIG9iamVjdC5cbiAqL1xuTWFpbi5wcm90b3R5cGUubG9hZCA9IGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuIHt3aG86ICdXb3JsZCd9O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzPXtcblx0XCJ0aXRsZVwiOiBcIkNhdGJlcnJ5IFByb2plY3RcIixcbiAgXCJnaXRIdWJDbGllbnRcIjoge1xuICAgIFwiaG9zdFwiOiBcImh0dHBzOi8vYXBpLmdpdGh1Yi5jb21cIixcbiAgICBcImFjY2Vzc1Rva2VuXCI6IFwieW91ciBzZWNyZXQgdG9rZW4gaGVyZVwiXG4gIH0sXG4gIFwibDEwblwiOiB7XG4gICAgXCJkZWZhdWx0TG9jYWxlXCI6IFwicnVcIixcbiAgICBcImNvb2tpZVwiOiB7XG4gICAgICBcInBhdGhcIjogXCIvXCJcbiAgICB9XG4gIH0sXG4gIFwiZ29vZ2xlQW5hbHl0aWNzXCI6IHtcbiAgICBcImlkXCI6IFwiVUEtWFhYWFhYWFgtWFwiXG4gIH0sXG4gIFwic2VydmVyXCI6IHtcbiAgICBcInBvcnRcIjogMzAwMFxuICB9LFxuICBcImNvbXBvbmVudHNHbG9iXCI6IFwiY2F0YmVycnlfY29tcG9uZW50cy8qKi9jYXQtY29tcG9uZW50Lmpzb25cIixcbiAgXCJpc1JlbGVhc2VcIjogdHJ1ZVxufVxuIiwiLypcbiAqIGNhdGJlcnJ5LWhhbmRsZWJhcnNcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUgRGVuaXMgUmVjaGt1bm92IGFuZCBwcm9qZWN0IGNvbnRyaWJ1dG9ycy5cbiAqXG4gKiBjYXRiZXJyeS1oYW5kbGViYXJzJ3MgbGljZW5zZSBmb2xsb3dzOlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXG4gKiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvblxuICogZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLFxuICogaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSxcbiAqIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsXG4gKiBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuICogc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbiAqIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1NcbiAqIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICpcbiAqIFRoaXMgbGljZW5zZSBhcHBsaWVzIHRvIGFsbCBwYXJ0cyBvZiBjYXRiZXJyeS1oYW5kbGViYXJzIHRoYXQgYXJlIG5vdCBleHRlcm5hbGx5XG4gKiBtYWludGFpbmVkIGxpYnJhcmllcy5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gVGVtcGxhdGVQcm92aWRlcjtcblxuLyoqXG4gKiBDcmVhdGVzIG5ldyBpbnN0YW5jZSBvZiBIYW5kbGViYXJzIHRlbXBsYXRlIHByb3ZpZGVyLlxuICogQHBhcmFtIHtIYW5kbGViYXJzfSAkaGFuZGxlYmFycyBIYW5kbGViYXJzIGZhY3RvcnkuXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gVGVtcGxhdGVQcm92aWRlcigkaGFuZGxlYmFycykge1xuXHR0aGlzLl9oYW5kbGViYXJzID0gJGhhbmRsZWJhcnM7XG5cdHRoaXMuX3RlbXBsYXRlcyA9IHt9O1xufVxuXG4vKipcbiAqIEN1cnJlbnQgSGFuZGxlYmFycyBmYWN0b3J5LlxuICogQHR5cGUge0hhbmRsZWJhcnN9XG4gKiBAcHJpdmF0ZVxuICovXG5UZW1wbGF0ZVByb3ZpZGVyLnByb3RvdHlwZS5faGFuZGxlYmFycyA9IG51bGw7XG5cbi8qKlxuICogQ3VycmVudCBzZXQgb2YgcmVnaXN0ZXJlZCB0ZW1wbGF0ZXMuXG4gKiBAdHlwZSB7T2JqZWN0fVxuICogQHByaXZhdGVcbiAqL1xuVGVtcGxhdGVQcm92aWRlci5wcm90b3R5cGUuX3RlbXBsYXRlcyA9IG51bGw7XG5cbi8qKlxuICogUmVnaXN0ZXJzIGNvbXBpbGVkIChwcmVjb21waWxlZCkgSGFuZGxlYmFycyB0ZW1wbGF0ZS5cbiAqIGh0dHA6Ly9oYW5kbGViYXJzanMuY29tL3JlZmVyZW5jZS5odG1sXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBUZW1wbGF0ZSBuYW1lLlxuICogQHBhcmFtIHtTdHJpbmd9IGNvbXBpbGVkIENvbXBpbGVkIHRlbXBsYXRlIHNvdXJjZS5cbiAqL1xuVGVtcGxhdGVQcm92aWRlci5wcm90b3R5cGUucmVnaXN0ZXJDb21waWxlZCA9IGZ1bmN0aW9uIChuYW1lLCBjb21waWxlZCkge1xuXHQvLyBqc2hpbnQgZXZpbDp0cnVlXG5cdHZhciBzcGVjcyA9IG5ldyBGdW5jdGlvbigncmV0dXJuICcgKyBjb21waWxlZCArICc7Jyk7XG5cdHRoaXMuX3RlbXBsYXRlc1tuYW1lXSA9IHRoaXMuX2hhbmRsZWJhcnMudGVtcGxhdGUoc3BlY3MoKSk7XG59O1xuXG4vKipcbiAqIFJlbmRlcnMgdGVtcGxhdGUgd2l0aCBzcGVjaWZpZWQgZGF0YS5cbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIE5hbWUgb2YgdGVtcGxhdGUuXG4gKiBAcGFyYW0ge09iamVjdH0gZGF0YSBEYXRhIGNvbnRleHQgZm9yIHRlbXBsYXRlLlxuICogQHJldHVybnMgeyp9XG4gKi9cblRlbXBsYXRlUHJvdmlkZXIucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIChuYW1lLCBkYXRhKSB7XG5cdGlmICghdGhpcy5fdGVtcGxhdGVzLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG5cdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcignTm8gc3VjaCB0ZW1wbGF0ZScpKTtcblx0fVxuXG5cdHZhciBwcm9taXNlO1xuXHR0cnkge1xuXHRcdHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUodGhpcy5fdGVtcGxhdGVzW25hbWVdKGRhdGEpKTtcblx0fSBjYXRjaChlKSB7XG5cdFx0cHJvbWlzZSA9IFByb21pc2UucmVqZWN0KGUpO1xuXHR9XG5cdHJldHVybiBwcm9taXNlO1xufTsiLCIvKiFcblxuIGhhbmRsZWJhcnMgdjIuMC4wXG5cbkNvcHlyaWdodCAoQykgMjAxMS0yMDE0IGJ5IFllaHVkYSBLYXR6XG5cblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbm9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbmluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbnRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbmNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbmFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG5JTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbkZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbk9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cblRIRSBTT0ZUV0FSRS5cblxuQGxpY2Vuc2VcbiovXG4vKiBleHBvcnRlZCBIYW5kbGViYXJzICovXG4oZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIGRlZmluZShbXSwgZmFjdG9yeSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG4gIH0gZWxzZSB7XG4gICAgcm9vdC5IYW5kbGViYXJzID0gcm9vdC5IYW5kbGViYXJzIHx8IGZhY3RvcnkoKTtcbiAgfVxufSh0aGlzLCBmdW5jdGlvbiAoKSB7XG4vLyBoYW5kbGViYXJzL3NhZmUtc3RyaW5nLmpzXG52YXIgX19tb2R1bGUzX18gPSAoZnVuY3Rpb24oKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuICB2YXIgX19leHBvcnRzX187XG4gIC8vIEJ1aWxkIG91dCBvdXIgYmFzaWMgU2FmZVN0cmluZyB0eXBlXG4gIGZ1bmN0aW9uIFNhZmVTdHJpbmcoc3RyaW5nKSB7XG4gICAgdGhpcy5zdHJpbmcgPSBzdHJpbmc7XG4gIH1cblxuICBTYWZlU3RyaW5nLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBcIlwiICsgdGhpcy5zdHJpbmc7XG4gIH07XG5cbiAgX19leHBvcnRzX18gPSBTYWZlU3RyaW5nO1xuICByZXR1cm4gX19leHBvcnRzX187XG59KSgpO1xuXG4vLyBoYW5kbGViYXJzL3V0aWxzLmpzXG52YXIgX19tb2R1bGUyX18gPSAoZnVuY3Rpb24oX19kZXBlbmRlbmN5MV9fKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuICB2YXIgX19leHBvcnRzX18gPSB7fTtcbiAgLypqc2hpbnQgLVcwMDQgKi9cbiAgdmFyIFNhZmVTdHJpbmcgPSBfX2RlcGVuZGVuY3kxX187XG5cbiAgdmFyIGVzY2FwZSA9IHtcbiAgICBcIiZcIjogXCImYW1wO1wiLFxuICAgIFwiPFwiOiBcIiZsdDtcIixcbiAgICBcIj5cIjogXCImZ3Q7XCIsXG4gICAgJ1wiJzogXCImcXVvdDtcIixcbiAgICBcIidcIjogXCImI3gyNztcIixcbiAgICBcImBcIjogXCImI3g2MDtcIlxuICB9O1xuXG4gIHZhciBiYWRDaGFycyA9IC9bJjw+XCInYF0vZztcbiAgdmFyIHBvc3NpYmxlID0gL1smPD5cIidgXS87XG5cbiAgZnVuY3Rpb24gZXNjYXBlQ2hhcihjaHIpIHtcbiAgICByZXR1cm4gZXNjYXBlW2Nocl07XG4gIH1cblxuICBmdW5jdGlvbiBleHRlbmQob2JqIC8qICwgLi4uc291cmNlICovKSB7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGZvciAodmFyIGtleSBpbiBhcmd1bWVudHNbaV0pIHtcbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhcmd1bWVudHNbaV0sIGtleSkpIHtcbiAgICAgICAgICBvYmpba2V5XSA9IGFyZ3VtZW50c1tpXVtrZXldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIF9fZXhwb3J0c19fLmV4dGVuZCA9IGV4dGVuZDt2YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuICBfX2V4cG9ydHNfXy50b1N0cmluZyA9IHRvU3RyaW5nO1xuICAvLyBTb3VyY2VkIGZyb20gbG9kYXNoXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9iZXN0aWVqcy9sb2Rhc2gvYmxvYi9tYXN0ZXIvTElDRU5TRS50eHRcbiAgdmFyIGlzRnVuY3Rpb24gPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbic7XG4gIH07XG4gIC8vIGZhbGxiYWNrIGZvciBvbGRlciB2ZXJzaW9ucyBvZiBDaHJvbWUgYW5kIFNhZmFyaVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBpZiAoaXNGdW5jdGlvbigveC8pKSB7XG4gICAgaXNGdW5jdGlvbiA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nICYmIHRvU3RyaW5nLmNhbGwodmFsdWUpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xuICAgIH07XG4gIH1cbiAgdmFyIGlzRnVuY3Rpb247XG4gIF9fZXhwb3J0c19fLmlzRnVuY3Rpb24gPSBpc0Z1bmN0aW9uO1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICB2YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpID8gdG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09ICdbb2JqZWN0IEFycmF5XScgOiBmYWxzZTtcbiAgfTtcbiAgX19leHBvcnRzX18uaXNBcnJheSA9IGlzQXJyYXk7XG5cbiAgZnVuY3Rpb24gZXNjYXBlRXhwcmVzc2lvbihzdHJpbmcpIHtcbiAgICAvLyBkb24ndCBlc2NhcGUgU2FmZVN0cmluZ3MsIHNpbmNlIHRoZXkncmUgYWxyZWFkeSBzYWZlXG4gICAgaWYgKHN0cmluZyBpbnN0YW5jZW9mIFNhZmVTdHJpbmcpIHtcbiAgICAgIHJldHVybiBzdHJpbmcudG9TdHJpbmcoKTtcbiAgICB9IGVsc2UgaWYgKHN0cmluZyA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gXCJcIjtcbiAgICB9IGVsc2UgaWYgKCFzdHJpbmcpIHtcbiAgICAgIHJldHVybiBzdHJpbmcgKyAnJztcbiAgICB9XG5cbiAgICAvLyBGb3JjZSBhIHN0cmluZyBjb252ZXJzaW9uIGFzIHRoaXMgd2lsbCBiZSBkb25lIGJ5IHRoZSBhcHBlbmQgcmVnYXJkbGVzcyBhbmRcbiAgICAvLyB0aGUgcmVnZXggdGVzdCB3aWxsIGRvIHRoaXMgdHJhbnNwYXJlbnRseSBiZWhpbmQgdGhlIHNjZW5lcywgY2F1c2luZyBpc3N1ZXMgaWZcbiAgICAvLyBhbiBvYmplY3QncyB0byBzdHJpbmcgaGFzIGVzY2FwZWQgY2hhcmFjdGVycyBpbiBpdC5cbiAgICBzdHJpbmcgPSBcIlwiICsgc3RyaW5nO1xuXG4gICAgaWYoIXBvc3NpYmxlLnRlc3Qoc3RyaW5nKSkgeyByZXR1cm4gc3RyaW5nOyB9XG4gICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKGJhZENoYXJzLCBlc2NhcGVDaGFyKTtcbiAgfVxuXG4gIF9fZXhwb3J0c19fLmVzY2FwZUV4cHJlc3Npb24gPSBlc2NhcGVFeHByZXNzaW9uO2Z1bmN0aW9uIGlzRW1wdHkodmFsdWUpIHtcbiAgICBpZiAoIXZhbHVlICYmIHZhbHVlICE9PSAwKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKGlzQXJyYXkodmFsdWUpICYmIHZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBfX2V4cG9ydHNfXy5pc0VtcHR5ID0gaXNFbXB0eTtmdW5jdGlvbiBhcHBlbmRDb250ZXh0UGF0aChjb250ZXh0UGF0aCwgaWQpIHtcbiAgICByZXR1cm4gKGNvbnRleHRQYXRoID8gY29udGV4dFBhdGggKyAnLicgOiAnJykgKyBpZDtcbiAgfVxuXG4gIF9fZXhwb3J0c19fLmFwcGVuZENvbnRleHRQYXRoID0gYXBwZW5kQ29udGV4dFBhdGg7XG4gIHJldHVybiBfX2V4cG9ydHNfXztcbn0pKF9fbW9kdWxlM19fKTtcblxuLy8gaGFuZGxlYmFycy9leGNlcHRpb24uanNcbnZhciBfX21vZHVsZTRfXyA9IChmdW5jdGlvbigpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG4gIHZhciBfX2V4cG9ydHNfXztcblxuICB2YXIgZXJyb3JQcm9wcyA9IFsnZGVzY3JpcHRpb24nLCAnZmlsZU5hbWUnLCAnbGluZU51bWJlcicsICdtZXNzYWdlJywgJ25hbWUnLCAnbnVtYmVyJywgJ3N0YWNrJ107XG5cbiAgZnVuY3Rpb24gRXhjZXB0aW9uKG1lc3NhZ2UsIG5vZGUpIHtcbiAgICB2YXIgbGluZTtcbiAgICBpZiAobm9kZSAmJiBub2RlLmZpcnN0TGluZSkge1xuICAgICAgbGluZSA9IG5vZGUuZmlyc3RMaW5lO1xuXG4gICAgICBtZXNzYWdlICs9ICcgLSAnICsgbGluZSArICc6JyArIG5vZGUuZmlyc3RDb2x1bW47XG4gICAgfVxuXG4gICAgdmFyIHRtcCA9IEVycm9yLnByb3RvdHlwZS5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIG1lc3NhZ2UpO1xuXG4gICAgLy8gVW5mb3J0dW5hdGVseSBlcnJvcnMgYXJlIG5vdCBlbnVtZXJhYmxlIGluIENocm9tZSAoYXQgbGVhc3QpLCBzbyBgZm9yIHByb3AgaW4gdG1wYCBkb2Vzbid0IHdvcmsuXG4gICAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgZXJyb3JQcm9wcy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgICB0aGlzW2Vycm9yUHJvcHNbaWR4XV0gPSB0bXBbZXJyb3JQcm9wc1tpZHhdXTtcbiAgICB9XG5cbiAgICBpZiAobGluZSkge1xuICAgICAgdGhpcy5saW5lTnVtYmVyID0gbGluZTtcbiAgICAgIHRoaXMuY29sdW1uID0gbm9kZS5maXJzdENvbHVtbjtcbiAgICB9XG4gIH1cblxuICBFeGNlcHRpb24ucHJvdG90eXBlID0gbmV3IEVycm9yKCk7XG5cbiAgX19leHBvcnRzX18gPSBFeGNlcHRpb247XG4gIHJldHVybiBfX2V4cG9ydHNfXztcbn0pKCk7XG5cbi8vIGhhbmRsZWJhcnMvYmFzZS5qc1xudmFyIF9fbW9kdWxlMV9fID0gKGZ1bmN0aW9uKF9fZGVwZW5kZW5jeTFfXywgX19kZXBlbmRlbmN5Ml9fKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuICB2YXIgX19leHBvcnRzX18gPSB7fTtcbiAgdmFyIFV0aWxzID0gX19kZXBlbmRlbmN5MV9fO1xuICB2YXIgRXhjZXB0aW9uID0gX19kZXBlbmRlbmN5Ml9fO1xuXG4gIHZhciBWRVJTSU9OID0gXCIyLjAuMFwiO1xuICBfX2V4cG9ydHNfXy5WRVJTSU9OID0gVkVSU0lPTjt2YXIgQ09NUElMRVJfUkVWSVNJT04gPSA2O1xuICBfX2V4cG9ydHNfXy5DT01QSUxFUl9SRVZJU0lPTiA9IENPTVBJTEVSX1JFVklTSU9OO1xuICB2YXIgUkVWSVNJT05fQ0hBTkdFUyA9IHtcbiAgICAxOiAnPD0gMS4wLnJjLjInLCAvLyAxLjAucmMuMiBpcyBhY3R1YWxseSByZXYyIGJ1dCBkb2Vzbid0IHJlcG9ydCBpdFxuICAgIDI6ICc9PSAxLjAuMC1yYy4zJyxcbiAgICAzOiAnPT0gMS4wLjAtcmMuNCcsXG4gICAgNDogJz09IDEueC54JyxcbiAgICA1OiAnPT0gMi4wLjAtYWxwaGEueCcsXG4gICAgNjogJz49IDIuMC4wLWJldGEuMSdcbiAgfTtcbiAgX19leHBvcnRzX18uUkVWSVNJT05fQ0hBTkdFUyA9IFJFVklTSU9OX0NIQU5HRVM7XG4gIHZhciBpc0FycmF5ID0gVXRpbHMuaXNBcnJheSxcbiAgICAgIGlzRnVuY3Rpb24gPSBVdGlscy5pc0Z1bmN0aW9uLFxuICAgICAgdG9TdHJpbmcgPSBVdGlscy50b1N0cmluZyxcbiAgICAgIG9iamVjdFR5cGUgPSAnW29iamVjdCBPYmplY3RdJztcblxuICBmdW5jdGlvbiBIYW5kbGViYXJzRW52aXJvbm1lbnQoaGVscGVycywgcGFydGlhbHMpIHtcbiAgICB0aGlzLmhlbHBlcnMgPSBoZWxwZXJzIHx8IHt9O1xuICAgIHRoaXMucGFydGlhbHMgPSBwYXJ0aWFscyB8fCB7fTtcblxuICAgIHJlZ2lzdGVyRGVmYXVsdEhlbHBlcnModGhpcyk7XG4gIH1cblxuICBfX2V4cG9ydHNfXy5IYW5kbGViYXJzRW52aXJvbm1lbnQgPSBIYW5kbGViYXJzRW52aXJvbm1lbnQ7SGFuZGxlYmFyc0Vudmlyb25tZW50LnByb3RvdHlwZSA9IHtcbiAgICBjb25zdHJ1Y3RvcjogSGFuZGxlYmFyc0Vudmlyb25tZW50LFxuXG4gICAgbG9nZ2VyOiBsb2dnZXIsXG4gICAgbG9nOiBsb2csXG5cbiAgICByZWdpc3RlckhlbHBlcjogZnVuY3Rpb24obmFtZSwgZm4pIHtcbiAgICAgIGlmICh0b1N0cmluZy5jYWxsKG5hbWUpID09PSBvYmplY3RUeXBlKSB7XG4gICAgICAgIGlmIChmbikgeyB0aHJvdyBuZXcgRXhjZXB0aW9uKCdBcmcgbm90IHN1cHBvcnRlZCB3aXRoIG11bHRpcGxlIGhlbHBlcnMnKTsgfVxuICAgICAgICBVdGlscy5leHRlbmQodGhpcy5oZWxwZXJzLCBuYW1lKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuaGVscGVyc1tuYW1lXSA9IGZuO1xuICAgICAgfVxuICAgIH0sXG4gICAgdW5yZWdpc3RlckhlbHBlcjogZnVuY3Rpb24obmFtZSkge1xuICAgICAgZGVsZXRlIHRoaXMuaGVscGVyc1tuYW1lXTtcbiAgICB9LFxuXG4gICAgcmVnaXN0ZXJQYXJ0aWFsOiBmdW5jdGlvbihuYW1lLCBwYXJ0aWFsKSB7XG4gICAgICBpZiAodG9TdHJpbmcuY2FsbChuYW1lKSA9PT0gb2JqZWN0VHlwZSkge1xuICAgICAgICBVdGlscy5leHRlbmQodGhpcy5wYXJ0aWFscywgIG5hbWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wYXJ0aWFsc1tuYW1lXSA9IHBhcnRpYWw7XG4gICAgICB9XG4gICAgfSxcbiAgICB1bnJlZ2lzdGVyUGFydGlhbDogZnVuY3Rpb24obmFtZSkge1xuICAgICAgZGVsZXRlIHRoaXMucGFydGlhbHNbbmFtZV07XG4gICAgfVxuICB9O1xuXG4gIGZ1bmN0aW9uIHJlZ2lzdGVyRGVmYXVsdEhlbHBlcnMoaW5zdGFuY2UpIHtcbiAgICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignaGVscGVyTWlzc2luZycsIGZ1bmN0aW9uKC8qIFthcmdzLCBdb3B0aW9ucyAqLykge1xuICAgICAgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAvLyBBIG1pc3NpbmcgZmllbGQgaW4gYSB7e2Zvb319IGNvbnN0dWN0LlxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gU29tZW9uZSBpcyBhY3R1YWxseSB0cnlpbmcgdG8gY2FsbCBzb21ldGhpbmcsIGJsb3cgdXAuXG4gICAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oXCJNaXNzaW5nIGhlbHBlcjogJ1wiICsgYXJndW1lbnRzW2FyZ3VtZW50cy5sZW5ndGgtMV0ubmFtZSArIFwiJ1wiKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCdibG9ja0hlbHBlck1pc3NpbmcnLCBmdW5jdGlvbihjb250ZXh0LCBvcHRpb25zKSB7XG4gICAgICB2YXIgaW52ZXJzZSA9IG9wdGlvbnMuaW52ZXJzZSxcbiAgICAgICAgICBmbiA9IG9wdGlvbnMuZm47XG5cbiAgICAgIGlmKGNvbnRleHQgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIGZuKHRoaXMpO1xuICAgICAgfSBlbHNlIGlmKGNvbnRleHQgPT09IGZhbHNlIHx8IGNvbnRleHQgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gaW52ZXJzZSh0aGlzKTtcbiAgICAgIH0gZWxzZSBpZiAoaXNBcnJheShjb250ZXh0KSkge1xuICAgICAgICBpZihjb250ZXh0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBpZiAob3B0aW9ucy5pZHMpIHtcbiAgICAgICAgICAgIG9wdGlvbnMuaWRzID0gW29wdGlvbnMubmFtZV07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIGluc3RhbmNlLmhlbHBlcnMuZWFjaChjb250ZXh0LCBvcHRpb25zKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gaW52ZXJzZSh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuZGF0YSAmJiBvcHRpb25zLmlkcykge1xuICAgICAgICAgIHZhciBkYXRhID0gY3JlYXRlRnJhbWUob3B0aW9ucy5kYXRhKTtcbiAgICAgICAgICBkYXRhLmNvbnRleHRQYXRoID0gVXRpbHMuYXBwZW5kQ29udGV4dFBhdGgob3B0aW9ucy5kYXRhLmNvbnRleHRQYXRoLCBvcHRpb25zLm5hbWUpO1xuICAgICAgICAgIG9wdGlvbnMgPSB7ZGF0YTogZGF0YX07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZm4oY29udGV4dCwgb3B0aW9ucyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignZWFjaCcsIGZ1bmN0aW9uKGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgICAgIGlmICghb3B0aW9ucykge1xuICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdNdXN0IHBhc3MgaXRlcmF0b3IgdG8gI2VhY2gnKTtcbiAgICAgIH1cblxuICAgICAgdmFyIGZuID0gb3B0aW9ucy5mbiwgaW52ZXJzZSA9IG9wdGlvbnMuaW52ZXJzZTtcbiAgICAgIHZhciBpID0gMCwgcmV0ID0gXCJcIiwgZGF0YTtcblxuICAgICAgdmFyIGNvbnRleHRQYXRoO1xuICAgICAgaWYgKG9wdGlvbnMuZGF0YSAmJiBvcHRpb25zLmlkcykge1xuICAgICAgICBjb250ZXh0UGF0aCA9IFV0aWxzLmFwcGVuZENvbnRleHRQYXRoKG9wdGlvbnMuZGF0YS5jb250ZXh0UGF0aCwgb3B0aW9ucy5pZHNbMF0pICsgJy4nO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNGdW5jdGlvbihjb250ZXh0KSkgeyBjb250ZXh0ID0gY29udGV4dC5jYWxsKHRoaXMpOyB9XG5cbiAgICAgIGlmIChvcHRpb25zLmRhdGEpIHtcbiAgICAgICAgZGF0YSA9IGNyZWF0ZUZyYW1lKG9wdGlvbnMuZGF0YSk7XG4gICAgICB9XG5cbiAgICAgIGlmKGNvbnRleHQgJiYgdHlwZW9mIGNvbnRleHQgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGlmIChpc0FycmF5KGNvbnRleHQpKSB7XG4gICAgICAgICAgZm9yKHZhciBqID0gY29udGV4dC5sZW5ndGg7IGk8ajsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgICBkYXRhLmluZGV4ID0gaTtcbiAgICAgICAgICAgICAgZGF0YS5maXJzdCA9IChpID09PSAwKTtcbiAgICAgICAgICAgICAgZGF0YS5sYXN0ICA9IChpID09PSAoY29udGV4dC5sZW5ndGgtMSkpO1xuXG4gICAgICAgICAgICAgIGlmIChjb250ZXh0UGF0aCkge1xuICAgICAgICAgICAgICAgIGRhdGEuY29udGV4dFBhdGggPSBjb250ZXh0UGF0aCArIGk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldCA9IHJldCArIGZuKGNvbnRleHRbaV0sIHsgZGF0YTogZGF0YSB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZm9yKHZhciBrZXkgaW4gY29udGV4dCkge1xuICAgICAgICAgICAgaWYoY29udGV4dC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgIGlmKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBkYXRhLmtleSA9IGtleTtcbiAgICAgICAgICAgICAgICBkYXRhLmluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICBkYXRhLmZpcnN0ID0gKGkgPT09IDApO1xuXG4gICAgICAgICAgICAgICAgaWYgKGNvbnRleHRQYXRoKSB7XG4gICAgICAgICAgICAgICAgICBkYXRhLmNvbnRleHRQYXRoID0gY29udGV4dFBhdGggKyBrZXk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldCA9IHJldCArIGZuKGNvbnRleHRba2V5XSwge2RhdGE6IGRhdGF9KTtcbiAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZihpID09PSAwKXtcbiAgICAgICAgcmV0ID0gaW52ZXJzZSh0aGlzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJldDtcbiAgICB9KTtcblxuICAgIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCdpZicsIGZ1bmN0aW9uKGNvbmRpdGlvbmFsLCBvcHRpb25zKSB7XG4gICAgICBpZiAoaXNGdW5jdGlvbihjb25kaXRpb25hbCkpIHsgY29uZGl0aW9uYWwgPSBjb25kaXRpb25hbC5jYWxsKHRoaXMpOyB9XG5cbiAgICAgIC8vIERlZmF1bHQgYmVoYXZpb3IgaXMgdG8gcmVuZGVyIHRoZSBwb3NpdGl2ZSBwYXRoIGlmIHRoZSB2YWx1ZSBpcyB0cnV0aHkgYW5kIG5vdCBlbXB0eS5cbiAgICAgIC8vIFRoZSBgaW5jbHVkZVplcm9gIG9wdGlvbiBtYXkgYmUgc2V0IHRvIHRyZWF0IHRoZSBjb25kdGlvbmFsIGFzIHB1cmVseSBub3QgZW1wdHkgYmFzZWQgb24gdGhlXG4gICAgICAvLyBiZWhhdmlvciBvZiBpc0VtcHR5LiBFZmZlY3RpdmVseSB0aGlzIGRldGVybWluZXMgaWYgMCBpcyBoYW5kbGVkIGJ5IHRoZSBwb3NpdGl2ZSBwYXRoIG9yIG5lZ2F0aXZlLlxuICAgICAgaWYgKCghb3B0aW9ucy5oYXNoLmluY2x1ZGVaZXJvICYmICFjb25kaXRpb25hbCkgfHwgVXRpbHMuaXNFbXB0eShjb25kaXRpb25hbCkpIHtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMuaW52ZXJzZSh0aGlzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBvcHRpb25zLmZuKHRoaXMpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ3VubGVzcycsIGZ1bmN0aW9uKGNvbmRpdGlvbmFsLCBvcHRpb25zKSB7XG4gICAgICByZXR1cm4gaW5zdGFuY2UuaGVscGVyc1snaWYnXS5jYWxsKHRoaXMsIGNvbmRpdGlvbmFsLCB7Zm46IG9wdGlvbnMuaW52ZXJzZSwgaW52ZXJzZTogb3B0aW9ucy5mbiwgaGFzaDogb3B0aW9ucy5oYXNofSk7XG4gICAgfSk7XG5cbiAgICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignd2l0aCcsIGZ1bmN0aW9uKGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgICAgIGlmIChpc0Z1bmN0aW9uKGNvbnRleHQpKSB7IGNvbnRleHQgPSBjb250ZXh0LmNhbGwodGhpcyk7IH1cblxuICAgICAgdmFyIGZuID0gb3B0aW9ucy5mbjtcblxuICAgICAgaWYgKCFVdGlscy5pc0VtcHR5KGNvbnRleHQpKSB7XG4gICAgICAgIGlmIChvcHRpb25zLmRhdGEgJiYgb3B0aW9ucy5pZHMpIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IGNyZWF0ZUZyYW1lKG9wdGlvbnMuZGF0YSk7XG4gICAgICAgICAgZGF0YS5jb250ZXh0UGF0aCA9IFV0aWxzLmFwcGVuZENvbnRleHRQYXRoKG9wdGlvbnMuZGF0YS5jb250ZXh0UGF0aCwgb3B0aW9ucy5pZHNbMF0pO1xuICAgICAgICAgIG9wdGlvbnMgPSB7ZGF0YTpkYXRhfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmbihjb250ZXh0LCBvcHRpb25zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBvcHRpb25zLmludmVyc2UodGhpcyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignbG9nJywgZnVuY3Rpb24obWVzc2FnZSwgb3B0aW9ucykge1xuICAgICAgdmFyIGxldmVsID0gb3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuZGF0YS5sZXZlbCAhPSBudWxsID8gcGFyc2VJbnQob3B0aW9ucy5kYXRhLmxldmVsLCAxMCkgOiAxO1xuICAgICAgaW5zdGFuY2UubG9nKGxldmVsLCBtZXNzYWdlKTtcbiAgICB9KTtcblxuICAgIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCdsb29rdXAnLCBmdW5jdGlvbihvYmosIGZpZWxkKSB7XG4gICAgICByZXR1cm4gb2JqICYmIG9ialtmaWVsZF07XG4gICAgfSk7XG4gIH1cblxuICB2YXIgbG9nZ2VyID0ge1xuICAgIG1ldGhvZE1hcDogeyAwOiAnZGVidWcnLCAxOiAnaW5mbycsIDI6ICd3YXJuJywgMzogJ2Vycm9yJyB9LFxuXG4gICAgLy8gU3RhdGUgZW51bVxuICAgIERFQlVHOiAwLFxuICAgIElORk86IDEsXG4gICAgV0FSTjogMixcbiAgICBFUlJPUjogMyxcbiAgICBsZXZlbDogMyxcblxuICAgIC8vIGNhbiBiZSBvdmVycmlkZGVuIGluIHRoZSBob3N0IGVudmlyb25tZW50XG4gICAgbG9nOiBmdW5jdGlvbihsZXZlbCwgbWVzc2FnZSkge1xuICAgICAgaWYgKGxvZ2dlci5sZXZlbCA8PSBsZXZlbCkge1xuICAgICAgICB2YXIgbWV0aG9kID0gbG9nZ2VyLm1ldGhvZE1hcFtsZXZlbF07XG4gICAgICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiYgY29uc29sZVttZXRob2RdKSB7XG4gICAgICAgICAgY29uc29sZVttZXRob2RdLmNhbGwoY29uc29sZSwgbWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG4gIF9fZXhwb3J0c19fLmxvZ2dlciA9IGxvZ2dlcjtcbiAgdmFyIGxvZyA9IGxvZ2dlci5sb2c7XG4gIF9fZXhwb3J0c19fLmxvZyA9IGxvZztcbiAgdmFyIGNyZWF0ZUZyYW1lID0gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgdmFyIGZyYW1lID0gVXRpbHMuZXh0ZW5kKHt9LCBvYmplY3QpO1xuICAgIGZyYW1lLl9wYXJlbnQgPSBvYmplY3Q7XG4gICAgcmV0dXJuIGZyYW1lO1xuICB9O1xuICBfX2V4cG9ydHNfXy5jcmVhdGVGcmFtZSA9IGNyZWF0ZUZyYW1lO1xuICByZXR1cm4gX19leHBvcnRzX187XG59KShfX21vZHVsZTJfXywgX19tb2R1bGU0X18pO1xuXG4vLyBoYW5kbGViYXJzL3J1bnRpbWUuanNcbnZhciBfX21vZHVsZTVfXyA9IChmdW5jdGlvbihfX2RlcGVuZGVuY3kxX18sIF9fZGVwZW5kZW5jeTJfXywgX19kZXBlbmRlbmN5M19fKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuICB2YXIgX19leHBvcnRzX18gPSB7fTtcbiAgdmFyIFV0aWxzID0gX19kZXBlbmRlbmN5MV9fO1xuICB2YXIgRXhjZXB0aW9uID0gX19kZXBlbmRlbmN5Ml9fO1xuICB2YXIgQ09NUElMRVJfUkVWSVNJT04gPSBfX2RlcGVuZGVuY3kzX18uQ09NUElMRVJfUkVWSVNJT047XG4gIHZhciBSRVZJU0lPTl9DSEFOR0VTID0gX19kZXBlbmRlbmN5M19fLlJFVklTSU9OX0NIQU5HRVM7XG4gIHZhciBjcmVhdGVGcmFtZSA9IF9fZGVwZW5kZW5jeTNfXy5jcmVhdGVGcmFtZTtcblxuICBmdW5jdGlvbiBjaGVja1JldmlzaW9uKGNvbXBpbGVySW5mbykge1xuICAgIHZhciBjb21waWxlclJldmlzaW9uID0gY29tcGlsZXJJbmZvICYmIGNvbXBpbGVySW5mb1swXSB8fCAxLFxuICAgICAgICBjdXJyZW50UmV2aXNpb24gPSBDT01QSUxFUl9SRVZJU0lPTjtcblxuICAgIGlmIChjb21waWxlclJldmlzaW9uICE9PSBjdXJyZW50UmV2aXNpb24pIHtcbiAgICAgIGlmIChjb21waWxlclJldmlzaW9uIDwgY3VycmVudFJldmlzaW9uKSB7XG4gICAgICAgIHZhciBydW50aW1lVmVyc2lvbnMgPSBSRVZJU0lPTl9DSEFOR0VTW2N1cnJlbnRSZXZpc2lvbl0sXG4gICAgICAgICAgICBjb21waWxlclZlcnNpb25zID0gUkVWSVNJT05fQ0hBTkdFU1tjb21waWxlclJldmlzaW9uXTtcbiAgICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbihcIlRlbXBsYXRlIHdhcyBwcmVjb21waWxlZCB3aXRoIGFuIG9sZGVyIHZlcnNpb24gb2YgSGFuZGxlYmFycyB0aGFuIHRoZSBjdXJyZW50IHJ1bnRpbWUuIFwiK1xuICAgICAgICAgICAgICBcIlBsZWFzZSB1cGRhdGUgeW91ciBwcmVjb21waWxlciB0byBhIG5ld2VyIHZlcnNpb24gKFwiK3J1bnRpbWVWZXJzaW9ucytcIikgb3IgZG93bmdyYWRlIHlvdXIgcnVudGltZSB0byBhbiBvbGRlciB2ZXJzaW9uIChcIitjb21waWxlclZlcnNpb25zK1wiKS5cIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBVc2UgdGhlIGVtYmVkZGVkIHZlcnNpb24gaW5mbyBzaW5jZSB0aGUgcnVudGltZSBkb2Vzbid0IGtub3cgYWJvdXQgdGhpcyByZXZpc2lvbiB5ZXRcbiAgICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbihcIlRlbXBsYXRlIHdhcyBwcmVjb21waWxlZCB3aXRoIGEgbmV3ZXIgdmVyc2lvbiBvZiBIYW5kbGViYXJzIHRoYW4gdGhlIGN1cnJlbnQgcnVudGltZS4gXCIrXG4gICAgICAgICAgICAgIFwiUGxlYXNlIHVwZGF0ZSB5b3VyIHJ1bnRpbWUgdG8gYSBuZXdlciB2ZXJzaW9uIChcIitjb21waWxlckluZm9bMV0rXCIpLlwiKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBfX2V4cG9ydHNfXy5jaGVja1JldmlzaW9uID0gY2hlY2tSZXZpc2lvbjsvLyBUT0RPOiBSZW1vdmUgdGhpcyBsaW5lIGFuZCBicmVhayB1cCBjb21waWxlUGFydGlhbFxuXG4gIGZ1bmN0aW9uIHRlbXBsYXRlKHRlbXBsYXRlU3BlYywgZW52KSB7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICBpZiAoIWVudikge1xuICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbihcIk5vIGVudmlyb25tZW50IHBhc3NlZCB0byB0ZW1wbGF0ZVwiKTtcbiAgICB9XG4gICAgaWYgKCF0ZW1wbGF0ZVNwZWMgfHwgIXRlbXBsYXRlU3BlYy5tYWluKSB7XG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdVbmtub3duIHRlbXBsYXRlIG9iamVjdDogJyArIHR5cGVvZiB0ZW1wbGF0ZVNwZWMpO1xuICAgIH1cblxuICAgIC8vIE5vdGU6IFVzaW5nIGVudi5WTSByZWZlcmVuY2VzIHJhdGhlciB0aGFuIGxvY2FsIHZhciByZWZlcmVuY2VzIHRocm91Z2hvdXQgdGhpcyBzZWN0aW9uIHRvIGFsbG93XG4gICAgLy8gZm9yIGV4dGVybmFsIHVzZXJzIHRvIG92ZXJyaWRlIHRoZXNlIGFzIHBzdWVkby1zdXBwb3J0ZWQgQVBJcy5cbiAgICBlbnYuVk0uY2hlY2tSZXZpc2lvbih0ZW1wbGF0ZVNwZWMuY29tcGlsZXIpO1xuXG4gICAgdmFyIGludm9rZVBhcnRpYWxXcmFwcGVyID0gZnVuY3Rpb24ocGFydGlhbCwgaW5kZW50LCBuYW1lLCBjb250ZXh0LCBoYXNoLCBoZWxwZXJzLCBwYXJ0aWFscywgZGF0YSwgZGVwdGhzKSB7XG4gICAgICBpZiAoaGFzaCkge1xuICAgICAgICBjb250ZXh0ID0gVXRpbHMuZXh0ZW5kKHt9LCBjb250ZXh0LCBoYXNoKTtcbiAgICAgIH1cblxuICAgICAgdmFyIHJlc3VsdCA9IGVudi5WTS5pbnZva2VQYXJ0aWFsLmNhbGwodGhpcywgcGFydGlhbCwgbmFtZSwgY29udGV4dCwgaGVscGVycywgcGFydGlhbHMsIGRhdGEsIGRlcHRocyk7XG5cbiAgICAgIGlmIChyZXN1bHQgPT0gbnVsbCAmJiBlbnYuY29tcGlsZSkge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IHsgaGVscGVyczogaGVscGVycywgcGFydGlhbHM6IHBhcnRpYWxzLCBkYXRhOiBkYXRhLCBkZXB0aHM6IGRlcHRocyB9O1xuICAgICAgICBwYXJ0aWFsc1tuYW1lXSA9IGVudi5jb21waWxlKHBhcnRpYWwsIHsgZGF0YTogZGF0YSAhPT0gdW5kZWZpbmVkLCBjb21wYXQ6IHRlbXBsYXRlU3BlYy5jb21wYXQgfSwgZW52KTtcbiAgICAgICAgcmVzdWx0ID0gcGFydGlhbHNbbmFtZV0oY29udGV4dCwgb3B0aW9ucyk7XG4gICAgICB9XG4gICAgICBpZiAocmVzdWx0ICE9IG51bGwpIHtcbiAgICAgICAgaWYgKGluZGVudCkge1xuICAgICAgICAgIHZhciBsaW5lcyA9IHJlc3VsdC5zcGxpdCgnXFxuJyk7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBsaW5lcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIGlmICghbGluZXNbaV0gJiYgaSArIDEgPT09IGwpIHtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxpbmVzW2ldID0gaW5kZW50ICsgbGluZXNbaV07XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlc3VsdCA9IGxpbmVzLmpvaW4oJ1xcbicpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKFwiVGhlIHBhcnRpYWwgXCIgKyBuYW1lICsgXCIgY291bGQgbm90IGJlIGNvbXBpbGVkIHdoZW4gcnVubmluZyBpbiBydW50aW1lLW9ubHkgbW9kZVwiKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gSnVzdCBhZGQgd2F0ZXJcbiAgICB2YXIgY29udGFpbmVyID0ge1xuICAgICAgbG9va3VwOiBmdW5jdGlvbihkZXB0aHMsIG5hbWUpIHtcbiAgICAgICAgdmFyIGxlbiA9IGRlcHRocy5sZW5ndGg7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICBpZiAoZGVwdGhzW2ldICYmIGRlcHRoc1tpXVtuYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gZGVwdGhzW2ldW25hbWVdO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGxhbWJkYTogZnVuY3Rpb24oY3VycmVudCwgY29udGV4dCkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIGN1cnJlbnQgPT09ICdmdW5jdGlvbicgPyBjdXJyZW50LmNhbGwoY29udGV4dCkgOiBjdXJyZW50O1xuICAgICAgfSxcblxuICAgICAgZXNjYXBlRXhwcmVzc2lvbjogVXRpbHMuZXNjYXBlRXhwcmVzc2lvbixcbiAgICAgIGludm9rZVBhcnRpYWw6IGludm9rZVBhcnRpYWxXcmFwcGVyLFxuXG4gICAgICBmbjogZnVuY3Rpb24oaSkge1xuICAgICAgICByZXR1cm4gdGVtcGxhdGVTcGVjW2ldO1xuICAgICAgfSxcblxuICAgICAgcHJvZ3JhbXM6IFtdLFxuICAgICAgcHJvZ3JhbTogZnVuY3Rpb24oaSwgZGF0YSwgZGVwdGhzKSB7XG4gICAgICAgIHZhciBwcm9ncmFtV3JhcHBlciA9IHRoaXMucHJvZ3JhbXNbaV0sXG4gICAgICAgICAgICBmbiA9IHRoaXMuZm4oaSk7XG4gICAgICAgIGlmIChkYXRhIHx8IGRlcHRocykge1xuICAgICAgICAgIHByb2dyYW1XcmFwcGVyID0gcHJvZ3JhbSh0aGlzLCBpLCBmbiwgZGF0YSwgZGVwdGhzKTtcbiAgICAgICAgfSBlbHNlIGlmICghcHJvZ3JhbVdyYXBwZXIpIHtcbiAgICAgICAgICBwcm9ncmFtV3JhcHBlciA9IHRoaXMucHJvZ3JhbXNbaV0gPSBwcm9ncmFtKHRoaXMsIGksIGZuKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcHJvZ3JhbVdyYXBwZXI7XG4gICAgICB9LFxuXG4gICAgICBkYXRhOiBmdW5jdGlvbihkYXRhLCBkZXB0aCkge1xuICAgICAgICB3aGlsZSAoZGF0YSAmJiBkZXB0aC0tKSB7XG4gICAgICAgICAgZGF0YSA9IGRhdGEuX3BhcmVudDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgIH0sXG4gICAgICBtZXJnZTogZnVuY3Rpb24ocGFyYW0sIGNvbW1vbikge1xuICAgICAgICB2YXIgcmV0ID0gcGFyYW0gfHwgY29tbW9uO1xuXG4gICAgICAgIGlmIChwYXJhbSAmJiBjb21tb24gJiYgKHBhcmFtICE9PSBjb21tb24pKSB7XG4gICAgICAgICAgcmV0ID0gVXRpbHMuZXh0ZW5kKHt9LCBjb21tb24sIHBhcmFtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgICB9LFxuXG4gICAgICBub29wOiBlbnYuVk0ubm9vcCxcbiAgICAgIGNvbXBpbGVySW5mbzogdGVtcGxhdGVTcGVjLmNvbXBpbGVyXG4gICAgfTtcblxuICAgIHZhciByZXQgPSBmdW5jdGlvbihjb250ZXh0LCBvcHRpb25zKSB7XG4gICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgIHZhciBkYXRhID0gb3B0aW9ucy5kYXRhO1xuXG4gICAgICByZXQuX3NldHVwKG9wdGlvbnMpO1xuICAgICAgaWYgKCFvcHRpb25zLnBhcnRpYWwgJiYgdGVtcGxhdGVTcGVjLnVzZURhdGEpIHtcbiAgICAgICAgZGF0YSA9IGluaXREYXRhKGNvbnRleHQsIGRhdGEpO1xuICAgICAgfVxuICAgICAgdmFyIGRlcHRocztcbiAgICAgIGlmICh0ZW1wbGF0ZVNwZWMudXNlRGVwdGhzKSB7XG4gICAgICAgIGRlcHRocyA9IG9wdGlvbnMuZGVwdGhzID8gW2NvbnRleHRdLmNvbmNhdChvcHRpb25zLmRlcHRocykgOiBbY29udGV4dF07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0ZW1wbGF0ZVNwZWMubWFpbi5jYWxsKGNvbnRhaW5lciwgY29udGV4dCwgY29udGFpbmVyLmhlbHBlcnMsIGNvbnRhaW5lci5wYXJ0aWFscywgZGF0YSwgZGVwdGhzKTtcbiAgICB9O1xuICAgIHJldC5pc1RvcCA9IHRydWU7XG5cbiAgICByZXQuX3NldHVwID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgaWYgKCFvcHRpb25zLnBhcnRpYWwpIHtcbiAgICAgICAgY29udGFpbmVyLmhlbHBlcnMgPSBjb250YWluZXIubWVyZ2Uob3B0aW9ucy5oZWxwZXJzLCBlbnYuaGVscGVycyk7XG5cbiAgICAgICAgaWYgKHRlbXBsYXRlU3BlYy51c2VQYXJ0aWFsKSB7XG4gICAgICAgICAgY29udGFpbmVyLnBhcnRpYWxzID0gY29udGFpbmVyLm1lcmdlKG9wdGlvbnMucGFydGlhbHMsIGVudi5wYXJ0aWFscyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnRhaW5lci5oZWxwZXJzID0gb3B0aW9ucy5oZWxwZXJzO1xuICAgICAgICBjb250YWluZXIucGFydGlhbHMgPSBvcHRpb25zLnBhcnRpYWxzO1xuICAgICAgfVxuICAgIH07XG5cbiAgICByZXQuX2NoaWxkID0gZnVuY3Rpb24oaSwgZGF0YSwgZGVwdGhzKSB7XG4gICAgICBpZiAodGVtcGxhdGVTcGVjLnVzZURlcHRocyAmJiAhZGVwdGhzKSB7XG4gICAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ211c3QgcGFzcyBwYXJlbnQgZGVwdGhzJyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcm9ncmFtKGNvbnRhaW5lciwgaSwgdGVtcGxhdGVTcGVjW2ldLCBkYXRhLCBkZXB0aHMpO1xuICAgIH07XG4gICAgcmV0dXJuIHJldDtcbiAgfVxuXG4gIF9fZXhwb3J0c19fLnRlbXBsYXRlID0gdGVtcGxhdGU7ZnVuY3Rpb24gcHJvZ3JhbShjb250YWluZXIsIGksIGZuLCBkYXRhLCBkZXB0aHMpIHtcbiAgICB2YXIgcHJvZyA9IGZ1bmN0aW9uKGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgICByZXR1cm4gZm4uY2FsbChjb250YWluZXIsIGNvbnRleHQsIGNvbnRhaW5lci5oZWxwZXJzLCBjb250YWluZXIucGFydGlhbHMsIG9wdGlvbnMuZGF0YSB8fCBkYXRhLCBkZXB0aHMgJiYgW2NvbnRleHRdLmNvbmNhdChkZXB0aHMpKTtcbiAgICB9O1xuICAgIHByb2cucHJvZ3JhbSA9IGk7XG4gICAgcHJvZy5kZXB0aCA9IGRlcHRocyA/IGRlcHRocy5sZW5ndGggOiAwO1xuICAgIHJldHVybiBwcm9nO1xuICB9XG5cbiAgX19leHBvcnRzX18ucHJvZ3JhbSA9IHByb2dyYW07ZnVuY3Rpb24gaW52b2tlUGFydGlhbChwYXJ0aWFsLCBuYW1lLCBjb250ZXh0LCBoZWxwZXJzLCBwYXJ0aWFscywgZGF0YSwgZGVwdGhzKSB7XG4gICAgdmFyIG9wdGlvbnMgPSB7IHBhcnRpYWw6IHRydWUsIGhlbHBlcnM6IGhlbHBlcnMsIHBhcnRpYWxzOiBwYXJ0aWFscywgZGF0YTogZGF0YSwgZGVwdGhzOiBkZXB0aHMgfTtcblxuICAgIGlmKHBhcnRpYWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbihcIlRoZSBwYXJ0aWFsIFwiICsgbmFtZSArIFwiIGNvdWxkIG5vdCBiZSBmb3VuZFwiKTtcbiAgICB9IGVsc2UgaWYocGFydGlhbCBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICByZXR1cm4gcGFydGlhbChjb250ZXh0LCBvcHRpb25zKTtcbiAgICB9XG4gIH1cblxuICBfX2V4cG9ydHNfXy5pbnZva2VQYXJ0aWFsID0gaW52b2tlUGFydGlhbDtmdW5jdGlvbiBub29wKCkgeyByZXR1cm4gXCJcIjsgfVxuXG4gIF9fZXhwb3J0c19fLm5vb3AgPSBub29wO2Z1bmN0aW9uIGluaXREYXRhKGNvbnRleHQsIGRhdGEpIHtcbiAgICBpZiAoIWRhdGEgfHwgISgncm9vdCcgaW4gZGF0YSkpIHtcbiAgICAgIGRhdGEgPSBkYXRhID8gY3JlYXRlRnJhbWUoZGF0YSkgOiB7fTtcbiAgICAgIGRhdGEucm9vdCA9IGNvbnRleHQ7XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xuICB9XG4gIHJldHVybiBfX2V4cG9ydHNfXztcbn0pKF9fbW9kdWxlMl9fLCBfX21vZHVsZTRfXywgX19tb2R1bGUxX18pO1xuXG4vLyBoYW5kbGViYXJzLnJ1bnRpbWUuanNcbnZhciBfX21vZHVsZTBfXyA9IChmdW5jdGlvbihfX2RlcGVuZGVuY3kxX18sIF9fZGVwZW5kZW5jeTJfXywgX19kZXBlbmRlbmN5M19fLCBfX2RlcGVuZGVuY3k0X18sIF9fZGVwZW5kZW5jeTVfXykge1xuICBcInVzZSBzdHJpY3RcIjtcbiAgdmFyIF9fZXhwb3J0c19fO1xuICAvKmdsb2JhbHMgSGFuZGxlYmFyczogdHJ1ZSAqL1xuICB2YXIgYmFzZSA9IF9fZGVwZW5kZW5jeTFfXztcblxuICAvLyBFYWNoIG9mIHRoZXNlIGF1Z21lbnQgdGhlIEhhbmRsZWJhcnMgb2JqZWN0LiBObyBuZWVkIHRvIHNldHVwIGhlcmUuXG4gIC8vIChUaGlzIGlzIGRvbmUgdG8gZWFzaWx5IHNoYXJlIGNvZGUgYmV0d2VlbiBjb21tb25qcyBhbmQgYnJvd3NlIGVudnMpXG4gIHZhciBTYWZlU3RyaW5nID0gX19kZXBlbmRlbmN5Ml9fO1xuICB2YXIgRXhjZXB0aW9uID0gX19kZXBlbmRlbmN5M19fO1xuICB2YXIgVXRpbHMgPSBfX2RlcGVuZGVuY3k0X187XG4gIHZhciBydW50aW1lID0gX19kZXBlbmRlbmN5NV9fO1xuXG4gIC8vIEZvciBjb21wYXRpYmlsaXR5IGFuZCB1c2FnZSBvdXRzaWRlIG9mIG1vZHVsZSBzeXN0ZW1zLCBtYWtlIHRoZSBIYW5kbGViYXJzIG9iamVjdCBhIG5hbWVzcGFjZVxuICB2YXIgY3JlYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGhiID0gbmV3IGJhc2UuSGFuZGxlYmFyc0Vudmlyb25tZW50KCk7XG5cbiAgICBVdGlscy5leHRlbmQoaGIsIGJhc2UpO1xuICAgIGhiLlNhZmVTdHJpbmcgPSBTYWZlU3RyaW5nO1xuICAgIGhiLkV4Y2VwdGlvbiA9IEV4Y2VwdGlvbjtcbiAgICBoYi5VdGlscyA9IFV0aWxzO1xuICAgIGhiLmVzY2FwZUV4cHJlc3Npb24gPSBVdGlscy5lc2NhcGVFeHByZXNzaW9uO1xuXG4gICAgaGIuVk0gPSBydW50aW1lO1xuICAgIGhiLnRlbXBsYXRlID0gZnVuY3Rpb24oc3BlYykge1xuICAgICAgcmV0dXJuIHJ1bnRpbWUudGVtcGxhdGUoc3BlYywgaGIpO1xuICAgIH07XG5cbiAgICByZXR1cm4gaGI7XG4gIH07XG5cbiAgdmFyIEhhbmRsZWJhcnMgPSBjcmVhdGUoKTtcbiAgSGFuZGxlYmFycy5jcmVhdGUgPSBjcmVhdGU7XG5cbiAgSGFuZGxlYmFyc1snZGVmYXVsdCddID0gSGFuZGxlYmFycztcblxuICBfX2V4cG9ydHNfXyA9IEhhbmRsZWJhcnM7XG4gIHJldHVybiBfX2V4cG9ydHNfXztcbn0pKF9fbW9kdWxlMV9fLCBfX21vZHVsZTNfXywgX19tb2R1bGU0X18sIF9fbW9kdWxlMl9fLCBfX21vZHVsZTVfXyk7XG5cbiAgcmV0dXJuIF9fbW9kdWxlMF9fO1xufSkpO1xuIiwiLypcbiAqIGNhdGJlcnJ5LWhhbmRsZWJhcnNcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgRGVuaXMgUmVjaGt1bm92IGFuZCBwcm9qZWN0IGNvbnRyaWJ1dG9ycy5cbiAqXG4gKiBjYXRiZXJyeS1oYW5kbGViYXJzJ3MgbGljZW5zZSBmb2xsb3dzOlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXG4gKiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvblxuICogZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLFxuICogaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSxcbiAqIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsXG4gKiBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuICogc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbiAqIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1NcbiAqIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiAqIFNPRlRXQVJFLlxuICpcbiAqIFRoaXMgbGljZW5zZSBhcHBsaWVzIHRvIGFsbCBwYXJ0cyBvZiBjYXRiZXJyeS1oYW5kbGViYXJzIHRoYXQgYXJlIG5vdCBleHRlcm5hbGx5XG4gKiBtYWludGFpbmVkIGxpYnJhcmllcy5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBIYW5kbGViYXJzID0gcmVxdWlyZSgnLi9saWIvdmVuZG9ycy9oYW5kbGViYXJzJyksXG5cdFRlbXBsYXRlUHJvdmlkZXIgPSByZXF1aXJlKCcuL2xpYi9UZW1wbGF0ZVByb3ZpZGVyJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHRyZWdpc3RlcjogZnVuY3Rpb24gKGxvY2F0b3IsIGNvbmZpZykge1xuXHRcdGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcblx0XHRsb2NhdG9yLnJlZ2lzdGVySW5zdGFuY2UoJ2hhbmRsZWJhcnMnLCBIYW5kbGViYXJzKTtcblx0XHRsb2NhdG9yLnJlZ2lzdGVyKCd0ZW1wbGF0ZVByb3ZpZGVyJywgVGVtcGxhdGVQcm92aWRlciwgY29uZmlnLCB0cnVlKTtcblx0fSxcblx0SGFuZGxlYmFyczogSGFuZGxlYmFycyxcblx0VGVtcGxhdGVQcm92aWRlcjogVGVtcGxhdGVQcm92aWRlclxufTsiLCIvKlxuICogY2F0YmVycnlcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgRGVuaXMgUmVjaGt1bm92IGFuZCBwcm9qZWN0IGNvbnRyaWJ1dG9ycy5cbiAqXG4gKiBjYXRiZXJyeSdzIGxpY2Vuc2UgZm9sbG93czpcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvblxuICogb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb25cbiAqIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbixcbiAqIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsXG4gKiBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLFxuICogYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbiAqIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4gKiBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4gKiBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqXG4gKiBUaGlzIGxpY2Vuc2UgYXBwbGllcyB0byBhbGwgcGFydHMgb2YgY2F0YmVycnkgdGhhdCBhcmUgbm90IGV4dGVybmFsbHlcbiAqIG1haW50YWluZWQgbGlicmFyaWVzLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBDYXRiZXJyeTtcblxudmFyIHV0aWwgPSByZXF1aXJlKCd1dGlsJyksXG5cdENhdGJlcnJ5QmFzZSA9IHJlcXVpcmUoJy4uL2xpYi9iYXNlL0NhdGJlcnJ5QmFzZScpO1xuXG51dGlsLmluaGVyaXRzKENhdGJlcnJ5LCBDYXRiZXJyeUJhc2UpO1xuXG4vKipcbiAqIENyZWF0ZXMgbmV3IGluc3RhbmNlIG9mIHRoZSBicm93c2VyIHZlcnNpb24gb2YgQ2F0YmVycnkuXG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIENhdGJlcnJ5QmFzZVxuICovXG5mdW5jdGlvbiBDYXRiZXJyeSgpIHtcblx0Q2F0YmVycnlCYXNlLmNhbGwodGhpcyk7XG59XG5cbi8qKlxuICogQ3VycmVudCByZXF1ZXN0IHJvdXRlci5cbiAqIEB0eXBlIHtSZXF1ZXN0Um91dGVyfVxuICogQHByaXZhdGVcbiAqL1xuQ2F0YmVycnkucHJvdG90eXBlLl9yb3V0ZXIgPSBudWxsO1xuXG4vKipcbiAqIFdyYXBzIGN1cnJlbnQgSFRNTCBkb2N1bWVudCB3aXRoIENhdGJlcnJ5IGV2ZW50IGhhbmRsZXJzLlxuICovXG5DYXRiZXJyeS5wcm90b3R5cGUud3JhcERvY3VtZW50ID0gZnVuY3Rpb24gKCkge1xuXHR0aGlzLl9yb3V0ZXIgPSB0aGlzLmxvY2F0b3IucmVzb2x2ZSgncmVxdWVzdFJvdXRlcicpO1xufTtcblxuLyoqXG4gKiBTdGFydHMgQ2F0YmVycnkgYXBwbGljYXRpb24gd2hlbiBET00gaXMgcmVhZHkuXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gUHJvbWlzZSBmb3Igbm90aGluZy5cbiAqL1xuQ2F0YmVycnkucHJvdG90eXBlLnN0YXJ0V2hlblJlYWR5ID0gZnVuY3Rpb24gKCkge1xuXHRpZiAod2luZG93LmNhdGJlcnJ5KSB7XG5cdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuXHR9XG5cdHZhciBzZWxmID0gdGhpcztcblxuXHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGZ1bGZpbGwpIHtcblx0XHR3aW5kb3cuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uICgpIHtcblx0XHRcdHNlbGYud3JhcERvY3VtZW50KCk7XG5cdFx0XHR3aW5kb3cuY2F0YmVycnkgPSBzZWxmO1xuXHRcdFx0ZnVsZmlsbCgpO1xuXHRcdH0pO1xuXHR9KTtcbn07IiwiLypcbiAqIGNhdGJlcnJ5XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0IERlbmlzIFJlY2hrdW5vdiBhbmQgcHJvamVjdCBjb250cmlidXRvcnMuXG4gKlxuICogY2F0YmVycnkncyBsaWNlbnNlIGZvbGxvd3M6XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb25cbiAqIG9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uXG4gKiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sXG4gKiBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLFxuICogcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSxcbiAqIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4gKiBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuICogaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuICogT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKlxuICogVGhpcyBsaWNlbnNlIGFwcGxpZXMgdG8gYWxsIHBhcnRzIG9mIGNhdGJlcnJ5IHRoYXQgYXJlIG5vdCBleHRlcm5hbGx5XG4gKiBtYWludGFpbmVkIGxpYnJhcmllcy5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5tb2R1bGUuZXhwb3J0cyA9IENvb2tpZVdyYXBwZXI7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgndXRpbCcpLFxuXHRDb29raWVXcmFwcGVyQmFzZSA9IHJlcXVpcmUoJy4uL2xpYi9iYXNlL0Nvb2tpZVdyYXBwZXJCYXNlJyk7XG5cbnV0aWwuaW5oZXJpdHMoQ29va2llV3JhcHBlciwgQ29va2llV3JhcHBlckJhc2UpO1xuXG4vKipcbiAqIENyZWF0ZXMgbmV3IGluc3RhbmNlIG9mIHRoZSBicm93c2VyIGNvb2tpZSB3cmFwcGVyLlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIENvb2tpZVdyYXBwZXIoJHdpbmRvdykge1xuXHRDb29raWVXcmFwcGVyQmFzZS5jYWxsKHRoaXMpO1xuXHR0aGlzLl93aW5kb3cgPSAkd2luZG93O1xufVxuXG4vKipcbiAqIEN1cnJlbnQgYnJvd3NlciB3aW5kb3cuXG4gKiBAdHlwZSB7V2luZG93fVxuICogQHByaXZhdGVcbiAqL1xuQ29va2llV3JhcHBlci5wcm90b3R5cGUuX3dpbmRvdyA9IG51bGw7XG5cbi8qKlxuICogR2V0cyBjdXJyZW50IGNvb2tpZSBzdHJpbmcuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBDb29raWUgc3RyaW5nLlxuICovXG5Db29raWVXcmFwcGVyLnByb3RvdHlwZS5nZXRDb29raWVTdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG5cdHJldHVybiB0aGlzLl93aW5kb3cuZG9jdW1lbnQuY29va2llID9cblx0XHR0aGlzLl93aW5kb3cuZG9jdW1lbnQuY29va2llLnRvU3RyaW5nKCkgOlxuXHRcdCcnO1xufTtcblxuLyoqXG4gKiBTZXRzIGNvb2tpZSB0byB0aGlzIHdyYXBwZXIuXG4gKiBAcGFyYW0ge09iamVjdH0gY29va2llU2V0dXAgQ29va2llIHNldHVwIG9iamVjdC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBjb29raWVTZXR1cC5rZXkgQ29va2llIGtleS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBjb29raWVTZXR1cC52YWx1ZSBDb29raWUgdmFsdWUuXG4gKiBAcGFyYW0ge251bWJlcj99IGNvb2tpZVNldHVwLm1heEFnZSBNYXggY29va2llIGFnZSBpbiBzZWNvbmRzLlxuICogQHBhcmFtIHtEYXRlP30gY29va2llU2V0dXAuZXhwaXJlcyBFeHBpcmUgZGF0ZS5cbiAqIEBwYXJhbSB7c3RyaW5nP30gY29va2llU2V0dXAucGF0aCBVUkkgcGF0aCBmb3IgY29va2llLlxuICogQHBhcmFtIHtzdHJpbmc/fSBjb29raWVTZXR1cC5kb21haW4gQ29va2llIGRvbWFpbi5cbiAqIEBwYXJhbSB7Ym9vbGVhbj99IGNvb2tpZVNldHVwLnNlY3VyZSBJcyBjb29raWUgc2VjdXJlZC5cbiAqIEBwYXJhbSB7Ym9vbGVhbj99IGNvb2tpZVNldHVwLmh0dHBPbmx5IElzIGNvb2tpZSBIVFRQIG9ubHkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBDb29raWUgc2V0dXAgc3RyaW5nLlxuICovXG5Db29raWVXcmFwcGVyLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiAoY29va2llU2V0dXApIHtcblx0dmFyIGNvb2tpZSA9IHRoaXMuX2NvbnZlcnRUb0Nvb2tpZVNldHVwKGNvb2tpZVNldHVwKTtcblx0dGhpcy5fd2luZG93LmRvY3VtZW50LmNvb2tpZSA9IGNvb2tpZTtcblx0cmV0dXJuIGNvb2tpZTtcbn07IiwiLypcbiAqIGNhdGJlcnJ5XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE1IERlbmlzIFJlY2hrdW5vdiBhbmQgcHJvamVjdCBjb250cmlidXRvcnMuXG4gKlxuICogY2F0YmVycnkncyBsaWNlbnNlIGZvbGxvd3M6XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb25cbiAqIG9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uXG4gKiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sXG4gKiBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLFxuICogcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSxcbiAqIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4gKiBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuICogaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuICogT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKlxuICogVGhpcyBsaWNlbnNlIGFwcGxpZXMgdG8gYWxsIHBhcnRzIG9mIGNhdGJlcnJ5IHRoYXQgYXJlIG5vdCBleHRlcm5hbGx5XG4gKiBtYWludGFpbmVkIGxpYnJhcmllcy5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gRG9jdW1lbnRSZW5kZXJlcjtcblxudmFyIHV0aWwgPSByZXF1aXJlKCd1dGlsJyksXG5cdGVycm9ySGVscGVyID0gcmVxdWlyZSgnLi4vbGliL2hlbHBlcnMvZXJyb3JIZWxwZXInKSxcblx0bW9kdWxlSGVscGVyID0gcmVxdWlyZSgnLi4vbGliL2hlbHBlcnMvbW9kdWxlSGVscGVyJyksXG5cdERvY3VtZW50UmVuZGVyZXJCYXNlID0gcmVxdWlyZSgnLi4vbGliL2Jhc2UvRG9jdW1lbnRSZW5kZXJlckJhc2UnKTtcblxudXRpbC5pbmhlcml0cyhEb2N1bWVudFJlbmRlcmVyLCBEb2N1bWVudFJlbmRlcmVyQmFzZSk7XG5cbnZhciBTUEVDSUFMX0lEUyA9IHtcblx0XHQkJGhlYWQ6ICckJGhlYWQnLFxuXHRcdCQkZG9jdW1lbnQ6ICckJGRvY3VtZW50J1xuXHR9LFxuXHRFUlJPUl9DUkVBVEVfV1JPTkdfQVJHVU1FTlRTID0gJ1RhZyBuYW1lIHNob3VsZCBiZSBhIHN0cmluZyAnICtcblx0XHQnYW5kIGF0dHJpYnV0ZXMgc2hvdWxkIGJlIGFuIG9iamVjdCcsXG5cdEVSUk9SX0NSRUFURV9XUk9OR19OQU1FID0gJ0NvbXBvbmVudCBmb3IgdGFnIFwiJXNcIiBub3QgZm91bmQnLFxuXHRFUlJPUl9DUkVBVEVfV1JPTkdfSUQgPSAnVGhlIElEIGlzIG5vdCBzcGVjaWZpZWQgb3IgYWxyZWFkeSB1c2VkJyxcblx0VEFHX05BTUVTID0ge1xuXHRcdFRJVExFOiAnVElUTEUnLFxuXHRcdEhUTUw6ICdIVE1MJyxcblx0XHRIRUFEOiAnSEVBRCcsXG5cdFx0QkFTRTogJ0JBU0UnLFxuXHRcdFNUWUxFOiAnU1RZTEUnLFxuXHRcdFNDUklQVDogJ1NDUklQVCcsXG5cdFx0Tk9TQ1JJUFQ6ICdOT1NDUklQVCcsXG5cdFx0TUVUQTogJ01FVEEnLFxuXHRcdExJTks6ICdMSU5LJ1xuXHR9LFxuXHROT0RFX1RZUEVTID0ge1xuXHRcdEVMRU1FTlRfTk9ERTogMSxcblx0XHRURVhUX05PREU6IDMsXG5cdFx0UFJPQ0VTU0lOR19JTlNUUlVDVElPTl9OT0RFOiA3LFxuXHRcdENPTU1FTlRfTk9ERTogOFxuXHR9LFxuXHQvLyBodHRwOi8vd3d3LnczLm9yZy9UUi8yMDE1L1dELXVpZXZlbnRzLTIwMTUwMzE5LyNldmVudC10eXBlcy1saXN0XG5cdE5PTl9CVUJCTElOR19FVkVOVFMgPSB7XG5cdFx0YWJvcnQ6IHRydWUsXG5cdFx0Ymx1cjogdHJ1ZSxcblx0XHRlcnJvcjogdHJ1ZSxcblx0XHRmb2N1czogdHJ1ZSxcblx0XHRsb2FkOiB0cnVlLFxuXHRcdG1vdXNlZW50ZXI6IHRydWUsXG5cdFx0bW91c2VsZWF2ZTogdHJ1ZSxcblx0XHRyZXNpemU6IHRydWUsXG5cdFx0dW5sb2FkOiB0cnVlXG5cdH07XG5cbi8qKlxuICogQ3JlYXRlcyBuZXcgaW5zdGFuY2Ugb2YgdGhlIGRvY3VtZW50IHJlbmRlcmVyLlxuICogQHBhcmFtIHtTZXJ2aWNlTG9jYXRvcn0gJHNlcnZpY2VMb2NhdG9yIExvY2F0b3IgdG8gcmVzb2x2ZSBkZXBlbmRlbmNpZXMuXG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIERvY3VtZW50UmVuZGVyZXJCYXNlXG4gKi9cbmZ1bmN0aW9uIERvY3VtZW50UmVuZGVyZXIoJHNlcnZpY2VMb2NhdG9yKSB7XG5cdERvY3VtZW50UmVuZGVyZXJCYXNlLmNhbGwodGhpcywgJHNlcnZpY2VMb2NhdG9yKTtcblx0dGhpcy5fY29tcG9uZW50SW5zdGFuY2VzID0ge307XG5cdHRoaXMuX2NvbXBvbmVudEVsZW1lbnRzID0ge307XG5cdHRoaXMuX2NvbXBvbmVudEJpbmRpbmdzID0ge307XG5cdHRoaXMuX2N1cnJlbnRDaGFuZ2VkU3RvcmVzID0ge307XG5cdHRoaXMuX3dpbmRvdyA9ICRzZXJ2aWNlTG9jYXRvci5yZXNvbHZlKCd3aW5kb3cnKTtcblx0dGhpcy5fY29uZmlnID0gJHNlcnZpY2VMb2NhdG9yLnJlc29sdmUoJ2NvbmZpZycpO1xuXHR0aGlzLl9zdG9yZURpc3BhdGNoZXIgPSAkc2VydmljZUxvY2F0b3IucmVzb2x2ZSgnc3RvcmVEaXNwYXRjaGVyJyk7XG5cblx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdHRoaXMuX2V2ZW50QnVzLm9uKCdzdG9yZUNoYW5nZWQnLCBmdW5jdGlvbiAoc3RvcmVOYW1lKSB7XG5cdFx0c2VsZi5fY3VycmVudENoYW5nZWRTdG9yZXNbc3RvcmVOYW1lXSA9IHRydWU7XG5cdFx0aWYgKHNlbGYuX2lzU3RhdGVDaGFuZ2luZykge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRzZWxmLl91cGRhdGVTdG9yZUNvbXBvbmVudHMoKTtcblx0fSk7XG59XG5cbi8qKlxuICogQ3VycmVudCBhcHBsaWNhdGlvbiBjb25maWcuXG4gKiBAdHlwZSB7T2JqZWN0fVxuICogQHByaXZhdGVcbiAqL1xuRG9jdW1lbnRSZW5kZXJlci5wcm90b3R5cGUuX2NvbmZpZyA9IG51bGw7XG5cbi8qKlxuICogQ3VycmVudCBzdG9yZSBkaXNwYXRjaGVyLlxuICogQHR5cGUge1N0b3JlRGlzcGF0Y2hlcn1cbiAqIEBwcm90ZWN0ZWRcbiAqL1xuRG9jdW1lbnRSZW5kZXJlci5wcm90b3R5cGUuX3N0b3JlRGlzcGF0Y2hlciA9IG51bGw7XG5cbi8qKlxuICogQ3VycmVudCBzZXQgb2YgY29tcG9uZW50IGluc3RhbmNlcyBieSB1bmlxdWUga2V5cy5cbiAqIEB0eXBlIHtPYmplY3R9XG4gKiBAcHJpdmF0ZVxuICovXG5Eb2N1bWVudFJlbmRlcmVyLnByb3RvdHlwZS5fY29tcG9uZW50SW5zdGFuY2VzID0gbnVsbDtcblxuLyoqXG4gKiBDdXJyZW50IHNldCBvZiBjb21wb25lbnQgZWxlbWVudHMgYnkgdW5pcXVlIGtleXMuXG4gKiBAdHlwZSB7T2JqZWN0fVxuICogQHByaXZhdGVcbiAqL1xuRG9jdW1lbnRSZW5kZXJlci5wcm90b3R5cGUuX2NvbXBvbmVudEVsZW1lbnRzID0gbnVsbDtcblxuLyoqXG4gKiBDdXJyZW50IHNldCBvZiBjb21wb25lbnQgYmluZGluZ3MgYnkgdW5pcXVlIGtleXMuXG4gKiBAdHlwZSB7T2JqZWN0fVxuICogQHByaXZhdGVcbiAqL1xuRG9jdW1lbnRSZW5kZXJlci5wcm90b3R5cGUuX2NvbXBvbmVudEJpbmRpbmdzID0gbnVsbDtcblxuLyoqXG4gKiBDdXJyZW50IHJvdXRpbmcgY29udGV4dC5cbiAqIEB0eXBlIHtPYmplY3R9XG4gKiBAcHJpdmF0ZVxuICovXG5Eb2N1bWVudFJlbmRlcmVyLnByb3RvdHlwZS5fY3VycmVudFJvdXRpbmdDb250ZXh0ID0gbnVsbDtcblxuLyoqXG4gKiBDdXJyZW50IHNldCBvZiBjaGFuZ2VkIHN0b3Jlcy5cbiAqIEB0eXBlIHtPYmplY3R9XG4gKiBAcHJpdmF0ZVxuICovXG5Eb2N1bWVudFJlbmRlcmVyLnByb3RvdHlwZS5fY3VycmVudENoYW5nZWRTdG9yZXMgPSBudWxsO1xuXG4vKipcbiAqIEN1cnJlbnQgcHJvbWlzZSBmb3IgcmVuZGVyZWQgcGFnZS5cbiAqIEB0eXBlIHtQcm9taXNlfVxuICogQHByaXZhdGVcbiAqL1xuRG9jdW1lbnRSZW5kZXJlci5wcm90b3R5cGUuX3JlbmRlcmVkUHJvbWlzZSA9IG51bGw7XG5cbi8qKlxuICogQ3VycmVudCBzdGF0ZSBvZiB1cGRhdGluZyBjb21wb25lbnRzLlxuICogQHR5cGUge2Jvb2xlYW59XG4gKiBAcHJpdmF0ZVxuICovXG5Eb2N1bWVudFJlbmRlcmVyLnByb3RvdHlwZS5faXNVcGRhdGluZyA9IGZhbHNlO1xuXG4vKipcbiAqIEN1cnJlbnQgYXdhaXRpbmcgcm91dGluZy5cbiAqIEB0eXBlIHt7c3RhdGU6IE9iamVjdCwgcm91dGluZ0NvbnRleHQ6IE9iamVjdH19XG4gKiBAcHJpdmF0ZVxuICovXG5Eb2N1bWVudFJlbmRlcmVyLnByb3RvdHlwZS5fYXdhaXRpbmdSb3V0aW5nID0gbnVsbDtcblxuLyoqXG4gKiBTZXRzIHRoZSBpbml0aWFsIHN0YXRlIG9mIHRoZSBhcHBsaWNhdGlvbi5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZSBOZXcgc3RhdGUgb2YgYXBwbGljYXRpb24uXG4gKiBAcGFyYW0ge09iamVjdH0gcm91dGluZ0NvbnRleHQgUm91dGluZyBjb250ZXh0LlxuICogQHJldHVybnMge1Byb21pc2V9IFByb21pc2UgZm9yIG5vdGhpbmcuXG4gKi9cbkRvY3VtZW50UmVuZGVyZXIucHJvdG90eXBlLmluaXRXaXRoU3RhdGUgPSBmdW5jdGlvbiAoc3RhdGUsIHJvdXRpbmdDb250ZXh0KSB7XG5cdHZhciBzZWxmID0gdGhpcztcblx0cmV0dXJuIHNlbGYuX2dldFByb21pc2VGb3JSZWFkeVN0YXRlKClcblx0XHQudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRzZWxmLl9jdXJyZW50Um91dGluZ0NvbnRleHQgPSByb3V0aW5nQ29udGV4dDtcblx0XHRcdHJldHVybiBzZWxmLl9zdG9yZURpc3BhdGNoZXIuc2V0U3RhdGUoc3RhdGUsIHJvdXRpbmdDb250ZXh0KTtcblx0XHR9KVxuXHRcdC50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiBzZWxmLl9pbml0aWFsV3JhcCgpO1xuXHRcdH0pO1xufTtcblxuLyoqXG4gKiBSZW5kZXJzIG5ldyBzdGF0ZSBvZiBhcHBsaWNhdGlvbi5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZSBOZXcgc3RhdGUgb2YgYXBwbGljYXRpb24uXG4gKiBAcGFyYW0ge09iamVjdH0gcm91dGluZ0NvbnRleHQgUm91dGluZyBjb250ZXh0LlxuICogQHJldHVybnMge1Byb21pc2V9IFByb21pc2UgZm9yIG5vdGhpbmcuXG4gKi9cbkRvY3VtZW50UmVuZGVyZXIucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIChzdGF0ZSwgcm91dGluZ0NvbnRleHQpIHtcblx0dGhpcy5fYXdhaXRpbmdSb3V0aW5nID0ge1xuXHRcdHN0YXRlOiBzdGF0ZSxcblx0XHRyb3V0aW5nQ29udGV4dDogcm91dGluZ0NvbnRleHRcblx0fTtcblx0aWYgKHRoaXMuX2lzU3RhdGVDaGFuZ2luZykge1xuXHRcdHJldHVybiB0aGlzLl9yZW5kZXJlZFByb21pc2U7XG5cdH1cblxuXHQvLyB3ZSBzaG91bGQgc2V0IHRoaXMgZmxhZyB0byBhdm9pZCBcInN0b3JlQ2hhbmdlZFwiXG5cdC8vIGV2ZW50IGhhbmRsaW5nIGZvciBub3dcblx0dGhpcy5faXNTdGF0ZUNoYW5naW5nID0gdHJ1ZTtcblxuXHR2YXIgc2VsZiA9IHRoaXM7XG5cdHNlbGYuX3JlbmRlcmVkUHJvbWlzZSA9IHRoaXMuX2dldFByb21pc2VGb3JSZWFkeVN0YXRlKClcblx0XHQudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHQvLyBhbmQgdGhlbiB3ZSB1cGRhdGUgYWxsIGNvbXBvbmVudHMgb2YgdGhlc2Ugc3RvcmVzIGluIGEgYmF0Y2guXG5cdFx0XHRyZXR1cm4gc2VsZi5fdXBkYXRlU3RvcmVDb21wb25lbnRzKCk7XG5cdFx0fSlcblx0XHQuY2F0Y2goZnVuY3Rpb24gKHJlYXNvbikge1xuXHRcdFx0c2VsZi5fZXZlbnRCdXMuZW1pdCgnZXJyb3InLCByZWFzb24pO1xuXHRcdH0pXG5cdFx0LnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0c2VsZi5faXNTdGF0ZUNoYW5naW5nID0gZmFsc2U7XG5cdFx0fSk7XG5cblx0cmV0dXJuIHRoaXMuX3JlbmRlcmVkUHJvbWlzZTtcbn07XG5cbi8qKlxuICogUmVuZGVycyBjb21wb25lbnQgaW50byBIVE1MIGVsZW1lbnQuXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgSFRNTCBlbGVtZW50IG9mIGNvbXBvbmVudFxuICogQHBhcmFtIHtPYmplY3Q/fSByZW5kZXJpbmdDb250ZXh0IFJlbmRlcmluZyBjb250ZXh0IGZvciBncm91cCByZW5kZXJpbmcuXG4gKi9cbkRvY3VtZW50UmVuZGVyZXIucHJvdG90eXBlLnJlbmRlckNvbXBvbmVudCA9XG5cdGZ1bmN0aW9uIChlbGVtZW50LCByZW5kZXJpbmdDb250ZXh0KSB7XG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xuXHRcdHJldHVybiB0aGlzLl9nZXRQcm9taXNlRm9yUmVhZHlTdGF0ZSgpXG5cdFx0XHQudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHJlbmRlcmluZ0NvbnRleHQgPSByZW5kZXJpbmdDb250ZXh0IHx8XG5cdFx0XHRcdFx0c2VsZi5fY3JlYXRlUmVuZGVyaW5nQ29udGV4dChbXSk7XG5cblx0XHRcdFx0dmFyIGNvbXBvbmVudE5hbWUgPSBtb2R1bGVIZWxwZXIuZ2V0T3JpZ2luYWxDb21wb25lbnROYW1lKFxuXHRcdFx0XHRcdFx0ZWxlbWVudC50YWdOYW1lXG5cdFx0XHRcdFx0KSxcblx0XHRcdFx0XHRoYWRDaGlsZHJlbiA9IGVsZW1lbnQuaGFzQ2hpbGROb2RlcygpLFxuXHRcdFx0XHRcdGNvbXBvbmVudCA9IHJlbmRlcmluZ0NvbnRleHQuY29tcG9uZW50c1tjb21wb25lbnROYW1lXSxcblx0XHRcdFx0XHRpZCA9IHNlbGYuX2dldElkKGVsZW1lbnQpLFxuXHRcdFx0XHRcdGluc3RhbmNlID0gc2VsZi5fY29tcG9uZW50SW5zdGFuY2VzW2lkXTtcblxuXHRcdFx0XHRpZiAoIWNvbXBvbmVudCB8fCAhaWQgfHxcblx0XHRcdFx0XHRyZW5kZXJpbmdDb250ZXh0LnJlbmRlcmVkSWRzLmhhc093blByb3BlcnR5KGlkKSkge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJlbmRlcmluZ0NvbnRleHQucmVuZGVyZWRJZHNbaWRdID0gdHJ1ZTtcblxuXHRcdFx0XHRpZiAoIWluc3RhbmNlKSB7XG5cdFx0XHRcdFx0Y29tcG9uZW50LmNvbnN0cnVjdG9yLnByb3RvdHlwZS4kY29udGV4dCA9XG5cdFx0XHRcdFx0XHRzZWxmLl9nZXRDb21wb25lbnRDb250ZXh0KGNvbXBvbmVudCwgZWxlbWVudCk7XG5cdFx0XHRcdFx0aW5zdGFuY2UgPSBzZWxmLl9zZXJ2aWNlTG9jYXRvci5yZXNvbHZlSW5zdGFuY2UoXG5cdFx0XHRcdFx0XHRjb21wb25lbnQuY29uc3RydWN0b3IsIHJlbmRlcmluZ0NvbnRleHQuY29uZmlnXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRpbnN0YW5jZS4kY29udGV4dCA9IGNvbXBvbmVudC5jb25zdHJ1Y3Rvci5wcm90b3R5cGUuJGNvbnRleHQ7XG5cdFx0XHRcdFx0c2VsZi5fY29tcG9uZW50SW5zdGFuY2VzW2lkXSA9IGluc3RhbmNlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIGV2ZW50QXJncyA9IHtcblx0XHRcdFx0XHRuYW1lOiBjb21wb25lbnROYW1lLFxuXHRcdFx0XHRcdGNvbnRleHQ6IGluc3RhbmNlLiRjb250ZXh0XG5cdFx0XHRcdH07XG5cblx0XHRcdFx0c2VsZi5fY29tcG9uZW50RWxlbWVudHNbaWRdID0gZWxlbWVudDtcblxuXHRcdFx0XHR2YXIgc3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcblx0XHRcdFx0c2VsZi5fZXZlbnRCdXMuZW1pdCgnY29tcG9uZW50UmVuZGVyJywgZXZlbnRBcmdzKTtcblxuXHRcdFx0XHRyZXR1cm4gc2VsZi5fdW5iaW5kQWxsKGVsZW1lbnQsIHJlbmRlcmluZ0NvbnRleHQpXG5cdFx0XHRcdFx0LmNhdGNoKGZ1bmN0aW9uIChyZWFzb24pIHtcblx0XHRcdFx0XHRcdHNlbGYuX2V2ZW50QnVzLmVtaXQoJ2Vycm9yJywgcmVhc29uKTtcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdC50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdGlmIChpbnN0YW5jZS4kY29udGV4dC5lbGVtZW50ICE9PSBlbGVtZW50KSB7XG5cdFx0XHRcdFx0XHRcdGluc3RhbmNlLiRjb250ZXh0ID0gc2VsZi5fZ2V0Q29tcG9uZW50Q29udGV4dChcblx0XHRcdFx0XHRcdFx0XHRjb21wb25lbnQsIGVsZW1lbnRcblx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHZhciByZW5kZXJNZXRob2QgPSBtb2R1bGVIZWxwZXIuZ2V0TWV0aG9kVG9JbnZva2UoXG5cdFx0XHRcdFx0XHRcdGluc3RhbmNlLCAncmVuZGVyJ1xuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdHJldHVybiBtb2R1bGVIZWxwZXIuZ2V0U2FmZVByb21pc2UocmVuZGVyTWV0aG9kKTtcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdC50aGVuKGZ1bmN0aW9uIChkYXRhQ29udGV4dCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGNvbXBvbmVudC50ZW1wbGF0ZS5yZW5kZXIoZGF0YUNvbnRleHQpO1xuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0LmNhdGNoKGZ1bmN0aW9uIChyZWFzb24pIHtcblx0XHRcdFx0XHRcdHJldHVybiBzZWxmLl9oYW5kbGVSZW5kZXJFcnJvcihcblx0XHRcdFx0XHRcdFx0ZWxlbWVudCwgY29tcG9uZW50LCByZWFzb25cblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0XHQudGhlbihmdW5jdGlvbiAoaHRtbCkge1xuXHRcdFx0XHRcdFx0aWYgKGVsZW1lbnQudGFnTmFtZSA9PT0gVEFHX05BTUVTLkhFQUQpIHtcblx0XHRcdFx0XHRcdFx0c2VsZi5fbWVyZ2VIZWFkKGVsZW1lbnQsIGh0bWwpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0ZWxlbWVudC5pbm5lckhUTUwgPSBodG1sO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0dmFyIHByb21pc2VzID0gc2VsZi5fZmluZENvbXBvbmVudHMoXG5cdFx0XHRcdFx0XHRcdGVsZW1lbnQsIHJlbmRlcmluZ0NvbnRleHRcblx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHRcdFx0Lm1hcChmdW5jdGlvbiAoaW5uZXJDb21wb25lbnQpIHtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gc2VsZi5yZW5kZXJDb21wb25lbnQoXG5cdFx0XHRcdFx0XHRcdFx0XHRpbm5lckNvbXBvbmVudCwgcmVuZGVyaW5nQ29udGV4dFxuXHRcdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0cmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdC50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdGV2ZW50QXJncy50aW1lID0gRGF0ZS5ub3coKSAtIHN0YXJ0VGltZTtcblx0XHRcdFx0XHRcdHNlbGYuX2V2ZW50QnVzLmVtaXQoJ2NvbXBvbmVudFJlbmRlcmVkJywgZXZlbnRBcmdzKTtcblx0XHRcdFx0XHRcdHJldHVybiBzZWxmLl9iaW5kQ29tcG9uZW50KGVsZW1lbnQpO1xuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0LnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0aWYgKCFoYWRDaGlsZHJlbikge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRzZWxmLl9jb2xsZWN0UmVuZGVyaW5nR2FyYmFnZShyZW5kZXJpbmdDb250ZXh0KTtcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdC5jYXRjaChmdW5jdGlvbiAocmVhc29uKSB7XG5cdFx0XHRcdFx0XHRzZWxmLl9ldmVudEJ1cy5lbWl0KCdlcnJvcicsIHJlYXNvbik7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0fTtcblxuLyoqXG4gKiBHZXRzIGNvbXBvbmVudCBpbnN0YW5jZSBieSBJRC5cbiAqIEBwYXJhbSB7U3RyaW5nfSBpZCBDb21wb25lbnQgSUQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBDb21wb25lbnQgaW5zdGFuY2UuXG4gKi9cbkRvY3VtZW50UmVuZGVyZXIucHJvdG90eXBlLmdldENvbXBvbmVudEJ5SWQgPSBmdW5jdGlvbiAoaWQpIHtcblx0cmV0dXJuIHRoaXMuX2NvbXBvbmVudEluc3RhbmNlc1tpZF0gfHwgbnVsbDtcbn07XG5cbi8qKlxuICogQ2hlY2tzIHRoYXQgZXZlcnkgaW5zdGFuY2Ugb2YgY29tcG9uZW50IGhhcyBlbGVtZW50IG9uIHRoZSBwYWdlIGFuZFxuICogcmVtb3ZlcyBhbGwgcmVmZXJlbmNlcyB0byBjb21wb25lbnRzIHJlbW92ZWQgZnJvbSBET00uXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gUHJvbWlzZSBmb3Igbm90aGluZy5cbiAqL1xuRG9jdW1lbnRSZW5kZXJlci5wcm90b3R5cGUuY29sbGVjdEdhcmJhZ2UgPSBmdW5jdGlvbiAoKSB7XG5cdHZhciBzZWxmID0gdGhpcztcblx0cmV0dXJuIHRoaXMuX2dldFByb21pc2VGb3JSZWFkeVN0YXRlKCkuXG5cdFx0dGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgcHJvbWlzZXMgPSBbXTtcblx0XHRcdE9iamVjdC5rZXlzKHNlbGYuX2NvbXBvbmVudEVsZW1lbnRzKVxuXHRcdFx0XHQuZm9yRWFjaChmdW5jdGlvbiAoaWQpIHtcblx0XHRcdFx0XHRpZiAoU1BFQ0lBTF9JRFMuaGFzT3duUHJvcGVydHkoaWQpKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHZhciBlbGVtZW50ID0gc2VsZi5fd2luZG93LmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcblx0XHRcdFx0XHRpZiAoZWxlbWVudCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHZhciBwcm9taXNlID0gc2VsZi5fdW5iaW5kQ29tcG9uZW50KHNlbGYuX2NvbXBvbmVudEVsZW1lbnRzW2lkXSlcblx0XHRcdFx0XHRcdC50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdFx0ZGVsZXRlIHNlbGYuX2NvbXBvbmVudEVsZW1lbnRzW2lkXTtcblx0XHRcdFx0XHRcdFx0ZGVsZXRlIHNlbGYuX2NvbXBvbmVudEluc3RhbmNlc1tpZF07XG5cdFx0XHRcdFx0XHRcdGRlbGV0ZSBzZWxmLl9jb21wb25lbnRCaW5kaW5nc1tpZF07XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRwcm9taXNlcy5wdXNoKHByb21pc2UpO1xuXHRcdFx0XHR9KTtcblx0XHRcdHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG5cdFx0fSk7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYW5kIHJlbmRlcnMgY29tcG9uZW50IGVsZW1lbnQuXG4gKiBAcGFyYW0ge1N0cmluZ30gdGFnTmFtZSBOYW1lIG9mIEhUTUwgdGFnLlxuICogQHBhcmFtIHtPYmplY3R9IGF0dHJpYnV0ZXMgRWxlbWVudCBhdHRyaWJ1dGVzLlxuICogQHJldHVybnMge1Byb21pc2U8RWxlbWVudD59IFByb21pc2UgZm9yIEhUTUwgZWxlbWVudCB3aXRoIHJlbmRlcmVkIGNvbXBvbmVudC5cbiAqL1xuRG9jdW1lbnRSZW5kZXJlci5wcm90b3R5cGUuY3JlYXRlQ29tcG9uZW50ID0gZnVuY3Rpb24gKHRhZ05hbWUsIGF0dHJpYnV0ZXMpIHtcblx0aWYgKHR5cGVvZih0YWdOYW1lKSAhPT0gJ3N0cmluZycgfHwgIWF0dHJpYnV0ZXMgfHxcblx0XHR0eXBlb2YoYXR0cmlidXRlcykgIT09ICdvYmplY3QnKSB7XG5cdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KFxuXHRcdFx0bmV3IEVycm9yKEVSUk9SX0NSRUFURV9XUk9OR19BUkdVTUVOVFMpXG5cdFx0KTtcblx0fVxuXG5cdHZhciBzZWxmID0gdGhpcztcblx0cmV0dXJuIHRoaXMuX2dldFByb21pc2VGb3JSZWFkeVN0YXRlKClcblx0XHQudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgY29tcG9uZW50cyA9IHNlbGYuX2NvbXBvbmVudExvYWRlci5nZXRDb21wb25lbnRzQnlOYW1lcygpLFxuXHRcdFx0XHRjb21wb25lbnROYW1lID0gbW9kdWxlSGVscGVyLmdldE9yaWdpbmFsQ29tcG9uZW50TmFtZSh0YWdOYW1lKTtcblxuXHRcdFx0aWYgKG1vZHVsZUhlbHBlci5pc0hlYWRDb21wb25lbnQoY29tcG9uZW50TmFtZSkgfHxcblx0XHRcdFx0bW9kdWxlSGVscGVyLmlzRG9jdW1lbnRDb21wb25lbnQoY29tcG9uZW50TmFtZSkgfHxcblx0XHRcdFx0IWNvbXBvbmVudHMuaGFzT3duUHJvcGVydHkoY29tcG9uZW50TmFtZSkpIHtcblx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KFxuXHRcdFx0XHRcdG5ldyBFcnJvcih1dGlsLmZvcm1hdChFUlJPUl9DUkVBVEVfV1JPTkdfTkFNRSwgdGFnTmFtZSkpXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cblx0XHRcdHZhciBzYWZlVGFnTmFtZSA9IG1vZHVsZUhlbHBlci5nZXRUYWdOYW1lRm9yQ29tcG9uZW50TmFtZShjb21wb25lbnROYW1lKTtcblxuXHRcdFx0dmFyIGlkID0gYXR0cmlidXRlc1ttb2R1bGVIZWxwZXIuQVRUUklCVVRFX0lEXTtcblx0XHRcdGlmICghaWQgfHwgc2VsZi5fY29tcG9uZW50SW5zdGFuY2VzLmhhc093blByb3BlcnR5KGlkKSkge1xuXHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKEVSUk9SX0NSRUFURV9XUk9OR19JRCkpO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgZWxlbWVudCA9IHNlbGYuX3dpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KHNhZmVUYWdOYW1lKTtcblx0XHRcdE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpXG5cdFx0XHRcdC5mb3JFYWNoKGZ1bmN0aW9uIChhdHRyaWJ1dGVOYW1lKSB7XG5cdFx0XHRcdFx0ZWxlbWVudC5zZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSwgYXR0cmlidXRlc1thdHRyaWJ1dGVOYW1lXSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRyZXR1cm4gc2VsZi5yZW5kZXJDb21wb25lbnQoZWxlbWVudClcblx0XHRcdFx0LnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHJldHVybiBlbGVtZW50O1xuXHRcdFx0XHR9KTtcblx0XHR9KTtcbn07XG5cbi8qKlxuICogQ2xlYXJzIGFsbCByZWZlcmVuY2VzIHRvIHJlbW92ZWQgY29tcG9uZW50cyBkdXJpbmcgcmVuZGVyaW5nIHByb2Nlc3MuXG4gKiBAcGFyYW0ge09iamVjdH0gcmVuZGVyaW5nQ29udGV4dCBDb250ZXh0IG9mIHJlbmRlcmluZy5cbiAqIEBwcml2YXRlXG4gKi9cbkRvY3VtZW50UmVuZGVyZXIucHJvdG90eXBlLl9jb2xsZWN0UmVuZGVyaW5nR2FyYmFnZSA9XG5cdGZ1bmN0aW9uIChyZW5kZXJpbmdDb250ZXh0KSB7XG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xuXHRcdE9iamVjdC5rZXlzKHJlbmRlcmluZ0NvbnRleHQudW5ib3VuZElkcylcblx0XHRcdC5mb3JFYWNoKGZ1bmN0aW9uIChpZCkge1xuXHRcdFx0XHQvLyB0aGlzIGNvbXBvbmVudCBoYXMgYmVlbiByZW5kZXJlZCBhZ2FpbiBhbmQgd2UgZG8gbm90IG5lZWQgdG9cblx0XHRcdFx0Ly8gcmVtb3ZlIGl0LlxuXHRcdFx0XHRpZiAocmVuZGVyaW5nQ29udGV4dC5yZW5kZXJlZElkcy5oYXNPd25Qcm9wZXJ0eShpZCkpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRkZWxldGUgc2VsZi5fY29tcG9uZW50RWxlbWVudHNbaWRdO1xuXHRcdFx0XHRkZWxldGUgc2VsZi5fY29tcG9uZW50SW5zdGFuY2VzW2lkXTtcblx0XHRcdFx0ZGVsZXRlIHNlbGYuX2NvbXBvbmVudEJpbmRpbmdzW2lkXTtcblx0XHRcdH0pO1xuXHR9O1xuXG4vKipcbiAqIFVuYmluZHMgYWxsIGV2ZW50IGhhbmRsZXJzIGZyb20gc3BlY2lmaWVkIGNvbXBvbmVudCBhbmQgYWxsIGl0J3MgZGVzY2VuZGFudHMuXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgQ29tcG9uZW50IEhUTUwgZWxlbWVudC5cbiAqIEBwYXJhbSB7T2JqZWN0fSByZW5kZXJpbmdDb250ZXh0IENvbnRleHQgb2YgcmVuZGVyaW5nLlxuICogQHJldHVybnMge1Byb21pc2V9IFByb21pc2UgZm9yIG5vdGhpbmcuXG4gKiBAcHJpdmF0ZVxuICovXG5Eb2N1bWVudFJlbmRlcmVyLnByb3RvdHlwZS5fdW5iaW5kQWxsID0gZnVuY3Rpb24gKGVsZW1lbnQsIHJlbmRlcmluZ0NvbnRleHQpIHtcblx0dmFyIHNlbGYgPSB0aGlzLFxuXHRcdGlkID0gdGhpcy5fZ2V0SWQoZWxlbWVudCksXG5cdFx0cHJvbWlzZXMgPSBbXTtcblxuXHRpZiAoZWxlbWVudC5oYXNDaGlsZE5vZGVzKCkpIHtcblx0XHRzZWxmLl9maW5kQ29tcG9uZW50cyhlbGVtZW50LCByZW5kZXJpbmdDb250ZXh0KVxuXHRcdFx0LmZvckVhY2goZnVuY3Rpb24gKGlubmVyRWxlbWVudCkge1xuXHRcdFx0XHR2YXIgaWQgPSBzZWxmLl9nZXRJZChpbm5lckVsZW1lbnQpO1xuXHRcdFx0XHRpZiAocmVuZGVyaW5nQ29udGV4dC51bmJvdW5kSWRzLmhhc093blByb3BlcnR5KGlkKSkge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZW5kZXJpbmdDb250ZXh0LnVuYm91bmRJZHNbaWRdID0gdHJ1ZTtcblx0XHRcdFx0cHJvbWlzZXMucHVzaChzZWxmLl91bmJpbmRDb21wb25lbnQoaW5uZXJFbGVtZW50KSk7XG5cdFx0XHR9KTtcblx0fVxuXG5cdGlmICghcmVuZGVyaW5nQ29udGV4dC51bmJvdW5kSWRzLmhhc093blByb3BlcnR5KGlkKSkge1xuXHRcdHByb21pc2VzLnB1c2godGhpcy5fdW5iaW5kQ29tcG9uZW50KGVsZW1lbnQpKTtcblx0XHRyZW5kZXJpbmdDb250ZXh0LnVuYm91bmRJZHNbaWRdID0gdHJ1ZTtcblx0fVxuXG5cdHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG59O1xuXG4vKipcbiAqIFVuYmluZHMgYWxsIGV2ZW50IGhhbmRsZXJzIGZyb20gc3BlY2lmaWVkIGNvbXBvbmVudC5cbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCBDb21wb25lbnQgSFRNTCBlbGVtZW50LlxuICogQHJldHVybnMge1Byb21pc2V9IFByb21pc2UgZm9yIG5vdGhpbmcuXG4gKiBAcHJpdmF0ZVxuICovXG5Eb2N1bWVudFJlbmRlcmVyLnByb3RvdHlwZS5fdW5iaW5kQ29tcG9uZW50ID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcblx0dmFyIGlkID0gdGhpcy5fZ2V0SWQoZWxlbWVudCksXG5cdFx0c2VsZiA9IHRoaXMsXG5cdFx0aW5zdGFuY2UgPSB0aGlzLl9jb21wb25lbnRJbnN0YW5jZXNbaWRdO1xuXHRpZiAoIWluc3RhbmNlKSB7XG5cdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuXHR9XG5cdGlmICh0aGlzLl9jb21wb25lbnRCaW5kaW5ncy5oYXNPd25Qcm9wZXJ0eShpZCkpIHtcblx0XHRPYmplY3Qua2V5cyh0aGlzLl9jb21wb25lbnRCaW5kaW5nc1tpZF0pXG5cdFx0XHQuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnROYW1lKSB7XG5cdFx0XHRcdGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcblx0XHRcdFx0XHRldmVudE5hbWUsXG5cdFx0XHRcdFx0c2VsZi5fY29tcG9uZW50QmluZGluZ3NbaWRdW2V2ZW50TmFtZV0uaGFuZGxlcixcblx0XHRcdFx0XHROT05fQlVCQkxJTkdfRVZFTlRTLmhhc093blByb3BlcnR5KGV2ZW50TmFtZSlcblx0XHRcdFx0KTtcblx0XHRcdH0pO1xuXHRcdGRlbGV0ZSB0aGlzLl9jb21wb25lbnRCaW5kaW5nc1tpZF07XG5cdH1cblx0dmFyIHVuYmluZE1ldGhvZCA9IG1vZHVsZUhlbHBlci5nZXRNZXRob2RUb0ludm9rZShpbnN0YW5jZSwgJ3VuYmluZCcpO1xuXHRyZXR1cm4gbW9kdWxlSGVscGVyLmdldFNhZmVQcm9taXNlKHVuYmluZE1ldGhvZClcblx0XHQudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRzZWxmLl9ldmVudEJ1cy5lbWl0KCdjb21wb25lbnRVbmJvdW5kJywge1xuXHRcdFx0XHRlbGVtZW50OiBlbGVtZW50LFxuXHRcdFx0XHRpZDogIVNQRUNJQUxfSURTLmhhc093blByb3BlcnR5KGlkKSA/IGlkIDogbnVsbFxuXHRcdFx0fSk7XG5cdFx0fSlcblx0XHQuY2F0Y2goZnVuY3Rpb24gKHJlYXNvbikge1xuXHRcdFx0c2VsZi5fZXZlbnRCdXMuZW1pdCgnZXJyb3InLCByZWFzb24pO1xuXHRcdH0pO1xufTtcblxuLyoqXG4gKiBCaW5kcyBhbGwgcmVxdWlyZWQgZXZlbnQgaGFuZGxlcnMgdG8gY29tcG9uZW50LlxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50IENvbXBvbmVudCBIVE1MIGVsZW1lbnQuXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gUHJvbWlzZSBmb3Igbm90aGluZy5cbiAqIEBwcml2YXRlXG4gKi9cbkRvY3VtZW50UmVuZGVyZXIucHJvdG90eXBlLl9iaW5kQ29tcG9uZW50ID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcblx0dmFyIGlkID0gdGhpcy5fZ2V0SWQoZWxlbWVudCksXG5cdFx0c2VsZiA9IHRoaXMsXG5cdFx0aW5zdGFuY2UgPSB0aGlzLl9jb21wb25lbnRJbnN0YW5jZXNbaWRdO1xuXHRpZiAoIWluc3RhbmNlKSB7XG5cdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuXHR9XG5cblx0dmFyIGJpbmRNZXRob2QgPSBtb2R1bGVIZWxwZXIuZ2V0TWV0aG9kVG9JbnZva2UoaW5zdGFuY2UsICdiaW5kJyk7XG5cdHJldHVybiBtb2R1bGVIZWxwZXIuZ2V0U2FmZVByb21pc2UoYmluZE1ldGhvZClcblx0XHQudGhlbihmdW5jdGlvbiAoYmluZGluZ3MpIHtcblx0XHRcdGlmICghYmluZGluZ3MgfHwgdHlwZW9mKGJpbmRpbmdzKSAhPT0gJ29iamVjdCcpIHtcblx0XHRcdFx0c2VsZi5fZXZlbnRCdXMuZW1pdCgnY29tcG9uZW50Qm91bmQnLCB7XG5cdFx0XHRcdFx0ZWxlbWVudDogZWxlbWVudCxcblx0XHRcdFx0XHRpZDogIVNQRUNJQUxfSURTLmhhc093blByb3BlcnR5KGlkKSA/IGlkIDogbnVsbFxuXHRcdFx0XHR9KTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0c2VsZi5fY29tcG9uZW50QmluZGluZ3NbaWRdID0ge307XG5cdFx0XHRPYmplY3Qua2V5cyhiaW5kaW5ncylcblx0XHRcdFx0LmZvckVhY2goZnVuY3Rpb24gKGV2ZW50TmFtZSkge1xuXHRcdFx0XHRcdGV2ZW50TmFtZSA9IGV2ZW50TmFtZS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdGlmIChzZWxmLl9jb21wb25lbnRCaW5kaW5nc1tpZF0uaGFzT3duUHJvcGVydHkoZXZlbnROYW1lKSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR2YXIgc2VsZWN0b3JIYW5kbGVycyA9IHt9O1xuXHRcdFx0XHRcdE9iamVjdC5rZXlzKGJpbmRpbmdzW2V2ZW50TmFtZV0pXG5cdFx0XHRcdFx0XHQuZm9yRWFjaChmdW5jdGlvbiAoc2VsZWN0b3IpIHtcblx0XHRcdFx0XHRcdFx0dmFyIGhhbmRsZXIgPSBiaW5kaW5nc1tldmVudE5hbWVdW3NlbGVjdG9yXTtcblx0XHRcdFx0XHRcdFx0aWYgKHR5cGVvZihoYW5kbGVyKSAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRzZWxlY3RvckhhbmRsZXJzW3NlbGVjdG9yXSA9IGhhbmRsZXIuYmluZChpbnN0YW5jZSk7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRzZWxmLl9jb21wb25lbnRCaW5kaW5nc1tpZF1bZXZlbnROYW1lXSA9IHtcblx0XHRcdFx0XHRcdGhhbmRsZXI6IHNlbGYuX2NyZWF0ZUJpbmRpbmdIYW5kbGVyKFxuXHRcdFx0XHRcdFx0XHRlbGVtZW50LCBzZWxlY3RvckhhbmRsZXJzXG5cdFx0XHRcdFx0XHQpLFxuXHRcdFx0XHRcdFx0c2VsZWN0b3JIYW5kbGVyczogc2VsZWN0b3JIYW5kbGVyc1xuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0ZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFxuXHRcdFx0XHRcdFx0ZXZlbnROYW1lLFxuXHRcdFx0XHRcdFx0c2VsZi5fY29tcG9uZW50QmluZGluZ3NbaWRdW2V2ZW50TmFtZV0uaGFuZGxlcixcblx0XHRcdFx0XHRcdE5PTl9CVUJCTElOR19FVkVOVFMuaGFzT3duUHJvcGVydHkoZXZlbnROYW1lKVxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0c2VsZi5fZXZlbnRCdXMuZW1pdCgnY29tcG9uZW50Qm91bmQnLCB7XG5cdFx0XHRcdGVsZW1lbnQ6IGVsZW1lbnQsXG5cdFx0XHRcdGlkOiBpZFxuXHRcdFx0fSk7XG5cdFx0fSk7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgdW5pdmVyc2FsIGV2ZW50IGhhbmRsZXIgZm9yIGRlbGVnYXRlZCBldmVudHMuXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGNvbXBvbmVudFJvb3QgUm9vdCBlbGVtZW50IG9mIGNvbXBvbmVudC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzZWxlY3RvckhhbmRsZXJzIE1hcCBvZiBldmVudCBoYW5kbGVycyBieSBDU1Mgc2VsZWN0b3JzLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBVbml2ZXJzYWwgZXZlbnQgaGFuZGxlciBmb3IgZGVsZWdhdGVkIGV2ZW50cy5cbiAqIEBwcml2YXRlXG4gKi9cbkRvY3VtZW50UmVuZGVyZXIucHJvdG90eXBlLl9jcmVhdGVCaW5kaW5nSGFuZGxlciA9XG5cdGZ1bmN0aW9uIChjb21wb25lbnRSb290LCBzZWxlY3RvckhhbmRsZXJzKSB7XG5cdFx0dmFyIHNlbGVjdG9ycyA9IE9iamVjdC5rZXlzKHNlbGVjdG9ySGFuZGxlcnMpO1xuXHRcdHJldHVybiBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRcdHZhciBkaXNwYXRjaGVkRXZlbnQgPSBjcmVhdGVDdXN0b21FdmVudChldmVudCwgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHJldHVybiBlbGVtZW50O1xuXHRcdFx0XHR9KSxcblx0XHRcdFx0ZWxlbWVudCA9IGV2ZW50LnRhcmdldCxcblx0XHRcdFx0dGFyZ2V0TWF0Y2hlcyA9IGdldE1hdGNoZXNNZXRob2QoZWxlbWVudCksXG5cdFx0XHRcdGlzSGFuZGxlZCA9IHNlbGVjdG9ycy5zb21lKGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuXHRcdFx0XHRcdGlmICh0YXJnZXRNYXRjaGVzKHNlbGVjdG9yKSkge1xuXHRcdFx0XHRcdFx0c2VsZWN0b3JIYW5kbGVyc1tzZWxlY3Rvcl0oZGlzcGF0Y2hlZEV2ZW50KTtcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH0pO1xuXHRcdFx0aWYgKGlzSGFuZGxlZCB8fCAhZXZlbnQuYnViYmxlcykge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHdoaWxlKGVsZW1lbnQucGFyZW50RWxlbWVudCAmJiBlbGVtZW50ICE9PSBjb21wb25lbnRSb290KSB7XG5cdFx0XHRcdGVsZW1lbnQgPSBlbGVtZW50LnBhcmVudEVsZW1lbnQ7XG5cdFx0XHRcdHRhcmdldE1hdGNoZXMgPSBnZXRNYXRjaGVzTWV0aG9kKGVsZW1lbnQpO1xuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHNlbGVjdG9ycy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdGlmICghdGFyZ2V0TWF0Y2hlcyhzZWxlY3RvcnNbaV0pKSB7XG5cdFx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aXNIYW5kbGVkID0gdHJ1ZTtcblx0XHRcdFx0XHRzZWxlY3RvckhhbmRsZXJzW3NlbGVjdG9yc1tpXV0oZGlzcGF0Y2hlZEV2ZW50KTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChpc0hhbmRsZWQpIHtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cdH07XG5cbi8qKlxuICogRmluZHMgYWxsIGRlc2NlbmRhbnQgY29tcG9uZW50cyBvZiBzcGVjaWZpZWQgY29tcG9uZW50IGVsZW1lbnQuXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgUm9vdCBjb21wb25lbnQgSFRNTCBlbGVtZW50IHRvIGJlZ2luIHNlYXJjaCB3aXRoLlxuICogQHBhcmFtIHtPYmplY3R9IHJlbmRlcmluZ0NvbnRleHQgQ29udGV4dCBvZiByZW5kZXJpbmcuXG4gKiBAcHJpdmF0ZVxuICovXG5Eb2N1bWVudFJlbmRlcmVyLnByb3RvdHlwZS5fZmluZENvbXBvbmVudHMgPVxuXHRmdW5jdGlvbiAoZWxlbWVudCwgcmVuZGVyaW5nQ29udGV4dCkge1xuXHRcdHZhciBjb21wb25lbnRzID0gW107XG5cdFx0cmVuZGVyaW5nQ29udGV4dC5jb21wb25lbnRUYWdzXG5cdFx0XHQuZm9yRWFjaChmdW5jdGlvbiAodGFnKSB7XG5cdFx0XHRcdHZhciBub2RlcyA9IGVsZW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUodGFnKTtcblx0XHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0Y29tcG9uZW50cy5wdXNoKG5vZGVzW2ldKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0cmV0dXJuIGNvbXBvbmVudHM7XG5cdH07XG5cbi8qKlxuICogSGFuZGxlcyBlcnJvciB3aGlsZSByZW5kZXJpbmcuXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgQ29tcG9uZW50IEhUTUwgZWxlbWVudC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb21wb25lbnQgQ29tcG9uZW50IGluc3RhbmNlLlxuICogQHBhcmFtIHtFcnJvcn0gZXJyb3IgRXJyb3IgdG8gaGFuZGxlLlxuICogQHJldHVybnMge1Byb21pc2U8U3RyaW5nPn0gUHJvbWlzZSBmb3IgSFRNTCBzdHJpbmcuXG4gKiBAcHJpdmF0ZVxuICovXG5Eb2N1bWVudFJlbmRlcmVyLnByb3RvdHlwZS5faGFuZGxlUmVuZGVyRXJyb3IgPVxuXHRmdW5jdGlvbiAoZWxlbWVudCwgY29tcG9uZW50LCBlcnJvcikge1xuXHRcdHRoaXMuX2V2ZW50QnVzLmVtaXQoJ2Vycm9yJywgZXJyb3IpO1xuXG5cdFx0Ly8gZG8gbm90IGNvcnJ1cHQgZXhpc3RlZCBIRUFEIHdoZW4gZXJyb3Igb2NjdXJzXG5cdFx0aWYgKGVsZW1lbnQudGFnTmFtZSA9PT0gVEFHX05BTUVTLkhFQUQpIHtcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoJycpO1xuXHRcdH1cblxuXHRcdGlmICghdGhpcy5fY29uZmlnLmlzUmVsZWFzZSAmJiBlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGVycm9ySGVscGVyLnByZXR0eVByaW50KFxuXHRcdFx0XHRlcnJvciwgdGhpcy5fd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnRcblx0XHRcdCkpO1xuXHRcdH0gZWxzZSBpZiAoY29tcG9uZW50LmVycm9yVGVtcGxhdGUpIHtcblx0XHRcdHJldHVybiBjb21wb25lbnQuZXJyb3JUZW1wbGF0ZS5yZW5kZXIoZXJyb3IpO1xuXHRcdH1cblxuXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoJycpO1xuXHR9O1xuXG4vKipcbiAqIFVwZGF0ZXMgYWxsIGNvbXBvbmVudHMgdGhhdCBkZXBlbmQgb24gY3VycmVudCBzZXQgb2YgY2hhbmdlZCBzdG9yZXMuXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gUHJvbWlzZSBmb3Igbm90aGluZy5cbiAqIEBwcml2YXRlXG4gKi9cbkRvY3VtZW50UmVuZGVyZXIucHJvdG90eXBlLl91cGRhdGVTdG9yZUNvbXBvbmVudHMgPSBmdW5jdGlvbiAoKSB7XG5cdGlmICh0aGlzLl9pc1VwZGF0aW5nKSB7XG5cdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuXHR9XG5cblx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdC8vIGlmIGRvY3VtZW50IGNvbXBvbmVudCBpcyBjaGFuZ2VkIHdlIHNob3VsZCByZWxvYWQgdGhlIHBhZ2Vcblx0dmFyIGRvY3VtZW50U3RvcmUgPSB0aGlzLl93aW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmdldEF0dHJpYnV0ZShcblx0XHRtb2R1bGVIZWxwZXIuQVRUUklCVVRFX1NUT1JFXG5cdCk7XG5cdGlmICh0aGlzLl9jdXJyZW50Q2hhbmdlZFN0b3Jlcy5oYXNPd25Qcm9wZXJ0eShkb2N1bWVudFN0b3JlKSkge1xuXHRcdHZhciBuZXdMb2NhdGlvbiA9IHRoaXMuX2N1cnJlbnRSb3V0aW5nQ29udGV4dC5sb2NhdGlvbi50b1N0cmluZygpO1xuXHRcdGlmIChuZXdMb2NhdGlvbiA9PT0gdGhpcy5fd2luZG93LmxvY2F0aW9uLnRvU3RyaW5nKCkpIHtcblx0XHRcdHRoaXMuX3dpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcblx0XHR9XG5cdFx0dGhpcy5fd2luZG93LmxvY2F0aW9uLmFzc2lnbihuZXdMb2NhdGlvbik7XG5cdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuXHR9XG5cblx0Ly8gaWYgd2UgaGF2ZSBhd2FpdGluZyByb3V0aW5nIHdlIHNob3VsZCBhcHBseSBzdGF0ZSB0byB0aGUgc3RvcmVzXG5cdGlmICh0aGlzLl9hd2FpdGluZ1JvdXRpbmcpIHtcblx0XHR2YXIgY29tcG9uZW50cyA9IHRoaXMuX2NvbXBvbmVudExvYWRlci5nZXRDb21wb25lbnRzQnlOYW1lcygpLFxuXHRcdFx0Y2hhbmdlZEJ5U3RhdGUgPSB0aGlzLl9zdG9yZURpc3BhdGNoZXIuc2V0U3RhdGUoXG5cdFx0XHRcdHRoaXMuX2F3YWl0aW5nUm91dGluZy5zdGF0ZSxcblx0XHRcdFx0dGhpcy5fYXdhaXRpbmdSb3V0aW5nLnJvdXRpbmdDb250ZXh0XG5cdFx0XHQpO1xuXG5cdFx0Y2hhbmdlZEJ5U3RhdGUuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuXHRcdFx0c2VsZi5fY3VycmVudENoYW5nZWRTdG9yZXNbbmFtZV0gPSB0cnVlO1xuXHRcdH0pO1xuXG5cdFx0Ly8gd2Ugc2hvdWxkIHVwZGF0ZSBjb250ZXh0cyBvZiB0aGUgc3RvcmVzIHdpdGggdGhlIG5ldyByb3V0aW5nIGNvbnRleHRcblx0XHR0aGlzLl9jdXJyZW50Um91dGluZ0NvbnRleHQgPSB0aGlzLl9hd2FpdGluZ1JvdXRpbmcucm91dGluZ0NvbnRleHQ7XG5cdFx0T2JqZWN0LmtleXModGhpcy5fY29tcG9uZW50SW5zdGFuY2VzKVxuXHRcdFx0LmZvckVhY2goZnVuY3Rpb24gKGlkKSB7XG5cdFx0XHRcdHZhciBpbnN0YW5jZSA9IHNlbGYuX2NvbXBvbmVudEluc3RhbmNlc1tpZF07XG5cdFx0XHRcdGluc3RhbmNlLiRjb250ZXh0ID0gc2VsZi5fZ2V0Q29tcG9uZW50Q29udGV4dChcblx0XHRcdFx0XHRjb21wb25lbnRzW2luc3RhbmNlLiRjb250ZXh0Lm5hbWVdLFxuXHRcdFx0XHRcdGluc3RhbmNlLiRjb250ZXh0LmVsZW1lbnRcblx0XHRcdFx0KTtcblx0XHRcdH0pO1xuXHRcdHRoaXMuX2F3YWl0aW5nUm91dGluZyA9IG51bGw7XG5cdH1cblxuXHR2YXIgY2hhbmdlZFN0b3JlcyA9IE9iamVjdC5rZXlzKHRoaXMuX2N1cnJlbnRDaGFuZ2VkU3RvcmVzKTtcblx0aWYgKGNoYW5nZWRTdG9yZXMubGVuZ3RoID09PSAwKSB7XG5cdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuXHR9XG5cdHRoaXMuX2N1cnJlbnRDaGFuZ2VkU3RvcmVzID0ge307XG5cblx0dmFyIHJlbmRlcmluZ0NvbnRleHQgPSB0aGlzLl9jcmVhdGVSZW5kZXJpbmdDb250ZXh0KGNoYW5nZWRTdG9yZXMpLFxuXHRcdHByb21pc2VzID0gcmVuZGVyaW5nQ29udGV4dC5yb290cy5tYXAoZnVuY3Rpb24gKHJvb3QpIHtcblx0XHRcdHJldHVybiBzZWxmLnJlbmRlckNvbXBvbmVudChyb290LCByZW5kZXJpbmdDb250ZXh0KTtcblx0XHR9KTtcblxuXHR0aGlzLl9pc1VwZGF0aW5nID0gdHJ1ZTtcblx0cmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKVxuXHRcdC5jYXRjaChmdW5jdGlvbiAocmVhc29uKSB7XG5cdFx0XHRzZWxmLl9ldmVudEJ1cy5lbWl0KCdlcnJvcicsIHJlYXNvbik7XG5cdFx0fSlcblx0XHQudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRzZWxmLl9pc1VwZGF0aW5nID0gZmFsc2U7XG5cdFx0XHRzZWxmLl9ldmVudEJ1cy5lbWl0KCdkb2N1bWVudFVwZGF0ZWQnLCBjaGFuZ2VkU3RvcmVzKTtcblx0XHRcdHJldHVybiBzZWxmLl91cGRhdGVTdG9yZUNvbXBvbmVudHMoKTtcblx0XHR9KTtcbn07XG5cbi8qKlxuICogTWVyZ2VzIG5ldyBhbmQgZXhpc3RlZCBoZWFkIGVsZW1lbnRzIGFuZCBjaGFuZ2Ugb25seSBkaWZmZXJlbmNlLlxuICogQHBhcmFtIHtFbGVtZW50fSBoZWFkIEhFQUQgRE9NIGVsZW1lbnQuXG4gKiBAcGFyYW0ge3N0cmluZ30gaHRtbFRleHQgSFRNTCBvZiBuZXcgSEVBRCBlbGVtZW50IGNvbnRlbnQuXG4gKiBAcHJpdmF0ZVxuICovXG4vKmpzaGludCBtYXhjb21wbGV4aXR5OmZhbHNlICovXG5Eb2N1bWVudFJlbmRlcmVyLnByb3RvdHlwZS5fbWVyZ2VIZWFkID0gZnVuY3Rpb24gKGhlYWQsIGh0bWxUZXh0KSB7XG5cdGlmICghaHRtbFRleHQpIHtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIHNlbGYgPSB0aGlzLFxuXHRcdG5ld0hlYWQgPSB0aGlzLl93aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaGVhZCcpO1xuXHRuZXdIZWFkLmlubmVySFRNTCA9IGh0bWxUZXh0O1xuXG5cdHZhciBtYXAgPSB0aGlzLl9nZXRIZWFkTWFwKGhlYWQuY2hpbGROb2RlcyksXG5cdFx0Y3VycmVudCwgaSwga2V5LCBvbGRLZXksIG9sZEl0ZW0sXG5cdFx0c2FtZU1ldGFFbGVtZW50cyA9IHt9O1xuXG5cdGZvciAoaSA9IDA7IGkgPCBuZXdIZWFkLmNoaWxkTm9kZXMubGVuZ3RoOyBpKyspIHtcblx0XHRjdXJyZW50ID0gbmV3SGVhZC5jaGlsZE5vZGVzW2ldO1xuXG5cdFx0aWYgKCFtYXAuaGFzT3duUHJvcGVydHkoY3VycmVudC5ub2RlTmFtZSkpIHtcblx0XHRcdG1hcFtjdXJyZW50Lm5vZGVOYW1lXSA9IHt9O1xuXHRcdH1cblxuXHRcdHN3aXRjaCAoY3VycmVudC5ub2RlTmFtZSkge1xuXHRcdFx0Ly8gdGhlc2UgZWxlbWVudHMgY2FuIGJlIG9ubHkgcmVwbGFjZWRcblx0XHRcdGNhc2UgVEFHX05BTUVTLlRJVExFOlxuXHRcdFx0Y2FzZSBUQUdfTkFNRVMuQkFTRTpcblx0XHRcdGNhc2UgVEFHX05BTUVTLk5PU0NSSVBUOlxuXHRcdFx0XHRrZXkgPSB0aGlzLl9nZXROb2RlS2V5KGN1cnJlbnQpO1xuXHRcdFx0XHRvbGRJdGVtID0gaGVhZC5nZXRFbGVtZW50c0J5VGFnTmFtZShjdXJyZW50Lm5vZGVOYW1lKVswXTtcblx0XHRcdFx0aWYgKG9sZEl0ZW0pIHtcblx0XHRcdFx0XHRvbGRLZXkgPSB0aGlzLl9nZXROb2RlS2V5KG9sZEl0ZW0pO1xuXHRcdFx0XHRcdGhlYWQucmVwbGFjZUNoaWxkKGN1cnJlbnQsIG9sZEl0ZW0pO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGhlYWQuYXBwZW5kQ2hpbGQoY3VycmVudCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gd2hlbiB3ZSBkbyByZXBsYWNlIG9yIGFwcGVuZCBjdXJyZW50IGlzIHJlbW92ZWQgZnJvbSBuZXdIZWFkXG5cdFx0XHRcdC8vIHRoZXJlZm9yZSB3ZSBuZWVkIHRvIGRlY3JlbWVudCBpbmRleFxuXHRcdFx0XHRpLS07XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHQvLyB0aGVzZSBlbGVtZW50cyBjYW4gbm90IGJlIGRlbGV0ZWQgZnJvbSBoZWFkXG5cdFx0XHQvLyB0aGVyZWZvcmUgd2UganVzdCBhZGQgbmV3IGVsZW1lbnRzIHRoYXQgZGlmZmVycyBmcm9tIGV4aXN0ZWRcblx0XHRcdGNhc2UgVEFHX05BTUVTLlNUWUxFOlxuXHRcdFx0Y2FzZSBUQUdfTkFNRVMuTElOSzpcblx0XHRcdGNhc2UgVEFHX05BTUVTLlNDUklQVDpcblx0XHRcdFx0a2V5ID0gc2VsZi5fZ2V0Tm9kZUtleShjdXJyZW50KTtcblx0XHRcdFx0aWYgKCFtYXBbY3VycmVudC5ub2RlTmFtZV0uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRcdGhlYWQuYXBwZW5kQ2hpbGQoY3VycmVudCk7XG5cdFx0XHRcdFx0aS0tO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Ly8gbWV0YSBhbmQgb3RoZXIgZWxlbWVudHMgY2FuIGJlIGRlbGV0ZWRcblx0XHRcdC8vIGJ1dCB3ZSBzaG91bGQgbm90IGRlbGV0ZSBhbmQgYXBwZW5kIHNhbWUgZWxlbWVudHNcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdGtleSA9IHNlbGYuX2dldE5vZGVLZXkoY3VycmVudCk7XG5cdFx0XHRcdGlmIChtYXBbY3VycmVudC5ub2RlTmFtZV0uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRcdHNhbWVNZXRhRWxlbWVudHNba2V5XSA9IHRydWU7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0aGVhZC5hcHBlbmRDaGlsZChjdXJyZW50KTtcblx0XHRcdFx0XHRpLS07XG5cdFx0XHRcdH1cblx0XHRcdFx0YnJlYWs7XG5cdFx0fVxuXHR9XG5cblx0aWYgKG1hcC5oYXNPd25Qcm9wZXJ0eShUQUdfTkFNRVMuTUVUQSkpIHtcblx0XHQvLyByZW1vdmUgbWV0YSB0YWdzIHdoaWNoIGEgbm90IGluIGEgbmV3IGhlYWQgc3RhdGVcblx0XHRPYmplY3Qua2V5cyhtYXBbVEFHX05BTUVTLk1FVEFdKVxuXHRcdFx0LmZvckVhY2goZnVuY3Rpb24gKG1ldGFLZXkpIHtcblx0XHRcdFx0aWYgKHNhbWVNZXRhRWxlbWVudHMuaGFzT3duUHJvcGVydHkobWV0YUtleSkpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRoZWFkLnJlbW92ZUNoaWxkKG1hcFtUQUdfTkFNRVMuTUVUQV1bbWV0YUtleV0pO1xuXHRcdFx0fSk7XG5cdH1cbn07XG5cbi8qKlxuICogR2V0cyBtYXAgb2YgYWxsIEhFQUQncyBlbGVtZW50cy5cbiAqIEBwYXJhbSB7Tm9kZUxpc3R9IGhlYWRDaGlsZHJlbiBIZWFkIGNoaWxkcmVuIERPTSBub2Rlcy5cbiAqIEByZXR1cm5zIHtPYmplY3R9IE1hcCBvZiBIRUFEIGVsZW1lbnRzLlxuICogQHByaXZhdGVcbiAqL1xuRG9jdW1lbnRSZW5kZXJlci5wcm90b3R5cGUuX2dldEhlYWRNYXAgPSBmdW5jdGlvbiAoaGVhZENoaWxkcmVuKSB7XG5cdC8vIENyZWF0ZSBtYXAgb2YgPG1ldGE+LCA8bGluaz4sIDxzdHlsZT4gYW5kIDxzY3JpcHQ+IHRhZ3Ncblx0Ly8gYnkgdW5pcXVlIGtleXMgdGhhdCBjb250YWluIGF0dHJpYnV0ZXMgYW5kIGNvbnRlbnRcblx0dmFyIG1hcCA9IHt9LFxuXHRcdGksIGN1cnJlbnQsXG5cdFx0c2VsZiA9IHRoaXM7XG5cblx0Zm9yIChpID0gMDsgaSA8IGhlYWRDaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuXHRcdGN1cnJlbnQgPSBoZWFkQ2hpbGRyZW5baV07XG5cdFx0aWYgKCFtYXAuaGFzT3duUHJvcGVydHkoY3VycmVudC5ub2RlTmFtZSkpIHtcblx0XHRcdG1hcFtjdXJyZW50Lm5vZGVOYW1lXSA9IHt9O1xuXHRcdH1cblx0XHRtYXBbY3VycmVudC5ub2RlTmFtZV1bc2VsZi5fZ2V0Tm9kZUtleShjdXJyZW50KV0gPSBjdXJyZW50O1xuXHR9XG5cdHJldHVybiBtYXA7XG59O1xuXG4vKipcbiAqIEdldHMgdW5pcXVlIGVsZW1lbnQga2V5IHVzaW5nIGVsZW1lbnQncyBhdHRyaWJ1dGVzIGFuZCBpdHMgY29udGVudC5cbiAqIEBwYXJhbSB7Tm9kZX0gbm9kZSBIVE1MIGVsZW1lbnQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBVbmlxdWUga2V5IGZvciBlbGVtZW50LlxuICogQHByaXZhdGVcbiAqL1xuRG9jdW1lbnRSZW5kZXJlci5wcm90b3R5cGUuX2dldE5vZGVLZXkgPSBmdW5jdGlvbiAobm9kZSkge1xuXHR2YXIgY3VycmVudCwgaSxcblx0XHRhdHRyaWJ1dGVzID0gW107XG5cblx0aWYgKG5vZGUubm9kZVR5cGUgIT09IE5PREVfVFlQRVMuRUxFTUVOVF9OT0RFKSB7XG5cdFx0cmV0dXJuIG5vZGUubm9kZVZhbHVlIHx8ICcnO1xuXHR9XG5cblx0aWYgKG5vZGUuaGFzQXR0cmlidXRlcygpKSB7XG5cdFx0Zm9yIChpID0gMDsgaSA8IG5vZGUuYXR0cmlidXRlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0Y3VycmVudCA9IG5vZGUuYXR0cmlidXRlc1tpXTtcblx0XHRcdGF0dHJpYnV0ZXMucHVzaChjdXJyZW50Lm5hbWUgKyAnPScgKyBjdXJyZW50LnZhbHVlKTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gYXR0cmlidXRlc1xuXHRcdFx0LnNvcnQoKVxuXHRcdFx0LmpvaW4oJ3wnKSArICc+JyArIG5vZGUudGV4dENvbnRlbnQ7XG59O1xuXG4vKipcbiAqIERvZXMgaW5pdGlhbCB3cmFwcGluZyBmb3IgZXZlcnkgY29tcG9uZW50IG9uIHRoZSBwYWdlLlxuICogQHByaXZhdGVcbiAqL1xuRG9jdW1lbnRSZW5kZXJlci5wcm90b3R5cGUuX2luaXRpYWxXcmFwID0gZnVuY3Rpb24gKCkge1xuXHR2YXIgc2VsZiA9IHRoaXMsXG5cdFx0Y3VycmVudCwgaSwgaWQsIGluc3RhbmNlLFxuXHRcdGNvbXBvbmVudHMgPSB0aGlzLl9jb21wb25lbnRMb2FkZXIuZ2V0Q29tcG9uZW50c0J5TmFtZXMoKSxcblx0XHRiaW5kUHJvbWlzZXMgPSBbXTtcblxuXHRPYmplY3Qua2V5cyhjb21wb25lbnRzKVxuXHRcdC5mb3JFYWNoKGZ1bmN0aW9uIChjb21wb25lbnROYW1lKSB7XG5cdFx0XHR2YXIgdGFnTmFtZSA9IG1vZHVsZUhlbHBlclxuXHRcdFx0XHRcdC5nZXRUYWdOYW1lRm9yQ29tcG9uZW50TmFtZShjb21wb25lbnROYW1lKSxcblx0XHRcdFx0ZWxlbWVudHMsXG5cdFx0XHRcdGNvbnN0cnVjdG9yID0gY29tcG9uZW50c1tjb21wb25lbnROYW1lXS5jb25zdHJ1Y3RvcjtcblxuXHRcdFx0aWYgKG1vZHVsZUhlbHBlci5pc0RvY3VtZW50Q29tcG9uZW50KGNvbXBvbmVudE5hbWUpKSB7XG5cdFx0XHRcdGVsZW1lbnRzID0gW3NlbGYuX3dpbmRvdy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnRdO1xuXHRcdFx0fSBlbHNlIGlmIChtb2R1bGVIZWxwZXIuaXNIZWFkQ29tcG9uZW50KGNvbXBvbmVudE5hbWUpKSB7XG5cdFx0XHRcdGVsZW1lbnRzID0gW3NlbGYuX3dpbmRvdy5kb2N1bWVudC5oZWFkXTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGVsZW1lbnRzID0gc2VsZi5fd2luZG93LmRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKHRhZ05hbWUpO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0Y3VycmVudCA9IGVsZW1lbnRzW2ldO1xuXHRcdFx0XHRpZCA9IHNlbGYuX2dldElkKGN1cnJlbnQpO1xuXHRcdFx0XHRpZiAoIWlkKSB7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjb25zdHJ1Y3Rvci5wcm90b3R5cGUuJGNvbnRleHQgPSBzZWxmLl9nZXRDb21wb25lbnRDb250ZXh0KFxuXHRcdFx0XHRcdGNvbXBvbmVudHNbY29tcG9uZW50TmFtZV0sIGN1cnJlbnRcblx0XHRcdFx0KTtcblx0XHRcdFx0aW5zdGFuY2UgPSBzZWxmLl9zZXJ2aWNlTG9jYXRvci5yZXNvbHZlSW5zdGFuY2UoXG5cdFx0XHRcdFx0Y29uc3RydWN0b3IsIHNlbGYuX2NvbmZpZ1xuXHRcdFx0XHQpO1xuXHRcdFx0XHRpbnN0YW5jZS4kY29udGV4dCA9IGNvbnN0cnVjdG9yLnByb3RvdHlwZS4kY29udGV4dDtcblx0XHRcdFx0c2VsZi5fY29tcG9uZW50RWxlbWVudHNbaWRdID0gY3VycmVudDtcblx0XHRcdFx0c2VsZi5fY29tcG9uZW50SW5zdGFuY2VzW2lkXSA9IGluc3RhbmNlO1xuXHRcdFx0XHQvLyBpbml0aWFsaXplIHRoZSBzdG9yZSBvZiB0aGUgY29tcG9uZW50XG5cdFx0XHRcdHNlbGYuX3N0b3JlRGlzcGF0Y2hlci5nZXRTdG9yZShcblx0XHRcdFx0XHRjdXJyZW50LmdldEF0dHJpYnV0ZShtb2R1bGVIZWxwZXIuQVRUUklCVVRFX1NUT1JFKVxuXHRcdFx0XHQpO1xuXHRcdFx0XHRzZWxmLl9ldmVudEJ1cy5lbWl0KCdjb21wb25lbnRSZW5kZXJlZCcsIHtcblx0XHRcdFx0XHRuYW1lOiBjb21wb25lbnROYW1lLFxuXHRcdFx0XHRcdGF0dHJpYnV0ZXM6IGluc3RhbmNlLiRjb250ZXh0LmF0dHJpYnV0ZXMsXG5cdFx0XHRcdFx0Y29udGV4dDogaW5zdGFuY2UuJGNvbnRleHRcblx0XHRcdFx0fSk7XG5cdFx0XHRcdGJpbmRQcm9taXNlcy5wdXNoKHNlbGYuX2JpbmRDb21wb25lbnQoY3VycmVudCkpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdHJldHVybiBQcm9taXNlLmFsbChiaW5kUHJvbWlzZXMpXG5cdFx0LnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0c2VsZi5fZXZlbnRCdXMuZW1pdCgnZG9jdW1lbnRSZW5kZXJlZCcsIHNlbGYuX2N1cnJlbnRSb3V0aW5nQ29udGV4dCk7XG5cdFx0fSk7XG59O1xuXG4vKipcbiAqIEdldHMgY29tcG9uZW50IGNvbnRleHQgdXNpbmcgYmFzaWMgY29udGV4dC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb21wb25lbnQgQ29tcG9uZW50IGRldGFpbHMuXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgRE9NIGVsZW1lbnQgb2YgY29tcG9uZW50LlxuICogQHJldHVybnMge09iamVjdH0gQ29tcG9uZW50IGNvbnRleHQuXG4gKiBAcHJpdmF0ZVxuICovXG5Eb2N1bWVudFJlbmRlcmVyLnByb3RvdHlwZS5fZ2V0Q29tcG9uZW50Q29udGV4dCA9XG5cdGZ1bmN0aW9uIChjb21wb25lbnQsIGVsZW1lbnQpIHtcblx0XHR2YXIgc2VsZiA9IHRoaXMsXG5cdFx0XHRzdG9yZU5hbWUgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShtb2R1bGVIZWxwZXIuQVRUUklCVVRFX1NUT1JFKSxcblx0XHRcdGNvbXBvbmVudENvbnRleHQgPSBPYmplY3QuY3JlYXRlKHRoaXMuX2N1cnJlbnRSb3V0aW5nQ29udGV4dCk7XG5cblx0XHQvLyBpbml0aWFsaXplIHRoZSBzdG9yZSBvZiB0aGUgY29tcG9uZW50XG5cdFx0dGhpcy5fc3RvcmVEaXNwYXRjaGVyLmdldFN0b3JlKHN0b3JlTmFtZSk7XG5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydGllcyhjb21wb25lbnRDb250ZXh0LCB7XG5cdFx0XHRlbGVtZW50OiB7XG5cdFx0XHRcdHZhbHVlOiBlbGVtZW50LFxuXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0bmFtZToge1xuXHRcdFx0XHRnZXQ6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRyZXR1cm4gY29tcG9uZW50Lm5hbWU7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGVudW1lcmFibGU6IHRydWVcblx0XHRcdH0sXG5cdFx0XHRhdHRyaWJ1dGVzOiB7XG5cdFx0XHRcdGdldDogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHJldHVybiBhdHRyaWJ1dGVzVG9PYmplY3QoZWxlbWVudC5hdHRyaWJ1dGVzKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdGdldENvbXBvbmVudEJ5SWQ6IHtcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIChpZCkge1xuXHRcdFx0XHRcdHJldHVybiBzZWxmLmdldENvbXBvbmVudEJ5SWQoaWQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0Y3JlYXRlQ29tcG9uZW50OiB7XG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiAodGFnTmFtZSwgYXR0cmlidXRlcykge1xuXHRcdFx0XHRcdHJldHVybiBzZWxmLmNyZWF0ZUNvbXBvbmVudCh0YWdOYW1lLCBhdHRyaWJ1dGVzKTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGNvbGxlY3RHYXJiYWdlOiB7XG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHNlbGYuY29sbGVjdEdhcmJhZ2UoKTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGdldFN0b3JlRGF0YToge1xuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHZhciBjdXJyZW50U3RvcmVOYW1lID0gY29tcG9uZW50Q29udGV4dC5lbGVtZW50XG5cdFx0XHRcdFx0XHQuZ2V0QXR0cmlidXRlKG1vZHVsZUhlbHBlci5BVFRSSUJVVEVfU1RPUkUpO1xuXHRcdFx0XHRcdHJldHVybiBzZWxmLl9zdG9yZURpc3BhdGNoZXJcblx0XHRcdFx0XHRcdC5nZXRTdG9yZURhdGEoY3VycmVudFN0b3JlTmFtZSk7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRzZW5kQWN0aW9uOiB7XG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiAobmFtZSwgYXJncykge1xuXHRcdFx0XHRcdHZhciBjdXJyZW50U3RvcmVOYW1lID0gY29tcG9uZW50Q29udGV4dC5lbGVtZW50XG5cdFx0XHRcdFx0XHQuZ2V0QXR0cmlidXRlKG1vZHVsZUhlbHBlci5BVFRSSUJVVEVfU1RPUkUpO1xuXHRcdFx0XHRcdHJldHVybiBzZWxmLl9zdG9yZURpc3BhdGNoZXJcblx0XHRcdFx0XHRcdC5zZW5kQWN0aW9uKGN1cnJlbnRTdG9yZU5hbWUsIG5hbWUsIGFyZ3MpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0c2VuZEJyb2FkY2FzdEFjdGlvbjoge1xuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gKG5hbWUsIGFyZ3MpIHtcblx0XHRcdFx0XHRyZXR1cm4gc2VsZi5fc3RvcmVEaXNwYXRjaGVyXG5cdFx0XHRcdFx0XHQuc2VuZEJyb2FkY2FzdEFjdGlvbihuYW1lLCBhcmdzKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIGNvbXBvbmVudENvbnRleHQ7XG5cdH07XG5cbi8qKlxuICogRmluZHMgYWxsIHJlbmRlcmluZyByb290cyBvbiBwYWdlIGZvciBhbGwgY2hhbmdlZCBzdG9yZXMuXG4gKiBAcGFyYW0ge0FycmF5fSBjaGFuZ2VkU3RvcmVOYW1lcyBMaXN0IG9mIHN0b3JlIG5hbWVzIHdoaWNoIGhhcyBiZWVuIGNoYW5nZWQuXG4gKiBAcmV0dXJucyB7QXJyYXk8RWxlbWVudD59IEhUTUwgZWxlbWVudHMgdGhhdCBhcmUgcmVuZGVyaW5nIHJvb3RzLlxuICogQHByaXZhdGVcbiAqL1xuRG9jdW1lbnRSZW5kZXJlci5wcm90b3R5cGUuX2ZpbmRSZW5kZXJpbmdSb290cyA9IGZ1bmN0aW9uIChjaGFuZ2VkU3RvcmVOYW1lcykge1xuXHR2YXIgc2VsZiA9IHRoaXMsXG5cdFx0aGVhZFN0b3JlID0gdGhpcy5fd2luZG93LmRvY3VtZW50LmhlYWQuZ2V0QXR0cmlidXRlKFxuXHRcdFx0bW9kdWxlSGVscGVyLkFUVFJJQlVURV9TVE9SRVxuXHRcdCksXG5cdFx0Y29tcG9uZW50cyA9IHRoaXMuX2NvbXBvbmVudExvYWRlci5nZXRDb21wb25lbnRzQnlOYW1lcygpLFxuXHRcdGNvbXBvbmVudHNFbGVtZW50cyA9IHt9LFxuXHRcdHN0b3JlTmFtZXNTZXQgPSB7fSxcblx0XHRyb290c1NldCA9IHt9LFxuXHRcdHJvb3RzID0gW107XG5cblx0Ly8gd2Ugc2hvdWxkIGZpbmQgYWxsIGNvbXBvbmVudHMgYW5kIHRoZW4gbG9va2luZyBmb3Igcm9vdHNcblx0Y2hhbmdlZFN0b3JlTmFtZXNcblx0XHQuZm9yRWFjaChmdW5jdGlvbiAoc3RvcmVOYW1lKSB7XG5cdFx0XHRzdG9yZU5hbWVzU2V0W3N0b3JlTmFtZV0gPSB0cnVlO1xuXHRcdFx0Y29tcG9uZW50c0VsZW1lbnRzW3N0b3JlTmFtZV0gPSBzZWxmLl93aW5kb3cuZG9jdW1lbnRcblx0XHRcdFx0LnF1ZXJ5U2VsZWN0b3JBbGwoXG5cdFx0XHRcdFx0J1snICtcblx0XHRcdFx0XHRtb2R1bGVIZWxwZXIuQVRUUklCVVRFX0lEICtcblx0XHRcdFx0XHQnXScgK1xuXHRcdFx0XHRcdCdbJyArXG5cdFx0XHRcdFx0bW9kdWxlSGVscGVyLkFUVFJJQlVURV9TVE9SRSArXG5cdFx0XHRcdFx0Jz1cIicgK1xuXHRcdFx0XHRcdHN0b3JlTmFtZSArXG5cdFx0XHRcdFx0J1wiXSdcblx0XHRcdFx0KTtcblx0XHR9KTtcblxuXHRpZiAoY29tcG9uZW50cy5oYXNPd25Qcm9wZXJ0eShtb2R1bGVIZWxwZXIuSEVBRF9DT01QT05FTlRfTkFNRSkgJiZcblx0XHRzdG9yZU5hbWVzU2V0Lmhhc093blByb3BlcnR5KGhlYWRTdG9yZSkpIHtcblx0XHRyb290c1NldFt0aGlzLl9nZXRJZCh0aGlzLl93aW5kb3cuZG9jdW1lbnQuaGVhZCldID0gdHJ1ZTtcblx0XHRyb290cy5wdXNoKHRoaXMuX3dpbmRvdy5kb2N1bWVudC5oZWFkKTtcblx0fVxuXG5cdGNoYW5nZWRTdG9yZU5hbWVzXG5cdFx0LmZvckVhY2goZnVuY3Rpb24gKHN0b3JlTmFtZSkge1xuXHRcdFx0dmFyIGN1cnJlbnQsIGN1cnJlbnRJZCxcblx0XHRcdFx0bGFzdFJvb3QsIGxhc3RSb290SWQsXG5cdFx0XHRcdGN1cnJlbnRTdG9yZSwgY3VycmVudENvbXBvbmVudE5hbWU7XG5cblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgY29tcG9uZW50c0VsZW1lbnRzW3N0b3JlTmFtZV0ubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0Y3VycmVudCA9IGNvbXBvbmVudHNFbGVtZW50c1tzdG9yZU5hbWVdW2ldO1xuXHRcdFx0XHRjdXJyZW50SWQgPSBjb21wb25lbnRzRWxlbWVudHNbc3RvcmVOYW1lXVtpXVxuXHRcdFx0XHRcdC5nZXRBdHRyaWJ1dGUobW9kdWxlSGVscGVyLkFUVFJJQlVURV9JRCk7XG5cdFx0XHRcdGxhc3RSb290ID0gY3VycmVudDtcblx0XHRcdFx0bGFzdFJvb3RJZCA9IGN1cnJlbnRJZDtcblx0XHRcdFx0Y3VycmVudENvbXBvbmVudE5hbWUgPSBtb2R1bGVIZWxwZXIuZ2V0T3JpZ2luYWxDb21wb25lbnROYW1lKFxuXHRcdFx0XHRcdGN1cnJlbnQudGFnTmFtZVxuXHRcdFx0XHQpO1xuXG5cdFx0XHRcdHdoaWxlIChjdXJyZW50LnBhcmVudEVsZW1lbnQpIHtcblx0XHRcdFx0XHRjdXJyZW50ID0gY3VycmVudC5wYXJlbnRFbGVtZW50O1xuXHRcdFx0XHRcdGN1cnJlbnRJZCA9IHNlbGYuX2dldElkKGN1cnJlbnQpO1xuXHRcdFx0XHRcdGN1cnJlbnRTdG9yZSA9IGN1cnJlbnQuZ2V0QXR0cmlidXRlKFxuXHRcdFx0XHRcdFx0bW9kdWxlSGVscGVyLkFUVFJJQlVURV9TVE9SRVxuXHRcdFx0XHRcdCk7XG5cblx0XHRcdFx0XHQvLyBzdG9yZSBkaWQgbm90IGNoYW5nZSBzdGF0ZVxuXHRcdFx0XHRcdGlmICghY3VycmVudFN0b3JlIHx8XG5cdFx0XHRcdFx0XHQhc3RvcmVOYW1lc1NldC5oYXNPd25Qcm9wZXJ0eShjdXJyZW50U3RvcmUpKSB7XG5cdFx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLy8vIGlzIG5vdCBhbiBhY3RpdmUgY29tcG9uZW50XG5cdFx0XHRcdFx0aWYgKCFjb21wb25lbnRzLmhhc093blByb3BlcnR5KGN1cnJlbnRDb21wb25lbnROYW1lKSkge1xuXHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0bGFzdFJvb3QgPSBjdXJyZW50O1xuXHRcdFx0XHRcdGxhc3RSb290SWQgPSBjdXJyZW50SWQ7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHJvb3RzU2V0Lmhhc093blByb3BlcnR5KGxhc3RSb290SWQpKSB7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0cm9vdHNTZXRbbGFzdFJvb3RJZF0gPSB0cnVlO1xuXHRcdFx0XHRyb290cy5wdXNoKGxhc3RSb290KTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRyZXR1cm4gcm9vdHM7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgcmVuZGVyaW5nIGNvbnRleHQuXG4gKiBAcGFyYW0ge0FycmF5P30gY2hhbmdlZFN0b3JlcyBOYW1lcyBvZiBjaGFuZ2VkIHN0b3Jlcy5cbiAqIEByZXR1cm5zIHt7XG4gKiAgIGNvbmZpZzogT2JqZWN0LFxuICogICByZW5kZXJlZElkczoge30sXG4gKiAgIHVuYm91bmRJZHM6IHt9LFxuICogICBpc0hlYWRSZW5kZXJlZDogQm9vbGVhbixcbiAqICAgYmluZE1ldGhvZHM6IEFycmF5LFxuICogICByb3V0aW5nQ29udGV4dDogT2JqZWN0LFxuICogICBjb21wb25lbnRzOiBPYmplY3QsXG4gKiAgIGNvbXBvbmVudFRhZ3M6IEFycmF5LFxuICogICByb290czogQXJyYXkuPEVsZW1lbnQ+XG4gKiB9fVxuICogQHByaXZhdGVcbiAqL1xuRG9jdW1lbnRSZW5kZXJlci5wcm90b3R5cGUuX2NyZWF0ZVJlbmRlcmluZ0NvbnRleHQgPSBmdW5jdGlvbiAoY2hhbmdlZFN0b3Jlcykge1xuXHR2YXIgY29tcG9uZW50cyA9IHRoaXMuX2NvbXBvbmVudExvYWRlci5nZXRDb21wb25lbnRzQnlOYW1lcygpLFxuXHRcdGNvbXBvbmVudFRhZ3MgPSBPYmplY3Qua2V5cyhjb21wb25lbnRzKVxuXHRcdFx0Lm1hcChmdW5jdGlvbiAobmFtZSkge1xuXHRcdFx0XHRyZXR1cm4gbW9kdWxlSGVscGVyLmdldFRhZ05hbWVGb3JDb21wb25lbnROYW1lKG5hbWUpO1xuXHRcdFx0fSk7XG5cdHJldHVybiB7XG5cdFx0Y29uZmlnOiB0aGlzLl9jb25maWcsXG5cdFx0cmVuZGVyZWRJZHM6IHt9LFxuXHRcdHVuYm91bmRJZHM6IHt9LFxuXHRcdGlzSGVhZFJlbmRlcmVkOiBmYWxzZSxcblx0XHRiaW5kTWV0aG9kczogW10sXG5cdFx0cm91dGluZ0NvbnRleHQ6IHRoaXMuX2N1cnJlbnRSb3V0aW5nQ29udGV4dCxcblx0XHRjb21wb25lbnRzOiBjb21wb25lbnRzLFxuXHRcdGNvbXBvbmVudFRhZ3M6IGNvbXBvbmVudFRhZ3MsXG5cdFx0cm9vdHM6IGNoYW5nZWRTdG9yZXMgPyB0aGlzLl9maW5kUmVuZGVyaW5nUm9vdHMoY2hhbmdlZFN0b3JlcykgOiBbXVxuXHR9O1xufTtcblxuLyoqXG4gKiBHZXRzIElEIG9mIHRoZSBlbGVtZW50LlxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50IEhUTUwgZWxlbWVudCBvZiBjb21wb25lbnQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBJRC5cbiAqL1xuRG9jdW1lbnRSZW5kZXJlci5wcm90b3R5cGUuX2dldElkID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcblx0aWYgKGVsZW1lbnQgPT09IHRoaXMuX3dpbmRvdy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpIHtcblx0XHRyZXR1cm4gU1BFQ0lBTF9JRFMuJCRkb2N1bWVudDtcblx0fVxuXHRpZiAoZWxlbWVudCA9PT0gdGhpcy5fd2luZG93LmRvY3VtZW50LmhlYWQpIHtcblx0XHRyZXR1cm4gU1BFQ0lBTF9JRFMuJCRoZWFkO1xuXHR9XG5cdHJldHVybiBlbGVtZW50LmdldEF0dHJpYnV0ZShtb2R1bGVIZWxwZXIuQVRUUklCVVRFX0lEKTtcbn07XG5cbi8qKlxuICogQ29udmVydHMgTmFtZWROb2RlTWFwIG9mIEF0dHIgaXRlbXMgdG8ga2V5LXZhbHVlIG9iamVjdCBtYXAuXG4gKiBAcGFyYW0ge05hbWVkTm9kZU1hcH0gYXR0cmlidXRlcyBMaXN0IG9mIEVsZW1lbnQgYXR0cmlidXRlcy5cbiAqIEByZXR1cm5zIHtPYmplY3R9IE1hcCBvZiBhdHRyaWJ1dGUgdmFsdWVzIGJ5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBhdHRyaWJ1dGVzVG9PYmplY3QoYXR0cmlidXRlcykge1xuXHR2YXIgcmVzdWx0ID0ge307XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgYXR0cmlidXRlcy5sZW5ndGg7IGkrKykge1xuXHRcdHJlc3VsdFthdHRyaWJ1dGVzW2ldLm5hbWVdID0gYXR0cmlidXRlc1tpXS52YWx1ZTtcblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEdldHMgY3Jvc3MtYnJvd3NlciBcIm1hdGNoZXNcIiBtZXRob2QgZm9yIHRoZSBlbGVtZW50LlxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50IEhUTUwgZWxlbWVudC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gXCJtYXRjaGVzXCIgbWV0aG9kLlxuICovXG5mdW5jdGlvbiBnZXRNYXRjaGVzTWV0aG9kKGVsZW1lbnQpIHtcblx0dmFyIG1ldGhvZCA9ICAoZWxlbWVudC5tYXRjaGVzIHx8XG5cdFx0ZWxlbWVudC53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHxcblx0XHRlbGVtZW50Lm1vek1hdGNoZXNTZWxlY3RvciB8fFxuXHRcdGVsZW1lbnQub01hdGNoZXNTZWxlY3RvciB8fFxuXHRcdGVsZW1lbnQubXNNYXRjaGVzU2VsZWN0b3IpO1xuXG5cdHJldHVybiBtZXRob2QuYmluZChlbGVtZW50KTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGltaXRhdGlvbiBvZiBvcmlnaW5hbCBFdmVudCBvYmplY3QgYnV0IHdpdGggc3BlY2lmaWVkIGN1cnJlbnRUYXJnZXQuXG4gKiBAcGFyYW0ge0V2ZW50fSBldmVudCBPcmlnaW5hbCBldmVudCBvYmplY3QuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjdXJyZW50VGFyZ2V0R2V0dGVyIEdldHRlciBmb3IgY3VycmVudFRhcmdldC5cbiAqIEByZXR1cm5zIHtFdmVudH0gV3JhcHBlZCBldmVudC5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlQ3VzdG9tRXZlbnQoZXZlbnQsIGN1cnJlbnRUYXJnZXRHZXR0ZXIpIHtcblx0dmFyIGNhdEV2ZW50ID0gT2JqZWN0LmNyZWF0ZShldmVudCksXG5cdFx0a2V5cyA9IFtdLFxuXHRcdHByb3BlcnRpZXMgPSB7fTtcblx0Zm9yKHZhciBrZXkgaW4gZXZlbnQpIHtcblx0XHRrZXlzLnB1c2goa2V5KTtcblx0fVxuXHRrZXlzLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdGlmICh0eXBlb2YoZXZlbnRba2V5XSkgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdHByb3BlcnRpZXNba2V5XSA9IHtcblx0XHRcdFx0Z2V0OiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGV2ZW50W2tleV0uYmluZChldmVudCk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0cHJvcGVydGllc1trZXldID0ge1xuXHRcdFx0Z2V0OiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHJldHVybiBldmVudFtrZXldO1xuXHRcdFx0fSxcblx0XHRcdHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG5cdFx0XHRcdGV2ZW50W2tleV0gPSB2YWx1ZTtcblx0XHRcdH1cblx0XHR9O1xuXHR9KTtcblxuXHRwcm9wZXJ0aWVzLmN1cnJlbnRUYXJnZXQgPSB7XG5cdFx0Z2V0OiBjdXJyZW50VGFyZ2V0R2V0dGVyXG5cdH07XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGNhdEV2ZW50LCBwcm9wZXJ0aWVzKTtcblx0T2JqZWN0LnNlYWwoY2F0RXZlbnQpO1xuXHRPYmplY3QuZnJlZXplKGNhdEV2ZW50KTtcblx0cmV0dXJuIGNhdEV2ZW50O1xufSIsIi8qXG4gKiBjYXRiZXJyeVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNCBEZW5pcyBSZWNoa3Vub3YgYW5kIHByb2plY3QgY29udHJpYnV0b3JzLlxuICpcbiAqIGNhdGJlcnJ5J3MgbGljZW5zZSBmb2xsb3dzOlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXG4gKiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvblxuICogZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLFxuICogaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSxcbiAqIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsXG4gKiBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuICogc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbiAqIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1NcbiAqIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICpcbiAqIFRoaXMgbGljZW5zZSBhcHBsaWVzIHRvIGFsbCBwYXJ0cyBvZiBjYXRiZXJyeSB0aGF0IGFyZSBub3QgZXh0ZXJuYWxseVxuICogbWFpbnRhaW5lZCBsaWJyYXJpZXMuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IExvZ2dlcjtcblxudmFyIExFVkVMUyA9IHtcblx0VFJBQ0U6ICd0cmFjZScsXG5cdElORk86ICdpbmZvJyxcblx0V0FSTjogJ3dhcm4nLFxuXHRFUlJPUjogJ2Vycm9yJyxcblx0RkFUQUw6ICdmYXRhbCdcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBicm93c2VyIGxvZ2dlci5cbiAqIEBwYXJhbSB7T2JqZWN0fHN0cmluZ30gbGV2ZWxzIExldmVscyB0byBsb2cuXG4gKiBAc3VwcG9ydGVkIENocm9tZSwgRmlyZWZveD49Mi4wLCBJbnRlcm5ldCBFeHBsb3Jlcj49OCwgT3BlcmEsIFNhZmFyaS5cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBMb2dnZXIobGV2ZWxzKSB7XG5cdGlmICh0eXBlb2YgKGxldmVscykgPT09ICdvYmplY3QnKSB7XG5cdFx0dGhpcy5fbGV2ZWxzID0gbGV2ZWxzO1xuXHR9XG5cblx0aWYgKHR5cGVvZihsZXZlbHMpID09PSAnc3RyaW5nJykge1xuXHRcdHRoaXMuX2xldmVscyA9IHt9O1xuXHRcdE9iamVjdC5rZXlzKExFVkVMUylcblx0XHRcdC5mb3JFYWNoKGZ1bmN0aW9uIChsZXZlbCkge1xuXHRcdFx0XHR0aGlzLl9sZXZlbHNbTEVWRUxTW2xldmVsXV0gPVxuXHRcdFx0XHRcdChsZXZlbHMuc2VhcmNoKExFVkVMU1tsZXZlbF0pICE9PSAtMSk7XG5cdFx0XHR9LCB0aGlzKTtcblx0fVxuXG5cdHRoaXMudHJhY2UgPSB0aGlzLnRyYWNlLmJpbmQodGhpcyk7XG5cdHRoaXMuaW5mbyA9IHRoaXMuaW5mby5iaW5kKHRoaXMpO1xuXHR0aGlzLndhcm4gPSB0aGlzLndhcm4uYmluZCh0aGlzKTtcblx0dGhpcy5lcnJvciA9IHRoaXMuZXJyb3IuYmluZCh0aGlzKTtcblx0dGhpcy5mYXRhbCA9IHRoaXMuZmF0YWwuYmluZCh0aGlzKTtcbn1cblxuLyoqXG4gKiBDdXJyZW50IGxldmVscyBvZiBsb2dnaW5nLlxuICogQHR5cGUge09iamVjdH1cbiAqIEBwcml2YXRlXG4gKi9cbkxvZ2dlci5wcm90b3R5cGUuX2xldmVscyA9IHtcblx0dHJhY2U6IHRydWUsXG5cdGluZm86IHRydWUsXG5cdHdhcm46IHRydWUsXG5cdGVycm9yOiB0cnVlLFxuXHRmYXRhbDogdHJ1ZVxufTtcblxuLyoqXG4gKiBMb2dzIHRyYWNlIG1lc3NhZ2UuXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSBUcmFjZSBtZXNzYWdlLlxuICovXG5Mb2dnZXIucHJvdG90eXBlLnRyYWNlID0gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcblx0aWYgKCF0aGlzLl9sZXZlbHMudHJhY2UpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRpZiAoY29uc29sZS5sb2cpIHtcblx0XHRjb25zb2xlLmxvZyhtZXNzYWdlKTtcblx0fVxufTtcblxuLyoqXG4gKiBMb2dzIGluZm8gbWVzc2FnZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIEluZm9ybWF0aW9uIG1lc3NhZ2UuXG4gKi9cbkxvZ2dlci5wcm90b3R5cGUuaW5mbyA9IGZ1bmN0aW9uIChtZXNzYWdlKSB7XG5cdGlmICghdGhpcy5fbGV2ZWxzLmluZm8pIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRpZiAoY29uc29sZS5pbmZvKSB7XG5cdFx0Y29uc29sZS5pbmZvKG1lc3NhZ2UpO1xuXHR9XG59O1xuXG4vKipcbiAqIExvZ3Mgd2FybiBtZXNzYWdlLlxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgV2FybmluZyBtZXNzYWdlLlxuICovXG5Mb2dnZXIucHJvdG90eXBlLndhcm4gPSBmdW5jdGlvbiAobWVzc2FnZSkge1xuXHRpZiAoIXRoaXMuX2xldmVscy53YXJuKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0aWYgKGNvbnNvbGUud2Fybikge1xuXHRcdGNvbnNvbGUud2FybihtZXNzYWdlKTtcblx0fVxufTtcbi8qKlxuICogTG9ncyBlcnJvciBtZXNzYWdlLlxuICogQHBhcmFtIHtzdHJpbmd8RXJyb3J9IGVycm9yIEVycm9yIG9iamVjdCBvciBtZXNzYWdlLlxuICovXG5Mb2dnZXIucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24gKGVycm9yKSB7XG5cdGlmICghdGhpcy5fbGV2ZWxzLmVycm9yKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0d3JpdGVFcnJvcihlcnJvcik7XG59O1xuXG4vKipcbiAqIExvZ3MgZXJyb3IgbWVzc2FnZS5cbiAqIEBwYXJhbSB7c3RyaW5nfEVycm9yfSBlcnJvciBFcnJvciBvYmplY3Qgb3IgbWVzc2FnZS5cbiAqL1xuTG9nZ2VyLnByb3RvdHlwZS5mYXRhbCA9IGZ1bmN0aW9uIChlcnJvcikge1xuXHRpZiAoIXRoaXMuX2xldmVscy5mYXRhbCkge1xuXHRcdHJldHVybjtcblx0fVxuXHR3cml0ZUVycm9yKGVycm9yKTtcbn07XG5cbi8qKlxuICogV3JpdGVzIGVycm9yIHRvIGNvbnNvbGUuXG4gKiBAcGFyYW0ge0Vycm9yfHN0cmluZ30gZXJyb3IgRXJyb3IgdG8gd3JpdGUuXG4gKi9cbmZ1bmN0aW9uIHdyaXRlRXJyb3IoZXJyb3IpIHtcblx0dHJ5IHtcblx0XHRpZiAoIShlcnJvciBpbnN0YW5jZW9mIEVycm9yKSkge1xuXHRcdFx0ZXJyb3IgPSB0eXBlb2YoZXJyb3IpID09PSAnc3RyaW5nJyA/IG5ldyBFcnJvcihlcnJvcikgOiBuZXcgRXJyb3IoKTtcblx0XHR9XG5cdFx0aWYgKGNvbnNvbGUuZXJyb3IpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuXHRcdH1cblx0fSBjYXRjaCAoZSkge1xuXHRcdHdyaXRlRXJyb3IoZSk7XG5cdH1cbn0iLCIvKlxuICogY2F0YmVycnlcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgRGVuaXMgUmVjaGt1bm92IGFuZCBwcm9qZWN0IGNvbnRyaWJ1dG9ycy5cbiAqXG4gKiBjYXRiZXJyeSdzIGxpY2Vuc2UgZm9sbG93czpcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvblxuICogb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb25cbiAqIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbixcbiAqIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsXG4gKiBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLFxuICogYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbiAqIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4gKiBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4gKiBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqXG4gKiBUaGlzIGxpY2Vuc2UgYXBwbGllcyB0byBhbGwgcGFydHMgb2YgY2F0YmVycnkgdGhhdCBhcmUgbm90IGV4dGVybmFsbHlcbiAqIG1haW50YWluZWQgbGlicmFyaWVzLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBSZXF1ZXN0Um91dGVyO1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWwnKSxcblx0VVJJID0gcmVxdWlyZSgnY2F0YmVycnktdXJpJykuVVJJO1xuXG52YXIgTU9VU0VfS0VZUyA9IHtcblx0XHRMRUZUOiAwLFxuXHRcdE1JRERMRTogMVxuXHR9LFxuXG5cdEhSRUZfQVRUUklCVVRFX05BTUUgPSAnaHJlZicsXG5cdFRBUkdFVF9BVFRSSUJVVEVfTkFNRSA9ICd0YXJnZXQnLFxuXHRBX1RBR19OQU1FID0gJ0EnLFxuXHRCT0RZX1RBR19OQU1FID0gJ0JPRFknO1xuXG4vKipcbiAqIENyZWF0ZXMgbmV3IGluc3RhbmNlIG9mIHRoZSBicm93c2VyIHJlcXVlc3Qgcm91dGVyLlxuICogQHBhcmFtIHtTZXJ2aWNlTG9jYXRvcn0gJHNlcnZpY2VMb2NhdG9yIFNlcnZpY2UgbG9jYXRvciB0byByZXNvbHZlIHNlcnZpY2VzLlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIFJlcXVlc3RSb3V0ZXIoJHNlcnZpY2VMb2NhdG9yKSB7XG5cdHRoaXMuX2V2ZW50QnVzID0gJHNlcnZpY2VMb2NhdG9yLnJlc29sdmUoJ2V2ZW50QnVzJyk7XG5cdHRoaXMuX3dpbmRvdyA9ICRzZXJ2aWNlTG9jYXRvci5yZXNvbHZlKCd3aW5kb3cnKTtcblx0dGhpcy5fZG9jdW1lbnRSZW5kZXJlciA9ICRzZXJ2aWNlTG9jYXRvci5yZXNvbHZlKCdkb2N1bWVudFJlbmRlcmVyJyk7XG5cdHRoaXMuX3N0YXRlUHJvdmlkZXIgPSAkc2VydmljZUxvY2F0b3IucmVzb2x2ZSgnc3RhdGVQcm92aWRlcicpO1xuXHR0aGlzLl9jb250ZXh0RmFjdG9yeSA9ICRzZXJ2aWNlTG9jYXRvci5yZXNvbHZlKCdjb250ZXh0RmFjdG9yeScpO1xuXG5cdHRoaXMuX2lzSGlzdG9yeVN1cHBvcnRlZCA9IHRoaXMuX3dpbmRvdy5oaXN0b3J5ICYmXG5cdFx0dGhpcy5fd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlIGluc3RhbmNlb2YgRnVuY3Rpb247XG5cdHZhciBzZWxmID0gdGhpcztcblxuXHQvLyBhZGQgZXZlbnQgaGFuZGxlcnNcblx0c2VsZi5fd3JhcERvY3VtZW50KCk7XG5cblx0Ly8gc2V0IGluaXRpYWwgc3RhdGUgZnJvbSBjdXJyZW50IFVSSVxuXHR0aGlzLl9jaGFuZ2VTdGF0ZShuZXcgVVJJKHRoaXMuX3dpbmRvdy5sb2NhdGlvbi50b1N0cmluZygpKSlcblx0XHQuY2F0Y2goZnVuY3Rpb24gKHJlYXNvbikge1xuXHRcdFx0c2VsZi5faGFuZGxlRXJyb3IocmVhc29uKTtcblx0XHR9KTtcbn1cblxuLyoqXG4gKiBDdXJyZW50IGluaXRpYWxpemF0aW9uIGZsYWcuXG4gKiBAdHlwZSB7Ym9vbGVhbn1cbiAqIEBwcml2YXRlXG4gKi9cblJlcXVlc3RSb3V0ZXIucHJvdG90eXBlLl9pc1N0YXRlSW5pdGlhbGl6ZWQgPSBmYWxzZTtcblxuLyoqXG4gKiBDdXJyZW50IHJlZmVycmVyLlxuICogQHR5cGUge1VSSX1cbiAqIEBwcml2YXRlXG4gKi9cblJlcXVlc3RSb3V0ZXIucHJvdG90eXBlLl9yZWZlcnJlciA9ICcnO1xuXG4vKipcbiAqIEN1cnJlbnQgbG9jYXRpb24uXG4gKiBAdHlwZSB7VVJJfVxuICogQHByaXZhdGVcbiAqL1xuUmVxdWVzdFJvdXRlci5wcm90b3R5cGUuX2xvY2F0aW9uID0gbnVsbDtcblxuLyoqXG4gKiBDdXJyZW50IGV2ZW50IGJ1cy5cbiAqIEB0eXBlIHtFdmVudEVtaXR0ZXJ9XG4gKiBAcHJpdmF0ZVxuICovXG5SZXF1ZXN0Um91dGVyLnByb3RvdHlwZS5fZXZlbnRCdXMgPSBudWxsO1xuXG4vKipcbiAqIEN1cnJlbnQgY29udGV4dCBmYWN0b3J5LlxuICogQHR5cGUge0NvbnRleHRGYWN0b3J5fVxuICogQHByaXZhdGVcbiAqL1xuUmVxdWVzdFJvdXRlci5wcm90b3R5cGUuX2NvbnRleHRGYWN0b3J5ID0gbnVsbDtcblxuLyoqXG4gKiBDdXJyZW50IHN0YXRlIHByb3ZpZGVyLlxuICogQHR5cGUge1N0YXRlUHJvdmlkZXJ9XG4gKiBAcHJpdmF0ZVxuICovXG5SZXF1ZXN0Um91dGVyLnByb3RvdHlwZS5fc3RhdGVQcm92aWRlciA9IG51bGw7XG5cbi8qKlxuICogQ3VycmVudCBkb2N1bWVudCByZW5kZXJlci5cbiAqIEB0eXBlIHtEb2N1bWVudFJlbmRlcmVyfVxuICogQHByaXZhdGVcbiAqL1xuUmVxdWVzdFJvdXRlci5wcm90b3R5cGUuX2RvY3VtZW50UmVuZGVyZXIgPSBudWxsO1xuXG4vKipcbiAqIEN1cnJlbnQgYnJvd3NlciB3aW5kb3cuXG4gKiBAdHlwZSB7V2luZG93fVxuICogQHByaXZhdGVcbiAqL1xuUmVxdWVzdFJvdXRlci5wcm90b3R5cGUuX3dpbmRvdyA9IG51bGw7XG5cbi8qKlxuICogVHJ1ZSBpZiBjdXJyZW50IGJyb3dzZXIgc3VwcG9ydHMgaGlzdG9yeSBBUEkuXG4gKiBAdHlwZSB7Ym9vbGVhbn1cbiAqIEBwcml2YXRlXG4gKi9cblJlcXVlc3RSb3V0ZXIucHJvdG90eXBlLl9pc0hpc3RvcnlTdXBwb3J0ZWQgPSBmYWxzZTtcblxuLyoqXG4gKiBSb3V0ZXMgYnJvd3NlciByZW5kZXIgcmVxdWVzdC5cbiAqIEByZXR1cm5zIHtQcm9taXNlfSBQcm9taXNlIGZvciBub3RoaW5nLlxuICovXG5SZXF1ZXN0Um91dGVyLnByb3RvdHlwZS5yb3V0ZSA9IGZ1bmN0aW9uICgpIHtcblx0dmFyIHNlbGYgPSB0aGlzO1xuXHQvLyBiZWNhdXNlIG5vdyBsb2NhdGlvbiB3YXMgbm90IGNoYW5nZSB5ZXQgYW5kXG5cdC8vIGRpZmZlcmVudCBicm93c2VycyBoYW5kbGUgYHBvcHN0YXRlYCBkaWZmZXJlbnRseVxuXHQvLyB3ZSBuZWVkIHRvIGRvIHJvdXRlIGluIG5leHQgaXRlcmF0aW9uIG9mIGV2ZW50IGxvb3Bcblx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG5cdFx0LnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIG5ld0xvY2F0aW9uID0gbmV3IFVSSShzZWxmLl93aW5kb3cubG9jYXRpb24udG9TdHJpbmcoKSksXG5cdFx0XHRcdG5ld0F1dGhvcml0eSA9IG5ld0xvY2F0aW9uLmF1dGhvcml0eSA/XG5cdFx0XHRcdFx0bmV3TG9jYXRpb24uYXV0aG9yaXR5LnRvU3RyaW5nKCkgOiBudWxsLFxuXHRcdFx0XHRjdXJyZW50QXV0aG9yaXR5ID0gc2VsZi5fbG9jYXRpb24uYXV0aG9yaXR5ID9cblx0XHRcdFx0XHRzZWxmLl9sb2NhdGlvbi5hdXRob3JpdHkudG9TdHJpbmcoKSA6IG51bGw7XG5cblx0XHRcdGlmIChuZXdMb2NhdGlvbi5zY2hlbWUgIT09IHNlbGYuX2xvY2F0aW9uLnNjaGVtZSB8fFxuXHRcdFx0XHRuZXdBdXRob3JpdHkgIT09IGN1cnJlbnRBdXRob3JpdHkpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBpZiBvbmx5IFVSSSBmcmFnbWVudCBpcyBjaGFuZ2VkXG5cdFx0XHR2YXIgbmV3UXVlcnkgPSBuZXdMb2NhdGlvbi5xdWVyeSA/XG5cdFx0XHRcdFx0bmV3TG9jYXRpb24ucXVlcnkudG9TdHJpbmcoKSA6IG51bGwsXG5cdFx0XHRcdGN1cnJlbnRRdWVyeSA9IHNlbGYuX2xvY2F0aW9uLnF1ZXJ5ID9cblx0XHRcdFx0XHRzZWxmLl9sb2NhdGlvbi5xdWVyeS50b1N0cmluZygpIDogbnVsbDtcblx0XHRcdGlmIChuZXdMb2NhdGlvbi5wYXRoID09PSBzZWxmLl9sb2NhdGlvbi5wYXRoICYmXG5cdFx0XHRcdG5ld1F1ZXJ5ID09PSBjdXJyZW50UXVlcnkpIHtcblx0XHRcdFx0c2VsZi5fbG9jYXRpb24gPSBuZXdMb2NhdGlvbjtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHNlbGYuX2NoYW5nZVN0YXRlKG5ld0xvY2F0aW9uKTtcblx0XHR9KTtcbn07XG5cbi8qKlxuICogU2V0cyBhcHBsaWNhdGlvbiBzdGF0ZSB0byBzcGVjaWZpZWQgVVJJLlxuICogQHBhcmFtIHtzdHJpbmd9IGxvY2F0aW9uU3RyaW5nIFVSSSB0byBnby5cbiAqIEByZXR1cm5zIHtQcm9taXNlfSBQcm9taXNlIGZvciBub3RoaW5nLlxuICovXG5SZXF1ZXN0Um91dGVyLnByb3RvdHlwZS5nbyA9IGZ1bmN0aW9uIChsb2NhdGlvblN0cmluZykge1xuXHR2YXIgc2VsZiA9IHRoaXM7XG5cdHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuXHRcdC50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciBsb2NhdGlvbiA9IG5ldyBVUkkobG9jYXRpb25TdHJpbmcpO1xuXHRcdFx0bG9jYXRpb24gPSBsb2NhdGlvbi5yZXNvbHZlUmVsYXRpdmUoc2VsZi5fbG9jYXRpb24pO1xuXHRcdFx0bG9jYXRpb25TdHJpbmcgPSBsb2NhdGlvbi50b1N0cmluZygpO1xuXG5cdFx0XHR2YXIgY3VycmVudEF1dGhvcml0eSA9IHNlbGYuX2xvY2F0aW9uLmF1dGhvcml0eSA/XG5cdFx0XHRcdFx0c2VsZi5fbG9jYXRpb24uYXV0aG9yaXR5LnRvU3RyaW5nKCkgOiBudWxsLFxuXHRcdFx0XHRuZXdBdXRob3JpdHkgPSBsb2NhdGlvbi5hdXRob3JpdHkgP1xuXHRcdFx0XHRcdGxvY2F0aW9uLmF1dGhvcml0eS50b1N0cmluZygpIDogbnVsbDtcblxuXHRcdFx0Ly8gd2UgbXVzdCBjaGVjayBpZiB0aGlzIGlzIGFuIGV4dGVybmFsIGxpbmsgYmVmb3JlIG1hcCBVUklcblx0XHRcdC8vIHRvIGludGVybmFsIGFwcGxpY2F0aW9uIHN0YXRlXG5cdFx0XHRpZiAoIXNlbGYuX2lzSGlzdG9yeVN1cHBvcnRlZCB8fFxuXHRcdFx0XHRsb2NhdGlvbi5zY2hlbWUgIT09IHNlbGYuX2xvY2F0aW9uLnNjaGVtZSB8fFxuXHRcdFx0XHRuZXdBdXRob3JpdHkgIT09IGN1cnJlbnRBdXRob3JpdHkpIHtcblx0XHRcdFx0c2VsZi5fd2luZG93LmxvY2F0aW9uLmFzc2lnbihsb2NhdGlvblN0cmluZyk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dmFyIHN0YXRlID0gc2VsZi5fc3RhdGVQcm92aWRlci5nZXRTdGF0ZUJ5VXJpKGxvY2F0aW9uKTtcblx0XHRcdGlmICghc3RhdGUpIHtcblx0XHRcdFx0c2VsZi5fd2luZG93LmxvY2F0aW9uLmFzc2lnbihsb2NhdGlvblN0cmluZyk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0c2VsZi5fd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKHN0YXRlLCAnJywgbG9jYXRpb25TdHJpbmcpO1xuXHRcdFx0cmV0dXJuIHNlbGYucm91dGUoKTtcblx0XHR9KTtcbn07XG5cbi8qKlxuICogQ2hhbmdlcyBjdXJyZW50IGFwcGxpY2F0aW9uIHN0YXRlIHdpdGggbmV3IGxvY2F0aW9uLlxuICogQHBhcmFtIHtVUkl9IG5ld0xvY2F0aW9uIE5ldyBsb2NhdGlvbi5cbiAqIEByZXR1cm5zIHtQcm9taXNlfSBQcm9taXNlIGZvciBub3RoaW5nLlxuICogQHByaXZhdGVcbiAqL1xuUmVxdWVzdFJvdXRlci5wcm90b3R5cGUuX2NoYW5nZVN0YXRlID0gZnVuY3Rpb24gKG5ld0xvY2F0aW9uKSB7XG5cdHZhciBzZWxmID0gdGhpcztcblx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG5cdFx0LnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0c2VsZi5fbG9jYXRpb24gPSBuZXdMb2NhdGlvbjtcblx0XHRcdHZhciBzdGF0ZSA9IHNlbGYuX3N0YXRlUHJvdmlkZXIuZ2V0U3RhdGVCeVVyaShuZXdMb2NhdGlvbiksXG5cdFx0XHRcdHJvdXRpbmdDb250ZXh0ID0gc2VsZi5fY29udGV4dEZhY3RvcnkuY3JlYXRlKHtcblx0XHRcdFx0XHRyZWZlcnJlcjogc2VsZi5fcmVmZXJyZXIgfHwgc2VsZi5fd2luZG93LmRvY3VtZW50LnJlZmVycmVyLFxuXHRcdFx0XHRcdGxvY2F0aW9uOiBzZWxmLl9sb2NhdGlvbixcblx0XHRcdFx0XHR1c2VyQWdlbnQ6IHNlbGYuX3dpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRpZiAoIXNlbGYuX2lzU3RhdGVJbml0aWFsaXplZCkge1xuXHRcdFx0XHRzZWxmLl9pc1N0YXRlSW5pdGlhbGl6ZWQgPSB0cnVlO1xuXHRcdFx0XHRyZXR1cm4gc2VsZi5fZG9jdW1lbnRSZW5kZXJlci5pbml0V2l0aFN0YXRlKFxuXHRcdFx0XHRcdHN0YXRlLCByb3V0aW5nQ29udGV4dFxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoc3RhdGUgPT09IG51bGwpIHtcblx0XHRcdFx0d2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBzZWxmLl9kb2N1bWVudFJlbmRlcmVyXG5cdFx0XHRcdC5yZW5kZXIoc3RhdGUsIHJvdXRpbmdDb250ZXh0KTtcblx0XHR9KVxuXHRcdC50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdHNlbGYuX3JlZmVycmVyID0gc2VsZi5fbG9jYXRpb247XG5cdFx0fSk7XG59O1xuXG4vKipcbiAqIFdyYXBzIGRvY3VtZW50IHdpdGggcmVxdWlyZWQgZXZlbnRzIHRvIHJvdXRlIHJlcXVlc3RzLlxuICogQHByaXZhdGVcbiAqL1xuUmVxdWVzdFJvdXRlci5wcm90b3R5cGUuX3dyYXBEb2N1bWVudCA9IGZ1bmN0aW9uICgpIHtcblx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdGlmICghdGhpcy5faXNIaXN0b3J5U3VwcG9ydGVkKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0dGhpcy5fd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgZnVuY3Rpb24gKCkge1xuXHRcdHNlbGYucm91dGUoKS5jYXRjaChzZWxmLl9oYW5kbGVFcnJvci5iaW5kKHNlbGYpKTtcblx0fSk7XG5cblx0dGhpcy5fd2luZG93LmRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRpZiAoZXZlbnQuZGVmYXVsdFByZXZlbnRlZCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRpZiAoZXZlbnQudGFyZ2V0LnRhZ05hbWUgPT09IEFfVEFHX05BTUUpIHtcblx0XHRcdHNlbGYuX2xpbmtDbGlja0hhbmRsZXIoZXZlbnQsIGV2ZW50LnRhcmdldClcblx0XHRcdFx0LmNhdGNoKHNlbGYuX2hhbmRsZUVycm9yLmJpbmQoc2VsZikpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgbGluayA9IGNsb3Nlc3RMaW5rKGV2ZW50LnRhcmdldCk7XG5cdFx0XHRpZiAoIWxpbmspIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0c2VsZi5fbGlua0NsaWNrSGFuZGxlcihldmVudCwgbGluayk7XG5cdFx0fVxuXHR9KTtcbn07XG5cbi8qKlxuICogSGFuZGxlcyBsaW5rIGNsaWNrIG9uIHRoZSBwYWdlLlxuICogQHBhcmFtIHtFdmVudH0gZXZlbnQgRXZlbnQtcmVsYXRlZCBvYmplY3QuXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgTGluayBlbGVtZW50LlxuICogQHJldHVybnMge1Byb21pc2V9IFByb21pc2UgZm9yIG5vdGhpbmcuXG4gKiBAcHJpdmF0ZVxuICovXG5SZXF1ZXN0Um91dGVyLnByb3RvdHlwZS5fbGlua0NsaWNrSGFuZGxlciA9IGZ1bmN0aW9uIChldmVudCwgZWxlbWVudCkge1xuXHR2YXIgc2VsZiA9IHRoaXM7XG5cdHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuXHRcdC50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciB0YXJnZXRBdHRyaWJ1dGUgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShUQVJHRVRfQVRUUklCVVRFX05BTUUpO1xuXHRcdFx0aWYgKHRhcmdldEF0dHJpYnV0ZSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIGlmIG1pZGRsZSBtb3VzZSBidXR0b24gd2FzIGNsaWNrZWRcblx0XHRcdGlmIChldmVudC5idXR0b24gPT09IE1PVVNFX0tFWVMuTUlERExFKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dmFyIGxvY2F0aW9uU3RyaW5nID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoSFJFRl9BVFRSSUJVVEVfTkFNRSk7XG5cdFx0XHRpZiAoIWxvY2F0aW9uU3RyaW5nKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdGlmIChsb2NhdGlvblN0cmluZ1swXSA9PT0gJyMnKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdHJldHVybiBzZWxmLmdvKGxvY2F0aW9uU3RyaW5nKTtcblx0XHR9KVxuXHRcdC5jYXRjaChmdW5jdGlvbiAocmVhc29uKSB7XG5cdFx0XHRzZWxmLl9oYW5kbGVFcnJvcihyZWFzb24pO1xuXHRcdH0pO1xufTtcblxuLyoqXG4gKiBIYW5kbGVzIGFsbCBlcnJvcnMuXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJvciBFcnJvciB0byBoYW5kbGUuXG4gKiBAcHJpdmF0ZVxuICovXG5SZXF1ZXN0Um91dGVyLnByb3RvdHlwZS5faGFuZGxlRXJyb3IgPSBmdW5jdGlvbiAoZXJyb3IpIHtcblx0dGhpcy5fZXZlbnRCdXMuZW1pdCgnZXJyb3InLCBlcnJvcik7XG59O1xuXG4vKipcbiAqIEZpbmRzIHRoZSBjbG9zZXN0IGFzY2VuZGluZyBcIkFcIiBlbGVtZW50IG5vZGUuXG4gKiBAcGFyYW0ge05vZGV9IGVsZW1lbnQgRE9NIGVsZW1lbnQuXG4gKiBAcmV0dXJucyB7Tm9kZXxudWxsfSBUaGUgY2xvc2VzdCBcIkFcIiBlbGVtZW50IG9yIG51bGwuXG4gKi9cbmZ1bmN0aW9uIGNsb3Nlc3RMaW5rKGVsZW1lbnQpIHtcblx0d2hpbGUoZWxlbWVudCAmJiBlbGVtZW50Lm5vZGVOYW1lICE9PSBBX1RBR19OQU1FICYmXG5cdFx0ZWxlbWVudC5ub2RlTmFtZSAhPT0gQk9EWV9UQUdfTkFNRSkge1xuXHRcdGVsZW1lbnQgPSBlbGVtZW50LnBhcmVudE5vZGU7XG5cdH1cblx0cmV0dXJuIGVsZW1lbnQgJiYgZWxlbWVudC5ub2RlTmFtZSA9PT0gQV9UQUdfTkFNRSA/IGVsZW1lbnQgOiBudWxsO1xufSIsIi8qXG4gKiBjYXRiZXJyeVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNSBEZW5pcyBSZWNoa3Vub3YgYW5kIHByb2plY3QgY29udHJpYnV0b3JzLlxuICpcbiAqIGNhdGJlcnJ5J3MgbGljZW5zZSBmb2xsb3dzOlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXG4gKiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvblxuICogZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLFxuICogaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSxcbiAqIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsXG4gKiBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuICogc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbiAqIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1NcbiAqIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICpcbiAqIFRoaXMgbGljZW5zZSBhcHBsaWVzIHRvIGFsbCBwYXJ0cyBvZiBjYXRiZXJyeSB0aGF0IGFyZSBub3QgZXh0ZXJuYWxseVxuICogbWFpbnRhaW5lZCBsaWJyYXJpZXMuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudExvYWRlcjtcblxudmFyIG1vZHVsZUhlbHBlciA9IHJlcXVpcmUoJy4uLy4uL2xpYi9oZWxwZXJzL21vZHVsZUhlbHBlcicpLFxuXHR1dGlsID0gcmVxdWlyZSgndXRpbCcpLFxuXHRMb2FkZXJCYXNlID0gcmVxdWlyZSgnLi4vLi4vbGliL2Jhc2UvTG9hZGVyQmFzZScpO1xuXG51dGlsLmluaGVyaXRzKENvbXBvbmVudExvYWRlciwgTG9hZGVyQmFzZSk7XG5cbi8qKlxuICogQ3JlYXRlcyBuZXcgaW5zdGFuY2Ugb2YgdGhlIGNvbXBvbmVudCBsb2FkZXIuXG4gKiBAcGFyYW0ge1NlcnZpY2VMb2NhdG9yfSAkc2VydmljZUxvY2F0b3IgTG9jYXRvciB0byByZXNvbHZlIGRlcGVuZGVuY2llcy5cbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgTG9hZGVyQmFzZVxuICovXG5mdW5jdGlvbiBDb21wb25lbnRMb2FkZXIoJHNlcnZpY2VMb2NhdG9yKSB7XG5cdHRoaXMuX3NlcnZpY2VMb2NhdG9yID0gJHNlcnZpY2VMb2NhdG9yO1xuXHR0aGlzLl9ldmVudEJ1cyA9ICRzZXJ2aWNlTG9jYXRvci5yZXNvbHZlKCdldmVudEJ1cycpO1xuXHR0aGlzLl90ZW1wbGF0ZVByb3ZpZGVyID0gJHNlcnZpY2VMb2NhdG9yLnJlc29sdmUoJ3RlbXBsYXRlUHJvdmlkZXInKTtcblx0TG9hZGVyQmFzZS5jYWxsKHRoaXMsICRzZXJ2aWNlTG9jYXRvci5yZXNvbHZlQWxsKCdjb21wb25lbnRUcmFuc2Zvcm0nKSk7XG59XG5cbi8qKlxuICogQ3VycmVudCBldmVudCBidXMuXG4gKiBAdHlwZSB7RXZlbnRFbWl0dGVyfVxuICogQHByaXZhdGVcbiAqL1xuQ29tcG9uZW50TG9hZGVyLnByb3RvdHlwZS5fZXZlbnRCdXMgPSBudWxsO1xuXG4vKipcbiAqIEN1cnJlbnQgc2VydmljZSBsb2NhdG9yLlxuICogQHR5cGUge1NlcnZpY2VMb2NhdG9yfVxuICogQHByaXZhdGVcbiAqL1xuQ29tcG9uZW50TG9hZGVyLnByb3RvdHlwZS5fc2VydmljZUxvY2F0b3IgPSBudWxsO1xuXG4vKipcbiAqIEN1cnJlbnQgdGVtcGxhdGUgcHJvdmlkZXIuXG4gKiBAdHlwZSB7VGVtcGxhdGVQcm92aWRlcn1cbiAqIEBwcml2YXRlXG4gKi9cbkNvbXBvbmVudExvYWRlci5wcm90b3R5cGUuX3RlbXBsYXRlUHJvdmlkZXIgPSBudWxsO1xuXG4vKipcbiAqIEN1cnJlbnQgbWFwIG9mIGxvYWRlZCBjb21wb25lbnRzIGJ5IG5hbWVzLlxuICogQHR5cGUge09iamVjdH0gTWFwIG9mIGNvbXBvbmVudHMgYnkgbmFtZXMuXG4gKiBAcHJpdmF0ZVxuICovXG5Db21wb25lbnRMb2FkZXIucHJvdG90eXBlLl9sb2FkZWRDb21wb25lbnRzID0gbnVsbDtcblxuLyoqXG4gKiBMb2FkcyBjb21wb25lbnRzIHdoZW4gaXQgaXMgaW4gYSBicm93c2VyLlxuICogQHJldHVybnMge1Byb21pc2V9IFByb21pc2UgZm9yIG5vdGhpbmcuXG4gKi9cbkNvbXBvbmVudExvYWRlci5wcm90b3R5cGUubG9hZCA9IGZ1bmN0aW9uICgpIHtcblx0aWYgKHRoaXMuX2xvYWRlZENvbXBvbmVudHMpIHtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuX2xvYWRlZENvbXBvbmVudHMpO1xuXHR9XG5cblx0dGhpcy5fbG9hZGVkQ29tcG9uZW50cyA9IHt9O1xuXG5cdHZhciBzZWxmID0gdGhpcztcblx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG5cdFx0LnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIGNvbXBvbmVudHMgPSBzZWxmLl9zZXJ2aWNlTG9jYXRvci5yZXNvbHZlQWxsKCdjb21wb25lbnQnKSxcblx0XHRcdFx0Y29tcG9uZW50UHJvbWlzZXMgPSBbXTtcblxuXHRcdFx0Ly8gdGhlIGxpc3QgaXMgYSBzdGFjaywgd2Ugc2hvdWxkIHJldmVyc2UgaXRcblx0XHRcdGNvbXBvbmVudHMuZm9yRWFjaChmdW5jdGlvbiAoY29tcG9uZW50KSB7XG5cdFx0XHRcdGNvbXBvbmVudFByb21pc2VzLnVuc2hpZnQoXG5cdFx0XHRcdFx0c2VsZi5fcHJvY2Vzc0NvbXBvbmVudChjb21wb25lbnQpXG5cdFx0XHRcdCk7XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiBQcm9taXNlLmFsbChjb21wb25lbnRQcm9taXNlcyk7XG5cdFx0fSlcblx0XHQudGhlbihmdW5jdGlvbiAoY29tcG9uZW50cykge1xuXHRcdFx0Y29tcG9uZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChjb21wb25lbnQpIHtcblx0XHRcdFx0aWYgKCFjb21wb25lbnQgfHwgdHlwZW9mKGNvbXBvbmVudCkgIT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHNlbGYuX2xvYWRlZENvbXBvbmVudHNbY29tcG9uZW50Lm5hbWVdID0gY29tcG9uZW50O1xuXHRcdFx0fSk7XG5cdFx0XHRzZWxmLl9ldmVudEJ1cy5lbWl0KCdhbGxDb21wb25lbnRzTG9hZGVkJywgY29tcG9uZW50cyk7XG5cdFx0XHRyZXR1cm4gc2VsZi5fbG9hZGVkQ29tcG9uZW50cztcblx0XHR9KTtcbn07XG5cbi8qKlxuICogUHJvY2Vzc2VzIGNvbXBvbmVudCBhbmQgYXBwbHkgcmVxdWlyZWQgb3BlcmF0aW9ucy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb21wb25lbnREZXRhaWxzIExvYWRlZCBjb21wb25lbnQgZGV0YWlscy5cbiAqIEByZXR1cm5zIHtPYmplY3R9IENvbXBvbmVudCBvYmplY3QuXG4gKiBAcHJpdmF0ZVxuICovXG5Db21wb25lbnRMb2FkZXIucHJvdG90eXBlLl9wcm9jZXNzQ29tcG9uZW50ID0gZnVuY3Rpb24gKGNvbXBvbmVudERldGFpbHMpIHtcblx0dmFyIHNlbGYgPSB0aGlzLFxuXHRcdGNvbXBvbmVudCA9IE9iamVjdC5jcmVhdGUoY29tcG9uZW50RGV0YWlscyk7XG5cblx0cmV0dXJuIHRoaXMuX2FwcGx5VHJhbnNmb3Jtcyhjb21wb25lbnQpXG5cdFx0LnRoZW4oZnVuY3Rpb24gKHRyYW5zZm9ybWVkKSB7XG5cdFx0XHRjb21wb25lbnQgPSB0cmFuc2Zvcm1lZDtcblx0XHRcdHNlbGYuX3RlbXBsYXRlUHJvdmlkZXIucmVnaXN0ZXJDb21waWxlZChcblx0XHRcdFx0Y29tcG9uZW50Lm5hbWUsIGNvbXBvbmVudC50ZW1wbGF0ZVNvdXJjZVxuXHRcdFx0KTtcblx0XHRcdGNvbXBvbmVudC50ZW1wbGF0ZSA9IHtcblx0XHRcdFx0cmVuZGVyOiBmdW5jdGlvbiAoZGF0YUNvbnRleHQpIHtcblx0XHRcdFx0XHRyZXR1cm4gc2VsZi5fdGVtcGxhdGVQcm92aWRlci5yZW5kZXIoXG5cdFx0XHRcdFx0XHRjb21wb25lbnQubmFtZSwgZGF0YUNvbnRleHRcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0aWYgKHR5cGVvZihjb21wb25lbnQuZXJyb3JUZW1wbGF0ZVNvdXJjZSkgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdHZhciBlcnJvclRlbXBsYXRlTmFtZSA9IG1vZHVsZUhlbHBlci5nZXROYW1lRm9yRXJyb3JUZW1wbGF0ZShcblx0XHRcdFx0XHRjb21wb25lbnQubmFtZVxuXHRcdFx0XHQpO1xuXHRcdFx0XHRzZWxmLl90ZW1wbGF0ZVByb3ZpZGVyLnJlZ2lzdGVyQ29tcGlsZWQoXG5cdFx0XHRcdFx0ZXJyb3JUZW1wbGF0ZU5hbWUsIGNvbXBvbmVudC5lcnJvclRlbXBsYXRlU291cmNlXG5cdFx0XHRcdCk7XG5cdFx0XHRcdGNvbXBvbmVudC5lcnJvclRlbXBsYXRlID0ge1xuXHRcdFx0XHRcdHJlbmRlcjogZnVuY3Rpb24gKGRhdGFDb250ZXh0KSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gc2VsZi5fdGVtcGxhdGVQcm92aWRlci5yZW5kZXIoXG5cdFx0XHRcdFx0XHRcdGVycm9yVGVtcGxhdGVOYW1lLCBkYXRhQ29udGV4dFxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0XHRzZWxmLl9ldmVudEJ1cy5lbWl0KCdjb21wb25lbnRMb2FkZWQnLCBjb21wb25lbnQpO1xuXHRcdFx0cmV0dXJuIGNvbXBvbmVudDtcblx0XHR9KVxuXHRcdC5jYXRjaChmdW5jdGlvbiAocmVhc29uKSB7XG5cdFx0XHRzZWxmLl9ldmVudEJ1cy5lbWl0KCdlcnJvcicsIHJlYXNvbik7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9KTtcbn07XG5cbi8qKlxuICogR2V0cyBtYXAgb2YgY29tcG9uZW50cyBieSBuYW1lcy5cbiAqIEByZXR1cm5zIHtPYmplY3R9IE1hcCBvZiBjb21wb25lbnRzIGJ5IG5hbWVzLlxuICovXG5Db21wb25lbnRMb2FkZXIucHJvdG90eXBlLmdldENvbXBvbmVudHNCeU5hbWVzID0gZnVuY3Rpb24gKCkge1xuXHRyZXR1cm4gdGhpcy5fbG9hZGVkQ29tcG9uZW50cyB8fCB7fTtcbn07IiwiLypcbiAqIGNhdGJlcnJ5XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE1IERlbmlzIFJlY2hrdW5vdiBhbmQgcHJvamVjdCBjb250cmlidXRvcnMuXG4gKlxuICogY2F0YmVycnkncyBsaWNlbnNlIGZvbGxvd3M6XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb25cbiAqIG9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uXG4gKiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sXG4gKiBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLFxuICogcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSxcbiAqIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4gKiBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuICogaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuICogT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKlxuICogVGhpcyBsaWNlbnNlIGFwcGxpZXMgdG8gYWxsIHBhcnRzIG9mIGNhdGJlcnJ5IHRoYXQgYXJlIG5vdCBleHRlcm5hbGx5XG4gKiBtYWludGFpbmVkIGxpYnJhcmllcy5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gU3RvcmVMb2FkZXI7XG5cbnZhciBtb2R1bGVIZWxwZXIgPSByZXF1aXJlKCcuLi8uLi9saWIvaGVscGVycy9tb2R1bGVIZWxwZXInKSxcblx0dXRpbCA9IHJlcXVpcmUoJ3V0aWwnKSxcblx0TG9hZGVyQmFzZSA9IHJlcXVpcmUoJy4uLy4uL2xpYi9iYXNlL0xvYWRlckJhc2UnKTtcblxudXRpbC5pbmhlcml0cyhTdG9yZUxvYWRlciwgTG9hZGVyQmFzZSk7XG5cbi8qKlxuICogQ3JlYXRlcyBpbnN0YW5jZSBvZiB0aGUgc3RvcmUgbG9hZGVyLlxuICogQHBhcmFtIHtTZXJ2aWNlTG9jYXRvcn0gJHNlcnZpY2VMb2NhdG9yIExvY2F0b3IgdG8gcmVzb2x2ZSBzdG9yZXMuXG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIExvYWRlckJhc2VcbiAqL1xuZnVuY3Rpb24gU3RvcmVMb2FkZXIoJHNlcnZpY2VMb2NhdG9yKSB7XG5cdHRoaXMuX3NlcnZpY2VMb2NhdG9yID0gJHNlcnZpY2VMb2NhdG9yO1xuXHR0aGlzLl9ldmVudEJ1cyA9ICRzZXJ2aWNlTG9jYXRvci5yZXNvbHZlKCdldmVudEJ1cycpO1xuXHRMb2FkZXJCYXNlLmNhbGwodGhpcywgJHNlcnZpY2VMb2NhdG9yLnJlc29sdmVBbGwoJ3N0b3JlVHJhbnNmb3JtJykpO1xufVxuXG4vKipcbiAqIEN1cnJlbnQgZXZlbnQgYnVzLlxuICogQHR5cGUge0V2ZW50RW1pdHRlcn1cbiAqIEBwcml2YXRlXG4gKi9cblN0b3JlTG9hZGVyLnByb3RvdHlwZS5fZXZlbnRCdXMgPSBudWxsO1xuXG4vKipcbiAqIEN1cnJlbnQgc2VydmljZSBsb2NhdG9yLlxuICogQHR5cGUge1NlcnZpY2VMb2NhdG9yfVxuICogQHByaXZhdGVcbiAqL1xuU3RvcmVMb2FkZXIucHJvdG90eXBlLl9zZXJ2aWNlTG9jYXRvciA9IG51bGw7XG5cbi8qKlxuICogQ3VycmVudCBzZXQgb2YgbG9hZGVkIHN0b3Jlcy5cbiAqIEB0eXBlIHtPYmplY3R9XG4gKiBAcHJpdmF0ZVxuICovXG5TdG9yZUxvYWRlci5wcm90b3R5cGUuX2xvYWRlZFN0b3JlcyA9IG51bGw7XG5cbi8qKlxuICogTG9hZHMgYWxsIHN0b3JlcyB3aGVuIGl0IGlzIGluIGEgYnJvd3Nlci5cbiAqIEByZXR1cm5zIHtQcm9taXNlfSBQcm9taXNlIGZvciBub3RoaW5nLlxuICovXG5TdG9yZUxvYWRlci5wcm90b3R5cGUubG9hZCA9IGZ1bmN0aW9uICgpIHtcblx0aWYgKHRoaXMuX2xvYWRlZFN0b3Jlcykge1xuXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5fbG9hZGVkU3RvcmVzKTtcblx0fVxuXG5cdHRoaXMuX2xvYWRlZFN0b3JlcyA9IHt9O1xuXHR2YXIgc2VsZiA9IHRoaXM7XG5cblx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG5cdFx0LnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIHN0b3JlcyA9IHNlbGYuX3NlcnZpY2VMb2NhdG9yLnJlc29sdmVBbGwoJ3N0b3JlJyksXG5cdFx0XHRcdHN0b3JlUHJvbWlzZXMgPSBbXTtcblxuXHRcdFx0Ly8gdGhlIGxpc3QgaXMgYSBzdGFjaywgd2Ugc2hvdWxkIHJldmVyc2UgaXRcblx0XHRcdHN0b3Jlcy5mb3JFYWNoKGZ1bmN0aW9uIChzdG9yZSkge1xuXHRcdFx0XHRzdG9yZVByb21pc2VzLnVuc2hpZnQoXG5cdFx0XHRcdFx0c2VsZi5fZ2V0U3RvcmUoc3RvcmUpXG5cdFx0XHRcdCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0cmV0dXJuIFByb21pc2UuYWxsKHN0b3JlUHJvbWlzZXMpO1xuXHRcdH0pXG5cdFx0LnRoZW4oZnVuY3Rpb24gKHN0b3Jlcykge1xuXHRcdFx0c3RvcmVzLmZvckVhY2goZnVuY3Rpb24gKHN0b3JlKSB7XG5cdFx0XHRcdGlmICghc3RvcmUgfHwgdHlwZW9mKHN0b3JlKSAhPT0gJ29iamVjdCcpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdFx0c2VsZi5fbG9hZGVkU3RvcmVzW3N0b3JlLm5hbWVdID0gc3RvcmU7XG5cdFx0XHR9KTtcblx0XHRcdHNlbGYuX2V2ZW50QnVzLmVtaXQoJ2FsbFN0b3Jlc0xvYWRlZCcsIHNlbGYuX2xvYWRlZFN0b3Jlcyk7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHNlbGYuX2xvYWRlZFN0b3Jlcyk7XG5cdFx0fSk7XG59O1xuXG4vKipcbiAqIEdldHMgdGhlIHN0b3JlIGZyb20gc3RvcmUgZGV0YWlscy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzdG9yZURldGFpbHMgU3RvcmUgZGV0YWlscy5cbiAqIEByZXR1cm5zIHtQcm9taXNlPE9iamVjdD59IFByb21pc2UgZm9yIHN0b3JlLlxuICogQHByaXZhdGVcbiAqL1xuU3RvcmVMb2FkZXIucHJvdG90eXBlLl9nZXRTdG9yZSA9IGZ1bmN0aW9uIChzdG9yZURldGFpbHMpIHtcblx0dmFyIHNlbGYgPSB0aGlzO1xuXHRyZXR1cm4gdGhpcy5fYXBwbHlUcmFuc2Zvcm1zKHN0b3JlRGV0YWlscylcblx0XHQudGhlbihmdW5jdGlvbiAodHJhbnNmb3JtZWQpIHtcblx0XHRcdHNlbGYuX2V2ZW50QnVzLmVtaXQoJ3N0b3JlTG9hZGVkJywgdHJhbnNmb3JtZWQpO1xuXHRcdFx0cmV0dXJuIHRyYW5zZm9ybWVkO1xuXHRcdH0pXG5cdFx0LmNhdGNoKGZ1bmN0aW9uIChyZWFzb24pIHtcblx0XHRcdHNlbGYuX2V2ZW50QnVzLmVtaXQoJ2Vycm9yJywgcmVhc29uKTtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH0pO1xufTtcblxuLyoqXG4gKiBHZXRzIHN0b3JlcyBtYXAgYnkgbmFtZXMuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBNYXAgb2Ygc3RvcmVzIGJ5IG5hbWVzLlxuICovXG5TdG9yZUxvYWRlci5wcm90b3R5cGUuZ2V0U3RvcmVzQnlOYW1lcyA9IGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuIHRoaXMuX2xvYWRlZFN0b3JlcyB8fCB7fTtcbn07IiwiLypcbiAqIGNhdGJlcnJ5XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0IERlbmlzIFJlY2hrdW5vdiBhbmQgcHJvamVjdCBjb250cmlidXRvcnMuXG4gKlxuICogY2F0YmVycnkncyBsaWNlbnNlIGZvbGxvd3M6XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb25cbiAqIG9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uXG4gKiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sXG4gKiBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLFxuICogcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSxcbiAqIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4gKiBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuICogaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuICogT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKlxuICogVGhpcyBsaWNlbnNlIGFwcGxpZXMgdG8gYWxsIHBhcnRzIG9mIGNhdGJlcnJ5IHRoYXQgYXJlIG5vdCBleHRlcm5hbGx5XG4gKiBtYWludGFpbmVkIGxpYnJhcmllcy5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gTW9kdWxlQXBpUHJvdmlkZXI7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgndXRpbCcpLFxuXHRwcm9wZXJ0eUhlbHBlciA9IHJlcXVpcmUoJy4uLy4uL2xpYi9oZWxwZXJzL3Byb3BlcnR5SGVscGVyJyksXG5cdE1vZHVsZUFwaVByb3ZpZGVyQmFzZSA9IHJlcXVpcmUoJy4uLy4uL2xpYi9iYXNlL01vZHVsZUFwaVByb3ZpZGVyQmFzZScpLFxuXHRtb2R1bGVIZWxwZXIgPSByZXF1aXJlKCcuLi8uLi9saWIvaGVscGVycy9tb2R1bGVIZWxwZXInKTtcblxudXRpbC5pbmhlcml0cyhNb2R1bGVBcGlQcm92aWRlciwgTW9kdWxlQXBpUHJvdmlkZXJCYXNlKTtcblxuLyoqXG4gKiBDcmVhdGVzIG5ldyBpbnN0YW5jZSBvZiB0aGUgbW9kdWxlIEFQSSBwcm92aWRlci5cbiAqIEBwYXJhbSB7U2VydmljZUxvY2F0b3J9ICRzZXJ2aWNlTG9jYXRvciBTZXJ2aWNlIGxvY2F0b3JcbiAqIHRvIHJlc29sdmUgZGVwZW5kZW5jaWVzLlxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBNb2R1bGVBcGlQcm92aWRlckJhc2VcbiAqL1xuZnVuY3Rpb24gTW9kdWxlQXBpUHJvdmlkZXIoJHNlcnZpY2VMb2NhdG9yKSB7XG5cdE1vZHVsZUFwaVByb3ZpZGVyQmFzZS5jYWxsKHRoaXMsICRzZXJ2aWNlTG9jYXRvcik7XG5cdHByb3BlcnR5SGVscGVyLmRlZmluZVJlYWRPbmx5KHRoaXMsICdpc0Jyb3dzZXInLCB0cnVlKTtcblx0cHJvcGVydHlIZWxwZXIuZGVmaW5lUmVhZE9ubHkodGhpcywgJ2lzU2VydmVyJywgZmFsc2UpO1xufVxuXG4vKipcbiAqIFJlZGlyZWN0cyBjdXJyZW50IHBhZ2UgdG8gc3BlY2lmaWVkIFVSSS5cbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmlTdHJpbmcgVVJJIHRvIHJlZGlyZWN0LlxuICogQHJldHVybnMge1Byb21pc2V9IFByb21pc2UgZm9yIG5vdGhpbmcuXG4gKi9cbk1vZHVsZUFwaVByb3ZpZGVyLnByb3RvdHlwZS5yZWRpcmVjdCA9IGZ1bmN0aW9uICh1cmlTdHJpbmcpIHtcblx0dmFyIHJlcXVlc3RSb3V0ZXIgPSB0aGlzLmxvY2F0b3IucmVzb2x2ZSgncmVxdWVzdFJvdXRlcicpO1xuXHRyZXR1cm4gcmVxdWVzdFJvdXRlci5nbyh1cmlTdHJpbmcpO1xufTtcblxuLyoqXG4gKiBDbGVhcnMgY3VycmVudCBsb2NhdGlvbiBVUkkncyBmcmFnbWVudC5cbiAqIEByZXR1cm5zIHtQcm9taXNlfSBQcm9taXNlIGZvciBub3RoaW5nLlxuICovXG5Nb2R1bGVBcGlQcm92aWRlci5wcm90b3R5cGUuY2xlYXJGcmFnbWVudCA9IGZ1bmN0aW9uICgpIHtcblx0dmFyIHdpbmRvdyA9IHRoaXMubG9jYXRvci5yZXNvbHZlKCd3aW5kb3cnKSxcblx0XHRwb3NpdGlvbiA9IHdpbmRvdy5kb2N1bWVudC5ib2R5LnNjcm9sbFRvcDtcblx0d2luZG93LmxvY2F0aW9uLmhhc2ggPSAnJztcblx0d2luZG93LmRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wID0gcG9zaXRpb247XG5cdHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbn07IiwiLypcbiAqIGNhdGJlcnJ5XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0IERlbmlzIFJlY2hrdW5vdiBhbmQgcHJvamVjdCBjb250cmlidXRvcnMuXG4gKlxuICogY2F0YmVycnkncyBsaWNlbnNlIGZvbGxvd3M6XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb25cbiAqIG9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uXG4gKiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sXG4gKiBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLFxuICogcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSxcbiAqIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4gKiBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuICogaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuICogT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKlxuICogVGhpcyBsaWNlbnNlIGFwcGxpZXMgdG8gYWxsIHBhcnRzIG9mIGNhdGJlcnJ5IHRoYXQgYXJlIG5vdCBleHRlcm5hbGx5XG4gKiBtYWludGFpbmVkIGxpYnJhcmllcy5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvQm9vdHN0cmFwcGVyJyk7XG4iLCIvKlxuICogY2F0YmVycnlcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgRGVuaXMgUmVjaGt1bm92IGFuZCBwcm9qZWN0IGNvbnRyaWJ1dG9ycy5cbiAqXG4gKiBjYXRiZXJyeSdzIGxpY2Vuc2UgZm9sbG93czpcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvblxuICogb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb25cbiAqIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbixcbiAqIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsXG4gKiBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLFxuICogYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbiAqIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4gKiBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4gKiBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqXG4gKiBUaGlzIGxpY2Vuc2UgYXBwbGllcyB0byBhbGwgcGFydHMgb2YgY2F0YmVycnkgdGhhdCBhcmUgbm90IGV4dGVybmFsbHlcbiAqIG1haW50YWluZWQgbGlicmFyaWVzLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBDb250ZXh0RmFjdG9yeTtcblxudmFyIFVSSSA9IHJlcXVpcmUoJ2NhdGJlcnJ5LXVyaScpLlVSSSxcblx0cHJvcGVydHlIZWxwZXIgPSByZXF1aXJlKCcuL2hlbHBlcnMvcHJvcGVydHlIZWxwZXInKTtcblxuLyoqXG4gKiBDcmVhdGVzIG5ldyBpbnN0YW5jZSBvZiB0aGUgY29udGV4dCBmYWN0b3J5LlxuICogQHBhcmFtIHtTZXJ2aWNlTG9jYXRvcn0gJHNlcnZpY2VMb2NhdG9yIExvY2F0b3IgdG8gcmVzb2x2ZSBkZXBlbmRlbmNpZXMuXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gQ29udGV4dEZhY3RvcnkoJHNlcnZpY2VMb2NhdG9yKSB7XG5cdHRoaXMuX3NlcnZpY2VMb2NhdG9yID0gJHNlcnZpY2VMb2NhdG9yO1xufVxuXG4vKipcbiAqIEN1cnJlbnQgc2VydmljZSBsb2NhdG9yLlxuICogQHR5cGUge1NlcnZpY2VMb2NhdG9yfVxuICogQHByaXZhdGVcbiAqL1xuQ29udGV4dEZhY3RvcnkucHJvdG90eXBlLl9zZXJ2aWNlTG9jYXRvciA9IG51bGw7XG5cbi8qKlxuICogQ3JlYXRlcyBuZXcgY29udGV4dCBmb3IgbW9kdWxlcy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBhZGRpdGlvbmFsIEFkZGl0aW9uYWwgcGFyYW1ldGVycy5cbiAqIEBwYXJhbSB7VVJJfSBhZGRpdGlvbmFsLnJlZmVycmVyIEN1cnJlbnQgcmVmZXJyZXIuXG4gKiBAcGFyYW0ge1VSSX0gYWRkaXRpb25hbC5sb2NhdGlvbiBDdXJyZW50IGxvY2F0aW9uLlxuICogQHBhcmFtIHtTdHJpbmd9IGFkZGl0aW9uYWwudXNlckFnZW50IEN1cnJlbnQgdXNlciBhZ2VudC5cbiAqL1xuQ29udGV4dEZhY3RvcnkucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uIChhZGRpdGlvbmFsKSB7XG5cdHZhciBhcGlQcm92aWRlciA9IHRoaXMuX3NlcnZpY2VMb2NhdG9yLnJlc29sdmUoJ21vZHVsZUFwaVByb3ZpZGVyJyksXG5cdFx0Y29udGV4dCA9IE9iamVjdC5jcmVhdGUoYXBpUHJvdmlkZXIpO1xuXHRPYmplY3Qua2V5cyhhZGRpdGlvbmFsKVxuXHRcdC5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRcdHByb3BlcnR5SGVscGVyLmRlZmluZVJlYWRPbmx5KGNvbnRleHQsIGtleSwgYWRkaXRpb25hbFtrZXldKTtcblx0XHR9KTtcblx0cmV0dXJuIGNvbnRleHQ7XG59OyIsIi8qXG4gKiBjYXRiZXJyeVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNSBEZW5pcyBSZWNoa3Vub3YgYW5kIHByb2plY3QgY29udHJpYnV0b3JzLlxuICpcbiAqIGNhdGJlcnJ5J3MgbGljZW5zZSBmb2xsb3dzOlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXG4gKiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvblxuICogZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLFxuICogaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSxcbiAqIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsXG4gKiBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuICogc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbiAqIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1NcbiAqIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICpcbiAqIFRoaXMgbGljZW5zZSBhcHBsaWVzIHRvIGFsbCBwYXJ0cyBvZiBjYXRiZXJyeSB0aGF0IGFyZSBub3QgZXh0ZXJuYWxseVxuICogbWFpbnRhaW5lZCBsaWJyYXJpZXMuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNlcmlhbFdyYXBwZXI7XG5cbnZhciBldmVudHMgPSByZXF1aXJlKCdldmVudHMnKTtcblxudmFyIEVSUk9SX05PX1NVQ0hfTUVUSE9EID0gJ1RoZXJlIGlzIG5vIHN1Y2ggcmVnaXN0ZXJlZCBtZXRob2QnO1xuXG4vKipcbiAqIENyZWF0ZXMgbmV3IGluc3RhbmNlIG9mIHRoZSBzZXJpYWwgd3JhcHBlciBmb3IgcHJvbWlzZXMuXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gU2VyaWFsV3JhcHBlcigpIHtcblx0dGhpcy5fZW1pdHRlciA9IG5ldyBldmVudHMuRXZlbnRFbWl0dGVyKCk7XG5cdHRoaXMuX2VtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKDApO1xuXHR0aGlzLl90b0ludm9rZSA9IHt9O1xuXHR0aGlzLl9pblByb2dyZXNzID0ge307XG59XG5cbi8qKlxuICogQ3VycmVudCBldmVudCBlbWl0dGVyLlxuICogQHR5cGUge0V2ZW50RW1pdHRlcn1cbiAqIEBwcml2YXRlXG4gKi9cblNlcmlhbFdyYXBwZXIucHJvdG90eXBlLl9lbWl0dGVyID0gbnVsbDtcblxuLyoqXG4gKiBDdXJyZW50IHNldCBvZiBuYW1lZCBtZXRob2RzIHRvIGludm9rZS5cbiAqIEB0eXBlIHtPYmplY3R9XG4gKiBAcHJpdmF0ZVxuICovXG5TZXJpYWxXcmFwcGVyLnByb3RvdHlwZS5fdG9JbnZva2UgPSBudWxsO1xuXG4vKipcbiAqIEN1cnJlbnQgc2V0IG9mIGZsYWdzIGlmIHRoZSBtZXRob2QgaXMgaW4gcHJvZ3Jlc3MuXG4gKiBAdHlwZSB7T2JqZWN0fVxuICogQHByaXZhdGVcbiAqL1xuU2VyaWFsV3JhcHBlci5wcm90b3R5cGUuX2luUHJvZ3Jlc3MgPSBudWxsO1xuXG4vKipcbiAqIEFkZHMgbWV0aG9kIHRvIHRoZSBzZXQuXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBNZXRob2QgbmFtZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHRvSW52b2tlIEZ1bmN0aW9uIHRoYXQgcmV0dXJucyBwcm9taXNlLlxuICovXG5TZXJpYWxXcmFwcGVyLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAobmFtZSwgdG9JbnZva2UpIHtcblx0dGhpcy5fdG9JbnZva2VbbmFtZV0gPSB0b0ludm9rZTtcbn07XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIG1ldGhvZCB3aXRoIHN1Y2ggbmFtZSB3YXMgcmVnaXN0ZXJlZCB0byB0aGUgc2V0LlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgTmFtZSBvZiBtZXRob2QuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiBtZXRob2QgbmFtZSBpcyByZWdpc3RlcmVkLlxuICovXG5TZXJpYWxXcmFwcGVyLnByb3RvdHlwZS5pc1JlZ2lzdGVyZWQgPSBmdW5jdGlvbiAobmFtZSkge1xuXHRyZXR1cm4gdHlwZW9mKHRoaXMuX3RvSW52b2tlW25hbWVdKSA9PT0gJ2Z1bmN0aW9uJztcbn07XG5cbi8qKlxuICogSW52b2tlcyBtZXRob2Qgd2l0aG91dCBjb25jdXJyZW5jeS5cbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIE1ldGhvZCBuYW1lLlxuICogQHJldHVybnMge1Byb21pc2U8T2JqZWN0Pn0gUHJvbWlzZSBmb3IgcmVzdWx0LlxuICovXG5TZXJpYWxXcmFwcGVyLnByb3RvdHlwZS5pbnZva2UgPSBmdW5jdGlvbiAobmFtZSkge1xuXHR2YXIgc2VsZiA9IHRoaXM7XG5cblx0aWYgKCF0aGlzLmlzUmVnaXN0ZXJlZChuYW1lKSkge1xuXHRcdHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoRVJST1JfTk9fU1VDSF9NRVRIT0QpKTtcblx0fVxuXG5cdGlmICh0aGlzLl9pblByb2dyZXNzW25hbWVdKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlIChmdW5jdGlvbiAoZnVsZmlsbCwgcmVqZWN0KSB7XG5cdFx0XHRzZWxmLl9lbWl0dGVyLm9uY2UobmFtZSwgZnVsZmlsbCk7XG5cdFx0XHRzZWxmLl9lbWl0dGVyLm9uY2UobmFtZSArICctLWVycm9yJywgcmVqZWN0KTtcblx0XHR9KTtcblx0fVxuXG5cdHRoaXMuX2luUHJvZ3Jlc3NbbmFtZV0gPSB0cnVlO1xuXHR0aGlzLl90b0ludm9rZVtuYW1lXSgpXG5cdFx0LnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuXHRcdFx0c2VsZi5fZW1pdHRlci5lbWl0KG5hbWUsIHJlc3VsdCk7XG5cdFx0XHRzZWxmLl9pblByb2dyZXNzW25hbWVdID0gbnVsbDtcblx0XHR9KVxuXHRcdC5jYXRjaChmdW5jdGlvbiAocmVhc29uKSB7XG5cdFx0XHRzZWxmLl9lbWl0dGVyLmVtaXQobmFtZSArICctLWVycm9yJywgcmVhc29uKTtcblx0XHRcdHNlbGYuX2luUHJvZ3Jlc3NbbmFtZV0gPSBudWxsO1xuXHRcdH0pO1xuXG5cdHJldHVybiB0aGlzLmludm9rZShuYW1lKTtcbn07IiwiLypcbiAqIGNhdGJlcnJ5XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE1IERlbmlzIFJlY2hrdW5vdiBhbmQgcHJvamVjdCBjb250cmlidXRvcnMuXG4gKlxuICogY2F0YmVycnkncyBsaWNlbnNlIGZvbGxvd3M6XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb25cbiAqIG9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uXG4gKiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sXG4gKiBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLFxuICogcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSxcbiAqIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4gKiBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuICogaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuICogT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKlxuICogVGhpcyBsaWNlbnNlIGFwcGxpZXMgdG8gYWxsIHBhcnRzIG9mIGNhdGJlcnJ5IHRoYXQgYXJlIG5vdCBleHRlcm5hbGx5XG4gKiBtYWludGFpbmVkIGxpYnJhcmllcy5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gU3RvcmVEaXNwYXRjaGVyO1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWwnKSxcblx0U2VyaWFsV3JhcHBlciA9IHJlcXVpcmUoJy4vU2VyaWFsV3JhcHBlcicpLFxuXHRtb2R1bGVIZWxwZXIgPSByZXF1aXJlKCcuL2hlbHBlcnMvbW9kdWxlSGVscGVyJyk7XG5cbnZhciBFUlJPUl9TVE9SRV9OT1RfRk9VTkQgPSAnU3RvcmUgXCIlc1wiIG5vdCBmb3VuZCcsXG5cdEVSUk9SX1NUQVRFID0gJ1N0YXRlIHNob3VsZCBiZSBzZXQgYmVmb3JlIGFueSByZXF1ZXN0Jyxcblx0REVGQVVMVF9MSUZFVElNRSA9IDYwMDAwO1xuXG4vKipcbiAqIENyZWF0ZXMgbmV3IGluc3RhbmNlIG9mIHN0b3JlIGRpc3BhdGNoZXIuXG4gKiBAcGFyYW0ge1NlcnZpY2VMb2NhdG9yfSAkc2VydmljZUxvY2F0b3IgTG9jYXRvciB0byByZXNvbHZlIGRlcGVuZGVuY2llcy5cbiAqIEBwYXJhbSB7U3RvcmVMb2FkZXJ9ICRzdG9yZUxvYWRlciBTdG9yZSBsb2FkZXIgdG8gbG9hZCBzdG9yZXMuXG4gKiBAcGFyYW0ge0V2ZW50RW1pdHRlcn0gJGV2ZW50QnVzIEV2ZW50IGJ1cyB0byBlbWl0IGV2ZW50cy5cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBTdG9yZURpc3BhdGNoZXIoJHNlcnZpY2VMb2NhdG9yLCAkc3RvcmVMb2FkZXIsICRldmVudEJ1cykge1xuXHR0aGlzLl9zZXJ2aWNlTG9jYXRvciA9ICRzZXJ2aWNlTG9jYXRvcjtcblx0dGhpcy5fc3RvcmVMb2FkZXIgPSAkc3RvcmVMb2FkZXI7XG5cdHRoaXMuX2V2ZW50QnVzID0gJGV2ZW50QnVzO1xuXHR0aGlzLl9zdG9yZUluc3RhbmNlcyA9IHt9O1xuXHR0aGlzLl9sYXN0RGF0YSA9IHt9O1xuXHR0aGlzLl9kZXBlbmRlbmNpZXMgPSB7fTtcblx0dGhpcy5fc2VyaWFsV3JhcHBlciA9IG5ldyBTZXJpYWxXcmFwcGVyKCk7XG59XG5cbi8qKlxuICogQ3VycmVudCBzZXJ2aWNlIGxvY2F0b3IuXG4gKiBAdHlwZSB7U2VydmljZUxvY2F0b3J9XG4gKiBAcHJpdmF0ZVxuICovXG5TdG9yZURpc3BhdGNoZXIucHJvdG90eXBlLl9zZXJ2aWNlTG9jYXRvciA9IG51bGw7XG5cbi8qKlxuICogQ3VycmVudCBldmVudCBidXMuXG4gKiBAdHlwZSB7RXZlbnRFbWl0dGVyfVxuICogQHByaXZhdGVcbiAqL1xuU3RvcmVEaXNwYXRjaGVyLnByb3RvdHlwZS5fZXZlbnRCdXMgPSBudWxsO1xuXG4vKipcbiAqIEN1cnJlbnQgc3RvcmUgbG9hZGVyLlxuICogQHR5cGUge1N0b3JlTG9hZGVyfVxuICogQHByaXZhdGVcbiAqL1xuU3RvcmVEaXNwYXRjaGVyLnByb3RvdHlwZS5fc3RvcmVMb2FkZXIgPSBudWxsO1xuXG4vKipcbiAqIEN1cnJlbnQgbWFwIG9mIGFsbCBzdG9yZSBpbnN0YW5jZXMuXG4gKiBAdHlwZSB7bnVsbH1cbiAqIEBwcml2YXRlXG4gKi9cblN0b3JlRGlzcGF0Y2hlci5wcm90b3R5cGUuX3N0b3JlSW5zdGFuY2VzID0gbnVsbDtcblxuLyoqXG4gKiBDdXJyZW50IG1hcCBvZiBsYXN0IGRhdGEgZm9yIGVhY2ggc3RvcmUuXG4gKiBAdHlwZSB7T2JqZWN0fVxuICogQHByaXZhdGVcbiAqL1xuU3RvcmVEaXNwYXRjaGVyLnByb3RvdHlwZS5fbGFzdERhdGEgPSBudWxsO1xuXG4vKipcbiAqIEN1cnJlbnQgbWFwIG9mIGxhc3Qgc3RhdGUgb2Ygc3RvcmUgZGlzcGF0Y2hlci5cbiAqIEB0eXBlIHtPYmplY3R9XG4gKiBAcHJpdmF0ZVxuICovXG5TdG9yZURpc3BhdGNoZXIucHJvdG90eXBlLl9sYXN0U3RhdGUgPSBudWxsO1xuXG4vKipcbiAqIEN1cnJlbnQgc2VyaWFsIHdyYXBwZXIuXG4gKiBAdHlwZSB7U2VyaWFsV3JhcHBlcn1cbiAqIEBwcml2YXRlXG4gKi9cblN0b3JlRGlzcGF0Y2hlci5wcm90b3R5cGUuX3NlcmlhbFdyYXBwZXIgPSBudWxsO1xuXG4vKipcbiAqIEN1cnJlbnQgYmFzaWMgY29udGV4dCBmb3IgYWxsIHN0b3JlIGNvbnRleHRzLlxuICogQHR5cGUge09iamVjdH1cbiAqIEBwcml2YXRlXG4gKi9cblN0b3JlRGlzcGF0Y2hlci5wcm90b3R5cGUuX2N1cnJlbnRCYXNpY0NvbnRleHQgPSBudWxsO1xuXG4vKipcbiAqIEN1cnJlbnQgc2V0IG9mIHN0b3JlIGRlcGVuZGVuY3kgZ3JhcGguXG4gKiBAdHlwZSB7T2JqZWN0fVxuICogQHByaXZhdGVcbiAqL1xuU3RvcmVEaXNwYXRjaGVyLnByb3RvdHlwZS5fZGVwZW5kZW5jaWVzID0gbnVsbDtcblxuLyoqXG4gKiBHZXRzIHN0b3JlIGRhdGEgYW5kIGNyZWF0ZXMgc3RvcmUgaW5zdGFuY2UgaWYgcmVxdWlyZWQuXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RvcmVOYW1lIE5hbWUgb2Ygc3RvcmUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBTdG9yZSdzIGRhdGEuXG4gKi9cblN0b3JlRGlzcGF0Y2hlci5wcm90b3R5cGUuZ2V0U3RvcmVEYXRhID0gZnVuY3Rpb24gKHN0b3JlTmFtZSkge1xuXHRpZiAoIXRoaXMuX2xhc3RTdGF0ZSkge1xuXHRcdHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoRVJST1JfU1RBVEUpKTtcblx0fVxuXHRpZiAodHlwZW9mKHN0b3JlTmFtZSkgIT09ICdzdHJpbmcnKSB7XG5cdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcblx0fVxuXHRpZiAodGhpcy5fbGFzdERhdGEuaGFzT3duUHJvcGVydHkoc3RvcmVOYW1lKSkge1xuXHRcdHZhciBleGlzdFRpbWUgPSBEYXRlLm5vdygpIC0gdGhpcy5fbGFzdERhdGFbc3RvcmVOYW1lXS5jcmVhdGVkQXQ7XG5cdFx0aWYgKGV4aXN0VGltZSA8PSB0aGlzLl9sYXN0RGF0YVtzdG9yZU5hbWVdLmxpZmV0aW1lKSB7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuX2xhc3REYXRhW3N0b3JlTmFtZV0uZGF0YSk7XG5cdFx0fVxuXHRcdGRlbGV0ZSB0aGlzLl9sYXN0RGF0YVtzdG9yZU5hbWVdO1xuXHR9XG5cdHZhciBzZWxmID0gdGhpcyxcblx0XHRsaWZldGltZSA9IERFRkFVTFRfTElGRVRJTUU7XG5cdHNlbGYuX2V2ZW50QnVzLmVtaXQoJ3N0b3JlRGF0YUxvYWQnLCB7bmFtZTogc3RvcmVOYW1lfSk7XG5cdHZhciBzdG9yZSA9IHRoaXMuZ2V0U3RvcmUoc3RvcmVOYW1lKTtcblx0aWYgKCFzdG9yZSkge1xuXHRcdHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXG5cdFx0XHRcdHV0aWwuZm9ybWF0KEVSUk9SX1NUT1JFX05PVF9GT1VORCwgc3RvcmVOYW1lKSlcblx0XHQpO1xuXHR9XG5cdGlmICh0eXBlb2Yoc3RvcmUuJGxpZmV0aW1lKSA9PT0gJ251bWJlcicpIHtcblx0XHRsaWZldGltZSA9IHN0b3JlLiRsaWZldGltZTtcblx0fVxuXHRyZXR1cm4gc2VsZi5fc2VyaWFsV3JhcHBlci5pbnZva2Uoc3RvcmVOYW1lKVxuXHRcdC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG5cdFx0XHRzZWxmLl9sYXN0RGF0YVtzdG9yZU5hbWVdID0ge1xuXHRcdFx0XHRkYXRhOiBkYXRhLFxuXHRcdFx0XHRsaWZldGltZTogbGlmZXRpbWUsXG5cdFx0XHRcdGNyZWF0ZWRBdDogRGF0ZS5ub3coKVxuXHRcdFx0fTtcblx0XHRcdHNlbGYuX2V2ZW50QnVzLmVtaXQoJ3N0b3JlRGF0YUxvYWRlZCcsIHtcblx0XHRcdFx0bmFtZTogc3RvcmVOYW1lLFxuXHRcdFx0XHRkYXRhOiBkYXRhLFxuXHRcdFx0XHRsaWZldGltZTogbGlmZXRpbWVcblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0fSk7XG59O1xuXG4vKipcbiAqIFNlbmRzIGFjdGlvbiB0byBzcGVjaWZpZWQgc3RvcmUgYW5kIHJlc29sdmVzIHByb21pc2VzIGluIHNlcmlhbCBtb2RlLlxuICogQHBhcmFtIHtTdHJpbmd9IHN0b3JlTmFtZSBOYW1lIG9mIHRoZSBzdG9yZS5cbiAqIEBwYXJhbSB7U3RyaW5nfSBhY3Rpb25OYW1lIE5hbWUgb2YgdGhlIGFjdGlvbi5cbiAqIEBwYXJhbSB7T2JqZWN0fSBhcmdzIEFjdGlvbiBhcmd1bWVudHMuXG4gKiBAcmV0dXJucyB7UHJvbWlzZTwqPn0gUHJvbWlzZSBmb3IgYWN0aW9uIGhhbmRsaW5nIHJlc3VsdC5cbiAqL1xuU3RvcmVEaXNwYXRjaGVyLnByb3RvdHlwZS5zZW5kQWN0aW9uID0gZnVuY3Rpb24gKHN0b3JlTmFtZSwgYWN0aW9uTmFtZSwgYXJncykge1xuXHRpZiAoIXRoaXMuX2xhc3RTdGF0ZSkge1xuXHRcdHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoRVJST1JfU1RBVEUpKTtcblx0fVxuXHR2YXIgc2VsZiA9IHRoaXMsXG5cdFx0YWN0aW9uRGV0YWlscyA9IHtcblx0XHRcdHN0b3JlTmFtZTogc3RvcmVOYW1lLFxuXHRcdFx0YWN0aW9uTmFtZTogYWN0aW9uTmFtZSxcblx0XHRcdGFyZ3M6IGFyZ3Ncblx0XHR9O1xuXHR0aGlzLl9ldmVudEJ1cy5lbWl0KCdhY3Rpb25TZW5kJywgYWN0aW9uRGV0YWlscyk7XG5cdHZhciBzdG9yZSA9IHRoaXMuZ2V0U3RvcmUoc3RvcmVOYW1lKTtcblx0aWYgKCFzdG9yZSkge1xuXHRcdHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXG5cdFx0XHR1dGlsLmZvcm1hdChFUlJPUl9TVE9SRV9OT1RfRk9VTkQsIHN0b3JlTmFtZSkpXG5cdFx0KTtcblx0fVxuXHR2YXIgaGFuZGxlTWV0aG9kID0gbW9kdWxlSGVscGVyLmdldE1ldGhvZFRvSW52b2tlKFxuXHRcdHN0b3JlLCAnaGFuZGxlJywgYWN0aW9uTmFtZVxuXHQpO1xuXHRyZXR1cm4gbW9kdWxlSGVscGVyLmdldFNhZmVQcm9taXNlKGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gaGFuZGxlTWV0aG9kKGFyZ3MpO1xuXHR9KVxuXHRcdC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcblx0XHRcdHNlbGYuX2V2ZW50QnVzLmVtaXQoJ2FjdGlvblNlbnQnLCBhY3Rpb25EZXRhaWxzKTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fSk7XG59O1xuXG4vKipcbiAqIFNlbmRzIGFjdGlvbiB0byBldmVyeSBzdG9yZSB0aGF0IGhhcyBoYW5kbGUgbWV0aG9kIGZvciBzdWNoIGFjdGlvbi5cbiAqIEBwYXJhbSB7U3RyaW5nfSBhY3Rpb25OYW1lIE5hbWUgb2YgdGhlIGFjdGlvbi5cbiAqIEBwYXJhbSB7T2JqZWN0fSBhcmcgQWN0aW9uIGFyZ3VtZW50cy5cbiAqIEByZXR1cm5zIHtQcm9taXNlPEFycmF5PCo+Pn0gUHJvbWlzZSBmb3IgdGhlIGFjdGlvbiBoYW5kbGluZyByZXN1bHQuXG4gKi9cblN0b3JlRGlzcGF0Y2hlci5wcm90b3R5cGUuc2VuZEJyb2FkY2FzdEFjdGlvbiA9IGZ1bmN0aW9uIChhY3Rpb25OYW1lLCBhcmcpIHtcblx0dmFyIHByb21pc2VzID0gW10sXG5cdFx0c2VsZiA9IHRoaXMsXG5cdFx0c3RvcmVzQnlOYW1lcyA9IHRoaXMuX3N0b3JlTG9hZGVyLmdldFN0b3Jlc0J5TmFtZXMoKSxcblx0XHRtZXRob2ROYW1lID0gbW9kdWxlSGVscGVyLmdldENhbWVsQ2FzZU5hbWUoJ2hhbmRsZScsIGFjdGlvbk5hbWUpO1xuXHRPYmplY3Qua2V5cyhzdG9yZXNCeU5hbWVzKVxuXHRcdC5mb3JFYWNoKGZ1bmN0aW9uIChzdG9yZU5hbWUpIHtcblx0XHRcdHZhciBzdG9yZSA9IHN0b3Jlc0J5TmFtZXNbc3RvcmVOYW1lXSxcblx0XHRcdFx0cHJvdG9NZXRob2QgPSBzdG9yZS5jb25zdHJ1Y3Rvci5wcm90b3R5cGVbbWV0aG9kTmFtZV07XG5cdFx0XHRpZiAodHlwZW9mKHByb3RvTWV0aG9kKSAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHR2YXIgc2VuZEFjdGlvblByb21pc2UgPSBzZWxmLnNlbmRBY3Rpb24oXG5cdFx0XHRcdHN0b3JlLm5hbWUsIGFjdGlvbk5hbWUsICBhcmdcblx0XHRcdCk7XG5cdFx0XHRwcm9taXNlcy5wdXNoKHNlbmRBY3Rpb25Qcm9taXNlKTtcblx0XHR9KTtcblx0cmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbn07XG5cbi8qKlxuICogU2V0cyBuZXcgc3RhdGUgdG8gc3RvcmUgZGlzcGF0Y2hlciBhbmQgaW52b2tlcyBcImNoYW5nZWRcIiBtZXRob2QgZm9yIGFsbFxuICogc3RvcmVzIHdoaWNoIHN0YXRlIGhhdmUgYmVlbiBjaGFuZ2VkLlxuICogQHBhcmFtIHtPYmplY3R9IHBhcmFtZXRlcnMgTWFwIG9mIG5ldyBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtPYmplY3R9IGJhc2ljQ29udGV4dCBCYXNpYyBjb250ZXh0IGZvciBhbGwgc3RvcmVzLlxuICogQHJldHVybnMge0FycmF5PFN0cmluZz59IE5hbWVzIG9mIHN0b3JlcyB0aGF0IGhhdmUgYmVlbiBjaGFuZ2VkLlxuICovXG5TdG9yZURpc3BhdGNoZXIucHJvdG90eXBlLnNldFN0YXRlID0gZnVuY3Rpb24gKHBhcmFtZXRlcnMsIGJhc2ljQ29udGV4dCkge1xuXHRwYXJhbWV0ZXJzID0gcGFyYW1ldGVycyB8fCB7fTtcblx0aWYgKCF0aGlzLl9sYXN0U3RhdGUpIHtcblx0XHR0aGlzLl9jdXJyZW50QmFzaWNDb250ZXh0ID0gYmFzaWNDb250ZXh0O1xuXHRcdHRoaXMuX2xhc3RTdGF0ZSA9IHBhcmFtZXRlcnM7XG5cdFx0cmV0dXJuIFtdO1xuXHR9XG5cblx0Ly8gc29tZSBzdG9yZSdzIHBhcmFtZXRlcnMgY2FuIGJlIHJlbW92ZWQgc2luY2UgbGFzdCB0aW1lXG5cdHZhciBzZWxmID0gdGhpcyxcblx0XHRjaGFuZ2VkID0ge307XG5cblx0T2JqZWN0LmtleXModGhpcy5fbGFzdFN0YXRlKVxuXHRcdC5maWx0ZXIoZnVuY3Rpb24gKHN0b3JlTmFtZSkge1xuXHRcdFx0cmV0dXJuICFwYXJhbWV0ZXJzLmhhc093blByb3BlcnR5KHN0b3JlTmFtZSk7XG5cdFx0fSlcblx0XHQuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuXHRcdFx0Y2hhbmdlZFtuYW1lXSA9IHRydWU7XG5cdFx0fSk7XG5cblx0T2JqZWN0LmtleXMocGFyYW1ldGVycylcblx0XHQuZm9yRWFjaChmdW5jdGlvbiAoc3RvcmVOYW1lKSB7XG5cdFx0XHQvLyBuZXcgcGFyYW1ldGVycyB3ZXJlIHNldCBmb3Igc3RvcmVcblx0XHRcdGlmICghc2VsZi5fbGFzdFN0YXRlLmhhc093blByb3BlcnR5KHN0b3JlTmFtZSkpIHtcblx0XHRcdFx0Y2hhbmdlZFtzdG9yZU5hbWVdID0gdHJ1ZTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBuZXcgYW5kIGxhc3QgcGFyYW1ldGVycyBoYXMgZGlmZmVyZW50IHZhbHVlc1xuXHRcdFx0dmFyIGxhc3RQYXJhbWV0ZXJOYW1lcyA9XG5cdFx0XHRcdFx0T2JqZWN0LmtleXMoc2VsZi5fbGFzdFN0YXRlW3N0b3JlTmFtZV0pLFxuXHRcdFx0XHRjdXJyZW50UGFyYW1ldGVyTmFtZXMgPVxuXHRcdFx0XHRcdE9iamVjdC5rZXlzKHBhcmFtZXRlcnNbc3RvcmVOYW1lXSk7XG5cblx0XHRcdGlmIChjdXJyZW50UGFyYW1ldGVyTmFtZXMubGVuZ3RoICE9PVxuXHRcdFx0XHRsYXN0UGFyYW1ldGVyTmFtZXMubGVuZ3RoKSB7XG5cdFx0XHRcdGNoYW5nZWRbc3RvcmVOYW1lXSA9IHRydWU7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Y3VycmVudFBhcmFtZXRlck5hbWVzLmV2ZXJ5KGZ1bmN0aW9uIChwYXJhbWV0ZXJOYW1lKSB7XG5cdFx0XHRcdGlmIChwYXJhbWV0ZXJzW3N0b3JlTmFtZV1bcGFyYW1ldGVyTmFtZV0gIT09XG5cdFx0XHRcdFx0c2VsZi5fbGFzdFN0YXRlW3N0b3JlTmFtZV1bcGFyYW1ldGVyTmFtZV0pIHtcblx0XHRcdFx0XHRjaGFuZ2VkW3N0b3JlTmFtZV0gPSB0cnVlO1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cdHRoaXMuX2xhc3RTdGF0ZSA9IHBhcmFtZXRlcnM7XG5cdGlmICh0aGlzLl9jdXJyZW50QmFzaWNDb250ZXh0ICE9PSBiYXNpY0NvbnRleHQpIHtcblx0XHR0aGlzLl9jdXJyZW50QmFzaWNDb250ZXh0ID0gYmFzaWNDb250ZXh0O1xuXHRcdE9iamVjdC5rZXlzKHRoaXMuX3N0b3JlSW5zdGFuY2VzKVxuXHRcdFx0LmZvckVhY2goZnVuY3Rpb24gKHN0b3JlTmFtZSkge1xuXHRcdFx0XHRzZWxmLl9zdG9yZUluc3RhbmNlc1tzdG9yZU5hbWVdLiRjb250ZXh0ID1cblx0XHRcdFx0XHRzZWxmLl9nZXRTdG9yZUNvbnRleHQoc3RvcmVOYW1lKTtcblx0XHRcdH0pO1xuXHR9XG5cblx0dmFyIGNoYW5nZWRTdG9yZU5hbWVzID0ge307XG5cdE9iamVjdC5rZXlzKGNoYW5nZWQpXG5cdFx0LmZvckVhY2goZnVuY3Rpb24gKHN0b3JlTmFtZSkge1xuXHRcdFx0dmFyIHN0b3JlID0gc2VsZi5nZXRTdG9yZShzdG9yZU5hbWUpO1xuXHRcdFx0aWYgKCFzdG9yZSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRzdG9yZS4kY29udGV4dC5jaGFuZ2VkKClcblx0XHRcdFx0LmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcblx0XHRcdFx0XHRjaGFuZ2VkU3RvcmVOYW1lc1tuYW1lXSA9IHRydWU7XG5cdFx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cdHRoaXMuX2V2ZW50QnVzLmVtaXQoJ3N0YXRlQ2hhbmdlZCcsIHtcblx0XHRvbGRTdGF0ZTogdGhpcy5fbGFzdFN0YXRlLFxuXHRcdG5ld1N0YXRlOiBwYXJhbWV0ZXJzXG5cdH0pO1xuXHRyZXR1cm4gT2JqZWN0LmtleXMoY2hhbmdlZFN0b3JlTmFtZXMpO1xufTtcblxuLyoqXG4gKiBHZXRzIGNvbnRleHQgZm9yIHN0b3JlIHVzaW5nIGNvbXBvbmVudCdzIGNvbnRleHQgYXMgYSBwcm90b3R5cGUuXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RvcmVOYW1lIE5hbWUgb2Ygc3RvcmUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBTdG9yZSBjb250ZXh0LlxuICogQHByaXZhdGVcbiAqL1xuU3RvcmVEaXNwYXRjaGVyLnByb3RvdHlwZS5fZ2V0U3RvcmVDb250ZXh0ID0gZnVuY3Rpb24gKHN0b3JlTmFtZSkge1xuXHR2YXIgc2VsZiA9IHRoaXMsXG5cdFx0c3RvcmVDb250ZXh0ID0gT2JqZWN0LmNyZWF0ZSh0aGlzLl9jdXJyZW50QmFzaWNDb250ZXh0KTtcblx0c3RvcmVDb250ZXh0Lm5hbWUgPSBzdG9yZU5hbWU7XG5cdHN0b3JlQ29udGV4dC5zdGF0ZSA9IHRoaXMuX2xhc3RTdGF0ZVtzdG9yZU5hbWVdIHx8IHt9O1xuXHRzdG9yZUNvbnRleHQuY2hhbmdlZCA9IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgd2Fsa2VkID0ge30sXG5cdFx0XHRjdXJyZW50LFxuXHRcdFx0dG9DaGFuZ2UgPSBbc3RvcmVOYW1lXTtcblxuXHRcdHdoaWxlICh0b0NoYW5nZS5sZW5ndGggPiAwKSB7XG5cdFx0XHRjdXJyZW50ID0gdG9DaGFuZ2Uuc2hpZnQoKTtcblx0XHRcdGlmICh3YWxrZWQuaGFzT3duUHJvcGVydHkoY3VycmVudCkpIHtcblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cdFx0XHR3YWxrZWRbY3VycmVudF0gPSB0cnVlO1xuXHRcdFx0aWYgKHNlbGYuX2RlcGVuZGVuY2llcy5oYXNPd25Qcm9wZXJ0eShjdXJyZW50KSkge1xuXHRcdFx0XHR0b0NoYW5nZSA9IHRvQ2hhbmdlLmNvbmNhdChcblx0XHRcdFx0XHRPYmplY3Qua2V5cyhzZWxmLl9kZXBlbmRlbmNpZXNbY3VycmVudF0pXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0XHRkZWxldGUgc2VsZi5fbGFzdERhdGFbY3VycmVudF07XG5cdFx0XHRzZWxmLl9ldmVudEJ1cy5lbWl0KCdzdG9yZUNoYW5nZWQnLCBjdXJyZW50KTtcblx0XHR9XG5cdFx0cmV0dXJuIE9iamVjdC5rZXlzKHdhbGtlZCk7XG5cdH07XG5cdHN0b3JlQ29udGV4dC5nZXRTdG9yZURhdGEgPSBmdW5jdGlvbiAoc291cmNlU3RvcmVOYW1lKSB7XG5cdFx0aWYgKHNvdXJjZVN0b3JlTmFtZSA9PT0gc3RvcmVOYW1lKSB7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xuXHRcdH1cblx0XHRyZXR1cm4gc2VsZi5nZXRTdG9yZURhdGEoc291cmNlU3RvcmVOYW1lKTtcblx0fTtcblx0c3RvcmVDb250ZXh0LnNldERlcGVuZGVuY3kgPSBmdW5jdGlvbiAobmFtZSkge1xuXHRcdGlmICghc2VsZi5fZGVwZW5kZW5jaWVzLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG5cdFx0XHRzZWxmLl9kZXBlbmRlbmNpZXNbbmFtZV0gPSB7fTtcblx0XHR9XG5cdFx0c2VsZi5fZGVwZW5kZW5jaWVzW25hbWVdW3N0b3JlTmFtZV0gPSB0cnVlO1xuXHR9O1xuXHRzdG9yZUNvbnRleHQudW5zZXREZXBlbmRlbmN5ID0gZnVuY3Rpb24gKG5hbWUpIHtcblx0XHRpZiAoIXNlbGYuX2RlcGVuZGVuY2llcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRkZWxldGUgc2VsZi5fZGVwZW5kZW5jaWVzW25hbWVdW3N0b3JlTmFtZV07XG5cdH07XG5cdHN0b3JlQ29udGV4dC5zZW5kQWN0aW9uID0gZnVuY3Rpb24gKHN0b3JlTmFtZSwgbmFtZSwgYXJncykge1xuXHRcdHJldHVybiBzZWxmLnNlbmRBY3Rpb24oc3RvcmVOYW1lLCBuYW1lLCBhcmdzKTtcblx0fTtcblx0c3RvcmVDb250ZXh0LnNlbmRCcm9hZGNhc3RBY3Rpb24gPSBmdW5jdGlvbiAobmFtZSwgYXJncykge1xuXHRcdHJldHVybiBzZWxmLnNlbmRCcm9hZGNhc3RBY3Rpb24obmFtZSwgYXJncyk7XG5cdH07XG5cblx0cmV0dXJuIHN0b3JlQ29udGV4dDtcbn07XG5cbi8qKlxuICogR2V0cyBzdG9yZSBpbnN0YW5jZSBhbmQgY3JlYXRlcyBpdCBpZiByZXF1aXJlZC5cbiAqIEBwYXJhbSB7U3RyaW5nfSBzdG9yZU5hbWUgTmFtZSBvZiBzdG9yZS5cbiAqIEByZXR1cm5zIHtQcm9taXNlPE9iamVjdD59IFByb21pc2UgZm9yIHN0b3JlLlxuICovXG5TdG9yZURpc3BhdGNoZXIucHJvdG90eXBlLmdldFN0b3JlID0gZnVuY3Rpb24gKHN0b3JlTmFtZSkge1xuXHRpZiAoIXN0b3JlTmFtZSkge1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cdHZhciBzdG9yZSA9IHRoaXMuX3N0b3JlSW5zdGFuY2VzW3N0b3JlTmFtZV07XG5cdGlmIChzdG9yZSkge1xuXHRcdHJldHVybiBzdG9yZTtcblx0fVxuXHR2YXIgc2VsZiA9IHRoaXM7XG5cblx0dmFyIHN0b3JlcyA9IHNlbGYuX3N0b3JlTG9hZGVyLmdldFN0b3Jlc0J5TmFtZXMoKSxcblx0XHRjb25maWcgPSBzZWxmLl9zZXJ2aWNlTG9jYXRvci5yZXNvbHZlKCdjb25maWcnKTtcblx0aWYgKCFzdG9yZXMuaGFzT3duUHJvcGVydHkoc3RvcmVOYW1lKSkge1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0dmFyIGNvbnN0cnVjdG9yID0gc3RvcmVzW3N0b3JlTmFtZV0uY29uc3RydWN0b3I7XG5cdGNvbnN0cnVjdG9yLnByb3RvdHlwZS4kY29udGV4dCA9IHNlbGYuX2dldFN0b3JlQ29udGV4dChzdG9yZU5hbWUpO1xuXHRzZWxmLl9zdG9yZUluc3RhbmNlc1tzdG9yZU5hbWVdID0gc2VsZi5fc2VydmljZUxvY2F0b3Jcblx0XHQucmVzb2x2ZUluc3RhbmNlKGNvbnN0cnVjdG9yLCBjb25maWcpO1xuXHRzZWxmLl9zdG9yZUluc3RhbmNlc1tzdG9yZU5hbWVdLiRjb250ZXh0ID0gY29uc3RydWN0b3IucHJvdG90eXBlLiRjb250ZXh0O1xuXG5cdHNlbGYuX3NlcmlhbFdyYXBwZXIuYWRkKHN0b3JlTmFtZSwgZnVuY3Rpb24gKCkge1xuXHRcdHZhciBsb2FkTWV0aG9kID0gbW9kdWxlSGVscGVyLmdldE1ldGhvZFRvSW52b2tlKFxuXHRcdFx0c2VsZi5fc3RvcmVJbnN0YW5jZXNbc3RvcmVOYW1lXSwgJ2xvYWQnXG5cdFx0KTtcblx0XHRyZXR1cm4gbW9kdWxlSGVscGVyLmdldFNhZmVQcm9taXNlKGxvYWRNZXRob2QpO1xuXHR9KTtcblx0cmV0dXJuIHNlbGYuX3N0b3JlSW5zdGFuY2VzW3N0b3JlTmFtZV07XG59OyIsIi8qXG4gKiBjYXRiZXJyeVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNCBEZW5pcyBSZWNoa3Vub3YgYW5kIHByb2plY3QgY29udHJpYnV0b3JzLlxuICpcbiAqIGNhdGJlcnJ5J3MgbGljZW5zZSBmb2xsb3dzOlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXG4gKiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvblxuICogZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLFxuICogaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSxcbiAqIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsXG4gKiBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuICogc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbiAqIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1NcbiAqIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICpcbiAqIFRoaXMgbGljZW5zZSBhcHBsaWVzIHRvIGFsbCBwYXJ0cyBvZiBjYXRiZXJyeSB0aGF0IGFyZSBub3QgZXh0ZXJuYWxseVxuICogbWFpbnRhaW5lZCBsaWJyYXJpZXMuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJvb3RzdHJhcHBlckJhc2U7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgndXRpbCcpLFxuXHRtb2R1bGVIZWxwZXIgPSByZXF1aXJlKCcuLi9oZWxwZXJzL21vZHVsZUhlbHBlcicpLFxuXHR1aHIgPSByZXF1aXJlKCdjYXRiZXJyeS11aHInKSxcblx0UHJvbWlzZSA9IHJlcXVpcmUoJ3Byb21pc2UnKSxcblx0U3RhdGVQcm92aWRlciA9IHJlcXVpcmUoJy4uL3Byb3ZpZGVycy9TdGF0ZVByb3ZpZGVyJyksXG5cdFN0b3JlTG9hZGVyID0gcmVxdWlyZSgnLi4vbG9hZGVycy9TdG9yZUxvYWRlcicpLFxuXHRDb21wb25lbnRMb2FkZXIgPSByZXF1aXJlKCcuLi9sb2FkZXJzL0NvbXBvbmVudExvYWRlcicpLFxuXHREb2N1bWVudFJlbmRlcmVyID0gcmVxdWlyZSgnLi4vRG9jdW1lbnRSZW5kZXJlcicpLFxuXHRSZXF1ZXN0Um91dGVyID0gcmVxdWlyZSgnLi4vUmVxdWVzdFJvdXRlcicpLFxuXHRNb2R1bGVBcGlQcm92aWRlckJhc2UgPSByZXF1aXJlKCcuLi9iYXNlL01vZHVsZUFwaVByb3ZpZGVyQmFzZScpLFxuXHRDb250ZXh0RmFjdG9yeSA9IHJlcXVpcmUoJy4uL0NvbnRleHRGYWN0b3J5JyksXG5cdEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50cycpLkV2ZW50RW1pdHRlcjtcblxudmFyIElORk9fQ09NUE9ORU5UX0xPQURFRCA9ICdDb21wb25lbnQgXCIlc1wiIGxvYWRlZCcsXG5cdElORk9fU1RPUkVfTE9BREVEID0gJ1N0b3JlIFwiJXNcIiBsb2FkZWQnLFxuXHRJTkZPX0FMTF9TVE9SRVNfTE9BREVEID0gJ0FsbCBzdG9yZXMgbG9hZGVkJyxcblx0SU5GT19BTExfQ09NUE9ORU5UU19MT0FERUQgPSAnQWxsIGNvbXBvbmVudHMgbG9hZGVkJyxcblx0SU5GT19ET0NVTUVOVF9SRU5ERVJFRCA9ICdEb2N1bWVudCByZW5kZXJlZCBmb3IgVVJJICVzJyxcblx0VFJBQ0VfUkVOREVSX0NPTVBPTkVOVCA9ICdDb21wb25lbnQgXCIlcyVzXCIgaXMgYmVpbmcgcmVuZGVyZWQuLi4nLFxuXHRUSU1FU1RBTVBfRk9STUFUID0gJyAoJWQgbXMpJyxcblx0VFJBQ0VfQ09NUE9ORU5UX1JFTkRFUkVEID0gJ0NvbXBvbmVudCBcIiVzJXNcIiByZW5kZXJlZCVzJztcblxuLyoqXG4gKiBDcmVhdGVzIG5ldyBpbnN0YW5jZSBvZiBiYXNlIENhdGJlcnJ5IGJvb3RzdHJhcHBlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhdGJlcnJ5Q29uc3RydWN0b3IgQ29uc3RydWN0b3JcbiAqIG9mIHRoZSBDYXRiZXJyeSdzIG1haW4gbW9kdWxlLlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIEJvb3RzdHJhcHBlckJhc2UoY2F0YmVycnlDb25zdHJ1Y3Rvcikge1xuXHR0aGlzLl9jYXRiZXJyeUNvbnN0cnVjdG9yID0gY2F0YmVycnlDb25zdHJ1Y3Rvcjtcbn1cblxuLyoqXG4gKiBDdXJyZW50IGNvbnN0cnVjdG9yIG9mIHRoZSBDYXRiZXJyeSdzIG1haW4gbW9kdWxlLlxuICogQHR5cGUge0Z1bmN0aW9ufVxuICogQHByaXZhdGVcbiAqL1xuQm9vdHN0cmFwcGVyQmFzZS5wcm90b3R5cGUuX2NhdGJlcnJ5Q29uc3RydWN0b3IgPSBudWxsO1xuXG4vKipcbiAqIENyZWF0ZXMgbmV3IGZ1bGwtY29uZmlndXJlZCBpbnN0YW5jZSBvZiB0aGUgQ2F0YmVycnkgYXBwbGljYXRpb24uXG4gKiBAcGFyYW0ge09iamVjdD99IGNvbmZpZ09iamVjdCBDb25maWd1cmF0aW9uIG9iamVjdC5cbiAqIEByZXR1cm5zIHtDYXRiZXJyeX0gQ2F0YmVycnkgYXBwbGljYXRpb24gaW5zdGFuY2UuXG4gKi9cbkJvb3RzdHJhcHBlckJhc2UucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uIChjb25maWdPYmplY3QpIHtcblx0dmFyIGN1cnJlbnRDb25maWcgPSBjb25maWdPYmplY3QgfHwge30sXG5cdFx0Y2F0YmVycnkgPSBuZXcgdGhpcy5fY2F0YmVycnlDb25zdHJ1Y3RvcigpO1xuXG5cdHRoaXMuY29uZmlndXJlKGN1cnJlbnRDb25maWcsIGNhdGJlcnJ5LmxvY2F0b3IpO1xuXHRjYXRiZXJyeS5ldmVudHMgPSBjYXRiZXJyeS5sb2NhdG9yLnJlc29sdmVJbnN0YW5jZShNb2R1bGVBcGlQcm92aWRlckJhc2UpO1xuXHRyZXR1cm4gY2F0YmVycnk7XG59O1xuXG4vKipcbiAqIENvbmZpZ3VyZXMgbG9jYXRvciB3aXRoIGFsbCByZXF1aXJlZCB0eXBlIHJlZ2lzdHJhdGlvbnMuXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnT2JqZWN0IENvbmZpZ3VyYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHtTZXJ2aWNlTG9jYXRvcn0gbG9jYXRvciBTZXJ2aWNlIGxvY2F0b3IgdG8gY29uZmlndXJlLlxuICovXG5Cb290c3RyYXBwZXJCYXNlLnByb3RvdHlwZS5jb25maWd1cmUgPSBmdW5jdGlvbiAoY29uZmlnT2JqZWN0LCBsb2NhdG9yKSB7XG5cdHZhciBldmVudEJ1cyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblx0ZXZlbnRCdXMuc2V0TWF4TGlzdGVuZXJzKDApO1xuXHRsb2NhdG9yLnJlZ2lzdGVySW5zdGFuY2UoJ3Byb21pc2UnLCBQcm9taXNlKTtcblx0bG9jYXRvci5yZWdpc3Rlckluc3RhbmNlKCdldmVudEJ1cycsIGV2ZW50QnVzKTtcblx0bG9jYXRvci5yZWdpc3Rlckluc3RhbmNlKCdjb25maWcnLCBjb25maWdPYmplY3QpO1xuXHRsb2NhdG9yLnJlZ2lzdGVyKCdzdGF0ZVByb3ZpZGVyJywgU3RhdGVQcm92aWRlciwgY29uZmlnT2JqZWN0LCB0cnVlKTtcblx0bG9jYXRvci5yZWdpc3RlcignY29udGV4dEZhY3RvcnknLCBDb250ZXh0RmFjdG9yeSwgY29uZmlnT2JqZWN0LCB0cnVlKTtcblx0bG9jYXRvci5yZWdpc3Rlcignc3RvcmVMb2FkZXInLCBTdG9yZUxvYWRlciwgY29uZmlnT2JqZWN0LCB0cnVlKTtcblx0bG9jYXRvci5yZWdpc3RlcignY29tcG9uZW50TG9hZGVyJywgQ29tcG9uZW50TG9hZGVyLCBjb25maWdPYmplY3QsIHRydWUpO1xuXHRsb2NhdG9yLnJlZ2lzdGVyKCdkb2N1bWVudFJlbmRlcmVyJywgRG9jdW1lbnRSZW5kZXJlciwgY29uZmlnT2JqZWN0LCB0cnVlKTtcblx0bG9jYXRvci5yZWdpc3RlcigncmVxdWVzdFJvdXRlcicsIFJlcXVlc3RSb3V0ZXIsIGNvbmZpZ09iamVjdCwgdHJ1ZSk7XG5cblx0dWhyLnJlZ2lzdGVyKGxvY2F0b3IpO1xufTtcblxuLyoqXG4gKiBXcmFwcyBldmVudCBidXMgd2l0aCBsb2cgbWVzc2FnZXMuXG4gKiBAcGFyYW0ge0V2ZW50RW1pdHRlcn0gZXZlbnRCdXMgRXZlbnQgZW1pdHRlciB0aGF0IGltcGxlbWVudHMgZXZlbnQgYnVzLlxuICogQHBhcmFtIHtMb2dnZXJ9IGxvZ2dlciBMb2dnZXIgdG8gd3JpdGUgbWVzc2FnZXMuXG4gKiBAcHJvdGVjdGVkXG4gKi9cbkJvb3RzdHJhcHBlckJhc2UucHJvdG90eXBlLl93cmFwRXZlbnRzV2l0aExvZ2dlciA9IGZ1bmN0aW9uIChldmVudEJ1cywgbG9nZ2VyKSB7XG5cdGV2ZW50QnVzXG5cdFx0Lm9uKCdjb21wb25lbnRMb2FkZWQnLCBmdW5jdGlvbiAoYXJncykge1xuXHRcdFx0bG9nZ2VyLmluZm8odXRpbC5mb3JtYXQoSU5GT19DT01QT05FTlRfTE9BREVELCBhcmdzLm5hbWUpKTtcblx0XHR9KVxuXHRcdC5vbignc3RvcmVMb2FkZWQnLCBmdW5jdGlvbiAoYXJncykge1xuXHRcdFx0bG9nZ2VyLmluZm8odXRpbC5mb3JtYXQoSU5GT19TVE9SRV9MT0FERUQsIGFyZ3MubmFtZSkpO1xuXHRcdH0pXG5cdFx0Lm9uKCdhbGxTdG9yZXNMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRsb2dnZXIuaW5mbyhJTkZPX0FMTF9TVE9SRVNfTE9BREVEKTtcblx0XHR9KVxuXHRcdC5vbignYWxsQ29tcG9uZW50c0xvYWRlZCcsIGZ1bmN0aW9uICgpIHtcblx0XHRcdGxvZ2dlci5pbmZvKElORk9fQUxMX0NPTVBPTkVOVFNfTE9BREVEKTtcblx0XHR9KVxuXHRcdC5vbignY29tcG9uZW50UmVuZGVyJywgZnVuY3Rpb24gKGFyZ3MpIHtcblx0XHRcdHZhciBpZCA9IGFyZ3MuY29udGV4dC5cblx0XHRcdFx0XHRhdHRyaWJ1dGVzW21vZHVsZUhlbHBlci5BVFRSSUJVVEVfSURdO1xuXHRcdFx0bG9nZ2VyLnRyYWNlKHV0aWwuZm9ybWF0KFRSQUNFX1JFTkRFUl9DT01QT05FTlQsXG5cdFx0XHRcdG1vZHVsZUhlbHBlci5nZXRUYWdOYW1lRm9yQ29tcG9uZW50TmFtZShhcmdzLm5hbWUpLFxuXHRcdFx0XHRpZCA/ICcjJyArIGlkIDogJydcblx0XHRcdCkpO1xuXHRcdH0pXG5cdFx0Lm9uKCdjb21wb25lbnRSZW5kZXJlZCcsIGZ1bmN0aW9uIChhcmdzKSB7XG5cdFx0XHR2YXIgaWQgPSBhcmdzLmNvbnRleHQuXG5cdFx0XHRcdFx0YXR0cmlidXRlc1ttb2R1bGVIZWxwZXIuQVRUUklCVVRFX0lEXTtcblx0XHRcdGxvZ2dlci50cmFjZSh1dGlsLmZvcm1hdChcblx0XHRcdFx0VFJBQ0VfQ09NUE9ORU5UX1JFTkRFUkVELFxuXHRcdFx0XHRtb2R1bGVIZWxwZXIuZ2V0VGFnTmFtZUZvckNvbXBvbmVudE5hbWUoYXJncy5uYW1lKSxcblx0XHRcdFx0aWQgPyAnIycgKyBpZCA6ICcnLFxuXHRcdFx0XHR0eXBlb2YoYXJncy50aW1lKSA9PT0gJ251bWJlcicgP1xuXHRcdFx0XHRcdHV0aWwuZm9ybWF0KFRJTUVTVEFNUF9GT1JNQVQsIGFyZ3MudGltZSkgOiAnJ1xuXHRcdFx0KSk7XG5cdFx0fSlcblx0XHQub24oJ2RvY3VtZW50UmVuZGVyZWQnLCBmdW5jdGlvbiAoYXJncykge1xuXHRcdFx0bG9nZ2VyLmluZm8odXRpbC5mb3JtYXQoXG5cdFx0XHRcdElORk9fRE9DVU1FTlRfUkVOREVSRUQsIGFyZ3MubG9jYXRpb24udG9TdHJpbmcoKVxuXHRcdFx0KSk7XG5cdFx0fSlcblx0XHQub24oJ2Vycm9yJywgZnVuY3Rpb24gKGVycm9yKSB7XG5cdFx0XHRsb2dnZXIuZXJyb3IoZXJyb3IpO1xuXHRcdH0pO1xufTsiLCIvKlxuICogY2F0YmVycnlcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgRGVuaXMgUmVjaGt1bm92IGFuZCBwcm9qZWN0IGNvbnRyaWJ1dG9ycy5cbiAqXG4gKiBjYXRiZXJyeSdzIGxpY2Vuc2UgZm9sbG93czpcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvblxuICogb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb25cbiAqIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbixcbiAqIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsXG4gKiBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLFxuICogYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbiAqIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4gKiBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4gKiBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqXG4gKiBUaGlzIGxpY2Vuc2UgYXBwbGllcyB0byBhbGwgcGFydHMgb2YgY2F0YmVycnkgdGhhdCBhcmUgbm90IGV4dGVybmFsbHlcbiAqIG1haW50YWluZWQgbGlicmFyaWVzLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBDYXRiZXJyeUJhc2U7XG5cbnZhciBTZXJ2aWNlTG9jYXRvciA9IHJlcXVpcmUoJ2NhdGJlcnJ5LWxvY2F0b3InKTtcblxuLyoqXG4gKiBDcmVhdGVzIG5ldyBpbnN0YW5jZSBvZiB0aGUgYmFzaWMgQ2F0YmVycnkgYXBwbGljYXRpb24gbW9kdWxlLlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIENhdGJlcnJ5QmFzZSgpIHtcblx0dGhpcy5sb2NhdG9yID0gbmV3IFNlcnZpY2VMb2NhdG9yKCk7XG5cdHRoaXMubG9jYXRvci5yZWdpc3Rlckluc3RhbmNlKCdzZXJ2aWNlTG9jYXRvcicsIHRoaXMubG9jYXRvcik7XG5cdHRoaXMubG9jYXRvci5yZWdpc3Rlckluc3RhbmNlKCdjYXRiZXJyeScsIHRoaXMpO1xufVxuXG4vKipcbiAqIEN1cnJlbnQgdmVyc2lvbiBvZiBjYXRiZXJyeS5cbiAqL1xuQ2F0YmVycnlCYXNlLnByb3RvdHlwZS52ZXJzaW9uID0gJzUuMC41JztcblxuLyoqXG4gKiBDdXJyZW50IG9iamVjdCB3aXRoIGV2ZW50cy5cbiAqIEB0eXBlIHtNb2R1bGVBcGlQcm92aWRlcn1cbiAqL1xuQ2F0YmVycnlCYXNlLnByb3RvdHlwZS5ldmVudHMgPSBudWxsO1xuXG4vKipcbiAqIEN1cnJlbnQgc2VydmljZSBsb2NhdG9yLlxuICogQHR5cGUge1NlcnZpY2VMb2NhdG9yfVxuICovXG5DYXRiZXJyeUJhc2UucHJvdG90eXBlLmxvY2F0b3IgPSBudWxsOyIsIi8qXG4gKiBjYXRiZXJyeVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNCBEZW5pcyBSZWNoa3Vub3YgYW5kIHByb2plY3QgY29udHJpYnV0b3JzLlxuICpcbiAqIGNhdGJlcnJ5J3MgbGljZW5zZSBmb2xsb3dzOlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXG4gKiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvblxuICogZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLFxuICogaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSxcbiAqIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsXG4gKiBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuICogc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbiAqIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1NcbiAqIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICpcbiAqIFRoaXMgbGljZW5zZSBhcHBsaWVzIHRvIGFsbCBwYXJ0cyBvZiBjYXRiZXJyeSB0aGF0IGFyZSBub3QgZXh0ZXJuYWxseVxuICogbWFpbnRhaW5lZCBsaWJyYXJpZXMuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENvb2tpZVdyYXBwZXJCYXNlO1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWwnKTtcblxuLyoqXG4gKiBDcmVhdGVzIG5ldyBpbnN0YW5jZSBvZiB0aGUgYmFzaWMgY29va2llIHdyYXBwZXIuXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gQ29va2llV3JhcHBlckJhc2UoKSB7XG59XG5cbi8qKlxuICogR2V0cyBtYXAgb2YgY29va2llIHZhbHVlcyBieSBuYW1lLlxuICogQHJldHVybnMge09iamVjdH0gQ29va2llcyBtYXAgYnkgbmFtZXMuXG4gKi9cbkNvb2tpZVdyYXBwZXJCYXNlLnByb3RvdHlwZS5nZXRBbGwgPSBmdW5jdGlvbiAoKSB7XG5cdHZhciBzdHJpbmcgPSB0aGlzLmdldENvb2tpZVN0cmluZygpO1xuXHRyZXR1cm4gdGhpcy5fcGFyc2VDb29raWVTdHJpbmcoc3RyaW5nKTtcbn07XG5cbi8qKlxuICogR2V0cyBjb29raWUgdmFsdWUgYnkgbmFtZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIENvb2tpZSBuYW1lLlxuICogQHJldHVybnMge3N0cmluZ30gQ29va2llIHZhbHVlLlxuICovXG5Db29raWVXcmFwcGVyQmFzZS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKG5hbWUpIHtcblx0aWYgKHR5cGVvZihuYW1lKSAhPT0gJ3N0cmluZycpIHtcblx0XHRyZXR1cm4gJyc7XG5cdH1cblxuXHRyZXR1cm4gdGhpcy5nZXRBbGwoKVtuYW1lXSB8fCAnJztcbn07XG5cbi8qKlxuICogUGFyc2VzIGNvb2tpZSBzdHJpbmcgaW50byBtYXAgb2YgY29va2llIGtleS92YWx1ZSBwYWlycy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgQ29va2llIHN0cmluZy5cbiAqIEByZXR1cm5zIHtPYmplY3R9IE9iamVjdCB3aXRoIGNvb2tpZSB2YWx1ZXMgYnkga2V5cy5cbiAqIEBwcm90ZWN0ZWRcbiAqL1xuQ29va2llV3JhcHBlckJhc2UucHJvdG90eXBlLl9wYXJzZUNvb2tpZVN0cmluZyA9IGZ1bmN0aW9uIChzdHJpbmcpIHtcblx0dmFyIGNvb2tpZSA9IHt9O1xuXG5cdGlmICh0eXBlb2YgKHN0cmluZykgIT09ICdzdHJpbmcnKSB7XG5cdFx0cmV0dXJuIGNvb2tpZTtcblx0fVxuXHRzdHJpbmdcblx0XHQuc3BsaXQoLzsgKi8pXG5cdFx0LmZvckVhY2goZnVuY3Rpb24gKGNvb2tpZVBhaXIpIHtcblx0XHRcdHZhciBlcXVhbHNJbmRleCA9IGNvb2tpZVBhaXIuaW5kZXhPZignPScpO1xuXHRcdFx0aWYgKGVxdWFsc0luZGV4IDwgMCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHZhciBrZXkgPSBjb29raWVQYWlyLnN1YnN0cigwLCBlcXVhbHNJbmRleCkudHJpbSgpLFxuXHRcdFx0XHR2YWx1ZSA9IGNvb2tpZVBhaXIuc3Vic3RyKFxuXHRcdFx0XHRcdGVxdWFsc0luZGV4ICsgMSwgY29va2llUGFpci5sZW5ndGhcblx0XHRcdFx0KS50cmltKCk7XG5cblx0XHRcdHZhbHVlID0gdmFsdWUucmVwbGFjZSgvXlwifFwiJC9nLCAnJyk7XG5cdFx0XHRjb29raWVba2V5XSA9IHZhbHVlO1xuXHRcdH0pO1xuXG5cdHJldHVybiBjb29raWU7XG59O1xuXG4vKipcbiAqIENvbnZlcnRzIGNvb2tpZSBzZXR1cCBvYmplY3QgdG8gY29va2llIHN0cmluZy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb29raWVTZXR1cCBDb29raWUgc2V0dXAgb2JqZWN0LlxuICogQHBhcmFtIHtzdHJpbmd9IGNvb2tpZVNldHVwLmtleSBDb29raWUga2V5LlxuICogQHBhcmFtIHtzdHJpbmd9IGNvb2tpZVNldHVwLnZhbHVlIENvb2tpZSB2YWx1ZS5cbiAqIEBwYXJhbSB7bnVtYmVyP30gY29va2llU2V0dXAubWF4QWdlIE1heCBjb29raWUgYWdlIGluIHNlY29uZHMuXG4gKiBAcGFyYW0ge0RhdGU/fSBjb29raWVTZXR1cC5leHBpcmVzIEV4cGlyZSBkYXRlLlxuICogQHBhcmFtIHtzdHJpbmc/fSBjb29raWVTZXR1cC5wYXRoIFVSSSBwYXRoIGZvciBjb29raWUuXG4gKiBAcGFyYW0ge3N0cmluZz99IGNvb2tpZVNldHVwLmRvbWFpbiBDb29raWUgZG9tYWluLlxuICogQHBhcmFtIHtib29sZWFuP30gY29va2llU2V0dXAuc2VjdXJlIElzIGNvb2tpZSBzZWN1cmVkLlxuICogQHBhcmFtIHtib29sZWFuP30gY29va2llU2V0dXAuaHR0cE9ubHkgSXMgY29va2llIEhUVFAgb25seS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IENvb2tpZSBzdHJpbmcuXG4gKiBAcHJvdGVjdGVkXG4gKi9cbkNvb2tpZVdyYXBwZXJCYXNlLnByb3RvdHlwZS5fY29udmVydFRvQ29va2llU2V0dXAgPSBmdW5jdGlvbiAoY29va2llU2V0dXApIHtcblx0aWYgKHR5cGVvZihjb29raWVTZXR1cC5rZXkpICE9PSAnc3RyaW5nJyB8fFxuXHRcdHR5cGVvZihjb29raWVTZXR1cC52YWx1ZSkgIT09ICdzdHJpbmcnKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdXcm9uZyBrZXkgb3IgdmFsdWUnKTtcblx0fVxuXG5cdHZhciBjb29raWUgPSBjb29raWVTZXR1cC5rZXkgKyAnPScgKyBjb29raWVTZXR1cC52YWx1ZTtcblxuXHQvLyBodHRwOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM2MjY1I3NlY3Rpb24tNC4xLjFcblx0aWYgKHR5cGVvZihjb29raWVTZXR1cC5tYXhBZ2UpID09PSAnbnVtYmVyJykge1xuXHRcdGNvb2tpZSArPSAnOyBNYXgtQWdlPScgKyBjb29raWVTZXR1cC5tYXhBZ2UudG9GaXhlZCgpO1xuXHRcdGlmICghY29va2llU2V0dXAuZXhwaXJlcykge1xuXHRcdFx0Ly8gYnkgZGVmYXVsdCBleHBpcmUgZGF0ZSA9IGN1cnJlbnQgZGF0ZSArIG1heC1hZ2UgaW4gc2Vjb25kc1xuXHRcdFx0Y29va2llU2V0dXAuZXhwaXJlcyA9IG5ldyBEYXRlKERhdGUubm93KCkgK1xuXHRcdFx0XHRjb29raWVTZXR1cC5tYXhBZ2UgKiAxMDAwKTtcblx0XHR9XG5cdH1cblx0aWYgKGNvb2tpZVNldHVwLmV4cGlyZXMgaW5zdGFuY2VvZiBEYXRlKSB7XG5cdFx0Y29va2llICs9ICc7IEV4cGlyZXM9JyArIGNvb2tpZVNldHVwLmV4cGlyZXMudG9VVENTdHJpbmcoKTtcblx0fVxuXHRpZiAodHlwZW9mKGNvb2tpZVNldHVwLnBhdGgpID09PSAnc3RyaW5nJykge1xuXHRcdGNvb2tpZSArPSAnOyBQYXRoPScgKyBjb29raWVTZXR1cC5wYXRoO1xuXHR9XG5cdGlmICh0eXBlb2YoY29va2llU2V0dXAuZG9tYWluKSA9PT0gJ3N0cmluZycpIHtcblx0XHRjb29raWUgKz0gJzsgRG9tYWluPScgKyBjb29raWVTZXR1cC5kb21haW47XG5cdH1cblx0aWYgKHR5cGVvZihjb29raWVTZXR1cC5zZWN1cmUpID09PSAnYm9vbGVhbicgJiZcblx0XHRjb29raWVTZXR1cC5zZWN1cmUpIHtcblx0XHRjb29raWUgKz0gJzsgU2VjdXJlJztcblx0fVxuXHRpZiAodHlwZW9mKGNvb2tpZVNldHVwLmh0dHBPbmx5KSA9PT0gJ2Jvb2xlYW4nICYmXG5cdFx0Y29va2llU2V0dXAuaHR0cE9ubHkpIHtcblx0XHRjb29raWUgKz0gJzsgSHR0cE9ubHknO1xuXHR9XG5cblx0cmV0dXJuIGNvb2tpZTtcbn07IiwiLypcbiAqIGNhdGJlcnJ5XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE1IERlbmlzIFJlY2hrdW5vdiBhbmQgcHJvamVjdCBjb250cmlidXRvcnMuXG4gKlxuICogY2F0YmVycnkncyBsaWNlbnNlIGZvbGxvd3M6XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb25cbiAqIG9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uXG4gKiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sXG4gKiBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLFxuICogcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSxcbiAqIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4gKiBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuICogaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuICogT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKlxuICogVGhpcyBsaWNlbnNlIGFwcGxpZXMgdG8gYWxsIHBhcnRzIG9mIGNhdGJlcnJ5IHRoYXQgYXJlIG5vdCBleHRlcm5hbGx5XG4gKiBtYWludGFpbmVkIGxpYnJhcmllcy5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gRG9jdW1lbnRSZW5kZXJlckJhc2U7XG5cbi8qKlxuICogQ3JlYXRlcyBuZXcgaW5zdGFuY2Ugb2YgdGhlIGJhc2ljIGRvY3VtZW50IHJlbmRlcmVyLlxuICogQHBhcmFtIHtTZXJ2aWNlTG9jYXRvcn0gJHNlcnZpY2VMb2NhdG9yIExvY2F0b3IgdG8gcmVzb2x2ZSBkZXBlbmRlbmNpZXMuXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gRG9jdW1lbnRSZW5kZXJlckJhc2UoJHNlcnZpY2VMb2NhdG9yKSB7XG5cdHZhciBzZWxmID0gdGhpcztcblx0dGhpcy5fc2VydmljZUxvY2F0b3IgPSAkc2VydmljZUxvY2F0b3I7XG5cdHRoaXMuX2NvbnRleHRGYWN0b3J5ID0gJHNlcnZpY2VMb2NhdG9yLnJlc29sdmUoJ2NvbnRleHRGYWN0b3J5Jyk7XG5cdHRoaXMuX2NvbXBvbmVudExvYWRlciA9ICRzZXJ2aWNlTG9jYXRvci5yZXNvbHZlKCdjb21wb25lbnRMb2FkZXInKTtcblx0dGhpcy5fZXZlbnRCdXMgPSAkc2VydmljZUxvY2F0b3IucmVzb2x2ZSgnZXZlbnRCdXMnKTtcblxuXHR2YXIgc3RvcmVMb2FkZXIgPSAkc2VydmljZUxvY2F0b3IucmVzb2x2ZSgnc3RvcmVMb2FkZXInKTtcblx0dGhpcy5fbG9hZGluZyA9IFByb21pc2UuYWxsKFtcblx0XHR0aGlzLl9jb21wb25lbnRMb2FkZXIubG9hZCgpLFxuXHRcdHN0b3JlTG9hZGVyLmxvYWQoKVxuXHRdKVxuXHRcdC50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdHNlbGYuX2xvYWRpbmcgPSBudWxsO1xuXHRcdFx0c2VsZi5fZXZlbnRCdXMuZW1pdCgncmVhZHknKTtcblx0XHR9KVxuXHRcdC5jYXRjaChmdW5jdGlvbiAocmVhc29uKSB7XG5cdFx0XHRzZWxmLl9ldmVudEJ1cy5lbWl0KCdlcnJvcicsIHJlYXNvbik7XG5cdFx0fSk7XG59XG5cbi8qKlxuICogQ3VycmVudCBzZXJ2aWNlIGxvY2F0b3IuXG4gKiBAdHlwZSB7U2VydmljZUxvY2F0b3J9XG4gKiBAcHJvdGVjdGVkXG4gKi9cbkRvY3VtZW50UmVuZGVyZXJCYXNlLnByb3RvdHlwZS5fc2VydmljZUxvY2F0b3IgPSBudWxsO1xuXG4vKipcbiAqIEN1cnJlbnQgY29tcG9uZW50IGxvYWRlci5cbiAqIEB0eXBlIHtDb21wb25lbnRMb2FkZXJ9XG4gKiBAcHJvdGVjdGVkXG4gKi9cbkRvY3VtZW50UmVuZGVyZXJCYXNlLnByb3RvdHlwZS5fY29tcG9uZW50TG9hZGVyID0gbnVsbDtcblxuLyoqXG4gKiBDdXJyZW50IG1vZHVsZSBsb2FkaW5nIHByb21pc2UuXG4gKiBAdHlwZSB7UHJvbWlzZX1cbiAqIEBwcm90ZWN0ZWRcbiAqL1xuRG9jdW1lbnRSZW5kZXJlckJhc2UucHJvdG90eXBlLl9sb2FkaW5nID0gbnVsbDtcblxuLyoqXG4gKiBDdXJyZW50IGNvbnRleHQgZmFjdG9yeS5cbiAqIEB0eXBlIHtDb250ZXh0RmFjdG9yeX1cbiAqIEBwcm90ZWN0ZWRcbiAqL1xuRG9jdW1lbnRSZW5kZXJlckJhc2UucHJvdG90eXBlLl9jb250ZXh0RmFjdG9yeSA9IG51bGw7XG5cbi8qKlxuICogR2V0cyBwcm9taXNlIGZvciByZWFkeSBzdGF0ZSB3aGVuIGl0IHdpbGwgYmUgYWJsZSBoYW5kbGUgcmVxdWVzdHMuXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gUHJvbWlzZSBmb3Igbm90aGluZy5cbiAqIEBwcm90ZWN0ZWRcbiAqL1xuRG9jdW1lbnRSZW5kZXJlckJhc2UucHJvdG90eXBlLl9nZXRQcm9taXNlRm9yUmVhZHlTdGF0ZSA9IGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuIHRoaXMuX2xvYWRpbmcgP1xuXHRcdHRoaXMuX2xvYWRpbmcgOlxuXHRcdFByb21pc2UucmVzb2x2ZSgpO1xufTsiLCIvKlxuICogY2F0YmVycnlcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUgRGVuaXMgUmVjaGt1bm92IGFuZCBwcm9qZWN0IGNvbnRyaWJ1dG9ycy5cbiAqXG4gKiBjYXRiZXJyeSdzIGxpY2Vuc2UgZm9sbG93czpcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvblxuICogb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb25cbiAqIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbixcbiAqIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsXG4gKiBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLFxuICogYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbiAqIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4gKiBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4gKiBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqXG4gKiBUaGlzIGxpY2Vuc2UgYXBwbGllcyB0byBhbGwgcGFydHMgb2YgY2F0YmVycnkgdGhhdCBhcmUgbm90IGV4dGVybmFsbHlcbiAqIG1haW50YWluZWQgbGlicmFyaWVzLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBMb2FkZXJCYXNlO1xuXG52YXIgbW9kdWxlSGVscGVyID0gcmVxdWlyZSgnLi4vaGVscGVycy9tb2R1bGVIZWxwZXInKTtcblxuLyoqXG4gKiBDcmVhdGUgYmFzaWMgaW1wbGVtZW50YXRpb24gb2YgYSBtb2R1bGUgbG9hZGVyLlxuICogQHBhcmFtIHtBcnJheX0gdHJhbnNmb3JtcyBBcnJheSBvZiBtb2R1bGUgdHJhbnNmb3JtYXRpb25zLlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIExvYWRlckJhc2UodHJhbnNmb3Jtcykge1xuXHR0aGlzLl90cmFuc2Zvcm1zID0gdHJhbnNmb3Jtcztcbn1cblxuLyoqXG4gKiBDdXJyZW50IGxpc3Qgb2YgY29tcG9uZW50IHRyYW5zZm9ybXMuXG4gKiBAdHlwZSB7QXJyYXl9XG4gKiBAcHJpdmF0ZVxuICovXG5Mb2FkZXJCYXNlLnByb3RvdHlwZS5fdHJhbnNmb3JtcyA9IG51bGw7XG5cbi8qKlxuICogQXBwbGllcyBhbGwgdHJhbnNmb3JtYXRpb25zIHJlZ2lzdGVyZWQgaW4gU2VydmljZSBMb2NhdG9yLlxuICogQHBhcmFtIHtPYmplY3R9IG1vZHVsZSBMb2FkZWQgbW9kdWxlLlxuICogQHBhcmFtIHtudW1iZXI/fSBpbmRleCBUcmFuc2Zvcm1hdGlvbiBpbmRleCBpbiBhIGxpc3QuXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxPYmplY3Q+fSBUcmFuc2Zvcm1lZCBtb2R1bGUuXG4gKiBAcHJvdGVjdGVkXG4gKi9cbkxvYWRlckJhc2UucHJvdG90eXBlLl9hcHBseVRyYW5zZm9ybXMgPSBmdW5jdGlvbiAobW9kdWxlLCBpbmRleCkge1xuXHRpZiAoaW5kZXggPT09IHVuZGVmaW5lZCkge1xuXHRcdC8vIHRoZSBsaXN0IGlzIGEgc3RhY2ssIHdlIHNob3VsZCByZXZlcnNlIGl0XG5cdFx0aW5kZXggPSB0aGlzLl90cmFuc2Zvcm1zLmxlbmd0aCAtIDE7XG5cdH1cblxuXHRpZiAoaW5kZXggPCAwKSB7XG5cdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShtb2R1bGUpO1xuXHR9XG5cblx0dmFyIHNlbGYgPSB0aGlzLFxuXHRcdHRyYW5zZm9ybWF0aW9uID0gdGhpcy5fdHJhbnNmb3Jtc1tpbmRleF07XG5cblx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG5cdFx0LnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIHRyYW5zZm9ybWF0aW9uLnRyYW5zZm9ybShtb2R1bGUpO1xuXHRcdH0pXG5cdFx0LnRoZW4oZnVuY3Rpb24gKHRyYW5zZm9ybWVkTW9kdWxlKSB7XG5cdFx0XHRyZXR1cm4gc2VsZi5fYXBwbHlUcmFuc2Zvcm1zKHRyYW5zZm9ybWVkTW9kdWxlLCBpbmRleCAtIDEpO1xuXHRcdH0pO1xufTsiLCIvKlxuICogY2F0YmVycnlcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgRGVuaXMgUmVjaGt1bm92IGFuZCBwcm9qZWN0IGNvbnRyaWJ1dG9ycy5cbiAqXG4gKiBjYXRiZXJyeSdzIGxpY2Vuc2UgZm9sbG93czpcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvblxuICogb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb25cbiAqIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbixcbiAqIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsXG4gKiBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLFxuICogYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbiAqIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4gKiBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4gKiBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqXG4gKiBUaGlzIGxpY2Vuc2UgYXBwbGllcyB0byBhbGwgcGFydHMgb2YgY2F0YmVycnkgdGhhdCBhcmUgbm90IGV4dGVybmFsbHlcbiAqIG1haW50YWluZWQgbGlicmFyaWVzLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBNb2R1bGVBcGlQcm92aWRlckJhc2U7XG5cbnZhciBFUlJPUl9FVkVOVF9OQU1FID0gJ0V2ZW50IG5hbWUgc2hvdWxkIGJlIGEgc3RyaW5nJyxcblx0RVJST1JfRVZFTlRfSEFORExFUiA9ICdFdmVudCBoYW5kbGVyIHNob3VsZCBiZSBhIGZ1bmN0aW9uJztcblxuLyoqXG4gKiBDcmVhdGVzIG5ldyBpbnN0YW5jZSBvZiB0aGUgYmFzaWMgQVBJIHByb3ZpZGVyLlxuICogQHBhcmFtIHtTZXJ2aWNlTG9jYXRvcn0gJHNlcnZpY2VMb2NhdG9yIFNlcnZpY2UgbG9jYXRvclxuICogdG8gcmVzb2x2ZSBkZXBlbmRlbmNpZXMuXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gTW9kdWxlQXBpUHJvdmlkZXJCYXNlKCRzZXJ2aWNlTG9jYXRvcikge1xuXHR0aGlzLmxvY2F0b3IgPSAkc2VydmljZUxvY2F0b3I7XG5cdHRoaXMuY29va2llID0gJHNlcnZpY2VMb2NhdG9yLnJlc29sdmUoJ2Nvb2tpZVdyYXBwZXInKTtcblx0dGhpcy5fZXZlbnRCdXMgPSAkc2VydmljZUxvY2F0b3IucmVzb2x2ZSgnZXZlbnRCdXMnKTtcbn1cblxuLyoqXG4gKiBDdXJyZW50IGNvb2tpZSBwcm92aWRlci5cbiAqIEB0eXBlIHtDb29raWVXcmFwcGVyfVxuICovXG5Nb2R1bGVBcGlQcm92aWRlckJhc2UucHJvdG90eXBlLmNvb2tpZSA9IG51bGw7XG5cbi8qKlxuICogQ3VycmVudCBzZXJ2aWNlIGxvY2F0b3IuXG4gKiBAdHlwZSB7U2VydmljZUxvY2F0b3J9XG4gKiBAcHJvdGVjdGVkXG4gKi9cbk1vZHVsZUFwaVByb3ZpZGVyQmFzZS5wcm90b3R5cGUubG9jYXRvciA9IG51bGw7XG5cbi8qKlxuICogQ3VycmVudCBldmVudCBidXMuXG4gKiBAdHlwZSB7RXZlbnRFbWl0dGVyfVxuICogQHByaXZhdGVcbiAqL1xuTW9kdWxlQXBpUHJvdmlkZXJCYXNlLnByb3RvdHlwZS5fZXZlbnRCdXMgPSBudWxsO1xuXG4vKipcbiAqIFN1YnNjcmliZXMgb24gdGhlIHNwZWNpZmllZCBldmVudCBpbiBDYXRiZXJyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWUgTmFtZSBvZiB0aGUgZXZlbnQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBoYW5kbGVyIEV2ZW50IGhhbmRsZXIuXG4gKiBAcmV0dXJucyB7TW9kdWxlQXBpUHJvdmlkZXJCYXNlfSBUaGlzIG9iamVjdCBmb3IgY2hhaW5pbmcuXG4gKi9cbk1vZHVsZUFwaVByb3ZpZGVyQmFzZS5wcm90b3R5cGUub24gPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBoYW5kbGVyKSB7XG5cdGNoZWNrRXZlbnROYW1lQW5kSGFuZGxlcihldmVudE5hbWUsIGhhbmRsZXIpO1xuXHR0aGlzLl9ldmVudEJ1cy5vbihldmVudE5hbWUsIGhhbmRsZXIpO1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU3Vic2NyaWJlcyBvbiB0aGUgc3BlY2lmaWVkIGV2ZW50IGluIENhdGJlcnJ5IHRvIGhhbmRsZSBvbmNlLlxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZSBOYW1lIG9mIHRoZSBldmVudC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGhhbmRsZXIgRXZlbnQgaGFuZGxlci5cbiAqIEByZXR1cm5zIHtNb2R1bGVBcGlQcm92aWRlckJhc2V9IFRoaXMgb2JqZWN0IGZvciBjaGFpbmluZy5cbiAqL1xuTW9kdWxlQXBpUHJvdmlkZXJCYXNlLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgaGFuZGxlcikge1xuXHRjaGVja0V2ZW50TmFtZUFuZEhhbmRsZXIoZXZlbnROYW1lLCBoYW5kbGVyKTtcblx0dGhpcy5fZXZlbnRCdXMub25jZShldmVudE5hbWUsIGhhbmRsZXIpO1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmVtb3ZlcyB0aGUgc3BlY2lmaWVkIGhhbmRsZXIgZnJvbSB0aGUgc3BlY2lmaWVkIGV2ZW50LlxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZSBOYW1lIG9mIHRoZSBldmVudC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGhhbmRsZXIgRXZlbnQgaGFuZGxlci5cbiAqIEByZXR1cm5zIHtNb2R1bGVBcGlQcm92aWRlckJhc2V9IFRoaXMgb2JqZWN0IGZvciBjaGFpbmluZy5cbiAqL1xuTW9kdWxlQXBpUHJvdmlkZXJCYXNlLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGhhbmRsZXIpIHtcblx0Y2hlY2tFdmVudE5hbWVBbmRIYW5kbGVyKGV2ZW50TmFtZSwgaGFuZGxlcik7XG5cdHRoaXMuX2V2ZW50QnVzLnJlbW92ZUxpc3RlbmVyKGV2ZW50TmFtZSwgaGFuZGxlcik7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBoYW5kbGVycyBmcm9tIHRoZSBzcGVjaWZpZWQgZXZlbnQgaW4gQ2F0YmVycnkuXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lIE5hbWUgb2YgdGhlIGV2ZW50LlxuICogQHJldHVybnMge01vZHVsZUFwaVByb3ZpZGVyQmFzZX0gVGhpcyBvYmplY3QgZm9yIGNoYWluaW5nLlxuICovXG5Nb2R1bGVBcGlQcm92aWRlckJhc2UucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9IGZ1bmN0aW9uIChldmVudE5hbWUpIHtcblx0Y2hlY2tFdmVudE5hbWVBbmRIYW5kbGVyKGV2ZW50TmFtZSwgZHVtbXkpO1xuXHR0aGlzLl9ldmVudEJ1cy5yZW1vdmVBbGxMaXN0ZW5lcnMoZXZlbnROYW1lKTtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIENoZWNrcyBpZiBldmVudCBuYW1lIGlzIGEgc3RyaW5nIGFuZCBoYW5kbGVyIGlzIGEgZnVuY3Rpb24uXG4gKiBAcGFyYW0geyp9IGV2ZW50TmFtZSBOYW1lIG9mIHRoZSBldmVudCB0byBjaGVjay5cbiAqIEBwYXJhbSB7Kn0gaGFuZGxlciBUaGUgZXZlbnQgaGFuZGxlciB0byBjaGVjay5cbiAqL1xuZnVuY3Rpb24gY2hlY2tFdmVudE5hbWVBbmRIYW5kbGVyKGV2ZW50TmFtZSwgaGFuZGxlcikge1xuXHRpZiAodHlwZW9mIChldmVudE5hbWUpICE9PSAnc3RyaW5nJykge1xuXHRcdHRocm93IG5ldyBFcnJvcihFUlJPUl9FVkVOVF9OQU1FKTtcblx0fVxuXG5cdGlmICh0eXBlb2YgKGhhbmRsZXIpICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKEVSUk9SX0VWRU5UX0hBTkRMRVIpO1xuXHR9XG59XG5cbi8qKlxuICogRG9lcyBub3RoaW5nLiBJdCBpcyB1c2VkIGFzIGEgZGVmYXVsdCBjYWxsYmFjay5cbiAqL1xuZnVuY3Rpb24gZHVtbXkoKSB7fVxuIiwiLypcbiAqIGNhdGJlcnJ5XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0IERlbmlzIFJlY2hrdW5vdiBhbmQgcHJvamVjdCBjb250cmlidXRvcnMuXG4gKlxuICogY2F0YmVycnkncyBsaWNlbnNlIGZvbGxvd3M6XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb25cbiAqIG9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uXG4gKiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sXG4gKiBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLFxuICogcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSxcbiAqIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4gKiBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuICogaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuICogT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKlxuICogVGhpcyBsaWNlbnNlIGFwcGxpZXMgdG8gYWxsIHBhcnRzIG9mIGNhdGJlcnJ5IHRoYXQgYXJlIG5vdCBleHRlcm5hbGx5XG4gKiBtYWludGFpbmVkIGxpYnJhcmllcy5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgndXRpbCcpO1xuXG52YXIgVElUTEUgPSAnQ2F0YmVycnlANS4wLjUgKCcgK1xuXHRcdCc8YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL2NhdGJlcnJ5L2NhdGJlcnJ5L2lzc3Vlc1wiICcgK1xuXHRcdCd0YXJnZXQ9XCJfYmxhbmtcIj4nICtcblx0XHQncmVwb3J0IGFuIGlzc3VlJyArXG5cdFx0JzwvYT4nICtcblx0XHQnKScsXG5cdEFNUCA9IC8mL2csXG5cdExUID0gLzwvZyxcblx0R1QgPSAvPi9nLFxuXHRRVU9UID0gL1xcXCIvZyxcblx0U0lOR0xFX1FVT1QgPSAvXFwnL2csXG5cdEVSUk9SX01FU1NBR0VfUkVHRVhQID0gL14oPzpbXFx3JF0rKTogKD86LispXFxyP1xcbi9pLFxuXHRFUlJPUl9NRVNTQUdFX0ZPUk1BVCA9ICc8c3BhbiAnICtcblx0XHQnc3R5bGU9XCJjb2xvcjogcmVkOyBmb250LXNpemU6IDE2cHQ7IGZvbnQtd2VpZ2h0OiBib2xkO1wiPicgK1xuXHRcdCclcyVzJyArXG5cdFx0Jzwvc3Bhbj4nLFxuXHRORVdfTElORSA9IC9cXHI/XFxuL2c7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHQvKipcblx0ICogUHJpbnRzIGVycm9yIHdpdGggcHJldHR5IGZvcm1hdHRpbmcuXG5cdCAqIEBwYXJhbSB7RXJyb3J9IGVycm9yIEVycm9yIHRvIHByaW50LlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdXNlckFnZW50IFVzZXIgYWdlbnQgaW5mb3JtYXRpb24uXG5cdCAqIEByZXR1cm5zIHtzdHJpbmd9IEhUTUwgd2l0aCBhbGwgaW5mb3JtYXRpb24gYWJvdXQgZXJyb3IuXG5cdCAqL1xuXHRwcmV0dHlQcmludDogZnVuY3Rpb24gKGVycm9yLCB1c2VyQWdlbnQpIHtcblx0XHRpZiAoIWVycm9yIHx8IHR5cGVvZihlcnJvcikgIT09ICdvYmplY3QnKSB7XG5cdFx0XHRyZXR1cm4gJyc7XG5cdFx0fVxuXHRcdHZhciBkYXRlU3RyaW5nID0gKG5ldyBEYXRlKCkpLnRvVVRDU3RyaW5nKCkgKyAnOzxici8+Jyxcblx0XHRcdHVzZXJBZ2VudFN0cmluZyA9ICh1c2VyQWdlbnQgPyAodXNlckFnZW50ICsgJzs8YnIvPicpIDogJycpLFxuXHRcdFx0bmFtZSA9ICh0eXBlb2YoZXJyb3IubmFtZSkgPT09ICdzdHJpbmcnID8gZXJyb3IubmFtZSArICc6ICcgOiAnJyksXG5cdFx0XHRtZXNzYWdlID0gU3RyaW5nKGVycm9yLm1lc3NhZ2UgfHwgJycpLFxuXHRcdFx0c3RhY2sgPSBTdHJpbmcoZXJyb3Iuc3RhY2sgfHwgJycpLnJlcGxhY2UoRVJST1JfTUVTU0FHRV9SRUdFWFAsICcnKSxcblx0XHRcdGZ1bGxNZXNzYWdlID0gdXRpbC5mb3JtYXQoXG5cdFx0XHRcdEVSUk9SX01FU1NBR0VfRk9STUFULCBlc2NhcGUobmFtZSksIGVzY2FwZShtZXNzYWdlKVxuXHRcdFx0KTtcblxuXHRcdHJldHVybiAnPGRpdiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6IHdoaXRlOyBmb250LXNpemU6IDEycHQ7XCI+JyArXG5cdFx0XHRkYXRlU3RyaW5nICtcblx0XHRcdHVzZXJBZ2VudFN0cmluZyArXG5cdFx0XHRUSVRMRSArICc8YnIvPjxici8+JyArXG5cdFx0XHRmdWxsTWVzc2FnZSArICc8YnIvPjxici8+JyArXG5cdFx0XHRlc2NhcGUoc3RhY2spICtcblx0XHRcdCc8L2Rpdj4nO1xuXHR9XG59O1xuXG4vKipcbiAqIEVzY2FwZXMgZXJyb3IgdGV4dC5cbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSBFcnJvciB0ZXh0LlxuICogQHJldHVybnMge3N0cmluZ30gZXNjYXBlZCBhbmQgZm9ybWF0dGVkIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gZXNjYXBlKHZhbHVlKSB7XG5cdHJldHVybiB2YWx1ZVxuXHRcdC5yZXBsYWNlKEFNUCwgJyZhbXA7Jylcblx0XHQucmVwbGFjZShMVCwgJyZsdDsnKVxuXHRcdC5yZXBsYWNlKEdULCAnJmd0OycpXG5cdFx0LnJlcGxhY2UoUVVPVCwgJyZxdW90OycpXG5cdFx0LnJlcGxhY2UoU0lOR0xFX1FVT1QsICcmIzM5OycpXG5cdFx0LnJlcGxhY2UoTkVXX0xJTkUsICc8YnIvPicpO1xufSIsIi8qXG4gKiBjYXRiZXJyeVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNCBEZW5pcyBSZWNoa3Vub3YgYW5kIHByb2plY3QgY29udHJpYnV0b3JzLlxuICpcbiAqIGNhdGJlcnJ5J3MgbGljZW5zZSBmb2xsb3dzOlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXG4gKiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvblxuICogZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLFxuICogaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSxcbiAqIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsXG4gKiBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuICogc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbiAqIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1NcbiAqIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICpcbiAqIFRoaXMgbGljZW5zZSBhcHBsaWVzIHRvIGFsbCBwYXJ0cyBvZiBjYXRiZXJyeSB0aGF0IGFyZSBub3QgZXh0ZXJuYWxseVxuICogbWFpbnRhaW5lZCBsaWJyYXJpZXMuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaGVscGVyID0ge1xuXHRDT01QT05FTlRfUFJFRklYOiAnY2F0LScsXG5cdENPTVBPTkVOVF9QUkVGSVhfUkVHRVhQOiAvXmNhdC0vLFxuXHRDT01QT05FTlRfRVJST1JfVEVNUExBVEVfUE9TVEZJWDogJy0tZXJyb3InLFxuXHRET0NVTUVOVF9DT01QT05FTlRfTkFNRTogJ2RvY3VtZW50Jyxcblx0SEVBRF9DT01QT05FTlRfTkFNRTogJ2hlYWQnLFxuXHRBVFRSSUJVVEVfSUQ6ICdpZCcsXG5cdEFUVFJJQlVURV9TVE9SRTogJ2NhdC1zdG9yZScsXG5cdERFRkFVTFRfTE9HSUNfRklMRU5BTUU6ICdpbmRleC5qcycsXG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgbmFtZSBmb3IgZXJyb3IgdGVtcGxhdGUgb2YgY29tcG9uZW50LlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gY29tcG9uZW50TmFtZSBuYW1lIG9mIGNvbXBvbmVudC5cblx0ICogQHJldHVybnMge3N0cmluZ30gTmFtZSBvZiBlcnJvciB0ZW1wbGF0ZSBvZiB0aGUgY29tcG9uZW50LlxuXHQgKi9cblx0Z2V0TmFtZUZvckVycm9yVGVtcGxhdGU6IGZ1bmN0aW9uIChjb21wb25lbnROYW1lKSB7XG5cdFx0aWYgKHR5cGVvZihjb21wb25lbnROYW1lKSAhPT0gJ3N0cmluZycpIHtcblx0XHRcdHJldHVybiAnJztcblx0XHR9XG5cdFx0cmV0dXJuIGNvbXBvbmVudE5hbWUgKyBoZWxwZXIuQ09NUE9ORU5UX0VSUk9SX1RFTVBMQVRFX1BPU1RGSVg7XG5cdH0sXG5cblx0LyoqXG5cdCAqIERldGVybWluZXMgaWYgc3BlY2lmaWVkIGNvbXBvbmVudCBuYW1lIGlzIHRoZSBcImRvY3VtZW50XCIgY29tcG9uZW50IG5hbWUuXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBjb21wb25lbnROYW1lIE5hbWUgb2YgdGhlIGNvbXBvbmVudC5cblx0ICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgc3BlY2lmaWVkIGNvbXBvbmVudCBpcyB0aGUgXCJkb2N1bWVudFwiIGNvbXBvbmVudC5cblx0ICovXG5cdGlzRG9jdW1lbnRDb21wb25lbnQ6IGZ1bmN0aW9uIChjb21wb25lbnROYW1lKSB7XG5cdFx0cmV0dXJuIGNvbXBvbmVudE5hbWUudG9Mb3dlckNhc2UoKSA9PT0gaGVscGVyLkRPQ1VNRU5UX0NPTVBPTkVOVF9OQU1FO1xuXHR9LFxuXHQvKipcblx0ICogRGV0ZXJtaW5lcyBpZiBzcGVjaWZpZWQgY29tcG9uZW50IG5hbWUgaXMgdGhlIFwiaGVhZFwiIGNvbXBvbmVudCBuYW1lLlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gY29tcG9uZW50TmFtZSBOYW1lIG9mIHRoZSBjb21wb25lbnQuXG5cdCAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHNwZWNpZmllZCBjb21wb25lbnQgaXMgdGhlIFwiaGVhZFwiIGNvbXBvbmVudC5cblx0ICovXG5cdGlzSGVhZENvbXBvbmVudDogZnVuY3Rpb24gKGNvbXBvbmVudE5hbWUpIHtcblx0XHRyZXR1cm4gY29tcG9uZW50TmFtZS50b0xvd2VyQ2FzZSgpID09PSBoZWxwZXIuSEVBRF9DT01QT05FTlRfTkFNRTtcblx0fSxcblxuXHQvKipcblx0ICogR2V0cyB0aGUgb3JpZ2luYWwgY29tcG9uZW50IG5hbWUgd2l0aG91dCBwcmVmaXguXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBmdWxsQ29tcG9uZW50TmFtZSBGdWxsIGNvbXBvbmVudCBuYW1lICh0YWcgbmFtZSkuXG5cdCAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBvcmlnaW5hbCBjb21wb25lbnQgbmFtZSB3aXRob3V0IHByZWZpeC5cblx0ICovXG5cdGdldE9yaWdpbmFsQ29tcG9uZW50TmFtZTogZnVuY3Rpb24gKGZ1bGxDb21wb25lbnROYW1lKSB7XG5cdFx0aWYgKHR5cGVvZiAoZnVsbENvbXBvbmVudE5hbWUpICE9PSAnc3RyaW5nJykge1xuXHRcdFx0cmV0dXJuICcnO1xuXHRcdH1cblx0XHRmdWxsQ29tcG9uZW50TmFtZSA9IGZ1bGxDb21wb25lbnROYW1lLnRvTG93ZXJDYXNlKCk7XG5cdFx0aWYgKGZ1bGxDb21wb25lbnROYW1lID09PSBoZWxwZXIuSEVBRF9DT01QT05FTlRfTkFNRSkge1xuXHRcdFx0cmV0dXJuIGZ1bGxDb21wb25lbnROYW1lO1xuXHRcdH1cblx0XHRpZiAoZnVsbENvbXBvbmVudE5hbWUgPT09IGhlbHBlci5ET0NVTUVOVF9DT01QT05FTlRfTkFNRSkge1xuXHRcdFx0cmV0dXJuIGZ1bGxDb21wb25lbnROYW1lO1xuXHRcdH1cblx0XHRyZXR1cm4gZnVsbENvbXBvbmVudE5hbWUucmVwbGFjZShoZWxwZXIuQ09NUE9ORU5UX1BSRUZJWF9SRUdFWFAsICcnKTtcblx0fSxcblxuXHQvKipcblx0ICogR2V0cyB2YWxpZCB0YWcgbmFtZSBmb3IgY29tcG9uZW50LlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gY29tcG9uZW50TmFtZSBOYW1lIG9mIHRoZSBjb21wb25lbnQuXG5cdCAqIEByZXR1cm5zIHtzdHJpbmd9IE5hbWUgb2YgdGhlIHRhZy5cblx0ICovXG5cdGdldFRhZ05hbWVGb3JDb21wb25lbnROYW1lOiBmdW5jdGlvbiAoY29tcG9uZW50TmFtZSkge1xuXHRcdGlmICh0eXBlb2YoY29tcG9uZW50TmFtZSkgIT09ICdzdHJpbmcnKSB7XG5cdFx0XHRyZXR1cm4gJyc7XG5cdFx0fVxuXHRcdHZhciB1cHBlckNvbXBvbmVudE5hbWUgPSBjb21wb25lbnROYW1lLnRvVXBwZXJDYXNlKCk7XG5cdFx0aWYgKGNvbXBvbmVudE5hbWUgPT09IGhlbHBlci5IRUFEX0NPTVBPTkVOVF9OQU1FKSB7XG5cdFx0XHRyZXR1cm4gdXBwZXJDb21wb25lbnROYW1lO1xuXHRcdH1cblx0XHRpZiAoY29tcG9uZW50TmFtZSA9PT0gaGVscGVyLkRPQ1VNRU5UX0NPTVBPTkVOVF9OQU1FKSB7XG5cdFx0XHRyZXR1cm4gdXBwZXJDb21wb25lbnROYW1lO1xuXHRcdH1cblx0XHRyZXR1cm4gaGVscGVyLkNPTVBPTkVOVF9QUkVGSVgudG9VcHBlckNhc2UoKSArIHVwcGVyQ29tcG9uZW50TmFtZTtcblx0fSxcblxuXHQvKipcblx0ICogR2V0cyBtZXRob2Qgb2YgdGhlIG1vZHVsZSB0aGF0IGNhbiBiZSBpbnZva2VkLlxuXHQgKiBAcGFyYW0ge09iamVjdH0gbW9kdWxlIE1vZHVsZSBpbXBsZW1lbnRhdGlvbi5cblx0ICogQHBhcmFtIHtzdHJpbmd9IHByZWZpeCBNZXRob2QgcHJlZml4IChpLmUuIGhhbmRsZSkuXG5cdCAqIEBwYXJhbSB7c3RyaW5nP30gbmFtZSBOYW1lIG9mIHRoZSBlbnRpdHkgdG8gaW52b2tlIG1ldGhvZCBmb3Jcblx0ICogKHdpbGwgYmUgY29udmVydGVkIHRvIGNhbWVsIGNhc2luZykuXG5cdCAqIEByZXR1cm5zIHtGdW5jdGlvbn0gTWV0aG9kIHRvIGludm9rZS5cblx0ICovXG5cdGdldE1ldGhvZFRvSW52b2tlOiBmdW5jdGlvbiAobW9kdWxlLCBwcmVmaXgsIG5hbWUpIHtcblx0XHRpZiAoIW1vZHVsZSB8fCB0eXBlb2YobW9kdWxlKSAhPT0gJ29iamVjdCcpIHtcblx0XHRcdHJldHVybiBkZWZhdWx0UHJvbWlzZU1ldGhvZDtcblx0XHR9XG5cdFx0dmFyIG1ldGhvZE5hbWUgPSBoZWxwZXIuZ2V0Q2FtZWxDYXNlTmFtZShwcmVmaXgsIG5hbWUpO1xuXHRcdGlmICh0eXBlb2YobW9kdWxlW21ldGhvZE5hbWVdKSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0cmV0dXJuIG1vZHVsZVttZXRob2ROYW1lXS5iaW5kKG1vZHVsZSk7XG5cdFx0fVxuXHRcdGlmICh0eXBlb2YobW9kdWxlW3ByZWZpeF0pID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRyZXR1cm4gbW9kdWxlW3ByZWZpeF0uYmluZChtb2R1bGUsIG5hbWUpO1xuXHRcdH1cblxuXHRcdHJldHVybiBkZWZhdWx0UHJvbWlzZU1ldGhvZDtcblx0fSxcblxuXHQvKipcblx0ICogR2V0cyBuYW1lIGluIGNhbWVsIGNhc2luZyBmb3IgZXZlcnl0aGluZy5cblx0ICogQHBhcmFtIHtzdHJpbmd9IHByZWZpeCBQcmVmaXggZm9yIHRoZSBuYW1lLlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBOYW1lIHRvIGNvbnZlcnQuXG5cdCAqL1xuXHRnZXRDYW1lbENhc2VOYW1lOiBmdW5jdGlvbiAocHJlZml4LCBuYW1lKSB7XG5cdFx0aWYgKCFuYW1lKSB7XG5cdFx0XHRyZXR1cm4gJyc7XG5cdFx0fVxuXHRcdHZhciBwYXJ0cyA9IG5hbWUuc3BsaXQoL1teYS16MC05XS9pKSxcblx0XHRcdGNhbWVsQ2FzZU5hbWUgPSBTdHJpbmcocHJlZml4IHx8ICcnKTtcblxuXHRcdHBhcnRzLmZvckVhY2goZnVuY3Rpb24gKHBhcnQpIHtcblx0XHRcdGlmICghcGFydCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIGZpcnN0IGNoYXJhY3RlciBpbiBtZXRob2QgbmFtZSBtdXN0IGJlIGluIGxvd2VyY2FzZVxuXHRcdFx0Y2FtZWxDYXNlTmFtZSArPSBjYW1lbENhc2VOYW1lID9cblx0XHRcdFx0cGFydFswXS50b1VwcGVyQ2FzZSgpIDpcblx0XHRcdFx0cGFydFswXS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0Y2FtZWxDYXNlTmFtZSArPSBwYXJ0LnN1YnN0cmluZygxKTtcblx0XHR9KTtcblxuXHRcdHJldHVybiBjYW1lbENhc2VOYW1lO1xuXHR9LFxuXG5cdC8qKlxuXHQgKiBHZXRzIHNhZmUgcHJvbWlzZSByZXNvbHZlZCBmcm9tIGFjdGlvbi5cblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gYWN0aW9uIEFjdGlvbiB0byB3cmFwIHdpdGggc2FmZSBwcm9taXNlLlxuXHQgKiBAcmV0dXJucyB7UHJvbWlzZX1cblx0ICovXG5cdGdldFNhZmVQcm9taXNlOiBmdW5jdGlvbiAoYWN0aW9uKSB7XG5cdFx0dmFyIHByb21pc2U7XG5cdFx0dHJ5IHtcblx0XHRcdHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoYWN0aW9uKCkpO1xuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdHByb21pc2UgPSBQcm9taXNlLnJlamVjdChlKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcHJvbWlzZTtcblx0fVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBoZWxwZXI7XG5cbi8qKlxuICogSnVzdCByZXR1cm5zIHJlc29sdmVkIHByb21pc2UuXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gUHJvbWlzZSBmb3Igbm90aGluZy5cbiAqL1xuZnVuY3Rpb24gZGVmYXVsdFByb21pc2VNZXRob2QoKSB7XG5cdHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbn0iLCIvKlxuICogY2F0YmVycnlcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgRGVuaXMgUmVjaGt1bm92IGFuZCBwcm9qZWN0IGNvbnRyaWJ1dG9ycy5cbiAqXG4gKiBjYXRiZXJyeSdzIGxpY2Vuc2UgZm9sbG93czpcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvblxuICogb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb25cbiAqIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbixcbiAqIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsXG4gKiBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLFxuICogYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbiAqIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4gKiBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4gKiBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqXG4gKiBUaGlzIGxpY2Vuc2UgYXBwbGllcyB0byBhbGwgcGFydHMgb2YgY2F0YmVycnkgdGhhdCBhcmUgbm90IGV4dGVybmFsbHlcbiAqIG1haW50YWluZWQgbGlicmFyaWVzLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdC8qKlxuXHQgKiBEZWZpbmVzIHJlYWQtb25seSBwcm9wZXJ0eS5cblx0ICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBPYmplY3QgdG8gZGVmaW5lIHByb3BlcnR5IGluLlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBOYW1lIG9mIHRoZSBwcm9wZXJ0eS5cblx0ICogQHBhcmFtIHsqfSB2YWx1ZSBQcm9wZXJ0eSB2YWx1ZS5cblx0ICovXG5cdGRlZmluZVJlYWRPbmx5OiBmdW5jdGlvbiAob2JqZWN0LCBuYW1lLCB2YWx1ZSkge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmplY3QsIG5hbWUsIHtcblx0XHRcdGVudW1lcmFibGU6IGZhbHNlLFxuXHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcblx0XHRcdHdyaXRhYmxlOiBmYWxzZSxcblx0XHRcdHZhbHVlOiB2YWx1ZVxuXHRcdH0pO1xuXHR9XG59OyIsIi8qXG4gKiBjYXRiZXJyeVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNCBEZW5pcyBSZWNoa3Vub3YgYW5kIHByb2plY3QgY29udHJpYnV0b3JzLlxuICpcbiAqIGNhdGJlcnJ5J3MgbGljZW5zZSBmb2xsb3dzOlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXG4gKiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvblxuICogZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLFxuICogaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSxcbiAqIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsXG4gKiBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuICogc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbiAqIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1NcbiAqIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICpcbiAqIFRoaXMgbGljZW5zZSBhcHBsaWVzIHRvIGFsbCBwYXJ0cyBvZiBjYXRiZXJyeSB0aGF0IGFyZSBub3QgZXh0ZXJuYWxseVxuICogbWFpbnRhaW5lZCBsaWJyYXJpZXMuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xudmFyIHV0aWwgPSByZXF1aXJlKCd1dGlsJyksXG5cdFVSSSA9IHJlcXVpcmUoJ2NhdGJlcnJ5LXVyaScpLlVSSTtcblxudmFyIFVSSV9QQVRIX1JFUExBQ0VNRU5UX1JFR19FWFBfU09VUkNFID0gJyhbXlxcXFwvXFxcXFxcXFxdKiknLFxuXHRVUklfUVVFUllfUkVQTEFDRU1FTlRfUkVHX0VYUF9TT1VSQ0UgPSAnKFteJj89XSopJztcblxudmFyIFBBVEhfRU5EX1NMQVNIX1JFR19FWFAgPSAvKC4rKVxcLygkfFxcP3wjKS8sXG5cdEVYUFJFU1NJT05fRVNDQVBFX1JFR19FWFAgPSAvW1xcLVxcW1xcXVxce1xcfVxcKFxcKVxcKlxcK1xcP1xcLlxcXFxcXF5cXCRcXHxdL2csXG5cdElERU5USUZJRVJfUkVHX0VYUF9TT1VSQ0UgPSAnWyRBLVpfXVtcXFxcZEEtWl8kXSonLFxuXHRTVE9SRV9MSVNUX1JFR19FWFBfU09VUkNFID0gJyg/Oig/OlxcXFxcXFxcW1sgXSonICtcblx0XHQnW15cXFxcW1xcXFxdLF0rJyArXG5cdFx0JyhbIF0qLFsgXSonICtcblx0XHQnW15cXFxcW1xcXFxdLF0rJyArXG5cdFx0JykqWyBdKlxcXFxcXFxcXSl8KD86XFxcXFxcXFxbWyBdKlxcXFxcXFxcXSkpPycsXG5cdFBBUkFNRVRFUl9SRUdfRVhQID0gbmV3IFJlZ0V4cChcblx0XHRcdCc6JyArXG5cdFx0XHRJREVOVElGSUVSX1JFR19FWFBfU09VUkNFICtcblx0XHRcdFNUT1JFX0xJU1RfUkVHX0VYUF9TT1VSQ0UsICdnaScpLFxuXHRTTEFTSEVEX0JSQUNLRVRTX1JFR19FWFAgPSAvXFxcXFxcW3xcXFxcXFxdLyxcblx0U1RPUkVfTElTVF9TRVBBUkFUT1IgPSAnLCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHQvKipcblx0ICogUmVtb3ZlcyBzbGFzaCBmcm9tIHRoZSBlbmQgb2YgVVJJIHBhdGguXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB1cmlQYXRoIFVSSSBwYXRoIHRvIHByb2Nlc3MuXG5cdCAqIEByZXR1cm5zIHtzdHJpbmd9XG5cdCAqL1xuXHRyZW1vdmVFbmRTbGFzaDogZnVuY3Rpb24gKHVyaVBhdGgpIHtcblx0XHRpZiAoIXVyaVBhdGggfHwgdHlwZW9mKHVyaVBhdGgpICE9PSAnc3RyaW5nJykge1xuXHRcdFx0cmV0dXJuICcnO1xuXHRcdH1cblx0XHRpZiAodXJpUGF0aCA9PT0gJy8nKSB7XG5cdFx0XHRyZXR1cm4gdXJpUGF0aDtcblx0XHR9XG5cdFx0cmV0dXJuIHVyaVBhdGgucmVwbGFjZShQQVRIX0VORF9TTEFTSF9SRUdfRVhQLCAnJDEkMicpO1xuXHR9LFxuXHQvKipcblx0ICogR2V0cyBVUkkgbWFwcGVyIGZyb20gdGhlIHJvdXRlIGV4cHJlc3Npb24gbGlrZVxuXHQgKiAvc29tZS86aWRbc3RvcmUxLCBzdG9yZTIsIHN0b3JlM10vZGV0YWlscz9maWx0ZXI9OmZpbHRlcltzdG9yZTNdXG5cdCAqIEBwYXJhbSB7VVJJfSByb3V0ZVVyaSBFeHByZXNzaW9uIHRoYXQgZGVmaW5lcyByb3V0ZS5cblx0ICogQHJldHVybnMge3tleHByZXNzaW9uOiBSZWdFeHAsIG1hcDogRnVuY3Rpb259fVxuXHQgKiBVUkkgbWFwcGVyIG9iamVjdC5cblx0ICovXG5cdGNvbXBpbGVSb3V0ZTogZnVuY3Rpb24gKHJvdXRlVXJpKSB7XG5cdFx0aWYgKCFyb3V0ZVVyaSkge1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXG5cdFx0Ly8gZXNjYXBlIHJlZ3VsYXIgZXhwcmVzc2lvbiBjaGFyYWN0ZXJzXG5cdFx0dmFyIGVzY2FwZWQgPSByb3V0ZVVyaS5wYXRoLnJlcGxhY2UoXG5cdFx0XHRFWFBSRVNTSU9OX0VTQ0FQRV9SRUdfRVhQLCAnXFxcXCQmJ1xuXHRcdCk7XG5cblx0XHQvLyBnZXQgYWxsIG9jY3VycmVuY2VzIG9mIHJvdXRpbmcgcGFyYW1ldGVycyBpbiBVUkkgcGF0aFxuXHRcdHZhciByZWdFeHBTb3VyY2UgPSAnXicgKyBlc2NhcGVkLnJlcGxhY2UoXG5cdFx0XHRcdFx0UEFSQU1FVEVSX1JFR19FWFAsXG5cdFx0XHRcdFx0VVJJX1BBVEhfUkVQTEFDRU1FTlRfUkVHX0VYUF9TT1VSQ0UpICsgJyQnLFxuXHRcdFx0ZXhwcmVzc2lvbiA9IG5ldyBSZWdFeHAocmVnRXhwU291cmNlLCAnaScpLFxuXHRcdFx0cXVlcnlNYXBwZXIsXG5cdFx0XHRwYXRoTWFwcGVyLFxuXHRcdFx0cGF0aFBhcmFtZXRlck1hdGNoZXMgPSBlc2NhcGVkLm1hdGNoKFxuXHRcdFx0XHRQQVJBTUVURVJfUkVHX0VYUFxuXHRcdFx0KSxcblx0XHRcdHBhdGhQYXJhbWV0ZXJzID0gcGF0aFBhcmFtZXRlck1hdGNoZXMgP1xuXHRcdFx0XHRwYXRoUGFyYW1ldGVyTWF0Y2hlcy5tYXAoZ2V0UGFyYW1ldGVyRGVzY3JpcHRvcikgOiBudWxsO1xuXG5cdFx0aWYgKHBhdGhQYXJhbWV0ZXJzKSB7XG5cdFx0XHRwYXRoTWFwcGVyID0gY3JlYXRlVXJpUGF0aE1hcHBlcihleHByZXNzaW9uLCBwYXRoUGFyYW1ldGVycyk7XG5cdFx0fVxuXG5cdFx0aWYgKHJvdXRlVXJpLnF1ZXJ5KSB7XG5cdFx0XHR2YXIgcXVlcnlQYXJhbWV0ZXJzID0ge307XG5cdFx0XHRPYmplY3Qua2V5cyhyb3V0ZVVyaS5xdWVyeS52YWx1ZXMpXG5cdFx0XHRcdC5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG5cdFx0XHRcdFx0Ly8gYXJyYXlzIGluIHJvdXRpbmcgZGVmaW5pdGlvbnMgYXJlIG5vdCBzdXBwb3J0ZWRcblx0XHRcdFx0XHRpZiAodXRpbC5pc0FycmF5KHJvdXRlVXJpLnF1ZXJ5LnZhbHVlc1tuYW1lXSkpIHtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBlc2NhcGUgcmVndWxhciBleHByZXNzaW9uIGNoYXJhY3RlcnNcblx0XHRcdFx0XHR2YXIgZXNjYXBlZCA9IHJvdXRlVXJpLnF1ZXJ5LnZhbHVlc1tuYW1lXS5yZXBsYWNlKFxuXHRcdFx0XHRcdFx0RVhQUkVTU0lPTl9FU0NBUEVfUkVHX0VYUCwgJ1xcXFwkJidcblx0XHRcdFx0XHQpO1xuXG5cdFx0XHRcdFx0Ly8gZ2V0IGFsbCBvY2N1cnJlbmNlcyBvZiByb3V0aW5nIHBhcmFtZXRlcnMgaW4gVVJJIHBhdGhcblx0XHRcdFx0XHR2YXIgcmVnRXhwU291cmNlID0gJ14nICsgZXNjYXBlZC5yZXBsYWNlKFxuXHRcdFx0XHRcdFx0XHRQQVJBTUVURVJfUkVHX0VYUCxcblx0XHRcdFx0XHRcdFx0VVJJX1FVRVJZX1JFUExBQ0VNRU5UX1JFR19FWFBfU09VUkNFKSArICckJztcblx0XHRcdFx0XHR2YXIgcXVlcnlQYXJhbWV0ZXJNYXRjaGVzID0gZXNjYXBlZC5tYXRjaChcblx0XHRcdFx0XHRcdFx0UEFSQU1FVEVSX1JFR19FWFBcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0aWYgKCFxdWVyeVBhcmFtZXRlck1hdGNoZXMgfHxcblx0XHRcdFx0XHRcdHF1ZXJ5UGFyYW1ldGVyTWF0Y2hlcy5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR2YXIgcGFyYW1ldGVyID0gZ2V0UGFyYW1ldGVyRGVzY3JpcHRvcihcblx0XHRcdFx0XHRcdHF1ZXJ5UGFyYW1ldGVyTWF0Y2hlc1txdWVyeVBhcmFtZXRlck1hdGNoZXMubGVuZ3RoIC0gMV1cblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdHZhciBleHByZXNzaW9uID0gbmV3IFJlZ0V4cChyZWdFeHBTb3VyY2UsICdpJyk7XG5cdFx0XHRcdFx0cGFyYW1ldGVyLm1hcCA9IGNyZWF0ZVVyaVF1ZXJ5VmFsdWVNYXBwZXIoZXhwcmVzc2lvbik7XG5cdFx0XHRcdFx0cXVlcnlQYXJhbWV0ZXJzW25hbWVdID0gcGFyYW1ldGVyO1xuXHRcdFx0XHR9KTtcblx0XHRcdHF1ZXJ5TWFwcGVyID0gY3JlYXRlVXJpUXVlcnlNYXBwZXIocXVlcnlQYXJhbWV0ZXJzKTtcblx0XHR9XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0ZXhwcmVzc2lvbjogZXhwcmVzc2lvbixcblx0XHRcdG1hcDogZnVuY3Rpb24gKHVyaSkge1xuXHRcdFx0XHR2YXIgc3RhdGUgPSB7fTtcblx0XHRcdFx0aWYgKHBhdGhNYXBwZXIpIHtcblx0XHRcdFx0XHRwYXRoTWFwcGVyKHVyaS5wYXRoLCBzdGF0ZSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAocXVlcnlNYXBwZXIgJiYgdXJpLnF1ZXJ5KSB7XG5cdFx0XHRcdFx0cXVlcnlNYXBwZXIodXJpLnF1ZXJ5LnZhbHVlcywgc3RhdGUpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIHN0YXRlO1xuXHRcdFx0fVxuXHRcdH07XG5cdH1cbn07XG5cbi8qKlxuICogQ3JlYXRlcyBuZXcgVVJJIHBhdGgtdG8tc3RhdGUgb2JqZWN0IG1hcHBlci5cbiAqIEBwYXJhbSB7UmVnRXhwfSBleHByZXNzaW9uIFJlZ3VsYXIgZXhwcmVzc2lvbiB0byBtYXRjaCBVUkkgcGF0aC5cbiAqIEBwYXJhbSB7QXJyYXl9IHBhcmFtZXRlcnMgTGlzdCBvZiBwYXJhbWV0ZXIgZGVzY3JpcHRvcnMuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFVSSSBtYXBwZXIgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZVVyaVBhdGhNYXBwZXIoZXhwcmVzc2lvbiwgcGFyYW1ldGVycykge1xuXHRyZXR1cm4gZnVuY3Rpb24gKHVyaVBhdGgsIHN0YXRlKSB7XG5cdFx0dmFyIG1hdGNoZXMgPSB1cmlQYXRoLm1hdGNoKGV4cHJlc3Npb24pO1xuXHRcdGlmICghbWF0Y2hlcyB8fCBtYXRjaGVzLmxlbmd0aCA8IDIpIHtcblx0XHRcdHJldHVybiBzdGF0ZTtcblx0XHR9XG5cblx0XHQvLyBzdGFydCB3aXRoIHNlY29uZCBtYXRjaCBiZWNhdXNlIGZpcnN0IG1hdGNoIGlzIGFsd2F5c1xuXHRcdC8vIHRoZSB3aG9sZSBVUkkgcGF0aFxuXHRcdG1hdGNoZXMgPSBtYXRjaGVzLnNwbGljZSgxKTtcblxuXHRcdHBhcmFtZXRlcnMuZm9yRWFjaChmdW5jdGlvbiAocGFyYW1ldGVyLCBpbmRleCkge1xuXHRcdFx0dmFyIHZhbHVlID0gbWF0Y2hlc1tpbmRleF07XG5cdFx0XHR0cnkge1xuXHRcdFx0XHR2YWx1ZSA9IGRlY29kZVVSSUNvbXBvbmVudCh2YWx1ZSk7XG5cdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdC8vIG5vdGhpbmcgdG8gZG9cblx0XHRcdH1cblx0XHRcdHBhcmFtZXRlci5zdG9yZU5hbWVzLmZvckVhY2goZnVuY3Rpb24gKHN0b3JlTmFtZSkge1xuXHRcdFx0XHRpZiAoIXN0YXRlW3N0b3JlTmFtZV0pIHtcblx0XHRcdFx0XHRzdGF0ZVtzdG9yZU5hbWVdID0ge307XG5cdFx0XHRcdH1cblx0XHRcdFx0c3RhdGVbc3RvcmVOYW1lXVtwYXJhbWV0ZXIubmFtZV0gPSB2YWx1ZTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgbmV3IFVSSSBxdWVyeS10by1zdGF0ZSBvYmplY3QgbWFwcGVyLlxuICogQHBhcmFtIHtPYmplY3R9IHBhcmFtZXRlcnMgTGlzdCBvZiBwb3NzaWJsZSBxdWVyeSBwYXJhbWV0ZXIgZGVzY3JpcHRvcnMgYnlcbiAqIHF1ZXJ5IHBhcmFtZXRlciBuYW1lcy5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gVVJJIG1hcHBlciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlVXJpUXVlcnlNYXBwZXIocGFyYW1ldGVycykge1xuXHRyZXR1cm4gZnVuY3Rpb24gKHF1ZXJ5VmFsdWVzLCBzdGF0ZSkge1xuXHRcdHF1ZXJ5VmFsdWVzID0gcXVlcnlWYWx1ZXMgfHwge307XG5cblx0XHRPYmplY3Qua2V5cyhxdWVyeVZhbHVlcylcblx0XHRcdC5mb3JFYWNoKGZ1bmN0aW9uIChxdWVyeUtleSkge1xuXHRcdFx0XHR2YXIgcGFyYW1ldGVyID0gcGFyYW1ldGVyc1txdWVyeUtleV07XG5cdFx0XHRcdGlmICghcGFyYW1ldGVyKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIHZhbHVlID0gdXRpbC5pc0FycmF5KHF1ZXJ5VmFsdWVzW3F1ZXJ5S2V5XSkgP1xuXHRcdFx0XHRcdFx0cXVlcnlWYWx1ZXNbcXVlcnlLZXldXG5cdFx0XHRcdFx0XHRcdC5tYXAocGFyYW1ldGVyLm1hcClcblx0XHRcdFx0XHRcdFx0LmZpbHRlcihmdW5jdGlvbiAodmFsdWUpIHtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gdmFsdWUgIT09IG51bGw7XG5cdFx0XHRcdFx0XHRcdH0pIDpcblx0XHRcdFx0XHRcdHBhcmFtZXRlci5tYXAocXVlcnlWYWx1ZXNbcXVlcnlLZXldKTtcblxuXHRcdFx0XHRpZiAodmFsdWUgPT09IG51bGwpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdFx0cGFyYW1ldGVyLnN0b3JlTmFtZXMuZm9yRWFjaChmdW5jdGlvbiAoc3RvcmVOYW1lKSB7XG5cdFx0XHRcdFx0aWYgKCFzdGF0ZVtzdG9yZU5hbWVdKSB7XG5cdFx0XHRcdFx0XHRzdGF0ZVtzdG9yZU5hbWVdID0ge307XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHN0YXRlW3N0b3JlTmFtZV1bcGFyYW1ldGVyLm5hbWVdID0gdmFsdWU7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdH07XG59XG5cbi8qKlxuICogTWFwcyBxdWVyeSBwYXJhbWV0ZXIgdmFsdWUgdXNpbmcgdGhlIHBhcmFtZXRlcnMgZXhwcmVzc2lvbi5cbiAqIEBwYXJhbSB7UmVnRXhwfSBleHByZXNzaW9uIFJlZ3VsYXIgZXhwcmVzc2lvbiB0byBnZXQgcGFyYW1ldGVyIHZhbHVlLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBVUkkgcXVlcnkgc3RyaW5nIHBhcmFtZXRlciB2YWx1ZSBtYXBwZXIgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZVVyaVF1ZXJ5VmFsdWVNYXBwZXIoZXhwcmVzc2lvbikge1xuXHRyZXR1cm4gZnVuY3Rpb24gKHZhbHVlKSB7XG5cdFx0dmFsdWUgPSB2YWx1ZS50b1N0cmluZygpO1xuXHRcdHZhciBtYXRjaGVzID0gdmFsdWUubWF0Y2goZXhwcmVzc2lvbik7XG5cdFx0aWYgKCFtYXRjaGVzIHx8IG1hdGNoZXMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cblx0XHQvLyB0aGUgdmFsdWUgaXMgdGhlIHNlY29uZCBpdGVtLCB0aGUgZmlyc3QgaXMgYSB3aG9sZSBzdHJpbmdcblx0XHR2YXIgbWFwcGVkVmFsdWUgPSBtYXRjaGVzW21hdGNoZXMubGVuZ3RoIC0gMV07XG5cdFx0dHJ5IHtcblx0XHRcdG1hcHBlZFZhbHVlID0gZGVjb2RlVVJJQ29tcG9uZW50KG1hcHBlZFZhbHVlKTtcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHQvLyBub3RoaW5nIHRvIGRvXG5cdFx0fVxuXG5cdFx0cmV0dXJuIG1hcHBlZFZhbHVlO1xuXHR9O1xufVxuXG4vKipcbiAqIEdldHMgZGVzY3JpcHRpb24gb2YgcGFyYW1ldGVycyBmcm9tIGl0cyBleHByZXNzaW9uLlxuICogQHBhcmFtIHtzdHJpbmd9IHBhcmFtZXRlciBQYXJhbWV0ZXIgZXhwcmVzc2lvbi5cbiAqIEByZXR1cm5zIHt7bmFtZTogc3RyaW5nLCBzdG9yZU5hbWVzOiBBcnJheX19IFBhcmFtZXRlciBkZXNjcmlwdG9yLlxuICovXG5mdW5jdGlvbiBnZXRQYXJhbWV0ZXJEZXNjcmlwdG9yKHBhcmFtZXRlcikge1xuXHR2YXIgcGFydHMgPSBwYXJhbWV0ZXIuc3BsaXQoU0xBU0hFRF9CUkFDS0VUU19SRUdfRVhQKTtcblxuXHRyZXR1cm4ge1xuXHRcdG5hbWU6IHBhcnRzWzBdXG5cdFx0XHQudHJpbSgpXG5cdFx0XHQuc3Vic3RyaW5nKDEpLFxuXHRcdHN0b3JlTmFtZXM6IChwYXJ0c1sxXSA/IHBhcnRzWzFdIDogJycpXG5cdFx0XHQuc3BsaXQoU1RPUkVfTElTVF9TRVBBUkFUT1IpXG5cdFx0XHQubWFwKGZ1bmN0aW9uIChzdG9yZU5hbWUpIHtcblx0XHRcdFx0cmV0dXJuIHN0b3JlTmFtZS50cmltKCk7XG5cdFx0XHR9KVxuXHRcdFx0LmZpbHRlcihmdW5jdGlvbiAoc3RvcmVOYW1lKSB7XG5cdFx0XHRcdHJldHVybiBzdG9yZU5hbWUubGVuZ3RoID4gMDtcblx0XHRcdH0pXG5cdH07XG59IiwiLypcbiAqIGNhdGJlcnJ5XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0IERlbmlzIFJlY2hrdW5vdiBhbmQgcHJvamVjdCBjb250cmlidXRvcnMuXG4gKlxuICogY2F0YmVycnkncyBsaWNlbnNlIGZvbGxvd3M6XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb25cbiAqIG9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uXG4gKiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sXG4gKiBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLFxuICogcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSxcbiAqIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4gKiBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuICogaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuICogT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKlxuICogVGhpcyBsaWNlbnNlIGFwcGxpZXMgdG8gYWxsIHBhcnRzIG9mIGNhdGJlcnJ5IHRoYXQgYXJlIG5vdCBleHRlcm5hbGx5XG4gKiBtYWludGFpbmVkIGxpYnJhcmllcy5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gU3RhdGVQcm92aWRlcjtcblxudmFyIHJvdXRlSGVscGVyID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL3JvdXRlSGVscGVyJyksXG5cdGNhdGJlcnJ5VXJpID0gcmVxdWlyZSgnY2F0YmVycnktdXJpJyksXG5cdFVSSSA9IGNhdGJlcnJ5VXJpLlVSSTtcblxuLyoqXG4gKiBDcmVhdGUgbmV3IGluc3RhbmNlIG9mIHRoZSBzdGF0ZSBwcm92aWRlci5cbiAqIEBwYXJhbSB7U2VydmljZUxvY2F0b3J9ICRzZXJ2aWNlTG9jYXRvciBTZXJ2aWNlIGxvY2F0b3JcbiAqIHRvIHJlc29sdmUgVVJJIG1hcHBlcnMuXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gU3RhdGVQcm92aWRlcigkc2VydmljZUxvY2F0b3IpIHtcblx0dGhpcy5fdXJpTWFwcGVycyA9IGdldFVyaU1hcHBlcnMoJHNlcnZpY2VMb2NhdG9yKTtcbn1cblxuLyoqXG4gKiBDdXJyZW50IGxpc3Qgb2YgVVJJIG1hcHBlcnMuXG4gKiBAdHlwZSB7QXJyYXl9XG4gKiBAcHJpdmF0ZVxuICovXG5TdGF0ZVByb3ZpZGVyLnByb3RvdHlwZS5fdXJpTWFwcGVycyA9IG51bGw7XG5cbi8qKlxuICogR2V0cyBzdGF0ZSBieSBzcGVjaWZpZWQgbG9jYXRpb24gVVJJLlxuICogQHBhcmFtIHtVUkl9IGxvY2F0aW9uIFVSSSBsb2NhdGlvbi5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFN0YXRlIG9iamVjdC5cbiAqL1xuU3RhdGVQcm92aWRlci5wcm90b3R5cGUuZ2V0U3RhdGVCeVVyaSA9IGZ1bmN0aW9uIChsb2NhdGlvbikge1xuXHRpZiAodGhpcy5fdXJpTWFwcGVycy5sZW5ndGggPT09IDApIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdGxvY2F0aW9uID0gbG9jYXRpb24uY2xvbmUoKTtcblxuXHRsb2NhdGlvbi5wYXRoID0gcm91dGVIZWxwZXIucmVtb3ZlRW5kU2xhc2gobG9jYXRpb24ucGF0aCk7XG5cdHZhciBzdGF0ZSA9IGdldFN0YXRlKHRoaXMuX3VyaU1hcHBlcnMsIGxvY2F0aW9uKTtcblxuXHRpZiAoIXN0YXRlKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHQvLyBtYWtlIHN0YXRlIG9iamVjdCBpbW11dGFibGVcblx0T2JqZWN0LmtleXMoc3RhdGUpXG5cdFx0LmZvckVhY2goZnVuY3Rpb24gKHN0b3JlTmFtZSkge1xuXHRcdFx0T2JqZWN0LmZyZWV6ZShzdGF0ZVtzdG9yZU5hbWVdKTtcblx0XHR9KTtcblx0T2JqZWN0LmZyZWV6ZShzdGF0ZSk7XG5cblx0cmV0dXJuIHN0YXRlO1xufTtcblxuLyoqXG4gKiBHZXRzIGxpc3Qgb2YgVVJJIG1hcHBlcnMuXG4gKiBAcGFyYW0ge1NlcnZpY2VMb2NhdG9yfSBzZXJ2aWNlTG9jYXRvciBTZXJ2aWNlIGxvY2F0b3IgdG8gZ2V0IHJvdXRlXG4gKiBkZWZpbml0aW9ucy5cbiAqIEByZXR1cm5zIHtBcnJheX0gTGlzdCBvZiBVUkkgbWFwcGVycy5cbiAqL1xuZnVuY3Rpb24gZ2V0VXJpTWFwcGVycyhzZXJ2aWNlTG9jYXRvcikge1xuXHR2YXIgdXJpTWFwcGVycyA9IFtdO1xuXG5cdHNlcnZpY2VMb2NhdG9yLnJlc29sdmVBbGwoJ3JvdXRlRGVmaW5pdGlvbicpXG5cdFx0LmZvckVhY2goZnVuY3Rpb24gKHJvdXRlKSB7XG5cdFx0XHQvLyBqdXN0IGNvbG9uLXBhcmFtZXRyaXplZCBzdHJpbmdcblx0XHRcdGlmICh0eXBlb2Yocm91dGUpID09PSAnc3RyaW5nJykge1xuXHRcdFx0XHR2YXIgcm91dGVVcmkgPSBuZXcgVVJJKHJvdXRlKTtcblx0XHRcdFx0cm91dGVVcmkucGF0aCA9IHJvdXRlSGVscGVyLnJlbW92ZUVuZFNsYXNoKHJvdXRlVXJpLnBhdGgpO1xuXHRcdFx0XHR1cmlNYXBwZXJzLnB1c2gocm91dGVIZWxwZXIuY29tcGlsZVJvdXRlKHJvdXRlVXJpKSk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gZXh0ZW5kZWQgY29sb24tcGFyYW1ldHJpemVkIG1hcHBlclxuXHRcdFx0aWYgKHR5cGVvZihyb3V0ZSkgPT09ICdvYmplY3QnICYmXG5cdFx0XHRcdCh0eXBlb2Yocm91dGUuZXhwcmVzc2lvbikgPT09ICdzdHJpbmcnKSAmJlxuXHRcdFx0XHQocm91dGUubWFwIGluc3RhbmNlb2YgRnVuY3Rpb24pKSB7XG5cdFx0XHRcdHZhciBtYXBwZXJVcmkgPSBuZXcgVVJJKHJvdXRlLmV4cHJlc3Npb24pO1xuXHRcdFx0XHRtYXBwZXJVcmkucGF0aCA9IHJvdXRlSGVscGVyLnJlbW92ZUVuZFNsYXNoKG1hcHBlclVyaS5wYXRoKTtcblx0XHRcdFx0dmFyIG1hcHBlciA9IHJvdXRlSGVscGVyLmNvbXBpbGVSb3V0ZShtYXBwZXJVcmkpO1xuXHRcdFx0XHR1cmlNYXBwZXJzLnB1c2goe1xuXHRcdFx0XHRcdGV4cHJlc3Npb246IG1hcHBlci5leHByZXNzaW9uLFxuXHRcdFx0XHRcdG1hcDogZnVuY3Rpb24gKHVyaSkge1xuXHRcdFx0XHRcdFx0dmFyIHN0YXRlID0gbWFwcGVyLm1hcCh1cmkpO1xuXHRcdFx0XHRcdFx0cmV0dXJuIHJvdXRlLm1hcChzdGF0ZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyByZWd1bGFyIGV4cHJlc3Npb24gbWFwcGVyXG5cdFx0XHRpZiAodHlwZW9mKHJvdXRlKSA9PT0gJ29iamVjdCcgJiZcblx0XHRcdFx0KHJvdXRlLmV4cHJlc3Npb24gaW5zdGFuY2VvZiBSZWdFeHApICYmXG5cdFx0XHRcdChyb3V0ZS5tYXAgaW5zdGFuY2VvZiBGdW5jdGlvbikpIHtcblx0XHRcdFx0dXJpTWFwcGVycy5wdXNoKHJvdXRlKTtcblx0XHRcdH1cblx0XHR9KTtcblx0cmV0dXJuIHVyaU1hcHBlcnM7XG59XG5cbi8qKlxuICogR2V0cyBzdGF0ZS5cbiAqIEBwYXJhbSB7QXJyYXl9IHVyaU1hcHBlcnMuXG4gKiBAcGFyYW0ge1VSSX0gbG9jYXRpb24uXG4gKiBAcmV0dXJucyB7T2JqZWN0fG51bGx9XG4gKi9cbmZ1bmN0aW9uIGdldFN0YXRlICh1cmlNYXBwZXJzLCBsb2NhdGlvbikge1xuXHR2YXIgc3RhdGUgPSBudWxsO1xuXG5cdHVyaU1hcHBlcnMuc29tZShmdW5jdGlvbiAobWFwcGVyKSB7XG5cdFx0aWYgKG1hcHBlci5leHByZXNzaW9uLnRlc3QobG9jYXRpb24ucGF0aCkpIHtcblx0XHRcdHN0YXRlID0gbWFwcGVyLm1hcChsb2NhdGlvbikgfHwge307XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9KTtcblxuXHRyZXR1cm4gc3RhdGU7XG59IiwiLypnbG9iYWwgZGVmaW5lOmZhbHNlIHJlcXVpcmU6ZmFsc2UgKi9cbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCl7XG5cdC8vIEltcG9ydCBFdmVudHNcblx0dmFyIGV2ZW50cyA9IHJlcXVpcmUoJ2V2ZW50cycpXG5cblx0Ly8gRXhwb3J0IERvbWFpblxuXHR2YXIgZG9tYWluID0ge31cblx0ZG9tYWluLmNyZWF0ZURvbWFpbiA9IGRvbWFpbi5jcmVhdGUgPSBmdW5jdGlvbigpe1xuXHRcdHZhciBkID0gbmV3IGV2ZW50cy5FdmVudEVtaXR0ZXIoKVxuXG5cdFx0ZnVuY3Rpb24gZW1pdEVycm9yKGUpIHtcblx0XHRcdGQuZW1pdCgnZXJyb3InLCBlKVxuXHRcdH1cblxuXHRcdGQuYWRkID0gZnVuY3Rpb24oZW1pdHRlcil7XG5cdFx0XHRlbWl0dGVyLm9uKCdlcnJvcicsIGVtaXRFcnJvcilcblx0XHR9XG5cdFx0ZC5yZW1vdmUgPSBmdW5jdGlvbihlbWl0dGVyKXtcblx0XHRcdGVtaXR0ZXIucmVtb3ZlTGlzdGVuZXIoJ2Vycm9yJywgZW1pdEVycm9yKVxuXHRcdH1cblx0XHRkLmJpbmQgPSBmdW5jdGlvbihmbil7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24oKXtcblx0XHRcdFx0dmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpXG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0Zm4uYXBwbHkobnVsbCwgYXJncylcblx0XHRcdFx0fVxuXHRcdFx0XHRjYXRjaCAoZXJyKXtcblx0XHRcdFx0XHRlbWl0RXJyb3IoZXJyKVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGQuaW50ZXJjZXB0ID0gZnVuY3Rpb24oZm4pe1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uKGVycil7XG5cdFx0XHRcdGlmICggZXJyICkge1xuXHRcdFx0XHRcdGVtaXRFcnJvcihlcnIpXG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0dmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpXG5cdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdGZuLmFwcGx5KG51bGwsIGFyZ3MpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGNhdGNoIChlcnIpe1xuXHRcdFx0XHRcdFx0ZW1pdEVycm9yKGVycilcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0ZC5ydW4gPSBmdW5jdGlvbihmbil7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRmbigpXG5cdFx0XHR9XG5cdFx0XHRjYXRjaCAoZXJyKSB7XG5cdFx0XHRcdGVtaXRFcnJvcihlcnIpXG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH07XG5cdFx0ZC5kaXNwb3NlID0gZnVuY3Rpb24oKXtcblx0XHRcdHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKClcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fTtcblx0XHRkLmVudGVyID0gZC5leGl0ID0gZnVuY3Rpb24oKXtcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fVxuXHRcdHJldHVybiBkXG5cdH07XG5cdHJldHVybiBkb21haW5cbn0pLmNhbGwodGhpcykiLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICB0aGlzLl9ldmVudHMgPSB0aGlzLl9ldmVudHMgfHwge307XG4gIHRoaXMuX21heExpc3RlbmVycyA9IHRoaXMuX21heExpc3RlbmVycyB8fCB1bmRlZmluZWQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcblxuLy8gQmFja3dhcmRzLWNvbXBhdCB3aXRoIG5vZGUgMC4xMC54XG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHMgPSB1bmRlZmluZWQ7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9tYXhMaXN0ZW5lcnMgPSB1bmRlZmluZWQ7XG5cbi8vIEJ5IGRlZmF1bHQgRXZlbnRFbWl0dGVycyB3aWxsIHByaW50IGEgd2FybmluZyBpZiBtb3JlIHRoYW4gMTAgbGlzdGVuZXJzIGFyZVxuLy8gYWRkZWQgdG8gaXQuIFRoaXMgaXMgYSB1c2VmdWwgZGVmYXVsdCB3aGljaCBoZWxwcyBmaW5kaW5nIG1lbW9yeSBsZWFrcy5cbkV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzID0gMTA7XG5cbi8vIE9idmlvdXNseSBub3QgYWxsIEVtaXR0ZXJzIHNob3VsZCBiZSBsaW1pdGVkIHRvIDEwLiBUaGlzIGZ1bmN0aW9uIGFsbG93c1xuLy8gdGhhdCB0byBiZSBpbmNyZWFzZWQuIFNldCB0byB6ZXJvIGZvciB1bmxpbWl0ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnNldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uKG4pIHtcbiAgaWYgKCFpc051bWJlcihuKSB8fCBuIDwgMCB8fCBpc05hTihuKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ24gbXVzdCBiZSBhIHBvc2l0aXZlIG51bWJlcicpO1xuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIGVyLCBoYW5kbGVyLCBsZW4sIGFyZ3MsIGksIGxpc3RlbmVycztcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcblxuICAvLyBJZiB0aGVyZSBpcyBubyAnZXJyb3InIGV2ZW50IGxpc3RlbmVyIHRoZW4gdGhyb3cuXG4gIGlmICh0eXBlID09PSAnZXJyb3InKSB7XG4gICAgaWYgKCF0aGlzLl9ldmVudHMuZXJyb3IgfHxcbiAgICAgICAgKGlzT2JqZWN0KHRoaXMuX2V2ZW50cy5lcnJvcikgJiYgIXRoaXMuX2V2ZW50cy5lcnJvci5sZW5ndGgpKSB7XG4gICAgICBlciA9IGFyZ3VtZW50c1sxXTtcbiAgICAgIGlmIChlciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIHRocm93IGVyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICAgICAgfVxuICAgICAgdGhyb3cgVHlwZUVycm9yKCdVbmNhdWdodCwgdW5zcGVjaWZpZWQgXCJlcnJvclwiIGV2ZW50LicpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZXIgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgaWYgKGlzVW5kZWZpbmVkKGhhbmRsZXIpKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBpZiAoaXNGdW5jdGlvbihoYW5kbGVyKSkge1xuICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgLy8gZmFzdCBjYXNlc1xuICAgICAgY2FzZSAxOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAyOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgYXJndW1lbnRzWzFdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBhcmd1bWVudHNbMV0sIGFyZ3VtZW50c1syXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgLy8gc2xvd2VyXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgICBhcmdzID0gbmV3IEFycmF5KGxlbiAtIDEpO1xuICAgICAgICBmb3IgKGkgPSAxOyBpIDwgbGVuOyBpKyspXG4gICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIGhhbmRsZXIuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzT2JqZWN0KGhhbmRsZXIpKSB7XG4gICAgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICBhcmdzID0gbmV3IEFycmF5KGxlbiAtIDEpO1xuICAgIGZvciAoaSA9IDE7IGkgPCBsZW47IGkrKylcbiAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuXG4gICAgbGlzdGVuZXJzID0gaGFuZGxlci5zbGljZSgpO1xuICAgIGxlbiA9IGxpc3RlbmVycy5sZW5ndGg7XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKVxuICAgICAgbGlzdGVuZXJzW2ldLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIG07XG5cbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuXG4gIC8vIFRvIGF2b2lkIHJlY3Vyc2lvbiBpbiB0aGUgY2FzZSB0aGF0IHR5cGUgPT09IFwibmV3TGlzdGVuZXJcIiEgQmVmb3JlXG4gIC8vIGFkZGluZyBpdCB0byB0aGUgbGlzdGVuZXJzLCBmaXJzdCBlbWl0IFwibmV3TGlzdGVuZXJcIi5cbiAgaWYgKHRoaXMuX2V2ZW50cy5uZXdMaXN0ZW5lcilcbiAgICB0aGlzLmVtaXQoJ25ld0xpc3RlbmVyJywgdHlwZSxcbiAgICAgICAgICAgICAgaXNGdW5jdGlvbihsaXN0ZW5lci5saXN0ZW5lcikgP1xuICAgICAgICAgICAgICBsaXN0ZW5lci5saXN0ZW5lciA6IGxpc3RlbmVyKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICAvLyBPcHRpbWl6ZSB0aGUgY2FzZSBvZiBvbmUgbGlzdGVuZXIuIERvbid0IG5lZWQgdGhlIGV4dHJhIGFycmF5IG9iamVjdC5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBsaXN0ZW5lcjtcbiAgZWxzZSBpZiAoaXNPYmplY3QodGhpcy5fZXZlbnRzW3R5cGVdKSlcbiAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IGdvdCBhbiBhcnJheSwganVzdCBhcHBlbmQuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdLnB1c2gobGlzdGVuZXIpO1xuICBlbHNlXG4gICAgLy8gQWRkaW5nIHRoZSBzZWNvbmQgZWxlbWVudCwgbmVlZCB0byBjaGFuZ2UgdG8gYXJyYXkuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gW3RoaXMuX2V2ZW50c1t0eXBlXSwgbGlzdGVuZXJdO1xuXG4gIC8vIENoZWNrIGZvciBsaXN0ZW5lciBsZWFrXG4gIGlmIChpc09iamVjdCh0aGlzLl9ldmVudHNbdHlwZV0pICYmICF0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkKSB7XG4gICAgdmFyIG07XG4gICAgaWYgKCFpc1VuZGVmaW5lZCh0aGlzLl9tYXhMaXN0ZW5lcnMpKSB7XG4gICAgICBtID0gdGhpcy5fbWF4TGlzdGVuZXJzO1xuICAgIH0gZWxzZSB7XG4gICAgICBtID0gRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gICAgfVxuXG4gICAgaWYgKG0gJiYgbSA+IDAgJiYgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCA+IG0pIHtcbiAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS53YXJuZWQgPSB0cnVlO1xuICAgICAgY29uc29sZS5lcnJvcignKG5vZGUpIHdhcm5pbmc6IHBvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgJyArXG4gICAgICAgICAgICAgICAgICAgICdsZWFrIGRldGVjdGVkLiAlZCBsaXN0ZW5lcnMgYWRkZWQuICcgK1xuICAgICAgICAgICAgICAgICAgICAnVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gaW5jcmVhc2UgbGltaXQuJyxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCk7XG4gICAgICBpZiAodHlwZW9mIGNvbnNvbGUudHJhY2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy8gbm90IHN1cHBvcnRlZCBpbiBJRSAxMFxuICAgICAgICBjb25zb2xlLnRyYWNlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIHZhciBmaXJlZCA9IGZhbHNlO1xuXG4gIGZ1bmN0aW9uIGcoKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBnKTtcblxuICAgIGlmICghZmlyZWQpIHtcbiAgICAgIGZpcmVkID0gdHJ1ZTtcbiAgICAgIGxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9XG5cbiAgZy5saXN0ZW5lciA9IGxpc3RlbmVyO1xuICB0aGlzLm9uKHR5cGUsIGcpO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gZW1pdHMgYSAncmVtb3ZlTGlzdGVuZXInIGV2ZW50IGlmZiB0aGUgbGlzdGVuZXIgd2FzIHJlbW92ZWRcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgbGlzdCwgcG9zaXRpb24sIGxlbmd0aCwgaTtcblxuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICByZXR1cm4gdGhpcztcblxuICBsaXN0ID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuICBsZW5ndGggPSBsaXN0Lmxlbmd0aDtcbiAgcG9zaXRpb24gPSAtMTtcblxuICBpZiAobGlzdCA9PT0gbGlzdGVuZXIgfHxcbiAgICAgIChpc0Z1bmN0aW9uKGxpc3QubGlzdGVuZXIpICYmIGxpc3QubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgaWYgKHRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0ZW5lcik7XG5cbiAgfSBlbHNlIGlmIChpc09iamVjdChsaXN0KSkge1xuICAgIGZvciAoaSA9IGxlbmd0aDsgaS0tID4gMDspIHtcbiAgICAgIGlmIChsaXN0W2ldID09PSBsaXN0ZW5lciB8fFxuICAgICAgICAgIChsaXN0W2ldLmxpc3RlbmVyICYmIGxpc3RbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgICAgICBwb3NpdGlvbiA9IGk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwb3NpdGlvbiA8IDApXG4gICAgICByZXR1cm4gdGhpcztcblxuICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgbGlzdC5sZW5ndGggPSAwO1xuICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGlzdC5zcGxpY2UocG9zaXRpb24sIDEpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdGVuZXIpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIGtleSwgbGlzdGVuZXJzO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIC8vIG5vdCBsaXN0ZW5pbmcgZm9yIHJlbW92ZUxpc3RlbmVyLCBubyBuZWVkIHRvIGVtaXRcbiAgaWYgKCF0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMClcbiAgICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIGVsc2UgaWYgKHRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBlbWl0IHJlbW92ZUxpc3RlbmVyIGZvciBhbGwgbGlzdGVuZXJzIG9uIGFsbCBldmVudHNcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICBmb3IgKGtleSBpbiB0aGlzLl9ldmVudHMpIHtcbiAgICAgIGlmIChrZXkgPT09ICdyZW1vdmVMaXN0ZW5lcicpIGNvbnRpbnVlO1xuICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoa2V5KTtcbiAgICB9XG4gICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ3JlbW92ZUxpc3RlbmVyJyk7XG4gICAgdGhpcy5fZXZlbnRzID0ge307XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgaWYgKGlzRnVuY3Rpb24obGlzdGVuZXJzKSkge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBMSUZPIG9yZGVyXG4gICAgd2hpbGUgKGxpc3RlbmVycy5sZW5ndGgpXG4gICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyc1tsaXN0ZW5lcnMubGVuZ3RoIC0gMV0pO1xuICB9XG4gIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIHJldDtcbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICByZXQgPSBbXTtcbiAgZWxzZSBpZiAoaXNGdW5jdGlvbih0aGlzLl9ldmVudHNbdHlwZV0pKVxuICAgIHJldCA9IFt0aGlzLl9ldmVudHNbdHlwZV1dO1xuICBlbHNlXG4gICAgcmV0ID0gdGhpcy5fZXZlbnRzW3R5cGVdLnNsaWNlKCk7XG4gIHJldHVybiByZXQ7XG59O1xuXG5FdmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKGVtaXR0ZXIsIHR5cGUpIHtcbiAgdmFyIHJldDtcbiAgaWYgKCFlbWl0dGVyLl9ldmVudHMgfHwgIWVtaXR0ZXIuX2V2ZW50c1t0eXBlXSlcbiAgICByZXQgPSAwO1xuICBlbHNlIGlmIChpc0Z1bmN0aW9uKGVtaXR0ZXIuX2V2ZW50c1t0eXBlXSkpXG4gICAgcmV0ID0gMTtcbiAgZWxzZVxuICAgIHJldCA9IGVtaXR0ZXIuX2V2ZW50c1t0eXBlXS5sZW5ndGg7XG4gIHJldHVybiByZXQ7XG59O1xuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuZnVuY3Rpb24gaXNOdW1iZXIoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnbnVtYmVyJztcbn1cblxuZnVuY3Rpb24gaXNPYmplY3QoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnb2JqZWN0JyAmJiBhcmcgIT09IG51bGw7XG59XG5cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKGFyZykge1xuICByZXR1cm4gYXJnID09PSB2b2lkIDA7XG59XG4iLCJpZiAodHlwZW9mIE9iamVjdC5jcmVhdGUgPT09ICdmdW5jdGlvbicpIHtcbiAgLy8gaW1wbGVtZW50YXRpb24gZnJvbSBzdGFuZGFyZCBub2RlLmpzICd1dGlsJyBtb2R1bGVcbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbmhlcml0cyhjdG9yLCBzdXBlckN0b3IpIHtcbiAgICBjdG9yLnN1cGVyXyA9IHN1cGVyQ3RvclxuICAgIGN0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckN0b3IucHJvdG90eXBlLCB7XG4gICAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgICB2YWx1ZTogY3RvcixcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcbn0gZWxzZSB7XG4gIC8vIG9sZCBzY2hvb2wgc2hpbSBmb3Igb2xkIGJyb3dzZXJzXG4gIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaW5oZXJpdHMoY3Rvciwgc3VwZXJDdG9yKSB7XG4gICAgY3Rvci5zdXBlcl8gPSBzdXBlckN0b3JcbiAgICB2YXIgVGVtcEN0b3IgPSBmdW5jdGlvbiAoKSB7fVxuICAgIFRlbXBDdG9yLnByb3RvdHlwZSA9IHN1cGVyQ3Rvci5wcm90b3R5cGVcbiAgICBjdG9yLnByb3RvdHlwZSA9IG5ldyBUZW1wQ3RvcigpXG4gICAgY3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjdG9yXG4gIH1cbn1cbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxuXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmICghZHJhaW5pbmcpIHtcbiAgICAgICAgc2V0VGltZW91dChkcmFpblF1ZXVlLCAwKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbi8vIFRPRE8oc2h0eWxtYW4pXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQnVmZmVyKGFyZykge1xuICByZXR1cm4gYXJnICYmIHR5cGVvZiBhcmcgPT09ICdvYmplY3QnXG4gICAgJiYgdHlwZW9mIGFyZy5jb3B5ID09PSAnZnVuY3Rpb24nXG4gICAgJiYgdHlwZW9mIGFyZy5maWxsID09PSAnZnVuY3Rpb24nXG4gICAgJiYgdHlwZW9mIGFyZy5yZWFkVUludDggPT09ICdmdW5jdGlvbic7XG59IiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbnZhciBmb3JtYXRSZWdFeHAgPSAvJVtzZGolXS9nO1xuZXhwb3J0cy5mb3JtYXQgPSBmdW5jdGlvbihmKSB7XG4gIGlmICghaXNTdHJpbmcoZikpIHtcbiAgICB2YXIgb2JqZWN0cyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBvYmplY3RzLnB1c2goaW5zcGVjdChhcmd1bWVudHNbaV0pKTtcbiAgICB9XG4gICAgcmV0dXJuIG9iamVjdHMuam9pbignICcpO1xuICB9XG5cbiAgdmFyIGkgPSAxO1xuICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgdmFyIGxlbiA9IGFyZ3MubGVuZ3RoO1xuICB2YXIgc3RyID0gU3RyaW5nKGYpLnJlcGxhY2UoZm9ybWF0UmVnRXhwLCBmdW5jdGlvbih4KSB7XG4gICAgaWYgKHggPT09ICclJScpIHJldHVybiAnJSc7XG4gICAgaWYgKGkgPj0gbGVuKSByZXR1cm4geDtcbiAgICBzd2l0Y2ggKHgpIHtcbiAgICAgIGNhc2UgJyVzJzogcmV0dXJuIFN0cmluZyhhcmdzW2krK10pO1xuICAgICAgY2FzZSAnJWQnOiByZXR1cm4gTnVtYmVyKGFyZ3NbaSsrXSk7XG4gICAgICBjYXNlICclaic6XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGFyZ3NbaSsrXSk7XG4gICAgICAgIH0gY2F0Y2ggKF8pIHtcbiAgICAgICAgICByZXR1cm4gJ1tDaXJjdWxhcl0nO1xuICAgICAgICB9XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4geDtcbiAgICB9XG4gIH0pO1xuICBmb3IgKHZhciB4ID0gYXJnc1tpXTsgaSA8IGxlbjsgeCA9IGFyZ3NbKytpXSkge1xuICAgIGlmIChpc051bGwoeCkgfHwgIWlzT2JqZWN0KHgpKSB7XG4gICAgICBzdHIgKz0gJyAnICsgeDtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RyICs9ICcgJyArIGluc3BlY3QoeCk7XG4gICAgfVxuICB9XG4gIHJldHVybiBzdHI7XG59O1xuXG5cbi8vIE1hcmsgdGhhdCBhIG1ldGhvZCBzaG91bGQgbm90IGJlIHVzZWQuXG4vLyBSZXR1cm5zIGEgbW9kaWZpZWQgZnVuY3Rpb24gd2hpY2ggd2FybnMgb25jZSBieSBkZWZhdWx0LlxuLy8gSWYgLS1uby1kZXByZWNhdGlvbiBpcyBzZXQsIHRoZW4gaXQgaXMgYSBuby1vcC5cbmV4cG9ydHMuZGVwcmVjYXRlID0gZnVuY3Rpb24oZm4sIG1zZykge1xuICAvLyBBbGxvdyBmb3IgZGVwcmVjYXRpbmcgdGhpbmdzIGluIHRoZSBwcm9jZXNzIG9mIHN0YXJ0aW5nIHVwLlxuICBpZiAoaXNVbmRlZmluZWQoZ2xvYmFsLnByb2Nlc3MpKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGV4cG9ydHMuZGVwcmVjYXRlKGZuLCBtc2cpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfVxuXG4gIGlmIChwcm9jZXNzLm5vRGVwcmVjYXRpb24gPT09IHRydWUpIHtcbiAgICByZXR1cm4gZm47XG4gIH1cblxuICB2YXIgd2FybmVkID0gZmFsc2U7XG4gIGZ1bmN0aW9uIGRlcHJlY2F0ZWQoKSB7XG4gICAgaWYgKCF3YXJuZWQpIHtcbiAgICAgIGlmIChwcm9jZXNzLnRocm93RGVwcmVjYXRpb24pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG4gICAgICB9IGVsc2UgaWYgKHByb2Nlc3MudHJhY2VEZXByZWNhdGlvbikge1xuICAgICAgICBjb25zb2xlLnRyYWNlKG1zZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmVycm9yKG1zZyk7XG4gICAgICB9XG4gICAgICB3YXJuZWQgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIHJldHVybiBkZXByZWNhdGVkO1xufTtcblxuXG52YXIgZGVidWdzID0ge307XG52YXIgZGVidWdFbnZpcm9uO1xuZXhwb3J0cy5kZWJ1Z2xvZyA9IGZ1bmN0aW9uKHNldCkge1xuICBpZiAoaXNVbmRlZmluZWQoZGVidWdFbnZpcm9uKSlcbiAgICBkZWJ1Z0Vudmlyb24gPSBwcm9jZXNzLmVudi5OT0RFX0RFQlVHIHx8ICcnO1xuICBzZXQgPSBzZXQudG9VcHBlckNhc2UoKTtcbiAgaWYgKCFkZWJ1Z3Nbc2V0XSkge1xuICAgIGlmIChuZXcgUmVnRXhwKCdcXFxcYicgKyBzZXQgKyAnXFxcXGInLCAnaScpLnRlc3QoZGVidWdFbnZpcm9uKSkge1xuICAgICAgdmFyIHBpZCA9IHByb2Nlc3MucGlkO1xuICAgICAgZGVidWdzW3NldF0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG1zZyA9IGV4cG9ydHMuZm9ybWF0LmFwcGx5KGV4cG9ydHMsIGFyZ3VtZW50cyk7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJyVzICVkOiAlcycsIHNldCwgcGlkLCBtc2cpO1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVidWdzW3NldF0gPSBmdW5jdGlvbigpIHt9O1xuICAgIH1cbiAgfVxuICByZXR1cm4gZGVidWdzW3NldF07XG59O1xuXG5cbi8qKlxuICogRWNob3MgdGhlIHZhbHVlIG9mIGEgdmFsdWUuIFRyeXMgdG8gcHJpbnQgdGhlIHZhbHVlIG91dFxuICogaW4gdGhlIGJlc3Qgd2F5IHBvc3NpYmxlIGdpdmVuIHRoZSBkaWZmZXJlbnQgdHlwZXMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBUaGUgb2JqZWN0IHRvIHByaW50IG91dC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzIE9wdGlvbmFsIG9wdGlvbnMgb2JqZWN0IHRoYXQgYWx0ZXJzIHRoZSBvdXRwdXQuXG4gKi9cbi8qIGxlZ2FjeTogb2JqLCBzaG93SGlkZGVuLCBkZXB0aCwgY29sb3JzKi9cbmZ1bmN0aW9uIGluc3BlY3Qob2JqLCBvcHRzKSB7XG4gIC8vIGRlZmF1bHQgb3B0aW9uc1xuICB2YXIgY3R4ID0ge1xuICAgIHNlZW46IFtdLFxuICAgIHN0eWxpemU6IHN0eWxpemVOb0NvbG9yXG4gIH07XG4gIC8vIGxlZ2FjeS4uLlxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+PSAzKSBjdHguZGVwdGggPSBhcmd1bWVudHNbMl07XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID49IDQpIGN0eC5jb2xvcnMgPSBhcmd1bWVudHNbM107XG4gIGlmIChpc0Jvb2xlYW4ob3B0cykpIHtcbiAgICAvLyBsZWdhY3kuLi5cbiAgICBjdHguc2hvd0hpZGRlbiA9IG9wdHM7XG4gIH0gZWxzZSBpZiAob3B0cykge1xuICAgIC8vIGdvdCBhbiBcIm9wdGlvbnNcIiBvYmplY3RcbiAgICBleHBvcnRzLl9leHRlbmQoY3R4LCBvcHRzKTtcbiAgfVxuICAvLyBzZXQgZGVmYXVsdCBvcHRpb25zXG4gIGlmIChpc1VuZGVmaW5lZChjdHguc2hvd0hpZGRlbikpIGN0eC5zaG93SGlkZGVuID0gZmFsc2U7XG4gIGlmIChpc1VuZGVmaW5lZChjdHguZGVwdGgpKSBjdHguZGVwdGggPSAyO1xuICBpZiAoaXNVbmRlZmluZWQoY3R4LmNvbG9ycykpIGN0eC5jb2xvcnMgPSBmYWxzZTtcbiAgaWYgKGlzVW5kZWZpbmVkKGN0eC5jdXN0b21JbnNwZWN0KSkgY3R4LmN1c3RvbUluc3BlY3QgPSB0cnVlO1xuICBpZiAoY3R4LmNvbG9ycykgY3R4LnN0eWxpemUgPSBzdHlsaXplV2l0aENvbG9yO1xuICByZXR1cm4gZm9ybWF0VmFsdWUoY3R4LCBvYmosIGN0eC5kZXB0aCk7XG59XG5leHBvcnRzLmluc3BlY3QgPSBpbnNwZWN0O1xuXG5cbi8vIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQU5TSV9lc2NhcGVfY29kZSNncmFwaGljc1xuaW5zcGVjdC5jb2xvcnMgPSB7XG4gICdib2xkJyA6IFsxLCAyMl0sXG4gICdpdGFsaWMnIDogWzMsIDIzXSxcbiAgJ3VuZGVybGluZScgOiBbNCwgMjRdLFxuICAnaW52ZXJzZScgOiBbNywgMjddLFxuICAnd2hpdGUnIDogWzM3LCAzOV0sXG4gICdncmV5JyA6IFs5MCwgMzldLFxuICAnYmxhY2snIDogWzMwLCAzOV0sXG4gICdibHVlJyA6IFszNCwgMzldLFxuICAnY3lhbicgOiBbMzYsIDM5XSxcbiAgJ2dyZWVuJyA6IFszMiwgMzldLFxuICAnbWFnZW50YScgOiBbMzUsIDM5XSxcbiAgJ3JlZCcgOiBbMzEsIDM5XSxcbiAgJ3llbGxvdycgOiBbMzMsIDM5XVxufTtcblxuLy8gRG9uJ3QgdXNlICdibHVlJyBub3QgdmlzaWJsZSBvbiBjbWQuZXhlXG5pbnNwZWN0LnN0eWxlcyA9IHtcbiAgJ3NwZWNpYWwnOiAnY3lhbicsXG4gICdudW1iZXInOiAneWVsbG93JyxcbiAgJ2Jvb2xlYW4nOiAneWVsbG93JyxcbiAgJ3VuZGVmaW5lZCc6ICdncmV5JyxcbiAgJ251bGwnOiAnYm9sZCcsXG4gICdzdHJpbmcnOiAnZ3JlZW4nLFxuICAnZGF0ZSc6ICdtYWdlbnRhJyxcbiAgLy8gXCJuYW1lXCI6IGludGVudGlvbmFsbHkgbm90IHN0eWxpbmdcbiAgJ3JlZ2V4cCc6ICdyZWQnXG59O1xuXG5cbmZ1bmN0aW9uIHN0eWxpemVXaXRoQ29sb3Ioc3RyLCBzdHlsZVR5cGUpIHtcbiAgdmFyIHN0eWxlID0gaW5zcGVjdC5zdHlsZXNbc3R5bGVUeXBlXTtcblxuICBpZiAoc3R5bGUpIHtcbiAgICByZXR1cm4gJ1xcdTAwMWJbJyArIGluc3BlY3QuY29sb3JzW3N0eWxlXVswXSArICdtJyArIHN0ciArXG4gICAgICAgICAgICdcXHUwMDFiWycgKyBpbnNwZWN0LmNvbG9yc1tzdHlsZV1bMV0gKyAnbSc7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHN0cjtcbiAgfVxufVxuXG5cbmZ1bmN0aW9uIHN0eWxpemVOb0NvbG9yKHN0ciwgc3R5bGVUeXBlKSB7XG4gIHJldHVybiBzdHI7XG59XG5cblxuZnVuY3Rpb24gYXJyYXlUb0hhc2goYXJyYXkpIHtcbiAgdmFyIGhhc2ggPSB7fTtcblxuICBhcnJheS5mb3JFYWNoKGZ1bmN0aW9uKHZhbCwgaWR4KSB7XG4gICAgaGFzaFt2YWxdID0gdHJ1ZTtcbiAgfSk7XG5cbiAgcmV0dXJuIGhhc2g7XG59XG5cblxuZnVuY3Rpb24gZm9ybWF0VmFsdWUoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzKSB7XG4gIC8vIFByb3ZpZGUgYSBob29rIGZvciB1c2VyLXNwZWNpZmllZCBpbnNwZWN0IGZ1bmN0aW9ucy5cbiAgLy8gQ2hlY2sgdGhhdCB2YWx1ZSBpcyBhbiBvYmplY3Qgd2l0aCBhbiBpbnNwZWN0IGZ1bmN0aW9uIG9uIGl0XG4gIGlmIChjdHguY3VzdG9tSW5zcGVjdCAmJlxuICAgICAgdmFsdWUgJiZcbiAgICAgIGlzRnVuY3Rpb24odmFsdWUuaW5zcGVjdCkgJiZcbiAgICAgIC8vIEZpbHRlciBvdXQgdGhlIHV0aWwgbW9kdWxlLCBpdCdzIGluc3BlY3QgZnVuY3Rpb24gaXMgc3BlY2lhbFxuICAgICAgdmFsdWUuaW5zcGVjdCAhPT0gZXhwb3J0cy5pbnNwZWN0ICYmXG4gICAgICAvLyBBbHNvIGZpbHRlciBvdXQgYW55IHByb3RvdHlwZSBvYmplY3RzIHVzaW5nIHRoZSBjaXJjdWxhciBjaGVjay5cbiAgICAgICEodmFsdWUuY29uc3RydWN0b3IgJiYgdmFsdWUuY29uc3RydWN0b3IucHJvdG90eXBlID09PSB2YWx1ZSkpIHtcbiAgICB2YXIgcmV0ID0gdmFsdWUuaW5zcGVjdChyZWN1cnNlVGltZXMsIGN0eCk7XG4gICAgaWYgKCFpc1N0cmluZyhyZXQpKSB7XG4gICAgICByZXQgPSBmb3JtYXRWYWx1ZShjdHgsIHJldCwgcmVjdXJzZVRpbWVzKTtcbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbiAgfVxuXG4gIC8vIFByaW1pdGl2ZSB0eXBlcyBjYW5ub3QgaGF2ZSBwcm9wZXJ0aWVzXG4gIHZhciBwcmltaXRpdmUgPSBmb3JtYXRQcmltaXRpdmUoY3R4LCB2YWx1ZSk7XG4gIGlmIChwcmltaXRpdmUpIHtcbiAgICByZXR1cm4gcHJpbWl0aXZlO1xuICB9XG5cbiAgLy8gTG9vayB1cCB0aGUga2V5cyBvZiB0aGUgb2JqZWN0LlxuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHZhbHVlKTtcbiAgdmFyIHZpc2libGVLZXlzID0gYXJyYXlUb0hhc2goa2V5cyk7XG5cbiAgaWYgKGN0eC5zaG93SGlkZGVuKSB7XG4gICAga2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHZhbHVlKTtcbiAgfVxuXG4gIC8vIElFIGRvZXNuJ3QgbWFrZSBlcnJvciBmaWVsZHMgbm9uLWVudW1lcmFibGVcbiAgLy8gaHR0cDovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L2llL2R3dzUyc2J0KHY9dnMuOTQpLmFzcHhcbiAgaWYgKGlzRXJyb3IodmFsdWUpXG4gICAgICAmJiAoa2V5cy5pbmRleE9mKCdtZXNzYWdlJykgPj0gMCB8fCBrZXlzLmluZGV4T2YoJ2Rlc2NyaXB0aW9uJykgPj0gMCkpIHtcbiAgICByZXR1cm4gZm9ybWF0RXJyb3IodmFsdWUpO1xuICB9XG5cbiAgLy8gU29tZSB0eXBlIG9mIG9iamVjdCB3aXRob3V0IHByb3BlcnRpZXMgY2FuIGJlIHNob3J0Y3V0dGVkLlxuICBpZiAoa2V5cy5sZW5ndGggPT09IDApIHtcbiAgICBpZiAoaXNGdW5jdGlvbih2YWx1ZSkpIHtcbiAgICAgIHZhciBuYW1lID0gdmFsdWUubmFtZSA/ICc6ICcgKyB2YWx1ZS5uYW1lIDogJyc7XG4gICAgICByZXR1cm4gY3R4LnN0eWxpemUoJ1tGdW5jdGlvbicgKyBuYW1lICsgJ10nLCAnc3BlY2lhbCcpO1xuICAgIH1cbiAgICBpZiAoaXNSZWdFeHAodmFsdWUpKSB7XG4gICAgICByZXR1cm4gY3R4LnN0eWxpemUoUmVnRXhwLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSwgJ3JlZ2V4cCcpO1xuICAgIH1cbiAgICBpZiAoaXNEYXRlKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGN0eC5zdHlsaXplKERhdGUucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpLCAnZGF0ZScpO1xuICAgIH1cbiAgICBpZiAoaXNFcnJvcih2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBmb3JtYXRFcnJvcih2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgdmFyIGJhc2UgPSAnJywgYXJyYXkgPSBmYWxzZSwgYnJhY2VzID0gWyd7JywgJ30nXTtcblxuICAvLyBNYWtlIEFycmF5IHNheSB0aGF0IHRoZXkgYXJlIEFycmF5XG4gIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgIGFycmF5ID0gdHJ1ZTtcbiAgICBicmFjZXMgPSBbJ1snLCAnXSddO1xuICB9XG5cbiAgLy8gTWFrZSBmdW5jdGlvbnMgc2F5IHRoYXQgdGhleSBhcmUgZnVuY3Rpb25zXG4gIGlmIChpc0Z1bmN0aW9uKHZhbHVlKSkge1xuICAgIHZhciBuID0gdmFsdWUubmFtZSA/ICc6ICcgKyB2YWx1ZS5uYW1lIDogJyc7XG4gICAgYmFzZSA9ICcgW0Z1bmN0aW9uJyArIG4gKyAnXSc7XG4gIH1cblxuICAvLyBNYWtlIFJlZ0V4cHMgc2F5IHRoYXQgdGhleSBhcmUgUmVnRXhwc1xuICBpZiAoaXNSZWdFeHAodmFsdWUpKSB7XG4gICAgYmFzZSA9ICcgJyArIFJlZ0V4cC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG4gIH1cblxuICAvLyBNYWtlIGRhdGVzIHdpdGggcHJvcGVydGllcyBmaXJzdCBzYXkgdGhlIGRhdGVcbiAgaWYgKGlzRGF0ZSh2YWx1ZSkpIHtcbiAgICBiYXNlID0gJyAnICsgRGF0ZS5wcm90b3R5cGUudG9VVENTdHJpbmcuY2FsbCh2YWx1ZSk7XG4gIH1cblxuICAvLyBNYWtlIGVycm9yIHdpdGggbWVzc2FnZSBmaXJzdCBzYXkgdGhlIGVycm9yXG4gIGlmIChpc0Vycm9yKHZhbHVlKSkge1xuICAgIGJhc2UgPSAnICcgKyBmb3JtYXRFcnJvcih2YWx1ZSk7XG4gIH1cblxuICBpZiAoa2V5cy5sZW5ndGggPT09IDAgJiYgKCFhcnJheSB8fCB2YWx1ZS5sZW5ndGggPT0gMCkpIHtcbiAgICByZXR1cm4gYnJhY2VzWzBdICsgYmFzZSArIGJyYWNlc1sxXTtcbiAgfVxuXG4gIGlmIChyZWN1cnNlVGltZXMgPCAwKSB7XG4gICAgaWYgKGlzUmVnRXhwKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGN0eC5zdHlsaXplKFJlZ0V4cC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSksICdyZWdleHAnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGN0eC5zdHlsaXplKCdbT2JqZWN0XScsICdzcGVjaWFsJyk7XG4gICAgfVxuICB9XG5cbiAgY3R4LnNlZW4ucHVzaCh2YWx1ZSk7XG5cbiAgdmFyIG91dHB1dDtcbiAgaWYgKGFycmF5KSB7XG4gICAgb3V0cHV0ID0gZm9ybWF0QXJyYXkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cywga2V5cyk7XG4gIH0gZWxzZSB7XG4gICAgb3V0cHV0ID0ga2V5cy5tYXAoZnVuY3Rpb24oa2V5KSB7XG4gICAgICByZXR1cm4gZm9ybWF0UHJvcGVydHkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cywga2V5LCBhcnJheSk7XG4gICAgfSk7XG4gIH1cblxuICBjdHguc2Vlbi5wb3AoKTtcblxuICByZXR1cm4gcmVkdWNlVG9TaW5nbGVTdHJpbmcob3V0cHV0LCBiYXNlLCBicmFjZXMpO1xufVxuXG5cbmZ1bmN0aW9uIGZvcm1hdFByaW1pdGl2ZShjdHgsIHZhbHVlKSB7XG4gIGlmIChpc1VuZGVmaW5lZCh2YWx1ZSkpXG4gICAgcmV0dXJuIGN0eC5zdHlsaXplKCd1bmRlZmluZWQnLCAndW5kZWZpbmVkJyk7XG4gIGlmIChpc1N0cmluZyh2YWx1ZSkpIHtcbiAgICB2YXIgc2ltcGxlID0gJ1xcJycgKyBKU09OLnN0cmluZ2lmeSh2YWx1ZSkucmVwbGFjZSgvXlwifFwiJC9nLCAnJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8nL2csIFwiXFxcXCdcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXFxcXCIvZywgJ1wiJykgKyAnXFwnJztcbiAgICByZXR1cm4gY3R4LnN0eWxpemUoc2ltcGxlLCAnc3RyaW5nJyk7XG4gIH1cbiAgaWYgKGlzTnVtYmVyKHZhbHVlKSlcbiAgICByZXR1cm4gY3R4LnN0eWxpemUoJycgKyB2YWx1ZSwgJ251bWJlcicpO1xuICBpZiAoaXNCb29sZWFuKHZhbHVlKSlcbiAgICByZXR1cm4gY3R4LnN0eWxpemUoJycgKyB2YWx1ZSwgJ2Jvb2xlYW4nKTtcbiAgLy8gRm9yIHNvbWUgcmVhc29uIHR5cGVvZiBudWxsIGlzIFwib2JqZWN0XCIsIHNvIHNwZWNpYWwgY2FzZSBoZXJlLlxuICBpZiAoaXNOdWxsKHZhbHVlKSlcbiAgICByZXR1cm4gY3R4LnN0eWxpemUoJ251bGwnLCAnbnVsbCcpO1xufVxuXG5cbmZ1bmN0aW9uIGZvcm1hdEVycm9yKHZhbHVlKSB7XG4gIHJldHVybiAnWycgKyBFcnJvci5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSkgKyAnXSc7XG59XG5cblxuZnVuY3Rpb24gZm9ybWF0QXJyYXkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cywga2V5cykge1xuICB2YXIgb3V0cHV0ID0gW107XG4gIGZvciAodmFyIGkgPSAwLCBsID0gdmFsdWUubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgaWYgKGhhc093blByb3BlcnR5KHZhbHVlLCBTdHJpbmcoaSkpKSB7XG4gICAgICBvdXRwdXQucHVzaChmb3JtYXRQcm9wZXJ0eShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLFxuICAgICAgICAgIFN0cmluZyhpKSwgdHJ1ZSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvdXRwdXQucHVzaCgnJyk7XG4gICAgfVxuICB9XG4gIGtleXMuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcbiAgICBpZiAoIWtleS5tYXRjaCgvXlxcZCskLykpIHtcbiAgICAgIG91dHB1dC5wdXNoKGZvcm1hdFByb3BlcnR5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsXG4gICAgICAgICAga2V5LCB0cnVlKSk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIG91dHB1dDtcbn1cblxuXG5mdW5jdGlvbiBmb3JtYXRQcm9wZXJ0eShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLCBrZXksIGFycmF5KSB7XG4gIHZhciBuYW1lLCBzdHIsIGRlc2M7XG4gIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHZhbHVlLCBrZXkpIHx8IHsgdmFsdWU6IHZhbHVlW2tleV0gfTtcbiAgaWYgKGRlc2MuZ2V0KSB7XG4gICAgaWYgKGRlc2Muc2V0KSB7XG4gICAgICBzdHIgPSBjdHguc3R5bGl6ZSgnW0dldHRlci9TZXR0ZXJdJywgJ3NwZWNpYWwnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RyID0gY3R4LnN0eWxpemUoJ1tHZXR0ZXJdJywgJ3NwZWNpYWwnKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKGRlc2Muc2V0KSB7XG4gICAgICBzdHIgPSBjdHguc3R5bGl6ZSgnW1NldHRlcl0nLCAnc3BlY2lhbCcpO1xuICAgIH1cbiAgfVxuICBpZiAoIWhhc093blByb3BlcnR5KHZpc2libGVLZXlzLCBrZXkpKSB7XG4gICAgbmFtZSA9ICdbJyArIGtleSArICddJztcbiAgfVxuICBpZiAoIXN0cikge1xuICAgIGlmIChjdHguc2Vlbi5pbmRleE9mKGRlc2MudmFsdWUpIDwgMCkge1xuICAgICAgaWYgKGlzTnVsbChyZWN1cnNlVGltZXMpKSB7XG4gICAgICAgIHN0ciA9IGZvcm1hdFZhbHVlKGN0eCwgZGVzYy52YWx1ZSwgbnVsbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdHIgPSBmb3JtYXRWYWx1ZShjdHgsIGRlc2MudmFsdWUsIHJlY3Vyc2VUaW1lcyAtIDEpO1xuICAgICAgfVxuICAgICAgaWYgKHN0ci5pbmRleE9mKCdcXG4nKSA+IC0xKSB7XG4gICAgICAgIGlmIChhcnJheSkge1xuICAgICAgICAgIHN0ciA9IHN0ci5zcGxpdCgnXFxuJykubWFwKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICAgICAgICAgIHJldHVybiAnICAnICsgbGluZTtcbiAgICAgICAgICB9KS5qb2luKCdcXG4nKS5zdWJzdHIoMik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3RyID0gJ1xcbicgKyBzdHIuc3BsaXQoJ1xcbicpLm1hcChmdW5jdGlvbihsaW5lKSB7XG4gICAgICAgICAgICByZXR1cm4gJyAgICcgKyBsaW5lO1xuICAgICAgICAgIH0pLmpvaW4oJ1xcbicpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0ciA9IGN0eC5zdHlsaXplKCdbQ2lyY3VsYXJdJywgJ3NwZWNpYWwnKTtcbiAgICB9XG4gIH1cbiAgaWYgKGlzVW5kZWZpbmVkKG5hbWUpKSB7XG4gICAgaWYgKGFycmF5ICYmIGtleS5tYXRjaCgvXlxcZCskLykpIHtcbiAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuICAgIG5hbWUgPSBKU09OLnN0cmluZ2lmeSgnJyArIGtleSk7XG4gICAgaWYgKG5hbWUubWF0Y2goL15cIihbYS16QS1aX11bYS16QS1aXzAtOV0qKVwiJC8pKSB7XG4gICAgICBuYW1lID0gbmFtZS5zdWJzdHIoMSwgbmFtZS5sZW5ndGggLSAyKTtcbiAgICAgIG5hbWUgPSBjdHguc3R5bGl6ZShuYW1lLCAnbmFtZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICBuYW1lID0gbmFtZS5yZXBsYWNlKC8nL2csIFwiXFxcXCdcIilcbiAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcXFxcIi9nLCAnXCInKVxuICAgICAgICAgICAgICAgICAucmVwbGFjZSgvKF5cInxcIiQpL2csIFwiJ1wiKTtcbiAgICAgIG5hbWUgPSBjdHguc3R5bGl6ZShuYW1lLCAnc3RyaW5nJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5hbWUgKyAnOiAnICsgc3RyO1xufVxuXG5cbmZ1bmN0aW9uIHJlZHVjZVRvU2luZ2xlU3RyaW5nKG91dHB1dCwgYmFzZSwgYnJhY2VzKSB7XG4gIHZhciBudW1MaW5lc0VzdCA9IDA7XG4gIHZhciBsZW5ndGggPSBvdXRwdXQucmVkdWNlKGZ1bmN0aW9uKHByZXYsIGN1cikge1xuICAgIG51bUxpbmVzRXN0Kys7XG4gICAgaWYgKGN1ci5pbmRleE9mKCdcXG4nKSA+PSAwKSBudW1MaW5lc0VzdCsrO1xuICAgIHJldHVybiBwcmV2ICsgY3VyLnJlcGxhY2UoL1xcdTAwMWJcXFtcXGRcXGQ/bS9nLCAnJykubGVuZ3RoICsgMTtcbiAgfSwgMCk7XG5cbiAgaWYgKGxlbmd0aCA+IDYwKSB7XG4gICAgcmV0dXJuIGJyYWNlc1swXSArXG4gICAgICAgICAgIChiYXNlID09PSAnJyA/ICcnIDogYmFzZSArICdcXG4gJykgK1xuICAgICAgICAgICAnICcgK1xuICAgICAgICAgICBvdXRwdXQuam9pbignLFxcbiAgJykgK1xuICAgICAgICAgICAnICcgK1xuICAgICAgICAgICBicmFjZXNbMV07XG4gIH1cblxuICByZXR1cm4gYnJhY2VzWzBdICsgYmFzZSArICcgJyArIG91dHB1dC5qb2luKCcsICcpICsgJyAnICsgYnJhY2VzWzFdO1xufVxuXG5cbi8vIE5PVEU6IFRoZXNlIHR5cGUgY2hlY2tpbmcgZnVuY3Rpb25zIGludGVudGlvbmFsbHkgZG9uJ3QgdXNlIGBpbnN0YW5jZW9mYFxuLy8gYmVjYXVzZSBpdCBpcyBmcmFnaWxlIGFuZCBjYW4gYmUgZWFzaWx5IGZha2VkIHdpdGggYE9iamVjdC5jcmVhdGUoKWAuXG5mdW5jdGlvbiBpc0FycmF5KGFyKSB7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KGFyKTtcbn1cbmV4cG9ydHMuaXNBcnJheSA9IGlzQXJyYXk7XG5cbmZ1bmN0aW9uIGlzQm9vbGVhbihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdib29sZWFuJztcbn1cbmV4cG9ydHMuaXNCb29sZWFuID0gaXNCb29sZWFuO1xuXG5mdW5jdGlvbiBpc051bGwoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IG51bGw7XG59XG5leHBvcnRzLmlzTnVsbCA9IGlzTnVsbDtcblxuZnVuY3Rpb24gaXNOdWxsT3JVbmRlZmluZWQoYXJnKSB7XG4gIHJldHVybiBhcmcgPT0gbnVsbDtcbn1cbmV4cG9ydHMuaXNOdWxsT3JVbmRlZmluZWQgPSBpc051bGxPclVuZGVmaW5lZDtcblxuZnVuY3Rpb24gaXNOdW1iZXIoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnbnVtYmVyJztcbn1cbmV4cG9ydHMuaXNOdW1iZXIgPSBpc051bWJlcjtcblxuZnVuY3Rpb24gaXNTdHJpbmcoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnc3RyaW5nJztcbn1cbmV4cG9ydHMuaXNTdHJpbmcgPSBpc1N0cmluZztcblxuZnVuY3Rpb24gaXNTeW1ib2woYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnc3ltYm9sJztcbn1cbmV4cG9ydHMuaXNTeW1ib2wgPSBpc1N5bWJvbDtcblxuZnVuY3Rpb24gaXNVbmRlZmluZWQoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IHZvaWQgMDtcbn1cbmV4cG9ydHMuaXNVbmRlZmluZWQgPSBpc1VuZGVmaW5lZDtcblxuZnVuY3Rpb24gaXNSZWdFeHAocmUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KHJlKSAmJiBvYmplY3RUb1N0cmluZyhyZSkgPT09ICdbb2JqZWN0IFJlZ0V4cF0nO1xufVxuZXhwb3J0cy5pc1JlZ0V4cCA9IGlzUmVnRXhwO1xuXG5mdW5jdGlvbiBpc09iamVjdChhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdvYmplY3QnICYmIGFyZyAhPT0gbnVsbDtcbn1cbmV4cG9ydHMuaXNPYmplY3QgPSBpc09iamVjdDtcblxuZnVuY3Rpb24gaXNEYXRlKGQpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KGQpICYmIG9iamVjdFRvU3RyaW5nKGQpID09PSAnW29iamVjdCBEYXRlXSc7XG59XG5leHBvcnRzLmlzRGF0ZSA9IGlzRGF0ZTtcblxuZnVuY3Rpb24gaXNFcnJvcihlKSB7XG4gIHJldHVybiBpc09iamVjdChlKSAmJlxuICAgICAgKG9iamVjdFRvU3RyaW5nKGUpID09PSAnW29iamVjdCBFcnJvcl0nIHx8IGUgaW5zdGFuY2VvZiBFcnJvcik7XG59XG5leHBvcnRzLmlzRXJyb3IgPSBpc0Vycm9yO1xuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ2Z1bmN0aW9uJztcbn1cbmV4cG9ydHMuaXNGdW5jdGlvbiA9IGlzRnVuY3Rpb247XG5cbmZ1bmN0aW9uIGlzUHJpbWl0aXZlKGFyZykge1xuICByZXR1cm4gYXJnID09PSBudWxsIHx8XG4gICAgICAgICB0eXBlb2YgYXJnID09PSAnYm9vbGVhbicgfHxcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICdudW1iZXInIHx8XG4gICAgICAgICB0eXBlb2YgYXJnID09PSAnc3RyaW5nJyB8fFxuICAgICAgICAgdHlwZW9mIGFyZyA9PT0gJ3N5bWJvbCcgfHwgIC8vIEVTNiBzeW1ib2xcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICd1bmRlZmluZWQnO1xufVxuZXhwb3J0cy5pc1ByaW1pdGl2ZSA9IGlzUHJpbWl0aXZlO1xuXG5leHBvcnRzLmlzQnVmZmVyID0gcmVxdWlyZSgnLi9zdXBwb3J0L2lzQnVmZmVyJyk7XG5cbmZ1bmN0aW9uIG9iamVjdFRvU3RyaW5nKG8pIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKTtcbn1cblxuXG5mdW5jdGlvbiBwYWQobikge1xuICByZXR1cm4gbiA8IDEwID8gJzAnICsgbi50b1N0cmluZygxMCkgOiBuLnRvU3RyaW5nKDEwKTtcbn1cblxuXG52YXIgbW9udGhzID0gWydKYW4nLCAnRmViJywgJ01hcicsICdBcHInLCAnTWF5JywgJ0p1bicsICdKdWwnLCAnQXVnJywgJ1NlcCcsXG4gICAgICAgICAgICAgICdPY3QnLCAnTm92JywgJ0RlYyddO1xuXG4vLyAyNiBGZWIgMTY6MTk6MzRcbmZ1bmN0aW9uIHRpbWVzdGFtcCgpIHtcbiAgdmFyIGQgPSBuZXcgRGF0ZSgpO1xuICB2YXIgdGltZSA9IFtwYWQoZC5nZXRIb3VycygpKSxcbiAgICAgICAgICAgICAgcGFkKGQuZ2V0TWludXRlcygpKSxcbiAgICAgICAgICAgICAgcGFkKGQuZ2V0U2Vjb25kcygpKV0uam9pbignOicpO1xuICByZXR1cm4gW2QuZ2V0RGF0ZSgpLCBtb250aHNbZC5nZXRNb250aCgpXSwgdGltZV0uam9pbignICcpO1xufVxuXG5cbi8vIGxvZyBpcyBqdXN0IGEgdGhpbiB3cmFwcGVyIHRvIGNvbnNvbGUubG9nIHRoYXQgcHJlcGVuZHMgYSB0aW1lc3RhbXBcbmV4cG9ydHMubG9nID0gZnVuY3Rpb24oKSB7XG4gIGNvbnNvbGUubG9nKCclcyAtICVzJywgdGltZXN0YW1wKCksIGV4cG9ydHMuZm9ybWF0LmFwcGx5KGV4cG9ydHMsIGFyZ3VtZW50cykpO1xufTtcblxuXG4vKipcbiAqIEluaGVyaXQgdGhlIHByb3RvdHlwZSBtZXRob2RzIGZyb20gb25lIGNvbnN0cnVjdG9yIGludG8gYW5vdGhlci5cbiAqXG4gKiBUaGUgRnVuY3Rpb24ucHJvdG90eXBlLmluaGVyaXRzIGZyb20gbGFuZy5qcyByZXdyaXR0ZW4gYXMgYSBzdGFuZGFsb25lXG4gKiBmdW5jdGlvbiAobm90IG9uIEZ1bmN0aW9uLnByb3RvdHlwZSkuIE5PVEU6IElmIHRoaXMgZmlsZSBpcyB0byBiZSBsb2FkZWRcbiAqIGR1cmluZyBib290c3RyYXBwaW5nIHRoaXMgZnVuY3Rpb24gbmVlZHMgdG8gYmUgcmV3cml0dGVuIHVzaW5nIHNvbWUgbmF0aXZlXG4gKiBmdW5jdGlvbnMgYXMgcHJvdG90eXBlIHNldHVwIHVzaW5nIG5vcm1hbCBKYXZhU2NyaXB0IGRvZXMgbm90IHdvcmsgYXNcbiAqIGV4cGVjdGVkIGR1cmluZyBib290c3RyYXBwaW5nIChzZWUgbWlycm9yLmpzIGluIHIxMTQ5MDMpLlxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGN0b3IgQ29uc3RydWN0b3IgZnVuY3Rpb24gd2hpY2ggbmVlZHMgdG8gaW5oZXJpdCB0aGVcbiAqICAgICBwcm90b3R5cGUuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBzdXBlckN0b3IgQ29uc3RydWN0b3IgZnVuY3Rpb24gdG8gaW5oZXJpdCBwcm90b3R5cGUgZnJvbS5cbiAqL1xuZXhwb3J0cy5pbmhlcml0cyA9IHJlcXVpcmUoJ2luaGVyaXRzJyk7XG5cbmV4cG9ydHMuX2V4dGVuZCA9IGZ1bmN0aW9uKG9yaWdpbiwgYWRkKSB7XG4gIC8vIERvbid0IGRvIGFueXRoaW5nIGlmIGFkZCBpc24ndCBhbiBvYmplY3RcbiAgaWYgKCFhZGQgfHwgIWlzT2JqZWN0KGFkZCkpIHJldHVybiBvcmlnaW47XG5cbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhhZGQpO1xuICB2YXIgaSA9IGtleXMubGVuZ3RoO1xuICB3aGlsZSAoaS0tKSB7XG4gICAgb3JpZ2luW2tleXNbaV1dID0gYWRkW2tleXNbaV1dO1xuICB9XG4gIHJldHVybiBvcmlnaW47XG59O1xuXG5mdW5jdGlvbiBoYXNPd25Qcm9wZXJ0eShvYmosIHByb3ApIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApO1xufVxuIiwiLypcbiAqIGNhdGJlcnJ5LWxvY2F0b3JcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgRGVuaXMgUmVjaGt1bm92IGFuZCBwcm9qZWN0IGNvbnRyaWJ1dG9ycy5cbiAqXG4gKiBjYXRiZXJyeS1sb2NhdG9yJ3MgbGljZW5zZSBmb2xsb3dzOlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXG4gKiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvblxuICogZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLFxuICogaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSxcbiAqIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsXG4gKiBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuICogc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbiAqIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1NcbiAqIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiAqIFNPRlRXQVJFLlxuICpcbiAqIFRoaXMgbGljZW5zZSBhcHBsaWVzIHRvIGFsbCBwYXJ0cyBvZiBjYXRiZXJyeS1sb2NhdG9yIHRoYXQgYXJlIG5vdCBleHRlcm5hbGx5XG4gKiBtYWludGFpbmVkIGxpYnJhcmllcy5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gQ29uc3RydWN0b3JUb2tlbml6ZXI7XG5cbnZhciBTVEFURVMgPSB7XG5cdElMTEVHQUw6IC0xLFxuXHROTzogMCxcblx0SURFTlRJRklFUjogMSxcblx0RlVOQ1RJT046IDIsXG5cdFBBUkVOVEhFU0VTX09QRU46IDMsXG5cdFBBUkVOVEhFU0VTX0NMT1NFOiA0LFxuXHRDT01NQTogNSxcblx0RU5EOiA2XG59O1xuQ29uc3RydWN0b3JUb2tlbml6ZXIuU1RBVEVTID0gU1RBVEVTO1xuXG52YXIgS0VZV09SRFMgPSB7XG5cdEZVTkNUSU9OOiAnZnVuY3Rpb24nXG59O1xuXG52YXIgV0hJVEVTUEFDRV9URVNUID0gL15cXHMkLyxcblx0SURFTlRJRklFUl9URVNUID0gL15bXFwkXFx3XSQvO1xuXG5mdW5jdGlvbiBDb25zdHJ1Y3RvclRva2VuaXplcihjb25zdHJ1Y3RvclNvdXJjZSkge1xuXHR0aGlzLl9zb3VyY2UgPSBTdHJpbmcoY29uc3RydWN0b3JTb3VyY2UgfHwgJycpO1xufVxuXG4vKipcbiAqIEN1cnJlbnQgc291cmNlIGNvZGUgb2YgY29uc3RydWN0b3IuXG4gKiBAdHlwZSB7c3RyaW5nfVxuICogQHByaXZhdGVcbiAqL1xuQ29uc3RydWN0b3JUb2tlbml6ZXIucHJvdG90eXBlLl9zb3VyY2UgPSAnJztcblxuLyoqXG4gKiBDdXJyZW50IGluZGV4IGluIHNvdXJjZSBjb2RlLlxuICogQHR5cGUge251bWJlcn1cbiAqIEBwcml2YXRlXG4gKi9cbkNvbnN0cnVjdG9yVG9rZW5pemVyLnByb3RvdHlwZS5fY3VycmVudEluZGV4ID0gMDtcblxuLyoqXG4gKiBDdXJyZW50IGluZGV4IGluIHNvdXJjZSBjb2RlLlxuICogQHR5cGUge251bWJlcn1cbiAqIEBwcml2YXRlXG4gKi9cbkNvbnN0cnVjdG9yVG9rZW5pemVyLnByb3RvdHlwZS5fY3VycmVudEVuZCA9IDA7XG5cbi8qKlxuICogQ3VycmVudCBzdGF0ZS5cbiAqIEB0eXBlIHtudW1iZXJ9XG4gKiBAcHJpdmF0ZVxuICovXG5Db25zdHJ1Y3RvclRva2VuaXplci5wcm90b3R5cGUuX2N1cnJlbnRTdGF0ZSA9IFNUQVRFUy5OTztcblxuLyoqXG4gKiBHZXRzIG5leHQgdG9rZW4gaW4gc291cmNlLlxuICogQHJldHVybnMge3tzdGF0ZTogKG51bWJlciksIHN0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyfX1cbiAqL1xuQ29uc3RydWN0b3JUb2tlbml6ZXIucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAoKSB7XG5cdGlmICh0aGlzLl9jdXJyZW50U3RhdGUgPT09IFNUQVRFUy5JTExFR0FMIHx8XG5cdFx0dGhpcy5fY3VycmVudFN0YXRlID09PSBTVEFURVMuRU5EKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHN0YXRlOiB0aGlzLl9jdXJyZW50U3RhdGUsXG5cdFx0XHRzdGFydDogdGhpcy5fY3VycmVudEluZGV4LFxuXHRcdFx0ZW5kOiB0aGlzLl9jdXJyZW50SW5kZXggKyAxXG5cdFx0fTtcblx0fVxuXG5cdHZhciBzdGFydCA9IHRoaXMuX2N1cnJlbnRJbmRleCxcblx0XHRzdGF0ZSA9IHRoaXMuX2N1cnJlbnRTdGF0ZTtcblxuXHRzd2l0Y2ggKHRoaXMuX2N1cnJlbnRTdGF0ZSkge1xuXHRcdGNhc2UgU1RBVEVTLlBBUkVOVEhFU0VTX09QRU46XG5cdFx0XHR0aGlzLnBhcmVudGhlc2VzT3BlblN0YXRlKCk7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIFNUQVRFUy5QQVJFTlRIRVNFU19DTE9TRTpcblx0XHRcdHRoaXMucGFyZW50aGVzZXNDbG9zZVN0YXRlKCk7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIFNUQVRFUy5JREVOVElGSUVSOlxuXHRcdFx0dGhpcy5pZGVudGlmaWVyU3RhdGUoKTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgU1RBVEVTLkNPTU1BOlxuXHRcdFx0dGhpcy5jb21tYVN0YXRlKCk7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIFNUQVRFUy5GVU5DVElPTjpcblx0XHRcdHRoaXMuZnVuY3Rpb25TdGF0ZSgpO1xuXHRcdFx0YnJlYWs7XG5cdFx0ZGVmYXVsdDpcblx0XHRcdHRoaXMuc2tpcFdoaXRlc3BhY2UoKTtcblx0XHRcdHZhciBleHBlY3RlZCA9IHRoaXMuX3NvdXJjZS5zdWJzdHIoXG5cdFx0XHRcdHRoaXMuX2N1cnJlbnRJbmRleCwgS0VZV09SRFMuRlVOQ1RJT04ubGVuZ3RoXG5cdFx0XHQpO1xuXHRcdFx0aWYgKGV4cGVjdGVkID09PSBLRVlXT1JEUy5GVU5DVElPTikge1xuXHRcdFx0XHR0aGlzLl9jdXJyZW50U3RhdGUgPSBTVEFURVMuRlVOQ1RJT047XG5cdFx0XHRcdHJldHVybiB0aGlzLm5leHQoKTtcblx0XHRcdH1cblxuXHRcdFx0c3RhdGUgPSBTVEFURVMuSUxMRUdBTDtcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0c3RhdGU6IHN0YXRlLFxuXHRcdHN0YXJ0OiBzdGFydCxcblx0XHRlbmQ6IHRoaXMuX2N1cnJlbnRFbmRcblx0fTtcbn07XG5cbi8qKlxuICogU2tpcHMgYWxsIHdoaXRlc3BhY2UgY2hhcmFjdGVycy5cbiAqL1xuQ29uc3RydWN0b3JUb2tlbml6ZXIucHJvdG90eXBlLnNraXBXaGl0ZXNwYWNlID0gZnVuY3Rpb24gKCkge1xuXHR3aGlsZSAoXG5cdFx0dGhpcy5fY3VycmVudEluZGV4IDwgdGhpcy5fc291cmNlLmxlbmd0aCAmJlxuXHRcdFdISVRFU1BBQ0VfVEVTVC50ZXN0KHRoaXMuX3NvdXJjZVt0aGlzLl9jdXJyZW50SW5kZXhdKSkge1xuXHRcdHRoaXMuX2N1cnJlbnRJbmRleCsrO1xuXHR9XG59O1xuXG4vKipcbiAqIERlc2NyaWJlcyBQQVJFTlRIRVNFU19PUEVOIHN0YXRlIG9mIG1hY2hpbmUuXG4gKi9cbkNvbnN0cnVjdG9yVG9rZW5pemVyLnByb3RvdHlwZS5wYXJlbnRoZXNlc09wZW5TdGF0ZSA9IGZ1bmN0aW9uICgpIHtcblx0dGhpcy5fY3VycmVudEluZGV4Kys7XG5cdHRoaXMuX2N1cnJlbnRFbmQgPSB0aGlzLl9jdXJyZW50SW5kZXg7XG5cblx0dGhpcy5za2lwV2hpdGVzcGFjZSgpO1xuXHRpZiAoSURFTlRJRklFUl9URVNULnRlc3QodGhpcy5fc291cmNlW3RoaXMuX2N1cnJlbnRJbmRleF0pKSB7XG5cdFx0dGhpcy5fY3VycmVudFN0YXRlID0gU1RBVEVTLklERU5USUZJRVI7XG5cdH0gZWxzZSBpZiAodGhpcy5fc291cmNlW3RoaXMuX2N1cnJlbnRJbmRleF0gPT09ICcpJykge1xuXHRcdHRoaXMuX2N1cnJlbnRTdGF0ZSA9IFNUQVRFUy5QQVJFTlRIRVNFU19DTE9TRTtcblx0fSBlbHNlIHtcblx0XHR0aGlzLl9jdXJyZW50U3RhdGUgPSBTVEFURVMuSUxMRUdBTDtcblx0fVxufTtcblxuLyoqXG4gKiBEZXNjcmliZXMgUEFSRU5USEVTRVNfQ0xPU0Ugc3RhdGUgb2YgbWFjaGluZS5cbiAqL1xuQ29uc3RydWN0b3JUb2tlbml6ZXIucHJvdG90eXBlLnBhcmVudGhlc2VzQ2xvc2VTdGF0ZSA9IGZ1bmN0aW9uICgpIHtcblx0dGhpcy5fY3VycmVudEluZGV4Kys7XG5cdHRoaXMuX2N1cnJlbnRFbmQgPSB0aGlzLl9jdXJyZW50SW5kZXg7XG5cdHRoaXMuX2N1cnJlbnRTdGF0ZSA9IFNUQVRFUy5FTkQ7XG59O1xuXG4vKipcbiAqIERlc2NyaWJlcyBGVU5DVElPTiBzdGF0ZSBvZiBtYWNoaW5lLlxuICovXG5Db25zdHJ1Y3RvclRva2VuaXplci5wcm90b3R5cGUuZnVuY3Rpb25TdGF0ZSA9IGZ1bmN0aW9uICgpIHtcblx0dGhpcy5fY3VycmVudEluZGV4ICs9IEtFWVdPUkRTLkZVTkNUSU9OLmxlbmd0aDtcblx0dGhpcy5fY3VycmVudEVuZCA9IHRoaXMuX2N1cnJlbnRJbmRleDtcblxuXHR0aGlzLnNraXBXaGl0ZXNwYWNlKCk7XG5cblx0aWYgKHRoaXMuX3NvdXJjZVt0aGlzLl9jdXJyZW50SW5kZXhdID09PSAnKCcpIHtcblx0XHR0aGlzLl9jdXJyZW50U3RhdGUgPSBTVEFURVMuUEFSRU5USEVTRVNfT1BFTjtcblx0fSBlbHNlIGlmIChJREVOVElGSUVSX1RFU1QudGVzdCh0aGlzLl9zb3VyY2VbdGhpcy5fY3VycmVudEluZGV4XSkpIHtcblx0XHR0aGlzLl9jdXJyZW50U3RhdGUgPSBTVEFURVMuSURFTlRJRklFUjtcblx0fSBlbHNlIHtcblx0XHR0aGlzLl9jdXJyZW50U3RhdGUgPSBTVEFURVMuSUxMRUdBTDtcblx0fVxufTtcblxuLyoqXG4gKiBEZXNjcmliZXMgSURFTlRJRklFUiBzdGF0ZSBvZiBtYWNoaW5lLlxuICovXG5Db25zdHJ1Y3RvclRva2VuaXplci5wcm90b3R5cGUuaWRlbnRpZmllclN0YXRlID0gZnVuY3Rpb24gKCkge1xuXHR3aGlsZSAoXG5cdFx0dGhpcy5fY3VycmVudEluZGV4IDwgdGhpcy5fc291cmNlLmxlbmd0aCAmJlxuXHRcdElERU5USUZJRVJfVEVTVC50ZXN0KHRoaXMuX3NvdXJjZVt0aGlzLl9jdXJyZW50SW5kZXhdKSkge1xuXHRcdHRoaXMuX2N1cnJlbnRJbmRleCsrO1xuXHR9XG5cblx0dGhpcy5fY3VycmVudEVuZCA9IHRoaXMuX2N1cnJlbnRJbmRleDtcblxuXHR0aGlzLnNraXBXaGl0ZXNwYWNlKCk7XG5cdGlmICh0aGlzLl9zb3VyY2VbdGhpcy5fY3VycmVudEluZGV4XSA9PT0gJygnKSB7XG5cdFx0dGhpcy5fY3VycmVudFN0YXRlID0gU1RBVEVTLlBBUkVOVEhFU0VTX09QRU47XG5cdH0gZWxzZSBpZiAodGhpcy5fc291cmNlW3RoaXMuX2N1cnJlbnRJbmRleF0gPT09ICcpJykge1xuXHRcdHRoaXMuX2N1cnJlbnRTdGF0ZSA9IFNUQVRFUy5QQVJFTlRIRVNFU19DTE9TRTtcblx0fSBlbHNlIGlmICh0aGlzLl9zb3VyY2VbdGhpcy5fY3VycmVudEluZGV4XSA9PT0gJywnKSB7XG5cdFx0dGhpcy5fY3VycmVudFN0YXRlID0gU1RBVEVTLkNPTU1BO1xuXHR9IGVsc2Uge1xuXHRcdHRoaXMuX2N1cnJlbnRTdGF0ZSA9IFNUQVRFUy5JTExFR0FMO1xuXHR9XG59O1xuXG4vKipcbiAqIERlc2NyaWJlcyBDT01NQSBzdGF0ZSBvZiBtYWNoaW5lLlxuICovXG5Db25zdHJ1Y3RvclRva2VuaXplci5wcm90b3R5cGUuY29tbWFTdGF0ZSA9IGZ1bmN0aW9uICgpIHtcblx0dGhpcy5fY3VycmVudEluZGV4Kys7XG5cdHRoaXMuX2N1cnJlbnRFbmQgPSB0aGlzLl9jdXJyZW50SW5kZXg7XG5cblx0dGhpcy5za2lwV2hpdGVzcGFjZSgpO1xuXHRpZiAoSURFTlRJRklFUl9URVNULnRlc3QodGhpcy5fc291cmNlW3RoaXMuX2N1cnJlbnRJbmRleF0pKSB7XG5cdFx0dGhpcy5fY3VycmVudFN0YXRlID0gU1RBVEVTLklERU5USUZJRVI7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHRoaXMuX2N1cnJlbnRTdGF0ZSA9IFNUQVRFUy5JTExFR0FMO1xufTsiLCIvKlxuICogY2F0YmVycnktbG9jYXRvclxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNCBEZW5pcyBSZWNoa3Vub3YgYW5kIHByb2plY3QgY29udHJpYnV0b3JzLlxuICpcbiAqIGNhdGJlcnJ5LWxvY2F0b3IncyBsaWNlbnNlIGZvbGxvd3M6XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb25cbiAqIG9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uXG4gKiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sXG4gKiBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLFxuICogcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSxcbiAqIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4gKiBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuICogaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuICogT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuICogU09GVFdBUkUuXG4gKlxuICogVGhpcyBsaWNlbnNlIGFwcGxpZXMgdG8gYWxsIHBhcnRzIG9mIGNhdGJlcnJ5LWxvY2F0b3IgdGhhdCBhcmUgbm90IGV4dGVybmFsbHlcbiAqIG1haW50YWluZWQgbGlicmFyaWVzLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBTZXJ2aWNlTG9jYXRvcjtcblxudmFyIHV0aWwgPSByZXF1aXJlKCd1dGlsJyksXG5cdENvbnN0cnVjdG9yVG9rZW5pemVyID0gcmVxdWlyZSgnLi9Db25zdHJ1Y3RvclRva2VuaXplcicpO1xuXG52YXIgREVQRU5ERU5DWV9SRUdFWFAgPSAvXlxcJFxcdysvLFxuXHRFUlJPUl9DT05TVFJVQ1RPUl9TSE9VTERfQkVfRlVOQ1RJT04gPSAnQ29uc3RydWN0b3Igc2hvdWxkIGJlIGEgZnVuY3Rpb24nLFxuXHRFUlJPUl9UWVBFX05PVF9SRUdJU1RFUkVEID0gJ1R5cGUgXCIlc1wiIG5vdCByZWdpc3RlcmVkJyxcblx0RVJST1JfVFlQRV9TSE9VTERfQkVfU1RSSU5HID0gJ1R5cGUgbmFtZSBcIiVzXCIgc2hvdWxkIGJlIGEgc3RyaW5nJztcblxuLyoqXG4gKiBDcmVhdGVzIG5ldyBpbnN0YW5jZSBvZiBzZXJ2aWNlIGxvY2F0b3IuXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gU2VydmljZUxvY2F0b3IoKSB7XG5cdHRoaXMuX3JlZ2lzdHJhdGlvbnMgPSB7fTtcbn1cblxuLyoqXG4gKiBDdXJyZW50IHR5cGUgcmVnaXN0cmF0aW9ucy5cbiAqIEB0eXBlIHtPYmplY3R9XG4gKiBAcHJvdGVjdGVkXG4gKi9cblNlcnZpY2VMb2NhdG9yLnByb3RvdHlwZS5fcmVnaXN0cmF0aW9ucyA9IG51bGw7XG5cbi8qKlxuICogUmVnaXN0ZXJzIG5ldyB0eXBlIGluIHNlcnZpY2UgbG9jYXRvci5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIFR5cGUgbmFtZSwgd2hpY2ggd2lsbCBiZSBhbGlhcyBpbiBvdGhlciBjb25zdHJ1Y3RvcnMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb25zdHJ1Y3RvciBDb25zdHJ1Y3RvciB3aGljaFxuICogaW5pdGlhbGl6ZXMgaW5zdGFuY2Ugb2Ygc3BlY2lmaWVkIHR5cGUuXG4gKiBAcGFyYW0ge09iamVjdD99IHBhcmFtZXRlcnMgU2V0IG9mIG5hbWVkIHBhcmFtZXRlcnNcbiAqIHdoaWNoIHdpbGwgYmUgYWxzbyBpbmplY3RlZC5cbiAqIEBwYXJhbSB7Ym9vbGVhbj99IGlzU2luZ2xldG9uIElmIHRydWUgZXZlcnkgcmVzb2x2ZSB3aWxsIHJldHVyblxuICogdGhlIHNhbWUgaW5zdGFuY2UuXG4gKi9cblNlcnZpY2VMb2NhdG9yLnByb3RvdHlwZS5yZWdpc3RlciA9XG5cdGZ1bmN0aW9uICh0eXBlLCBjb25zdHJ1Y3RvciwgcGFyYW1ldGVycywgaXNTaW5nbGV0b24pIHtcblx0XHR0aHJvd0lmTm90RnVuY3Rpb24oY29uc3RydWN0b3IpO1xuXHRcdHRocm93SWZOb3RTdHJpbmcodHlwZSk7XG5cblx0XHRpbml0aWFsaXplUmVnaXN0cmF0aW9uKHR5cGUsIHRoaXMpO1xuXHRcdHZhciBwYXJhbWV0ZXJOYW1lcyA9IGdldFBhcmFtZXRlck5hbWVzKGNvbnN0cnVjdG9yKTtcblxuXHRcdHRoaXMuX3JlZ2lzdHJhdGlvbnNbdHlwZV0udW5zaGlmdCh7XG5cdFx0XHRjb25zdHJ1Y3RvcjogY29uc3RydWN0b3IsXG5cdFx0XHRwYXJhbWV0ZXJzOiBwYXJhbWV0ZXJzIHx8IHt9LFxuXHRcdFx0cGFyYW1ldGVyTmFtZXM6IHBhcmFtZXRlck5hbWVzLFxuXHRcdFx0aXNTaW5nbGV0b246IEJvb2xlYW4oaXNTaW5nbGV0b24pLFxuXHRcdFx0c2luZ2xlSW5zdGFuY2U6IG51bGxcblx0XHR9KTtcblx0fTtcblxuLyoqXG4gKiBSZWdpc3RlcnMgc2luZ2xlIGluc3RhbmNlIGZvciBzcGVjaWZpZWQgdHlwZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIFR5cGUgbmFtZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZSBJbnN0YW5jZSB0byByZWdpc3Rlci5cbiAqL1xuU2VydmljZUxvY2F0b3IucHJvdG90eXBlLnJlZ2lzdGVySW5zdGFuY2UgPSBmdW5jdGlvbiAodHlwZSwgaW5zdGFuY2UpIHtcblx0dGhyb3dJZk5vdFN0cmluZyh0eXBlKTtcblx0aW5pdGlhbGl6ZVJlZ2lzdHJhdGlvbih0eXBlLCB0aGlzKTtcblxuXHR0aGlzLl9yZWdpc3RyYXRpb25zW3R5cGVdLnVuc2hpZnQoe1xuXHRcdGNvbnN0cnVjdG9yOiBpbnN0YW5jZS5jb25zdHJ1Y3Rvcixcblx0XHRwYXJhbWV0ZXJzOiB7fSxcblx0XHRwYXJhbWV0ZXJOYW1lczogW10sXG5cdFx0aXNTaW5nbGV0b246IHRydWUsXG5cdFx0c2luZ2xlSW5zdGFuY2U6IGluc3RhbmNlXG5cdH0pO1xufTtcblxuLyoqXG4gKiBSZXNvbHZlcyBsYXN0IHJlZ2lzdGVyZWQgaW1wbGVtZW50YXRpb24gYnkgdHlwZSBuYW1lXG4gKiBpbmNsdWRpbmcgYWxsIGl0cyBkZXBlbmRlbmNpZXMgcmVjdXJzaXZlbHkuXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZSBUeXBlIG5hbWUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBJbnN0YW5jZSBvZiBzcGVjaWZpZWQgdHlwZS5cbiAqL1xuU2VydmljZUxvY2F0b3IucHJvdG90eXBlLnJlc29sdmUgPSBmdW5jdGlvbiAodHlwZSkge1xuXHR0aHJvd0lmTm90U3RyaW5nKHR5cGUpO1xuXHR0aHJvd0lmTm9UeXBlKHRoaXMuX3JlZ2lzdHJhdGlvbnMsIHR5cGUpO1xuXHR2YXIgZmlyc3RSZWdpc3RyYXRpb24gPSB0aGlzLl9yZWdpc3RyYXRpb25zW3R5cGVdWzBdO1xuXHRyZXR1cm4gY3JlYXRlSW5zdGFuY2UoZmlyc3RSZWdpc3RyYXRpb24sIHRoaXMpO1xufTtcblxuLyoqXG4gKiBSZXNvbHZlcyBhbGwgcmVnaXN0ZXJlZCBpbXBsZW1lbnRhdGlvbnMgYnkgdHlwZSBuYW1lXG4gKiBpbmNsdWRpbmcgYWxsIGRlcGVuZGVuY2llcyByZWN1cnNpdmVseS5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIFR5cGUgbmFtZS5cbiAqIEByZXR1cm5zIHtBcnJheX0gQXJyYXkgb2YgaW5zdGFuY2VzIHNwZWNpZmllZCB0eXBlLlxuICovXG5TZXJ2aWNlTG9jYXRvci5wcm90b3R5cGUucmVzb2x2ZUFsbCA9IGZ1bmN0aW9uICh0eXBlKSB7XG5cdHRocm93SWZOb3RTdHJpbmcodHlwZSk7XG5cdHRyeSB7XG5cdFx0dGhyb3dJZk5vVHlwZSh0aGlzLl9yZWdpc3RyYXRpb25zLCB0eXBlKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdHJldHVybiBbXTtcblx0fVxuXHRyZXR1cm4gdGhpcy5fcmVnaXN0cmF0aW9uc1t0eXBlXS5tYXAoZnVuY3Rpb24gKHJlZ2lzdHJhdGlvbikge1xuXHRcdHJldHVybiBjcmVhdGVJbnN0YW5jZShyZWdpc3RyYXRpb24sIHRoaXMpO1xuXHR9LCB0aGlzKTtcbn07XG5cbi8qKlxuICogUmVzb2x2ZXMgaW5zdGFuY2Ugb2Ygc3BlY2lmaWVkIGNvbnN0cnVjdG9yIGluY2x1ZGluZyBkZXBlbmRlbmNpZXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb25zdHJ1Y3RvciBDb25zdHJ1Y3RvciBmb3IgaW5zdGFuY2UgY3JlYXRpb24uXG4gKiBAcGFyYW0ge09iamVjdD99IHBhcmFtZXRlcnMgU2V0IG9mIGl0cyBwYXJhbWV0ZXJzIHZhbHVlcy5cbiAqIEByZXR1cm5zIHtPYmplY3R9IEluc3RhbmNlIG9mIHNwZWNpZmllZCBjb25zdHJ1Y3Rvci5cbiAqL1xuU2VydmljZUxvY2F0b3IucHJvdG90eXBlLnJlc29sdmVJbnN0YW5jZSA9IGZ1bmN0aW9uIChjb25zdHJ1Y3RvciwgcGFyYW1ldGVycykge1xuXHRyZXR1cm4gY3JlYXRlSW5zdGFuY2Uoe1xuXHRcdGNvbnN0cnVjdG9yOiBjb25zdHJ1Y3Rvcixcblx0XHRwYXJhbWV0ZXJzOiBwYXJhbWV0ZXJzIHx8IHt9LFxuXHRcdHBhcmFtZXRlck5hbWVzOiBnZXRQYXJhbWV0ZXJOYW1lcyhjb25zdHJ1Y3RvciksXG5cdFx0aXNTaW5nbGV0b246IGZhbHNlLFxuXHRcdHNpbmdsZUluc3RhbmNlOiBudWxsXG5cdH0sIHRoaXMpO1xufTtcblxuLyoqXG4gKiBVbnJlZ2lzdGVycyBhbGwgcmVnaXN0cmF0aW9ucyBvZiBzcGVjaWZpZWQgdHlwZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIFR5cGUgbmFtZS5cbiAqL1xuU2VydmljZUxvY2F0b3IucHJvdG90eXBlLnVucmVnaXN0ZXIgPSBmdW5jdGlvbiAodHlwZSkge1xuXHR0aHJvd0lmTm90U3RyaW5nKHR5cGUpO1xuXHRkZWxldGUgdGhpcy5fcmVnaXN0cmF0aW9uc1t0eXBlXTtcbn07XG5cbi8qKlxuICogSW5pdGlhbGl6ZXMgcmVnaXN0cmF0aW9uIGFycmF5IGZvciBzcGVjaWZpZWQgdHlwZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIFR5cGUgbmFtZS5cbiAqIEBwYXJhbSB7U2VydmljZUxvY2F0b3J9IGNvbnRleHQgQ29udGV4dCBvZiBleGVjdXRpb24uXG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemVSZWdpc3RyYXRpb24odHlwZSwgY29udGV4dCkge1xuXHRpZiAoIWNvbnRleHQuX3JlZ2lzdHJhdGlvbnMuaGFzT3duUHJvcGVydHkodHlwZSkpIHtcblx0XHRjb250ZXh0Ll9yZWdpc3RyYXRpb25zW3R5cGVdID0gW107XG5cdH1cbn1cblxuLyoqXG4gKiBUaHJvd3MgZXJyb3IgaWYgc3BlY2lmaWVkIHJlZ2lzdHJhdGlvbiBpcyBub3QgZm91bmQuXG4gKiBAcGFyYW0ge09iamVjdH0gcmVnaXN0cmF0aW9ucyBDdXJyZW50IHJlZ2lzdHJhdGlvbnMgc2V0LlxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgVHlwZSB0byBjaGVjay5cbiAqL1xuZnVuY3Rpb24gdGhyb3dJZk5vVHlwZShyZWdpc3RyYXRpb25zLCB0eXBlKSB7XG5cdGlmICghcmVnaXN0cmF0aW9ucy5oYXNPd25Qcm9wZXJ0eSh0eXBlKSB8fFxuXHRcdHJlZ2lzdHJhdGlvbnNbdHlwZV0ubGVuZ3RoID09PSAwKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKHV0aWwuZm9ybWF0KEVSUk9SX1RZUEVfTk9UX1JFR0lTVEVSRUQsIHR5cGUpKTtcblx0fVxufVxuXG4vKipcbiAqIFRocm93cyBlcnJvciBpZiBzcGVjaWZpZWQgY29uc3RydWN0b3IgaXMgbm90IGEgZnVuY3Rpb24uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb25zdHJ1Y3RvciBDb25zdHJ1Y3RvciB0byBjaGVjay5cbiAqL1xuZnVuY3Rpb24gdGhyb3dJZk5vdEZ1bmN0aW9uKGNvbnN0cnVjdG9yKSB7XG5cdGlmIChjb25zdHJ1Y3RvciBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0dGhyb3cgbmV3IEVycm9yKEVSUk9SX0NPTlNUUlVDVE9SX1NIT1VMRF9CRV9GVU5DVElPTik7XG59XG5cbi8qKlxuICogVGhyb3dzIGVycm9yIGlmIHNwZWNpZmllZCB0eXBlIG5hbWUgaXMgbm90IGEgc3RyaW5nLlxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgVHlwZSBuYW1lIHRvIGNoZWNrLlxuICovXG5mdW5jdGlvbiB0aHJvd0lmTm90U3RyaW5nKHR5cGUpIHtcblx0aWYgKHR5cGVvZih0eXBlKSA9PT0gJ3N0cmluZycpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHR0aHJvdyBuZXcgRXJyb3IodXRpbC5mb3JtYXQoRVJST1JfVFlQRV9TSE9VTERfQkVfU1RSSU5HLCB0eXBlKSk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBpbnN0YW5jZSBvZiB0eXBlIHNwZWNpZmllZCBhbmQgcGFyYW1ldGVycyBpbiByZWdpc3RyYXRpb24uXG4gKiBAcGFyYW0ge09iamVjdH0gcmVnaXN0cmF0aW9uIFNwZWNpZmllZCByZWdpc3RyYXRpb24gb2YgdHlwZS5cbiAqIEBwYXJhbSB7U2VydmljZUxvY2F0b3J9IGNvbnRleHQgQ29udGV4dCBvZiBleGVjdXRpb24uXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBJbnN0YW5jZSBvZiB0eXBlIHNwZWNpZmllZCBpbiByZWdpc3RyYXRpb24uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlKHJlZ2lzdHJhdGlvbiwgY29udGV4dCkge1xuXHRpZiAocmVnaXN0cmF0aW9uLmlzU2luZ2xldG9uICYmIHJlZ2lzdHJhdGlvbi5zaW5nbGVJbnN0YW5jZSAhPT0gbnVsbCkge1xuXHRcdHJldHVybiByZWdpc3RyYXRpb24uc2luZ2xlSW5zdGFuY2U7XG5cdH1cblxuXHR2YXIgaW5zdGFuY2VQYXJhbWV0ZXJzID0gZ2V0UGFyYW1ldGVycyhyZWdpc3RyYXRpb24sIGNvbnRleHQpLFxuXHRcdGluc3RhbmNlID0gT2JqZWN0LmNyZWF0ZShyZWdpc3RyYXRpb24uY29uc3RydWN0b3IucHJvdG90eXBlKTtcblx0cmVnaXN0cmF0aW9uLmNvbnN0cnVjdG9yLmFwcGx5KGluc3RhbmNlLCBpbnN0YW5jZVBhcmFtZXRlcnMpO1xuXG5cdGlmIChyZWdpc3RyYXRpb24uaXNTaW5nbGV0b24pIHtcblx0XHRyZWdpc3RyYXRpb24uc2luZ2xlSW5zdGFuY2UgPSBpbnN0YW5jZTtcblx0fVxuXG5cdHJldHVybiBpbnN0YW5jZTtcbn1cblxuLyoqXG4gKiBHZXRzIGNvbnN0cnVjdG9yIHBhcmFtZXRlcnMgc3BlY2lmaWVkIGluIHR5cGUgY29uc3RydWN0b3IuXG4gKiBAcGFyYW0ge09iamVjdH0gcmVnaXN0cmF0aW9uIFR5cGUgcmVnaXN0cmF0aW9uLlxuICogQHBhcmFtIHtTZXJ2aWNlTG9jYXRvcn0gY29udGV4dCBDb250ZXh0IG9mIGV4ZWN1dGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gQXJyYXkgb2YgcmVzb2x2ZWQgZGVwZW5kZW5jaWVzIHRvIGluamVjdC5cbiAqL1xuZnVuY3Rpb24gZ2V0UGFyYW1ldGVycyhyZWdpc3RyYXRpb24sIGNvbnRleHQpIHtcblx0cmV0dXJuIHJlZ2lzdHJhdGlvbi5wYXJhbWV0ZXJOYW1lcy5tYXAoZnVuY3Rpb24gKHBhcmFtZXRlck5hbWUpIHtcblx0XHR2YXIgZGVwZW5kZW5jeU5hbWUgPSBnZXREZXBlbmRlbmN5TmFtZShwYXJhbWV0ZXJOYW1lKTtcblx0XHRyZXR1cm4gZGVwZW5kZW5jeU5hbWUgPT09IG51bGwgP1xuXHRcdFx0cmVnaXN0cmF0aW9uLnBhcmFtZXRlcnNbcGFyYW1ldGVyTmFtZV0gOlxuXHRcdFx0dGhpcy5yZXNvbHZlKGRlcGVuZGVuY3lOYW1lKTtcblx0fSwgY29udGV4dCk7XG59XG5cbi8qKlxuICogR2V0cyBuYW1lIG9mIGRlcGVuZGVuY3kgdHlwZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXJhbWV0ZXJOYW1lIE5hbWUgb2YgY29uc3RydWN0b3IgcGFyYW1ldGVyLlxuICogQHJldHVybnMge3N0cmluZ3xudWxsfSBOYW1lIG9mIGRlcGVuZGVuY3kgdHlwZS5cbiAqL1xuZnVuY3Rpb24gZ2V0RGVwZW5kZW5jeU5hbWUocGFyYW1ldGVyTmFtZSkge1xuXHRpZiAoIURFUEVOREVOQ1lfUkVHRVhQLnRlc3QocGFyYW1ldGVyTmFtZSkpIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdHJldHVybiBwYXJhbWV0ZXJOYW1lLnN1YnN0cigxLCBwYXJhbWV0ZXJOYW1lLmxlbmd0aCAtIDEpO1xufVxuXG4vKipcbiAqIEdldHMgYWxsIHBhcmFtZXRlciBuYW1lcyB1c2VkIGluIGNvbnN0cnVjdG9yIGZ1bmN0aW9uLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY29uc3RydWN0b3IgQ29uc3RydWN0b3IgZnVuY3Rpb24uXG4gKiBAcmV0dXJucyB7QXJyYXk8c3RyaW5nPn0gQXJyYXkgb2YgcGFyYW1ldGVyIG5hbWVzLlxuICovXG5mdW5jdGlvbiBnZXRQYXJhbWV0ZXJOYW1lcyhjb25zdHJ1Y3Rvcikge1xuXHR2YXIgc291cmNlID0gY29uc3RydWN0b3IudG9TdHJpbmcoKSxcblx0XHR0b2tlbml6ZXIgPSBuZXcgQ29uc3RydWN0b3JUb2tlbml6ZXIoc291cmNlKSxcblx0XHRyZXN1bHQgPSBbXSxcblx0XHR0b2tlbiA9IHtcblx0XHRcdHN0YXRlOiBDb25zdHJ1Y3RvclRva2VuaXplci5TVEFURVMuTk8sXG5cdFx0XHRzdGFydDogMCxcblx0XHRcdGVuZDogMFxuXHRcdH0sXG5cdFx0YXJlUGFyYW1ldGVyc1N0YXJ0ZWQgPSBmYWxzZTtcblxuXHR3aGlsZSAoXG5cdFx0dG9rZW4uc3RhdGUgIT09IENvbnN0cnVjdG9yVG9rZW5pemVyLlNUQVRFUy5FTkQgJiZcblx0XHR0b2tlbi5zdGF0ZSAhPT0gQ29uc3RydWN0b3JUb2tlbml6ZXIuU1RBVEVTLklMTEVHQUwpIHtcblx0XHR0b2tlbiA9IHRva2VuaXplci5uZXh0KCk7XG5cdFx0aWYgKHRva2VuLnN0YXRlID09PSBDb25zdHJ1Y3RvclRva2VuaXplci5TVEFURVMuUEFSRU5USEVTRVNfT1BFTikge1xuXHRcdFx0YXJlUGFyYW1ldGVyc1N0YXJ0ZWQgPSB0cnVlO1xuXHRcdH1cblxuXHRcdGlmIChhcmVQYXJhbWV0ZXJzU3RhcnRlZCAmJlxuXHRcdFx0dG9rZW4uc3RhdGUgPT09IENvbnN0cnVjdG9yVG9rZW5pemVyLlNUQVRFUy5JREVOVElGSUVSKSB7XG5cdFx0XHRyZXN1bHQucHVzaChzb3VyY2Uuc3Vic3RyaW5nKHRva2VuLnN0YXJ0LCB0b2tlbi5lbmQpKTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcblxufSIsIi8qXG4gKiBjYXRiZXJyeVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNCBEZW5pcyBSZWNoa3Vub3YgYW5kIHByb2plY3QgY29udHJpYnV0b3JzLlxuICpcbiAqIGNhdGJlcnJ5J3MgbGljZW5zZSBmb2xsb3dzOlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXG4gKiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvblxuICogZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLFxuICogaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSxcbiAqIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsXG4gKiBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuICogc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbiAqIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1NcbiAqIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiAqIFNPRlRXQVJFLlxuICpcbiAqIFRoaXMgbGljZW5zZSBhcHBsaWVzIHRvIGFsbCBwYXJ0cyBvZiBjYXRiZXJyeSB0aGF0IGFyZSBub3QgZXh0ZXJuYWxseVxuICogbWFpbnRhaW5lZCBsaWJyYXJpZXMuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFVIUjtcblxudmFyIFVIUkJhc2UgPSByZXF1aXJlKCcuLi9saWIvVUhSQmFzZScpLFxuXHRQcm9taXNlID0gcmVxdWlyZSgncHJvbWlzZScpLFxuXHRVUkkgPSByZXF1aXJlKCdjYXRiZXJyeS11cmknKS5VUkksXG5cdHV0aWwgPSByZXF1aXJlKCd1dGlsJyk7XG5cbi8vIGlmIGJyb3dzZXIgc3RpbGwgZG9lcyBub3QgaGF2ZSBwcm9taXNlcyB0aGVuIGFkZCBpdC5cbmlmICghKCdQcm9taXNlJyBpbiB3aW5kb3cpKSB7XG5cdHdpbmRvdy5Qcm9taXNlID0gUHJvbWlzZTtcbn1cblxudXRpbC5pbmhlcml0cyhVSFIsIFVIUkJhc2UpO1xuXG52YXIgTk9OX1NBRkVfSEVBREVSUyA9IHtcblx0Y29va2llOiB0cnVlLFxuXHQnYWNjZXB0LWNoYXJzZXQnOiB0cnVlXG59O1xuXG52YXIgRVJST1JfQ09OTkVDVElPTiA9ICdDb25uZWN0aW9uIGVycm9yJyxcblx0RVJST1JfVElNRU9VVCA9ICdSZXF1ZXN0IHRpbWVvdXQnLFxuXHRFUlJPUl9BQk9SVEVEID0gJ1JlcXVlc3QgYWJvcnRlZCc7XG5cbi8qKlxuICogQ3JlYXRlcyBuZXcgaW5zdGFuY2Ugb2YgY2xpZW50LXNpZGUgSFRUUChTKSByZXF1ZXN0IGltcGxlbWVudGF0aW9uLlxuICogQHBhcmFtIHtXaW5kb3d9ICR3aW5kb3cgQ3VycmVudCB3aW5kb3cgb2JqZWN0LlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIFVIUigkd2luZG93KSB7XG5cdFVIUkJhc2UuY2FsbCh0aGlzKTtcblx0dGhpcy53aW5kb3cgPSAkd2luZG93O1xufVxuXG4vKipcbiAqIEN1cnJlbnQgaW5zdGFuY2Ugb2Ygd2luZG93LlxuICogQHR5cGUge1dpbmRvd31cbiAqL1xuVUhSLnByb3RvdHlwZS53aW5kb3cgPSBudWxsO1xuXG4vKipcbiAqIERvZXMgcmVxdWVzdCB3aXRoIHNwZWNpZmllZCBwYXJhbWV0ZXJzIHVzaW5nIHByb3RvY29sIGltcGxlbWVudGF0aW9uLlxuICogQHBhcmFtIHtPYmplY3R9IHBhcmFtZXRlcnMgUmVxdWVzdCBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtTdHJpbmd9IHBhcmFtZXRlcnMubWV0aG9kIEhUVFAgbWV0aG9kLlxuICogQHBhcmFtIHtTdHJpbmd9IHBhcmFtZXRlcnMudXJsIFVSTCBmb3IgcmVxdWVzdC5cbiAqIEBwYXJhbSB7VVJJfSBwYXJhbWV0ZXJzLnVyaSBVUkkgb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IHBhcmFtZXRlcnMuaGVhZGVycyBIVFRQIGhlYWRlcnMgdG8gc2VuZC5cbiAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdH0gcGFyYW1ldGVycy5kYXRhIERhdGEgdG8gc2VuZC5cbiAqIEBwYXJhbSB7TnVtYmVyfSBwYXJhbWV0ZXJzLnRpbWVvdXQgUmVxdWVzdCB0aW1lb3V0LlxuICogQHBhcmFtIHtCb29sZWFufSBwYXJhbWV0ZXJzLnVuc2FmZUhUVFBTIElmIHRydWUgdGhlbiByZXF1ZXN0cyB0byBzZXJ2ZXJzIHdpdGhcbiAqIGludmFsaWQgSFRUUFMgY2VydGlmaWNhdGVzIGFyZSBhbGxvd2VkLlxuICogQHJldHVybnMge1Byb21pc2U8T2JqZWN0Pn0gUHJvbWlzZSBmb3IgcmVzdWx0IHdpdGggc3RhdHVzIG9iamVjdCBhbmQgY29udGVudC5cbiAqIEBwcm90ZWN0ZWRcbiAqL1xuVUhSLnByb3RvdHlwZS5fZG9SZXF1ZXN0ID0gZnVuY3Rpb24gKHBhcmFtZXRlcnMpIHtcblx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdE9iamVjdC5rZXlzKHBhcmFtZXRlcnMuaGVhZGVycylcblx0XHQuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuXHRcdFx0aWYgKE5PTl9TQUZFX0hFQURFUlMuaGFzT3duUHJvcGVydHkobmFtZS50b0xvd2VyQ2FzZSgpKSkge1xuXHRcdFx0XHRkZWxldGUgcGFyYW1ldGVycy5oZWFkZXJzW25hbWVdO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoZnVsZmlsbCwgcmVqZWN0KSB7XG5cdFx0dmFyIHJlcXVlc3RFcnJvciA9IG51bGwsXG5cdFx0XHR4aHIgPSBuZXcgc2VsZi53aW5kb3cuWE1MSHR0cFJlcXVlc3QoKTtcblxuXHRcdHhoci5vbmFib3J0ID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVxdWVzdEVycm9yID0gbmV3IEVycm9yKEVSUk9SX0FCT1JURUQpO1xuXHRcdFx0cmVqZWN0KHJlcXVlc3RFcnJvcik7XG5cdFx0fTtcblx0XHR4aHIub250aW1lb3V0ID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVxdWVzdEVycm9yID0gbmV3IEVycm9yKEVSUk9SX1RJTUVPVVQpO1xuXHRcdFx0cmVqZWN0KHJlcXVlc3RFcnJvcik7XG5cdFx0fTtcblx0XHR4aHIub25lcnJvciA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlcXVlc3RFcnJvciA9IG5ldyBFcnJvcih4aHIuc3RhdHVzVGV4dCB8fCBFUlJPUl9DT05ORUNUSU9OKTtcblx0XHRcdHJlamVjdChyZXF1ZXN0RXJyb3IpO1xuXHRcdH07XG5cdFx0eGhyLm9ubG9hZGVuZCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdGlmIChyZXF1ZXN0RXJyb3IpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0dmFyIHN0YXR1c09iamVjdCA9IGdldFN0YXR1c09iamVjdCh4aHIpLFxuXHRcdFx0XHRjb250ZW50ID0gc2VsZi5jb252ZXJ0UmVzcG9uc2UoXG5cdFx0XHRcdFx0c3RhdHVzT2JqZWN0LmhlYWRlcnMsXG5cdFx0XHRcdFx0eGhyLnJlc3BvbnNlVGV4dFxuXHRcdFx0XHQpO1xuXHRcdFx0ZnVsZmlsbCh7c3RhdHVzOiBzdGF0dXNPYmplY3QsIGNvbnRlbnQ6IGNvbnRlbnR9KTtcblx0XHR9O1xuXG5cdFx0dmFyIHVzZXIgPSBwYXJhbWV0ZXJzLnVyaS5hdXRob3JpdHkudXNlckluZm8gP1xuXHRcdFx0XHRwYXJhbWV0ZXJzLnVyaS5hdXRob3JpdHkudXNlckluZm8udXNlciA6IG51bGwsXG5cdFx0XHRwYXNzd29yZCA9IHBhcmFtZXRlcnMudXJpLmF1dGhvcml0eS51c2VySW5mbyA/XG5cdFx0XHRcdHBhcmFtZXRlcnMudXJpLmF1dGhvcml0eS51c2VySW5mby5wYXNzd29yZCA6IG51bGw7XG5cdFx0eGhyLm9wZW4oXG5cdFx0XHRwYXJhbWV0ZXJzLm1ldGhvZCwgcGFyYW1ldGVycy51cmkudG9TdHJpbmcoKSwgdHJ1ZSxcblx0XHRcdHVzZXIgfHwgdW5kZWZpbmVkLCBwYXNzd29yZCB8fCB1bmRlZmluZWRcblx0XHQpO1xuXHRcdHhoci50aW1lb3V0ID0gcGFyYW1ldGVycy50aW1lb3V0O1xuXG5cdFx0T2JqZWN0LmtleXMocGFyYW1ldGVycy5oZWFkZXJzKVxuXHRcdFx0LmZvckVhY2goZnVuY3Rpb24gKGhlYWRlck5hbWUpIHtcblx0XHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoXG5cdFx0XHRcdFx0aGVhZGVyTmFtZSwgcGFyYW1ldGVycy5oZWFkZXJzW2hlYWRlck5hbWVdXG5cdFx0XHRcdCk7XG5cdFx0XHR9KTtcblxuXHRcdHhoci5zZW5kKHBhcmFtZXRlcnMuZGF0YSk7XG5cdH0pO1xufTtcblxuLyoqXG4gKiBHZXRzIHN0YXRlIG9iamVjdCBmb3Igc3BlY2lmaWVkIGpRdWVyeSBYSFIgb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3Q/fSB4aHIgWEhSIG9iamVjdC5cbiAqIEByZXR1cm5zIHt7Y29kZTogbnVtYmVyLCB0ZXh0OiBzdHJpbmcsIGhlYWRlcnM6IE9iamVjdH19IFN0YXR1cyBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIGdldFN0YXR1c09iamVjdCh4aHIpIHtcblx0dmFyIGhlYWRlcnMgPSB7fTtcblxuXHRpZiAoIXhocikge1xuXHRcdHJldHVybiB7XG5cdFx0XHRjb2RlOiAwLFxuXHRcdFx0dGV4dDogJycsXG5cdFx0XHRoZWFkZXJzOiBoZWFkZXJzXG5cdFx0fTtcblx0fVxuXG5cdHhoclxuXHRcdC5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKVxuXHRcdC5zcGxpdCgnXFxuJylcblx0XHQuZm9yRWFjaChmdW5jdGlvbiAoaGVhZGVyKSB7XG5cdFx0XHR2YXIgZGVsaW1pdGVySW5kZXggPSBoZWFkZXIuaW5kZXhPZignOicpO1xuXHRcdFx0aWYgKGRlbGltaXRlckluZGV4IDw9IDApIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0dmFyIGhlYWRlck5hbWUgPSBoZWFkZXJcblx0XHRcdFx0LnN1YnN0cmluZygwLCBkZWxpbWl0ZXJJbmRleClcblx0XHRcdFx0LnRyaW0oKVxuXHRcdFx0XHQudG9Mb3dlckNhc2UoKTtcblx0XHRcdGhlYWRlcnNbaGVhZGVyTmFtZV0gPSBoZWFkZXJcblx0XHRcdFx0LnN1YnN0cmluZyhkZWxpbWl0ZXJJbmRleCArIDEpXG5cdFx0XHRcdC50cmltKCk7XG5cdFx0fSk7XG5cblx0cmV0dXJuIHtcblx0XHRjb2RlOiB4aHIuc3RhdHVzLFxuXHRcdHRleHQ6IHhoci5zdGF0dXNUZXh0LFxuXHRcdGhlYWRlcnM6IGhlYWRlcnNcblx0fTtcbn0iLCIvKlxuICogY2F0YmVycnlcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgRGVuaXMgUmVjaGt1bm92IGFuZCBwcm9qZWN0IGNvbnRyaWJ1dG9ycy5cbiAqXG4gKiBjYXRiZXJyeSdzIGxpY2Vuc2UgZm9sbG93czpcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvblxuICogb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb25cbiAqIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbixcbiAqIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsXG4gKiBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLFxuICogYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbiAqIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4gKiBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4gKiBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG4gKiBTT0ZUV0FSRS5cbiAqXG4gKiBUaGlzIGxpY2Vuc2UgYXBwbGllcyB0byBhbGwgcGFydHMgb2YgY2F0YmVycnkgdGhhdCBhcmUgbm90IGV4dGVybmFsbHlcbiAqIG1haW50YWluZWQgbGlicmFyaWVzLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFVIUiA9IHJlcXVpcmUoJy4vbGliL1VIUicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0LyoqXG5cdCAqIFJlZ2lzdGVycyBVSFIgaW4gc2VydmVyLXNpZGUgc2VydmljZSBsb2NhdG9yLlxuXHQgKiBAcGFyYW0ge1NlcnZpY2VMb2NhdG9yfSBsb2NhdG9yIENhdGJlcnJ5J3Mgc2VydmljZSBsb2NhdG9yLlxuXHQgKi9cblx0cmVnaXN0ZXI6IGZ1bmN0aW9uIChsb2NhdG9yKSB7XG5cdFx0dmFyIGNvbmZpZyA9IGxvY2F0b3IucmVzb2x2ZSgnY29uZmlnJyk7XG5cdFx0bG9jYXRvci5yZWdpc3RlcigndWhyJywgVUhSLCBjb25maWcsIHRydWUpO1xuXHR9LFxuXHRVSFI6IFVIUlxufTsiLCIvKlxuICogY2F0YmVycnlcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgRGVuaXMgUmVjaGt1bm92IGFuZCBwcm9qZWN0IGNvbnRyaWJ1dG9ycy5cbiAqXG4gKiBjYXRiZXJyeSdzIGxpY2Vuc2UgZm9sbG93czpcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvblxuICogb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb25cbiAqIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbixcbiAqIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsXG4gKiBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLFxuICogYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbiAqIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4gKiBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4gKiBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG4gKiBTT0ZUV0FSRS5cbiAqXG4gKiBUaGlzIGxpY2Vuc2UgYXBwbGllcyB0byBhbGwgcGFydHMgb2YgY2F0YmVycnkgdGhhdCBhcmUgbm90IGV4dGVybmFsbHlcbiAqIG1haW50YWluZWQgbGlicmFyaWVzLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBVSFJCYXNlO1xuXG52YXIgY2F0YmVycnlVcmkgPSByZXF1aXJlKCdjYXRiZXJyeS11cmknKSxcblx0UXVlcnkgPSBjYXRiZXJyeVVyaS5RdWVyeSxcblx0VVJJID0gY2F0YmVycnlVcmkuVVJJO1xuXG52YXIgRVJST1JfVU5TVVBQT1JURURfUFJPVE9DT0wgPSAnUHJvdG9jb2wgaXMgdW5zdXBwb3J0ZWQnLFxuXHRFUlJPUl9QQVJBTUVURVJTX1NIT1VMRF9CRV9PQkpFQ1QgPSAnUmVxdWVzdCBwYXJhbWV0ZXJzIHNob3VsZCBiZSBvYmplY3QnLFxuXHRFUlJPUl9VUkxfSVNfUkVRVUlSRUQgPSAnVVJMIGlzIHJlcXVpcmVkIHBhcmFtZXRlcicsXG5cdEVSUk9SX01FVEhPRF9JU19SRVFVSVJFRCA9ICdSZXF1ZXN0IG1ldGhvZCBpcyByZXF1aXJlZCBwYXJhbWV0ZXInLFxuXHRFUlJPUl9IT1NUX0lTX1JFUVVJUkVEID0gJ0hvc3QgaW4gVVJMIGlzIHJlcXVpcmVkJyxcblx0RVJST1JfU0NIRU1FX0lTX1JFUVVJUkVEID0gJ1NjaGVtZSBpbiBVUkwgaXMgcmVxdWlyZWQnLFxuXHRFUlJPUl9USU1FT1VUX1NIT1VMRF9CRV9OVU1CRVIgPSAnVGltZW91dCBzaG91bGQgYmUgYSBudW1iZXInLFxuXHRERUZBVUxUX1RJTUVPVVQgPSAzMDAwMCxcblx0SFRUUF9QUk9UT0NPTF9SRUdFWFAgPSAvXihodHRwKXM/JC9pO1xuXG52YXIgTUVUSE9EUyA9IHtcblx0R0VUOiAnR0VUJyxcblx0SEVBRDogJ0hFQUQnLFxuXHRQT1NUOiAnUE9TVCcsXG5cdFBVVDogJ1BVVCcsXG5cdFBBVENIOiAnUEFUQ0gnLFxuXHRERUxFVEU6ICdERUxFVEUnLFxuXHRPUFRJT05TOiAnT1BUSU9OUycsXG5cdFRSQUNFOiAnVFJBQ0UnLFxuXHRDT05ORUNUOiAnQ09OTkVDVCdcbn07XG5cblVIUkJhc2UuVFlQRVMgPSB7XG5cdFVSTF9FTkNPREVEOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyxcblx0SlNPTjogJ2FwcGxpY2F0aW9uL2pzb24nLFxuXHRQTEFJTl9URVhUOiAndGV4dC9wbGFpbicsXG5cdEhUTUw6ICd0ZXh0L2h0bWwnXG59O1xuXG5VSFJCYXNlLkNIQVJTRVQgPSAnVVRGLTgnO1xuXG5VSFJCYXNlLkRFRkFVTFRfR0VORVJBTF9IRUFERVJTID0ge1xuXHRBY2NlcHQ6IFVIUkJhc2UuVFlQRVMuSlNPTiArICc7IHE9MC43LCAnICtcblx0XHRVSFJCYXNlLlRZUEVTLkhUTUwgKyAnOyBxPTAuMiwgJyArXG5cdFx0VUhSQmFzZS5UWVBFUy5QTEFJTl9URVhUICsgJzsgcT0wLjEnLFxuXHQnQWNjZXB0LUNoYXJzZXQnOiBVSFJCYXNlLkNIQVJTRVQgKyAnOyBxPTEnXG59O1xuXG5VSFJCYXNlLkNIQVJTRVRfUEFSQU1FVEVSID0gJzsgY2hhcnNldD0nICsgVUhSQmFzZS5DSEFSU0VUO1xuVUhSQmFzZS5VUkxfRU5DT0RFRF9FTlRJVFlfQ09OVEVOVF9UWVBFID0gVUhSQmFzZS5UWVBFUy5VUkxfRU5DT0RFRCArXG5cdFVIUkJhc2UuQ0hBUlNFVF9QQVJBTUVURVI7XG5cblVIUkJhc2UuSlNPTl9FTlRJVFlfQ09OVEVOVF9UWVBFID0gVUhSQmFzZS5UWVBFUy5KU09OICtcblx0VUhSQmFzZS5DSEFSU0VUX1BBUkFNRVRFUjtcblxuVUhSQmFzZS5QTEFJTl9URVhUX0VOVElUWV9DT05URU5UX1RZUEUgPSBVSFJCYXNlLlRZUEVTLlBMQUlOX1RFWFQgK1xuXHRVSFJCYXNlLkNIQVJTRVRfUEFSQU1FVEVSO1xuXG4vLyBUaGlzIG1vZHVsZSB3ZXJlIGRldmVsb3BlZCB1c2luZyBIVFRQLzEuMXYyIFJGQyAyNjE2XG4vLyAoaHR0cDovL3d3dy53My5vcmcvUHJvdG9jb2xzL3JmYzI2MTYvKVxuLyoqXG4gKiBDcmVhdGVzIG5ldyBpbnN0YW5jZSBvZiBCYXNpYyBVbml2ZXJzYWwgSFRUUChTKSBSZXF1ZXN0IGltcGxlbWVudGF0aW9uLlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIFVIUkJhc2UoKSB7XG5cbn1cblxuLyoqXG4gKiBEb2VzIEdFVCByZXF1ZXN0IHRvIEhUVFAgc2VydmVyLlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBVUkwgdG8gcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0P30gb3B0aW9ucyBSZXF1ZXN0IHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0ge09iamVjdD99IG9wdGlvbnMuaGVhZGVycyBIVFRQIGhlYWRlcnMgdG8gc2VuZC5cbiAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdD99IG9wdGlvbnMuZGF0YSBEYXRhIHRvIHNlbmQuXG4gKiBAcGFyYW0ge051bWJlcj99IG9wdGlvbnMudGltZW91dCBSZXF1ZXN0IHRpbWVvdXQuXG4gKiBAcGFyYW0ge0Jvb2xlYW4/fSBvcHRpb25zLnVuc2FmZUhUVFBTIElmIHRydWUgdGhlbiByZXF1ZXN0cyB0byBzZXJ2ZXJzIHdpdGhcbiAqIGludmFsaWQgSFRUUFMgY2VydGlmaWNhdGVzIGFyZSBhbGxvd2VkLlxuICogQHJldHVybnMge1Byb21pc2U8T2JqZWN0Pn0gUHJvbWlzZSBmb3IgcmVzdWx0IHdpdGggc3RhdHVzIG9iamVjdCBhbmQgY29udGVudC5cbiAqL1xuVUhSQmFzZS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblx0dmFyIHBhcmFtZXRlcnMgPSBPYmplY3QuY3JlYXRlKG9wdGlvbnMpO1xuXHRwYXJhbWV0ZXJzLm1ldGhvZCA9IE1FVEhPRFMuR0VUO1xuXHRwYXJhbWV0ZXJzLnVybCA9IHVybDtcblx0cmV0dXJuIHRoaXMucmVxdWVzdChwYXJhbWV0ZXJzKTtcbn07XG5cbi8qKlxuICogRG9lcyBQT1NUIHJlcXVlc3QgdG8gSFRUUCBzZXJ2ZXIuXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFVSTCB0byByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3Q/fSBvcHRpb25zIFJlcXVlc3QgcGFyYW1ldGVycy5cbiAqIEBwYXJhbSB7T2JqZWN0P30gb3B0aW9ucy5oZWFkZXJzIEhUVFAgaGVhZGVycyB0byBzZW5kLlxuICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0P30gb3B0aW9ucy5kYXRhIERhdGEgdG8gc2VuZC5cbiAqIEBwYXJhbSB7TnVtYmVyP30gb3B0aW9ucy50aW1lb3V0IFJlcXVlc3QgdGltZW91dC5cbiAqIEBwYXJhbSB7Qm9vbGVhbj99IG9wdGlvbnMudW5zYWZlSFRUUFMgSWYgdHJ1ZSB0aGVuIHJlcXVlc3RzIHRvIHNlcnZlcnMgd2l0aFxuICogaW52YWxpZCBIVFRQUyBjZXJ0aWZpY2F0ZXMgYXJlIGFsbG93ZWQuXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxPYmplY3Q+fSBQcm9taXNlIGZvciByZXN1bHQgd2l0aCBzdGF0dXMgb2JqZWN0IGFuZCBjb250ZW50LlxuICovXG5VSFJCYXNlLnByb3RvdHlwZS5wb3N0ID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblx0dmFyIHBhcmFtZXRlcnMgPSBPYmplY3QuY3JlYXRlKG9wdGlvbnMpO1xuXHRwYXJhbWV0ZXJzLm1ldGhvZCA9IE1FVEhPRFMuUE9TVDtcblx0cGFyYW1ldGVycy51cmwgPSB1cmw7XG5cdHJldHVybiB0aGlzLnJlcXVlc3QocGFyYW1ldGVycyk7XG59O1xuXG4vKipcbiAqIERvZXMgUFVUIHJlcXVlc3QgdG8gSFRUUCBzZXJ2ZXIuXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFVSTCB0byByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3Q/fSBvcHRpb25zIFJlcXVlc3QgcGFyYW1ldGVycy5cbiAqIEBwYXJhbSB7T2JqZWN0P30gb3B0aW9ucy5oZWFkZXJzIEhUVFAgaGVhZGVycyB0byBzZW5kLlxuICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0P30gb3B0aW9ucy5kYXRhIERhdGEgdG8gc2VuZC5cbiAqIEBwYXJhbSB7TnVtYmVyP30gb3B0aW9ucy50aW1lb3V0IFJlcXVlc3QgdGltZW91dC5cbiAqIEBwYXJhbSB7Qm9vbGVhbj99IG9wdGlvbnMudW5zYWZlSFRUUFMgSWYgdHJ1ZSB0aGVuIHJlcXVlc3RzIHRvIHNlcnZlcnMgd2l0aFxuICogaW52YWxpZCBIVFRQUyBjZXJ0aWZpY2F0ZXMgYXJlIGFsbG93ZWQuXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxPYmplY3Q+fSBQcm9taXNlIGZvciByZXN1bHQgd2l0aCBzdGF0dXMgb2JqZWN0IGFuZCBjb250ZW50LlxuICovXG5VSFJCYXNlLnByb3RvdHlwZS5wdXQgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXHR2YXIgcGFyYW1ldGVycyA9IE9iamVjdC5jcmVhdGUob3B0aW9ucyk7XG5cdHBhcmFtZXRlcnMubWV0aG9kID0gTUVUSE9EUy5QVVQ7XG5cdHBhcmFtZXRlcnMudXJsID0gdXJsO1xuXHRyZXR1cm4gdGhpcy5yZXF1ZXN0KHBhcmFtZXRlcnMpO1xufTtcblxuLyoqXG4gKiBEb2VzIFBBVENIIHJlcXVlc3QgdG8gSFRUUCBzZXJ2ZXIuXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFVSTCB0byByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3Q/fSBvcHRpb25zIFJlcXVlc3QgcGFyYW1ldGVycy5cbiAqIEBwYXJhbSB7T2JqZWN0P30gb3B0aW9ucy5oZWFkZXJzIEhUVFAgaGVhZGVycyB0byBzZW5kLlxuICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0P30gb3B0aW9ucy5kYXRhIERhdGEgdG8gc2VuZC5cbiAqIEBwYXJhbSB7TnVtYmVyP30gb3B0aW9ucy50aW1lb3V0IFJlcXVlc3QgdGltZW91dC5cbiAqIEBwYXJhbSB7Qm9vbGVhbj99IG9wdGlvbnMudW5zYWZlSFRUUFMgSWYgdHJ1ZSB0aGVuIHJlcXVlc3RzIHRvIHNlcnZlcnMgd2l0aFxuICogaW52YWxpZCBIVFRQUyBjZXJ0aWZpY2F0ZXMgYXJlIGFsbG93ZWQuXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxPYmplY3Q+fSBQcm9taXNlIGZvciByZXN1bHQgd2l0aCBzdGF0dXMgb2JqZWN0IGFuZCBjb250ZW50LlxuICovXG5VSFJCYXNlLnByb3RvdHlwZS5wYXRjaCA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cdHZhciBwYXJhbWV0ZXJzID0gT2JqZWN0LmNyZWF0ZShvcHRpb25zKTtcblx0cGFyYW1ldGVycy5tZXRob2QgPSBNRVRIT0RTLlBBVENIO1xuXHRwYXJhbWV0ZXJzLnVybCA9IHVybDtcblx0cmV0dXJuIHRoaXMucmVxdWVzdChwYXJhbWV0ZXJzKTtcbn07XG5cbi8qKlxuICogRG9lcyBERUxFVEUgcmVxdWVzdCB0byBIVFRQIHNlcnZlci5cbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVVJMIHRvIHJlcXVlc3QuXG4gKiBAcGFyYW0ge09iamVjdD99IG9wdGlvbnMgUmVxdWVzdCBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtPYmplY3Q/fSBvcHRpb25zLmhlYWRlcnMgSFRUUCBoZWFkZXJzIHRvIHNlbmQuXG4gKiBAcGFyYW0ge1N0cmluZ3xPYmplY3Q/fSBvcHRpb25zLmRhdGEgRGF0YSB0byBzZW5kLlxuICogQHBhcmFtIHtOdW1iZXI/fSBvcHRpb25zLnRpbWVvdXQgUmVxdWVzdCB0aW1lb3V0LlxuICogQHBhcmFtIHtCb29sZWFuP30gb3B0aW9ucy51bnNhZmVIVFRQUyBJZiB0cnVlIHRoZW4gcmVxdWVzdHMgdG8gc2VydmVycyB3aXRoXG4gKiBpbnZhbGlkIEhUVFBTIGNlcnRpZmljYXRlcyBhcmUgYWxsb3dlZC5cbiAqIEByZXR1cm5zIHtQcm9taXNlPE9iamVjdD59IFByb21pc2UgZm9yIHJlc3VsdCB3aXRoIHN0YXR1cyBvYmplY3QgYW5kIGNvbnRlbnQuXG4gKi9cblVIUkJhc2UucHJvdG90eXBlLmRlbGV0ZSA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcblx0dmFyIHBhcmFtZXRlcnMgPSBPYmplY3QuY3JlYXRlKG9wdGlvbnMpO1xuXHRwYXJhbWV0ZXJzLm1ldGhvZCA9IE1FVEhPRFMuREVMRVRFO1xuXHRwYXJhbWV0ZXJzLnVybCA9IHVybDtcblx0cmV0dXJuIHRoaXMucmVxdWVzdChwYXJhbWV0ZXJzKTtcbn07XG5cbi8qKlxuICogRG9lcyByZXF1ZXN0IHdpdGggc3BlY2lmaWVkIHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0ge09iamVjdH0gcGFyYW1ldGVycyBSZXF1ZXN0IHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0ge1N0cmluZ30gcGFyYW1ldGVycy5tZXRob2QgSFRUUCBtZXRob2QuXG4gKiBAcGFyYW0ge1N0cmluZ30gcGFyYW1ldGVycy51cmwgVVJMIGZvciByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3Q/fSBwYXJhbWV0ZXJzLmhlYWRlcnMgSFRUUCBoZWFkZXJzIHRvIHNlbmQuXG4gKiBAcGFyYW0ge1N0cmluZ3xPYmplY3Q/fSBwYXJhbWV0ZXJzLmRhdGEgRGF0YSB0byBzZW5kLlxuICogQHBhcmFtIHtOdW1iZXI/fSBwYXJhbWV0ZXJzLnRpbWVvdXQgUmVxdWVzdCB0aW1lb3V0LlxuICogQHBhcmFtIHtCb29sZWFuP30gcGFyYW1ldGVycy51bnNhZmVIVFRQUyBJZiB0cnVlIHRoZW4gcmVxdWVzdHNcbiAqIHRvIHNlcnZlcnMgd2l0aCBpbnZhbGlkIEhUVFBTIGNlcnRpZmljYXRlcyBhcmUgYWxsb3dlZC5cbiAqIEByZXR1cm5zIHtQcm9taXNlPE9iamVjdD59IFByb21pc2UgZm9yIHJlc3VsdCB3aXRoIHN0YXR1cyBvYmplY3QgYW5kIGNvbnRlbnQuXG4gKi9cblVIUkJhc2UucHJvdG90eXBlLnJlcXVlc3QgPSBmdW5jdGlvbiAocGFyYW1ldGVycykge1xuXHR2YXIgc2VsZiA9IHRoaXM7XG5cdHJldHVybiB0aGlzLl92YWxpZGF0ZVJlcXVlc3QocGFyYW1ldGVycylcblx0XHQudGhlbihmdW5jdGlvbiAodmFsaWRhdGVkKSB7XG5cdFx0XHRyZXR1cm4gc2VsZi5fZG9SZXF1ZXN0KHZhbGlkYXRlZCk7XG5cdFx0fSk7XG59O1xuXG4vKipcbiAqIFZhbGlkYXRlcyBVSFIgcGFyYW1ldGVycy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbWV0ZXJzIFJlcXVlc3QgcGFyYW1ldGVycy5cbiAqIEBwYXJhbSB7U3RyaW5nfSBwYXJhbWV0ZXJzLm1ldGhvZCBIVFRQIG1ldGhvZC5cbiAqIEBwYXJhbSB7U3RyaW5nfSBwYXJhbWV0ZXJzLnVybCBVUkwgZm9yIHJlcXVlc3QuXG4gKiBAcGFyYW0ge09iamVjdD99IHBhcmFtZXRlcnMuaGVhZGVycyBIVFRQIGhlYWRlcnMgdG8gc2VuZC5cbiAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdD99IHBhcmFtZXRlcnMuZGF0YSBEYXRhIHRvIHNlbmQuXG4gKiBAcGFyYW0ge051bWJlcj99IHBhcmFtZXRlcnMudGltZW91dCBSZXF1ZXN0IHRpbWVvdXQuXG4gKiBAcGFyYW0ge0Jvb2xlYW4/fSBwYXJhbWV0ZXJzLnVuc2FmZUhUVFBTIElmIHRydWUgdGhlbiByZXF1ZXN0c1xuICogdG8gc2VydmVycyB3aXRoIGludmFsaWQgSFRUUFMgY2VydGlmaWNhdGVzIGFyZSBhbGxvd2VkLlxuICogQHJldHVybnMge1Byb21pc2V9IFByb21pc2UgZm9yIG5vdGhpbmcuXG4gKiBAcHJpdmF0ZVxuICovXG4vKmpzaGludCBtYXhjb21wbGV4aXR5OmZhbHNlICovXG5VSFJCYXNlLnByb3RvdHlwZS5fdmFsaWRhdGVSZXF1ZXN0ID0gZnVuY3Rpb24gKHBhcmFtZXRlcnMpIHtcblx0aWYgKCFwYXJhbWV0ZXJzIHx8IHR5cGVvZihwYXJhbWV0ZXJzKSAhPT0gJ29iamVjdCcpIHtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKEVSUk9SX1BBUkFNRVRFUlNfU0hPVUxEX0JFX09CSkVDVCkpO1xuXHR9XG5cblx0dmFyIHZhbGlkYXRlZCA9IE9iamVjdC5jcmVhdGUocGFyYW1ldGVycyk7XG5cblx0aWYgKHR5cGVvZihwYXJhbWV0ZXJzLnVybCkgIT09ICdzdHJpbmcnKSB7XG5cdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihFUlJPUl9VUkxfSVNfUkVRVUlSRUQpKTtcblx0fVxuXHR2YWxpZGF0ZWQudXJpID0gbmV3IFVSSSh2YWxpZGF0ZWQudXJsKTtcblx0aWYgKCF2YWxpZGF0ZWQudXJpLnNjaGVtZSkge1xuXHRcdHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoRVJST1JfU0NIRU1FX0lTX1JFUVVJUkVEKSk7XG5cdH1cblx0aWYgKCFIVFRQX1BST1RPQ09MX1JFR0VYUC50ZXN0KHZhbGlkYXRlZC51cmkuc2NoZW1lKSkge1xuXHRcdHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoRVJST1JfVU5TVVBQT1JURURfUFJPVE9DT0wpKTtcblx0fVxuXHRpZiAoIXZhbGlkYXRlZC51cmkuYXV0aG9yaXR5IHx8ICF2YWxpZGF0ZWQudXJpLmF1dGhvcml0eS5ob3N0KSB7XG5cdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihFUlJPUl9IT1NUX0lTX1JFUVVJUkVEKSk7XG5cdH1cblx0aWYgKHR5cGVvZih2YWxpZGF0ZWQubWV0aG9kKSAhPT0gJ3N0cmluZycgfHxcblx0XHQhKHZhbGlkYXRlZC5tZXRob2QgaW4gTUVUSE9EUykpIHtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKEVSUk9SX01FVEhPRF9JU19SRVFVSVJFRCkpO1xuXHR9XG5cblx0dmFsaWRhdGVkLnRpbWVvdXQgPSB2YWxpZGF0ZWQudGltZW91dCB8fCBERUZBVUxUX1RJTUVPVVQ7XG5cdGlmICh0eXBlb2YodmFsaWRhdGVkLnRpbWVvdXQpICE9PSAnbnVtYmVyJykge1xuXHRcdHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoRVJST1JfVElNRU9VVF9TSE9VTERfQkVfTlVNQkVSKSk7XG5cdH1cblxuXHR2YWxpZGF0ZWQuaGVhZGVycyA9IHRoaXMuX2NyZWF0ZUhlYWRlcnModmFsaWRhdGVkLmhlYWRlcnMpO1xuXG5cdGlmICghdGhpcy5faXNVcHN0cmVhbVJlcXVlc3QocGFyYW1ldGVycy5tZXRob2QpICYmXG5cdFx0dmFsaWRhdGVkLmRhdGEgJiYgdHlwZW9mKHZhbGlkYXRlZC5kYXRhKSA9PT0gJ29iamVjdCcpIHtcblxuXHRcdHZhciBkYXRhS2V5cyA9IE9iamVjdC5rZXlzKHZhbGlkYXRlZC5kYXRhKTtcblxuXHRcdGlmIChkYXRhS2V5cy5sZW5ndGggPiAwICYmICF2YWxpZGF0ZWQudXJpLnF1ZXJ5KSB7XG5cdFx0XHR2YWxpZGF0ZWQudXJpLnF1ZXJ5ID0gbmV3IFF1ZXJ5KCcnKTtcblx0XHR9XG5cblx0XHRkYXRhS2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRcdHZhbGlkYXRlZC51cmkucXVlcnkudmFsdWVzW2tleV0gPSB2YWxpZGF0ZWQuZGF0YVtrZXldO1xuXHRcdH0pO1xuXHRcdHZhbGlkYXRlZC5kYXRhID0gbnVsbDtcblx0fSBlbHNlIHtcblx0XHR2YXIgZGF0YUFuZEhlYWRlcnMgPSB0aGlzLl9nZXREYXRhVG9TZW5kKFxuXHRcdFx0dmFsaWRhdGVkLmhlYWRlcnMsIHZhbGlkYXRlZC5kYXRhXG5cdFx0KTtcblx0XHR2YWxpZGF0ZWQuaGVhZGVycyA9IGRhdGFBbmRIZWFkZXJzLmhlYWRlcnM7XG5cdFx0dmFsaWRhdGVkLmRhdGEgPSBkYXRhQW5kSGVhZGVycy5kYXRhO1xuXHR9XG5cblx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSh2YWxpZGF0ZWQpO1xufTtcblxuLyoqXG4gKiBHZXRzIGRhdGEgZm9yIHNlbmRpbmcgdmlhIEhUVFAgcmVxdWVzdCB1c2luZyBDb250ZW50IFR5cGUgSFRUUCBoZWFkZXIuXG4gKiBAcGFyYW0ge09iamVjdH0gaGVhZGVycyBIVFRQIGhlYWRlcnMuXG4gKiBAcGFyYW0ge09iamVjdHxzdHJpbmd9IGRhdGEgRGF0YSB0byBzZW5kLlxuICogQHJldHVybnMge3toZWFkZXJzOiBPYmplY3QsIGRhdGE6IE9iamVjdHxTdHJpbmd9fSBEYXRhIGFuZCBoZWFkZXJzIHRvIHNlbmQuXG4gKiBAcHJpdmF0ZVxuICovXG5VSFJCYXNlLnByb3RvdHlwZS5fZ2V0RGF0YVRvU2VuZCA9IGZ1bmN0aW9uIChoZWFkZXJzLCBkYXRhKSB7XG5cdHZhciBmb3VuZCA9IGZpbmRDb250ZW50VHlwZShoZWFkZXJzKSxcblx0XHRjb250ZW50VHlwZUhlYWRlciA9IGZvdW5kLm5hbWUsXG5cdFx0Y29udGVudFR5cGUgPSBmb3VuZC50eXBlO1xuXG5cdGlmICghZGF0YSB8fCB0eXBlb2YoZGF0YSkgIT09ICdvYmplY3QnKSB7XG5cdFx0ZGF0YSA9IGRhdGEgPyBTdHJpbmcoZGF0YSkgOiAnJztcblx0XHRpZiAoIWNvbnRlbnRUeXBlKSB7XG5cdFx0XHRoZWFkZXJzW2NvbnRlbnRUeXBlSGVhZGVyXSA9IFVIUkJhc2UuUExBSU5fVEVYVF9FTlRJVFlfQ09OVEVOVF9UWVBFO1xuXHRcdH1cblx0XHRyZXR1cm4ge1xuXHRcdFx0aGVhZGVyczogaGVhZGVycyxcblx0XHRcdGRhdGE6IGRhdGFcblx0XHR9O1xuXHR9XG5cblx0aWYgKGNvbnRlbnRUeXBlID09PSBVSFJCYXNlLlRZUEVTLkpTT04pIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0aGVhZGVyczogaGVhZGVycyxcblx0XHRcdGRhdGE6IEpTT04uc3RyaW5naWZ5KGRhdGEpXG5cdFx0fTtcblx0fVxuXG5cdC8vIG90aGVyd2lzZSBvYmplY3Qgd2lsbCBiZSBzZW50IHdpdGhcblx0Ly8gYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXG5cdGhlYWRlcnNbY29udGVudFR5cGVIZWFkZXJdID0gVUhSQmFzZS5VUkxfRU5DT0RFRF9FTlRJVFlfQ09OVEVOVF9UWVBFO1xuXG5cdHZhciBxdWVyeSA9IG5ldyBRdWVyeSgpO1xuXHRxdWVyeS52YWx1ZXMgPSBkYXRhO1xuXHRyZXR1cm4ge1xuXHRcdGhlYWRlcnM6IGhlYWRlcnMsXG5cdFx0ZGF0YTogcXVlcnkudG9TdHJpbmcoKVxuXHRcdFx0LnJlcGxhY2UoJysnLCAnJTJCJylcblx0XHRcdC5yZXBsYWNlKCclMjAnLCAnKycpXG5cdH07XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgSFRUUCBoZWFkZXJzIGZvciByZXF1ZXN0IHVzaW5nIGRlZmF1bHRzIGFuZCBjdXJyZW50IHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0ge09iamVjdH0gcGFyYW1ldGVySGVhZGVycyBIVFRQIGhlYWRlcnMgb2YgVUhSLlxuICogQHByb3RlY3RlZFxuICovXG5VSFJCYXNlLnByb3RvdHlwZS5fY3JlYXRlSGVhZGVycyA9IGZ1bmN0aW9uIChwYXJhbWV0ZXJIZWFkZXJzKSB7XG5cdGlmICghcGFyYW1ldGVySGVhZGVycyB8fCB0eXBlb2YocGFyYW1ldGVySGVhZGVycykgIT09ICdvYmplY3QnKSB7XG5cdFx0cGFyYW1ldGVySGVhZGVycyA9IHt9O1xuXHR9XG5cdHZhciBoZWFkZXJzID0ge307XG5cblx0T2JqZWN0LmtleXMoVUhSQmFzZS5ERUZBVUxUX0dFTkVSQUxfSEVBREVSUylcblx0XHQuZm9yRWFjaChmdW5jdGlvbiAoaGVhZGVyTmFtZSkge1xuXHRcdFx0aGVhZGVyc1toZWFkZXJOYW1lXSA9IFVIUkJhc2UuREVGQVVMVF9HRU5FUkFMX0hFQURFUlNbaGVhZGVyTmFtZV07XG5cdFx0fSk7XG5cblx0T2JqZWN0LmtleXMocGFyYW1ldGVySGVhZGVycylcblx0XHQuZm9yRWFjaChmdW5jdGlvbiAoaGVhZGVyTmFtZSkge1xuXHRcdFx0aWYgKHBhcmFtZXRlckhlYWRlcnNbaGVhZGVyTmFtZV0gPT09IG51bGwgfHxcblx0XHRcdFx0cGFyYW1ldGVySGVhZGVyc1toZWFkZXJOYW1lXSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdGRlbGV0ZSBoZWFkZXJzW2hlYWRlck5hbWVdO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRoZWFkZXJzW2hlYWRlck5hbWVdID0gcGFyYW1ldGVySGVhZGVyc1toZWFkZXJOYW1lXTtcblx0XHR9KTtcblxuXHRyZXR1cm4gaGVhZGVycztcbn07XG5cbi8qKlxuICogRG9lcyByZXF1ZXN0IHdpdGggc3BlY2lmaWVkIHBhcmFtZXRlcnMgdXNpbmcgcHJvdG9jb2wgaW1wbGVtZW50YXRpb24uXG4gKiBAcGFyYW0ge09iamVjdH0gcGFyYW1ldGVycyBSZXF1ZXN0IHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0ge1N0cmluZ30gcGFyYW1ldGVycy5tZXRob2QgSFRUUCBtZXRob2QuXG4gKiBAcGFyYW0ge1N0cmluZ30gcGFyYW1ldGVycy51cmwgVVJMIGZvciByZXF1ZXN0LlxuICogQHBhcmFtIHtVUkl9IHBhcmFtZXRlcnMudXJpIFVSSSBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdH0gcGFyYW1ldGVycy5oZWFkZXJzIEhUVFAgaGVhZGVycyB0byBzZW5kLlxuICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSBwYXJhbWV0ZXJzLmRhdGEgRGF0YSB0byBzZW5kLlxuICogQHBhcmFtIHtOdW1iZXJ9IHBhcmFtZXRlcnMudGltZW91dCBSZXF1ZXN0IHRpbWVvdXQuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHBhcmFtZXRlcnMudW5zYWZlSFRUUFMgSWYgdHJ1ZSB0aGVuIHJlcXVlc3RzIHRvIHNlcnZlcnMgd2l0aFxuICogaW52YWxpZCBIVFRQUyBjZXJ0aWZpY2F0ZXMgYXJlIGFsbG93ZWQuXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxPYmplY3Q+fSBQcm9taXNlIGZvciByZXN1bHQgd2l0aCBzdGF0dXMgb2JqZWN0IGFuZCBjb250ZW50LlxuICogQHByb3RlY3RlZFxuICogQGFic3RyYWN0XG4gKi9cblVIUkJhc2UucHJvdG90eXBlLl9kb1JlcXVlc3QgPSBmdW5jdGlvbiAocGFyYW1ldGVycykge1xufTtcblxuLyoqXG4gKiBDb252ZXJ0cyByZXNwb25zZSBkYXRhIGFjY29yZGluZyBjb250ZW50IHR5cGUuXG4gKiBAcGFyYW0ge09iamVjdH0gaGVhZGVycyBIVFRQIGhlYWRlcnMuXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVzcG9uc2VEYXRhIERhdGEgZnJvbSByZXNwb25zZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd8T2JqZWN0fSBDb252ZXJ0ZWQgZGF0YS5cbiAqL1xuVUhSQmFzZS5wcm90b3R5cGUuY29udmVydFJlc3BvbnNlID0gZnVuY3Rpb24gKGhlYWRlcnMsIHJlc3BvbnNlRGF0YSkge1xuXHRpZiAodHlwZW9mKHJlc3BvbnNlRGF0YSkgIT09ICdzdHJpbmcnKSB7XG5cdFx0cmVzcG9uc2VEYXRhID0gJyc7XG5cdH1cblx0dmFyIGZvdW5kID0gZmluZENvbnRlbnRUeXBlKGhlYWRlcnMpLFxuXHRcdGNvbnRlbnRUeXBlID0gZm91bmQudHlwZSB8fCBVSFJCYXNlLlRZUEVTLlBMQUlOX1RFWFQ7XG5cblx0c3dpdGNoIChjb250ZW50VHlwZSkge1xuXHRcdGNhc2UgVUhSQmFzZS5UWVBFUy5KU09OOlxuXHRcdFx0dmFyIGpzb247XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRqc29uID0gSlNPTi5wYXJzZShyZXNwb25zZURhdGEpO1xuXHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHQvLyBub3RoaW5nIHRvIGRvXG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4ganNvbiB8fCB7fTtcblx0XHRjYXNlIFVIUkJhc2UuVFlQRVMuVVJMX0VOQ09ERUQ6XG5cdFx0XHR2YXIgb2JqZWN0O1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0dmFyIHF1ZXJ5ID0gbmV3IFF1ZXJ5KHJlc3BvbnNlRGF0YS5yZXBsYWNlKCcrJywgJyUyMCcpKTtcblx0XHRcdFx0b2JqZWN0ID0gcXVlcnkudmFsdWVzO1xuXHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHQvLyBub3RoaW5nIHRvIGRvXG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gb2JqZWN0IHx8IHt9O1xuXHRcdGRlZmF1bHQ6XG5cdFx0XHRyZXR1cm4gcmVzcG9uc2VEYXRhO1xuXHR9XG59O1xuXG4vKipcbiAqIERldGVybWluZXMgaXMgY3VycmVudCBxdWVyeSBuZWVkcyB0byB1c2UgdXBzdHJlYW0uXG4gKiBAcGFyYW0ge1N0cmluZ30gbWV0aG9kIEhUVFAgbWV0aG9kLlxuICogQHJldHVybnMge0Jvb2xlYW59IElzIGN1cnJlbnQgSFRUUCBtZXRob2QgbWVhbnMgdXBzdHJlYW0gdXNhZ2UuXG4gKiBAcHJvdGVjdGVkXG4gKi9cblVIUkJhc2UucHJvdG90eXBlLl9pc1Vwc3RyZWFtUmVxdWVzdCA9IGZ1bmN0aW9uIChtZXRob2QpIHtcblx0cmV0dXJuIChcblx0XHRtZXRob2QgPT09IE1FVEhPRFMuUE9TVCB8fFxuXHRcdG1ldGhvZCA9PT0gTUVUSE9EUy5QVVQgfHxcblx0XHRtZXRob2QgPT09IE1FVEhPRFMuUEFUQ0hcblx0XHQpO1xufTtcblxuLyoqXG4gKiBGaW5kcyBjb250ZW50IHR5cGUgaGVhZGVyIGluIGhlYWRlcnMgb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IGhlYWRlcnMgSFRUUCBoZWFkZXJzLlxuICogQHJldHVybnMge3tuYW1lOiBTdHJpbmcsIHR5cGU6IFN0cmluZ319IE5hbWUgb2YgaGVhZGVyIGFuZCBjb250ZW50IHR5cGUuXG4gKi9cbmZ1bmN0aW9uIGZpbmRDb250ZW50VHlwZShoZWFkZXJzKSB7XG5cdHZhciBjb250ZW50VHlwZVN0cmluZyA9ICcnLFxuXHRcdGNvbnRlbnRUeXBlSGVhZGVyID0gJ0NvbnRlbnQtVHlwZSc7XG5cblx0T2JqZWN0LmtleXMoaGVhZGVycylcblx0XHQuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0XHRpZiAoa2V5LnRvTG93ZXJDYXNlKCkgIT09ICdjb250ZW50LXR5cGUnKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdGNvbnRlbnRUeXBlSGVhZGVyID0ga2V5O1xuXHRcdFx0Y29udGVudFR5cGVTdHJpbmcgPSBoZWFkZXJzW2tleV07XG5cdFx0fSk7XG5cblx0dmFyIHR5cGVBbmRQYXJhbWV0ZXJzID0gY29udGVudFR5cGVTdHJpbmcuc3BsaXQoJzsnKSxcblx0XHRjb250ZW50VHlwZSA9IHR5cGVBbmRQYXJhbWV0ZXJzWzBdLnRvTG93ZXJDYXNlKCk7XG5cdHJldHVybiB7XG5cdFx0bmFtZTogY29udGVudFR5cGVIZWFkZXIsXG5cdFx0dHlwZTogY29udGVudFR5cGVcblx0fTtcbn0iLCIvKlxuICogY2F0YmVycnlcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgRGVuaXMgUmVjaGt1bm92IGFuZCBwcm9qZWN0IGNvbnRyaWJ1dG9ycy5cbiAqXG4gKiBjYXRiZXJyeSdzIGxpY2Vuc2UgZm9sbG93czpcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvblxuICogb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb25cbiAqIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbixcbiAqIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsXG4gKiBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLFxuICogYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbiAqIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4gKiBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4gKiBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG4gKiBTT0ZUV0FSRS5cbiAqXG4gKiBUaGlzIGxpY2Vuc2UgYXBwbGllcyB0byBhbGwgcGFydHMgb2YgY2F0YmVycnkgdGhhdCBhcmUgbm90IGV4dGVybmFsbHlcbiAqIG1haW50YWluZWQgbGlicmFyaWVzLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdFVSSTogcmVxdWlyZSgnLi9saWIvVVJJJyksXG5cdEF1dGhvcml0eTogcmVxdWlyZSgnLi9saWIvQXV0aG9yaXR5JyksXG5cdFVzZXJJbmZvOiByZXF1aXJlKCcuL2xpYi9Vc2VySW5mbycpLFxuXHRRdWVyeTogcmVxdWlyZSgnLi9saWIvUXVlcnknKVxufTsiLCIvKlxuICogY2F0YmVycnktdXJpXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0IERlbmlzIFJlY2hrdW5vdiBhbmQgcHJvamVjdCBjb250cmlidXRvcnMuXG4gKlxuICogY2F0YmVycnktdXJpJ3MgbGljZW5zZSBmb2xsb3dzOlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXG4gKiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvblxuICogZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLFxuICogaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSxcbiAqIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsXG4gKiBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuICogc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbiAqIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1NcbiAqIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICpcbiAqIFRoaXMgbGljZW5zZSBhcHBsaWVzIHRvIGFsbCBwYXJ0cyBvZiBjYXRiZXJyeS11cmkgdGhhdCBhcmUgbm90IGV4dGVybmFsbHlcbiAqIG1haW50YWluZWQgbGlicmFyaWVzLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBBdXRob3JpdHk7XG5cbnZhciBVc2VySW5mbyA9IHJlcXVpcmUoJy4vVXNlckluZm8nKSxcblx0cGVyY2VudEVuY29kaW5nSGVscGVyID0gcmVxdWlyZSgnLi9wZXJjZW50RW5jb2RpbmdIZWxwZXInKTtcblxudmFyIFBPUlRfUkVHRVhQID0gL15cXGQrJC8sXG5cdEVSUk9SX1BPUlQgPSAnVVJJIGF1dGhvcml0eSBwb3J0IG11c3Qgc2F0aXNmeSBleHByZXNzaW9uICcgK1xuXHRcdFBPUlRfUkVHRVhQLnRvU3RyaW5nKCk7XG5cbi8qKlxuICogQ3JlYXRlcyBuZXcgaW5zdGFuY2Ugb2YgVVJJIGF1dGhvcml0eSBjb21wb25lbnQgcGFyc2VyLlxuICogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzM5ODYjc2VjdGlvbi0zLjJcbiAqIEBwYXJhbSB7U3RyaW5nP30gYXV0aG9yaXR5U3RyaW5nIFVSSSBhdXRob3JpdHkgY29tcG9uZW50IHN0cmluZy5cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBBdXRob3JpdHkoYXV0aG9yaXR5U3RyaW5nKSB7XG5cdGlmICh0eXBlb2YoYXV0aG9yaXR5U3RyaW5nKSA9PT0gJ3N0cmluZycgJiYgYXV0aG9yaXR5U3RyaW5nLmxlbmd0aCA+IDApIHtcblx0XHR2YXIgZmlyc3RBdEluZGV4ID0gYXV0aG9yaXR5U3RyaW5nLmluZGV4T2YoJ0AnKTtcblx0XHRpZiAoZmlyc3RBdEluZGV4ICE9PSAtMSkge1xuXHRcdFx0dmFyIHVzZXJJbmZvU3RyaW5nID0gYXV0aG9yaXR5U3RyaW5nLnN1YnN0cmluZygwLCBmaXJzdEF0SW5kZXgpO1xuXHRcdFx0dGhpcy51c2VySW5mbyA9IG5ldyBVc2VySW5mbyh1c2VySW5mb1N0cmluZyk7XG5cdFx0XHRhdXRob3JpdHlTdHJpbmcgPSBhdXRob3JpdHlTdHJpbmcuc3Vic3RyaW5nKGZpcnN0QXRJbmRleCArIDEpO1xuXHRcdH1cblxuXHRcdHZhciBsYXN0Q29sb25JbmRleCA9IGF1dGhvcml0eVN0cmluZy5sYXN0SW5kZXhPZignOicpO1xuXHRcdGlmIChsYXN0Q29sb25JbmRleCAhPT0gLTEpIHtcblx0XHRcdHZhciBwb3J0U3RyaW5nID0gYXV0aG9yaXR5U3RyaW5nLnN1YnN0cmluZyhsYXN0Q29sb25JbmRleCArIDEpO1xuXHRcdFx0aWYgKGxhc3RDb2xvbkluZGV4ID09PSBhdXRob3JpdHlTdHJpbmcubGVuZ3RoIC0gMSkge1xuXHRcdFx0XHR0aGlzLnBvcnQgPSAnJztcblx0XHRcdFx0YXV0aG9yaXR5U3RyaW5nID0gYXV0aG9yaXR5U3RyaW5nLnN1YnN0cmluZygwLCBsYXN0Q29sb25JbmRleCk7XG5cdFx0XHR9ZWxzZSBpZiAoUE9SVF9SRUdFWFAudGVzdChwb3J0U3RyaW5nKSkge1xuXHRcdFx0XHR0aGlzLnBvcnQgPSBwb3J0U3RyaW5nO1xuXHRcdFx0XHRhdXRob3JpdHlTdHJpbmcgPSBhdXRob3JpdHlTdHJpbmcuc3Vic3RyaW5nKDAsIGxhc3RDb2xvbkluZGV4KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR0aGlzLmhvc3QgPSBwZXJjZW50RW5jb2RpbmdIZWxwZXIuZGVjb2RlKGF1dGhvcml0eVN0cmluZyk7XG5cdH1cbn1cblxuLyoqXG4gKiBDdXJyZW50IHVzZXIgaW5mb3JtYXRpb24uXG4gKiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzk4NiNzZWN0aW9uLTMuMi4xXG4gKiBAdHlwZSB7VXNlckluZm99XG4gKi9cbkF1dGhvcml0eS5wcm90b3R5cGUudXNlckluZm8gPSBudWxsO1xuXG4vKipcbiAqIEN1cnJlbnQgaG9zdC5cbiAqIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzOTg2I3NlY3Rpb24tMy4yLjJcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKi9cbkF1dGhvcml0eS5wcm90b3R5cGUuaG9zdCA9IG51bGw7XG5cbi8qKlxuICogQ3VycmVudCBwb3J0LlxuICogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzM5ODYjc2VjdGlvbi0zLjIuM1xuICogQHR5cGUge1N0cmluZ31cbiAqL1xuQXV0aG9yaXR5LnByb3RvdHlwZS5wb3J0ID0gbnVsbDtcblxuLyoqXG4gKiBDbG9uZXMgY3VycmVudCBhdXRob3JpdHkuXG4gKiBAcmV0dXJucyB7QXV0aG9yaXR5fSBOZXcgY2xvbmUgb2YgY3VycmVudCBvYmplY3QuXG4gKi9cbkF1dGhvcml0eS5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbiAoKSB7XG5cdHZhciBhdXRob3JpdHkgPSBuZXcgQXV0aG9yaXR5KCk7XG5cdGlmICh0aGlzLnVzZXJJbmZvKSB7XG5cdFx0YXV0aG9yaXR5LnVzZXJJbmZvID0gdGhpcy51c2VySW5mby5jbG9uZSgpO1xuXHR9XG5cdGlmICh0eXBlb2YodGhpcy5ob3N0KSA9PT0gJ3N0cmluZycpIHtcblx0XHRhdXRob3JpdHkuaG9zdCA9IHRoaXMuaG9zdDtcblx0fVxuXHRpZiAodHlwZW9mKHRoaXMucG9ydCkgPT09ICdzdHJpbmcnKSB7XG5cdFx0YXV0aG9yaXR5LnBvcnQgPSB0aGlzLnBvcnQ7XG5cdH1cblx0cmV0dXJuIGF1dGhvcml0eTtcbn07XG5cbi8qKlxuICogUmVjb21iaW5lIGFsbCBhdXRob3JpdHkgY29tcG9uZW50cyBpbnRvIGF1dGhvcml0eSBzdHJpbmcuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBBdXRob3JpdHkgY29tcG9uZW50IHN0cmluZy5cbiAqL1xuQXV0aG9yaXR5LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcblx0dmFyIHJlc3VsdCA9ICcnO1xuXHRpZiAodGhpcy51c2VySW5mbykge1xuXHRcdHJlc3VsdCArPSB0aGlzLnVzZXJJbmZvLnRvU3RyaW5nKCkgKyAnQCc7XG5cdH1cblx0aWYgKHRoaXMuaG9zdCAhPT0gdW5kZWZpbmVkICYmIHRoaXMuaG9zdCAhPT0gbnVsbCkge1xuXHRcdHZhciBob3N0ID0gU3RyaW5nKHRoaXMuaG9zdCk7XG5cdFx0cmVzdWx0ICs9IHBlcmNlbnRFbmNvZGluZ0hlbHBlci5lbmNvZGVIb3N0KGhvc3QpO1xuXHR9XG5cdGlmICh0aGlzLnBvcnQgIT09IHVuZGVmaW5lZCAmJiB0aGlzLnBvcnQgIT09IG51bGwpIHtcblx0XHR2YXIgcG9ydCA9IFN0cmluZyh0aGlzLnBvcnQpO1xuXHRcdGlmIChwb3J0Lmxlbmd0aCA+IDAgJiYgIVBPUlRfUkVHRVhQLnRlc3QocG9ydCkpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihFUlJPUl9QT1JUKTtcblx0XHR9XG5cdFx0cmVzdWx0ICs9ICc6JyArIHBvcnQ7XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLypcbiAqIGNhdGJlcnJ5LXVyaVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNCBEZW5pcyBSZWNoa3Vub3YgYW5kIHByb2plY3QgY29udHJpYnV0b3JzLlxuICpcbiAqIGNhdGJlcnJ5LXVyaSdzIGxpY2Vuc2UgZm9sbG93czpcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvblxuICogb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb25cbiAqIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbixcbiAqIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsXG4gKiBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLFxuICogYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbiAqIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4gKiBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4gKiBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqXG4gKiBUaGlzIGxpY2Vuc2UgYXBwbGllcyB0byBhbGwgcGFydHMgb2YgY2F0YmVycnktdXJpIHRoYXQgYXJlIG5vdCBleHRlcm5hbGx5XG4gKiBtYWludGFpbmVkIGxpYnJhcmllcy5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gUXVlcnk7XG5cbnZhciBwZXJjZW50RW5jb2RpbmdIZWxwZXIgPSByZXF1aXJlKCcuL3BlcmNlbnRFbmNvZGluZ0hlbHBlcicpO1xuXG4vKipcbiAqIENyZWF0ZXMgbmV3IGluc3RhbmNlIG9mIFVSSSBxdWVyeSBjb21wb25lbnQgcGFyc2VyLlxuICogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzM5ODYjc2VjdGlvbi0zLjRcbiAqIEBwYXJhbSB7U3RyaW5nP30gcXVlcnlTdHJpbmcgVVJJIHF1ZXJ5IGNvbXBvbmVudCBzdHJpbmcuXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gUXVlcnkocXVlcnlTdHJpbmcpIHtcblx0aWYgKHR5cGVvZihxdWVyeVN0cmluZykgPT09ICdzdHJpbmcnKSB7XG5cdFx0dGhpcy52YWx1ZXMgPSB7fTtcblxuXHRcdHF1ZXJ5U3RyaW5nXG5cdFx0XHQuc3BsaXQoJyYnKVxuXHRcdFx0LmZvckVhY2goZnVuY3Rpb24gKHBhaXIpIHtcblx0XHRcdFx0dmFyIHBhcnRzID0gcGFpci5zcGxpdCgnPScpLFxuXHRcdFx0XHRcdGtleSA9IHBlcmNlbnRFbmNvZGluZ0hlbHBlci5kZWNvZGUocGFydHNbMF0pO1xuXHRcdFx0XHRpZiAoIWtleSkge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoa2V5IGluIHRoaXMudmFsdWVzICYmXG5cdFx0XHRcdFx0ISh0aGlzLnZhbHVlc1trZXldIGluc3RhbmNlb2YgQXJyYXkpKSB7XG5cdFx0XHRcdFx0dGhpcy52YWx1ZXNba2V5XSA9IFt0aGlzLnZhbHVlc1trZXldXTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhciB2YWx1ZSA9IHR5cGVvZihwYXJ0c1sxXSkgPT09ICdzdHJpbmcnID9cblx0XHRcdFx0XHRwZXJjZW50RW5jb2RpbmdIZWxwZXIuZGVjb2RlKHBhcnRzWzFdKSA6IG51bGw7XG5cblx0XHRcdFx0aWYgKHRoaXMudmFsdWVzW2tleV0gaW5zdGFuY2VvZiBBcnJheSkge1xuXHRcdFx0XHRcdHRoaXMudmFsdWVzW2tleV0ucHVzaCh2YWx1ZSk7XG5cdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdHRoaXMudmFsdWVzW2tleV0gPSB2YWx1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fSwgdGhpcyk7XG5cdH1cbn1cblxuLyoqXG4gKiBDdXJyZW50IHNldCBvZiB2YWx1ZXMgb2YgcXVlcnkuXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5RdWVyeS5wcm90b3R5cGUudmFsdWVzID0gbnVsbDtcblxuLyoqXG4gKiBDbG9uZXMgY3VycmVudCBxdWVyeSB0byBhIG5ldyBvYmplY3QuXG4gKiBAcmV0dXJucyB7UXVlcnl9IE5ldyBjbG9uZSBvZiBjdXJyZW50IG9iamVjdC5cbiAqL1xuUXVlcnkucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24gKCkge1xuXHR2YXIgcXVlcnkgPSBuZXcgUXVlcnkoKTtcblx0aWYgKHRoaXMudmFsdWVzKSB7XG5cdFx0cXVlcnkudmFsdWVzID0ge307XG5cdFx0T2JqZWN0LmtleXModGhpcy52YWx1ZXMpXG5cdFx0XHQuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0XHRcdHF1ZXJ5LnZhbHVlc1trZXldID0gdGhpcy52YWx1ZXNba2V5XTtcblx0XHRcdH0sIHRoaXMpO1xuXHR9XG5cdHJldHVybiBxdWVyeTtcbn07XG5cbi8qKlxuICogQ29udmVydHMgY3VycmVudCBzZXQgb2YgcXVlcnkgdmFsdWVzIHRvIHN0cmluZy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFF1ZXJ5IGNvbXBvbmVudCBzdHJpbmcuXG4gKi9cblF1ZXJ5LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcblx0aWYgKCF0aGlzLnZhbHVlcykge1xuXHRcdHJldHVybiAnJztcblx0fVxuXG5cdHZhciBxdWVyeVN0cmluZyA9ICcnO1xuXHRPYmplY3Qua2V5cyh0aGlzLnZhbHVlcylcblx0XHQuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0XHR2YXIgdmFsdWVzID0gdGhpcy52YWx1ZXNba2V5XSBpbnN0YW5jZW9mIEFycmF5ID9cblx0XHRcdFx0dGhpcy52YWx1ZXNba2V5XSA6IFt0aGlzLnZhbHVlc1trZXldXTtcblxuXHRcdFx0dmFsdWVzLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlKSB7XG5cdFx0XHRcdHF1ZXJ5U3RyaW5nICs9ICcmJyArIHBlcmNlbnRFbmNvZGluZ0hlbHBlclxuXHRcdFx0XHRcdC5lbmNvZGVRdWVyeVN1YkNvbXBvbmVudChrZXkpO1xuXHRcdFx0XHRpZiAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbCkge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHR2YWx1ZSA9IFN0cmluZyh2YWx1ZSk7XG5cdFx0XHRcdHF1ZXJ5U3RyaW5nICs9ICc9JyArXG5cdFx0XHRcdFx0cGVyY2VudEVuY29kaW5nSGVscGVyLmVuY29kZVF1ZXJ5U3ViQ29tcG9uZW50KHZhbHVlKTtcblx0XHRcdH0pO1xuXHRcdH0sIHRoaXMpO1xuXG5cdHJldHVybiBxdWVyeVN0cmluZy5yZXBsYWNlKC9eJi8sICcnKTtcbn07IiwiLypcbiAqIGNhdGJlcnJ5XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0IERlbmlzIFJlY2hrdW5vdiBhbmQgcHJvamVjdCBjb250cmlidXRvcnMuXG4gKlxuICogY2F0YmVycnkncyBsaWNlbnNlIGZvbGxvd3M6XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb25cbiAqIG9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uXG4gKiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sXG4gKiBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLFxuICogcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSxcbiAqIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4gKiBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuICogaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuICogT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKlxuICogVGhpcyBsaWNlbnNlIGFwcGxpZXMgdG8gYWxsIHBhcnRzIG9mIGNhdGJlcnJ5IHRoYXQgYXJlIG5vdCBleHRlcm5hbGx5XG4gKiBtYWludGFpbmVkIGxpYnJhcmllcy5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gVVJJO1xuXG52YXIgQXV0aG9yaXR5ID0gcmVxdWlyZSgnLi9BdXRob3JpdHknKSxcblx0cGVyY2VudEVuY29kaW5nSGVscGVyID0gcmVxdWlyZSgnLi9wZXJjZW50RW5jb2RpbmdIZWxwZXInKSxcblx0UXVlcnkgPSByZXF1aXJlKCcuL1F1ZXJ5Jyk7XG5cblx0Ly8gaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzM5ODYjYXBwZW5kaXgtQlxudmFyIFVSSV9QQVJTRV9SRUdFWFAgPSBuZXcgUmVnRXhwKFxuXHRcdCdeKChbXjovPyNdKyk6KT8oLy8oW14vPyNdKikpPyhbXj8jXSopKFxcXFw/KFteI10qKSk/KCMoLiopKT8nXG5cdCksXG5cdC8vIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzOTg2I3NlY3Rpb24tMy4xXG5cdFNDSEVNRV9SRUdFWFAgPSAvXlthLXpdK1thLXpcXGRcXCtcXC4tXSokL2ksXG5cdEVSUk9SX1NDSEVNRSA9ICdVUkkgc2NoZW1lIG11c3Qgc2F0aXNmeSBleHByZXNzaW9uICcgK1xuXHRcdFNDSEVNRV9SRUdFWFAudG9TdHJpbmcoKSxcblx0RVJST1JfQkFTRV9TQ0hFTUUgPSAnU2NoZW1lIGNvbXBvbmVudCBpcyByZXF1aXJlZCB0byBiZSBwcmVzZW50ICcgK1xuXHRcdCdpbiBhIGJhc2UgVVJJJztcblxuLyoqXG4gKiBDcmVhdGVzIG5ldyBpbnN0YW5jZSBvZiBVUkkgYWNjb3JkaW5nIHRvIFJGQyAzOTg2LlxuICogQHBhcmFtIHtTdHJpbmc/fSB1cmlTdHJpbmcgVVJJIHN0cmluZyB0byBwYXJzZSBjb21wb25lbnRzLlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIFVSSSh1cmlTdHJpbmcpIHtcblx0aWYgKHR5cGVvZih1cmlTdHJpbmcpICE9PSAnc3RyaW5nJykge1xuXHRcdHVyaVN0cmluZyA9ICcnO1xuXHR9XG5cblx0Ly8gaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzM5ODYjYXBwZW5kaXgtQlxuXHR2YXIgbWF0Y2hlcyA9IHVyaVN0cmluZy5tYXRjaChVUklfUEFSU0VfUkVHRVhQKTtcblxuXHRpZiAobWF0Y2hlcykge1xuXHRcdGlmICh0eXBlb2YobWF0Y2hlc1syXSkgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHR0aGlzLnNjaGVtZSA9IHBlcmNlbnRFbmNvZGluZ0hlbHBlci5kZWNvZGUobWF0Y2hlc1syXSk7XG5cdFx0fVxuXHRcdGlmICh0eXBlb2YobWF0Y2hlc1s0XSkgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHR0aGlzLmF1dGhvcml0eSA9IG5ldyBBdXRob3JpdHkobWF0Y2hlc1s0XSk7XG5cdFx0fVxuXHRcdGlmICh0eXBlb2YobWF0Y2hlc1s1XSkgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHR0aGlzLnBhdGggPSBwZXJjZW50RW5jb2RpbmdIZWxwZXIuZGVjb2RlKG1hdGNoZXNbNV0pO1xuXHRcdH1cblx0XHRpZiAodHlwZW9mKG1hdGNoZXNbN10pID09PSAnc3RyaW5nJykge1xuXHRcdFx0dGhpcy5xdWVyeSA9IG5ldyBRdWVyeShtYXRjaGVzWzddKTtcblx0XHR9XG5cdFx0aWYgKHR5cGVvZihtYXRjaGVzWzldKSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdHRoaXMuZnJhZ21lbnQgPSBwZXJjZW50RW5jb2RpbmdIZWxwZXIuZGVjb2RlKG1hdGNoZXNbOV0pO1xuXHRcdH1cblx0fVxufVxuXG4vKipcbiAqIEN1cnJlbnQgVVJJIHNjaGVtZS5cbiAqIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzOTg2I3NlY3Rpb24tMy4xXG4gKiBAdHlwZSB7U3RyaW5nfVxuICovXG5VUkkucHJvdG90eXBlLnNjaGVtZSA9IG51bGw7XG5cbi8qKlxuICogQ3VycmVudCBVUkkgYXV0aG9yaXR5LlxuICogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzM5ODYjc2VjdGlvbi0zLjJcbiAqIEB0eXBlIHtBdXRob3JpdHl9XG4gKi9cblVSSS5wcm90b3R5cGUuYXV0aG9yaXR5ID0gbnVsbDtcblxuLyoqXG4gKiBDdXJyZW50IFVSSSBwYXRoLlxuICogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzM5ODYjc2VjdGlvbi0zLjNcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKi9cblVSSS5wcm90b3R5cGUucGF0aCA9IG51bGw7XG5cbi8qKlxuICogQ3VycmVudCBVUkkgcXVlcnkuXG4gKiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzk4NiNzZWN0aW9uLTMuNFxuICogQHR5cGUge1F1ZXJ5fVxuICovXG5VUkkucHJvdG90eXBlLnF1ZXJ5ID0gbnVsbDtcblxuLyoqXG4gKiBDdXJyZW50IFVSSSBmcmFnbWVudC5cbiAqIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzOTg2I3NlY3Rpb24tMy41XG4gKiBAdHlwZSB7U3RyaW5nfVxuICovXG5VUkkucHJvdG90eXBlLmZyYWdtZW50ID0gbnVsbDtcblxuLyoqXG4gKiBDb252ZXJ0cyBhIFVSSSByZWZlcmVuY2UgdGhhdCBtaWdodCBiZSByZWxhdGl2ZSB0byBhIGdpdmVuIGJhc2UgVVJJXG4gKiBpbnRvIHRoZSByZWZlcmVuY2UncyB0YXJnZXQgVVJJLlxuICogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzM5ODYjc2VjdGlvbi01LjJcbiAqIEBwYXJhbSB7VVJJfSBiYXNlVXJpIEJhc2UgVVJJLlxuICogQHJldHVybnMge1VSSX0gUmVzb2x2ZWQgVVJJLlxuICovXG5VUkkucHJvdG90eXBlLnJlc29sdmVSZWxhdGl2ZSA9IGZ1bmN0aW9uIChiYXNlVXJpKSB7XG5cdGlmICghYmFzZVVyaS5zY2hlbWUpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoRVJST1JfQkFTRV9TQ0hFTUUpO1xuXHR9XG5cblx0cmV0dXJuIHRyYW5zZm9ybVJlZmVyZW5jZShiYXNlVXJpLCB0aGlzKTtcbn07XG5cbi8qKlxuICogQ2xvbmVzIGN1cnJlbnQgVVJJIHRvIGEgbmV3IG9iamVjdC5cbiAqIEByZXR1cm5zIHtVUkl9IE5ldyBjbG9uZSBvZiBjdXJyZW50IG9iamVjdC5cbiAqL1xuVVJJLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uICgpIHtcblx0dmFyIHVyaSA9IG5ldyBVUkkoKTtcblxuXHRpZiAodHlwZW9mKHRoaXMuc2NoZW1lKSA9PT0gJ3N0cmluZycpIHtcblx0XHR1cmkuc2NoZW1lID0gdGhpcy5zY2hlbWU7XG5cdH1cblxuXHRpZiAodGhpcy5hdXRob3JpdHkpIHtcblx0XHR1cmkuYXV0aG9yaXR5ID0gdGhpcy5hdXRob3JpdHkuY2xvbmUoKTtcblx0fVxuXG5cdGlmICh0eXBlb2YodGhpcy5wYXRoKSA9PT0gJ3N0cmluZycpIHtcblx0XHR1cmkucGF0aCA9IHRoaXMucGF0aDtcblx0fVxuXG5cdGlmICh0aGlzLnF1ZXJ5KSB7XG5cdFx0dXJpLnF1ZXJ5ID0gdGhpcy5xdWVyeS5jbG9uZSgpO1xuXHR9XG5cblx0aWYgKHR5cGVvZih0aGlzLmZyYWdtZW50KSA9PT0gJ3N0cmluZycpIHtcblx0XHR1cmkuZnJhZ21lbnQgPSB0aGlzLmZyYWdtZW50O1xuXHR9XG5cblx0cmV0dXJuIHVyaTtcbn07XG5cbi8qKlxuICogUmVjb21wb3NlcyBVUkkgY29tcG9uZW50cyB0byBVUkkgc3RyaW5nLFxuICogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzM5ODYjc2VjdGlvbi01LjNcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFVSSSBzdHJpbmcuXG4gKi9cblVSSS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG5cdHZhciByZXN1bHQgPSAnJztcblxuXHRpZiAodGhpcy5zY2hlbWUgIT09IHVuZGVmaW5lZCAmJiB0aGlzLnNjaGVtZSAhPT0gbnVsbCkge1xuXHRcdHZhciBzY2hlbWUgPSBTdHJpbmcodGhpcy5zY2hlbWUpO1xuXHRcdGlmICghU0NIRU1FX1JFR0VYUC50ZXN0KHNjaGVtZSkpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihFUlJPUl9TQ0hFTUUpO1xuXHRcdH1cblx0XHRyZXN1bHQgKz0gc2NoZW1lICsgJzonO1xuXHR9XG5cblx0aWYgKHRoaXMuYXV0aG9yaXR5KSB7XG5cdFx0cmVzdWx0ICs9ICcvLycgKyB0aGlzLmF1dGhvcml0eS50b1N0cmluZygpO1xuXHR9XG5cblx0dmFyIHBhdGggPSB0aGlzLnBhdGggPT09IHVuZGVmaW5lZCB8fCB0aGlzLnBhdGggPT09IG51bGwgP1xuXHRcdCcnIDogU3RyaW5nKHRoaXMucGF0aCk7XG5cdHJlc3VsdCArPSBwZXJjZW50RW5jb2RpbmdIZWxwZXIuZW5jb2RlUGF0aChwYXRoKTtcblxuXHRpZiAodGhpcy5xdWVyeSkge1xuXHRcdHJlc3VsdCArPSAnPycgKyB0aGlzLnF1ZXJ5LnRvU3RyaW5nKCk7XG5cdH1cblxuXHRpZiAodGhpcy5mcmFnbWVudCAhPT0gdW5kZWZpbmVkICYmIHRoaXMuZnJhZ21lbnQgIT09IG51bGwpIHtcblx0XHR2YXIgZnJhZ21lbnQgPSBTdHJpbmcodGhpcy5mcmFnbWVudCk7XG5cdFx0cmVzdWx0ICs9ICcjJyArIHBlcmNlbnRFbmNvZGluZ0hlbHBlci5lbmNvZGVGcmFnbWVudChmcmFnbWVudCk7XG5cdH1cblxuXHRyZXR1cm4gcmVzdWx0O1xufTtcblxuLyoqXG4gKiBUcmFuc2Zvcm1zIHJlZmVyZW5jZSBmb3IgcmVsYXRpdmUgcmVzb2x1dGlvbi5cbiAqIFdob2xlIGFsZ29yaXRobSBoYXMgYmVlbiB0YWtlbiBmcm9tXG4gKiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzk4NiNzZWN0aW9uLTUuMi4yXG4gKiBAcGFyYW0ge1VSSX0gYmFzZVVyaSBCYXNlIFVSSSBmb3IgcmVzb2x1dGlvbi5cbiAqIEBwYXJhbSB7VVJJfSByZWZlcmVuY2VVcmkgUmVmZXJlbmNlIFVSSSB0byByZXNvbHZlLlxuICogQHJldHVybnMge1VSSX0gQ29tcG9uZW50cyBvZiB0YXJnZXQgVVJJLlxuICovXG4vKmpzaGludCBtYXhkZXB0aDpmYWxzZSAqL1xuLypqc2hpbnQgbWF4Y29tcGxleGl0eTpmYWxzZSAqL1xuZnVuY3Rpb24gdHJhbnNmb3JtUmVmZXJlbmNlKGJhc2VVcmksIHJlZmVyZW5jZVVyaSkge1xuXHR2YXIgdGFyZ2V0VXJpID0gbmV3IFVSSSgnJyk7XG5cblx0aWYgKHJlZmVyZW5jZVVyaS5zY2hlbWUpIHtcblx0XHR0YXJnZXRVcmkuc2NoZW1lID0gcmVmZXJlbmNlVXJpLnNjaGVtZTtcblx0XHR0YXJnZXRVcmkuYXV0aG9yaXR5ID0gcmVmZXJlbmNlVXJpLmF1dGhvcml0eSA/XG5cdFx0XHRyZWZlcmVuY2VVcmkuYXV0aG9yaXR5LmNsb25lKCkgOiByZWZlcmVuY2VVcmkuYXV0aG9yaXR5O1xuXHRcdHRhcmdldFVyaS5wYXRoID0gcmVtb3ZlRG90U2VnbWVudHMocmVmZXJlbmNlVXJpLnBhdGgpO1xuXHRcdHRhcmdldFVyaS5xdWVyeSA9IHJlZmVyZW5jZVVyaS5xdWVyeSA/XG5cdFx0XHRyZWZlcmVuY2VVcmkucXVlcnkuY2xvbmUoKSA6IHJlZmVyZW5jZVVyaS5xdWVyeTtcblx0fSBlbHNlIHtcblx0XHRpZiAocmVmZXJlbmNlVXJpLmF1dGhvcml0eSkge1xuXHRcdFx0dGFyZ2V0VXJpLmF1dGhvcml0eSA9IHJlZmVyZW5jZVVyaS5hdXRob3JpdHkgP1xuXHRcdFx0XHRyZWZlcmVuY2VVcmkuYXV0aG9yaXR5LmNsb25lKCkgOiByZWZlcmVuY2VVcmkuYXV0aG9yaXR5O1xuXHRcdFx0dGFyZ2V0VXJpLnBhdGggPSByZW1vdmVEb3RTZWdtZW50cyhyZWZlcmVuY2VVcmkucGF0aCk7XG5cdFx0XHR0YXJnZXRVcmkucXVlcnkgPSByZWZlcmVuY2VVcmkucXVlcnkgP1xuXHRcdFx0XHRyZWZlcmVuY2VVcmkucXVlcnkuY2xvbmUoKSA6IHJlZmVyZW5jZVVyaS5xdWVyeTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKHJlZmVyZW5jZVVyaS5wYXRoID09PSAnJykge1xuXHRcdFx0XHR0YXJnZXRVcmkucGF0aCA9IGJhc2VVcmkucGF0aDtcblx0XHRcdFx0aWYgKHJlZmVyZW5jZVVyaS5xdWVyeSkge1xuXHRcdFx0XHRcdHRhcmdldFVyaS5xdWVyeSA9IHJlZmVyZW5jZVVyaS5xdWVyeS5jbG9uZSgpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRhcmdldFVyaS5xdWVyeSA9IGJhc2VVcmkucXVlcnkgP1xuXHRcdFx0XHRcdFx0YmFzZVVyaS5xdWVyeS5jbG9uZSgpIDogYmFzZVVyaS5xdWVyeTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKHJlZmVyZW5jZVVyaS5wYXRoWzBdID09PSAnLycpIHtcblx0XHRcdFx0XHR0YXJnZXRVcmkucGF0aCA9XG5cdFx0XHRcdFx0XHRyZW1vdmVEb3RTZWdtZW50cyhyZWZlcmVuY2VVcmkucGF0aCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGFyZ2V0VXJpLnBhdGggPVxuXHRcdFx0XHRcdFx0bWVyZ2UoYmFzZVVyaSwgcmVmZXJlbmNlVXJpKTtcblx0XHRcdFx0XHR0YXJnZXRVcmkucGF0aCA9XG5cdFx0XHRcdFx0XHRyZW1vdmVEb3RTZWdtZW50cyh0YXJnZXRVcmkucGF0aCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0dGFyZ2V0VXJpLnF1ZXJ5ID0gcmVmZXJlbmNlVXJpLnF1ZXJ5ID9cblx0XHRcdFx0XHRyZWZlcmVuY2VVcmkucXVlcnkuY2xvbmUoKSA6IHJlZmVyZW5jZVVyaS5xdWVyeTtcblx0XHRcdH1cblx0XHRcdHRhcmdldFVyaS5hdXRob3JpdHkgPSBiYXNlVXJpLmF1dGhvcml0eSA/XG5cdFx0XHRcdGJhc2VVcmkuYXV0aG9yaXR5LmNsb25lKCkgOiBiYXNlVXJpLmF1dGhvcml0eTtcblx0XHR9XG5cdFx0dGFyZ2V0VXJpLnNjaGVtZSA9IGJhc2VVcmkuc2NoZW1lO1xuXHR9XG5cblx0dGFyZ2V0VXJpLmZyYWdtZW50ID0gcmVmZXJlbmNlVXJpLmZyYWdtZW50O1xuXHRyZXR1cm4gdGFyZ2V0VXJpO1xufVxuXG4vKipcbiAqIE1lcmdlcyBhIHJlbGF0aXZlLXBhdGggcmVmZXJlbmNlIHdpdGggdGhlIHBhdGggb2YgdGhlIGJhc2UgVVJJLlxuICogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzM5ODYjc2VjdGlvbi01LjIuM1xuICogQHBhcmFtIHtVUkl9IGJhc2VVcmkgQ29tcG9uZW50cyBvZiBiYXNlIFVSSS5cbiAqIEBwYXJhbSB7VVJJfSByZWZlcmVuY2VVcmkgQ29tcG9uZW50cyBvZiByZWZlcmVuY2UgVVJJLlxuICogQHJldHVybnMge1N0cmluZ30gTWVyZ2VkIHBhdGguXG4gKi9cbmZ1bmN0aW9uIG1lcmdlKGJhc2VVcmksIHJlZmVyZW5jZVVyaSkge1xuXHRpZiAoYmFzZVVyaS5hdXRob3JpdHkgJiYgYmFzZVVyaS5wYXRoID09PSAnJykge1xuXHRcdHJldHVybiAnLycgKyByZWZlcmVuY2VVcmkucGF0aDtcblx0fVxuXG5cdHZhciBzZWdtZW50c1N0cmluZyA9IGJhc2VVcmkucGF0aC5pbmRleE9mKCcvJykgIT09IC0xID9cblx0XHRiYXNlVXJpLnBhdGgucmVwbGFjZSgvXFwvW15cXC9dKyQvLCAnLycpIDogJyc7XG5cblx0cmV0dXJuIHNlZ21lbnRzU3RyaW5nICsgcmVmZXJlbmNlVXJpLnBhdGg7XG59XG5cbi8qKlxuICogUmVtb3ZlcyBkb3RzIHNlZ21lbnRzIGZyb20gVVJJIHBhdGguXG4gKiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzk4NiNzZWN0aW9uLTUuMi40XG4gKiBAcGFyYW0ge1N0cmluZ30gdXJpUGF0aCBVUkkgcGF0aCB3aXRoIHBvc3NpYmxlIGRvdCBzZWdtZW50cy5cbiAqIEByZXR1cm5zIHtTdHJpbmd9IFVSSSBwYXRoIHdpdGhvdXQgZG90IHNlZ21lbnRzLlxuICovXG5mdW5jdGlvbiByZW1vdmVEb3RTZWdtZW50cyh1cmlQYXRoKSB7XG5cdGlmICghdXJpUGF0aCkge1xuXHRcdHJldHVybiAnJztcblx0fVxuXG5cdHZhciBpbnB1dEJ1ZmZlciA9IHVyaVBhdGgsXG5cdFx0bmV3QnVmZmVyID0gJycsXG5cdFx0bmV4dFNlZ21lbnQgPSAnJyxcblx0XHRvdXRwdXRCdWZmZXIgPSAnJztcblxuXHR3aGlsZSAoaW5wdXRCdWZmZXIubGVuZ3RoICE9PSAwKSB7XG5cblx0XHQvLyBJZiB0aGUgaW5wdXQgYnVmZmVyIGJlZ2lucyB3aXRoIGEgcHJlZml4IG9mIFwiLi4vXCIgb3IgXCIuL1wiLFxuXHRcdC8vIHRoZW4gcmVtb3ZlIHRoYXQgcHJlZml4IGZyb20gdGhlIGlucHV0IGJ1ZmZlclxuXHRcdG5ld0J1ZmZlciA9IGlucHV0QnVmZmVyLnJlcGxhY2UoL15cXC4/XFwuXFwvLywgJycpO1xuXHRcdGlmIChuZXdCdWZmZXIgIT09IGlucHV0QnVmZmVyKSB7XG5cdFx0XHRpbnB1dEJ1ZmZlciA9IG5ld0J1ZmZlcjtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblxuXHRcdC8vIGlmIHRoZSBpbnB1dCBidWZmZXIgYmVnaW5zIHdpdGggYSBwcmVmaXggb2YgXCIvLi9cIiBvciBcIi8uXCIsXG5cdFx0Ly8gd2hlcmUgXCIuXCIgaXMgYSBjb21wbGV0ZSBwYXRoIHNlZ21lbnQsIHRoZW4gcmVwbGFjZSB0aGF0XG5cdFx0Ly8gcHJlZml4IHdpdGggXCIvXCIgaW4gdGhlIGlucHV0IGJ1ZmZlclxuXHRcdG5ld0J1ZmZlciA9IGlucHV0QnVmZmVyLnJlcGxhY2UoL14oKFxcL1xcLlxcLyl8KFxcL1xcLiQpKS8sICcvJyk7XG5cdFx0aWYgKG5ld0J1ZmZlciAhPT0gaW5wdXRCdWZmZXIpIHtcblx0XHRcdGlucHV0QnVmZmVyID0gbmV3QnVmZmVyO1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXG5cdFx0Ly8gaWYgdGhlIGlucHV0IGJ1ZmZlciBiZWdpbnMgd2l0aCBhIHByZWZpeCBvZiBcIi8uLi9cIiBvciBcIi8uLlwiLFxuXHRcdC8vIHdoZXJlIFwiLi5cIiBpcyBhIGNvbXBsZXRlIHBhdGggc2VnbWVudCwgdGhlbiByZXBsYWNlIHRoYXRcblx0XHQvLyBwcmVmaXggd2l0aCBcIi9cIiBpbiB0aGUgaW5wdXQgYnVmZmVyIGFuZCByZW1vdmUgdGhlIGxhc3Rcblx0XHQvLyBzZWdtZW50IGFuZCBpdHMgcHJlY2VkaW5nIFwiL1wiIChpZiBhbnkpIGZyb20gdGhlIG91dHB1dFxuXHRcdC8vIGJ1ZmZlclxuXHRcdG5ld0J1ZmZlciA9IGlucHV0QnVmZmVyLnJlcGxhY2UoL14oKFxcL1xcLlxcLlxcLyl8KFxcL1xcLlxcLiQpKS8sICcvJyk7XG5cdFx0aWYgKG5ld0J1ZmZlciAhPT0gaW5wdXRCdWZmZXIpIHtcblx0XHRcdG91dHB1dEJ1ZmZlciA9IG91dHB1dEJ1ZmZlci5yZXBsYWNlKC9cXC9bXlxcL10rJC8sICcnKTtcblx0XHRcdGlucHV0QnVmZmVyID0gbmV3QnVmZmVyO1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXG5cdFx0Ly8gaWYgdGhlIGlucHV0IGJ1ZmZlciBjb25zaXN0cyBvbmx5IG9mIFwiLlwiIG9yIFwiLi5cIiwgdGhlbiByZW1vdmVcblx0XHQvLyB0aGF0IGZyb20gdGhlIGlucHV0IGJ1ZmZlclxuXHRcdGlmIChpbnB1dEJ1ZmZlciA9PT0gJy4nIHx8IGlucHV0QnVmZmVyID09PSAnLi4nKSB7XG5cdFx0XHRicmVhaztcblx0XHR9XG5cblx0XHQvLyBtb3ZlIHRoZSBmaXJzdCBwYXRoIHNlZ21lbnQgaW4gdGhlIGlucHV0IGJ1ZmZlciB0byB0aGUgZW5kIG9mXG5cdFx0Ly8gdGhlIG91dHB1dCBidWZmZXIsIGluY2x1ZGluZyB0aGUgaW5pdGlhbCBcIi9cIiBjaGFyYWN0ZXIgKGlmXG5cdFx0Ly8gYW55KSBhbmQgYW55IHN1YnNlcXVlbnQgY2hhcmFjdGVycyB1cCB0bywgYnV0IG5vdCBpbmNsdWRpbmcsXG5cdFx0Ly8gdGhlIG5leHQgXCIvXCIgY2hhcmFjdGVyIG9yIHRoZSBlbmQgb2YgdGhlIGlucHV0IGJ1ZmZlclxuXHRcdG5leHRTZWdtZW50ID0gL15cXC8/W15cXC9dKihcXC98JCkvLmV4ZWMoaW5wdXRCdWZmZXIpWzBdO1xuXHRcdG5leHRTZWdtZW50ID0gbmV4dFNlZ21lbnQucmVwbGFjZSgvKFteXFwvXSkoXFwvJCkvLCAnJDEnKTtcblx0XHRpbnB1dEJ1ZmZlciA9IGlucHV0QnVmZmVyLnN1YnN0cmluZyhuZXh0U2VnbWVudC5sZW5ndGgpO1xuXHRcdG91dHB1dEJ1ZmZlciArPSBuZXh0U2VnbWVudDtcblx0fVxuXG5cdHJldHVybiBvdXRwdXRCdWZmZXI7XG59IiwiLypcbiAqIGNhdGJlcnJ5LXVyaVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNCBEZW5pcyBSZWNoa3Vub3YgYW5kIHByb2plY3QgY29udHJpYnV0b3JzLlxuICpcbiAqIGNhdGJlcnJ5LXVyaSdzIGxpY2Vuc2UgZm9sbG93czpcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvblxuICogb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb25cbiAqIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbixcbiAqIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsXG4gKiBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLFxuICogYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbiAqIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4gKiBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4gKiBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqXG4gKiBUaGlzIGxpY2Vuc2UgYXBwbGllcyB0byBhbGwgcGFydHMgb2YgY2F0YmVycnktdXJpIHRoYXQgYXJlIG5vdCBleHRlcm5hbGx5XG4gKiBtYWludGFpbmVkIGxpYnJhcmllcy5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gVXNlckluZm87XG5cbnZhciBwZXJjZW50RW5jb2RpbmdIZWxwZXIgPSByZXF1aXJlKCcuL3BlcmNlbnRFbmNvZGluZ0hlbHBlcicpO1xuXG4vKipcbiAqIENyZWF0ZXMgbmV3IGluc3RhbmNlIG9mIHVzZXIgaW5mb3JtYXRpb24gY29tcG9uZW50IHBhcnNlci5cbiAqIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzOTg2I3NlY3Rpb24tMy4yLjFcbiAqIEBwYXJhbSB7U3RyaW5nP30gdXNlckluZm9TdHJpbmcgVXNlciBpbmZvcm1hdGlvbiBjb21wb25lbnQgc3RyaW5nLlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIFVzZXJJbmZvKHVzZXJJbmZvU3RyaW5nKSB7XG5cdGlmICh0eXBlb2YodXNlckluZm9TdHJpbmcpID09PSAnc3RyaW5nJyAmJiB1c2VySW5mb1N0cmluZy5sZW5ndGggPiAwKSB7XG5cdFx0dmFyIHBhcnRzID0gdXNlckluZm9TdHJpbmcuc3BsaXQoJzonKTtcblx0XHRpZiAodHlwZW9mKHBhcnRzWzBdKSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdHRoaXMudXNlciA9IHBlcmNlbnRFbmNvZGluZ0hlbHBlci5kZWNvZGUocGFydHNbMF0pO1xuXHRcdH1cblx0XHRpZiAodHlwZW9mKHBhcnRzWzFdKSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdHRoaXMucGFzc3dvcmQgPSBwZXJjZW50RW5jb2RpbmdIZWxwZXIuZGVjb2RlKHBhcnRzWzFdKTtcblx0XHR9XG5cdH1cbn1cblxuLyoqXG4gKiBDdXJyZW50IHVzZXIgY29tcG9uZW50LlxuICogQHR5cGUge1N0cmluZ31cbiAqL1xuVXNlckluZm8ucHJvdG90eXBlLnVzZXIgPSBudWxsO1xuXG4vKipcbiAqIEN1cnJlbnQgcGFzc3dvcmQuXG4gKiBAdHlwZSB7U3RyaW5nfVxuICovXG5Vc2VySW5mby5wcm90b3R5cGUucGFzc3dvcmQgPSBudWxsO1xuXG4vKipcbiAqIENsb25lcyBjdXJyZW50IHVzZXIgaW5mb3JtYXRpb24uXG4gKiBAcmV0dXJucyB7VXNlckluZm99IE5ldyBjbG9uZSBvZiBjdXJyZW50IG9iamVjdC5cbiAqL1xuVXNlckluZm8ucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24gKCkge1xuXHR2YXIgdXNlckluZm8gPSBuZXcgVXNlckluZm8oKTtcblx0aWYgKHR5cGVvZih0aGlzLnVzZXIpID09PSAnc3RyaW5nJykge1xuXHRcdHVzZXJJbmZvLnVzZXIgPSB0aGlzLnVzZXI7XG5cdH1cblx0aWYgKHR5cGVvZih0aGlzLnBhc3N3b3JkKSA9PT0gJ3N0cmluZycpIHtcblx0XHR1c2VySW5mby5wYXNzd29yZCA9IHRoaXMucGFzc3dvcmQ7XG5cdH1cblx0cmV0dXJuIHVzZXJJbmZvO1xufTtcblxuLyoqXG4gKiBSZWNvbWJpbmVzIHVzZXIgaW5mb3JtYXRpb24gY29tcG9uZW50cyB0byB1c2VySW5mbyBzdHJpbmcuXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBVc2VyIGluZm9ybWF0aW9uIGNvbXBvbmVudCBzdHJpbmcuXG4gKi9cblVzZXJJbmZvLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcblx0dmFyIHJlc3VsdCA9ICcnO1xuXHRpZiAodGhpcy51c2VyICE9PSB1bmRlZmluZWQgJiYgdGhpcy51c2VyICE9PSBudWxsKSB7XG5cdFx0dmFyIHVzZXIgPSBTdHJpbmcodGhpcy51c2VyKTtcblx0XHRyZXN1bHQgKz0gcGVyY2VudEVuY29kaW5nSGVscGVyXG5cdFx0XHQuZW5jb2RlVXNlckluZm9TdWJDb21wb25lbnQodXNlcik7XG5cdH1cblx0aWYgKHRoaXMucGFzc3dvcmQgIT09IHVuZGVmaW5lZCAmJiB0aGlzLnBhc3N3b3JkICE9PSBudWxsKSB7XG5cdFx0dmFyIHBhc3N3b3JkID0gU3RyaW5nKHRoaXMucGFzc3dvcmQpO1xuXHRcdHJlc3VsdCArPSAnOicgKyBwZXJjZW50RW5jb2RpbmdIZWxwZXJcblx0XHRcdC5lbmNvZGVVc2VySW5mb1N1YkNvbXBvbmVudChwYXNzd29yZCk7XG5cdH1cblxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvKlxuICogY2F0YmVycnktdXJpXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0IERlbmlzIFJlY2hrdW5vdiBhbmQgcHJvamVjdCBjb250cmlidXRvcnMuXG4gKlxuICogY2F0YmVycnktdXJpJ3MgbGljZW5zZSBmb2xsb3dzOlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXG4gKiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvblxuICogZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLFxuICogaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSxcbiAqIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsXG4gKiBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuICogc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbiAqIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1NcbiAqIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICpcbiAqIFRoaXMgbGljZW5zZSBhcHBsaWVzIHRvIGFsbCBwYXJ0cyBvZiBjYXRiZXJyeS11cmkgdGhhdCBhcmUgbm90IGV4dGVybmFsbHlcbiAqIG1haW50YWluZWQgbGlicmFyaWVzLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLy8gaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzM5ODYjc2VjdGlvbi0yLjFcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdC8qKlxuXHQgKiBFbmNvZGVzIGF1dGhvcml0eSB1c2VyIGluZm9ybWF0aW9uIHN1Yi1jb21wb25lbnQgYWNjb3JkaW5nIHRvIFJGQyAzOTg2LlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIENvbXBvbmVudCB0byBlbmNvZGUuXG5cdCAqIEByZXR1cm5zIHtTdHJpbmd9IEVuY29kZWQgY29tcG9uZW50LlxuXHQgKi9cblx0ZW5jb2RlVXNlckluZm9TdWJDb21wb25lbnQ6IGZ1bmN0aW9uIChzdHJpbmcpIHtcblx0XHRyZXR1cm4gc3RyaW5nLnJlcGxhY2UoXG5cdFx0XHQvLyBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzk4NiNzZWN0aW9uLTMuMi4xXG5cdFx0XHQvW15cXHdcXC5+XFwtIVxcJCYnXFwoXFwpXFwqXFwrLDs9XS9nLCBlbmNvZGVVUklDb21wb25lbnRcblx0XHQpO1xuXHR9LFxuXHQvKipcblx0ICogRW5jb2RlcyBhdXRob3JpdHkgaG9zdCBjb21wb25lbnQgYWNjb3JkaW5nIHRvIFJGQyAzOTg2LlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIENvbXBvbmVudCB0byBlbmNvZGUuXG5cdCAqIEByZXR1cm5zIHtTdHJpbmd9IEVuY29kZWQgY29tcG9uZW50LlxuXHQgKi9cblx0ZW5jb2RlSG9zdDogZnVuY3Rpb24gKHN0cmluZykge1xuXHRcdHJldHVybiBzdHJpbmcucmVwbGFjZShcblx0XHRcdC8vIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzOTg2I3NlY3Rpb24tMy4yLjJcblx0XHRcdC9bXlxcd1xcLn5cXC0hXFwkJidcXChcXClcXCpcXCssOz06XFxbXFxdXS9nLCBlbmNvZGVVUklDb21wb25lbnRcblx0XHQpO1xuXG5cdH0sXG5cdC8qKlxuXHQgKiBFbmNvZGVzIFVSSSBwYXRoIGNvbXBvbmVudCBhY2NvcmRpbmcgdG8gUkZDIDM5ODYuXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgQ29tcG9uZW50IHRvIGVuY29kZS5cblx0ICogQHJldHVybnMge1N0cmluZ30gRW5jb2RlZCBjb21wb25lbnQuXG5cdCAqL1xuXHRlbmNvZGVQYXRoOiBmdW5jdGlvbiAoc3RyaW5nKSB7XG5cdFx0cmV0dXJuIHN0cmluZy5yZXBsYWNlKFxuXHRcdFx0Ly8gaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzM5ODYjc2VjdGlvbi0zLjNcblx0XHRcdC9bXlxcd1xcLn5cXC0hXFwkJidcXChcXClcXCpcXCssOz06QFxcL10vZywgZW5jb2RlVVJJQ29tcG9uZW50XG5cdFx0KTtcblx0fSxcblx0LyoqXG5cdCAqIEVuY29kZXMgcXVlcnkgc3ViLWNvbXBvbmVudCBhY2NvcmRpbmcgdG8gUkZDIDM5ODYuXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgQ29tcG9uZW50IHRvIGVuY29kZS5cblx0ICogQHJldHVybnMge1N0cmluZ30gRW5jb2RlZCBjb21wb25lbnQuXG5cdCAqL1xuXHRlbmNvZGVRdWVyeVN1YkNvbXBvbmVudDogZnVuY3Rpb24gKHN0cmluZykge1xuXHRcdHJldHVybiBzdHJpbmcucmVwbGFjZShcblx0XHRcdC8vIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzOTg2I3NlY3Rpb24tMy40XG5cdFx0XHQvW15cXHdcXC5+XFwtIVxcJCdcXChcXClcXCpcXCssOzpAXFwvXFw/XS9nLCBlbmNvZGVVUklDb21wb25lbnRcblx0XHQpO1xuXHR9LFxuXG5cdC8qKlxuXHQgKiBFbmNvZGVzIFVSSSBmcmFnbWVudCBjb21wb25lbnQgYWNjb3JkaW5nIHRvIFJGQyAzOTg2LlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIENvbXBvbmVudCB0byBlbmNvZGUuXG5cdCAqIEByZXR1cm5zIHtTdHJpbmd9IEVuY29kZWQgY29tcG9uZW50LlxuXHQgKi9cblx0ZW5jb2RlRnJhZ21lbnQ6IGZ1bmN0aW9uIChzdHJpbmcpIHtcblx0XHRyZXR1cm4gc3RyaW5nLnJlcGxhY2UoXG5cdFx0XHQvLyBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzk4NiNzZWN0aW9uLTMuNVxuXHRcdFx0L1teXFx3XFwuflxcLSFcXCQmJ1xcKFxcKVxcKlxcKyw7PTpAXFwvXFw/XS9nLCBlbmNvZGVVUklDb21wb25lbnRcblx0XHQpO1xuXHR9LFxuXG5cdC8qKlxuXHQgKiBEZWNvZGVzIHBlcmNlbnQgZW5jb2RlZCBjb21wb25lbnQuXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgQ29tcG9uZW50IHRvIGRlY29kZS5cblx0ICogQHJldHVybnMge1N0cmluZ30gRGVjb2RlZCBjb21wb25lbnQuXG5cdCAqL1xuXHRkZWNvZGU6IGZ1bmN0aW9uIChzdHJpbmcpIHtcblx0XHRyZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHN0cmluZyk7XG5cdH1cbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliJylcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGFzYXAgPSByZXF1aXJlKCdhc2FwL3JhdycpO1xuXG5mdW5jdGlvbiBub29wKCkge31cblxuLy8gU3RhdGVzOlxuLy9cbi8vIDAgLSBwZW5kaW5nXG4vLyAxIC0gZnVsZmlsbGVkIHdpdGggX3ZhbHVlXG4vLyAyIC0gcmVqZWN0ZWQgd2l0aCBfdmFsdWVcbi8vIDMgLSBhZG9wdGVkIHRoZSBzdGF0ZSBvZiBhbm90aGVyIHByb21pc2UsIF92YWx1ZVxuLy9cbi8vIG9uY2UgdGhlIHN0YXRlIGlzIG5vIGxvbmdlciBwZW5kaW5nICgwKSBpdCBpcyBpbW11dGFibGVcblxuLy8gQWxsIGBfYCBwcmVmaXhlZCBwcm9wZXJ0aWVzIHdpbGwgYmUgcmVkdWNlZCB0byBgX3tyYW5kb20gbnVtYmVyfWBcbi8vIGF0IGJ1aWxkIHRpbWUgdG8gb2JmdXNjYXRlIHRoZW0gYW5kIGRpc2NvdXJhZ2UgdGhlaXIgdXNlLlxuLy8gV2UgZG9uJ3QgdXNlIHN5bWJvbHMgb3IgT2JqZWN0LmRlZmluZVByb3BlcnR5IHRvIGZ1bGx5IGhpZGUgdGhlbVxuLy8gYmVjYXVzZSB0aGUgcGVyZm9ybWFuY2UgaXNuJ3QgZ29vZCBlbm91Z2guXG5cblxuLy8gdG8gYXZvaWQgdXNpbmcgdHJ5L2NhdGNoIGluc2lkZSBjcml0aWNhbCBmdW5jdGlvbnMsIHdlXG4vLyBleHRyYWN0IHRoZW0gdG8gaGVyZS5cbnZhciBMQVNUX0VSUk9SID0gbnVsbDtcbnZhciBJU19FUlJPUiA9IHt9O1xuZnVuY3Rpb24gZ2V0VGhlbihvYmopIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gb2JqLnRoZW47XG4gIH0gY2F0Y2ggKGV4KSB7XG4gICAgTEFTVF9FUlJPUiA9IGV4O1xuICAgIHJldHVybiBJU19FUlJPUjtcbiAgfVxufVxuXG5mdW5jdGlvbiB0cnlDYWxsT25lKGZuLCBhKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGZuKGEpO1xuICB9IGNhdGNoIChleCkge1xuICAgIExBU1RfRVJST1IgPSBleDtcbiAgICByZXR1cm4gSVNfRVJST1I7XG4gIH1cbn1cbmZ1bmN0aW9uIHRyeUNhbGxUd28oZm4sIGEsIGIpIHtcbiAgdHJ5IHtcbiAgICBmbihhLCBiKTtcbiAgfSBjYXRjaCAoZXgpIHtcbiAgICBMQVNUX0VSUk9SID0gZXg7XG4gICAgcmV0dXJuIElTX0VSUk9SO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUHJvbWlzZTtcblxuZnVuY3Rpb24gUHJvbWlzZShmbikge1xuICBpZiAodHlwZW9mIHRoaXMgIT09ICdvYmplY3QnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUHJvbWlzZXMgbXVzdCBiZSBjb25zdHJ1Y3RlZCB2aWEgbmV3Jyk7XG4gIH1cbiAgaWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ25vdCBhIGZ1bmN0aW9uJyk7XG4gIH1cbiAgdGhpcy5fMzIgPSAwO1xuICB0aGlzLl84ID0gbnVsbDtcbiAgdGhpcy5fODkgPSBbXTtcbiAgaWYgKGZuID09PSBub29wKSByZXR1cm47XG4gIGRvUmVzb2x2ZShmbiwgdGhpcyk7XG59XG5Qcm9taXNlLl84MyA9IG5vb3A7XG5cblByb21pc2UucHJvdG90eXBlLnRoZW4gPSBmdW5jdGlvbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCkge1xuICBpZiAodGhpcy5jb25zdHJ1Y3RvciAhPT0gUHJvbWlzZSkge1xuICAgIHJldHVybiBzYWZlVGhlbih0aGlzLCBvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCk7XG4gIH1cbiAgdmFyIHJlcyA9IG5ldyBQcm9taXNlKG5vb3ApO1xuICBoYW5kbGUodGhpcywgbmV3IEhhbmRsZXIob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQsIHJlcykpO1xuICByZXR1cm4gcmVzO1xufTtcblxuZnVuY3Rpb24gc2FmZVRoZW4oc2VsZiwgb25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpIHtcbiAgcmV0dXJuIG5ldyBzZWxmLmNvbnN0cnVjdG9yKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICB2YXIgcmVzID0gbmV3IFByb21pc2Uobm9vcCk7XG4gICAgcmVzLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICBoYW5kbGUoc2VsZiwgbmV3IEhhbmRsZXIob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQsIHJlcykpO1xuICB9KTtcbn07XG5mdW5jdGlvbiBoYW5kbGUoc2VsZiwgZGVmZXJyZWQpIHtcbiAgd2hpbGUgKHNlbGYuXzMyID09PSAzKSB7XG4gICAgc2VsZiA9IHNlbGYuXzg7XG4gIH1cbiAgaWYgKHNlbGYuXzMyID09PSAwKSB7XG4gICAgc2VsZi5fODkucHVzaChkZWZlcnJlZCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGFzYXAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIGNiID0gc2VsZi5fMzIgPT09IDEgPyBkZWZlcnJlZC5vbkZ1bGZpbGxlZCA6IGRlZmVycmVkLm9uUmVqZWN0ZWQ7XG4gICAgaWYgKGNiID09PSBudWxsKSB7XG4gICAgICBpZiAoc2VsZi5fMzIgPT09IDEpIHtcbiAgICAgICAgcmVzb2x2ZShkZWZlcnJlZC5wcm9taXNlLCBzZWxmLl84KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlamVjdChkZWZlcnJlZC5wcm9taXNlLCBzZWxmLl84KTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHJldCA9IHRyeUNhbGxPbmUoY2IsIHNlbGYuXzgpO1xuICAgIGlmIChyZXQgPT09IElTX0VSUk9SKSB7XG4gICAgICByZWplY3QoZGVmZXJyZWQucHJvbWlzZSwgTEFTVF9FUlJPUik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc29sdmUoZGVmZXJyZWQucHJvbWlzZSwgcmV0KTtcbiAgICB9XG4gIH0pO1xufVxuZnVuY3Rpb24gcmVzb2x2ZShzZWxmLCBuZXdWYWx1ZSkge1xuICAvLyBQcm9taXNlIFJlc29sdXRpb24gUHJvY2VkdXJlOiBodHRwczovL2dpdGh1Yi5jb20vcHJvbWlzZXMtYXBsdXMvcHJvbWlzZXMtc3BlYyN0aGUtcHJvbWlzZS1yZXNvbHV0aW9uLXByb2NlZHVyZVxuICBpZiAobmV3VmFsdWUgPT09IHNlbGYpIHtcbiAgICByZXR1cm4gcmVqZWN0KFxuICAgICAgc2VsZixcbiAgICAgIG5ldyBUeXBlRXJyb3IoJ0EgcHJvbWlzZSBjYW5ub3QgYmUgcmVzb2x2ZWQgd2l0aCBpdHNlbGYuJylcbiAgICApO1xuICB9XG4gIGlmIChcbiAgICBuZXdWYWx1ZSAmJlxuICAgICh0eXBlb2YgbmV3VmFsdWUgPT09ICdvYmplY3QnIHx8IHR5cGVvZiBuZXdWYWx1ZSA9PT0gJ2Z1bmN0aW9uJylcbiAgKSB7XG4gICAgdmFyIHRoZW4gPSBnZXRUaGVuKG5ld1ZhbHVlKTtcbiAgICBpZiAodGhlbiA9PT0gSVNfRVJST1IpIHtcbiAgICAgIHJldHVybiByZWplY3Qoc2VsZiwgTEFTVF9FUlJPUik7XG4gICAgfVxuICAgIGlmIChcbiAgICAgIHRoZW4gPT09IHNlbGYudGhlbiAmJlxuICAgICAgbmV3VmFsdWUgaW5zdGFuY2VvZiBQcm9taXNlXG4gICAgKSB7XG4gICAgICBzZWxmLl8zMiA9IDM7XG4gICAgICBzZWxmLl84ID0gbmV3VmFsdWU7XG4gICAgICBmaW5hbGUoc2VsZik7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdGhlbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgZG9SZXNvbHZlKHRoZW4uYmluZChuZXdWYWx1ZSksIHNlbGYpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuICBzZWxmLl8zMiA9IDE7XG4gIHNlbGYuXzggPSBuZXdWYWx1ZTtcbiAgZmluYWxlKHNlbGYpO1xufVxuXG5mdW5jdGlvbiByZWplY3Qoc2VsZiwgbmV3VmFsdWUpIHtcbiAgc2VsZi5fMzIgPSAyO1xuICBzZWxmLl84ID0gbmV3VmFsdWU7XG4gIGZpbmFsZShzZWxmKTtcbn1cbmZ1bmN0aW9uIGZpbmFsZShzZWxmKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc2VsZi5fODkubGVuZ3RoOyBpKyspIHtcbiAgICBoYW5kbGUoc2VsZiwgc2VsZi5fODlbaV0pO1xuICB9XG4gIHNlbGYuXzg5ID0gbnVsbDtcbn1cblxuZnVuY3Rpb24gSGFuZGxlcihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCwgcHJvbWlzZSl7XG4gIHRoaXMub25GdWxmaWxsZWQgPSB0eXBlb2Ygb25GdWxmaWxsZWQgPT09ICdmdW5jdGlvbicgPyBvbkZ1bGZpbGxlZCA6IG51bGw7XG4gIHRoaXMub25SZWplY3RlZCA9IHR5cGVvZiBvblJlamVjdGVkID09PSAnZnVuY3Rpb24nID8gb25SZWplY3RlZCA6IG51bGw7XG4gIHRoaXMucHJvbWlzZSA9IHByb21pc2U7XG59XG5cbi8qKlxuICogVGFrZSBhIHBvdGVudGlhbGx5IG1pc2JlaGF2aW5nIHJlc29sdmVyIGZ1bmN0aW9uIGFuZCBtYWtlIHN1cmVcbiAqIG9uRnVsZmlsbGVkIGFuZCBvblJlamVjdGVkIGFyZSBvbmx5IGNhbGxlZCBvbmNlLlxuICpcbiAqIE1ha2VzIG5vIGd1YXJhbnRlZXMgYWJvdXQgYXN5bmNocm9ueS5cbiAqL1xuZnVuY3Rpb24gZG9SZXNvbHZlKGZuLCBwcm9taXNlKSB7XG4gIHZhciBkb25lID0gZmFsc2U7XG4gIHZhciByZXMgPSB0cnlDYWxsVHdvKGZuLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICBpZiAoZG9uZSkgcmV0dXJuO1xuICAgIGRvbmUgPSB0cnVlO1xuICAgIHJlc29sdmUocHJvbWlzZSwgdmFsdWUpO1xuICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgaWYgKGRvbmUpIHJldHVybjtcbiAgICBkb25lID0gdHJ1ZTtcbiAgICByZWplY3QocHJvbWlzZSwgcmVhc29uKTtcbiAgfSlcbiAgaWYgKCFkb25lICYmIHJlcyA9PT0gSVNfRVJST1IpIHtcbiAgICBkb25lID0gdHJ1ZTtcbiAgICByZWplY3QocHJvbWlzZSwgTEFTVF9FUlJPUik7XG4gIH1cbn1cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIFByb21pc2UgPSByZXF1aXJlKCcuL2NvcmUuanMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBQcm9taXNlO1xuUHJvbWlzZS5wcm90b3R5cGUuZG9uZSA9IGZ1bmN0aW9uIChvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCkge1xuICB2YXIgc2VsZiA9IGFyZ3VtZW50cy5sZW5ndGggPyB0aGlzLnRoZW4uYXBwbHkodGhpcywgYXJndW1lbnRzKSA6IHRoaXM7XG4gIHNlbGYudGhlbihudWxsLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICB0aHJvdyBlcnI7XG4gICAgfSwgMCk7XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLy9UaGlzIGZpbGUgY29udGFpbnMgdGhlIEVTNiBleHRlbnNpb25zIHRvIHRoZSBjb3JlIFByb21pc2VzL0ErIEFQSVxuXG52YXIgUHJvbWlzZSA9IHJlcXVpcmUoJy4vY29yZS5qcycpO1xudmFyIGFzYXAgPSByZXF1aXJlKCdhc2FwL3JhdycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFByb21pc2U7XG5cbi8qIFN0YXRpYyBGdW5jdGlvbnMgKi9cblxudmFyIFRSVUUgPSB2YWx1ZVByb21pc2UodHJ1ZSk7XG52YXIgRkFMU0UgPSB2YWx1ZVByb21pc2UoZmFsc2UpO1xudmFyIE5VTEwgPSB2YWx1ZVByb21pc2UobnVsbCk7XG52YXIgVU5ERUZJTkVEID0gdmFsdWVQcm9taXNlKHVuZGVmaW5lZCk7XG52YXIgWkVSTyA9IHZhbHVlUHJvbWlzZSgwKTtcbnZhciBFTVBUWVNUUklORyA9IHZhbHVlUHJvbWlzZSgnJyk7XG5cbmZ1bmN0aW9uIHZhbHVlUHJvbWlzZSh2YWx1ZSkge1xuICB2YXIgcCA9IG5ldyBQcm9taXNlKFByb21pc2UuXzgzKTtcbiAgcC5fMzIgPSAxO1xuICBwLl84ID0gdmFsdWU7XG4gIHJldHVybiBwO1xufVxuUHJvbWlzZS5yZXNvbHZlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFByb21pc2UpIHJldHVybiB2YWx1ZTtcblxuICBpZiAodmFsdWUgPT09IG51bGwpIHJldHVybiBOVUxMO1xuICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIFVOREVGSU5FRDtcbiAgaWYgKHZhbHVlID09PSB0cnVlKSByZXR1cm4gVFJVRTtcbiAgaWYgKHZhbHVlID09PSBmYWxzZSkgcmV0dXJuIEZBTFNFO1xuICBpZiAodmFsdWUgPT09IDApIHJldHVybiBaRVJPO1xuICBpZiAodmFsdWUgPT09ICcnKSByZXR1cm4gRU1QVFlTVFJJTkc7XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgdHJ5IHtcbiAgICAgIHZhciB0aGVuID0gdmFsdWUudGhlbjtcbiAgICAgIGlmICh0eXBlb2YgdGhlbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UodGhlbi5iaW5kKHZhbHVlKSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHJlamVjdChleCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHZhbHVlUHJvbWlzZSh2YWx1ZSk7XG59O1xuXG5Qcm9taXNlLmFsbCA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcnIpO1xuXG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgaWYgKGFyZ3MubGVuZ3RoID09PSAwKSByZXR1cm4gcmVzb2x2ZShbXSk7XG4gICAgdmFyIHJlbWFpbmluZyA9IGFyZ3MubGVuZ3RoO1xuICAgIGZ1bmN0aW9uIHJlcyhpLCB2YWwpIHtcbiAgICAgIGlmICh2YWwgJiYgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnIHx8IHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicpKSB7XG4gICAgICAgIGlmICh2YWwgaW5zdGFuY2VvZiBQcm9taXNlICYmIHZhbC50aGVuID09PSBQcm9taXNlLnByb3RvdHlwZS50aGVuKSB7XG4gICAgICAgICAgd2hpbGUgKHZhbC5fMzIgPT09IDMpIHtcbiAgICAgICAgICAgIHZhbCA9IHZhbC5fODtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHZhbC5fMzIgPT09IDEpIHJldHVybiByZXMoaSwgdmFsLl84KTtcbiAgICAgICAgICBpZiAodmFsLl8zMiA9PT0gMikgcmVqZWN0KHZhbC5fOCk7XG4gICAgICAgICAgdmFsLnRoZW4oZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgICAgcmVzKGksIHZhbCk7XG4gICAgICAgICAgfSwgcmVqZWN0KTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIHRoZW4gPSB2YWwudGhlbjtcbiAgICAgICAgICBpZiAodHlwZW9mIHRoZW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHZhciBwID0gbmV3IFByb21pc2UodGhlbi5iaW5kKHZhbCkpO1xuICAgICAgICAgICAgcC50aGVuKGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICAgICAgcmVzKGksIHZhbCk7XG4gICAgICAgICAgICB9LCByZWplY3QpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYXJnc1tpXSA9IHZhbDtcbiAgICAgIGlmICgtLXJlbWFpbmluZyA9PT0gMCkge1xuICAgICAgICByZXNvbHZlKGFyZ3MpO1xuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIHJlcyhpLCBhcmdzW2ldKTtcbiAgICB9XG4gIH0pO1xufTtcblxuUHJvbWlzZS5yZWplY3QgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICByZWplY3QodmFsdWUpO1xuICB9KTtcbn07XG5cblByb21pc2UucmFjZSA9IGZ1bmN0aW9uICh2YWx1ZXMpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICB2YWx1ZXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSl7XG4gICAgICBQcm9taXNlLnJlc29sdmUodmFsdWUpLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICB9KTtcbiAgfSk7XG59O1xuXG4vKiBQcm90b3R5cGUgTWV0aG9kcyAqL1xuXG5Qcm9taXNlLnByb3RvdHlwZVsnY2F0Y2gnXSA9IGZ1bmN0aW9uIChvblJlamVjdGVkKSB7XG4gIHJldHVybiB0aGlzLnRoZW4obnVsbCwgb25SZWplY3RlZCk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgUHJvbWlzZSA9IHJlcXVpcmUoJy4vY29yZS5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFByb21pc2U7XG5Qcm9taXNlLnByb3RvdHlwZVsnZmluYWxseSddID0gZnVuY3Rpb24gKGYpIHtcbiAgcmV0dXJuIHRoaXMudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGYoKSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfSk7XG4gIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGYoKSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICB0aHJvdyBlcnI7XG4gICAgfSk7XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2NvcmUuanMnKTtcbnJlcXVpcmUoJy4vZG9uZS5qcycpO1xucmVxdWlyZSgnLi9maW5hbGx5LmpzJyk7XG5yZXF1aXJlKCcuL2VzNi1leHRlbnNpb25zLmpzJyk7XG5yZXF1aXJlKCcuL25vZGUtZXh0ZW5zaW9ucy5qcycpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyBUaGlzIGZpbGUgY29udGFpbnMgdGhlbi9wcm9taXNlIHNwZWNpZmljIGV4dGVuc2lvbnMgdGhhdCBhcmUgb25seSB1c2VmdWxcbi8vIGZvciBub2RlLmpzIGludGVyb3BcblxudmFyIFByb21pc2UgPSByZXF1aXJlKCcuL2NvcmUuanMnKTtcbnZhciBhc2FwID0gcmVxdWlyZSgnYXNhcCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFByb21pc2U7XG5cbi8qIFN0YXRpYyBGdW5jdGlvbnMgKi9cblxuUHJvbWlzZS5kZW5vZGVpZnkgPSBmdW5jdGlvbiAoZm4sIGFyZ3VtZW50Q291bnQpIHtcbiAgYXJndW1lbnRDb3VudCA9IGFyZ3VtZW50Q291bnQgfHwgSW5maW5pdHk7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgd2hpbGUgKGFyZ3MubGVuZ3RoICYmIGFyZ3MubGVuZ3RoID4gYXJndW1lbnRDb3VudCkge1xuICAgICAgICBhcmdzLnBvcCgpO1xuICAgICAgfVxuICAgICAgYXJncy5wdXNoKGZ1bmN0aW9uIChlcnIsIHJlcykge1xuICAgICAgICBpZiAoZXJyKSByZWplY3QoZXJyKTtcbiAgICAgICAgZWxzZSByZXNvbHZlKHJlcyk7XG4gICAgICB9KVxuICAgICAgdmFyIHJlcyA9IGZuLmFwcGx5KHNlbGYsIGFyZ3MpO1xuICAgICAgaWYgKHJlcyAmJlxuICAgICAgICAoXG4gICAgICAgICAgdHlwZW9mIHJlcyA9PT0gJ29iamVjdCcgfHxcbiAgICAgICAgICB0eXBlb2YgcmVzID09PSAnZnVuY3Rpb24nXG4gICAgICAgICkgJiZcbiAgICAgICAgdHlwZW9mIHJlcy50aGVuID09PSAnZnVuY3Rpb24nXG4gICAgICApIHtcbiAgICAgICAgcmVzb2x2ZShyZXMpO1xuICAgICAgfVxuICAgIH0pXG4gIH1cbn1cblByb21pc2Uubm9kZWlmeSA9IGZ1bmN0aW9uIChmbikge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICB2YXIgY2FsbGJhY2sgPVxuICAgICAgdHlwZW9mIGFyZ3NbYXJncy5sZW5ndGggLSAxXSA9PT0gJ2Z1bmN0aW9uJyA/IGFyZ3MucG9wKCkgOiBudWxsO1xuICAgIHZhciBjdHggPSB0aGlzO1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKS5ub2RlaWZ5KGNhbGxiYWNrLCBjdHgpO1xuICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICBpZiAoY2FsbGJhY2sgPT09IG51bGwgfHwgdHlwZW9mIGNhbGxiYWNrID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgcmVqZWN0KGV4KTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhc2FwKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBjYWxsYmFjay5jYWxsKGN0eCwgZXgpO1xuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5Qcm9taXNlLnByb3RvdHlwZS5ub2RlaWZ5ID0gZnVuY3Rpb24gKGNhbGxiYWNrLCBjdHgpIHtcbiAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPSAnZnVuY3Rpb24nKSByZXR1cm4gdGhpcztcblxuICB0aGlzLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgYXNhcChmdW5jdGlvbiAoKSB7XG4gICAgICBjYWxsYmFjay5jYWxsKGN0eCwgbnVsbCwgdmFsdWUpO1xuICAgIH0pO1xuICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgYXNhcChmdW5jdGlvbiAoKSB7XG4gICAgICBjYWxsYmFjay5jYWxsKGN0eCwgZXJyKTtcbiAgICB9KTtcbiAgfSk7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLy8gcmF3QXNhcCBwcm92aWRlcyBldmVyeXRoaW5nIHdlIG5lZWQgZXhjZXB0IGV4Y2VwdGlvbiBtYW5hZ2VtZW50LlxudmFyIHJhd0FzYXAgPSByZXF1aXJlKFwiLi9yYXdcIik7XG4vLyBSYXdUYXNrcyBhcmUgcmVjeWNsZWQgdG8gcmVkdWNlIEdDIGNodXJuLlxudmFyIGZyZWVUYXNrcyA9IFtdO1xuLy8gV2UgcXVldWUgZXJyb3JzIHRvIGVuc3VyZSB0aGV5IGFyZSB0aHJvd24gaW4gcmlnaHQgb3JkZXIgKEZJRk8pLlxuLy8gQXJyYXktYXMtcXVldWUgaXMgZ29vZCBlbm91Z2ggaGVyZSwgc2luY2Ugd2UgYXJlIGp1c3QgZGVhbGluZyB3aXRoIGV4Y2VwdGlvbnMuXG52YXIgcGVuZGluZ0Vycm9ycyA9IFtdO1xudmFyIHJlcXVlc3RFcnJvclRocm93ID0gcmF3QXNhcC5tYWtlUmVxdWVzdENhbGxGcm9tVGltZXIodGhyb3dGaXJzdEVycm9yKTtcblxuZnVuY3Rpb24gdGhyb3dGaXJzdEVycm9yKCkge1xuICAgIGlmIChwZW5kaW5nRXJyb3JzLmxlbmd0aCkge1xuICAgICAgICB0aHJvdyBwZW5kaW5nRXJyb3JzLnNoaWZ0KCk7XG4gICAgfVxufVxuXG4vKipcbiAqIENhbGxzIGEgdGFzayBhcyBzb29uIGFzIHBvc3NpYmxlIGFmdGVyIHJldHVybmluZywgaW4gaXRzIG93biBldmVudCwgd2l0aCBwcmlvcml0eVxuICogb3ZlciBvdGhlciBldmVudHMgbGlrZSBhbmltYXRpb24sIHJlZmxvdywgYW5kIHJlcGFpbnQuIEFuIGVycm9yIHRocm93biBmcm9tIGFuXG4gKiBldmVudCB3aWxsIG5vdCBpbnRlcnJ1cHQsIG5vciBldmVuIHN1YnN0YW50aWFsbHkgc2xvdyBkb3duIHRoZSBwcm9jZXNzaW5nIG9mXG4gKiBvdGhlciBldmVudHMsIGJ1dCB3aWxsIGJlIHJhdGhlciBwb3N0cG9uZWQgdG8gYSBsb3dlciBwcmlvcml0eSBldmVudC5cbiAqIEBwYXJhbSB7e2NhbGx9fSB0YXNrIEEgY2FsbGFibGUgb2JqZWN0LCB0eXBpY2FsbHkgYSBmdW5jdGlvbiB0aGF0IHRha2VzIG5vXG4gKiBhcmd1bWVudHMuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gYXNhcDtcbmZ1bmN0aW9uIGFzYXAodGFzaykge1xuICAgIHZhciByYXdUYXNrO1xuICAgIGlmIChmcmVlVGFza3MubGVuZ3RoKSB7XG4gICAgICAgIHJhd1Rhc2sgPSBmcmVlVGFza3MucG9wKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmF3VGFzayA9IG5ldyBSYXdUYXNrKCk7XG4gICAgfVxuICAgIHJhd1Rhc2sudGFzayA9IHRhc2s7XG4gICAgcmF3QXNhcChyYXdUYXNrKTtcbn1cblxuLy8gV2Ugd3JhcCB0YXNrcyB3aXRoIHJlY3ljbGFibGUgdGFzayBvYmplY3RzLiAgQSB0YXNrIG9iamVjdCBpbXBsZW1lbnRzXG4vLyBgY2FsbGAsIGp1c3QgbGlrZSBhIGZ1bmN0aW9uLlxuZnVuY3Rpb24gUmF3VGFzaygpIHtcbiAgICB0aGlzLnRhc2sgPSBudWxsO1xufVxuXG4vLyBUaGUgc29sZSBwdXJwb3NlIG9mIHdyYXBwaW5nIHRoZSB0YXNrIGlzIHRvIGNhdGNoIHRoZSBleGNlcHRpb24gYW5kIHJlY3ljbGVcbi8vIHRoZSB0YXNrIG9iamVjdCBhZnRlciBpdHMgc2luZ2xlIHVzZS5cblJhd1Rhc2sucHJvdG90eXBlLmNhbGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgdGhpcy50YXNrLmNhbGwoKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBpZiAoYXNhcC5vbmVycm9yKSB7XG4gICAgICAgICAgICAvLyBUaGlzIGhvb2sgZXhpc3RzIHB1cmVseSBmb3IgdGVzdGluZyBwdXJwb3Nlcy5cbiAgICAgICAgICAgIC8vIEl0cyBuYW1lIHdpbGwgYmUgcGVyaW9kaWNhbGx5IHJhbmRvbWl6ZWQgdG8gYnJlYWsgYW55IGNvZGUgdGhhdFxuICAgICAgICAgICAgLy8gZGVwZW5kcyBvbiBpdHMgZXhpc3RlbmNlLlxuICAgICAgICAgICAgYXNhcC5vbmVycm9yKGVycm9yKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIEluIGEgd2ViIGJyb3dzZXIsIGV4Y2VwdGlvbnMgYXJlIG5vdCBmYXRhbC4gSG93ZXZlciwgdG8gYXZvaWRcbiAgICAgICAgICAgIC8vIHNsb3dpbmcgZG93biB0aGUgcXVldWUgb2YgcGVuZGluZyB0YXNrcywgd2UgcmV0aHJvdyB0aGUgZXJyb3IgaW4gYVxuICAgICAgICAgICAgLy8gbG93ZXIgcHJpb3JpdHkgdHVybi5cbiAgICAgICAgICAgIHBlbmRpbmdFcnJvcnMucHVzaChlcnJvcik7XG4gICAgICAgICAgICByZXF1ZXN0RXJyb3JUaHJvdygpO1xuICAgICAgICB9XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgICAgdGhpcy50YXNrID0gbnVsbDtcbiAgICAgICAgZnJlZVRhc2tzW2ZyZWVUYXNrcy5sZW5ndGhdID0gdGhpcztcbiAgICB9XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8vIFVzZSB0aGUgZmFzdGVzdCBtZWFucyBwb3NzaWJsZSB0byBleGVjdXRlIGEgdGFzayBpbiBpdHMgb3duIHR1cm4sIHdpdGhcbi8vIHByaW9yaXR5IG92ZXIgb3RoZXIgZXZlbnRzIGluY2x1ZGluZyBJTywgYW5pbWF0aW9uLCByZWZsb3csIGFuZCByZWRyYXdcbi8vIGV2ZW50cyBpbiBicm93c2Vycy5cbi8vXG4vLyBBbiBleGNlcHRpb24gdGhyb3duIGJ5IGEgdGFzayB3aWxsIHBlcm1hbmVudGx5IGludGVycnVwdCB0aGUgcHJvY2Vzc2luZyBvZlxuLy8gc3Vic2VxdWVudCB0YXNrcy4gVGhlIGhpZ2hlciBsZXZlbCBgYXNhcGAgZnVuY3Rpb24gZW5zdXJlcyB0aGF0IGlmIGFuXG4vLyBleGNlcHRpb24gaXMgdGhyb3duIGJ5IGEgdGFzaywgdGhhdCB0aGUgdGFzayBxdWV1ZSB3aWxsIGNvbnRpbnVlIGZsdXNoaW5nIGFzXG4vLyBzb29uIGFzIHBvc3NpYmxlLCBidXQgaWYgeW91IHVzZSBgcmF3QXNhcGAgZGlyZWN0bHksIHlvdSBhcmUgcmVzcG9uc2libGUgdG9cbi8vIGVpdGhlciBlbnN1cmUgdGhhdCBubyBleGNlcHRpb25zIGFyZSB0aHJvd24gZnJvbSB5b3VyIHRhc2ssIG9yIHRvIG1hbnVhbGx5XG4vLyBjYWxsIGByYXdBc2FwLnJlcXVlc3RGbHVzaGAgaWYgYW4gZXhjZXB0aW9uIGlzIHRocm93bi5cbm1vZHVsZS5leHBvcnRzID0gcmF3QXNhcDtcbmZ1bmN0aW9uIHJhd0FzYXAodGFzaykge1xuICAgIGlmICghcXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHJlcXVlc3RGbHVzaCgpO1xuICAgICAgICBmbHVzaGluZyA9IHRydWU7XG4gICAgfVxuICAgIC8vIEVxdWl2YWxlbnQgdG8gcHVzaCwgYnV0IGF2b2lkcyBhIGZ1bmN0aW9uIGNhbGwuXG4gICAgcXVldWVbcXVldWUubGVuZ3RoXSA9IHRhc2s7XG59XG5cbnZhciBxdWV1ZSA9IFtdO1xuLy8gT25jZSBhIGZsdXNoIGhhcyBiZWVuIHJlcXVlc3RlZCwgbm8gZnVydGhlciBjYWxscyB0byBgcmVxdWVzdEZsdXNoYCBhcmVcbi8vIG5lY2Vzc2FyeSB1bnRpbCB0aGUgbmV4dCBgZmx1c2hgIGNvbXBsZXRlcy5cbnZhciBmbHVzaGluZyA9IGZhbHNlO1xuLy8gYHJlcXVlc3RGbHVzaGAgaXMgYW4gaW1wbGVtZW50YXRpb24tc3BlY2lmaWMgbWV0aG9kIHRoYXQgYXR0ZW1wdHMgdG8ga2lja1xuLy8gb2ZmIGEgYGZsdXNoYCBldmVudCBhcyBxdWlja2x5IGFzIHBvc3NpYmxlLiBgZmx1c2hgIHdpbGwgYXR0ZW1wdCB0byBleGhhdXN0XG4vLyB0aGUgZXZlbnQgcXVldWUgYmVmb3JlIHlpZWxkaW5nIHRvIHRoZSBicm93c2VyJ3Mgb3duIGV2ZW50IGxvb3AuXG52YXIgcmVxdWVzdEZsdXNoO1xuLy8gVGhlIHBvc2l0aW9uIG9mIHRoZSBuZXh0IHRhc2sgdG8gZXhlY3V0ZSBpbiB0aGUgdGFzayBxdWV1ZS4gVGhpcyBpc1xuLy8gcHJlc2VydmVkIGJldHdlZW4gY2FsbHMgdG8gYGZsdXNoYCBzbyB0aGF0IGl0IGNhbiBiZSByZXN1bWVkIGlmXG4vLyBhIHRhc2sgdGhyb3dzIGFuIGV4Y2VwdGlvbi5cbnZhciBpbmRleCA9IDA7XG4vLyBJZiBhIHRhc2sgc2NoZWR1bGVzIGFkZGl0aW9uYWwgdGFza3MgcmVjdXJzaXZlbHksIHRoZSB0YXNrIHF1ZXVlIGNhbiBncm93XG4vLyB1bmJvdW5kZWQuIFRvIHByZXZlbnQgbWVtb3J5IGV4aGF1c3Rpb24sIHRoZSB0YXNrIHF1ZXVlIHdpbGwgcGVyaW9kaWNhbGx5XG4vLyB0cnVuY2F0ZSBhbHJlYWR5LWNvbXBsZXRlZCB0YXNrcy5cbnZhciBjYXBhY2l0eSA9IDEwMjQ7XG5cbi8vIFRoZSBmbHVzaCBmdW5jdGlvbiBwcm9jZXNzZXMgYWxsIHRhc2tzIHRoYXQgaGF2ZSBiZWVuIHNjaGVkdWxlZCB3aXRoXG4vLyBgcmF3QXNhcGAgdW5sZXNzIGFuZCB1bnRpbCBvbmUgb2YgdGhvc2UgdGFza3MgdGhyb3dzIGFuIGV4Y2VwdGlvbi5cbi8vIElmIGEgdGFzayB0aHJvd3MgYW4gZXhjZXB0aW9uLCBgZmx1c2hgIGVuc3VyZXMgdGhhdCBpdHMgc3RhdGUgd2lsbCByZW1haW5cbi8vIGNvbnNpc3RlbnQgYW5kIHdpbGwgcmVzdW1lIHdoZXJlIGl0IGxlZnQgb2ZmIHdoZW4gY2FsbGVkIGFnYWluLlxuLy8gSG93ZXZlciwgYGZsdXNoYCBkb2VzIG5vdCBtYWtlIGFueSBhcnJhbmdlbWVudHMgdG8gYmUgY2FsbGVkIGFnYWluIGlmIGFuXG4vLyBleGNlcHRpb24gaXMgdGhyb3duLlxuZnVuY3Rpb24gZmx1c2goKSB7XG4gICAgd2hpbGUgKGluZGV4IDwgcXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHZhciBjdXJyZW50SW5kZXggPSBpbmRleDtcbiAgICAgICAgLy8gQWR2YW5jZSB0aGUgaW5kZXggYmVmb3JlIGNhbGxpbmcgdGhlIHRhc2suIFRoaXMgZW5zdXJlcyB0aGF0IHdlIHdpbGxcbiAgICAgICAgLy8gYmVnaW4gZmx1c2hpbmcgb24gdGhlIG5leHQgdGFzayB0aGUgdGFzayB0aHJvd3MgYW4gZXJyb3IuXG4gICAgICAgIGluZGV4ID0gaW5kZXggKyAxO1xuICAgICAgICBxdWV1ZVtjdXJyZW50SW5kZXhdLmNhbGwoKTtcbiAgICAgICAgLy8gUHJldmVudCBsZWFraW5nIG1lbW9yeSBmb3IgbG9uZyBjaGFpbnMgb2YgcmVjdXJzaXZlIGNhbGxzIHRvIGBhc2FwYC5cbiAgICAgICAgLy8gSWYgd2UgY2FsbCBgYXNhcGAgd2l0aGluIHRhc2tzIHNjaGVkdWxlZCBieSBgYXNhcGAsIHRoZSBxdWV1ZSB3aWxsXG4gICAgICAgIC8vIGdyb3csIGJ1dCB0byBhdm9pZCBhbiBPKG4pIHdhbGsgZm9yIGV2ZXJ5IHRhc2sgd2UgZXhlY3V0ZSwgd2UgZG9uJ3RcbiAgICAgICAgLy8gc2hpZnQgdGFza3Mgb2ZmIHRoZSBxdWV1ZSBhZnRlciB0aGV5IGhhdmUgYmVlbiBleGVjdXRlZC5cbiAgICAgICAgLy8gSW5zdGVhZCwgd2UgcGVyaW9kaWNhbGx5IHNoaWZ0IDEwMjQgdGFza3Mgb2ZmIHRoZSBxdWV1ZS5cbiAgICAgICAgaWYgKGluZGV4ID4gY2FwYWNpdHkpIHtcbiAgICAgICAgICAgIC8vIE1hbnVhbGx5IHNoaWZ0IGFsbCB2YWx1ZXMgc3RhcnRpbmcgYXQgdGhlIGluZGV4IGJhY2sgdG8gdGhlXG4gICAgICAgICAgICAvLyBiZWdpbm5pbmcgb2YgdGhlIHF1ZXVlLlxuICAgICAgICAgICAgZm9yICh2YXIgc2NhbiA9IDAsIG5ld0xlbmd0aCA9IHF1ZXVlLmxlbmd0aCAtIGluZGV4OyBzY2FuIDwgbmV3TGVuZ3RoOyBzY2FuKyspIHtcbiAgICAgICAgICAgICAgICBxdWV1ZVtzY2FuXSA9IHF1ZXVlW3NjYW4gKyBpbmRleF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBxdWV1ZS5sZW5ndGggLT0gaW5kZXg7XG4gICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUubGVuZ3RoID0gMDtcbiAgICBpbmRleCA9IDA7XG4gICAgZmx1c2hpbmcgPSBmYWxzZTtcbn1cblxuLy8gYHJlcXVlc3RGbHVzaGAgaXMgaW1wbGVtZW50ZWQgdXNpbmcgYSBzdHJhdGVneSBiYXNlZCBvbiBkYXRhIGNvbGxlY3RlZCBmcm9tXG4vLyBldmVyeSBhdmFpbGFibGUgU2F1Y2VMYWJzIFNlbGVuaXVtIHdlYiBkcml2ZXIgd29ya2VyIGF0IHRpbWUgb2Ygd3JpdGluZy5cbi8vIGh0dHBzOi8vZG9jcy5nb29nbGUuY29tL3NwcmVhZHNoZWV0cy9kLzFtRy01VVlHdXA1cXhHZEVNV2toUDZCV0N6MDUzTlViMkUxUW9VVFUxNnVBL2VkaXQjZ2lkPTc4MzcyNDU5M1xuXG4vLyBTYWZhcmkgNiBhbmQgNi4xIGZvciBkZXNrdG9wLCBpUGFkLCBhbmQgaVBob25lIGFyZSB0aGUgb25seSBicm93c2VycyB0aGF0XG4vLyBoYXZlIFdlYktpdE11dGF0aW9uT2JzZXJ2ZXIgYnV0IG5vdCB1bi1wcmVmaXhlZCBNdXRhdGlvbk9ic2VydmVyLlxuLy8gTXVzdCB1c2UgYGdsb2JhbGAgaW5zdGVhZCBvZiBgd2luZG93YCB0byB3b3JrIGluIGJvdGggZnJhbWVzIGFuZCB3ZWJcbi8vIHdvcmtlcnMuIGBnbG9iYWxgIGlzIGEgcHJvdmlzaW9uIG9mIEJyb3dzZXJpZnksIE1yLCBNcnMsIG9yIE1vcC5cbnZhciBCcm93c2VyTXV0YXRpb25PYnNlcnZlciA9IGdsb2JhbC5NdXRhdGlvbk9ic2VydmVyIHx8IGdsb2JhbC5XZWJLaXRNdXRhdGlvbk9ic2VydmVyO1xuXG4vLyBNdXRhdGlvbk9ic2VydmVycyBhcmUgZGVzaXJhYmxlIGJlY2F1c2UgdGhleSBoYXZlIGhpZ2ggcHJpb3JpdHkgYW5kIHdvcmtcbi8vIHJlbGlhYmx5IGV2ZXJ5d2hlcmUgdGhleSBhcmUgaW1wbGVtZW50ZWQuXG4vLyBUaGV5IGFyZSBpbXBsZW1lbnRlZCBpbiBhbGwgbW9kZXJuIGJyb3dzZXJzLlxuLy9cbi8vIC0gQW5kcm9pZCA0LTQuM1xuLy8gLSBDaHJvbWUgMjYtMzRcbi8vIC0gRmlyZWZveCAxNC0yOVxuLy8gLSBJbnRlcm5ldCBFeHBsb3JlciAxMVxuLy8gLSBpUGFkIFNhZmFyaSA2LTcuMVxuLy8gLSBpUGhvbmUgU2FmYXJpIDctNy4xXG4vLyAtIFNhZmFyaSA2LTdcbmlmICh0eXBlb2YgQnJvd3Nlck11dGF0aW9uT2JzZXJ2ZXIgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHJlcXVlc3RGbHVzaCA9IG1ha2VSZXF1ZXN0Q2FsbEZyb21NdXRhdGlvbk9ic2VydmVyKGZsdXNoKTtcblxuLy8gTWVzc2FnZUNoYW5uZWxzIGFyZSBkZXNpcmFibGUgYmVjYXVzZSB0aGV5IGdpdmUgZGlyZWN0IGFjY2VzcyB0byB0aGUgSFRNTFxuLy8gdGFzayBxdWV1ZSwgYXJlIGltcGxlbWVudGVkIGluIEludGVybmV0IEV4cGxvcmVyIDEwLCBTYWZhcmkgNS4wLTEsIGFuZCBPcGVyYVxuLy8gMTEtMTIsIGFuZCBpbiB3ZWIgd29ya2VycyBpbiBtYW55IGVuZ2luZXMuXG4vLyBBbHRob3VnaCBtZXNzYWdlIGNoYW5uZWxzIHlpZWxkIHRvIGFueSBxdWV1ZWQgcmVuZGVyaW5nIGFuZCBJTyB0YXNrcywgdGhleVxuLy8gd291bGQgYmUgYmV0dGVyIHRoYW4gaW1wb3NpbmcgdGhlIDRtcyBkZWxheSBvZiB0aW1lcnMuXG4vLyBIb3dldmVyLCB0aGV5IGRvIG5vdCB3b3JrIHJlbGlhYmx5IGluIEludGVybmV0IEV4cGxvcmVyIG9yIFNhZmFyaS5cblxuLy8gSW50ZXJuZXQgRXhwbG9yZXIgMTAgaXMgdGhlIG9ubHkgYnJvd3NlciB0aGF0IGhhcyBzZXRJbW1lZGlhdGUgYnV0IGRvZXNcbi8vIG5vdCBoYXZlIE11dGF0aW9uT2JzZXJ2ZXJzLlxuLy8gQWx0aG91Z2ggc2V0SW1tZWRpYXRlIHlpZWxkcyB0byB0aGUgYnJvd3NlcidzIHJlbmRlcmVyLCBpdCB3b3VsZCBiZVxuLy8gcHJlZmVycmFibGUgdG8gZmFsbGluZyBiYWNrIHRvIHNldFRpbWVvdXQgc2luY2UgaXQgZG9lcyBub3QgaGF2ZVxuLy8gdGhlIG1pbmltdW0gNG1zIHBlbmFsdHkuXG4vLyBVbmZvcnR1bmF0ZWx5IHRoZXJlIGFwcGVhcnMgdG8gYmUgYSBidWcgaW4gSW50ZXJuZXQgRXhwbG9yZXIgMTAgTW9iaWxlIChhbmRcbi8vIERlc2t0b3AgdG8gYSBsZXNzZXIgZXh0ZW50KSB0aGF0IHJlbmRlcnMgYm90aCBzZXRJbW1lZGlhdGUgYW5kXG4vLyBNZXNzYWdlQ2hhbm5lbCB1c2VsZXNzIGZvciB0aGUgcHVycG9zZXMgb2YgQVNBUC5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9rcmlza293YWwvcS9pc3N1ZXMvMzk2XG5cbi8vIFRpbWVycyBhcmUgaW1wbGVtZW50ZWQgdW5pdmVyc2FsbHkuXG4vLyBXZSBmYWxsIGJhY2sgdG8gdGltZXJzIGluIHdvcmtlcnMgaW4gbW9zdCBlbmdpbmVzLCBhbmQgaW4gZm9yZWdyb3VuZFxuLy8gY29udGV4dHMgaW4gdGhlIGZvbGxvd2luZyBicm93c2Vycy5cbi8vIEhvd2V2ZXIsIG5vdGUgdGhhdCBldmVuIHRoaXMgc2ltcGxlIGNhc2UgcmVxdWlyZXMgbnVhbmNlcyB0byBvcGVyYXRlIGluIGFcbi8vIGJyb2FkIHNwZWN0cnVtIG9mIGJyb3dzZXJzLlxuLy9cbi8vIC0gRmlyZWZveCAzLTEzXG4vLyAtIEludGVybmV0IEV4cGxvcmVyIDYtOVxuLy8gLSBpUGFkIFNhZmFyaSA0LjNcbi8vIC0gTHlueCAyLjguN1xufSBlbHNlIHtcbiAgICByZXF1ZXN0Rmx1c2ggPSBtYWtlUmVxdWVzdENhbGxGcm9tVGltZXIoZmx1c2gpO1xufVxuXG4vLyBgcmVxdWVzdEZsdXNoYCByZXF1ZXN0cyB0aGF0IHRoZSBoaWdoIHByaW9yaXR5IGV2ZW50IHF1ZXVlIGJlIGZsdXNoZWQgYXNcbi8vIHNvb24gYXMgcG9zc2libGUuXG4vLyBUaGlzIGlzIHVzZWZ1bCB0byBwcmV2ZW50IGFuIGVycm9yIHRocm93biBpbiBhIHRhc2sgZnJvbSBzdGFsbGluZyB0aGUgZXZlbnRcbi8vIHF1ZXVlIGlmIHRoZSBleGNlcHRpb24gaGFuZGxlZCBieSBOb2RlLmpz4oCZc1xuLy8gYHByb2Nlc3Mub24oXCJ1bmNhdWdodEV4Y2VwdGlvblwiKWAgb3IgYnkgYSBkb21haW4uXG5yYXdBc2FwLnJlcXVlc3RGbHVzaCA9IHJlcXVlc3RGbHVzaDtcblxuLy8gVG8gcmVxdWVzdCBhIGhpZ2ggcHJpb3JpdHkgZXZlbnQsIHdlIGluZHVjZSBhIG11dGF0aW9uIG9ic2VydmVyIGJ5IHRvZ2dsaW5nXG4vLyB0aGUgdGV4dCBvZiBhIHRleHQgbm9kZSBiZXR3ZWVuIFwiMVwiIGFuZCBcIi0xXCIuXG5mdW5jdGlvbiBtYWtlUmVxdWVzdENhbGxGcm9tTXV0YXRpb25PYnNlcnZlcihjYWxsYmFjaykge1xuICAgIHZhciB0b2dnbGUgPSAxO1xuICAgIHZhciBvYnNlcnZlciA9IG5ldyBCcm93c2VyTXV0YXRpb25PYnNlcnZlcihjYWxsYmFjayk7XG4gICAgdmFyIG5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIlwiKTtcbiAgICBvYnNlcnZlci5vYnNlcnZlKG5vZGUsIHtjaGFyYWN0ZXJEYXRhOiB0cnVlfSk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIHJlcXVlc3RDYWxsKCkge1xuICAgICAgICB0b2dnbGUgPSAtdG9nZ2xlO1xuICAgICAgICBub2RlLmRhdGEgPSB0b2dnbGU7XG4gICAgfTtcbn1cblxuLy8gVGhlIG1lc3NhZ2UgY2hhbm5lbCB0ZWNobmlxdWUgd2FzIGRpc2NvdmVyZWQgYnkgTWFsdGUgVWJsIGFuZCB3YXMgdGhlXG4vLyBvcmlnaW5hbCBmb3VuZGF0aW9uIGZvciB0aGlzIGxpYnJhcnkuXG4vLyBodHRwOi8vd3d3Lm5vbmJsb2NraW5nLmlvLzIwMTEvMDYvd2luZG93bmV4dHRpY2suaHRtbFxuXG4vLyBTYWZhcmkgNi4wLjUgKGF0IGxlYXN0KSBpbnRlcm1pdHRlbnRseSBmYWlscyB0byBjcmVhdGUgbWVzc2FnZSBwb3J0cyBvbiBhXG4vLyBwYWdlJ3MgZmlyc3QgbG9hZC4gVGhhbmtmdWxseSwgdGhpcyB2ZXJzaW9uIG9mIFNhZmFyaSBzdXBwb3J0c1xuLy8gTXV0YXRpb25PYnNlcnZlcnMsIHNvIHdlIGRvbid0IG5lZWQgdG8gZmFsbCBiYWNrIGluIHRoYXQgY2FzZS5cblxuLy8gZnVuY3Rpb24gbWFrZVJlcXVlc3RDYWxsRnJvbU1lc3NhZ2VDaGFubmVsKGNhbGxiYWNrKSB7XG4vLyAgICAgdmFyIGNoYW5uZWwgPSBuZXcgTWVzc2FnZUNoYW5uZWwoKTtcbi8vICAgICBjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IGNhbGxiYWNrO1xuLy8gICAgIHJldHVybiBmdW5jdGlvbiByZXF1ZXN0Q2FsbCgpIHtcbi8vICAgICAgICAgY2hhbm5lbC5wb3J0Mi5wb3N0TWVzc2FnZSgwKTtcbi8vICAgICB9O1xuLy8gfVxuXG4vLyBGb3IgcmVhc29ucyBleHBsYWluZWQgYWJvdmUsIHdlIGFyZSBhbHNvIHVuYWJsZSB0byB1c2UgYHNldEltbWVkaWF0ZWBcbi8vIHVuZGVyIGFueSBjaXJjdW1zdGFuY2VzLlxuLy8gRXZlbiBpZiB3ZSB3ZXJlLCB0aGVyZSBpcyBhbm90aGVyIGJ1ZyBpbiBJbnRlcm5ldCBFeHBsb3JlciAxMC5cbi8vIEl0IGlzIG5vdCBzdWZmaWNpZW50IHRvIGFzc2lnbiBgc2V0SW1tZWRpYXRlYCB0byBgcmVxdWVzdEZsdXNoYCBiZWNhdXNlXG4vLyBgc2V0SW1tZWRpYXRlYCBtdXN0IGJlIGNhbGxlZCAqYnkgbmFtZSogYW5kIHRoZXJlZm9yZSBtdXN0IGJlIHdyYXBwZWQgaW4gYVxuLy8gY2xvc3VyZS5cbi8vIE5ldmVyIGZvcmdldC5cblxuLy8gZnVuY3Rpb24gbWFrZVJlcXVlc3RDYWxsRnJvbVNldEltbWVkaWF0ZShjYWxsYmFjaykge1xuLy8gICAgIHJldHVybiBmdW5jdGlvbiByZXF1ZXN0Q2FsbCgpIHtcbi8vICAgICAgICAgc2V0SW1tZWRpYXRlKGNhbGxiYWNrKTtcbi8vICAgICB9O1xuLy8gfVxuXG4vLyBTYWZhcmkgNi4wIGhhcyBhIHByb2JsZW0gd2hlcmUgdGltZXJzIHdpbGwgZ2V0IGxvc3Qgd2hpbGUgdGhlIHVzZXIgaXNcbi8vIHNjcm9sbGluZy4gVGhpcyBwcm9ibGVtIGRvZXMgbm90IGltcGFjdCBBU0FQIGJlY2F1c2UgU2FmYXJpIDYuMCBzdXBwb3J0c1xuLy8gbXV0YXRpb24gb2JzZXJ2ZXJzLCBzbyB0aGF0IGltcGxlbWVudGF0aW9uIGlzIHVzZWQgaW5zdGVhZC5cbi8vIEhvd2V2ZXIsIGlmIHdlIGV2ZXIgZWxlY3QgdG8gdXNlIHRpbWVycyBpbiBTYWZhcmksIHRoZSBwcmV2YWxlbnQgd29yay1hcm91bmRcbi8vIGlzIHRvIGFkZCBhIHNjcm9sbCBldmVudCBsaXN0ZW5lciB0aGF0IGNhbGxzIGZvciBhIGZsdXNoLlxuXG4vLyBgc2V0VGltZW91dGAgZG9lcyBub3QgY2FsbCB0aGUgcGFzc2VkIGNhbGxiYWNrIGlmIHRoZSBkZWxheSBpcyBsZXNzIHRoYW5cbi8vIGFwcHJveGltYXRlbHkgNyBpbiB3ZWIgd29ya2VycyBpbiBGaXJlZm94IDggdGhyb3VnaCAxOCwgYW5kIHNvbWV0aW1lcyBub3Rcbi8vIGV2ZW4gdGhlbi5cblxuZnVuY3Rpb24gbWFrZVJlcXVlc3RDYWxsRnJvbVRpbWVyKGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIHJlcXVlc3RDYWxsKCkge1xuICAgICAgICAvLyBXZSBkaXNwYXRjaCBhIHRpbWVvdXQgd2l0aCBhIHNwZWNpZmllZCBkZWxheSBvZiAwIGZvciBlbmdpbmVzIHRoYXRcbiAgICAgICAgLy8gY2FuIHJlbGlhYmx5IGFjY29tbW9kYXRlIHRoYXQgcmVxdWVzdC4gVGhpcyB3aWxsIHVzdWFsbHkgYmUgc25hcHBlZFxuICAgICAgICAvLyB0byBhIDQgbWlsaXNlY29uZCBkZWxheSwgYnV0IG9uY2Ugd2UncmUgZmx1c2hpbmcsIHRoZXJlJ3Mgbm8gZGVsYXlcbiAgICAgICAgLy8gYmV0d2VlbiBldmVudHMuXG4gICAgICAgIHZhciB0aW1lb3V0SGFuZGxlID0gc2V0VGltZW91dChoYW5kbGVUaW1lciwgMCk7XG4gICAgICAgIC8vIEhvd2V2ZXIsIHNpbmNlIHRoaXMgdGltZXIgZ2V0cyBmcmVxdWVudGx5IGRyb3BwZWQgaW4gRmlyZWZveFxuICAgICAgICAvLyB3b3JrZXJzLCB3ZSBlbmxpc3QgYW4gaW50ZXJ2YWwgaGFuZGxlIHRoYXQgd2lsbCB0cnkgdG8gZmlyZVxuICAgICAgICAvLyBhbiBldmVudCAyMCB0aW1lcyBwZXIgc2Vjb25kIHVudGlsIGl0IHN1Y2NlZWRzLlxuICAgICAgICB2YXIgaW50ZXJ2YWxIYW5kbGUgPSBzZXRJbnRlcnZhbChoYW5kbGVUaW1lciwgNTApO1xuXG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZVRpbWVyKCkge1xuICAgICAgICAgICAgLy8gV2hpY2hldmVyIHRpbWVyIHN1Y2NlZWRzIHdpbGwgY2FuY2VsIGJvdGggdGltZXJzIGFuZFxuICAgICAgICAgICAgLy8gZXhlY3V0ZSB0aGUgY2FsbGJhY2suXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dEhhbmRsZSk7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsSGFuZGxlKTtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG4vLyBUaGlzIGlzIGZvciBgYXNhcC5qc2Agb25seS5cbi8vIEl0cyBuYW1lIHdpbGwgYmUgcGVyaW9kaWNhbGx5IHJhbmRvbWl6ZWQgdG8gYnJlYWsgYW55IGNvZGUgdGhhdCBkZXBlbmRzIG9uXG4vLyBpdHMgZXhpc3RlbmNlLlxucmF3QXNhcC5tYWtlUmVxdWVzdENhbGxGcm9tVGltZXIgPSBtYWtlUmVxdWVzdENhbGxGcm9tVGltZXI7XG5cbi8vIEFTQVAgd2FzIG9yaWdpbmFsbHkgYSBuZXh0VGljayBzaGltIGluY2x1ZGVkIGluIFEuIFRoaXMgd2FzIGZhY3RvcmVkIG91dFxuLy8gaW50byB0aGlzIEFTQVAgcGFja2FnZS4gSXQgd2FzIGxhdGVyIGFkYXB0ZWQgdG8gUlNWUCB3aGljaCBtYWRlIGZ1cnRoZXJcbi8vIGFtZW5kbWVudHMuIFRoZXNlIGRlY2lzaW9ucywgcGFydGljdWxhcmx5IHRvIG1hcmdpbmFsaXplIE1lc3NhZ2VDaGFubmVsIGFuZFxuLy8gdG8gY2FwdHVyZSB0aGUgTXV0YXRpb25PYnNlcnZlciBpbXBsZW1lbnRhdGlvbiBpbiBhIGNsb3N1cmUsIHdlcmUgaW50ZWdyYXRlZFxuLy8gYmFjayBpbnRvIEFTQVAgcHJvcGVyLlxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3RpbGRlaW8vcnN2cC5qcy9ibG9iL2NkZGY3MjMyNTQ2YTljZjg1ODUyNGI3NWNkZTZmOWVkZjcyNjIwYTcvbGliL3JzdnAvYXNhcC5qc1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBkb21haW47IC8vIFRoZSBkb21haW4gbW9kdWxlIGlzIGV4ZWN1dGVkIG9uIGRlbWFuZFxudmFyIGhhc1NldEltbWVkaWF0ZSA9IHR5cGVvZiBzZXRJbW1lZGlhdGUgPT09IFwiZnVuY3Rpb25cIjtcblxuLy8gVXNlIHRoZSBmYXN0ZXN0IG1lYW5zIHBvc3NpYmxlIHRvIGV4ZWN1dGUgYSB0YXNrIGluIGl0cyBvd24gdHVybiwgd2l0aFxuLy8gcHJpb3JpdHkgb3ZlciBvdGhlciBldmVudHMgaW5jbHVkaW5nIG5ldHdvcmsgSU8gZXZlbnRzIGluIE5vZGUuanMuXG4vL1xuLy8gQW4gZXhjZXB0aW9uIHRocm93biBieSBhIHRhc2sgd2lsbCBwZXJtYW5lbnRseSBpbnRlcnJ1cHQgdGhlIHByb2Nlc3Npbmcgb2Zcbi8vIHN1YnNlcXVlbnQgdGFza3MuIFRoZSBoaWdoZXIgbGV2ZWwgYGFzYXBgIGZ1bmN0aW9uIGVuc3VyZXMgdGhhdCBpZiBhblxuLy8gZXhjZXB0aW9uIGlzIHRocm93biBieSBhIHRhc2ssIHRoYXQgdGhlIHRhc2sgcXVldWUgd2lsbCBjb250aW51ZSBmbHVzaGluZyBhc1xuLy8gc29vbiBhcyBwb3NzaWJsZSwgYnV0IGlmIHlvdSB1c2UgYHJhd0FzYXBgIGRpcmVjdGx5LCB5b3UgYXJlIHJlc3BvbnNpYmxlIHRvXG4vLyBlaXRoZXIgZW5zdXJlIHRoYXQgbm8gZXhjZXB0aW9ucyBhcmUgdGhyb3duIGZyb20geW91ciB0YXNrLCBvciB0byBtYW51YWxseVxuLy8gY2FsbCBgcmF3QXNhcC5yZXF1ZXN0Rmx1c2hgIGlmIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd24uXG5tb2R1bGUuZXhwb3J0cyA9IHJhd0FzYXA7XG5mdW5jdGlvbiByYXdBc2FwKHRhc2spIHtcbiAgICBpZiAoIXF1ZXVlLmxlbmd0aCkge1xuICAgICAgICByZXF1ZXN0Rmx1c2goKTtcbiAgICAgICAgZmx1c2hpbmcgPSB0cnVlO1xuICAgIH1cbiAgICAvLyBBdm9pZHMgYSBmdW5jdGlvbiBjYWxsXG4gICAgcXVldWVbcXVldWUubGVuZ3RoXSA9IHRhc2s7XG59XG5cbnZhciBxdWV1ZSA9IFtdO1xuLy8gT25jZSBhIGZsdXNoIGhhcyBiZWVuIHJlcXVlc3RlZCwgbm8gZnVydGhlciBjYWxscyB0byBgcmVxdWVzdEZsdXNoYCBhcmVcbi8vIG5lY2Vzc2FyeSB1bnRpbCB0aGUgbmV4dCBgZmx1c2hgIGNvbXBsZXRlcy5cbnZhciBmbHVzaGluZyA9IGZhbHNlO1xuLy8gVGhlIHBvc2l0aW9uIG9mIHRoZSBuZXh0IHRhc2sgdG8gZXhlY3V0ZSBpbiB0aGUgdGFzayBxdWV1ZS4gVGhpcyBpc1xuLy8gcHJlc2VydmVkIGJldHdlZW4gY2FsbHMgdG8gYGZsdXNoYCBzbyB0aGF0IGl0IGNhbiBiZSByZXN1bWVkIGlmXG4vLyBhIHRhc2sgdGhyb3dzIGFuIGV4Y2VwdGlvbi5cbnZhciBpbmRleCA9IDA7XG4vLyBJZiBhIHRhc2sgc2NoZWR1bGVzIGFkZGl0aW9uYWwgdGFza3MgcmVjdXJzaXZlbHksIHRoZSB0YXNrIHF1ZXVlIGNhbiBncm93XG4vLyB1bmJvdW5kZWQuIFRvIHByZXZlbnQgbWVtb3J5IGV4Y2F1c3Rpb24sIHRoZSB0YXNrIHF1ZXVlIHdpbGwgcGVyaW9kaWNhbGx5XG4vLyB0cnVuY2F0ZSBhbHJlYWR5LWNvbXBsZXRlZCB0YXNrcy5cbnZhciBjYXBhY2l0eSA9IDEwMjQ7XG5cbi8vIFRoZSBmbHVzaCBmdW5jdGlvbiBwcm9jZXNzZXMgYWxsIHRhc2tzIHRoYXQgaGF2ZSBiZWVuIHNjaGVkdWxlZCB3aXRoXG4vLyBgcmF3QXNhcGAgdW5sZXNzIGFuZCB1bnRpbCBvbmUgb2YgdGhvc2UgdGFza3MgdGhyb3dzIGFuIGV4Y2VwdGlvbi5cbi8vIElmIGEgdGFzayB0aHJvd3MgYW4gZXhjZXB0aW9uLCBgZmx1c2hgIGVuc3VyZXMgdGhhdCBpdHMgc3RhdGUgd2lsbCByZW1haW5cbi8vIGNvbnNpc3RlbnQgYW5kIHdpbGwgcmVzdW1lIHdoZXJlIGl0IGxlZnQgb2ZmIHdoZW4gY2FsbGVkIGFnYWluLlxuLy8gSG93ZXZlciwgYGZsdXNoYCBkb2VzIG5vdCBtYWtlIGFueSBhcnJhbmdlbWVudHMgdG8gYmUgY2FsbGVkIGFnYWluIGlmIGFuXG4vLyBleGNlcHRpb24gaXMgdGhyb3duLlxuZnVuY3Rpb24gZmx1c2goKSB7XG4gICAgd2hpbGUgKGluZGV4IDwgcXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHZhciBjdXJyZW50SW5kZXggPSBpbmRleDtcbiAgICAgICAgLy8gQWR2YW5jZSB0aGUgaW5kZXggYmVmb3JlIGNhbGxpbmcgdGhlIHRhc2suIFRoaXMgZW5zdXJlcyB0aGF0IHdlIHdpbGxcbiAgICAgICAgLy8gYmVnaW4gZmx1c2hpbmcgb24gdGhlIG5leHQgdGFzayB0aGUgdGFzayB0aHJvd3MgYW4gZXJyb3IuXG4gICAgICAgIGluZGV4ID0gaW5kZXggKyAxO1xuICAgICAgICBxdWV1ZVtjdXJyZW50SW5kZXhdLmNhbGwoKTtcbiAgICAgICAgLy8gUHJldmVudCBsZWFraW5nIG1lbW9yeSBmb3IgbG9uZyBjaGFpbnMgb2YgcmVjdXJzaXZlIGNhbGxzIHRvIGBhc2FwYC5cbiAgICAgICAgLy8gSWYgd2UgY2FsbCBgYXNhcGAgd2l0aGluIHRhc2tzIHNjaGVkdWxlZCBieSBgYXNhcGAsIHRoZSBxdWV1ZSB3aWxsXG4gICAgICAgIC8vIGdyb3csIGJ1dCB0byBhdm9pZCBhbiBPKG4pIHdhbGsgZm9yIGV2ZXJ5IHRhc2sgd2UgZXhlY3V0ZSwgd2UgZG9uJ3RcbiAgICAgICAgLy8gc2hpZnQgdGFza3Mgb2ZmIHRoZSBxdWV1ZSBhZnRlciB0aGV5IGhhdmUgYmVlbiBleGVjdXRlZC5cbiAgICAgICAgLy8gSW5zdGVhZCwgd2UgcGVyaW9kaWNhbGx5IHNoaWZ0IDEwMjQgdGFza3Mgb2ZmIHRoZSBxdWV1ZS5cbiAgICAgICAgaWYgKGluZGV4ID4gY2FwYWNpdHkpIHtcbiAgICAgICAgICAgIC8vIE1hbnVhbGx5IHNoaWZ0IGFsbCB2YWx1ZXMgc3RhcnRpbmcgYXQgdGhlIGluZGV4IGJhY2sgdG8gdGhlXG4gICAgICAgICAgICAvLyBiZWdpbm5pbmcgb2YgdGhlIHF1ZXVlLlxuICAgICAgICAgICAgZm9yICh2YXIgc2NhbiA9IDAsIG5ld0xlbmd0aCA9IHF1ZXVlLmxlbmd0aCAtIGluZGV4OyBzY2FuIDwgbmV3TGVuZ3RoOyBzY2FuKyspIHtcbiAgICAgICAgICAgICAgICBxdWV1ZVtzY2FuXSA9IHF1ZXVlW3NjYW4gKyBpbmRleF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBxdWV1ZS5sZW5ndGggLT0gaW5kZXg7XG4gICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUubGVuZ3RoID0gMDtcbiAgICBpbmRleCA9IDA7XG4gICAgZmx1c2hpbmcgPSBmYWxzZTtcbn1cblxucmF3QXNhcC5yZXF1ZXN0Rmx1c2ggPSByZXF1ZXN0Rmx1c2g7XG5mdW5jdGlvbiByZXF1ZXN0Rmx1c2goKSB7XG4gICAgLy8gRW5zdXJlIGZsdXNoaW5nIGlzIG5vdCBib3VuZCB0byBhbnkgZG9tYWluLlxuICAgIC8vIEl0IGlzIG5vdCBzdWZmaWNpZW50IHRvIGV4aXQgdGhlIGRvbWFpbiwgYmVjYXVzZSBkb21haW5zIGV4aXN0IG9uIGEgc3RhY2suXG4gICAgLy8gVG8gZXhlY3V0ZSBjb2RlIG91dHNpZGUgb2YgYW55IGRvbWFpbiwgdGhlIGZvbGxvd2luZyBkYW5jZSBpcyBuZWNlc3NhcnkuXG4gICAgdmFyIHBhcmVudERvbWFpbiA9IHByb2Nlc3MuZG9tYWluO1xuICAgIGlmIChwYXJlbnREb21haW4pIHtcbiAgICAgICAgaWYgKCFkb21haW4pIHtcbiAgICAgICAgICAgIC8vIExhenkgZXhlY3V0ZSB0aGUgZG9tYWluIG1vZHVsZS5cbiAgICAgICAgICAgIC8vIE9ubHkgZW1wbG95ZWQgaWYgdGhlIHVzZXIgZWxlY3RzIHRvIHVzZSBkb21haW5zLlxuICAgICAgICAgICAgZG9tYWluID0gcmVxdWlyZShcImRvbWFpblwiKTtcbiAgICAgICAgfVxuICAgICAgICBkb21haW4uYWN0aXZlID0gcHJvY2Vzcy5kb21haW4gPSBudWxsO1xuICAgIH1cblxuICAgIC8vIGBzZXRJbW1lZGlhdGVgIGlzIHNsb3dlciB0aGF0IGBwcm9jZXNzLm5leHRUaWNrYCwgYnV0IGBwcm9jZXNzLm5leHRUaWNrYFxuICAgIC8vIGNhbm5vdCBoYW5kbGUgcmVjdXJzaW9uLlxuICAgIC8vIGByZXF1ZXN0Rmx1c2hgIHdpbGwgb25seSBiZSBjYWxsZWQgcmVjdXJzaXZlbHkgZnJvbSBgYXNhcC5qc2AsIHRvIHJlc3VtZVxuICAgIC8vIGZsdXNoaW5nIGFmdGVyIGFuIGVycm9yIGlzIHRocm93biBpbnRvIGEgZG9tYWluLlxuICAgIC8vIENvbnZlbmllbnRseSwgYHNldEltbWVkaWF0ZWAgd2FzIGludHJvZHVjZWQgaW4gdGhlIHNhbWUgdmVyc2lvblxuICAgIC8vIGBwcm9jZXNzLm5leHRUaWNrYCBzdGFydGVkIHRocm93aW5nIHJlY3Vyc2lvbiBlcnJvcnMuXG4gICAgaWYgKGZsdXNoaW5nICYmIGhhc1NldEltbWVkaWF0ZSkge1xuICAgICAgICBzZXRJbW1lZGlhdGUoZmx1c2gpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHByb2Nlc3MubmV4dFRpY2soZmx1c2gpO1xuICAgIH1cblxuICAgIGlmIChwYXJlbnREb21haW4pIHtcbiAgICAgICAgZG9tYWluLmFjdGl2ZSA9IHByb2Nlc3MuZG9tYWluID0gcGFyZW50RG9tYWluO1xuICAgIH1cbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gVGhpcyBmaWxlIGNvbnRhaW5zIGRlZmluaXRpb25zIG9mIHJ1bGVzIGhvdyBsb2NhdGlvbiBVUkxzIGFyZSB0cmFuc2xhdGVkXG4vLyB0byBwYXJhbWV0ZXJzIGZvciBzdG9yZXMgaW4gQ2F0YmVycnkgYXBwbGljYXRpb24uXG4vL1xuLy8gRm9ybWF0OlxuLy8gL3NvbWUvOnBhcmFtZXRlcltzdG9yZTEsc3RvcmUyLHN0b3JlM11cbi8vXG4vLyBNb3JlIGRldGFpbHMgaGVyZTpcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9jYXRiZXJyeS9jYXRiZXJyeS9ibG9iL21hc3Rlci9kb2NzL2luZGV4Lm1kI3JvdXRpbmdcblxubW9kdWxlLmV4cG9ydHMgPSBbXG5cdCcvJ1xuXTtcbiIsIi8qXG4gKiBjYXRiZXJyeVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNCBEZW5pcyBSZWNoa3Vub3YgYW5kIHByb2plY3QgY29udHJpYnV0b3JzLlxuICpcbiAqIGNhdGJlcnJ5J3MgbGljZW5zZSBmb2xsb3dzOlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXG4gKiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvblxuICogZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLFxuICogaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSxcbiAqIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsXG4gKiBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuICogc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbiAqIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1NcbiAqIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICpcbiAqIFRoaXMgbGljZW5zZSBhcHBsaWVzIHRvIGFsbCBwYXJ0cyBvZiBjYXRiZXJyeSB0aGF0IGFyZSBub3QgZXh0ZXJuYWxseVxuICogbWFpbnRhaW5lZCBsaWJyYXJpZXMuXG4gKi9cblxuLyoqXG4gKiBUaGlzIG1vZHVsZSBpcyBhIHRlbXBsYXRlIGFuZCBpdCBpcyB1c2VkIG9ubHkgd2l0aCBzb21lIHN0cmluZyByZXBsYWNlc1xuICogYnkgQnJvd3NlckJ1bmRsZUJ1aWxkZXIgbW9kdWxlLiBJdCBkb2VzIG5vdCB3b3JrIGJ5IGl0c2VsZi5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBzdG9yZXMgPSBbXG5cbntuYW1lOiAnTWFpbicsIGNvbnN0cnVjdG9yOiByZXF1aXJlKCcuL2NhdGJlcnJ5X3N0b3Jlcy9NYWluLmpzJyl9XG5dO1xuXG52YXIgY29tcG9uZW50cyA9IFtcblxue25hbWU6ICdkb2N1bWVudCcsIGNvbnN0cnVjdG9yOiByZXF1aXJlKCcuL2NhdGJlcnJ5X2NvbXBvbmVudHMvZG9jdW1lbnQvRG9jdW1lbnQuanMnKSwgcHJvcGVydGllczoge1wibmFtZVwiOlwiZG9jdW1lbnRcIixcInRlbXBsYXRlXCI6XCIuL2RvY3VtZW50Lmhic1wiLFwibG9naWNcIjpcIi4vRG9jdW1lbnQuanNcIn0sIHRlbXBsYXRlU291cmNlOiAne1wiY29tcGlsZXJcIjpbNixcIj49IDIuMC4wLWJldGEuMVwiXSxcIm1haW5cIjpmdW5jdGlvbihkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XFxuICByZXR1cm4gXCI8IURPQ1RZUEUgaHRtbD5cXFxcbjxodG1sPlxcXFxuPGhlYWQ+PC9oZWFkPlxcXFxuPGJvZHk+XFxcXG5cXHQ8Y2F0LWhlbGxvLXdvcmxkIGlkPVxcXFxcInVuaXF1ZVxcXFxcIiBjYXQtc3RvcmU9XFxcXFwiTWFpblxcXFxcIj48L2NhdC1oZWxsby13b3JsZD5cXFxcbjwvYm9keT5cXFxcbjwvaHRtbD5cXFxcblwiO1xcbiAgfSxcInVzZURhdGFcIjp0cnVlfScsIGVycm9yVGVtcGxhdGVTb3VyY2U6IG51bGx9LFxue25hbWU6ICdoZWFkJywgY29uc3RydWN0b3I6IHJlcXVpcmUoJy4vY2F0YmVycnlfY29tcG9uZW50cy9oZWFkL0hlYWQuanMnKSwgcHJvcGVydGllczoge1wibmFtZVwiOlwiaGVhZFwiLFwidGVtcGxhdGVcIjpcIi4vaGVhZC5oYnNcIixcImxvZ2ljXCI6XCIuL0hlYWQuanNcIn0sIHRlbXBsYXRlU291cmNlOiAne1wiY29tcGlsZXJcIjpbNixcIj49IDIuMC4wLWJldGEuMVwiXSxcIm1haW5cIjpmdW5jdGlvbihkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XFxuICB2YXIgaGVscGVyLCBmdW5jdGlvblR5cGU9XCJmdW5jdGlvblwiLCBoZWxwZXJNaXNzaW5nPWhlbHBlcnMuaGVscGVyTWlzc2luZywgZXNjYXBlRXhwcmVzc2lvbj10aGlzLmVzY2FwZUV4cHJlc3Npb247XFxuICByZXR1cm4gXCI8bWV0YSBjaGFyc2V0PVxcXFxcIlVURi04XFxcXFwiPlxcXFxuPHRpdGxlPlwiXFxuICAgICsgZXNjYXBlRXhwcmVzc2lvbigoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLnRpdGxlIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC50aXRsZSA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBoZWxwZXJNaXNzaW5nKSwodHlwZW9mIGhlbHBlciA9PT0gZnVuY3Rpb25UeXBlID8gaGVscGVyLmNhbGwoZGVwdGgwLCB7XCJuYW1lXCI6XCJ0aXRsZVwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxcbiAgICArIFwiPC90aXRsZT5cXFxcbjxzY3JpcHQgc3JjPVxcXFxcImJ1bmRsZS5qc1xcXFxcIj48L3NjcmlwdD5cXFxcblxcXFxuXCI7XFxufSxcInVzZURhdGFcIjp0cnVlfScsIGVycm9yVGVtcGxhdGVTb3VyY2U6IG51bGx9LFxue25hbWU6ICdoZWxsby13b3JsZCcsIGNvbnN0cnVjdG9yOiByZXF1aXJlKCcuL2NhdGJlcnJ5X2NvbXBvbmVudHMvaGVsbG8td29ybGQvSGVsbG9Xb3JsZC5qcycpLCBwcm9wZXJ0aWVzOiB7XCJuYW1lXCI6XCJoZWxsby13b3JsZFwiLFwidGVtcGxhdGVcIjpcIi4vaGVsbG8uaGJzXCIsXCJlcnJvclRlbXBsYXRlXCI6XCIuL2Vycm9yLmhic1wiLFwibG9naWNcIjpcIi4vSGVsbG9Xb3JsZC5qc1wifSwgdGVtcGxhdGVTb3VyY2U6ICd7XCJjb21waWxlclwiOls2LFwiPj0gMi4wLjAtYmV0YS4xXCJdLFwibWFpblwiOmZ1bmN0aW9uKGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcXG4gIHZhciBoZWxwZXIsIGZ1bmN0aW9uVHlwZT1cImZ1bmN0aW9uXCIsIGhlbHBlck1pc3Npbmc9aGVscGVycy5oZWxwZXJNaXNzaW5nLCBlc2NhcGVFeHByZXNzaW9uPXRoaXMuZXNjYXBlRXhwcmVzc2lvbjtcXG4gIHJldHVybiBcIjxoMT5IZWxsbywgXCJcXG4gICAgKyBlc2NhcGVFeHByZXNzaW9uKCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMud2hvIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC53aG8gOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogaGVscGVyTWlzc2luZyksKHR5cGVvZiBoZWxwZXIgPT09IGZ1bmN0aW9uVHlwZSA/IGhlbHBlci5jYWxsKGRlcHRoMCwge1wibmFtZVwiOlwid2hvXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXFxuICAgICsgXCIhPC9oMT5cXFxcblwiO1xcbn0sXCJ1c2VEYXRhXCI6dHJ1ZX0nLCBlcnJvclRlbXBsYXRlU291cmNlOiAne1wiY29tcGlsZXJcIjpbNixcIj49IDIuMC4wLWJldGEuMVwiXSxcIm1haW5cIjpmdW5jdGlvbihkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XFxuICByZXR1cm4gXCJcXFxcblwiO1xcbiAgfSxcInVzZURhdGFcIjp0cnVlfSd9XG5dO1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWwnKSxcblx0cm91dGVEZWZpbml0aW9ucyA9IHJlcXVpcmUoJy4vcm91dGVzLmpzJykgfHwgW10sXG5cdG1vZHVsZUhlbHBlciA9IHJlcXVpcmUoJy4vbm9kZV9tb2R1bGVzL2NhdGJlcnJ5L2xpYi9oZWxwZXJzL21vZHVsZUhlbHBlci5qcycpLFxuXHRDYXRiZXJyeSA9IHJlcXVpcmUoJy4vbm9kZV9tb2R1bGVzL2NhdGJlcnJ5L2Jyb3dzZXIvQ2F0YmVycnkuanMnKSxcblx0TG9nZ2VyID0gcmVxdWlyZSgnLi9ub2RlX21vZHVsZXMvY2F0YmVycnkvYnJvd3Nlci9Mb2dnZXIuanMnKSxcblx0Qm9vdHN0cmFwcGVyQmFzZSA9XG5cdFx0cmVxdWlyZSgnLi9ub2RlX21vZHVsZXMvY2F0YmVycnkvbGliL2Jhc2UvQm9vdHN0cmFwcGVyQmFzZS5qcycpLFxuXHRTdG9yZURpc3BhdGNoZXIgPSByZXF1aXJlKCcuL25vZGVfbW9kdWxlcy9jYXRiZXJyeS9saWIvU3RvcmVEaXNwYXRjaGVyJyksXG5cdE1vZHVsZUFwaVByb3ZpZGVyID1cblx0XHRyZXF1aXJlKCcuL25vZGVfbW9kdWxlcy9jYXRiZXJyeS9icm93c2VyL3Byb3ZpZGVycy9Nb2R1bGVBcGlQcm92aWRlcicpLFxuXHRDb29raWVXcmFwcGVyID0gcmVxdWlyZSgnLi9ub2RlX21vZHVsZXMvY2F0YmVycnkvYnJvd3Nlci9Db29raWVXcmFwcGVyJyk7XG5cbnZhciBJTkZPX0RPQ1VNRU5UX1VQREFURUQgPSAnRG9jdW1lbnQgdXBkYXRlZCAoJWQgc3RvcmUocykgY2hhbmdlZCknLFxuXHRJTkZPX0NPTVBPTkVOVF9CT1VORCA9ICdDb21wb25lbnQgXCIlc1wiIGlzIGJvdW5kJyxcblx0SU5GT19DT01QT05FTlRfVU5CT1VORCA9ICdDb21wb25lbnQgXCIlc1wiIGlzIHVuYm91bmQnO1xuXG51dGlsLmluaGVyaXRzKEJvb3RzdHJhcHBlciwgQm9vdHN0cmFwcGVyQmFzZSk7XG5cbi8qKlxuICogQ3JlYXRlcyBuZXcgaW5zdGFuY2Ugb2YgdGhlIGJyb3dzZXIgQ2F0YmVycnkncyBib290c3RyYXBwZXIuXG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIEJvb3RzdHJhcHBlckJhc2VcbiAqL1xuZnVuY3Rpb24gQm9vdHN0cmFwcGVyKCkge1xuXHRCb290c3RyYXBwZXJCYXNlLmNhbGwodGhpcywgQ2F0YmVycnkpO1xufVxuXG4vKipcbiAqIENvbmZpZ3VyZXMgQ2F0YmVycnkncyBzZXJ2aWNlIGxvY2F0b3IuXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnT2JqZWN0IEFwcGxpY2F0aW9uIGNvbmZpZyBvYmplY3QuXG4gKiBAcGFyYW0ge1NlcnZpY2VMb2NhdG9yfSBsb2NhdG9yIFNlcnZpY2UgbG9jYXRvciB0byBjb25maWd1cmUuXG4gKi9cbkJvb3RzdHJhcHBlci5wcm90b3R5cGUuY29uZmlndXJlID0gZnVuY3Rpb24gKGNvbmZpZ09iamVjdCwgbG9jYXRvcikge1xuXHRCb290c3RyYXBwZXJCYXNlLnByb3RvdHlwZS5jb25maWd1cmUuY2FsbCh0aGlzLCBjb25maWdPYmplY3QsIGxvY2F0b3IpO1xuXG5cdC8vIGlmIGJyb3dzZXIgc3RpbGwgZG9lcyBub3QgaGF2ZSBwcm9taXNlcyB0aGVuIGFkZCBpdC5cblx0aWYgKCEoJ1Byb21pc2UnIGluIHdpbmRvdykpIHtcblx0XHR3aW5kb3cuUHJvbWlzZSA9IGxvY2F0b3IucmVzb2x2ZSgncHJvbWlzZScpO1xuXHR9XG5cblx0bG9jYXRvci5yZWdpc3Rlcignc3RvcmVEaXNwYXRjaGVyJywgU3RvcmVEaXNwYXRjaGVyLCBjb25maWdPYmplY3QsIHRydWUpO1xuXHRsb2NhdG9yLnJlZ2lzdGVyKFxuXHRcdCdtb2R1bGVBcGlQcm92aWRlcicsIE1vZHVsZUFwaVByb3ZpZGVyLCBjb25maWdPYmplY3QsIHRydWVcblx0KTtcblx0bG9jYXRvci5yZWdpc3RlcignY29va2llV3JhcHBlcicsIENvb2tpZVdyYXBwZXIsIGNvbmZpZ09iamVjdCwgdHJ1ZSk7XG5cblx0bG9jYXRvci5yZWdpc3Rlckluc3RhbmNlKCd3aW5kb3cnLCB3aW5kb3cpO1xuXG5cdHZhciBsb2dnZXJDb25maWcgPSBjb25maWdPYmplY3QubG9nZ2VyIHx8IHt9LFxuXHRcdGxvZ2dlciA9IG5ldyBMb2dnZXIobG9nZ2VyQ29uZmlnLmxldmVscyk7XG5cdGxvY2F0b3IucmVnaXN0ZXJJbnN0YW5jZSgnbG9nZ2VyJywgbG9nZ2VyKTtcblx0d2luZG93Lm9uZXJyb3IgPSBmdW5jdGlvbiBlcnJvckhhbmRsZXIobXNnLCB1cmksIGxpbmUpIHtcblx0XHRsb2dnZXIuZmF0YWwodXJpICsgJzonICsgbGluZSArICcgJyArIG1zZyk7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH07XG5cdHZhciBldmVudEJ1cyA9IGxvY2F0b3IucmVzb2x2ZSgnZXZlbnRCdXMnKTtcblx0dGhpcy5fd3JhcEV2ZW50c1dpdGhMb2dnZXIoZXZlbnRCdXMsIGxvZ2dlcik7XG5cblx0cm91dGVEZWZpbml0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChyb3V0ZURlZmluaXRpb24pIHtcblx0XHRsb2NhdG9yLnJlZ2lzdGVySW5zdGFuY2UoJ3JvdXRlRGVmaW5pdGlvbicsIHJvdXRlRGVmaW5pdGlvbik7XG5cdH0pO1xuXG5cdHN0b3Jlcy5mb3JFYWNoKGZ1bmN0aW9uIChzdG9yZSkge1xuXHRcdGxvY2F0b3IucmVnaXN0ZXJJbnN0YW5jZSgnc3RvcmUnLCBzdG9yZSk7XG5cdH0pO1xuXG5cdGNvbXBvbmVudHMuZm9yRWFjaChmdW5jdGlvbiAoY29tcG9uZW50KSB7XG5cdFx0bG9jYXRvci5yZWdpc3Rlckluc3RhbmNlKCdjb21wb25lbnQnLCBjb21wb25lbnQpO1xuXHR9KTtcbn07XG5cbi8qKlxuICogV3JhcHMgZXZlbnQgYnVzIHdpdGggbG9nIG1lc3NhZ2VzLlxuICogQHBhcmFtIHtFdmVudEVtaXR0ZXJ9IGV2ZW50QnVzIEV2ZW50IGVtaXR0ZXIgdGhhdCBpbXBsZW1lbnRzIGV2ZW50IGJ1cy5cbiAqIEBwYXJhbSB7TG9nZ2VyfSBsb2dnZXIgTG9nZ2VyIHRvIHdyaXRlIG1lc3NhZ2VzLlxuICogQHByb3RlY3RlZFxuICovXG5Cb290c3RyYXBwZXIucHJvdG90eXBlLl93cmFwRXZlbnRzV2l0aExvZ2dlciA9IGZ1bmN0aW9uIChldmVudEJ1cywgbG9nZ2VyKSB7XG5cdEJvb3RzdHJhcHBlckJhc2UucHJvdG90eXBlLl93cmFwRXZlbnRzV2l0aExvZ2dlclxuXHRcdC5jYWxsKHRoaXMsIGV2ZW50QnVzLCBsb2dnZXIpO1xuXHRldmVudEJ1c1xuXHRcdC5vbignZG9jdW1lbnRVcGRhdGVkJywgZnVuY3Rpb24gKGFyZ3MpIHtcblx0XHRcdGxvZ2dlci5pbmZvKHV0aWwuZm9ybWF0KElORk9fRE9DVU1FTlRfVVBEQVRFRCwgYXJncy5sZW5ndGgpKTtcblx0XHR9KVxuXHRcdC5vbignY29tcG9uZW50Qm91bmQnLCBmdW5jdGlvbiAoYXJncykge1xuXHRcdFx0bG9nZ2VyLmluZm8odXRpbC5mb3JtYXQoXG5cdFx0XHRcdElORk9fQ09NUE9ORU5UX0JPVU5ELFxuXHRcdFx0XHRhcmdzLmVsZW1lbnQudGFnTmFtZSArIChhcmdzLmlkID8gJyMnICsgYXJncy5pZCA6ICcnKVxuXHRcdFx0KSk7XG5cdFx0fSlcblx0XHQub24oJ2NvbXBvbmVudFVuYm91bmQnLCBmdW5jdGlvbiAoYXJncykge1xuXHRcdFx0bG9nZ2VyLmluZm8odXRpbC5mb3JtYXQoXG5cdFx0XHRcdElORk9fQ09NUE9ORU5UX1VOQk9VTkQsXG5cdFx0XHRcdGFyZ3MuZWxlbWVudC50YWdOYW1lICsgKGFyZ3MuaWQgPyAnIycgKyBhcmdzLmlkIDogJycpXG5cdFx0XHQpKTtcblx0XHR9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IEJvb3RzdHJhcHBlcigpOyJdfQ==
