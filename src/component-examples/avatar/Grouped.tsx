import { Avatar } from "opui-css/solid"

export default function Example() {
  return (
    <Avatar aria-label="Team" isGroup>
      <Avatar aria-label="Anna Berg" role="img">
        AB
      </Avatar>
      <Avatar aria-label="Carl Dahl" role="img">
        CD
      </Avatar>
      <Avatar aria-label="Eva Falk" as="button">
        EF
      </Avatar>
      <Avatar aria-label="Gustav Holm" as="button">
        GH
      </Avatar>
      <Avatar aria-label="Ida Jansson" href="#">
        IJ
      </Avatar>
      <Avatar aria-label="Karl Lund" href="#">
        KL
      </Avatar>
    </Avatar>
  )
}
