import type { GetManualChunk } from "rollup";

export const manualChunks: GetManualChunk = (id) => {
  // Third-party dependencies
  if (id.includes("node_modules")) {
    if (id.includes("hono")) return "vendor-hono";
    if (id.includes("zod")) return "vendor-zod";
    if (id.includes("jose")) return "vendor-jose";
    if (id.includes("@prisma")) return "vendor-prisma";
    if (id.includes("drizzle")) return "vendor-drizzle";
    if (id.includes("postgres")) return "vendor-postgres";

    return "vendor";
  }

  // Internal chunks
  if (id.includes("/src/app/")) return "app";
  if (id.includes("/src/config")) return "config";
  if (id.includes("/src/database")) return "database";
  if (id.includes("/src/packages")) return "packages";
  if (id.includes("/src/services")) return "services";
  if (id.includes("/src/utils")) return "utils";

  return undefined;
};
