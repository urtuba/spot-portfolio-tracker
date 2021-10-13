const investorDb = require('../database/investor-db')
const Wallet = require('../models/wallet')

class InvestorManager {
  async createWallet (investor, walletName) {
    const newWallet = new Wallet(undefined, walletName)
    investor.wallets.push(newWallet)
    await investorDb.update(investor)
  }

  getWallet (investor, walletName) {
    const wallet = investor.wallets.find(w => (walletName == w.name))
    return wallet
  }

  async removeWallet (investor, walletName, savePNL = true) {
    const wallet = this.getWallet(investor, walletName)
    if (wallet == undefined) {
      throw Error(`${this.name} ${this.removeWallet.name}: Wallet not found.`)
    } else if (wallet.name == 'Main') {
      throw Error(`${this.name} ${this.removeWallet.name}: Main wallet can not be deleted.`)
    }

    if (savePNL) wallet.pastPNL += wallet.totalPNL
    const walletIdx = investor.wallets.indexOf(wallet)
    investor.wallets.splice(walletIdx, 1)

    await investorDb.update(investor)
  }

  async updatePassword (investor, newPwd) {
    investor.password = newPwd
    await investorDb.update(investor)
  }

  async updateEmail (investor, newEmail) {
    investor.email = newEmail
    await investorDb.update(investor)
  }
}

module.exports = new InvestorManager()
