import { State } from '@/models/types';

const totalTime = (state: State): number =>
  // eslint-disable-next-line
  state.tasks
    .map((task) => task.totalTime)
    .reduce((prev: number, next: number): number => prev + next, 0);

export type Getters = {
  totalTime(state: State): number;
}

const getters: Getters = {
  totalTime,
};

export default getters;
