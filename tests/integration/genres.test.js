const request = require('supertest')
const { Genre } = require('../../models/genres')
const { User } = require('../../models/user')
let server


describe('/api/genres', () => {
    beforeEach(() => { server = require('../../index') })
    afterEach(async () => {
        await server.close()
        await Genre.remove({})

    })

    describe('GET /', () => {
        it('should return all genre', async () => {
            await Genre.collection.insertMany([
                { name: 'genre1' }, { name: 'genre2' }, { name: 'genre3' }
            ])
            const res = await request(server).get('/api/genres')
            expect(res.body.some(g => g.name === 'genre1')).toBeTruthy()
        })
    })

    describe('GET /:id', () => {
        it('should return a genre if valid ID is passed', async () => {
            const genre = await new Genre({ name: 'a' }).save()
            const res = await request(server).get('/api/genres/' + genre._id)

            expect(res.body).toHaveProperty('name', 'a')
        })

        it('should return a 404 if invalid ID is passed', async () => {
            const res = await request(server).get('/api/genres/' + '100')

            expect(res.status).toBe(404)
        })
    })


    describe('post', () => {
        let token;
        let genreName
        const exec = async () => {
            return await request(server)
                .post('/api/genres/')
                .set('x-auth-token', token)
                .send({ name: genreName })
        }
        beforeEach(() => {
            genreName = 'genre1'
            token = new User().generateAuthToken()
        })

        it('should return a 401 if client is not logged in', async () => {
            token = ''
            const res = await exec()
            expect(res.status).toBe(401)
        })


        it('should return a 400 if genre is invalid if genre is less than 1 characters', async () => {
            genreName = ""
            res = await exec();
            expect(res.status).toBe(400)
        })

        it('should save a genre if genre is valid ', async () => {
            await exec()
            const genre = Genre.find({ name: 'genre1' })
            expect(genre).not.toBeNull()
        })

        it('should return a genre if genre is valid ', async () => {
            const res = await exec();
            expect(res.body).toHaveProperty('name', 'genre1')
        })
    })

})