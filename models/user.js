const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const config = require('config')

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, min: 2 },
    isAdmin: { type: Boolean, default: false }
})

userSchema.methods.generateAuthToken = function () {

    return jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'))
}

const User = mongoose.model('User', userSchema)

const validateUser = (user) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required().min(2)
    })
    return schema.validate(user)
}

module.exports = {
    validateUser, User
}