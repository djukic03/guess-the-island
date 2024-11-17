import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    proxy: {
      "/jf24-fullstack-challenge": {
        target: "https://jobfair.nordeus.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/jf24-fullstack-challenge/, ""),
      },
    },
  },
});
