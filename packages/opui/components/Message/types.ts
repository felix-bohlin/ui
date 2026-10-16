export type Emoji = {
  emoji: string
  label: string
  value?: string
}

export type Reaction = {
  count: number
  emoji: string
  label: string
  mine?: boolean
  value?: string
}

export type Props = {
  author?: string
  datetime?: string
  newAuthor?: boolean
  outgoing?: boolean
  picker?: Emoji[]
  pickerLabel?: string
  reactions?: Reaction[]
  reactionsLabel?: string
  time?: string
  typing?: boolean
}

export type MessagesProps = {
  label?: string
}

export type Slots<S> = {
  avatar?: S
  children?: S
  footer?: S
}
