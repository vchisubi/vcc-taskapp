const localPassport = require('passport')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy
const LocalUser = require('../models/local-user-model')

localPassport.use('local-login', new LocalStrategy({
  passReqToCallback : true
  },
  function(req, inputUsername, inputPassword, done) {
    LocalUser.findOne({ username: inputUsername }, async (err, user) => {
      if (err) {
        console.log('Error with local login: ' + err)
        return done(err)
      }
      if (!user || user === null) {
        err = 'Username does not exist!'
        console.log(err)
        return done(err, false)
      }
      if (!await bcrypt.compare(inputPassword, user.password)) {
        err = 'Password is incorrect!'
        console.log(err)
        return done(err, false)
      }
      return done(null, user)
    })
  }
))

localPassport.use('register', new LocalStrategy({
  passReqToCallback : true
  },
  function(req, inputUsername, inputPassword, done) {
    const findOrCreateUser = () => {
      LocalUser.findOne({ username: inputUsername }, async (err, user) => {
        if (err) {
          console.log('Error with registration: ' + err)
          return done(err)
        }
        if (user) {
          return done('User with this username already exists!', false)
        } else {
          let hashedPassword = await bcrypt.hash(inputPassword, 10)
          let newUser = new LocalUser({
            username: inputUsername,
            password: hashedPassword,
            userid: Date.now().toString()
          }).save().then((newUser) => {
            return done(null, newUser)
          })
        }
      })
    }
    process.nextTick(findOrCreateUser)
  }
))