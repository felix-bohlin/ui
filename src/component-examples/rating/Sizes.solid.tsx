/** @jsxImportSource @solidjs/web */
import { Rating } from "opui-css/solid"

export default function Sizes() {
  return (
    <>
      <div class="example-column">
        <Rating defaultValue={4} label="Rated 4 out of 5" size="small" />
        <Rating defaultValue={4} label="Rated 4 out of 5" />
        <Rating defaultValue={4} label="Rated 4 out of 5" size="large" />
      </div>
      <div class="example-column">
        <Rating defaultValue={4} label="Small" name="size-small" size="small" />
        <Rating defaultValue={4} label="Medium" name="size-medium" />
        <Rating defaultValue={4} label="Large" name="size-large" size="large" />
      </div>
    </>
  )
}
