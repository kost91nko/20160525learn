var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackConfig = require('./config/webpack.config');
var webpackCompiler   = webpack(webpackConfig);
var config = require('./config/common.config');
var runServer = require("./devServer.js");
var browserSync = require('browser-sync').create();

runCustomServer().then(() => {
  runBSProxy();
});

function runWebpackDevServer() {
  return new Promise((resolve, reject) => {
    new WebpackDevServer(webpackCompiler, {
      contentBase: config.paths.dist,
      stats: {
        colors: true,
        chunks: false },
    }).listen(config.port, "localhost", function(err) {
      if (!err) {
        console.log("[webpack-dev-server]", "http://localhost:8080/");
        resolve();
      } else {
        reject(err);
      }
    });
  });
}

function runBSProxy() {
  browserSync.init({
    open: true,
    logFileChanges: true,
    proxy: 'localhost:' + config.port,
    files: [
      config.path.src('*.css'),
      config.path.src('*.html')
    ]
  });

  webpackCompiler.plugin('done', (stats) => {
    browserSync.reload();
  });
}

function runCustomServer(){
  return new Promise((resolve, reject) => {
    try {
      runServer(
        'localhost',
        config.port,
        './src',
        webpackDevMiddleware(webpackCompiler, {
          publicPath: webpackConfig.output.publicPath,
          stats: {
            colors: true,
            chunks: false
          }
        }),
        function () {
          resolve();
        }
      );
    } catch (e){
      reject(e);
    }
  });
}
