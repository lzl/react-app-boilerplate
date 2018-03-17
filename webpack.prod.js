const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const OfflinePlugin = require('offline-plugin')

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: '[name].[chunkhash:8].js',
    sourceMapFilename: '[name].[chunkhash:8].map',
  },
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
