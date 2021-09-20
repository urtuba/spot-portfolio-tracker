const BaseDatabase = require('./base-db')
const PortfolioManager = require('../models/portfolio-manager')


class PortfolioManagerDatabase
 extends BaseDatabase {
    constructor() {
        super(PortfolioManager)
    }
}

module.exports = new PortfolioManagerDatabase