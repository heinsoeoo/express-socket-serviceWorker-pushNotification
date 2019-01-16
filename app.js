var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var catalogRouter = require('./routes/catalog');

// MongoDB
// Import the mongoose module
var mongoose = require("mongoose");

// Setup default mongoose connection
var mongoDB = "mongodb://root:toor@localhost:27017/mydb";
mongoose.connect(mongoDB, {useNewUrlParser: true});

// Get mongoose to use global promise library
mongoose.Promise = global.Promise;

// Get default connection
var db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules/bulma/css')));

// Session
app.use(session({
  secret: "mySecret",
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

app.use(function(req, res, next) {
  res.locals.authUser = req.session.user;
  let urls = req.url.split('/')
  urls = urls.slice(0,3);
  let url = urls.join('/');
  if (url.includes('/catalog/book') && !url.includes('/catalog/bookinstance')) res.locals.booksActive = "is-active";
  if (url.includes('/catalog/author')) res.locals.authorsActive = "is-active";
  if (url.includes('/catalog/genre')) res.locals.genresActive = "is-active";
  if (url.includes('/catalog/bookinstance')) res.locals.instancesActive = "is-active";
  next()
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  if(err.view && err.view.path === undefined) {
    res.render('custom_error');
  }else{
    res.status(err.status || 500);
    res.render('error');
  }  
});

module.exports = app;