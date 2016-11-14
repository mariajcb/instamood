exports.seed = function(knex) {
  return knex('users').del()
    .then(() => {
      return knex('users').insert([{
        username: 'ali',
        insta_id: 123,
        mood_id: 1,
        latitude: 40.017356,
        longitude: -105.279302
      },{
        username: 'yames',
        insta_id: 123,
        mood_id: 2,
        latitude: 40.015713,
        longitude:-105.275612
      },{
        username: 'bouchard',
        insta_id: 123,
        mood_id: 3,
        latitude: 40.017750,
        longitude:-105.278315
      },{
        username: 'tara',
        insta_id: 123,
        mood_id: 4,
        latitude: 40.013182,
        longitude: -105.279259
      },{
        username: 'phoebe',
        insta_id: 123,
        mood_id: 5,
        latitude: 40.015680,
        longitude:-105.275397
      },{
        username: 'stephanie',
        insta_id: 123,
        mood_id: 6,
        latitude: 40.019887,
        longitude:-105.274152
      },{
        username: 'tucker',
        insta_id: 123,
        mood_id: 7,
        latitude: 40.018802,
        longitude:-105.297284
      },{
        username: 'cherrybomb',
        insta_id: 123,
        mood_id: 8,
        latitude: 40.008054,
        longitude:-105.292821
      }]);
    });
};
