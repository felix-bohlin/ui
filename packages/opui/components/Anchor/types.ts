export type Props = {
  positionArea?: string
} & (
  | {
      trigger?: never
    }
  | {
      id: string
      trigger: "hover"
    }
)

export type AnchorContentProps = {
  popover?: "auto" | "hint" | "manual"
}

export type Context = {
  floatingId?: string
  popover?: "hint"
}
