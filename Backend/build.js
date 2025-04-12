// esbuild.config.js
import { build } from "esbuild";

build({
  entryPoints: ["src/index.ts"],
  outfile: "dist/index.cjs",          // 👈 must be .cjs for CommonJS output
  bundle: true,
  platform: "node",
  target: "node18",
  format: "cjs",
  sourcemap: false,
  external: [],                       // You can exclude native modules if needed
}).catch(() => process.exit(1));
