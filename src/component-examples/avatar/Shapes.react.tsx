import { Avatar } from "opui-css/react"

export default function Shapes() {
  return (
    <>
      <Avatar
        alt="Pekka Gåpåbottanen"
        shape="rounded"
        src="/photos/pekka-gapabottanen.png"
      />

      <Avatar aria-label="Ranta Runtiringen" role="img" shape="squared">
        RR
      </Avatar>

      <Avatar
        alt="Lena Handén"
        shape="squircle"
        src="/photos/lena-handen.png"
      />
    </>
  )
}
