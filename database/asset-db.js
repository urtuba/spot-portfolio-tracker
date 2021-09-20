const BaseDatabase = require('./base-db')
const Asset = require('../models/asset')


class AssetDatabase extends BaseDatabase {
    constructor() {
        super(Asset)
    }

    findByName (name) {
        const objects = this.load(this.filename)
        return objects.find(obj => obj.name == name)
    }
}

module.exports = new AssetDatabase