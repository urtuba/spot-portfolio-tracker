const Transaction = require('../models/transaction')
const BaseDatabase = require('./base-db')

class TransactionDatabase extends BaseDatabase {
  constructor () {
    super(Transaction)
  }
}

module.exports = new TransactionDatabase()
