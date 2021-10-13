const uuid = require('uuid')
const Balance = require('./balance')
const walletManager = require('../managers/purchase-manager')

class Wallet {
  constructor (id = uuid.v4(), name) {
    this.id = id
    this.name = name
    this.balances = []
    this.transactions = []
  }

  static create (obj) {
    const wallet = new Wallet(obj.id, obj.name)
    wallet.balances = obj.balances.map(Balance.create)
    wallet.transactions = obj.transactions

    return wallet
  }

  get value () {
    let val = 0
    this.portfolio.forEach((balance) => {
      val += balance.value
    })
    return val
  }

  get pnl () {
    const txs = walletManager.getWalletTransactions(this)
    let pnl = 0
    txs.forEach((tx) => {
      pnl += tx.amount
    })
    return pnl
  }

  getBalance (assetId) {
    const bal = this.balances.find((b) => b.asset.id == assetId)
    if (bal == undefined) { throw Error('Balance entry not found.') }
    return bal
  }
}

module.exports = Wallet
