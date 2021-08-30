class PortfolioEntry {
  constructor(asset, amount, buyPrice) {
    this.asset = asset
    this.amount = amount
    this.boughtAmount = amount
    this.avgBuyPrice = buyPrice
    this.transactions = []
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
      totalPnl += this.transactions[i].pnl
    }
    return totalPnl
  }
}

module.exports = PortfolioEntry