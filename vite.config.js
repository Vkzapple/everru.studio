import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  root: ".",
  publicDir: "public",
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false, // Disable sourcemap for production
    minify: true,
    rollupOptions: {
      input: {
        main: "./index.html",
      },
      output: {
        // Remove manual chunks that might cause issues
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
      },
    },
  },
  server: {
    port: 3000,
    open: true,
    host: true,
  },
  preview: {
    port: 4173,
    open: true,
    host: true,
  },
});
