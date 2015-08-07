'use strict';

// Using modules
var os = require('os');
var gulp = require('gulp');
var gutil = require('gulp-util');
var path = require('path');
var runSequence = require('run-sequence');
var del = require('del');
// var sourcemaps = require('gulp-sourcemaps');
// var pngquant = require('imagemin-pngquant');
// var rename = require('gulp-rename');
// var replace = require('gulp-replace-task');
var tagVersion = require('gulp-tag-version');
var browserSync = require('browser-sync').create();
var wait = require('gulp-wait');
var gls = require('gulp-live-server');
var $ = require('gulp-load-plugins')();

// Flags
var useLiveReload = gutil.env.lr || false,
    useDebug = gutil.env.debug || false,
    useTunnelToWeb = gutil.env.tunnel || false;

// Configs
var config = require('./config/build.config.js'),
  pkg = require('./package'),
  catConfig = require('./config/environment.json'),
  tarsConfig = require('./tars-config'),
  browserSyncConfig = tarsConfig.browserSyncConfig,

  templaterName = require('./tars/helpers/templater-name-setter')(),
  templateExtension = 'jade',
  cssPreprocExtension = tarsConfig.cssPreprocessor.toLowerCase(),

  buildOptions = {},
  watchOptions = {},

  tasks = [],
  userTasks = [],
  watchers = [],
  userWatchers = [];

buildOptions.production = true;
// Generate build version
if (tarsConfig.useBuildVersioning) {
  buildOptions.buildVersion = require('./tars/helpers/set-build-version')();
  buildOptions.buildPath = tarsConfig.buildPath + 'build' + buildOptions.buildVersion + '/';
} else {
  buildOptions.buildVersion = '';
  buildOptions.buildPath = tarsConfig.buildPath;
}

// Set template's extension
if (templaterName === 'handlebars') {
  templateExtension = 'hbs';
} else {
  templateExtension = 'jade';
}

if (cssPreprocExtension === 'stylus') {
  cssPreprocExtension = 'styl';
}

if (gutil.env.release) {
  buildOptions.hash = Math.random().toString(36).substring(7);
} else {
  buildOptions.hash = '';
}

if (gutil.env.extrapath){
  buildOptions.buildPath = tarsConfig.additionalBuildPath;
}

buildOptions.useDebug = useDebug;
buildOptions.templateExtension = templateExtension;

watchOptions = {
  cssPreprocExtension: cssPreprocExtension,
  templateExtension: templateExtension
};

