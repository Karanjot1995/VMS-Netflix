const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://netflix-vms.herokuapp.com',
      changeOrigin: true,
    })
  );
};