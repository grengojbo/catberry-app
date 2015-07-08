
var gulp = require('gulp');
var size = require('gulp-size');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var autoprefixer = require('gulp-autoprefixer');
var replace = require('gulp-replace-task');
var addsrc = require('gulp-add-src');
var notify = require('gulp-notify');
var tarsConfig = require('../../../tars-config');
var notifier = require('../../helpers/notifier');
var catberryHelper = require('../../helpers/catberry-assest');
var browserSync = require('browser-sync');
var path = require('path');
var debug = require('gulp-debug');

/**
 * Catberry modify files
 * @param  {object} buildOptions
 */
module.exports = function (buildOptions) {
  return gulp.task('catberry:dev', function () {
    var config = catberryHelper(false, 'src/catberry_components');
    return gutil.log(gutil.colors.red('Copy Cattberry component files'));
  });
};