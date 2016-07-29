var path = require("path");
var webpack = require("webpack");
var config = require("./common.config");
var gutil = require("gulp-util");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	resolve: {
    modulesDirectories: ["web_modules","node_modules"]
  },
	entry:{
  	app: config.path.src("app.js"),
		vendor: [ "jquery", "angular" ]
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
        loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap!sass-loader?sourceMap")
      },
			{ test: /\.json$/, loader: "json-loader"},
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
      { test: /bootstrap\/js\//,  loader: 'imports?jQuery=jquery' },
      { test: /\.(woff|woff2)$/,  loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf$/,           loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot$/,           loader: "file" },
      { test: /\.svg$/,           loader: "url?limit=10000&mimetype=image/svg+xml" }
		]
	},
	devtool: 'source-map',
	plugins: [
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js"),
    new ExtractTextPlugin("[name].bundle.css")
  ]
}
