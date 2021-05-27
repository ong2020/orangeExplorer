var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();

// set env vars down to jade
// process.env.ORANGE_RPC_URL = process.env.ORANGE_RPC_URL || "//18.166.64.196:2020"
process.env.ORANGE_RPC_URL = process.env.ORANGE_RPC_URL || "//api.scan.orangechain.org"
app.locals.env = process.env;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.get('/', function (req, res, next) {
  res.render('index', {
    title: 'The Orange Block Explorer'
  });
});

app.get('/block/:number/', function (req, res, next) {
  var number = req.params['number'];
  res.render('block', {
    title: 'Block',
    number: number
  });
});

app.get('/tx/:hash/', function (req, res, next) {
  var hash = req.params['hash'];
  res.render('transaction', {
    title: 'Transaction',
    hash: hash
  });
});

app.get('/address/:address/:current_page/', function (req, res, next) {
  var address = req.params['address'];
  var current_page = req.params['current_page'];
  res.render('address', {
    title: 'Address',
    address: address,
    current_page: current_page
  });
});

app.get('/blockList/:current_page/', function (req, res, next) {
  var current_page = req.params['current_page'];
  res.render('blockList', {
    title: 'blockList',
    current_page: current_page
  });
});

app.get('/transactionsList/:current_page/', function (req, res, next) {
  var current_page = req.params['current_page'];
  res.render('transactionsList', {
    title: 'transactionsList',
    current_page: current_page
  });
});

app.get('/accountsList/:current_page/', function (req, res, next) {
  var current_page = req.params['current_page'];
  res.render('accountsList', {
    title: 'accountsList',
    current_page: current_page
  });
});

app.get('/watch', function (req, res, next) {
  res.render('watch', {
    title: 'Watch'
  });
});

app.post('/decoder', function (req, res, next) {
  // req.body.data
  res.json({});
});

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
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
