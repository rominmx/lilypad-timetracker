const totalTime = (state) =>
  // eslint-disable-next-line
  state.tasks.map((task) => task.totalTime).reduce((prev, next) => prev + next, 0);
export default {
  totalTime,
};
