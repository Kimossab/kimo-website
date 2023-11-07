import type { TournamentPlayer } from "@/types";

enum AnimeType {
  Movie = "movie",
  Ona = "ONA",
  Tv = "TV",
}

export enum TournamentStatus {
  Open = "open",
  OnGoing = "on-going",
  Finished = "finished",
}

export interface TournamentSong {
  name: string;
  artist: string;
  anime: Anime;
  difficulty: number;
  type: SongType;
  typeNumber: number;
}

export interface GraphData {
  labels: string[];
  data: number[];
}

export interface Anime {
  anilistId: string;
  english: string;
  romaji: string;
  tags: string[];
  genre: string[];
  season: string;
  score: number;
  type: AnimeType[];
  picture: string;
  banner: string;
}

export enum SongType {
  OPENING = 1,
  ENDING = 2,
}

export interface Song {
  _id: string;
  name: string;
  artist: string;
  anime: string;
  difficulty: number;
  players: string[];
  type: SongType;
  typeNumber: number;
  themeLink: string | undefined;
}

export interface MatchSong {
  _id?: string;
  song: string;
  videoLength: number;
  startPoint: number;
  correctAnswers: string[];
}

export interface GroupMatch {
  player1: string;
  player2: string;
  p1Points: number;
  p2Points: number;
  songList: MatchSong[];
  _id: string;
}

export interface Group {
  players: string[];
  matches: GroupMatch[];
  _id: string;
}

export interface Phase {
  order: number;
  groups: Group[];
}

export interface ITournament {
  _id: string;
  players: TournamentPlayer[];
  animes: Anime[];
  songs: Song[];
  phases: Phase[];
  name: string;
  hasBegun: boolean;
  creator: string;
  status: TournamentStatus;
  serverId: string | null;
  public: boolean;
}

export interface StatsDataFormat {
  key: string;
  title: string;
  subtitle?: string;
  tooltip?: string;
}

export interface PlayerStats {
  name: string;
  matches: number;
  totalMusics: number;
  wins: number;
  totalPoints: number;
  musicsFromPlaylist: number;
  averageMusicDifficulty: number;
  guessesFromOtherPlaylists: number;
}

export interface CreateMatchInput {
  players: [{ id: string; points: number }, { id: string; points: number }];
  songList: MatchSong[];
}
