import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import mkcert from "vite-plugin-mkcert";

import { sentryVitePlugin } from "@sentry/vite-plugin";
import dotenv from "dotenv";

dotenv.config();

// https://vitejs.dev/config/
export default (mode) =>
    defineConfig({
        plugins: [
            vue(),
            vueJsx(),
            mkcert(),
            sentryVitePlugin({
                ignore: ["node_modules", "vite.config.js"],
                org: "hunki",
                project: "javascript-vue",

                // Specify the directory containing build artifacts
                include: "./dist",

                // Auth tokens can be obtained from https://sentry.io/settings/account/api/auth-tokens/
                // and needs the `project:releases` and `org:read` scopes
                authToken: process.env.VITE_SENTRY_AUTH_TOKEN,

                // Optionally uncomment the line below to override automatic release name detection
                // release: env.RELEASE,
            }),
        ],
        resolve: {
            alias: {
                "@": fileURLToPath(new URL("./src", import.meta.url)),
            },
        },
        server: {
            proxy: {},
        },
        build: {
            sourcemap: true, // Source map generation must be turned on
        },
    });
