/** @jsxImportSource @solidjs/web */
import { TextField } from "opui-css/solid"

export default function Affix() {
  return (
    <>
      <TextField end="EUR" label="Amount" placeholder="0.00" start="€" />

      <TextField label="Website" placeholder="example.com" start="https://" />

      <TextField end="kg" label="Weight" placeholder="0" type="numeric" />

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
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
        }
      />
    </>
  )
}
