const { User } = require("../../../models/user")
const mongoose = require("mongoose")

const jwt = require("jsonwebtoken")
const config = require('config')
describe('user.generateAuthToken', () => {
    it('should generate a valid JWT', () => {
        const id = new mongoose.Types.ObjectId().toHexString()
        const user = new User({ _id: id, isAdmin: true })
        const token = user.generateAuthToken()

        const decoded = jwt.verify(token, config.get('jwtPrivateKey'))

        expect(decoded).toMatchObject({ _id: id, isAdmin: true })
    })

})