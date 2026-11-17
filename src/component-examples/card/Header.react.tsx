import { Card, CardHeader } from "opui-css/react"

export default function Header() {
  return (
    <Card variant="outlined">
      <CardHeader>
        <p>Bassbook blog</p>
        <h3>Why nobody watches the bassist (yet)</h3>
        <p>Published on 12 March</p>
      </CardHeader>
    </Card>
  )
}
