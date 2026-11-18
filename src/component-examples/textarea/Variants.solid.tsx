/** @jsxImportSource @solidjs/web */
import { Textarea } from "opui-css/solid"

export default function Variants() {
  return (
    <>
      <Textarea label="Outlined" placeholder="Write a message" />
      <Textarea label="Filled" placeholder="Write a message" variant="filled" />
    </>
  )
}
