const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { Customer, validateCustomer } = require('../models/customers')

router.get('/', async (req, res) => {
    throw new Error('nanana')
    const customer = await Customer.find({});
    res.send(customer)
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    const customer = await Customer.findById(id).sort('name');
    if (customer) return res.send(customer)
    res.status(400).send("Wrong id")
})

router.post('/', async (req, res) => {
    const { error } = validateCustomer(req.body)

    if (error) {
        res.status(400).send(error.details[0].message)
        return
    }
    const customer = await new Customer(req.body)
    customer.save()
    res.send(customer)
})

router.put('/:id', async (req, res) => {

    const { error } = validateCustomer(req.body)
    if (error) {
        res.status(400).send(error.details[0].message)
        return
    }
    const id = req.params.id
    const customer = await Customer.findByIdAndUpdate(id,
        { name: req.body.name }, { new: true });
    if (customer) {
        res.send(customer)
        return
    }

    res.status(400).send('Genre not found')
})

router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndDelete(req.params.id)
    if (!customer) {
        res.status(400).send('Genre not found')
    }
    else {
        res.send(customer)
    }
})


module.exports = router