const Datas = require('../models/datadates')

module.exports = {
  createData: (req, res) => {
    Datas.create({
      date: req.body.date,
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
  },

  searchData: (req, res) => {
    Datas.find({
      date: {
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
    }, {date: req.body.date, frequency: req.body.frequency}, {
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
