class Transcation {
  static types = {
    add: 'Add',
    buy: 'Buy',
    sell: 'Sell',
    remove: 'Remove'
  }
  
  constructor(asset, type, amount, price, pnl) {
    this.time = new Date().getTime()
    this.asset = asset
    this.type = type
    this.amount = amount
    this.price = price
    this.pnl = pnl
  }
}

module.exports = Transcation