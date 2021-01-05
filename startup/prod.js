const helmet = require('helmet')
const comression = require('compression')

module.exports = (app) => {
    app.use(helmet())
    app.use(comression())
}