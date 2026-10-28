import { Timeline, TimelineItem } from "opui-css/react"

export default function Colors() {
  return (
    <Timeline>
      <TimelineItem
        color="critical"
        datetime="2026-10-08T12:18"
        label="Investigating"
        time="12:18"
      >
        <p>Search is slower in eu-north.</p>
      </TimelineItem>
      <TimelineItem
        color="warning"
        datetime="2026-10-08T13:40"
        label="Identified"
        time="13:40"
      >
        <p>An index rebuild competes with live traffic.</p>
      </TimelineItem>
      <TimelineItem
        color="info"
        datetime="2026-10-08T14:05"
        label="Monitoring"
        time="14:05"
      >
        <p>Response times are back to normal.</p>
      </TimelineItem>
      <TimelineItem
        color="success"
        datetime="2026-10-08T15:30"
        label="Resolved"
        time="15:30"
      >
        <p>The rebuild finished. No data was lost.</p>
      </TimelineItem>
      <TimelineItem
        color="neutral"
        datetime="2026-10-09T09:00"
        label="Postmortem"
        time="Oct 9"
      >
        <p>A full report follows within a week.</p>
      </TimelineItem>
    </Timeline>
  )
}
