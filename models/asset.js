const uuid = require('uuid')

class Asset {
  static types = {
    COIN: 'Coin',
    TOKEN: 'Token',
    FIAT: 'Fiat'
  }

  constructor(id=uuid.v4(), name, symbol, type) {
    this.id = id
    this.name = name
    this.symbol = symbol
    this.type = type
  }

  static create({id, name, symbol, type}) {
    return new Asset(id, name, symbol, type)
}
}

module.exports = Asset