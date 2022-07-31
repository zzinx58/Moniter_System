import { defineConfig, resolveBaseUrl } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import * as path from "path";
import WindiCSS from "vite-plugin-windicss";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx({}), WindiCSS()],
  server: {
    port: 5173,
    //配置 server proxy,
    proxy: {
      "/api": {
        target: "your https address",
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, ""),
      },
    },
  },
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve("./src"),
      },
    ],
    /*两种alias配置方式均可     
    alias: {
      "@": path.resolve(__dirname, "src"),
    }, */
  },
});
