import { Avatar } from "opui-css/react"

export default function Variants() {
  return (
    <>
      <Avatar aria-label="Lena Handén" role="img">
        LH
      </Avatar>
      <Avatar aria-label="Inga Halonen" role="img" variant="outlined">
        IH
      </Avatar>
      <Avatar aria-label="Pekka Gåpåbottanen" role="img" variant="tonal">
        PG
      </Avatar>
    </>
  )
}
