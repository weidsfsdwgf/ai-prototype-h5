import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: process.env.GITHUB_PAGES === "true" ? "/ai-prototype-h5/" : "/",
  plugins: [react()],
  optimizeDeps: {
    noDiscovery: true,
    include: [],
  },
});
