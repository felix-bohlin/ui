export type Props = {
  actionsAlign?: "start" | "end"
  variant?: "text" | "outlined" | "elevated" | "tonal"
}

export type Slots<S> = {
  action?: S
  header?: S
  children?: S
  content?: S
}
