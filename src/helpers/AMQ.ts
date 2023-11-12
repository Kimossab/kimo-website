import type { TournamentPlayer } from "@/types";
import type { TableObject } from "./common";

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
export interface TournamentPlayerStats extends TableObject {
  player: string;
  matches: number;
  wins: number;
  draws: number;
  losses: number;
  correct: number;
  c_diff: number;
}

export const getPlayersMatchStats = (group: Group, tournament: ITournament) => {
  const players = group.players.reduce<Record<string, TournamentPlayerStats>>(
    (acc, p) => {
      const player = tournament.players.find(
        (player) => player.discordId === p
      );

      return {
        ...acc,
        [p]: {
          id: player?.discordId || player?.name || p,
          player: player?.name || p,
          matches: 0,
          wins: 0,
          draws: 0,
          losses: 0,
          correct: 0,
          c_diff: 0,
        },
      };
    },
    {}
  );

  for (const match of group.matches) {
    players[match.player1].matches++;
    players[match.player2].matches++;

    if (match.p1Points > match.p2Points) {
      players[match.player1].wins++;
      players[match.player2].losses++;
    } else if (match.p1Points < match.p2Points) {
      players[match.player2].wins++;
      players[match.player1].losses++;
    } else {
      players[match.player2].draws++;
      players[match.player1].draws++;
    }

    players[match.player1].correct += match.p1Points;
    players[match.player2].correct += match.p2Points;

    players[match.player1].c_diff += match.p1Points - match.p2Points;
    players[match.player2].c_diff += match.p2Points - match.p1Points;
  }

  return players;
};

export const sortedPlayerData = (
  players: Record<string, TournamentPlayerStats>
): TournamentPlayerStats[] => {
  return Object.values(players).sort((a, b) => {
    let diff = 0;
    const orderedKey: (keyof typeof a)[] = [
      "c_diff",
      "correct",
      "losses",
      "draws",
      "wins",
    ];

    for (let index = 0; index < orderedKey.length; index++) {
      diff +=
        ((b[orderedKey[index]] as number) - (a[orderedKey[index]] as number)) *
        Math.pow(10, index + 1);
    }
    return diff;
  });
};
