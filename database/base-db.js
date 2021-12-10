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

  async update (object) {
    const objects = await this.load()
    const objectIdx = objects.findIndex(o => o.id == object.id)

    if (objectIdx < 0) { throw Error(`Object with id ${object.id} is not found.`) }

    objects.splice(objectIdx, 1, object)
    return this.save(objects)
  }
}

module.exports = BaseDatabase
