import { Timeline } from "opui-css/react"

const releases = [
  {
    datetime: "2026-04-02",
    description: "The first stable release.",
    heading: "Version 1.0",
    time: "Apr 2, 2026",
  },
  {
    datetime: "2026-06-18",
    description: "Dark mode and keyboard shortcuts.",
    heading: "Version 1.1",
    time: "Jun 18, 2026",
  },
  {
    current: true,
    datetime: "2026-10-01",
    description: "A new board and saved views.",
    heading: "Version 2.0",
    time: "Oct 1, 2026",
  },
]

export default function Items() {
  return <Timeline items={releases} />
}
