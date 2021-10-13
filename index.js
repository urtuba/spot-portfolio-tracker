const express = require('express')

const investorDb = require('./database/investor-db')

const app = express()

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`)
})

app.get('/investors', async (req, res) => {
  const investors = await investorDb.load()
  res.send(JSON.stringify(investors))
})

app.listen(3000, () => {
  console.log('listening on 3000')
})
