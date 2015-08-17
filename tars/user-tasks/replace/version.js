var gulp = require('gulp');
// var notify = require('gulp-notify');
var size = require('gulp-size');
var tarsConfig = require('../../../tars-config');
// var notifier = require('../../helpers/notifier');
var path = require('path');
var debug = require('gulp-debug');
var gulpif = require('gulp-if');
var replace = require('gulp-replace-task');

/**
 * Minify png and jpg images
 * @param  {object} buildOptions
 */
module.exports = function (buildOptions) {
  return gulp.task('replace:version', function (cb) {
    var file = 'VERSION';
    var pkg = require('../../../package');
    return gulp.src(path.join(tarsConfig.fs.srcFolderName, tarsConfig.fs.templatesFolderName, file))
            .pipe(replace({
              patterns: [
                    {
                      match: 'version',
                      replacement: pkg.version
                    }
                ]
            }))
            .pipe(gulp.dest('./'))
            .pipe(gulpif(buildOptions.useDebug, debug({ title: 'replace-' + file + '-debug' })))
            .pipe(size({ title: 'replace: ' + file + ' | version: ' + pkg.version }));
    // .pipe(
    //     notifier('Copy css files.')
    // );
  });
};