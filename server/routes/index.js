var express = require('express')
var router = express.Router()
const userController = require('../controllers/users')
const tweetController = require('../controllers/tweets')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('Go to http://localhost:8080/')
})

// API

router.get('/api', function (req, res, next) {
  res.send({
    endpoints: [
      '/api/twatt/search',
      '/api/twatt',
      '/api/twatt/:id'
    ]
  })
})

router.get('/api/twatt/search', tweetController.searchTweet)

router.get('/api/twatt', tweetController.getAllTweets)

router.get('/api/twatt/:id', tweetController.getTweetById)

router.post('/api/twatt', tweetController.createTweet)

router.delete('/api/twatt/:id', tweetController.deleteTweet)

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

router.post('/auth/users/login', userController.verifyUser)

router.get('/auth/users', userController.getUsers)

router.get('/auth/users/:id', userController.getUser)

router.put('/auth/users/:id', userController.updateUser)

router.delete('/auth/users/:id', userController.deleteUser)

module.exports = router
