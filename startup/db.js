const mongoose = require('mongoose');
const logger = require('../startup/logging')
const config = require('config')
module.exports = () => {
    mongoose.connect(config.get('db'))
        .then(() => console.log(`connection established to ${config.get('db')}`))
        .catch(err => {
            console.log(err)
            logger.error('error', err)
        })
}