var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')

var index = require('./routes/index')
var users = require('./routes/users')

var app = express()

// ===== Passport =====
var passport = require('passport')
var LocalStrategy = require('passport-local')
const hash = require('password-hash')

const User = require('./models/users')
let jwt = require('jsonwebtoken')
let config = require('./configs/config.json')

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user)
  })
})

passport.use(new LocalStrategy(
  function (username, password, done) {
    User.findOne({
      username: username
    }).then(function (data) {
      if (hash.verify(password, data.password)) {
        return done(null, data)
      } else {
        return done(null, false, {message: 'Authentication failed. Wrong password.'})
      }
    }).catch(function () {
      return done(null, false, {message: 'Authentication failed. User not found.'})
    })
  }
))

app.use(passport.initialize())

// ====== Cors ======
let cors = require('cors')
app.use(cors())

// ====== Mongoose ======
require('dotenv').config()
let mongoose = require('mongoose')
mongoose.connect(`${process.env.MONGODB_URI}`, function (err) { // localhost:27017 untuk di db
  if (err) {
    console.log(err)
  } else {
    console.log(`connected to ${process.env.PORT} ${process.env.MONGODB_URI}`)
  }
})
mongoose.Promise = global.Promise

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', index)
app.use('/users', users)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
