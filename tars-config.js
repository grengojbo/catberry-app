'use strict';

var tarsConfig = {

  /////////////////////
  // CUSTOM OPTIONS ////////////////////////////////
  // YOU CAN CHANGE THIS OPTIONS ALL THE TIME      //
  //                                               //
  // You need to restart builder to apply options. //
  ///////////////////////////////////////////////////

  //folder for collect static
  // USE this to store files in adition to build pass
  // additionalBuildPath: '../skeleton/skeleton/static/',

  // TARS-BOWER OPTIONS ////////////////////////////////
  // name of file to store bower dependencies (could be retrieved with bower list --json)
  bower_dependencies_path: 'bower_dependencies.json',

  // exclude files from concatination
  // HINT excluded files will be stored like separate-js
  bower_exclude_files: [],
  // folder to contain bower js packages inside static/js
  bower_js_folder: 'vendor',
  // folder to contain bower css packages inside static/css
  bower_css_folder: 'vendor',

  // ovverrides for main package files for packages without main
  // example {jquery:{main:['jquery.js']}}
  package_files_overrides: {

  },

  // es 6 options
  es6_transpile: false,

  // transpile separate files
  es6_separate_transpile: false,

  // amazon s3 options
  s3_accessKeyId: '<s3_acces_key>',
  s3_secretAccessKey: '<s3_secret_acces_key>',
  s3_default_bucket_name: '<bucket_name>',

  /**
   * Use compass CSS FrameWork
   * @type {Boolean}
   */
  useCompass: true,

  /////////////////////
  // MUTABLE OPTIONS ////////////////////////////////
  // YOU CAN CHANGE THIS OPTIONS ALL THE TIME      //
  //                                               //
  // You need to restart builder to apply options. //
  ///////////////////////////////////////////////////

  /**
   * Autoprefixer config
   * @type {Array}
   */
  autoprefixerConfig: ['> 1%', 'last 2 versions', 'opera 12.1', 'android 4'],

  /**
   * Use svg images
   * @type {Boolean}
   */
  useSVG: true,

  /**
   * Use linting and hinting of js-files
   * @type {Boolean}
   */
  useJsLintAndHint: true,

  /**
   * Path-strings to js-files, which have to be included before modules' js-files
   * Example: ['./markup/controller/** /*.js']
   * @type {Array}
   */
  jsPathsToConcatBeforeModulesJs: [],

  /**
   * Lint additional js before modules
   * @type {Boolean}
   */
  lintJsCodeBeforeModules: false,

  /**
   * Path-strings to js-files, which have to be included before modules' js-files
   * @type {Array}
   */
  jsPathsToConcatAfterModulesJs: [],

  /**
   * Lint additional js after modules
   * @type {Boolean}
   */
  lintJsCodeAfterModules: false,

  /**
   * Config for Notify module
   * @type {Object}
   */
  notifyConfig: {

    /**
     * Do you need to use notify?
     * @type {Boolean}
     */
    useNotify: true,

    /**
     * Title for notifier
     * @type {String}
     */
    title: 'TARS notification',

    /**
     * Sounds notifactions
     * String (name of system sound) or undefined, if you don't need to hear any sounds
     * @type {Object}
     */
    sounds: {

      /**
       * Sound after successfull finishing of task
       * @type {String, undefined}
       * For example 'Glass' in OS X
       */
      onSuccess: 'Glass'
    },

    /**
     * Label for timestamp of task finishing time
     * @type {String}
     */
    taskFinishedText: 'Task finished at: '
  },

  /**
   * Config for browser-sync module
   * @type {Object}
   */
  browserSyncConfig: {

    /**
 * proxy url
 * @type {String}
 */
    proxy: 'localhost:3000',

    /**
         * dir to serve files from
         * @type {String}
         */
    baseDir: './dev',

    /**
     * Port of local server for browser-sync
     * @type {Number}
     */
    port: 3004,

    /**
     * Switch to false, if you don't need to open browser in dev mode
     * @type {Boolean}
     */
    open: true,

    /**
     * Choose browser to open
     * @type {String|Array}
     * Example: ['google chrome', 'firefox']
     * Avalible: safari, internet explorer, google chrome, firefox, opera
     */
    browser: 'google chrome',

    /**
     * Choose the page to open in browser at first opening
     * @type {String}
     */
    startUrl: '/index.html',

    /**
     * If you don't need to see notification in browser, switch to false
     * @type {Boolean}
     */
    useNotifyInBrowser: true
  },

  /**
   * Remove console.log and debugger from js code in release mode
   * @type {Boolean}
   */
  removeConsoleLog: true,

  /**
   * Minify result html in build version
   * @type {Boolean}
   */
  minifyHtml: false,

  /**
   * Beginning of path for static files
   * You have to use %=staticPrefix=% placeholder in paths to static
   * Example: %=staticPrefix=%img/logo.png
   * Will be replaced to '/static/img/logo.png'
   * @type {String}
   */
  staticPrefix: 'static/',

  /**
   * Beginning of path for static files for using in css
   * You have to use %=staticPrefixForCss=% placeholder in paths to static in css files
   * Example: background: url('%=staticPrefixForCss=%logo.png');
   * Will be replaced to background: url('../img/logo.png');
   * @type {String}
   */
  staticPrefixForCss: function () {
    return '../' + this.fs.imagesFolderName + '/';
  },

  /**
   * Path to build version of project
   * Could be like '../../../build' or absolute path
   * @type {String}
   */
  buildPath: './build/',

  /**
   * Use build versioning
   * Build version is a date ot building
   * @type {Boolean}
   */
  useBuildVersioning: false,

  /**
   * Use archiver for your build
   * @type {Boolean}
   */
  useArchiver: true,

  /**
   * Set ulimit. Topical for Linux-family OS and OSX.
   * @type {Number}
   */
  ulimit: 4096,

  /**
   * Set wait Catberry build.js.
   * @type {Number}
   */
  waitCatberryBuild: 40000,

  /**
   * Set wait Catberry start server.
   * @type {Number}
   */
  waitCatberryServer: 12000,

  catberry: {
    // exclude: 'articles,elements/error-message,elements/photoswipe',
    exclude: false,
    // excludeStores: 'articles,elements/error-message,elements/photoswipe',
    excludeStores: false,
    // excludeLibs: 'articles,elements/error-message,elements/photoswipe',
    excludeLibs: false,
    dev: {
      levelsServer: 'TRACE',
      levelsBrowser: 'debug,trace,error,warn'
    },
    prod: {
      levelsServer: 'ERROR',
      levelsBrowser: 'error,warn'
    },
    oldIE: false,
    enableCssStructureMinimization: true,
    destinationComponentsDir: 'assets',
    cdnPath: '/assets/',
    componentJSON: 'cat-component.json'
  },

  //////////////////////////////////////////////
  //////////////////////////////////////////////

  ////////////////////////////////////////////////////////
  // YOU CAN CHANGE THIS OPTIONS AND USE REINIT         //
  //                                                    //
  // Options for technologies, which you'd like to use. //
  ////////////////////////////////////////////////////////

  /**
   * Templater
   * Available 'jade' and 'handlebars'
   * @type {String}
   */
  templater: 'handlebars',

  /**
   * Css-preprocessor
   * Available 'scss', 'less' or 'stylus'
   * @type {String}
   */
  cssPreprocessor: 'scss',

  /**
   * What kind of size of images are you going to use.
   * 96 — 1 dppx (regular)
   * 192 — 2 dppx (retina)
   * 288 — 3 dppx (nexus 5, for example)
   * 384 - 4 dppx (nexus 6, for example)
   * Example if using for all displays: usePpi: [96, 192, 288, 384]
   * You can change with options not only on init or reinit,
   * but at with time you have to create new directories
   * and delete unused.
   * @type {Array}
   */
  useImagesForDisplayWithDpi: [96],

  ////////////////////////////////////////////////
  ////////////////////////////////////////////////

  ////////////////////////////////////////////////////////
  // You have to change with options after manually      //
  // renaming static and img folder                     //
  //                                                    //
  // Do not rename these dirs before reinit             //
  ////////////////////////////////////////////////////////

  /**
   * File structure settings
   * @type {Object}
   */
  fs: {

    /**
     * Name of folder with static files, such *.css, *.js and so on
     * 'static' by default
     * @type {String}
     */
    staticFolderName: 'static',

    /**
     * Name of folder with images
     * 'img' by default
     * @type {String}
     */
    imagesFolderName: 'images',

    /**
     * Name of folder with public
     * 'public' by default
     * @type {String}
     */
    distFolderName: 'public',

    /**
     * Name of folder with build
     * 'build' by default
     * @type {String}
     */
    buildFolderName: 'build',

    /**
     * Name of folder with assets files, such *.css, *.js and so on
     * 'assets' by default
     * @type {String}
     */
    assetsFolderName: 'assets',

    /**
     * Name of folder with component
     * 'modules' by default
     * @type {String}
     */
    componentFolderName: 'catberry_components',

    /**
     * Name of folder with component stores
     * 'catberry_stores' by default
     * @type {String}
     */
    componentStoresFolderName: 'catberry_stores',

    /**
     * Name of folder with component stores
     * 'catberry_stores' by default
     * @type {String}
     */
    componentLibsFolderName: 'lib',

    /**
     * Name of folder with src
     * 'src' by default
     * @type {String}
    **/
    srcFolderName: 'src',

    /**
     * Name of folder with dev
     * 'dev' by default
     * @type {String}
     */
    devFolderName: 'build',

    /**
     * Name of folder with config
     * 'config' by default
     * @type {String}
     */
    configFolderName: 'config',

    /**
     * Name of folder with templates
     * 'templates' by default
     * @type {String}
     */
    templatesFolderName: 'templates',

    /**
     * Name of folder with tmp
     * 'tmp' by default
     * @type {String}
     */
    tmpFolderName: 'tmp'
  }

  ////////////////////////////////////////////////////
  ////////////////////////////////////////////////////
};

try {
  var localTarsConfig = require('./local_tars_config');
  var _ = require('underscore');
  tarsConfig = _.extend(tarsConfig, localTarsConfig);

} catch (variable) {
  console.log('gulp-configs: no local settings');
}

module.exports = tarsConfig;
