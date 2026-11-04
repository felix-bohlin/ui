import { Timeline, TimelineItem } from "opui-css/react"

export default function Narrow() {
  return (
    <Timeline style={{ maxInlineSize: "20rem" }}>
      <TimelineItem datetime="2026-09-02" label="Design freeze" time="Sep 2" />
      <TimelineItem
        datetime="2026-09-16"
        label="Feature complete"
        time="Sep 16"
      />
      <TimelineItem
        current="step"
        datetime="2026-10-14"
        label="Beta review"
        time="Oct 14"
      >
        <p>Moved from October 10.</p>
      </TimelineItem>
      <TimelineItem datetime="2026-10-31" label="Launch" time="Oct 31" />
    </Timeline>
  )
}
