const express = require('express')

const investorDb = require('./database/investor-db')
const app = express()

app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/investors', async (req, res) => {
  const investors = await investorDb.load()
  res.render('investors', { investors })
})

app.listen(3000, () => {
  console.log('listening on 3000')
})
