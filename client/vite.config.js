import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
  build: { sourcemap: true },
  resolve: {
    alias: {
      src: path.resolve(__dirname, "src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.js"],
  },
});
