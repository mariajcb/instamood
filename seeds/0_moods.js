exports.seed = function(knex) {
 return knex('moods').del()
  .then(() => {
   return knex('moods').insert([{
    mood: 'anger'
   }, {
    mood: 'contempt'
   }, {
    mood: 'disgust'
   }, {
    mood: 'fear'
   }, {
    mood: 'happiness'
   }, {
    mood: 'neutral'
   }, {
    mood: 'sadness'
   }, {
    mood: 'surprise'
   }]);
  });
};
