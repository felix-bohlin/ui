import { Avatar } from "opui-css/react"

export default function Disabled() {
  return (
    <>
      <Avatar as="button" label="Holly Humbucker">
        HH
      </Avatar>
      <Avatar as="button" disabled label="Ines Hertz">
        IH
      </Avatar>
      <Avatar href="#" label="Lou Headstock">
        LH
      </Avatar>
      <Avatar disabled href="#" label="Percy Groove">
        PG
      </Avatar>
    </>
  )
}
