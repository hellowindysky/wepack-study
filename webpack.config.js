const path = require('path');
const glob = require('glob');
// const uglify = require('uglifyjs-webpack-plugin');
const webpack = require('webpack'); //访问内置的插件
const htmlPlugin = require('html-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');
const purifyCssPlugin = require('purifycss-webpack');
const entry = require('./webpack_config/entry_webpack.js');

/*这节课我不懂的一个问题，我不自己手动打包，我直接运行npm run server在浏览器，
  下面的条件判断是成立不了的*/
var website = {
  publicPath: 'http://192.168.1.106:1717/'
};

if (process.env.type === 'build') {
  var website = {
    publicPath: 'http://jspang.com:1717/'
  };
} else if (process.env.type === 'buildbeta') {
  var website = {
    publicPath: 'http://192.168.1.106:1717/'
  };
}
console.log(encodeURIComponent(process.env.type));

module.exports = {
  devtool: 'source-map',
  entry: entry.path,
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
          fallback: 'style-loader',
          use: [
            {loader: 'css-loader'},
            'postcss-loader'
          ]
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
      },
      {
        test: /\.scss$/,
        use: extractTextPlugin.extract({
          use: [{
            loader: 'css-loader'
          },{
            loader: 'sass-loader'
          }],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    // new uglify()
    // new webpack.optimize.UglifyJsPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new htmlPlugin({
      minify: {
        removeAttributeQuotes: true
      },
      hash: true,
      template: './src/index.html'
    }),
    new extractTextPlugin('css/index.css'),
    new purifyCssPlugin({
      paths: glob.sync(path.join(__dirname, 'src/*.html'))
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    host: '192.168.1.106',
    compress: true,
    port: 1717
  }
}