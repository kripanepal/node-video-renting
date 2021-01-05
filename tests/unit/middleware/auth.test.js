const { User } = require('../../../models/user')
const mongoose = require('mongoose')
const auth = require('../../../middlewares/auth')
describe('Auth middleware', () => {
    it('should  populate request with user JWT', () => {

        const user = { _id: mongoose.Types.ObjectId().toHexString(), isAdmin: true }

        const token = new User(user).generateAuthToken();

        const req = {
            header: jest.fn().mockReturnValue(token)
        }
        const res = { status: jest.fn() }
        const next = jest.fn()
        auth(req, res, next)
        expect(req.user).toMatchObject(user)
    })
})