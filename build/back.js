'use strict'

const fs = require('fs')
const R = require('ramda')
const webpack = require('webpack')

const nodeModules = fs.readdirSync('node_modules')
.filter(function(x) {
  return ['.bin'].indexOf(x) === -1;
})
.reduce(function(acc, mod) {
  let newMods = Object.assign({}, acc)
  newMods[mod] = 'commonjs ' + mod
  return newMods
}, {})

function base() {
  return {
    entry: ['./app/app.js'],
    target: 'node',
    devtool: 'source-map',
    output: {
      path: './dist',
      filename: 'app.bundle.js',
    },
    externals: nodeModules,
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
      },{
        test: /\.json$/,
        loader: 'json'
      }]
    },
    plugins: [
      new webpack.BannerPlugin(
        'require("source-map-support").install();',
        {raw: true, entryOnly: false}
      )
    ]
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
