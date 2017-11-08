let express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    favicon = require('serve-favicon'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    index = require('./routes/index'),
    auth = require('./routes/auth'),
    users = require('./routes/users'),
    publications = require('./routes/publications'),
    resource = require('./routes/resource'),
    busboyBodyParser = require('busboy-body-parser'),
    app = express();


const db_i = require('./storage/controller.image'),
    db = require('./storage/controller'),
    storage_users = require('./storage/controller.users');

async function createConnections() {
    try {
        // let result = await db_p.connect(`mongodb://${process.env.DB_LOGIN}:${process.env.DB_PSW}@ds042527.mlab.com:42527/webprogbase_lab_db`);
        let result = await db.connect(`mongodb://localhost:27017/publications`);
        console.log('+ Connected to db' /*+ (result) ? result : ""*/);
        await  db_i.connect();
        console.log('+ Connected to image storage ');
    } catch (e) {
        console.log('- Cannot connected to mongodb ' + (e ? e : ""));
        throw 'Cannot connect to db';
    }
}

function sha512(password, salt) {
    const hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    const value = hash.digest('hex');
    return {
        salt: salt,
        passwordHash: value
    };
};


require('dotenv').config();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(busboyBodyParser());  // for files
app.use(cookieParser());

//init passport
require('./utils/auth').init(app);

app.use('/', index);
app.use('/publications', publications);
app.use('/res', resource);
app.use('/auth', auth);
app.use('/users', users);


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
    if (err.status === 401) {
        res.render('401', {err_description: err.message});
    } else {
        res.render('404', {err_description: err.message});
    }
});

createConnections();

module.exports = app;



