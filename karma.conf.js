module.exports = function(config) {
  config.set({
    colors: true,

    logLevel: config.LOG_DEBUG,

    // client: {
    //   captureConsole: true
    // },

    files: [
      './src/angular1/spec.context.js',
    ],

    preprocessors: {
      './src/angular1/spec.context.js': ['webpack']
    },

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Chrome'],

    plugins: [
      'karma-chrome-launcher',
      'karma-jasmine',
      'karma-junit-reporter',
      'karma-webpack',
      'karma-phantomjs-launcher'
    ],

    junitReporter: {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    },

    webpack: require('./config/webpack-test.config'),

    webpackMiddleware: {
      noInfo: 'errors-only'
    }

  });
};
