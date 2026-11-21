import type { APIRoute } from "astro"
import { strToU8, zipSync } from "fflate"
import { pluginFiles, pluginTheme } from "../../packages/figma-plugin/build.mjs"
import manifest from "../../packages/figma-plugin/manifest.json?raw"
import main from "../../packages/figma-plugin/src/main.js?raw"
import ui from "../../packages/figma-plugin/src/ui.html?raw"
import sync from "../../packages/opui/figma/sync.js?raw"
import { FIGMA_THEMES, figmaThemeFile } from "../utils/figma-themes"

export const GET: APIRoute = () => {
  const files = pluginFiles({
    main,
    sync,
    themes: FIGMA_THEMES.map(({ id }) => pluginTheme(id, figmaThemeFile(id))),
    ui,
  })
  const zip = zipSync(
    {
      "opui-figma-plugin/dist/code.js": strToU8(files["code.js"]),
      "opui-figma-plugin/dist/ui.html": strToU8(files["ui.html"]),
      "opui-figma-plugin/manifest.json": strToU8(manifest),
    },
    { mtime: new Date("2026-01-01T00:00:00Z") },
  )
  return new Response(new Uint8Array(zip), {
    headers: { "Content-Type": "application/zip" },
  })
}
