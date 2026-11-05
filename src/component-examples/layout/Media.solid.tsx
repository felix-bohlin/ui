/** @jsxImportSource @solidjs/web */
import { Avatar } from "opui-css/solid"

export default function Media() {
  return (
    <div class="ui-layout-media">
      <Avatar aria-label="Lena Ek" role="img">
        LE
      </Avatar>
      <div>
        <p>Lena Ek</p>
        <p class="ui-caption">Product designer, joined in March</p>
      </div>
    </div>
  )
}
