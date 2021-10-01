const fs = require('fs')
const { resolve } = require('path')


class BaseDatabase {
  constructor(model) {
    this.model = model
    this.filename = model.name.toLowerCase()
  }

  save(objects) {
    return new Promise((resolve, reject) => {
      fs.writeFile(`./database/data/${this.filename}.json`, JSON.stringify(objects), (err) => {
        if (err) return reject(err)
        resolve()
      })
    })    
  }
  
  load () {
    return new Promise((resolve, reject) => {
      if (!fs.existsSync(`./database/data/${this.filename}.json`))
        fs.writeFileSync(`./database/data/${this.filename}.json`, '[]')

      const file = fs.readFile(`./database/data/${this.filename}.json`, 'utf-8', (err, file) => {
        if (err) reject(err)
        const objects = JSON.parse(file)
        resolve(objects.map(this.model.create))
      })
    })
  }
  
  async insert (object) {
    const objects = await this.load()
    objects.concat(Object)
    await this.save(objects)
  }
  
  remove (index) {
    this.load().then((objects) => {
      objects.splice(index, 1)
    }).then(() => {
      objects.save().then(() => {console.log('remove')})
    })
  }

  async findById (id) {
    const objects = await this.load()
    const objIdx = objects.findIndex(obj => obj.id == id)

    if (objIdx < 0)
      return null
    return objects[objIdx]
  }

  async update (object) {
    const objects = await this.load()
    const idx = objects.findIndex(obj => obj.id == object.id)
    
    if (idx == -1) throw new Error(`Cannot find ${this.model.name} with id ${object.id}`)
    
    objects.splice(idx, 1, object)
    return this.save(objects)
  }
}

module.exports = BaseDatabase