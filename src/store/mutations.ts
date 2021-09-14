import {
  KimoState,
  LunaPictures,
  MangaChapterData,
  MangaChapterInfo,
  MangaData
} from "@/types";
import { MutationTree } from "vuex";
import { MutationTypes } from "./mutation-types";

export type Mutations<S = KimoState> = {
  [MutationTypes.SET_DARK_MODE](state: S, active: boolean): void;
  [MutationTypes.SET_LUNA_PICTURES](state: S, data: LunaPictures[]): void;
  [MutationTypes.SET_LUNA_PICTURES_LOADING](state: S, data: boolean): void;
  [MutationTypes.SELECT_LUNA_PICTURE](state: S, data: number | null): void;
  [MutationTypes.SET_MANGA_DATA](state: S, data: MangaData[] | null): void;
  [MutationTypes.SET_MANGA_LOADING](state: S, active: boolean): void;
  [MutationTypes.SET_MANGA_SELECTED](
    state: S,
    data: MangaData & MangaChapterInfo
  ): void;
  [MutationTypes.SET_CHAPTER_SELECTED](
    state: S,
    chapter: MangaChapterData
  ): void;
  [MutationTypes.SET_PAGE_SELECTED](state: S, page: string): void;
  [MutationTypes.SET_PAGE_SELECTED_INDEX](state: S, page: number): void;
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
  },
  [MutationTypes.SET_MANGA_LOADING](state, active) {
    state.mangaLoading = active;
  },
  [MutationTypes.SET_MANGA_DATA](state, data) {
    state.allManga = data;
  },
  [MutationTypes.SET_MANGA_SELECTED](state, data) {
    state.selectedManga = data;
  },
  [MutationTypes.SET_CHAPTER_SELECTED](state, data) {
    state.selectedChapter = data;
  },
  [MutationTypes.SET_PAGE_SELECTED](state, data) {
    state.selectedPage = data;
  },
  [MutationTypes.SET_PAGE_SELECTED_INDEX](state, data) {
    state.selectedPageIndex = data;
  }
};
