const logger = require('../startup/logging')
module.exports = ((err, req, res, next) => {
    logger.error('error', err);
    res.send("Something went wrong")
})