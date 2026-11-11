import { svelte } from "@sveltejs/vite-plugin-svelte"
import { defineConfig } from "vite"

const readme = process.env.OPUI_README_BUILD
const settings = readme ? JSON.parse(readme) : {}

export default defineConfig({
  ...settings,
  ...(readme ? { build: { ...settings.build, outDir: "dist-readme" } } : {}),
  plugins: [svelte()],
})
