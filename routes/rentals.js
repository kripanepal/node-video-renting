const express = require('express');
const router = express.Router();
const fawn = require('fawn');
const { Rental, validateRental } = require('../models/rentals')
const { Customer } = require('../models/customers')
const { Movie } = require('../models/movies');
const Fawn = require('fawn/lib/fawn');
const mongoose = require('mongoose');
Fawn.init(mongoose)

router.get('/', async (req, res) => {

    const rental = await Rental.find({});
    res.send(rental)
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    const rental = await Rental.findById(id).sort('name');
    res.send(rental)
    rental && res.send(rental)
    res.status(400).send("Wrong id")
})

router.post('/', async (req, res) => {
    const { error } = validateRental(req.body)
    try {
        if (error) {
            res.status(400).send(error.details[0].message)
            return
        }
        const customer = await Customer.findById(req.body.customerID)
        const movie = await Movie.findById(req.body.movieId)
        if (!customer) return res.status(400).send('no genre with given id')
        if (!movie) return res.status(400).send('no movie with given id')
        if (movie.numberInStock === 0) return res.status(400).send('no stock')
        const rental = new Rental({
            customer: {
                _id: customer._id,
                name: customer.name,
                phone: customer.phone
            },
            movie: {
                _id: movie._id,
                title: movie.title,
                dailyRentalRate: movie.dailyRentalRate
            }
        })

        new Fawn.Task()
            .save('rentals', rental)
            .update('movies', { _id: movie._id }, { $inc: { numberInStock: -1 } })
            .run()


        res.send(rental)
    } catch (error) {
        console.log("Error", error)
        res.status(500).send("opps")
    }
})
router.put("/:id", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send("Invalid genre.");

    const rental = await Rental.findByIdAndUpdate(
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

    if (!rental)
        return res.status(404).send("The rental with the given ID was not found.");

    res.send(rental);
});

router.delete("/:id", async (req, res) => {
    const rental = await Rental.findByIdAndRemove(req.params.id);

    if (!rental)
        return res.status(404).send("The rental with the given ID was not found.");

    res.send(rental);
});

router.get("/:id", async (req, res) => {
    const rental = await Rental.findById(req.params.id).select("-__v");

    if (!rental)
        return res.status(404).send("The rental with the given ID was not found.");

    res.send(rental);
});

module.exports = router