require('dotenv').config();

let express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    consign = require('consign'),
    passport = require('passport'),
    passportConfig = require('./passport')(passport),
    // jwt = require('jsonwebtoken'),
    config = require('./index'),
    databaseController = require('../database/DB.controller').connect(mongoose, config);

app = express();


// view engine setup
app.set('views', path.resolve(__dirname, "..", "views"));    //configure path to views
app.set('view engine', 'ejs');  //choose template engine

app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));    //configure favicons

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(logger('dev'));
app.use(passport.initialize());
app.set('codualsecret', config.secret);
consign({cwd: 'Codual/app'})
    .include('/api')
    .then('/routes')
    .then('../Utils.js')
    .into(app);

// // setup routers
// app.use('/', require('@CodualRoutes/index'));
// app.use('/users', require('@CodualRoutes/users'));
// app.use('/publications', require('@CodualRoutes/publications'));
// app.use('/api/v1', require('@CodualRoutes/api.v1'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.send(err.message || "Server error");
});
module.exports = app;
