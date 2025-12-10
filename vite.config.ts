import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// https://vite.dev/config/
export default defineConfig({
  server: {
    // port: 3000,
    // open: true,
    proxy: {
      "/api": {
        target: "http://localhost:2002",
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // 将 @ 映射到 src 目录
    },
  },
  plugins: [react()],
});
