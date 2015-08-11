var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
/**var cookieParser = require('cookie-parser');**/
var bodyParser = require('body-parser');
var busboy = require('connect-busboy');
var routes = require('./routes/index');
var register = require('./routes/register');
var users = require('./routes/users');
var messages = require('./lib/messages');
var session = require('express-session');
var login = require('./routes/login');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
/**app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());**/
app.use(busboy());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'shoutBox',
  resave: true,
  saveUninitialized: true
}));
app.use(messages);

/**app.use('/', routes);
app.use('/users', users);**/
/** REGISTRATION ROUTES **/
app.get('/register', register.form);
app.post('/register', register.submit);

//Login Routes

app.get('/login', login.form);
app.post('/login', login.submit);
app.get('/logout', login.logout);

app.listen(3000,function(err){
  if(err) throw err;
  console.log("Server started");
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
