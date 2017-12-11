module.exports = {
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
            CALLBACK_URL: '/api/v1/auth/facebook/token'
        }
    },
    security: {
        TOKEN_LIFE: 60 * 60 * 60 //36 hours
    },
};