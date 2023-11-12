import type { CreateMatchInput, ITournament } from "@/helpers/AMQ";
import { makeHmacGETRequest, makeHmacPOSTRequest } from "@/helpers/HmacRequest";
import type {
  DiscordState,
  TournamentCreateInput,
  JoinTournamentInput,
  Playlist,
} from "@/types";
import {
  OAuth2Client,
  generateCodeVerifier,
  type OAuth2Token,
} from "@badgateway/oauth2-client";
import axios from "axios";
import { defineStore } from "pinia";

const client = new OAuth2Client({
  server: "https://discord.com",
  clientId: "1168882965221228574",
  tokenEndpoint: "/api/oauth2/token",
  authorizationEndpoint: "/oauth2/authorize",
});

export const useDiscord = defineStore({
  id: "discord",
  state: (): DiscordState => {
    const codeVerifier = localStorage.getItem("codeVerifier");
    const token = localStorage.getItem("token");
    return {
      codeVerifier,
      token: token ? JSON.parse(token) : null,
      isLoading: true,
      user: null,
      playerData: null,
      savedPlayerData: null,
    };
  },
  getters: {
    hasChanges: (state) => {
      return JSON.stringify(state.playerData) !== state.savedPlayerData;
    },
  },
  actions: {
    setCodeVerifier(codeVerifier: string | null) {
      this.codeVerifier = codeVerifier;
      if (codeVerifier) {
        localStorage.setItem("codeVerifier", codeVerifier);
      } else {
        localStorage.removeItem("codeVerifier");
      }
    },
    setToken(token: OAuth2Token | null) {
      this.token = token;
      if (token) {
        localStorage.setItem("token", JSON.stringify(token));
      } else {
        this.user = null;
        this.playerData = null;
        this.savedPlayerData = null;
        localStorage.removeItem("token");
      }
      this.setCodeVerifier(null);
    },

    async authenticate() {
      this.setCodeVerifier(await generateCodeVerifier());

      window.location.href = await client.authorizationCode.getAuthorizeUri({
        redirectUri: `${window.location.origin}/amq`,
        state: "some-string",
        codeVerifier: this.codeVerifier!!,
        scope: ["identify", "guilds"],
      });
    },

    async getToken() {
      this.setCodeVerifier(null);
      try {
        const oauth2Token =
          await client.authorizationCode.getTokenFromCodeRedirect(
            document.location.href,
            {
              redirectUri: `${window.location.origin}/amq`,
              state: "some-string",
              codeVerifier: this.codeVerifier!!,
            }
          );
        this.setToken(oauth2Token);
      } catch (e) {
        console.error(e);
      }
    },

    async getCurrentAuthorization() {
      if (!this.token) {
        return null;
      }

      return (
        await axios.get("https://discord.com/api/v10/oauth2/@me", {
          headers: {
            Authorization: `Bearer ${this.token.accessToken}`,
          },
        })
      ).data;
    },

    async getPlayerData() {
      try {
        this.playerData = await makeHmacGETRequest(
          `${import.meta.env.VITE_API_URL}amq/player/${this.user?.id}`,
          import.meta.env.VITE_API_SECRET
        );
        this.savedPlayerData = JSON.stringify(this.playerData);
      } catch (e) {
        this.playerData = {
          username: "",
          discordId: this.user!.id,
          playlists: [],
          tournaments: [],
        };
      }
    },

    async load() {
      this.isLoading = true;

      if (!this.token && this.codeVerifier) {
        await this.getToken();
        this.isLoading = false;
        return;
      }

      if (this.token && !this.user) {
        const data = await this.getCurrentAuthorization();
        this.user = data.user;
        await this.getPlayerData();
      }
      this.isLoading = false;
    },

    logout() {
      this.setToken(null);
    },

    async save() {
      this.playerData = await makeHmacPOSTRequest(
        `${import.meta.env.VITE_API_URL}amq/player/${this.user?.id}`,
        import.meta.env.VITE_API_SECRET,
        this.playerData
      );
      this.savedPlayerData = JSON.stringify(this.playerData);
    },

    async createTournament(name: string, isPrivate: boolean): Promise<string> {
      const tournamentData = await makeHmacPOSTRequest<
        ITournament,
        TournamentCreateInput
      >(
        `${import.meta.env.VITE_API_URL}amq/tournament/`,
        import.meta.env.VITE_API_SECRET,
        {
          name,
          creator: this.user!.id,
          serverId: null,
          public: !isPrivate,
        }
      );
      await this.getPlayerData();
      return tournamentData._id;
    },

    async getTournament(id: string): Promise<ITournament> {
      const tournamentData = await makeHmacGETRequest<ITournament>(
        `${import.meta.env.VITE_API_URL}amq/tournament/${id}`,
        import.meta.env.VITE_API_SECRET,
        this.user?.id
      );
      return tournamentData;
    },

    async joinTournament(id: string, playlist: Playlist): Promise<ITournament> {
      const data: JoinTournamentInput = {
        discordId: this.user!.id,
        name: this.playerData!.username,
        playlist,
      };
      const tournamentData = await makeHmacPOSTRequest<
        ITournament,
        JoinTournamentInput
      >(
        `${import.meta.env.VITE_API_URL}amq/tournament/${id}/join`,
        import.meta.env.VITE_API_SECRET,
        data
      );

      return tournamentData;
    },

    async manualJoinTournament(
      id: string,
      name: string,
      playlist: Playlist
    ): Promise<ITournament> {
      const data: JoinTournamentInput = {
        name: name,
        playlist,
      };
      const tournamentData = await makeHmacPOSTRequest<
        ITournament,
        JoinTournamentInput
      >(
        `${import.meta.env.VITE_API_URL}amq/tournament/${id}/join`,
        import.meta.env.VITE_API_SECRET,
        data,
        this.user?.id
      );

      return tournamentData;
    },

    async validatePlayer(
      id: string,
      player: string,
      json: string
    ): Promise<ITournament> {
      const tournamentData = await makeHmacPOSTRequest<ITournament, any>(
        `${
          import.meta.env.VITE_API_URL
        }amq/tournament/${id}/validate/${player}`,
        import.meta.env.VITE_API_SECRET,
        JSON.parse(json),
        this.user?.id
      );

      return tournamentData;
    },

    async createPhase(id: string, groups: string[][]): Promise<ITournament> {
      const tournamentData = await makeHmacPOSTRequest<ITournament, any>(
        `${import.meta.env.VITE_API_URL}amq/tournament/${id}/phase`,
        import.meta.env.VITE_API_SECRET,
        groups,
        this.user?.id
      );

      return tournamentData;
    },

    async createMatch(
      id: string,
      input: CreateMatchInput
    ): Promise<ITournament> {
      const tournamentData = await makeHmacPOSTRequest<ITournament, any>(
        `${import.meta.env.VITE_API_URL}amq/tournament/${id}/match`,
        import.meta.env.VITE_API_SECRET,
        input,
        this.user?.id
      );

      return tournamentData;
    },
  },
});