var notifier = require('./tars/helpers/notifier');
var hbAttrWrapOpen = /\{\{#[^}]+\}\}/;
var hbAttrWrapClose = /\{\{\/[^}]+\}\}/;
var hbAttrWrapPair = [hbAttrWrapOpen, hbAttrWrapClose];

/***********/
/* HELPERS */
/***********/
// You can add your own helpers here. Helpers folder is tars/helpers

// Set ulimit to 4096 for *nix FS. It needs to work with big amount of files
if (os.platform() !== 'win32') {
  require('./tars/helpers/set-ulimit')();
}

// Load files from dir recursively and synchronously
var fileLoader = require('./tars/helpers/file-loader');

function inc(importance) {
  // get all the files to bump version in
  return gulp.src(['./package.json', './bower.json'])
    // bump the version number in those files
    .pipe($.bump({
      type: importance
    }))
    // save it back to filesystem
    .pipe(gulp.dest('./'))
    // commit the changed version number
    .pipe($.git.commit('bumps package version'))

    // read only one file to get the version number
    .pipe($.filter('package.json'))
    // **tag it in the repository**
    .pipe(tagVersion());
}

/***************/
/* END HELPERS */
/***************/

/*********/
/* TASKS */
/*********/

//clean temporary directories
gulp.task('clean', del.bind(null, [config.tmp, 'build']));

// TODO delete
// gulp.task('clean:vendor', del.bind(null, [
//     path.join(config.assets, 'vendor', '**'),
//     path.join(config.assets, 'scss', '**')
// ]));

gulp.task('clean:tmp', del.bind(null, [config.tmp]));

// gulp.task('copy:tmp', function () {
//   return gulp.src(config.base + '/static/{' + config.dirs + '}/**')
//     .pipe(gulp.dest(config.tmp))
//     .pipe($.size({title: 'copy tmp'}));
// });

// gulp.task('copy:build', function () {
//   return gulp.src(config.base + '/static/{' + config.dirs + '}/**')
//     .pipe(gulp.dest(path.join(config.distTmp, 'static')))
//     .pipe($.size({ title: 'copy build' }));
// });

// gulp.task('copy:dist', function () {
//   return gulp.src(config.distTmp + '/static/{' + config.dirs + '}/**')
//     .pipe($.if(config.debug, $.debug({ title: 'copy-dist-debug' })))
//     .pipe(gulp.dest(config.assets))
//     .pipe($.size({
//       title: 'copy dist'
//     }));
// });

// gulp.task('copy:css', ['sass:dev'], function () {
//   return gulp.src(path.join(config.tmp, 'css', '**'))
//     .pipe(gulp.dest(path.join(config.distTmp, 'static', 'css')))
//     .pipe($.size({ title: 'copy css' }));
// });

// gulp.task('copy:components', function () {
//   return gulp.src(config.templates + '/{' + config.tpl + '}.hbs')
//     .pipe(rename(function (path) {
//       path.dirname += '/' + path.basename;
//       path.basename = 'template';
//     }))
//     .pipe($.if(config.debug, $.debug({ title: 'copy-components-debug' })))
//     .pipe(gulp.dest(path.join(config.cat)))
//     .pipe($.size({ title: 'copy components template.hbs' }));
// });

// gulp.task('copy:components:dist', function () {
//   return gulp.src(config.distTmp + '/*.hbs')
//     // https://github.com/kangax/html-minifier
//     // https://github.com/kangax/html-minifier/wiki/Minifying-Handlebars-templates
//     // .pipe($.if('*.html', $.minifyHtml({empty: true})))
//     .pipe($.if(config.htmlmin, $.htmlmin({
//       customAttrSurround: [hbAttrWrapPair],
//       collapseWhitespace: config.html.collapseWhitespace,
//       removeComments: config.html.removeComments
//     })))
//     .pipe(rename(function (path) {
//       path.dirname += '/' + path.basename;
//       path.basename = 'template';
//     }))
//     .pipe($.if(config.debug, $.debug({ title: 'copy-components-dist-debug' })))
//     .pipe(gulp.dest(config.cat))
//     .pipe($.size({
//       title: 'copy dist components template.hbs'
//     }));
// });

// gulp.task('html:components', function() {
//   var assets = $.useref.assets({searchPath: '{build,static,src,public}'});
//   return gulp.src(config.templates+'/{'+config.tpl+'}.hbs')
//     .pipe(assets)
//     .pipe($.if('*.css', $.csso()))
//     .pipe($.rev())
//     .pipe(assets.restore())
//     .pipe($.useref())
//     .pipe($.revReplace())
//     .pipe($.if(config.debug, $.debug({title: 'html-components-debug'})))
//     .pipe(gulp.dest(config.distTmp))
//     .pipe($.size({title: 'html components'}));
// });

// gulp.task('css:components', function () {
//   return gulp.src(config.distTmp + '/static/css/' + config.components + '.css')
//     .pipe($.if('*.css', $.csso()))
//     .pipe($.if(config.debug, $.debug({ title: 'css-components-debug' })))
//     .pipe(gulp.dest(path.join(config.assets, 'css')))
//     .pipe($.size({ title: 'css components' }));
// });

// gulp.task('css:dist', function () {
//   return gulp.src(config.distTmp + '/static/css/{' + config.revCss + '}-*.css')
//     // .pipe($.if('*.css', $.csso()))
//     .pipe($.if(config.debug, $.debug({ title: 'css-dist-debug' })))
//     .pipe(gulp.dest(path.join(config.assets, 'css')))
//     .pipe($.size({ title: 'css dist' }));
// });

// gulp.task('build:catberry', $.shell.task(['node ./build.js', './node_modules/.bin/gulp']));

/*********/
/* TASKS */
/*********/

// USER'S TASKS
// You can add your own task.
// Task have to be in tars/user-tasks folder
// Example:
// require('./tars/user-tasks/example-task')(buildOptions);

// SYSTEM TASKS
tasks = fileLoader('./tars/tasks');

// You could uncomment the row bellow, to see all required tasks in console
// console.log(tasks);

// require tasks
tasks.forEach(function (file) {
  require(file)(buildOptions);
});

// USER'S TASKS
userTasks = fileLoader('./tars/user-tasks');

// require user-tasks
userTasks.forEach(function (file) {
  require(file)(buildOptions);
});

/*************/
/* END TASKS */
/*************/

/***********/
/* WATCHERS */
/***********/

// Build dev-version with watchers and livereloader.
// Also could tunnel your markup to web, if you use flag --tunnel
gulp.task('dev', ['build-dev'], function () {

  if (useLiveReload || useTunnelToWeb) {
    gulp.start('run-server');
    // gulp.watch('public/bundle.js').on('change', browserSync.reload);
    // SYSTEM WATCHERS
    watchers = fileLoader('./tars/watchers');
    watchOptions.cssCompileTask = 'css:compile';

    // You could uncomment the row bellow, to see all required watchers in console
    // console.log(watchers);

    // require watchers
    watchers.forEach(function (file) {
      require(file)(watchOptions);
    });

    // USER'S WATCHERS
    userWatchers = fileLoader('./tars/user-watchers');

    // require user-watchers
    userWatchers.forEach(function (file) {
      require(file)(watchOptions);
    });
  } else {
    gutil.log(gutil.colors.green('✔'), gutil.colors.green.bold('Build development has been finished successfully!'));
  }
});

gulp.task('dist', ['build'], function () {
  if (useLiveReload || useTunnelToWeb) {
    gulp.start('run-release');
  } else {
    gutil.log(gutil.colors.green('✔'), gutil.colors.green.bold('Build production has been finished successfully!'));
  }
});

/****************/
/* END WATCHERS */
/****************/
/**************/
/* MAIN TASKS */
/**************/

// Build dev-version (without watchers)
// You can add your own tasks in queue
gulp.task('build-dev', function (cb) {
  buildOptions.production = false;
  runSequence(
    'service:builder-start-screen',
    ['service:clean', 'catberry:clean'],
    ['replace:browser', 'replace:environment'],
    ['images:tmp', 'images:tmp-svg', 'images:copy-tmp'],
    'css:compile',
    'catberry:assets',
    ['copy:other', 'copy:static'],
    ['catberry:component-copy', 'catberry:component-dev', 'catberry:component-js', 'catberry:component-js-stores', 'catberry:component-js-libs'],

    // 'copy:components',
        // ['images:minify-svg', 'images:raster-svg'],
        // [
        //     'css:make-sprite-for-svg', 'css:make-fallback-for-svg', 'css:make-sprite'
        // ],
        // [
        //     'css:compile-css', 'css:compile-css-for-ie8',
        //     'html:concat-modules-data',
        //     'js:move-separate', 'js:processing'
        // ],
        // [
        //     'html:compile-templates',
        //     'other:move-misc-files', 'other:move-fonts', 'other:move-assets',
        //     'images:move-content-img', 'images:move-plugins-img', 'images:move-general-img'
        // ],
        // 'catberry-build',
    cb
  );
});

// Build release version
// Also you can add your own tasks in queue of build task
gulp.task('build', function () {
  runSequence(
    'service:builder-start-screen',
    ['service:clean', 'catberry:clean'],
    ['replace:browser', 'replace:environment'],
    ['images:build', 'images:build-svg', 'images:copy-build'],
    'css:compile-build',
    'catberry:assets',
    ['copy:other', 'copy:static'],
    ['catberry:component-copy', 'catberry:strip-debug', 'html:build', 'catberry:component-js-stores', 'catberry:component-js-libs'],
    'html:catberry',
    ['html:dist', 'css:dist'],
    ['replace:humans', 'replace:robots', 'replace:version'],
        // [
        //     'html:minify-html', 'images:minify-raster-img'
        // ],
        // 'service:pre-build',
        // [
        //     'js:compress', 'css:compress-css'
        // ],
        // 'service:zip-build',
    function () {
      console.log(gutil.colors.black.bold('\n------------------------------------------------------------'));
      gutil.log(gutil.colors.green('✔'), gutil.colors.green.bold('Release version have been created successfully!'));
      console.log(gutil.colors.black.bold('------------------------------------------------------------\n'));
    }
  );
});

gulp.task('patch', function () {
  return inc('patch');
});
gulp.task('feature', function () {
  return inc('minor');
});
gulp.task('release', function () {
  return inc('major');
});

/******************/
/* END MAIN TASKS */
/******************/

/*****************/
/* HELPERS TASKS */
/*****************/

gulp.task('serve', function () {
  var options = {
    cwd: undefined
  };
  options.env = process.env;
  options.env.NODE_ENV = 'development';
  var server = gls('./server.js', options);
  // setTimeout(function sleepServerFirst() {
  server.start();
  // gutil.log(gutil.colors.green('✔'), gutil.colors.green.bold('Server start'));
  // }, 60000);
  gulp.watch(['static/**/*.css', 'static/**/*.html'], function () {
    server.notify.apply(server, arguments);
  });
});

gulp.task('serve:release', function () {
  var options = {
    cwd: undefined
  };
  options.env = process.env;
  options.env.NODE_ENV = 'production';
  // var server = gls('./server.js', options);
  var server = gls(['./server.js', 'release'], options);
  server.start();
});

gulp.task('sleep:build', function (cb) {
  return gulp.src(['build.js'], {
    read: false
  })
    .pipe(notifier('Wait build.js starting!'))
    .pipe(wait(tarsConfig.waitCatberryBuild))
    .pipe(notifier('Wait build.jss finished!'));
});

gulp.task('sleep:serve', function (cb) {
  return gulp.src(['build.js'], {
    read: false
  })
    .pipe(notifier('Wait Server starting!'))
    .pipe(wait(tarsConfig.waitCatberryServer))
    .pipe(notifier('Wait Server finished!'));
});

// Task for starting browsersync module
gulp.task('browsersync', function (cb) {
  browserSync.init({
    // server: {
    // baseDir: browserSyncConfig.baseDir
    // },
    // server: browserSyncConfig.server,
    // All of the following files will be watched
    files: [
      path.join(tarsConfig.fs.distFolderName, '*.js'),
      path.join(tarsConfig.fs.distFolderName, tarsConfig.fs.staticFolderName, '**', '*.*'),
      path.join(tarsConfig.fs.distFolderName, tarsConfig.fs.assetsFolderName, '**', '*.*')
      ],
    proxy: browserSyncConfig.proxy,
    logConnections: true,
    debugInfo: true,
    injectChanges: false,
    port: browserSyncConfig.port,
    open: browserSyncConfig.open,
    browser: browserSyncConfig.browser,
    // startPath: browserSyncConfig.startUrl,
    notify: browserSyncConfig.useNotifyInBrowser,
    // watchTask: true,
    tunnel: useTunnelToWeb
  });
});

gulp.task('run-server', function (cb) {
  runSequence('catberry-build', 'sleep:build', 'serve', 'sleep:serve', 'browsersync', cb);
});

gulp.task('run-release', function (cb) {
  runSequence('catberry-release', 'sleep:build', 'serve:release', 'sleep:serve', 'browsersync', cb);
});

gulp.task('svg-actions', function (cb) {
  if (gutil.env.ie8) {
    runSequence(
        ['images:minify-svg', 'images:raster-svg'],
        ['css:make-fallback-for-svg', 'css:make-sprite-for-svg'],
        cb
    );
  } else {
    runSequence(
        'images:minify-svg',
        'css:make-sprite-for-svg',
        cb
    );
  }
});

gulp.task('compile-templates-with-data-reloading', function (cb) {
  runSequence(
      'html:concat-modules-data',
      'html:compile-templates',
  cb);
});

/*********************/
/* END HELPERS TASKS */
/*********************/

gulp.task('default', ['build']);

gulp.task('test', function (cb) {
  buildOptions.production = false;
  runSequence(['js:check', 'js:check-stores', 'js:check-libs'], cb);
});

gulp.task('format', function (cb) {
  buildOptions.production = false;
  runSequence(['js:format'], cb);
});

gulp.task('work', function (cb) {
  buildOptions.production = false;
  runSequence(['copy:inline'], 'html:catberry-inline', cb);
});
