export type Props = {
  author?: string
  datetime?: string
  newAuthor?: boolean
  outgoing?: boolean
  time?: string
  typing?: boolean
}

export type MessageListProps = {
  /** A chat between two people: no message shows its author's name or avatar, since the chat's own title names the other person. Screen readers still hear who wrote each message. */
  direct?: boolean
}

export type Slots<S> = {
  bottom?: S
  end?: S
  start?: S
}
