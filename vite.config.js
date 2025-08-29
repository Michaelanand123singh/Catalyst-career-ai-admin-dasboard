
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/", // Ensure base is root for correct asset paths in production
  server: {
    port: 5173,
    host: true,
  },
});
