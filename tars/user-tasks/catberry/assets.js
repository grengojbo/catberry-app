var gulp = require('gulp');
var tarsConfig = require('../../../tars-config');
var catberryHelper = require('../../helpers/catberry-assest');
var path = require('path');
var readdirp = require('readdirp');
var csstime = require('csstime-gulp-tasks');

/**
 * Catberry modify files
 * @param  {object} buildOptions
 */
module.exports = function (buildOptions) {
  if (tarsConfig.catberry.exclude) {
    tarsConfig.catberry.exclude.split(',').forEach(function (dir){
      libPaths.push(path.join('!.', tarsConfig.fs.srcFolderName, tarsConfig.fs.componentFolderName, dir+'{,/**}'));
    });
  }
  return gulp.task('catberry:assets', function () {
    var config = catberryHelper.getConfig();
    var srcFinder = path.join(tarsConfig.fs.srcFolderName, tarsConfig.fs.componentFolderName);
    var nodeModulesFinder = 'node_modules';
    return readdirp({root: srcFinder, fileFilter: config.componentJSON}, function (errors, res) {
      res.files.forEach(function (entry) {
        config.componentsRootDirs.push(path.join(srcFinder, entry.parentDir));
      });
      csstime.loadGulpTasks(gulp, config);
      if (buildOptions.production) {
        gulp.start('csstime-mode-release');
      } else {
      gulp.start('csstime-mode-watch');
      }
    });
  });
};