import { Rating } from "opui-css/react"

export default function Sizes() {
  return (
    <>
      <div className="example-column">
        <Rating label="Rated 4 out of 5" size="small" value={4} />
        <Rating label="Rated 4 out of 5" value={4} />
        <Rating label="Rated 4 out of 5" size="large" value={4} />
      </div>
      <div className="example-column">
        <Rating label="Small" name="size-small" size="small" value={4} />
        <Rating label="Default" name="size-default" value={4} />
        <Rating label="Large" name="size-large" size="large" value={4} />
      </div>
    </>
  )
}
