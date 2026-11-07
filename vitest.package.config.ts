import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    hookTimeout: 600_000,
    include: ["tests/package/**/*.test.ts"],
    testTimeout: 600_000,
  },
})
