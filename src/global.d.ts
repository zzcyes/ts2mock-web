declare global {
  interface ImportMetaEnv {
    readonly VITE_PROXY_API_PREFIX: string;
    readonly VITE_BASE_PROJECT_PREFIX: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

export {};
