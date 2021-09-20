const Investor = require('./models/investor')
const Asset = require('./models/asset')
const PortfolioManager = require('./models/portfolio-manager')

const assetDatabase = require('./database/asset-db')
const investorDatabase = require('./database/investor-db')
const portfolioManagerDb = require('./database/portfolio-manager-db')
const transactionDatabase = require('./database/transaction-db')


// create supported assets and save them
const btc = new Asset(undefined, 'Bitcoin', 'BTC', Asset.types.COIN)
const eth = new Asset(undefined, 'Ethereum', 'ETH', Asset.types.COIN)
const usd = new Asset(undefined, 'Dollar', 'USD', Asset.types.FIAT)
const tl = new Asset(undefined, 'Turkish Lira', 'TRY', Asset.types.FIAT)

assetDatabase.save([btc, eth, usd, tl])
// console.log(assetDatabase.load())


// create a user and use assets into db
const samed = new Investor(undefined, 'Samed', 'samed@tutanota.com', 'password')
samed.addFavorite(assetDatabase.findByName('Bitcoin'))
samed.addFavorite(assetDatabase.findByName('Ethereum'))
//console.log(samed)
samed.removeFavorite(assetDatabase.findByName('Bitcoin'))
// console.log(samed)



// create new portfolio managers, then save them into db
const samedLongTerm = new PortfolioManager(undefined, 'Long Term Portfolio')
const someonesPortfolio = new PortfolioManager(undefined, 'Some Portfolio')
someonesPortfolio.addAsset(assetDatabase.findByName('Bitcoin', 12, 34000))

const samedMainWallet = samed.wallets[0]
samedMainWallet.addAsset(assetDatabase.findByName('Turkish Lira'), 1500, 0.13)

portfolioManagerDb.save([samedLongTerm, someonesPortfolio, samedMainWallet])
// console.log(portfolioManagerDb.load())


// add new users, then save them into db
const armagan = new Investor(undefined, 'Armagan', 'xyz@nimble.dev', 'pwd')
const omer = new Investor(undefined, 'Omer', 'omer@gmail.com', 'pwd')

investorDatabase.save([samed, armagan, omer])
// console.log(investorDatabase.load())


// update users in database
omer.password = 'omer123'
investorDatabase.update(omer)
armagan.wallets.push(someonesPortfolio)
investorDatabase.update(armagan)
samed.wallets.push(samedMainWallet)
investorDatabase.update(samed)

// console.log(investorDatabase.load())


// make some transactions
const samedMainPortfolio = samed.wallets[0]
samedMainPortfolio.addAsset(assetDatabase.findByName('Bitcoin'), 1, 40500)
samedMainPortfolio.sellAsset(assetDatabase.findByName('Bitcoin'), 0.5, 43000)

// console.log(samedMainPortfolio)
// console.log(samedMainPortfolio.allTransactions) 