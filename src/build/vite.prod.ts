import base from "./vite.base";
import { mergeConfig } from "vite";
import { manualChunks } from "./chunks";

export default mergeConfig(base as unknown as Record<string, unknown>, {

  build: {
    target: "node22",

    ssr: true,

    outDir: "dist",

    emptyOutDir: true,

    sourcemap: true,

    minify: false,

    cssCodeSplit: false,

    reportCompressedSize: false,

    tsconfigPaths: true,
    tsconfig: "./tsconfig.json",

    rollupOptions: {
      input: "index.ts",

      output: {
        entryFileNames: "[name].js",

        chunkFileNames: "src/[name]-[hash].js",

        assetFileNames: "src/assets/[name]-[hash][extname]",

        manualChunks,
      },
    },
  },
});
