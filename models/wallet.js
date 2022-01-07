const mongoose = require('mongoose')

const WalletSchema = new mongoose.Schema({
  name: String,
  balances: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Balance', autopopulate: true }],
  transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction', autopopulate: true }]
})

WalletSchema.methods.getValue = () => {
  let value = 0
  this.balances.forEach(balance => {
    value += balance.value
  })
  return value
}

WalletSchema.methods.getTotalPNL = () => {
  let totalPNL = 0
  this.transactions.forEach(transaction => {
    totalPNL += transaction.pnl
  })
  return totalPNL
}

WalletSchema.methods.getAllTransactions = () => {
  return this.transactions
}

WalletSchema.methods.getBalance = (assetId) => {
  this.balances.find(balance => {
    return balance.asset.id == assetId
  })
}

WalletSchema.plugin(require('mongoose-autopopulate'))
module.exports = mongoose.model('Wallet', WalletSchema)
