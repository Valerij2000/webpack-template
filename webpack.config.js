const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');
const ImageminWebpWebpackPlugin= require("imagemin-webp-webpack-plugin");

const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development';
const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? 'source-map' : undefined;
const hbsPages = fs.readdirSync('src').filter(fileName => fileName.endsWith('.hbs')).map(el => el.slice(0, -4));

module.exports = {
  mode,
  target,
  devtool,
  devServer: {
    port: 3000,
    open: true,
    hot: true,
    watchFiles: [
      `src/**/*.hbs`
    ],
  },
  entry: ['@babel/polyfill', path.resolve(__dirname, 'src', 'webpack/index.js')],
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: false,
    filename: 'js/[name].[contenthash].js',
    assetModuleFilename: 'assets/[name][ext]'
  },
  plugins: [
    ...hbsPages.map(page => new HtmlWebpackPlugin({
      minify: true,
      filename: `${page}.html`,
      template: path.resolve(__dirname, 'src', `${page}.hbs`),
    })),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
    }),
    new SVGSpritemapPlugin('src/svg/**/*.svg', {
      output: {
        filename: 'svg/spritemap.svg',
      }
    }),
    new ImageminWebpWebpackPlugin(),
  ],
  module: {
    rules: [{
        test: /\.hbs$/i,
        use: [{
            loader: 'handlebars-loader',
            options: {
              inlineRequires: '\/img\/'
            },
          },
          {
            loader: 'string-replace-loader',
            options: {
              search: '@img',
              replace: path.resolve(__dirname, 'src', `img`),
              flags: 'g'
            }
          },
        ],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.(c|sa|sc)ss$/i,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [require('postcss-preset-env')],
              },
            },
          },
          {
            loader: 'string-replace-loader',
            options: {
              search: '@img',
              replace: '../img',
              flags: 'g'
            }
          },
          'group-css-media-queries-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: 'webpack-import-glob-loader'
      },
      {
        test: /\.woff2?$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]'
        }
      },
      {
        test: /\.(jpe?g|png|webp|gif|svg|ico)$/i,
        use: [{
          loader: 'image-webpack-loader',
          options: {
            mozjpeg: {
              progressive: true,
            },
            optipng: {
              enabled: false,
            },
            pngquant: {
              quality: [0.65, 0.90],
              speed: 4
            },
            gifsicle: {
              interlaced: false,
            },
            webp: {
              quality: 75
            },
          }
        }],
        type: 'asset/resource',
      },
      {
        test: /\.m?js$/i,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  resolve: {
    alias: {
      '@img': path.join(__dirname, 'src', 'img'),
      '@src': path.join(__dirname, 'src')
    },
  },
};