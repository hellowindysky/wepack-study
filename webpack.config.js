const path = require('path');
// const uglify = require('uglifyjs-webpack-plugin');
const webpack = require('webpack'); //访问内置的插件
const htmlPlugin = require('html-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');

var website = {
  publicPath: 'http://192.168.1.106:1717/'
};

module.exports = {
  entry: {
    entry: './src/entry.js',
    entry2: './src/entry2.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: website.publicPath
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: extractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              outputPath: 'images/'
            }
          }
        ]
      },
      {
        test: /\.(htm|html)$/i,
        use: [
          {
            loader: 'html-withimg-loader'
          }
        ]
      },
      {
        test: /\.less$/,
        use: extractTextPlugin.extract({
          use: [{
            loader: 'css-loader'
          },{
            loader: 'less-loader'
          }],
          fallback: 'style-loader'
        })
      }
    ]
  },
  plugins: [
    // new uglify()
    // new webpack.optimize.UglifyJsPlugin(),
    new htmlPlugin({
      minify: {
        removeAttributeQuotes: true
      },
      hash: true,
      template: './src/index.html'
    }),
    new extractTextPlugin('css/index.css')
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    host: '192.168.1.106',
    compress: true,
    port: 1717
  }
}