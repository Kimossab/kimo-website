import {
  Players,
  type AMQPlaylist,
  type TournamentSong,
  type Anime,
  type SongMeta,
  type GraphData,
  type GroupPlayer,
} from "./AMQ";

const seasonDistribution = {
  Winter: 0,
  Spring: 1,
  Summer: 2,
  Fall: 3,
};

type UniqueCount<T> = [T, number][];

interface TournamentDetails {
  songs: UniqueCount<TournamentSong>;
  animes: UniqueCount<Anime>;
  artists: UniqueCount<string>;
  tags: UniqueCount<string>;
  genres: UniqueCount<string>;
  seasons: UniqueCount<string>;
}

interface TournamentGraphs {
  artists: GraphData;
  animes: GraphData;
  tags: GraphData;
  genres: GraphData;
  seasons: GraphData;
}

const GROUPS = [
  [Players.Bernas, Players.Kimossab, Players.Mirai],
  [Players.Marta, Players.Horta, Players.Fenrir],
  [Players.Allexis, Players.AMPJ, Players.Kurisu, Players.Sauron],
] as const;

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

const getUniqueCount = <T, R>(
  data: T[],
  findFun: (_: R, __: T) => boolean,
  getData: (_: T) => R
): UniqueCount<R> => {
  return data.reduce<UniqueCount<R>>((acc, cur) => {
    const indx = acc.findIndex(([value]) => findFun(value, cur));

    if (indx > -1) {
      acc[indx][1]++;
      return acc;
    }

    return [...acc, [getData(cur), 1]];
  }, []);
};

export class AmqTournament {
  static #instance: AmqTournament;
  #_playlists: Map<Players, TournamentSong[]> = new Map();
  #_fullSongList: TournamentSong[] = [];
  #_uniqueSongList: TournamentSong[] = [];
  #_details: TournamentDetails = {} as TournamentDetails;
  #_meta: SongMeta = {} as SongMeta;
  #_graphData: TournamentGraphs = {} as TournamentGraphs;
  #_groups: GroupPlayer[][];

  private constructor() {
    this.#_groups = [];

    for (const group of GROUPS) {
      const g: GroupPlayer[] = [];

      for (const player of group) {
        g.push({
          player,
          draws: 0,
          losses: 0,
          matches: [],
          wins: 0,
        });
      }

      this.#_groups.push(g);
    }
  }

  async #setPlaylist() {
    for (const key of Object.keys(Players)) {
      const name = Players[key as keyof typeof Players];
      const aPlaylist = await import(`@/assets/amq/playlists/${name}.json`);

      this.#_playlists.set(name, this.#getSongList(aPlaylist));
    }
    this.#setDetails();
    this.#setMeta();
    this.#setGraphData();
  }

  #setDetails() {
    this.#_fullSongList = this.#getPlaylistsProperty((s) => s);

    const songs = getUniqueCount<TournamentSong, TournamentSong>(
      this.#_fullSongList,
      (song, curSong) => song.name === curSong.name,
      (song) => song
    );
    this.#_uniqueSongList = songs.map(([song]) => song);
    const animes = getUniqueCount<TournamentSong, Anime>(
      this.#_uniqueSongList,
      (anime, song) => anime.romaji === song.anime.romaji,
      (song) => song.anime
    );
    const artists = getUniqueCount<TournamentSong, string>(
      this.#_uniqueSongList,
      (artist, song) => artist === song.artist,
      (song) => song.artist
    );

    const allTags = this.#_uniqueSongList.reduce<string[]>(
      (acc, cur) => [...acc, ...cur.anime.tags],
      []
    );
    const tags = getUniqueCount<string, string>(
      allTags,
      (tag, curTag) => tag === curTag,
      (tag) => tag
    );

    const allGenres = this.#_uniqueSongList.reduce<string[]>(
      (acc, cur) => [...acc, ...cur.anime.genre],
      []
    );
    const genres = getUniqueCount<string, string>(
      allGenres,
      (genre, curGenre) => genre === curGenre,
      (genre) => genre
    );

    const allSeasons = this.#_uniqueSongList.reduce<string[]>(
      (acc, cur) => [...acc, cur.anime.season],
      []
    );
    const seasons = getUniqueCount<string, string>(
      allSeasons,
      (season, curSeason) => season === curSeason,
      (season) => season
    );

    artists.sort((a, b) => b[1] - a[1]);
    animes.sort((a, b) => b[1] - a[1]);
    tags.sort((a, b) => b[1] - a[1]);
    genres.sort((a, b) => b[1] - a[1]);
    seasons.sort((a, b) => {
      const [aSeason, aYear] = a[0].split(" ");
      const [bSeason, bYear] = b[0].split(" ");

      if (bYear > aYear) {
        return -1;
      }
      if (bYear < aYear) {
        return 1;
      }

      return (
        seasonDistribution[aSeason as keyof typeof seasonDistribution] -
        seasonDistribution[bSeason as keyof typeof seasonDistribution]
      );
    });

    this.#_details = { songs, animes, artists, tags, genres, seasons };
  }

  #setMeta() {
    if (!this.#_details) {
      return;
    }

    const sumDifficulty = this.#_uniqueSongList.reduce<number>(
      (acc, cur) => acc + cur.difficulty,
      0
    );
    const sumScore = this.#_details.animes.reduce<number>(
      (acc, cur) => acc + cur[0].score,
      0
    );

    this.#_meta = {
      averageDifficulty:
        Math.round((sumDifficulty / this.#_uniqueSongList.length) * 100) / 100,
      averageAnimeScore:
        Math.round((sumScore / this.#_details.animes.length) * 100) / 100,
      repeatedSongs: this.#_fullSongList.length - this.#_uniqueSongList.length,
    };
  }

  #setGraphData() {
    if (!this.#_details) {
      return;
    }

    this.#_graphData = {
      artists: getGraphData(this.#_details.artists, (artist) => artist),
      animes: getGraphData(this.#_details.animes, (anime) => anime.romaji),
      tags: getGraphData(this.#_details.tags, (tag) => tag),
      genres: getGraphData(this.#_details.genres, (genre) => genre),
      seasons: getGraphData(this.#_details.seasons, (season) => season),
    };
  }

  #getPlaylistsProperty<T>(gProperty: (song: TournamentSong) => T) {
    return Array.from(this.#_playlists.values())
      .map((list) => list.map(gProperty))
      .reduce((acc, cur) => [...acc, ...cur], []);
  }

  #getSongList(pl: AMQPlaylist) {
    return pl.songs.map(({ songInfo }) => ({
      name: songInfo.songName,
      artist: songInfo.artist,
      difficulty: Math.round(songInfo.animeDifficulty),
      anime: {
        ...songInfo.animeNames,
        tags: songInfo.animeTags,
        genre: songInfo.animeGenre,
        season: songInfo.vintage,
        score: songInfo.animeScore,
        type: songInfo.animeType,
      },
    }));
  }

  public static async getInstance(): Promise<AmqTournament> {
    if (!AmqTournament.#instance) {
      AmqTournament.#instance = new AmqTournament();
      await AmqTournament.#instance.#setPlaylist();
    }
    return AmqTournament.#instance;
  }

  public get playlists() {
    return this.#_playlists;
  }

  public get details() {
    return this.#_details;
  }
  public get graphData() {
    return this.#_graphData;
  }
  public get meta() {
    return this.#_meta;
  }
  public get groups() {
    return this.#_groups;
  }
}
