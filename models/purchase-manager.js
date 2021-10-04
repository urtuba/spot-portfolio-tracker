const transactionDb = require('../database/transaction-db')

class PurchaseManager {
    async getTransactions (wallet) {
        const allTx = await transactionDb.load()
        const walletTx = wallet.transactions.map((tx_id) => {
            return allTx.find(tx => tx_id == tx.id)
        })
        return walletTx
    }
}

module.exports = new PurchaseManager