import apiClient from '../lib/api-client';
import { Artist } from '../types/artist';

export const artistService = {
  async create(data: Partial<Artist>) {
    const response = await apiClient.post('/artists', data);
    return response.data;
  },

  async getAll() {
    const response = await apiClient.get('/artists');
    return response.data;
  },

  async getById(id: string) {
    const response = await apiClient.get(`/artists/${id}`);
    return response.data;
  },

  async update(id: string, data: Partial<Artist>) {
    const response = await apiClient.put(`/artists/${id}`, data);
    return response.data;
  },

  async delete(id: string) {
    const response = await apiClient.delete(`/artists/${id}`);
    return response.data;
  },

  async getGigs(id: string) {
    const response = await apiClient.get(`/artists/${id}/gigs`);
    return response.data;
  },

  async updateAvailability(id: string, availability: any) {
    const response = await apiClient.put(`/artists/${id}/availability`, availability);
    return response.data;
  }
};