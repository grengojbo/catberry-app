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
var useref = require('gulp-useref');
var csso = require('gulp-csso');
var revReplace = require('gulp-rev-replace');
var filter = require('gulp-filter');
var rev = require('gulp-rev');
var rename = require("gulp-rename");

function setBuildFileName (arg) {
  var dir = [];
  var file = [];
  var res = arg.dirname;
  dir = arg.dirname.split('/');
  if (dir[1] !== undefined) {
    res = dir[0]+'_'+dir[1];
  }
  // console.log(dir.length);
  return res;
}

/**
 * Catberry modify files
 * @param  {object} buildOptions
 */
module.exports = function (buildOptions) {
  var libPaths = [
    path.join('.', tarsConfig.fs.srcFolderName, tarsConfig.fs.componentFolderName, '**', 'template.'+buildOptions.templateExtension)
  ];
  if (tarsConfig.catberry.exclude) {
    tarsConfig.catberry.exclude.split(',').forEach(function (dir){
      libPaths.push(path.join('!.', tarsConfig.fs.srcFolderName, tarsConfig.fs.componentFolderName, dir+'{,/**}'));
    });
  }
  return gulp.task('html:build', function () {
    return gulp.src(libPaths)
      .pipe(rename(function (file) {
        file.basename = setBuildFileName(file);
        file.dirname = '/';
      }))
      .pipe(gulp.dest('.dev'))
      .pipe(gulpif(buildOptions.useDebug, debug({title: 'html-build'})))
      .pipe(size({title: 'html-build'}))
      // .pipe(
      //     notifier('Copy catberry components template!')
      // );
  });
};