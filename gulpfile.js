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
var tagVersion = require('gulp-tag-version');

var hbAttrWrapOpen = /\{\{#[^}]+\}\}/;
var hbAttrWrapClose = /\{\{\/[^}]+\}\}/;
var hbAttrWrapPair = [hbAttrWrapOpen, hbAttrWrapClose];

function inc(importance) {
  // get all the files to bump version in
  return gulp.src(['./package.json', './bower.json'])
    // bump the version number in those files
    .pipe($.bump({type: importance}))
    // save it back to filesystem
    .pipe(gulp.dest('./'))
    // commit the changed version number
    .pipe($.git.commit('bumps package version'))

    // read only one file to get the version number
    .pipe($.filter('package.json'))
    // **tag it in the repository**
    .pipe(tagVersion());
};

//clean temporary directories
gulp.task('clean', del.bind(null, [config.tmp, 'build']));

// TODO delete
gulp.task('clean:vendor', del.bind(null, [
    path.join(config.assets, 'vendor', '**'),
    path.join(config.assets, 'scss', '**')
]));

gulp.task('clean:tmp', del.bind(null, [config.tmp]));

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

gulp.task('images:tmp', function() {
  return gulp.src(config.base + config.images)
    .pipe($.imagemin({
      progressive: true,
      interlaced: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(path.join(config.tmp, 'images')))
    .pipe($.size({title: 'images tmp'}));
});

gulp.task('images:build', function() {
  return gulp.src(config.base + config.images)
    .pipe($.imagemin({
      progressive: true,
      interlaced: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(path.join(config.distTmp, 'static', 'images')))
    .pipe($.size({title: 'images build'}));
});

gulp.task('images:dist', function() {
  return gulp.src(config.base + config.images)
    .pipe($.imagemin({
      progressive: true,
      interlaced: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(path.join(config.assets, 'images')))
    .pipe($.size({title: 'images dist'}));
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
  return gulp.src(config.base+'/static/{'+config.dirs+'}/**')
    .pipe(gulp.dest(config.tmp))
    .pipe($.size({title: 'copy tmp'}));
});

gulp.task('copy:static', function () {
    return gulp.src(path.join('static', '**'))
        .pipe(gulp.dest(config.dist))
    .pipe($.size({title: 'copy static'}));
});

gulp.task('copy:build', function () {
  return gulp.src(config.base+'/static/{'+config.dirs+'}/**')
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

gulp.task('copy:components', function () {
  return gulp.src(config.templates+'/{'+config.tpl+'}.hbs')
    .pipe(rename(function (path) {
      path.dirname += '/'+path.basename;
      path.basename = 'template';
    }))
    .pipe($.if(config.debug, $.debug({title: 'copy-components-debug'})))
    .pipe(gulp.dest(path.join(config.cat)))
    .pipe($.size({title: 'copy components template.hbs'}));
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

gulp.task('html:components', function() {
  var assets = $.useref.assets({searchPath: '{build,static,src,public}'});
  return gulp.src(config.templates+'/{'+config.tpl+'}.hbs')
    .pipe(assets)
    .pipe($.if('*.css', $.csso()))
    .pipe($.rev())
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.revReplace())
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


gulp.task('default', ['build']);
gulp.task('replaces', ['replace:version', 'replace:robots', 'replace:humans']);

gulp.task('dist', ['build:release'], function(cb) {
  runSequence(['clean:tmp', 'replaces', 'copy:dist', 'css:components', 'css:dist'], 'copy:components:dist', cb);
});
gulp.task('build:release', ['clean'], function(cb) {
  runSequence(['copy:build', 'copy:static', 'images:build', 'images:dist', 'copy:css'], 'html:components', cb);
});
gulp.task('build', ['clean'], function(cb) {
  // runSequence(['copy:tmp', 'copy:static', 'sass:main', 'sass:mobile', 'sass:photoswipe', 'sass:home', 'copy-static', 'copy:head'], 'clean:vendor', cb);
  runSequence(['copy:tmp', 'copy:static', 'images:tmp', 'images:dist', 'copy:dev'], 'copy:components', cb);
});

gulp.task('patch', function() { return inc('patch'); });
gulp.task('feature', function() { return inc('minor'); });
gulp.task('release', function() { return inc('major'); });
