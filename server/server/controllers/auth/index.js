const router = require('express').Router()
const passport = require('passport')
const tokenUtil = require('../../utils/tokenUtil')
const localUser = require('../../models/local-user-model')
require('../../utils/localPassport-setup')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  localUser.findById(id).then(user => {
    done(null, user)
  })
})

// Returns true if JWT in browser is still valid
router.get('/tokenCheck', (req,res) => {
  if (!req.cookies.jwt) {
    res.send(false)
  } else { res.send(true) }
})

// Returns logged in user object and true as a flag
router.get('/authCheck', (req,res) => {
  if (req.isAuthenticated()) {
    const authData = {user: req.user, loggedIn: req.isAuthenticated()}
    res.send(authData)
  } else {
    res.send('No user logged in.')
  }
})

router.get('/logout', (req, res) => {
  req.logOut()
  res.clearCookie('jwt')
  res.send(true)
})

router.post('/register', (req, res, next) => {
  passport.authenticate('register', (err, user, info) => {
    if (err) {
      console.log(err)
      return res.send(err)
    } else {
        return res.send(true)
    }
  }) (req, res, next)
})

router.post('/login', (req, res, next) => {
  passport.authenticate('local-login', async (err, user, info) => {
    if (err) {
      return res.send(err)
    }
    if (!user) {
      return res.send('User does not exist!')
    } 
    req.logIn(user, async (err) => {
      if (err) {
        return res.send(err)
      } else {
          try {
            const jwtToken = await tokenUtil.generateAccessToken(user)
            res.cookie('jwt', jwtToken, { httpOnly: true, secure: false, maxAge: 3600000 })
            let data = {user, success: true }
            res.send(data)
          } catch(e) {
              console.log(e)
          }
      }
    })
  }) (req, res, next)
})

module.exports = router

