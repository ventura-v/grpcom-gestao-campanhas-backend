const express = require('express')

const app = express()

const port = process.env.PORT || 3000

const path = '/api/v1/status'

// const status = require('./pages/api/v1/status')

// app.use(path, status)

app.get('/', (req, res) => {
    res.send('Welcome to the API');
  });

app.get(path, (req, res) => {
    res.status(200).json({ key: "API running" })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})