export type Props = {
  actionsAlign?: "start" | "end"
}

export type Slots<S> = {
  actions?: S
  children?: S
  content?: S
  header?: string | S
}
