const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const history = require('connect-history-api-fallback')
const convert = require('koa-connect')

module.exports = merge(common, {
  mode: 'development',
  serve: {
    content: [__dirname],
    port: 3000,
    open: true,
    add: (app, middleware, options) => {
      app.use(convert(history()))
    },
  },
})
