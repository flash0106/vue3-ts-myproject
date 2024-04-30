import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    //设置别名
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    port: 8081, //启动端口
    hmr: {
      host: "127.0.0.1",
      port: 8081,
    },
    // 设置 https 代理
    // proxy: {
    //     '/api': {
    //         target: 'your https address',
    //         changeOrigin: true,
    //         rewrite: (path: string) => path.replace(/^\/api/, '')
    //     }
    // }
  },
});
