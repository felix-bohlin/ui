export type Props = {
  actionsAlign?: "start" | "end"
}

export type Slots<S> = {
  actions?: S
  content?: S
  header?: string | S
}
