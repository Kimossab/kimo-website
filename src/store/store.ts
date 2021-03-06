import {
  CommitOptions,
  createStore,
  DispatchOptions,
  Store as VuexStore
} from "vuex";
import { Mutations, mutations } from "./mutations";
import { Actions, actions } from "./actions";

export const store = createStore<KimoState>({
  state: {
    darkMode: true,
    lunaPictures: [],
    lunaSelected: null,
    lunaLoading: false
  },
  mutations,
  actions
});

export type Store = Omit<VuexStore<KimoState>, "commit" | "dispatch"> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
};
