// src/models/BaseModel.ts
import { Knex } from 'knex';
import knexConfig from '../../knexfile';
import knexInit from 'knex';

export class BaseModel {
  protected db: Knex;
  protected tableName: string;

  constructor(tableName: string) {
    this.db = knexInit(knexConfig.development);
    this.tableName = tableName;
  }

  async findById(id: string) {
    return this.db(this.tableName).where('id', id).first();
  }

  async findAll(filters = {}) {
    return this.db(this.tableName).where(filters);
  }

  async create(data: Record<string, any>) {
    const [result] = await this.db(this.tableName)
      .insert(data)
      .returning('*');
    return result;
  }

  async update(id: string, data: Record<string, any>) {
    const [result] = await this.db(this.tableName)
      .where('id', id)
      .update(data)
      .returning('*');
    return result;
  }

  async delete(id: string) {
    return this.db(this.tableName).where('id', id).delete();
  }
}