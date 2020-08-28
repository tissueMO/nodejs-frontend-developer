// 各種プラグインのロード
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AutoPrefixer = require('autoprefixer');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const app = {
  entry: {
    app: [
      './src/js/main.js',
      './src/scss/style.scss',
    ],
  },
  output: {
    filename: 'js/[name].min.js',
    // サブディレクトリー以下に公開できるようにするためにパスの起点を省略する
    publicPath: '',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: [
          { loader: 'eslint-loader' },
        ],
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                AutoPrefixer(),
              ],
            },
          },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          minimize: true,
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: (resourcePath, _) => {
              const basePath = path.join(__dirname, 'src/');
              return resourcePath
                .substring(basePath.length)
                .replace(/\\/g, '/');
            },
            esModule: false,
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/style.min.css',
    }),
    new CopyWebpackPlugin(
      [
        {
          context: 'src/img',
          from: '**/*',
          to: 'img',
        },
      ],
    ),
    new HtmlWebpackPlugin({
      template: "src/index.html"
    }),
  ],
  performance: {
    hints: false,
  },
};

module.exports = {
  app: app,
};
