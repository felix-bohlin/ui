/** @jsxImportSource @solidjs/web */
import { Meter } from "opui-css/solid"

export default function Ranges() {
  return (
    <>
      <Meter
        aria-label="Disk usage, 40%"
        high={85}
        low={60}
        max={100}
        optimum={0}
        value={40}
      />
      <Meter
        aria-label="Disk usage, 72%, getting full"
        high={85}
        low={60}
        max={100}
        optimum={0}
        value={72}
      />
      <Meter
        aria-label="Disk usage, 93%, almost full"
        high={85}
        low={60}
        max={100}
        optimum={0}
        value={93}
      />
    </>
  )
}
