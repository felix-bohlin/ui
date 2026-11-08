import { mkdtempSync, readdirSync, readFileSync, statSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import vm from "node:vm"
import { describe, expect, test } from "vitest"
import {
  buildPlugin,
  pluginThemes,
} from "../../packages/figma-plugin/build.mjs"
import { FIGMA_THEMES, figmaFiles } from "../../src/utils/figma-themes"
import { fakeFigma } from "./fake-figma"

const manifest = JSON.parse(
  readFileSync("packages/figma-plugin/manifest.json", "utf8"),
)

test("the package holds a theme file and a file per mode for every recorded theme", () => {
  const folder = "packages/opui/figma/themes"
  const files = readdirSync(folder, { recursive: true })
    .map(String)
    .filter((file) => statSync(join(folder, file)).isFile())
  expect(files.toSorted()).toEqual(figmaFiles().toSorted())
})

describe("the Figma plugin", () => {
  const out = buildPlugin(mkdtempSync(join(tmpdir(), "opui-figma-")))
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
    const themes = pluginThemes()
    expect(themes.map(({ id }) => id)).toEqual(FIGMA_THEMES.map(({ id }) => id))
    expect(themes.find(({ id }) => id === "default")?.label).toBe("Default")
    expect(ui).not.toContain("__THEMES__")
    expect(ui).toContain('"collection":"opui"')
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
    const [{ theme }] = pluginThemes()
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
      theme: pluginThemes()[0].theme,
      type: "sync",
    })
    expect(posted).toEqual([
      { message: "Pick at least one mode.", type: "error" },
    ])
  })
})
