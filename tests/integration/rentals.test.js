const request = require('supertest')
const { Rental } = require('../../models/rentals')
const { User } = require('../../models/user')
const mongoose = require('mongoose')
let server
let customerId;
let movieId;
let rental

describe('/api/genres', () => {
    beforeEach(async () => {
        server = require('../../index')
        customerId = mongoose.Types.ObjectId()
        movieId = mongoose.Types.ObjectId()
        rental = new Rental({

            name: '12345', phone: '12345'
            ,
            movie: { _id: movieId, title: '12345', dailyRentalRate: 2 }
        })

        await rental.save()
    })
    afterEach(async () => {
        await server.close()
        await Rental.remove({})

    })


    it('should work', async () => {
        console.log(rental._id + "=====================")
        const result = await Rental.findById(rental._id)
        expect(result).not.toBeNull()
    })

})
