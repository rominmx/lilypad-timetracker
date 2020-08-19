const addTask = (state, task) => {
  state.tasks.push(task);
};

const addTasks = (state, tasks) => {
  state.tasks = [...tasks];
};

const deleteTask = (state, id) => {
  state.tasks = state.tasks.filter((task) => task.id !== id);
};

const editTask = (state, task) => {
  state.tasks = state.tasks.filter((item) => {
    if (item.id !== task.id) return item;

    return {
      ...item,
      ...task,
      id: task.id,
    };
  });
};

export default {
  addTask,
  addTasks,
  deleteTask,
  editTask,
};
