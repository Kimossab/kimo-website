import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from "vite";
import { plugin as mdPlugin, Mode } from 'vite-plugin-markdown';
import tailwindcss from '@tailwindcss/vite';
import vue from "@vitejs/plugin-vue";;
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    allowedHosts: ["h-server.local"]
  },
  plugins: [vue(), tailwindcss(), vueDevTools(), mdPlugin({ mode: [Mode.HTML] })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
});
