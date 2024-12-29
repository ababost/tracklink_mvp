// src/utils/testApi.ts
import axios, { AxiosError } from 'axios';

const API_URL = 'http://localhost:3001/api';

async function testArtistAPI() {
  try {
    console.log('Testing Artist API endpoints...\n');

    // Test CREATE
    console.log('Testing CREATE artist...');
    const createResponse = await axios.post(`${API_URL}/artists`, {
      name: 'Test DJ',
      email: 'testdj@example.com',
      bio: 'Test bio'
    });
    console.log('✅ Created artist:', createResponse.data);
    const artistId = createResponse.data.id;

    // Test GET by ID
    console.log('\nTesting GET artist...');
    const getResponse = await axios.get(`${API_URL}/artists/${artistId}`);
    console.log('✅ Retrieved artist:', getResponse.data);

    // Test UPDATE
    console.log('\nTesting UPDATE artist...');
    const updateResponse = await axios.put(`${API_URL}/artists/${artistId}`, {
      bio: 'Updated bio'
    });
    console.log('✅ Updated artist:', updateResponse.data);

    // Test DELETE
    console.log('\nTesting DELETE artist...');
    await axios.delete(`${API_URL}/artists/${artistId}`);
    console.log('✅ Deleted artist');

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('❌ API test failed:', error.response?.data || error.message);
    } else {
      console.error('❌ API test failed:', error);
    }
  }
}

testArtistAPI()
  .then(() => console.log('\nAPI testing completed'))
  .catch(console.error);