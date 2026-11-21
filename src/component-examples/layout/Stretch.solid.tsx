/** @jsxImportSource @solidjs/web */
import { Card, CardContent } from "opui-css/solid"

export default function Stretch() {
  return (
    <div class="ui-layout-grid ui-stretch" style="--_min-inline-size: 10rem">
      <Card variant="outlined">
        <CardContent>Pokes sent: 128</CardContent>
      </Card>
      <Card variant="outlined">
        <CardContent>Replies: 12</CardContent>
      </Card>
    </div>
  )
}
