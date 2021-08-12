Wallet = require('./wallet')

class Investor {
  constructor(name, email, password) {
    this.name = name
    this.email = email
    this.password = password

    const mainWallet = new Wallet('Main')
    this.wallets = [mainWallet]
    this.favorites = []
    this.pastPNL = 0
  }

  get totalValue() {
    let totalValue = 0
    for (let i = 0; i < this.wallets.length; i++) {
      totalValue += this.wallets[i].totalValue
    }
    return totalValue
  }

  get totalPNL() {
    let totalPNL = 0
    for (let i = 0; i < this.wallets.length; i++) {
      totalPNL += this.wallets[i].totalPNL
    }
    return totalPNL
  }

  addFavorite(asset) {
    if (this.favorites.includes(asset) == false) {
      this.favorites.push(asset)
      return true
    }
    return false
  }

  removeFavorite(asset) {
    if (this.favorites.includes(asset)) {
      const idx = this.favorites.indexOf(asset)
      this.favorites.splice(idx, 1)
      return true
    }
    return false
  }

  addWallet(name) {
    for (let i = 0; i < this.wallets.length; i++) {
      if (this.wallets[i].name == name) {
        return false
      }
    }
    const wallet = new Wallet(name)
    this.wallets.push(wallet)
    return true
  }

  getWallet(name) {
    for (let i = 0; i < this.wallets.length; i++) {
      if (this.wallets[i].name == name) {
        return this.wallets[i]
      }
    }
    return false
  }
}

module.exports = Investor