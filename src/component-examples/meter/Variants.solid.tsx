/** @jsxImportSource @solidjs/web */
import { Meter } from "opui-css/solid"

export default function Variants() {
  return (
    <>
      <Meter aria-label="Seats taken" max="40" value="10" variant="filled" />
      <Meter aria-label="Tickets sold" max="40" value="30" variant="tonal" />
    </>
  )
}
