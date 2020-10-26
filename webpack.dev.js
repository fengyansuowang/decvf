// const HtmlWebpackPlug = require('html-webpack-plugin');
// const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default;
// const {CleanWebpackPlugin} = require("clean-webpack-plugin");
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const devConfig = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer:{
    contentBase: path.resolve(__dirname, 'dist'),  // 指定目录 起 服务器
    open: true,// 项目启动自动打开浏览器
    port: 3000, // 在 8080 端口起服务
    openPage: 'main.html',
    historyApiFallback: true,
    open: true,
    hot: true,
    hotOnly: true
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ]
}

module.exports = merge(commonConfig, devConfig);