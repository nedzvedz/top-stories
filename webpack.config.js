"use strict";

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const path = require('path');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: NODE_ENV == 'development' ? ["webpack-dev-server/client", "./src/js/topStories.js"] : "./src/js/topStories.js",
  output: {
    path: __dirname + "/build",
    publicPath: 'http://localhost:8080/build',
    filename: NODE_ENV == 'production' ? "js/main.min.js" : "js/main.js"
  },

  watch: NODE_ENV == "development",
  watchOptions: {
    aggregateTimeout: 100
  },

  devtool: NODE_ENV == 'development' ? "source-map" : null,

  resolve: {
    modulesDirectories: ['node_modules'],
    extentions: ['', '.js']
  },

  resolveLoader: {
    modulesDirectories: ['node_modules'],
    moduleTemplates: ['*-loader'],
    extentions: ['', '.js', '.scss']
  },

  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel',
      query: {
        presets: ['es2015']
      }
    }, {
      test: /\.scss/,
      include: [
        path.resolve(__dirname, 'src/components')
      ],
      loader: 'style!css!sass'
    }, {
      test: /\.scss$/,
      include: [
        path.resolve(__dirname, 'src/scss')
      ],
      loader: ExtractTextPlugin.extract('style', 'css?sourceMap!sass?sourceMap')
    }, {
      test: /\.jade$/,
      loader: 'jade'
    }]
  },

  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV)
    }),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('css/[name].css', {allChunks: true})
  ],

  devServer: {
   contentBase: __dirname
  }

};

if (NODE_ENV == 'production') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true,
        unsafe: true
      }
    })
  );
}