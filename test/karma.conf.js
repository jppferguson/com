module.exports = function ( karma ) {
  karma.set( {
    basePath: '../',

    frameworks: [
      'browserify',
      'jasmine',
      'mocha'
    ],

    // preprocess matching files before serving them to the browser
    preprocessors: {
      'src/scripts/**/*.js': [ 'browserify', 'coverage' ],
      'test/unit/**/*.js': [ 'browserify' ],
    },

    files: [
      // app
      'dist/assets/js/app.js',
      // vendor
      'node_modules/angular-mocks/angular-mocks.js',
      // tests
      'test/unit/**/*.js'
    ],

    exclude: [
      '**/__**',
      'test/coverage/**',
      'test/karma.conf.js',
    ],

    // Change Karma's debug.html to the mocha web reporter
    client: {
      mocha: {
        reporter: 'html'
      }
    },

    // reporters to use for test results
    reporters: [
      'mocha',
      'coverage'
    ],

    // web server port
    port: 9876,

    // general prettyness for output (reporters and logs)
    colors: true,

    // logging level: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: karma.LOG_DISABLE,

    // watch files and execute tests whenever any file changes
    autoWatch: true,

    // Continuous Integration mode
    // - if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // start these browsers
    browsers: [
      // 'Chrome',
      // 'ChromeCanary',
      // 'Firefox',
      'PhantomJS',
      // 'Safari',
    ],

    captureTimeout: 60000,

    browserify: {
      debug: true,
      extensions: ['.js'],
      watch: true,
      transform: [
        'babelify',
        'browserify-ngannotate',
        'browserify-istanbul',
      ]
    },

    // mocha reporter
    mochaReporter: {
      output : 'autowatch'
    },

    // coverage reporter
    coverageReporter: {
      dir: 'test/coverage/',
      type: 'text-summary'
    },

    urlRoot: '/__karma__/',

    //
    browserNoActivityTimeout: 3 * 60 * 1000,

  });
};
