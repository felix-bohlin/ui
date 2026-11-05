/** @jsxImportSource @solidjs/web */
import { Card, CardHeader } from "opui-css/solid"

export default function Header() {
  return (
    <Card variant="outlined">
      <CardHeader>
        <p>Blog</p>
        <h3>How we cut our build time in half</h3>
        <p>Published on 12 March</p>
      </CardHeader>
    </Card>
  )
}
