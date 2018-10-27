var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../Models/user');

var router = express.Router();

router.get('/login', function(req, res) {
	res.render('login');
});

passport.use(new LocalStrategy(
  function(email, password, done) {
    User.findUserByEmail({ email: email }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }
      User.comparePassword(password, user.password, function(err, isMatch) {
      	if(err) throw err;
      	if(!isMatch) {
      		return done(null, false, { message : 'Incorrect Password.' });
      	}
      	else {
      		return done(null, user);
      	}
      });
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login', passport.authenticate('local', { successRedirect: '/test',
                                                    failureRedirect: '/users/login',
                                                    failureFlash: true }));

module.exports = router;