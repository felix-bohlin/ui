import { Textarea } from "opui-css/react"

export default function Spread() {
  return (
    <>
      <Textarea
        label="Message"
        placeholder="Hello, world!"
        spread
        startText="You can write your message here. Keep it short, preferably under 100 characters."
      />

      <Textarea
        endText="Maximum 500 characters"
        label="Notes"
        placeholder="Additional notes..."
        spread
        startText="Add any additional notes or comments"
        variant="filled"
      />

      <Textarea
        label="Required"
        required
        spread
        startText="You must provide a response"
      />

      <Textarea
        disabled
        label="Disabled"
        spread
        startText="This textarea is disabled"
      />

      <Textarea
        endText="This value is too short."
        error
        label="Invalid Message"
        spread
        startText="This textarea has an error"
      />

      <Textarea
        bottom="280 characters left"
        label="Bio"
        placeholder="Tell us about yourself..."
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
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
        }
        startText="Shown on your public profile"
      />

      <Textarea
        bottom="Saved 2 minutes ago"
        endText="Drafts are auto-saved"
        label="Release notes"
        placeholder="Markdown supported..."
        spread
        startText="Shown on the changelog page"
        top="v1.4.0"
        variant="filled"
      />
    </>
  )
}
