import { Rating } from "opui-css/react"

export default function Sizes() {
  return (
    <>
      <div className="example-column">
        <Rating defaultValue={4} label="Rated 4 out of 5" size="small" />
        <Rating defaultValue={4} label="Rated 4 out of 5" />
        <Rating defaultValue={4} label="Rated 4 out of 5" size="large" />
      </div>
      <div className="example-column">
        <Rating defaultValue={4} label="Small" name="size-small" size="small" />
        <Rating defaultValue={4} label="Default" name="size-default" />
        <Rating defaultValue={4} label="Large" name="size-large" size="large" />
      </div>
    </>
  )
}
