enum AnimeType {
  Movie = "movie",
  Ona = "ONA",
  Tv = "TV",
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
  english: string;
  romaji: string;
  tags: string[];
  genre: string[];
  season: string;
  score: number;
  type: AnimeType;
}

export enum SongType {
  OPENING = 1,
  ENDING = 2
}

export interface Song {
  name: string;
  artist: string;
  anime: string;
  difficulty: number;
  players: string[];
  type: SongType;
  typeNumber: number;
}

export interface MatchSong {
  song: string;
  artist: string;
  videoLength: number;
  startPoint: number;
  correctAnswers: string[];
  videoUrl?: string;
  _id: string;
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
  players: string[];
  animes: Anime[];
  songs: Song[];
  phases: Phase[];
}

type UniqueCount<T> = [T, number][];

enum Seasons {
  Winter = "Winter",
  Spring = "Spring",
  Summer = "Summer",
  Fall = "Fall",
}

export interface StatsDataFormat {
  key: string;
  title: string;
  subtitle?: string;
  tooltip?: string;
}

const seasonDistribution = [
  Seasons.Winter,
  Seasons.Spring,
  Seasons.Summer,
  Seasons.Fall,
];

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

const getGraphData = <T>(
  data: UniqueCount<T>,
  getLabel: (_: T) => string
): GraphData => {
  return data.reduce<GraphData>(
    (acc, cur) => {
      return {
        labels: [...acc.labels, getLabel(cur[0])],
        data: [...acc.data, cur[1]],
      };
    },
    {
      labels: [],
      data: [],
    }
  );
};

const sortUniqueCount = (
  uniques: UniqueCount<unknown>,
  direction: "asc" | "desc" = "desc"
) => {
  uniques.sort((a, b) => (direction === "desc" ? b[1] - a[1] : a[1] - b[1]));
};

const getSongData = (tournament: ITournament) => {
  const anime = new Map<string, number>();
  const artist = new Map<string, number>();
  const songs = new Map<Song, number>();
  const tags = new Map<string, number>();
  const genres = new Map<string, number>();
  const season = new Map<string, number>();
  const types = new Map<string, number>();

  for (const song of tournament.songs) {
    const songAnime = tournament.animes.find((a) => a.romaji === song.anime);

    const animeC = (anime.get(song.anime) || 0) + 1;
    anime.set(song.anime, animeC);

    const artistC = (artist.get(song.artist) || 0) + 1;
    artist.set(song.artist, artistC);

    songs.set(song, song.players.length);

    for (const tag of songAnime?.tags || []) {
      tags.set(tag, (tags.get(tag) || 0) + 1);
    }
    for (const genre of songAnime?.genre || []) {
      genres.set(genre, (genres.get(genre) || 0) + 1);
    }

    const key = songAnime?.season || "Fall 1979";

    season.set(key, (season.get(key) || 0) + 1);

    const sType = song.type === SongType.ENDING ? 'ED' : 'OP'
    types.set(sType, (types.get(sType) || 0) + 1);
  }

  return { anime, artist, songs, tags, genres, season, types };
};

const sortSeasons = (uniques: UniqueCount<string>) => {
  uniques.sort((a, b) => {
    const [aSeason, aYear] = a[0].split(" ");
    const [bSeason, bYear] = b[0].split(" ");

    if (bYear > aYear) {
      return -1;
    }
    if (bYear < aYear) {
      return 1;
    }

    return (
      seasonDistribution.indexOf(aSeason as Seasons) -
      seasonDistribution.indexOf(bSeason as Seasons)
    );
  });
};

const fillSeasonList = (
  data: UniqueCount<StatsDataFormat>
): UniqueCount<string> => {
  const [season, year] = data[0][0].key.split(" ") as [Seasons, string];
  const [lSeason, lYear] = data[data.length - 1][0].key.split(" ") as [
    Seasons,
    string
  ];

  let curYear = Number(year);
  let curSeason = seasonDistribution.indexOf(season);
  const lastYear = Number(lYear);
  const lastSeason = seasonDistribution.indexOf(lSeason);

  const filledData: UniqueCount<string> = [];

  for (; curYear <= lastYear; curYear++) {
    for (; curSeason <= (curYear === lastYear ? lastSeason : 3); curSeason++) {
      const key = `${seasonDistribution[curSeason]} ${curYear}`;
      const foundSeason = data.find((d) => d[0].key === key);

      if (!foundSeason) {
        filledData.push([key, 0]);
      } else {
        filledData.push([foundSeason[0].key, foundSeason[1]]);
      }
    }
    curSeason = 0;
  }
  return filledData;
};

