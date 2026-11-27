import { readdirSync } from "node:fs"
import path from "node:path"
import { withoutCodeVariants } from "../../src/utils/example-variants.ts"
import {
  exampleExtension,
  HYDRATED_FRAMEWORK_IDS,
} from "../../src/utils/framework.js"

export const appsDir = import.meta.dirname
export const root = path.resolve(appsDir, "../..")

const FRAMEWORKS = [...HYDRATED_FRAMEWORK_IDS, "nunjucks"] as const

type Framework = (typeof FRAMEWORKS)[number]

const EXTENSIONS = Object.fromEntries(
  FRAMEWORKS.map((framework) => [framework, `.${exampleExtension(framework)}`]),
) as Record<Framework, string>

export type App = {
  blocks?: true
  build: string[]
  check: string[][]
  dir?: string
  examples: string
  framework: Framework
  name: string
  navigation?: "document"
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

export const ALL_APPS: App[] = [
  {
    blocks: true,
    build: ["eleventy"],
    check: [],
    examples: "src/_includes/examples",
    framework: "nunjucks",
    name: "eleventy",
    navigation: "document",
    port: 4410,
    publicDir: "public",
    ssr: true,
    start: "node server.js",
  },
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
    check: [["tsc", "--noEmit", "-p", "."]],
    examples: "src/examples",
    framework: "solid",
    name: "solid-start",
    port: 4409,
    publicDir: "public",
    scripts: "/assets/",
    ssr: true,
    start: "PORT=4409 node dist/server/node.js",
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
    start: "pnpm exec vite --force --port 4407 --strictPort",
  },
  {
    build: ["vite", "build"],
    check: [["tsc", "--noEmit", "-p", "."]],
    examples: "src/examples",
    framework: "solid",
    name: "vite-solid",
    port: 4408,
    publicDir: "public",
    ssr: false,
    start: "pnpm exec vite preview --port 4408 --strictPort",
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

const examplesDir = path.join(root, "src/component-examples")
const nativeDir = path.join(appsDir, "native")

const filesOf = (dir: string, framework: Framework) =>
  withoutCodeVariants(
    readdirSync(dir)
      .filter((file) => file.endsWith(EXTENSIONS[framework]))
      .map((file) => ({
        file,
        name: file.slice(0, -EXTENSIONS[framework].length),
      })),
  ).toSorted((a, b) => a.name.localeCompare(b.name))

export const examplesOf = (framework: Framework) =>
  new Map(
    [
      ...readdirSync(examplesDir)
        .toSorted()
        .map(
          (slug) =>
            [slug, filesOf(path.join(examplesDir, slug), framework)] as const,
        ),
      ["native", filesOf(nativeDir, framework)] as const,
    ].filter(([, examples]) => examples.length > 0),
  )

const blocksDir = path.join(root, "src/blocks")

export const blocksOf = (framework: Framework) =>
  new Map(
    readdirSync(blocksDir)
      .toSorted()
      .flatMap((slug) => {
        const file = readdirSync(path.join(blocksDir, slug)).find((name) =>
          name.endsWith(EXTENSIONS[framework]),
        )
        return file ? [[slug, path.join(blocksDir, slug, file)] as const] : []
      }),
  )

export const exampleSource = (slug: string, file: string) =>
  path.join(slug === "native" ? nativeDir : path.join(examplesDir, slug), file)
