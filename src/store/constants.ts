import { ITask, RequiredTaskFields } from '@/models/types';

export const PAUSED = 'paused';
export const STOPPED = 'stopped';
export const RUNNING = 'running';
export const DEFAULT_PRIORITY = 1;
export const PRIORITIES_MAP = new Map([
  [0, 'low'],
  [1, 'medium'],
  [2, 'high'],
]);

export const DEFAULT_TASK_VALUES: Omit<ITask, RequiredTaskFields> = {
  category: null,
  comment: '',
  priority: DEFAULT_PRIORITY,
  startTime: null,
  status: PAUSED,
  stopTime: null,
  totalTime: 0,
};
