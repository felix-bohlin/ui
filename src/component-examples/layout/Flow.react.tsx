import { Card, CardContent } from "opui-css/react"

export default function Flow() {
  return (
    <div className="ui-flow">
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
