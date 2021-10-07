const Investor = require('./models/investor')
const Asset = require('./models/asset')

const assetDatabase = require('./database/asset-db')
const investorDatabase = require('./database/investor-db')
const walletDb = require('./database/wallet-db')
const transactionDatabase = require('./database/transaction-db')

const { createTestData } = require('./test-data')
const { resetDb } = require('./reset-db')
const investorDb = require('./database/investor-db')
const transactionDb = require('./database/transaction-db')
const { loadTransactions } = require('./lib/utils')


async function main()
{
    await resetDb()
    await createTestData()
    
    const assets = await assetDatabase.load()
    const investors = await investorDatabase.load()

    console.log('LOADED : ' + assets.length + ' Assets')
    console.log('LOADED : ' + investors.length + ' Investors')
    
    const txs = investors[1].wallets[0].transactions
    console.log(await loadTransactions(txs))
}

main()



    

