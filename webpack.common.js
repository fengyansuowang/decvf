const path = require('path');
const HtmlWebpackPlug = require('html-webpack-plugin');
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default;
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');

module.exports = {
  entry: {
    main: './doc/js/main.js',
    platform: './doc/js/platform.js',
  },
  
  output: {
    publicPath: '',
    filename: '[name]-[chunkhash:8].js',
    path: path.resolve(__dirname, 'dist')
  },

  /**
   * webpack中实现代码分割的两种方式：
   * 1.同步代码：只需要在webpack配置文件总做optimization的配置即可
   * 2.异步代码(import)：异步代码，无需做任何配置，会自动进行代码分割，放置到新的文件中
   * 3.分离文件必须大于30kb，才可以分离成功，否则设置无效
   */
  optimization: {
    splitChunks: {
      chunks: "all",          //async对异步引入的代码分割 initial对同步引入代码分割 all对同步异步引入的分割都开启
      minSize: 30000,         //字节 引入的文件大于30kb才进行分割
      //maxSize: 50000,         //50kb，尝试将大于50kb的文件拆分成n个50kb的文件
      minChunks: 1,           //模块至少使用次数
      maxAsyncRequests: 5,    //同时加载的模块数量最多是5个，只分割出同时引入的前5个文件（按需加载模块）
      maxInitialRequests: 3,  //首页加载的时候引入的文件最多3个（加载初始页面）
      automaticNameDelimiter: '~', //缓存组和生成文件名称之间的连接符
      name: true,                  //缓存组里面的filename生效，覆盖默认命名
      cacheGroups: { //缓存组，将所有加载模块放在缓存里面一起分割打包
        vendors: {  //自定义打包模块
          test: /[\\/]node_modules[\\/]/,
          priority: -10, //优先级，先打包到哪个组里面，值越大，优先级越高
          filename: 'vendors.js',
        },
        default: { //默认打包模块
          priority: -20,
          reuseExistingChunk: true, //模块嵌套引入时，判断是否复用已经被打包的模块
          filename: 'common.js'
        }
      }
    }
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

    new BundleAnalyzerPlugin({
      analyzerHost: '127.0.0.1',
      analyzerPort: 8000,
      openAnalyzer: false,
    }),
  ]
}