// const path = require('path');
// const HtmlWebpackPlug = require('html-webpack-plugin');
// const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default;
// const {CleanWebpackPlugin} = require("clean-webpack-plugin");
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const commonConfig = require('./webpack.common.js');
const {merge} = require('webpack-merge');

const prodConfig = {
  mode: 'production',
  // devtool: 'cheap-module-source-map',
  devtool: 'source-map',
}

module.exports = merge(commonConfig, prodConfig);