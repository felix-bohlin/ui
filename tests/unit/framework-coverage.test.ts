import { existsSync, readdirSync, readFileSync } from "node:fs"
import path from "node:path"
import { expect, test } from "vitest"
import { FRAMEWORKS as BUILT } from "../../packages/opui/scripts/build-frameworks.mjs"
import { EMITTERS, PORTS, TYPE_FILES } from "../../scripts/build-components.mjs"
import { frameworks as syntax } from "../../src/component-api/frameworks"
import {
  EXAMPLE_EXTENSIONS,
  FRAMEWORKS,
  isHydratedFramework,
  TYPES_FILES,
} from "../../src/utils/framework"
import { ALL_APPS } from "../apps/apps.ts"
import { render } from "./renderers"

const root = path.resolve(import.meta.dirname, "../..")

const read = (file: string) => readFileSync(path.join(root, file), "utf8")

const json = (file: string) => JSON.parse(read(file)) as Record<string, object>

const GLOB_FILES = [
  "src/utils/blocks.ts",
  "src/utils/examples.ts",
  "tests/unit/align.test.ts",
  "tests/unit/build-examples.test.ts",
  "tests/unit/disabled-fields.test.ts",
  "tests/unit/field-description.test.ts",
  "tests/unit/icon-slots.test.ts",
  "tests/unit/parity.test.ts",
]

