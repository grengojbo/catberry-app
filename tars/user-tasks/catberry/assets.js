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

var libPaths = [
  path.join('.', tarsConfig.fs.srcFolderName, tarsConfig.fs.componentFolderName, '**', 'assets')
    ];


/**
 * Catberry modify files
 * @param  {object} buildOptions
 */
module.exports = function (buildOptions) {
  // libPaths.push(path.join('!.', tarsConfig.fs.srcFolderName, tarsConfig.fs.componentFolderName, '**', 'assets'));
  if (tarsConfig.catberry.exclude) {
    tarsConfig.catberry.exclude.split(',').forEach(function (dir){
      libPaths.push(path.join('!.', tarsConfig.fs.srcFolderName, tarsConfig.fs.componentFolderName, dir+'{,/**}'));
    });
  }
  // libPaths.push(path.join('!.', tarsConfig.fs.srcFolderName, tarsConfig.fs.componentFolderName, '**', '*.'+buildOptions.templateExtension));
  console.log(libPaths);
  return gulp.task('catberry:assets', function () {
    return gulp.src(libPaths)
      .pipe(cache('catberry-assets'))
      .on('error', notify.onError(function (error) {
        return '\nAn error occurred while copy catberry assets.\nLook in the console for details.\n' + error;
        })
      )
      .pipe(gulp.dest(path.join(tarsConfig.fs.distFolderName, 'aaaaa')))
      // .pipe(gulp.dest(path.join(tarsConfig.fs.distFolderName, tarsConfig.fs.tmpFolderName, tarsConfig.fs.imagesFolderName)))
      .pipe(gulpif(buildOptions.useDebug, debug({title: 'catberry:assets'})))
      .pipe(size({title: 'catberry:assets'}))
      .pipe(
          notifier('Copy catberry assets!')
      );
    // var config = catberryHelper(false, 'src/catberry_components');
    // return gutil.log(gutil.colors.red('Copy Cattberry component files'));
  });
};