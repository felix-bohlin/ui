import { Progress } from "opui-css/react"

export default function AriaBusy() {
  return (
    <>
      <div aria-busy="true" aria-describedby="progress-aria-busy-1">
        Content here is loading.
      </div>
      <Progress aria-label="Content loading…" id="progress-aria-busy-1" />
    </>
  )
}
