import { Avatar } from "opui-css/react"

export default function Shapes() {
  return (
    <>
      <Avatar alt="Jonas Berg" shape="rounded" src="/photos/jonas-berg.png" />

      <Avatar aria-label="Sam Quist" role="img" shape="squared">
        SQ
      </Avatar>

      <Avatar alt="Maya Lind" shape="squircle" src="/photos/maya-lind.png" />
    </>
  )
}
