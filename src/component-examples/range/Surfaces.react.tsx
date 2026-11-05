import { Range } from "opui-css/react"

export default function Surfaces() {
  return (
    <>
      <Range defaultValue="30" label="Volume" />
      <Range defaultValue="70" label="Brightness" variant="filled" />
      <Range defaultValue="50" label="Contrast" variant="tonal" />
    </>
  )
}
