const assetDb = require('./database/asset-db')
const investorDb = require('./database/investor-db')
const Asset = require('./models/asset')
const Investor = require('./models/investor')
const investorManager = require('./models/investor-manager')
const purchaseManager = require('./models/purchase-manager')

const createTestData = async () => {
  
  // create supported assets and save them
  const btc = new Asset(undefined, 'Bitcoin', 'BTC', Asset.types.COIN)
  const eth = new Asset(undefined, 'Ethereum', 'ETH', Asset.types.COIN)
  const usd = new Asset(undefined, 'Dollar', 'USD', Asset.types.FIAT)
  const tl = new Asset(undefined, 'Turkish Lira', 'TRY', Asset.types.FIAT)
  await assetDb.save([btc, eth, usd, tl])

  // add new users
  const samed = new Investor(undefined, 'Samed', 'samed@tutanota.com', 'password')
  const armagan = new Investor(undefined, 'Armagain', 'armagan@nimble.dev', 'password')
  samed.addFavorite(btc)
  samed.addFavorite(tl)
  armagan.addFavorite(usd)
  await investorDb.save([samed, armagan])

  // update users in database
  samed.password = 'samed123'
  samed.removeFavorite(btc)
  investorManager.createWallet(samed, 'Long Term Wallet')
  await investorDb.update(samed)

  // use purchase manager to manage wallets
  const armaganMainWallet = investorManager.getWallet(armagan, 'Main')
  await purchaseManager.addAsset(armaganMainWallet, btc, 15, 50000)
  await purchaseManager.addAsset(armaganMainWallet, usd, 100000, 1)
  await investorDb.update(armagan)

  // create more transactions
  await purchaseManager.sellAsset(armaganMainWallet, btc, 10, 65000)
  await purchaseManager.removeAsset(armaganMainWallet, btc, 55000, true)
  await investorDb.update(armagan)

}

module.exports = { createTestData }