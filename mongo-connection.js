const mongoose = require('mongoose')
const assetDb = require('./database/asset-db');

(async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/test')
    console.log('MONGODB: Connected!')
  } catch (err) {
    console.error('MONGODB: No Connection!\n', err)
  }

  await assetDb.insert({ name: 'Bitcoin', symbol: 'BTC', type: 'Coin' })
})()
