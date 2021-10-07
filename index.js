
const assetDb = require('./database/asset-db')
const investorDb = require('./database/investor-db')
const transactionDb = require('./database/transaction-db')

const { createTestData } = require('./create-data')
const { resetDb } = require('./reset-db')
const { loadTransactions } = require('./lib/utils')


async function main()
{
    await resetDb()
    await createTestData()
    
    const assets = await assetDb.load()
    const investors = await investorDb.load()
    const transactions = await transactionDb.load()

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



    

