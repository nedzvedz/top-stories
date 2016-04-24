"use strict";

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: ["webpack-dev-server/client", "webpack/hot/dev-server", "./src/js/topStories.js"],
  output: {
    path: __dirname + "/build/js",
    filename: NODE_ENV == 'production' ? "main.min.js" : "main.js"
  },

  watch: NODE_ENV == "development",
  watchOptions: {
    aggregateTimeout: 100
  },

  devtool: NODE_ENV == 'development' ? "source-map" : null,

  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV)
    }),
    new webpack.HotModuleReplacementPlugin()
  ],

  module: {
    loaders: [{
      test: /\.js$/,
      include: [
        path.resolve(__dirname, "src/js")
      ],
      loader: 'babel?presets[]=es2015'
    }]
  },

  devServer: {
    hot: true
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