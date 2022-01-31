const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        createProxyMiddleware('/', {
            target: 'https://explore-buddy-backend.herokuapp.com',
        })
    );
};
