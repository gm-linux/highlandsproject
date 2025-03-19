const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://0.0.0.0:3000', // Change this to your backend URL
            changeOrigin: true,
        })
    );
};
