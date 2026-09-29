/// <reference types="vitest/config" />
import { getViteConfig } from "astro/config"

export default getViteConfig({
  test: {
    environment: "node",
    include: ["tests/unit/**/*.test.ts"],
  },
})
