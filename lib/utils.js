const transactionDb = require("../database/transaction-db")

const loadTransactions = async (txIdList) => {
    const txs = await transactionDb.load()

    const mappedTxs = txIdList.map((id) => {
        const tx = txs.find((tx) => tx.id == id)
        return tx
    })

    return mappedTxs
}

module.exports = { loadTransactions }