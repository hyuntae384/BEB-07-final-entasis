const limit = require('express-rate-limit');

// 테스트 요망
exports.limiter = limit({
    windowMs: 60 * 1000,
    max: 1000,
    delayMs: 500,
    handler(req,res) {
        res.status(this.statusCode).json({
            code: this.statusCode,
            message: "Only 1000 requests per minute."
        });
    }
})