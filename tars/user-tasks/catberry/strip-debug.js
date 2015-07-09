var gulp = require('gulp');
var size = require('gulp-size');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var stripDebug = require('gulp-strip-debug');
var notify = require('gulp-notify');
var tarsConfig = require('../../../tars-config');
var notifier = require('../../helpers/notifier');
var path = require('path');
var debug = require('gulp-debug');
var cache = require('gulp-cached');

require('../../tasks/js/check')();

/**
 * Catberry modify files
 * @param  {object} buildOptions
 */
module.exports = function (buildOptions) {
  var jsPaths = [
    path.join('.', tarsConfig.fs.srcFolderName, tarsConfig.fs.componentFolderName, '**', '*.js')
  ];
  if (tarsConfig.catberry.exclude) {
    tarsConfig.catberry.exclude.split(',').forEach(function (dir){
      jsPaths.push(path.join('!.', tarsConfig.fs.srcFolderName, tarsConfig.fs.componentFolderName, dir+'{,/**}'));
    });
  }
  var distDir = tarsConfig.fs.componentFolderName;
  // console.log(libPaths);
  return gulp.task('catberry:strip-debug', ['js:check'], function () {
    return gulp.src(jsPaths)
      .pipe(stripDebug())
      .on('error', notify.onError(function (error) {
        return '\nAn error occurred while stripping debug.\nLook in the console for details.\n' + error;
      }))
      // .pipe(cache('catberry-strip-debug'))
      // .on('error', notify.onError(function (error) {
      //   return '\nAn error occurred while concating js-files.\nLook in the console for details.\n' + error;
      //   })
      // )
      .pipe(gulp.dest(distDir))
      .pipe(gulpif(buildOptions.useDebug, debug({title: 'catberry:strip-debug'})))
      .pipe(size({title: 'catberry:strip-debug'}))
      .pipe(
          notifier('JS\'ve been linted and concatinated')
      );
  });
};