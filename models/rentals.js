const Joi = require('joi');
const mongoose = require('mongoose');


const rentalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    isGold: { type: Boolean, default: false },
    phone: { type: Number, required: true },
    movie: {
        type: new mongoose.Schema({
            title: { type: String, required: true },
            dailyRentalRate: { type: Number, required: true }
        })
    },
    dateOut: { type: Date, default: Date.now },
    dateReturned: { type: Date },
    rentalFee: { type: Number, min: 0 }
})


const Rental = mongoose.model('Rentals', rentalSchema)


const validateRental = (rental) => {
    const schema = Joi.object({
        customerID: Joi.string().required().min(1),
        movieId: Joi.string().required().min(1),

    })
    return schema.validate(rental)

}

module.exports = {
    validateRental, Rental
}