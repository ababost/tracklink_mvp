// src/utils/testAllApi.ts
import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

async function testAllAPIs() {
  try {
    // Create artist
    const artistResponse = await axios.post(`${API_URL}/artists`, {
      name: 'Test DJ',
      email: 'testdj1@example.com',
      bio: 'Test bio'
    });
    const artistId = artistResponse.data.id;
    console.log('✅ Created artist:', artistResponse.data);

    // Create promoter
    const promoterResponse = await axios.post(`${API_URL}/promoters`, {
      name: 'Test Promoter',
      email: 'promoter@example.com',
      city: 'New York',
      venues: ['Venue A', 'Venue B']
    });
    const promoterId = promoterResponse.data.id;
    console.log('✅ Created promoter:', promoterResponse.data);

    // Create gig
    const gigResponse = await axios.post(`${API_URL}/gigs`, {
      artist_id: artistId,
      promoter_id: promoterId,
      venue: 'Venue A',
      date: '2024-12-31',
      fee: 1000,
      details: { start_time: '22:00', duration: '2 hours' }
    });
    const gigId = gigResponse.data.id;
    console.log('✅ Created gig:', gigResponse.data);

    // Create messages
    const messageResponse = await axios.post(`${API_URL}/messages`, {
      gig_id: gigId,
      type: 'email',
      content: 'Would you be available for this gig?'
    });
    console.log('✅ Created message:', messageResponse.data);

    // Get message thread
    const threadResponse = await axios.get(`${API_URL}/messages/gig/${gigId}`);
    console.log('✅ Retrieved message thread:', threadResponse.data);

    // Update gig status
    const statusResponse = await axios.put(`${API_URL}/gigs/${gigId}/status`, {
      status: 'confirmed'
    });
    console.log('✅ Updated gig status:', statusResponse.data);

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('❌ API test failed:', error.response?.data || error.message);
    } else {
      console.error('❌ API test failed:', error);
    }
  }
}

testAllAPIs()
  .then(() => console.log('\nAPI testing completed'))
  .catch(console.error);