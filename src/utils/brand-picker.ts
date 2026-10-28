import { exampleTheme } from "./example-themes"
import { presetBrand } from "./theme"

export const CUSTOM_COLOR = "Custom color"

export const syncBrandPicker = (
  picker: HTMLElement,
  preset: string | null,
  brand: string | null,
) => {
  const label = exampleTheme(preset)?.label
  const name = label ? `${label} default` : "Default"
  const start = picker.querySelector<HTMLElement>("[data-brand-start]")!
  start.title = name
  start.querySelector("input")!.setAttribute("aria-label", name)
  start.style.setProperty(
    "--swatch",
    presetBrand(preset) ?? picker.dataset.default ?? "",
  )

  const radios = [
    ...picker.querySelectorAll<HTMLInputElement>("input[type=radio]"),
  ]
  const match =
    brand === null
      ? radios[0]
      : radios.find(
          (radio) =>
            radio.value !== "" &&
            radio.value.toLowerCase() === brand.toLowerCase(),
        )
  for (const radio of radios) radio.checked = radio === match
  const trigger = picker.querySelector(
    '.brand-custom > button[command="toggle-popover"]',
  )!
  if (match) trigger.removeAttribute("aria-current")
  else trigger.setAttribute("aria-current", "true")
}
