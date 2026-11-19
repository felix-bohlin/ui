import { Progress } from "opui-css/react"

export default function AriaBusy() {
  return (
    <>
      <div aria-busy="true" aria-describedby="progress-aria-busy-1">
        Your gig photos from the last 12 months appear here.
      </div>
      <Progress aria-label="Loading gig photos" id="progress-aria-busy-1" />
    </>
  )
}