export const getStatsAndInfo = (tournament: ITournament) => {
  const { anime, artist, songs, tags, genres, season, types } =
    getSongData(tournament);

  const animeData: UniqueCount<StatsDataFormat> = Array.from(anime).map(
    ([anime, count]) => [{ key: anime, title: anime }, count]
  );
  sortUniqueCount(animeData);

  const artistData: UniqueCount<StatsDataFormat> = Array.from(artist).map(
    ([artist, count]) => [{ key: artist, title: artist }, count]
  );
  sortUniqueCount(artistData);

  const songTypeData: UniqueCount<StatsDataFormat> = Array.from(types).map(
    ([songType, count]) => [{ key: songType, title: songType }, count]
  );
  sortUniqueCount(songTypeData);

  const songData: UniqueCount<StatsDataFormat> = Array.from(songs).map(
    ([{ name, artist, anime, type }, count]) => [
      {
        key: `${name}-${artist}`,
        title: name,
        subtitle: artist,
        tooltip: anime,
        type
      },
      count,
    ]
  );
  sortUniqueCount(songData);

  const tagData: UniqueCount<StatsDataFormat> = Array.from(tags).map(
    ([tag, count]) => [{ key: tag, title: tag }, count]
  );
  sortUniqueCount(tagData);

  const genreData: UniqueCount<StatsDataFormat> = Array.from(genres).map(
    ([genre, count]) => [{ key: genre, title: genre }, count]
  );
  sortUniqueCount(genreData);

  const seasonArray = Array.from(season);
  sortSeasons(seasonArray);
  const seasonData: UniqueCount<StatsDataFormat> = seasonArray.map(
    ([season, count]) => [{ key: season, title: season }, count]
  );

  const playedSongs: UniqueCount<MatchSong> = [];

  for (const phase of tournament.phases) {
    for (const group of phase.groups) {
      for (const match of group.matches) {
        for (const song of match.songList) {
          const songIdx = playedSongs.findIndex(
            ([pSong]) =>
              song.song === pSong.song && song.artist === pSong.artist
          );
          if (songIdx > -1) {
            playedSongs[songIdx][1]++;
          } else {
            playedSongs.push([song, 1]);
          }
        }
      }
    }
  }
  const playedSongsData: UniqueCount<StatsDataFormat> = playedSongs.map(
    ([{ song, artist }, count]) => {
      const anime = Array.from(songs.keys()).find(
        (s) => s.name === song
      )?.anime;
      return [
        {
          key: `${song}-${artist}`,
          title: song,
          subtitle: artist,
          tooltip: anime,
        },
        count,
      ];
    }
  );
  sortUniqueCount(playedSongsData);

  const unplayedSongs: UniqueCount<StatsDataFormat> = [];

  for (const song of songs) {
    if (
      playedSongs.find(
        ([s]) => s.song === song[0].name && s.artist === song[0].artist
      )
    ) {
      continue;
    }

    unplayedSongs.push([
      {
        key: `${song[0].name}-${song[0].artist}`,
        title: song[0].name,
        subtitle: song[0].artist,
        tooltip: song[0].anime,
      },
      0,
    ]);
  }

  const animeGraph = getGraphData(animeData, (anime) => anime.key);
  const artistGraph = getGraphData(artistData, (artist) => artist.key);
  const tagGraph = getGraphData(tagData, (tag) => tag.key);
  const genreGraph = getGraphData(genreData, (genre) => genre.key);
  const songTypeGraph = getGraphData(songTypeData, (type) => type.key);

  const filledSeasonList = fillSeasonList(seasonData);
  const seasonGraph = getGraphData(filledSeasonList, (season) => season);
  const playedSongsGraph = getGraphData(playedSongsData, (song) => song.key);

  const averageDifficulty =
    Math.round(
      (tournament.songs.reduce((acc, song) => acc + song.difficulty, 0) /
        tournament.songs.length) *
      100
    ) / 100;
  const averageScore =
    Math.round(
      (tournament.songs.reduce((acc, song) => {
        const songAnime = tournament.animes.find(
          (a) => a.romaji === song.anime
        );

        return acc + (songAnime?.score || 0);
      }, 0) /
        tournament.songs.length) *
      100
    ) / 100;

  const shared = tournament.songs.filter((s) => s.players.length > 1).length;

  return {
    data: {
      anime: animeData,
      artist: artistData,
      song: songData,
      tag: tagData,
      genre: genreData,
      season: seasonData,
      playedSongs: playedSongsData,
      unplayedSongs: unplayedSongs,
      songTypes: songTypeData
    },
    graphs: {
      anime: animeGraph,
      artist: artistGraph,
      tag: tagGraph,
      genre: genreGraph,
      season: seasonGraph,
      playedSongs: playedSongsGraph,
      songTypes: songTypeGraph
    },
    meta: {
      averageDifficulty,
      averageScore,
      shared,
    },
  };
};

