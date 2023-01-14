var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var ordersRouter = require('./routes/orders');
var inventoryRouter = require('./routes/inventory');

const appPort = process.env.PORT || 3000; 
const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  //baseURL: 'https://localhost:3000',
  baseURL: 'https://dev.royer.page:3000',
  clientID: 'LDvGD1rk91keflIBE7zvV4uFSw08nGII',
  issuerBaseURL: 'https://dev-470db2ho.us.auth0.com',
  secret: 'f0f831cd7c0f7f6e1015efb4714b07d5e161dd6fa0ec74a7377c547485f3bac7'
};

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// Middleware to make the `user` object available for all views
app.use(function (req, res, next) {
  res.locals.user = req.oidc.user;
  next();
});

// expose the swagger.json OpenAPI definition
app.use(express.static(path.join(__dirname, 'open-api')));


// Provide routes to different microservices
app.use('/', indexRouter);
app.use('/order', ordersRouter);
app.use('/inventory', inventoryRouter);



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
