const config = require('config');
module.exports = () => {

    if (!config.get('jwtPrivateKey')) {
        console.log('no jwt key')
        process.exit(1);
    }

}
