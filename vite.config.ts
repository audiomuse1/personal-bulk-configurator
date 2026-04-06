import { defineConfig } from "vite";

export default defineConfig({
  server: {
    proxy: {
      "/api/sheets": {
        target: "https://light-cow-51.andrewhartfordbac.deno.net",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/sheets/, "/sheets"),
      },
    },
  },
  build: {
    lib: {
      entry: "src/components/index.ts",
      name: "BulkConfigurator",
      fileName: (format) => {
        if (format === "es") return "bulk-configurator.es.js";
        return "bulk-configurator.iife.js";
      },
      formats: ["es", "iife"],
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
    cssCodeSplit: false,
    target: "es2021",
    minify: "terser",
    terserOptions: {
      keep_classnames: true,
    },
  },
  define: {
    __SHEETS_PROXY_URL__: JSON.stringify(
      process.env.SHEETS_PROXY_URL ||
        "https://light-cow-51.andrewhartfordbac.deno.net/sheets",
    ),
  },
});
