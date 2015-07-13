'use strict';

// var uncss = require('uncss');

var files = require('./build/rev-manifest.json');
// Object.keys(files).forEach(function (item) {
//   if (item.search('home.css') != -1) {
//     var options = {
//   // ignore: ['#added_at_runtime', /test\-[0-9]+/],
//   media: ['(min-width: 700px) handheld and (orientation: landscape)'],
//   // csspath: '../public/css/',
//   // raw: 'h1 { color: green }',
//   stylesheets: ['build/' + files[item]],
//   // ignoreSheets: [/fonts.googleapis/],
//   timeout: 1000,
//   htmlroot: '/Users/jbo/src/catberry-app/build',
//   // uncssrc: '.uncssrc',
//   report: false
// };
//     // console.log(item + '=' + files[item]);
//     uncss('build/index.html', options, function (error, output) {
//       console.log(output);
//     });
//   }
// });

console.log(files['static/css/home.css']);