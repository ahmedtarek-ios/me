import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: true,
      port: 8080,
      protocol: "ws",
    },
  },

  base: mode === "production" ? "/me/" : "/",

  plugins: [
    react({
      // 🚫 Disable Fast Refresh because it injects eval into dev bundles
      useAtYourOwnRisk_mutateSwcOptions(options) {
        options.jsc ??= {};
        options.jsc.transform ??= {};
        options.jsc.transform.react ??= {};
        options.jsc.transform.react.refresh = false;
        options.jsc.transform.react.runtime ??= "automatic";
      },
    }),

    mode === "development" && componentTagger()
  ].filter(Boolean),

  build: {
    sourcemap: false,   // 🚫 no eval-based sourcemaps
    target: "es2017",   // clean output, no eval shims
    minify: "esbuild",  // safe
  },

  esbuild: {
    legalComments: "none",
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}))