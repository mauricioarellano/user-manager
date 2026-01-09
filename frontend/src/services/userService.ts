import api from './api';
import { User, UserFormData, PaginatedResponse } from '../types';

export const userService = {
  async getUsers(page: number = 1, perPage: number = 10, search: string = ''): Promise<PaginatedResponse<User>> {
    const response = await api.get('/users', {
      params: { page, per_page: perPage, search },
    });
    return response.data;
  },

  async getUser(id: number): Promise<User> {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  async createUser(data: UserFormData): Promise<User> {
    const response = await api.post('/users', data);
    return response.data.user;
  },

  async updateUser(id: number, data: Partial<UserFormData>): Promise<User> {
    const response = await api.put(`/users/${id}`, data);
    return response.data.user;
  },

  async deleteUser(id: number): Promise<void> {
    await api.delete(`/users/${id}`);
  },

  async exportToCsv(): Promise<Blob> {
    const response = await api.get('/users/export/csv', {
      responseType: 'blob',
    });
    return response.data;
  },
};

