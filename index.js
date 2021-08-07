const assetType = {
  COIN: "Coin",
  TOKEN: "Token",
  CURRENCY: "Currency"
}

const transactionType = {
  ADD: "Add",
  BUY: "Buy",
  SELL: "Sell",
}

class Asset {
  constructor(name, symbol, type) {
    this.name = name
    this.symbol = symbol
    this.type = type
  }
}

class Transcation {
  constructor(asset, type, amount, price, pnl) {
    this.time = new Date().getTime()
    this.asset = asset
    this.type = type
    this.amount = amount
    this.price = price
    this.pnl = pnl
  }
}

class OwnedAsset {
  constructor(asset, amount, buyPrice) {
    this.asset = asset
    this.amount = amount
    this.boughtAmount = amount
    this.avgBuyPrice = buyPrice
    const firstTx = new Transcation(asset, transactionType.ADD, amount, buyPrice, 0)
    this.transactions = [firstTx]
  }

  get value() {
    return this.amount * this.avgBuyPrice
  }

  sell(amount, price) {
    this.amount -= amount
    const pnl = amount * (price - this.avgBuyPrice)
    const tx = new Transcation(this.asset, transactionType.SELL, amount, price, pnl)
    this.transactions.push(tx)
    return tx
  }

  buy(amount, price) {
    const cost = (this.avgBuyPrice * this.boughtAmount) + (price * amount)
    this.avgBuyPrice = cost / (amount + this.boughtAmount)
    this.boughtAmount += amount
    this.amount += amount
    const tx = new Transcation(this.asset, transactionType.BUY, amount, price, 0)
    this.transactions.push(tx)
    return tx
  }

  unrealizedPNL(price) {
    return this.amount * (price - this.avgBuyPrice)
  }

  get totalPNL() {
    let totalPnl = 0
    for (let i = 0; i < this.transactions.length; i++) {
      totalPnl += this.transactions[i].pnl
    }
    return totalPnl
  }
}

class Wallet {
  constructor(name) {
    this.name = name
    this.assets = []
    this.transactions = []
  }

  addOwnedAsset(asset, amount, price) {
    const ownedAsset = new OwnedAsset(asset, amount, price)
    this.transactions.push(ownedAsset.transactions[0])
    this.assets.push(ownedAsset)
  }

  sellOwnedAsset(assetOrder, amount, price) {
    const ownedAsset = this.assets[assetOrder]
    this.transactions.push(ownedAsset.sell(amount, price))
  }

  get totalValue() {
    let totalValue = 0
    for (let i = 0; i < this.assets.length; i++) {
      totalValue += this.assets[i].value
    }
    return totalValue
  }

  get totalPNL() {
    let totalPNL = 0
    for (let i = 0; i < this.transactions.length; i++) {
      totalPNL += this.transactions[i].pnl
    }
    return totalPNL
  }
}

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

// Test

const asset = new Asset('Bitcoin', 'BTC', assetType.COIN)
const samed = new Investor('Samed', 'samed@tutanota.com', 'password')
const samedMainWallet = samed.getWallet('Main')
samedMainWallet.addOwnedAsset(asset, 10, 40000)
samedMainWallet.sellOwnedAsset(0, 5, 45000)

console.log(samedMainWallet.assets[0])
console.log(samedMainWallet)

console.log('\n' + `Total Realized PNL: ${samed.totalPNL}   Total Value: ${samed.totalValue}`)