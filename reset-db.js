const assetDb = require('./database/asset-db') 
const investorDb = require ('./database/investor-db')
const transactionDb = require ('./database/transaction-db')
const  walletDb = require ('./database/wallet-db')

const resetDb = async () => {
  await assetDb.save([])
  await investorDb.save([])
  await walletDb.save([])
  await transactionDb.save([])
}

module.exports = { resetDb }
