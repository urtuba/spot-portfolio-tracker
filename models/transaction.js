class Transaction {
  static types = {
    ADD: 'Add',
    BUY: 'Buy',
    SELL: 'Sell',
    REMOVE: 'Remove'
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

module.exports = Transaction