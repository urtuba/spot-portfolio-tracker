const OwnedAsset = require("./owned_asset")

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

  buyOwnedAsset(ownedAssetId, amount, price) {
    const tx = this.assets[ownedAssetId].buy(amount, price)
    this.transactions.push(tx)
  }

  sellOwnedAsset(ownedAssetId, amount, price) {
    const ownedAsset = this.assets[ownedAssetId]
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

module.exports = Wallet