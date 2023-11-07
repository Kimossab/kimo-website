import * as z from "zod";

const AnimeTypeSchema = z.enum(["movie", "TV", "OVA"]);
// type AnimeType = z.infer<typeof AnimeTypeSchema>;

const SiteIdsSchema = z.object({
  annId: z.number(),
  malId: z.number(),
  kitsuId: z.number(),
  aniListId: z.number(),
});
// type SiteIds = z.infer<typeof SiteIdsSchema>;

const AnimeNamesSchema = z.object({
  english: z.string(),
  romaji: z.string(),
});
// type AnimeNames = z.infer<typeof AnimeNamesSchema>;

const SongInfoSchema = z.object({
  animeNames: AnimeNamesSchema,
  altAnimeNames: z.array(z.string()),
  altAnimeNamesAnswers: z.array(z.string()),
  artist: z.string(),
  songName: z.string(),
  type: z.number(),
  typeNumber: z.number(),
  annId: z.number(),
  animeScore: z.number(),
  animeType: AnimeTypeSchema,
  vintage: z.string(),
  animeDifficulty: z.number(),
  siteIds: SiteIdsSchema,
  animeTags: z.array(z.string()),
  animeGenre: z.array(z.string()),
  highRisk: z.union([z.number(), z.null()]).optional(),
});
// type SongInfo = z.infer<typeof SongInfoSchema>;

const ListStateSchema = z.object({
  name: z.string(),
  status: z.number(),
  score: z.number(),
});
// type ListState = z.infer<typeof ListStateSchema>;

const SongSchema = z.object({
  songNumber: z.number(),
  songInfo: SongInfoSchema,
  answer: z.string(),
  correctGuess: z.union([z.boolean(), z.number()]),
  wrongGuess: z.boolean(),
  correctCount: z.number(),
  wrongCount: z.number(),
  startPoint: z.number(),
  videoLength: z.number(),
  videoUrl: z.union([z.null(), z.string()]).optional(),
  correctGuessPlayers: z.union([z.array(z.string()), z.null()]).optional(),
  listStates: z.union([z.array(ListStateSchema), z.null()]).optional(),
});
// type Song = z.infer<typeof SongSchema>;

export const AmqMatchSchema = z.object({
  roomName: z.string(),
  startTime: z.string(),
  songs: z.array(SongSchema),
});
export type AmqMatch = z.infer<typeof AmqMatchSchema>;
