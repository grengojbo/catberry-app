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

    return gulp.task('copy:static', function (cb) {
        return gulp.src(path.join(tarsConfig.fs.staticFolderName, '**'))
            .pipe(cache('copy-static'))
            .on('error', notify.onError(function (error) {
                    return '\nAn error occurred while minifying raster images.\nLook in the console for details.\n' + error;
                })
            )
            .pipe(gulp.dest(path.join(tarsConfig.fs.distFolderName)))
            // .pipe(gulp.dest(path.join(tarsConfig.fs.distFolderName, tarsConfig.fs.tmpFolderName, tarsConfig.fs.imagesFolderName)))
            .pipe(ifs(buildOptions.useDebug, debug({title: 'copy:static-debug'})))
            .pipe(size({title: 'copy:static'}))
            .pipe(
                notifier('Copy static files')
            );
    });
};