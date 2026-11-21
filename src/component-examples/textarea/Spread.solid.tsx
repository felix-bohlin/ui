/** @jsxImportSource @solidjs/web */
import { Textarea } from "opui-css/solid"

export default function Spread() {
  return (
    <>
      <Textarea
        for="textarea-spread-1"
        label="Message"
        spread
        startText="Keep it under 100 characters."
      >
        <textarea
          aria-describedby="textarea-spread-1-start-text"
          id="textarea-spread-1"
          placeholder="Hi, I have a question about my order."
        ></textarea>
      </Textarea>

      <Textarea
        endText="Only your team sees these."
        for="textarea-spread-2"
        label="Notes"
        spread
        startText="Add any additional notes or comments"
        variant="filled"
      >
        <textarea
          aria-describedby="textarea-spread-2-start-text textarea-spread-2-end-text"
          id="textarea-spread-2"
          placeholder="Additional notes..."
        ></textarea>
      </Textarea>

      <Textarea
        for="textarea-spread-3"
        label="Reason for return"
        spread
        startText="Helps us improve our products"
      >
        <textarea
          aria-describedby="textarea-spread-3-start-text"
          id="textarea-spread-3"
          required
        ></textarea>
      </Textarea>

      <Textarea
        for="textarea-spread-4"
        label="Order notes"
        spread
        startText="Orders can't change once they ship"
      >
        <textarea
          aria-describedby="textarea-spread-4-start-text"
          disabled
          id="textarea-spread-4"
        ></textarea>
      </Textarea>

      <Textarea
        endText="Write at least 20 characters."
        for="textarea-spread-5"
        label="Review"
        spread
        startText="Shown with your rating"
      >
        <textarea
          aria-describedby="textarea-spread-5-start-text textarea-spread-5-end-text"
          aria-invalid="true"
          id="textarea-spread-5"
        >
          Great
        </textarea>
      </Textarea>

      <Textarea
        characterCount
        for="textarea-spread-6"
        label="Bio"
        spread
        start={
          <svg
            data-icon="edit"
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
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
        }
        startText="Shown on your public profile"
      >
        <textarea
          aria-describedby="textarea-spread-6-start-text textarea-spread-6-start textarea-spread-6-end-text"
          id="textarea-spread-6"
          maxlength="280"
          placeholder="Tell us about yourself..."
        ></textarea>
      </Textarea>

      <Textarea
        bottom="Saved 2 minutes ago"
        endText="Drafts save automatically."
        for="textarea-spread-7"
        label="Release notes"
        spread
        startText="Shown on the changelog page"
        top="v1.4.0"
        variant="filled"
      >
        <textarea
          aria-describedby="textarea-spread-7-start-text textarea-spread-7-top textarea-spread-7-bottom textarea-spread-7-end-text"
          id="textarea-spread-7"
          placeholder="Markdown supported..."
        ></textarea>
      </Textarea>
    </>
  )
}
