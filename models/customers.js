const mongoose = require('mongoose');
const customerSchema = new mongoose.Schema({
    isGold: { type: Boolean, default: false },
    name: { type: String, required: true },
    phone: { type: Number, required: true }
})

const Customer = mongoose.model('Customer', customerSchema)
const validateCustomer = (customer) => {
    const schema = Joi.object({
        name: Joi.string().required().min(1),
        isGold: Joi.boolean(),
        phone: Joi.number().required()
    })
    return schema.validate(customer)
}

module.exports.Customer = Customer

module.exports.validateCustomer = validateCustomer;