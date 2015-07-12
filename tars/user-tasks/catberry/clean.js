var gulp = require('gulp');
var del = require('del');
var path = require('path');
var tarsConfig = require('../../../tars-config');

/**
 * Clean dev directory and cache
 * @param  {object} buildOptions
 */
module.exports = function (buildOptions) {
  var pathsToDel = [
    path.join('.', tarsConfig.fs.distFolderName, '__csstime-tmp'),
    path.join('.', '__BrowserBundle.js'),
    path.join('.', tarsConfig.fs.distFolderName, 'bundle.js')
  ];

  if (tarsConfig.catberry.exclude) {
    tarsConfig.catberry.exclude.split(',').forEach(function (dir) {
      pathsToDel.push(path.join('.', tarsConfig.fs.componentFolderName, dir));
    });
  }

  if (tarsConfig.catberry.excludeStores) {
    tarsConfig.catberry.excludeStores.split(',').forEach(function (dir) {
      pathsToDel.push(path.join('.', tarsConfig.fs.componentStoresFolderName, dir));
    });
  }

  if (tarsConfig.catberry.excludeLibs) {
    tarsConfig.catberry.excludeStores.split(',').forEach(function (dir) {
      pathsToDel.push(path.join('.', tarsConfig.fs.componentLibsFolderName, dir));
    });
  }

  return gulp.task('catberry:clean', function (cb) {
    console.log(pathsToDel);
    del(pathsToDel, cb);
  });
};