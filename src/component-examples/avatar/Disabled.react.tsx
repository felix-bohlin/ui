import { Avatar } from "opui-css/react"

export default function Disabled() {
  return (
    <>
      <Avatar aria-label="Eva Falk" as="button">
        EF
      </Avatar>
      <Avatar aria-label="Gustav Holm" as="button" disabled>
        GH
      </Avatar>
      <Avatar aria-label="Ida Jansson" href="#">
        IJ
      </Avatar>
      <Avatar aria-label="Karl Lund" disabled href="#">
        KL
      </Avatar>
    </>
  )
}
