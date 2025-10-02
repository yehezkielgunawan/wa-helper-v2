import { defineConfig } from "vite";

export default defineConfig({
  // exclude renderer process files
  test: {
    exclude: ["src/renderer.tsx", "node_modules/**"],
    environment: "node",
    globals: true,
    coverage: {
      provider: "v8",
      all: true,
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/renderer.tsx",
        "src/index.tsx",
        "src/client.tsx",
        "**/*.d.ts",
        "node_modules/**",
      ],
      thresholds: {
        lines: 70,
        branches: 70,
        functions: 70,
        statements: 70,
      },
      reportsDirectory: "./coverage",
      reporter: ["text", "html", "lcov"],
    },
  },
});
