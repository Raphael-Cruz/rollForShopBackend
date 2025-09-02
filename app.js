require('./config/db');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var index = require('./src/routes/index');
var usersRouter = require('./src/routes/users');
const shopRouter = require('./src/routes/shopRouter');
const myshopsRouter = require('./src/routes/myshopsRouter');
const generatedshopRouter = require('./src/routes/generatedshopRouter');
const itemRouter = require("./src/routes/itemRouter");
const auth = require('./src/middleware/auth');

var app = express();

// CORS must come BEFORE routes
app.use(cors({
  origin: 'http://localhost:4200', // Angular frontend
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  credentials: true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middlewares
app.use(logger('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', index);
app.use('/users', usersRouter);
app.use('/shop', shopRouter);
app.use('/generatedshop', generatedshopRouter);
app.use('/generatedshopId', generatedshopRouter);
app.use("/items", itemRouter);
app.use('/myshops', auth, myshopsRouter);

// Optional: handle preflight OPTIONS requests explicitly
app.options('*', cors());

app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
