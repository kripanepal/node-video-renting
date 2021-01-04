const Joi = require('joi');
const mongoose = require('mongoose');
const { genreSchema } = require('./genres')

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    numberInStock: { type: Number, default: 0 },
    dailyRentalRate: { type: Number, default: 0.0 },
    genre: { type: genreSchema, required: true }
})


const Movie = mongoose.model('Movie', movieSchema)


const validateMovie = (movie) => {
    const schema = Joi.object({
        title: Joi.string().required().min(1),
        numberInStock: Joi.number().required().min(1),
        dailyRentalRate: Joi.number().required().min(1),
        genreId: Joi.string().required().min(1)
    })
    return schema.validate(movie)

}

module.exports = {
    validateMovie, Movie
}