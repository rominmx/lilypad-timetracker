import { DEFAULT_TASK_VALUES, RUNNING, PAUSED } from './constants';

const addTask = ({ commit }, { title, priority }) => {
  const id = new Date().getTime();

  commit('addTask', {
    ...DEFAULT_TASK_VALUES,
    id,
    title,
    priority,
  });
};

// Validates & adds tasks to the store
const addTasks = ({ commit }, tasks) => {
  const validatedTasks = tasks
    .filter((task) => {
      const { id, title } = task;

      if (typeof id !== 'number') return false;
      if (typeof title !== 'string' || title === '') return false;

      return true;
    })
    .map((task) => ({
      ...DEFAULT_TASK_VALUES,
      ...task,
    }));

  commit('setTasks', validatedTasks);
};

const startTask = ({ commit }, { id, startTime }) => {
  commit('editTask', {
    id,
    startTime,
    status: RUNNING,
  });
};

const stopTask = ({ commit, state }, { id, stopTime }) => {
  const task = state.tasks.find((items) => items.id === id);
  const totalTime = task.totalTime + stopTime - task.startTime;

  commit('editTask', {
    id,
    stopTime,
    status: PAUSED,
    totalTime,
  });
};

export default {
  addTask,
  addTasks,
  startTask,
  stopTask,
};
