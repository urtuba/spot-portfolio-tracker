const PortfolioEntry = require("./portfolio_entry")
const Transaction = require('./transaction')


class Wallet {
  constructor(name) {
    this.name = name
    this.portfolio = []
    this.transactions = []
  }

  static create(walletObj) {
    const wallet = new Wallet(walletObj.name)
    wallet.portfolio = walletObj.portfolio.map(PortfolioEntry.create)
    wallet.transactions = walletObj.transactions.map(Transaction.create)

    return wallet
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
    const firstTx = new Transaction(asset, Transaction.types.ADD, amount, price, 0)
    
    newEntry.transactions.push(firstTx)
    this.transactions.push(firstTx)
    this.portfolio.push(newEntry)
    
    return false
  }

  removeAsset(asset, price, savePNL) {
    const entry = this.getPortfolioEntry(asset)
    if (entry == null) return false

    const entryIdx = this.portfolio.indexOf(entry)
    this.portfolio.splice(entryIdx, 1)
    
    const pnl = savePNL ? entry.unrealizedPNL(price) : 0
    const tx = new Transaction(asset, Transaction.types.REMOVE, entry.amount, price, pnl)
    this.transactions.push(tx)

    return true
  }

  buyAsset(asset, amount, price) {
    const entry = this.getPortfolioEntry(asset)
    if (entry == null) return false

    const cost = (entry.avgBuyPrice * entry.boughtAmount) + (price * amount)
    entry.avgBuyPrice = cost / (amount + entry.boughtAmount)
    entry.amount += amount
    entry.boughtAmount += amount

    const tx = new Transaction(asset, Transaction.types.BUY, amount, price, 0)
    entry.transactions.push(tx)
    this.transactions.push(tx)

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
      const tx = new Transaction(asset, Transaction.types.SELL, amount, price, pnl)
      this.transactions.push(tx)

      return true
    }
    else {
      entry.amount -= amount
      const pnl = amount * (price - entry.avgBuyPrice)
      const tx = new Transaction(asset, Transaction.types.SELL, amount, price, pnl)

      this.transactions.push(tx)
      entry.transactions.push(tx)

      return true
    }
  }
}

module.exports = Wallet