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
var path = require('path');
var debug = require('gulp-debug');
var cache = require('gulp-cached');

/**
 * Catberry modify files
 * @param  {object} buildOptions
 */
module.exports = function (buildOptions) {
  var libPaths = [
    path.join('.', tarsConfig.fs.srcFolderName, tarsConfig.fs.componentFolderName, '**', 'template.' + buildOptions.templateExtension)
  ];
  if (tarsConfig.catberry.exclude) {
    tarsConfig.catberry.exclude.split(',').forEach(function (dir) {
      libPaths.push(path.join('!.', tarsConfig.fs.srcFolderName, tarsConfig.fs.componentFolderName, dir + '{,/**}'));
    });
  }
  return gulp.task('catberry:component-dev', function () {
    return gulp.src(libPaths)
      .pipe(cache('catberry-component-dev'))
      .on('error', notify.onError(function (error) {
        return '\nAn error occurred while copy catberry components template.\nLook in the console for details.\n' + error;
      })
    )
    .pipe(gulp.dest(tarsConfig.fs.componentFolderName))
    // .pipe(gulp.dest(path.join(tarsConfig.fs.distFolderName, tarsConfig.fs.tmpFolderName, tarsConfig.fs.imagesFolderName)))
    .pipe(gulpif(buildOptions.useDebug, debug({ title: 'catberry:component-dev' })))
    .pipe(size({ title: 'catberry:component-dev' }))
    .pipe(
        notifier('Copy catberry components template!')
    );
    // var config = catberryHelper(false, 'src/catberry_components');
    // return gutil.log(gutil.colors.red('Copy Cattberry component files'));
  });
};