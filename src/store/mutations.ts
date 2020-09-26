import { MutationTree } from 'vuex';
import { State, ITask, MutationType } from '@/models/types';

export type Mutations<S = State> = {
  [MutationType.ADD_TASK]: (state: S, payload: ITask) => void;
  [MutationType.SET_TASKS]: (state: S, payload: Array<ITask>) => void;
  [MutationType.DELETE_TASK]: (state: S, payload: number) => void;
  [MutationType.EDIT_TASK]: (state: S, payload: ITask) => void;
}

const mutations: MutationTree<State> & Mutations = {
  [MutationType.ADD_TASK](state: State, task: ITask) {
    state.tasks.push(task);
  },
  [MutationType.SET_TASKS](state: State, tasks: Array<ITask>) {
    state.tasks = [...tasks];
  },
  [MutationType.DELETE_TASK](state: State, id: number) {
    state.tasks = state.tasks.filter((task) => task.id !== id);
  },
  [MutationType.EDIT_TASK](state: State, task: ITask) {
    state.tasks = state.tasks.map((item) => {
      if (item.id !== task.id) return item;

      return {
        ...item,
        ...task,
      };
    });
  },
};

export default mutations;
