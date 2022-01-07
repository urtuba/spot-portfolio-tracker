// const Asset = require('./asset')
// const Wallet = require('./wallet')
// const uuid = require('uuid')

const mongoose = require('mongoose')

const InvestorSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  wallets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Wallet', autopopulate: true }],
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Asset', autopopulate: true }],
  pastPNL: Number
})

InvestorSchema.methods.totalPNL = () => {
  let totalPNL = 0
  this.wallets.forEach(wallet => {
    totalPNL += wallet.getTotalPNL()
  })
  return totalPNL
}

InvestorSchema.methods.addFavorite = (assetId) => {
  this.favorites.push(assetId)
  this.save()
}

InvestorSchema.methods.removeFavorite = (assetId) => {
  this.favorites = this.favorites.filter(favorite => {
    return favorite.id != assetId
  })
  this.save()
}

InvestorSchema.plugin(require('mongoose-autopopulate'))
module.exports = mongoose.model('Investor', InvestorSchema)

// class Investor {
//   constructor (id = uuid.v4(), name, email, password) {
//     this.id = id
//     this.name = name
//     this.email = email
//     this.password = password

//     const mainWallet = new Wallet(undefined, 'Main')
//     this.wallets = [mainWallet]
//     this.favorites = []
//     this.pastPNL = 0
//   }

//   static create (obj) {
//     const investor = new Investor(obj.id, obj.name, obj.email, obj.password)
//     investor.wallets = obj.wallets.map(Wallet.create)
//     investor.pastPNL = obj.pastPNL
//     investor.favorites = obj.favorites.map(Asset.create)

//     return investor
//   }

//   get totalPNL () {
//     let totalPNL = 0
//     for (let i = 0; i < this.wallets.lenght; i++) {
//       totalPNL += this.wallets[i].totalPNL
//     }
//     return totalPNL
//   }

//   addFavorite (asset) {
//     if (this.favorites.find(obj => obj.name == asset.name)) { return false }

//     this.favorites.push(asset)
//     return true
//   }

//   removeFavorite (asset) {
//     const idx = this.favorites.findIndex(o => o.name == asset.name)
//     if (idx == -1) { return false }

//     this.favorites.splice(idx, 1)
//     return true
//   }
// }

// module.exports = Investor
