// src/models/ArtistModel.ts
import { BaseModel } from './BaseModel';
import { Artist } from './types';

export class ArtistModel extends BaseModel {
  constructor() {
    super('artists');
  }

  async findByEmail(email: string): Promise<Artist | undefined> {
    return this.db(this.tableName).where('email', email).first();
  }

  async updateAvailability(id: string, availability: Record<string, any>) {
    return this.update(id, { availability });
  }

  async getUpcomingGigs(artistId: string) {
    return this.db('gigs')
      .where('artist_id', artistId)
      .where('date', '>', new Date())
      .orderBy('date', 'asc');
  }
}