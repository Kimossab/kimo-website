import axios, { AxiosResponse } from "axios";
import { ActionContext, ActionTree } from "vuex";
import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";
import { Mutations } from "./mutations";

// const API_URL = "http://192.168.1.67/";
const API_URL = "https://kimossab.com/";

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<KimoState, KimoState>, "commit">;

export interface Actions {
  [ActionTypes.GET_LUNA_PICTURES]({
    commit,
    state
  }: AugmentedActionContext): Promise<void>;

  [ActionTypes.SELECT_LUNA_PICTURE](
    { commit }: AugmentedActionContext,
    picture: number | null
  ): void;
}

export const actions: ActionTree<KimoState, KimoState> & Actions = {
  async [ActionTypes.GET_LUNA_PICTURES]({ state, commit }) {
    commit(MutationTypes.SET_LUNA_PICTURES_LOADING, true);

    if (state.lunaPictures.length === 0) {
      try {
        const pictures: AxiosResponse<APILunaList> = await axios.get(
          `${API_URL}luna/list`
        );
        if (pictures.status === 200 && pictures.data.status === 1) {
          const pictureList: LunaPictures[] = [];

          for (const name of pictures.data.data) {
            pictureList.push({
              original: `${API_URL}luna/image/${name}`,
              thumbnail: `${API_URL}luna/thumb/${name}`,
              name: name
            });
          }

          commit(MutationTypes.SET_LUNA_PICTURES, pictureList);
        }
      } catch (e) {
        console.error(e);
      }
    }

    commit(MutationTypes.SET_LUNA_PICTURES_LOADING, false);
  },

  [ActionTypes.SELECT_LUNA_PICTURE]({ commit }, picture: number | null) {
    commit(MutationTypes.SELECT_LUNA_PICTURE, picture);
  }
};
