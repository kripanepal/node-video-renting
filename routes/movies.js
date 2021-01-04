const express = require('express');
const router = express.Router();

const { Movie, validateMovie } = require('../models/movies')
const { Genre } = require('../models/genres')

router.get('/', async (req, res) => {

    const movie = await Movie.find({});
    res.send(movie)
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    const movie = await Movie.findById(id).sort('name');
    res.send(movie)
    movie && res.send(movie)
    res.status(400).send("Wrong id")
})

router.post('/', async (req, res) => {
    const { error } = validateMovie(req.body)
    try {
        if (error) {
            res.status(400).send(error.details[0].message)
            return
        }
        const genre = await Genre.findById(req.body.genreId)
        if (!genre) return res.status(400).send('no genre with given id')
        const movie = new Movie({
            title: req.body.title,
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate,
            genre: { genreId: genre.genreId, name: genre.name }
        })
        movie.save()
        res.send(movie)
    } catch (error) {
        console.log("Error", error)
    }
})
router.put("/:id", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send("Invalid genre.");

    const movie = await Movie.findByIdAndUpdate(
        req.params.id,
        {
            title: req.body.title,
            genre: {
                _id: genre._id,
                name: genre.name
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
        },
        { new: true }
    );

    if (!movie)
        return res.status(404).send("The movie with the given ID was not found.");

    res.send(movie);
});

router.delete("/:id", async (req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);

    if (!movie)
        return res.status(404).send("The movie with the given ID was not found.");

    res.send(movie);
});

router.get("/:id", async (req, res) => {
    const movie = await Movie.findById(req.params.id).select("-__v");

    if (!movie)
        return res.status(404).send("The movie with the given ID was not found.");

    res.send(movie);
});

module.exports = router