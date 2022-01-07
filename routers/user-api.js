const balanceDb = require('../database/balance-db')
const walletDb = require('../database/wallet-db')
const investorDb = require('../database/investor-db')
const router = require('express').Router()
const bcrypt = require('bcrypt')

// REGISTER NEW USER
router.post('/', async (req, res) => {
  console.log(req.body)

  if (req.body.confirm == undefined) {
    console.error('REGISTER: no confirmation')
    const resp = {
      message: 'no confirmation'
    }

    res.status(400).send(resp)
    return
  }

  try {
    const pwdHash = await bcrypt.hash(req.body.password, 10)
    const mainWallet = await walletDb.insert({ name: 'Main', balances: [] })
    const newInvestor = {
      name: req.body.name,
      email: req.body.email,
      password: pwdHash,
      wallets: [mainWallet]
    }

    const user = await investorDb.insert(newInvestor)

    console.log(`REGISTER: new user ${res}`)
    res.status(201).send({ data: user })
  } catch (error) {
    console.error(error)
    res.status(500).send({
      message: 'internal server error'
    })
  }
})

// GET ALL USERS
router.get('/all', async (req, res) => {
  const resData = await investorDb.load()
  res.status(200).send(resData)
})

module.exports = router
