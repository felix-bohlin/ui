export type BreadcrumbItemProps = {
  current?: boolean
  href?: string
  label?: string
}

export type BreadcrumbItemData = {
  current?: boolean
  href?: string
  label: string
}

export type Props = {
  size?: "small" | "medium"
} & ({ "aria-label": string } | { "aria-labelledby": string }) &
  (
    | {
        items: BreadcrumbItemData[]
        menuLabel: string
        overflow: "menu"
      }
    | {
        items?: never
        menuLabel?: never
        overflow: "menu"
      }
    | {
        items?: BreadcrumbItemData[]
        menuLabel?: never
        overflow?: "scroll" | "shrink" | "wrap"
      }
  )

export type Slots<S> = {
  separator?: S
}

export type BreadcrumbItemSlots<S> = {
  separator?: S
}
