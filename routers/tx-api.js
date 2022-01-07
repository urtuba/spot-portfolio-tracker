const transactionDb = require('../database/transaction-db')
const router = require('express').Router()

// GET ALL TRANSACTIONS
router.get('/all', async (req, res) => {
  console.log('GET: /tx/all')
  const transactions = await transactionDb.load()
  res.status(200).json({
    data: transactions
  })
})

// INSERT NEW TRANSACTION
router.post('/', async (req, res) => {
  req.body.time = new Date()
  await transactionDb.insert(req.body)

  res.status(200).json({
    status: 'success'
  })
})

// GET A TRANSACTION BY ID
router.get('/:id', async (req, res) => {
  const transaction = await transactionDb.findById(req.params.id)
  res.status(200).json(transaction)
})

module.exports = router
