import {
  APILunaList,
  APIReply,
  KimoState,
  LunaPictures,
  MangaChapterInfo,
  MangaData
} from "@/types";
import axios, { AxiosResponse } from "axios";
import { ActionContext, ActionTree } from "vuex";
import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";
import { Mutations } from "./mutations";

// const API_URL = 'https://192.168.1.68/';
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

  [ActionTypes.GET_MANGA_DATA]({
    commit,
    state
  }: AugmentedActionContext): Promise<void>;
  [ActionTypes.SELECT_MANGA](
    { commit, state }: AugmentedActionContext,
    folder: string
  ): Promise<void>;
  [ActionTypes.SELECT_CHAPTER](
    { commit, dispatch, state }: AugmentedActionContext,
    chapter: number
  ): void;
  [ActionTypes.PREVIOUS_PAGE]({ commit, state }: AugmentedActionContext): void;
  [ActionTypes.NEXT_PAGE]({ commit, state }: AugmentedActionContext): void;
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
  },

  async [ActionTypes.GET_MANGA_DATA]({ state, commit }) {
    commit(MutationTypes.SET_MANGA_LOADING, true);

    if (state.lunaPictures.length === 0) {
      try {
        console.log(`${API_URL}api-manga/`);
        const manga: AxiosResponse<APIReply<MangaData[]>> = await axios.get(
          `${API_URL}api-manga/`
        );
        if (manga.status === 200 && manga.data.status === 1) {
          commit(
            MutationTypes.SET_MANGA_DATA,
            manga.data.data.map(m => ({
              ...m,
              thumbnail: `${API_URL}api-manga/${m.folder}/thumb`
            }))
          );
        }
      } catch (e) {
        console.error(e);
      }
    }

    commit(MutationTypes.SET_MANGA_LOADING, false);
  },

  async [ActionTypes.SELECT_MANGA]({ state, commit }, folder) {
    commit(MutationTypes.SET_MANGA_LOADING, true);

    try {
      const manga: AxiosResponse<APIReply<
        MangaData & MangaChapterInfo
      >> = await axios.get(`${API_URL}api-manga/${folder}`);
      if (manga.status === 200 && manga.data.status === 1) {
        console.log(manga.data.data, {
          ...manga.data.data,
          chapters: manga.data.data.chapters.map(c => ({
            ...c,
            pages: c.pages.map(
              p => `${API_URL}api-manga/${folder}/${c.number}/${p}`
            )
          }))
        });
        commit(MutationTypes.SET_MANGA_SELECTED, {
          ...manga.data.data,
          chapters: manga.data.data.chapters.map(c => ({
            ...c,
            pages: c.pages.map(
              p => `${API_URL}api-manga/${folder}/${c.number}/${p}`
            )
          }))
        });
      }
    } catch (e) {
      console.error(e);
    }

    commit(MutationTypes.SET_MANGA_LOADING, false);
  },

  [ActionTypes.SELECT_CHAPTER]({ commit, dispatch, state }, chapter: number) {
    const chapterData = state.selectedManga?.chapters.find(
      c => c.number === chapter
    );
    if (chapterData) {
      commit(MutationTypes.SET_CHAPTER_SELECTED, chapterData);
      commit(MutationTypes.SET_PAGE_SELECTED, chapterData.pages[0]);
      commit(MutationTypes.SET_PAGE_SELECTED_INDEX, 0);
    }
  },

  [ActionTypes.NEXT_PAGE]({ commit, state }) {
    const index = state.selectedPageIndex + 1;
    const pages = state.selectedChapter?.pages;

    if (pages && pages[index]) {
      commit(MutationTypes.SET_PAGE_SELECTED, pages[index]);
      commit(MutationTypes.SET_PAGE_SELECTED_INDEX, index);
    }
  },

  [ActionTypes.PREVIOUS_PAGE]({ commit, state }) {
    const index = state.selectedPageIndex - 1;
    const pages = state.selectedChapter?.pages;

    if (pages && pages[index]) {
      commit(MutationTypes.SET_PAGE_SELECTED, pages[index]);
      commit(MutationTypes.SET_PAGE_SELECTED_INDEX, index);
    }
  }
};
