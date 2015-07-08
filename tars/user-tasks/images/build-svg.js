var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var changed = require('gulp-changed');
var gutil = require('gulp-util');
var notify = require('gulp-notify');
var tarsConfig = require('../../../tars-config');
var notifier = require('../../helpers/notifier');
var size = require('gulp-size');
var path = require('path');
var debug = require('gulp-debug');
var ifs = require('gulp-if');

/**
 * Minify svg-images (optional task)
 * @param  {object} buildOptions
 */
module.exports = function (buildOptions) {

    return gulp.task('images:build-svg', function (cb) {
        if (tarsConfig.useSVG) {
            return gulp.src(path.join(tarsConfig.fs.srcFolderName, tarsConfig.fs.staticFolderName, tarsConfig.fs.imagesFolderName, '**', '*.svg'))
                // .pipe(changed(
                //         'dev/' + tarsConfig.fs.staticFolderName + '/' + tarsConfig.fs.imagesFolderName + '/minified-svg',
                //         {
                //             hasChanged: changed.compareLastModifiedTime,
                //             extension: '.svg'
                //         }
                //     )
                // )
                .pipe(imagemin(
                        {
                            svgoPlugins: [
                                { cleanupIDs: false },
                                { removeViewBox: false },
                                { convertPathData: false },
                                { mergePaths: false }
                            ],
                            use: []
                        }
                    )
                )
                .on('error', notify.onError(function (error) {
                    return '\nAn error occurred while minifying svg.\nLook in the console for details.\n' + error;
                }))
                .pipe(gulp.dest(path.join(tarsConfig.fs.distFolderName, tarsConfig.fs.staticFolderName, tarsConfig.fs.imagesFolderName)))
                .pipe(gulp.dest(path.join(tarsConfig.fs.buildFolderName, tarsConfig.fs.tmpFolderName, tarsConfig.fs.imagesFolderName)))
                .pipe(ifs(buildOptions.useDebug, debug({title: 'images:build-svg-debug'})))
                .pipe(size({title: 'images:build-svg'}))
                .pipe(
                    notifier('SVG\'ve been minified')
                );
        } else {
            gutil.log('!SVG is not used!');
            cb(null);
        }
    });
};