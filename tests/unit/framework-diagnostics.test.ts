import { readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { format, stripVTControlCharacters } from "node:util"
import type { ComponentType } from "react"
import type { Component as SvelteComponent } from "svelte"
import { compile } from "svelte/compiler"
import type { Component as VueComponent } from "vue"
import { compileScript, compileTemplate, parse } from "vue/compiler-sfc"
import { afterAll, describe, expect, test, vi } from "vitest"
import type { ComponentApi } from "../../src/component-api/types"
import allowlist from "./framework-diagnostics-allowlist.json"
import NestedParagraphSvelte from "./fixtures/NestedParagraph.svelte"
import { contentOf, render, TEXT } from "./renderers"

const FRAMEWORKS = ["react", "svelte", "vue"] as const

type Framework = (typeof FRAMEWORKS)[number]

type Module = { default: unknown }

const apis = import.meta.glob<ComponentApi>(
  "../../src/component-api/*/api.ts",
  { eager: true, import: "default" },
)

const modules: Record<Framework, Record<string, () => Promise<Module>>> = {
  react: import.meta.glob<{ default: ComponentType }>([
    "../../packages/opui/components/*/*.react.tsx",
    "../../src/blocks/**/*.react.tsx",
    "../../src/component-examples/**/*.react.tsx",
    "./fixtures/*.react.tsx",
  ]),
  svelte: import.meta.glob<{ default: SvelteComponent }>([
    "../../packages/opui/components/*/*.svelte",
    "../../src/blocks/**/*.svelte",
    "../../src/component-examples/**/*.svelte",
    "./fixtures/*.svelte",
  ]),
  vue: import.meta.glob<{ default: VueComponent }>([
    "../../packages/opui/components/*/*.vue",
    "../../src/blocks/**/*.vue",
    "../../src/component-examples/**/*.vue",
    "./fixtures/*.vue",
  ]),
}

const SLOTS = new Map(
  Object.values(apis).flatMap((api) => [
    ...api.parts
      .filter((part) => part.component)
      .map((part) => [part.component!, part.slots ?? ["default"]] as const),
    [
      api.component,
      [
        ...(api.slots ?? []).map(({ name }) => name),
        ...api.parts.flatMap((part) => part.slots ?? []),
      ],
    ] as const,
  ]),
)

const ALLOWED = Object.keys(allowlist).map(
  (source) => [source, new RegExp(source)] as const,
)

const matched = new Set<string>()

const warn = vi.spyOn(console, "warn").mockImplementation(() => {})
const error = vi.spyOn(console, "error").mockImplementation(() => {})

const logged = () => {
  const messages = [...warn.mock.calls, ...error.mock.calls].map((args) =>
    format(...args),
  )
  warn.mockClear()
  error.mockClear()
  return messages
}

const unknown = (messages: string[]) =>
  [...new Set(messages)].filter((message) => {
    if (message.startsWith("[OPUI ")) return false
    const known = ALLOWED.find(([, pattern]) => pattern.test(message))
    if (known) matched.add(known[0])
    return !known
  })

const fileOf = (path: string) =>
  fileURLToPath(new URL(path, import.meta.url)).replaceAll("\\", "/")

const nameOf = (path: string) =>
  path
    .split("/")
    .at(-1)!
    .replace(/(\.react|\.solid)?\.[a-z]+$/, "")

const compilers: Record<Framework, (file: string) => string[]> = {
  react: () => [],
  svelte: (file) =>
    compile(readFileSync(file, "utf8"), {
      dev: true,
      filename: file,
      generate: "server",
    }).warnings.map(({ code, message }) => `${code}: ${message}`),
  vue: (file) => {
    const { descriptor, errors } = parse(readFileSync(file, "utf8"), {
      filename: file,
    })
    logged()
    const compiled =
      descriptor.script || descriptor.scriptSetup
        ? (compileScript(descriptor, { id: file, inlineTemplate: true })
            .warnings ?? [])
        : compileTemplate({
            filename: file,
            id: file,
            source: descriptor.template?.content ?? "",
          }).tips.map(String)
    return [
      ...errors.map((problem) => problem.message),
      ...compiled,
      ...logged(),
    ].map((message) => stripVTControlCharacters(message))
  },
}

const requiredProps = (component: unknown) =>
  Object.fromEntries(
    Object.entries(
      (component as { props?: Record<string, { required?: boolean }> }).props ??
        {},
    )
      .filter(([, options]) => options.required)
      .map(([name]) => [name, TEXT]),
  )

const diagnostics = async (framework: Framework, path: string) => {
  const compiled = compilers[framework](fileOf(path))
  const { default: component } = await modules[framework][path]()
  const name = nameOf(path)
  const slots = path.includes("/packages/")
    ? (SLOTS.get(name) ?? ["default"])
    : []
  const props = requiredProps(component)
  logged()
  await render[framework](component, props)
  if (slots.length > 0) {
    await render[framework](
      component,
      props,
      Object.fromEntries(slots.map((slot) => [slot, contentOf(name)])),
    )
  }
  return unknown([...compiled, ...logged()])
}

const SAMPLES: Record<Framework, { message: string; path: string }[]> = {
  react: [
    {
      message:
        "You provided a `value` prop to a form field without an `onChange` handler",
      path: "./fixtures/ReadOnlyValue.react.tsx",
    },
  ],
  svelte: [
    {
      message: "a11y_missing_attribute",
      path: "./fixtures/MissingAlt.svelte",
    },
    {
      message: "node_invalid_placement_ssr",
      path: "./fixtures/NestedParagraph.svelte",
    },
  ],
  vue: [
    {
      message: "[Vue warn]: Invalid prop",
      path: "./fixtures/InvalidProp.vue",
    },
    {
      message: "<span> cannot be child of <select>",
      path: "./fixtures/SelectSpan.vue",
    },
  ],
}

afterAll(() => {
  warn.mockRestore()
  error.mockRestore()
})

test("Vitest compiles Svelte components in development mode", () => {
  expect(String(NestedParagraphSvelte)).toContain("push_element")
})

describe.each(FRAMEWORKS)(
  "the development build of %s reports no diagnostic",
  (framework) => {
    test.each(SAMPLES[framework])(
      "$path is reported, so the check can fail",
      async ({ message, path }) => {
        expect(await diagnostics(framework, path)).toEqual([
          expect.stringContaining(message),
        ])
      },
    )

    test.each(
      Object.keys(modules[framework])
        .filter((path) => !path.startsWith("./fixtures/"))
        .toSorted()
        .map((path) => [path.replace("../../", ""), path]),
    )("%s", async (_, path) => {
      expect(await diagnostics(framework, path)).toEqual([])
    })
  },
)

test("every allowed diagnostic is still reported", () => {
  expect(
    Object.keys(allowlist).filter((pattern) => !matched.has(pattern)),
    "nothing reports these now: remove them from tests/unit/framework-diagnostics-allowlist.json",
  ).toEqual([])
})
