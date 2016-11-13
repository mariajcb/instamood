var express = require('express');
var router = express.Router();
var passport = require('passport');

// app.get('/', function(req, res){
//   res.render('index', { user: req.user });
// });
//
// app.get('/account', ensureAuthenticated, function(req, res){
//   res.render('account', { user: req.user });
// });
//
// app.get('/login', function(req, res){
//   res.render('login', { user: req.user });
// });


router.get('/instagram',
  passport.authenticate('instagram'),
  function(req, res){
    // The request will be redirected to Instagram for authentication, so this
    // function will not be called.
  });


router.get('/instagram/callback',
  passport.authenticate('instagram', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

// app.get('/logout', function(req, res){
//   req.logout();
//   res.redirect('/');
// });

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

module.exports = router;
