import { Progress } from "opui-css/react"

export default function Surfaces() {
  return (
    <>
      <Progress
        aria-label="Storage used"
        value="25"
        max="100"
        variant="filled"
      />
      <Progress aria-label="Memory used" value="75" max="100" variant="tonal" />
    </>
  )
}
