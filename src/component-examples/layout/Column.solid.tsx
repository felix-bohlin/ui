/** @jsxImportSource @solidjs/web */
import { Card, CardContent } from "opui-css/solid"

export default function Column() {
  return (
    <div class="ui-layout-column">
      <Card variant="outlined">
        <CardContent>First</CardContent>
      </Card>
      <Card variant="outlined">
        <CardContent>Second</CardContent>
      </Card>
      <Card variant="outlined">
        <CardContent>Third</CardContent>
      </Card>
    </div>
  )
}
