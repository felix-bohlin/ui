/// <reference types="vitest/config" />
import { getViteConfig } from "astro/config"

export default getViteConfig({
  test: {
    css: true,
    fsModuleCache: false,
    include: ["tests/unit/**/*.test.ts"],
  },
})
