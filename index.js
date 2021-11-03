const express = require('express')
const bcrypt = require('bcrypt')

const Investor = require('./models/investor')
const assetDb = require('./database/asset-db')
const investorDb = require('./database/investor-db')

const app = express()
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'pug')

// HOMEPAGE
app.get('/', (req, res) => {
  res.render('index')
})

// USER: register-get
app.get('/register', (req, res) => {
  res.render('register')
})

// USER: register-put
app.post('/register', async (req, res) => {
  console.log(req)
  if (req.body.confirm == undefined) {
    console.error('REGISTER: no confirmation')
    res.redirect('/register')
    return
  }

  try {
    const pwdHash = await bcrypt.hash(req.body.password, 10)
    const user = new Investor(undefined, req.body.name, req.body.email, pwdHash)
    await investorDb.insert(user)
    console.log(`REGISTER: new user ${user.id}`)
    res.status(201).redirect('/login')
  } catch (error) {
    console.error(error)
    res.status(500).send()
  }
})
// ===== //

// USER: login-get
app.get('/login', (req, res) => {
  res.render('login')
})

// USER: login-post
app.post('/login', async (req, res) => {
  console.log(req.body)
  if (req.body.email == undefined || req.body.password == undefined) {
    console.error('LOGIN: lack of information')
    res.redirect('login')
    return
  }

  const user = await investorDb.findByEmail(req.body.email)
  if (user == undefined) {
    console.error('LOGIN: user not found')
    res.redirect('login')
    return
  }

  try {
    const validPwd = await bcrypt.compare(req.body.password, user.password)
    if (validPwd) {
      console.log(`LOGIN: user ${user.id}`)
      res.status(200).redirect('/')
      return
    }
    console.error('LOGIN: invalid pwd')
    res.status(500).send()
  } catch (error) {
    console.log(error)
  }
})

// GENERAL: get-assets
app.get('/assets', async (req, res) => {
  const assets = await assetDb.load()
  res.status(200).render('assets', { assets: assets })
  // links not working, why?
})

// GENERAL: get-asset-info
app.get('/asset', async (req, res) => {
  try {
    const asset = await assetDb.findById(req.query.id)
    res.status(200).render('asset', { asset: asset })
  } catch (err) {
    console.error('GET ASSET: not found')
    res.status(404).send(`Not found ${req.query.id}`)
  }
})

app.listen(3000, () => {
  console.log('listening on 3000')
})
