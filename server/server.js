const webpack = require('webpack');
const express = require('express');

// 监听服务变化
const WebpackDevMiddleware = require('webpack-dev-middleware');

// 导入配置文件
const config = require('../webpack.config.js');

// 返回webpack的编辑器
// complier 的意思就是 通过 webpack 和 其配置文件，可以随时对文件进行编译
const complier = webpack(config);

// 创建服务器实例
const app = new express();

// 中间件可以接受两个参数,编辑器和其他参数.
app.use(WebpackDevMiddleware(complier,{}));

app.listen(1200,()=>{
  console.log('server is running')
});