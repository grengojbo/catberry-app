'use strict';

var config = require('./config/build.config.js');
var gulp = require('gulp'),
	path = require('path');
var $ = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var pkg = require('./package');
var del = require('del');
var sourcemaps = require('gulp-sourcemaps');

//clean temporary directories
gulp.task('clean', del.bind(null, [config.tmp, 'build']));

gulp.task('sass:home', function() {
  return $.rubySass(config.homeScss, {sourcemap: true, lineNumbers: true, style: 'expanded', container: 'sass-home'})
    .on('error', function(err) {
      console.log(err.message);
    })
    // .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
    // .pipe(autoprefixer('last 10 versions'))
    .pipe($.autoprefixer())
    // .pipe(sourcemaps.write())
    .pipe(sourcemaps.write('/', {includeContent: false, sourceRoot: config.homeScss}))
    .pipe(gulp.dest(config.tmp + '/css'))
    .pipe($.size({title: 'sass home'}));
});

gulp.task('sass:main', function() {
  return $.rubySass(config.mainScss, {sourcemap: true, lineNumbers: true, style: 'expanded', container: 'sass-main'})
    .on('error', function(err) {
      console.log(err.message);
    })
    // .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
    // .pipe(autoprefixer('last 10 versions'))
    .pipe($.autoprefixer())
    // .pipe(sourcemaps.write())
    .pipe(sourcemaps.write('/', {includeContent: false, sourceRoot: config.mainScss}))
    .pipe(gulp.dest(config.tmp + '/css'))
    .pipe($.size({title: 'sass main'}));
});

gulp.task('sass:mobile', function() {
  return $.rubySass(config.mobileScss, {sourcemap: true, lineNumbers: true, style: 'expanded', container: 'sass-mobile'})
    .on('error', function(err) {
      console.log(err.message);
    })
    // .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
    // .pipe(autoprefixer('last 10 versions'))
    .pipe($.autoprefixer())
    // .pipe(sourcemaps.write())
    .pipe(sourcemaps.write('/', {includeContent: false, sourceRoot: config.mobileScss}))
    .pipe(gulp.dest(config.tmp + '/css'))
    .pipe($.size({title: 'sass mobile'}));
});

gulp.task('copy:static', function () {
    return gulp.src(path.join('static', '**'))
        .pipe(gulp.dest(config.dist))
    .pipe($.size({title: 'copy static'}));
});

gulp.task('copy-static', function () {
	return gulp.src(path.join('static', '**'))
		.pipe(gulp.dest(config.dist))
    .pipe($.size({title: 'copy old static'}));
});

gulp.task('copy:head', function () {
    return gulp.src(path.join(config.templates, 'head', '*.hbs'))
        .pipe(gulp.dest(path.join(config.cat, 'head')))
    .pipe($.size({title: 'copy head.hbs'}));
});

gulp.task('html:head', function() {
  var assets = $.useref.assets({searchPath: '{static,src,public}'});

  return gulp.src(config.templates + '/head/head.hbs')
    // .pipe(fileinclude({prefix: '@@', basepath: '@file'}))
    .pipe(assets)
    // .pipe($.if(config.map, sourcemaps.init()))
    // .pipe($.if('**/*main.js', $.uglify({mangle: false})))
    .pipe($.if('*.css', $.csso()))
    // .pipe($.if(['**/*main.js', '**/*main.css'], $.header(config.banner, {pkg: pkg})))
    .pipe($.rev())
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    // .pipe($.if('*.html', $.minifyHtml({empty: true})))
    // .pipe($.if(config.map, sourcemaps.write()))
    .pipe(gulp.dest(config.distTmp))
    .pipe($.size({title: 'html head'}));
});

// gulp.task('include', function() {
//   gulp.src([config.templates + '/index.html'])
//     .pipe(fileinclude({prefix: '@@', basepath: '@file'}))
//     .pipe(gulp.dest(config.base + '/'))
//     .pipe($.size({
//       title: 'include'
//     }));
// });

gulp.task('default', ['copy-static']);
gulp.task('release', ['build', 'html:head']);
gulp.task('server', ['build', 'copy:head']);
gulp.task('build', ['clean'], function(cb) {
  runSequence(['sass:main', 'sass:mobile', 'sass:home', 'copy-static'], cb);
});
// gulp.task('build', ['sassHome', 'sassMain', 'sassMobile', 'copy-static']);
