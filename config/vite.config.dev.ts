import { defineConfig, mergeConfig } from "vite";
import type { UserConfig } from "vite";

import baseConfig from "./vite.config.base";

const devConfig = defineConfig({
  mode: "development",
  server: {
    host: true,
  },
}) satisfies UserConfig;

export default mergeConfig(baseConfig, devConfig);
