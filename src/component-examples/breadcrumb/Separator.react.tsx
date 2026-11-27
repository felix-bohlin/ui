import { Breadcrumb } from "opui-css/react"

export default function Separator() {
  return (
    <>
      <Breadcrumb
        aria-label="Short-scale breadcrumb"
        items={[
          { href: "#", label: "Marketplace" },
          { href: "#", label: "Basses" },
          { label: "Short scale" },
        ]}
        style={{ "--_separator": '"›"' }}
      />
      <Breadcrumb
        aria-label="Combo amp breadcrumb"
        items={[
          { href: "#", label: "Marketplace" },
          { href: "#", label: "Amps" },
          { label: "Combos" },
        ]}
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
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9 18 6-6-6-6"></path>
          </svg>
        }
      />
    </>
  )
}
