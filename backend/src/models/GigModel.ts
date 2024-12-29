
// src/models/GigModel.ts
import { BaseModel } from './BaseModel';
import { Gig } from './types';

export class GigModel extends BaseModel {
  constructor() {
    super('gigs');
  }

  async findUpcoming(artistId: string): Promise<Gig[]> {
    return this.db(this.tableName)
      .where('artist_id', artistId)
      .where('date', '>', new Date())
      .where('status', '!=', 'cancelled')
      .orderBy('date', 'asc');
  }

  async findPast(artistId: string): Promise<Gig[]> {
    return this.db(this.tableName)
      .where('artist_id', artistId)
      .where('date', '<', new Date())
      .orderBy('date', 'desc');
  }

  async updateStatus(gigId: string, status: Gig['status']) {
    return this.update(gigId, { 
      status,
      updated_at: new Date()
    });
  }

  async getGigWithDetails(gigId: string) {
    return this.db(this.tableName)
      .select(
        'gigs.*',
        'artists.name as artist_name',
        'promoters.name as promoter_name',
        'promoters.email as promoter_email'
      )
      .leftJoin('artists', 'gigs.artist_id', 'artists.id')
      .leftJoin('promoters', 'gigs.promoter_id', 'promoters.id')
      .where('gigs.id', gigId)
      .first();
  }
}
