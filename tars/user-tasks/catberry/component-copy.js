var gulp = require('gulp');
var size = require('gulp-size');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var notify = require('gulp-notify');
var tarsConfig = require('../../../tars-config');
var notifier = require('../../helpers/notifier');
var browserSync = require('browser-sync');
// var catberryHelper = require('../../helpers/catberry-assest');
var path = require('path');
var debug = require('gulp-debug');
var cache = require('gulp-cached');

var libPaths = [
  path.join('.', tarsConfig.fs.srcFolderName, tarsConfig.fs.componentFolderName, '**')
    ];

/**
 * Catberry modify files
 * @param  {object} buildOptions
 */
module.exports = function (buildOptions) {
  libPaths.push(path.join('!.', tarsConfig.fs.srcFolderName, tarsConfig.fs.componentFolderName, '**', '*.js'));
  if (tarsConfig.catberry.exclude) {
    tarsConfig.catberry.exclude.split(',').forEach(function (dir) {
      libPaths.push(path.join('!.', tarsConfig.fs.srcFolderName, tarsConfig.fs.componentFolderName, dir + '{,/**}'));
    });
  }
  libPaths.push(path.join('!.', tarsConfig.fs.srcFolderName, tarsConfig.fs.componentFolderName, '**', 'template.' + buildOptions.templateExtension));
  libPaths.push(path.join('!.', tarsConfig.fs.srcFolderName, tarsConfig.fs.componentFolderName, '**', tarsConfig.fs.assetsFolderName + '{,/**}'));
  // console.log(libPaths);
  return gulp.task('catberry:component-copy', function () {
    return gulp.src(libPaths)
      .pipe(cache('catberry-component-copy'))
      .on('error', notify.onError(function (error) {
        return '\nAn error occurred while copy catberry components files.\nLook in the console for details.\n' + error;
      })
    )
    .pipe(gulp.dest(tarsConfig.fs.componentFolderName))
    .pipe(browserSync.reload({ stream: true }))
    .pipe(gulpif(buildOptions.useDebug, debug({ title: 'catberry:component-copy' })))
    .pipe(size({ title: 'catberry:component-copy' }))
    .pipe(
        notifier('Copy catberry components files!')
    );
  });
};