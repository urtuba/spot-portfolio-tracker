const transactionDb = require('../database/transaction-db')
const Balance = require('../models/balance')
const Transaction = require('../models/transaction')

class PurchaseManager {
  async getTransactions (wallet) {
    const allTx = await transactionDb.load()
    const walletTx = wallet.transactions.map((tx_id) => {
      return allTx.find(tx => tx_id == tx.id)
    })
    return walletTx
  }

  async addAsset (wallet, asset, amount, price) {
    try {
      const balance = wallet.getBalance(asset.id)
      throw Error(`${this.addAsset.name} error. Balance already exists! Buy or Sell.`)
    }
    catch (error) {
      console.error('Expected Error(NOPE): '+ error)
    }
    const newBalance = new Balance(asset, amount, price)
    const firstTx = new Transaction(undefined, asset, Transaction.types.ADD, amount, price, 0)
    await transactionDb.insert(firstTx)

    newBalance.transactions.push(firstTx.id)
    wallet.transactions.push(firstTx.id)
    wallet.balances.push(newBalance)
  }

  async removeAsset(wallet, asset, price, savePnl) {
    try {
      const balance = wallet.getBalance(asset.id)
      const index = wallet.balances.findIndex((b) => b.asset.id == balance.asset.id)
      wallet.balances.splice(index, 1)

      const pnl = savePnl ? balance.unrealizedPNL(price) : 0
      const tx = new Transaction(undefined, asset, Transaction.types.REMOVE, balance.amount, price, pnl)

      await transactionDb.insert(tx)
      wallet.transactions.push(tx.id)
    }
    catch (error) {
      console.error(`${this.removeAsset.name} error: ${error}`)
    }
  }

  async buyAsset(wallet, asset, amount, price) {
    try {
      const balance = wallet.getBalance(asset.id)
      
      const cost = (balance.avgBuyPrice * balance.boughtAmount) + (price * amount)
      balance.avgBuyPrice = cost / (amount + entry.boughtAmount)
      balance.boughtAmount += amount
      balance.amount += amount

      const tx = new Transaction(undefined, asset, Transaction.types.BUY, amount, price, 0)
      await transactionDb.insert(tx)
      balance.transactions.push(tx.id)
      wallet.transactions.push(tx.id)
    }
    catch (error) {
      console.error(`${this.buyAsset.name} error: ${error}`)
    }
  }

  async sellAsset(wallet, asset, amount, price) {
    try {
      const balance = wallet.getBalance(asset.id)
      
      if (amount > balance.amount)
        throw console.error('Insufficient balance to sell!');

      balance.amount -= amount
      const pnl = amount * (price - balance.avgBuyPrice)
      const tx = new Transaction(undefined, asset, Transaction.types.SELL, amount, price, pnl)

      await transactionDb.insert(tx)
      balance.transactions.push(tx.id)
      wallet.transactions.push(tx.id)
    }
    catch (error) {
      console.error(`${this.sellAsset.name} error: ${error}`)
    }
  }
}

module.exports = new PurchaseManager