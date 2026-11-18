/** @jsxImportSource @solidjs/web */
import { TextField } from "opui-css/solid"

export default function Variants() {
  return (
    <>
      <TextField label="Outlined" placeholder="Your name" />
      <TextField label="Filled" placeholder="Your name" variant="filled" />
    </>
  )
}
