require('module-alias/register');


module.exports = {
    secret: process.env.SECRET || "raisawesome",
    session: {session: false},
    //database: 'mongodb://127.0.0.1:27017/codual',
    database:`mongodb://${process.env.DB_USER_NAME}:${process.env.DB_USER_PASSWORD}@ds042527.mlab.com:42527/codual_db`
}