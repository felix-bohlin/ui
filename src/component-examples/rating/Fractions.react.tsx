import { Rating } from "opui-css/react"

export default function Fractions() {
  return (
    <>
      <Rating defaultValue={1.3} label="Rated 1.3 out of 5" />
      <Rating defaultValue={2.5} label="Rated 2.5 out of 5" />
      <Rating defaultValue={3.7} label="Rated 3.7 out of 5" />
      <Rating defaultValue={4.9} label="Rated 4.9 out of 5" />
    </>
  )
}
