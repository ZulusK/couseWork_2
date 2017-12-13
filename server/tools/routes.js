const path = require('path');
module.exports = (app) => {
    // api middleware
    app.use('/api', require('@routes/api'))
    app.use('*', (req, res, next) => {
        res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
    });
    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handler
    app.use(function (err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
        res.status(err.status || 500);
        res.json({
            success: false,
            message: err.message || (err.status == 404 ? "Not found" : "Something going wrong"),
            code: err.status || 500
        });
    });
    console.log("+Routes: configured")
}