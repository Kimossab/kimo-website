import { MutationTree } from "vuex";
import { MutationTypes } from "./mutation-types";

export type Mutations<S = KimoState> = {
  [MutationTypes.SET_DARK_MODE](state: S, active: boolean): void;
  [MutationTypes.SET_LUNA_PICTURES](state: S, data: LunaPictures[]): void;
  [MutationTypes.SET_LUNA_PICTURES_LOADING](state: S, data: boolean): void;
  [MutationTypes.SELECT_LUNA_PICTURE](state: S, data: number | null): void;
};

export const mutations: MutationTree<KimoState> & Mutations = {
  [MutationTypes.SET_DARK_MODE](state, active) {
    state.darkMode = active;
  },
  [MutationTypes.SET_LUNA_PICTURES](state, data) {
    state.lunaPictures = data;
  },
  [MutationTypes.SET_LUNA_PICTURES_LOADING](state, data) {
    state.lunaLoading = data;
  },
  [MutationTypes.SELECT_LUNA_PICTURE](state, data) {
    state.lunaSelected = data;
  }
};
