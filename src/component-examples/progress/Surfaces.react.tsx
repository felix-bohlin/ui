import { Progress } from "opui-css/react"

export default function Surfaces() {
  return (
    <>
      <Progress value="25" max="100" variant="filled" />
      <Progress value="75" max="100" variant="tonal" />
    </>
  )
}
