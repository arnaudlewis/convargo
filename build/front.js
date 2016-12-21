'use strict'

const fs = require('fs')
const R = require('ramda')
const webpack = require('webpack')

function base() {
  return {
    entry: ['./client/client.js'],
    devtool: 'source-map',
    output: {
      path: './public/javascripts/compiled/',
      filename: 'front.js',
    },
    module: {
      loaders: [{
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      }]
    },
  }
}

function prod() {
  const addons = {
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
        output: {
          comments: false,
        },
      }),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': '"production"'
        }
      })
    ]
  }

  return R.merge(base(), addons)
}

module.exports.prod = prod()
module.exports.base = base()
