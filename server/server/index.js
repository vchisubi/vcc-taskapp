const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const keys = require('./config/keys')
const path = require('path')

module.exports = () => {
  let server = express(), create, start

  create = () => {
    // // Serve static files from the React frontend app
    if(process.env.NODE_ENV === 'production') {
      server.use(express.static(path.join(__dirname, '../../../client/build')))
    }

    server.use(cors())
    server.use(bodyParser.json())
    server.use(bodyParser.urlencoded({extended: false}))
    server.use(cookieParser())
    server.use(cookieSession({
      maxAge: 24 * 60 * 60 * 1000,
      keys: [keys.session.cookieKey],
      proxy: true,
      secret: keys.session.cookieKey
    }))
    server.use(passport.initialize())
    server.use(passport.session())

    let routes = require('./routes')
    routes.init(server)

    server.use('/*', (req, res, next) => {
      res.sendFile(path.join(__dirname, '../../../client/build/index.html'))
    })
  }

  start = () => {
    const port = process.env.PORT || 4002

    mongoose.connect(keys.mongodb.dbURI, {useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false}, (err) => {
      if(err) {
        console.log('Unable to connect to the database:')
        console.log(err)
        process.exit(1)
      } else {
          server.listen(port, () => {
            console.log(`Connection successful: Listening on port ${port}`)
        })
      }
    })
  }

  return {
    create: create,
    start: start
  }
}
