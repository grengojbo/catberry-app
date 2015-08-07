var gulp = require('gulp');
// var imagemin = require('gulp-imagemin');
// var changed = require('gulp-changed');
var cache = require('gulp-cached');
var notify = require('gulp-notify');
var size = require('gulp-size');
var tarsConfig = require('../../../tars-config');
var notifier = require('../../helpers/notifier');
var path = require('path');
// var pngquant = require('imagemin-pngquant');
var debug = require('gulp-debug');
var ifs = require('gulp-if');

/**
 * Minify png and jpg images
 * @param  {object} buildOptions
 */
module.exports = function (buildOptions) {

  var srcPath = path.join(tarsConfig.fs.srcFolderName, tarsConfig.fs.staticFolderName, '{font,fonts,js}', '**');
  return gulp.task('copy:other', function (cb) {
    return gulp.src(srcPath)
      .pipe(cache('copy-other'))
            .on('error', notify.onError(function (error) {
              return '\nAn error occurred while minifying raster images.\nLook in the console for details.\n' + error;
            })
        )
        .pipe(gulp.dest(path.join(tarsConfig.fs.distFolderName, tarsConfig.fs.staticFolderName)))
        .pipe(ifs(buildOptions.production, gulp.dest(path.join(tarsConfig.fs.buildFolderName, tarsConfig.fs.staticFolderName))))
        .pipe(ifs(buildOptions.useDebug, debug({ title: 'copy:other-debug ' + srcPath })))
        .pipe(size({ title: 'copy:other' }))
        .pipe(
            notifier('Copy other files')
        );
  });
};