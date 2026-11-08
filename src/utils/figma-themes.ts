import { exampleTheme } from "./example-themes"
import type { FigmaProbe } from "./figma-probe"
import { FIGMA_MODES, figmaModeFiles, figmaTheme } from "./figma-tokens"
import { tokensJson } from "./tokens-json"

const probes = import.meta.glob<FigmaProbe>("../figma/*.json", {
  eager: true,
  import: "default",
})

export const FIGMA_THEMES = Object.entries(probes)
  .map(([path, probe]) => {
    const id = path.match(/([^/]+)\.json$/)![1]
    const label = id === "default" ? "Default" : (exampleTheme(id)?.label ?? id)
    return {
      collection: id === "default" ? "opui" : `opui ${label}`,
      id,
      label,
      probe,
    }
  })
  .toSorted((a, b) => a.id.localeCompare(b.id))

export const figmaThemeFile = (id: string) => {
  const theme = FIGMA_THEMES.find((entry) => entry.id === id)
  if (!theme) throw new Error(`No recorded Figma probe for the ${id} theme`)
  return figmaTheme(tokensJson(), theme.probe, theme.collection)
}

export const figmaModeFile = (id: string, mode: string) =>
  figmaModeFiles(figmaThemeFile(id))[mode]

export const figmaFiles = (ids = FIGMA_THEMES.map(({ id }) => id)) =>
  ids.flatMap((id) => [
    `${id}.figma.json`,
    ...FIGMA_MODES.map((mode) => `${id}/${mode.id}.tokens.json`),
  ])
