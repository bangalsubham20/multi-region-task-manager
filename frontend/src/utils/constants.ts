import type { Priority, TaskStatus, Region } from '../types';

export const REGIONS: Region[] = [
  { id: 'us-east-1', name: 'US East (N. Virginia)', flag: '🇺🇸', status: 'Healthy', ping: '24ms' },
  { id: 'eu-west-1', name: 'EU West (Ireland)', flag: '🇪🇺', status: 'Healthy', ping: '85ms' },
  { id: 'ap-south-1', name: 'AP South (Mumbai)', flag: '🇮🇳', status: 'Healthy', ping: '110ms' },
  { id: 'ap-northeast-1', name: 'AP Northeast (Tokyo)', flag: '🇯🇵', status: 'Healthy', ping: '142ms' },
];

export const STATUS_COLORS: Record<TaskStatus, { bg: string; text: string; border: string }> = {
  PENDING: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30' },
  IN_PROGRESS: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30' },
  COMPLETED: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  CANCELLED: { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/30' },
};

export const PRIORITY_COLORS: Record<Priority, { bg: string; text: string; badge: string }> = {
  LOW: { bg: 'bg-slate-500/10', text: 'text-slate-400', badge: 'bg-slate-700' },
  MEDIUM: { bg: 'bg-indigo-500/10', text: 'text-indigo-400', badge: 'bg-indigo-700' },
  HIGH: { bg: 'bg-orange-500/10', text: 'text-orange-400', badge: 'bg-orange-700' },
  URGENT: { bg: 'bg-red-500/10', text: 'text-red-400', badge: 'bg-red-700' },
};
