class Asset {
  static types = {
    COIN: 'Coin',
    TOKEN: 'Token',
    FIAT: 'Fiat'
  }

  constructor(name, symbol, type) {
    this.name = name
    this.symbol = symbol
    this.type = type
  }

  static create({name, symbol, type}) {
    return new Investor(name, symbol, type)
}
}

module.exports = Asset