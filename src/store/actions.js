import { PAUSED } from './constants';

const addTask = ({ commit }, { title, priority }) => {
  const id = new Date().getTime();

  commit('addTask', {
    id,
    title,
    priority,
    status: PAUSED,
    comment: '',
    stopTime: null,
    category: null,
  });
};

export default {
  addTask,
};
