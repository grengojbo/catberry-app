'use strict';
var gulp = require('gulp');
var cache = require('gulp-cached');
var notify = require('gulp-notify');
var size = require('gulp-size');
var tarsConfig = require('../../../tars-config');
var notifier = require('../../helpers/notifier');
var path = require('path');
var debug = require('gulp-debug');
var ifs = require('gulp-if');

/**
 * Minify png and jpg images
 * @param  {object} buildOptions
 */
module.exports = function (buildOptions) {
  return gulp.task('css:dist', function (cb) {
    return gulp.src(path.join(tarsConfig.fs.buildFolderName, tarsConfig.fs.staticFolderName, 'css', '*-*.css'))
      .pipe(cache('css-dist'))
      .on('error', notify.onError(function (error) {
              return '\nAn error occurred while minifying raster css.\nLook in the console for details.\n' + error;
            }))
      .pipe(gulp.dest(path.join(tarsConfig.fs.distFolderName, tarsConfig.fs.staticFolderName, 'css')))
            .pipe(ifs(buildOptions.useDebug, debug({
              title: 'css-dist-debug'
            })))
            .pipe(size({
              title: 'css-dist'
            }))
            .pipe(
                notifier('Copy css files.')
            );
  });
};