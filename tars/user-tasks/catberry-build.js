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
};