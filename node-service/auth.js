const { requiresAuth } = require('express-openid-connect');

module.exports = function (eq, res, next) {
    if (process.env.NODE_ENV === 'development') {
        // Skip Auth0 middleware
        next();
    } else {
        // Enforce Auth0 
        requiresAuth();
    }
};