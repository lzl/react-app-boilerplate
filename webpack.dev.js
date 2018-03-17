const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const history = require('connect-history-api-fallback')
const convert = require('koa-connect')
const Stylish = require('webpack-stylish')
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: '[name].[hash:8].js',
    sourceMapFilename: '[name].[hash:8].map',
  },
  devtool: 'source-map',
  serve: {
    content: [__dirname],
    port: 3000,
    open: true,
    dev: {
      stats: 'none',
    },
    // eslint-disable-next-line
    add: (app, middleware, options) => {
      app.use(convert(history()))
    },
  },
  plugins: [new Stylish(), new ErrorOverlayPlugin()],
})
