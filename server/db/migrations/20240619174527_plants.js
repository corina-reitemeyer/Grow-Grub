/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.createTable('plants', (table) => {
    table.increments('id').primary()
    table.string('name')
    table.string('icon_src')
    table.string('photo_src')
    table.string('difficulty')
    table.string('planting_starts')
    table.string('planting_ends')
    table.string('watering_frequency')
    table.string('sun_level')
    table.string('cycle')
    table.integer('days_from_planting_until_harvest')
    table.integer('days_from_seed_until_seedling')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.dropTable('plants')
}
