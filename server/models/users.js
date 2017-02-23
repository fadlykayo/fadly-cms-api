const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
let RegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    uniqueCaseInsensitive: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    uniqueCaseInsensitive: true,
    validate: {
      validator: function (email) {
        return RegEx.test(email)
      },
      message: 'Invalid email format'
    }
  }
},
  {
    timestamps: true
  })

UserSchema.plugin(uniqueValidator)
module.exports = mongoose.model('Users', UserSchema)
