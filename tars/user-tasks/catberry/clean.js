var gulp = require('gulp');
var del = require('del');
var path = require('path');
var tarsConfig = require('../../../tars-config');

var pathsToDel = ['./.tmpJs/'];

/**
 * Clean dev directory and cache
 * @param  {object} buildOptions
 */
module.exports = function (buildOptions) {

    if (tarsConfig.catberry.exclude) {
        tarsConfig.catberry.exclude.split(',').forEach(function (dir){
            pathsToDel.push(path.join('.', tarsConfig.fs.componentFolderName, dir));
        });
    }

    return gulp.task('catberry:clean', function (cb) {
        console.log(pathsToDel);
        del(pathsToDel, cb);
    });
};