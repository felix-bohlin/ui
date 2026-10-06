import { TextField } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <TextField
        spread
        placeholder="Evil Rabbit"
        label="Name"
        description="Provide your full name for identification"
      />

      <TextField
        spread
        placeholder="you@example.com"
        type="email"
        variant="filled"
        label="Email"
        description="We'll use this to contact you"
        endText="Please use a valid email address"
      />

      <TextField
        spread
        required
        label="Required"
        description="You must fill this in"
      />

      <TextField
        spread
        disabled
        label="Disabled"
        description="This field is disabled"
      />

      <TextField
        spread
        error
        label="Invalid Name"
        description="This field has an error"
        endText="This value is too short."
      />

      <TextField
        spread
        label="Amount"
        placeholder="0.00"
        description="Daily spending limit"
        prefix="¢"
        suffix="EUR"
      />

      <TextField
        spread
        label="Website"
        placeholder="example.com"
        variant="filled"
        description="Your public profile URL"
        prefix="https://"
        endText="Must include a valid domain"
      />

      <TextField
        spread
        label="Project name"
        placeholder="my-project"
        description="Used to generate the project URL"
        header="acme.dev/"
        footer="Lowercase letters and dashes only"
      />

      <TextField
        spread
        variant="filled"
        label="API key"
        placeholder="Paste your key"
        type="password"
        description="Stored encrypted at rest"
        prefix={
          <svg
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
        header="Secret"
        footer="Rotates every 90 days"
        endText="Treat like a password"
      />
    </>
  )
}
