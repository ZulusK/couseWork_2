const path = require('path');
module.exports = {
    API_DOCS: path.join(__dirname, '..', 'public', 'endpoints.md'),
    ROOT_URL: (process.env.NODE_ENV == 'dev') ?
        `localhost:${this.PORT}` : 'https://codual.herokuapp.com',
    DB: (process.env.NODE_ENV == 'dev') ?
        'mongodb://localhost:27017/webprogbase2' :
        `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds042527.mlab.com:42527/codual_db`,
    PORT: process.env.PORT || 3000,
    auth: {
        facebook: {
            APP_ID: process.env.FACEBOOK_APP_ID,
            APP_SECRET: process.env.FACEBOOK_APP_SECRET,
            CALLBACK_URL: 'http://localhost:3000/api/v1/auth/facebook/token'
        }
    },
    security: {
        TOKEN_LIFE: {
            access: 60 * 60 * 24, //24 hours
            refresh: 60 * 60 * 24 * 10 //10 days
        }
    },
    MAX_FILE_SIZE: process.env.MAX_FILE_SIZE || 5000000 //5 Mb
};