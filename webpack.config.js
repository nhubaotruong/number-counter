const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
require('@babel/register');
require('@babel/polyfill');

module.exports = () => {
  return {
    mode: 'production',
    entry: './src/index.js',
    devtool: 'none',
    output: {
      filename: 'js/[name].js',
      path: path.join(__dirname, 'dist')
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin(),
        new OptimizeCssAssetsPlugin({
          cssProcessorOptions: {
            discardComments: {
              removeAll: true
            }
          },
          canPrint: true
        })
      ],
      splitChunks: {
        chunks: 'all',
      },
    },
    resolve: {
      extensions: ['.scss', '.js', '.jsx', '.css']
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: [/node_modules/],
          loader: "babel-loader"
        },
        {
          test: /\.module\.s(a|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: true,
              }
            },
            'sass-loader',
          ]
        },
        {
          test: /\.s(a|c)ss$/,
          exclude: [/\.module\.s(a|c)ss$/, /\.scoped\.s(a|c)ss$/],
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
          ]
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader'
            }
          ]
        },
        {
          test: /\.css$/,
          exclude: [/\.scoped\.css$/],
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader'
          ]
        },
        {
          test: /\.scoped\.s(a|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            // 'style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                importLoaders: 2
              }
            },
            'scoped-css-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.scoped\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                importLoaders: 2,
              }
            },
            'scoped-css-loader',
          ]
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                name: '[name].[ext]',
                outputPath: './fonts/'
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: path.join(__dirname, 'public', 'index.html'),
        filename: 'index.html',
        favicon: './public/favicon.ico'
      }),
      // new HtmlWebpackPugPlugin(),
      new MiniCssExtractPlugin({
        filename: 'css/[name].css'
      }),
    ],
    devServer: {
      inline: true,
      port: 5000,
      historyApiFallback: true,
      contentBase: path.join(__dirname, 'public'),
      compress: true,
    },
    node: {
      fs: 'empty'
    }
  }
}