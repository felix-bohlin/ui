import { Textarea } from "opui-css/react"

export default function Spread() {
  return (
    <>
      <Textarea
        label="Message"
        placeholder="Hi, I have a question about my order."
        spread
        startText="Keep it under 100 characters."
      />

      <Textarea
        endText="Only your team sees these."
        label="Notes"
        placeholder="Additional notes..."
        spread
        startText="Add any additional notes or comments"
        variant="filled"
      />

      <Textarea
        label="Reason for return"
        required
        spread
        startText="Helps us improve our products"
      />

      <Textarea
        disabled
        label="Order notes"
        spread
        startText="Orders can't change once they ship"
      />

      <Textarea
        defaultValue="Great"
        endText="Write at least 20 characters."
        error
        label="Review"
        spread
        startText="Shown with your rating"
      />

      <Textarea
        characterCount
        label="Bio"
        maxLength={280}
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
        endText="Drafts save automatically."
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
