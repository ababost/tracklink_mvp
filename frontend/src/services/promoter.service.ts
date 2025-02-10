import apiClient from '../lib/api-client';
import { Promoter } from '../types/promoter';

export const promoterService = {
  async create(data: Partial<Promoter>) {
    const response = await apiClient.post('/promoters', data);
    return response.data;
  },

  async getAll() {
    const response = await apiClient.get('/promoters');
    return response.data;
  },

  async getById(id: string) {
    const response = await apiClient.get(`/promoters/${id}`);
    return response.data;
  },

  async update(id: string, data: Partial<Promoter>) {
    const response = await apiClient.put(`/promoters/${id}`, data);
    return response.data;
  },

  async delete(id: string) {
    const response = await apiClient.delete(`/promoters/${id}`);
    return response.data;
  }
};