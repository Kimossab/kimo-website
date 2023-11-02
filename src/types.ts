import type { OAuth2Token } from "@badgateway/oauth2-client";

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
export interface PlaylistAnime {
  anilistId: string;
  nameEn: string;
  nameRom: string;
  picture: string;
  banner: string;
}
export interface Playlist {
  _id?: string;
  name: string;
  animeList: PlaylistAnime[];
}
export interface DiscordState {
  codeVerifier: string | null;
  token: OAuth2Token | null;
  isLoading: boolean;
  user: {
    id: string;
    username: string;
    global_name: string | null;
    avatar: string | null;
  } | null;
  playerData: {
    username: string;
    discordId: string;
    playlists: Playlist[];
    tournaments: {
      id: string;
      name: string;
    }[];
  } | null;
  savedPlayerData: string | null;
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

export enum ButtonVariants {
  Normal = "normal",
  Small = "small",
}
