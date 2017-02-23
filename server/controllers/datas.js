const Datas = require('../models/datas')

module.exports = {
  createData: (req, res) => {
    Datas.create({
      letter: req.body.letter,
      frequency: req.body.frequency
    }).then(function (data) {
      res.send(data)
    }).catch(function (err) {
      res.send(err)
    })
  },

  getAllDatas: (req, res) => {
    Datas.find().then(function (data) {
      res.send(data)
    }).catch(function (err) {
      res.send(err)
    })
  },

  getDataById: (req, res) => {
    Datas.findOne({
      _id: req.params.id
    }).then(function (data) {
      res.send(data)
    }).catch(function (err) {
      res.send(err)
    })
  }

  searchData: (req, res) => {
    Datas.find({
      letter: {
        $regex: req.query.q,
        $options: 'i'
      },
      frequency: {
        $regex: req.query.q2,
        $options: 'i'
      }
    }).then(function (data) {
      res.send(data)
    }).catch(function (err) {
      res.send(err)
    })
  },

  updateData: (req, res) => {
    Datas.findOneAndUpdate({
      _id: req.params.id
    }, {letter: req.body.letter, frequency: req.body.frequency}, {
      new: true
    }).then(function (data) {
      res.send(data)
    }).catch(function (err) {
      res.send(err)
    })
  },

  deleteData: (req, res) => {
    Datas.findOneAndRemove({
      _id: req.params.id
    }).then(function (data) {
      res.send({message: `Deleted Data with ID: ${req.params.id}`})
    }).catch(function (err) {
      res.send({message: 'Error data not found'})
    })
  }
}
