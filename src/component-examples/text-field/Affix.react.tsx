import { TextField } from "opui-css/react"

export default function Affix() {
  return (
    <>
      <TextField end="EUR" label="Amount" placeholder="0.00" start="€" />

      <TextField label="Website" placeholder="example.com" start="https://" />

      <TextField label="Weight" type="numeric" placeholder="0" end="kg" />

      <TextField
        label="Search"
        placeholder="Search..."
        start={
          <svg
            aria-hidden="true"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
        }
      />
    </>
  )
}
