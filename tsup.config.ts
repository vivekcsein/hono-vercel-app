import { defineConfig } from "tsup";
import { resolve } from "path";

export default defineConfig([
  // ESM build — with code splitting per file
  {
    entry: {
      index: "index.ts",
      // Add every entrypoint you want as its own chunk:
      "app/app": "src/app/app.ts",
      // "app/server": "src/app/server.ts",
    },
    format: ["esm"],
    outDir: "dist",
    splitting: true,        // ← chunks shared code into _chunks/
    sourcemap: true,
    clean: true,
    dts: true,
    treeshake: true,
    esbuildOptions(options) {
      options.alias = {
        "@": resolve(__dirname, "src"),
        "@app": resolve(__dirname, "src/app"),
        "@types": resolve(__dirname, "src/types"),
        "@packages": resolve(__dirname, "src/packages"),
      };
    },
  },
]);
