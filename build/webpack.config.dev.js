const path = require('path');

const merge = require('webpack-merge');
const webpackConfig = require('./webpack.config');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Is the current build a development build
const IS_DEV = (process.env.NODE_ENV === 'dev');

const dirApp = path.join(__dirname, '../src');

module.exports = merge(webpackConfig, {

  devtool: '#inline-source-map', // or 'eval'

  devServer: {
    host: '0.0.0.0',
    port: 8000,
  },

  entry: {
    bundle: path.join(dirApp, 'index.js'),
  },

  output: {
    pathinfo: true,
    publicPath: '/',
    filename: '[name].js',
  },

  plugins: [
    new webpack.DefinePlugin({
      IS_DEV: IS_DEV,
    }),

    new HtmlWebpackPlugin({
      template: path.join(dirApp, 'index.html'),
    }),
  ],
});
