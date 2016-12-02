var path = require("path");
var webpack = require("webpack");
var config = require("./common.config");

module.exports = {
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
    modules: [config.paths.src, 'node_modules'],
  },
  entry:{},
  output: {},
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: config.paths.src
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack'
        ]
      },
      // {
      //   test: /\.scss$/,
      //   loader: null
      // },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.txt$/,
        loader: 'raw-loader',
      },
      {
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: [config.path.src('index.html')]
      },
      {
        test: /\.(woff|woff2)$/,
        loader: 'url-loader',
        query: {
          name: '[path][name].[ext]?[hash]',
          limit: 10000,
        },
      },
      {
        test: /\.(eot|ttf|wav|mp3)$/,
        loader: 'file-loader',
        query: {
          name: '[path][name].[ext]?[hash]',
        },
      },
    ]
  },
  devtool: 'inline-source-map',
}
