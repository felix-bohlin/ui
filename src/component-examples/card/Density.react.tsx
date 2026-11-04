import { Card, CardContent } from "opui-css/react"

export default function Density() {
  return (
    <>
      <Card density="dense" variant="outlined">
        <CardContent>Dense</CardContent>
      </Card>

      <Card variant="outlined">
        <CardContent>Normal</CardContent>
      </Card>

      <Card density="spacious" variant="outlined">
        <CardContent>Spacious</CardContent>
      </Card>
    </>
  )
}
