import node from "@astrojs/node"
import { defineConfig } from "astro/config"

export default defineConfig({
  adapter: node({ mode: "standalone" }),
  devToolbar: { enabled: false },
  output: "server",
  vite: { ssr: { noExternal: ["reference-shared"] } },
})
