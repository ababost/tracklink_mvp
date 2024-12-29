
// src/models/MessageModel.ts
import { BaseModel } from './BaseModel';
import { Message } from './types';

export class MessageModel extends BaseModel {
  constructor() {
    super('messages');
  }

  async findByGig(gigId: string): Promise<Message[]> {
    return this.db(this.tableName)
      .where('gig_id', gigId)
      .orderBy('created_at', 'asc');
  }

  async createEmailMessage(gigId: string, content: string, status = 'sent') {
    return this.create({
      gig_id: gigId,
      type: 'email',
      content,
      status,
      created_at: new Date()
    });
  }

  async createChatMessage(gigId: string, content: string) {
    return this.create({
      gig_id: gigId,
      type: 'chat',
      content,
      status: 'delivered',
      created_at: new Date()
    });
  }

  async getMessageThread(gigId: string) {
    return this.db(this.tableName)
      .select(
        'messages.*',
        'gigs.artist_id',
        'gigs.promoter_id'
      )
      .leftJoin('gigs', 'messages.gig_id', 'gigs.id')
      .where('messages.gig_id', gigId)
      .orderBy('messages.created_at', 'asc');
  }

  async getArtistMessages(artistId: string): Promise<Message[]> {
    const messages = await this.db('messages')
      .select(
        'messages.*',
        'gigs.venue',
        'gigs.date as gig_date',
        'promoters.name as promoter_name'
      )
      .join('gigs', 'messages.gig_id', 'gigs.id')
      .leftJoin('promoters', 'gigs.promoter_id', 'promoters.id')
      .where('gigs.artist_id', artistId)
      .orderBy('messages.created_at', 'desc');

    // Ensure dates are properly converted
    return messages.map(message => ({
      ...message,
      created_at: new Date(message.created_at),
      updated_at: new Date(message.updated_at),
      gig_date: message.gig_date ? new Date(message.gig_date) : undefined
    }));
  }
}