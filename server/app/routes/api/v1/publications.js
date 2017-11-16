const publ_db = require('@CodualDB/controllers/controller.publication'),
    user_db = require('@CodualDB/controllers/controller.user'),
    passport = require('passport'),
    config = require('@config'),
    express = require('express');

module.exports = (app) => {
    const API = app.api;
    let router_publ = express.Router();
    //ROOT
    router_publ.get('/', (req, res) => res.json({message: API.publication.rootRoad}));
    router_publ.post('/', (req, res) => res.json({message: "send get req to this URL"}));

    //CREATE
    router_publ.post('/create', passport.authenticate('jwt', config.session), API.publication.create(publ_db));
    router_publ.get('/create', (req, res) => res.json({message: API.publication.createRoad}));

    //GET BY QUERY
    router_publ.post('/find', API.publication.get(publ_db));//passport.authenticate('jwt', config.session)
    router_publ.get('/find', (req, res) => res.json({message: API.publication.findRoad}));

    //UPDATE
    router_publ.put('/update', passport.authenticate('jwt', config.session), API.publication.update(publ_db));
    router_publ.post('/update', (req, res) => res.json({message: "change method type to 'put'"}));
    router_publ.get('/update', (req, res) => res.json({message: API.publication.updateRoad}));

    //GET OWN
    router_publ.post('/list', passport.authenticate('jwt', config.session), API.publication.list(publ_db));
    router_publ.get('/list', (req, res) => res.json({message: API.publication.listRoad}));

    //REMOVE
    router_publ.delete('/delete', passport.authenticate('jwt', config.session), API.publication.delete(publ_db, user_db));
    router_publ.post('/delete', (req, res) => res.json({message: "change method type to 'delete'"}));
    router_publ.get('/delete', (req, res) => res.json({message: API.publication.deleteRoad}));

    app.use('/api/v1/publications', router_publ);
}


