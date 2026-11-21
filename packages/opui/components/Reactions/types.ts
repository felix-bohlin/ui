import type { ReactionDetail } from "../../elements/reactions.js"

export type ReactionsItem = {
  "aria-label": string
  checked?: boolean
  label: string
  value: string
}

export type Props = {
  items?: ReactionsItem[]
  name?: string
  quick?: ReactionsItem
} & ({ "aria-label": string } | { "aria-labelledby": string })

export type Events = {
  reaction: CustomEvent<ReactionDetail>
}

export type { ReactionDetail }
