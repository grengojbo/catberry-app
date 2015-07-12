var gulp = require('gulp');
// var tarsConfig = require('../../tars-config');
var bg = require('gulp-bg');

/**
 * Task description
 * @param  {object} buildOptions
 */
module.exports = function (buildOptions) {
  return gulp.task('catberry-release', bg('node', './build.js', 'release'));
  // return gulp.task('catberry-release', bg('node', './build.js'));
};