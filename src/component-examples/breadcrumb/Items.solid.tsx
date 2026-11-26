/** @jsxImportSource @solidjs/web */
import { Breadcrumb } from "opui-css/solid"

const items = [
  { href: "#", label: "Groups" },
  { href: "#", label: "Low End Society" },
  { href: "#", label: "Events" },
  { label: "Friday jam night" },
]

export default function Items() {
  return <Breadcrumb aria-label="Event breadcrumb" items={items} />
}
