import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  base: "/euphoric/",
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: "dist",
    sourcemap: false,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  assetsInclude: [
    "**/*.jpg",
    "**/*.JPG",
    "**/*.jpeg",
    "**/*.JPEG",
    "**/*.png",
    "**/*.PNG",
    "**/*.gif",
    "**/*.GIF",
    "**/*.webp",
    "**/*.WEBP",
  ],
});
