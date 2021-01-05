const request = require('supertest')
const { User } = require('../../models/user')
const { Genre } = require('../../models/genres')
let server


describe('auth middleware', () => {
    beforeEach(() => {
        server = require('../../index');
        token = new User().generateAuthToken();
    })
    afterEach(async () => {
        await server.close();
        await Genre.remove({})
    });

    let token;

    const exec = () => {
        return request(server)
            .post('/api/genres')
            .set('x-auth-token', token)
            .send({ name: 'genre1' });
    }


    it('should return 401 if no token is provided', async () => {
        token = ""
        await exec()
        const res = await request(server).post('/api/genres')
        expect(res.status).toBe(401)
    })


    it('should return 400 if invalid token is provided', async () => {
        token = "123"

        const res = await exec()
        expect(res.status).toBe(400)
    })

    it('should return 200 if valid token is provided', async () => {


        const res = await exec()
        expect(res.status).toBe(200)
    })
})