/** @jsxImportSource @solidjs/web */
import { Textarea } from "opui-css/solid"

export default function Variants() {
  return (
    <>
      <Textarea label="Outlined" placeholder="Placeholder" />
      <Textarea label="Filled" placeholder="Placeholder" variant="filled" />
    </>
  )
}
