export type Props = {
  author?: string
  datetime?: string
  newAuthor?: boolean
  outgoing?: boolean
  time?: string
  typing?: boolean
}

export type MessageListProps = {}

export type Slots<S> = {
  bottom?: S
  end?: S
  start?: S
}