const repo = () => ({
  apps: ALL_APPS.map((app) => app.framework as string),
  built: BUILT as string[],
  componentFiles: Object.fromEntries(
    Object.entries(syntax).map(([framework, { component }]) => [
      framework,
      component("Name"),
    ]),
  ) as Record<string, string>,
  emitters: Object.keys(EMITTERS),
  exports: Object.keys(json("packages/opui/package.json").exports),
  files: [
    ...readdirSync(path.join(root, "packages/opui"))
      .filter((folder) =>
        existsSync(path.join(root, "packages/opui", folder, "index.ts")),
      )
      .map((folder) => `packages/opui/${folder}/index.ts`),
    ...readdirSync(path.join(root, "src/components/Example")).map(
      (file) => `src/components/Example/${file}`,
    ),
    ...readdirSync(path.join(root, "src/docs/guide/getting-started")).map(
      (file) => `src/docs/guide/getting-started/${file}`,
    ),
    ...readdirSync(path.join(root, "tests/package/fixtures")).map(
      (folder) => `tests/package/fixtures/${folder}`,
    ),
    ...readdirSync(root).filter((file) => /^tsconfig\.\w+\.json$/.test(file)),
  ],
  globs: Object.fromEntries(
    GLOB_FILES.map((file) => [
      file,
      [...read(file).matchAll(/["'`][^"'`\n]*\{([\w.,]+)\}["'`]/g)]
        .map(([, list]) => list.split(","))
        .filter((list) => list.includes("astro")),
    ]),
  ),
  ports: PORTS as Record<string, string>,
  renderers: Object.keys(render),
  scripts: Object.keys(json("package.json").scripts),
  typeFiles: TYPE_FILES as Record<string, string>,
  typesOfSyntax: Object.fromEntries(
    Object.entries(syntax).map(([framework, { types }]) => [framework, types]),
  ) as Record<string, string>,
})

type Framework = {
  extension: string
  hydrated: boolean
  id: string
  label: string
  types: string
}

const problemsOf = (
  { extension, hydrated, id, label, types }: Framework,
  facts: ReturnType<typeof repo>,
) => {
  const missing = (found: boolean, message: string) => (found ? [] : [message])
  const file = (name: string, then: string) =>
    missing(facts.files.includes(name), `${name} doesn't exist: ${then}`)
  return [
    ...missing(
      facts.renderers.includes(id),
      `tests/unit/renderers.ts has no render.${id}: add one, so the parity and contract tests render ${label}`,
    ),
    ...missing(
      facts.componentFiles[id] === `Name.${extension}` &&
        facts.typesOfSyntax[id] === types,
      `frameworks.${id} in src/component-api/frameworks.ts must name its component file Name.${extension} and its types ${types}, as EXAMPLE_EXTENSIONS and TYPES_FILES in src/utils/framework.js do`,
    ),
    ...file(
      `packages/opui/${id}/index.ts`,
      `add the barrel that exports every ${label} component`,
    ),
    ...missing(
      facts.exports.includes(`./${id}`),
      `packages/opui/package.json has no "./${id}" export: add it, so opui-css/${id} resolves`,
    ),
    ...file(
      `src/docs/guide/getting-started/${label}.astro`,
      `write the getting-started page for ${label}`,
    ),
    ...file(
      `tests/package/fixtures/${id}`,
      `add a fixture project, so pnpm test:package installs the packed package in ${label}`,
    ),
    ...missing(
      !facts.files.includes(`tsconfig.${id}.json`) ||
        facts.scripts.includes(`typecheck:${id}`),
      `tsconfig.${id}.json has no typecheck:${id} script in package.json: add it, so pnpm typecheck checks the ${label} files`,
    ),
    ...Object.entries(facts.globs).flatMap(([name, lists]) =>
      missing(
        lists.length > 0 && lists.every((list) => list.includes(extension)),
        `${name} has an import.meta.glob pattern without ${extension}: add it to the braces, since a glob can't be built from EXAMPLE_EXTENSIONS`,
      ),
    ),
    ...(hydrated
      ? [
          ...missing(
            facts.ports[id] === `.${extension}` &&
              facts.typeFiles[id] === types,
            `PORTS and TYPE_FILES in scripts/build-components.mjs must map ${id} to .${extension} and ${types}`,
          ),
          ...missing(
            facts.emitters.includes(id),
            `EMITTERS in scripts/build-components.mjs has no ${id}: write scripts/component-${id}.mjs and add its emitter, so pnpm build-components compiles the ${label} files`,
          ),
          ...missing(
            facts.built.includes(id),
            `FRAMEWORKS in packages/opui/scripts/build-frameworks.mjs has no ${id}: build its files into dist`,
          ),
          ...file(
            `src/components/Example/mount-${id}-examples.ts`,
            `mount the ${label} examples on the docs and fixture pages, and hydrate them with ?hydrate`,
          ),
          ...file(
            `src/components/Example/render-${id}.ts`,
            `render the ${label} examples on the fixture page with the framework's own server renderer, so tests/e2e/hydration.spec.ts hydrates them`,
          ),
          ...missing(
            facts.apps.includes(id),
            `tests/apps/apps.ts has no app with framework "${id}": add one, so pnpm test:apps builds the package into a ${label} app`,
          ),
        ]
      : []),
  ]
}

const packageFrameworks = FRAMEWORKS.flatMap(({ id, label }) =>
  id === "html"
    ? []
    : [
        {
          extension: EXAMPLE_EXTENSIONS[id],
          hydrated: isHydratedFramework(id),
          id,
          label,
          types: TYPES_FILES[id],
        },
      ],
)

test("the check flags a framework that is listed but wired up nowhere", () => {
  const facts = repo()
  expect(
    problemsOf(
      {
        extension: "lit.ts",
        hydrated: true,
        id: "lit",
        label: "Lit",
        types: "types.lit.ts",
      },
      { ...facts, files: [...facts.files, "tsconfig.lit.json"] },
    ).map((problem) => problem.split(/[ :]/)[0]),
  ).toEqual([
    "tests/unit/renderers.ts",
    "frameworks.lit",
    "packages/opui/lit/index.ts",
    "packages/opui/package.json",
    "src/docs/guide/getting-started/Lit.astro",
    "tests/package/fixtures/lit",
    "tsconfig.lit.json",
    ...GLOB_FILES,
    "PORTS",
    "EMITTERS",
    "FRAMEWORKS",
    "src/components/Example/mount-lit-examples.ts",
    "src/components/Example/render-lit.ts",
    "tests/apps/apps.ts",
  ])
})

test("the check flags a glob that leaves a framework out", () => {
  const facts = repo()
  const solid = packageFrameworks.find(({ id }) => id === "solid")!
  expect(
    problemsOf(solid, {
      ...facts,
      globs: { "tests/unit/parity.test.ts": [["astro", "react.tsx", "vue"]] },
    }),
  ).toEqual([
    "tests/unit/parity.test.ts has an import.meta.glob pattern without solid.tsx: add it to the braces, since a glob can't be built from EXAMPLE_EXTENSIONS",
  ])
})

test.each(packageFrameworks)(
  "$id is wired up everywhere a framework needs to be",
  (framework) => {
    expect(problemsOf(framework, repo())).toEqual([])
  },
)
