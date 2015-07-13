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
  var libPaths = [
    path.join('.', tarsConfig.fs.componentFolderName, '**', 'template.' + buildOptions.templateExtension)
  ];
  if (tarsConfig.catberry.exclude) {
    tarsConfig.catberry.exclude.split(',').forEach(function (dir) {
      libPaths.push(path.join('!.', tarsConfig.fs.componentFolderName, dir + '{,/**}'));
    });
  }
  return gulp.task('copy:inline', function () {
    return gulp.src(libPaths)
      .pipe(rename(function (file) {
        file.basename = catberryHelper.setBuildFileName(file);
        file.dirname = '/';
      }))
      .pipe(gulp.dest(path.join('.tmp', 'desktop')))
      .pipe(gulpif(buildOptions.useDebug, debug({ title: 'copy-inline' })))
      .pipe(size({ title: 'copy-inline' }));
    // .pipe(
    //     notifier('Copy catberry components template!')
    // );
  });
};