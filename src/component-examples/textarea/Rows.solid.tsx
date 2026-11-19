/** @jsxImportSource @solidjs/web */
import { Textarea } from "opui-css/solid"

export default function Rows() {
  return (
    <>
      <Textarea label="Reply" placeholder="Write a reply" rows={1} />
      <Textarea label="Review" placeholder="Write a review" rows={6} />
    </>
  )
}
