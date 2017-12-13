const mongoose = require('mongoose');
const DBimage = require('@DBcore').images;
const config = require('@config');

module.exports = async (app) => {
    const database = mongoose.connection;
    mongoose.Promise = Promise;
    mongoose.connect(config.DB, {
        useMongoClient: true,
        promiseLibrary: global.Promise
    });
    database.on('error', error => console.log(`-DB: connection failed: ${error}`));
    database.on('connected', async () => {
        console.log(`+DB: connected`)
        await DBimage.connect();
    });
    database.on('disconnected', () => console.log('-DB: disconnected'));
    process.on('SIGINT', () => {
        database.close(() => {
            console.log('+DB: connection closed');
            process.exit(0);
        })
    });
    console.log("+DB: configured")
    console.log(`+DB: ${config.DB}`)
}