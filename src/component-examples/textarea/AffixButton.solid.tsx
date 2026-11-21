/** @jsxImportSource @solidjs/web */
import { Button, Field } from "opui-css/solid"

export default function AffixButton() {
  return (
    <Field
      end={
        <Button
          aria-label="Send"
          color="primary"
          round
          type="button"
          variant="filled"
        >
          <svg
            data-icon="send"
            aria-hidden="true"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M3 20v-6l8-2-8-2V4l19 8z"></path>
          </svg>
        </Button>
      }
      for="textarea-affix-button-1"
      label="Message"
    >
      <textarea
        aria-describedby="textarea-affix-button-1-end"
        id="textarea-affix-button-1"
        placeholder="Write a message..."
      ></textarea>
    </Field>
  )
}
