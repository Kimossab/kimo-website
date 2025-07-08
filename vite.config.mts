import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from "vite"; 
import tailwindcss from '@tailwindcss/vite';
import vue from "@vitejs/plugin-vue";;
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools(), tailwindcss()],
  build: {
    minify: "terser",
  },
  assetsInclude: ['**/*.md'],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
});
