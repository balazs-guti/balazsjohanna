module.exports = function(config) {

  var path = require('path');
  var wiredep = require('wiredep');

  function getFiles() {
    var patterns = wiredep( {
      dependencies: true,
      devDependencies: true
    } ).js
      .concat( [
        './src/app/**/*.module.js',        // first all the module definitions
        './src/app/**/*.js',               // after that all other js files
        './src/app/**/*.html'              // get all the templates to test directives
    ] );

    var files = patterns.map(function(pattern) {
      return {
        pattern: pattern
      };
    });
    files.push({
      pattern: './src/asset/**/*',
      included: false,
      served: true,
      watched: false
    });
    return files;
  }


  config.set( {
    port: 9876,
    files: getFiles(),
    exclude: [],

    frameworks: ['jasmine'],
    // processing the following files with the listed processors
    preprocessors: {
      './src/**/*.html': ['ng-html2js'],              // creating template cache
      './src/**/!(*.mock|*.spec).js': ['coverage']    // listing our coverage
    },

    // uses template cache to make the html templates available to test directives
    ngHtml2JsPreprocessor: {
      stripPrefix: 'src/',
      moduleName: 'test.templates'
    },

    reporters: ['progress', 'coverage'],

    coverageReporter: {
      type : 'html',
      dir : './coverage/'
    },


    colors: true,

    browsers: [
        'PhantomJS'
        // 'Chrome'
    ],

    // makes sure our assets are available
    proxies: {
      '/asset': './src/asset'
    }
  });
};