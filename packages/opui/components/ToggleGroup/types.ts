export type Props = {
  multiple?: boolean
  name?: string
  orientation?: "horizontal" | "vertical"
  overflow?: "scroll" | "shrink" | "wrap"
  size?: "x-small" | "small" | "medium" | "large"
}

export type Context = {
  change: (input: HTMLInputElement) => void
  groupName: string
  inputType: "checkbox" | "radio"
  value?: string | string[]
}

export type Selection<Single, Multiple> =
  ({ multiple?: false } & Single) | ({ multiple: true } & Multiple)
