const Transaction = require("./transaction")

class OwnedAsset {
  constructor(asset, amount, buyPrice) {
    this.asset = asset
    this.amount = amount
    this.boughtAmount = amount
    this.avgBuyPrice = buyPrice
    
    const firstTx = new Transaction(asset, Transaction.types.add, amount, buyPrice, 0)
    this.transactions = [firstTx]
  }

  get value() {
    return this.amount * this.avgBuyPrice
  }

  sell(amount, price) {
    this.amount -= amount
    const pnl = amount * (price - this.avgBuyPrice)
    const tx = new Transaction(this.asset, Transaction.types.sell, amount, price, pnl)
    this.transactions.push(tx)
    return tx
  }

  buy(amount, price) {
    const cost = (this.avgBuyPrice * this.boughtAmount) + (price * amount)
    this.avgBuyPrice = cost / (amount + this.boughtAmount)
    this.boughtAmount += amount
    this.amount += amount
    const tx = new Transaction(this.asset, Transaction.types.buy, amount, price, 0)
    this.transactions.push(tx)
    return tx
  }

  unrealizedPNL(price) {
    return this.amount * (price - this.avgBuyPrice)
  }

  get totalPNL() {
    let totalPnl = 0
    for (let i = 0; i < this.transactions.length; i++) {
      totalPnl += this.transactions[i].pnl
    }
    return totalPnl
  }
}

module.exports = OwnedAsset