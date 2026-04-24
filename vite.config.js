import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/backend": {
        target: "https://talesman-kuwait.com",
        changeOrigin: true,
      },
    },
  },
});
