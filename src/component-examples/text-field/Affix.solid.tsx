/** @jsxImportSource @solidjs/web */
import { TextField } from "opui-css/solid"

export default function Affix() {
  return (
    <>
      <TextField end="EUR" for="text-field-affix-1" label="Amount" start="€">
        <input
          aria-describedby="text-field-affix-1-start text-field-affix-1-end"
          id="text-field-affix-1"
          placeholder="0.00"
        />
      </TextField>

      <TextField for="text-field-affix-2" label="Website" start="https://">
        <input
          aria-describedby="text-field-affix-2-start"
          id="text-field-affix-2"
          placeholder="example.com"
        />
      </TextField>

      <TextField end="kg" for="text-field-affix-3" label="Weight">
        <input
          aria-describedby="text-field-affix-3-end"
          id="text-field-affix-3"
          inputmode="decimal"
          placeholder="0"
        />
      </TextField>

      <TextField
        for="text-field-affix-4"
        label="Search"
        start={
          <svg
            data-icon="search"
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
      >
        <input
          aria-describedby="text-field-affix-4-start"
          id="text-field-affix-4"
          placeholder="Search..."
        />
      </TextField>
    </>
  )
}
