const path = require('path');
const HtmlWebpackPlug = require('html-webpack-plugin');
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default;
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: {
    main: './doc/js/main.js',
    platform: './doc/js/platform.js',
  },
  output: {
    publicPath: '',
    filename: '[name]-[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'development',
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
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
        // include: path.resolve(__dirname, 'doc')
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          }, 
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: true //样式模块引入
            }
          },
          'postcss-loader',
          'less-loader',
        ],
        exclude: path.resolve(__dirname, 'node_modules')
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          }, 
          'css-loader', 'postcss-loader', {
          loader: 'px2rem-loader',
          options: {
            remUnit: 14, // rem 相对 px 转换的单位，1rem = 75px
            remPrecision: 8 // px 转化为 rem 小数点的位数
          }
        }],
        exclude: path.resolve(__dirname, 'node_module')
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          }, 
          'css-loader', 
          'sass-loader', 
          'postcss-loader'
        ],
        exclude: path.resolve(__dirname, 'node_module')
      },
      {
        test: /\.(gif|png|jpe?g|eot|woff|ttf|svg|pdf)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name]_[hash].[ext]',
            outputPath: 'other/',
            limit: 10240
          }
        }
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlug({
      title:'test webpack',
      template: './doc/index.html',
      filename: 'main.html',
      showErrors: true,
      chunks: ["main"],
      minify: {
        removeComments: true, //清理html中的注释
        collapseWhitespace: true, //清理html中的空格、换行符。
        minifyCSS: true, //压缩html内的样式。
        minifyJS: true, //压缩html内的js。
        // removeEmptyElements: true, //清理内容为空的元素。
        // caseSensitive: true, //以区分大小写的方式处理自定义标签内的属性。
      }
    }),
    new HtmlWebpackPlug({
      title:'test webpack',
      template: './doc/index.html',
      filename: 'platform.html',
      showErrors: true,
      chunks: ["platform"],
      minify: {
        removeComments: true, //清理html中的注释
        collapseWhitespace: true, //清理html中的空格、换行符。
        minifyCSS: true, //压缩html内的样式。
        minifyJS: true, //压缩html内的js。
        // removeEmptyElements: true, //清理内容为空的元素。
        // caseSensitive: true, //以区分大小写的方式处理自定义标签内的属性。
      }
    }),
    // new HTMLInlineCSSWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css'
    }),
    new webpack.HotModuleReplacementPlugin(),
  ]
}