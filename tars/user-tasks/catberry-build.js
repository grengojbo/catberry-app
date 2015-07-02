// This is example of task function

var gulp = require('gulp');
var notify = require('gulp-notify');
var notifier = require('../helpers/notifier');
var tarsConfig = require('../../tars-config');
// var shell = require('gulp-shell');
var bg = require("gulp-bg");
// Include browserSync, if you need to reload browser
// var browserSync = require('browser-sync');

// require('./ path to task file, which have to be done before current task');
// require('./required-task-name');

/**
 * Task description
 * @param  {object} buildOptions
 */
module.exports = function (buildOptions) {

    return gulp.task('catberry-build', bg('node', './build.js'));
    // return gulp.task('catberry-build', /*['required-task-name'],*/ function (cb) {
    //     return gulp.src('*.js', {read: false})
    //         // Do stuff here
    //         .on('error', notify.onError(function (error) {
    //             return '\nAn error occurred while something.\nLook in the console for details.\n' + error;
    //         }))
    //         .pipe(shell(['node ./build.js']))
    //         .pipe(
    //             // You can change text of success message
    //             notifier('Catberry build.js is finished')
    //             // if you need notify after each file will be processed, you have to use
    //             // notifier('Example task is finished', false)
    //         );

    //     // You can return callback, if you can't return pipe
    //     // cb(null);
    // });
};