const express = require('express');
const handleError = require('../middlewares/errors')
module.exports = (app) => {
    {



        app.use(express.json())
        const genres = require('../routes/genres')
        const customers = require('../routes/customers')
        const movies = require('../routes/movies')
        const rentals = require('../routes/rentals')
        const users = require('../routes/users')
        const auth = require('../routes/auth')
        app.use('/api/genres', genres)
        app.use('/api/customers', customers)
        app.use('/api/movies', movies)
        app.use('/api/rentals', rentals)
        app.use('/api/users', users)
        app.use('/api/auth', auth)


        app.use(handleError)
    }
}