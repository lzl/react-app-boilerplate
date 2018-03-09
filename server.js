const path = require('path')
const express = require('express')
const compression = require('compression')

const APP_PORT = 3000
const app = express()

app.use(compression())
app.use(express.static(__dirname + '/dist'))

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'), err => {
    if (err) res.status(500).send(err)
  })
})

app.listen(APP_PORT, () =>
  console.log(`Go to http://localhost:${APP_PORT} to visit react app!`)
)
