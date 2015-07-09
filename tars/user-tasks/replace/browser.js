var gulp = require('gulp');
// var notify = require('gulp-notify');
var size = require('gulp-size');
var tarsConfig = require('../../../tars-config');
// var notifier = require('../../helpers/notifier');
var path = require('path');
var debug = require('gulp-debug');
var gulpif = require('gulp-if');
var replace = require('gulp-replace-task');
// var pkg = require('../../../package');

/**
 * Minify png and jpg images
 * @param  {object} buildOptions
 */
module.exports = function (buildOptions) {

    return gulp.task('replace:browser', function (cb) {
        var file = 'browser.json';
        var isRelease = false;
        var isProductionEnvironment = false;
        var logLevels = tarsConfig.catberry.dev.levelsBrowser;
        if (buildOptions.production) {
            isRelease = true;
            isProductionEnvironment = true;
            logLevels = tarsConfig.catberry.prod.levelsBrowser;
        }
        return gulp.src(path.join(tarsConfig.fs.srcFolderName, tarsConfig.fs.configFolderName, file))
            .pipe(replace({
                patterns: [
                    {
                        match: 'loglevels',
                        replacement: logLevels
                    },
                    {
                        match: 'isrelease',
                        replacement: isRelease
                    },
                    {
                        match: 'isproduction',
                        replacement: isProductionEnvironment
                    }
                ]
            }))
            .pipe(gulp.dest(tarsConfig.fs.configFolderName))
            .pipe(gulpif(buildOptions.useDebug, debug({title: 'replace-' + file + '-debug'})))
            .pipe(size({title: 'replace: ' + file}));
            // .pipe(
            //     notifier('Copy css files.')
            // );
    });
};