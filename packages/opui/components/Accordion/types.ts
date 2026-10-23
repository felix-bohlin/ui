export type Props = {
  markerAnimation?: "flip" | "rotate" | "turn"
  variant?: "elevated" | "outlined" | "tonal" | "transparent"
}

export type AccordionActionsProps = {
  align?: "start" | "end"
}

export type AccordionContentProps = {}

export type AccordionSummaryProps = {}

export type AccordionSummarySlots<S> = {
  marker?: S
}
