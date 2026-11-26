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
  items?: BreadcrumbItemData[]
  overflow?: "scroll" | "shrink" | "wrap"
  size?: "small" | "medium"
} & ({ "aria-label": string } | { "aria-labelledby": string })

export type Slots<S> = {
  separator?: S
}

export type BreadcrumbItemSlots<S> = {
  separator?: S
}
