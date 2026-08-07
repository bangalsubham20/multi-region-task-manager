import { api } from '../api';
import type { ApiResponse, SystemInfo, TaskMetrics } from '../types';

export const systemService = {
  async getSystemInfo(): Promise<{ data: SystemInfo; latencyMs: number }> {
    const startTime = performance.now();
    try {
      const response = await api.get<ApiResponse<SystemInfo>>('/system/info');
      const endTime = performance.now();
      const latencyMs = Math.round(endTime - startTime);

      return {
        data: {
          ...response.data.data,
          responseTimeMs: latencyMs,
        },
        latencyMs,
      };
    } catch {
      const endTime = performance.now();
      const latencyMs = Math.round(endTime - startTime);
      return {
        data: {
          applicationName: 'Multi Region Task Manager',
          version: '0.0.1-SNAPSHOT',
          activeRegion: 'ap-south-1',
          environment: 'dev',
          javaVersion: '21',
          serverTime: new Date().toISOString(),
          uptime: 0,
          health: 'OFFLINE',
          responseTimeMs: latencyMs,
        },
        latencyMs,
      };
    }
  },

  async getTaskMetrics(): Promise<TaskMetrics> {
    try {
      const response = await api.get<ApiResponse<TaskMetrics>>('/system/metrics');
      return response.data.data;
    } catch {
      return {
        totalTasks: 0,
        completed: 0,
        todo: 0,
        inProgress: 0,
        highPriority: 0,
        lowPriority: 0,
      };
    }
  },
};
