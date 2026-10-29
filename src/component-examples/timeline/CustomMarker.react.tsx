import { Timeline, TimelineItem } from "opui-css/react"

const check = (
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 6 9 17l-5-5"></path>
  </svg>
)

export default function CustomMarker() {
  return (
    <Timeline>
      <TimelineItem
        color="success"
        datetime="2026-10-01"
        label="Ordered"
        marker={check}
        time="Oct 1"
      />
      <TimelineItem
        color="success"
        datetime="2026-10-02"
        label="Packed"
        marker={check}
        time="Oct 2"
      />
      <TimelineItem
        color="success"
        datetime="2026-10-03"
        label="Shipped"
        marker={check}
        time="Oct 3"
      >
        <p>On its way from Gothenburg.</p>
      </TimelineItem>
      <TimelineItem datetime="2026-10-06" label="Delivered" time="Oct 6">
        <p>Expected</p>
      </TimelineItem>
    </Timeline>
  )
}
