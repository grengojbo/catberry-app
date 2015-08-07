'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var chokidar = require('chokidar');
var tarsConfig = require('../../../tars-config');
var watcherLog = require('../../helpers/watcher-log');
var path = require('path');

/**
 * Watcher for common scss(less or stylus)-files and scss(less or stylus)-files of plugins
 * @param  {Object} watchOptions
 */
module.exports = function (watchOptions) {
  var cssCompileTask = 'css:compile-css';
  if (watchOptions.cssCompileTask) {
    cssCompileTask = watchOptions.cssCompileTask;
  }
  return chokidar.watch([
      path.join(tarsConfig.fs.srcFolderName, tarsConfig.fs.staticFolderName, tarsConfig.cssPreprocessor, '**', '*.' + watchOptions.cssPreprocExtension),
      path.join(tarsConfig.fs.srcFolderName, tarsConfig.fs.staticFolderName, tarsConfig.cssPreprocessor, '**', '*.css')
    ], {
      ignored: '',
      persistent: true,
      ignoreInitial: true
    }).on('all', function (event, path) {
      watcherLog(event, path);
      gulp.start(cssCompileTask);

      if (gutil.env.ie8) {
        gulp.start('css:compile-css-for-ie8');
      }
    });
};