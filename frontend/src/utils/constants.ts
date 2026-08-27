import type { Priority, TaskStatus, Region } from '../types';

export const REGIONS: Region[] = [
  { id: 'ap-south-1', name: 'Asia Pacific (Mumbai 🇮🇳)', flag: '🇮🇳', status: 'Healthy', ping: '18ms' },
  { id: 'eu-central-1', name: 'Europe (Frankfurt 🇩🇪)', flag: '🇩🇪', status: 'Healthy', ping: '92ms' },
  { id: 'us-east-1', name: 'US East (N. Virginia 🇺🇸)', flag: '🇺🇸', status: 'Healthy', ping: '135ms' },
  { id: 'ap-northeast-1', name: 'AP Northeast (Tokyo 🇯🇵)', flag: '🇯🇵', status: 'Healthy', ping: '148ms' },
];

export const STATUS_COLORS: Record<TaskStatus, { bg: string; text: string; border: string }> = {
  PENDING: { bg: 'bg-amber-500/10', text: 'text-amber-300', border: 'border-amber-500/30' },
  IN_PROGRESS: { bg: 'bg-[#4A7FA7]/20', text: 'text-[#B3CFE5]', border: 'border-[#4A7FA7]/40' },
  COMPLETED: { bg: 'bg-emerald-500/10', text: 'text-emerald-300', border: 'border-emerald-500/30' },
  CANCELLED: { bg: 'bg-rose-500/10', text: 'text-rose-300', border: 'border-rose-500/30' },
};

export const PRIORITY_COLORS: Record<Priority, { bg: string; text: string; badge: string }> = {
  LOW: { bg: 'bg-[#1A3D63]', text: 'text-[#B3CFE5]', badge: 'bg-[#1A3D63]' },
  MEDIUM: { bg: 'bg-[#4A7FA7]/20', text: 'text-[#B3CFE5]', badge: 'bg-[#4A7FA7]/40' },
  HIGH: { bg: 'bg-amber-500/20', text: 'text-amber-300', badge: 'bg-amber-700/50' },
  URGENT: { bg: 'bg-rose-500/20', text: 'text-rose-300', badge: 'bg-rose-700/50' },
};
