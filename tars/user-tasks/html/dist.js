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

function setDistFileName (arg) {
  var dir = '/'+arg.basename;
  var file = arg.basename.split('_');
  if (file[1] !== undefined) {
    dir = '/'+file[0]+'/'+file[1];
  }
  arg.basename = 'template';
  arg.dirname = dir;
  // console.log(dir.length);
  return arg;
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
  return gulp.task('html:dist', function () {
    return gulp.src(path.join(tarsConfig.fs.buildFolderName, '*.'+buildOptions.templateExtension))
      .pipe(rename(function (file) {
        file = setDistFileName(file);
      }))
      .pipe(gulp.dest('.aaa'))
      .pipe(gulpif(buildOptions.useDebug, debug({title: 'html-dist'})))
      .pipe(size({title: 'html-dist'}))
      // .pipe(
      //     notifier('Copy catberry components template!')
      // );
  });
};