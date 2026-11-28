/** @jsxImportSource @solidjs/web */
import { Avatar } from "opui-css/solid"

export default function Disabled() {
  return (
    <>
      <Avatar as="button" label="Adam Groove">
        AG
      </Avatar>
      <Avatar as="button" disabled label="Kinga Headstock">
        KH
      </Avatar>
      <Avatar href="#" label="Mohini Hertz">
        MH
      </Avatar>
      <Avatar disabled href="#" label="Scott Humbucker">
        SH
      </Avatar>
    </>
  )
}
