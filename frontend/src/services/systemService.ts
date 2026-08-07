import { api } from '../api';
import type { ApiResponse, SystemStatus } from '../types';

export const systemService = {
  async getSystemStatus(): Promise<{ data: SystemStatus; latencyMs: number }> {
    const startTime = performance.now();
    try {
      const response = await api.get<ApiResponse<SystemStatus>>('/system/status');
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
          region: 'ap-south-1 (Mumbai)',
          version: 'v0.0.1-SNAPSHOT',
          status: 'OFFLINE',
          timestamp: Date.now(),
          responseTimeMs: latencyMs,
        },
        latencyMs,
      };
    }
  },
};
