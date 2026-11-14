import { Badge } from "opui-css/react"

export default function CornersCode() {
  return (
    <>
      <Badge
        corner="start-start"
        hideLabel
        indicator="35"
        label="35 unread messages"
      >
        <svg aria-hidden="true">{/* */}</svg>
      </Badge>
      <Badge hideLabel indicator="99+" label="More than 99 unread messages">
        <svg aria-hidden="true">{/* */}</svg>
      </Badge>
      <Badge corner="end-start" hideLabel indicator="New" label="New messages">
        <svg aria-hidden="true">{/* */}</svg>
      </Badge>
      <Badge
        corner="end-end"
        hideLabel
        indicator="3K"
        label="About 3,000 unread messages"
      >
        <svg aria-hidden="true">{/* */}</svg>
      </Badge>
    </>
  )
}
