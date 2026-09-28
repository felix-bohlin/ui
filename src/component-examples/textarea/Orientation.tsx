import { Textarea } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Textarea
        spread
        placeholder="Hello, world!"
        label="Message"
        description="You can write your message here. Keep it short, preferably under 100 characters."
      />

      <Textarea
        spread
        placeholder="Additional notes..."
        filled
        label="Notes"
        description="Add any additional notes or comments"
        endText="Maximum 500 characters"
      />

      <Textarea
        spread
        required
        label="Required"
        description="You must provide a response"
      />

      <Textarea
        spread
        disabled
        label="Disabled"
        description="This textarea is disabled"
      />

      <Textarea
        spread
        error
        label="Invalid Message"
        description="This textarea has an error"
        endText="This value is too short."
      />

      <Textarea
        spread
        label="Bio"
        placeholder="Tell us about yourself..."
        description="Shown on your public profile"
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
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
        }
        footer="280 characters left"
      />

      <Textarea
        spread
        filled
        label="Release notes"
        placeholder="Markdown supported..."
        description="Shown on the changelog page"
        header="v1.4.0"
        footer="Saved 2 minutes ago"
        endText="Drafts are auto-saved"
      />
    </>
  )
}
