import { mkdtempSync, readdirSync, readFileSync, statSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import vm from "node:vm"
import { describe, expect, test } from "vitest"
import {
  buildPlugin,
  PACKAGED,
  pluginTheme,
  pluginThemes,
} from "../../packages/figma-plugin/build.mjs"
import {
  FIGMA_THEMES,
  figmaFiles,
  figmaThemeFile,
} from "../../src/utils/figma-themes"
import { fakeFigma } from "./fake-figma"

const manifest = JSON.parse(
  readFileSync("packages/figma-plugin/manifest.json", "utf8"),
)

test("the package holds the default theme's file and a file per mode", () => {
  const folder = "packages/opui/figma/themes"
  const files = readdirSync(folder, { recursive: true })
    .map(String)
    .filter((file) => statSync(join(folder, file)).isFile())
  expect(files.toSorted()).toEqual(figmaFiles(["default"]).toSorted())
})

describe("the Figma plugin", () => {
  const themes = FIGMA_THEMES.map(({ id }) =>
    pluginTheme(id, figmaThemeFile(id)),
  )
  const out = buildPlugin(mkdtempSync(join(tmpdir(), "opui-figma-")), themes)
  const code = readFileSync(join(out, "code.js"), "utf8")
  const ui = readFileSync(join(out, "ui.html"), "utf8")

  test("its manifest points at the built files and asks for no network", () => {
    expect(manifest).toMatchObject({
      documentAccess: "dynamic-page",
      editorType: ["figma"],
      main: "dist/code.js",
      networkAccess: { allowedDomains: ["none"] },
      ui: "dist/ui.html",
    })
  })

  test("its UI holds every recorded theme", () => {
    const embedded = JSON.parse(
      ui.match(
        /<script id="themes" type="application\/json">([\s\S]*?)<\/script>/,
      )![1],
    )
    expect(embedded.map(({ id }: { id: string }) => id)).toEqual(
      FIGMA_THEMES.map(({ id }) => id),
    )
    expect(
      embedded.find(({ id }: { id: string }) => id === "default")?.label,
    ).toBe("Default")
  })

  test("builds from the default theme in the package before a docs build", () => {
    expect(pluginThemes(PACKAGED).map(({ id }) => id)).toEqual(["default"])
  })

  test("syncs the theme the UI sends and reports back", async () => {
    const fake = fakeFigma({ modeLimit: 1 })
    const posted: unknown[] = []
    const figma = {
      ...fake.figma,
      showUI: () => undefined,
      ui: {
        onmessage: undefined as unknown,
        postMessage: (message: unknown) => posted.push(message),
      },
    }
    vm.runInContext(code, vm.createContext({ __html__: ui, figma }))
    const [{ theme }] = pluginThemes(PACKAGED)
    await (figma.ui.onmessage as (message: unknown) => Promise<void>)({
      options: { modes: ["light", "dark"] },
      theme,
      type: "sync",
    })
    expect(posted).toEqual([
      expect.objectContaining({
        report: expect.objectContaining({
          collections: [
            expect.objectContaining({ modes: ["Light"] }),
            expect.objectContaining({ modes: ["Dark"] }),
          ],
        }),
        type: "done",
      }),
    ])
  })

  test("reports an error to the UI", async () => {
    const posted: unknown[] = []
    const figma = {
      ...fakeFigma().figma,
      showUI: () => undefined,
      ui: {
        onmessage: undefined as unknown,
        postMessage: (message: unknown) => posted.push(message),
      },
    }
    vm.runInContext(code, vm.createContext({ __html__: ui, figma }))
    await (figma.ui.onmessage as (message: unknown) => Promise<void>)({
      options: { modes: [] },
      theme: pluginThemes(PACKAGED)[0].theme,
      type: "sync",
    })
    expect(posted).toEqual([
      { message: "Pick at least one mode.", type: "error" },
    ])
  })
})
