/** @jsxImportSource @solidjs/web */
import { TextField } from "opui-css/solid"

export default function Variants() {
  return (
    <>
      <TextField label="Outlined" placeholder="Placeholder" />
      <TextField label="Filled" placeholder="Placeholder" variant="filled" />
    </>
  )
}
