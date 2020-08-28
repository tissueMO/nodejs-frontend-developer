// 各種プラグインのロード
const merge = require('webpack-merge');
const common = require('./webpack.common.js');


// 開発用サーバーの設定追加分
module.exports = merge(common.app, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    contentBase: '/src/dist',
    watchContentBase: true,
    host: '0.0.0.0',
    port: 3000,
    open: true,
  }
})
