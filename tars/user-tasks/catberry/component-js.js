'use strict';

var gulp = require('gulp');
var size = require('gulp-size');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var notify = require('gulp-notify');
var tarsConfig = require('../../../tars-config');
var notifier = require('../../helpers/notifier');
var path = require('path');
var debug = require('gulp-debug');
var cache = require('gulp-cached');
var babel = require('gulp-babel');

/**
 * Catberry modify files
 * @param  {object} buildOptions
 */
module.exports = function (buildOptions) {
  require('../../tasks/js/check')(buildOptions);
  var distDir = tarsConfig.fs.componentFolderName;
  var jsPaths = [
    path.join('.', tarsConfig.fs.srcFolderName, distDir, '**', '*.js')
  ];
  if (tarsConfig.catberry.exclude) {
    tarsConfig.catberry.exclude.split(',').forEach(function (dir) {
      jsPaths.push(path.join('!.', tarsConfig.fs.srcFolderName, distDir, dir + '{,/**}'));
    });
  }
  return gulp.task('catberry:component-js', ['js:check'], function () {
    return gulp.src(jsPaths)
      .pipe(cache('catberry-component-js'))
      .on('error', notify.onError(function (error) {
        return '\nAn error occurred while concating js-files.\nLook in the console for details.\n' + error;
      }))
      .pipe(gulpif(tarsConfig.es6_transpile, babel()))
      .on('error', notify.onError(function (error) {
        return '\nAn error occurred while transpiling es6 js-files.\nLook in the console for details.\n' + error;
      }))
      .pipe(gulp.dest(distDir))
      .pipe(gulpif(buildOptions.useDebug, debug({
        title: 'catberry:component-js-debug'
      })))
      .pipe(size({
        title: 'catberry:component-js'
      }))
      .pipe(
        notifier('JS\'ve been linted and concatinated')
    );
  });
};