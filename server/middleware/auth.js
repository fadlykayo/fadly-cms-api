let config = require('../configs/config.json')
let jwt = require('jsonwebtoken')
module.exports = {
  verifyLogin: function (req, res, next) {
    if (req.headers.token == 'null') {
      res.json("Authentication failed, you don't have access.")
    }else {
      if (jwt.verify(req.headers.token, config.secret)) {
        next()
      }else {
        res.json('Authentication failed, expired token.')
      }
    }
  }
}
