var gulp = require('gulp');
var concat = require('gulp-concat');
// var sass = require('gulp-sass');
var sass = require('gulp-ruby-sass')
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

    return gulp.task('css:compile', function () {
        return sass(path.join(tarsConfig.fs.srcFolderName, tarsConfig.fs.staticFolderName, 'scss'),
                {
                    sourcemap: true,
                    lineNumbers: true,
                    style: 'expanded',
                    container: 'css:compile'
                }
            )
            .on('error', function(error) {
                notify().write('\nAn error occurred while compiling css.\nLook in the console for details.\n');
                return gutil.log(gutil.colors.red(error.message + ' on line ' + error.line + ' in ' + error.file));
            })
            .pipe(
                gulpif(useAutoprefixer,
                    autoprefixer(
                        {
                            browsers: tarsConfig.autoprefixerConfig,
                            cascade: true
                        }
                    )
                )
            )
            .on('error', notify.onError(function (error) {
                return '\nAn error occurred while autoprefixing css.\nLook in the console for details.\n' + error;
            }))
            .pipe(sourcemaps.write('/', {
                includeContent: false,
                sourceRoot: path.join(tarsConfig.fs.srcFolderName, tarsConfig.fs.staticFolderName, 'scss')
            }))
            .pipe(gulp.dest(path.join(tarsConfig.fs.distFolderName, tarsConfig.fs.tmpFolderName, 'css')))
            .pipe(gulp.dest(path.join(tarsConfig.fs.distFolderName, tarsConfig.fs.staticFolderName, 'css')))
            .pipe(
                gulpif(buildOptions.useDebug,
                    debug(
                        {
                            title: 'css:compile'
                        }
                    )
                )
            )
            .pipe(size({title: 'css:compile'}))
            .pipe(browserSync.reload({ stream: true }))
            .pipe(
                notifier('Scss-files\'ve been compiled')
            );
    });
};