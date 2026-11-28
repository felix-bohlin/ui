/** @jsxImportSource @solidjs/web */
import { Meter } from "opui-css/solid"

export default function Basics() {
  return (
    <Meter aria-label="Storage used" max="128" value="96">
      96 of 128 GB
    </Meter>
  )
}
