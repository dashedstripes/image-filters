const webpack = require('webpack')
const path = require('path')

const config = {

  entry: [
    './src/index.js'
  ],

  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js',
    publicPath: '/build'
  },

  module: {
    rules: [
      {
        test: /\.js$/, exclude: /node_modules/, loader: "babel-loader", options: {
          presets: ["es2016"]
        }
      }
    ]
  }
}

module.exports = config