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
  return gulp.task('catberry:component-js', ['js:check'], function () {
    return gulp.src(jsPaths)
      .pipe(cache('catberry-component-js'))
      .on('error', notify.onError(function (error) {
        return '\nAn error occurred while concating js-files.\nLook in the console for details.\n' + error;
        })
      )
      .pipe(gulp.dest(distDir))
      // .pipe(gulp.dest(path.join(tarsConfig.fs.distFolderName, tarsConfig.fs.tmpFolderName, tarsConfig.fs.imagesFolderName)))
      .pipe(gulpif(buildOptions.useDebug, debug({title: 'catberry:component-js'})))
      .pipe(size({title: 'catberry:component-js'}))
      .pipe(
          notifier('JS\'ve been linted and concatinated')
      );
    // var config = catberryHelper(false, 'src/catberry_components');
    // return gutil.log(gutil.colors.red('Copy Cattberry component files'));
  });
};