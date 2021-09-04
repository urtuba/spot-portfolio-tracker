const Asset = require('./asset')
const Wallet = require('./wallet')


class Investor {
  constructor(name, email, password) {
    this.name = name
    this.email = email
    this.password = password
    
    const mainWallet = new Wallet('Main')
    this.wallets = [mainWallet]
    this.favorites = new Set()
    this.pastPNL = 0
  }

  static create(investorObj) {
    const investor = new Investor(investorObj.name, investorObj.email, investorObj.pwd)
    investor.wallets = investorObj.wallets.map(Wallet.create)
    investor.pastPNL = investorObj.pastPNL

    return investor
  }

  get totalPNL() {
    let totalPNL = 0
    for (let i = 0; i < this.wallets.lenght; i++) {
      totalPNL += this.wallets[i].totalPNL
    }
    return totalPNL
  }

  addFavorite(asset) {
    this.favorites.add(asset)
    return true
  }

  removeFavorite(asset) {
    this.favorites.delete(asset)
    return true
  }

  addWallet(name) {
    const newWallet = new Wallet(name)
    this.wallets.push(newWallet)
    return true
  }

  getWallet(name) {
    for (let i = 0; i < this.wallets.length; i++) {
      if (this.wallets[i].name == name) {
        return this.wallets[i]
      }
    }
    return null
  }

  removeWallet(name, savePNL=true) {
    const wallet = getWallet(name)
    if (wallet == null || wallet.name == 'Main') return false;

    if (savePNL) wallet.pastPNL += wallet.totalPNL

    const walletIdx = this.wallets.indexOf(wallet)
    this.wallets.splice(walletIdx, 1)

    return true
  }
}

module.exports = Investor