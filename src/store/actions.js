import { DEFAULT_TASK_VALUES } from './constants';

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

  commit('addTasks', validatedTasks);
};

export default {
  addTask,
  addTasks,
};
