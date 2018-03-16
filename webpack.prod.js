const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const OfflinePlugin = require('offline-plugin')

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new OfflinePlugin({
      autoUpdate: true,
      ServiceWorker: {
        events: true,
        navigateFallbackURL: '/',
      },
      AppCache: false,
    }),
  ],
})
