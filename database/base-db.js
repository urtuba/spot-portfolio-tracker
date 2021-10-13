const fs = require('fs')

class BaseDatabase {
  constructor (model) {
    this.model = model
    this.path = `./database/data/${model.name.toLowerCase()}.json`
  }

  save (objects) {
    return new Promise((resolve, reject) => {
      fs.writeFile(this.path, JSON.stringify(objects), (err) => {
        if (err) reject(err)
        resolve()
      })
    })
  }

  load () {
    // If db is not created yet
    const fileExists = fs.existsSync(this.path)
    if (!fileExists) { fs.writeFileSync(this.path, '[]') }

    return new Promise((resolve, reject) => {
      fs.readFile(this.path, (err, data) => {
        if (err) reject(err)
        const objects = JSON.parse(data)
        resolve(objects.map(this.model.create))
      })
    })
  }

  async insert (object) {
    const objects = await this.load()
    objects.push(object)
    return this.save(objects)
  }

  async findById (id) {
    const objects = await this.load()
    const object = objects.find(o => o.id == id)

    if (object == undefined) { throw Error(`Object with id ${id} is not found.`) }
    return object
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
