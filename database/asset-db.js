const BaseDatabase = require('./base-db')
const Asset = require('../models/asset')


class AssetDatabase extends BaseDatabase {
    constructor() {
        super(Asset)
    }

    async findByName (name) {
        const objects = await this.load()
        return objects.find(o => o.name == name)
    }
}

module.exports = new AssetDatabase