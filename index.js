const Investor = require('./models/investor')
const investorDatabase = require('./database/investor-db')


const s = new Investor(undefined, 'Samed', 'samed@tutanota.com', 'pwd')
investorDatabase.save([s])
s.createWallet('Test')
investorDatabase.update(s)
console.log(investorDatabase.load())


// const btc = new Asset('Bitcoin', 'BTC', Asset.types.COIN)
// const usd = new Asset('Dollars', 'USD', Asset.types.FIAT)

// const wallet = s.getWallet('Main')
// wallet.addAsset(btc, 10, 34000)
// wallet.buyAsset(btc, 5, 50000)
// wallet.sellAsset(btc, 8, 44000)


// investorDatabase.save([s])
// const out = investorDatabase.load()

// investorDatabase.update(s)

// console.log(out[0].getWallet('Main'))