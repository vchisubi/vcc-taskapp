const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  // if (process.env.NODE_ENV === 'production') {
  //   app.use(
  //     '/api',
  //     createProxyMiddleware({
  //       target: 'http://test-taskapp.herokuapp.com',
  //       changeOrigin: true
  //     })
  //   )
  //   app.use(
  //     '/auth',
  //     createProxyMiddleware({
  //       target: 'http://test-taskapp.herokuapp.com',
  //       changeOrigin: true
  //     })
  //   )
  // } else {
      app.use(
        '/api',
        createProxyMiddleware({
          target: 'http://localhost:4002',
          changeOrigin: true
        })
      )
      app.use(
        '/auth',
        createProxyMiddleware({
          target: 'http://localhost:4002',
          changeOrigin: true
        })
      )
  // }
}


