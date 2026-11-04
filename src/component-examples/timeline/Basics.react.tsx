import { Timeline, TimelineItem } from "opui-css/react"

export default function Basics() {
  return (
    <Timeline>
      <TimelineItem datetime="2026-08-04" label="Bug fixes" time="Aug 4, 2026">
        <p>Faster search and fewer duplicate notifications.</p>
      </TimelineItem>
      <TimelineItem
        datetime="2026-09-12"
        label="Saved views"
        time="Sep 12, 2026"
      >
        <p>
          Save filters and sorting as named views and share them with a link.
        </p>
      </TimelineItem>
      <TimelineItem
        datetime="2026-10-01"
        label="Planning and a faster board"
        time="Oct 1, 2026"
      >
        <p>
          Estimates from past work, and a board that renders three times faster.
        </p>
      </TimelineItem>
    </Timeline>
  )
}
