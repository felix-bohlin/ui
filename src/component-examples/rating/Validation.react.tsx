import { Rating } from "opui-css/react"

export default function Validation() {
  return (
    <>
      <Rating
        aria-describedby="stay-error"
        error
        label="Rate your stay"
        name="stay"
        required
      />
      <p className="ui-caption" id="stay-error">
        Pick a rating to continue.
      </p>
    </>
  )
}
