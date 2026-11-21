import { Avatar } from "opui-css/react"

export default function Shapes() {
  return (
    <>
      <Avatar
        label="Percy Groove"
        shape="rounded"
        src="/photos/percy-groove.png"
      />

      <Avatar label="Rory Rootnote" shape="squared">
        RR
      </Avatar>

      <Avatar
        label="Lou Headstock"
        shape="squircle"
        src="/photos/lou-headstock.png"
      />
    </>
  )
}
