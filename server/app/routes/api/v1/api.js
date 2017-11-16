const apiRoad = "You can use api. Just send post/get http-request to next paths:"
    + "'/api/v1/auth', "
    + "'/api/v1/users', "
    + "'/api/v1/publications'"

module.exports = (app) => {
    app.get('/api', (req, res) => res.redirect('/api/v1'));
    app.get('/api/v1', (req, res) => res.json({message: apiRoad}).end());
}


