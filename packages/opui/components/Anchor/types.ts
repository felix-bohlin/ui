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

export type AnchorContentProps = {}

export type Context = {
  floatingId?: string
  popover?: "hint"
}
