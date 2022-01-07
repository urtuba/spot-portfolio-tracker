const BaseDatabase = require('./base-db')
const Asset = require('../models/asset')

class AssetDatabase extends BaseDatabase {
  constructor () {
    super(Asset)
  }
}

module.exports = new AssetDatabase()
