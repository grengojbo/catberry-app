'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
// var gulpif = require('gulp-if');
var jshint = require('gulp-jshint');
var cache = require('gulp-cached');
var jscs = require('gulp-jscs');
var notify = require('gulp-notify');
var tarsConfig = require('../../../tars-config');
// var debug = require('gulp-debug');
var path = require('path');
// var fixmyjs = require('gulp-fixmyjs');

var jsPathsToLint = [
  path.join('.', tarsConfig.fs.srcFolderName, tarsConfig.fs.componentStoresFolderName, '**', '*.js')
];

/**
 * Check JS for style and errors (optional task)
 * @param  {object} buildOptions
 */
module.exports = function (buildOptions) {

  return gulp.task('js:check-stores', function (cb) {
    if (tarsConfig.useJsLintAndHint) {
      return gulp.src(jsPathsToLint)
        .pipe(cache('hinting-stores'))
        .pipe(jshint())
        // .pipe(fixmyjs())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jscs({
          fix: true
        }))
        // .pipe(jscs())
        .on('error', notify.onError(function (error) {
          return 'An error occurred while checking js.\nLook in the console for details.\n';
        }))
        .pipe(gulp.dest(path.join(tarsConfig.fs.srcFolderName, tarsConfig.fs.componentStoresFolderName)));
        // .pipe(debug({
        //   title: 'js:check'
        // }));

    } else {
      gutil.log('!JS-style-check and hinting is not used!');
      cb(null);
    }
  });
};