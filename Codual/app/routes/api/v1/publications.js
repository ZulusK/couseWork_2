const publ_db = require('@CodualDB//controllers/controller.publication'),
    user_db = require('@CodualDB//controllers/controller.user'),
    passport = require('passport'),
    config = require('@config'),
    express = require('express');

module.exports = (app) => {
    const API = app.api;
    let router_publ = express.Router();
    router_publ.get('/', (req, res) => res.send('Codual API publications'));
    //GET BY QUERY
    //GET BY ID
    //REMOVE
    //ADD
    //UPDATE
    //todo
    router_publ.post('/', (req, res) => res.send('Codual publications API'));
    router_publ.post('/add', API.auth.verifyUser(user_db), API.publication.create(publ_db));

    // router_publ.post('/is/logined', API.auth.verify);

    app.use('/api/v1/publications', router_publ);
}


