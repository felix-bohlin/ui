import { readdirSync, readFileSync } from "node:fs"
import { createRequire } from "node:module"
import { join, relative } from "node:path"
import { fileURLToPath } from "node:url"
import { afterAll, beforeAll, describe, expect, test, vi } from "vitest"
import { createViteServer } from "vitest/node"

const root = fileURLToPath(new URL("../..", import.meta.url))
const renderer = fileURLToPath(
  new URL("./solid-dev-renderer.ts", import.meta.url),
)
const require = createRequire(import.meta.url)
const { transform } = createRequire(require.resolve("@solidjs/vite-plugin"))(
  "@solidjs/compiler",
)

const solidFiles = (folder: string): string[] =>
  readdirSync(join(root, folder), { withFileTypes: true })
    .flatMap((entry) =>
      entry.isDirectory()
        ? solidFiles(join(folder, entry.name))
        : entry.name.endsWith(".solid.tsx")
          ? [join(folder, entry.name)]
          : [],
    )
    .toSorted()

const propsRead = (source: string) => [
  ...new Set(
    [
      ...source.matchAll(/\bprops\.([A-Za-z_$][\w$]*)|\bprops\["([^"]+)"\]/g),
    ].map(([, name, quoted]) => name ?? quoted),
  ),
]

const slotsRead = (source: string) => [
  "children",
  ...[
    ...source.matchAll(/\bchildren\(\(\) => props\.([A-Za-z_$][\w$]*)\)/g),
  ].map(([, name]) => name),
]

type Runtime = {
  createRoot: (fn: (dispose: () => void) => () => void) => () => void
  createSignal: <T>(value: T) => [() => T, (value: T) => void]
  flush: () => void
}

type Renderer = {
  createComponent: (component: unknown, props: object) => unknown
  createElement: (tag: string) => object
  insert: (parent: object, value: () => unknown) => void
}

let server: Awaited<ReturnType<typeof createViteServer>>
let runtime: Runtime
let rendered: Renderer

const warn = vi.spyOn(console, "warn").mockImplementation(() => {})
const error = vi.spyOn(console, "error").mockImplementation(() => {})

const diagnostics = () =>
  [...warn.mock.calls, ...error.mock.calls]
    .map(([message]) => String(message))
    .filter((message) => !message.startsWith("[OPUI "))

const render = async (file: string) => {
  const { default: component } = await server.ssrLoadModule(join(root, file))
  const source = readFileSync(join(root, file), "utf8")
  const slots = slotsRead(source)
  warn.mockClear()
  error.mockClear()
  const [filled, setFilled] = runtime.createSignal(false)
  const props = Object.defineProperties(
    {},
    Object.fromEntries(
      propsRead(source).map((name) => [
        name,
        {
          enumerable: true,
          get: () => (filled() && slots.includes(name) ? "Text" : undefined),
        },
      ]),
    ),
  )
  const dispose = runtime.createRoot((stop) => {
    rendered.insert(rendered.createElement("main"), () =>
      rendered.createComponent(component, props),
    )
    return stop
  })
  runtime.flush()
  setFilled(true)
  runtime.flush()
  dispose()
  return diagnostics()
}

beforeAll(async () => {
  server = await createViteServer({
    appType: "custom",
    configFile: false,
    logLevel: "silent",
    optimizeDeps: { noDiscovery: true },
    plugins: [
      {
        enforce: "pre",
        name: "solid-universal",
        transform: (code, id) =>
          id.endsWith(".solid.tsx")
            ? transform(code, {
                dev: true,
                filename: id,
                generate: "universal",
                moduleName: renderer,
              }).code
            : undefined,
      },
    ],
    resolve: {
      alias: [
        { find: /^@solidjs\/web$/, replacement: renderer },
        {
          find: /^opui-css\/solid$/,
          replacement: join(root, "packages/opui/solid/index.ts"),
        },
      ],
    },
    root,
    server: { hmr: false, middlewareMode: true, watch: null, ws: false },
    ssr: {
      noExternal: ["solid-js", "@solidjs/signals"],
      resolve: {
        conditions: ["browser", "development"],
        externalConditions: ["browser", "development"],
      },
    },
  })
  runtime = (await server.ssrLoadModule("solid-js")) as Runtime
  rendered = (await server.ssrLoadModule(renderer)) as Renderer
}, 120_000)

afterAll(async () => {
  warn.mockRestore()
  error.mockRestore()
  await server.close()
})

describe("Solid's development build reports no diagnostic", () => {
  test("a prop read in a component body is reported, so the check can fail", async () => {
    expect(await render("tests/unit/fixtures/StrictRead.solid.tsx")).toEqual([
      expect.stringContaining("[STRICT_READ_UNTRACKED]"),
    ])
  })

  test.each(
    [
      ...solidFiles("packages/opui/components"),
      ...solidFiles("src/component-examples"),
    ].map((file) => [relative(root, join(root, file))]),
  )("%s", async (file) => {
    expect(await render(file)).toEqual([])
  })
})
