// const uuid = require('uuid')

const mongoose = require('mongoose')

const AssetSchema = new mongoose.Schema({
  name: String,
  symbol: String,
  type: String
})

module.exports = mongoose.model('Asset', AssetSchema)
