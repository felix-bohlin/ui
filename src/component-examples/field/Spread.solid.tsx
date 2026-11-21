/** @jsxImportSource @solidjs/web */
import { Field } from "opui-css/solid"

export default function Spread() {
  return (
    <>
      <Field
        for="field-spread-1"
        label="Name"
        spread
        startText="Your full name, as the drummer never says it"
      >
        <input
          aria-describedby="field-spread-1-start-text"
          id="field-spread-1"
          placeholder="Holly Humbucker"
        />
      </Field>

      <Field
        endText="Use one the band checks."
        for="field-spread-2"
        label="Email"
        spread
        startText="We'll send your gig invites here"
        variant="filled"
      >
        <input
          aria-describedby="field-spread-2-start-text field-spread-2-end-text"
          id="field-spread-2"
          placeholder="name@lowend.example"
          type="email"
        />
      </Field>

      <Field
        for="field-spread-3"
        label="Band"
        spread
        startText="Shown on your gig flyers"
      >
        <input
          aria-describedby="field-spread-3-start-text"
          id="field-spread-3"
          required
        />
      </Field>

      <Field
        for="field-spread-4"
        label="Member ID"
        spread
        startText="Assigned when you joined Bassbook"
      >
        <input
          aria-describedby="field-spread-4-start-text"
          disabled
          id="field-spread-4"
          defaultValue="BASS-20931"
        />
      </Field>

      <Field
        endText="Enter at least two characters."
        for="field-spread-5"
        label="Display name"
        spread
        startText="Shown next to your wall posts"
      >
        <input
          aria-describedby="field-spread-5-start-text field-spread-5-end-text"
          aria-invalid="true"
          id="field-spread-5"
          defaultValue="A"
        />
      </Field>

      <Field
        end="EUR"
        for="field-spread-6"
        label="Amount"
        spread
        start="€"
        startText="Daily gear spending limit"
      >
        <input
          aria-describedby="field-spread-6-start-text field-spread-6-start field-spread-6-end"
          id="field-spread-6"
          placeholder="0.00"
        />
      </Field>

      <Field
        endText="Include the domain, like example.com."
        for="field-spread-7"
        label="Website"
        spread
        start="https://"
        startText="Your band homepage, totally rad"
        variant="filled"
      >
        <input
          aria-describedby="field-spread-7-start-text field-spread-7-start field-spread-7-end-text"
          id="field-spread-7"
          placeholder="example.com"
        />
      </Field>

      <Field
        bottom="Lowercase letters and dashes only"
        for="field-spread-8"
        label="Band page"
        spread
        startText="Used to make your band page URL"
        top="bassbook.example/"
      >
        <input
          aria-describedby="field-spread-8-start-text field-spread-8-top field-spread-8-bottom"
          id="field-spread-8"
          placeholder="my-band"
        />
      </Field>

      <Field
        bottom="Changes every 90 days"
        endText="Never show it to the drummer."
        for="field-spread-9"
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
          aria-describedby="field-spread-9-start-text field-spread-9-top field-spread-9-start field-spread-9-bottom field-spread-9-end-text"
          id="field-spread-9"
          placeholder="Paste your riff"
          type="password"
        />
      </Field>
    </>
  )
}
