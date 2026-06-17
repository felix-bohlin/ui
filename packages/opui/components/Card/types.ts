export type Props = {
  actionsAlign?: "start" | "end"
  variant?: "text" | "outlined" | "elevated" | "tonal"
}

export type Slots<S> = {
  actions?: S
  children?: S
  content?: S
  header?: S
}
