exports.up = function(knex) {
  return knex.schema.createTable('moods', (table) => {
    table.increments();
    table.string('mood')
      .unique()
      .notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('moods');
};
