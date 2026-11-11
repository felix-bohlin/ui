import { Avatar, AvatarGroup } from "opui-css/react"

export default function GroupedOverflow() {
  return (
    <AvatarGroup aria-label="Reviewers">
      <Avatar aria-label="Anna Berg" role="img">
        AB
      </Avatar>
      <Avatar aria-label="Carl Dahl" role="img">
        CD
      </Avatar>
      <Avatar aria-label="Eva Falk" role="img">
        EF
      </Avatar>
      <Avatar as="button" variant="tonal">
        +4<span className="ui-sr-only">more reviewers</span>
      </Avatar>
    </AvatarGroup>
  )
}
