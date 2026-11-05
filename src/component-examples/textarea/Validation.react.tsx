import { Textarea } from "opui-css/react"

export default function Validation() {
  return (
    <>
      <div className="example-row">
        <Textarea label="Message" placeholder="How can we help?" required />
        <Textarea
          label="Delivery instructions"
          placeholder="Gate code, floor, where to leave it"
          required
          variant="filled"
        />
      </div>

      <div className="example-row">
        <Textarea
          defaultValue="Great"
          endText="Write at least 20 characters."
          error
          label="Review"
        />
        <Textarea
          defaultValue="Designer at https://example.com"
          endText="Remove the link. Bios are plain text."
          error
          label="Bio"
          variant="filled"
        />
      </div>
    </>
  )
}
