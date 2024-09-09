import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const PROXY_API_PREFIX = env.VITE_PROXY_API_PREFIX;
  const BASE_PROJECT_PREFIX = env.VITE_BASE_PROJECT_PREFIX;

  return {
    plugins: [react()],
    base: BASE_PROJECT_PREFIX,
    server: {
      port: 3001,
      host: true,
      proxy: {
        [PROXY_API_PREFIX]: {
          target: "http://localhost:3002",
          changeOrigin: true,
          rewrite: (path) =>
            path.replace(new RegExp(`^${PROXY_API_PREFIX}`), ""),
        },
      },
    },
    build: {
      outDir: "dist",
      assetsDir: "assets",
      emptyOutDir: true,
    },
  };
});
