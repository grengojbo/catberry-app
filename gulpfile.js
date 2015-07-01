'use strict';

var config = require('./config/build.config.js');
var catConfig = require('./config/environment.json');
var gulp = require('gulp'),
	path = require('path');
var $ = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var pkg = require('./package');
var del = require('del');
var sourcemaps = require('gulp-sourcemaps');
var pngquant = require('imagemin-pngquant');
var rename = require("gulp-rename");
var replace = require('gulp-replace-task');

var hbAttrWrapOpen = /\{\{#[^}]+\}\}/;
var hbAttrWrapClose = /\{\{\/[^}]+\}\}/;
var hbAttrWrapPair = [hbAttrWrapOpen, hbAttrWrapClose];

//clean temporary directories
gulp.task('clean', del.bind(null, [config.tmp, 'build']));

gulp.task('clean:vendor', del.bind(null, [
    path.join(config.assets, 'vendor', '**'),
    path.join(config.assets, 'scss', '**')
]));

gulp.task('clean:tmp', del.bind(null, [
    path.join(config.tmp, 'scss'),
    path.join(config.tmp, 'vendor', '**'),
    path.join(config.assets, 'css', '{'+config.revCss+'}-*.css'),
    path.join(config.assets, 'vendor', '**'),
    path.join(config.assets, 'scss', '**'),
    path.join(config.assets, 'images', '**'),
    path.join(config.distTmp, 'static', 'vendor', '**'),
    path.join(config.distTmp, 'static', 'scss')
]));

gulp.task('replace:version', function() {
  var file = 'VERSION';
  return gulp.src(path.join(config.templates, file))
    .pipe(replace({
      patterns: [
        {
          match: 'version',
          replacement: pkg.version
        }
      ]
    }))
    .pipe(gulp.dest('.'))
    .pipe($.size({title: 'replace: '+file+' | version: '+pkg.version}));
});

gulp.task('replace:humans', function() {
  var file = 'humans.txt';
  return gulp.src(path.join(config.templates, file))
    .pipe(replace({
      patterns: [
        {
          match: 'author',
          replacement: pkg.author.name
        }
      ]
    }))
    .pipe(gulp.dest(config.dist))
    .pipe($.size({title: 'replace: '+file}));
});

gulp.task('replace:robots', function() {
  var file = 'robots.txt';
  return gulp.src(path.join(config.templates, file))
    .pipe(replace({
      patterns: [
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
    .pipe(gulp.dest(config.dist))
    .pipe($.size({title: 'replace: '+file}));
});

gulp.task('images', function() {
  return gulp.src(config.base + config.images)
    .pipe($.imagemin({
      progressive: true,
      interlaced: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    // .pipe(gulp.dest(config.tmp + '/images'))
    .pipe(gulp.dest(config.assets + '/images'))
    .pipe($.size({title: 'images'}));
});

// TODO: delete
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

// TODO: delete
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

// TODO: delete
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

// TODO: delete
gulp.task('sass:photoswipe', function() {
  return $.rubySass(path.join('src', 'static', 'scss', 'photoswipe.scss'), {sourcemap: false, lineNumbers: true, style: 'expanded', container: 'sass-photoswipe'})
    .on('error', function(err) {
      console.log(err.message);
    })
    .pipe($.autoprefixer())
    // .pipe(sourcemaps.write())
    // .pipe(sourcemaps.write('/', {includeContent: false, sourceRoot: config.mobileScss}))
    .pipe(rename('styles.css'))
    // .pipe(gulp.dest(path.join('catberry_components', 'elements', 'photoswipe', 'assets', 'less')))
    .pipe(gulp.dest(path.join('catberry_components', 'elements', 'photoswipe', 'assets', 'css')))
    .pipe($.size({title: 'sass photoswipe'}));
});

gulp.task('sass:dev', function() {
  return $.rubySass(path.join('src', 'static', 'scss'), {sourcemap: true, lineNumbers: true, style: 'expanded', container: 'sass-devv'})
    .on('error', function(err) {
      console.log(err.message);
    })
    .pipe($.autoprefixer())
    .pipe(sourcemaps.write('/', {includeContent: false, sourceRoot: path.join('src', 'static', 'scss')}))
    .pipe(gulp.dest(path.join(config.tmp, 'css')))
    .pipe($.size({title: 'sass dev'}));
});


gulp.task('copy:tmp', function () {
    return gulp.src(['!' + path.join('src', 'static', 'scss', '**'), path.join('src', 'static', '**')])
        .pipe(gulp.dest(config.tmp))
    .pipe($.size({title: 'copy tmp'}));
});

gulp.task('copy:static', function () {
    return gulp.src(['!' + path.join('src', 'static', 'scss', '**'), path.join('src', 'static', '**')])
        .pipe(gulp.dest(path.join(config.dist, 'static')))
    .pipe($.size({title: 'copy static'}));
});

gulp.task('copy:build', function () {
    return gulp.src(['!' + path.join('src', 'static', 'scss', '**'), path.join('src', 'static', '**')])
        .pipe(gulp.dest(path.join(config.distTmp, 'static')))
    .pipe($.size({title: 'copy build'}));
});

gulp.task('copy:dist', function () {
  return gulp.src(config.distTmp+'/static/{'+config.dirs+'}/**')
    .pipe($.if(config.debug, $.debug({title: 'copy-dist-debug'})))
    .pipe(gulp.dest(config.assets))
    .pipe($.size({title: 'copy dist'}));
});

gulp.task('copy:css', ['sass:dev'], function () {
  return gulp.src(path.join(config.tmp, 'css', '**'))
    .pipe(gulp.dest(path.join(config.distTmp, 'static', 'css')))
    .pipe($.size({title: 'copy css'}));
});

gulp.task('copy:dev', ['sass:dev'], function () {
    return gulp.src(path.join(config.tmp, 'css', '**'))
        .pipe(gulp.dest(path.join(config.assets, 'css')))
    .pipe($.size({title: 'copy css'}));
});

// TODO: delete
gulp.task('copy-static', function () {
	return gulp.src(path.join('static', '**'))
		.pipe(gulp.dest(config.dist))
    .pipe($.size({title: 'copy old static'}));
});

gulp.task('copy:components', ['copy:dev'], function () {
  return gulp.src(config.templates+'/{'+config.tpl+'}.hbs')
    .pipe(rename(function (path) {
      path.dirname += '/'+path.basename;
      path.basename = 'template';
    }))
    .pipe($.if(config.debug, $.debug({title: 'copy-components-debug'})))
    .pipe(gulp.dest(path.join(config.cat)))
    .pipe($.size({title: 'copy components template.hbs'}));
});

// TODO: delete
gulp.task('copy:head:dist', function () {
  return gulp.src(config.templates+'/{'+config.tpl+'}/**')
    // https://github.com/kangax/html-minifier
    // https://github.com/kangax/html-minifier/wiki/Minifying-Handlebars-templates
    // .pipe($.if('*.html', $.minifyHtml({empty: true})))
    .pipe($.if(config.htmlmin, $.htmlmin({ customAttrSurround: [hbAttrWrapPair], collapseWhitespace: config.html.collapseWhitespace, removeComments: config.html.removeComments})))
    .pipe($.if(config.debug, $.debug({title: 'copy-head-dist-debug'})))
    .pipe(gulp.dest(path.join(config.cat, 'head')))
    .pipe($.size({title: 'copy dist components template.hbs'}));
});

gulp.task('copy:components:dist', function () {
  return gulp.src(config.distTmp+'/*.hbs')
    // https://github.com/kangax/html-minifier
    // https://github.com/kangax/html-minifier/wiki/Minifying-Handlebars-templates
    // .pipe($.if('*.html', $.minifyHtml({empty: true})))
    .pipe($.if(config.htmlmin, $.htmlmin({ customAttrSurround: [hbAttrWrapPair], collapseWhitespace: config.html.collapseWhitespace, removeComments: config.html.removeComments})))
    .pipe(rename(function (path) {
      path.dirname += '/'+path.basename;
      path.basename = 'template';
    }))
    .pipe($.if(config.debug, $.debug({title: 'copy-components-dist-debug'})))
    .pipe(gulp.dest(config.cat))
    .pipe($.size({title: 'copy dist components template.hbs'}));
});

gulp.task('html:components', ['copy:css'], function() {
  var assets = $.useref.assets({searchPath: '{build,static,src,public}'});

  return gulp.src(config.templates+'/{'+config.tpl+'}.hbs')
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
    // .pipe($.if(config.map, sourcemaps.write()))
    .pipe($.if(config.debug, $.debug({title: 'html-components-debug'})))
    .pipe(gulp.dest(config.distTmp))
    .pipe($.size({title: 'html components'}));
});

// TODO: delete
gulp.task('html:head', ['copy:css'], function() {
  var assets = $.useref.assets({searchPath: '{build,static,src,public}'});

  return gulp.src(config.templates+'/head/template.hbs')
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
    // .pipe($.if(config.map, sourcemaps.write()))
    .pipe($.if(config.debug, $.debug({title: 'html-components-debug'})))
    .pipe(gulp.dest(config.distTmp))
    .pipe($.size({title: 'html components'}));
});

gulp.task('css:components', function () {
  return gulp.src(config.distTmp+'/static/css/'+config.components+'.css')
    .pipe($.if('*.css', $.csso()))
    .pipe($.if(config.debug, $.debug({title: 'css-components-debug'})))
    .pipe(gulp.dest(path.join(config.assets, 'css')))
    .pipe($.size({title: 'css components'}));
});

gulp.task('css:dist', function () {
  return gulp.src(config.distTmp+'/static/css/{'+config.revCss+'}-*.css')
    // .pipe($.if('*.css', $.csso()))
    .pipe($.if(config.debug, $.debug({title: 'css-dist-debug'})))
    .pipe(gulp.dest(path.join(config.assets, 'css')))
    .pipe($.size({title: 'css dist'}));
});


// gulp.task('include', function() {
//   gulp.src([config.templates + '/index.html'])
//     .pipe(fileinclude({prefix: '@@', basepath: '@file'}))
//     .pipe(gulp.dest(config.base + '/'))
//     .pipe($.size({
//       title: 'include'
//     }));
// });

gulp.task('default', ['build']);
gulp.task('replaces', ['replace:version', 'replace:robots', 'replace:humans']);

gulp.task('release', ['build:release'], function(cb) {
  runSequence(['clean:tmp', 'replaces', 'copy:dist', 'css:components', 'css:dist'], 'copy:components:dist', cb);
});
gulp.task('build:release', ['clean'], function(cb) {
  runSequence(['copy:build', 'copy:static'], 'html:components', cb);
});
gulp.task('build', ['clean'], function(cb) {
  // runSequence(['copy:tmp', 'copy:static', 'sass:main', 'sass:mobile', 'sass:photoswipe', 'sass:home', 'copy-static', 'copy:head'], 'clean:vendor', cb);
  runSequence(['copy:tmp', 'copy:static', 'copy:components'], 'clean:vendor', 'images', cb);
});
// gulp.task('build', ['sassHome', 'sassMain', 'sassMobile', 'copy-static']);
