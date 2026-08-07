export interface SystemInfo {
  applicationName: string;
  version: string;
  artifact?: string;
  group?: string;
  buildTime?: string;
  activeRegion: string;
  environment: string;
  javaVersion: string;
  serverTime: string;
  uptime: number;
  health: string;
  responseTimeMs?: number;
}

export interface TaskMetrics {
  totalTasks: number;
  completed: number;
  todo: number;
  inProgress: number;
  highPriority: number;
  lowPriority: number;
}
