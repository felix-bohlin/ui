export type Props = {
  actionsAlign?: "start" | "end"
  variant?: "text" | "outlined" | "elevated" | "tonal"
}

export type Slots<S> = {
  actions?: S
  content?: S
  header?: S
}
