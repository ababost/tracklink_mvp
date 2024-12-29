// src/utils/testModels.ts
import { ArtistModel } from '../models/ArtistModel';
import { PromoterModel } from '../models/PromoterModel';
import { GigModel } from '../models/GigModel';
import { MessageModel } from '../models/MessageModel';

async function testAllModels() {
  try {
    // Initialize models
    const artistModel = new ArtistModel();
    const promoterModel = new PromoterModel();
    const gigModel = new GigModel();
    const messageModel = new MessageModel();

    console.log('Testing all models...\n');

    // Create test artist
    const artist = await artistModel.create({
      name: 'Test DJ1',
      email: 'testdj4@example1.com',
      bio: 'Test bio1'
    });
    console.log('✅ Created artist:', artist);

    // Create test promoter
    const promoter = await promoterModel.create({
      name: 'Test Promoter',
      email: 'promote2@example1.com',
      city: 'New York',
      venues: {list: ['Venue A', 'Venue B']}
    });
    console.log('✅ Created promoter:', promoter);

    // Create test gig
    const gig = await gigModel.create({
      artist_id: artist.id,
      promoter_id: promoter.id,
      venue: 'Venue A',
      date: new Date('2024-12-31'),
      status: 'pending',
      fee: 1000
    });
    console.log('✅ Created gig:', gig);

    // Create test messages
    const email = await messageModel.createEmailMessage(
      gig.id,
      'Hello, would you be available for a gig?'
    );
    console.log('✅ Created email message:', email);

    const chat = await messageModel.createChatMessage(
      gig.id,
      'Sure, I\'m interested!'
    );
    console.log('✅ Created chat message:', chat);

    // Test relationships
    const gigWithDetails = await gigModel.getGigWithDetails(gig.id);
    console.log('✅ Gig with details:', gigWithDetails);

    const messageThread = await messageModel.getMessageThread(gig.id);
    console.log('✅ Message thread:', messageThread);

    // Clean up
    await messageModel.delete(email.id);
    await messageModel.delete(chat.id);
    await gigModel.delete(gig.id);
    await promoterModel.delete(promoter.id);
    await artistModel.delete(artist.id);
    console.log('\n✅ Cleanup completed');

  } catch (error) {
    console.error('❌ Model test failed:', error);
  }
}

testAllModels()
  .then(() => console.log('\nAll model testing completed'))
  .catch(console.error);