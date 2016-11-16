var express = require('express');
var router = express.Router();
const knex = require('../knex');
router.get('/api/users', function(req, res, next) {
  knex('users').innerJoin('moods', 'moods.id', 'users.mood_id')
  .then(users => {
    console.log(users);
    res.send(users)
  })
  .catch(err => next(err))
});

router.post('/api/mood', function(req, res, next) {
  console.log('in /api/mood route');
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
    .catch(err => next(err))
});


module.exports = router;
