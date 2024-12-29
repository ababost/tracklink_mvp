// src/utils/testDb.ts
import { knex } from 'knex';
import knexConfig from '../../knexfile';

async function testDatabaseConnection() {
  const db = knex(knexConfig.development);
  
  try {
    // Test database connection
    console.log('Testing database connection...');
    await db.raw('SELECT 1');
    console.log('✅ Database connection successful!');

    // Check if tables exist
    console.log('\nChecking tables...');
    const tables = ['artists', 'promoters', 'gigs', 'messages'];
    
    for (const table of tables) {
      const exists = await db.schema.hasTable(table);
      if (exists) {
        console.log(`✅ Table ${table} exists`);
        
        // Get column information
        const columns = await db.table(table).columnInfo();
        console.log(`   Columns:`, Object.keys(columns).join(', '), '\n');
      } else {
        console.log(`❌ Table ${table} does not exist`);
      }
    }

    // Test inserting and querying data
    console.log('\nTesting data operations...');
    
    // Insert test artist
    const insertedArtist = await db('artists')
      .insert({
        name: 'Test DJ',
        email: 'test@example1.com',
        bio: 'Test bio'
      })
      .returning('*');
    
    const artistId = insertedArtist[0].id;
    console.log('✅ Test artist inserted successfully', artistId);

    // Query the inserted artist
    const artist = await db('artists')
      .where('id', artistId)
      .first();
    
    console.log('✅ Test artist retrieved successfully:', artist);

    // Clean up test data
    await db('artists').where('id', artistId).delete();
    console.log('✅ Test cleanup completed');

  } catch (error) {
    console.error('❌ Database test failed:', error);
  } finally {
    await db.destroy();
  }
}

// Run the test
testDatabaseConnection()
  .then(() => console.log('\nDatabase testing completed'))
  .catch(console.error);