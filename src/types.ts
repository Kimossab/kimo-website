export type Nullable<T> = T | null | undefined;

export interface LunaPictures {
  original: string;
  thumbnail: string;
  name: string;
}

export interface KimoState {
  darkMode: boolean;
  lunaPictures: LunaPictures[];
  lunaSelected: number | null;
  lunaLoading: boolean;
  mangaLoading: boolean;
  allManga: Nullable<MangaData[]>;
  selectedManga: Nullable<MangaData & MangaChapterInfo>;
  selectedChapter: Nullable<MangaChapterData>;
  selectedPage: Nullable<string>;
  selectedPageIndex: number;
}

export interface APIReply<S> {
  status: number;
  data: S;
}

export interface MangaData {
  name: {
    en: string;
    jp: string;
  };
  image: string;
  mal: number;
  folder: string;
  description: string;
  thumbnail: string;
}

export interface MangaChapterData {
  number: number;
  pages: string[];
}

export interface MangaChapterInfo {
  chapters: MangaChapterData[];
}
export type APILunaList = APIReply<string[]>;
