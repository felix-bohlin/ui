import path from "node:path"
import { PORTS, type App } from "./shared/screens.ts"

export const referenceDir = import.meta.dirname
export const root = path.resolve(referenceDir, "../..")

type AppConfig = {
  build: string[]
  check: string[][]
  dev: string
  framework: "astro" | "react" | "solid" | "svelte" | "vue"
  name: App
  publicDir: string
  start: string
}

export const ALL_APPS: AppConfig[] = [
  {
    build: ["astro", "build"],
    check: [["astro", "check"]],
    dev: `pnpm exec astro dev --port ${PORTS.astro}`,
    framework: "astro",
    name: "astro",
    publicDir: "public",
    start: "node dist/server/entry.mjs",
  },
  {
    build: ["next", "build"],
    check: [["tsc", "--noEmit", "-p", "."]],
    dev: `pnpm exec next dev --port ${PORTS.next}`,
    framework: "react",
    name: "next",
    publicDir: "public",
    start: `pnpm exec next start --port ${PORTS.next}`,
  },
  {
    build: ["nuxt", "build"],
    check: [["nuxt", "typecheck"]],
    dev: `pnpm exec nuxt dev --port ${PORTS.nuxt}`,
    framework: "vue",
    name: "nuxt",
    publicDir: "public",
    start: "node .output/server/index.mjs",
  },
  {
    build: ["vite", "build"],
    check: [["tsc", "--noEmit", "-p", "."]],
    dev: `pnpm exec vite --port ${PORTS.solid} --strictPort`,
    framework: "solid",
    name: "solid",
    publicDir: "public",
    start: "node dist/server/node.js",
  },
  {
    build: ["vite", "build"],
    check: [
      ["svelte-kit", "sync"],
      ["svelte-check", "--threshold", "error"],
    ],
    dev: `pnpm exec vite dev --port ${PORTS.sveltekit} --strictPort`,
    framework: "svelte",
    name: "sveltekit",
    publicDir: "static",
    start: "node build",
  },
]

const selected = process.env.OPUI_REFERENCE_APPS?.split(",").filter(Boolean)
const unknown = selected?.filter(
  (name) => !ALL_APPS.some((app) => app.name === name),
)
if (unknown?.length) {
  throw new Error(
    `OPUI_REFERENCE_APPS names no app: ${unknown.join(", ")}. The apps are ${ALL_APPS.map((app) => app.name).join(", ")}`,
  )
}

export const APPS = selected
  ? ALL_APPS.filter((app) => selected.includes(app.name))
  : ALL_APPS

export const appDir = (app: AppConfig) =>
  path.join(referenceDir, "apps", app.name)

export const portOf = (app: AppConfig) => PORTS[app.name]
