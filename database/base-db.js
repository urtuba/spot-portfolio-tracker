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
    const file = fs.readFileSync(`./database/data/${this.filename}.json`, 'utf-8')
    const objects = JSON.parse(file)

    return objects.map(this.model.create)
  }
  
  insert (object) {
    const objects = load(this.filename)
    if (objects.findIndex(o => o.id == object.id))
      return

    this.save(filename, objects.concat(object))
  }
  
  remove (index) {
    const objects = load(this.filename)
  
    objects.splice(index, 1)
    this.save(objects)
  }

  update (object) {
    const objects = this.load(this.filename)
    const idx = objects.findIndex(investor => investor.id == object.id)
    
    if (idx == -1) throw new Error(`Cannot find ${this.model.name} with id ${object.id}`)
    
    objects.splice(idx, 1, object)
    this.save(objects)
  }
}

module.exports = BaseDatabase