const BaseDatabase = require('./base-db')
const Asset = require('../models/asset')

class AssetDatabase extends BaseDatabase {
  constructor () {
    super(Asset)
  }

  async findByName (id, object) {
    return this.model.findByIdAndUpdate(id, object)
  }
}

module.exports = new AssetDatabase()
