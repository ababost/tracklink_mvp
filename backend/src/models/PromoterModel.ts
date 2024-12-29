// src/models/PromoterModel.ts
import { BaseModel } from './BaseModel';
import { Promoter } from './types';

export class PromoterModel extends BaseModel {
  constructor() {
    super('promoters');
  }

  async findByEmail(email: string): Promise<Promoter | undefined> {
    return this.db(this.tableName).where('email', email).first();
  }

  async findByCity(city: string): Promise<Promoter[]> {
    return this.db(this.tableName).where('city', city);
  }

  async getActiveVenues(promoterId: string) {
    const promoter = await this.findById(promoterId);
    return promoter?.venues || [];
  }
}
