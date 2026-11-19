/** @jsxImportSource @solidjs/web */
import { Avatar } from "opui-css/solid"

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
