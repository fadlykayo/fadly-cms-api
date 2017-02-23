var express = require('express')
var router = express.Router()
const userController = require('../controllers/users')
const dataController = require('../controllers/datas')
const dataDateController = require('../controllers/datadates')
var passport = require('passport')
const middleware = require('../middleware/auth')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('Go to http://localhost:8080/')
})

// Users

router.get('/auth', function (req, res, next) {
  res.send({
    endpoints: [
      '/auth/users/register',
      '/auth/users/login',
      '/auth/users',
      '/auth/users/:id'
    ]
  })
})

router.post('/auth/users/register', userController.createUser)

router.post('/auth/users/login', passport.authenticate('local'), userController.verifyUser)

router.get('/auth/users', userController.getUsers)

router.get('/auth/users/:id', userController.getUser)

router.put('/auth/users/:id', userController.updateUser)

router.delete('/auth/users/:id', userController.deleteUser)

// API

router.get('/api', function (req, res, next) {
  res.send({
    endpoints: [
      '/api/data/search',
      '/api/data',
      '/api/data/:id',
      '/api/datadate/search',
      '/api/datadate',
      '/api/datadate/:id'
    ]
  })
})

// Data

router.get('/api/data/search', dataController.searchData)

router.get('/api/data', middleware.verifyLogin, dataController.getAllDatas)

router.get('/api/data/:id', dataController.getDataById)

router.post('/api/data', dataController.createData)

router.put('/api/data/:id', dataController.updateData)

router.delete('/api/data/:id', dataController.deleteData)

router.get('/api/data/search', dataController.searchData)

// Datadate

router.get('/api/datadate/search', dataDateController.searchData)

router.get('/api/datadate', middleware.verifyLogin, dataDateController.getAllDatas)

router.get('/api/datadate/:id', dataDateController.getDataById)

router.post('/api/datadate', dataDateController.createData)

router.put('/api/datadate/:id', dataDateController.updateData)

router.delete('/api/datadate/:id', dataDateController.deleteData)

module.exports = router
