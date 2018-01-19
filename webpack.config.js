const {resolve} = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
  },
  output: {
    path: resolve(__dirname, 'public'),
    filename: '[name].js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: resolve(__dirname, 'public'),
    port: 9000,
  },
  plugins: [
    new HtmlWebpackPlugin({title: 'WebGL Thang'}),
    new webpack.NamedModulesPlugin(),
  ],
  module: {
    rules: [
      { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] }
    ]
  },
}
