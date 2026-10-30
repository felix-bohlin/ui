import { Progress } from "opui-css/react"

export default function Surfaces() {
  return (
    <>
      <Progress
        aria-label="Storage used"
        max="100"
        value="25"
        variant="filled"
      />
      <Progress aria-label="Memory used" max="100" value="75" variant="tonal" />
    </>
  )
}
