const BaseDatabase = require('./base-db')
const Investor = require('../models/investor')

class InvestorDatabase extends BaseDatabase {
  constructor () {
    super(Investor)
  }

  async findByEmail (email) {
    const res = await this.model.findOne({ email: email })
    return res
  }
}

module.exports = new InvestorDatabase()
