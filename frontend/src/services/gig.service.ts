import apiClient from '../lib/api-client';
import { Gig } from '../types/gig';

export const gigService = {
  async create(data: Partial<Gig>) {
    const response = await apiClient.post('/gigs', data);
    return response.data;
  },

  async getAll() {
    const response = await apiClient.get('/gigs');
    return response.data;
  },

  async getById(id: string) {
    const response = await apiClient.get(`/gigs/${id}`);
    return response.data;
  },

  async update(id: string, data: Partial<Gig>) {
    const response = await apiClient.put(`/gigs/${id}`, data);
    return response.data;
  },

  async delete(id: string) {
    const response = await apiClient.delete(`/gigs/${id}`);
    return response.data;
  }
};