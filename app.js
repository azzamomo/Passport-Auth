var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var validator = require('express-validator');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var mongoose = require('mongoose');
var passport = require('passport');
var users = require('./routes/users');

mongoose.connect('mongodb://localhost/credentials', {useNewUrlParser : true});
var db = mongoose.connection;

var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(validator());

app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(flash());

app.use(function (req, res, next) {
  res.locals.success_message = req.flash('success_message');
  res.locals.error_message = req.flash('error_message');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

app.use('/users', users);

app.listen(3000, function() {
	console.log('Server listening on port 3000');
});