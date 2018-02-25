const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const Session = require('express-session');
const users = require('./routes/users');
const home = require('./routes/home');
const image = require('./routes/image');
const Login = require('./routes/login');
const signup = require('./routes/signup');
const mongoose = require('mongoose');

mongoose.connect('mongo uri', function(err){
  if (err)
  {
    console.log(err);
    throw(err);
  }
  console.log("MONGO CONNECTED!")
});
let db = mongoose.connection;

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(Session({
    secret: 'something',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 600000}
}));
// app.use(passport.initialize());
// app.use(passport.session());

app.use(function(req, res, next) {
    if(req.session.user)
        res.locals.UserID = req.session.user.id;
    res.locals.FlashMessage = req.session.FlashMessage;
    delete req.session.FlashMessage;
    next();
});

app.use('/', home);
app.use('/store', users);
app.use('/home', home);
app.use('/Image', image);
app.use('/auth', Login);
app.use('/signup', signup);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
