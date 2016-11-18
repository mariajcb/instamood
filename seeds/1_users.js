exports.seed = function(knex) {
  return knex('users').del()
    .then(() => {
      return knex('users').insert([{
        username: 'ali',
        user_img: 'https://picturetheday.shootproof.com/gallery/3041465/photo/383127853',
        mood_id: 1,
        Lat: 40.017356,
        Long: -105.279302
      },{
        username: 'yames',
        user_img: 'https://avatars2.githubusercontent.com/u/13577826?v=3&s=460',
        mood_id: 2,
        Lat: 40.015713,
        Long:-105.275612
      },{
        username: 'bouchard',
        user_img: 'https://avatars1.githubusercontent.com/u/10106752?v=3&s=460',
        mood_id: 3,
        Lat: 40.017750,
        Long:-105.278315
      },{
        username: 'tara',
        user_img: 'https://media.licdn.com/media/AAEAAQAAAAAAAAgMAAAAJGJkZTEwMDNmLTcwNDYtNGUwMi1hNzUzLWVmYmExYjUyNTBkYQ.jpg',
        mood_id: 4,
        Lat: 40.013182,
        Long: -105.279259
      },{
        username: 'craag',
        user_img: 'https://media.licdn.com/media/p/2/005/09a/133/1d2dbf7.jpg',
        mood_id: 5,
        Lat: 40.015680,
        Long:-105.275397
      },{
        username: 'stefani',
        user_img: 'https://media.licdn.com/media/AAEAAQAAAAAAAAlEAAAAJDA0M2RiMmNkLWI3NmMtNDYwZi1hNWZjLThmNzJjMjg5ODZlNw.jpg',
        mood_id: 6,
        Lat: 40.019887,
        Long:-105.274152
      }]);
    });
};
