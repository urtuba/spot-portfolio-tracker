const assetDb = require('../database/asset-db')
const router = require('express').Router()

// CREATE NEW ASSET
router.post('/', async (req, res) => {
  await assetDb.insert({
    name: req.body.name,
    symbol: req.body.symbol,
    type: req.body.type
  })
  res.status(200).json({
    status: 'success'
  })
})

// GET ALL ASSETS
router.get('/all', async (req, res) => {
  const assets = await assetDb.load()
  res.status(200).json({
    data: assets
  })
})

// GET AN ASSET BY ID
router.get('/:id', async (req, res) => {
  const asset = await assetDb.findById(req.params.id)
  res.status(200).json(asset)
})

// UPDATE AN ASSET BY ID
router.patch('/:id', async (req, res) => {
  const { name } = req.body
  await assetDb.update(req.params.id, name)
})

module.exports = router
