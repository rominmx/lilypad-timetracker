import { PAUSED } from './constants';

const addTask = ({ commit }, title) => {
  const id = new Date().getTime();

  commit('addTask', {
    id,
    title,
    status: PAUSED,
    comment: '',
    stopTime: null,
  });
};

export default {
  addTask,
};
