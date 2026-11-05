/** @jsxImportSource @solidjs/web */
import { Card, CardContent } from "opui-css/solid"

export default function Columns() {
  return (
    <div class="ui-layout-container">
      <div
        class="ui-layout-columns ui-breakpoint-small"
        style="--_columns: 2fr 1fr"
      >
        <Card variant="outlined">
          <CardContent>Content</CardContent>
        </Card>
        <Card variant="outlined">
          <CardContent>Aside</CardContent>
        </Card>
      </div>
    </div>
  )
}
