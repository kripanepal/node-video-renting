const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const { User, validateUser } = require('../models/user')
const auth = require('../middlewares/auth')



router.post('/', async (req, res) => {
    const { error } = validateUser(req.body)

    if (error) {
        res.status(400).send(error.details[0].message)
        return
    }
    const userExists = await User.find({ email: req.body.email })

    if (userExists.length !== 0) return res.status(400).send("user exisits")

    const salt = await bcrypt.genSalt(11)
    const hashed = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashed
    })
    const token = user.generateAuthToken()
    user.save()
    res.header('x-auth-token', token)
    res.send(user)
})



router.get('/me', auth, async (req, res) => {

    const userId = req.user._id

    const user = await User.findById(userId).select('-password');

    res.send(user)



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