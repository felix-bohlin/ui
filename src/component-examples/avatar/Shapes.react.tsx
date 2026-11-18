import { Avatar } from "opui-css/react"

export default function Shapes() {
  return (
    <>
      <Avatar
        alt="Percy Groove"
        shape="rounded"
        src="/photos/percy-groove.png"
      />

      <Avatar aria-label="Rory Rootnote" role="img" shape="squared">
        RR
      </Avatar>

      <Avatar
        alt="Lou Headstock"
        shape="squircle"
        src="/photos/lou-headstock.png"
      />
    </>
  )
}
