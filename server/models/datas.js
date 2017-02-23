const mongoose = require('mongoose')

const TweetSchema = new mongoose.Schema({
  letter: String,
  frequency: String
},
  {
    timestamps: true
  })

module.exports = mongoose.model('Tweets', TweetSchema)
