const path = require('path');

const merge = require('webpack-merge');
const webpackConfig = require('./webpack.config');

const webpack = require('webpack');

const dirJs = path.join(__dirname, '../src/js');

module.exports = merge(webpackConfig, {

  // devtool: '#inline-source-map', // or 'eval'
  entry: {
    bundle: path.join(dirJs, 'Randext.class.js'),
  },

  output: {
    // in the case of a "plain global browser library", this
    // will be used as the reference to our module that is
    // hung off of the window object.
    library: 'Randext',
    // We want webpack to build a UMD wrapper for our module
    libraryTarget: 'umd',
    // the destination file name
    filename: 'randext.min.js',
  },

  optimization: {
    minimize: true,
  },

  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
});
