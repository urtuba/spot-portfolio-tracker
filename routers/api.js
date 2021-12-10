const assetDb = require('../database/asset-db')

const router = require('express').Router()

router.get('/health', async (req, res) => {
  const resp = {
    message: 'ok'
  }
  res.status(200).json(resp)
})
