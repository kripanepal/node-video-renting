const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const { User } = require('../models/user')
const Joi = require('Joi')
const jwt = require('jsonwebtoken')
const config = require('config')

const validateUser = (user) => {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required().min(2),

    })
    return schema.validate(user)
}

router.post('/', async (req, res) => {
    const { error } = validateUser(req.body)

    if (error) {
        res.status(400).send(error.details[0].message)
        return
    }
    const user = await User.findOne({ email: req.body.email })

    if (!user) return res.status(400).send("user doesnot exisits")


    const password = await bcrypt.compare(req.body.password, user.password)
    if (!password) return res.status(400).send("Invalid passssss")

    const token = user.generateAuthToken()
    res.send(token)
})

router.put('/:id', async (req, res) => {

    const { error } = validateUser(req.body)
    if (error) {
        res.status(400).send(error.details[0].message)
        return
    }
    const id = req.params.id
    const user = await user.findByIdAndUpdate(id,
        { name: req.body.name }, { new: true });
    if (user) {
        res.send(user)
        return
    }

    res.status(400).send('user not found')
})

router.delete('/:id', async (req, res) => {
    const user = await user.findByIdAndDelete(req.params.id)
    if (!user) {
        res.status(400).send('user not found')
    }
    else {
        res.send(user)
    }
})



module.exports = router