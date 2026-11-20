import { Textarea } from "opui-css/react"

export default function Validation() {
  return (
    <>
      <div className="example-row">
        <Textarea htmlFor="textarea-validation-1" label="Message">
          <textarea
            id="textarea-validation-1"
            placeholder="How can we help?"
            required
          ></textarea>
        </Textarea>
        <Textarea
          htmlFor="textarea-validation-2"
          label="Delivery instructions"
          variant="filled"
        >
          <textarea
            id="textarea-validation-2"
            placeholder="Gate code, floor, where to leave it"
            required
          ></textarea>
        </Textarea>
      </div>

      <div className="example-row">
        <Textarea
          endText="Write at least 20 characters."
          htmlFor="textarea-validation-3"
          label="Review"
        >
          <textarea
            aria-describedby="textarea-validation-3-end-text"
            aria-invalid="true"
            id="textarea-validation-3"
            defaultValue="Great"
          ></textarea>
        </Textarea>
        <Textarea
          endText="Remove the link. Bios are plain text."
          htmlFor="textarea-validation-4"
          label="Bio"
          variant="filled"
        >
          <textarea
            aria-describedby="textarea-validation-4-end-text"
            aria-invalid="true"
            id="textarea-validation-4"
            defaultValue="Designer at https://example.com"
          ></textarea>
        </Textarea>
      </div>
    </>
  )
}
