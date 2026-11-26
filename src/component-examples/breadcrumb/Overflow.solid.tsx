/** @jsxImportSource @solidjs/web */
import { Breadcrumb } from "opui-css/solid"

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
        style="max-inline-size: 20rem"
      />
      <Breadcrumb
        aria-label="Breadcrumb"
        items={items}
        overflow="scroll"
        style="max-inline-size: 20rem"
      />
      <Breadcrumb
        aria-label="Breadcrumb"
        items={items}
        overflow="shrink"
        style="max-inline-size: 20rem"
      />
    </>
  )
}
