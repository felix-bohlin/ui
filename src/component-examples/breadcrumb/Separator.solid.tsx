/** @jsxImportSource @solidjs/web */
import { Breadcrumb } from "opui-css/solid"

const items = [
  { href: "#", label: "Marketplace" },
  { href: "#", label: "Basses" },
  { label: "Short scale" },
]

export default function Separator() {
  return (
    <>
      <Breadcrumb
        aria-label="Breadcrumb"
        items={items}
        style='--_separator: "›"'
      />
      <Breadcrumb
        aria-label="Breadcrumb"
        items={items}
        separator={
          <svg
            data-icon="chevron-right"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m9 18 6-6-6-6"></path>
          </svg>
        }
      />
    </>
  )
}
