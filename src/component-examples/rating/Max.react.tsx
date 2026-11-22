import { Rating } from "opui-css/react"

export default function Max() {
  return (
    <>
      <Rating defaultValue={2} label="Rated 2 out of 3" max={3} />
      <Rating defaultValue={7.5} label="Rated 7.5 out of 10" max={10} />
      <Rating defaultValue={2} label="Difficulty" max={3} name="difficulty" />
    </>
  )
}
