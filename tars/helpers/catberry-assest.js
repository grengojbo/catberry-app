var fs = require("fs");
var notify = require('gulp-notify');
// var notifyConfig = require('../../tars-config').notifyConfig;
var tarsConfig = require('../../tars-config');
var modifyDate = require('./modify-date-formatter');
var path = require('path');
// var recursive = require('recursive-readdir');
// var readDir = require('readdir');
var readdirp = require('readdirp');
var through = require('through2');

var config = {
        postcssConfig: {
            filters: {}
        },
        componentsRootDirs: [],
        components: []
    };
/**
 * Build application assets.
 * @param {StoreFinder} storeFinder Catberry store finder.
 * @param {ComponentFinder} componentFinder Catberry component finder.
 * @returns {Promise} Promise for nothing.
 */


// function catberryHelper (storeFinder, componentFinder) {
var catberryHelper = {
    config: {
        postcssConfig: {
            filters: {}
        },
        componentsRootDirs: [],
        components: []
    },
    setDistFileName: function (arg) {
        var dir = '/'+arg.basename;
        var file = arg.basename.split('_');
        if (file[1] !== undefined) {
            dir = '/'+file[0]+'/'+file[1];
        }
        arg.basename = 'template';
        arg.dirname = dir;
        return arg;
    },
    setBuildFileName: function (arg) {
        var dir = [];
        var res = arg.dirname;
        dir = arg.dirname.split('/');
        if (dir[1] !== undefined) {
            res = dir[0]+'_'+dir[1];
        }
        return res;
    },
    getConfig: function() {

    // var self = this;

    var directories = {};
    var components = {};
    var excludeDirs = [];
    config.postcssConfig.filters.oldIE = tarsConfig.catberry.oldIE || false,
    config.enableCssStructureMinimization = tarsConfig.catberry.enableCssStructureMinimization || true,
    config.componentJSON = tarsConfig.catberry.componentJSON || 'cat-component.json';
    config.destinationDir = tarsConfig.catberry.destinationDir || 'public';
    config.destinationComponentsDir = tarsConfig.catberry.destinationComponentsDir || tarsConfig.fs.assetsFolderName || 'assets';
    config.cdnPath = tarsConfig.catberry.cdnPath || '/assets/';
    return config;
    },
    setConfig: function(config) {
    // return componentFinder.find()
        // .then(function (components) {
        // recursive(componentFinder, function (err, files) {
        // Files is an array of filename
        // console.log(files);
        // });
    var srcFinder = path.join(tarsConfig.fs.srcFolderName, tarsConfig.fs.componentFolderName);
    var nodeModulesFinder = 'node_modules';
    // console.log(config.componentJSON);


  //   { name: 'cat-component.json',
  // path: 'elements/photoswipe/cat-component.json',
  // fullPath: '/Users/jbo/src/catberry-app/src/catberry_components/elements/photoswipe/cat-component.json',
  // parentDir: 'elements/photoswipe',
  // fullParentDir: '/Users/jbo/src/catberry-app/src/catberry_components/elements/photoswipe',
  // stat:
  //  { dev: 16777218,
  //    mode: 33188,
  //    nlink: 1,
  //    uid: 502,
  //    gid: 20,
  //    rdev: 0,
  //    blksize: 4096,
  //    ino: 11240907,
  //    size: 90,
  //    blocks: 8,
  //    atime: Wed Jul 08 2015 19:34:18 GMT+0300 (EEST),
  //    mtime: Sun Jun 28 2015 20:23:08 GMT+0300 (EEST),
  //    ctime: Wed Jul 08 2015 18:32:37 GMT+0300 (EEST),
  //    birthtime: Sun Jun 28 2015 20:23:08 GMT+0300 (EEST) } }

    if (tarsConfig.catberry.exclude) {
        tarsConfig.catberry.exclude.split(',').forEach(function (dir){
            excludeDirs.push('!'+dir);
        });
        console.log(excludeDirs);
        readdirp({ root: srcFinder, fileFilter: config.componentJSON, directoryFilter: excludeDirs })
            .pipe(through.obj(function (entry, _, cb) {
                // this.push({ path: entry.path, size: entry.stat.size });
                console.log(entry.parentDir);
            cb();
            }));
        // .on('data', function (entry) {
        // // do something with each JavaScript and Json file entry
        // console.log(entry);
        // });

    } else {
        // readdirp({root: srcFinder, fileFilter: config.componentJSON})
        readdirp({root: srcFinder, fileFilter: config.componentJSON}, function (errors, res) {
            // .pipe(through.obj(function (entry, _, cb) {
                // var file = require(entry.fullPath);

            res.files.forEach(function (entry) {
                // console.log(row);
                var file = JSON.parse(fs.readFileSync(entry.fullPath, 'utf8'));
                var component = {
                    name: file.name,
                    properties: file,
                    path: path.join(srcFinder, entry.parentDir),
                    minifyHtml: false,
                    parentDir: entry.parentDir
                };
                if (typeof file.minifyHtml !== 'undefined') {
                    component.minifyHtml = file.minifyHtml;
                }
            //     // entry.parentDir;
            //     // component['path'] = entry.parentDir;
                config.components.push(component);
                config.componentsRootDirs.push(component.path);

                // console.log(component);
            });
            return Promise.resolve(config);
            // return new Promise(function (fulfill, reject) {
            //     console.log(config);

            // }
                // config.components.push(component);
            // cb();
            // }));
            // console.log(res.files);
    // return config;
        });
    }
    // console.log(stream);
    // var filesArray = readDir.readSync(srcFinder, [config.componentJSON]);
    // var filesArray = readDir.readSync(srcFinder, ['cat-component.json']);
    // console.log(filesArray);
    // filesArray.forEach(function (component){
    //     console.log('dir: '+ path.dirname(component));
    // });
        // console.log(filesArray);
  // componentsRootDirs:
   // [ 'catberry_components',
     // 'catberry_components/articles',
     // 'catberry_components/auth',
     // 'catberry_components/elements' ] }
            // Object.keys(components)
            //     .forEach(function (componentName) {
            //         var component = components[componentName],
            //             componentDirectory = path.dirname(component.path),
            //             parentDirectory = path.dirname(componentDirectory);
            //         directories[parentDirectory] = true;
            //     });
            // config.componentsRootDirs = Object.keys(directories);
        // });
    }
};

module.exports = catberryHelper;