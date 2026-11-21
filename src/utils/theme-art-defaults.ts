import themeCss from "../../packages/opui/css/theme.css?raw"
import { UNSET_VALUES, libraryDefaults } from "./theme-builder-controls"

const knob = (token: string) =>
  themeCss.match(new RegExp(`${token}:\\s*([\\d.]+);`))?.[1]

export const artDefaults = () => {
  const chroma = Number(knob("--ui-palette-chroma") ?? 0.5)
  return {
    ...UNSET_VALUES,
    ...libraryDefaults(themeCss),
    "--ui-palette-source": `oklch(0.58 ${+(0.21 * chroma).toFixed(3)} ${knob("--ui-palette-hue") ?? 145})`,
  }
}
