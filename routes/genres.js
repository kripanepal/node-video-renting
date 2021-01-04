const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const auth = require('../middlewares/auth')
const admin = require('../middlewares/admin')
const { Genre, validateGenre } = require('../models/genres')
const validateObjectId = require('../middlewares/validateObjectId')
router.get('/', async (req, res) => {

    const genres = await Genre.find({});
    res.send(genres)
})

router.get('/:id', validateObjectId, async (req, res) => {
    const id = req.params.id

    const genre = await Genre.findById(id).sort('name');
    res.send(genre)
    genre && res.send(genre)
    res.status(400).send("Wrong id")
})

router.post('/', auth, async (req, res) => {
    const { error } = validateGenre(req.body)

    if (error) {
        res.status(400).send(error.details[0].message)
        return
    }
    const genre = await new Genre({ name: req.body.name })
    genre.save()
    res.send(genre)
})

router.put('/:id', validateObjectId, async (req, res) => {

    const { error } = validateGenre(req.body)
    if (error) {
        res.status(400).send(error.details[0].message)
        return
    }
    const id = req.params.id
    const genre = await Genre.findByIdAndUpdate(id,
        { name: req.body.name }, { new: true });
    if (genre) {
        res.send(genre)
        return
    }

    res.status(400).send('Genre not found')
})

router.delete('/:id', [auth, admin], async (req, res) => {
    const genre = await Genre.findByIdAndDelete(req.params.id)
    if (!genre) {
        res.status(400).send('Genre not found')
    }
    else {
        res.send(genre)
    }
})



module.exports = router