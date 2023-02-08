import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import mkcert from "vite-plugin-mkcert";
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), mkcert()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    https: true,
    proxy: {
      "/api": {
        target: "https://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
