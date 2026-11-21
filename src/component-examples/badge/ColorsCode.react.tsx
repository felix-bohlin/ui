import { Badge } from "opui-css/react"

export default function ColorsCode() {
  return (
    <>
      <Badge color="critical" hideLabel indicator="5" label="5 unread messages">
        <svg aria-hidden="true">{/* */}</svg>
      </Badge>
      <Badge color="info" hideLabel indicator="5" label="5 unread messages">
        <svg aria-hidden="true">{/* */}</svg>
      </Badge>
      <Badge color="neutral" hideLabel indicator="5" label="5 unread messages">
        <svg aria-hidden="true">{/* */}</svg>
      </Badge>
      <Badge color="success" hideLabel indicator="5" label="5 unread messages">
        <svg aria-hidden="true">{/* */}</svg>
      </Badge>
      <Badge color="warning" hideLabel indicator="5" label="5 unread messages">
        <svg aria-hidden="true">{/* */}</svg>
      </Badge>
    </>
  )
}
