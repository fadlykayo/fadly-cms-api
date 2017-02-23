const mongoose = require('mongoose')

const DataDateSchema = new mongoose.Schema({
  date: String,
  frequency: String
},
  {
    timestamps: true
  })

module.exports = mongoose.model('Datadates', DataDateSchema)
