import { hexToOklch, oklchToHex } from "./color-utils"
import {
  TOKENS,
  tokenDefaults,
  type Mode,
  type ModeConfig,
  type Token,
} from "./theme-store"

const SOURCE_CHROMA = 0.21
const SOURCE_LIGHTNESS = 0.58
const SOURCE_NAME = "--palette-source-color"
const GRAYS_NAME = "enable-grays"
const REFERENCE_NAME = "reference-theme"

type RangeField = {
  label: string
  max: number
  min: number
  step: number
  suffix?: string
  token: Token
}

export const PALETTE_FIELDS = [
  {
    label: "Hue",
    max: 360,
    min: 0,
    step: 1,
    suffix: "°",
    token: "--ui-palette-hue",
  },
  { label: "Chroma", max: 1, min: 0, step: 0.01, token: "--ui-palette-chroma" },
  {
    label: "Hue rotation",
    max: 10,
    min: -10,
    step: 1,
    token: "--ui-palette-hue-rotate-by",
  },
] satisfies RangeField[]

export const GRAY_FIELDS = [
  {
    label: "Gray chroma",
    max: 0.1,
    min: 0,
    step: 0.001,
    token: "--ui-gray-chroma",
  },
  {
    label: "Gray hue",
    max: 360,
    min: 0,
    step: 1,
    suffix: "°",
    token: "--ui-gray-hue",
  },
] satisfies RangeField[]

export const RADIUS_FIELDS = [
  { label: "Border radius", token: "--ui-border-radius" },
  { label: "Field border radius", token: "--ui-field-border-radius" },
  { label: "Button border radius", token: "--ui-button-border-radius" },
] satisfies { label: string; token: Token }[]

const TOKEN_SET = new Set<string>(TOKENS)

const isToken = (name: string): name is Token => TOKEN_SET.has(name)

export const sourceColor = (
  mode: Mode,
  config: ModeConfig = {},
  defaults = tokenDefaults(mode),
) => {
  const hue = parseFloat(
    config["--ui-palette-hue"] ?? defaults["--ui-palette-hue"],
  )
  const chroma = parseFloat(
    config["--ui-palette-chroma"] ?? defaults["--ui-palette-chroma"],
  )
  return oklchToHex(SOURCE_LIGHTNESS, SOURCE_CHROMA * chroma, hue)
}

const paletteFromSource = (hex: string) => {
  const { C, H } = hexToOklch(hex)
  return [
    ["--ui-palette-hue", String(Math.round(H))],
    ["--ui-palette-chroma", String(+Math.min(1, C / SOURCE_CHROMA).toFixed(2))],
  ] as const
}

type Handlers = {
  setGrays: (enabled: boolean) => void
  setReferenceTheme: (name: string | null) => void
  setToken: (token: Token, value: string) => void
}

export const themeForm = (
  form: HTMLFormElement,
  { setGrays, setReferenceTheme, setToken }: Handlers,
) => {
  let picking = false

  const input = (name: string) =>
    form.querySelector<HTMLInputElement>(`[name="${name}"]`)!

  const setGrayInputsDisabled = (disabled: boolean) => {
    for (const field of GRAY_FIELDS) input(field.token).disabled = disabled
  }

  form.addEventListener("input", (event) => {
    const target = event.target
    if (!(target instanceof HTMLInputElement)) return

    if (target.name === REFERENCE_NAME) {
      if (target.checked)
        setReferenceTheme(target.value === "default" ? null : target.value)
    } else if (target.name === GRAYS_NAME) {
      setGrays(target.checked)
      setGrayInputsDisabled(!target.checked)
    } else if (target.name === SOURCE_NAME) {
      picking = true
      for (const [token, value] of paletteFromSource(target.value))
        setToken(token, value)
    } else if (isToken(target.name)) {
      setToken(target.name, target.value)
    }
  })

  form.addEventListener("change", (event) => {
    if ((event.target as HTMLInputElement).name === SOURCE_NAME) picking = false
  })

  const sync = (
    mode: Mode,
    config: ModeConfig,
    defaults = tokenDefaults(mode),
    reference: string | null = null,
  ) => {
    for (const field of form.querySelectorAll<HTMLInputElement>(
      `[name="${REFERENCE_NAME}"]`,
    )) {
      field.checked = field.value === (reference ?? "default")
    }

    for (const token of TOKENS) {
      const value = config[token] ?? defaults[token]
      for (const field of form.querySelectorAll<HTMLInputElement>(
        `[name="${token}"]`,
      )) {
        if (field.type === "radio") {
          field.checked = field.value === value
        } else {
          field.value = value
          field.dispatchEvent(new Event("input"))
        }
      }
    }

    const graysEnabled = config["enable-grays"] !== "false"
    input(GRAYS_NAME).checked = graysEnabled
    setGrayInputsDisabled(!graysEnabled)

    if (!picking) input(SOURCE_NAME).value = sourceColor(mode, config, defaults)
  }

  return { sync }
}
