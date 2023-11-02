import { makeHmacGETRequest, makeHmacPOSTRequest } from "@/helpers/HmacRequest";
import type { DiscordState } from "@/types";
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
        redirectUri: "http://localhost:5173/amq",
        state: "some-string",
        codeVerifier: this.codeVerifier!!,
        scope: ["identify", "guilds"],
      });
    },

    async getToken() {
      const oauth2Token =
        await client.authorizationCode.getTokenFromCodeRedirect(
          document.location.href,
          {
            redirectUri: "http://localhost:5173/amq",
            state: "some-string",
            codeVerifier: this.codeVerifier!!,
          }
        );
      this.setToken(oauth2Token);
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
  },
});
