import { defineConfig, mergeConfig, type UserConfig } from "vite";

export default (config: UserConfig) => {
   return mergeConfig(
      config,
      defineConfig({
         server: {
            allowedHosts: ["catalog-overlord-partridge.ngrok-free.dev"],
         },
      }),
   );
};
