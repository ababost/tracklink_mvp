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

  async getThreadByGig(gigId: string) {
    const response = await apiClient.get(`/messages/gig/${gigId}`);
    return response.data;
  },

  async getArtistMessages(artistId: string) {
    const response = await apiClient.get(`/messages/artist/${artistId}`);
    return response.data;
  },

  async markAsRead(messageId: string) {
    const response = await apiClient.put(`/messages/${messageId}/read`);
    return response.data;
  }
};
