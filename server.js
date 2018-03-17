const path = require('path')
const express = require('express')
const compression = require('compression')

const APP_PORT = 8080
const app = express()

app.use(compression())
app.use(express.static(path.resolve(__dirname, 'dist')))

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist/index.html'), err => {
    if (err) res.status(500).send(err)
  })
})

app.listen(APP_PORT, () =>
  // eslint-disable-next-line no-console
  console.log(`Go to http://localhost:${APP_PORT} to visit react app!`)
)
