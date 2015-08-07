var gulp = require('gulp');
var size = require('gulp-size');
var gulpif = require('gulp-if');
// var notify = require('gulp-notify');
var tarsConfig = require('../../../tars-config');
// var notifier = require('../../helpers/notifier');
var catberryHelper = require('../../helpers/catberry-assest');
var path = require('path');
var debug = require('gulp-debug');
var rename = require('gulp-rename');

/**
 * Catberry modify files
 * @param  {object} buildOptions
 */
module.exports = function (buildOptions) {
  return gulp.task('html:dist', function () {
    return gulp.src(path.join(tarsConfig.fs.buildFolderName, '*.' + buildOptions.templateExtension))
      .pipe(rename(function (file) {
        file = catberryHelper.setDistFileName(file);
      }))
      .pipe(gulp.dest(tarsConfig.fs.componentFolderName))
      .pipe(gulpif(buildOptions.useDebug, debug({ title: 'html-dist' })))
      .pipe(size({ title: 'html-dist' }));
    // .pipe(
    //     notifier('Copy catberry components template!')
    // );
  });
};