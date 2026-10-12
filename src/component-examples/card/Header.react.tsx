import { Card, CardHeader } from "opui-css/react"

export default function Header() {
  return (
    <Card variant="outlined">
      <CardHeader>
        <p>Blog</p>
        <h3>My ultra-great blog post</h3>
        <p>Please read it.</p>
      </CardHeader>
    </Card>
  )
}
