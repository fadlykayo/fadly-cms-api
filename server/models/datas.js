const mongoose = require('mongoose')

const DataSchema = new mongoose.Schema({
  letter: String,
  frequency: String
},
  {
    timestamps: true
  })

module.exports = mongoose.model('Datas', DataSchema)
