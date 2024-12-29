// src/database/migrations/20241226000000_initial_schema.ts
import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Create artists table
  await knex.schema.createTable('artists', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('name').notNullable();
    table.string('email').unique().notNullable();
    table.text('bio');
    table.string('spotify_url');
    table.string('soundcloud_url');
    table.string('instagram_url');
    table.jsonb('press_kit');
    table.jsonb('availability');
    table.timestamps(true, true);
  });

  // Create promoters table
  await knex.schema.createTable('promoters', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('name').notNullable();
    table.string('email').unique().notNullable();
    table.string('city');
    table.specificType('venues', 'text ARRAY');
    table.timestamps(true, true);
  });

  // Create gigs table
  await knex.schema.createTable('gigs', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('artist_id').references('id').inTable('artists').onDelete('CASCADE');
    table.uuid('promoter_id').references('id').inTable('promoters');
    table.string('venue').notNullable();
    table.timestamp('date').notNullable();
    table.string('status').notNullable().defaultTo('pending');
    table.decimal('fee', 10, 2);
    table.jsonb('details');
    table.timestamps(true, true);
  });

  // Create messages table
  await knex.schema.createTable('messages', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('gig_id').references('id').inTable('gigs').onDelete('CASCADE');
    table.string('type').notNullable(); // 'email', 'chat', etc.
    table.text('content').notNullable();
    table.string('status');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('messages');
  await knex.schema.dropTableIfExists('gigs');
  await knex.schema.dropTableIfExists('promoters');
  await knex.schema.dropTableIfExists('artists');
}