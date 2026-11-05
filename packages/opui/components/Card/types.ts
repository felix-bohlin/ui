export type Props = {
  color?: "primary"
  density?: "dense" | "normal" | "spacious"
  orientation?: "horizontal" | "vertical"
  variant?: "elevated" | "outlined" | "plain" | "tonal" | "transparent"
}

export type CardActionsProps = {
  align?: "start" | "end"
}

export type CardContentProps = {}

export type CardHeaderProps = {
  as?: "div" | "hgroup"
}
