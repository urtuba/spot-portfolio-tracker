const Asset = require('./models/asset')
const Transaction = require('./models/transaction')
const PortfolioEntry = require('./models/portfolio_entry')
const Wallet = require('./models/wallet')
const Investor = require('./models/investor')

const investorDatabase = require('./database/investor-db')

const s = new Investor('Samed', 'samed@tutanota.com', 'pwd')
const btc = new Asset('Bitcoin', 'BTC', Asset.types.COIN)
const usd = new Asset('Dollars', 'USD', Asset.types.FIAT)

const wallet = s.getWallet('Main')
wallet.addAsset(btc, 10, 34000)
wallet.buyAsset(btc, 5, 50000)
wallet.sellAsset(btc, 8, 44000)

investorDatabase.save([s])
const out = investorDatabase.load()

console.log(out[0].getWallet('Main'))