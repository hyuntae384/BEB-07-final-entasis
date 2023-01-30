const limit = require('express-rate-limit');


exports.limiter = limit({
    windowMs: 60 * 1000,
    max: 50,
    delayMs: 1000,
    handler(req,res) {
        res.status(this.statusCode).json({
            code: this.statusCode,
            message: "Only 100 requests per minute."
        });
    }
})