require('dotenv').config();

let express = require('express'),
    cors = require('cors'),
    consign = require('consign'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    passportConfig = require('./config/passport')(passport),
    config = require('@config/index'),
    mongoose = require('mongoose'),
    databaseController = require('@CodualDB/controllers/controller').connect(mongoose, config);
// jwt = require('jsonwebtoken'),

// setup express app
app = express();

// view engine setup
app.set('views', path.join(__dirname, 'srs', "views"));             //configure path to views
app.set('view engine', 'ejs');                                      //choose template engine
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));    //configure favicons
app.use(express.static(path.join(__dirname, 'src', 'public')));     //configure path to res

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(logger('dev'));
app.use(passport.initialize());
app.set('codualsecret', config.secret);
//add routers to app
consign({cwd: 'server/app'})
    .include('/api')
    .then('/routes')
    .then('../Utils.js')
    .into(app);

// setup response with vue UI
app.get('/*', (req, res, next) => {
    res.sendFile(path.join(__dirname, "views", '/index.html'));
});

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
