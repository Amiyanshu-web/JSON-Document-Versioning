const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests
    standardHeaders: 'draft-8',
    legacyHeaders: false,
});

module.exports = apiLimiter;
