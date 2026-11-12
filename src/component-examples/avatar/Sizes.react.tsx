import { Avatar } from "opui-css/react"

export default function Sizes() {
  return (
    <>
      <Avatar aria-label="Lena Handén" role="img" size="x-small">
        LH
      </Avatar>
      <Avatar aria-label="Pekka Gåpåbottanen" role="img" size="small">
        PG
      </Avatar>
      <Avatar aria-label="Inga Halonen" role="img">
        IH
      </Avatar>
      <Avatar aria-label="Hakki Hälinen" role="img" size="large">
        HH
      </Avatar>
    </>
  )
}
