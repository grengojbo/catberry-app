var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var changed = require('gulp-changed');
var notify = require('gulp-notify');
var size = require('gulp-size');
var tarsConfig = require('../../../tars-config');
var notifier = require('../../helpers/notifier');
var path = require('path');
var pngquant = require('imagemin-pngquant');
var debug = require('gulp-debug');
var ifs = require('gulp-if');

/**
 * Minify png and jpg images
 * @param  {object} buildOptions
 */
module.exports = function (buildOptions) {

    return gulp.task('images:build', function (cb) {
        return gulp.src(path.join(tarsConfig.fs.srcFolderName, tarsConfig.fs.staticFolderName, tarsConfig.fs.imagesFolderName, '**', '*.{png,jpg}'))
            .pipe(imagemin({
                progressive: true,
                interlaced: true,
                svgoPlugins: [{removeViewBox: false}],
                use: [pngquant()]
            }))
            .on('error', notify.onError(function (error) {
                    return '\nAn error occurred while minifying raster images.\nLook in the console for details.\n' + error;
                })
            )
            .pipe(gulp.dest(path.join(tarsConfig.fs.distFolderName, tarsConfig.fs.staticFolderName, tarsConfig.fs.imagesFolderName)))
            .pipe(gulp.dest(path.join(tarsConfig.fs.buildFolderName, tarsConfig.fs.staticFolderName, tarsConfig.fs.imagesFolderName)))
            .pipe(ifs(buildOptions.useDebug, debug({title: 'images:build-debug'})))
            .pipe(size({title: 'images:build'}))
            .pipe(
                notifier('Rastered images\'ve been minified')
            );
    });
};