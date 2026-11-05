/** @jsxImportSource @solidjs/web */
import { Progress } from "opui-css/solid"

export default function Surfaces() {
  return (
    <>
      <Progress aria-label="Uploading" max="100" value="25" variant="filled" />
      <Progress aria-label="Importing" max="100" value="75" variant="tonal" />
    </>
  )
}
