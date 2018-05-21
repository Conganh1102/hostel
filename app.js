/* ===================
   Import Node Modules
=================== */
const env = require('./env');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var api = require('./routes/api.route');

const config = require('./config/database'); // Mongoose Config
var bluebird = require('bluebird');
var mongoose = require('mongoose');
mongoose.Promise = bluebird;

// Connect to database MongoDB
mongoose.connect(config.uri)
.then(()=> { console.log('Succesfully Connected to the Mongodb Database  at URL : ' + config.uri)})
.catch(()=> { console.log('Error Connecting to the Mongodb Database at URL : ' + config.uri)});

var app = express();


// Cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Routing
app.use(express.static(path.join(__dirname, 'public')));
// Connect server to Angular 4 Index.html
//app.get('*', (req, res) => {
  //res.sendFile(path.join(__dirname, '/public/index.html'));
//});
app.use('/api', api);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
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
