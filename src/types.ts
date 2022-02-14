export interface LunaPicture {
  original: string;
  thumbnail: string;
  name: string;
}
export interface LunaState {
  pictures: LunaPicture[];
  selectedIndex: number | null;
  loading: boolean;
}

export interface APIReply<S> {
  status: number;
  data: S;
}

export type APILunaList = APIReply<string[]>;

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

export interface MangaState {
  list: MangaData[];
  manga: {
    index: number;
    data: MangaData & MangaChapterInfo;
  } | null;
  chapter: MangaChapterData | null;
  page: {
    index: number;
    url: string;
  } | null;
  loading: boolean;
}
