import { Breadcrumb } from "opui-css/react"

const deepFive = [
  { href: "#", label: "Marketplace" },
  { href: "#", label: "Basses" },
  { href: "#", label: "Five-string" },
  { href: "#", label: "Fretless" },
  { label: "Deep Five" },
]

const nightFive = [
  { href: "#", label: "Marketplace" },
  { href: "#", label: "Basses" },
  { href: "#", label: "Five-string" },
  { href: "#", label: "Fretless" },
  { label: "Night Five" },
]

const mossFive = [
  { href: "#", label: "Marketplace" },
  { href: "#", label: "Basses" },
  { href: "#", label: "Five-string" },
  { href: "#", label: "Fretless" },
  { label: "Moss Five" },
]

export default function Overflow() {
  return (
    <>
      <Breadcrumb
        aria-label="Deep Five breadcrumb"
        items={deepFive}
        overflow="wrap"
        style={{ maxInlineSize: "20rem" }}
      />
      <Breadcrumb
        aria-label="Night Five breadcrumb"
        items={nightFive}
        overflow="scroll"
        style={{ maxInlineSize: "20rem" }}
      />
      <Breadcrumb
        aria-label="Moss Five breadcrumb"
        items={mossFive}
        overflow="shrink"
        style={{ maxInlineSize: "20rem" }}
      />
    </>
  )
}
