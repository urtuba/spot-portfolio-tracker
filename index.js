const assetType = {
  COIN: "Coin",
  TOKEN: "Token",
  CURRENCY: "Currency"
}

const transactionType = {
  REMOVE: "Remove",
  ADD: "Add",
  BUY: "Buy",
  SELL: "Sell"
}

class Asset {
  constructor(name, symbol, type) {
    this.name = name
    this.symbol = symbol
    this.type = type
  }
}

class Transaction {
  constructor(asset, type, amount, price, pnl) {
    this.time = new Date().getTime()
    this.asset = asset
    this.type = type
    this.amount = amount
    this.price = price
    this.pnl = pnl
  }
}

class PortfolioEntry {
  constructor(asset, amount, buyPrice) {
    this.asset = asset
    this.amount = amount
    this.boughtAmount = amount
    this.avgBuyPrice = buyPrice
    this.transactions = []
  }

  value(price) {
    return this.amount * price
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
    this.portfolio = []
    this.transactions = []
  }

  get totalValue() {
    let totalValue = 0
    for (let i = 0; i < this.portfolio.length; i++) {
      totalValue += this.portfolio[i].value
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

  getPortfolioEntry(asset) {
    for (let i = 0; i < this.portfolio.length; i++) {
      if (this.portfolio[i].asset == asset) {
        return this.portfolio[i]
      }
    }
    return null
  }

  addAsset(asset, amount, price) {
    const entry = this.getPortfolioEntry(asset)
    if (entry) return false

    const newEntry = new PortfolioEntry(asset, amount, price)
    const firstTx = new Transaction(asset, transactionType.ADD, amount, price, 0)
    
    newEntry.transactions.push(firstTx)
    this.transactions.push(firstTx)
    this.portfolio.push(newEntry)
    
    return false
  }

  removeAsset(asset, price, savePNL) {
    const entry = this.getPortfolioEntry(asset)
    if (entry == null) return false

    const entryIdx = this.portfolio.indexOf(entry)
    this.portfolio.splice(entryIdx, 1)
    
    const pnl = savePNL ? entry.unrealizedPNL(price) : 0
    const tx = new Transaction(asset, transactionType.REMOVE, entry.amount, price, pnl)
    this.transactions.push(tx)

    return true
  }

  buyAsset(asset, amount, price) {
    const entry = this.getPortfolioEntry(asset)
    if (entry == null) return false

    const cost = (entry.avgBuyPrice * entry.boughtAmount) + (price * amount)
    entry.avgBuyPrice = cost / (amount + entry.boughtAmount)
    entry.amount += amount
    entry.boughtAmount += amount

    const tx = new Transaction(asset, transactionType.BUY, amount, price, 0)
    entry.transactions.push(tx)
    this.transactions.push(tx)

    return false
  }

  sellAsset(asset, amount, price) {
    const entry = this.getPortfolioEntry(asset)
    if (entry == null) {
      return false
    }
    else if (amount == entry.amount) {
      const entryIdx = this.portfolio.indexOf(entry)
      this.portfolio.splice(entryIdx, 1)
      
      const pnl = entry.unrealizedPNL(price)
      const tx = new Transaction(asset, transactionType.SELL, amount, price, pnl)
      this.transactions.push(tx)

      return true
    }
    else {
      entry.amount -= amount
      const pnl = amount * (price - entry.avgBuyPrice)
      const tx = new Transaction(asset, transactionType.SELL, amount, price, pnl)

      this.transactions.push(tx)
      entry.transactions.push(tx)

      return true
    }
  }
}

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

samed = new Investor('Samed', 'samed@tutanota.com', 'pwd')
samed.addWallet('Short Term')
usd = new Asset('US Dollar', 'USD', assetType.CURRENCY)
btc = new Asset('Bitcoin', 'BTC', assetType.COIN)

shortTermWallet = samed.getWallet('Short Term')
shortTermWallet.addAsset(usd, 1000.0, 1.0)
shortTermWallet.addAsset(btc, 0.4, 45000)
shortTermWallet.buyAsset(btc, 1, 50000)
shortTermWallet.removeAsset(btc, 48500, true)
console.log(shortTermWallet)
