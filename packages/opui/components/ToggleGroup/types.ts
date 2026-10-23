export type Props = {
  name?: string
  orientation?: "horizontal" | "vertical"
  overflow?: "scroll" | "shrink" | "wrap"
  selection?: "single" | "multiple"
  size?: "x-small" | "small" | "medium" | "large"
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
