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

export interface Song {
  name: string;
  artist: string;
  anime: string;
  difficulty: number;
  players: string[];
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

interface Phase {
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

interface StatsDataFormat {
  key: string;
  title: string;
  subtitle?: string;
}

const seasonDistribution = [
  Seasons.Winter,
  Seasons.Spring,
  Seasons.Summer,
  Seasons.Fall,
];

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
  const songs = new Map<{ title: string; artist: string }, number>();
  const tags = new Map<string, number>();
  const genres = new Map<string, number>();
  const season = new Map<string, number>();

  for (const song of tournament.songs) {
    const songAnime = tournament.animes.find((a) => a.romaji === song.anime);

    const animeC = (anime.get(song.anime) || 0) + 1;
    anime.set(song.anime, animeC);

    const artistC = (artist.get(song.artist) || 0) + 1;
    artist.set(song.artist, artistC);

    songs.set({ title: song.name, artist: song.artist }, song.players.length);

    for (const tag of songAnime?.tags || []) {
      tags.set(tag, (tags.get(tag) || 0) + 1);
    }
    for (const genre of songAnime?.genre || []) {
      genres.set(genre, (genres.get(genre) || 0) + 1);
    }

    const key = songAnime?.season || "Fall 1979";

    season.set(key, (season.get(key) || 0) + 1);
  }

  return { anime, artist, songs, tags, genres, season };
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
  const { anime, artist, songs, tags, genres, season } =
    getSongData(tournament);

  const animeData: UniqueCount<StatsDataFormat> = Array.from(anime).map(
    ([anime, count]) => [{ key: anime, title: anime }, count]
  );
  sortUniqueCount(animeData);

  const artistData: UniqueCount<StatsDataFormat> = Array.from(artist).map(
    ([artist, count]) => [{ key: artist, title: artist }, count]
  );
  sortUniqueCount(artistData);

  const songData: UniqueCount<StatsDataFormat> = Array.from(songs).map(
    ([{ title, artist }, count]) => [
      { key: `${title}-${artist}`, title, subtitle: artist },
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

  const animeGraph = getGraphData(animeData, (anime) => anime.key);
  const artistGraph = getGraphData(artistData, (artist) => artist.key);
  const tagGraph = getGraphData(tagData, (tag) => tag.key);
  const genreGraph = getGraphData(genreData, (genre) => genre.key);

  const filledSeasonList = fillSeasonList(seasonData);
  const seasonGraph = getGraphData(filledSeasonList, (season) => season);

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
    },
    graphs: {
      anime: animeGraph,
      artist: artistGraph,
      tag: tagGraph,
      genre: genreGraph,
      season: seasonGraph,
    },
    meta: {
      averageDifficulty,
      averageScore,
      shared,
    },
  };
};
