import { TextField } from "opui-css/react"

export default function Spread() {
  return (
    <>
      <TextField
        spread
        placeholder="Evil Rabbit"
        label="Name"
        startText="Provide your full name for identification"
      />

      <TextField
        spread
        placeholder="you@example.com"
        type="email"
        variant="filled"
        label="Email"
        startText="We'll use this to contact you"
        endText="Please use a valid email address"
      />

      <TextField
        spread
        required
        label="Required"
        startText="You must fill this in"
      />

      <TextField
        spread
        disabled
        label="Disabled"
        startText="This field is disabled"
      />

      <TextField
        spread
        error
        label="Invalid Name"
        startText="This field has an error"
        endText="Enter at least two characters."
      />

      <TextField
        spread
        label="Amount"
        placeholder="0.00"
        startText="Daily spending limit"
        start="€"
        end="EUR"
      />

      <TextField
        spread
        label="Website"
        placeholder="example.com"
        variant="filled"
        startText="Your public profile URL"
        start="https://"
        endText="Must include a valid domain"
      />

      <TextField
        spread
        label="Project name"
        placeholder="my-project"
        startText="Used to generate the project URL"
        top="acme.dev/"
        bottom="Lowercase letters and dashes only"
      />

      <TextField
        spread
        variant="filled"
        label="API key"
        placeholder="Paste your key"
        type="password"
        startText="Stored encrypted at rest"
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
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        }
        top="Secret"
        bottom="Rotates every 90 days"
        endText="Treat like a password"
      />
    </>
  )
}
