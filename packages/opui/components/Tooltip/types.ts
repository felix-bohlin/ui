export type Props = {
  [key: string]: any
  alignment?: string
  arrow?: boolean
  id?: string
  label?: string
}

export type Slots<S> = {
  content?: S
}
