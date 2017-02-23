const Users = require('../models/users')
let jwt = require('jsonwebtoken')
let hash = require('password-hash')
let config = require('../configs/config.json')

module.exports = {
  createUser: (req, res) => {
    Users.create({
      username: req.body.username,
      password: hash.generate(req.body.password),
      email: req.body.email
    }).then(function (data) {
      res.send(data)
    }).catch(function (err) {
      res.send(err)
    })
  },

  getUsers: (req, res) => {
    Users.find().then(function (data) {
      res.send(data)
    }).catch(function (err) {
      res.send(err)
    })
  },

  getUser: (req, res) => {
    Users.findOne({
      _id: req.params.id
    }).then(function (data) {
      res.send(data)
    }).catch(function (err) {
      res.send(err)
    })
  },

  updateUser: (req, res) => {
    Users.findOneAndUpdate({
      _id: req.params.id
    }, {
      username: req.body.username,
      password: hash.generate(req.body.password),
      email: req.body.email
    }, {
      new: true
    }).then(function (data) {
      res.send(data)
    }).catch(function (err) {
      res.send(err)
    })
  },

  deleteUser: (req, res) => {
    Users.findOneAndRemove({
      _id: req.params.id
    }).then(function (data) {
      res.send({message: `Deleted User with ID: ${req.params.id}`})
    }).catch(function (err) {
      res.send({message: 'Error data not found'})
    })
  },

  verifyUser: (req, res) => {
    console.log(req.body)
    let token = jwt.sign({username: req.body.username}, config.secret, {algorithm: 'HS256'}, {expiresIn: '1h'})
    res.send({
      token: token,
      username: req.body.username
    })
  }
}
