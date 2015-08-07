var gulp = require('gulp');
var chokidar = require('chokidar');
var tarsConfig = require('../../tars-config');
var watcherLog = require('../helpers/watcher-log');
var path = require('path');

/**
 * Watcher for js-files before and after modules js
 * @param  {Object} watchOptions
 */
module.exports = function (watchOptions) {
  var jsPathToWatch = [
    path.join('.', tarsConfig.fs.srcFolderName, tarsConfig.fs.componentFolderName, '**')
  ];

  return chokidar.watch(jsPathToWatch, {
    ignored: [
      path.join('.', tarsConfig.fs.srcFolderName, tarsConfig.fs.componentFolderName, '**', '*.js'),
      path.join('.', tarsConfig.fs.srcFolderName, tarsConfig.fs.componentFolderName, '**', '*.' + watchOptions.templateExtension),
      path.join('.', tarsConfig.fs.srcFolderName, tarsConfig.fs.componentFolderName, '**', 'data', 'data.js'),
      path.join('.', tarsConfig.fs.srcFolderName, tarsConfig.fs.componentFolderName, '**', tarsConfig.fs.assetsFolderName)
    ],
    persistent: true,
    ignoreInitial: true
  }).on('all', function (event, path) {
    watcherLog(event, path);
    gulp.start('catberry:component-copy');
  });
};
