class Asset {
  static types = {
    coin: 'Coin',
    token: 'Token',
    fiat: 'Fiat'
  }

  constructor(name, symbol, type) {
    this.name = name
    this.symbol = symbol
    this.type = type
  }
}

module.exports = Asset