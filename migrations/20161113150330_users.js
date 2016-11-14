exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('username')
      .unique()
      .notNullable();
    table.integer('insta_id')
      .notNullable();
    table.integer('mood_id')
      .references('moods.id')
      .onDelete('CASCADE')
      .notNullable()
      .index();
    table.float('latitude');
    table.float('longitude');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
