const assetDb = require('./database/asset-db')
const investorDb = require('./database/investor-db')
const transactionDb = require('./database/transaction-db')
const Asset = require('./models/asset')

const btc = new Asset(undefined, 'Bitcoin', 'BTC', Asset.types.COIN)
const eth = new Asset(undefined, 'Ethereum', 'ETH', Asset.types.COIN)
const usd = new Asset(undefined, 'Dollars', 'USD', Asset.types.FIAT)

const resetDb = async () => {
  await assetDb.save([btc, eth, usd])
  await investorDb.save([])
  await transactionDb.save([])
}

const main = async () => {
  await resetDb()
}

main()
