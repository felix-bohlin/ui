import { Avatar } from "opui-css/react"

export default function Shapes() {
  return (
    <>
      <Avatar
        label="Adam Groove"
        shape="rounded"
        src="/photos/adam-groove.png"
      />

      <Avatar label="Josh Rootnote" shape="squared">
        JR
      </Avatar>

      <Avatar
        label="Kinga Headstock"
        shape="squircle"
        src="/photos/kinga-headstock.png"
      />
    </>
  )
}
