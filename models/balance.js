// const Asset = require('./asset')
// const transactionDb = require('../database/transaction-db')
const mongoose = require('mongoose')

const BalanceSchema = new mongoose.Schema({
  asset: { type: mongoose.Schema.Types.ObjectId, ref: 'Asset', autopopulate: true },
  amount: Number,
  boughtAmount: Number,
  avgBuyPrice: Number,
  transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction', autopopulate: true }]
})

BalanceSchema.methods.value = () => {
  return this.amount * this.asset.price
}

BalanceSchema.methods.getUnrealizedPNL = () => {
  return this.amount * (this.asset.price - this.avgBuyPrice)
}

BalanceSchema.methods.getTotalPNL = () => {
  let totalPNL = 0
  for (let i = 0; i < this.transactions.length; i++) {
    totalPNL += this.transactions[i].pnl
  }
  return totalPNL
}

BalanceSchema.methods.getAllTransactions = () => {
  return this.transactions
}

BalanceSchema.plugin(require('mongoose-autopopulate'))
module.exports = mongoose.model('Balance', BalanceSchema)

// BalanceSchema.plugin(require('mongoose-autopopulate'))
// module.exports = mongoose.model('Balance', BalanceSchema)

// const Balance = mongoose.model('Balance', BalanceSchema)

// module.exports = Balance

// class Balance {
//   constructor (asset, amount, buyPrice) {
//     this.asset = asset
//     this.amount = amount
//     this.boughtAmount = amount
//     this.avgBuyPrice = buyPrice
//     this.transactions = []
//   }

//   static create (obj) {
//     const assetObj = obj.asset
//     const asset = new Asset(assetObj.id, assetObj.name, assetObj.symbol, assetObj.type)
//     const balance = new Balance(asset, obj.amount, obj.buyPrice)
//     balance.avgBuyPrice = obj.avgBuyPrice
//     balance.boughtAmount = obj.boughtAmount
//     balance.transactions = obj.transactions

//     return balance
//   }

//   value (price) {
//     return this.amount * price
//   }

//   unrealizedPNL (price) {
//     return this.amount * (price - this.avgBuyPrice)
//   }

//   get allTransactions () {
//     return this.transactions.map(async (id) => { await transactionDb.findById(id) })
//   }
// }

// module.exports = Balance
