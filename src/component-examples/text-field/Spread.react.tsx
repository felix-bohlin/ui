import { TextField } from "opui-css/react"

export default function Spread() {
  return (
    <>
      <TextField
        label="Name"
        placeholder="Evil Rabbit"
        spread
        startText="Provide your full name for identification"
      />

      <TextField
        endText="Please use a valid email address"
        label="Email"
        placeholder="you@example.com"
        spread
        startText="We'll use this to contact you"
        type="email"
        variant="filled"
      />

      <TextField
        label="Required"
        required
        spread
        startText="You must fill this in"
      />

      <TextField
        disabled
        label="Disabled"
        spread
        startText="This field is disabled"
      />

      <TextField
        endText="Enter at least two characters."
        error
        label="Invalid Name"
        spread
        startText="This field has an error"
      />

      <TextField
        end="EUR"
        label="Amount"
        placeholder="0.00"
        spread
        start="€"
        startText="Daily spending limit"
      />

      <TextField
        endText="Must include a valid domain"
        label="Website"
        placeholder="example.com"
        spread
        start="https://"
        startText="Your public profile URL"
        variant="filled"
      />

      <TextField
        bottom="Lowercase letters and dashes only"
        label="Project name"
        placeholder="my-project"
        spread
        startText="Used to generate the project URL"
        top="acme.dev/"
      />

      <TextField
        bottom="Rotates every 90 days"
        endText="Treat like a password"
        label="API key"
        placeholder="Paste your key"
        spread
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
        startText="Stored encrypted at rest"
        top="Secret"
        type="password"
        variant="filled"
      />
    </>
  )
}
