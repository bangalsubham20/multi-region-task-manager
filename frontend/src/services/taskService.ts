import { api } from '../api';
import type { Task, TaskRequest, SearchTaskParams, ApiResponse, PageResponse } from '../types';

export const taskService = {
  async searchTasks(params: SearchTaskParams = {}): Promise<ApiResponse<PageResponse<Task>>> {
    const response = await api.get<ApiResponse<PageResponse<Task>>>('/tasks/search', { params });
    return response.data;
  },

  async getTaskById(id: number): Promise<ApiResponse<Task>> {
    const response = await api.get<ApiResponse<Task>>(`/tasks/${id}`);
    return response.data;
  },

  async createTask(task: TaskRequest): Promise<ApiResponse<Task>> {
    const response = await api.post<ApiResponse<Task>>('/tasks', task);
    return response.data;
  },

  async updateTask(id: number, task: TaskRequest): Promise<ApiResponse<Task>> {
    const response = await api.put<ApiResponse<Task>>(`/tasks/${id}`, task);
    return response.data;
  },

  async deleteTask(id: number): Promise<ApiResponse<void>> {
    const response = await api.delete<ApiResponse<void>>(`/tasks/${id}`);
    return response.data;
  },
};
