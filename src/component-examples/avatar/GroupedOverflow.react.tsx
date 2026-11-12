import { Avatar, AvatarGroup } from "opui-css/react"

export default function GroupedOverflow() {
  return (
    <AvatarGroup aria-label="Reviewers">
      <Avatar aria-label="Hakki Hälinen" role="img">
        HH
      </Avatar>
      <Avatar aria-label="Inga Halonen" role="img">
        IH
      </Avatar>
      <Avatar aria-label="Lena Handén" role="img">
        LH
      </Avatar>
      <Avatar as="button" variant="tonal">
        +4<span className="ui-sr-only">more reviewers</span>
      </Avatar>
    </AvatarGroup>
  )
}
