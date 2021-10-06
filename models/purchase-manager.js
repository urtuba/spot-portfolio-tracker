const transactionDb = require('../database/transaction-db')
const Balance = require('./balance')
const Transaction = require('./transaction')

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
      const newBalance = new Balance(asset, amount, price)
      const firstTx = new Transaction(undefined, asset, Transaction.types.ADD, amount, price, 0)
      await transactionDb.insert(firstTx)

      newBalance.transactions.push(firstTx.id)
      wallet.transactions.push(firstTx.id)
      wallet.balances.push(newBalance)
      // console.error(`Asset added: ${error}`)
    }
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
      console.error(error)
      console.error(`${this.removeAsset.name} error: a balance for the asset does not exist!`)
    }
  }
}

module.exports = new PurchaseManager