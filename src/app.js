let express = require('express');
let path = require('path');
let logger = require('morgan');
let favicon = require('serve-favicon');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let index = require('./routes/index');
let publications = require('./routes/publications');
let resource = require('./routes/resource');
let busboyBodyParser = require('busboy-body-parser');
let app = express();
const db_i = require('./storage/controller.image');
const db_p = require('./storage/controller.publications');

async function createConnections() {
    try {
        let result=await db_p.connect(`mongodb://localhost:27017/publications`);
        await  db_i.connect();
        console.log('+ Connected to mongodb '+(result)?result:"");
    } catch (e) {
        console.log('- Cannot connected to mongodb ' + (e ? e : ""));
        throw 'Cannot connect to db';
    }
}


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(busboyBodyParser());  // for files


app.use('/', index);
app.use('/publications', publications);
app.use('/res', resource);
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
    console.log(res.locals.error);
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

createConnections();
module.exports = app;
