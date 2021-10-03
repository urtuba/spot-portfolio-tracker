const uuid = require('uuid')
const Balance = require("./balance")
const Transaction = require('./transaction')
const walletManager = require('./wallet-manager')

const transactionDatabase = require('../database/transaction-db')

class Wallet {
  constructor(id=uuid.v4(), name) {
    this.id = id
    this.name = name
    this.balances = []
    this.transactions = []
  }

  static create(obj) {
    const wallet = new Wallet(obj.id, obj.name)
    wallet.balances = obj.balances.map(Balance.map)
    wallet.transactions = obj.transactions
  }
  
  get value() {
    let val = 0
    this.portfolio.forEach((balance) => {
      val += balance.value
    })
  }

  get pnl() {
    const txs = walletManager.getWalletTransactions(this)
    let pnl = 0
    txs.forEach((tx) => {
      pnl += tx.amount
    })
  }
}