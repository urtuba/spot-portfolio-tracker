const fs = require('fs')

class BaseDatabase {
  constructor (model) {
    this.model = model
  }

  async load () {
    return this.model.find({})
  }

  async removeBy (property, value) {
    return this.model.deleteOne({ [property]: value })
  }

  async insert (object) {
    return await this.model.create(object)
  }

  async findById (id) {
    return this.model.findById(id)
  }

  async findBy (property, value) {
    return this.model.find({ [property]: value })
  }

  async update (id, object) {
    return this.model.findOneAndUpdate({ _id: id }, { $set: object })
  }
}

module.exports = BaseDatabase
