export type Props = {
  name?: string
  orientation?: "horizontal" | "vertical"
  scrollable?: boolean
  selection?: "single" | "multiple"
  shrink?: boolean
  size?: "x-small" | "small" | "large"
}

export type Context = {
  change: (input: HTMLInputElement) => void
  groupName: string
  inputType: "checkbox" | "radio"
  value?: string | string[]
}

export type Selection<Single, Multiple> =
  ({ selection: "single" } & Single) | ({ selection?: "multiple" } & Multiple)

export type Slots<S> = {
  children?: S
}
