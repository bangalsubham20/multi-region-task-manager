export interface SystemInfo {
  applicationName: string;
  version: string;
  activeRegion: string;
  environment: string;
  javaVersion: string;
  serverTime: string;
  uptime: number;
  health: string;
  responseTimeMs?: number;
}
