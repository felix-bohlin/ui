import { Avatar } from "opui-css/solid"
import type { User } from "reference-shared"

type Props = { size?: "large" | "small"; user: User }

export default function UserAvatar(props: Props) {
  return (
    <Avatar size={props.size} src={props.user.photo}>
      {props.user.initials}
    </Avatar>
  )
}
