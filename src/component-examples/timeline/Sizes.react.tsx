import { Timeline, TimelineItem } from "opui-css/react"

export default function Sizes() {
  return (
    <Timeline size="small">
      <TimelineItem datetime="2026-10-08T09:12" time="09:12">
        <p>Soundcheck started.</p>
      </TimelineItem>
      <TimelineItem datetime="2026-10-08T09:15" time="09:15">
        <p>Bass turned up, finally.</p>
      </TimelineItem>
      <TimelineItem color="success" datetime="2026-10-08T09:16" time="09:16">
        <p>On stage and grooving.</p>
      </TimelineItem>
    </Timeline>
  )
}
