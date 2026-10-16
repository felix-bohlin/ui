import { Timeline, TimelineItem } from "opui-css/react"

export default function Current() {
  return (
    <Timeline>
      <TimelineItem
        datetime="2026-09-02"
        heading="Design freeze"
        time="Sep 2"
      />
      <TimelineItem
        datetime="2026-09-16"
        heading="Feature complete"
        time="Sep 16"
      />
      <TimelineItem
        current="step"
        datetime="2026-10-14"
        heading="Beta review"
        time="Oct 14"
      >
        <p>Moved from October 10.</p>
      </TimelineItem>
      <TimelineItem datetime="2026-10-31" heading="Launch" time="Oct 31" />
    </Timeline>
  )
}
