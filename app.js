'use strict';
const basicAuth = require('express-basic-auth');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const logger = require('morgan');
const path = require('path');

const verifyLoggedInUser = require('./lib/verifyLoggedInUser');

const index = require('./routes/index');
const login = require('./routes/login');
const users = require('./routes/users');

let app = express();
app.use(cors());

app.use(logger('dev'));
app.use(bodyParser.json());

app.use('/login', login);

// basic auth is a security requirement while in development
// to authenticate:
//   via the browser: enter mock & password in the popup
//   via curl: add `-u mock:password` to requests
//   via ajax: add the following header:
//     'Authorization': 'Basic ' + btoa('mock:password')
app.use(
  basicAuth({
    users: { mock: 'password' },
    challenge: true,
  })
);

app.use('/', index);
app.use('/users', users);

app.use(verifyLoggedInUser);


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
  res.json({
    message: err.message,
    error: err,
  });
});

module.exports = app;
