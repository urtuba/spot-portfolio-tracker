const Asset = require('./asset')
const Wallet = require('./wallet')
const uuid = require('uuid')

class Investor {
  constructor(id = uuid.v4(), name, email, password) {
    this.id = id
    this.name = name
    this.email = email
    this.password = password
    
    const mainWallet = new Wallet(undefined, 'Main')
    this.wallets = [mainWallet]
    this.favorites = []
    this.pastPNL = 0
  }

  static create(obj) {
    const investor = new Investor(obj.id, obj.name, obj.email, obj.password)
    investor.wallets = obj.wallets.map(Wallet.create)
    investor.pastPNL = obj.pastPNL
    investor.favorites = obj.favorites.map(Asset.create)

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
    if (this.favorites.find(obj => obj.name == asset.name))
      return false
    
    this.favorites.push(asset)
    return true
  }

  removeFavorite(asset) {
    const idx = this.favorites.findIndex(o => o.name == asset.name)
    if (idx == -1) 
      return false

    this.favorites.splice(idx, 1)
    return true
  }

  createWallet(name) {
    const newWallet = new Wallet(undefined, name)
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