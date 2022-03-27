const mongoose  = require('mongoose')

const superheroSchema = mongoose.Schema({
  superhero: {
    type: String,
    require: true,
    minlenght: 100
  },
  realname: {
    type: String,
    require: true,
    minlenght: 100
  }
})

module.exports = mongoose.model('SuperHero', superheroSchema);
