import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from "vite";
import { plugin as mdPlugin, Mode } from 'vite-plugin-markdown';
import vue from "@vitejs/plugin-vue";;
import vueDevTools from 'vite-plugin-vue-devtools';
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    allowedHosts: ["h-server.local"]
  },
  plugins: [tailwindcss(), vue(), vueDevTools(), mdPlugin({ mode: [Mode.HTML] })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
});
