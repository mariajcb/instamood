var express = require('express');
var router = express.Router();
var passport = require('passport');

console.log(`auth js is firing`);

// router.get('/', function(req, res){
//   res.render('index', { user: req.user });
// });

// router.get('/account', ensureAuthenticated, function(req, res){
//   res.render('account', { user: req.user });
// });

// router.get('/login', function(req, res){
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
    console.log(`INSTAGRAM IS FIRING`);
    res.redirect('/');
  });

// router.get('/logout', function(req, res){
//   req.logout();
//   res.redirect('/');
// });

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

module.exports = router;
