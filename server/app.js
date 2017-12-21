// config
require('dotenv').config();
require('module-alias/register');
require('@config');
// tools
var express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const busboyBodyParser = require('busboy-body-parser');
const cors = require('cors');
// start
var app = express();
console.log("+APP: Up");

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(busboyBodyParser());
app.use(cookieParser());
app.use(cors());
app.use(function (req, res, next) {
    // if (req.method === 'OPTIONS') {
    //     var headers = {};
    //     headers["Access-Control-Allow-Origin"] = "*";
    //     headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
    //     headers["Access-Control-Allow-Credentials"] = false;
    //     headers["Access-Control-Max-Age"] = '86400'; // 24 hours
    //     headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
    //     res.writeHead(200, headers);
    //     return res.end();
    // }
    next();
});

require('@auth').init(app);
require('@middlewares')(app);
require('@driverDB')(app);
require('@code')();
module.exports = app;
