export type Props = {
  markerAnimation?: "flip" | "rotate" | "turn"
  variant?: "default" | "outlined" | "elevated" | "tonal"
}

export type Slots<S> = {
  actions?: S
  children: S
  marker?: S
  summary: string | S
}
