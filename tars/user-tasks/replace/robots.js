var gulp = require('gulp');
// var notify = require('gulp-notify');
var size = require('gulp-size');
var tarsConfig = require('../../../tars-config');
// var notifier = require('../../helpers/notifier');
var path = require('path');
var debug = require('gulp-debug');
var gulpif = require('gulp-if');
var replace = require('gulp-replace-task');
var pkg = require('../../../package');
var catConfig = require('../../../config/environment.json');

/**
 * Minify png and jpg images
 * @param  {object} buildOptions
 */
module.exports = function (buildOptions) {

    return gulp.task('replace:robots', function (cb) {
        var file = 'robots.txt';
        return gulp.src(path.join(tarsConfig.fs.srcFolderName, tarsConfig.fs.templatesFolderName, file))
            .pipe(replace({
                patterns: [
                    {
                        match: 'author',
                        replacement: pkg.author.name
                    },
                    {
                        match: 'domain',
                        replacement: catConfig.domain
                    },
                    {
                        match: 'url',
                        replacement: catConfig.siteUrl
                    }
                ]
            }))
            .pipe(gulp.dest(tarsConfig.fs.distFolderName))
            .pipe(gulpif(buildOptions.useDebug, debug({title: 'replace-' + file + '-debug'})))
            .pipe(size({title: 'replace: ' + file}));
            // .pipe(
            //     notifier('Copy css files.')
            // );
    });
};