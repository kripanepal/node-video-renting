const express = require('express');
require('express-async-errors')
const app = express();

require('dotenv').config()
require('./startup/config')()
require('./startup/prod')(app)


require('./startup/db')()
require('./startup/routes')(app)

const server = app.listen(3000, () => { console.log("listening on 3000") })

module.exports = server