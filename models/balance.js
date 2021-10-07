const Asset = require('./asset')
const transactionDb = require('../database/transaction-db')


class Balance {
  constructor(asset, amount, buyPrice) {
    this.asset = asset
    this.amount = amount
    this.boughtAmount = amount
    this.avgBuyPrice = buyPrice
    this.transactions = []
  }

  static create(obj) {
    const assetObj = obj.asset
    const asset = new Asset(assetObj.id, assetObj.name, assetObj.symbol, assetObj.type)
    const balance = new Balance(asset, obj.amount, obj.buyPrice)
    balance.avgBuyPrice = obj.avgBuyPrice
    balance.boughtAmount = obj.boughtAmount
    balance.transactions = obj.transactions
    
    return balance
  } 

  value(price) {
    return this.amount * price
  }

  unrealizedPNL(price) {
    return this.amount * (price - this.avgBuyPrice)
  }

  get totalPNL() {
    let totalPnl = 0
    for (let i = 0; i < this.transactions.length; i++) {
      totalPnl += transactionDb.fin
    }
    return totalPnl
  }

  get allTransactions() {
    return this.transactions.map(async (id) => {await transactionDb.findById(id)})
  }
}

module.exports = Balance