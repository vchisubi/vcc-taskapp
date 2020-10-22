const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  mongodb: {
    dbURI: process.env.MONGODB_URI
  },
  session: {
    cookieKey: process.env.COOKIE_KEY_SECRET
  },
  token: {
    tokenKey: process.env.TOKEN_KEY_SECRET
  }
}
