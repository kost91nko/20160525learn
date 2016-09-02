var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackConfig = require('../config/webpack.config');
var webpackCompiler   = webpack(webpackConfig);
var browserSync = require('browser-sync').create();
var gulp = require('gulp');
var config = require('../config/common.config');
var stripAnsi = require('strip-ansi');
var gutil = require("gulp-util");
var runServer = require("../devServer.js");
gulp.task("bundle-livereload", function(){
    /**
     * Reload all devices when bundle is complete
     * or send a fullscreen error message to the browser instead
     */
    webpackCompiler.plugin('done', function (stats) {
        if (stats.hasErrors() || stats.hasWarnings()) {

            return browserSync.sockets.emit('fullscreen:message', {
                title: "Webpack Error:",
                body:  stripAnsi(stats.toString()),
                timeout: 100000
            });
        }
        browserSync.reload();
    });

    /**
     * Run Browsersync and use middleware for Hot Module Replacement
     */
    browserSync.init({
        server:{
          baseDir: config.paths.src
        },
        open: true,
        logFileChanges: true,
        port: 8080,
        middleware: [
            webpackDevMiddleware(webpackCompiler, {
                publicPath: webpackConfig.output.publicPath,
                stats: {
                  colors: true,
                  chunks: false
                }
            }),
        ],
        plugins: ['bs-fullscreen-message'],
        files: [
            config.path.src('*.css'),
            config.path.src('*.html')
        ]
    });
});
gulp.task('server', function(cb){
  runServer(
    'localhost',
    '8080',
    '../src',
    webpackDevMiddleware(webpackCompiler, {
        publicPath: webpackConfig.output.publicPath,
        stats: {
          colors: true,
          chunks: false
        }
    })
  );
});
gulp.task("browser-sync-proxy", function(callback){
  browserSync.init({
      open: true,
      logFileChanges: true,
      proxy: 'localhost:8080',
      host: '192.168.22.22',
      files: [
          config.path.src('*.css'),
          config.path.src('*.html')
      ]
  });
  webpackCompiler.plugin('done', stats => {
    browserSync.reload();
  });
})
gulp.task("webpack-dev-server", function(callback) {
    new WebpackDevServer(webpackCompiler, {
        contentBase: config.paths.dist,
        noInfo:  true
    }).listen(8080, "localhost", function(err) {
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
        // Server listening
        gutil.log("[webpack-dev-server]", "http://localhost:8080/");

        // keep the server alive or continue?
        // callback();
    });
});

// Livereloading

gulp.task('bs-proxy', function(){
    browserSync.init({
        proxy: "localhost:8080",
        browser: ["google chrome", "ie"]
    });

    // add browserSync.reload to the tasks array to make
    // all browsers reload after tasks are complete.
    gulp.watch(config.path.src("*.js"), browserSync.reload);
});
