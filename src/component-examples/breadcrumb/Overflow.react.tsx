import { Breadcrumb } from "opui-css/react"

const items = [
  { href: "#", label: "Marketplace" },
  { href: "#", label: "Basses" },
  { href: "#", label: "Five-string" },
  { href: "#", label: "Fretless" },
  { label: "Sandberg VM5" },
]

export default function Overflow() {
  return (
    <>
      <Breadcrumb
        aria-label="Breadcrumb"
        items={items}
        overflow="wrap"
        style={{ maxInlineSize: "20rem" }}
      />
      <Breadcrumb
        aria-label="Breadcrumb"
        items={items}
        overflow="scroll"
        style={{ maxInlineSize: "20rem" }}
      />
      <Breadcrumb
        aria-label="Breadcrumb"
        items={items}
        overflow="shrink"
        style={{ maxInlineSize: "20rem" }}
      />
    </>
  )
}
