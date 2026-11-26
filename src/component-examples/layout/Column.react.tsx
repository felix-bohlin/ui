import { Card, CardContent } from "opui-css/react"

export default function Column() {
  return (
    <div className="ui-layout-column">
      <Card variant="outlined">
        <CardContent>Review the pricing page</CardContent>
      </Card>
      <Card variant="outlined">
        <CardContent>Update the onboarding emails</CardContent>
      </Card>
      <Card variant="outlined">
        <CardContent>Write the release notes</CardContent>
      </Card>
    </div>
  )
}
