import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
const previewMode = process.env.BASE44_PREVIEW_MODE === "1";

export default defineConfig({
  server: {
    host: "::",
    port: 8080,
    allowedHosts: previewMode && process.env.BASE44_SANDBOX_HOST_DOMAIN
      ? [`.${process.env.BASE44_SANDBOX_HOST_DOMAIN}`]
      : undefined,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
