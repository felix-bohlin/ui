/** @jsxImportSource @solidjs/web */
import { Avatar } from "opui-css/solid"

export default function Variants() {
  return (
    <>
      <Avatar aria-label="Lou Headstock" role="img">
        LH
      </Avatar>
      <Avatar aria-label="Ines Hertz" role="img" variant="outlined">
        IH
      </Avatar>
      <Avatar aria-label="Percy Groove" role="img" variant="tonal">
        PG
      </Avatar>
    </>
  )
}
