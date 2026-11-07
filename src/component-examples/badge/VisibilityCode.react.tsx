import { Badge } from "opui-css/react"

export default function VisibilityCode() {
  return (
    <Badge hideLabel indicator="5" invisible label="5 unread messages">
      <svg aria-hidden="true">{/* */}</svg>
    </Badge>
  )
}
