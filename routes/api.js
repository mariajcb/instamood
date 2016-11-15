var express = require('express');
var router = express.Router();
const knex = require('../knex');

/* GET home page. */
router.post('/api/mood', function(req, res, next) {
  console.log('hey');
  console.log(req.body);
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
