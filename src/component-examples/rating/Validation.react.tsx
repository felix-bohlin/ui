import { Rating } from "opui-css/react"

export default function Validation() {
  return (
    <>
      <Rating
        aria-describedby="rating-validation-1"
        error
        label="Rate your stay"
        name="stay"
        required
      />
      <p className="ui-caption" id="rating-validation-1">
        Pick a rating to continue.
      </p>
    </>
  )
}
