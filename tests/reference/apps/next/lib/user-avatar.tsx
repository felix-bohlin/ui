import { Avatar } from "opui-css/react"
import type { User } from "reference-shared"

export default function UserAvatar({
  size,
  user,
}: {
  size?: "large" | "small"
  user: User
}) {
  return (
    <Avatar size={size} src={user.photo}>
      {user.initials}
    </Avatar>
  )
}
