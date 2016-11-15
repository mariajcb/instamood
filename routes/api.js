var express = require('express');
var router = express.Router();
const knex = require('../knex');
router.get('/users', function(req, res, next) {
  knex('users')
  .then(users => {
    res.send(users)
  })

router.post('/api/mood', function(req, res, next) {
  knex('users')
    .where('username', req.body.username)
    .then((data) => {
      if(data.length === 0){
        knex('users')
        .insert({
          username: req.body.username,
          user_img: req.body.img,
          mood_id: req.body.mood
        })
        .then((data) => {
          res.send('hey');
        })
      }else{

      }
    })
});


module.exports = router;
