const BaseDatabase = require('./base-db')
const Investor = require('../models/investor')

class InvestorDatabase extends BaseDatabase {
  constructor () {
    super(Investor)
  }

  async findByEmail (email) {
    const objects = await this.load()
    return objects.find(o => o.email == email)
  }
}

module.exports = new InvestorDatabase()
