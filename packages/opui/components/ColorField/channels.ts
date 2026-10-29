const color = [
  { channel: "l", label: "Lightness", max: 1, name: "lightness", step: 0.001 },
  { channel: "c", label: "Chroma", max: 0.37, name: "chroma", step: 0.001 },
  { channel: "h", label: "Hue", max: 360, name: "hue", step: 0.1 },
]

const opacity = {
  channel: "alpha",
  label: "Opacity",
  max: 1,
  name: "opacity",
  step: 0.01,
}

export const COLOR_SPACES = [
  "a98-rgb",
  "display-p3",
  "hex",
  "hsl",
  "hwb",
  "lab",
  "lch",
  "oklab",
  "oklch",
  "prophoto-rgb",
  "rec2020",
  "rgb",
  "srgb-linear",
  "xyz",
  "xyz-d50",
  "xyz-d65",
]

export const channelsFor = (
  opacitySlider: "none" | "slider" = "slider",
  labels: Partial<Record<string, string>> = {},
) =>
  (opacitySlider === "none" ? color : [...color, opacity]).map((slider) => ({
    ...slider,
    label: labels[slider.name] ?? slider.label,
  }))
