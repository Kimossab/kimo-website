import type {
  APIReply,
  MangaChapterInfo,
  MangaData,
  MangaState,
} from "@/types";
import type { AxiosResponse } from "axios";
import axios from "axios";
import { defineStore } from "pinia";

export const useManga = defineStore("manga", {
  state: (): MangaState => ({
    list: [],
    manga: null,
    chapter: null,
    page: null,
    loading: false,
  }),
  getters: {
    breadcrumbs(): {
      name: string;
      data: { mangaId?: string; chapterId?: string };
    }[] {
      const bread = [
        {
          name: "Manga",
          data: {},
        },
      ];

      if (this.manga) {
        bread.push({
          name: this.manga.data.name.en,
          data: {
            mangaId: this.manga.index.toString(),
          },
        });
      }

      if (this.chapter) {
        bread.push({
          name: `Chapter ${this.chapter.number}`,
          data: {
            mangaId: this.manga?.index.toString(),
            chapterId: this.chapter.number.toString(),
            pageId: 1,
          },
        });
      }

      return bread;
    },

    pageCount(): number {
      return this.chapter?.pages.length || 0;
    },

    currentRouteParams(): {
      mangaId: string | undefined;
      chapterId: string | undefined;
      pageId: string | undefined;
    } {
      return {
        mangaId: this.manga?.index.toString(),
        chapterId: this.chapter?.number.toString(),
        pageId: this.page ? (this.page.index + 1).toString() : undefined,
      };
    },

    nextPage(): number | null {
      if (this.manga === null || this.chapter === null || this.page === null) {
        return null;
      }

      const chapter = this.chapter;
      const nPage = this.page.index + 1;

      if (nPage >= chapter.pages.length) {
        return null;
      }

      return nPage + 1;
    },

    previousPage(): number | null {
      if (this.manga === null || this.chapter === null || this.page === null) {
        return null;
      }

      const pPage = this.page.index - 1;

      if (pPage < 0) {
        return null;
      }

      return pPage + 1;
    },
  },
  actions: {
    async loadManga(mangaId: string, chapterId: string, pageId: string) {
      this.loading = true;

      if (this.list.length === 0) {
        const manga: AxiosResponse<APIReply<MangaData[]>> = await axios.get(
          `${import.meta.env.VITE_API_URL}manga/`
        );

        if (manga.status === 200 && manga.data.status === 1) {
          this.list = manga.data.data.map((m) => ({
            ...m,
            thumbnail: `${import.meta.env.VITE_API_URL}manga/${
              m.folder
            }/thumb`,
          }));
        }
      }

      if (mangaId !== "") {
        await this.selectManga(Number(mangaId));
      }
      if (chapterId !== "") {
        this.selectChapter(Number(chapterId));
      }
      if (pageId !== "") {
        this.selectPage(Number(pageId));
      }

      this.loading = false;
    },

    async selectManga(payload: number | null) {
      this.loading = true;
      this.chapter = null;

      if (payload === null) {
        this.manga = null;
        this.chapter = null;
        this.page = null;
      } else {
        try {
          const folder = this.list[payload].folder;
          const manga: AxiosResponse<APIReply<MangaData & MangaChapterInfo>> =
            await axios.get(
              `${import.meta.env.VITE_API_URL}manga/${folder}/`
            );

          if (manga.status === 200 && manga.data.status === 1) {
            this.manga = {
              index: payload,
              data: {
                ...manga.data.data,
                chapters: manga.data.data.chapters.map((c) => ({
                  ...c,
                  pages: c.pages.map(
                    (p) =>
                      `${import.meta.env.VITE_API_URL}manga/${folder}/${
                        c.number
                      }/${p}`
                  ),
                })),
              },
            };
          }
        } catch (e) {
          console.error(e);
        }
      }

      this.loading = false;
    },

    selectChapter(payload: number | null) {
      this.loading = true;

      if (payload === null) {
        this.chapter = null;
        this.page = null;
      } else {
        const chapterData = this.manga?.data.chapters.find(
          (c) => c.number === payload
        );
        if (chapterData) {
          this.chapter = chapterData;
          this.page = {
            index: 0,
            url: chapterData.pages[0],
          };
        }
      }

      this.loading = false;
    },

    selectPage(page: number | null) {
      if (page === null) {
        this.page = null;
        return;
      }
      if (this.manga === null || this.chapter === null || this.page === null) {
        return;
      }
      const pageIdx = page - 1;

      if (pageIdx === this.page.index) {
        return;
      }

      const chapter = this.chapter;

      if (pageIdx < 0 || pageIdx >= chapter.pages.length) {
        return;
      }

      this.page = {
        index: pageIdx,
        url: chapter.pages[pageIdx],
      };
    },
  },
});
