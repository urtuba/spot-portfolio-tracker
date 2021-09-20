const uuid = require('uuid')
const Asset = require('./asset')


class Transaction {
  static types = {
    ADD: 'Add',
    BUY: 'Buy',
    SELL: 'Sell',
    REMOVE: 'Remove'
  }
  
  constructor(id=uuid.v4(), asset, type, amount, price, pnl) {
    this.id = id
    this.time = new Date().getTime()
    this.asset = asset
    this.type = type
    this.amount = amount
    this.price = price
    this.pnl = pnl
  }

  static create(txObj) {
    const assetObj = txObj.asset
    const asset = new Asset(assetObj.name, assetObj.symbol, assetObj.type)
    const tx = new Transaction(txObj.id, asset, txObj.type, txObj.amount, txObj.price, txObj.pnl)
    tx.time = txObj.time

    return tx
  }
}

module.exports = Transaction