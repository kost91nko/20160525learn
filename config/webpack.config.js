var path = require("path");
var webpack = require("webpack");
var config = require("./common.config");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
var DEBUG = process.argv.indexOf('--release') === -1;

module.exports = {
	resolve: {
    extensions: ['.js', '.json', '.jsx'],
    modules: [config.path.src('src'), 'node_modules'],
  },
	entry:{
    polyfills: config.path.src('angular1/polyfills.js'),
    vendor: config.path.src('angular1/vendor.js'),
    app: config.path.src("app.js"),
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
          'style-loader',
          'css-loader?sourceMap',
          'resolve-url-loader'
        ],
      },
      {
        test: /\.less$/,
        loaders: [
          'style-loader',
          'css-loader?sourceMap',
          'less-loader?sourceMap',
          'resolve-url-loader'
        ],
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader?sourceMap&modules&importLoaders=1&localIdentName=[name]-[local]',
          'resolve-url-loader',
          'sass-loader?sourceMap'
        ]
      },
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
    new FaviconsWebpackPlugin({
        // Your source logo
        logo: config.path.src('favicon.png'),
        // The prefix for all image files (might be a folder or a name)
        prefix: 'icons-[hash]/',
        // Emit all stats of the generated icons
        emitStats: false,
        // The name of the json containing all favicon information
        statsFilename: 'iconstats-[hash].json',
        // Generate a cache file with control hashes and
        // don't rebuild the favicons until those hashes change
        persistentCache: true,
        // Inject the html into the html-webpack-plugin
        inject: true,
        // favicon background color (see https://github.com/haydenbleasel/favicons#usage)
        background: '#fff',
        // favicon app title (see https://github.com/haydenbleasel/favicons#usage)
        title: 'Webpack App',

        // which icons should be generated (see https://github.com/haydenbleasel/favicons#usage)
        icons: {
          android: false,
          appleIcon: false,
          appleStartup: false,
          coast: false,
          favicons: true,
          firefox: false,
          opengraph: false,
          twitter: false,
          yandex: false,
          windows: false
        }
      })
  ]
}
