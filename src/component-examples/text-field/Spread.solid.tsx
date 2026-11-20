/** @jsxImportSource @solidjs/web */
import { TextField } from "opui-css/solid"

export default function Spread() {
  return (
    <>
      <TextField
        for="text-field-spread-1"
        label="Name"
        spread
        startText="Your full name, as the drummer never says it"
      >
        <input
          aria-describedby="text-field-spread-1-start-text"
          id="text-field-spread-1"
          placeholder="Holly Humbucker"
        />
      </TextField>

      <TextField
        endText="Use one the band checks."
        for="text-field-spread-2"
        label="Email"
        spread
        startText="We'll send your gig invites here"
        variant="filled"
      >
        <input
          aria-describedby="text-field-spread-2-start-text text-field-spread-2-end-text"
          id="text-field-spread-2"
          placeholder="name@lowend.example"
          type="email"
        />
      </TextField>

      <TextField
        for="text-field-spread-3"
        label="Band"
        spread
        startText="Shown on your gig flyers"
      >
        <input
          aria-describedby="text-field-spread-3-start-text"
          id="text-field-spread-3"
          required
        />
      </TextField>

      <TextField
        for="text-field-spread-4"
        label="Member ID"
        spread
        startText="Assigned when you joined Bassbook"
      >
        <input
          aria-describedby="text-field-spread-4-start-text"
          disabled
          id="text-field-spread-4"
          defaultValue="BASS-20931"
        />
      </TextField>

      <TextField
        endText="Enter at least two characters."
        for="text-field-spread-5"
        label="Display name"
        spread
        startText="Shown next to your wall posts"
      >
        <input
          aria-describedby="text-field-spread-5-start-text text-field-spread-5-end-text"
          aria-invalid="true"
          id="text-field-spread-5"
          defaultValue="A"
        />
      </TextField>

      <TextField
        end="EUR"
        for="text-field-spread-6"
        label="Amount"
        spread
        start="€"
        startText="Daily gear spending limit"
      >
        <input
          aria-describedby="text-field-spread-6-start-text text-field-spread-6-start text-field-spread-6-end"
          id="text-field-spread-6"
          placeholder="0.00"
        />
      </TextField>

      <TextField
        endText="Include the domain, like example.com."
        for="text-field-spread-7"
        label="Website"
        spread
        start="https://"
        startText="Your band homepage, totally rad"
        variant="filled"
      >
        <input
          aria-describedby="text-field-spread-7-start-text text-field-spread-7-start text-field-spread-7-end-text"
          id="text-field-spread-7"
          placeholder="example.com"
        />
      </TextField>

      <TextField
        bottom="Lowercase letters and dashes only"
        for="text-field-spread-8"
        label="Band page"
        spread
        startText="Used to make your band page URL"
        top="bassbook.example/"
      >
        <input
          aria-describedby="text-field-spread-8-start-text text-field-spread-8-top text-field-spread-8-bottom"
          id="text-field-spread-8"
          placeholder="my-band"
        />
      </TextField>

      <TextField
        bottom="Changes every 90 days"
        endText="Never show it to the drummer."
        for="text-field-spread-9"
        label="Secret riff"
        spread
        start={
          <svg
            data-icon="lock"
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
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        }
        startText="Locked away from guitarists"
        top="Secret"
        variant="filled"
      >
        <input
          aria-describedby="text-field-spread-9-start-text text-field-spread-9-top text-field-spread-9-start text-field-spread-9-bottom text-field-spread-9-end-text"
          id="text-field-spread-9"
          placeholder="Paste your riff"
          type="password"
        />
      </TextField>
    </>
  )
}
