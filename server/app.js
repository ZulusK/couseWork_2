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

// start
var app = express();
console.log("+:Up");

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(busboyBodyParser());
app.use(cookieParser());

require('@auth').init(app);
require('@routes')(app);
require('@driverDB')(app);

module.exports = app;
