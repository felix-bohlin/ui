import solid from "@solidjs/vite-plugin"
import { defineConfig } from "vite"

export default defineConfig({
  optimizeDeps: { exclude: ["opui-css"] },
  plugins: [solid({ ssr: true, start: { nodeServer: true } })],
  ssr: { noExternal: ["opui-css"] },
})
