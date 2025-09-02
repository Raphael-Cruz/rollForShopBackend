require('./config/db');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Importa rotas
var index = require('./src/routes/index');
var usersRouter = require('./src/routes/users');
const shopRouter = require('./src/routes/shopRouter');
const myshopsRouter = require('./src/routes/myshopsRouter');
const generatedshopRouter = require('./src/routes/generatedshopRouter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
app.use('/', index);
app.use('/users', usersRouter);
app.use('/shop', shopRouter);
app.use('/myshop', myshopsRouter);
app.use('/generatedshop', generatedshopRouter);
app.use('/generatedshopId', generatedshopRouter);


app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
