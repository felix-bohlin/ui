import { Avatar } from "opui-css/react"

export default function Media() {
  return (
    <div className="ui-layout-media">
      <Avatar aria-label="Lena Ek" role="img">
        LE
      </Avatar>
      <div>
        <p>Lena Ek</p>
        <p className="ui-caption">Product designer, joined in March</p>
      </div>
    </div>
  )
}
