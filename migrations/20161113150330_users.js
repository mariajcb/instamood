exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('username')
      .unique()
      .notNullable();
    table.string('user_img');
    table.integer('mood_id')
      .references('moods.id')
      .onDelete('CASCADE')
      .notNullable()
      .index();
    table.float('Lat');
    table.float('Long');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
