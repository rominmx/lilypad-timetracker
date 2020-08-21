export const PAUSED = 'paused';
export const STOPPED = 'stopped';
export const RUNNING = 'running';
export const DEFAULT_PRIORITY = 1;
export const PRIORITIES_MAP = new Map([
  [0, 'low'],
  [1, 'medium'],
  [2, 'high'],
]);
export const DEFAULT_TASK_VALUES = {
  status: PAUSED,
  comment: '',
  startTime: null,
  stopTime: null,
  totalTime: 0,
  category: null,
  priority: DEFAULT_PRIORITY,
};
