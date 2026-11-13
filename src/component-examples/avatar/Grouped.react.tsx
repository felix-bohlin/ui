import { Avatar, AvatarGroup, Badge } from "opui-css/react"

export default function Grouped() {
  return (
    <AvatarGroup aria-label="Band">
      <Avatar label="Ada Bridge">AB</Avatar>
      <Avatar label="Holly Humbucker">HH</Avatar>
      <Avatar as="button" label="Ines Hertz">
        IH
      </Avatar>
      <Avatar as="button" label="Lou Headstock">
        LH
      </Avatar>
      <Avatar href="#" label="Percy Groove">
        PG
      </Avatar>
      <Avatar href="#" label="Rory Rootnote">
        RR
      </Avatar>
      <Badge dot label="Online">
        <Avatar href="#" label="Stella Nut, online">
          SN
        </Avatar>
      </Badge>
    </AvatarGroup>
  )
}
