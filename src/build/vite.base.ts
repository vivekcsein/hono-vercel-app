import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "src"),
    },
  },

  esbuild: {
    target: "es2022",
    logLevel: "info",
    legalComments: "none",
  } as unknown as Record<string, unknown>,

  define: {
    __DEV__: process.env.NODE_ENV !== "production",
  },
});
