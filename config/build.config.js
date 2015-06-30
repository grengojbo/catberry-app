'use strict';

//basic configuration object used by gulp tasks
module.exports = {
  port: 3000,
  // map: true, // Generate source maps
  proxy: 'http://localhost:5000',
  tmp: 'public/tmp',
  dist: 'public',
  distTmp: 'build',
  base: 'src',
  assetsSrc: 'src/assets/**/*',
  tpl: 'src/**/*.tpl.html',
  mainScss: 'src/static/scss/main.scss',
  homeScss: 'src/static/scss/home.scss',
  mobileScss: 'src/static/scss/mobile.scss',
  srcScss: 'src/static/scss/',
  scss: 'src/static/scss/**/*.scss',
  fonts: '/static/fonts/*',
  // html: ['src/templates/*.html', 'src/templates/**/*.dust'],
  dust: 'src/templates/**/*.dust',
  cat: 'catberry_components',
  templates: 'src/templates',
  vendor: 'src/static/vendor/**',
  catberry: 'catberry_modules/**/*.js',
  lib: 'lib/**/*.js',
  js: [
    'src/static/**/*.js',
    '!src/static/vendor/**/*.js'
  ],
  index: 'src/index.html',
  headSrc: 'src/templates/main/placeholders/head.dust',
  assets: 'public/static',
  images: '/static/images/**/*',
  htmlmin: false,
  html: {
    collapseWhitespace: false,
    removeComments: true
  },
  banner: ['/**',
    ' * <%= pkg.name %> - <%= pkg.description %>',
    ' * @version v<%= pkg.version %>',
    ' * @link <%= pkg.homepage %>',
    ' * @license <%= pkg.license %>',
    ' */',
    ''
  ].join('\n')
};
