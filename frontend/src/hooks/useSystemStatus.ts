import { useState, useEffect, useCallback } from 'react';
import { systemService } from '../services/systemService';
import type { SystemInfo } from '../types';

export function useSystemInfo(pollIntervalMs = 15000) {
  const [systemInfo, setSystemInfo] = useState<SystemInfo>({
    applicationName: 'Multi Region Task Manager',
    version: '0.0.1-SNAPSHOT',
    activeRegion: 'ap-south-1',
    environment: 'dev',
    javaVersion: '21',
    serverTime: new Date().toISOString(),
    uptime: 0,
    health: 'UP',
    responseTimeMs: 18,
  });
  const [loading, setLoading] = useState<boolean>(true);

  const fetchInfo = useCallback(async () => {
    try {
      const res = await systemService.getSystemInfo();
      setSystemInfo(res.data);
    } catch {
      // Handled in service fallback
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInfo();
    const timer = setInterval(fetchInfo, pollIntervalMs);
    return () => clearInterval(timer);
  }, [fetchInfo, pollIntervalMs]);

  return {
    systemInfo,
    loading,
    refreshInfo: fetchInfo,
  };
}
