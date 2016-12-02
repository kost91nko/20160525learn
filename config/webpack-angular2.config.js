var path = require("path");
var webpack = require("webpack");
var config = require("./common.config");
var gutil = require("gulp-util");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');

var DEBUG = process.argv.indexOf('--release') === -1;

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.jsx'],
    modules: [config.path.src('src'), 'node_modules'],
  },
  entry:{
    polyfills: config.path.src('angular2-rxjs/polyfills.browser.ts'),
    vendor: config.path.src('angular2-rxjs/vendor.browser.ts'),
    app: config.path.src("app.ts"),
  },
  output: {
    path: config.paths.src,
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js',
    sourceMapFilename: '[name].map',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: [
          'style',
          'css?sourceMap',
          'resolve-url'
        ],
      },
      {
        test: /\.scss$/,
        // loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader?sourceMap")
        loaders: /*ExtractTextPlugin.extract(*/[
          'style',
          'css?sourceMap&modules&importLoaders=1&localIdentName=[name]-[local]',
          'resolve-url',
          'sass?sourceMap'
        ]
      },
      // {
      //   test: /\.scss$/,
      //   loaders: [
      //     'isomorphic-style-loader',
      //     `css-loader?${JSON.stringify({ sourceMap: true, minimize: false })}`,
      //     'sass-loader',
      //   ],
      // },
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: config.paths.src
      },
      {
        test: /\.tsx?$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader'],
        exclude: [/\.(spec|e2e)\.ts$/]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack'
        ]
      },
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
          name: DEBUG ? '[path][name].[ext]?[hash]' : '[hash].[ext]',
          limit: 10000,
        },
      },
      {
        test: /\.(eot|ttf|wav|mp3)$/,
        loader: 'file-loader',
        query: {
          name: DEBUG ? '[path][name].[ext]?[hash]' : '[hash].[ext]',
        },
      },
    ]
  },
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    /**
     * Plugin: ContextReplacementPlugin
     * Description: Provides context to Angular's use of System.import
     *
     * See: https://webpack.github.io/docs/list-of-plugins.html#contextreplacementplugin
     * See: https://github.com/angular/angular/issues/11580
     */
    new ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      config.paths.src // location of your src
    ),
  ],
  /*
   * Include polyfills or mocks for various node stuff
   * Description: Node configuration
   *
   * See: https://webpack.github.io/docs/configuration.html#node
   */
  node: {
    global: true,
    crypto: 'empty',
    process: true,
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
}
