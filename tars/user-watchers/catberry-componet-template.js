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
    path.join('.', tarsConfig.fs.srcFolderName, tarsConfig.fs.componentFolderName, '**', '*.' + watchOptions.templateExtension)
  ];

  return chokidar.watch(jsPathToWatch, {
    ignored: '',
    persistent: true,
    ignoreInitial: true
  }).on('all', function (event, path) {
    watcherLog(event, path);
    gulp.start('catberry:component-dev');
  });
};
