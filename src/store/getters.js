const totalTime = (state) => state.tasks.reduce((prev, next) => prev.totalTime + next.totalTime);

export default {
  totalTime,
};
