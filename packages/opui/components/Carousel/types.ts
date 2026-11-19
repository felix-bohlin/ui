export type Props = {
  align?: "start" | "center"
  aspectRatio?: number | string
  buttons?: "inside" | "none" | "outside"
  itemsPerView?: number
  nextLabel?: string
  orientation?: "horizontal" | "vertical"
  peek?: boolean
  persistentButtons?: boolean
  previousLabel?: string
  stretch?: boolean
} & ({ "aria-label": string } | { "aria-labelledby": string }) &
  (
    | {
        markerLabel?: string
        markers: boolean
      }
    | {
        markerLabel?: never
        markers?: never
      }
  )
