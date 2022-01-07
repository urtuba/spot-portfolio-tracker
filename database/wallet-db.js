const BaseDatabase = require('./base-db')
const Wallet = require('../models/wallet')

class WalletDatabase extends BaseDatabase {
  constructor () {
    super(Wallet)
  }
}

module.exports = new WalletDatabase()
