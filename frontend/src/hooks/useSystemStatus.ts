import { useState, useEffect, useCallback } from 'react';
import { systemService } from '../services/systemService';
import type { SystemStatus } from '../types';

export function useSystemStatus(pollIntervalMs = 15000) {
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    region: 'ap-south-1 (Mumbai)',
    version: 'v0.0.1-SNAPSHOT',
    status: 'HEALTHY',
    timestamp: Date.now(),
    responseTimeMs: 24,
  });
  const [loading, setLoading] = useState<boolean>(true);

  const fetchStatus = useCallback(async () => {
    try {
      const res = await systemService.getSystemStatus();
      setSystemStatus(res.data);
    } catch {
      // Fallback state handled in service
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStatus();
    const timer = setInterval(fetchStatus, pollIntervalMs);
    return () => clearInterval(timer);
  }, [fetchStatus, pollIntervalMs]);

  return {
    systemStatus,
    loading,
    refreshStatus: fetchStatus,
  };
}
