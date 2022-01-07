const investorDb = require('../database/investor-db')
const Wallet = require('../models/wallet')
const bcrypt = require('bcrypt')

class InvestorManager {
  async createWallet (investor, walletName) {
    const newWallet = new Wallet(undefined, walletName)
    investor.wallets.push(newWallet)
    await investorDb.update(investor.id, investor)
  }

  getWallet (userID, walletName) {
    const investor = investorDb.findById(userID)
    if (investor == undefined) { throw Error(`Investor with id ${userID} not found`) }

    const wallet = investor.wallets.find(wallet => {
      return wallet.name == walletName
    })
    if (wallet == undefined) { throw Error(`Wallet with name ${walletName} not found`) }

    return wallet
  }

  async removeWallet (userId, walletName, savePNL = true) {
    const investor = investorDb.findById(userId)
    if (investor == undefined) { throw Error(`Investor with id ${userId} not found`) }

    const wallet = this.getWallet(userId, walletName)
    if (wallet == undefined) {
      throw Error(`${this.name} ${this.removeWallet.name}: Wallet not found.`)
    } else if (wallet.name == 'Main') {
      throw Error(`${this.name} ${this.removeWallet.name}: Main wallet can not be deleted.`)
    }

    if (savePNL) investor.pastPNL += wallet.totalPNL
    investor.wallets = investor.wallets.filter(w => w.name != walletName)

    return investorDb.update(investor._id, investor)
  }

  async updatePassword (investorId, newPwd) {
    const investor = await investorDb.findById(investorId)
    investor.password = await bcrypt.hash(newPwd, 10)
    return investorDb.update(investor._id, investor)
  }

  async updateEmail (investorId, newEmail) {
    const investor = await investorDb.findById(investorId)
    investor.email = newEmail
    return investorDb.update(investor)
  }
}

module.exports = new InvestorManager()
