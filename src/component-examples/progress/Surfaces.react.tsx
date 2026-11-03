import { Progress } from "opui-css/react"

export default function Surfaces() {
  return (
    <>
      <Progress aria-label="Uploading" value="25" max="100" variant="filled" />
      <Progress aria-label="Importing" value="75" max="100" variant="tonal" />
    </>
  )
}
