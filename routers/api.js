const router = require('express').Router()

router.get('/health', async (req, res) => {
  const resp = {
    message: 'ok'
  }
  res.status(200).json(resp)
})

module.exports = router
