// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import * as path from "path";
import WindiCSS from "vite-plugin-windicss";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    vueJsx({}),
    WindiCSS(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "your https address",
        changeOrigin: true,
        rewrite: (path2) => path2.replace(/^\/api/, "")
      }
    }
  },
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve("./src")
      }
    ]
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/styles/zzinx58.scss";'
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XHJcbmltcG9ydCB2dWUgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiO1xyXG5pbXBvcnQgdnVlSnN4IGZyb20gXCJAdml0ZWpzL3BsdWdpbi12dWUtanN4XCI7XHJcbmltcG9ydCAqIGFzIHBhdGggZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0IFdpbmRpQ1NTIGZyb20gXCJ2aXRlLXBsdWdpbi13aW5kaWNzc1wiO1xyXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tIFwidW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZVwiO1xyXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tIFwidW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZVwiO1xyXG5pbXBvcnQgeyBFbGVtZW50UGx1c1Jlc29sdmVyIH0gZnJvbSBcInVucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVyc1wiO1xyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFtcclxuICAgIHZ1ZSgpLFxyXG4gICAgdnVlSnN4KHt9KSxcclxuICAgIFdpbmRpQ1NTKCksXHJcbiAgICBBdXRvSW1wb3J0KHtcclxuICAgICAgcmVzb2x2ZXJzOiBbRWxlbWVudFBsdXNSZXNvbHZlcigpXSxcclxuICAgIH0pLFxyXG4gICAgQ29tcG9uZW50cyh7XHJcbiAgICAgIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoKV0sXHJcbiAgICB9KSxcclxuICBdLFxyXG4gIHNlcnZlcjoge1xyXG4gICAgcG9ydDogNTE3MyxcclxuICAgIC8vXHU5MTREXHU3RjZFIHNlcnZlciBwcm94eSxcclxuICAgIHByb3h5OiB7XHJcbiAgICAgIFwiL2FwaVwiOiB7XHJcbiAgICAgICAgdGFyZ2V0OiBcInlvdXIgaHR0cHMgYWRkcmVzc1wiLFxyXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcclxuICAgICAgICByZXdyaXRlOiAocGF0aDogc3RyaW5nKSA9PiBwYXRoLnJlcGxhY2UoL15cXC9hcGkvLCBcIlwiKSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfSxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczogW1xyXG4gICAgICB7XHJcbiAgICAgICAgZmluZDogXCJAXCIsXHJcbiAgICAgICAgcmVwbGFjZW1lbnQ6IHBhdGgucmVzb2x2ZShcIi4vc3JjXCIpLFxyXG4gICAgICB9LFxyXG4gICAgXSxcclxuICAgIC8qXHU0RTI0XHU3OUNEYWxpYXNcdTkxNERcdTdGNkVcdTY1QjlcdTVGMEZcdTU3NDdcdTUzRUYgICAgIFxyXG4gICAgYWxpYXM6IHtcclxuICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShcIkM6XFxcXFVzZXJzXFxcXDg2MTc2XFxcXERlc2t0b3BcXFxcVnVlXHU5ODc5XHU3NkVFXFxcXFx1OTc1Mlx1OEJBRFxcXFxNb25pdGVyX1N5c3RlbVxcXFxNYWluXCIsIFwic3JjXCIpLFxyXG4gICAgfSwgKi9cclxuICB9LFxyXG4gIGNzczoge1xyXG4gICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xyXG4gICAgICBzY3NzOiB7XHJcbiAgICAgICAgYWRkaXRpb25hbERhdGE6ICdAaW1wb3J0IFwiLi9zcmMvc3R5bGVzL3p6aW54NTguc2Nzc1wiOycsXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQUEsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sWUFBWTtBQUNuQixZQUFZLFVBQVU7QUFDdEIsT0FBTyxjQUFjO0FBQ3JCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsMkJBQTJCO0FBRXBDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxJQUNKLE9BQU8sQ0FBQyxDQUFDO0FBQUEsSUFDVCxTQUFTO0FBQUEsSUFDVCxXQUFXO0FBQUEsTUFDVCxXQUFXLENBQUMsb0JBQW9CLENBQUM7QUFBQSxJQUNuQyxDQUFDO0FBQUEsSUFDRCxXQUFXO0FBQUEsTUFDVCxXQUFXLENBQUMsb0JBQW9CLENBQUM7QUFBQSxJQUNuQyxDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBRU4sT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLFFBQ04sUUFBUTtBQUFBLFFBQ1IsY0FBYztBQUFBLFFBQ2QsU0FBUyxDQUFDQSxVQUFpQkEsTUFBSyxRQUFRLFVBQVUsRUFBRTtBQUFBLE1BQ3REO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixhQUFrQixhQUFRLE9BQU87QUFBQSxNQUNuQztBQUFBLElBQ0Y7QUFBQSxFQUtGO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDSCxxQkFBcUI7QUFBQSxNQUNuQixNQUFNO0FBQUEsUUFDSixnQkFBZ0I7QUFBQSxNQUNsQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFsicGF0aCJdCn0K
