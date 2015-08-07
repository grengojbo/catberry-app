var gulp = require('gulp');
var size = require('gulp-size');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
// var autoprefixer = require('gulp-autoprefixer');
// var replace = require('gulp-replace-task');
// var addsrc = require('gulp-add-src');
var notify = require('gulp-notify');
var tarsConfig = require('../../../tars-config');
var notifier = require('../../helpers/notifier');
// var catberryHelper = require('../../helpers/catberry-assest');
// var browserSync = require('browser-sync');
var catberryHelper = require('../../helpers/catberry-assest');
var path = require('path');
var debug = require('gulp-debug');
var cache = require('gulp-cached');
var useref = require('gulp-useref');
var csso = require('gulp-csso');
var revReplace = require('gulp-rev-replace');
var filter = require('gulp-filter');
var rev = require('gulp-rev');
var rename = require('gulp-rename');
var inline = require('gulp-inline');

/**
 * Catberry modify files
 * @param  {object} buildOptions
 */
module.exports = function (buildOptions) {
  return gulp.task('html:catberry-inline', function () {
    return gulp.src('.tmp/desktop/head.hbs')
      .pipe(inline({
        base: '.tmp/desktop/',
        css: csso()
      }))
      .pipe(rename(function (file) {
        file = catberryHelper.setDistFileName(file);
      }))
      .pipe(gulp.dest(tarsConfig.fs.componentFolderName))
      .pipe(gulpif(buildOptions.useDebug, debug({ title: 'html-catberry-inline' })))
      .pipe(rev.manifest())
      .pipe(gulp.dest(tarsConfig.fs.buildFolderName))
      .pipe(size({ title: 'html-catberry-inline' }))
      .pipe(
          notifier('Copy catberry components template!')
      );
  });
};