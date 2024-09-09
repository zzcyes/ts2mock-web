/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PROXY_API_PREFIX: string;
  readonly VITE_BASE_PROJECT_PREFIX: string;
  // 在这里添加其他自定义的环境变量
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
