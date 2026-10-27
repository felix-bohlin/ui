const color = [
  { channel: "L", label: "Lightness", max: 1, name: "lightness", step: 0.001 },
  { channel: "C", label: "Chroma", max: 0.37, name: "chroma", step: 0.001 },
  { channel: "H", label: "Hue", max: 360, name: "hue", step: 0.1 },
]

const opacity = {
  channel: "alpha",
  label: "Opacity",
  max: 1,
  name: "opacity",
  step: 0.01,
}

export const channelsFor = (alpha?: boolean) =>
  alpha ? [...color, opacity] : color
