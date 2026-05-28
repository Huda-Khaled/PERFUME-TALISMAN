import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import webfontDownload from "vite-plugin-webfont-dl";

export default defineConfig({
  plugins: [
    react(),

    // ✅ تحميل الـ Google Fonts محلياً
    webfontDownload([
      "https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&family=Tajawal:wght@200;300;400;500;700;800&display=swap",
    ]),

    // ✅ ضغط الصور
    ViteImageOptimizer({
      png: { quality: 80 },
      jpeg: { quality: 75 },
      jpg: { quality: 75 },
      webp: { lossless: false, quality: 75 },
      svg: { multipass: true },
    }),
  ],

  build: {
    // ✅ تصغير الـ JS
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true, // شيل console.log في production
        drop_debugger: true,
      },
    },

    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react-dom") || id.includes("react/"))
              return "react-vendor";
            if (id.includes("react-router")) return "router";
            if (id.includes("@tanstack")) return "query";
            if (id.includes("axios")) return "axios";
            if (id.includes("react-icons")) return "icons";
          }
        },
      },
    },
  },

  server: {
    proxy: {
      "/backend": {
        target: "https://talesman-kuwait.com",
        changeOrigin: true,
      },
    },
  },
});
