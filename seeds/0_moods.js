exports.seed = function(knex) {
 return knex('moods').del()
  .then(() => {
   return knex('moods').insert([{
    mood: 'anger'
   }, {
    mood: 'disgust'
   }, {
    mood: 'fear'
   }, {
    mood: 'happiness'
   }, {
    mood: 'sadness'
   }, {
    mood: 'surprise'
   }]);
  });
};
