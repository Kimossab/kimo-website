import axios from "axios";
import { defineStore } from "pinia";

interface AnilistState {
  token: string | null;
  user: {
    id: number;
    name: string;
    avatar: { medium: string };
  } | null;
}

interface MediaListCollection {
  lists: {
    entries: {
      id: number;
      mediaId: number;
      private: boolean;
      customLists: {
        name: string;
        enabled: boolean;
      }[];
    }[];
    name: string;
    isCustomList: boolean;
    isSplitCompletedList: boolean;
    status: string;
  }[];
  hasNextChunk: boolean;
}

export const useAnilist = defineStore({
  id: "anilist",
  state: (): AnilistState => {
    const token = localStorage.getItem("anilistToken");
    return {
      token: token ?? null,
      user: null,
    };
  },
  actions: {
    async load(token: string) {
      this.token = token;
      localStorage.setItem("anilistToken", token);
    },

    async getUser() {
      if (!this.token) {
        return null;
      }

      this.user = (
        await axios.post(
          "https://graphql.anilist.co",
          {
            query: `query{
          Viewer {
            id,
            name,
            avatar{
              medium
            }
          }
        }`,
          },
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        )
      )?.data.data.Viewer;
    },

    async getUserPlaylists(): Promise<MediaListCollection | null> {
      if (!this.token) {
        return null;
      }

      return (
        await axios.post(
          "https://graphql.anilist.co",
          {
            query: `query ($id: Int!) {
              MediaListCollection(userId: $id, type: ANIME) {
                lists {
                  entries {
                    id
                    mediaId
                    private
                    customLists(asArray: true)
                  }
                  name
                  isCustomList
                  isSplitCompletedList
                  status
                }
                hasNextChunk
              }
            }`,
            variables: { id: this.user!.id },
          },
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        )
      )?.data.data.MediaListCollection;
    },

    async setEntriesToPrivate(entryList: number[]) {
      if (!this.token) {
        return null;
      }

      return (
        await axios.post(
          "https://graphql.anilist.co",
          {
            query: `mutation ($id: [Int]!) {
              UpdateMediaListEntries(ids:$id, private: true) {
                id
                private
              }
            }
            `,
            variables: { id: entryList },
          },
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        )
      )?.data.data.UpdateMediaListEntries;
    },

    async updatePlaylist(id: number, playlists: string[]) {
      if (!this.token) {
        return null;
      }

      return (
        await axios.post(
          "https://graphql.anilist.co",
          {
            query: `mutation ($id: Int!, $lists: [String]!) {
              SaveMediaListEntry(id: $id, customLists: $lists, private: false, status:COMPLETED) {
                id
                private
              }
            }            
            `,
            variables: { id: id, lists: playlists },
          },
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        )
      )?.data.data.UpdateMediaListEntries;
    },

    async createList(names: string[]) {
      if (!this.token) {
        return null;
      }

      return (
        await axios.post(
          "https://graphql.anilist.co",
          {
            query: `mutation ($names: [String]!) {
                UpdateUser(animeListOptions: {customLists: $names}) {
                  id
                }
              }

            `,
            variables: { names },
          },
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        )
      )?.data.data.SaveMediaListEntry;
    },

    async deleteList(name: string) {
      if (!this.token) {
        return null;
      }

      return (
        await axios.post(
          "https://graphql.anilist.co",
          {
            query: `mutation ($name: String) {
              DeleteCustomList(customList: $name, type: ANIME) {
                deleted
              }
            }`,
            variables: { name },
          },
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        )
      )?.data.data.SaveMediaListEntry;
    },

    async addAnime(mediaId: number, customLists: string[]) {
      if (!this.token) {
        return null;
      }

      return (
        await axios.post(
          "https://graphql.anilist.co",
          {
            query: `mutation ($mediaId: Int!, $customLists: [String]!) {
              SaveMediaListEntry(mediaId: $mediaId, status: COMPLETED, private: false, customLists: $customLists) {
                id
              }
            }`,
            variables: { mediaId, customLists },
          },
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        )
      )?.data.data.SaveMediaListEntry;
    },

    async UpdateAnime(id: number, customLists: string[]) {
      if (!this.token) {
        return null;
      }

      return (
        await axios.post(
          "https://graphql.anilist.co",
          {
            query: `mutation ($id: Int!, $customLists: [String]!) {
            SaveMediaListEntry(id: $id, status: COMPLETED, private: false, customLists: $customLists) {
              id
            }
          }`,
            variables: { id, customLists },
          },
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        )
      )?.data.data.SaveMediaListEntry;
    },
  },
});
