import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/server.ts"],
  format: ["esm"],
  platform: "node",
  target: "node22",
  outDir: "dist",
  clean: true,
  bundle: true,
  splitting: false,
  sourcemap: true,
  loader: {
    ".yml": "text",
  },
  banner: {
    js: `
      import { createRequire } from "node:module";
      const require = createRequire(import.meta.url);
    `,
  },
});
