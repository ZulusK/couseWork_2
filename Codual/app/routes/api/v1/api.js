module.exports = (app) => {
    app.get('/api', (req, res) => res.redirect('/api/v1'));
    app.get('/api/v1', (req, res) => res.json({message: 'application api.v1'}));
}


