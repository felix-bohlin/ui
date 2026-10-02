export type Props = {
  name?: string
  orientation?: "vertical"
  scrollable?: boolean
  selection?: "single" | "multiple"
  shrink?: boolean
  size?: "default" | "x-small" | "small" | "large"
}

export type Slots<S> = {
  children: S
}

export type ToggleContext = {
  groupName: string
  inputType: "radio" | "checkbox"
}
