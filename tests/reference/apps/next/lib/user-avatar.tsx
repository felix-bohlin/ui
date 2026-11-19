import { Avatar } from "opui-css/react"
import type { User } from "reference-shared"

export default function UserAvatar({
  link = false,
  size,
  user,
}: {
  link?: boolean
  size?: "large" | "small"
  user: User
}) {
  const href = link ? `/u/${user.handle}` : undefined
  if (user.photo) {
    return href ? (
      <Avatar
        alt=""
        aria-hidden="true"
        href={href}
        size={size}
        src={user.photo}
        tabIndex={-1}
      />
    ) : (
      <Avatar alt="" size={size} src={user.photo} />
    )
  }
  return href ? (
    <Avatar aria-hidden="true" href={href} size={size} tabIndex={-1}>
      {user.initials}
    </Avatar>
  ) : (
    <Avatar aria-hidden="true" size={size}>
      {user.initials}
    </Avatar>
  )
}
