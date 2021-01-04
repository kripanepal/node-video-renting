const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
    {
        const token = req.header('x-auth-token');
        if (!token) return res.status(401).send("No authorization token")

        try {
            const decoded = jwt.verify(token, config.get('jwtPrivateKey'))
            req.user = decoded
            next()
        } catch (error) {

            return res.status(401).send("Bad request")

        }


    }
}