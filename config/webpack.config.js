var path = require("path");
var webpack = require("webpack");
var config = require("./common.config");
var gutil = require("gulp-util");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var DEBUG = process.argv.indexOf('--release') === -1;

module.exports = {
	resolve: {
    modulesDirectories: ["web_modules","node_modules"]
  },
	entry:{
  	app: config.path.src("app.js"),
		vendor: [ "jquery" ]
	},
	output: {
		path: config.paths.src,
		filename: "app.bundle.js",
		publicPath: '/'
	},
	module: {
		loaders: [
			{
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap")
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
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js"),
    new ExtractTextPlugin("[name].bundle.css", {allChunks: true})
  ]
}
