// const uuid = require('uuid')
const mongoose = require('mongoose')

const TransactionTypes = ['BUY', 'SELL', 'ADD', 'REMOVE']

const TransactionSchema = new mongoose.Schema({
  time: Date,
  type: { type: String, enum: TransactionTypes },
  asset: { type: mongoose.Schema.Types.ObjectId, ref: 'Asset', autopopulate: true },
  amount: Number,
  price: Number,
  pnl: Number
})

TransactionSchema.plugin(require('mongoose-autopopulate'))
module.exports = mongoose.model('Transaction', TransactionSchema)
