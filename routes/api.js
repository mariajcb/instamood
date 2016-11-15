var express = require('express');
var router = express.Router();
const knex = require('../knex.js')


router.get('/users', function(req, res, next) {
  knex('users')
  .then(users => {
    res.send(users)
})

});


module.exports = router;
