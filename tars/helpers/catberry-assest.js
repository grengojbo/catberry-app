var notify = require('gulp-notify');
// var notifyConfig = require('../../tars-config').notifyConfig;
var tarsConfig = require('../../tars-config');
var modifyDate = require('./modify-date-formatter');
var path = require('path');

/**
 * Build application assets.
 * @param {StoreFinder} storeFinder Catberry store finder.
 * @param {ComponentFinder} componentFinder Catberry component finder.
 * @returns {Promise} Promise for nothing.
 */

var config = {};

function catberryHelper (storeFinder, componentFinder) {
    // var self = this;
    // return componentFinder.find()
        // .then(function (components) {
            var directories = {};
            config.componentJSON = tarsConfig.catberry.componentJSON || 'cat-component.json';
            config.destinationDir = tarsConfig.catberry.destinationDir || 'public';
            config.destinationComponentsDir = tarsConfig.catberry.destinationComponentsDir || 'assets';
            config.cdnPath = tarsConfig.catberry.cdnPath || '/assets/';
            // Object.keys(components)
            //     .forEach(function (componentName) {
            //         var component = components[componentName],
            //             componentDirectory = path.dirname(component.path),
            //             parentDirectory = path.dirname(componentDirectory);
            //         directories[parentDirectory] = true;
            //     });
            // config.componentsRootDirs = Object.keys(directories);
            console.log(config);
            return config;
        // });
};

module.exports = catberryHelper;