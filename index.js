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
app.get('/assets', async (req, res) => {
  const assets = await assetDb.load()
  console.log('allah')
  res.render('assets', { assets: assets })
})

app.get('/asset/:id', async (req, res) => {
  const id = req.params.id
  res.render('login', { id: id })
})

app.route('/hello/:num', async (req, res) => {
  res.send('hello ' + req.params.num)
})

app.listen(3000, () => {
app.listen(3001, () => {
  console.log('listening on 3000')
})
