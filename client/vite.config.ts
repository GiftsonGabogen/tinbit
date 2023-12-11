import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";

const root = resolve(__dirname, "src");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      components: resolve(root, "components"),
      features: resolve(root, "features"),
      routes: resolve(root, "routes"),
      utils: resolve(root, "utils"),
    },
  },
});
