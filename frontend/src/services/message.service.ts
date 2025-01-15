import apiClient from '../lib/api-client';
import { Message } from '../types/message';

export const messageService = {
  async create(data: Partial<Message>) {
    const response = await apiClient.post('/messages', data);
    return response.data;
  },

  async getAll() {
    const response = await apiClient.get('/messages');
    return response.data;
  },

  async getById(id: string) {
    const response = await apiClient.get(`/messages/${id}`);
    return response.data;
  },

  async update(id: string, data: Partial<Message>) {
    const response = await apiClient.put(`/messages/${id}`, data);
    return response.data;
  },

  async delete(id: string) {
    const response = await apiClient.delete(`/messages/${id}`);
    return response.data;
  }
};