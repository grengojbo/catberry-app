var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var changed = require('gulp-changed');
var notify = require('gulp-notify');
var size = require('gulp-size');
var tarsConfig = require('../../tars-config');
var notifier = require('../helpers/notifier');
var path = require('path');
var pngquant = require('imagemin-pngquant');

/**
 * Minify png and jpg images
 * @param  {object} buildOptions
 */
module.exports = function (buildOptions) {

    return gulp.task('images:dist', function (cb) {
        return gulp.src(path.join(tarsConfig.fs.srcFolderName, tarsConfig.fs.staticFolderName, tarsConfig.fs.imagesFolderName, '**', '*.{png,jpg}'))
            // .pipe(changed('./dev/' + tarsConfig.fs.staticFolderName + '/' + tarsConfig.fs.imagesFolderName + '/'))
            // .pipe(changed('images:dist'))
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
            .pipe(size({title: 'images:dist'}))
            .pipe(
                notifier('Rastered images\'ve been minified')
            );
    });
};