const Investor = require('./models/investor')
const Asset = require('./models/asset')

const assetDatabase = require('./database/asset-db')
const investorDatabase = require('./database/investor-db')
const walletDb = require('./database/wallet-db')
const transactionDatabase = require('./database/transaction-db')

const { createTestData } = require('./test-data')
const investorDb = require('./database/investor-db')


async function main()
{
    await createTestData()
    
    const assets = await assetDatabase.load()
    const investors = await investorDatabase.load()

    console.log('LOADED : ' + assets.length + ' Assets')
    console.log('LOADED : ' + investors.length + ' Investors')
    
    console.log(investors[1].wallets[0])

    
    // create new portfolio managers, then save them into db
    // const samedLongTerm = new PortfolioManager(undefined, 'Long Term Portfolio')
    // const someonesPortfolio = new PortfolioManager(undefined, 'Some Portfolio')
    // await someonesPortfolio.addAsset(await assetDatabase.findByName('Bitcoin', 12, 34000))
    // const samedMainWallet = samed.wallets[0]
    // await samedMainWallet.addAsset(await assetDatabase.findByName('Turkish Lira'), 1500, 0.13)
    // await portfolioManagerDb.save([samedLongTerm, someonesPortfolio, samedMainWallet])
    // console.log(await portfolioManagerDb.load())


    // add new users, then save them into db
    // const armagan = new Investor(undefined, 'Armagan', 'xyz@nimble.dev', 'pwd')
    // const omer = new Investor(undefined, 'Omer', 'omer@gmail.com', 'pwd')
    // await investorDatabase.save([samed, armagan, omer])
    // console.log(await investorDatabase.load())


    // update users in database
    // omer.password = 'omer123'
    // await investorDatabase.update(omer)
    // armagan.wallets.push(someonesPortfolio)
    // await investorDatabase.update(armagan)
    // samed.wallets.push(samedMainWallet)
    // await investorDatabase.update(samed)
    // console.log(await investorDatabase.load())
    


    // make some transactions
    // const samedMainPortfolio = samed.wallets[0]
    // await samedMainPortfolio.addAsset(await assetDatabase.findByName('Bitcoin'), 1, 40500)
    // await samedMainPortfolio.sellAsset(await assetDatabase.findByName('Bitcoin'), 0.5, 43000)

    // console.log(samedMainPortfolio)
    // console.log(samedMainPortfolio.getTransactions) 
    // console.log(await transactionDatabase.load())
}

main()



    

