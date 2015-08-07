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
var rename = require('gulp-rename');

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
  return gulp.task('html:catberry', function () {
    var assets = useref.assets({ searchPath: '{build,static,src,public}' });
    // var cssFilter = filter(tarsConfig.fs.buildFolderName+'/**/*.css');
    // var userefAssets = useref.assets();
    // console.log(cssFilter);
    return gulp.src('.dev/*.hbs')
      // .pipe(cache('html-catberry'))
      // .on('error', notify.onError(function (error) {
        // return '\nAn error occurred while copy catberry components template.\nLook in the console for details.\n' + error;
        // })
      // )
      .pipe(assets)
      // .pipe(userefAssets) // 1
      // .pipe(cssFilter) // 2
      .pipe(gulpif('*.css', csso()))
      .pipe(rev())                // Rename the concatenated files
      .pipe(assets.restore())
      // .pipe(cssFilter.restore()) // 3
      // .pipe(userefAssets.restore()) // 4
      .pipe(useref())
      .pipe(revReplace())
      .pipe(gulp.dest(tarsConfig.fs.buildFolderName))
      .pipe(gulpif(buildOptions.useDebug, debug({ title: 'html-catberry' })))
      .pipe(rev.manifest())
      .pipe(gulp.dest(tarsConfig.fs.buildFolderName))
      .pipe(size({ title: 'html-catberry' }))
      .pipe(
          notifier('Copy catberry components template!')
      );
  });
};