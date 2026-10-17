export type Props = {
  name?: string
  orientation?: "vertical"
  scrollable?: boolean
  selection?: "single" | "multiple"
  shrink?: boolean
  size?: "x-small" | "small" | "large"
}

export type Selection<Single, Multiple> =
  ({ selection: "single" } & Single) | ({ selection?: "multiple" } & Multiple)

export type Slots<S> = {
  children?: S
}
