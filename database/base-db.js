const fs = require('fs')


class BaseDatabase {
  constructor(model) {
    this.model = model
    this.filename = model.name.toLowerCase()
  }

  save (objects) {
    fs.writeFileSync(`./database/data/${this.filename}.json`, JSON.stringify(objects), )
  }
  
  load () {
    if (!fs.existsSync(`./database/data/${this.filename}.json`))
      fs.writeFileSync(`./database/data/${this.filename}.json`, '[]')

    const file = fs.readFileSync(`./database/data/${this.filename}.json`, 'utf-8')
    const objects = JSON.parse(file)

    return objects.map(this.model.create)
  }
  
  insert (object) {
    const objects = this.load()
    if (objects.findIndex(o => o.id == object.id) >= 0)
      return

    this.save(objects.concat(object))
  }
  
  remove (index) {
    const objects = this.load()
  
    objects.splice(index, 1)
    this.save(objects)
  }

  findById (id) {
    const objects = this.load()
    const objIdx = objects.findIndex(obj => obj.id == id)

    if (objIdx < 0)
      return null
    return objects[objIdx]
  }

  update (object) {
    const objects = this.load()
    const idx = objects.findIndex(obj => obj.id == object.id)
    
    if (idx == -1) throw new Error(`Cannot find ${this.model.name} with id ${object.id}`)
    
    objects.splice(idx, 1, object)
    this.save(objects)
  }
}

module.exports = BaseDatabase