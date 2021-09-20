const Asset = require('./asset')
const Transaction = require('./transaction')
const transactionDatabase = require('../database/transaction-db')


class PortfolioEntry {
  constructor(asset, amount, buyPrice) {
    this.asset = asset
    this.amount = amount
    this.boughtAmount = amount
    this.avgBuyPrice = buyPrice
    this.transactions = []
  }

  static create(portfolioObj) {
    const assetObj = portfolioObj.asset
    const asset = new Asset(assetObj.id, assetObj.name, assetObj.symbol, assetObj.type)
    const entry = new PortfolioEntry(asset, portfolioObj.amount, portfolioObj.avgBuyPrice)
    entry.boughtAmount = portfolioObj.boughtAmount
    entry.transactions = portfolioObj.transactions
    
    return entry
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
      totalPnl += transactionDatabase.fin
    }
    return totalPnl
  }

  get allTransactions() {
    return this.transactions.map(id => transactionDatabase.findById(id))
  }
}

module.exports = PortfolioEntry