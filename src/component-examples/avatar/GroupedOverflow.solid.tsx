/** @jsxImportSource @solidjs/web */
import { Avatar, AvatarGroup } from "opui-css/solid"

export default function GroupedOverflow() {
  return (
    <AvatarGroup aria-label="Fans">
      <Avatar label="Kinga Headstock">KH</Avatar>
      <Avatar label="Mohini Hertz">MH</Avatar>
      <Avatar label="Scott Humbucker">SH</Avatar>
      <Avatar as="button" label="+4 more fans" variant="tonal">
        +4
      </Avatar>
    </AvatarGroup>
  )
}
