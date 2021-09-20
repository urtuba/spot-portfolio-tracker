const uuid = require('uuid')
const PortfolioEntry = require("./portfolio-entry")
const Transaction = require('./transaction')

const transactionDatabase = require('../database/transaction-db')


/*
  PorfolioManager has the operations to make users manage their portfolio.
  It is some kind of superset of 'wallets' in usual portfolio tracker apps.
  Investors use PortfolioManager as their wallets.
*/
class PortfolioManager {
  constructor(id=uuid.v4(), portfolioName) {
    this.id = id
    this.portfolioName = portfolioName
    this.portfolio = []
    this.transactions = []
  }

  static create(pmObj) {
    const pm = new PortfolioManager(pmObj.id, pmObj.portfolioName)
    pm.portfolio = pmObj.portfolio.map(PortfolioEntry.create)
    pm.transactions = pmObj.transactions

    return pm
  }

  get allTransactions() {
    return this.transactions.map(id => transactionDatabase.findById(id))
  }

  get totalValue() {
    let totalValue = 0
    for (let i = 0; i < this.portfolio.length; i++) {
      totalValue += this.portfolio[i].value
    }
    return totalValue
  }

  get totalPNL() {
    let totalPNL = 0
    for (let i = 0; i < this.transactions.length; i++) {
      totalPNL += this.transactions[i].pnl
    }
    return totalPNL
  }

  getPortfolioEntry(asset) {
    for (let i = 0; i < this.portfolio.length; i++) {
      if (this.portfolio[i].asset == asset) {
        return this.portfolio[i]
      }
    }
    return null
  }

  addAsset(asset, amount, price) {
    const entry = this.getPortfolioEntry(asset)
    if (entry) return false

    const newEntry = new PortfolioEntry(asset, amount, price)
    const firstTx = new Transaction(undefined, asset, Transaction.types.ADD, amount, price, 0)
    
    transactionDatabase.insert(firstTx)
    newEntry.transactions.push(firstTx.id)
    this.transactions.push(firstTx.id)
    this.portfolio.push(newEntry)
    
    return false
  }

  removeAsset(asset, price, savePNL) {
    const entry = this.getPortfolioEntry(asset)
    if (entry == null) return false

    const entryIdx = this.portfolio.indexOf(entry)
    this.portfolio.splice(entryIdx, 1)
    
    const pnl = savePNL ? entry.unrealizedPNL(price) : 0
    const tx = new Transaction(undefined, asset, Transaction.types.REMOVE, entry.amount, price, pnl)

    transactionDatabase.insert(tx)
    this.transactions.push(tx.id)

    return true
  }

  buyAsset(asset, amount, price) {
    const entry = this.getPortfolioEntry(asset)
    if (entry == null) return false

    const cost = (entry.avgBuyPrice * entry.boughtAmount) + (price * amount)
    entry.avgBuyPrice = cost / (amount + entry.boughtAmount)
    entry.amount += amount
    entry.boughtAmount += amount

    const tx = new Transaction(undefined, asset, Transaction.types.BUY, amount, price, 0)
    
    transactionDatabase.insert(tx)
    entry.transactions.push(tx.id)
    this.transactions.push(tx.id)

    return false
  }

  sellAsset(asset, amount, price) {
    const entry = this.getPortfolioEntry(asset)
    if (entry == null) {
      return false
    }
    else if (amount == entry.amount) {
      const entryIdx = this.portfolio.indexOf(entry)
      this.portfolio.splice(entryIdx, 1)
      
      const pnl = entry.unrealizedPNL(price)
      const tx = new Transaction(undefined, asset, Transaction.types.SELL, amount, price, pnl)

      transactionDatabase.insert(tx)
      this.transactions.push(tx.id)

      return true
    }
    else {
      entry.amount -= amount
      const pnl = amount * (price - entry.avgBuyPrice)
      const tx = new Transaction(undefined, asset, Transaction.types.SELL, amount, price, pnl)

      transactionDatabase.insert(tx)
      this.transactions.push(tx.id)
      entry.transactions.push(tx.id)

      return true
    }
  }
}

module.exports = PortfolioManager