export const getGroupPlayers = (group: Group) => {
  interface GroupPlayerData {
    name: string;
    matches: number;
    wins: number;
    draws: number;
    losses: number;
    correctGuesses: number;
    guessDifference: number;
  }

  const playerData = group.players.reduce<Record<string, GroupPlayerData>>(
    (acc, player) => {
      acc[player] = {
        name: player,
        matches: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        correctGuesses: 0,
        guessDifference: 0,
      };
      return acc;
    },
    {}
  );

  for (const match of group.matches) {
    const p1 = playerData[match.player1];
    const p2 = playerData[match.player2];

    if (!p1 || !p2) {
      throw new Error("Unexpected no player");
    }

    p1.matches++;
    p2.matches++;

    if (match.p1Points > match.p2Points) {
      p1.wins++;
      p2.losses++;
    } else if (match.p1Points < match.p2Points) {
      p2.wins++;
      p1.losses++;
    } else {
      p1.draws++;
      p2.draws++;
    }

    p1.correctGuesses += match.p1Points;
    p2.correctGuesses += match.p2Points;

    p1.guessDifference += match.p1Points - match.p2Points;
    p2.guessDifference += match.p2Points - match.p1Points;

    playerData[match.player1] = p1;
    playerData[match.player2] = p2;
  }

  return Object.values(playerData).sort((a, b) => {
    if (a.matches !== b.matches) {
      return b.matches - a.matches;
    }
    if (a.wins !== b.wins) {
      return b.wins - a.wins;
    }
    if (a.draws !== b.draws) {
      return b.draws - a.draws;
    }
    if (a.losses !== b.losses) {
      return b.losses - a.losses;
    }
    if (a.correctGuesses !== b.correctGuesses) {
      return b.correctGuesses - a.correctGuesses;
    }
    return b.guessDifference - a.guessDifference;
  });
};

export const getPlayerStats = (tournament: ITournament): PlayerStats[] => {
  const winsByPlayer = tournament.phases.reduce<
    Record<string, Omit<PlayerStats, "name">>
  >((acc, phase) => {
    phase.groups.forEach((group) =>
      group.matches.forEach((match) => {
        const songsByPlaylist = match.songList.reduce<Record<string, number>>(
          (acc, song) => {
            const tSong = tournament.songs.find(
              (s) => s.artist === song.artist && s.name === song.song
            );

            if (tSong?.players.includes(match.player1)) {
              acc[match.player1]++;
            } else if (song.correctAnswers.includes(match.player1)) {
              acc.notP1PlaylistCorrect++;
            }
            if (tSong?.players.includes(match.player2)) {
              acc[match.player2]++;
            } else if (song.correctAnswers.includes(match.player2)) {
              acc.notP2PlaylistCorrect++;
            }

            acc.totalDifficulty += tSong?.difficulty || 0;

            return acc;
          },
          {
            [match.player1]: 0,
            [match.player2]: 0,
            totalDifficulty: 0,
            notP1PlaylistCorrect: 0,
            notP2PlaylistCorrect: 0,
          }
        );

        acc[match.player1] = {
          matches: (acc[match.player1]?.matches || 0) + 1,
          wins:
            (acc[match.player1]?.wins || 0) +
            (match.p1Points > match.p2Points ? 1 : 0),
          totalMusics: (acc[match.player1]?.totalMusics || 0) + 20,
          totalPoints: (acc[match.player1]?.totalPoints || 0) + match.p1Points,
          musicsFromPlaylist:
            (acc[match.player1]?.musicsFromPlaylist || 0) +
            songsByPlaylist[match.player1],
          averageMusicDifficulty: Math.round(
            ((acc[match.player1]?.averageMusicDifficulty || 0) +
              songsByPlaylist.totalDifficulty / 20) /
            2
          ),
          guessesFromOtherPlaylists:
            (acc[match.player1]?.guessesFromOtherPlaylists || 0) +
            songsByPlaylist.notP1PlaylistCorrect,
        };

        acc[match.player2] = {
          matches: (acc[match.player2]?.matches || 0) + 1,
          wins:
            (acc[match.player2]?.wins || 0) +
            (match.p2Points > match.p1Points ? 1 : 0),
          totalMusics: (acc[match.player2]?.totalMusics || 0) + 20,
          totalPoints: (acc[match.player2]?.totalPoints || 0) + match.p2Points,
          musicsFromPlaylist:
            (acc[match.player2]?.musicsFromPlaylist || 0) +
            songsByPlaylist[match.player2],
          averageMusicDifficulty: Math.round(
            ((acc[match.player2]?.averageMusicDifficulty || 0) +
              songsByPlaylist.totalDifficulty / 20) /
            2
          ),
          guessesFromOtherPlaylists:
            (acc[match.player2]?.guessesFromOtherPlaylists || 0) +
            songsByPlaylist.notP2PlaylistCorrect,
        };
      })
    );
    return acc;
  }, {});

  return Object.keys(winsByPlayer).map((k) => ({
    name: k,
    ...winsByPlayer[k],
  }));
};
