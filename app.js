const express = require('express')
const status = require('./pages/api/v1/status/index.js')

const app = express()
const port = 3000
const path = '/api/v1/status'

app.get('/', (req, res) => {
    res.send('Welcome to the API');
  });

app.get(path, status)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})