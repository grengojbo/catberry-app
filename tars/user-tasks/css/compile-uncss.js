var gulp = require('gulp');
// var concat = require('gulp-concat');
// var sass = require('gulp-sass');
var sass = require('gulp-ruby-sass');
var size = require('gulp-size');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var autoprefixer = require('gulp-autoprefixer');
var replace = require('gulp-replace-task');
var addsrc = require('gulp-add-src');
var notify = require('gulp-notify');
var tarsConfig = require('../../../tars-config');
var notifier = require('../../helpers/notifier');
var browserSync = require('browser-sync');
var path = require('path');
var debug = require('gulp-debug');
var sourcemaps = require('gulp-sourcemaps');
var uncss = require('gulp-uncss');

var useAutoprefixer = false;
var helperStream;
var mainStream;
var ie9Stream;

if (tarsConfig.autoprefixerConfig) {
  useAutoprefixer = true;
}

/**
 * Scss compilation
 * @param  {object} buildOptions
 */
module.exports = function (buildOptions) {
  return gulp.task('css:compile-uncss', function () {
    return gulp.src(path.join(tarsConfig.fs.buildFolderName, tarsConfig.fs.staticFolderName, 'css', 'home-*.css'))
    .pipe(
      uncss({
        options: {
          htmlroot: '/Users/jbo/src/catberry-app/build/',
          report: true
        },
        // html: '/Users/jbo/src/catberry-app/build/index.html'
        html: path.join(tarsConfig.fs.buildFolderName, 'index.html')
      })
    )
    // .pipe(gulp.dest('.dev'))
    // .pipe(gulp.dest(path.join(tarsConfig.fs.distFolderName, tarsConfig.fs.tmpFolderName, 'css')))
    .pipe(gulp.dest(path.join(tarsConfig.fs.distFolderName, tarsConfig.fs.staticFolderName, 'css')))
    .pipe(
      gulpif(buildOptions.useDebug,
        debug(
          {
            title: 'css:compile-uncss'
          }
        )
      )
    )
    .pipe(size({ title: 'css:compile-uncss' }))
    .pipe(browserSync.reload({ stream: true }))
    .pipe(
      notifier('Scss-files\'ve been compiled')
    );
  });
};