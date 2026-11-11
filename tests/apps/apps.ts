import { readdirSync } from "node:fs"
import path from "node:path"
import { withoutCodeVariants } from "../../src/utils/example-variants.ts"

export const appsDir = import.meta.dirname
export const root = path.resolve(appsDir, "../..")

const EXTENSIONS = {
  react: ".react.tsx",
  svelte: ".svelte",
  vue: ".vue",
}

type Framework = keyof typeof EXTENSIONS

type App = {
  build: string[]
  check: string[][]
  dir?: string
  examples: string
  framework: Framework
  name: string
  port: number
  prefixes?: string[]
  publicDir: string
  readmeBuild?: {
    css: string
    readmeCss: string
    settings: "next" | "vite"
  }
  registry?: boolean
  scripts?: string
  ssr: boolean
  start: string
}

const ALL_APPS: App[] = [
  {
    build: ["next", "build"],
    check: [],
    examples: "examples",
    framework: "react",
    name: "next",
    port: 4401,
    prefixes: ["", "/elements-first"],
    publicDir: "public",
    readmeBuild: {
      css: ".next/static",
      readmeCss: ".next-readme/static",
      settings: "next",
    },
    registry: true,
    scripts: "/_next/",
    ssr: true,
    start: "pnpm exec next start --port 4401",
  },
  {
    build: ["nuxt", "build"],
    check: [["nuxt", "typecheck"]],
    examples: "app/examples",
    framework: "vue",
    name: "nuxt",
    port: 4402,
    publicDir: "public",
    readmeBuild: {
      css: ".output/public",
      readmeCss: ".output-readme/public",
      settings: "vite",
    },
    scripts: "/_nuxt/",
    ssr: true,
    start: "node .output/server/index.mjs",
  },
  {
    build: ["vite", "build"],
    check: [
      ["svelte-kit", "sync"],
      ["svelte-check", "--threshold", "error"],
    ],
    examples: "src/lib/examples",
    framework: "svelte",
    name: "sveltekit",
    port: 4403,
    publicDir: "static",
    readmeBuild: {
      css: "build/client",
      readmeCss: "build-readme/client",
      settings: "vite",
    },
    scripts: "/_app/",
    ssr: true,
    start: "node build",
  },
  {
    build: ["vite", "build"],
    check: [["tsc", "--noEmit", "-p", "."]],
    examples: "src/examples",
    framework: "react",
    name: "vite-react",
    port: 4404,
    publicDir: "public",
    ssr: false,
    start: "pnpm exec vite preview --port 4404 --strictPort",
  },
  {
    build: [],
    check: [],
    dir: "vite-react",
    examples: "src/examples",
    framework: "react",
    name: "vite-react-dev",
    port: 4407,
    publicDir: "public",
    ssr: false,
    start: "pnpm exec vite --port 4407 --strictPort",
  },
  {
    build: ["vite", "build"],
    check: [["svelte-check", "--threshold", "error"]],
    examples: "src/examples",
    framework: "svelte",
    name: "vite-svelte",
    port: 4405,
    publicDir: "public",
    readmeBuild: {
      css: "dist",
      readmeCss: "dist-readme",
      settings: "vite",
    },
    ssr: false,
    start: "pnpm exec vite preview --port 4405 --strictPort",
  },
  {
    build: ["vite", "build"],
    check: [["vue-tsc", "--noEmit", "-p", "."]],
    examples: "src/examples",
    framework: "vue",
    name: "vite-vue",
    port: 4406,
    publicDir: "public",
    ssr: false,
    start: "pnpm exec vite preview --port 4406 --strictPort",
  },
]

const selected = process.env.OPUI_APPS?.split(",").filter(Boolean)
const unknown = selected?.filter(
  (name) => !ALL_APPS.some((app) => app.name === name),
)
if (unknown?.length) {
  throw new Error(
    `OPUI_APPS names no app: ${unknown.join(", ")}. The apps are ${ALL_APPS.map((app) => app.name).join(", ")}`,
  )
}

export const APPS = selected
  ? ALL_APPS.filter((app) => selected.includes(app.name))
  : ALL_APPS

export const appDir = (app: App) => path.join(appsDir, app.dir ?? app.name)

export const KNOWN_PROBLEMS: {
  app: string
  message: string
  reason: string
  slug: string
}[] = []

const examplesDir = path.join(root, "src/component-examples")

export const examplesOf = (framework: Framework) =>
  new Map(
    readdirSync(examplesDir)
      .toSorted()
      .map((slug) => {
        const names = readdirSync(path.join(examplesDir, slug))
          .filter((file) => file.endsWith(EXTENSIONS[framework]))
          .map((file) => ({
            file,
            name: file.slice(0, -EXTENSIONS[framework].length),
          }))
        return [
          slug,
          withoutCodeVariants(names).toSorted((a, b) =>
            a.name.localeCompare(b.name),
          ),
        ] as const
      })
      .filter(([, examples]) => examples.length > 0),
  )

export const exampleSource = (slug: string, file: string) =>
  path.join(examplesDir, slug, file)
