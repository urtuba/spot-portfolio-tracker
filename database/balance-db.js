const BaseDatabase = require('./base-db')
const Balance = require('../models/balance')

class BalanceDatabase extends BaseDatabase {
  constructor () {
    super(Balance)
  }
}

module.exports = new BalanceDatabase()
