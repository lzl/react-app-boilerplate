/* global document, window */
/* eslint no-console: ["error", { allow: ["log"] }] */
import React from 'react'
import { render } from 'react-dom'
import OfflinePluginRuntime from 'offline-plugin/runtime'

import App from './app'

render(<App />, document.getElementById('app'))

OfflinePluginRuntime.install({
  onUpdating: () => {
    console.log('SW Event:', 'onUpdating')
  },
  onUpdateReady: () => {
    console.log('SW Event:', 'onUpdateReady')
    // Tells to new SW to take control immediately
    OfflinePluginRuntime.applyUpdate()
  },
  onUpdated: () => {
    console.log('SW Event:', 'onUpdated')
    // Reload the webpage to load into the new version
    window.location.reload()
  },

  onUpdateFailed: () => {
    console.log('SW Event:', 'onUpdateFailed')
  },
})
