import { TextField } from "opui-css/react"

export default function Spread() {
  return (
    <>
      <TextField
        label="Name"
        placeholder="Holly Humbucker"
        spread
        startText="Your full name, as the drummer never says it"
      />

      <TextField
        endText="Use one the band checks."
        label="Email"
        placeholder="name@lowend.example"
        spread
        startText="We'll send your gig invites here"
        type="email"
        variant="filled"
      />

      <TextField
        label="Band"
        required
        spread
        startText="Shown on your gig flyers"
      />

      <TextField
        defaultValue="BASS-20931"
        disabled
        label="Member ID"
        spread
        startText="Assigned when you joined Bassbook"
      />

      <TextField
        defaultValue="A"
        endText="Enter at least two characters."
        error
        label="Display name"
        spread
        startText="Shown next to your wall posts"
      />

      <TextField
        end="EUR"
        label="Amount"
        placeholder="0.00"
        spread
        start="€"
        startText="Daily gear spending limit"
      />

      <TextField
        endText="Include the domain, like example.com."
        label="Website"
        placeholder="example.com"
        spread
        start="https://"
        startText="Your band homepage, totally rad"
        variant="filled"
      />

      <TextField
        bottom="Lowercase letters and dashes only"
        label="Band page"
        placeholder="my-band"
        spread
        startText="Used to make your band page URL"
        top="bassbook.example/"
      />

      <TextField
        bottom="Changes every 90 days"
        endText="Never show it to the drummer."
        label="Secret riff"
        placeholder="Paste your riff"
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
        startText="Locked away from guitarists"
        top="Secret"
        type="password"
        variant="filled"
      />
    </>
  )
}
