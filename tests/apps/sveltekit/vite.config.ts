import adapter from "@sveltejs/adapter-node"
import { sveltekit } from "@sveltejs/kit/vite"
import { defineConfig } from "vite"

const readme = process.env.OPUI_README_BUILD
const settings = readme ? JSON.parse(readme) : {}

export default defineConfig({
  ...settings,
  plugins: [
    sveltekit({
      adapter: adapter(readme ? { out: "build-readme" } : {}),
      ...(readme ? { outDir: ".svelte-kit-readme" } : {}),
    }),
  ],
})
