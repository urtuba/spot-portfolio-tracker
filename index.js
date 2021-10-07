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
    const transactions = await transactionDatabase.load()

    console.log('\nLOADED : ' + assets.length + ' Assets')
    assets.forEach(asset => {
        console.log(asset.id + ' ' + asset.name)
    });

    console.log('\nLOADED : ' + investors.length + ' Investors')
    investors.forEach(investor => {
        console.log(investor.id + ' ' + investor.name)
    });

    console.log('\nLOADED : ' + transactions.length + ' Transactions')
    transactions.forEach(tx => {
        console.log(`${tx.id} : ${tx.amount} ${tx.asset.symbol} : ${tx.type} : $ ${tx.price}`)
    });
}

main()



    

