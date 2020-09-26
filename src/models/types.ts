export interface ITask {
  category: string | null;
  comment: string;
  id: number;
  priority: number;
  startTime: number | null;
  status: string;
  stopTime: number | null;
  title: string;
  totalTime: number;
}

export type RequiredTaskFields = 'id' | 'title';

export type State = {
  tasks: Array<ITask>
};

export enum MutationType {
  ADD_TASK = 'addTask',
  SET_TASKS = 'setTasks',
  DELETE_TASK = 'deleteTask',
  EDIT_TASK = 'editTask',
}

export enum GetterType {
  TOTAL_TIME = 'totalTime',
}
