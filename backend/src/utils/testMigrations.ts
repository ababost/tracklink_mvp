// src/utils/testMigrations.ts
import knex from 'knex';
import knexConfig from '../../knexfile';
import logger from '../utils/logger';

async function testMigrations() {
  const db = knex(knexConfig.development);
  
  try {
    logger.info('Starting migration tests...');

    // Check all required tables
    const tables = ['artists', 'promoters', 'gigs', 'messages'];
    
    for (const table of tables) {
      // Check if table exists
      const exists = await db.schema.hasTable(table);
      if (!exists) {
        throw new Error(`Table ${table} does not exist`);
      }
      logger.info(`✓ Table ${table} exists`);

      // Get column information
      const columnInfo = await db.table(table).columnInfo();
      logger.info(`✓ ${table} columns:`, Object.keys(columnInfo));

      // Check required columns based on table
      switch (table) {
        case 'artists':
          validateColumns(columnInfo, ['id', 'name', 'email', 'bio']);
          break;
        case 'promoters':
          validateColumns(columnInfo, ['id', 'name', 'email', 'city']);
          break;
        case 'gigs':
          validateColumns(columnInfo, ['id', 'artist_id', 'venue', 'date', 'status']);
          break;
        case 'messages':
          validateColumns(columnInfo, ['id', 'gig_id', 'type', 'content']);
          break;
      }
      logger.info(`✓ ${table} has all required columns`);
    }

    logger.info('Migration tests completed successfully');
  } catch (error) {
    logger.error('Migration test failed:', error);
    throw error;
  } finally {
    await db.destroy();
  }
}

function validateColumns(columnInfo: any, requiredColumns: string[]) {
  const missingColumns = requiredColumns.filter(col => !columnInfo[col]);
  if (missingColumns.length > 0) {
    throw new Error(`Missing required columns: ${missingColumns.join(', ')}`);
  }
}

testMigrations()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));