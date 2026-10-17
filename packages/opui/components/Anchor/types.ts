export type Props = {
  alignment?: string
} & (
  | {
      trigger?: "always"
    }
  | {
      id: string
      trigger: "hover"
    }
)

export type AnchorContentProps = {}
