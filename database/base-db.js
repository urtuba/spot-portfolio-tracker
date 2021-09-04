const fs = require('fs')


class BaseDatabase {
  constructor(model) {
    this.model = model
    this.filename = model.name
  }

  save (objects) {
    fs.writeFileSync(`./${this.filename}.json`, JSON.stringify(objects), )
  }
  
  load () {
    const file = fs.readFileSync(`./${this.filename}.json`, 'utf-8')
    const objects = JSON.parse(file)

    return objects.map(this.model.create)
  }
  
  insert (object) {
    const objects = load(this.filename)
    save(filename, objects.concat(object))
  }
  
  remove (index) {
    const objects = load(this.filename)
  
    objects.splice(index, 1)
    save(objects)
  }
  
  findByName (name) {
    const objects = load(this.filename)
  
    return objects.find(investor => investor.name == name)
  }
}

module.exports = BaseDatabase