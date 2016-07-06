var path = require("path");
var webpack = require("webpack");

module.exports = {
	resolve: {
        modulesDirectories: ["web_modules","node_modules", "bower_components"]
    },
	entry:{
		app: "./src/app.js",
		vendor: [ "jquery" ]
	},
	output: {
		path: "./bin",
		filename: "app.bundle.js"
	},
	module: {
		loaders: [
			{ test: /\.css$/, loader: "style!css" },
			{ test: /\.json$/, loader: "json-loader"},
			{ 
				test: /\.js$/,
				loader: "babel-loader", 
				exclude: [/nocde_modules/, /bower_components/] , 
				include: path.resolve(__dirname, "src")
			}
		]
	},
	devtool: "#inline-source-map",
	devServer: {
        contentBase: "./bin",
    },
	plugins: [
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
        ),
        new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js")
    ]
}