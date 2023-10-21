import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import envCompatible from "vite-plugin-env-compatible";

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  console.log(env.VITE_APP_ENV);
  return {
    // vite config
    envPrefix: "VITE_APP_",
    plugins: [react(), envCompatible],
    server: {
      host:'0.0.0.0' ,
      port: env.VITE_APP_PORT,
    },
    define: {
      __APP_ENV__: env.APP_ENV,
    },
  };
});
