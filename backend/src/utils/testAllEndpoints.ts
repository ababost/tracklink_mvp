// src/utils/testAllEndpoints.ts
import axios from 'axios';
import logger from '../utils/logger';

const API_URL = 'http://localhost:3001/api';

interface TestIds {
  artistIds: string[];
  promoterIds: string[];
  gigIds: string[];
  messageIds: string[];
}

// Keep track of all created entities
const ids: TestIds = {
  artistIds: [],
  promoterIds: [],
  gigIds: [],
  messageIds: []
};

// Cleanup function that will be called in all scenarios
async function cleanup() {
  logger.info('\n🧹 Starting cleanup...');

  try {
    // Delete messages first (foreign key constraints)
    for (const messageId of ids.messageIds) {
      try {
        await axios.delete(`${API_URL}/messages/${messageId}`);
        logger.info(`✅ Deleted message: ${messageId}`);
      } catch (error) {
        logger.warn(`Failed to delete message: ${messageId}`, error);
      }
    }

    // Delete gigs
    for (const gigId of ids.gigIds) {
      try {
        await axios.delete(`${API_URL}/gigs/${gigId}`);
        logger.info(`✅ Deleted gig: ${gigId}`);
      } catch (error) {
        logger.warn(`Failed to delete gig: ${gigId}`, error);
      }
    }

    // Delete promoters
    for (const promoterId of ids.promoterIds) {
      try {
        await axios.delete(`${API_URL}/promoters/${promoterId}`);
        logger.info(`✅ Deleted promoter: ${promoterId}`);
      } catch (error) {
        logger.warn(`Failed to delete promoter: ${promoterId}`, error);
      }
    }

    // Delete artists
    for (const artistId of ids.artistIds) {
      try {
        await axios.delete(`${API_URL}/artists/${artistId}`);
        logger.info(`✅ Deleted artist: ${artistId}`);
      } catch (error) {
        logger.warn(`Failed to delete artist: ${artistId}`, error);
      }
    }

    logger.info('🧹 Cleanup completed');
  } catch (error) {
    logger.error('❌ Error during cleanup:', error);
  }
}

async function testAllEndpoints() {
  try {
    logger.info('🚀 Starting comprehensive API endpoints test...');

    // ==================== ARTIST ENDPOINTS ====================
    logger.info('\n📌 Testing Artist Endpoints...');

    // Create artist
    const artistData = {
      name: 'Test DJ',
      email: 'testdj@example.com',
      bio: 'Experienced DJ with unique style',
      spotify_url: 'spotify:artist:test',
      soundcloud_url: 'soundcloud.com/testdj',
      instagram_url: 'instagram.com/testdj'
    };

    const artistResponse = await axios.post(`${API_URL}/artists`, artistData);
    ids.artistIds.push(artistResponse.data.id);
    logger.info('✅ Artist created:', { id: artistResponse.data.id });

    // Get artist
    const getArtistResponse = await axios.get(`${API_URL}/artists/${artistResponse.data.id}`);
    logger.info('✅ Artist retrieved:', getArtistResponse.data);

    // ==================== PROMOTER ENDPOINTS ====================
    logger.info('\n📌 Testing Promoter Endpoints...');

    // Create promoter
    const promoterData = {
      name: 'Test Promoter',
      email: 'promoter@example.com',
      city: 'New York',
      venues: ['Club A', 'Club B', 'Club C']
    };

    const promoterResponse = await axios.post(`${API_URL}/promoters`, promoterData);
    ids.promoterIds.push(promoterResponse.data.id);
    logger.info('✅ Promoter created:', { id: promoterResponse.data.id });

    // ==================== GIG ENDPOINTS ====================
    logger.info('\n📌 Testing Gig Endpoints...');

    // Create gig
    const gigData = {
      artist_id: ids.artistIds[0],
      promoter_id: ids.promoterIds[0],
      venue: 'Club A',
      date: new Date('2024-12-31').toISOString(),
      fee: 1000,
      details: {
        start_time: '22:00',
        duration: '2 hours',
        equipment: ['CDJs', 'Mixer']
      }
    };

    const gigResponse = await axios.post(`${API_URL}/gigs`, gigData);
    ids.gigIds.push(gigResponse.data.id);
    logger.info('✅ Gig created:', { id: gigResponse.data.id });

    // ==================== MESSAGE ENDPOINTS ====================
    logger.info('\n📌 Testing Message Endpoints...');

    // Create messages
    const messageData = {
      gig_id: ids.gigIds[0],
      type: 'email',
      content: 'Test message',
      status: 'sent'
    };

    const messageResponse = await axios.post(`${API_URL}/messages`, messageData);
    ids.messageIds.push(messageResponse.data.id);
    logger.info('✅ Message created:', { id: messageResponse.data.id });

    // Add more test messages
    const chatMessage = await axios.post(`${API_URL}/messages`, {
      ...messageData,
      type: 'chat',
      content: 'Test chat message'
    });
    ids.messageIds.push(chatMessage.data.id);

    logger.info('\n✅ All tests completed successfully!');

  } catch (error) {
    if (axios.isAxiosError(error)) {
      logger.error('❌ Test failed:', {
        endpoint: error.config?.url,
        method: error.config?.method,
        status: error.response?.status,
        error: error.response?.data
      });
    } else {
      logger.error('❌ Test failed:', error);
    }
    throw error; // Re-throw to ensure cleanup runs
  } finally {
    // Always run cleanup
    await cleanup();
  }
}

// Set up process handlers to ensure cleanup runs even on unexpected termination
process.on('SIGINT', async () => {
  logger.info('Process interrupted');
  await cleanup();
  process.exit(1);
});

process.on('uncaughtException', async (error) => {
  logger.error('Uncaught exception:', error);
  await cleanup();
  process.exit(1);
});

process.on('unhandledRejection', async (error) => {
  logger.error('Unhandled rejection:', error);
  await cleanup();
  process.exit(1);
});

// Run the tests
testAllEndpoints()
  .then(() => {
    logger.info('Test script completed');
    process.exit(0);
  })
  .catch((error) => {
    logger.error('Test script failed:', error);
    process.exit(1);
  });