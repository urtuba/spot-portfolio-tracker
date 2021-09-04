const BaseDatabase = require('./base-db')
const Investor = require('../models/investor')


class InvestorDatabase extends BaseDatabase {
    constructor() {
        super(Investor)
    }
}

module.exports = new InvestorDatabase