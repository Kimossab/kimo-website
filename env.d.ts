/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_API_SECRET: string;
  readonly VITE_API_ANILIST_SECRET: string;
  readonly VITE_API_ANILIST_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
