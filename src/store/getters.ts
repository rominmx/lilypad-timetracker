import { GetterTree } from 'vuex';
import { State, GetterType } from '@/models/types';

export type Getters = {
  [GetterType.TOTAL_TIME](state: State): number;
}

const getters: GetterTree<State, State> & Getters = {
  [GetterType.TOTAL_TIME](state: State): number {
    return state.tasks
      .map((task) => task.totalTime)
      .reduce((prev: number, next: number): number => prev + next, 0);
  },
};

export default getters;
