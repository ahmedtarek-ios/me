import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },

  base: mode === "production" ? "/me/" : "/",

  plugins: [
    react(),
    mode === "development" && componentTagger()
  ].filter(Boolean),

  build: {
    sourcemap: false,
    minify: "esbuild",
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}))
