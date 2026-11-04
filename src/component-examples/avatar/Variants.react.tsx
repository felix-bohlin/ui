import { Avatar } from "opui-css/react"

export default function Variants() {
  return (
    <>
      <Avatar aria-label="Lena Ek" role="img">
        LE
      </Avatar>
      <Avatar aria-label="Tom Tanaka" role="img" variant="tonal">
        TT
      </Avatar>
      <Avatar aria-label="Elif Rahman" role="img" variant="outlined">
        ER
      </Avatar>
    </>
  )
}
