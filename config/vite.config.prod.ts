import { defineConfig, mergeConfig } from "vite";
import type { UserConfig } from "vite";

import baseConfig from "./vite.config.base";

const prodConfig = defineConfig({
  mode: "production",
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          semi: ["@douyinfe/semi-ui-19"],
        },
      },
    },
  },
}) satisfies UserConfig;

export default mergeConfig(baseConfig, prodConfig);
