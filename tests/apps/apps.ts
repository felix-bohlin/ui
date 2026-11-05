import { readdirSync } from "node:fs"
import path from "node:path"
import { withoutCodeVariants } from "../../src/utils/example-variants.ts"

export const appsDir = import.meta.dirname
export const root = path.resolve(appsDir, "../..")

const EXTENSIONS = {
  react: ".react.tsx",
  solid: ".solid.tsx",
  svelte: ".svelte",
  vue: ".vue",
}

type Framework = keyof typeof EXTENSIONS

type App = {
  build: string[]
  check: string[][]
  examples: string
  framework: Framework
  name: string
  port: number
  registry?: boolean
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
    registry: true,
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
    ssr: false,
    start: "pnpm exec vite preview --port 4404 --strictPort",
  },
  {
    build: ["vite", "build"],
    check: [["tsc", "--noEmit", "-p", "."]],
    examples: "src/examples",
    framework: "solid",
    name: "vite-solid",
    port: 4407,
    ssr: false,
    start: "pnpm exec vite preview --port 4407 --strictPort",
  },
  {
    build: ["vite", "build"],
    check: [["svelte-check", "--threshold", "error"]],
    examples: "src/examples",
    framework: "svelte",
    name: "vite-svelte",
    port: 4405,
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

export const appDir = (app: App) => path.join(appsDir, app.name)

export const KNOWN_PROBLEMS = [
  {
    app: "nuxt",
    message:
      'console.warning: The specified value "" does not conform to the required format.  The value must be a valid CSS color.',
    reason:
      "Vue's v-model sets a color TextField without a value to an empty string while it hydrates (TODO.md, Bugs, TextField (Vue))",
    slug: "text-field",
  },
]

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
