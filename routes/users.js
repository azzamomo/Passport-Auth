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
    User.findUserByEmail(email, function (err, user) {
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

router.get('/test', ensureAuthenticated, function(req, res) {
  //res.render('test', {success_message:'You have successfully logged in'});
  res.render('test');
});

function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    //req.flash('error_msg','You are not logged in');
    res.redirect('login');
  }
}

router.post('/login', passport.authenticate('local', { successRedirect: '/users/test',
                                                    failureRedirect: '/users/login',
                                                    failureFlash: true })
);

module.exports = router;