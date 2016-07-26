var path = require("path");
var webpack = require("webpack");
var config = require("./common.config")

module.exports = {
  resolve: {
    modulesDirectories: ["web_modules","node_modules"]
  },
  entry:{
    app: config.path.dist("app1.js")
    vendor: [ "jquery", "angular" ]
  },
  output: {
    path: config.paths.src
    filename: "app.bundle.js",
    publicPath: '/'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css" },
      { test: /\.json$/, loader: "json-loader"},
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: [/node_modules/] ,
        include: config.paths.src
      }
    ]
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js")
  ]
}
