require('module-alias/register');


module.exports = {
    secret: process.env.SECRET || "raisawesome",
    session: {session: false},
    database: 'mongodb://127.0.0.1:27017/codual'
}