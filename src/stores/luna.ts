import type { APILunaList, LunaPicture, LunaState } from "@/types";
import type { AxiosResponse } from "axios";
import axios from "axios";
import { defineStore } from "pinia";

export const useLuna = defineStore({
  id: "luna",
  state: (): LunaState => ({
    pictures: [],
    loading: false,
    selectedIndex: null,
  }),
  actions: {
    async getPictures() {
      this.loading = true;

      if (this.pictures.length === 0) {
        try {
          const pictures: AxiosResponse<APILunaList> = await axios.get(
            `${import.meta.env.VITE_API_URL}luna/list`
          );
          if (pictures.status === 200 && pictures.data.status === 1) {
            const pictureList: LunaPicture[] = [];

            for (const name of pictures.data.data) {
              pictureList.push({
                original: `${import.meta.env.VITE_API_URL}luna/image/${name}`,
                thumbnail: `${import.meta.env.VITE_API_URL}luna/thumb/${name}`,
                name: name,
              });
            }

            this.pictures = pictureList;
          }
        } catch (e) {
          console.error(e);
        }
      }

      this.loading = false;
    },
    selectPicture(index: null | number) {
      let selectedIndex = index;

      if (index !== null) {
        if (index < 0) {
          selectedIndex = this.pictures.length - 1;
        } else if (index > this.pictures.length - 1) {
          selectedIndex = 0;
        }
      }
      this.selectedIndex = selectedIndex;
    },
    nextPicture() {
      let index = this.selectedIndex;

      if (index !== null) {
        index++;
        if (index >= this.pictures.length) {
          index = 0;
        }

        if (index < 0) {
          index = this.pictures.length - 1;
        }
      }

      this.selectedIndex = index;
    },
    previousPicture() {
      let index = this.selectedIndex;

      if (index !== null) {
        index--;
        if (index >= this.pictures.length) {
          index = 0;
        }

        if (index < 0) {
          index = this.pictures.length - 1;
        }
      }

      this.selectedIndex = index;
    },
  },
});
